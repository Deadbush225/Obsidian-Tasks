<script lang="ts">
	import type { Task, Subtask } from "../types";

	export let tasks: Task[] = [];
	export let onOpenTask: (filePath: string) => void = () => {};
	export let onDateChange: (
		taskId: string,
		startDate: string,
		endDate: string,
	) => void = () => {};
	export let onAddSubtask: (
		parentId: string,
		parentTitle: string,
	) => void = () => {};
	export let onArchiveTask: (
		taskId: string,
		filePath: string,
		isSubtask: boolean,
	) => void = () => {};

	// ─── Timeline configuration ─────────────────────────────────────────────────
	const DAY_WIDTH = 32; // px per day
	const ROW_HEIGHT = 40; // px per row

	// Compute the date range to display: from earliest task start (or today-7) to latest end (or today+60)
	$: dateRange = computeDateRange(tasks);

	function computeDateRange(tasks: Task[]): { start: Date; days: number } {
		let earliest: Date | null = null;
		let latest: Date | null = null;

		const collect = (t: Task | Subtask) => {
			if (t.startDate) {
				const d = parseDate(t.startDate);
				if (d && (!earliest || d < earliest)) earliest = d;
			}
			if ((t as Task).endDate) {
				const d = parseDate((t as Task).endDate!);
				if (d && (!latest || d > latest)) latest = d;
			}
		};

		tasks.forEach((t) => {
			collect(t);
			t.subtasks?.forEach(collect);
		});

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (!earliest) {
			earliest = new Date(today);
			earliest.setDate(earliest.getDate() - 7);
		} else {
			const e = new Date(earliest);
			e.setDate(e.getDate() - 5);
			earliest = e;
		}

		if (!latest) {
			latest = new Date(today);
			latest.setDate(latest.getDate() + 60);
		} else {
			const l = new Date(latest);
			l.setDate(l.getDate() + 10);
			latest = l;
		}

		const days =
			Math.ceil((latest.getTime() - earliest.getTime()) / 86400000) + 1;
		return { start: earliest, days };
	}

	function parseDate(s: string | null | undefined): Date | null {
		if (!s || typeof s !== "string") return null;
		const parts = s.split("-").map(Number);
		if (parts.length !== 3 || parts.some(isNaN)) return null;
		const [y, m, d] = parts;
		return new Date(y, m - 1, d);
	}

	function toISODate(d: Date): string {
		if (!d || isNaN(d.getTime())) return "";
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
	}

	function dayIndex(dateStr: string | null): number {
		if (!dateStr) return -1;
		const d = parseDate(dateStr);
		if (!d) return -1;
		return Math.floor((d.getTime() - dateRange.start.getTime()) / 86400000);
	}

	// ─── Header: months + days ───────────────────────────────────────────────────
	$: headerMonths = buildMonthHeaders(dateRange);

	type MonthHeader = { label: string; span: number };
	function buildMonthHeaders({
		start,
		days,
	}: {
		start: Date;
		days: number;
	}): MonthHeader[] {
		const months: MonthHeader[] = [];
		let cur = new Date(start);
		cur.setHours(0, 0, 0, 0);

		let remaining = days;
		while (remaining > 0) {
			const year = cur.getFullYear();
			const month = cur.getMonth();
			const daysInMonth = new Date(year, month + 1, 0).getDate();
			const dayOfMonth = cur.getDate();
			const span = Math.min(daysInMonth - dayOfMonth + 1, remaining);
			months.push({
				label: cur.toLocaleString("default", {
					month: "long",
					year: "numeric",
				}),
				span,
			});
			cur = new Date(year, month, dayOfMonth + span);
			remaining -= span;
		}
		return months;
	}

	$: dayHeaders = buildDayHeaders(dateRange);

	type DayHeader = {
		day: number;
		date: Date;
		isWeekend: boolean;
		isToday: boolean;
	};
	function buildDayHeaders({
		start,
		days,
	}: {
		start: Date;
		days: number;
	}): DayHeader[] {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return Array.from({ length: days }, (_, i) => {
			const d = new Date(start);
			d.setDate(d.getDate() + i);
			const dow = d.getDay();
			return {
				day: d.getDate(),
				date: d,
				isWeekend: dow === 0 || dow === 6,
				isToday: d.getTime() === today.getTime(),
			};
		});
	}

	// ─── Flat row list (tasks + subtasks interleaved) ────────────────────────────
	// Same palette as KanbanBoard for consistent per-task colors
	const PALETTE = [
		"#7c6af7",
		"#f7926a",
		"#6bbff7",
		"#f7c86a",
		"#6af79e",
		"#f76a9e",
		"#6af7f0",
		"#c86af7",
		"#f7f06a",
		"#6a9ef7",
	];

	type GanttRow = {
		id: string;
		title: string;
		filePath: string;
		startDate: string | null;
		endDate: string | null;
		isSubtask: boolean;
		depth: number;
		status: string;
		barColor: string; // parent color for subtasks; own palette color for tasks
		parentTitle: string;
	};

	$: rows = buildRows(tasks, expanded);

	// When tasks prop refreshes from disk, clear any stale bar overrides
	// (the updated startDate/endDate from the prop is now authoritative)
	$: {
		tasks;
		barOverrides = new Map();
	}

	let expanded: Set<string> = new Set();

	function toggleExpand(id: string) {
		if (expanded.has(id)) {
			expanded.delete(id);
		} else {
			expanded.add(id);
		}
		expanded = new Set(expanded); // new reference — forces $: rows to re-run
	}

	function buildRows(tasks: Task[], expanded: Set<string>): GanttRow[] {
		const result: GanttRow[] = [];
		tasks.forEach((t, taskIdx) => {
			const taskColor = PALETTE[taskIdx % PALETTE.length];
			result.push({
				id: t.id,
				title: t.title,
				filePath: t.filePath,
				startDate: t.startDate,
				endDate: t.endDate,
				isSubtask: false,
				depth: 0,
				status: t.status,
				barColor: taskColor,
				parentTitle: "",
			});
			if (t.subtasks.length > 0 && expanded.has(t.id)) {
				for (const s of t.subtasks) {
					result.push({
						id: s.id,
						title: s.title,
						filePath: s.filePath,
						startDate: s.startDate ?? null,
						endDate: s.endDate ?? null,
						isSubtask: true,
						depth: 1,
						status: s.status,
						barColor: taskColor, // ← same color as parent
						parentTitle: t.title,
					});
				}
			}
		});
		return result;
	}

	// ─── Dragging Gantt bars ─────────────────────────────────────────────────────
	type DragState = {
		rowId: string;
		type: "move" | "resize-start" | "resize-end";
		startX: number;
		origStartDay: number;
		origEndDay: number;
	} | null;

	let dragState: DragState = null;
	let barOverrides: Map<string, { startDay: number; endDay: number }> =
		new Map();

	function getBar(row: GanttRow): { startDay: number; endDay: number } | null {
		const override = barOverrides.get(row.id);
		if (override) return override;
		const s = dayIndex(row.startDate);
		const e = dayIndex(row.endDate);
		if (s < 0 || e < 0 || e < s) return null;
		return { startDay: s, endDay: e };
	}

	function onBarMouseDown(
		row: GanttRow,
		type: "move" | "resize-start" | "resize-end",
		e: MouseEvent,
	) {
		e.stopPropagation();
		const bar = getBar(row);
		if (!bar) return;
		dragState = {
			rowId: row.id,
			type,
			startX: e.clientX,
			origStartDay: bar.startDay,
			origEndDay: bar.endDay,
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		if (!dragState) return;
		const dx = e.clientX - dragState.startX;
		const dayDelta = Math.round(dx / DAY_WIDTH);

		let newStart = dragState.origStartDay;
		let newEnd = dragState.origEndDay;

		if (dragState.type === "move") {
			newStart = Math.max(0, dragState.origStartDay + dayDelta);
			newEnd = newStart + (dragState.origEndDay - dragState.origStartDay);
		} else if (dragState.type === "resize-start") {
			newStart = Math.max(
				0,
				Math.min(dragState.origStartDay + dayDelta, dragState.origEndDay - 1),
			);
		} else if (dragState.type === "resize-end") {
			newEnd = Math.max(
				dragState.origStartDay + 1,
				dragState.origEndDay + dayDelta,
			);
		}

		barOverrides.set(dragState.rowId, { startDay: newStart, endDay: newEnd });
		barOverrides = barOverrides; // trigger reactivity
	}

	function onMouseUp() {
		if (dragState) {
			const override = barOverrides.get(dragState.rowId);
			if (override) {
				const newStart = new Date(dateRange.start);
				newStart.setDate(newStart.getDate() + override.startDay);
				const newEnd = new Date(dateRange.start);
				newEnd.setDate(newEnd.getDate() + override.endDay);
				onDateChange(dragState.rowId, toISODate(newStart), toISODate(newEnd));
			}
		}
		dragState = null;
		window.removeEventListener("mousemove", onMouseMove);
		window.removeEventListener("mouseup", onMouseUp);
	}

	// ─── Click on empty cell to create bar ──────────────────────────────────────
	function onCellClick(row: GanttRow, dayIdx: number) {
		if (getBar(row)) return; // already has a bar
		const start = new Date(dateRange.start);
		start.setDate(start.getDate() + dayIdx);
		const end = new Date(start);
		end.setDate(end.getDate() + 4);
		onDateChange(row.id, toISODate(start), toISODate(end));
	}

	// ─── Today marker ────────────────────────────────────────────────────────────
	$: todayIdx = (() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return Math.floor((today.getTime() - dateRange.start.getTime()) / 86400000);
	})();

	// ─── Status colors ────────────────────────────────────────────────────────────
	const statusColors: Record<string, string> = {
		todo: "#6bb6ff",
		"in-progress": "#ffcd5e",
		blocked: "#e84040",
		done: "#4caf50",
	};

	// ─── Scroll sync: right panel drives left rows vertically ────────────────────
	let leftRowsEl: HTMLElement;
	let rightPanelEl: HTMLElement;

	function syncScroll() {
		if (leftRowsEl && rightPanelEl) {
			leftRowsEl.scrollTop = rightPanelEl.scrollTop;
		}
	}
</script>

<div class="gantt-wrapper">
	<!--
    Layout:
    ┌─────────────────┬──────────────────────────────────────────┐
    │  LEFT HEADER    │  RIGHT HEADER (sticky, scrolls horiz)    │
    ├─────────────────┼──────────────────────────────────────────┤
    │  LEFT ROWS      │  RIGHT ROWS (grid cells + bars)          │
    └─────────────────┴──────────────────────────────────────────┘
    The outer wrapper is display:flex. Left is a fixed-width flex column.
    Right is a flex-1 div with overflow:auto that contains a single inner
    div wide enough for all days.  The month+day headers are sticky inside
    that scrolling container.
  -->

	<!-- ── LEFT column ──────────────────────────────────────────── -->
	<div class="gantt-left">
		<!-- Blank header spacer (height must match right header) -->
		<div class="left-header-spacer">
			<div class="left-day-spacer">Tasks</div>
		</div>

		<!-- Task name rows (no independent scroll — scrolls with the right panel via JS sync) -->
		<div class="gantt-left-rows" bind:this={leftRowsEl}>
			{#each rows as row (row.id)}
				<div
					class="gantt-left-row"
					class:subtask-row={row.isSubtask}
					style="height:{ROW_HEIGHT}px; padding-left:{8 +
						row.depth * 18}px; border-left: 3px solid {row.barColor};"
				>
					{#if !row.isSubtask}
						{@const task = tasks.find((t) => t.id === row.id)}
						{#if task && task.subtasks.length > 0}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<button
								class="expand-btn"
								on:click={() => toggleExpand(row.id)}
								aria-label="Toggle subtasks"
							>
								{expanded.has(row.id) ? "▾" : "▸"}
							</button>
						{:else}
							<span class="expand-placeholder"></span>
						{/if}
					{:else}
						<span class="expand-placeholder"></span>
					{/if}

					<div class="gantt-task-label-wrap">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class="gantt-task-link"
							on:click={() => onOpenTask(row.filePath)}
							on:keydown={(e) => e.key === "Enter" && onOpenTask(row.filePath)}
							role="link"
							tabindex="0"
							title={row.title}>{row.title}</span
						>
						{#if row.isSubtask && row.parentTitle}
							<span class="gantt-parent-label">{row.parentTitle}</span>
						{/if}
					</div>

					<span
						class="status-dot"
						style="background:{statusColors[row.status] ?? '#888'}"
					></span>

					{#if !row.isSubtask}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<button
							class="gantt-add-subtask-btn"
							on:click|stopPropagation={() => onAddSubtask(row.id, row.title)}
							title="Add subtask">+</button
						>
					{/if}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<button
						class="gantt-archive-btn"
						on:click|stopPropagation={() =>
							onArchiveTask(row.id, row.filePath, row.isSubtask)}
						title="Archive task">📦</button
					>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── RIGHT column ─────────────────────────────────────────── -->
	<div class="gantt-right" bind:this={rightPanelEl} on:scroll={syncScroll}>
		<!-- Inner container sized to full timeline width -->
		<div class="gantt-inner" style="width:{dateRange.days * DAY_WIDTH}px">
			<!-- Sticky header: combined months + days row -->
			<div class="gantt-header-days">
				<!-- Month labels as overlaid spans inside the day cells -->
				<div class="gantt-month-labels">
					{#each headerMonths as m}
						<div
							class="gantt-month-label-cell"
							style="width:{m.span * DAY_WIDTH}px"
						>
							{m.label}
						</div>
					{/each}
				</div>
				<!-- Day numbers row -->
				<div class="gantt-day-numbers">
					{#each dayHeaders as dh}
						<div
							class="gantt-day-cell"
							class:weekend={dh.isWeekend}
							class:today-col={dh.isToday}
							style="width:{DAY_WIDTH}px"
						>
							{dh.day}
						</div>
					{/each}
				</div>
			</div>

			<!-- Grid rows + bars -->
			<div class="gantt-rows-container" style="position:relative;">
				<!-- Today vertical marker -->
				{#if todayIdx >= 0 && todayIdx < dateRange.days}
					<div
						class="today-line"
						style="left:{todayIdx * DAY_WIDTH +
							DAY_WIDTH / 2}px; height:{rows.length * ROW_HEIGHT}px"
					></div>
				{/if}

				{#each rows as row (row.id)}
					<div class="gantt-grid-row" style="height:{ROW_HEIGHT}px">
						<!-- Background day cells -->
						{#each dayHeaders as dh, i}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="gantt-grid-cell"
								class:weekend={dh.isWeekend}
								class:today-col={dh.isToday}
								style="width:{DAY_WIDTH}px"
								on:click={() => onCellClick(row, i)}
								role="button"
								tabindex="-1"
								aria-label="Set date"
							></div>
						{/each}

						<!-- Bar -->
						{#if getBar(row)}
							{@const bar = getBar(row)!}
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class="gantt-bar"
								style="left:{bar.startDay * DAY_WIDTH}px; width:{(bar.endDay -
									bar.startDay +
									1) *
									DAY_WIDTH}px; background:{row.barColor}; top:{(ROW_HEIGHT -
									24) /
									2}px;"
								on:mousedown={(e) => onBarMouseDown(row, "move", e)}
							>
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									class="bar-handle bar-handle-left"
									on:mousedown={(e) => onBarMouseDown(row, "resize-start", e)}
								></div>
								<span class="bar-label">{row.title}</span>
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									class="bar-handle bar-handle-right"
									on:mousedown={(e) => onBarMouseDown(row, "resize-end", e)}
								></div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<!-- /gantt-inner -->
	</div>
	<!-- /gantt-right -->
</div>

<style>
	/* ── Outer wrapper ───────────────────────────────────────────── */
	.gantt-wrapper {
		display: flex;
		height: 100%;
		overflow: hidden;
		font-size: 13px;
		background: var(--background-primary);
		user-select: none;
	}

	/* ── Left panel ──────────────────────────────────────────────── */
	.gantt-left {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 260px;
		border-right: 2px solid var(--background-modifier-border);
		/* overflow hidden so horizontal content doesn't bleed */
		overflow: hidden;
	}

	/* Spacer must match the exact pixel height of the right-panel header */
	.left-header-spacer {
		flex-shrink: 0;
		border-bottom: 1px solid var(--background-modifier-border);
	}

	.left-day-spacer {
		height: 56px;
		line-height: 56px;
		padding: 0 10px;
		font-size: 0.78em;
		font-weight: 700;
		color: var(--text-muted);
		background: var(--background-secondary);
	}

	/* Left rows — overflow-y hidden; vertical scroll is driven by the right panel */
	.gantt-left-rows {
		overflow: hidden;
		flex: 1;
	}

	.gantt-left-row {
		display: flex;
		align-items: center;
		gap: 6px;
		border-bottom: 1px solid var(--background-modifier-border-hover);
		padding-right: 8px;
		overflow: hidden;
		box-sizing: border-box;
	}

	.gantt-left-row.subtask-row {
		background: var(--background-secondary-alt);
		font-size: 0.88em;
	}

	.expand-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: 16px;
		color: var(--text-muted);
		flex-shrink: 0;
		font-size: 12px;
		line-height: 1;
	}

	.expand-placeholder {
		width: 16px;
		flex-shrink: 0;
		display: inline-block;
	}

	.gantt-task-link {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
		color: var(--text-accent);
		line-height: 1.2;
	}

	.gantt-task-link:hover {
		text-decoration: underline;
	}

	.gantt-task-label-wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		min-width: 0;
	}

	.gantt-parent-label {
		font-size: 0.7em;
		color: var(--text-muted);
		font-style: italic;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.gantt-add-subtask-btn {
		flex-shrink: 0;
		margin-left: 2px;
		width: 18px;
		height: 18px;
		line-height: 16px;
		text-align: center;
		padding: 0;
		border: 1px solid var(--background-modifier-border);
		border-radius: 4px;
		background: transparent;
		color: var(--text-muted);
		font-size: 14px;
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 0.15s,
			background 0.15s;
	}
	.gantt-left-row:hover .gantt-add-subtask-btn {
		opacity: 1;
	}
	.gantt-add-subtask-btn:hover {
		background: var(--interactive-accent);
		color: var(--text-on-accent);
		border-color: var(--interactive-accent);
	}

	.gantt-archive-btn {
		flex-shrink: 0;
		margin-left: 2px;
		width: 18px;
		height: 18px;
		line-height: 16px;
		text-align: center;
		padding: 0;
		border: 1px solid var(--background-modifier-border);
		border-radius: 4px;
		background: transparent;
		font-size: 11px;
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 0.15s,
			background 0.15s;
	}
	.gantt-left-row:hover .gantt-archive-btn {
		opacity: 1;
	}
	.gantt-archive-btn:hover {
		background: var(--background-modifier-error);
		border-color: var(--background-modifier-error);
	}

	/* ── Right panel ─────────────────────────────────────────────── */
	.gantt-right {
		flex: 1;
		overflow: auto; /* THIS is the single scroll container */
		position: relative;
	}

	/* Inner div is as wide as all the day columns */
	.gantt-inner {
		min-height: 100%;
		position: relative;
	}

	/* ── Sticky header (combined months + days, 56px tall) ──── */
	.gantt-header-days {
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		left: 0;
		background: var(--background-secondary);
		z-index: 10;
		width: max-content;
		min-width: 100%;
		border-bottom: 1px solid var(--background-modifier-border);
	}

	/* Month labels row — each cell spans its month's width */
	.gantt-month-labels {
		display: flex;
		height: 26px;
		border-bottom: 1px solid var(--background-modifier-border);
	}

	.gantt-month-label-cell {
		height: 26px;
		line-height: 26px;
		text-align: center;
		font-weight: 700;
		font-size: 0.78em;
		color: var(--text-normal);
		border-right: 1px solid var(--background-modifier-border);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-shrink: 0;
		padding: 0 4px;
		box-sizing: border-box;
	}

	/* Day numbers row */
	.gantt-day-numbers {
		display: flex;
		height: 30px;
	}

	.gantt-day-cell {
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 0.75em;
		color: var(--text-muted);
		border-right: 1px solid var(--background-modifier-border-hover);
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.gantt-day-cell.weekend {
		background: var(--background-secondary-alt);
		color: var(--text-faint);
	}
	.gantt-day-cell.today-col {
		background: color-mix(in srgb, var(--interactive-accent) 22%, transparent);
		color: var(--interactive-accent);
		font-weight: 700;
	}

	/* ── Grid body ───────────────────────────────────────────────── */
	.gantt-rows-container {
		position: relative;
	}

	.gantt-grid-row {
		display: flex;
		position: relative;
		border-bottom: 1px solid var(--background-modifier-border-hover);
		box-sizing: border-box;
	}

	.gantt-grid-cell {
		flex-shrink: 0;
		height: 100%;
		border-right: 1px solid var(--background-modifier-border-hover);
		cursor: crosshair;
		box-sizing: border-box;
	}

	.gantt-grid-cell.weekend {
		background: var(--background-secondary-alt);
	}
	.gantt-grid-cell.today-col {
		background: color-mix(in srgb, var(--interactive-accent) 8%, transparent);
	}

	/* ── Today vertical line ─────────────────────────────────────── */
	.today-line {
		position: absolute;
		top: 0;
		width: 2px;
		background: var(--interactive-accent);
		opacity: 0.6;
		pointer-events: none;
		z-index: 5;
	}

	/* ── Gantt bars ──────────────────────────────────────────────── */
	.gantt-bar {
		position: absolute;
		height: 24px;
		border-radius: 5px;
		cursor: grab;
		display: flex;
		align-items: center;
		overflow: hidden;
		z-index: 4;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
		min-width: 10px;
		box-sizing: border-box;
	}

	.gantt-bar:hover {
		filter: brightness(1.12);
	}
	.gantt-bar:active {
		cursor: grabbing;
	}

	.bar-label {
		flex: 1;
		font-size: 0.75em;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0 4px;
		color: rgba(0, 0, 0, 0.8);
		pointer-events: none;
	}

	.bar-handle {
		width: 8px;
		height: 100%;
		flex-shrink: 0;
		cursor: col-resize;
		background: rgba(0, 0, 0, 0.18);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bar-handle::after {
		content: "⋮";
		color: rgba(0, 0, 0, 0.45);
		font-size: 9px;
		pointer-events: none;
	}

	.bar-handle-left {
		border-radius: 5px 0 0 5px;
	}
	.bar-handle-right {
		border-radius: 0 5px 5px 0;
	}
</style>
