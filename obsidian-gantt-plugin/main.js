"use strict";
const obsidian = require("obsidian");
const DEV = false;
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
const noop = () => {
};
function run(fn) {
  return fn();
}
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function deferred() {
  var resolve;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const MANAGED_EFFECT = 1 << 24;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
const CONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
const REACTION_RAN = 1 << 15;
const EFFECT_TRANSPARENT = 1 << 16;
const EAGER_EFFECT = 1 << 17;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const USER_EFFECT = 1 << 20;
const EFFECT_OFFSCREEN = 1 << 25;
const WAS_MARKED = 1 << 16;
const REACTION_IS_UPDATING = 1 << 21;
const ASYNC = 1 << 22;
const ERROR_VALUE = 1 << 23;
const STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
const LEGACY_PROPS = /* @__PURE__ */ Symbol("legacy props");
const STALE_REACTION = new class StaleReactionError extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function async_derived_orphan() {
  {
    throw new Error(`https://svelte.dev/e/async_derived_orphan`);
  }
}
function each_key_duplicate(a, b, value) {
  {
    throw new Error(`https://svelte.dev/e/each_key_duplicate`);
  }
}
function effect_in_teardown(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_in_teardown`);
  }
}
function effect_in_unowned_derived() {
  {
    throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
  }
}
function effect_orphan(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_orphan`);
  }
}
function effect_update_depth_exceeded() {
  {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function props_invalid_value(key) {
  {
    throw new Error(`https://svelte.dev/e/props_invalid_value`);
  }
}
function state_descriptors_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
function svelte_boundary_reset_onerror() {
  {
    throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
  }
}
const EACH_ITEM_REACTIVE = 1;
const EACH_INDEX_REACTIVE = 1 << 1;
const EACH_IS_CONTROLLED = 1 << 2;
const EACH_IS_ANIMATED = 1 << 3;
const EACH_ITEM_IMMUTABLE = 1 << 4;
const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_RUNES = 1 << 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_BINDABLE = 1 << 3;
const PROPS_IS_LAZY_INITIAL = 1 << 4;
const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const UNINITIALIZED = /* @__PURE__ */ Symbol();
const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
function select_multiple_invalid_value() {
  {
    console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
  }
}
function svelte_boundary_reset_noop() {
  {
    console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
  }
}
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
let legacy_mode_flag = false;
let tracing_mode_flag = false;
function enable_legacy_mode_flag() {
  legacy_mode_flag = true;
}
let component_context = null;
function set_component_context(context) {
  component_context = context;
}
function push(props, runes = false, fn) {
  component_context = {
    p: component_context,
    i: false,
    c: null,
    e: null,
    s: props,
    x: null,
    l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
  };
}
function pop(component) {
  var context = (
    /** @type {ComponentContext} */
    component_context
  );
  var effects = context.e;
  if (effects !== null) {
    context.e = null;
    for (var fn of effects) {
      create_user_effect(fn);
    }
  }
  context.i = true;
  component_context = context.p;
  return (
    /** @type {T} */
    {}
  );
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
let micro_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  while (micro_tasks.length > 0) {
    run_micro_tasks();
  }
}
function handle_error(error) {
  var effect2 = active_effect;
  if (effect2 === null) {
    active_reaction.f |= ERROR_VALUE;
    return error;
  }
  if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
    throw error;
  }
  invoke_error_boundary(error, effect2);
}
function invoke_error_boundary(error, effect2) {
  while (effect2 !== null) {
    if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
      if ((effect2.f & REACTION_RAN) === 0) {
        throw error;
      }
      try {
        effect2.b.error(error);
        return;
      } catch (e) {
        error = e;
      }
    }
    effect2 = effect2.parent;
  }
  throw error;
}
const STATUS_MASK = -7169;
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function update_derived_status(derived2) {
  if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
    set_signal_status(derived2, CLEAN);
  } else {
    set_signal_status(derived2, MAYBE_DIRTY);
  }
}
function clear_marked(deps) {
  if (deps === null) return;
  for (const dep of deps) {
    if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
      continue;
    }
    dep.f ^= WAS_MARKED;
    clear_marked(
      /** @type {Derived} */
      dep.deps
    );
  }
}
function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
  if ((effect2.f & DIRTY) !== 0) {
    dirty_effects.add(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    maybe_dirty_effects.add(effect2);
  }
  clear_marked(effect2.deps);
  set_signal_status(effect2, CLEAN);
}
const batches = /* @__PURE__ */ new Set();
let current_batch = null;
let previous_batch = null;
let batch_values = null;
let queued_root_effects = [];
let last_scheduled_effect = null;
let is_flushing = false;
let is_flushing_sync = false;
class Batch {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #commit_callbacks = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #discard_callbacks = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #pending = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #blocking_pending = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #deferred = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #dirty_effects = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #maybe_dirty_effects = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #skipped_branches = /* @__PURE__ */ new Map();
  is_fork = false;
  #decrement_queued = false;
  #is_deferred() {
    return this.is_fork || this.#blocking_pending > 0;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(effect2) {
    if (!this.#skipped_branches.has(effect2)) {
      this.#skipped_branches.set(effect2, { d: [], m: [] });
    }
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(effect2) {
    var tracked = this.#skipped_branches.get(effect2);
    if (tracked) {
      this.#skipped_branches.delete(effect2);
      for (var e of tracked.d) {
        set_signal_status(e, DIRTY);
        schedule_effect(e);
      }
      for (e of tracked.m) {
        set_signal_status(e, MAYBE_DIRTY);
        schedule_effect(e);
      }
    }
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(root_effects) {
    queued_root_effects = [];
    this.apply();
    var effects = [];
    var render_effects = [];
    for (const root2 of root_effects) {
      this.#traverse_effect_tree(root2, effects, render_effects);
    }
    if (this.#is_deferred()) {
      this.#defer_effects(render_effects);
      this.#defer_effects(effects);
      for (const [e, t] of this.#skipped_branches) {
        reset_branch(e, t);
      }
    } else {
      for (const fn of this.#commit_callbacks) fn();
      this.#commit_callbacks.clear();
      if (this.#pending === 0) {
        this.#commit();
      }
      previous_batch = this;
      current_batch = null;
      flush_queued_effects(render_effects);
      flush_queued_effects(effects);
      previous_batch = null;
      this.#deferred?.resolve();
    }
    batch_values = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #traverse_effect_tree(root2, effects, render_effects) {
    root2.f ^= CLEAN;
    var effect2 = root2.first;
    while (effect2 !== null) {
      var flags2 = effect2.f;
      var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
      var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.#skipped_branches.has(effect2);
      if (!skip && effect2.fn !== null) {
        if (is_branch) {
          effect2.f ^= CLEAN;
        } else if ((flags2 & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (is_dirty(effect2)) {
          if ((flags2 & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect2);
          update_effect(effect2);
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      while (effect2 !== null) {
        var next = effect2.next;
        if (next !== null) {
          effect2 = next;
          break;
        }
        effect2 = effect2.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #defer_effects(effects) {
    for (var i = 0; i < effects.length; i += 1) {
      defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
    }
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(source2, value) {
    if (value !== UNINITIALIZED && !this.previous.has(source2)) {
      this.previous.set(source2, value);
    }
    if ((source2.f & ERROR_VALUE) === 0) {
      this.current.set(source2, source2.v);
      batch_values?.set(source2, source2.v);
    }
  }
  activate() {
    current_batch = this;
    this.apply();
  }
  deactivate() {
    if (current_batch !== this) return;
    current_batch = null;
    batch_values = null;
  }
  flush() {
    this.activate();
    if (queued_root_effects.length > 0) {
      flush_effects();
      if (current_batch !== null && current_batch !== this) {
        return;
      }
    } else if (this.#pending === 0) {
      this.process([]);
    }
    this.deactivate();
  }
  discard() {
    for (const fn of this.#discard_callbacks) fn(this);
    this.#discard_callbacks.clear();
  }
  #commit() {
    if (batches.size > 1) {
      this.previous.clear();
      var previous_batch_values = batch_values;
      var is_earlier = true;
      for (const batch of batches) {
        if (batch === this) {
          is_earlier = false;
          continue;
        }
        const sources = [];
        for (const [source2, value] of this.current) {
          if (batch.current.has(source2)) {
            if (is_earlier && value !== batch.current.get(source2)) {
              batch.current.set(source2, value);
            } else {
              continue;
            }
          }
          sources.push(source2);
        }
        if (sources.length === 0) {
          continue;
        }
        const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
        if (others.length > 0) {
          var prev_queued_root_effects = queued_root_effects;
          queued_root_effects = [];
          const marked = /* @__PURE__ */ new Set();
          const checked = /* @__PURE__ */ new Map();
          for (const source2 of sources) {
            mark_effects(source2, others, marked, checked);
          }
          if (queued_root_effects.length > 0) {
            current_batch = batch;
            batch.apply();
            for (const root2 of queued_root_effects) {
              batch.#traverse_effect_tree(root2, [], []);
            }
            batch.deactivate();
          }
          queued_root_effects = prev_queued_root_effects;
        }
      }
      current_batch = null;
      batch_values = previous_batch_values;
    }
    batches.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(blocking) {
    this.#pending += 1;
    if (blocking) this.#blocking_pending += 1;
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(blocking) {
    this.#pending -= 1;
    if (blocking) this.#blocking_pending -= 1;
    if (this.#decrement_queued) return;
    this.#decrement_queued = true;
    queue_micro_task(() => {
      this.#decrement_queued = false;
      if (!this.#is_deferred()) {
        this.revive();
      } else if (queued_root_effects.length > 0) {
        this.flush();
      }
    });
  }
  revive() {
    for (const e of this.#dirty_effects) {
      this.#maybe_dirty_effects.delete(e);
      set_signal_status(e, DIRTY);
      schedule_effect(e);
    }
    for (const e of this.#maybe_dirty_effects) {
      set_signal_status(e, MAYBE_DIRTY);
      schedule_effect(e);
    }
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(fn) {
    this.#commit_callbacks.add(fn);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(fn) {
    this.#discard_callbacks.add(fn);
  }
  settled() {
    return (this.#deferred ??= deferred()).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const batch = current_batch = new Batch();
      batches.add(current_batch);
      if (!is_flushing_sync) {
        queue_micro_task(() => {
          if (current_batch !== batch) {
            return;
          }
          batch.flush();
        });
      }
    }
    return current_batch;
  }
  apply() {
    return;
  }
}
function flushSync(fn) {
  var was_flushing_sync = is_flushing_sync;
  is_flushing_sync = true;
  try {
    var result;
    if (fn) ;
    while (true) {
      flush_tasks();
      if (queued_root_effects.length === 0) {
        current_batch?.flush();
        if (queued_root_effects.length === 0) {
          last_scheduled_effect = null;
          return (
            /** @type {T} */
            result
          );
        }
      }
      flush_effects();
    }
  } finally {
    is_flushing_sync = was_flushing_sync;
  }
}
function flush_effects() {
  is_flushing = true;
  var source_stacks = null;
  try {
    var flush_count = 0;
    while (queued_root_effects.length > 0) {
      var batch = Batch.ensure();
      if (flush_count++ > 1e3) {
        var updates, entry;
        if (DEV) ;
        infinite_loop_guard();
      }
      batch.process(queued_root_effects);
      old_values.clear();
      if (DEV) ;
    }
  } finally {
    queued_root_effects = [];
    is_flushing = false;
    last_scheduled_effect = null;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error) {
    invoke_error_boundary(error, last_scheduled_effect);
  }
}
let eager_block_effects = null;
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  var i = 0;
  while (i < length) {
    var effect2 = effects[i++];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
      eager_block_effects = /* @__PURE__ */ new Set();
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
        unlink_effect(effect2);
      }
      if (eager_block_effects?.size > 0) {
        old_values.clear();
        for (const e of eager_block_effects) {
          if ((e.f & (DESTROYED | INERT)) !== 0) continue;
          const ordered_effects = [e];
          let ancestor = e.parent;
          while (ancestor !== null) {
            if (eager_block_effects.has(ancestor)) {
              eager_block_effects.delete(ancestor);
              ordered_effects.push(ancestor);
            }
            ancestor = ancestor.parent;
          }
          for (let j = ordered_effects.length - 1; j >= 0; j--) {
            const e2 = ordered_effects[j];
            if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
            update_effect(e2);
          }
        }
        eager_block_effects.clear();
      }
    }
  }
  eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
  if (marked.has(value)) return;
  marked.add(value);
  if (value.reactions !== null) {
    for (const reaction of value.reactions) {
      const flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark_effects(
          /** @type {Derived} */
          reaction,
          sources,
          marked,
          checked
        );
      } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
        set_signal_status(reaction, DIRTY);
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function depends_on(reaction, sources, checked) {
  const depends = checked.get(reaction);
  if (depends !== void 0) return depends;
  if (reaction.deps !== null) {
    for (const dep of reaction.deps) {
      if (includes.call(sources, dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on(
        /** @type {Derived} */
        dep,
        sources,
        checked
      )) {
        checked.set(
          /** @type {Derived} */
          dep,
          true
        );
        return true;
      }
    }
  }
  checked.set(reaction, false);
  return false;
}
function schedule_effect(signal) {
  var effect2 = last_scheduled_effect = signal;
  var boundary2 = effect2.b;
  if (boundary2?.is_pending && (signal.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (signal.f & REACTION_RAN) === 0) {
    boundary2.defer_effect(signal);
    return;
  }
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags2 = effect2.f;
    if (is_flushing && effect2 === active_effect && (flags2 & BLOCK_EFFECT) !== 0 && (flags2 & HEAD_EFFECT) === 0 && (flags2 & REACTION_RAN) !== 0) {
      return;
    }
    if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((flags2 & CLEAN) === 0) {
        return;
      }
      effect2.f ^= CLEAN;
    }
  }
  queued_root_effects.push(effect2);
}
function reset_branch(effect2, tracked) {
  if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
    return;
  }
  if ((effect2.f & DIRTY) !== 0) {
    tracked.d.push(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    tracked.m.push(effect2);
  }
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_branch(e, tracked);
    e = e.next;
  }
}
function createSubscriber(start) {
  let subscribers = 0;
  let version = source(0);
  let stop;
  return () => {
    if (effect_tracking()) {
      get(version);
      render_effect(() => {
        if (subscribers === 0) {
          stop = untrack(() => start(() => increment(version)));
        }
        subscribers += 1;
        return () => {
          queue_micro_task(() => {
            subscribers -= 1;
            if (subscribers === 0) {
              stop?.();
              stop = void 0;
              increment(version);
            }
          });
        };
      });
    }
  };
}
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
function boundary(node, props, children, transform_error) {
  new Boundary(node, props, children, transform_error);
}
class Boundary {
  /** @type {Boundary | null} */
  parent;
  is_pending = false;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #anchor;
  /** @type {TemplateNode | null} */
  #hydrate_open = null;
  /** @type {BoundaryProps} */
  #props;
  /** @type {((anchor: Node) => void)} */
  #children;
  /** @type {Effect} */
  #effect;
  /** @type {Effect | null} */
  #main_effect = null;
  /** @type {Effect | null} */
  #pending_effect = null;
  /** @type {Effect | null} */
  #failed_effect = null;
  /** @type {DocumentFragment | null} */
  #offscreen_fragment = null;
  #local_pending_count = 0;
  #pending_count = 0;
  #pending_count_update_queued = false;
  /** @type {Set<Effect>} */
  #dirty_effects = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #maybe_dirty_effects = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #effect_pending = null;
  #effect_pending_subscriber = createSubscriber(() => {
    this.#effect_pending = source(this.#local_pending_count);
    return () => {
      this.#effect_pending = null;
    };
  });
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(node, props, children, transform_error) {
    this.#anchor = node;
    this.#props = props;
    this.#children = (anchor) => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      effect2.b = this;
      effect2.f |= BOUNDARY_EFFECT;
      children(anchor);
    };
    this.parent = /** @type {Effect} */
    active_effect.b;
    this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
    this.#effect = block(() => {
      {
        this.#render();
      }
    }, flags);
  }
  #hydrate_resolved_content() {
    try {
      this.#main_effect = branch(() => this.#children(this.#anchor));
    } catch (error) {
      this.error(error);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #hydrate_failed_content(error) {
    const failed = this.#props.failed;
    if (!failed) return;
    this.#failed_effect = branch(() => {
      failed(
        this.#anchor,
        () => error,
        () => () => {
        }
      );
    });
  }
  #hydrate_pending_content() {
    const pending = this.#props.pending;
    if (!pending) return;
    this.is_pending = true;
    this.#pending_effect = branch(() => pending(this.#anchor));
    queue_micro_task(() => {
      var fragment = this.#offscreen_fragment = document.createDocumentFragment();
      var anchor = create_text();
      fragment.append(anchor);
      this.#main_effect = this.#run(() => {
        Batch.ensure();
        return branch(() => this.#children(anchor));
      });
      if (this.#pending_count === 0) {
        this.#anchor.before(fragment);
        this.#offscreen_fragment = null;
        pause_effect(
          /** @type {Effect} */
          this.#pending_effect,
          () => {
            this.#pending_effect = null;
          }
        );
        this.#resolve();
      }
    });
  }
  #render() {
    try {
      this.is_pending = this.has_pending_snippet();
      this.#pending_count = 0;
      this.#local_pending_count = 0;
      this.#main_effect = branch(() => {
        this.#children(this.#anchor);
      });
      if (this.#pending_count > 0) {
        var fragment = this.#offscreen_fragment = document.createDocumentFragment();
        move_effect(this.#main_effect, fragment);
        const pending = (
          /** @type {(anchor: Node) => void} */
          this.#props.pending
        );
        this.#pending_effect = branch(() => pending(this.#anchor));
      } else {
        this.#resolve();
      }
    } catch (error) {
      this.error(error);
    }
  }
  #resolve() {
    this.is_pending = false;
    for (const e of this.#dirty_effects) {
      set_signal_status(e, DIRTY);
      schedule_effect(e);
    }
    for (const e of this.#maybe_dirty_effects) {
      set_signal_status(e, MAYBE_DIRTY);
      schedule_effect(e);
    }
    this.#dirty_effects.clear();
    this.#maybe_dirty_effects.clear();
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(effect2) {
    defer_effect(effect2, this.#dirty_effects, this.#maybe_dirty_effects);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#props.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #run(fn) {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_ctx = component_context;
    set_active_effect(this.#effect);
    set_active_reaction(this.#effect);
    set_component_context(this.#effect.ctx);
    try {
      return fn();
    } catch (e) {
      handle_error(e);
      return null;
    } finally {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_ctx);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #update_pending_count(d) {
    if (!this.has_pending_snippet()) {
      if (this.parent) {
        this.parent.#update_pending_count(d);
      }
      return;
    }
    this.#pending_count += d;
    if (this.#pending_count === 0) {
      this.#resolve();
      if (this.#pending_effect) {
        pause_effect(this.#pending_effect, () => {
          this.#pending_effect = null;
        });
      }
      if (this.#offscreen_fragment) {
        this.#anchor.before(this.#offscreen_fragment);
        this.#offscreen_fragment = null;
      }
    }
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(d) {
    this.#update_pending_count(d);
    this.#local_pending_count += d;
    if (!this.#effect_pending || this.#pending_count_update_queued) return;
    this.#pending_count_update_queued = true;
    queue_micro_task(() => {
      this.#pending_count_update_queued = false;
      if (this.#effect_pending) {
        internal_set(this.#effect_pending, this.#local_pending_count);
      }
    });
  }
  get_effect_pending() {
    this.#effect_pending_subscriber();
    return get(
      /** @type {Source<number>} */
      this.#effect_pending
    );
  }
  /** @param {unknown} error */
  error(error) {
    var onerror = this.#props.onerror;
    let failed = this.#props.failed;
    if (!onerror && !failed) {
      throw error;
    }
    if (this.#main_effect) {
      destroy_effect(this.#main_effect);
      this.#main_effect = null;
    }
    if (this.#pending_effect) {
      destroy_effect(this.#pending_effect);
      this.#pending_effect = null;
    }
    if (this.#failed_effect) {
      destroy_effect(this.#failed_effect);
      this.#failed_effect = null;
    }
    var did_reset = false;
    var calling_on_error = false;
    const reset = () => {
      if (did_reset) {
        svelte_boundary_reset_noop();
        return;
      }
      did_reset = true;
      if (calling_on_error) {
        svelte_boundary_reset_onerror();
      }
      if (this.#failed_effect !== null) {
        pause_effect(this.#failed_effect, () => {
          this.#failed_effect = null;
        });
      }
      this.#run(() => {
        Batch.ensure();
        this.#render();
      });
    };
    const handle_error_result = (transformed_error) => {
      try {
        calling_on_error = true;
        onerror?.(transformed_error, reset);
        calling_on_error = false;
      } catch (error2) {
        invoke_error_boundary(error2, this.#effect && this.#effect.parent);
      }
      if (failed) {
        this.#failed_effect = this.#run(() => {
          Batch.ensure();
          try {
            return branch(() => {
              var effect2 = (
                /** @type {Effect} */
                active_effect
              );
              effect2.b = this;
              effect2.f |= BOUNDARY_EFFECT;
              failed(
                this.#anchor,
                () => transformed_error,
                () => reset
              );
            });
          } catch (error2) {
            invoke_error_boundary(
              error2,
              /** @type {Effect} */
              this.#effect.parent
            );
            return null;
          }
        });
      }
    };
    queue_micro_task(() => {
      var result;
      try {
        result = this.transform_error(error);
      } catch (e) {
        invoke_error_boundary(e, this.#effect && this.#effect.parent);
        return;
      }
      if (result !== null && typeof result === "object" && typeof /** @type {any} */
      result.then === "function") {
        result.then(
          handle_error_result,
          /** @param {unknown} e */
          (e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
        );
      } else {
        handle_error_result(result);
      }
    });
  }
}
function flatten(blockers, sync, async, fn) {
  const d = is_runes() ? derived : derived_safe_equal;
  var pending = blockers.filter((b) => !b.settled);
  if (async.length === 0 && pending.length === 0) {
    fn(sync.map(d));
    return;
  }
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  var restore = capture();
  var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
  function finish(values) {
    restore();
    try {
      fn(values);
    } catch (error) {
      if ((parent.f & DESTROYED) === 0) {
        invoke_error_boundary(error, parent);
      }
    }
    unset_context();
  }
  if (async.length === 0) {
    blocker_promise.then(() => finish(sync.map(d)));
    return;
  }
  function run2() {
    restore();
    Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => finish([...sync.map(d), ...result])).catch((error) => invoke_error_boundary(error, parent));
  }
  if (blocker_promise) {
    blocker_promise.then(run2);
  } else {
    run2();
  }
}
function capture() {
  var previous_effect = active_effect;
  var previous_reaction = active_reaction;
  var previous_component_context = component_context;
  var previous_batch2 = current_batch;
  return function restore(activate_batch = true) {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_component_context);
    if (activate_batch) previous_batch2?.activate();
  };
}
function unset_context(deactivate_batch = true) {
  set_active_effect(null);
  set_active_reaction(null);
  set_component_context(null);
  if (deactivate_batch) current_batch?.deactivate();
}
function increment_pending() {
  var boundary2 = (
    /** @type {Boundary} */
    /** @type {Effect} */
    active_effect.b
  );
  var batch = (
    /** @type {Batch} */
    current_batch
  );
  var blocking = boundary2.is_rendered();
  boundary2.update_pending_count(1);
  batch.increment(blocking);
  return () => {
    boundary2.update_pending_count(-1);
    batch.decrement(blocking);
  };
}
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  var flags2 = DERIVED | DIRTY;
  var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  if (active_effect !== null) {
    active_effect.f |= EFFECT_PRESERVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags2,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      UNINITIALIZED
    ),
    wv: 0,
    parent: parent_derived ?? active_effect,
    ac: null
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function async_derived(fn, label, location) {
  let parent = (
    /** @type {Effect | null} */
    active_effect
  );
  if (parent === null) {
    async_derived_orphan();
  }
  var promise = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  );
  var signal = source(
    /** @type {V} */
    UNINITIALIZED
  );
  var should_suspend = !active_reaction;
  var deferreds = /* @__PURE__ */ new Map();
  async_effect(() => {
    var d = deferred();
    promise = d.promise;
    try {
      Promise.resolve(fn()).then(d.resolve, d.reject).finally(unset_context);
    } catch (error) {
      d.reject(error);
      unset_context();
    }
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    if (should_suspend) {
      var decrement_pending = increment_pending();
      deferreds.get(batch)?.reject(STALE_REACTION);
      deferreds.delete(batch);
      deferreds.set(batch, d);
    }
    const handler = (value, error = void 0) => {
      batch.activate();
      if (error) {
        if (error !== STALE_REACTION) {
          signal.f |= ERROR_VALUE;
          internal_set(signal, error);
        }
      } else {
        if ((signal.f & ERROR_VALUE) !== 0) {
          signal.f ^= ERROR_VALUE;
        }
        internal_set(signal, value);
        for (const [b, d2] of deferreds) {
          deferreds.delete(b);
          if (b === batch) break;
          d2.reject(STALE_REACTION);
        }
      }
      if (decrement_pending) {
        decrement_pending();
      }
    };
    d.promise.then(handler, (e) => handler(null, e || "unknown"));
  });
  teardown(() => {
    for (const d of deferreds.values()) {
      d.reject(STALE_REACTION);
    }
  });
  return new Promise((fulfil) => {
    function next(p) {
      function go() {
        if (p === promise) {
          fulfil(signal);
        } else {
          next(promise);
        }
      }
      p.then(go, go);
    }
    next(promise);
  });
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived(fn);
  push_reaction_value(d);
  return d;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_effects(derived2) {
  var effects = derived2.effects;
  if (effects !== null) {
    derived2.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
function get_derived_parent_effect(derived2) {
  var parent = derived2.parent;
  while (parent !== null) {
    if ((parent.f & DERIVED) === 0) {
      return (parent.f & DESTROYED) === 0 ? (
        /** @type {Effect} */
        parent
      ) : null;
    }
    parent = parent.parent;
  }
  return null;
}
function execute_derived(derived2) {
  var value;
  var prev_active_effect = active_effect;
  set_active_effect(get_derived_parent_effect(derived2));
  {
    try {
      derived2.f &= ~WAS_MARKED;
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived2) {
  var value = execute_derived(derived2);
  if (!derived2.equals(value)) {
    derived2.wv = increment_write_version();
    if (!current_batch?.is_fork || derived2.deps === null) {
      derived2.v = value;
      if (derived2.deps === null) {
        set_signal_status(derived2, CLEAN);
        return;
      }
    }
  }
  if (is_destroying_effect) {
    return;
  }
  if (batch_values !== null) {
    if (effect_tracking() || current_batch?.is_fork) {
      batch_values.set(derived2, value);
    }
  } else {
    update_derived_status(derived2);
  }
}
function freeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e of derived2.effects) {
    if (e.teardown || e.ac) {
      e.teardown?.();
      e.ac?.abort(STALE_REACTION);
      e.teardown = noop;
      e.ac = null;
      remove_reactions(e, 0);
      destroy_effect_children(e);
    }
  }
}
function unfreeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e of derived2.effects) {
    if (e.teardown) {
      update_effect(e);
    }
  }
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
let eager_effects_deferred = false;
function source(v, stack) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack) {
  const s = source(v);
  push_reaction_value(s);
  return s;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable = false, trackable = true) {
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
    (component_context.l.s ??= []).push(s);
  }
  return s;
}
function mutate(source2, value) {
  set(
    source2,
    untrack(() => get(source2))
  );
  return value;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !includes.call(current_sources, source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value);
}
function internal_set(source2, value) {
  if (!source2.equals(value)) {
    var old_value = source2.v;
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else {
      old_values.set(source2, old_value);
    }
    source2.v = value;
    var batch = Batch.ensure();
    batch.capture(source2, old_value);
    if ((source2.f & DERIVED) !== 0) {
      const derived2 = (
        /** @type {Derived} */
        source2
      );
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(derived2);
      }
      update_derived_status(derived2);
    }
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY);
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
      flush_eager_effects();
    }
  }
  return value;
}
function flush_eager_effects() {
  eager_effects_deferred = false;
  for (const effect2 of eager_effects) {
    if ((effect2.f & CLEAN) !== 0) {
      set_signal_status(effect2, MAYBE_DIRTY);
    }
    if (is_dirty(effect2)) {
      update_effect(effect2);
    }
  }
  eager_effects.clear();
}
function increment(source2) {
  set(source2, source2.v + 1);
}
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags2 = reaction.f;
    if (!runes && reaction === active_effect) continue;
    var not_dirty = (flags2 & DIRTY) === 0;
    if (not_dirty) {
      set_signal_status(reaction, status);
    }
    if ((flags2 & DERIVED) !== 0) {
      var derived2 = (
        /** @type {Derived} */
        reaction
      );
      batch_values?.delete(derived2);
      if ((flags2 & WAS_MARKED) === 0) {
        if (flags2 & CONNECTED) {
          reaction.f |= WAS_MARKED;
        }
        mark_reactions(derived2, MAYBE_DIRTY);
      }
    } else if (not_dirty) {
      if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
        eager_block_effects.add(
          /** @type {Effect} */
          reaction
        );
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = /* @__PURE__ */ state(0);
  var parent_version = update_version;
  var with_parent = (fn) => {
    if (update_version === parent_version) {
      return fn();
    }
    var reaction = active_reaction;
    var version2 = update_version;
    set_active_reaction(null);
    set_update_version(parent_version);
    var result = fn();
    set_active_reaction(reaction);
    set_update_version(version2);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", /* @__PURE__ */ state(
      /** @type {any[]} */
      value.length
    ));
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop2, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop2);
        if (s === void 0) {
          with_parent(() => {
            var s2 = /* @__PURE__ */ state(descriptor.value);
            sources.set(prop2, s2);
            return s2;
          });
        } else {
          set(s, descriptor.value, true);
        }
        return true;
      },
      deleteProperty(target, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target) {
            const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
            sources.set(prop2, s2);
            increment(version);
          }
        } else {
          set(s, UNINITIALIZED);
          increment(version);
        }
        return true;
      },
      get(target, prop2, receiver) {
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target;
        if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
          s = with_parent(() => {
            var p = proxy(exists ? target[prop2] : UNINITIALIZED);
            var s2 = /* @__PURE__ */ state(p);
            return s2;
          });
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop2, receiver);
      },
      getOwnPropertyDescriptor(target, prop2) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop2);
          if (s) descriptor.value = get(s);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop2);
          var value2 = source2?.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop2) {
        if (prop2 === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop2);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
        if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
          if (s === void 0) {
            s = with_parent(() => {
              var p = has ? proxy(target[prop2]) : UNINITIALIZED;
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          var value2 = get(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop2, value2, receiver) {
        var s = sources.get(prop2);
        var has = prop2 in target;
        if (is_proxied_array && prop2 === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(i + "", other_s);
            }
          }
        }
        if (s === void 0) {
          if (!has || get_descriptor(target, prop2)?.writable) {
            s = with_parent(() => /* @__PURE__ */ state(void 0));
            set(s, proxy(value2));
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          var p = with_parent(() => proxy(value2));
          set(s, p);
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor?.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          increment(version);
        }
        return true;
      },
      ownKeys(target) {
        get(version);
        var own_keys = Reflect.ownKeys(target).filter((key2) => {
          var source3 = sources.get(key2);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key in target)) {
            own_keys.push(key);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function get_proxied_value(value) {
  try {
    if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
      return value[STATE_SYMBOL];
    }
  } catch {
  }
  return value;
}
function is(a, b) {
  return Object.is(get_proxied_value(a), get_proxied_value(b));
}
var $window;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  is_firefox = /Firefox/.test(navigator.userAgent);
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype.__click = void 0;
    element_prototype.__className = void 0;
    element_prototype.__attributes = null;
    element_prototype.__style = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype.__t = void 0;
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return (
    /** @type {TemplateNode | null} */
    first_child_getter.call(node)
  );
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return (
    /** @type {TemplateNode | null} */
    next_sibling_getter.call(node)
  );
}
function child(node, is_text) {
  {
    return /* @__PURE__ */ get_first_child(node);
  }
}
function first_child(node, is_text = false) {
  {
    var first = /* @__PURE__ */ get_first_child(node);
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
}
function sibling(node, count = 1, is_text = false) {
  let next_sibling = node;
  while (count--) {
    next_sibling = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(next_sibling);
  }
  {
    return next_sibling;
  }
}
function clear_text_content(node) {
  node.textContent = "";
}
function should_defer_append() {
  return false;
}
function create_element(tag, namespace, is2) {
  let options = void 0;
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(NAMESPACE_HTML, tag, options)
  );
}
let listening_to_form_reset = false;
function add_form_reset_listener() {
  if (!listening_to_form_reset) {
    listening_to_form_reset = true;
    document.addEventListener(
      "reset",
      (evt) => {
        Promise.resolve().then(() => {
          if (!evt.defaultPrevented) {
            for (
              const e of
              /**@type {HTMLFormElement} */
              evt.target.elements
            ) {
              e.__on_r?.();
            }
          }
        });
      },
      // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
      { capture: true }
    );
  }
}
function without_reactive_context(fn) {
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    return fn();
  } finally {
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function listen_to_event_and_reset_event(element, event2, handler, on_reset = handler) {
  element.addEventListener(event2, () => without_reactive_context(handler));
  const prev = element.__on_r;
  if (prev) {
    element.__on_r = () => {
      prev();
      on_reset(true);
    };
  } else {
    element.__on_r = () => on_reset(true);
  }
  add_form_reset_listener();
}
function validate_effect(rune) {
  if (active_effect === null) {
    if (active_reaction === null) {
      effect_orphan();
    }
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn, sync) {
  var parent = active_effect;
  if (parent !== null && (parent.f & INERT) !== 0) {
    type |= INERT;
  }
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes: null,
    f: type | DIRTY | CONNECTED,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    b: parent && parent.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (sync) {
    try {
      update_effect(effect2);
    } catch (e2) {
      destroy_effect(effect2);
      throw e2;
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var e = effect2;
  if (sync && e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
  (e.f & EFFECT_PRESERVED) === 0) {
    e = e.first;
    if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
      e.f |= EFFECT_TRANSPARENT;
    }
  }
  if (e !== null) {
    e.parent = parent;
    if (parent !== null) {
      push_effect(e, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
      var derived2 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived2.effects ??= []).push(e);
    }
  }
  return effect2;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null, false);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect();
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && (flags2 & REACTION_RAN) === 0;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ??= []).push(fn);
  } else {
    return create_user_effect(fn);
  }
}
function create_user_effect(fn) {
  return create_effect(EFFECT | USER_EFFECT, fn, false);
}
function user_pre_effect(fn) {
  validate_effect();
  return create_effect(RENDER_EFFECT | USER_EFFECT, fn, true);
}
function component_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);
  return (options = {}) => {
    return new Promise((fulfil) => {
      if (options.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function legacy_pre_effect(deps, fn) {
  var context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  var token = { effect: null, ran: false, deps };
  context.l.$.push(token);
  token.effect = render_effect(() => {
    deps();
    if (token.ran) return;
    token.ran = true;
    untrack(fn);
  });
}
function legacy_pre_effect_reset() {
  var context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  render_effect(() => {
    for (var token of context.l.$) {
      token.deps();
      var effect2 = token.effect;
      if ((effect2.f & CLEAN) !== 0 && effect2.deps !== null) {
        set_signal_status(effect2, MAYBE_DIRTY);
      }
      if (is_dirty(effect2)) {
        update_effect(effect2);
      }
      token.ran = false;
    }
  });
}
function async_effect(fn) {
  return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
}
function render_effect(fn, flags2 = 0) {
  return create_effect(RENDER_EFFECT | flags2, fn, true);
}
function template_effect(fn, sync = [], async = [], blockers = []) {
  flatten(blockers, sync, async, (values) => {
    create_effect(RENDER_EFFECT, () => fn(...values.map(get)), true);
  });
}
function block(fn, flags2 = 0) {
  var effect2 = create_effect(BLOCK_EFFECT | flags2, fn, true);
  return effect2;
}
function branch(fn) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn, true);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    const controller = effect2.ac;
    if (controller !== null) {
      without_reactive_context(() => {
        controller.abort(STALE_REACTION);
      });
    }
    var next = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
    remove_effect_dom(
      effect2.nodes.start,
      /** @type {TemplateNode} */
      effect2.nodes.end
    );
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  var transitions = effect2.nodes && effect2.nodes.t;
  if (transitions !== null) {
    for (const transition of transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = null;
}
function remove_effect_dom(node, end) {
  while (node !== null) {
    var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
    node.remove();
    node = next;
  }
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next = effect2.next;
  if (prev !== null) prev.next = next;
  if (next !== null) next.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback, destroy = true) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  var fn = () => {
    if (destroy) destroy_effect(effect2);
    if (callback) callback();
  };
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition of transitions) {
      transition.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition of t) {
      if (transition.is_global || local) {
        transitions.push(transition);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
    // it means the parent block effect was pruned. In that case,
    // transparency information was transferred to the branch effect.
    (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
    pause_children(child2, transitions, transparent ? local : false);
    child2 = sibling2;
  }
}
function resume_effect(effect2) {
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if ((effect2.f & CLEAN) === 0) {
    set_signal_status(effect2, DIRTY);
    schedule_effect(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition of t) {
      if (transition.is_global || local) {
        transition.in();
      }
    }
  }
}
function move_effect(effect2, fragment) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  while (node !== null) {
    var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
    fragment.append(node);
    node = next;
  }
}
let is_updating_effect = false;
let is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
let active_reaction = null;
let untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
let current_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && true) {
    if (current_sources === null) {
      current_sources = [value];
    } else {
      current_sources.push(value);
    }
  }
}
let new_deps = null;
let skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
let write_version = 1;
let read_version = 0;
let update_version = read_version;
function set_update_version(value) {
  update_version = value;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(reaction) {
  var flags2 = reaction.f;
  if ((flags2 & DIRTY) !== 0) {
    return true;
  }
  if (flags2 & DERIVED) {
    reaction.f &= ~WAS_MARKED;
  }
  if ((flags2 & MAYBE_DIRTY) !== 0) {
    var dependencies = (
      /** @type {Value[]} */
      reaction.deps
    );
    var length = dependencies.length;
    for (var i = 0; i < length; i++) {
      var dependency = dependencies[i];
      if (is_dirty(
        /** @type {Derived} */
        dependency
      )) {
        update_derived(
          /** @type {Derived} */
          dependency
        );
      }
      if (dependency.wv > reaction.wv) {
        return true;
      }
    }
    if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    batch_values === null) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  if (current_sources !== null && includes.call(current_sources, signal)) {
    return;
  }
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root2) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_sources = current_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var previous_update_version = update_version;
  var flags2 = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  update_version = ++read_version;
  if (reaction.ac !== null) {
    without_reactive_context(() => {
      reaction.ac.abort(STALE_REACTION);
    });
    reaction.ac = null;
  }
  try {
    reaction.f |= REACTION_IS_UPDATING;
    var fn = (
      /** @type {Function} */
      reaction.fn
    );
    var result = fn();
    reaction.f |= REACTION_RAN;
    var deps = reaction.deps;
    var is_fork = current_batch?.is_fork;
    if (new_deps !== null) {
      var i;
      if (!is_fork) {
        remove_reactions(reaction, skipped_deps);
      }
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
        for (i = skipped_deps; i < deps.length; i++) {
          (deps[i].reactions ??= []).push(reaction);
        }
      }
    } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (previous_reaction.deps !== null) {
        for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
          previous_reaction.deps[i2].rv = read_version;
        }
      }
      if (previous_deps !== null) {
        for (const dep of previous_deps) {
          dep.rv = read_version;
        }
      }
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    if ((reaction.f & ERROR_VALUE) !== 0) {
      reaction.f ^= ERROR_VALUE;
    }
    return result;
  } catch (error) {
    return handle_error(error);
  } finally {
    reaction.f ^= REACTION_IS_UPDATING;
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    current_sources = previous_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    update_version = previous_update_version;
  }
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index2 = index_of.call(reactions, signal);
    if (index2 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index2] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !includes.call(new_deps, dependency))) {
    var derived2 = (
      /** @type {Derived} */
      dependency
    );
    if ((derived2.f & CONNECTED) !== 0) {
      derived2.f ^= CONNECTED;
      derived2.f &= ~WAS_MARKED;
    }
    update_derived_status(derived2);
    freeze_derived_effects(derived2);
    remove_reactions(derived2, 0);
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags2 = effect2.f;
  if ((flags2 & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  try {
    if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    var dep;
    if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
  }
}
async function tick() {
  await Promise.resolve();
  flushSync();
}
function get(signal) {
  var flags2 = signal.f;
  var is_derived = (flags2 & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!destroyed && (current_sources === null || !includes.call(current_sources, signal))) {
      var deps = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else {
            new_deps.push(signal);
          }
        }
      } else {
        (active_reaction.deps ??= []).push(signal);
        var reactions = signal.reactions;
        if (reactions === null) {
          signal.reactions = [active_reaction];
        } else if (!includes.call(reactions, active_reaction)) {
          reactions.push(active_reaction);
        }
      }
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  if (is_derived) {
    var derived2 = (
      /** @type {Derived} */
      signal
    );
    if (is_destroying_effect) {
      var value = derived2.v;
      if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
        value = execute_derived(derived2);
      }
      old_values.set(derived2, value);
      return value;
    }
    var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
    var is_new = (derived2.f & REACTION_RAN) === 0;
    if (is_dirty(derived2)) {
      if (should_connect) {
        derived2.f |= CONNECTED;
      }
      update_derived(derived2);
    }
    if (should_connect && !is_new) {
      unfreeze_derived_effects(derived2);
      reconnect(derived2);
    }
  }
  if (batch_values?.has(signal)) {
    return batch_values.get(signal);
  }
  if ((signal.f & ERROR_VALUE) !== 0) {
    throw signal.v;
  }
  return signal.v;
}
function reconnect(derived2) {
  derived2.f |= CONNECTED;
  if (derived2.deps === null) return;
  for (const dep of derived2.deps) {
    (dep.reactions ??= []).push(derived2);
    if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
      unfreeze_derived_effects(
        /** @type {Derived} */
        dep
      );
      reconnect(
        /** @type {Derived} */
        dep
      );
    }
  }
}
function depends_on_old_values(derived2) {
  if (derived2.v === UNINITIALIZED) return true;
  if (derived2.deps === null) return false;
  for (const dep of derived2.deps) {
    if (old_values.has(dep)) {
      return true;
    }
    if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
      /** @type {Derived} */
      dep
    )) {
      return true;
    }
  }
  return false;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}
function deep_read_state(value) {
  if (typeof value !== "object" || !value || value instanceof EventTarget) {
    return;
  }
  if (STATE_SYMBOL in value) {
    deep_read(value);
  } else if (!Array.isArray(value)) {
    for (let key in value) {
      const prop2 = value[key];
      if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
        deep_read(prop2);
      }
    }
  }
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
  if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
  !(value instanceof EventTarget) && !visited.has(value)) {
    visited.add(value);
    if (value instanceof Date) {
      value.getTime();
    }
    for (let key in value) {
      try {
        deep_read(value[key], visited);
      } catch (e) {
      }
    }
    const proto = get_prototype_of(value);
    if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
      const descriptors = get_descriptors(proto);
      for (let key in descriptors) {
        const get2 = descriptors[key].get;
        if (get2) {
          try {
            get2.call(value);
          } catch (e) {
          }
        }
      }
    }
  }
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
const event_symbol = /* @__PURE__ */ Symbol("events");
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function create_event(event_name, dom, handler, options = {}) {
  function target_handler(event2) {
    if (!options.capture) {
      handle_event_propagation.call(dom, event2);
    }
    if (!event2.cancelBubble) {
      return without_reactive_context(() => {
        return handler?.call(this, event2);
      });
    }
  }
  if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
    queue_micro_task(() => {
      dom.addEventListener(event_name, target_handler, options);
    });
  } else {
    dom.addEventListener(event_name, target_handler, options);
  }
  return target_handler;
}
function event(event_name, dom, handler, capture2, passive) {
  var options = { capture: capture2, passive };
  var target_handler = create_event(event_name, dom, handler, options);
  if (dom === document.body || // @ts-ignore
  dom === window || // @ts-ignore
  dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  dom instanceof HTMLMediaElement) {
    teardown(() => {
      dom.removeEventListener(event_name, target_handler, options);
    });
  }
}
let last_propagated_event = null;
function handle_event_propagation(event2) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event2.type;
  var path = event2.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event2.target
  );
  last_propagated_event = event2;
  var path_idx = 0;
  var handled_at = last_propagated_event === event2 && event2[event_symbol];
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event2[event_symbol] = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event2.target;
  if (current_target === handler_element) return;
  define_property(event2, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target[event_symbol]?.[event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event2.target === current_target)) {
          delegated.call(current_target, event2);
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event2[event_symbol] = handler_element;
    delete event2.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
const policy = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (html) => {
      return html;
    }
  })
);
function create_trusted_html(html) {
  return (
    /** @type {string} */
    policy?.createHTML(html) ?? html
  );
}
function create_fragment_from_html(html) {
  var elem = create_element("template");
  elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
  return elem.content;
}
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes === null) {
    effect2.nodes = { start, end, a: null, t: null };
  }
}
// @__NO_SIDE_EFFECTS__
function from_html(content, flags2) {
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(node);
    }
    var clone = (
      /** @type {TemplateNode} */
      use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(clone)
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
function comment() {
  var frag = document.createDocumentFragment();
  var start = document.createComment("");
  var anchor = create_text();
  frag.append(start, anchor);
  assign_nodes(start, anchor);
  return frag;
}
function append(anchor, dom) {
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}
function set_text(text, value) {
  var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
  if (str !== (text.__t ??= text.nodeValue)) {
    text.__t = str;
    text.nodeValue = `${str}`;
  }
}
function mount(component, options) {
  return _mount(component, options);
}
const listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
  init_operations();
  var component = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    boundary(
      /** @type {TemplateNode} */
      anchor_node,
      {
        pending: () => {
        }
      },
      (anchor_node2) => {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        if (context) ctx.c = context;
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor_node2, props) || {};
        pop();
      },
      transformError
    );
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        for (const node of [target, document]) {
          var counts = listeners.get(node);
          if (counts === void 0) {
            counts = /* @__PURE__ */ new Map();
            listeners.set(node, counts);
          }
          var count = counts.get(event_name);
          if (count === void 0) {
            node.addEventListener(event_name, handle_event_propagation, { passive });
            counts.set(event_name, 1);
          } else {
            counts.set(event_name, count + 1);
          }
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    return () => {
      for (var event_name of registered_events) {
        for (const node of [target, document]) {
          var counts = (
            /** @type {Map<string, number>} */
            listeners.get(node)
          );
          var count = (
            /** @type {number} */
            counts.get(event_name)
          );
          if (--count == 0) {
            node.removeEventListener(event_name, handle_event_propagation);
            counts.delete(event_name);
            if (counts.size === 0) {
              listeners.delete(node);
            }
          } else {
            counts.set(event_name, count);
          }
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component, unmount2);
  return component;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component, options) {
  const fn = mounted_components.get(component);
  if (fn) {
    mounted_components.delete(component);
    return fn(options);
  }
  return Promise.resolve();
}
class BranchManager {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #batches = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #onscreen = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #offscreen = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #outroing = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #transition = true;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(anchor, transition = true) {
    this.anchor = anchor;
    this.#transition = transition;
  }
  #commit = () => {
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    if (!this.#batches.has(batch)) return;
    var key = (
      /** @type {Key} */
      this.#batches.get(batch)
    );
    var onscreen = this.#onscreen.get(key);
    if (onscreen) {
      resume_effect(onscreen);
      this.#outroing.delete(key);
    } else {
      var offscreen = this.#offscreen.get(key);
      if (offscreen) {
        this.#onscreen.set(key, offscreen.effect);
        this.#offscreen.delete(key);
        offscreen.fragment.lastChild.remove();
        this.anchor.before(offscreen.fragment);
        onscreen = offscreen.effect;
      }
    }
    for (const [b, k] of this.#batches) {
      this.#batches.delete(b);
      if (b === batch) {
        break;
      }
      const offscreen2 = this.#offscreen.get(k);
      if (offscreen2) {
        destroy_effect(offscreen2.effect);
        this.#offscreen.delete(k);
      }
    }
    for (const [k, effect2] of this.#onscreen) {
      if (k === key || this.#outroing.has(k)) continue;
      const on_destroy = () => {
        const keys = Array.from(this.#batches.values());
        if (keys.includes(k)) {
          var fragment = document.createDocumentFragment();
          move_effect(effect2, fragment);
          fragment.append(create_text());
          this.#offscreen.set(k, { effect: effect2, fragment });
        } else {
          destroy_effect(effect2);
        }
        this.#outroing.delete(k);
        this.#onscreen.delete(k);
      };
      if (this.#transition || !onscreen) {
        this.#outroing.add(k);
        pause_effect(effect2, on_destroy, false);
      } else {
        on_destroy();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #discard = (batch) => {
    this.#batches.delete(batch);
    const keys = Array.from(this.#batches.values());
    for (const [k, branch2] of this.#offscreen) {
      if (!keys.includes(k)) {
        destroy_effect(branch2.effect);
        this.#offscreen.delete(k);
      }
    }
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(key, fn) {
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
      if (defer) {
        var fragment = document.createDocumentFragment();
        var target = create_text();
        fragment.append(target);
        this.#offscreen.set(key, {
          effect: branch(() => fn(target)),
          fragment
        });
      } else {
        this.#onscreen.set(
          key,
          branch(() => fn(this.anchor))
        );
      }
    }
    this.#batches.set(batch, key);
    if (defer) {
      for (const [k, effect2] of this.#onscreen) {
        if (k === key) {
          batch.unskip_effect(effect2);
        } else {
          batch.skip_effect(effect2);
        }
      }
      for (const [k, branch2] of this.#offscreen) {
        if (k === key) {
          batch.unskip_effect(branch2.effect);
        } else {
          batch.skip_effect(branch2.effect);
        }
      }
      batch.oncommit(this.#commit);
      batch.ondiscard(this.#discard);
    } else {
      this.#commit();
    }
  }
}
function if_block(node, fn, elseif = false) {
  var branches = new BranchManager(node);
  var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
  function update_branch(key, fn2) {
    branches.ensure(key, fn2);
  }
  block(() => {
    var has_branch = false;
    fn((fn2, key = 0) => {
      has_branch = true;
      update_branch(key, fn2);
    });
    if (!has_branch) {
      update_branch(false, null);
    }
  }, flags2);
}
function index(_, i) {
  return i;
}
function pause_effects(state2, to_destroy, controlled_anchor) {
  var transitions = [];
  var length = to_destroy.length;
  var group;
  var remaining = to_destroy.length;
  for (var i = 0; i < length; i++) {
    let effect2 = to_destroy[i];
    pause_effect(
      effect2,
      () => {
        if (group) {
          group.pending.delete(effect2);
          group.done.add(effect2);
          if (group.pending.size === 0) {
            var groups = (
              /** @type {Set<EachOutroGroup>} */
              state2.outrogroups
            );
            destroy_effects(array_from(group.done));
            groups.delete(group);
            if (groups.size === 0) {
              state2.outrogroups = null;
            }
          }
        } else {
          remaining -= 1;
        }
      },
      false
    );
  }
  if (remaining === 0) {
    var fast_path = transitions.length === 0 && controlled_anchor !== null;
    if (fast_path) {
      var anchor = (
        /** @type {Element} */
        controlled_anchor
      );
      var parent_node = (
        /** @type {Element} */
        anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(anchor);
      state2.items.clear();
    }
    destroy_effects(to_destroy, !fast_path);
  } else {
    group = {
      pending: new Set(to_destroy),
      done: /* @__PURE__ */ new Set()
    };
    (state2.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
  }
}
function destroy_effects(to_destroy, remove_dom = true) {
  for (var i = 0; i < to_destroy.length; i++) {
    destroy_effect(to_destroy[i], remove_dom);
  }
}
var offscreen_anchor;
function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var items = /* @__PURE__ */ new Map();
  var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = parent_node.appendChild(create_text());
  }
  var fallback = null;
  var each_array = /* @__PURE__ */ derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  var array;
  var first_run = true;
  function commit() {
    state2.fallback = fallback;
    reconcile(state2, array, anchor, flags2, get_key);
    if (fallback !== null) {
      if (array.length === 0) {
        if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
          resume_effect(fallback);
        } else {
          fallback.f ^= EFFECT_OFFSCREEN;
          move(fallback, null, anchor);
        }
      } else {
        pause_effect(fallback, () => {
          fallback = null;
        });
      }
    }
  }
  var effect2 = block(() => {
    array = /** @type {V[]} */
    get(each_array);
    var length = array.length;
    var keys = /* @__PURE__ */ new Set();
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    for (var index2 = 0; index2 < length; index2 += 1) {
      var value = array[index2];
      var key = get_key(value, index2);
      var item = first_run ? null : items.get(key);
      if (item) {
        if (item.v) internal_set(item.v, value);
        if (item.i) internal_set(item.i, index2);
        if (defer) {
          batch.unskip_effect(item.e);
        }
      } else {
        item = create_item(
          items,
          first_run ? anchor : offscreen_anchor ??= create_text(),
          value,
          key,
          index2,
          render_fn,
          flags2,
          get_collection
        );
        if (!first_run) {
          item.e.f |= EFFECT_OFFSCREEN;
        }
        items.set(key, item);
      }
      keys.add(key);
    }
    if (length === 0 && fallback_fn && !fallback) {
      if (first_run) {
        fallback = branch(() => fallback_fn(anchor));
      } else {
        fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
        fallback.f |= EFFECT_OFFSCREEN;
      }
    }
    if (length > keys.size) {
      {
        each_key_duplicate();
      }
    }
    if (!first_run) {
      if (defer) {
        for (const [key2, item2] of items) {
          if (!keys.has(key2)) {
            batch.skip_effect(item2.e);
          }
        }
        batch.oncommit(commit);
        batch.ondiscard(() => {
        });
      } else {
        commit();
      }
    }
    get(each_array);
  });
  var state2 = { effect: effect2, items, outrogroups: null, fallback };
  first_run = false;
}
function skip_to_branch(effect2) {
  while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
    effect2 = effect2.next;
  }
  return effect2;
}
function reconcile(state2, array, anchor, flags2, get_key) {
  var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
  var length = array.length;
  var items = state2.items;
  var current = skip_to_branch(state2.effect.first);
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key;
  var effect2;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key).e;
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        effect2.nodes?.a?.measure();
        (to_animate ??= /* @__PURE__ */ new Set()).add(effect2);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key = get_key(value, i);
    effect2 = /** @type {EachItem} */
    items.get(key).e;
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        group.pending.delete(effect2);
        group.done.delete(effect2);
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
      effect2.f ^= EFFECT_OFFSCREEN;
      if (effect2 === current) {
        move(effect2, null, anchor);
      } else {
        var next = prev ? prev.next : current;
        if (effect2 === state2.effect.last) {
          state2.effect.last = effect2.prev;
        }
        if (effect2.prev) effect2.prev.next = effect2.next;
        if (effect2.next) effect2.next.prev = effect2.prev;
        link(state2, prev, effect2);
        link(state2, effect2, next);
        move(effect2, next, anchor);
        prev = effect2;
        matched = [];
        stashed = [];
        current = skip_to_branch(prev.next);
        continue;
      }
    }
    if ((effect2.f & INERT) !== 0) {
      resume_effect(effect2);
      if (is_animated) {
        effect2.nodes?.a?.unfix();
        (to_animate ??= /* @__PURE__ */ new Set()).delete(effect2);
      }
    }
    if (effect2 !== current) {
      if (seen !== void 0 && seen.has(effect2)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen.delete(effect2);
          move(effect2, current, anchor);
          link(state2, effect2.prev, effect2.next);
          link(state2, effect2, prev === null ? state2.effect.first : prev.next);
          link(state2, prev, effect2);
          prev = effect2;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current !== effect2) {
        (seen ??= /* @__PURE__ */ new Set()).add(current);
        stashed.push(current);
        current = skip_to_branch(current.next);
      }
      if (current === null) {
        continue;
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
      matched.push(effect2);
    }
    prev = effect2;
    current = skip_to_branch(effect2.next);
  }
  if (state2.outrogroups !== null) {
    for (const group of state2.outrogroups) {
      if (group.pending.size === 0) {
        destroy_effects(array_from(group.done));
        state2.outrogroups?.delete(group);
      }
    }
    if (state2.outrogroups.size === 0) {
      state2.outrogroups = null;
    }
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = [];
    if (seen !== void 0) {
      for (effect2 of seen) {
        if ((effect2.f & INERT) === 0) {
          to_destroy.push(effect2);
        }
      }
    }
    while (current !== null) {
      if ((current.f & INERT) === 0 && current !== state2.fallback) {
        to_destroy.push(current);
      }
      current = skip_to_branch(current.next);
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      if (to_animate === void 0) return;
      for (effect2 of to_animate) {
        effect2.nodes?.a?.apply();
      }
    });
  }
}
function create_item(items, anchor, value, key, index2, render_fn, flags2, get_collection) {
  var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
  var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
  return {
    v,
    i,
    e: branch(() => {
      render_fn(anchor, v ?? value, i ?? index2, get_collection);
      return () => {
        items.delete(key);
      };
    })
  };
}
function move(effect2, next, anchor) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  var dest = next && (next.f & EFFECT_OFFSCREEN) === 0 ? (
    /** @type {EffectNodes} */
    next.nodes.start
  ) : anchor;
  while (node !== null) {
    var next_node = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    dest.before(node);
    if (node === end) {
      return;
    }
    node = next_node;
  }
}
function link(state2, prev, next) {
  if (prev === null) {
    state2.effect.first = next;
  } else {
    prev.next = next;
  }
  if (next === null) {
    state2.effect.last = prev;
  } else {
    next.prev = prev;
  }
}
const whitespace = [..." 	\n\r\f \v\uFEFF"];
function to_class(value, hash, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash) {
    classname = classname ? classname + " " + hash : hash;
  }
  if (directives) {
    for (var key of Object.keys(directives)) {
      if (directives[key]) {
        classname = classname ? classname + " " + key : key;
      } else if (classname.length) {
        var len = key.length;
        var a = 0;
        while ((a = classname.indexOf(key, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function to_style(value, styles) {
  return value == null ? null : String(value);
}
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
  var prev = dom.__className;
  if (prev !== value || prev === void 0) {
    var next_class_name = to_class(value, hash, next_classes);
    {
      if (next_class_name == null) {
        dom.removeAttribute("class");
      } else {
        dom.className = next_class_name;
      }
    }
    dom.__className = value;
  } else if (next_classes && prev_classes !== next_classes) {
    for (var key in next_classes) {
      var is_present = !!next_classes[key];
      if (prev_classes == null || is_present !== !!prev_classes[key]) {
        dom.classList.toggle(key, is_present);
      }
    }
  }
  return next_classes;
}
function set_style(dom, value, prev_styles, next_styles) {
  var prev = dom.__style;
  if (prev !== value) {
    var next_style_attr = to_style(value);
    {
      if (next_style_attr == null) {
        dom.removeAttribute("style");
      } else {
        dom.style.cssText = next_style_attr;
      }
    }
    dom.__style = value;
  }
  return next_styles;
}
function select_option(select, value, mounting = false) {
  if (select.multiple) {
    if (value == void 0) {
      return;
    }
    if (!is_array(value)) {
      return select_multiple_invalid_value();
    }
    for (var option of select.options) {
      option.selected = value.includes(get_option_value(option));
    }
    return;
  }
  for (option of select.options) {
    var option_value = get_option_value(option);
    if (is(option_value, value)) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function init_select(select) {
  var observer = new MutationObserver(() => {
    select_option(select, select.__value);
  });
  observer.observe(select, {
    // Listen to option element changes
    childList: true,
    subtree: true,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: true,
    attributeFilter: ["value"]
  });
  teardown(() => {
    observer.disconnect();
  });
}
function bind_select_value(select, get2, set2 = get2) {
  var batches2 = /* @__PURE__ */ new WeakSet();
  var mounting = true;
  listen_to_event_and_reset_event(select, "change", (is_reset) => {
    var query = is_reset ? "[selected]" : ":checked";
    var value;
    if (select.multiple) {
      value = [].map.call(select.querySelectorAll(query), get_option_value);
    } else {
      var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
      select.querySelector("option:not([disabled])");
      value = selected_option && get_option_value(selected_option);
    }
    set2(value);
    if (current_batch !== null) {
      batches2.add(current_batch);
    }
  });
  effect(() => {
    var value = get2();
    if (select === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        previous_batch ?? current_batch
      );
      if (batches2.has(batch)) {
        return;
      }
    }
    select_option(select, value, mounting);
    if (mounting && value === void 0) {
      var selected_option = select.querySelector(":checked");
      if (selected_option !== null) {
        value = get_option_value(selected_option);
        set2(value);
      }
    }
    select.__value = value;
    mounting = false;
  });
  init_select(select);
}
function get_option_value(option) {
  if ("__value" in option) {
    return option.__value;
  } else {
    return option.value;
  }
}
const IS_CUSTOM_ELEMENT = /* @__PURE__ */ Symbol("is custom element");
const IS_HTML = /* @__PURE__ */ Symbol("is html");
function set_attribute(element, attribute, value, skip_warning) {
  var attributes = get_attributes(element);
  if (attributes[attribute] === (attributes[attribute] = value)) return;
  if (value == null) {
    element.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
    element[attribute] = value;
  } else {
    element.setAttribute(attribute, value);
  }
}
function get_attributes(element) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    element.__attributes ??= {
      [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
      [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
    }
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element) {
  var cache_key = element.getAttribute("is") || element.nodeName;
  var setters = setters_cache.get(cache_key);
  if (setters) return setters;
  setters_cache.set(cache_key, setters = []);
  var descriptors;
  var proto = element;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key in descriptors) {
      if (descriptors[key].set) {
        setters.push(key);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function bind_value(input, get2, set2 = get2) {
  var batches2 = /* @__PURE__ */ new WeakSet();
  listen_to_event_and_reset_event(input, "input", async (is_reset) => {
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set2(value);
    if (current_batch !== null) {
      batches2.add(current_batch);
    }
    await tick();
    if (value !== (value = get2())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      var length = input.value.length;
      input.value = value ?? "";
      if (end !== null) {
        var new_length = input.value.length;
        if (start === end && end === length && new_length > length) {
          input.selectionStart = new_length;
          input.selectionEnd = new_length;
        } else {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, new_length);
        }
      }
    }
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the updated value from the input instead.
    // If defaultValue is set, then value == defaultValue
    // TODO Svelte 6: remove input.value check and set to empty string?
    untrack(get2) == null && input.value
  ) {
    set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    if (current_batch !== null) {
      batches2.add(current_batch);
    }
  }
  render_effect(() => {
    var value = get2();
    if (input === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        previous_batch ?? current_batch
      );
      if (batches2.has(batch)) {
        return;
      }
    }
    if (is_numberlike_input(input) && value === to_number(input.value)) {
      return;
    }
    if (input.type === "date" && !value && !input.value) {
      return;
    }
    if (value !== input.value) {
      input.value = value ?? "";
    }
  });
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
function bind_this(element_or_component = {}, update, get_value, get_parts) {
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = [];
      untrack(() => {
        if (element_or_component !== get_value(...parts)) {
          update(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      queue_micro_task(() => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update(null, ...parts);
        }
      });
    };
  });
  return element_or_component;
}
function self(fn) {
  return function(...args) {
    var event2 = (
      /** @type {Event} */
      args[0]
    );
    if (event2.target === this) {
      fn?.apply(this, args);
    }
  };
}
function init(immutable = false) {
  const context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  const callbacks = context.l.u;
  if (!callbacks) return;
  let props = () => deep_read_state(context.s);
  if (immutable) {
    let version = 0;
    let prev = (
      /** @type {Record<string, any>} */
      {}
    );
    const d = /* @__PURE__ */ derived(() => {
      let changed = false;
      const props2 = context.s;
      for (const key in props2) {
        if (props2[key] !== prev[key]) {
          prev[key] = props2[key];
          changed = true;
        }
      }
      if (changed) version++;
      return version;
    });
    props = () => get(d);
  }
  if (callbacks.b.length) {
    user_pre_effect(() => {
      observe_all(context, props);
      run_all(callbacks.b);
    });
  }
  user_effect(() => {
    const fns = untrack(() => callbacks.m.map(run));
    return () => {
      for (const fn of fns) {
        if (typeof fn === "function") {
          fn();
        }
      }
    };
  });
  if (callbacks.a.length) {
    user_effect(() => {
      observe_all(context, props);
      run_all(callbacks.a);
    });
  }
}
function observe_all(context, props) {
  if (context.l.s) {
    for (const signal of context.l.s) get(signal);
  }
  props();
}
let is_store_binding = false;
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}
function prop(props, key, flags2, fallback) {
  var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
  var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
  var fallback_value = (
    /** @type {V} */
    fallback
  );
  var fallback_dirty = true;
  var get_fallback = () => {
    if (fallback_dirty) {
      fallback_dirty = false;
      fallback_value = lazy ? untrack(
        /** @type {() => V} */
        fallback
      ) : (
        /** @type {V} */
        fallback
      );
    }
    return fallback_value;
  };
  var setter;
  if (bindable) {
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
  }
  var initial_value;
  var is_store_sub = false;
  if (bindable) {
    [initial_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key]
    ));
  } else {
    initial_value = /** @type {V} */
    props[key];
  }
  if (initial_value === void 0 && fallback !== void 0) {
    initial_value = get_fallback();
    if (setter) {
      if (runes) props_invalid_value();
      setter(initial_value);
    }
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      return value;
    };
  } else {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key]
      );
      if (value !== void 0) {
        fallback_value = /** @type {V} */
        void 0;
      }
      return value === void 0 ? fallback_value : value;
    };
  }
  if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return (
      /** @type {() => V} */
      (function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        }
        return getter();
      })
    );
  }
  var overridden = false;
  var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
    overridden = false;
    return getter();
  });
  if (bindable) get(d);
  var parent_effect = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    (function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get(d);
    })
  );
}
const DEFAULT_SETTINGS = {
  projectsFolder: "Projects",
  defaultStatus: "todo",
  defaultPriority: "medium"
};
class GanttSettingTab extends obsidian.PluginSettingTab {
  plugin;
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Obsidian Gantt & Kanban — Settings" });
    new obsidian.Setting(containerEl).setName("Projects folder").setDesc(
      "Root folder where your project folders live. Each subfolder becomes a project."
    ).addText(
      (text) => text.setPlaceholder("Projects").setValue(this.plugin.settings.projectsFolder).onChange(async (value) => {
        this.plugin.settings.projectsFolder = value.trim() || "Projects";
        await this.plugin.saveSettings();
      })
    );
    new obsidian.Setting(containerEl).setName("Default task status").setDesc("Status assigned to newly created tasks.").addDropdown(
      (dd) => dd.addOption("todo", "To Do").addOption("in-progress", "In Progress").addOption("done", "Done").addOption("blocked", "Blocked").setValue(this.plugin.settings.defaultStatus).onChange(async (value) => {
        this.plugin.settings.defaultStatus = value;
        await this.plugin.saveSettings();
      })
    );
    new obsidian.Setting(containerEl).setName("Default task priority").setDesc("Priority assigned to newly created tasks.").addDropdown(
      (dd) => dd.addOption("low", "Low").addOption("medium", "Medium").addOption("high", "High").addOption("critical", "Critical").setValue(this.plugin.settings.defaultPriority).onChange(async (value) => {
        this.plugin.settings.defaultPriority = value;
        await this.plugin.saveSettings();
      })
    );
  }
}
function nanoid(size = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(size);
  crypto.getRandomValues(array);
  for (let i = 0; i < size; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}
function generateTaskFrontmatter(task) {
  const lines = [
    "---",
    `id: ${task.id ?? nanoid()}`,
    `title: ${task.title ?? "Untitled Task"}`,
    `status: ${task.status ?? "todo"}`,
    `priority: ${task.priority ?? "medium"}`,
    `start_date: ${task.startDate ?? ""}`,
    `end_date: ${task.endDate ?? ""}`,
    `assignee: ${task.assignee ?? ""}`,
    `tags: [${(task.tags ?? []).join(", ")}]`,
    `parent_id: ${task.parentId ?? ""}`,
    "---",
    "",
    `# ${task.title ?? "Untitled Task"}`,
    "",
    "## Description",
    "",
    task.description ?? "",
    "",
    "## Notes",
    ""
  ];
  return lines.join("\n");
}
function parseTaskFile(file, content, projectFolder) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];
  const get2 = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
    return m ? m[1].trim() : "";
  };
  const tagsRaw = get2("tags").replace(/^\[|\]$/g, "");
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  return {
    id: get2("id") || file.basename,
    title: get2("title") || file.basename,
    status: get2("status") || "todo",
    priority: get2("priority") || "medium",
    startDate: get2("start_date") || null,
    endDate: get2("end_date") || null,
    assignee: get2("assignee"),
    tags,
    description: "",
    filePath: file.path,
    projectFolder,
    subtasks: [],
    parentId: get2("parent_id") || null
  };
}
async function loadProjects(app, projectsFolder) {
  const rootFolder = app.vault.getFolderByPath(projectsFolder);
  if (!rootFolder) return [];
  const projects = [];
  for (const child2 of rootFolder.children) {
    if (!child2.children) continue;
    const projectFolder = child2;
    const tasks = await loadTasksFromFolder(app, projectFolder, projectFolder.path);
    projects.push({
      name: projectFolder.name,
      folderPath: projectFolder.path,
      tasks
    });
  }
  return projects;
}
async function loadTasksFromFolder(app, folder, projectFolderPath) {
  const allTasks = /* @__PURE__ */ new Map();
  await collectTaskFiles(app, folder, projectFolderPath, allTasks);
  const topLevel = [];
  for (const task of allTasks.values()) {
    if (task.parentId && allTasks.has(task.parentId)) {
      const parent = allTasks.get(task.parentId);
      parent.subtasks.push(task);
    } else {
      topLevel.push(task);
    }
  }
  return topLevel;
}
async function collectTaskFiles(app, folder, projectFolderPath, map) {
  for (const child2 of folder.children) {
    if (child2.children) {
      await collectTaskFiles(app, child2, projectFolderPath, map);
    } else {
      const file = child2;
      if (file.extension !== "md") continue;
      const content = await app.vault.cachedRead(file);
      const task = parseTaskFile(file, content, projectFolderPath);
      if (task) map.set(task.id, task);
    }
  }
}
async function createTaskNote(app, projectFolderPath, title, parentId = null, extra = {}) {
  const id = nanoid();
  const safeName = title.replace(/[\\/:*?"<>|]/g, "-");
  let filePath;
  if (parentId) {
    const subDir = `${projectFolderPath}/${parentId}`;
    await ensureFolder(app, subDir);
    filePath = `${subDir}/${safeName}.md`;
  } else {
    filePath = `${projectFolderPath}/${safeName}.md`;
  }
  const task = {
    id,
    title,
    parentId,
    ...extra
  };
  const content = generateTaskFrontmatter(task);
  await ensureFolder(app, projectFolderPath);
  return app.vault.create(filePath, content);
}
async function updateTaskField(app, file, key, value) {
  let content = await app.vault.read(file);
  const pattern = new RegExp(`^(${key}:\\s*)(.*)$`, "m");
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1${value}`);
  }
  await app.vault.modify(file, content);
}
async function ensureFolder(app, path) {
  if (!app.vault.getFolderByPath(path)) {
    await app.vault.createFolder(path);
  }
}
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined") {
  ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
}
enable_legacy_mode_flag();
var root_4$2 = /* @__PURE__ */ from_html(`<span class="tag svelte-x7v2jt"> </span>`);
var root_3$3 = /* @__PURE__ */ from_html(`<div class="card-tags svelte-x7v2jt"></div>`);
var root_5$1 = /* @__PURE__ */ from_html(`<div class="card-subtasks svelte-x7v2jt"><span class="subtask-count svelte-x7v2jt"> </span> <div class="subtask-progress svelte-x7v2jt"><div class="subtask-fill svelte-x7v2jt"></div></div></div>`);
var root_7$1 = /* @__PURE__ */ from_html(`<span> </span>`);
var root_8$1 = /* @__PURE__ */ from_html(`<span> </span>`);
var root_6$1 = /* @__PURE__ */ from_html(`<div class="card-dates svelte-x7v2jt"><!> <!></div>`);
var root_10$1 = /* @__PURE__ */ from_html(`<div class="subtask-item svelte-x7v2jt" role="button" tabindex="0"><span>●</span> <span> </span></div>`);
var root_9$1 = /* @__PURE__ */ from_html(`<details class="subtask-list svelte-x7v2jt"><summary class="svelte-x7v2jt">Subtasks</summary> <!></details>`);
var root_2$2 = /* @__PURE__ */ from_html(`<div draggable="true"><div class="card-header svelte-x7v2jt"><span class="card-title svelte-x7v2jt" role="button" tabindex="0"> </span> <span class="priority-badge svelte-x7v2jt"> </span></div> <!> <!> <!> <!></div>`);
var root_11$1 = /* @__PURE__ */ from_html(`<div class="kanban-empty svelte-x7v2jt">Drop tasks here</div>`);
var root_1$3 = /* @__PURE__ */ from_html(`<div role="list"><div class="kanban-col-header svelte-x7v2jt"><span class="col-title svelte-x7v2jt"> </span> <span class="col-count svelte-x7v2jt"> </span></div> <div class="kanban-cards svelte-x7v2jt"><!> <!></div></div>`);
var root$3 = /* @__PURE__ */ from_html(`<div class="kanban-board svelte-x7v2jt"></div>`);
function KanbanBoard($$anchor, $$props) {
  push($$props, false);
  let tasks = prop($$props, "tasks", 24, () => []);
  let onOpenTask = prop($$props, "onOpenTask", 8, () => {
  });
  let onStatusChange = prop($$props, "onStatusChange", 8, () => {
  });
  const columns = [
    { id: "todo", label: "📋 To Do", color: "var(--color-base-30)" },
    {
      id: "in-progress",
      label: "🔄 In Progress",
      color: "var(--color-yellow)"
    },
    {
      id: "blocked",
      label: "🚫 Blocked",
      color: "var(--color-red)"
    },
    { id: "done", label: "✅ Done", color: "var(--color-green)" }
  ];
  function getTasksForColumn(status) {
    return tasks().filter((t) => t.status === status);
  }
  let draggingId = /* @__PURE__ */ mutable_source(null);
  let dragOverCol = /* @__PURE__ */ mutable_source(null);
  function onDragStart(task, e) {
    set(draggingId, task.id);
    e.dataTransfer?.setData("text/plain", task.id);
  }
  function onDragOver(colId, e) {
    e.preventDefault();
    set(dragOverCol, colId);
  }
  function onDrop(colId, e) {
    e.preventDefault();
    if (get(draggingId)) {
      onStatusChange()(get(draggingId), colId);
      set(draggingId, null);
      set(dragOverCol, null);
    }
  }
  function onDragLeave() {
    set(dragOverCol, null);
  }
  const priorityColors = {
    low: "#6bb6ff",
    medium: "#ffcd5e",
    high: "#ff8c42",
    critical: "#e84040"
  };
  function priorityLabel(p) {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }
  init();
  var div = root$3();
  each(div, 5, () => columns, index, ($$anchor2, col) => {
    var div_1 = root_1$3();
    let classes;
    var div_2 = child(div_1);
    var span = child(div_2);
    var text = child(span);
    var span_1 = sibling(span, 2);
    var text_1 = child(span_1);
    var div_3 = sibling(div_2, 2);
    var node = child(div_3);
    each(
      node,
      1,
      () => (get(col), untrack(() => getTasksForColumn(get(col).id))),
      (task) => task.id,
      ($$anchor3, task) => {
        var div_4 = root_2$2();
        let classes_1;
        var div_5 = child(div_4);
        var span_2 = child(div_5);
        var text_2 = child(span_2);
        var span_3 = sibling(span_2, 2);
        var text_3 = child(span_3);
        var node_1 = sibling(div_5, 2);
        {
          var consequent = ($$anchor4) => {
            var div_6 = root_3$3();
            each(div_6, 5, () => (get(task), untrack(() => get(task).tags)), index, ($$anchor5, tag) => {
              var span_4 = root_4$2();
              var text_4 = child(span_4);
              template_effect(() => set_text(text_4, `#${get(tag) ?? ""}`));
              append($$anchor5, span_4);
            });
            append($$anchor4, div_6);
          };
          if_block(node_1, ($$render) => {
            if (get(task), untrack(() => get(task).tags.length > 0)) $$render(consequent);
          });
        }
        var node_2 = sibling(node_1, 2);
        {
          var consequent_1 = ($$anchor4) => {
            var div_7 = root_5$1();
            var span_5 = child(div_7);
            var text_5 = child(span_5);
            var div_8 = sibling(span_5, 2);
            var div_9 = child(div_8);
            template_effect(
              ($0, $1) => {
                set_text(text_5, `${$0 ?? ""}/${(get(task), untrack(() => get(task).subtasks.length)) ?? ""} subtasks`);
                set_style(div_9, `width:${$1 ?? ""}%`);
              },
              [
                () => (get(task), untrack(() => get(task).subtasks.filter((s) => s.status === "done").length)),
                () => (get(task), untrack(() => get(task).subtasks.filter((s) => s.status === "done").length / get(task).subtasks.length * 100))
              ]
            );
            append($$anchor4, div_7);
          };
          if_block(node_2, ($$render) => {
            if (get(task), untrack(() => get(task).subtasks.length > 0)) $$render(consequent_1);
          });
        }
        var node_3 = sibling(node_2, 2);
        {
          var consequent_4 = ($$anchor4) => {
            var div_10 = root_6$1();
            var node_4 = child(div_10);
            {
              var consequent_2 = ($$anchor5) => {
                var span_6 = root_7$1();
                var text_6 = child(span_6);
                template_effect(() => set_text(text_6, `📅 ${(get(task), untrack(() => get(task).startDate)) ?? ""}`));
                append($$anchor5, span_6);
              };
              if_block(node_4, ($$render) => {
                if (get(task), untrack(() => get(task).startDate)) $$render(consequent_2);
              });
            }
            var node_5 = sibling(node_4, 2);
            {
              var consequent_3 = ($$anchor5) => {
                var span_7 = root_8$1();
                var text_7 = child(span_7);
                template_effect(() => set_text(text_7, `→ ${(get(task), untrack(() => get(task).endDate)) ?? ""}`));
                append($$anchor5, span_7);
              };
              if_block(node_5, ($$render) => {
                if (get(task), untrack(() => get(task).endDate)) $$render(consequent_3);
              });
            }
            append($$anchor4, div_10);
          };
          if_block(node_3, ($$render) => {
            if (get(task), untrack(() => get(task).startDate || get(task).endDate)) $$render(consequent_4);
          });
        }
        var node_6 = sibling(node_3, 2);
        {
          var consequent_5 = ($$anchor4) => {
            var details = root_9$1();
            var node_7 = sibling(child(details), 2);
            each(node_7, 1, () => (get(task), untrack(() => get(task).subtasks)), index, ($$anchor5, sub) => {
              var div_11 = root_10$1();
              var span_8 = child(div_11);
              var span_9 = sibling(span_8, 2);
              var text_8 = child(span_9);
              template_effect(() => {
                set_class(span_8, 1, `subtask-status status-${(get(sub), untrack(() => get(sub).status)) ?? ""}`, "svelte-x7v2jt");
                set_text(text_8, (get(sub), untrack(() => get(sub).title)));
              });
              event("click", div_11, () => onOpenTask()(get(sub).filePath));
              event("keydown", div_11, (e) => e.key === "Enter" && onOpenTask()(get(sub).filePath));
              append($$anchor5, div_11);
            });
            append($$anchor4, details);
          };
          if_block(node_6, ($$render) => {
            if (get(task), untrack(() => get(task).subtasks.length > 0)) $$render(consequent_5);
          });
        }
        template_effect(
          ($0) => {
            classes_1 = set_class(div_4, 1, "kanban-card svelte-x7v2jt", null, classes_1, { dragging: get(draggingId) === get(task).id });
            set_text(text_2, (get(task), untrack(() => get(task).title)));
            set_style(span_3, `background:${(get(task), untrack(() => priorityColors[get(task).priority] ?? "#888")) ?? ""}`);
            set_text(text_3, $0);
          },
          [
            () => (get(task), untrack(() => priorityLabel(get(task).priority)))
          ]
        );
        event("click", span_2, () => onOpenTask()(get(task).filePath));
        event("keydown", span_2, (e) => e.key === "Enter" && onOpenTask()(get(task).filePath));
        event("dragstart", div_4, (e) => onDragStart(get(task), e));
        append($$anchor3, div_4);
      }
    );
    var node_8 = sibling(node, 2);
    {
      var consequent_6 = ($$anchor3) => {
        var div_12 = root_11$1();
        append($$anchor3, div_12);
      };
      var d = /* @__PURE__ */ user_derived(() => (get(col), untrack(() => getTasksForColumn(get(col).id).length === 0)));
      if_block(node_8, ($$render) => {
        if (get(d)) $$render(consequent_6);
      });
    }
    template_effect(
      ($0) => {
        classes = set_class(div_1, 1, "kanban-column svelte-x7v2jt", null, classes, { "drag-over": get(dragOverCol) === get(col).id });
        set_style(div_2, `border-top: 3px solid ${(get(col), untrack(() => get(col).color)) ?? ""}`);
        set_text(text, (get(col), untrack(() => get(col).label)));
        set_text(text_1, $0);
      },
      [
        () => (get(col), untrack(() => getTasksForColumn(get(col).id).length))
      ]
    );
    event("dragover", div_1, (e) => onDragOver(get(col).id, e));
    event("drop", div_1, (e) => onDrop(get(col).id, e));
    event("dragleave", div_1, onDragLeave);
    append($$anchor2, div_1);
  });
  append($$anchor, div);
  pop();
}
var root_3$2 = /* @__PURE__ */ from_html(`<button class="expand-btn svelte-152mm6m" aria-label="Toggle subtasks"> </button>`);
var root_4$1 = /* @__PURE__ */ from_html(`<span class="expand-placeholder svelte-152mm6m"></span>`);
var root_5 = /* @__PURE__ */ from_html(`<span class="expand-placeholder svelte-152mm6m"></span>`);
var root_1$2 = /* @__PURE__ */ from_html(`<div><!> <span class="gantt-task-link svelte-152mm6m" role="link" tabindex="0"> </span> <span class="status-dot svelte-152mm6m"></span></div>`);
var root_6 = /* @__PURE__ */ from_html(`<div class="gantt-month-cell svelte-152mm6m"> </div>`);
var root_7 = /* @__PURE__ */ from_html(`<div> </div>`);
var root_8 = /* @__PURE__ */ from_html(`<div class="today-line svelte-152mm6m"></div>`);
var root_10 = /* @__PURE__ */ from_html(`<div role="button" tabindex="-1" aria-label="Set date"></div>`);
var root_11 = /* @__PURE__ */ from_html(`<div class="gantt-bar svelte-152mm6m"><div class="bar-handle bar-handle-left svelte-152mm6m"></div> <span class="bar-label svelte-152mm6m"> </span> <div class="bar-handle bar-handle-right svelte-152mm6m"></div></div>`);
var root_9 = /* @__PURE__ */ from_html(`<div class="gantt-grid-row svelte-152mm6m"><!> <!></div>`);
var root$2 = /* @__PURE__ */ from_html(`<div class="gantt-wrapper svelte-152mm6m"><div class="gantt-left svelte-152mm6m"><div class="left-header-spacer svelte-152mm6m"><div class="left-month-spacer svelte-152mm6m">Month</div> <div class="left-day-spacer svelte-152mm6m">Task</div></div> <div class="gantt-left-rows svelte-152mm6m"></div></div> <div class="gantt-right svelte-152mm6m"><div class="gantt-inner svelte-152mm6m"><div class="gantt-header-months svelte-152mm6m"></div> <div class="gantt-header-days svelte-152mm6m"></div> <div class="gantt-rows-container svelte-152mm6m" style="position:relative;"><!> <!></div></div></div></div>`);
function GanttChart($$anchor, $$props) {
  push($$props, false);
  const dateRange = /* @__PURE__ */ mutable_source();
  const headerMonths = /* @__PURE__ */ mutable_source();
  const dayHeaders = /* @__PURE__ */ mutable_source();
  const rows = /* @__PURE__ */ mutable_source();
  const todayIdx = /* @__PURE__ */ mutable_source();
  let tasks = prop($$props, "tasks", 24, () => []);
  let onOpenTask = prop($$props, "onOpenTask", 8, () => {
  });
  let onDateChange = prop($$props, "onDateChange", 8, () => {
  });
  const DAY_WIDTH = 32;
  const ROW_HEIGHT = 40;
  function computeDateRange(tasks2) {
    let earliest = null;
    let latest = null;
    const collect = (t) => {
      if (t.startDate) {
        const d = parseDate(t.startDate);
        if (!earliest || d < earliest) earliest = d;
      }
      if (t.endDate) {
        const d = parseDate(t.endDate);
        if (!latest || d > latest) latest = d;
      }
    };
    tasks2.forEach((t) => {
      collect(t);
      t.subtasks?.forEach(collect);
    });
    const today = /* @__PURE__ */ new Date();
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
    const days = Math.ceil((latest.getTime() - earliest.getTime()) / 864e5) + 1;
    return { start: earliest, days };
  }
  function parseDate(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function toISODate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function dayIndex(dateStr) {
    if (!dateStr) return -1;
    const d = parseDate(dateStr);
    return Math.floor((d.getTime() - get(dateRange).start.getTime()) / 864e5);
  }
  function buildMonthHeaders({ start, days }) {
    const months = [];
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
        label: cur.toLocaleString("default", { month: "long", year: "numeric" }),
        span
      });
      cur = new Date(year, month, dayOfMonth + span);
      remaining -= span;
    }
    return months;
  }
  function buildDayHeaders({ start, days }) {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const dow = d.getDay();
      return {
        day: d.getDate(),
        date: d,
        isWeekend: dow === 0 || dow === 6,
        isToday: d.getTime() === today.getTime()
      };
    });
  }
  let expanded = /* @__PURE__ */ mutable_source(/* @__PURE__ */ new Set());
  function toggleExpand(id) {
    if (get(expanded).has(id)) {
      get(expanded).delete(id);
    } else {
      get(expanded).add(id);
    }
    set(
      expanded,
      // trigger reactivity
      get(expanded)
    );
  }
  function buildRows(tasks2) {
    const result = [];
    for (const t of tasks2) {
      result.push({
        id: t.id,
        title: t.title,
        filePath: t.filePath,
        startDate: t.startDate,
        endDate: t.endDate,
        isSubtask: false,
        depth: 0,
        status: t.status
      });
      if (t.subtasks.length > 0 && get(expanded).has(t.id)) {
        for (const s of t.subtasks) {
          result.push({
            id: s.id,
            title: s.title,
            filePath: s.filePath,
            startDate: s.startDate ?? null,
            endDate: s.endDate ?? null,
            isSubtask: true,
            depth: 1,
            status: s.status
          });
        }
      }
    }
    return result;
  }
  let dragState = null;
  let barOverrides = /* @__PURE__ */ new Map();
  function getBar(row) {
    const override = barOverrides.get(row.id);
    if (override) return override;
    const s = dayIndex(row.startDate);
    const e = dayIndex(row.endDate);
    if (s < 0 || e < 0 || e < s) return null;
    return { startDay: s, endDay: e };
  }
  function onBarMouseDown(row, type, e) {
    e.stopPropagation();
    const bar = getBar(row);
    if (!bar) return;
    dragState = {
      rowId: row.id,
      type,
      startX: e.clientX,
      origStartDay: bar.startDay,
      origEndDay: bar.endDay
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
  function onMouseMove(e) {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dayDelta = Math.round(dx / DAY_WIDTH);
    let newStart = dragState.origStartDay;
    let newEnd = dragState.origEndDay;
    if (dragState.type === "move") {
      newStart = Math.max(0, dragState.origStartDay + dayDelta);
      newEnd = newStart + (dragState.origEndDay - dragState.origStartDay);
    } else if (dragState.type === "resize-start") {
      newStart = Math.max(0, Math.min(dragState.origStartDay + dayDelta, dragState.origEndDay - 1));
    } else if (dragState.type === "resize-end") {
      newEnd = Math.max(dragState.origStartDay + 1, dragState.origEndDay + dayDelta);
    }
    barOverrides.set(dragState.rowId, { startDay: newStart, endDay: newEnd });
    barOverrides = barOverrides;
  }
  function onMouseUp() {
    if (dragState) {
      const override = barOverrides.get(dragState.rowId);
      if (override) {
        const newStart = new Date(get(dateRange).start);
        newStart.setDate(newStart.getDate() + override.startDay);
        const newEnd = new Date(get(dateRange).start);
        newEnd.setDate(newEnd.getDate() + override.endDay);
        onDateChange()(dragState.rowId, toISODate(newStart), toISODate(newEnd));
      }
    }
    dragState = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }
  function onCellClick(row, dayIdx) {
    if (getBar(row)) return;
    const start = new Date(get(dateRange).start);
    start.setDate(start.getDate() + dayIdx);
    const end = new Date(start);
    end.setDate(end.getDate() + 4);
    onDateChange()(row.id, toISODate(start), toISODate(end));
  }
  const statusColors = {
    "todo": "#6bb6ff",
    "in-progress": "#ffcd5e",
    "blocked": "#e84040",
    "done": "#4caf50"
  };
  let leftRowsEl = /* @__PURE__ */ mutable_source();
  let rightPanelEl = /* @__PURE__ */ mutable_source();
  function syncScroll() {
    if (get(leftRowsEl) && get(rightPanelEl)) {
      mutate(leftRowsEl, get(leftRowsEl).scrollTop = get(rightPanelEl).scrollTop);
    }
  }
  legacy_pre_effect(() => deep_read_state(tasks()), () => {
    set(dateRange, computeDateRange(tasks()));
  });
  legacy_pre_effect(() => get(dateRange), () => {
    set(headerMonths, buildMonthHeaders(get(dateRange)));
  });
  legacy_pre_effect(() => get(dateRange), () => {
    set(dayHeaders, buildDayHeaders(get(dateRange)));
  });
  legacy_pre_effect(() => deep_read_state(tasks()), () => {
    set(rows, buildRows(tasks()));
  });
  legacy_pre_effect(() => get(dateRange), () => {
    set(todayIdx, (() => {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return Math.floor((today.getTime() - get(dateRange).start.getTime()) / 864e5);
    })());
  });
  legacy_pre_effect_reset();
  init();
  var div = root$2();
  var div_1 = child(div);
  var div_2 = sibling(child(div_1), 2);
  each(div_2, 5, () => get(rows), (row) => row.id, ($$anchor2, row) => {
    var div_3 = root_1$2();
    let classes;
    var node = child(div_3);
    {
      var consequent_1 = ($$anchor3) => {
        const task = /* @__PURE__ */ derived_safe_equal(() => (deep_read_state(tasks()), get(row), untrack(() => tasks().find((t) => t.id === get(row).id))));
        var fragment = comment();
        var node_1 = first_child(fragment);
        {
          var consequent = ($$anchor4) => {
            var button = root_3$2();
            var text = child(button);
            template_effect(($0) => set_text(text, $0), [
              () => (get(expanded), get(row), untrack(() => get(expanded).has(get(row).id) ? "▾" : "▸"))
            ]);
            event("click", button, () => toggleExpand(get(row).id));
            append($$anchor4, button);
          };
          var alternate = ($$anchor4) => {
            var span_1 = root_4$1();
            append($$anchor4, span_1);
          };
          if_block(node_1, ($$render) => {
            if (deep_read_state(get(task)), untrack(() => get(task) && get(task).subtasks.length > 0)) $$render(consequent);
            else $$render(alternate, false);
          });
        }
        append($$anchor3, fragment);
      };
      var alternate_1 = ($$anchor3) => {
        var span_2 = root_5();
        append($$anchor3, span_2);
      };
      if_block(node, ($$render) => {
        if (get(row), untrack(() => !get(row).isSubtask)) $$render(consequent_1);
        else $$render(alternate_1, false);
      });
    }
    var span_3 = sibling(node, 2);
    var text_1 = child(span_3);
    var span_4 = sibling(span_3, 2);
    template_effect(() => {
      classes = set_class(div_3, 1, "gantt-left-row svelte-152mm6m", null, classes, { "subtask-row": get(row).isSubtask });
      set_style(div_3, `height:40px; padding-left:${(get(row), untrack(() => 8 + get(row).depth * 18)) ?? ""}px`);
      set_attribute(span_3, "title", (get(row), untrack(() => get(row).title)));
      set_text(text_1, (get(row), untrack(() => get(row).title)));
      set_style(span_4, `background:${(get(row), untrack(() => statusColors[get(row).status] ?? "#888")) ?? ""}`);
    });
    event("click", span_3, () => onOpenTask()(get(row).filePath));
    event("keydown", span_3, (e) => e.key === "Enter" && onOpenTask()(get(row).filePath));
    append($$anchor2, div_3);
  });
  bind_this(div_2, ($$value) => set(leftRowsEl, $$value), () => get(leftRowsEl));
  var div_4 = sibling(div_1, 2);
  var div_5 = child(div_4);
  var div_6 = child(div_5);
  each(div_6, 5, () => get(headerMonths), index, ($$anchor2, m) => {
    var div_7 = root_6();
    var text_2 = child(div_7);
    template_effect(() => {
      set_style(div_7, `width:${(get(m), untrack(() => get(m).span * DAY_WIDTH)) ?? ""}px`);
      set_text(text_2, (get(m), untrack(() => get(m).label)));
    });
    append($$anchor2, div_7);
  });
  var div_8 = sibling(div_6, 2);
  each(div_8, 5, () => get(dayHeaders), index, ($$anchor2, dh) => {
    var div_9 = root_7();
    let classes_1;
    set_style(div_9, "width:32px");
    var text_3 = child(div_9);
    template_effect(() => {
      classes_1 = set_class(div_9, 1, "gantt-day-cell svelte-152mm6m", null, classes_1, { weekend: get(dh).isWeekend, "today-col": get(dh).isToday });
      set_text(text_3, (get(dh), untrack(() => get(dh).day)));
    });
    append($$anchor2, div_9);
  });
  var div_10 = sibling(div_8, 2);
  var node_2 = child(div_10);
  {
    var consequent_2 = ($$anchor2) => {
      var div_11 = root_8();
      template_effect(() => set_style(div_11, `left:${get(todayIdx) * DAY_WIDTH + DAY_WIDTH / 2}px; height:${(get(rows), untrack(() => get(rows).length * ROW_HEIGHT)) ?? ""}px`));
      append($$anchor2, div_11);
    };
    if_block(node_2, ($$render) => {
      if (get(todayIdx), get(dateRange), untrack(() => get(todayIdx) >= 0 && get(todayIdx) < get(dateRange).days)) $$render(consequent_2);
    });
  }
  var node_3 = sibling(node_2, 2);
  each(node_3, 1, () => get(rows), (row) => row.id, ($$anchor2, row) => {
    var div_12 = root_9();
    set_style(div_12, "height:40px");
    var node_4 = child(div_12);
    each(node_4, 1, () => get(dayHeaders), index, ($$anchor3, dh, i) => {
      var div_13 = root_10();
      let classes_2;
      set_style(div_13, "width:32px");
      template_effect(() => classes_2 = set_class(div_13, 1, "gantt-grid-cell svelte-152mm6m", null, classes_2, { weekend: get(dh).isWeekend, "today-col": get(dh).isToday }));
      event("click", div_13, () => onCellClick(get(row), i));
      append($$anchor3, div_13);
    });
    var node_5 = sibling(node_4, 2);
    {
      var consequent_3 = ($$anchor3) => {
        const bar = /* @__PURE__ */ derived_safe_equal(() => (get(row), untrack(() => getBar(get(row)))));
        var div_14 = root_11();
        var div_15 = child(div_14);
        var span_5 = sibling(div_15, 2);
        var text_4 = child(span_5);
        var div_16 = sibling(span_5, 2);
        template_effect(() => {
          set_style(div_14, `left:${(deep_read_state(get(bar)), untrack(() => get(bar).startDay * DAY_WIDTH)) ?? ""}px; width:${(deep_read_state(get(bar)), untrack(() => (get(bar).endDay - get(bar).startDay + 1) * DAY_WIDTH)) ?? ""}px; background:${(get(row), untrack(() => statusColors[get(row).status] ?? "#6bb6ff")) ?? ""}; top:8px;`);
          set_text(text_4, (get(row), untrack(() => get(row).title)));
        });
        event("mousedown", div_15, (e) => onBarMouseDown(get(row), "resize-start", e));
        event("mousedown", div_16, (e) => onBarMouseDown(get(row), "resize-end", e));
        event("mousedown", div_14, (e) => onBarMouseDown(get(row), "move", e));
        append($$anchor3, div_14);
      };
      var d_1 = /* @__PURE__ */ user_derived(() => (get(row), untrack(() => getBar(get(row)))));
      if_block(node_5, ($$render) => {
        if (get(d_1)) $$render(consequent_3);
      });
    }
    append($$anchor2, div_12);
  });
  bind_this(div_4, ($$value) => set(rightPanelEl, $$value), () => get(rightPanelEl));
  template_effect(() => set_style(div_5, `width:${(get(dateRange), untrack(() => get(dateRange).days * DAY_WIDTH)) ?? ""}px`));
  event("scroll", div_4, syncScroll);
  append($$anchor, div);
  pop();
}
var root_1$1 = /* @__PURE__ */ from_html(`<span class="parent-label svelte-1gmf2hi"> </span>`);
var root_2$1 = /* @__PURE__ */ from_html(`<span class="error-msg svelte-1gmf2hi"> </span>`);
var root_3$1 = /* @__PURE__ */ from_html(`<span class="error-msg svelte-1gmf2hi"> </span>`);
var root$1 = /* @__PURE__ */ from_html(`<div class="task-modal-overlay svelte-1gmf2hi" role="dialog" aria-modal="true" tabindex="-1"><div class="task-modal svelte-1gmf2hi"><div class="modal-header svelte-1gmf2hi"><h2 class="svelte-1gmf2hi"> </h2> <!> <button class="close-btn svelte-1gmf2hi" aria-label="Close">✕</button></div> <div class="modal-body svelte-1gmf2hi"><div class="form-row svelte-1gmf2hi"><label for="task-title" class="svelte-1gmf2hi">Title <span class="required svelte-1gmf2hi">*</span></label> <input id="task-title" placeholder="Task title..."/> <!></div> <div class="form-row-inline svelte-1gmf2hi"><div class="form-row svelte-1gmf2hi"><label for="task-status" class="svelte-1gmf2hi">Status</label> <select id="task-status" class="svelte-1gmf2hi"><option>To Do</option><option>In Progress</option><option>Blocked</option><option>Done</option></select></div> <div class="form-row svelte-1gmf2hi"><label for="task-priority" class="svelte-1gmf2hi">Priority</label> <select id="task-priority" class="svelte-1gmf2hi"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div></div> <div class="form-row-inline svelte-1gmf2hi"><div class="form-row svelte-1gmf2hi"><label for="task-start" class="svelte-1gmf2hi">Start date</label> <input id="task-start" type="date" class="svelte-1gmf2hi"/></div> <div class="form-row svelte-1gmf2hi"><label for="task-end" class="svelte-1gmf2hi">End date</label> <input id="task-end" type="date"/> <!></div></div> <div class="form-row svelte-1gmf2hi"><label for="task-assignee" class="svelte-1gmf2hi">Assignee</label> <input id="task-assignee" placeholder="@name" class="svelte-1gmf2hi"/></div> <div class="form-row svelte-1gmf2hi"><label for="task-tags" class="svelte-1gmf2hi">Tags <span class="hint svelte-1gmf2hi">(comma separated)</span></label> <input id="task-tags" placeholder="design, backend, urgent" class="svelte-1gmf2hi"/></div> <div class="form-row svelte-1gmf2hi"><label for="task-desc" class="svelte-1gmf2hi">Description</label> <textarea id="task-desc" rows="3" placeholder="Optional description..." class="svelte-1gmf2hi"></textarea></div></div> <div class="modal-footer svelte-1gmf2hi"><button class="btn-secondary svelte-1gmf2hi">Cancel</button> <button class="btn-primary svelte-1gmf2hi"> </button></div></div></div>`);
function TaskModal($$anchor, $$props) {
  push($$props, false);
  let parentId = prop($$props, "parentId", 8, null);
  let parentTitle = prop($$props, "parentTitle", 8, "");
  let onSubmit = prop($$props, "onSubmit", 8, () => {
  });
  let onCancel = prop($$props, "onCancel", 8, () => {
  });
  let title = /* @__PURE__ */ mutable_source("");
  let status = /* @__PURE__ */ mutable_source("todo");
  let priority = /* @__PURE__ */ mutable_source("medium");
  let startDate = /* @__PURE__ */ mutable_source("");
  let endDate = /* @__PURE__ */ mutable_source("");
  let assignee = /* @__PURE__ */ mutable_source("");
  let tags = /* @__PURE__ */ mutable_source("");
  let description = /* @__PURE__ */ mutable_source("");
  let errors = /* @__PURE__ */ mutable_source({});
  function validate() {
    set(errors, {});
    if (!get(title).trim()) mutate(errors, get(errors).title = "Title is required");
    if (get(startDate) && get(endDate) && get(endDate) < get(startDate)) {
      mutate(errors, get(errors).endDate = "End date must be after start date");
    }
    return Object.keys(get(errors)).length === 0;
  }
  function submit() {
    if (!validate()) return;
    onSubmit()({
      title: get(title).trim(),
      status: get(status),
      priority: get(priority),
      startDate: get(startDate),
      endDate: get(endDate),
      assignee: get(assignee),
      tags: get(tags),
      description: get(description)
    });
  }
  init();
  var div = root$1();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var h2 = child(div_2);
  var text = child(h2);
  var node = sibling(h2, 2);
  {
    var consequent = ($$anchor2) => {
      var span = root_1$1();
      var text_1 = child(span);
      template_effect(() => set_text(text_1, `under: ${parentTitle() ?? ""}`));
      append($$anchor2, span);
    };
    if_block(node, ($$render) => {
      if (parentId()) $$render(consequent);
    });
  }
  var button = sibling(node, 2);
  var div_3 = sibling(div_2, 2);
  var div_4 = child(div_3);
  var input = sibling(child(div_4), 2);
  let classes;
  var node_1 = sibling(input, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var span_1 = root_2$1();
      var text_2 = child(span_1);
      template_effect(() => set_text(text_2, (get(errors), untrack(() => get(errors).title))));
      append($$anchor2, span_1);
    };
    if_block(node_1, ($$render) => {
      if (get(errors), untrack(() => get(errors).title)) $$render(consequent_1);
    });
  }
  var div_5 = sibling(div_4, 2);
  var div_6 = child(div_5);
  var select = sibling(child(div_6), 2);
  var option = child(select);
  option.value = option.__value = "todo";
  var option_1 = sibling(option);
  option_1.value = option_1.__value = "in-progress";
  var option_2 = sibling(option_1);
  option_2.value = option_2.__value = "blocked";
  var option_3 = sibling(option_2);
  option_3.value = option_3.__value = "done";
  var div_7 = sibling(div_6, 2);
  var select_1 = sibling(child(div_7), 2);
  var option_4 = child(select_1);
  option_4.value = option_4.__value = "low";
  var option_5 = sibling(option_4);
  option_5.value = option_5.__value = "medium";
  var option_6 = sibling(option_5);
  option_6.value = option_6.__value = "high";
  var option_7 = sibling(option_6);
  option_7.value = option_7.__value = "critical";
  var div_8 = sibling(div_5, 2);
  var div_9 = child(div_8);
  var input_1 = sibling(child(div_9), 2);
  var div_10 = sibling(div_9, 2);
  var input_2 = sibling(child(div_10), 2);
  let classes_1;
  var node_2 = sibling(input_2, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var span_2 = root_3$1();
      var text_3 = child(span_2);
      template_effect(() => set_text(text_3, (get(errors), untrack(() => get(errors).endDate))));
      append($$anchor2, span_2);
    };
    if_block(node_2, ($$render) => {
      if (get(errors), untrack(() => get(errors).endDate)) $$render(consequent_2);
    });
  }
  var div_11 = sibling(div_8, 2);
  var input_3 = sibling(child(div_11), 2);
  var div_12 = sibling(div_11, 2);
  var input_4 = sibling(child(div_12), 2);
  var div_13 = sibling(div_12, 2);
  var textarea = sibling(child(div_13), 2);
  var div_14 = sibling(div_3, 2);
  var button_1 = child(div_14);
  var button_2 = sibling(button_1, 2);
  var text_4 = child(button_2);
  template_effect(() => {
    set_text(text, parentId() ? `New Subtask` : "New Task");
    classes = set_class(input, 1, "svelte-1gmf2hi", null, classes, { error: get(errors).title });
    classes_1 = set_class(input_2, 1, "svelte-1gmf2hi", null, classes_1, { error: get(errors).endDate });
    set_text(text_4, parentId() ? "Create Subtask" : "Create Task");
  });
  event("click", button, function(...$$args) {
    onCancel()?.apply(this, $$args);
  });
  bind_value(input, () => get(title), ($$value) => set(title, $$value));
  event("keydown", input, (e) => e.key === "Enter" && submit());
  bind_select_value(select, () => get(status), ($$value) => set(status, $$value));
  bind_select_value(select_1, () => get(priority), ($$value) => set(priority, $$value));
  bind_value(input_1, () => get(startDate), ($$value) => set(startDate, $$value));
  bind_value(input_2, () => get(endDate), ($$value) => set(endDate, $$value));
  bind_value(input_3, () => get(assignee), ($$value) => set(assignee, $$value));
  bind_value(input_4, () => get(tags), ($$value) => set(tags, $$value));
  bind_value(textarea, () => get(description), ($$value) => set(description, $$value));
  event("click", button_1, function(...$$args) {
    onCancel()?.apply(this, $$args);
  });
  event("click", button_2, submit);
  event("click", div, self(function(...$$args) {
    onCancel()?.apply(this, $$args);
  }));
  event("keydown", div, (e) => e.key === "Escape" && onCancel()());
  append($$anchor, div);
  pop();
}
var root_1 = /* @__PURE__ */ from_html(`<button> </button>`);
var root_2 = /* @__PURE__ */ from_html(`<span class="no-projects svelte-gjpmyc">No projects found in your projects folder.</span>`);
var root_3 = /* @__PURE__ */ from_html(`<button class="btn-add svelte-gjpmyc">+ New Task</button>`);
var root_4 = /* @__PURE__ */ from_html(`<div class="empty-state svelte-gjpmyc"><div class="empty-icon svelte-gjpmyc">📁</div> <p>No project selected. Create a folder inside your configured projects folder to get started.</p></div>`);
var root = /* @__PURE__ */ from_html(`<div class="project-view svelte-gjpmyc"><div class="topbar svelte-gjpmyc"><div class="project-selector svelte-gjpmyc"><span class="topbar-label svelte-gjpmyc">Project:</span> <!> <!></div> <div class="view-switcher svelte-gjpmyc"><button title="Gantt Chart">📊 Gantt</button> <button title="Kanban Board">🗂 Kanban</button></div> <div class="topbar-actions svelte-gjpmyc"><!> <button class="btn-refresh svelte-gjpmyc" title="Refresh">↺</button></div></div> <div class="view-container svelte-gjpmyc"><!></div></div> <!>`, 1);
function ProjectView($$anchor, $$props) {
  push($$props, false);
  const currentProject = /* @__PURE__ */ mutable_source();
  const currentTasks = /* @__PURE__ */ mutable_source();
  let projects = prop($$props, "projects", 24, () => []);
  let activeProjectIndex = prop($$props, "activeProjectIndex", 12, 0);
  let viewMode = prop($$props, "viewMode", 12, "gantt");
  let onCreateTask = prop($$props, "onCreateTask", 8);
  let onStatusChange = prop($$props, "onStatusChange", 8);
  let onDateChange = prop($$props, "onDateChange", 8);
  let onOpenTask = prop($$props, "onOpenTask", 8);
  let onRefresh = prop($$props, "onRefresh", 8);
  let onViewModeChange = prop($$props, "onViewModeChange", 8, () => {
  });
  let onActiveProjectChange = prop($$props, "onActiveProjectChange", 8, () => {
  });
  function setViewMode(mode) {
    viewMode(mode);
    onViewModeChange()(mode);
  }
  function setActiveProject(idx) {
    activeProjectIndex(idx);
    onActiveProjectChange()(idx);
  }
  let showModal = /* @__PURE__ */ mutable_source(false);
  let modalParentId = /* @__PURE__ */ mutable_source(null);
  let modalParentTitle = /* @__PURE__ */ mutable_source("");
  function openNewTaskModal(parentId = null, parentTitle = "") {
    set(modalParentId, parentId);
    set(modalParentTitle, parentTitle);
    set(showModal, true);
  }
  async function handleModalSubmit(data) {
    set(showModal, false);
    const project = projects()[activeProjectIndex()];
    if (!project) return;
    await onCreateTask()(project.folderPath, data.title, get(modalParentId), {
      status: data.status,
      priority: data.priority,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      assignee: data.assignee,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      description: data.description
    });
    await onRefresh()();
  }
  legacy_pre_effect(
    () => (deep_read_state(projects()), deep_read_state(activeProjectIndex())),
    () => {
      set(currentProject, projects()[activeProjectIndex()] ?? null);
    }
  );
  legacy_pre_effect(() => get(currentProject), () => {
    set(currentTasks, get(currentProject)?.tasks ?? []);
  });
  legacy_pre_effect_reset();
  init();
  var fragment = root();
  var div = first_child(fragment);
  var div_1 = child(div);
  var div_2 = child(div_1);
  var node = sibling(child(div_2), 2);
  each(node, 1, projects, index, ($$anchor2, proj, i) => {
    var button = root_1();
    let classes;
    var text = child(button);
    template_effect(() => {
      classes = set_class(button, 1, "project-tab svelte-gjpmyc", null, classes, { active: i === activeProjectIndex() });
      set_text(text, `📁 ${(get(proj), untrack(() => get(proj).name)) ?? ""}`);
    });
    event("click", button, () => setActiveProject(i));
    append($$anchor2, button);
  });
  var node_1 = sibling(node, 2);
  {
    var consequent = ($$anchor2) => {
      var span = root_2();
      append($$anchor2, span);
    };
    if_block(node_1, ($$render) => {
      if (deep_read_state(projects()), untrack(() => projects().length === 0)) $$render(consequent);
    });
  }
  var div_3 = sibling(div_2, 2);
  var button_1 = child(div_3);
  let classes_1;
  var button_2 = sibling(button_1, 2);
  let classes_2;
  var div_4 = sibling(div_3, 2);
  var node_2 = child(div_4);
  {
    var consequent_1 = ($$anchor2) => {
      var button_3 = root_3();
      event("click", button_3, () => openNewTaskModal(null));
      append($$anchor2, button_3);
    };
    if_block(node_2, ($$render) => {
      if (get(currentProject)) $$render(consequent_1);
    });
  }
  var button_4 = sibling(node_2, 2);
  var div_5 = sibling(div_1, 2);
  var node_3 = child(div_5);
  {
    var consequent_2 = ($$anchor2) => {
      var div_6 = root_4();
      append($$anchor2, div_6);
    };
    var consequent_3 = ($$anchor2) => {
      GanttChart($$anchor2, {
        get tasks() {
          return get(currentTasks);
        },
        get onOpenTask() {
          return onOpenTask();
        },
        onDateChange: (taskId, startDate, endDate) => onDateChange()(get(currentProject).folderPath, taskId, startDate, endDate)
      });
    };
    var alternate = ($$anchor2) => {
      KanbanBoard($$anchor2, {
        get tasks() {
          return get(currentTasks);
        },
        get onOpenTask() {
          return onOpenTask();
        },
        onStatusChange: (taskId, newStatus) => onStatusChange()(get(currentProject).folderPath, taskId, newStatus)
      });
    };
    if_block(node_3, ($$render) => {
      if (!get(currentProject)) $$render(consequent_2);
      else if (viewMode() === "gantt") $$render(consequent_3, 1);
      else $$render(alternate, false);
    });
  }
  var node_4 = sibling(div, 2);
  {
    var consequent_4 = ($$anchor2) => {
      TaskModal($$anchor2, {
        get parentId() {
          return get(modalParentId);
        },
        get parentTitle() {
          return get(modalParentTitle);
        },
        onSubmit: handleModalSubmit,
        onCancel: () => set(showModal, false)
      });
    };
    if_block(node_4, ($$render) => {
      if (get(showModal)) $$render(consequent_4);
    });
  }
  template_effect(() => {
    classes_1 = set_class(button_1, 1, "view-btn svelte-gjpmyc", null, classes_1, { active: viewMode() === "gantt" });
    classes_2 = set_class(button_2, 1, "view-btn svelte-gjpmyc", null, classes_2, { active: viewMode() === "kanban" });
  });
  event("click", button_1, () => setViewMode("gantt"));
  event("click", button_2, () => setViewMode("kanban"));
  event("click", button_4, function(...$$args) {
    onRefresh()?.apply(this, $$args);
  });
  append($$anchor, fragment);
  pop();
}
const GANTT_VIEW_TYPE = "obsidian-gantt-view";
class GanttView extends obsidian.ItemView {
  plugin;
  svelteComponent = null;
  projects = [];
  activeProjectIndex = 0;
  viewMode = "gantt";
  /** Prevent vault-event re-renders during our own programmatic writes */
  _writing = false;
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return GANTT_VIEW_TYPE;
  }
  getDisplayText() {
    return "Project Board";
  }
  getIcon() {
    return "layout-dashboard";
  }
  async onOpen() {
    this.projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    this.mountSvelte();
    this.registerEvent(
      this.app.vault.on("create", () => {
        if (!this._writing) this.refresh();
      })
    );
    this.registerEvent(
      this.app.vault.on("modify", () => {
        if (!this._writing) this.refresh();
      })
    );
    this.registerEvent(
      this.app.vault.on("delete", () => {
        if (!this._writing) this.refresh();
      })
    );
    this.registerEvent(
      this.app.vault.on("rename", () => {
        if (!this._writing) this.refresh();
      })
    );
  }
  async onClose() {
    if (this.svelteComponent) {
      unmount(this.svelteComponent);
      this.svelteComponent = null;
    }
  }
  mountSvelte() {
    if (this.svelteComponent) {
      unmount(this.svelteComponent);
      this.svelteComponent = null;
    }
    const container = this.containerEl.children[1];
    container.empty();
    container.style.padding = "0";
    container.style.overflow = "hidden";
    this.svelteComponent = mount(ProjectView, {
      target: container,
      props: {
        projects: this.projects,
        activeProjectIndex: this.activeProjectIndex,
        viewMode: this.viewMode,
        onCreateTask: this.handleCreateTask.bind(this),
        onStatusChange: this.handleStatusChange.bind(this),
        onDateChange: this.handleDateChange.bind(this),
        onOpenTask: this.handleOpenTask.bind(this),
        onRefresh: this.refresh.bind(this),
        onViewModeChange: (mode) => {
          this.viewMode = mode;
        },
        onActiveProjectChange: (idx) => {
          this.activeProjectIndex = idx;
        }
      }
    });
  }
  async refresh() {
    this.projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    this.mountSvelte();
  }
  handleOpenTask(filePath) {
    const file = this.app.vault.getFileByPath(filePath);
    if (file) {
      this.app.workspace.getLeaf(false).openFile(file);
    }
  }
  async handleCreateTask(projectFolder, title, parentId, extra) {
    await createTaskNote(this.app, projectFolder, title, parentId, extra);
  }
  async handleStatusChange(projectFolder, taskId, newStatus) {
    const task = this.findTaskById(taskId);
    if (!task) return;
    const file = this.app.vault.getFileByPath(task.filePath);
    if (!file) return;
    this._writing = true;
    try {
      await updateTaskField(this.app, file, "status", newStatus);
    } finally {
      this._writing = false;
    }
    await this.refresh();
  }
  async handleDateChange(projectFolder, taskId, startDate, endDate) {
    const task = this.findTaskById(taskId);
    if (!task) return;
    const file = this.app.vault.getFileByPath(task.filePath);
    if (!file) return;
    this._writing = true;
    try {
      await updateTaskField(this.app, file, "start_date", startDate);
      await updateTaskField(this.app, file, "end_date", endDate);
    } finally {
      this._writing = false;
    }
    await this.refresh();
  }
  findTaskById(id) {
    for (const proj of this.projects) {
      for (const task of proj.tasks) {
        if (task.id === id) return task;
        for (const sub of task.subtasks) {
          if (sub.id === id) return sub;
        }
      }
    }
    return null;
  }
}
class GanttPlugin extends obsidian.Plugin {
  settings = DEFAULT_SETTINGS;
  async onload() {
    await this.loadSettings();
    this.registerView(GANTT_VIEW_TYPE, (leaf) => new GanttView(leaf, this));
    this.addRibbonIcon("layout-dashboard", "Open Project Board", async () => {
      await this.activateView();
    });
    this.addCommand({
      id: "open-project-board",
      name: "Open Project Board",
      callback: async () => {
        await this.activateView();
      }
    });
    this.addSettingTab(new GanttSettingTab(this.app, this));
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(GANTT_VIEW_TYPE);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(GANTT_VIEW_TYPE)[0];
    if (!leaf) {
      leaf = workspace.getLeaf(false);
      await leaf.setViewState({ type: GANTT_VIEW_TYPE, active: true });
    }
    workspace.revealLeaf(leaf);
  }
}
module.exports = GanttPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2VzbS1lbnYvZmFsc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9zaGFyZWQvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvY29uc3RhbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2Vycm9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2NvbnN0YW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC93YXJuaW5ncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L2VxdWFsaXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvZmxhZ3MvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9lcnJvci1oYW5kbGluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3N0YXR1cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvYmF0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9yZWFjdGl2aXR5L2NyZWF0ZS1zdWJzY3JpYmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3MvYm91bmRhcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L2Rlcml2ZWRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvc291cmNlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9wcm94eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vb3BlcmF0aW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvbWlzYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvYmluZGluZ3Mvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvZWZmZWN0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2V2ZW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vcmVjb25jaWxlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vdGVtcGxhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvcmVuZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3MvYnJhbmNoZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9pZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vYmxvY2tzL2VhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9zaGFyZWQvYXR0cmlidXRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvY2xhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL3N0eWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy9zZWxlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2F0dHJpYnV0ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2JpbmRpbmdzL2lucHV0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy90aGlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9sZWdhY3kvZXZlbnQtbW9kaWZpZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9sZWdhY3kvbGlmZWN5Y2xlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvc3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9wcm9wcy5qcyIsIi4uL3NyYy90eXBlcy50cyIsIi4uL3NyYy9zZXR0aW5ncy50cyIsIi4uL3NyYy9uYW5vaWQudHMiLCIuLi9zcmMvdGFza1V0aWxzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvdmVyc2lvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2Rpc2Nsb3NlLXZlcnNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9mbGFncy9sZWdhY3kuanMiLCIuLi9zcmMvY29tcG9uZW50cy9LYW5iYW5Cb2FyZC5zdmVsdGUiLCIuLi9zcmMvY29tcG9uZW50cy9HYW50dENoYXJ0LnN2ZWx0ZSIsIi4uL3NyYy9jb21wb25lbnRzL1Rhc2tNb2RhbC5zdmVsdGUiLCIuLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0Vmlldy5zdmVsdGUiLCIuLi9zcmMvdmlldy50cyIsIi4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZhbHNlO1xuIiwiLy8gU3RvcmUgdGhlIHJlZmVyZW5jZXMgdG8gZ2xvYmFscyBpbiBjYXNlIHNvbWVvbmUgdHJpZXMgdG8gbW9ua2V5IHBhdGNoIHRoZXNlLCBjYXVzaW5nIHRoZSBiZWxvd1xuLy8gdG8gZGUtb3B0ICh0aGlzIG9jY3VycyBvZnRlbiB3aGVuIHVzaW5nIHBvcHVsYXIgZXh0ZW5zaW9ucykuXG5leHBvcnQgdmFyIGlzX2FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmV4cG9ydCB2YXIgaW5kZXhfb2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbmV4cG9ydCB2YXIgaW5jbHVkZXMgPSBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXM7XG5leHBvcnQgdmFyIGFycmF5X2Zyb20gPSBBcnJheS5mcm9tO1xuZXhwb3J0IHZhciBvYmplY3Rfa2V5cyA9IE9iamVjdC5rZXlzO1xuZXhwb3J0IHZhciBkZWZpbmVfcHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5leHBvcnQgdmFyIGdldF9kZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmV4cG9ydCB2YXIgZ2V0X2Rlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7XG5leHBvcnQgdmFyIG9iamVjdF9wcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuZXhwb3J0IHZhciBhcnJheV9wcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5leHBvcnQgdmFyIGdldF9wcm90b3R5cGVfb2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5leHBvcnQgdmFyIGlzX2V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuZXhwb3J0IHZhciBoYXNfb3duX3Byb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gdGhpbmdcbiAqIEByZXR1cm5zIHt0aGluZyBpcyBGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG5cdHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBjb25zdCBub29wID0gKCkgPT4ge307XG5cbi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdGhlbi9pcy1wcm9taXNlL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBNSVQgTGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vdGhlbi9pcy1wcm9taXNlL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcblxuLyoqXG4gKiBAdGVtcGxhdGUgW1Q9YW55XVxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJucyB7dmFsdWUgaXMgUHJvbWlzZUxpa2U8VD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWU/LnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bihmbikge1xuXHRyZXR1cm4gZm4oKTtcbn1cblxuLyoqIEBwYXJhbSB7QXJyYXk8KCkgPT4gdm9pZD59IGFyciAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bl9hbGwoYXJyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0YXJyW2ldKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUT0RPIHJlcGxhY2Ugd2l0aCBQcm9taXNlLndpdGhSZXNvbHZlcnMgb25jZSBzdXBwb3J0ZWQgd2lkZWx5IGVub3VnaFxuICogQHRlbXBsYXRlIFtUPXZvaWRdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZlcnJlZCgpIHtcblx0LyoqIEB0eXBlIHsodmFsdWU6IFQpID0+IHZvaWR9ICovXG5cdHZhciByZXNvbHZlO1xuXG5cdC8qKiBAdHlwZSB7KHJlYXNvbjogYW55KSA9PiB2b2lkfSAqL1xuXHR2YXIgcmVqZWN0O1xuXG5cdC8qKiBAdHlwZSB7UHJvbWlzZTxUPn0gKi9cblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblx0XHRyZXNvbHZlID0gcmVzO1xuXHRcdHJlamVjdCA9IHJlajtcblx0fSk7XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRyZXR1cm4geyBwcm9taXNlLCByZXNvbHZlLCByZWplY3QgfTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtWfSB2YWx1ZVxuICogQHBhcmFtIHtWIHwgKCgpID0+IFYpfSBmYWxsYmFja1xuICogQHBhcmFtIHtib29sZWFufSBbbGF6eV1cbiAqIEByZXR1cm5zIHtWfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmFsbGJhY2sodmFsdWUsIGZhbGxiYWNrLCBsYXp5ID0gZmFsc2UpIHtcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWRcblx0XHQ/IGxhenlcblx0XHRcdD8gLyoqIEB0eXBlIHsoKSA9PiBWfSAqLyAoZmFsbGJhY2spKClcblx0XHRcdDogLyoqIEB0eXBlIHtWfSAqLyAoZmFsbGJhY2spXG5cdFx0OiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBXaGVuIGVuY291bnRlcmluZyBhIHNpdHVhdGlvbiBsaWtlIGBsZXQgW2EsIGIsIGNdID0gJGRlcml2ZWQoYmxhaCgpKWAsXG4gKiB3ZSBuZWVkIHRvIHN0YXNoIGFuIGludGVybWVkaWF0ZSB2YWx1ZSB0aGF0IGBhYCwgYGJgLCBhbmQgYGNgIGRlcml2ZVxuICogZnJvbSwgaW4gY2FzZSBpdCdzIGFuIGl0ZXJhYmxlXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtBcnJheUxpa2U8VD4gfCBJdGVyYWJsZTxUPn0gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbl1cbiAqIEByZXR1cm5zIHtBcnJheTxUPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvX2FycmF5KHZhbHVlLCBuKSB7XG5cdC8vIHJldHVybiBhcnJheXMgdW5jaGFuZ2VkXG5cdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdC8vIGlmIHZhbHVlIGlzIG5vdCBpdGVyYWJsZSwgb3IgYG5gIGlzIHVuc3BlY2lmaWVkIChpbmRpY2F0ZXMgYSByZXN0XG5cdC8vIGVsZW1lbnQsIHdoaWNoIG1lYW5zIHdlJ3JlIG5vdCBjb25jZXJuZWQgYWJvdXQgdW5ib3VuZGVkIGl0ZXJhYmxlcylcblx0Ly8gY29udmVydCB0byBhbiBhcnJheSB3aXRoIGBBcnJheS5mcm9tYFxuXHRpZiAobiA9PT0gdW5kZWZpbmVkIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbHVlKSkge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcblx0fVxuXG5cdC8vIG90aGVyd2lzZSwgcG9wdWxhdGUgYW4gYXJyYXkgd2l0aCBgbmAgdmFsdWVzXG5cblx0LyoqIEB0eXBlIHtUW119ICovXG5cdGNvbnN0IGFycmF5ID0gW107XG5cblx0Zm9yIChjb25zdCBlbGVtZW50IG9mIHZhbHVlKSB7XG5cdFx0YXJyYXkucHVzaChlbGVtZW50KTtcblx0XHRpZiAoYXJyYXkubGVuZ3RoID09PSBuKSBicmVhaztcblx0fVxuXG5cdHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+fSBvYmpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nIHwgc3ltYm9sPn0ga2V5c1xuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhjbHVkZV9mcm9tX29iamVjdChvYmosIGtleXMpIHtcblx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPn0gKi9cblx0dmFyIHJlc3VsdCA9IHt9O1xuXG5cdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRpZiAoIWtleXMuaW5jbHVkZXMoa2V5KSkge1xuXHRcdFx0cmVzdWx0W2tleV0gPSBvYmpba2V5XTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKHZhciBzeW1ib2wgb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKSB7XG5cdFx0aWYgKE9iamVjdC5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltYm9sKSAmJiAha2V5cy5pbmNsdWRlcyhzeW1ib2wpKSB7XG5cdFx0XHRyZXN1bHRbc3ltYm9sXSA9IG9ialtzeW1ib2xdO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG4iLCIvLyBHZW5lcmFsIGZsYWdzXG5leHBvcnQgY29uc3QgREVSSVZFRCA9IDEgPDwgMTtcbmV4cG9ydCBjb25zdCBFRkZFQ1QgPSAxIDw8IDI7XG5leHBvcnQgY29uc3QgUkVOREVSX0VGRkVDVCA9IDEgPDwgMztcbi8qKlxuICogQW4gZWZmZWN0IHRoYXQgZG9lcyBub3QgZGVzdHJveSBpdHMgY2hpbGQgZWZmZWN0cyB3aGVuIGl0IHJlcnVucy5cbiAqIFJ1bnMgYXMgcGFydCBvZiByZW5kZXIgZWZmZWN0cywgaS5lLiBub3QgZWFnZXJseSBhcyBwYXJ0IG9mIHRyZWUgdHJhdmVyc2FsIG9yIGVmZmVjdCBmbHVzaGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BTkFHRURfRUZGRUNUID0gMSA8PCAyNDtcbi8qKlxuICogQW4gZWZmZWN0IHRoYXQgZG9lcyBub3QgZGVzdHJveSBpdHMgY2hpbGQgZWZmZWN0cyB3aGVuIGl0IHJlcnVucyAobGlrZSBNQU5BR0VEX0VGRkVDVCkuXG4gKiBSdW5zIGVhZ2VybHkgYXMgcGFydCBvZiB0cmVlIHRyYXZlcnNhbCBvciBlZmZlY3QgZmx1c2hpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBCTE9DS19FRkZFQ1QgPSAxIDw8IDQ7XG5leHBvcnQgY29uc3QgQlJBTkNIX0VGRkVDVCA9IDEgPDwgNTtcbmV4cG9ydCBjb25zdCBST09UX0VGRkVDVCA9IDEgPDwgNjtcbmV4cG9ydCBjb25zdCBCT1VOREFSWV9FRkZFQ1QgPSAxIDw8IDc7XG4vKipcbiAqIEluZGljYXRlcyB0aGF0IGEgcmVhY3Rpb24gaXMgY29ubmVjdGVkIHRvIGFuIGVmZmVjdCByb290IOKAlCBlaXRoZXIgaXQgaXMgYW4gZWZmZWN0LFxuICogb3IgaXQgaXMgYSBkZXJpdmVkIHRoYXQgaXMgZGVwZW5kZWQgb24gYnkgYXQgbGVhc3Qgb25lIGVmZmVjdC4gSWYgYSBkZXJpdmVkIGhhc1xuICogbm8gZGVwZW5kZW50cywgd2UgY2FuIGRpc2Nvbm5lY3QgaXQgZnJvbSB0aGUgZ3JhcGgsIGFsbG93aW5nIGl0IHRvIGVpdGhlciBiZVxuICogR0MnZCBvciByZWNvbm5lY3RlZCBsYXRlciBpZiBhbiBlZmZlY3QgY29tZXMgdG8gZGVwZW5kIG9uIGl0IGFnYWluXG4gKi9cbmV4cG9ydCBjb25zdCBDT05ORUNURUQgPSAxIDw8IDk7XG5leHBvcnQgY29uc3QgQ0xFQU4gPSAxIDw8IDEwO1xuZXhwb3J0IGNvbnN0IERJUlRZID0gMSA8PCAxMTtcbmV4cG9ydCBjb25zdCBNQVlCRV9ESVJUWSA9IDEgPDwgMTI7XG5leHBvcnQgY29uc3QgSU5FUlQgPSAxIDw8IDEzO1xuZXhwb3J0IGNvbnN0IERFU1RST1lFRCA9IDEgPDwgMTQ7XG4vKiogU2V0IG9uY2UgYSByZWFjdGlvbiBoYXMgcnVuIGZvciB0aGUgZmlyc3QgdGltZSAqL1xuZXhwb3J0IGNvbnN0IFJFQUNUSU9OX1JBTiA9IDEgPDwgMTU7XG5cbi8vIEZsYWdzIGV4Y2x1c2l2ZSB0byBlZmZlY3RzXG4vKipcbiAqICdUcmFuc3BhcmVudCcgZWZmZWN0cyBkbyBub3QgY3JlYXRlIGEgdHJhbnNpdGlvbiBib3VuZGFyeS5cbiAqIFRoaXMgaXMgb24gYSBibG9jayBlZmZlY3QgOTklIG9mIHRoZSB0aW1lIGJ1dCBtYXkgYWxzbyBiZSBvbiBhIGJyYW5jaCBlZmZlY3QgaWYgaXRzIHBhcmVudCBibG9jayBlZmZlY3Qgd2FzIHBydW5lZFxuICovXG5leHBvcnQgY29uc3QgRUZGRUNUX1RSQU5TUEFSRU5UID0gMSA8PCAxNjtcbmV4cG9ydCBjb25zdCBFQUdFUl9FRkZFQ1QgPSAxIDw8IDE3O1xuZXhwb3J0IGNvbnN0IEhFQURfRUZGRUNUID0gMSA8PCAxODtcbmV4cG9ydCBjb25zdCBFRkZFQ1RfUFJFU0VSVkVEID0gMSA8PCAxOTtcbmV4cG9ydCBjb25zdCBVU0VSX0VGRkVDVCA9IDEgPDwgMjA7XG5leHBvcnQgY29uc3QgRUZGRUNUX09GRlNDUkVFTiA9IDEgPDwgMjU7XG5cbi8vIEZsYWdzIGV4Y2x1c2l2ZSB0byBkZXJpdmVkc1xuLyoqXG4gKiBUZWxscyB0aGF0IHdlIG1hcmtlZCB0aGlzIGRlcml2ZWQgYW5kIGl0cyByZWFjdGlvbnMgYXMgdmlzaXRlZCBkdXJpbmcgdGhlIFwibWFyayBhcyAobWF5YmUpIGRpcnR5XCItcGhhc2UuXG4gKiBXaWxsIGJlIGxpZnRlZCBkdXJpbmcgZXhlY3V0aW9uIG9mIHRoZSBkZXJpdmVkIGFuZCBkdXJpbmcgY2hlY2tpbmcgaXRzIGRpcnR5IHN0YXRlIChib3RoIGFyZSBuZWNlc3NhcnlcbiAqIGJlY2F1c2UgYSBkZXJpdmVkIG1pZ2h0IGJlIGNoZWNrZWQgYnV0IG5vdCBleGVjdXRlZCkuXG4gKi9cbmV4cG9ydCBjb25zdCBXQVNfTUFSS0VEID0gMSA8PCAxNjtcblxuLy8gRmxhZ3MgdXNlZCBmb3IgYXN5bmNcbmV4cG9ydCBjb25zdCBSRUFDVElPTl9JU19VUERBVElORyA9IDEgPDwgMjE7XG5leHBvcnQgY29uc3QgQVNZTkMgPSAxIDw8IDIyO1xuXG5leHBvcnQgY29uc3QgRVJST1JfVkFMVUUgPSAxIDw8IDIzO1xuXG5leHBvcnQgY29uc3QgU1RBVEVfU1lNQk9MID0gU3ltYm9sKCckc3RhdGUnKTtcbmV4cG9ydCBjb25zdCBMRUdBQ1lfUFJPUFMgPSBTeW1ib2woJ2xlZ2FjeSBwcm9wcycpO1xuZXhwb3J0IGNvbnN0IExPQURJTkdfQVRUUl9TWU1CT0wgPSBTeW1ib2woJycpO1xuZXhwb3J0IGNvbnN0IFBST1hZX1BBVEhfU1lNQk9MID0gU3ltYm9sKCdwcm94eSBwYXRoJyk7XG5cbi8qKiBhbGxvdyB1c2VycyB0byBpZ25vcmUgYWJvcnRlZCBzaWduYWwgZXJyb3JzIGlmIGByZWFzb24ubmFtZSA9PT0gJ1N0YWxlUmVhY3Rpb25FcnJvcmAgKi9cbmV4cG9ydCBjb25zdCBTVEFMRV9SRUFDVElPTiA9IG5ldyAoY2xhc3MgU3RhbGVSZWFjdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRuYW1lID0gJ1N0YWxlUmVhY3Rpb25FcnJvcic7XG5cdG1lc3NhZ2UgPSAnVGhlIHJlYWN0aW9uIHRoYXQgY2FsbGVkIGBnZXRBYm9ydFNpZ25hbCgpYCB3YXMgcmUtcnVuIG9yIGRlc3Ryb3llZCc7XG59KSgpO1xuXG5leHBvcnQgY29uc3QgSVNfWEhUTUwgPVxuXHQvLyBXZSBnb3R0YSB3cml0ZSBpdCBsaWtlIHRoaXMgYmVjYXVzZSBhZnRlciBkb3dubGV2ZWxpbmcgdGhlIHB1cmUgY29tbWVudCBtYXkgZW5kIHVwIGluIHRoZSB3cm9uZyBsb2NhdGlvblxuXHQhIWdsb2JhbFRoaXMuZG9jdW1lbnQ/LmNvbnRlbnRUeXBlICYmXG5cdC8qIEBfX1BVUkVfXyAqLyBnbG9iYWxUaGlzLmRvY3VtZW50LmNvbnRlbnRUeXBlLmluY2x1ZGVzKCd4bWwnKTtcbmV4cG9ydCBjb25zdCBFTEVNRU5UX05PREUgPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFRfTk9ERSA9IDM7XG5leHBvcnQgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gMTE7XG4iLCIvKiBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IHNjcmlwdHMvcHJvY2Vzcy1tZXNzYWdlcy9pbmRleC5qcy4gRG8gbm90IGVkaXQhICovXG5cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuXG5leHBvcnQgKiAgZnJvbSAnLi4vc2hhcmVkL2Vycm9ycy5qcyc7XG5cbi8qKlxuICogQ2Fubm90IGNyZWF0ZSBhIGAkZGVyaXZlZCguLi4pYCB3aXRoIGFuIGBhd2FpdGAgZXhwcmVzc2lvbiBvdXRzaWRlIG9mIGFuIGVmZmVjdCB0cmVlXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3luY19kZXJpdmVkX29ycGhhbigpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBhc3luY19kZXJpdmVkX29ycGhhblxcbkNhbm5vdCBjcmVhdGUgYSBcXGAkZGVyaXZlZCguLi4pXFxgIHdpdGggYW4gXFxgYXdhaXRcXGAgZXhwcmVzc2lvbiBvdXRzaWRlIG9mIGFuIGVmZmVjdCB0cmVlXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYXN5bmNfZGVyaXZlZF9vcnBoYW5gKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYXN5bmNfZGVyaXZlZF9vcnBoYW5gKTtcblx0fVxufVxuXG4vKipcbiAqIFVzaW5nIGBiaW5kOnZhbHVlYCB0b2dldGhlciB3aXRoIGEgY2hlY2tib3ggaW5wdXQgaXMgbm90IGFsbG93ZWQuIFVzZSBgYmluZDpjaGVja2VkYCBpbnN0ZWFkXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX2ludmFsaWRfY2hlY2tib3hfdmFsdWUoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgYmluZF9pbnZhbGlkX2NoZWNrYm94X3ZhbHVlXFxuVXNpbmcgXFxgYmluZDp2YWx1ZVxcYCB0b2dldGhlciB3aXRoIGEgY2hlY2tib3ggaW5wdXQgaXMgbm90IGFsbG93ZWQuIFVzZSBcXGBiaW5kOmNoZWNrZWRcXGAgaW5zdGVhZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2JpbmRfaW52YWxpZF9jaGVja2JveF92YWx1ZWApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9iaW5kX2ludmFsaWRfY2hlY2tib3hfdmFsdWVgKTtcblx0fVxufVxuXG4vKipcbiAqIENvbXBvbmVudCAlY29tcG9uZW50JSBoYXMgYW4gZXhwb3J0IG5hbWVkIGAla2V5JWAgdGhhdCBhIGNvbnN1bWVyIGNvbXBvbmVudCBpcyB0cnlpbmcgdG8gYWNjZXNzIHVzaW5nIGBiaW5kOiVrZXklYCwgd2hpY2ggaXMgZGlzYWxsb3dlZC4gSW5zdGVhZCwgdXNlIGBiaW5kOnRoaXNgIChlLmcuIGA8JW5hbWUlIGJpbmQ6dGhpcz17Y29tcG9uZW50fSAvPmApIGFuZCB0aGVuIGFjY2VzcyB0aGUgcHJvcGVydHkgb24gdGhlIGJvdW5kIGNvbXBvbmVudCBpbnN0YW5jZSAoZS5nLiBgY29tcG9uZW50LiVrZXklYClcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX2ludmFsaWRfZXhwb3J0KGNvbXBvbmVudCwga2V5LCBuYW1lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgYmluZF9pbnZhbGlkX2V4cG9ydFxcbkNvbXBvbmVudCAke2NvbXBvbmVudH0gaGFzIGFuIGV4cG9ydCBuYW1lZCBcXGAke2tleX1cXGAgdGhhdCBhIGNvbnN1bWVyIGNvbXBvbmVudCBpcyB0cnlpbmcgdG8gYWNjZXNzIHVzaW5nIFxcYGJpbmQ6JHtrZXl9XFxgLCB3aGljaCBpcyBkaXNhbGxvd2VkLiBJbnN0ZWFkLCB1c2UgXFxgYmluZDp0aGlzXFxgIChlLmcuIFxcYDwke25hbWV9IGJpbmQ6dGhpcz17Y29tcG9uZW50fSAvPlxcYCkgYW5kIHRoZW4gYWNjZXNzIHRoZSBwcm9wZXJ0eSBvbiB0aGUgYm91bmQgY29tcG9uZW50IGluc3RhbmNlIChlLmcuIFxcYGNvbXBvbmVudC4ke2tleX1cXGApXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYmluZF9pbnZhbGlkX2V4cG9ydGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9iaW5kX2ludmFsaWRfZXhwb3J0YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCBpcyBhdHRlbXB0aW5nIHRvIGJpbmQgdG8gYSBub24tYmluZGFibGUgcHJvcGVydHkgYCVrZXklYCBiZWxvbmdpbmcgdG8gJWNvbXBvbmVudCUgKGkuZS4gYDwlbmFtZSUgYmluZDola2V5JT17Li4ufT5gKS4gVG8gbWFyayBhIHByb3BlcnR5IGFzIGJpbmRhYmxlOiBgbGV0IHsgJWtleSUgPSAkYmluZGFibGUoKSB9ID0gJHByb3BzKClgXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9ub3RfYmluZGFibGUoa2V5LCBjb21wb25lbnQsIG5hbWUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBiaW5kX25vdF9iaW5kYWJsZVxcbkEgY29tcG9uZW50IGlzIGF0dGVtcHRpbmcgdG8gYmluZCB0byBhIG5vbi1iaW5kYWJsZSBwcm9wZXJ0eSBcXGAke2tleX1cXGAgYmVsb25naW5nIHRvICR7Y29tcG9uZW50fSAoaS5lLiBcXGA8JHtuYW1lfSBiaW5kOiR7a2V5fT17Li4ufT5cXGApLiBUbyBtYXJrIGEgcHJvcGVydHkgYXMgYmluZGFibGU6IFxcYGxldCB7ICR7a2V5fSA9ICRiaW5kYWJsZSgpIH0gPSAkcHJvcHMoKVxcYFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2JpbmRfbm90X2JpbmRhYmxlYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2JpbmRfbm90X2JpbmRhYmxlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDYWxsaW5nIGAlbWV0aG9kJWAgb24gYSBjb21wb25lbnQgaW5zdGFuY2UgKG9mICVjb21wb25lbnQlKSBpcyBubyBsb25nZXIgdmFsaWQgaW4gU3ZlbHRlIDVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudF9hcGlfY2hhbmdlZChtZXRob2QsIGNvbXBvbmVudCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGNvbXBvbmVudF9hcGlfY2hhbmdlZFxcbkNhbGxpbmcgXFxgJHttZXRob2R9XFxgIG9uIGEgY29tcG9uZW50IGluc3RhbmNlIChvZiAke2NvbXBvbmVudH0pIGlzIG5vIGxvbmdlciB2YWxpZCBpbiBTdmVsdGUgNVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2NvbXBvbmVudF9hcGlfY2hhbmdlZGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9jb21wb25lbnRfYXBpX2NoYW5nZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIEF0dGVtcHRlZCB0byBpbnN0YW50aWF0ZSAlY29tcG9uZW50JSB3aXRoIGBuZXcgJW5hbWUlYCwgd2hpY2ggaXMgbm8gbG9uZ2VyIHZhbGlkIGluIFN2ZWx0ZSA1LiBJZiB0aGlzIGNvbXBvbmVudCBpcyBub3QgdW5kZXIgeW91ciBjb250cm9sLCBzZXQgdGhlIGBjb21wYXRpYmlsaXR5LmNvbXBvbmVudEFwaWAgY29tcGlsZXIgb3B0aW9uIHRvIGA0YCB0byBrZWVwIGl0IHdvcmtpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50X2FwaV9pbnZhbGlkX25ldyhjb21wb25lbnQsIG5hbWUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBjb21wb25lbnRfYXBpX2ludmFsaWRfbmV3XFxuQXR0ZW1wdGVkIHRvIGluc3RhbnRpYXRlICR7Y29tcG9uZW50fSB3aXRoIFxcYG5ldyAke25hbWV9XFxgLCB3aGljaCBpcyBubyBsb25nZXIgdmFsaWQgaW4gU3ZlbHRlIDUuIElmIHRoaXMgY29tcG9uZW50IGlzIG5vdCB1bmRlciB5b3VyIGNvbnRyb2wsIHNldCB0aGUgXFxgY29tcGF0aWJpbGl0eS5jb21wb25lbnRBcGlcXGAgY29tcGlsZXIgb3B0aW9uIHRvIFxcYDRcXGAgdG8ga2VlcCBpdCB3b3JraW5nLlxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2NvbXBvbmVudF9hcGlfaW52YWxpZF9uZXdgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvY29tcG9uZW50X2FwaV9pbnZhbGlkX25ld2ApO1xuXHR9XG59XG5cbi8qKlxuICogQSBkZXJpdmVkIHZhbHVlIGNhbm5vdCByZWZlcmVuY2UgaXRzZWxmIHJlY3Vyc2l2ZWx5XG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXJpdmVkX3JlZmVyZW5jZXNfc2VsZigpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBkZXJpdmVkX3JlZmVyZW5jZXNfc2VsZlxcbkEgZGVyaXZlZCB2YWx1ZSBjYW5ub3QgcmVmZXJlbmNlIGl0c2VsZiByZWN1cnNpdmVseVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2Rlcml2ZWRfcmVmZXJlbmNlc19zZWxmYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2Rlcml2ZWRfcmVmZXJlbmNlc19zZWxmYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBLZXllZCBlYWNoIGJsb2NrIGhhcyBkdXBsaWNhdGUga2V5IGAldmFsdWUlYCBhdCBpbmRleGVzICVhJSBhbmQgJWIlXG4gKiBAcGFyYW0ge3N0cmluZ30gYVxuICogQHBhcmFtIHtzdHJpbmd9IGJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gW3ZhbHVlXVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWFjaF9rZXlfZHVwbGljYXRlKGEsIGIsIHZhbHVlKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZWFjaF9rZXlfZHVwbGljYXRlXFxuJHt2YWx1ZVxuXHRcdFx0PyBgS2V5ZWQgZWFjaCBibG9jayBoYXMgZHVwbGljYXRlIGtleSBcXGAke3ZhbHVlfVxcYCBhdCBpbmRleGVzICR7YX0gYW5kICR7Yn1gXG5cdFx0XHQ6IGBLZXllZCBlYWNoIGJsb2NrIGhhcyBkdXBsaWNhdGUga2V5IGF0IGluZGV4ZXMgJHthfSBhbmQgJHtifWB9XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWFjaF9rZXlfZHVwbGljYXRlYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2VhY2hfa2V5X2R1cGxpY2F0ZWApO1xuXHR9XG59XG5cbi8qKlxuICogS2V5ZWQgZWFjaCBibG9jayBoYXMga2V5IHRoYXQgaXMgbm90IGlkZW1wb3RlbnQg4oCUIHRoZSBrZXkgZm9yIGl0ZW0gYXQgaW5kZXggJWluZGV4JSB3YXMgYCVhJWAgYnV0IGlzIG5vdyBgJWIlYC4gS2V5cyBtdXN0IGJlIHRoZSBzYW1lIGVhY2ggdGltZSBmb3IgYSBnaXZlbiBpdGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5kZXhcbiAqIEBwYXJhbSB7c3RyaW5nfSBhXG4gKiBAcGFyYW0ge3N0cmluZ30gYlxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWFjaF9rZXlfdm9sYXRpbGUoaW5kZXgsIGEsIGIpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBlYWNoX2tleV92b2xhdGlsZVxcbktleWVkIGVhY2ggYmxvY2sgaGFzIGtleSB0aGF0IGlzIG5vdCBpZGVtcG90ZW50IOKAlCB0aGUga2V5IGZvciBpdGVtIGF0IGluZGV4ICR7aW5kZXh9IHdhcyBcXGAke2F9XFxgIGJ1dCBpcyBub3cgXFxgJHtifVxcYC4gS2V5cyBtdXN0IGJlIHRoZSBzYW1lIGVhY2ggdGltZSBmb3IgYSBnaXZlbiBpdGVtXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWFjaF9rZXlfdm9sYXRpbGVgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWFjaF9rZXlfdm9sYXRpbGVgKTtcblx0fVxufVxuXG4vKipcbiAqIGAlcnVuZSVgIGNhbm5vdCBiZSB1c2VkIGluc2lkZSBhbiBlZmZlY3QgY2xlYW51cCBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHJ1bmVcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdF9pbl90ZWFyZG93bihydW5lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZWZmZWN0X2luX3RlYXJkb3duXFxuXFxgJHtydW5lfVxcYCBjYW5ub3QgYmUgdXNlZCBpbnNpZGUgYW4gZWZmZWN0IGNsZWFudXAgZnVuY3Rpb25cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3RfaW5fdGVhcmRvd25gKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X2luX3RlYXJkb3duYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBFZmZlY3QgY2Fubm90IGJlIGNyZWF0ZWQgaW5zaWRlIGEgYCRkZXJpdmVkYCB2YWx1ZSB0aGF0IHdhcyBub3QgaXRzZWxmIGNyZWF0ZWQgaW5zaWRlIGFuIGVmZmVjdFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0X2luX3Vub3duZWRfZGVyaXZlZCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBlZmZlY3RfaW5fdW5vd25lZF9kZXJpdmVkXFxuRWZmZWN0IGNhbm5vdCBiZSBjcmVhdGVkIGluc2lkZSBhIFxcYCRkZXJpdmVkXFxgIHZhbHVlIHRoYXQgd2FzIG5vdCBpdHNlbGYgY3JlYXRlZCBpbnNpZGUgYW4gZWZmZWN0XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X2luX3Vub3duZWRfZGVyaXZlZGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3RfaW5fdW5vd25lZF9kZXJpdmVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBgJXJ1bmUlYCBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBhbiBlZmZlY3QgKGUuZy4gZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbilcbiAqIEBwYXJhbSB7c3RyaW5nfSBydW5lXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3Rfb3JwaGFuKHJ1bmUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBlZmZlY3Rfb3JwaGFuXFxuXFxgJHtydW5lfVxcYCBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBhbiBlZmZlY3QgKGUuZy4gZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbilcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3Rfb3JwaGFuYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2VmZmVjdF9vcnBoYW5gKTtcblx0fVxufVxuXG4vKipcbiAqIGAkZWZmZWN0LnBlbmRpbmcoKWAgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBhbiBlZmZlY3Qgb3IgZGVyaXZlZFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0X3BlbmRpbmdfb3V0c2lkZV9yZWFjdGlvbigpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBlZmZlY3RfcGVuZGluZ19vdXRzaWRlX3JlYWN0aW9uXFxuXFxgJGVmZmVjdC5wZW5kaW5nKClcXGAgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBhbiBlZmZlY3Qgb3IgZGVyaXZlZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2VmZmVjdF9wZW5kaW5nX291dHNpZGVfcmVhY3Rpb25gKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X3BlbmRpbmdfb3V0c2lkZV9yZWFjdGlvbmApO1xuXHR9XG59XG5cbi8qKlxuICogTWF4aW11bSB1cGRhdGUgZGVwdGggZXhjZWVkZWQuIFRoaXMgdHlwaWNhbGx5IGluZGljYXRlcyB0aGF0IGFuIGVmZmVjdCByZWFkcyBhbmQgd3JpdGVzIHRoZSBzYW1lIHBpZWNlIG9mIHN0YXRlXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3RfdXBkYXRlX2RlcHRoX2V4Y2VlZGVkKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGVmZmVjdF91cGRhdGVfZGVwdGhfZXhjZWVkZWRcXG5NYXhpbXVtIHVwZGF0ZSBkZXB0aCBleGNlZWRlZC4gVGhpcyB0eXBpY2FsbHkgaW5kaWNhdGVzIHRoYXQgYW4gZWZmZWN0IHJlYWRzIGFuZCB3cml0ZXMgdGhlIHNhbWUgcGllY2Ugb2Ygc3RhdGVcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3RfdXBkYXRlX2RlcHRoX2V4Y2VlZGVkYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2VmZmVjdF91cGRhdGVfZGVwdGhfZXhjZWVkZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIENhbm5vdCB1c2UgYGZsdXNoU3luY2AgaW5zaWRlIGFuIGVmZmVjdFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hfc3luY19pbl9lZmZlY3QoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZmx1c2hfc3luY19pbl9lZmZlY3RcXG5DYW5ub3QgdXNlIFxcYGZsdXNoU3luY1xcYCBpbnNpZGUgYW4gZWZmZWN0XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZmx1c2hfc3luY19pbl9lZmZlY3RgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZmx1c2hfc3luY19pbl9lZmZlY3RgKTtcblx0fVxufVxuXG4vKipcbiAqIENhbm5vdCBjb21taXQgYSBmb3JrIHRoYXQgd2FzIGFscmVhZHkgZGlzY2FyZGVkXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JrX2Rpc2NhcmRlZCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBmb3JrX2Rpc2NhcmRlZFxcbkNhbm5vdCBjb21taXQgYSBmb3JrIHRoYXQgd2FzIGFscmVhZHkgZGlzY2FyZGVkXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZm9ya19kaXNjYXJkZWRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZm9ya19kaXNjYXJkZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIENhbm5vdCBjcmVhdGUgYSBmb3JrIGluc2lkZSBhbiBlZmZlY3Qgb3Igd2hlbiBzdGF0ZSBjaGFuZ2VzIGFyZSBwZW5kaW5nXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JrX3RpbWluZygpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBmb3JrX3RpbWluZ1xcbkNhbm5vdCBjcmVhdGUgYSBmb3JrIGluc2lkZSBhbiBlZmZlY3Qgb3Igd2hlbiBzdGF0ZSBjaGFuZ2VzIGFyZSBwZW5kaW5nXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZm9ya190aW1pbmdgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZm9ya190aW1pbmdgKTtcblx0fVxufVxuXG4vKipcbiAqIGBnZXRBYm9ydFNpZ25hbCgpYCBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIGFuIGVmZmVjdCBvciBkZXJpdmVkXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfYWJvcnRfc2lnbmFsX291dHNpZGVfcmVhY3Rpb24oKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZ2V0X2Fib3J0X3NpZ25hbF9vdXRzaWRlX3JlYWN0aW9uXFxuXFxgZ2V0QWJvcnRTaWduYWwoKVxcYCBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIGFuIGVmZmVjdCBvciBkZXJpdmVkXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZ2V0X2Fib3J0X3NpZ25hbF9vdXRzaWRlX3JlYWN0aW9uYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2dldF9hYm9ydF9zaWduYWxfb3V0c2lkZV9yZWFjdGlvbmApO1xuXHR9XG59XG5cbi8qKlxuICogRXhwZWN0ZWQgdG8gZmluZCBhIGh5ZHJhdGFibGUgd2l0aCBrZXkgYCVrZXklYCBkdXJpbmcgaHlkcmF0aW9uLCBidXQgZGlkIG5vdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGFibGVfbWlzc2luZ19idXRfcmVxdWlyZWQoa2V5KSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgaHlkcmF0YWJsZV9taXNzaW5nX2J1dF9yZXF1aXJlZFxcbkV4cGVjdGVkIHRvIGZpbmQgYSBoeWRyYXRhYmxlIHdpdGgga2V5IFxcYCR7a2V5fVxcYCBkdXJpbmcgaHlkcmF0aW9uLCBidXQgZGlkIG5vdC5cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRhYmxlX21pc3NpbmdfYnV0X3JlcXVpcmVkYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGFibGVfbWlzc2luZ19idXRfcmVxdWlyZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIEZhaWxlZCB0byBoeWRyYXRlIHRoZSBhcHBsaWNhdGlvblxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0aW9uX2ZhaWxlZCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBoeWRyYXRpb25fZmFpbGVkXFxuRmFpbGVkIHRvIGh5ZHJhdGUgdGhlIGFwcGxpY2F0aW9uXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0aW9uX2ZhaWxlZGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRpb25fZmFpbGVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDb3VsZCBub3QgYHtAcmVuZGVyfWAgc25pcHBldCBkdWUgdG8gdGhlIGV4cHJlc3Npb24gYmVpbmcgYG51bGxgIG9yIGB1bmRlZmluZWRgLiBDb25zaWRlciB1c2luZyBvcHRpb25hbCBjaGFpbmluZyBge0ByZW5kZXIgc25pcHBldD8uKCl9YFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZF9zbmlwcGV0KCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGludmFsaWRfc25pcHBldFxcbkNvdWxkIG5vdCBcXGB7QHJlbmRlcn1cXGAgc25pcHBldCBkdWUgdG8gdGhlIGV4cHJlc3Npb24gYmVpbmcgXFxgbnVsbFxcYCBvciBcXGB1bmRlZmluZWRcXGAuIENvbnNpZGVyIHVzaW5nIG9wdGlvbmFsIGNoYWluaW5nIFxcYHtAcmVuZGVyIHNuaXBwZXQ/LigpfVxcYFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2ludmFsaWRfc25pcHBldGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9pbnZhbGlkX3NuaXBwZXRgKTtcblx0fVxufVxuXG4vKipcbiAqIGAlbmFtZSUoLi4uKWAgY2Fubm90IGJlIHVzZWQgaW4gcnVuZXMgbW9kZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZmVjeWNsZV9sZWdhY3lfb25seShuYW1lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgbGlmZWN5Y2xlX2xlZ2FjeV9vbmx5XFxuXFxgJHtuYW1lfSguLi4pXFxgIGNhbm5vdCBiZSB1c2VkIGluIHJ1bmVzIG1vZGVcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9saWZlY3ljbGVfbGVnYWN5X29ubHlgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvbGlmZWN5Y2xlX2xlZ2FjeV9vbmx5YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDYW5ub3QgZG8gYGJpbmQ6JWtleSU9e3VuZGVmaW5lZH1gIHdoZW4gYCVrZXklYCBoYXMgYSBmYWxsYmFjayB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcHNfaW52YWxpZF92YWx1ZShrZXkpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBwcm9wc19pbnZhbGlkX3ZhbHVlXFxuQ2Fubm90IGRvIFxcYGJpbmQ6JHtrZXl9PXt1bmRlZmluZWR9XFxgIHdoZW4gXFxgJHtrZXl9XFxgIGhhcyBhIGZhbGxiYWNrIHZhbHVlXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvcHJvcHNfaW52YWxpZF92YWx1ZWApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9wcm9wc19pbnZhbGlkX3ZhbHVlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBSZXN0IGVsZW1lbnQgcHJvcGVydGllcyBvZiBgJHByb3BzKClgIHN1Y2ggYXMgYCVwcm9wZXJ0eSVgIGFyZSByZWFkb25seVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wc19yZXN0X3JlYWRvbmx5KHByb3BlcnR5KSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgcHJvcHNfcmVzdF9yZWFkb25seVxcblJlc3QgZWxlbWVudCBwcm9wZXJ0aWVzIG9mIFxcYCRwcm9wcygpXFxgIHN1Y2ggYXMgXFxgJHtwcm9wZXJ0eX1cXGAgYXJlIHJlYWRvbmx5XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvcHJvcHNfcmVzdF9yZWFkb25seWApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9wcm9wc19yZXN0X3JlYWRvbmx5YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgYCVydW5lJWAgcnVuZSBpcyBvbmx5IGF2YWlsYWJsZSBpbnNpZGUgYC5zdmVsdGVgIGFuZCBgLnN2ZWx0ZS5qcy90c2AgZmlsZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBydW5lXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW5lX291dHNpZGVfc3ZlbHRlKHJ1bmUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBydW5lX291dHNpZGVfc3ZlbHRlXFxuVGhlIFxcYCR7cnVuZX1cXGAgcnVuZSBpcyBvbmx5IGF2YWlsYWJsZSBpbnNpZGUgXFxgLnN2ZWx0ZVxcYCBhbmQgXFxgLnN2ZWx0ZS5qcy90c1xcYCBmaWxlc1xcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3J1bmVfb3V0c2lkZV9zdmVsdGVgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvcnVuZV9vdXRzaWRlX3N2ZWx0ZWApO1xuXHR9XG59XG5cbi8qKlxuICogYHNldENvbnRleHRgIG11c3QgYmUgY2FsbGVkIHdoZW4gYSBjb21wb25lbnQgZmlyc3QgaW5pdGlhbGl6ZXMsIG5vdCBpbiBhIHN1YnNlcXVlbnQgZWZmZWN0IG9yIGFmdGVyIGFuIGBhd2FpdGAgZXhwcmVzc2lvblxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2NvbnRleHRfYWZ0ZXJfaW5pdCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBzZXRfY29udGV4dF9hZnRlcl9pbml0XFxuXFxgc2V0Q29udGV4dFxcYCBtdXN0IGJlIGNhbGxlZCB3aGVuIGEgY29tcG9uZW50IGZpcnN0IGluaXRpYWxpemVzLCBub3QgaW4gYSBzdWJzZXF1ZW50IGVmZmVjdCBvciBhZnRlciBhbiBcXGBhd2FpdFxcYCBleHByZXNzaW9uXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc2V0X2NvbnRleHRfYWZ0ZXJfaW5pdGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9zZXRfY29udGV4dF9hZnRlcl9pbml0YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBQcm9wZXJ0eSBkZXNjcmlwdG9ycyBkZWZpbmVkIG9uIGAkc3RhdGVgIG9iamVjdHMgbXVzdCBjb250YWluIGB2YWx1ZWAgYW5kIGFsd2F5cyBiZSBgZW51bWVyYWJsZWAsIGBjb25maWd1cmFibGVgIGFuZCBgd3JpdGFibGVgLlxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVfZGVzY3JpcHRvcnNfZml4ZWQoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgc3RhdGVfZGVzY3JpcHRvcnNfZml4ZWRcXG5Qcm9wZXJ0eSBkZXNjcmlwdG9ycyBkZWZpbmVkIG9uIFxcYCRzdGF0ZVxcYCBvYmplY3RzIG11c3QgY29udGFpbiBcXGB2YWx1ZVxcYCBhbmQgYWx3YXlzIGJlIFxcYGVudW1lcmFibGVcXGAsIFxcYGNvbmZpZ3VyYWJsZVxcYCBhbmQgXFxgd3JpdGFibGVcXGAuXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3RhdGVfZGVzY3JpcHRvcnNfZml4ZWRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3RhdGVfZGVzY3JpcHRvcnNfZml4ZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIENhbm5vdCBzZXQgcHJvdG90eXBlIG9mIGAkc3RhdGVgIG9iamVjdFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVfcHJvdG90eXBlX2ZpeGVkKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYHN0YXRlX3Byb3RvdHlwZV9maXhlZFxcbkNhbm5vdCBzZXQgcHJvdG90eXBlIG9mIFxcYCRzdGF0ZVxcYCBvYmplY3RcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9zdGF0ZV9wcm90b3R5cGVfZml4ZWRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3RhdGVfcHJvdG90eXBlX2ZpeGVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBVcGRhdGluZyBzdGF0ZSBpbnNpZGUgYCRkZXJpdmVkKC4uLilgLCBgJGluc3BlY3QoLi4uKWAgb3IgYSB0ZW1wbGF0ZSBleHByZXNzaW9uIGlzIGZvcmJpZGRlbi4gSWYgdGhlIHZhbHVlIHNob3VsZCBub3QgYmUgcmVhY3RpdmUsIGRlY2xhcmUgaXQgd2l0aG91dCBgJHN0YXRlYFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVfdW5zYWZlX211dGF0aW9uKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYHN0YXRlX3Vuc2FmZV9tdXRhdGlvblxcblVwZGF0aW5nIHN0YXRlIGluc2lkZSBcXGAkZGVyaXZlZCguLi4pXFxgLCBcXGAkaW5zcGVjdCguLi4pXFxgIG9yIGEgdGVtcGxhdGUgZXhwcmVzc2lvbiBpcyBmb3JiaWRkZW4uIElmIHRoZSB2YWx1ZSBzaG91bGQgbm90IGJlIHJlYWN0aXZlLCBkZWNsYXJlIGl0IHdpdGhvdXQgXFxgJHN0YXRlXFxgXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3RhdGVfdW5zYWZlX211dGF0aW9uYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX3Vuc2FmZV9tdXRhdGlvbmApO1xuXHR9XG59XG5cbi8qKlxuICogQSBgPHN2ZWx0ZTpib3VuZGFyeT5gIGByZXNldGAgZnVuY3Rpb24gY2Fubm90IGJlIGNhbGxlZCB3aGlsZSBhbiBlcnJvciBpcyBzdGlsbCBiZWluZyBoYW5kbGVkXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdmVsdGVfYm91bmRhcnlfcmVzZXRfb25lcnJvcigpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBzdmVsdGVfYm91bmRhcnlfcmVzZXRfb25lcnJvclxcbkEgXFxgPHN2ZWx0ZTpib3VuZGFyeT5cXGAgXFxgcmVzZXRcXGAgZnVuY3Rpb24gY2Fubm90IGJlIGNhbGxlZCB3aGlsZSBhbiBlcnJvciBpcyBzdGlsbCBiZWluZyBoYW5kbGVkXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X29uZXJyb3JgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X29uZXJyb3JgKTtcblx0fVxufSIsImV4cG9ydCBjb25zdCBFQUNIX0lURU1fUkVBQ1RJVkUgPSAxO1xuZXhwb3J0IGNvbnN0IEVBQ0hfSU5ERVhfUkVBQ1RJVkUgPSAxIDw8IDE7XG4vKiogU2VlIEVhY2hCbG9jayBpbnRlcmZhY2UgbWV0YWRhdGEuaXNfY29udHJvbGxlZCBmb3IgYW4gZXhwbGFuYXRpb24gd2hhdCB0aGlzIGlzICovXG5leHBvcnQgY29uc3QgRUFDSF9JU19DT05UUk9MTEVEID0gMSA8PCAyO1xuZXhwb3J0IGNvbnN0IEVBQ0hfSVNfQU5JTUFURUQgPSAxIDw8IDM7XG5leHBvcnQgY29uc3QgRUFDSF9JVEVNX0lNTVVUQUJMRSA9IDEgPDwgNDtcblxuZXhwb3J0IGNvbnN0IFBST1BTX0lTX0lNTVVUQUJMRSA9IDE7XG5leHBvcnQgY29uc3QgUFJPUFNfSVNfUlVORVMgPSAxIDw8IDE7XG5leHBvcnQgY29uc3QgUFJPUFNfSVNfVVBEQVRFRCA9IDEgPDwgMjtcbmV4cG9ydCBjb25zdCBQUk9QU19JU19CSU5EQUJMRSA9IDEgPDwgMztcbmV4cG9ydCBjb25zdCBQUk9QU19JU19MQVpZX0lOSVRJQUwgPSAxIDw8IDQ7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX0lOID0gMTtcbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX09VVCA9IDEgPDwgMTtcbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX0dMT0JBTCA9IDEgPDwgMjtcblxuZXhwb3J0IGNvbnN0IFRFTVBMQVRFX0ZSQUdNRU5UID0gMTtcbmV4cG9ydCBjb25zdCBURU1QTEFURV9VU0VfSU1QT1JUX05PREUgPSAxIDw8IDE7XG5leHBvcnQgY29uc3QgVEVNUExBVEVfVVNFX1NWRyA9IDEgPDwgMjtcbmV4cG9ydCBjb25zdCBURU1QTEFURV9VU0VfTUFUSE1MID0gMSA8PCAzO1xuXG5leHBvcnQgY29uc3QgSFlEUkFUSU9OX1NUQVJUID0gJ1snO1xuLyoqIHVzZWQgdG8gaW5kaWNhdGUgdGhhdCBhbiBgezplbHNlfS4uLmAgYmxvY2sgd2FzIHJlbmRlcmVkICovXG5leHBvcnQgY29uc3QgSFlEUkFUSU9OX1NUQVJUX0VMU0UgPSAnWyEnO1xuLyoqIHVzZWQgdG8gaW5kaWNhdGUgdGhhdCBhIGJvdW5kYXJ5J3MgYGZhaWxlZGAgc25pcHBldCB3YXMgcmVuZGVyZWQgb24gdGhlIHNlcnZlciAqL1xuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9TVEFSVF9GQUlMRUQgPSAnWz8nO1xuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9FTkQgPSAnXSc7XG5leHBvcnQgY29uc3QgSFlEUkFUSU9OX0VSUk9SID0ge307XG5cbmV4cG9ydCBjb25zdCBFTEVNRU5UX0lTX05BTUVTUEFDRUQgPSAxO1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJFU0VSVkVfQVRUUklCVVRFX0NBU0UgPSAxIDw8IDE7XG5leHBvcnQgY29uc3QgRUxFTUVOVF9JU19JTlBVVCA9IDEgPDwgMjtcblxuZXhwb3J0IGNvbnN0IFVOSU5JVElBTElaRUQgPSBTeW1ib2woKTtcblxuLy8gRGV2LXRpbWUgY29tcG9uZW50IHByb3BlcnRpZXNcbmV4cG9ydCBjb25zdCBGSUxFTkFNRSA9IFN5bWJvbCgnZmlsZW5hbWUnKTtcbmV4cG9ydCBjb25zdCBITVIgPSBTeW1ib2woJ2htcicpO1xuXG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX0hUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX1NWRyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX01BVEhNTCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJztcblxuLy8gd2UgdXNlIGEgbGlzdCBvZiBpZ25vcmFibGUgcnVudGltZSB3YXJuaW5ncyBiZWNhdXNlIG5vdCBldmVyeSBydW50aW1lIHdhcm5pbmdcbi8vIGNhbiBiZSBpZ25vcmVkIGFuZCB3ZSB3YW50IHRvIGtlZXAgdGhlIHZhbGlkYXRpb24gZm9yIHN2ZWx0ZS1pZ25vcmUgaW4gcGxhY2VcbmV4cG9ydCBjb25zdCBJR05PUkFCTEVfUlVOVElNRV9XQVJOSU5HUyA9IC8qKiBAdHlwZSB7Y29uc3R9ICovIChbXG5cdCdhd2FpdF93YXRlcmZhbGwnLFxuXHQnYXdhaXRfcmVhY3Rpdml0eV9sb3NzJyxcblx0J3N0YXRlX3NuYXBzaG90X3VuY2xvbmVhYmxlJyxcblx0J2JpbmRpbmdfcHJvcGVydHlfbm9uX3JlYWN0aXZlJyxcblx0J2h5ZHJhdGlvbl9hdHRyaWJ1dGVfY2hhbmdlZCcsXG5cdCdoeWRyYXRpb25faHRtbF9jaGFuZ2VkJyxcblx0J293bmVyc2hpcF9pbnZhbGlkX2JpbmRpbmcnLFxuXHQnb3duZXJzaGlwX2ludmFsaWRfbXV0YXRpb24nXG5dKTtcblxuLyoqXG4gKiBXaGl0ZXNwYWNlIGluc2lkZSBvbmUgb2YgdGhlc2UgZWxlbWVudHMgd2lsbCBub3QgcmVzdWx0IGluXG4gKiBhIHdoaXRlc3BhY2Ugbm9kZSBiZWluZyBjcmVhdGVkIGluIGFueSBjaXJjdW1zdGFuY2VzLiAoVGhpc1xuICogbGlzdCBpcyBhbG1vc3QgY2VydGFpbmx5IHZlcnkgaW5jb21wbGV0ZSlcbiAqIFRPRE8gdGhpcyBpcyBjdXJyZW50bHkgdW51c2VkXG4gKi9cbmV4cG9ydCBjb25zdCBFTEVNRU5UU19XSVRIT1VUX1RFWFQgPSBbJ2F1ZGlvJywgJ2RhdGFsaXN0JywgJ2RsJywgJ29wdGdyb3VwJywgJ3NlbGVjdCcsICd2aWRlbyddO1xuXG5leHBvcnQgY29uc3QgQVRUQUNITUVOVF9LRVkgPSAnQGF0dGFjaCc7XG4iLCIvKiBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IHNjcmlwdHMvcHJvY2Vzcy1tZXNzYWdlcy9pbmRleC5qcy4gRG8gbm90IGVkaXQhICovXG5cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuXG52YXIgYm9sZCA9ICdmb250LXdlaWdodDogYm9sZCc7XG52YXIgbm9ybWFsID0gJ2ZvbnQtd2VpZ2h0OiBub3JtYWwnO1xuXG4vKipcbiAqIEFzc2lnbm1lbnQgdG8gYCVwcm9wZXJ0eSVgIHByb3BlcnR5ICglbG9jYXRpb24lKSB3aWxsIGV2YWx1YXRlIHRvIHRoZSByaWdodC1oYW5kIHNpZGUsIG5vdCB0aGUgdmFsdWUgb2YgYCVwcm9wZXJ0eSVgIGZvbGxvd2luZyB0aGUgYXNzaWdubWVudC4gVGhpcyBtYXkgcmVzdWx0IGluIHVuZXhwZWN0ZWQgYmVoYXZpb3VyLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbm1lbnRfdmFsdWVfc3RhbGUocHJvcGVydHksIGxvY2F0aW9uKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gYXNzaWdubWVudF92YWx1ZV9zdGFsZVxcbiVjQXNzaWdubWVudCB0byBcXGAke3Byb3BlcnR5fVxcYCBwcm9wZXJ0eSAoJHtsb2NhdGlvbn0pIHdpbGwgZXZhbHVhdGUgdG8gdGhlIHJpZ2h0LWhhbmQgc2lkZSwgbm90IHRoZSB2YWx1ZSBvZiBcXGAke3Byb3BlcnR5fVxcYCBmb2xsb3dpbmcgdGhlIGFzc2lnbm1lbnQuIFRoaXMgbWF5IHJlc3VsdCBpbiB1bmV4cGVjdGVkIGJlaGF2aW91ci5cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9hc3NpZ25tZW50X3ZhbHVlX3N0YWxlYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2Fzc2lnbm1lbnRfdmFsdWVfc3RhbGVgKTtcblx0fVxufVxuXG4vKipcbiAqIERldGVjdGVkIHJlYWN0aXZpdHkgbG9zcyB3aGVuIHJlYWRpbmcgYCVuYW1lJWAuIFRoaXMgaGFwcGVucyB3aGVuIHN0YXRlIGlzIHJlYWQgaW4gYW4gYXN5bmMgZnVuY3Rpb24gYWZ0ZXIgYW4gZWFybGllciBgYXdhaXRgXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXdhaXRfcmVhY3Rpdml0eV9sb3NzKG5hbWUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBhd2FpdF9yZWFjdGl2aXR5X2xvc3NcXG4lY0RldGVjdGVkIHJlYWN0aXZpdHkgbG9zcyB3aGVuIHJlYWRpbmcgXFxgJHtuYW1lfVxcYC4gVGhpcyBoYXBwZW5zIHdoZW4gc3RhdGUgaXMgcmVhZCBpbiBhbiBhc3luYyBmdW5jdGlvbiBhZnRlciBhbiBlYXJsaWVyIFxcYGF3YWl0XFxgXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYXdhaXRfcmVhY3Rpdml0eV9sb3NzYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2F3YWl0X3JlYWN0aXZpdHlfbG9zc2ApO1xuXHR9XG59XG5cbi8qKlxuICogQW4gYXN5bmMgZGVyaXZlZCwgYCVuYW1lJWAgKCVsb2NhdGlvbiUpIHdhcyBub3QgcmVhZCBpbW1lZGlhdGVseSBhZnRlciBpdCByZXNvbHZlZC4gVGhpcyBvZnRlbiBpbmRpY2F0ZXMgYW4gdW5uZWNlc3Nhcnkgd2F0ZXJmYWxsLCB3aGljaCBjYW4gc2xvdyBkb3duIHlvdXIgYXBwXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhd2FpdF93YXRlcmZhbGwobmFtZSwgbG9jYXRpb24pIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBhd2FpdF93YXRlcmZhbGxcXG4lY0FuIGFzeW5jIGRlcml2ZWQsIFxcYCR7bmFtZX1cXGAgKCR7bG9jYXRpb259KSB3YXMgbm90IHJlYWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgcmVzb2x2ZWQuIFRoaXMgb2Z0ZW4gaW5kaWNhdGVzIGFuIHVubmVjZXNzYXJ5IHdhdGVyZmFsbCwgd2hpY2ggY2FuIHNsb3cgZG93biB5b3VyIGFwcFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2F3YWl0X3dhdGVyZmFsbGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9hd2FpdF93YXRlcmZhbGxgKTtcblx0fVxufVxuXG4vKipcbiAqIGAlYmluZGluZyVgICglbG9jYXRpb24lKSBpcyBiaW5kaW5nIHRvIGEgbm9uLXJlYWN0aXZlIHByb3BlcnR5XG4gKiBAcGFyYW0ge3N0cmluZ30gYmluZGluZ1xuICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBbbG9jYXRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nX3Byb3BlcnR5X25vbl9yZWFjdGl2ZShiaW5kaW5nLCBsb2NhdGlvbikge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YCVjW3N2ZWx0ZV0gYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmVcXG4lYyR7bG9jYXRpb25cblx0XHRcdFx0PyBgXFxgJHtiaW5kaW5nfVxcYCAoJHtsb2NhdGlvbn0pIGlzIGJpbmRpbmcgdG8gYSBub24tcmVhY3RpdmUgcHJvcGVydHlgXG5cdFx0XHRcdDogYFxcYCR7YmluZGluZ31cXGAgaXMgYmluZGluZyB0byBhIG5vbi1yZWFjdGl2ZSBwcm9wZXJ0eWB9XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmVgLFxuXHRcdFx0Ym9sZCxcblx0XHRcdG5vcm1hbFxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9iaW5kaW5nX3Byb3BlcnR5X25vbl9yZWFjdGl2ZWApO1xuXHR9XG59XG5cbi8qKlxuICogWW91ciBgY29uc29sZS4lbWV0aG9kJWAgY29udGFpbmVkIGAkc3RhdGVgIHByb3hpZXMuIENvbnNpZGVyIHVzaW5nIGAkaW5zcGVjdCguLi4pYCBvciBgJHN0YXRlLnNuYXBzaG90KC4uLilgIGluc3RlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnNvbGVfbG9nX3N0YXRlKG1ldGhvZCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIGNvbnNvbGVfbG9nX3N0YXRlXFxuJWNZb3VyIFxcYGNvbnNvbGUuJHttZXRob2R9XFxgIGNvbnRhaW5lZCBcXGAkc3RhdGVcXGAgcHJveGllcy4gQ29uc2lkZXIgdXNpbmcgXFxgJGluc3BlY3QoLi4uKVxcYCBvciBcXGAkc3RhdGUuc25hcHNob3QoLi4uKVxcYCBpbnN0ZWFkXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvY29uc29sZV9sb2dfc3RhdGVgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvY29uc29sZV9sb2dfc3RhdGVgKTtcblx0fVxufVxuXG4vKipcbiAqICVoYW5kbGVyJSBzaG91bGQgYmUgYSBmdW5jdGlvbi4gRGlkIHlvdSBtZWFuIHRvICVzdWdnZXN0aW9uJT9cbiAqIEBwYXJhbSB7c3RyaW5nfSBoYW5kbGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3VnZ2VzdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRfaGFuZGxlcl9pbnZhbGlkKGhhbmRsZXIsIHN1Z2dlc3Rpb24pIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBldmVudF9oYW5kbGVyX2ludmFsaWRcXG4lYyR7aGFuZGxlcn0gc2hvdWxkIGJlIGEgZnVuY3Rpb24uIERpZCB5b3UgbWVhbiB0byAke3N1Z2dlc3Rpb259P1xcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2V2ZW50X2hhbmRsZXJfaW52YWxpZGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9ldmVudF9oYW5kbGVyX2ludmFsaWRgKTtcblx0fVxufVxuXG4vKipcbiAqIEV4cGVjdGVkIHRvIGZpbmQgYSBoeWRyYXRhYmxlIHdpdGgga2V5IGAla2V5JWAgZHVyaW5nIGh5ZHJhdGlvbiwgYnV0IGRpZCBub3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRhYmxlX21pc3NpbmdfYnV0X2V4cGVjdGVkKGtleSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIGh5ZHJhdGFibGVfbWlzc2luZ19idXRfZXhwZWN0ZWRcXG4lY0V4cGVjdGVkIHRvIGZpbmQgYSBoeWRyYXRhYmxlIHdpdGgga2V5IFxcYCR7a2V5fVxcYCBkdXJpbmcgaHlkcmF0aW9uLCBidXQgZGlkIG5vdC5cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRhYmxlX21pc3NpbmdfYnV0X2V4cGVjdGVkYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGFibGVfbWlzc2luZ19idXRfZXhwZWN0ZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBgJWF0dHJpYnV0ZSVgIGF0dHJpYnV0ZSBvbiBgJWh0bWwlYCBjaGFuZ2VkIGl0cyB2YWx1ZSBiZXR3ZWVuIHNlcnZlciBhbmQgY2xpZW50IHJlbmRlcnMuIFRoZSBjbGllbnQgdmFsdWUsIGAldmFsdWUlYCwgd2lsbCBiZSBpZ25vcmVkIGluIGZhdm91ciBvZiB0aGUgc2VydmVyIHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRpb25fYXR0cmlidXRlX2NoYW5nZWQoYXR0cmlidXRlLCBodG1sLCB2YWx1ZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIGh5ZHJhdGlvbl9hdHRyaWJ1dGVfY2hhbmdlZFxcbiVjVGhlIFxcYCR7YXR0cmlidXRlfVxcYCBhdHRyaWJ1dGUgb24gXFxgJHtodG1sfVxcYCBjaGFuZ2VkIGl0cyB2YWx1ZSBiZXR3ZWVuIHNlcnZlciBhbmQgY2xpZW50IHJlbmRlcnMuIFRoZSBjbGllbnQgdmFsdWUsIFxcYCR7dmFsdWV9XFxgLCB3aWxsIGJlIGlnbm9yZWQgaW4gZmF2b3VyIG9mIHRoZSBzZXJ2ZXIgdmFsdWVcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRpb25fYXR0cmlidXRlX2NoYW5nZWRgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0aW9uX2F0dHJpYnV0ZV9jaGFuZ2VkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgdmFsdWUgb2YgYW4gYHtAaHRtbCAuLi59YCBibG9jayAlbG9jYXRpb24lIGNoYW5nZWQgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudCByZW5kZXJzLiBUaGUgY2xpZW50IHZhbHVlIHdpbGwgYmUgaWdub3JlZCBpbiBmYXZvdXIgb2YgdGhlIHNlcnZlciB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBbbG9jYXRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRpb25faHRtbF9jaGFuZ2VkKGxvY2F0aW9uKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgJWNbc3ZlbHRlXSBoeWRyYXRpb25faHRtbF9jaGFuZ2VkXFxuJWMke2xvY2F0aW9uXG5cdFx0XHRcdD8gYFRoZSB2YWx1ZSBvZiBhbiBcXGB7QGh0bWwgLi4ufVxcYCBibG9jayAke2xvY2F0aW9ufSBjaGFuZ2VkIGJldHdlZW4gc2VydmVyIGFuZCBjbGllbnQgcmVuZGVycy4gVGhlIGNsaWVudCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQgaW4gZmF2b3VyIG9mIHRoZSBzZXJ2ZXIgdmFsdWVgXG5cdFx0XHRcdDogJ1RoZSB2YWx1ZSBvZiBhbiBge0BodG1sIC4uLn1gIGJsb2NrIGNoYW5nZWQgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudCByZW5kZXJzLiBUaGUgY2xpZW50IHZhbHVlIHdpbGwgYmUgaWdub3JlZCBpbiBmYXZvdXIgb2YgdGhlIHNlcnZlciB2YWx1ZSd9XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0aW9uX2h0bWxfY2hhbmdlZGAsXG5cdFx0XHRib2xkLFxuXHRcdFx0bm9ybWFsXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGlvbl9odG1sX2NoYW5nZWRgKTtcblx0fVxufVxuXG4vKipcbiAqIEh5ZHJhdGlvbiBmYWlsZWQgYmVjYXVzZSB0aGUgaW5pdGlhbCBVSSBkb2VzIG5vdCBtYXRjaCB3aGF0IHdhcyByZW5kZXJlZCBvbiB0aGUgc2VydmVyLiBUaGUgZXJyb3Igb2NjdXJyZWQgbmVhciAlbG9jYXRpb24lXG4gKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IFtsb2NhdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGlvbl9taXNtYXRjaChsb2NhdGlvbikge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YCVjW3N2ZWx0ZV0gaHlkcmF0aW9uX21pc21hdGNoXFxuJWMke2xvY2F0aW9uXG5cdFx0XHRcdD8gYEh5ZHJhdGlvbiBmYWlsZWQgYmVjYXVzZSB0aGUgaW5pdGlhbCBVSSBkb2VzIG5vdCBtYXRjaCB3aGF0IHdhcyByZW5kZXJlZCBvbiB0aGUgc2VydmVyLiBUaGUgZXJyb3Igb2NjdXJyZWQgbmVhciAke2xvY2F0aW9ufWBcblx0XHRcdFx0OiAnSHlkcmF0aW9uIGZhaWxlZCBiZWNhdXNlIHRoZSBpbml0aWFsIFVJIGRvZXMgbm90IG1hdGNoIHdoYXQgd2FzIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXInfVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGlvbl9taXNtYXRjaGAsXG5cdFx0XHRib2xkLFxuXHRcdFx0bm9ybWFsXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGlvbl9taXNtYXRjaGApO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIGByZW5kZXJgIGZ1bmN0aW9uIHBhc3NlZCB0byBgY3JlYXRlUmF3U25pcHBldGAgc2hvdWxkIHJldHVybiBIVE1MIGZvciBhIHNpbmdsZSBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkX3Jhd19zbmlwcGV0X3JlbmRlcigpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBpbnZhbGlkX3Jhd19zbmlwcGV0X3JlbmRlclxcbiVjVGhlIFxcYHJlbmRlclxcYCBmdW5jdGlvbiBwYXNzZWQgdG8gXFxgY3JlYXRlUmF3U25pcHBldFxcYCBzaG91bGQgcmV0dXJuIEhUTUwgZm9yIGEgc2luZ2xlIGVsZW1lbnRcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9pbnZhbGlkX3Jhd19zbmlwcGV0X3JlbmRlcmAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9pbnZhbGlkX3Jhd19zbmlwcGV0X3JlbmRlcmApO1xuXHR9XG59XG5cbi8qKlxuICogRGV0ZWN0ZWQgYSBtaWdyYXRlZCBgJDpgIHJlYWN0aXZlIGJsb2NrIGluIGAlZmlsZW5hbWUlYCB0aGF0IGJvdGggYWNjZXNzZXMgYW5kIHVwZGF0ZXMgdGhlIHNhbWUgcmVhY3RpdmUgdmFsdWUuIFRoaXMgbWF5IGNhdXNlIHJlY3Vyc2l2ZSB1cGRhdGVzIHdoZW4gY29udmVydGVkIHRvIGFuIGAkZWZmZWN0YC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVnYWN5X3JlY3Vyc2l2ZV9yZWFjdGl2ZV9ibG9jayhmaWxlbmFtZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIGxlZ2FjeV9yZWN1cnNpdmVfcmVhY3RpdmVfYmxvY2tcXG4lY0RldGVjdGVkIGEgbWlncmF0ZWQgXFxgJDpcXGAgcmVhY3RpdmUgYmxvY2sgaW4gXFxgJHtmaWxlbmFtZX1cXGAgdGhhdCBib3RoIGFjY2Vzc2VzIGFuZCB1cGRhdGVzIHRoZSBzYW1lIHJlYWN0aXZlIHZhbHVlLiBUaGlzIG1heSBjYXVzZSByZWN1cnNpdmUgdXBkYXRlcyB3aGVuIGNvbnZlcnRlZCB0byBhbiBcXGAkZWZmZWN0XFxgLlxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2xlZ2FjeV9yZWN1cnNpdmVfcmVhY3RpdmVfYmxvY2tgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvbGVnYWN5X3JlY3Vyc2l2ZV9yZWFjdGl2ZV9ibG9ja2ApO1xuXHR9XG59XG5cbi8qKlxuICogVHJpZWQgdG8gdW5tb3VudCBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgbW91bnRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGlmZWN5Y2xlX2RvdWJsZV91bm1vdW50KCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIGxpZmVjeWNsZV9kb3VibGVfdW5tb3VudFxcbiVjVHJpZWQgdG8gdW5tb3VudCBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgbW91bnRlZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2xpZmVjeWNsZV9kb3VibGVfdW5tb3VudGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9saWZlY3ljbGVfZG91YmxlX3VubW91bnRgKTtcblx0fVxufVxuXG4vKipcbiAqICVwYXJlbnQlIHBhc3NlZCBwcm9wZXJ0eSBgJXByb3AlYCB0byAlY2hpbGQlIHdpdGggYGJpbmQ6YCwgYnV0IGl0cyBwYXJlbnQgY29tcG9uZW50ICVvd25lciUgZGlkIG5vdCBkZWNsYXJlIGAlcHJvcCVgIGFzIGEgYmluZGluZy4gQ29uc2lkZXIgY3JlYXRpbmcgYSBiaW5kaW5nIGJldHdlZW4gJW93bmVyJSBhbmQgJXBhcmVudCUgKGUuZy4gYGJpbmQ6JXByb3AlPXsuLi59YCBpbnN0ZWFkIG9mIGAlcHJvcCU9ey4uLn1gKVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGlsZFxuICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvd25lcnNoaXBfaW52YWxpZF9iaW5kaW5nKHBhcmVudCwgcHJvcCwgY2hpbGQsIG93bmVyKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gb3duZXJzaGlwX2ludmFsaWRfYmluZGluZ1xcbiVjJHtwYXJlbnR9IHBhc3NlZCBwcm9wZXJ0eSBcXGAke3Byb3B9XFxgIHRvICR7Y2hpbGR9IHdpdGggXFxgYmluZDpcXGAsIGJ1dCBpdHMgcGFyZW50IGNvbXBvbmVudCAke293bmVyfSBkaWQgbm90IGRlY2xhcmUgXFxgJHtwcm9wfVxcYCBhcyBhIGJpbmRpbmcuIENvbnNpZGVyIGNyZWF0aW5nIGEgYmluZGluZyBiZXR3ZWVuICR7b3duZXJ9IGFuZCAke3BhcmVudH0gKGUuZy4gXFxgYmluZDoke3Byb3B9PXsuLi59XFxgIGluc3RlYWQgb2YgXFxgJHtwcm9wfT17Li4ufVxcYClcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9vd25lcnNoaXBfaW52YWxpZF9iaW5kaW5nYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL293bmVyc2hpcF9pbnZhbGlkX2JpbmRpbmdgKTtcblx0fVxufVxuXG4vKipcbiAqIE11dGF0aW5nIHVuYm91bmQgcHJvcHMgKGAlbmFtZSVgLCBhdCAlbG9jYXRpb24lKSBpcyBzdHJvbmdseSBkaXNjb3VyYWdlZC4gQ29uc2lkZXIgdXNpbmcgYGJpbmQ6JXByb3AlPXsuLi59YCBpbiAlcGFyZW50JSAob3IgdXNpbmcgYSBjYWxsYmFjaykgaW5zdGVhZFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG93bmVyc2hpcF9pbnZhbGlkX211dGF0aW9uKG5hbWUsIGxvY2F0aW9uLCBwcm9wLCBwYXJlbnQpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBvd25lcnNoaXBfaW52YWxpZF9tdXRhdGlvblxcbiVjTXV0YXRpbmcgdW5ib3VuZCBwcm9wcyAoXFxgJHtuYW1lfVxcYCwgYXQgJHtsb2NhdGlvbn0pIGlzIHN0cm9uZ2x5IGRpc2NvdXJhZ2VkLiBDb25zaWRlciB1c2luZyBcXGBiaW5kOiR7cHJvcH09ey4uLn1cXGAgaW4gJHtwYXJlbnR9IChvciB1c2luZyBhIGNhbGxiYWNrKSBpbnN0ZWFkXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvb3duZXJzaGlwX2ludmFsaWRfbXV0YXRpb25gLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvb3duZXJzaGlwX2ludmFsaWRfbXV0YXRpb25gKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBgdmFsdWVgIHByb3BlcnR5IG9mIGEgYDxzZWxlY3QgbXVsdGlwbGU+YCBlbGVtZW50IHNob3VsZCBiZSBhbiBhcnJheSwgYnV0IGl0IHJlY2VpdmVkIGEgbm9uLWFycmF5IHZhbHVlLiBUaGUgc2VsZWN0aW9uIHdpbGwgYmUga2VwdCBhcyBpcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF9tdWx0aXBsZV9pbnZhbGlkX3ZhbHVlKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIHNlbGVjdF9tdWx0aXBsZV9pbnZhbGlkX3ZhbHVlXFxuJWNUaGUgXFxgdmFsdWVcXGAgcHJvcGVydHkgb2YgYSBcXGA8c2VsZWN0IG11bHRpcGxlPlxcYCBlbGVtZW50IHNob3VsZCBiZSBhbiBhcnJheSwgYnV0IGl0IHJlY2VpdmVkIGEgbm9uLWFycmF5IHZhbHVlLiBUaGUgc2VsZWN0aW9uIHdpbGwgYmUga2VwdCBhcyBpcy5cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9zZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZWAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9zZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZWApO1xuXHR9XG59XG5cbi8qKlxuICogUmVhY3RpdmUgYCRzdGF0ZSguLi4pYCBwcm94aWVzIGFuZCB0aGUgdmFsdWVzIHRoZXkgcHJveHkgaGF2ZSBkaWZmZXJlbnQgaWRlbnRpdGllcy4gQmVjYXVzZSBvZiB0aGlzLCBjb21wYXJpc29ucyB3aXRoIGAlb3BlcmF0b3IlYCB3aWxsIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzXG4gKiBAcGFyYW0ge3N0cmluZ30gb3BlcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlX3Byb3h5X2VxdWFsaXR5X21pc21hdGNoKG9wZXJhdG9yKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gc3RhdGVfcHJveHlfZXF1YWxpdHlfbWlzbWF0Y2hcXG4lY1JlYWN0aXZlIFxcYCRzdGF0ZSguLi4pXFxgIHByb3hpZXMgYW5kIHRoZSB2YWx1ZXMgdGhleSBwcm94eSBoYXZlIGRpZmZlcmVudCBpZGVudGl0aWVzLiBCZWNhdXNlIG9mIHRoaXMsIGNvbXBhcmlzb25zIHdpdGggXFxgJHtvcGVyYXRvcn1cXGAgd2lsbCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0c1xcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX3Byb3h5X2VxdWFsaXR5X21pc21hdGNoYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX3Byb3h5X2VxdWFsaXR5X21pc21hdGNoYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUcmllZCB0byB1bm1vdW50IGEgc3RhdGUgcHJveHksIHJhdGhlciB0aGFuIGEgY29tcG9uZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZV9wcm94eV91bm1vdW50KCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIHN0YXRlX3Byb3h5X3VubW91bnRcXG4lY1RyaWVkIHRvIHVubW91bnQgYSBzdGF0ZSBwcm94eSwgcmF0aGVyIHRoYW4gYSBjb21wb25lbnRcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9zdGF0ZV9wcm94eV91bm1vdW50YCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX3Byb3h5X3VubW91bnRgKTtcblx0fVxufVxuXG4vKipcbiAqIEEgYDxzdmVsdGU6Ym91bmRhcnk+YCBgcmVzZXRgIGZ1bmN0aW9uIG9ubHkgcmVzZXRzIHRoZSBib3VuZGFyeSB0aGUgZmlyc3QgdGltZSBpdCBpcyBjYWxsZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN2ZWx0ZV9ib3VuZGFyeV9yZXNldF9ub29wKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIHN2ZWx0ZV9ib3VuZGFyeV9yZXNldF9ub29wXFxuJWNBIFxcYDxzdmVsdGU6Ym91bmRhcnk+XFxgIFxcYHJlc2V0XFxgIGZ1bmN0aW9uIG9ubHkgcmVzZXRzIHRoZSBib3VuZGFyeSB0aGUgZmlyc3QgdGltZSBpdCBpcyBjYWxsZWRcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9zdmVsdGVfYm91bmRhcnlfcmVzZXRfbm9vcGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9zdmVsdGVfYm91bmRhcnlfcmVzZXRfbm9vcGApO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIGBzbGlkZWAgdHJhbnNpdGlvbiBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSBmb3IgZWxlbWVudHMgd2l0aCBgZGlzcGxheTogJXZhbHVlJWBcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNpdGlvbl9zbGlkZV9kaXNwbGF5KHZhbHVlKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gdHJhbnNpdGlvbl9zbGlkZV9kaXNwbGF5XFxuJWNUaGUgXFxgc2xpZGVcXGAgdHJhbnNpdGlvbiBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSBmb3IgZWxlbWVudHMgd2l0aCBcXGBkaXNwbGF5OiAke3ZhbHVlfVxcYFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3RyYW5zaXRpb25fc2xpZGVfZGlzcGxheWAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS90cmFuc2l0aW9uX3NsaWRlX2Rpc3BsYXlgKTtcblx0fVxufSIsIi8qKiBAaW1wb3J0IHsgRXF1YWxzIH0gZnJvbSAnI2NsaWVudCcgKi9cblxuLyoqIEB0eXBlIHtFcXVhbHN9ICovXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSA9PT0gdGhpcy52O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7dW5rbm93bn0gYVxuICogQHBhcmFtIHt1bmtub3dufSBiXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcblx0cmV0dXJuIGEgIT0gYVxuXHRcdD8gYiA9PSBiXG5cdFx0OiBhICE9PSBiIHx8IChhICE9PSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQHBhcmFtIHt1bmtub3dufSBhXG4gKiBAcGFyYW0ge3Vua25vd259IGJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcblx0cmV0dXJuIGEgIT09IGI7XG59XG5cbi8qKiBAdHlwZSB7RXF1YWxzfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVfZXF1YWxzKHZhbHVlKSB7XG5cdHJldHVybiAhc2FmZV9ub3RfZXF1YWwodmFsdWUsIHRoaXMudik7XG59XG4iLCIvKiogVHJ1ZSBpZiBleHBlcmltZW50YWwuYXN5bmM9dHJ1ZSAqL1xuZXhwb3J0IGxldCBhc3luY19tb2RlX2ZsYWcgPSBmYWxzZTtcbi8qKiBUcnVlIGlmIHdlJ3JlIG5vdCBjZXJ0YWluIHRoYXQgd2Ugb25seSBoYXZlIFN2ZWx0ZSA1IGNvZGUgaW4gdGhlIGNvbXBpbGF0aW9uICovXG5leHBvcnQgbGV0IGxlZ2FjeV9tb2RlX2ZsYWcgPSBmYWxzZTtcbi8qKiBUcnVlIGlmICRpbnNwZWN0LnRyYWNlIGlzIHVzZWQgKi9cbmV4cG9ydCBsZXQgdHJhY2luZ19tb2RlX2ZsYWcgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZV9hc3luY19tb2RlX2ZsYWcoKSB7XG5cdGFzeW5jX21vZGVfZmxhZyA9IHRydWU7XG59XG5cbi8qKiBPTkxZIFVTRSBUSElTIERVUklORyBURVNUSU5HICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZV9hc3luY19tb2RlX2ZsYWcoKSB7XG5cdGFzeW5jX21vZGVfZmxhZyA9IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlX2xlZ2FjeV9tb2RlX2ZsYWcoKSB7XG5cdGxlZ2FjeV9tb2RlX2ZsYWcgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlX3RyYWNpbmdfbW9kZV9mbGFnKCkge1xuXHR0cmFjaW5nX21vZGVfZmxhZyA9IHRydWU7XG59XG4iLCIvKiogQGltcG9ydCB7IENvbXBvbmVudENvbnRleHQsIERldlN0YWNrRW50cnksIEVmZmVjdCB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgYWN0aXZlX2VmZmVjdCwgYWN0aXZlX3JlYWN0aW9uIH0gZnJvbSAnLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IGNyZWF0ZV91c2VyX2VmZmVjdCB9IGZyb20gJy4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGFzeW5jX21vZGVfZmxhZywgbGVnYWN5X21vZGVfZmxhZyB9IGZyb20gJy4uL2ZsYWdzL2luZGV4LmpzJztcbmltcG9ydCB7IEZJTEVOQU1FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IEJSQU5DSF9FRkZFQ1QsIFJFQUNUSU9OX1JBTiB9IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuLyoqIEB0eXBlIHtDb21wb25lbnRDb250ZXh0IHwgbnVsbH0gKi9cbmV4cG9ydCBsZXQgY29tcG9uZW50X2NvbnRleHQgPSBudWxsO1xuXG4vKiogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0IHwgbnVsbH0gY29udGV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9jb21wb25lbnRfY29udGV4dChjb250ZXh0KSB7XG5cdGNvbXBvbmVudF9jb250ZXh0ID0gY29udGV4dDtcbn1cblxuLyoqIEB0eXBlIHtEZXZTdGFja0VudHJ5IHwgbnVsbH0gKi9cbmV4cG9ydCBsZXQgZGV2X3N0YWNrID0gbnVsbDtcblxuLyoqIEBwYXJhbSB7RGV2U3RhY2tFbnRyeSB8IG51bGx9IHN0YWNrICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rldl9zdGFjayhzdGFjaykge1xuXHRkZXZfc3RhY2sgPSBzdGFjaztcbn1cblxuLyoqXG4gKiBFeGVjdXRlIGEgY2FsbGJhY2sgd2l0aCBhIG5ldyBkZXYgc3RhY2sgZW50cnlcbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAqIEBwYXJhbSB7RGV2U3RhY2tFbnRyeVsndHlwZSddfSB0eXBlIC0gVHlwZSBvZiBibG9jay9jb21wb25lbnRcbiAqIEBwYXJhbSB7YW55fSBjb21wb25lbnQgLSBDb21wb25lbnQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW4gLSBDb2x1bW4gbnVtYmVyXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IFthZGRpdGlvbmFsXSAtIEFueSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdG8gYWRkIHRvIHRoZSBkZXYgc3RhY2sgZW50cnlcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRfc3ZlbHRlX21ldGEoY2FsbGJhY2ssIHR5cGUsIGNvbXBvbmVudCwgbGluZSwgY29sdW1uLCBhZGRpdGlvbmFsKSB7XG5cdGNvbnN0IHBhcmVudCA9IGRldl9zdGFjaztcblxuXHRkZXZfc3RhY2sgPSB7XG5cdFx0dHlwZSxcblx0XHRmaWxlOiBjb21wb25lbnRbRklMRU5BTUVdLFxuXHRcdGxpbmUsXG5cdFx0Y29sdW1uLFxuXHRcdHBhcmVudCxcblx0XHQuLi5hZGRpdGlvbmFsXG5cdH07XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gY2FsbGJhY2soKTtcblx0fSBmaW5hbGx5IHtcblx0XHRkZXZfc3RhY2sgPSBwYXJlbnQ7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgY3VycmVudCBjb21wb25lbnQgZnVuY3Rpb24uIERpZmZlcmVudCBmcm9tIGN1cnJlbnQgY29tcG9uZW50IGNvbnRleHQ6XG4gKiBgYGBodG1sXG4gKiA8IS0tIEFwcC5zdmVsdGUgLS0+XG4gKiA8Rm9vPlxuICogICA8QmFyIC8+IDwhLS0gY29udGV4dCA9PSBGb28uc3ZlbHRlLCBmdW5jdGlvbiA9PSBBcHAuc3ZlbHRlIC0tPlxuICogPC9Gb28+XG4gKiBgYGBcbiAqIEB0eXBlIHtDb21wb25lbnRDb250ZXh0WydmdW5jdGlvbiddfVxuICovXG5leHBvcnQgbGV0IGRldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbiA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge0NvbXBvbmVudENvbnRleHRbJ2Z1bmN0aW9uJ119IGZuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2Rldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbihmbikge1xuXHRkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24gPSBmbjtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgYFtnZXQsIHNldF1gIHBhaXIgb2YgZnVuY3Rpb25zIGZvciB3b3JraW5nIHdpdGggY29udGV4dCBpbiBhIHR5cGUtc2FmZSB3YXkuXG4gKlxuICogYGdldGAgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBubyBwYXJlbnQgY29tcG9uZW50IGNhbGxlZCBgc2V0YC5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHJldHVybnMge1soKSA9PiBULCAoY29udGV4dDogVCkgPT4gVF19XG4gKiBAc2luY2UgNS40MC4wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KCkge1xuXHRjb25zdCBrZXkgPSB7fTtcblxuXHRyZXR1cm4gW1xuXHRcdCgpID0+IHtcblx0XHRcdGlmICghaGFzQ29udGV4dChrZXkpKSB7XG5cdFx0XHRcdGUubWlzc2luZ19jb250ZXh0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBnZXRDb250ZXh0KGtleSk7XG5cdFx0fSxcblx0XHQoY29udGV4dCkgPT4gc2V0Q29udGV4dChrZXksIGNvbnRleHQpXG5cdF07XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjb250ZXh0IHRoYXQgYmVsb25ncyB0byB0aGUgY2xvc2VzdCBwYXJlbnQgY29tcG9uZW50IHdpdGggdGhlIHNwZWNpZmllZCBga2V5YC5cbiAqIE11c3QgYmUgY2FsbGVkIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uXG4gKlxuICogW2BjcmVhdGVDb250ZXh0YF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlL3N2ZWx0ZSNjcmVhdGVDb250ZXh0KSBpcyBhIHR5cGUtc2FmZSBhbHRlcm5hdGl2ZS5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHthbnl9IGtleVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuXHRjb25zdCBjb250ZXh0X21hcCA9IGdldF9vcl9pbml0X2NvbnRleHRfbWFwKCdnZXRDb250ZXh0Jyk7XG5cdGNvbnN0IHJlc3VsdCA9IC8qKiBAdHlwZSB7VH0gKi8gKGNvbnRleHRfbWFwLmdldChrZXkpKTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBc3NvY2lhdGVzIGFuIGFyYml0cmFyeSBgY29udGV4dGAgb2JqZWN0IHdpdGggdGhlIGN1cnJlbnQgY29tcG9uZW50IGFuZCB0aGUgc3BlY2lmaWVkIGBrZXlgXG4gKiBhbmQgcmV0dXJucyB0aGF0IG9iamVjdC4gVGhlIGNvbnRleHQgaXMgdGhlbiBhdmFpbGFibGUgdG8gY2hpbGRyZW4gb2YgdGhlIGNvbXBvbmVudFxuICogKGluY2x1ZGluZyBzbG90dGVkIGNvbnRlbnQpIHdpdGggYGdldENvbnRleHRgLlxuICpcbiAqIExpa2UgbGlmZWN5Y2xlIGZ1bmN0aW9ucywgdGhpcyBtdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICpcbiAqIFtgY3JlYXRlQ29udGV4dGBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS9zdmVsdGUjY3JlYXRlQ29udGV4dCkgaXMgYSB0eXBlLXNhZmUgYWx0ZXJuYXRpdmUuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7YW55fSBrZXlcbiAqIEBwYXJhbSB7VH0gY29udGV4dFxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuXHRjb25zdCBjb250ZXh0X21hcCA9IGdldF9vcl9pbml0X2NvbnRleHRfbWFwKCdzZXRDb250ZXh0Jyk7XG5cblx0aWYgKGFzeW5jX21vZGVfZmxhZykge1xuXHRcdHZhciBmbGFncyA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkuZjtcblx0XHR2YXIgdmFsaWQgPVxuXHRcdFx0IWFjdGl2ZV9yZWFjdGlvbiAmJlxuXHRcdFx0KGZsYWdzICYgQlJBTkNIX0VGRkVDVCkgIT09IDAgJiZcblx0XHRcdC8vIHBvcCgpIHJ1bnMgc3luY2hyb25vdXNseSwgc28gdGhpcyBpbmRpY2F0ZXMgd2UncmUgc2V0dGluZyBjb250ZXh0IGFmdGVyIGFuIGF3YWl0XG5cdFx0XHQhKC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dH0gKi8gKGNvbXBvbmVudF9jb250ZXh0KS5pKTtcblxuXHRcdGlmICghdmFsaWQpIHtcblx0XHRcdGUuc2V0X2NvbnRleHRfYWZ0ZXJfaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnRleHRfbWFwLnNldChrZXksIGNvbnRleHQpO1xuXHRyZXR1cm4gY29udGV4dDtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIGdpdmVuIGBrZXlgIGhhcyBiZWVuIHNldCBpbiB0aGUgY29udGV4dCBvZiBhIHBhcmVudCBjb21wb25lbnQuXG4gKiBNdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7YW55fSBrZXlcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzQ29udGV4dChrZXkpIHtcblx0Y29uc3QgY29udGV4dF9tYXAgPSBnZXRfb3JfaW5pdF9jb250ZXh0X21hcCgnaGFzQ29udGV4dCcpO1xuXHRyZXR1cm4gY29udGV4dF9tYXAuaGFzKGtleSk7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSB3aG9sZSBjb250ZXh0IG1hcCB0aGF0IGJlbG9uZ3MgdG8gdGhlIGNsb3Nlc3QgcGFyZW50IGNvbXBvbmVudC5cbiAqIE11c3QgYmUgY2FsbGVkIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uIFVzZWZ1bCwgZm9yIGV4YW1wbGUsIGlmIHlvdVxuICogcHJvZ3JhbW1hdGljYWxseSBjcmVhdGUgYSBjb21wb25lbnQgYW5kIHdhbnQgdG8gcGFzcyB0aGUgZXhpc3RpbmcgY29udGV4dCB0byBpdC5cbiAqXG4gKiBAdGVtcGxhdGUge01hcDxhbnksIGFueT59IFtUPU1hcDxhbnksIGFueT5dXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbENvbnRleHRzKCkge1xuXHRjb25zdCBjb250ZXh0X21hcCA9IGdldF9vcl9pbml0X2NvbnRleHRfbWFwKCdnZXRBbGxDb250ZXh0cycpO1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtUfSAqLyAoY29udGV4dF9tYXApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59IHByb3BzXG4gKiBAcGFyYW0ge2FueX0gcnVuZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVzaChwcm9wcywgcnVuZXMgPSBmYWxzZSwgZm4pIHtcblx0Y29tcG9uZW50X2NvbnRleHQgPSB7XG5cdFx0cDogY29tcG9uZW50X2NvbnRleHQsXG5cdFx0aTogZmFsc2UsXG5cdFx0YzogbnVsbCxcblx0XHRlOiBudWxsLFxuXHRcdHM6IHByb3BzLFxuXHRcdHg6IG51bGwsXG5cdFx0bDogbGVnYWN5X21vZGVfZmxhZyAmJiAhcnVuZXMgPyB7IHM6IG51bGwsIHU6IG51bGwsICQ6IFtdIH0gOiBudWxsXG5cdH07XG5cblx0aWYgKERFVikge1xuXHRcdC8vIGNvbXBvbmVudCBmdW5jdGlvblxuXHRcdGNvbXBvbmVudF9jb250ZXh0LmZ1bmN0aW9uID0gZm47XG5cdFx0ZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uID0gZm47XG5cdH1cbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge1JlY29yZDxzdHJpbmcsIGFueT59IFRcbiAqIEBwYXJhbSB7VH0gW2NvbXBvbmVudF1cbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9wKGNvbXBvbmVudCkge1xuXHR2YXIgY29udGV4dCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dH0gKi8gKGNvbXBvbmVudF9jb250ZXh0KTtcblx0dmFyIGVmZmVjdHMgPSBjb250ZXh0LmU7XG5cblx0aWYgKGVmZmVjdHMgIT09IG51bGwpIHtcblx0XHRjb250ZXh0LmUgPSBudWxsO1xuXG5cdFx0Zm9yICh2YXIgZm4gb2YgZWZmZWN0cykge1xuXHRcdFx0Y3JlYXRlX3VzZXJfZWZmZWN0KGZuKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoY29tcG9uZW50ICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb250ZXh0LnggPSBjb21wb25lbnQ7XG5cdH1cblxuXHRjb250ZXh0LmkgPSB0cnVlO1xuXG5cdGNvbXBvbmVudF9jb250ZXh0ID0gY29udGV4dC5wO1xuXG5cdGlmIChERVYpIHtcblx0XHRkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24gPSBjb21wb25lbnRfY29udGV4dD8uZnVuY3Rpb24gPz8gbnVsbDtcblx0fVxuXG5cdHJldHVybiBjb21wb25lbnQgPz8gLyoqIEB0eXBlIHtUfSAqLyAoe30pO1xufVxuXG4vKiogQHJldHVybnMge2Jvb2xlYW59ICovXG5leHBvcnQgZnVuY3Rpb24gaXNfcnVuZXMoKSB7XG5cdHJldHVybiAhbGVnYWN5X21vZGVfZmxhZyB8fCAoY29tcG9uZW50X2NvbnRleHQgIT09IG51bGwgJiYgY29tcG9uZW50X2NvbnRleHQubCA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtNYXA8dW5rbm93biwgdW5rbm93bj59XG4gKi9cbmZ1bmN0aW9uIGdldF9vcl9pbml0X2NvbnRleHRfbWFwKG5hbWUpIHtcblx0aWYgKGNvbXBvbmVudF9jb250ZXh0ID09PSBudWxsKSB7XG5cdFx0ZS5saWZlY3ljbGVfb3V0c2lkZV9jb21wb25lbnQobmFtZSk7XG5cdH1cblxuXHRyZXR1cm4gKGNvbXBvbmVudF9jb250ZXh0LmMgPz89IG5ldyBNYXAoZ2V0X3BhcmVudF9jb250ZXh0KGNvbXBvbmVudF9jb250ZXh0KSB8fCB1bmRlZmluZWQpKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0NvbXBvbmVudENvbnRleHR9IGNvbXBvbmVudF9jb250ZXh0XG4gKiBAcmV0dXJucyB7TWFwPHVua25vd24sIHVua25vd24+IHwgbnVsbH1cbiAqL1xuZnVuY3Rpb24gZ2V0X3BhcmVudF9jb250ZXh0KGNvbXBvbmVudF9jb250ZXh0KSB7XG5cdGxldCBwYXJlbnQgPSBjb21wb25lbnRfY29udGV4dC5wO1xuXHR3aGlsZSAocGFyZW50ICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgY29udGV4dF9tYXAgPSBwYXJlbnQuYztcblx0XHRpZiAoY29udGV4dF9tYXAgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBjb250ZXh0X21hcDtcblx0XHR9XG5cdFx0cGFyZW50ID0gcGFyZW50LnA7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQgeyBydW5fYWxsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGlzX2ZsdXNoaW5nX3N5bmMgfSBmcm9tICcuLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcblxuLyoqIEB0eXBlIHtBcnJheTwoKSA9PiB2b2lkPn0gKi9cbmxldCBtaWNyb190YXNrcyA9IFtdO1xuXG5mdW5jdGlvbiBydW5fbWljcm9fdGFza3MoKSB7XG5cdHZhciB0YXNrcyA9IG1pY3JvX3Rhc2tzO1xuXHRtaWNyb190YXNrcyA9IFtdO1xuXHRydW5fYWxsKHRhc2tzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWV1ZV9taWNyb190YXNrKGZuKSB7XG5cdGlmIChtaWNyb190YXNrcy5sZW5ndGggPT09IDAgJiYgIWlzX2ZsdXNoaW5nX3N5bmMpIHtcblx0XHR2YXIgdGFza3MgPSBtaWNyb190YXNrcztcblx0XHRxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG5cdFx0XHQvLyBJZiB0aGlzIGlzIGZhbHNlLCBhIGZsdXNoU3luYyBoYXBwZW5lZCBpbiB0aGUgbWVhbnRpbWUuIERvIF9ub3RfIHJ1biBuZXcgc2NoZWR1bGVkIG1pY3JvdGFza3MgaW4gdGhhdCBjYXNlXG5cdFx0XHQvLyBhcyB0aGUgb3JkZXJpbmcgb2YgbWljcm90YXNrcyB3b3VsZCBiZSBicm9rZW4gYXQgdGhhdCBwb2ludCAtIGNvbnNpZGVyIHRoaXMgY2FzZTpcblx0XHRcdC8vIC0gcXVldWVfbWljcm9fdGFzayBzY2hlZHVsZXMgbWljcm90YXNrIEEgdG8gZmx1c2ggdGFzayBYXG5cdFx0XHQvLyAtIHN5bmNocm9ub3VzbHkgYWZ0ZXIsIGZsdXNoU3luYyBydW5zLCBwcm9jZXNzaW5nIHRhc2sgWFxuXHRcdFx0Ly8gLSBzeW5jaHJvbm91c2x5IGFmdGVyLCBzb21lIG90aGVyIG1pY3JvdGFzayBCIGlzIHNjaGVkdWxlZCwgYnV0IG5vdCB0aHJvdWdoIHF1ZXVlX21pY3JvX3Rhc2sgYnV0IGZvciBleGFtcGxlIGEgUHJvbWlzZS5yZXNvbHZlKCkgaW4gdXNlciBjb2RlXG5cdFx0XHQvLyAtIHN5bmNocm9ub3VzbHkgYWZ0ZXIsIHF1ZXVlX21pY3JvX3Rhc2sgc2NoZWR1bGVzIG1pY3JvdGFzayBDIHRvIGZsdXNoIHRhc2sgWVxuXHRcdFx0Ly8gLSBvbmUgdGljayBsYXRlciwgbWljcm90YXNrIEEgbm93IHJlc29sdmVzLCBmbHVzaGluZyB0YXNrIFkgYmVmb3JlIG1pY3JvdGFzayBCLCB3aGljaCBpcyBpbmNvcnJlY3Rcblx0XHRcdC8vIFRoaXMgaWYgY2hlY2sgcHJldmVudHMgdGhhdCByYWNlIGNvbmRpdGlvbiAodGhhdCByZWFsaXN0aWNhbGx5IHdpbGwgb25seSBoYXBwZW4gaW4gdGVzdHMpXG5cdFx0XHRpZiAodGFza3MgPT09IG1pY3JvX3Rhc2tzKSBydW5fbWljcm9fdGFza3MoKTtcblx0XHR9KTtcblx0fVxuXG5cdG1pY3JvX3Rhc2tzLnB1c2goZm4pO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzbHkgcnVuIGFueSBxdWV1ZWQgdGFza3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbHVzaF90YXNrcygpIHtcblx0d2hpbGUgKG1pY3JvX3Rhc2tzLmxlbmd0aCA+IDApIHtcblx0XHRydW5fbWljcm9fdGFza3MoKTtcblx0fVxufVxuIiwiLyoqIEBpbXBvcnQgeyBEZXJpdmVkLCBFZmZlY3QgfSBmcm9tICcjY2xpZW50JyAqL1xuLyoqIEBpbXBvcnQgeyBCb3VuZGFyeSB9IGZyb20gJy4vZG9tL2Jsb2Nrcy9ib3VuZGFyeS5qcycgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgRklMRU5BTUUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaXNfZmlyZWZveCB9IGZyb20gJy4vZG9tL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHsgRVJST1JfVkFMVUUsIEJPVU5EQVJZX0VGRkVDVCwgUkVBQ1RJT05fUkFOLCBFRkZFQ1QgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBkZWZpbmVfcHJvcGVydHksIGdldF9kZXNjcmlwdG9yIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9lZmZlY3QsIGFjdGl2ZV9yZWFjdGlvbiB9IGZyb20gJy4vcnVudGltZS5qcyc7XG5cbmNvbnN0IGFkanVzdG1lbnRzID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBAcGFyYW0ge3Vua25vd259IGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfZXJyb3IoZXJyb3IpIHtcblx0dmFyIGVmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cblx0Ly8gZm9yIHVub3duZWQgZGVyaXZlZHMsIGRvbid0IHRocm93IHVudGlsIHdlIHJlYWQgdGhlIHZhbHVlXG5cdGlmIChlZmZlY3QgPT09IG51bGwpIHtcblx0XHQvKiogQHR5cGUge0Rlcml2ZWR9ICovIChhY3RpdmVfcmVhY3Rpb24pLmYgfD0gRVJST1JfVkFMVUU7XG5cdFx0cmV0dXJuIGVycm9yO1xuXHR9XG5cblx0aWYgKERFViAmJiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICFhZGp1c3RtZW50cy5oYXMoZXJyb3IpKSB7XG5cdFx0YWRqdXN0bWVudHMuc2V0KGVycm9yLCBnZXRfYWRqdXN0bWVudHMoZXJyb3IsIGVmZmVjdCkpO1xuXHR9XG5cblx0Ly8gaWYgdGhlIGVycm9yIG9jY3VycmVkIHdoaWxlIGNyZWF0aW5nIHRoaXMgc3VidHJlZSwgd2UgbGV0IGl0XG5cdC8vIGJ1YmJsZSB1cCB1bnRpbCBpdCBoaXRzIGEgYm91bmRhcnkgdGhhdCBjYW4gaGFuZGxlIGl0LCB1bmxlc3Ncblx0Ly8gaXQncyBhbiAkZWZmZWN0IGluIHdoaWNoIGNhc2UgaXQgZG9lc24ndCBydW4gaW1tZWRpYXRlbHlcblx0aWYgKChlZmZlY3QuZiAmIFJFQUNUSU9OX1JBTikgPT09IDAgJiYgKGVmZmVjdC5mICYgRUZGRUNUKSA9PT0gMCkge1xuXHRcdGlmIChERVYgJiYgIWVmZmVjdC5wYXJlbnQgJiYgZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0YXBwbHlfYWRqdXN0bWVudHMoZXJyb3IpO1xuXHRcdH1cblxuXHRcdHRocm93IGVycm9yO1xuXHR9XG5cblx0Ly8gb3RoZXJ3aXNlIHdlIGJ1YmJsZSB1cCB0aGUgZWZmZWN0IHRyZWUgb3Vyc2VsdmVzXG5cdGludm9rZV9lcnJvcl9ib3VuZGFyeShlcnJvciwgZWZmZWN0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3Vua25vd259IGVycm9yXG4gKiBAcGFyYW0ge0VmZmVjdCB8IG51bGx9IGVmZmVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlX2Vycm9yX2JvdW5kYXJ5KGVycm9yLCBlZmZlY3QpIHtcblx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCkge1xuXHRcdGlmICgoZWZmZWN0LmYgJiBCT1VOREFSWV9FRkZFQ1QpICE9PSAwKSB7XG5cdFx0XHRpZiAoKGVmZmVjdC5mICYgUkVBQ1RJT05fUkFOKSA9PT0gMCkge1xuXHRcdFx0XHQvLyB3ZSBhcmUgc3RpbGwgY3JlYXRpbmcgdGhlIGJvdW5kYXJ5IGVmZmVjdFxuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0LyoqIEB0eXBlIHtCb3VuZGFyeX0gKi8gKGVmZmVjdC5iKS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0ZXJyb3IgPSBlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGVmZmVjdCA9IGVmZmVjdC5wYXJlbnQ7XG5cdH1cblxuXHRpZiAoREVWICYmIGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRhcHBseV9hZGp1c3RtZW50cyhlcnJvcik7XG5cdH1cblxuXHR0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBBZGQgdXNlZnVsIGluZm9ybWF0aW9uIHRvIHRoZSBlcnJvciBtZXNzYWdlL3N0YWNrIGluIGRldmVsb3BtZW50XG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICovXG5mdW5jdGlvbiBnZXRfYWRqdXN0bWVudHMoZXJyb3IsIGVmZmVjdCkge1xuXHRjb25zdCBtZXNzYWdlX2Rlc2NyaXB0b3IgPSBnZXRfZGVzY3JpcHRvcihlcnJvciwgJ21lc3NhZ2UnKTtcblxuXHQvLyBpZiB0aGUgbWVzc2FnZSB3YXMgYWxyZWFkeSBjaGFuZ2VkIGFuZCBpdCdzIG5vdCBjb25maWd1cmFibGUgd2UgY2FuJ3QgY2hhbmdlIGl0XG5cdC8vIG9yIGl0IHdpbGwgdGhyb3cgYSBkaWZmZXJlbnQgZXJyb3Igc3dhbGxvd2luZyB0aGUgb3JpZ2luYWwgZXJyb3Jcblx0aWYgKG1lc3NhZ2VfZGVzY3JpcHRvciAmJiAhbWVzc2FnZV9kZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkgcmV0dXJuO1xuXG5cdHZhciBpbmRlbnQgPSBpc19maXJlZm94ID8gJyAgJyA6ICdcXHQnO1xuXHR2YXIgY29tcG9uZW50X3N0YWNrID0gYFxcbiR7aW5kZW50fWluICR7ZWZmZWN0LmZuPy5uYW1lIHx8ICc8dW5rbm93bj4nfWA7XG5cdHZhciBjb250ZXh0ID0gZWZmZWN0LmN0eDtcblxuXHR3aGlsZSAoY29udGV4dCAhPT0gbnVsbCkge1xuXHRcdGNvbXBvbmVudF9zdGFjayArPSBgXFxuJHtpbmRlbnR9aW4gJHtjb250ZXh0LmZ1bmN0aW9uPy5bRklMRU5BTUVdLnNwbGl0KCcvJykucG9wKCl9YDtcblx0XHRjb250ZXh0ID0gY29udGV4dC5wO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRtZXNzYWdlOiBlcnJvci5tZXNzYWdlICsgYFxcbiR7Y29tcG9uZW50X3N0YWNrfVxcbmAsXG5cdFx0c3RhY2s6IGVycm9yLnN0YWNrXG5cdFx0XHQ/LnNwbGl0KCdcXG4nKVxuXHRcdFx0LmZpbHRlcigobGluZSkgPT4gIWxpbmUuaW5jbHVkZXMoJ3N2ZWx0ZS9zcmMvaW50ZXJuYWwnKSlcblx0XHRcdC5qb2luKCdcXG4nKVxuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKi9cbmZ1bmN0aW9uIGFwcGx5X2FkanVzdG1lbnRzKGVycm9yKSB7XG5cdGNvbnN0IGFkanVzdGVkID0gYWRqdXN0bWVudHMuZ2V0KGVycm9yKTtcblxuXHRpZiAoYWRqdXN0ZWQpIHtcblx0XHRkZWZpbmVfcHJvcGVydHkoZXJyb3IsICdtZXNzYWdlJywge1xuXHRcdFx0dmFsdWU6IGFkanVzdGVkLm1lc3NhZ2Vcblx0XHR9KTtcblxuXHRcdGRlZmluZV9wcm9wZXJ0eShlcnJvciwgJ3N0YWNrJywge1xuXHRcdFx0dmFsdWU6IGFkanVzdGVkLnN0YWNrXG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRGVyaXZlZCwgU2lnbmFsIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IENMRUFOLCBDT05ORUNURUQsIERJUlRZLCBNQVlCRV9ESVJUWSB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcblxuY29uc3QgU1RBVFVTX01BU0sgPSB+KERJUlRZIHwgTUFZQkVfRElSVFkgfCBDTEVBTik7XG5cbi8qKlxuICogQHBhcmFtIHtTaWduYWx9IHNpZ25hbFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3NpZ25hbF9zdGF0dXMoc2lnbmFsLCBzdGF0dXMpIHtcblx0c2lnbmFsLmYgPSAoc2lnbmFsLmYgJiBTVEFUVVNfTUFTSykgfCBzdGF0dXM7XG59XG5cbi8qKlxuICogU2V0IGEgZGVyaXZlZCdzIHN0YXR1cyB0byBDTEVBTiBvciBNQVlCRV9ESVJUWSBiYXNlZCBvbiBpdHMgY29ubmVjdGlvbiBzdGF0ZS5cbiAqIEBwYXJhbSB7RGVyaXZlZH0gZGVyaXZlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX2Rlcml2ZWRfc3RhdHVzKGRlcml2ZWQpIHtcblx0Ly8gT25seSBtYXJrIGFzIE1BWUJFX0RJUlRZIGlmIGRpc2Nvbm5lY3RlZCBhbmQgaGFzIGRlcGVuZGVuY2llcy5cblx0aWYgKChkZXJpdmVkLmYgJiBDT05ORUNURUQpICE9PSAwIHx8IGRlcml2ZWQuZGVwcyA9PT0gbnVsbCkge1xuXHRcdHNldF9zaWduYWxfc3RhdHVzKGRlcml2ZWQsIENMRUFOKTtcblx0fSBlbHNlIHtcblx0XHRzZXRfc2lnbmFsX3N0YXR1cyhkZXJpdmVkLCBNQVlCRV9ESVJUWSk7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRGVyaXZlZCwgRWZmZWN0LCBWYWx1ZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBDTEVBTiwgREVSSVZFRCwgRElSVFksIE1BWUJFX0RJUlRZLCBXQVNfTUFSS0VEIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgc2V0X3NpZ25hbF9zdGF0dXMgfSBmcm9tICcuL3N0YXR1cy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtWYWx1ZVtdIHwgbnVsbH0gZGVwc1xuICovXG5mdW5jdGlvbiBjbGVhcl9tYXJrZWQoZGVwcykge1xuXHRpZiAoZGVwcyA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdGZvciAoY29uc3QgZGVwIG9mIGRlcHMpIHtcblx0XHRpZiAoKGRlcC5mICYgREVSSVZFRCkgPT09IDAgfHwgKGRlcC5mICYgV0FTX01BUktFRCkgPT09IDApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGRlcC5mIF49IFdBU19NQVJLRUQ7XG5cblx0XHRjbGVhcl9tYXJrZWQoLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoZGVwKS5kZXBzKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7U2V0PEVmZmVjdD59IGRpcnR5X2VmZmVjdHNcbiAqIEBwYXJhbSB7U2V0PEVmZmVjdD59IG1heWJlX2RpcnR5X2VmZmVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmVyX2VmZmVjdChlZmZlY3QsIGRpcnR5X2VmZmVjdHMsIG1heWJlX2RpcnR5X2VmZmVjdHMpIHtcblx0aWYgKChlZmZlY3QuZiAmIERJUlRZKSAhPT0gMCkge1xuXHRcdGRpcnR5X2VmZmVjdHMuYWRkKGVmZmVjdCk7XG5cdH0gZWxzZSBpZiAoKGVmZmVjdC5mICYgTUFZQkVfRElSVFkpICE9PSAwKSB7XG5cdFx0bWF5YmVfZGlydHlfZWZmZWN0cy5hZGQoZWZmZWN0KTtcblx0fVxuXG5cdC8vIFNpbmNlIHdlJ3JlIG5vdCBleGVjdXRpbmcgdGhlc2UgZWZmZWN0cyBub3csIHdlIG5lZWQgdG8gY2xlYXIgYW55IFdBU19NQVJLRUQgZmxhZ3Ncblx0Ly8gc28gdGhhdCBvdGhlciBiYXRjaGVzIGNhbiBjb3JyZWN0bHkgcmVhY2ggdGhlc2UgZWZmZWN0cyBkdXJpbmcgdGhlaXIgb3duIHRyYXZlcnNhbFxuXHRjbGVhcl9tYXJrZWQoZWZmZWN0LmRlcHMpO1xuXG5cdC8vIG1hcmsgYXMgY2xlYW4gc28gdGhleSBnZXQgc2NoZWR1bGVkIGlmIHRoZXkgZGVwZW5kIG9uIHBlbmRpbmcgYXN5bmMgc3RhdGVcblx0c2V0X3NpZ25hbF9zdGF0dXMoZWZmZWN0LCBDTEVBTik7XG59XG4iLCIvKiogQGltcG9ydCB7IEZvcmsgfSBmcm9tICdzdmVsdGUnICovXG4vKiogQGltcG9ydCB7IERlcml2ZWQsIEVmZmVjdCwgUmVhY3Rpb24sIFNvdXJjZSwgVmFsdWUgfSBmcm9tICcjY2xpZW50JyAqL1xuLyoqIEBpbXBvcnQgeyBCb3VuZGFyeSB9IGZyb20gJy4uL2RvbS9ibG9ja3MvYm91bmRhcnknICovXG5pbXBvcnQge1xuXHRCTE9DS19FRkZFQ1QsXG5cdEJSQU5DSF9FRkZFQ1QsXG5cdENMRUFOLFxuXHRERVNUUk9ZRUQsXG5cdERJUlRZLFxuXHRFRkZFQ1QsXG5cdEFTWU5DLFxuXHRJTkVSVCxcblx0UkVOREVSX0VGRkVDVCxcblx0Uk9PVF9FRkZFQ1QsXG5cdE1BWUJFX0RJUlRZLFxuXHRERVJJVkVELFxuXHRCT1VOREFSWV9FRkZFQ1QsXG5cdEVBR0VSX0VGRkVDVCxcblx0SEVBRF9FRkZFQ1QsXG5cdEVSUk9SX1ZBTFVFLFxuXHRNQU5BR0VEX0VGRkVDVCxcblx0UkVBQ1RJT05fUkFOXG59IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IGFzeW5jX21vZGVfZmxhZyB9IGZyb20gJy4uLy4uL2ZsYWdzL2luZGV4LmpzJztcbmltcG9ydCB7IGRlZmVycmVkLCBkZWZpbmVfcHJvcGVydHksIGluY2x1ZGVzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7XG5cdGFjdGl2ZV9lZmZlY3QsXG5cdGdldCxcblx0aW5jcmVtZW50X3dyaXRlX3ZlcnNpb24sXG5cdGlzX2RpcnR5LFxuXHR1cGRhdGVfZWZmZWN0XG59IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgZmx1c2hfdGFza3MsIHF1ZXVlX21pY3JvX3Rhc2sgfSBmcm9tICcuLi9kb20vdGFzay5qcyc7XG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IGludm9rZV9lcnJvcl9ib3VuZGFyeSB9IGZyb20gJy4uL2Vycm9yLWhhbmRsaW5nLmpzJztcbmltcG9ydCB7IGZsdXNoX2VhZ2VyX2VmZmVjdHMsIG9sZF92YWx1ZXMsIHNldF9lYWdlcl9lZmZlY3RzLCBzb3VyY2UsIHVwZGF0ZSB9IGZyb20gJy4vc291cmNlcy5qcyc7XG5pbXBvcnQgeyBlYWdlcl9lZmZlY3QsIHVubGlua19lZmZlY3QgfSBmcm9tICcuL2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgZGVmZXJfZWZmZWN0IH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBVTklOSVRJQUxJWkVEIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IHNldF9zaWduYWxfc3RhdHVzIH0gZnJvbSAnLi9zdGF0dXMuanMnO1xuXG4vKiogQHR5cGUge1NldDxCYXRjaD59ICovXG5jb25zdCBiYXRjaGVzID0gbmV3IFNldCgpO1xuXG4vKiogQHR5cGUge0JhdGNoIHwgbnVsbH0gKi9cbmV4cG9ydCBsZXQgY3VycmVudF9iYXRjaCA9IG51bGw7XG5cbi8qKlxuICogVGhpcyBpcyBuZWVkZWQgdG8gYXZvaWQgb3ZlcndyaXRpbmcgaW5wdXRzIGluIG5vbi1hc3luYyBtb2RlXG4gKiBUT0RPIDYuMCByZW1vdmUgdGhpcywgYXMgbm9uLWFzeW5jIG1vZGUgd2lsbCBnbyBhd2F5XG4gKiBAdHlwZSB7QmF0Y2ggfCBudWxsfVxuICovXG5leHBvcnQgbGV0IHByZXZpb3VzX2JhdGNoID0gbnVsbDtcblxuLyoqXG4gKiBXaGVuIHRpbWUgdHJhdmVsbGluZyAoaS5lLiB3b3JraW5nIGluIG9uZSBiYXRjaCwgd2hpbGUgb3RoZXIgYmF0Y2hlc1xuICogc3RpbGwgaGF2ZSBvbmdvaW5nIHdvcmspLCB3ZSBpZ25vcmUgdGhlIHJlYWwgdmFsdWVzIG9mIGFmZmVjdGVkXG4gKiBzaWduYWxzIGluIGZhdm91ciBvZiB0aGVpciB2YWx1ZXMgd2l0aGluIHRoZSBiYXRjaFxuICogQHR5cGUge01hcDxWYWx1ZSwgYW55PiB8IG51bGx9XG4gKi9cbmV4cG9ydCBsZXQgYmF0Y2hfdmFsdWVzID0gbnVsbDtcblxuLy8gVE9ETyB0aGlzIHNob3VsZCByZWFsbHkgYmUgYSBwcm9wZXJ0eSBvZiBgYmF0Y2hgXG4vKiogQHR5cGUge0VmZmVjdFtdfSAqL1xubGV0IHF1ZXVlZF9yb290X2VmZmVjdHMgPSBbXTtcblxuLyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xubGV0IGxhc3Rfc2NoZWR1bGVkX2VmZmVjdCA9IG51bGw7XG5cbmxldCBpc19mbHVzaGluZyA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc19mbHVzaGluZ19zeW5jID0gZmFsc2U7XG5cbmV4cG9ydCBjbGFzcyBCYXRjaCB7XG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCB2YWx1ZXMgb2YgYW55IHNvdXJjZXMgdGhhdCBhcmUgdXBkYXRlZCBpbiB0aGlzIGJhdGNoXG5cdCAqIFRoZXkga2V5cyBvZiB0aGlzIG1hcCBhcmUgaWRlbnRpY2FsIHRvIGB0aGlzLiNwcmV2aW91c2Bcblx0ICogQHR5cGUge01hcDxTb3VyY2UsIGFueT59XG5cdCAqL1xuXHRjdXJyZW50ID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmFsdWVzIG9mIGFueSBzb3VyY2VzIHRoYXQgYXJlIHVwZGF0ZWQgaW4gdGhpcyBiYXRjaCBfYmVmb3JlXyB0aG9zZSB1cGRhdGVzIHRvb2sgcGxhY2UuXG5cdCAqIFRoZXkga2V5cyBvZiB0aGlzIG1hcCBhcmUgaWRlbnRpY2FsIHRvIGB0aGlzLiNjdXJyZW50YFxuXHQgKiBAdHlwZSB7TWFwPFNvdXJjZSwgYW55Pn1cblx0ICovXG5cdHByZXZpb3VzID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBXaGVuIHRoZSBiYXRjaCBpcyBjb21taXR0ZWQgKGFuZCB0aGUgRE9NIGlzIHVwZGF0ZWQpLCB3ZSBuZWVkIHRvIHJlbW92ZSBvbGQgYnJhbmNoZXNcblx0ICogYW5kIGFwcGVuZCBuZXcgb25lcyBieSBjYWxsaW5nIHRoZSBmdW5jdGlvbnMgYWRkZWQgaW5zaWRlIChpZi9lYWNoL2tleS9ldGMpIGJsb2Nrc1xuXHQgKiBAdHlwZSB7U2V0PCgpID0+IHZvaWQ+fVxuXHQgKi9cblx0I2NvbW1pdF9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5cblx0LyoqXG5cdCAqIElmIGEgZm9yayBpcyBkaXNjYXJkZWQsIHdlIG5lZWQgdG8gZGVzdHJveSBhbnkgZWZmZWN0cyB0aGF0IGFyZSBubyBsb25nZXIgbmVlZGVkXG5cdCAqIEB0eXBlIHtTZXQ8KGJhdGNoOiBCYXRjaCkgPT4gdm9pZD59XG5cdCAqL1xuXHQjZGlzY2FyZF9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgYXN5bmMgZWZmZWN0cyB0aGF0IGFyZSBjdXJyZW50bHkgaW4gZmxpZ2h0XG5cdCAqL1xuXHQjcGVuZGluZyA9IDA7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgYXN5bmMgZWZmZWN0cyB0aGF0IGFyZSBjdXJyZW50bHkgaW4gZmxpZ2h0LCBfbm90XyBpbnNpZGUgYSBwZW5kaW5nIGJvdW5kYXJ5XG5cdCAqL1xuXHQjYmxvY2tpbmdfcGVuZGluZyA9IDA7XG5cblx0LyoqXG5cdCAqIEEgZGVmZXJyZWQgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBiYXRjaCBpcyBjb21taXR0ZWQsIHVzZWQgd2l0aCBgc2V0dGxlZCgpYFxuXHQgKiBUT0RPIHJlcGxhY2Ugd2l0aCBQcm9taXNlLndpdGhSZXNvbHZlcnMgb25jZSBzdXBwb3J0ZWQgd2lkZWx5IGVub3VnaFxuXHQgKiBAdHlwZSB7eyBwcm9taXNlOiBQcm9taXNlPHZvaWQ+LCByZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZCB9IHwgbnVsbH1cblx0ICovXG5cdCNkZWZlcnJlZCA9IG51bGw7XG5cblx0LyoqXG5cdCAqIERlZmVycmVkIGVmZmVjdHMgKHdoaWNoIHJ1biBhZnRlciBhc3luYyB3b3JrIGhhcyBjb21wbGV0ZWQpIHRoYXQgYXJlIERJUlRZXG5cdCAqIEB0eXBlIHtTZXQ8RWZmZWN0Pn1cblx0ICovXG5cdCNkaXJ0eV9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdC8qKlxuXHQgKiBEZWZlcnJlZCBlZmZlY3RzIHRoYXQgYXJlIE1BWUJFX0RJUlRZXG5cdCAqIEB0eXBlIHtTZXQ8RWZmZWN0Pn1cblx0ICovXG5cdCNtYXliZV9kaXJ0eV9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdC8qKlxuXHQgKiBBIG1hcCBvZiBicmFuY2hlcyB0aGF0IHN0aWxsIGV4aXN0LCBidXQgd2lsbCBiZSBkZXN0cm95ZWQgd2hlbiB0aGlzIGJhdGNoXG5cdCAqIGlzIGNvbW1pdHRlZCDigJQgd2Ugc2tpcCBvdmVyIHRoZXNlIGR1cmluZyBgcHJvY2Vzc2AuXG5cdCAqIFRoZSB2YWx1ZSBjb250YWlucyBjaGlsZCBlZmZlY3RzIHRoYXQgd2VyZSBkaXJ0eS9tYXliZV9kaXJ0eSBiZWZvcmUgYmVpbmcgcmVzZXQsXG5cdCAqIHNvIHRoZXkgY2FuIGJlIHJlc2NoZWR1bGVkIGlmIHRoZSBicmFuY2ggc3Vydml2ZXMuXG5cdCAqIEB0eXBlIHtNYXA8RWZmZWN0LCB7IGQ6IEVmZmVjdFtdLCBtOiBFZmZlY3RbXSB9Pn1cblx0ICovXG5cdCNza2lwcGVkX2JyYW5jaGVzID0gbmV3IE1hcCgpO1xuXG5cdGlzX2ZvcmsgPSBmYWxzZTtcblxuXHQjZGVjcmVtZW50X3F1ZXVlZCA9IGZhbHNlO1xuXG5cdCNpc19kZWZlcnJlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pc19mb3JrIHx8IHRoaXMuI2Jsb2NraW5nX3BlbmRpbmcgPiAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhbiBlZmZlY3QgdG8gdGhlICNza2lwcGVkX2JyYW5jaGVzIG1hcCBhbmQgcmVzZXQgaXRzIGNoaWxkcmVuXG5cdCAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3Rcblx0ICovXG5cdHNraXBfZWZmZWN0KGVmZmVjdCkge1xuXHRcdGlmICghdGhpcy4jc2tpcHBlZF9icmFuY2hlcy5oYXMoZWZmZWN0KSkge1xuXHRcdFx0dGhpcy4jc2tpcHBlZF9icmFuY2hlcy5zZXQoZWZmZWN0LCB7IGQ6IFtdLCBtOiBbXSB9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGFuIGVmZmVjdCBmcm9tIHRoZSAjc2tpcHBlZF9icmFuY2hlcyBtYXAgYW5kIHJlc2NoZWR1bGVcblx0ICogYW55IHRyYWNrZWQgZGlydHkvbWF5YmVfZGlydHkgY2hpbGQgZWZmZWN0c1xuXHQgKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG5cdCAqL1xuXHR1bnNraXBfZWZmZWN0KGVmZmVjdCkge1xuXHRcdHZhciB0cmFja2VkID0gdGhpcy4jc2tpcHBlZF9icmFuY2hlcy5nZXQoZWZmZWN0KTtcblx0XHRpZiAodHJhY2tlZCkge1xuXHRcdFx0dGhpcy4jc2tpcHBlZF9icmFuY2hlcy5kZWxldGUoZWZmZWN0KTtcblxuXHRcdFx0Zm9yICh2YXIgZSBvZiB0cmFja2VkLmQpIHtcblx0XHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZSwgRElSVFkpO1xuXHRcdFx0XHRzY2hlZHVsZV9lZmZlY3QoZSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoZSBvZiB0cmFja2VkLm0pIHtcblx0XHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZSwgTUFZQkVfRElSVFkpO1xuXHRcdFx0XHRzY2hlZHVsZV9lZmZlY3QoZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWZmZWN0W119IHJvb3RfZWZmZWN0c1xuXHQgKi9cblx0cHJvY2Vzcyhyb290X2VmZmVjdHMpIHtcblx0XHRxdWV1ZWRfcm9vdF9lZmZlY3RzID0gW107XG5cblx0XHR0aGlzLmFwcGx5KCk7XG5cblx0XHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHRcdHZhciBlZmZlY3RzID0gW107XG5cblx0XHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHRcdHZhciByZW5kZXJfZWZmZWN0cyA9IFtdO1xuXG5cdFx0Zm9yIChjb25zdCByb290IG9mIHJvb3RfZWZmZWN0cykge1xuXHRcdFx0dGhpcy4jdHJhdmVyc2VfZWZmZWN0X3RyZWUocm9vdCwgZWZmZWN0cywgcmVuZGVyX2VmZmVjdHMpO1xuXHRcdFx0Ly8gTm90ZTogI3RyYXZlcnNlX2VmZmVjdF90cmVlIHJ1bnMgYmxvY2sgZWZmZWN0cyBlYWdlcmx5LCB3aGljaCBjYW4gc2NoZWR1bGUgZWZmZWN0cyxcblx0XHRcdC8vIHdoaWNoIG1lYW5zIHF1ZXVlZF9yb290X2VmZmVjdHMgbm93IG1heSBiZSBmaWxsZWQgYWdhaW4uXG5cblx0XHRcdC8vIEhlbHBmdWwgZm9yIGRlYnVnZ2luZyByZWFjdGl2aXR5IGxvc3MgdGhhdCBoYXMgdG8gZG8gd2l0aCBicmFuY2hlcyBiZWluZyBza2lwcGVkOlxuXHRcdFx0Ly8gbG9nX2luY29uc2lzdGVudF9icmFuY2hlcyhyb290KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy4jaXNfZGVmZXJyZWQoKSkge1xuXHRcdFx0dGhpcy4jZGVmZXJfZWZmZWN0cyhyZW5kZXJfZWZmZWN0cyk7XG5cdFx0XHR0aGlzLiNkZWZlcl9lZmZlY3RzKGVmZmVjdHMpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IFtlLCB0XSBvZiB0aGlzLiNza2lwcGVkX2JyYW5jaGVzKSB7XG5cdFx0XHRcdHJlc2V0X2JyYW5jaChlLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gYXBwZW5kL3JlbW92ZSBicmFuY2hlc1xuXHRcdFx0Zm9yIChjb25zdCBmbiBvZiB0aGlzLiNjb21taXRfY2FsbGJhY2tzKSBmbigpO1xuXHRcdFx0dGhpcy4jY29tbWl0X2NhbGxiYWNrcy5jbGVhcigpO1xuXG5cdFx0XHRpZiAodGhpcy4jcGVuZGluZyA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLiNjb21taXQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgc291cmNlcyBhcmUgd3JpdHRlbiB0bywgdGhlbiB3b3JrIG5lZWRzIHRvIGhhcHBlbiBpbiBhIHNlcGFyYXRlIGJhdGNoLCBlbHNlIHByaW9yIHNvdXJjZXMgd291bGQgYmUgbWl4ZWQgd2l0aFxuXHRcdFx0Ly8gbmV3bHkgdXBkYXRlZCBzb3VyY2VzLCB3aGljaCBjb3VsZCBsZWFkIHRvIGluZmluaXRlIGxvb3BzIHdoZW4gZWZmZWN0cyBydW4gb3ZlciBhbmQgb3ZlciBhZ2Fpbi5cblx0XHRcdHByZXZpb3VzX2JhdGNoID0gdGhpcztcblx0XHRcdGN1cnJlbnRfYmF0Y2ggPSBudWxsO1xuXG5cdFx0XHRmbHVzaF9xdWV1ZWRfZWZmZWN0cyhyZW5kZXJfZWZmZWN0cyk7XG5cdFx0XHRmbHVzaF9xdWV1ZWRfZWZmZWN0cyhlZmZlY3RzKTtcblxuXHRcdFx0cHJldmlvdXNfYmF0Y2ggPSBudWxsO1xuXG5cdFx0XHR0aGlzLiNkZWZlcnJlZD8ucmVzb2x2ZSgpO1xuXHRcdH1cblxuXHRcdGJhdGNoX3ZhbHVlcyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVHJhdmVyc2UgdGhlIGVmZmVjdCB0cmVlLCBleGVjdXRpbmcgZWZmZWN0cyBvciBzdGFzaGluZ1xuXHQgKiB0aGVtIGZvciBsYXRlciBleGVjdXRpb24gYXMgYXBwcm9wcmlhdGVcblx0ICogQHBhcmFtIHtFZmZlY3R9IHJvb3Rcblx0ICogQHBhcmFtIHtFZmZlY3RbXX0gZWZmZWN0c1xuXHQgKiBAcGFyYW0ge0VmZmVjdFtdfSByZW5kZXJfZWZmZWN0c1xuXHQgKi9cblx0I3RyYXZlcnNlX2VmZmVjdF90cmVlKHJvb3QsIGVmZmVjdHMsIHJlbmRlcl9lZmZlY3RzKSB7XG5cdFx0cm9vdC5mIF49IENMRUFOO1xuXG5cdFx0dmFyIGVmZmVjdCA9IHJvb3QuZmlyc3Q7XG5cblx0XHR3aGlsZSAoZWZmZWN0ICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgZmxhZ3MgPSBlZmZlY3QuZjtcblx0XHRcdHZhciBpc19icmFuY2ggPSAoZmxhZ3MgJiAoQlJBTkNIX0VGRkVDVCB8IFJPT1RfRUZGRUNUKSkgIT09IDA7XG5cdFx0XHR2YXIgaXNfc2tpcHBhYmxlX2JyYW5jaCA9IGlzX2JyYW5jaCAmJiAoZmxhZ3MgJiBDTEVBTikgIT09IDA7XG5cblx0XHRcdHZhciBza2lwID0gaXNfc2tpcHBhYmxlX2JyYW5jaCB8fCAoZmxhZ3MgJiBJTkVSVCkgIT09IDAgfHwgdGhpcy4jc2tpcHBlZF9icmFuY2hlcy5oYXMoZWZmZWN0KTtcblxuXHRcdFx0aWYgKCFza2lwICYmIGVmZmVjdC5mbiAhPT0gbnVsbCkge1xuXHRcdFx0XHRpZiAoaXNfYnJhbmNoKSB7XG5cdFx0XHRcdFx0ZWZmZWN0LmYgXj0gQ0xFQU47XG5cdFx0XHRcdH0gZWxzZSBpZiAoKGZsYWdzICYgRUZGRUNUKSAhPT0gMCkge1xuXHRcdFx0XHRcdGVmZmVjdHMucHVzaChlZmZlY3QpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFzeW5jX21vZGVfZmxhZyAmJiAoZmxhZ3MgJiAoUkVOREVSX0VGRkVDVCB8IE1BTkFHRURfRUZGRUNUKSkgIT09IDApIHtcblx0XHRcdFx0XHRyZW5kZXJfZWZmZWN0cy5wdXNoKGVmZmVjdCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaXNfZGlydHkoZWZmZWN0KSkge1xuXHRcdFx0XHRcdGlmICgoZmxhZ3MgJiBCTE9DS19FRkZFQ1QpICE9PSAwKSB0aGlzLiNtYXliZV9kaXJ0eV9lZmZlY3RzLmFkZChlZmZlY3QpO1xuXHRcdFx0XHRcdHVwZGF0ZV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBjaGlsZCA9IGVmZmVjdC5maXJzdDtcblxuXHRcdFx0XHRpZiAoY2hpbGQgIT09IG51bGwpIHtcblx0XHRcdFx0XHRlZmZlY3QgPSBjaGlsZDtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoZWZmZWN0ICE9PSBudWxsKSB7XG5cdFx0XHRcdHZhciBuZXh0ID0gZWZmZWN0Lm5leHQ7XG5cblx0XHRcdFx0aWYgKG5leHQgIT09IG51bGwpIHtcblx0XHRcdFx0XHRlZmZlY3QgPSBuZXh0O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWZmZWN0ID0gZWZmZWN0LnBhcmVudDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtFZmZlY3RbXX0gZWZmZWN0c1xuXHQgKi9cblx0I2RlZmVyX2VmZmVjdHMoZWZmZWN0cykge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWZmZWN0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0ZGVmZXJfZWZmZWN0KGVmZmVjdHNbaV0sIHRoaXMuI2RpcnR5X2VmZmVjdHMsIHRoaXMuI21heWJlX2RpcnR5X2VmZmVjdHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NvY2lhdGUgYSBjaGFuZ2UgdG8gYSBnaXZlbiBzb3VyY2Ugd2l0aCB0aGUgY3VycmVudFxuXHQgKiBiYXRjaCwgbm90aW5nIGl0cyBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZXNcblx0ICogQHBhcmFtIHtTb3VyY2V9IHNvdXJjZVxuXHQgKiBAcGFyYW0ge2FueX0gdmFsdWVcblx0ICovXG5cdGNhcHR1cmUoc291cmNlLCB2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAhPT0gVU5JTklUSUFMSVpFRCAmJiAhdGhpcy5wcmV2aW91cy5oYXMoc291cmNlKSkge1xuXHRcdFx0dGhpcy5wcmV2aW91cy5zZXQoc291cmNlLCB2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gRG9uJ3Qgc2F2ZSBlcnJvcnMgaW4gYGJhdGNoX3ZhbHVlc2AsIG9yIHRoZXkgd29uJ3QgYmUgdGhyb3duIGluIGBydW50aW1lLmpzI2dldGBcblx0XHRpZiAoKHNvdXJjZS5mICYgRVJST1JfVkFMVUUpID09PSAwKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnQuc2V0KHNvdXJjZSwgc291cmNlLnYpO1xuXHRcdFx0YmF0Y2hfdmFsdWVzPy5zZXQoc291cmNlLCBzb3VyY2Uudik7XG5cdFx0fVxuXHR9XG5cblx0YWN0aXZhdGUoKSB7XG5cdFx0Y3VycmVudF9iYXRjaCA9IHRoaXM7XG5cdFx0dGhpcy5hcHBseSgpO1xuXHR9XG5cblx0ZGVhY3RpdmF0ZSgpIHtcblx0XHQvLyBJZiB3ZSdyZSBub3QgdGhlIGN1cnJlbnQgYmF0Y2gsIGRvbid0IGRlYWN0aXZhdGUsXG5cdFx0Ly8gZWxzZSB3ZSBjb3VsZCBjcmVhdGUgem9tYmllIGJhdGNoZXMgdGhhdCBhcmUgbmV2ZXIgZmx1c2hlZFxuXHRcdGlmIChjdXJyZW50X2JhdGNoICE9PSB0aGlzKSByZXR1cm47XG5cblx0XHRjdXJyZW50X2JhdGNoID0gbnVsbDtcblx0XHRiYXRjaF92YWx1ZXMgPSBudWxsO1xuXHR9XG5cblx0Zmx1c2goKSB7XG5cdFx0dGhpcy5hY3RpdmF0ZSgpO1xuXG5cdFx0aWYgKHF1ZXVlZF9yb290X2VmZmVjdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Zmx1c2hfZWZmZWN0cygpO1xuXG5cdFx0XHRpZiAoY3VycmVudF9iYXRjaCAhPT0gbnVsbCAmJiBjdXJyZW50X2JhdGNoICE9PSB0aGlzKSB7XG5cdFx0XHRcdC8vIHRoaXMgY2FuIGhhcHBlbiBpZiBhIG5ldyBiYXRjaCB3YXMgY3JlYXRlZCBkdXJpbmcgYGZsdXNoX2VmZmVjdHMoKWBcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodGhpcy4jcGVuZGluZyA9PT0gMCkge1xuXHRcdFx0dGhpcy5wcm9jZXNzKFtdKTsgLy8gVE9ETyB0aGlzIGZlZWxzIGF3a3dhcmRcblx0XHR9XG5cblx0XHR0aGlzLmRlYWN0aXZhdGUoKTtcblx0fVxuXG5cdGRpc2NhcmQoKSB7XG5cdFx0Zm9yIChjb25zdCBmbiBvZiB0aGlzLiNkaXNjYXJkX2NhbGxiYWNrcykgZm4odGhpcyk7XG5cdFx0dGhpcy4jZGlzY2FyZF9jYWxsYmFja3MuY2xlYXIoKTtcblx0fVxuXG5cdCNjb21taXQoKSB7XG5cdFx0Ly8gSWYgdGhlcmUgYXJlIG90aGVyIHBlbmRpbmcgYmF0Y2hlcywgdGhleSBub3cgbmVlZCB0byBiZSAncmViYXNlZCcg4oCUXG5cdFx0Ly8gaW4gb3RoZXIgd29yZHMsIHdlIHJlLXJ1biBibG9jay9hc3luYyBlZmZlY3RzIHdpdGggdGhlIG5ld2x5XG5cdFx0Ly8gY29tbWl0dGVkIHN0YXRlLCB1bmxlc3MgdGhlIGJhdGNoIGluIHF1ZXN0aW9uIGhhcyBhIG1vcmVcblx0XHQvLyByZWNlbnQgdmFsdWUgZm9yIGEgZ2l2ZW4gc291cmNlXG5cdFx0aWYgKGJhdGNoZXMuc2l6ZSA+IDEpIHtcblx0XHRcdHRoaXMucHJldmlvdXMuY2xlYXIoKTtcblxuXHRcdFx0dmFyIHByZXZpb3VzX2JhdGNoX3ZhbHVlcyA9IGJhdGNoX3ZhbHVlcztcblx0XHRcdHZhciBpc19lYXJsaWVyID0gdHJ1ZTtcblxuXHRcdFx0Zm9yIChjb25zdCBiYXRjaCBvZiBiYXRjaGVzKSB7XG5cdFx0XHRcdGlmIChiYXRjaCA9PT0gdGhpcykge1xuXHRcdFx0XHRcdGlzX2VhcmxpZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKiBAdHlwZSB7U291cmNlW119ICovXG5cdFx0XHRcdGNvbnN0IHNvdXJjZXMgPSBbXTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IFtzb3VyY2UsIHZhbHVlXSBvZiB0aGlzLmN1cnJlbnQpIHtcblx0XHRcdFx0XHRpZiAoYmF0Y2guY3VycmVudC5oYXMoc291cmNlKSkge1xuXHRcdFx0XHRcdFx0aWYgKGlzX2VhcmxpZXIgJiYgdmFsdWUgIT09IGJhdGNoLmN1cnJlbnQuZ2V0KHNvdXJjZSkpIHtcblx0XHRcdFx0XHRcdFx0Ly8gYnJpbmcgdGhlIHZhbHVlIHVwIHRvIGRhdGVcblx0XHRcdFx0XHRcdFx0YmF0Y2guY3VycmVudC5zZXQoc291cmNlLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBzYW1lIHZhbHVlIG9yIGxhdGVyIGJhdGNoIGhhcyBtb3JlIHJlY2VudCB2YWx1ZSxcblx0XHRcdFx0XHRcdFx0Ly8gbm8gbmVlZCB0byByZS1ydW4gdGhlc2UgZWZmZWN0c1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzb3VyY2VzLnB1c2goc291cmNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmUtcnVuIGFzeW5jL2Jsb2NrIGVmZmVjdHMgdGhhdCBkZXBlbmQgb24gZGlzdGluY3QgdmFsdWVzIGNoYW5nZWQgaW4gYm90aCBiYXRjaGVzXG5cdFx0XHRcdGNvbnN0IG90aGVycyA9IFsuLi5iYXRjaC5jdXJyZW50LmtleXMoKV0uZmlsdGVyKChzKSA9PiAhdGhpcy5jdXJyZW50LmhhcyhzKSk7XG5cdFx0XHRcdGlmIChvdGhlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdC8vIEF2b2lkIHJ1bm5pbmcgcXVldWVkIHJvb3QgZWZmZWN0cyBvbiB0aGUgd3JvbmcgYnJhbmNoXG5cdFx0XHRcdFx0dmFyIHByZXZfcXVldWVkX3Jvb3RfZWZmZWN0cyA9IHF1ZXVlZF9yb290X2VmZmVjdHM7XG5cdFx0XHRcdFx0cXVldWVkX3Jvb3RfZWZmZWN0cyA9IFtdO1xuXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtTZXQ8VmFsdWU+fSAqL1xuXHRcdFx0XHRcdGNvbnN0IG1hcmtlZCA9IG5ldyBTZXQoKTtcblx0XHRcdFx0XHQvKiogQHR5cGUge01hcDxSZWFjdGlvbiwgYm9vbGVhbj59ICovXG5cdFx0XHRcdFx0Y29uc3QgY2hlY2tlZCA9IG5ldyBNYXAoKTtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG5cdFx0XHRcdFx0XHRtYXJrX2VmZmVjdHMoc291cmNlLCBvdGhlcnMsIG1hcmtlZCwgY2hlY2tlZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHF1ZXVlZF9yb290X2VmZmVjdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0Y3VycmVudF9iYXRjaCA9IGJhdGNoO1xuXHRcdFx0XHRcdFx0YmF0Y2guYXBwbHkoKTtcblxuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCByb290IG9mIHF1ZXVlZF9yb290X2VmZmVjdHMpIHtcblx0XHRcdFx0XHRcdFx0YmF0Y2guI3RyYXZlcnNlX2VmZmVjdF90cmVlKHJvb3QsIFtdLCBbXSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIFRPRE8gZG8gd2UgbmVlZCB0byBkbyBhbnl0aGluZyB3aXRoIHRoZSBkdW1teSBlZmZlY3QgYXJyYXlzP1xuXG5cdFx0XHRcdFx0XHRiYXRjaC5kZWFjdGl2YXRlKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cXVldWVkX3Jvb3RfZWZmZWN0cyA9IHByZXZfcXVldWVkX3Jvb3RfZWZmZWN0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50X2JhdGNoID0gbnVsbDtcblx0XHRcdGJhdGNoX3ZhbHVlcyA9IHByZXZpb3VzX2JhdGNoX3ZhbHVlcztcblx0XHR9XG5cblx0XHRiYXRjaGVzLmRlbGV0ZSh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGJsb2NraW5nXG5cdCAqL1xuXHRpbmNyZW1lbnQoYmxvY2tpbmcpIHtcblx0XHR0aGlzLiNwZW5kaW5nICs9IDE7XG5cdFx0aWYgKGJsb2NraW5nKSB0aGlzLiNibG9ja2luZ19wZW5kaW5nICs9IDE7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBibG9ja2luZ1xuXHQgKi9cblx0ZGVjcmVtZW50KGJsb2NraW5nKSB7XG5cdFx0dGhpcy4jcGVuZGluZyAtPSAxO1xuXHRcdGlmIChibG9ja2luZykgdGhpcy4jYmxvY2tpbmdfcGVuZGluZyAtPSAxO1xuXG5cdFx0aWYgKHRoaXMuI2RlY3JlbWVudF9xdWV1ZWQpIHJldHVybjtcblx0XHR0aGlzLiNkZWNyZW1lbnRfcXVldWVkID0gdHJ1ZTtcblxuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0dGhpcy4jZGVjcmVtZW50X3F1ZXVlZCA9IGZhbHNlO1xuXG5cdFx0XHRpZiAoIXRoaXMuI2lzX2RlZmVycmVkKCkpIHtcblx0XHRcdFx0Ly8gd2Ugb25seSByZXNjaGVkdWxlIHByZXZpb3VzbHktZGVmZXJyZWQgZWZmZWN0cyBpZiB3ZSBleHBlY3Rcblx0XHRcdFx0Ly8gdG8gYmUgYWJsZSB0byBydW4gdGhlbSBhZnRlciBwcm9jZXNzaW5nIHRoZSBiYXRjaFxuXHRcdFx0XHR0aGlzLnJldml2ZSgpO1xuXHRcdFx0fSBlbHNlIGlmIChxdWV1ZWRfcm9vdF9lZmZlY3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Ly8gaWYgb3RoZXIgZWZmZWN0cyBhcmUgc2NoZWR1bGVkLCBwcm9jZXNzIHRoZSBiYXRjaCBfd2l0aG91dF9cblx0XHRcdFx0Ly8gcmVzY2hlZHVsaW5nIHRoZSBwcmV2aW91c2x5LWRlZmVycmVkIGVmZmVjdHNcblx0XHRcdFx0dGhpcy5mbHVzaCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV2aXZlKCkge1xuXHRcdGZvciAoY29uc3QgZSBvZiB0aGlzLiNkaXJ0eV9lZmZlY3RzKSB7XG5cdFx0XHR0aGlzLiNtYXliZV9kaXJ0eV9lZmZlY3RzLmRlbGV0ZShlKTtcblx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGUsIERJUlRZKTtcblx0XHRcdHNjaGVkdWxlX2VmZmVjdChlKTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IGUgb2YgdGhpcy4jbWF5YmVfZGlydHlfZWZmZWN0cykge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZSwgTUFZQkVfRElSVFkpO1xuXHRcdFx0c2NoZWR1bGVfZWZmZWN0KGUpO1xuXHRcdH1cblxuXHRcdHRoaXMuZmx1c2goKTtcblx0fVxuXG5cdC8qKiBAcGFyYW0geygpID0+IHZvaWR9IGZuICovXG5cdG9uY29tbWl0KGZuKSB7XG5cdFx0dGhpcy4jY29tbWl0X2NhbGxiYWNrcy5hZGQoZm4pO1xuXHR9XG5cblx0LyoqIEBwYXJhbSB7KGJhdGNoOiBCYXRjaCkgPT4gdm9pZH0gZm4gKi9cblx0b25kaXNjYXJkKGZuKSB7XG5cdFx0dGhpcy4jZGlzY2FyZF9jYWxsYmFja3MuYWRkKGZuKTtcblx0fVxuXG5cdHNldHRsZWQoKSB7XG5cdFx0cmV0dXJuICh0aGlzLiNkZWZlcnJlZCA/Pz0gZGVmZXJyZWQoKSkucHJvbWlzZTtcblx0fVxuXG5cdHN0YXRpYyBlbnN1cmUoKSB7XG5cdFx0aWYgKGN1cnJlbnRfYmF0Y2ggPT09IG51bGwpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gKGN1cnJlbnRfYmF0Y2ggPSBuZXcgQmF0Y2goKSk7XG5cdFx0XHRiYXRjaGVzLmFkZChjdXJyZW50X2JhdGNoKTtcblxuXHRcdFx0aWYgKCFpc19mbHVzaGluZ19zeW5jKSB7XG5cdFx0XHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjdXJyZW50X2JhdGNoICE9PSBiYXRjaCkge1xuXHRcdFx0XHRcdFx0Ly8gYSBmbHVzaFN5bmMgaGFwcGVuZWQgaW4gdGhlIG1lYW50aW1lXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YmF0Y2guZmx1c2goKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN1cnJlbnRfYmF0Y2g7XG5cdH1cblxuXHRhcHBseSgpIHtcblx0XHRpZiAoIWFzeW5jX21vZGVfZmxhZyB8fCAoIXRoaXMuaXNfZm9yayAmJiBiYXRjaGVzLnNpemUgPT09IDEpKSByZXR1cm47XG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgYmF0Y2hlcywgd2UgYXJlICd0aW1lIHRyYXZlbGxpbmcnIOKAlFxuXHRcdC8vIHdlIG5lZWQgdG8gb3ZlcnJpZGUgdmFsdWVzIHdpdGggdGhlIG9uZXMgaW4gdGhpcyBiYXRjaC4uLlxuXHRcdGJhdGNoX3ZhbHVlcyA9IG5ldyBNYXAodGhpcy5jdXJyZW50KTtcblxuXHRcdC8vIC4uLmFuZCB1bmRvIGNoYW5nZXMgYmVsb25naW5nIHRvIG90aGVyIGJhdGNoZXNcblx0XHRmb3IgKGNvbnN0IGJhdGNoIG9mIGJhdGNoZXMpIHtcblx0XHRcdGlmIChiYXRjaCA9PT0gdGhpcykgY29udGludWU7XG5cblx0XHRcdGZvciAoY29uc3QgW3NvdXJjZSwgcHJldmlvdXNdIG9mIGJhdGNoLnByZXZpb3VzKSB7XG5cdFx0XHRcdGlmICghYmF0Y2hfdmFsdWVzLmhhcyhzb3VyY2UpKSB7XG5cdFx0XHRcdFx0YmF0Y2hfdmFsdWVzLnNldChzb3VyY2UsIHByZXZpb3VzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzbHkgZmx1c2ggYW55IHBlbmRpbmcgdXBkYXRlcy5cbiAqIFJldHVybnMgdm9pZCBpZiBubyBjYWxsYmFjayBpcyBwcm92aWRlZCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBjYWxsYmFjay5cbiAqIEB0ZW1wbGF0ZSBbVD12b2lkXVxuICogQHBhcmFtIHsoKCkgPT4gVCkgfCB1bmRlZmluZWR9IFtmbl1cbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hTeW5jKGZuKSB7XG5cdHZhciB3YXNfZmx1c2hpbmdfc3luYyA9IGlzX2ZsdXNoaW5nX3N5bmM7XG5cdGlzX2ZsdXNoaW5nX3N5bmMgPSB0cnVlO1xuXG5cdHRyeSB7XG5cdFx0dmFyIHJlc3VsdDtcblxuXHRcdGlmIChmbikge1xuXHRcdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRcdFx0Zmx1c2hfZWZmZWN0cygpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQgPSBmbigpO1xuXHRcdH1cblxuXHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRmbHVzaF90YXNrcygpO1xuXG5cdFx0XHRpZiAocXVldWVkX3Jvb3RfZWZmZWN0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0Y3VycmVudF9iYXRjaD8uZmx1c2goKTtcblxuXHRcdFx0XHQvLyB3ZSBuZWVkIHRvIGNoZWNrIGFnYWluLCBpbiBjYXNlIHdlIGp1c3QgdXBkYXRlZCBhbiBgJGVmZmVjdC5wZW5kaW5nKClgXG5cdFx0XHRcdGlmIChxdWV1ZWRfcm9vdF9lZmZlY3RzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIHRoaXMgd291bGQgYmUgcmVzZXQgaW4gYGZsdXNoX2VmZmVjdHMoKWAgYnV0IHNpbmNlIHdlIGFyZSBlYXJseSByZXR1cm5pbmcgaGVyZSxcblx0XHRcdFx0XHQvLyB3ZSBuZWVkIHRvIHJlc2V0IGl0IGhlcmUgYXMgd2VsbCBpbiBjYXNlIHRoZSBmaXJzdCB0aW1lIHRoZXJlJ3MgMCBxdWV1ZWQgcm9vdCBlZmZlY3RzXG5cdFx0XHRcdFx0bGFzdF9zY2hlZHVsZWRfZWZmZWN0ID0gbnVsbDtcblxuXHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge1R9ICovIChyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZsdXNoX2VmZmVjdHMoKTtcblx0XHR9XG5cdH0gZmluYWxseSB7XG5cdFx0aXNfZmx1c2hpbmdfc3luYyA9IHdhc19mbHVzaGluZ19zeW5jO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGZsdXNoX2VmZmVjdHMoKSB7XG5cdGlzX2ZsdXNoaW5nID0gdHJ1ZTtcblxuXHR2YXIgc291cmNlX3N0YWNrcyA9IERFViA/IG5ldyBTZXQoKSA6IG51bGw7XG5cblx0dHJ5IHtcblx0XHR2YXIgZmx1c2hfY291bnQgPSAwO1xuXG5cdFx0d2hpbGUgKHF1ZXVlZF9yb290X2VmZmVjdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGJhdGNoID0gQmF0Y2guZW5zdXJlKCk7XG5cblx0XHRcdGlmIChmbHVzaF9jb3VudCsrID4gMTAwMCkge1xuXHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0dmFyIHVwZGF0ZXMgPSBuZXcgTWFwKCk7XG5cblx0XHRcdFx0XHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBiYXRjaC5jdXJyZW50LmtleXMoKSkge1xuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBbc3RhY2ssIHVwZGF0ZV0gb2Ygc291cmNlLnVwZGF0ZWQgPz8gW10pIHtcblx0XHRcdFx0XHRcdFx0dmFyIGVudHJ5ID0gdXBkYXRlcy5nZXQoc3RhY2spO1xuXG5cdFx0XHRcdFx0XHRcdGlmICghZW50cnkpIHtcblx0XHRcdFx0XHRcdFx0XHRlbnRyeSA9IHsgZXJyb3I6IHVwZGF0ZS5lcnJvciwgY291bnQ6IDAgfTtcblx0XHRcdFx0XHRcdFx0XHR1cGRhdGVzLnNldChzdGFjaywgZW50cnkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0ZW50cnkuY291bnQgKz0gdXBkYXRlLmNvdW50O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvciAoY29uc3QgdXBkYXRlIG9mIHVwZGF0ZXMudmFsdWVzKCkpIHtcblx0XHRcdFx0XHRcdGlmICh1cGRhdGUuZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcih1cGRhdGUuZXJyb3IpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGluZmluaXRlX2xvb3BfZ3VhcmQoKTtcblx0XHRcdH1cblxuXHRcdFx0YmF0Y2gucHJvY2VzcyhxdWV1ZWRfcm9vdF9lZmZlY3RzKTtcblx0XHRcdG9sZF92YWx1ZXMuY2xlYXIoKTtcblxuXHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBiYXRjaC5jdXJyZW50LmtleXMoKSkge1xuXHRcdFx0XHRcdC8qKiBAdHlwZSB7U2V0PFNvdXJjZT59ICovIChzb3VyY2Vfc3RhY2tzKS5hZGQoc291cmNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBmaW5hbGx5IHtcblx0XHRxdWV1ZWRfcm9vdF9lZmZlY3RzID0gW107XG5cblx0XHRpc19mbHVzaGluZyA9IGZhbHNlO1xuXHRcdGxhc3Rfc2NoZWR1bGVkX2VmZmVjdCA9IG51bGw7XG5cblx0XHRpZiAoREVWKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHNvdXJjZSBvZiAvKiogQHR5cGUge1NldDxTb3VyY2U+fSAqLyAoc291cmNlX3N0YWNrcykpIHtcblx0XHRcdFx0c291cmNlLnVwZGF0ZWQgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBpbmZpbml0ZV9sb29wX2d1YXJkKCkge1xuXHR0cnkge1xuXHRcdGUuZWZmZWN0X3VwZGF0ZV9kZXB0aF9leGNlZWRlZCgpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChERVYpIHtcblx0XHRcdC8vIHN0YWNrIGNvbnRhaW5zIG5vIHVzZWZ1bCBpbmZvcm1hdGlvbiwgcmVwbGFjZSBpdFxuXHRcdFx0ZGVmaW5lX3Byb3BlcnR5KGVycm9yLCAnc3RhY2snLCB7IHZhbHVlOiAnJyB9KTtcblx0XHR9XG5cblx0XHQvLyBCZXN0IGVmZm9ydDogaW52b2tlIHRoZSBib3VuZGFyeSBuZWFyZXN0IHRoZSBtb3N0IHJlY2VudFxuXHRcdC8vIGVmZmVjdCBhbmQgaG9wZSB0aGF0IGl0J3MgcmVsZXZhbnQgdG8gdGhlIGluZmluaXRlIGxvb3Bcblx0XHRpbnZva2VfZXJyb3JfYm91bmRhcnkoZXJyb3IsIGxhc3Rfc2NoZWR1bGVkX2VmZmVjdCk7XG5cdH1cbn1cblxuLyoqIEB0eXBlIHtTZXQ8RWZmZWN0PiB8IG51bGx9ICovXG5leHBvcnQgbGV0IGVhZ2VyX2Jsb2NrX2VmZmVjdHMgPSBudWxsO1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8RWZmZWN0Pn0gZWZmZWN0c1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGZsdXNoX3F1ZXVlZF9lZmZlY3RzKGVmZmVjdHMpIHtcblx0dmFyIGxlbmd0aCA9IGVmZmVjdHMubGVuZ3RoO1xuXHRpZiAobGVuZ3RoID09PSAwKSByZXR1cm47XG5cblx0dmFyIGkgPSAwO1xuXG5cdHdoaWxlIChpIDwgbGVuZ3RoKSB7XG5cdFx0dmFyIGVmZmVjdCA9IGVmZmVjdHNbaSsrXTtcblxuXHRcdGlmICgoZWZmZWN0LmYgJiAoREVTVFJPWUVEIHwgSU5FUlQpKSA9PT0gMCAmJiBpc19kaXJ0eShlZmZlY3QpKSB7XG5cdFx0XHRlYWdlcl9ibG9ja19lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdFx0XHR1cGRhdGVfZWZmZWN0KGVmZmVjdCk7XG5cblx0XHRcdC8vIEVmZmVjdHMgd2l0aCBubyBkZXBlbmRlbmNpZXMgb3IgdGVhcmRvd24gZG8gbm90IGdldCBhZGRlZCB0byB0aGUgZWZmZWN0IHRyZWUuXG5cdFx0XHQvLyBEZWZlcnJlZCBlZmZlY3RzIChlLmcuIGAkZWZmZWN0KC4uLilgKSBfYXJlXyBhZGRlZCB0byB0aGUgdHJlZSBiZWNhdXNlIHdlXG5cdFx0XHQvLyBkb24ndCBrbm93IGlmIHdlIG5lZWQgdG8ga2VlcCB0aGVtIHVudGlsIHRoZXkgYXJlIGV4ZWN1dGVkLiBEb2luZyB0aGUgY2hlY2tcblx0XHRcdC8vIGhlcmUgKHJhdGhlciB0aGFuIGluIGB1cGRhdGVfZWZmZWN0YCkgYWxsb3dzIHVzIHRvIHNraXAgdGhlIHdvcmsgZm9yXG5cdFx0XHQvLyBpbW1lZGlhdGUgZWZmZWN0cy5cblx0XHRcdGlmIChcblx0XHRcdFx0ZWZmZWN0LmRlcHMgPT09IG51bGwgJiZcblx0XHRcdFx0ZWZmZWN0LmZpcnN0ID09PSBudWxsICYmXG5cdFx0XHRcdGVmZmVjdC5ub2RlcyA9PT0gbnVsbCAmJlxuXHRcdFx0XHRlZmZlY3QudGVhcmRvd24gPT09IG51bGwgJiZcblx0XHRcdFx0ZWZmZWN0LmFjID09PSBudWxsXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gcmVtb3ZlIHRoaXMgZWZmZWN0IGZyb20gdGhlIGdyYXBoXG5cdFx0XHRcdHVubGlua19lZmZlY3QoZWZmZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgdXBkYXRlX2VmZmVjdCgpIGhhcyBhIGZsdXNoU3luYygpIGluIGl0LCB3ZSBtYXkgaGF2ZSBmbHVzaGVkIGFub3RoZXIgZmx1c2hfcXVldWVkX2VmZmVjdHMoKSxcblx0XHRcdC8vIHdoaWNoIGFscmVhZHkgaGFuZGxlZCB0aGlzIGxvZ2ljIGFuZCBkaWQgc2V0IGVhZ2VyX2Jsb2NrX2VmZmVjdHMgdG8gbnVsbC5cblx0XHRcdGlmIChlYWdlcl9ibG9ja19lZmZlY3RzPy5zaXplID4gMCkge1xuXHRcdFx0XHRvbGRfdmFsdWVzLmNsZWFyKCk7XG5cblx0XHRcdFx0Zm9yIChjb25zdCBlIG9mIGVhZ2VyX2Jsb2NrX2VmZmVjdHMpIHtcblx0XHRcdFx0XHQvLyBTa2lwIGVhZ2VyIGVmZmVjdHMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiB1bm1vdW50ZWRcblx0XHRcdFx0XHRpZiAoKGUuZiAmIChERVNUUk9ZRUQgfCBJTkVSVCkpICE9PSAwKSBjb250aW51ZTtcblxuXHRcdFx0XHRcdC8vIFJ1biBlZmZlY3RzIGluIG9yZGVyIGZyb20gYW5jZXN0b3IgdG8gZGVzY2VuZGFudCwgZWxzZSB3ZSBjb3VsZCBydW4gaW50byBudWxscG9pbnRlcnNcblx0XHRcdFx0XHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHRcdFx0XHRcdGNvbnN0IG9yZGVyZWRfZWZmZWN0cyA9IFtlXTtcblx0XHRcdFx0XHRsZXQgYW5jZXN0b3IgPSBlLnBhcmVudDtcblx0XHRcdFx0XHR3aGlsZSAoYW5jZXN0b3IgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdGlmIChlYWdlcl9ibG9ja19lZmZlY3RzLmhhcyhhbmNlc3RvcikpIHtcblx0XHRcdFx0XHRcdFx0ZWFnZXJfYmxvY2tfZWZmZWN0cy5kZWxldGUoYW5jZXN0b3IpO1xuXHRcdFx0XHRcdFx0XHRvcmRlcmVkX2VmZmVjdHMucHVzaChhbmNlc3Rvcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKGxldCBqID0gb3JkZXJlZF9lZmZlY3RzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBlID0gb3JkZXJlZF9lZmZlY3RzW2pdO1xuXHRcdFx0XHRcdFx0Ly8gU2tpcCBlYWdlciBlZmZlY3RzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gdW5tb3VudGVkXG5cdFx0XHRcdFx0XHRpZiAoKGUuZiAmIChERVNUUk9ZRUQgfCBJTkVSVCkpICE9PSAwKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdHVwZGF0ZV9lZmZlY3QoZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWFnZXJfYmxvY2tfZWZmZWN0cy5jbGVhcigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGVhZ2VyX2Jsb2NrX2VmZmVjdHMgPSBudWxsO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgc2ltaWxhciB0byBgbWFya19yZWFjdGlvbnNgLCBidXQgaXQgb25seSBtYXJrcyBhc3luYy9ibG9jayBlZmZlY3RzXG4gKiBkZXBlbmRpbmcgb24gYHZhbHVlYCBhbmQgYXQgbGVhc3Qgb25lIG9mIHRoZSBvdGhlciBgc291cmNlc2AsIHNvIHRoYXRcbiAqIHRoZXNlIGVmZmVjdHMgY2FuIHJlLXJ1biBhZnRlciBhbm90aGVyIGJhdGNoIGhhcyBiZWVuIGNvbW1pdHRlZFxuICogQHBhcmFtIHtWYWx1ZX0gdmFsdWVcbiAqIEBwYXJhbSB7U291cmNlW119IHNvdXJjZXNcbiAqIEBwYXJhbSB7U2V0PFZhbHVlPn0gbWFya2VkXG4gKiBAcGFyYW0ge01hcDxSZWFjdGlvbiwgYm9vbGVhbj59IGNoZWNrZWRcbiAqL1xuZnVuY3Rpb24gbWFya19lZmZlY3RzKHZhbHVlLCBzb3VyY2VzLCBtYXJrZWQsIGNoZWNrZWQpIHtcblx0aWYgKG1hcmtlZC5oYXModmFsdWUpKSByZXR1cm47XG5cdG1hcmtlZC5hZGQodmFsdWUpO1xuXG5cdGlmICh2YWx1ZS5yZWFjdGlvbnMgIT09IG51bGwpIHtcblx0XHRmb3IgKGNvbnN0IHJlYWN0aW9uIG9mIHZhbHVlLnJlYWN0aW9ucykge1xuXHRcdFx0Y29uc3QgZmxhZ3MgPSByZWFjdGlvbi5mO1xuXG5cdFx0XHRpZiAoKGZsYWdzICYgREVSSVZFRCkgIT09IDApIHtcblx0XHRcdFx0bWFya19lZmZlY3RzKC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKHJlYWN0aW9uKSwgc291cmNlcywgbWFya2VkLCBjaGVja2VkKTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdChmbGFncyAmIChBU1lOQyB8IEJMT0NLX0VGRkVDVCkpICE9PSAwICYmXG5cdFx0XHRcdChmbGFncyAmIERJUlRZKSA9PT0gMCAmJlxuXHRcdFx0XHRkZXBlbmRzX29uKHJlYWN0aW9uLCBzb3VyY2VzLCBjaGVja2VkKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldF9zaWduYWxfc3RhdHVzKHJlYWN0aW9uLCBESVJUWSk7XG5cdFx0XHRcdHNjaGVkdWxlX2VmZmVjdCgvKiogQHR5cGUge0VmZmVjdH0gKi8gKHJlYWN0aW9uKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogV2hlbiBjb21taXR0aW5nIGEgZm9yaywgd2UgbmVlZCB0byB0cmlnZ2VyIGVhZ2VyIGVmZmVjdHMgc28gdGhhdFxuICogYW55IGAkc3RhdGUuZWFnZXIoLi4uKWAgZXhwcmVzc2lvbnMgdXBkYXRlIGltbWVkaWF0ZWx5LiBUaGlzXG4gKiBmdW5jdGlvbiBhbGxvd3MgdXMgdG8gZGlzY292ZXIgdGhlbVxuICogQHBhcmFtIHtWYWx1ZX0gdmFsdWVcbiAqIEBwYXJhbSB7U2V0PEVmZmVjdD59IGVmZmVjdHNcbiAqL1xuZnVuY3Rpb24gbWFya19lYWdlcl9lZmZlY3RzKHZhbHVlLCBlZmZlY3RzKSB7XG5cdGlmICh2YWx1ZS5yZWFjdGlvbnMgPT09IG51bGwpIHJldHVybjtcblxuXHRmb3IgKGNvbnN0IHJlYWN0aW9uIG9mIHZhbHVlLnJlYWN0aW9ucykge1xuXHRcdGNvbnN0IGZsYWdzID0gcmVhY3Rpb24uZjtcblxuXHRcdGlmICgoZmxhZ3MgJiBERVJJVkVEKSAhPT0gMCkge1xuXHRcdFx0bWFya19lYWdlcl9lZmZlY3RzKC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKHJlYWN0aW9uKSwgZWZmZWN0cyk7XG5cdFx0fSBlbHNlIGlmICgoZmxhZ3MgJiBFQUdFUl9FRkZFQ1QpICE9PSAwKSB7XG5cdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhyZWFjdGlvbiwgRElSVFkpO1xuXHRcdFx0ZWZmZWN0cy5hZGQoLyoqIEB0eXBlIHtFZmZlY3R9ICovIChyZWFjdGlvbikpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3Rpb259IHJlYWN0aW9uXG4gKiBAcGFyYW0ge1NvdXJjZVtdfSBzb3VyY2VzXG4gKiBAcGFyYW0ge01hcDxSZWFjdGlvbiwgYm9vbGVhbj59IGNoZWNrZWRcbiAqL1xuZnVuY3Rpb24gZGVwZW5kc19vbihyZWFjdGlvbiwgc291cmNlcywgY2hlY2tlZCkge1xuXHRjb25zdCBkZXBlbmRzID0gY2hlY2tlZC5nZXQocmVhY3Rpb24pO1xuXHRpZiAoZGVwZW5kcyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZGVwZW5kcztcblxuXHRpZiAocmVhY3Rpb24uZGVwcyAhPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgZGVwIG9mIHJlYWN0aW9uLmRlcHMpIHtcblx0XHRcdGlmIChpbmNsdWRlcy5jYWxsKHNvdXJjZXMsIGRlcCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgoZGVwLmYgJiBERVJJVkVEKSAhPT0gMCAmJiBkZXBlbmRzX29uKC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGRlcCksIHNvdXJjZXMsIGNoZWNrZWQpKSB7XG5cdFx0XHRcdGNoZWNrZWQuc2V0KC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGRlcCksIHRydWUpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjaGVja2VkLnNldChyZWFjdGlvbiwgZmFsc2UpO1xuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gc2lnbmFsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlX2VmZmVjdChzaWduYWwpIHtcblx0dmFyIGVmZmVjdCA9IChsYXN0X3NjaGVkdWxlZF9lZmZlY3QgPSBzaWduYWwpO1xuXG5cdHZhciBib3VuZGFyeSA9IGVmZmVjdC5iO1xuXG5cdC8vIGRlZmVyIHJlbmRlciBlZmZlY3RzIGluc2lkZSBhIHBlbmRpbmcgYm91bmRhcnlcblx0Ly8gVE9ETyB0aGUgYFJFQUNUSU9OX1JBTmAgY2hlY2sgaXMgb25seSBuZWNlc3NhcnkgYmVjYXVzZSBvZiBsZWdhY3kgYCQ6YCBlZmZlY3RzIEFGQUlDVCDigJQgd2UgY2FuIHJlbW92ZSBsYXRlclxuXHRpZiAoXG5cdFx0Ym91bmRhcnk/LmlzX3BlbmRpbmcgJiZcblx0XHQoc2lnbmFsLmYgJiAoRUZGRUNUIHwgUkVOREVSX0VGRkVDVCB8IE1BTkFHRURfRUZGRUNUKSkgIT09IDAgJiZcblx0XHQoc2lnbmFsLmYgJiBSRUFDVElPTl9SQU4pID09PSAwXG5cdCkge1xuXHRcdGJvdW5kYXJ5LmRlZmVyX2VmZmVjdChzaWduYWwpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHdoaWxlIChlZmZlY3QucGFyZW50ICE9PSBudWxsKSB7XG5cdFx0ZWZmZWN0ID0gZWZmZWN0LnBhcmVudDtcblx0XHR2YXIgZmxhZ3MgPSBlZmZlY3QuZjtcblxuXHRcdC8vIGlmIHRoZSBlZmZlY3QgaXMgYmVpbmcgc2NoZWR1bGVkIGJlY2F1c2UgYSBwYXJlbnQgKGVhY2gvYXdhaXQvZXRjKSBibG9ja1xuXHRcdC8vIHVwZGF0ZWQgYW4gaW50ZXJuYWwgc291cmNlLCBvciBiZWNhdXNlIGEgYnJhbmNoIGlzIGJlaW5nIHVuc2tpcHBlZCxcblx0XHQvLyBiYWlsIG91dCBvciB3ZSdsbCBjYXVzZSBhIHNlY29uZCBmbHVzaFxuXHRcdGlmIChcblx0XHRcdGlzX2ZsdXNoaW5nICYmXG5cdFx0XHRlZmZlY3QgPT09IGFjdGl2ZV9lZmZlY3QgJiZcblx0XHRcdChmbGFncyAmIEJMT0NLX0VGRkVDVCkgIT09IDAgJiZcblx0XHRcdChmbGFncyAmIEhFQURfRUZGRUNUKSA9PT0gMCAmJlxuXHRcdFx0KGZsYWdzICYgUkVBQ1RJT05fUkFOKSAhPT0gMFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICgoZmxhZ3MgJiAoUk9PVF9FRkZFQ1QgfCBCUkFOQ0hfRUZGRUNUKSkgIT09IDApIHtcblx0XHRcdGlmICgoZmxhZ3MgJiBDTEVBTikgPT09IDApIHtcblx0XHRcdFx0Ly8gYnJhbmNoIGlzIGFscmVhZHkgZGlydHksIGJhaWxcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRlZmZlY3QuZiBePSBDTEVBTjtcblx0XHR9XG5cdH1cblxuXHRxdWV1ZWRfcm9vdF9lZmZlY3RzLnB1c2goZWZmZWN0KTtcbn1cblxuLyoqIEB0eXBlIHtTb3VyY2U8bnVtYmVyPltdfSAqL1xubGV0IGVhZ2VyX3ZlcnNpb25zID0gW107XG5cbmZ1bmN0aW9uIGVhZ2VyX2ZsdXNoKCkge1xuXHR0cnkge1xuXHRcdGZsdXNoU3luYygoKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IHZlcnNpb24gb2YgZWFnZXJfdmVyc2lvbnMpIHtcblx0XHRcdFx0dXBkYXRlKHZlcnNpb24pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9IGZpbmFsbHkge1xuXHRcdGVhZ2VyX3ZlcnNpb25zID0gW107XG5cdH1cbn1cblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBgJHN0YXRlLmVhZ2VyKGZuKCkpYFxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7KCkgPT4gVH0gZm5cbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWFnZXIoZm4pIHtcblx0dmFyIHZlcnNpb24gPSBzb3VyY2UoMCk7XG5cdHZhciBpbml0aWFsID0gdHJ1ZTtcblx0dmFyIHZhbHVlID0gLyoqIEB0eXBlIHtUfSAqLyAodW5kZWZpbmVkKTtcblxuXHRnZXQodmVyc2lvbik7XG5cblx0ZWFnZXJfZWZmZWN0KCgpID0+IHtcblx0XHRpZiAoaW5pdGlhbCkge1xuXHRcdFx0Ly8gdGhlIGZpcnN0IHRpbWUgdGhpcyBydW5zLCB3ZSBjcmVhdGUgYW4gZWFnZXIgZWZmZWN0XG5cdFx0XHQvLyB0aGF0IHdpbGwgcnVuIGVhZ2VybHkgd2hlbmV2ZXIgdGhlIGV4cHJlc3Npb24gY2hhbmdlc1xuXHRcdFx0dmFyIHByZXZpb3VzX2JhdGNoX3ZhbHVlcyA9IGJhdGNoX3ZhbHVlcztcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YmF0Y2hfdmFsdWVzID0gbnVsbDtcblx0XHRcdFx0dmFsdWUgPSBmbigpO1xuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0YmF0Y2hfdmFsdWVzID0gcHJldmlvdXNfYmF0Y2hfdmFsdWVzO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gdGhlIHNlY29uZCB0aW1lIHRoaXMgZWZmZWN0IHJ1bnMsIGl0J3MgdG8gc2NoZWR1bGUgYVxuXHRcdC8vIGB2ZXJzaW9uYCB1cGRhdGUuIHNpbmNlIHRoaXMgd2lsbCByZWNyZWF0ZSB0aGUgZWZmZWN0LFxuXHRcdC8vIHdlIGRvbid0IG5lZWQgdG8gZXZhbHVhdGUgdGhlIGV4cHJlc3Npb24gaGVyZVxuXHRcdGlmIChlYWdlcl92ZXJzaW9ucy5sZW5ndGggPT09IDApIHtcblx0XHRcdHF1ZXVlX21pY3JvX3Rhc2soZWFnZXJfZmx1c2gpO1xuXHRcdH1cblxuXHRcdGVhZ2VyX3ZlcnNpb25zLnB1c2godmVyc2lvbik7XG5cdH0pO1xuXG5cdGluaXRpYWwgPSBmYWxzZTtcblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogTWFyayBhbGwgdGhlIGVmZmVjdHMgaW5zaWRlIGEgc2tpcHBlZCBicmFuY2ggQ0xFQU4sIHNvIHRoYXRcbiAqIHRoZXkgY2FuIGJlIGNvcnJlY3RseSByZXNjaGVkdWxlZCBsYXRlci4gVHJhY2tzIGRpcnR5IGFuZCBtYXliZV9kaXJ0eVxuICogZWZmZWN0cyBzbyB0aGV5IGNhbiBiZSByZXNjaGVkdWxlZCBpZiB0aGUgYnJhbmNoIHN1cnZpdmVzLlxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHBhcmFtIHt7IGQ6IEVmZmVjdFtdLCBtOiBFZmZlY3RbXSB9fSB0cmFja2VkXG4gKi9cbmZ1bmN0aW9uIHJlc2V0X2JyYW5jaChlZmZlY3QsIHRyYWNrZWQpIHtcblx0Ly8gY2xlYW4gYnJhbmNoID0gbm90aGluZyBkaXJ0eSBpbnNpZGUsIG5vIG5lZWQgdG8gdHJhdmVyc2UgZnVydGhlclxuXHRpZiAoKGVmZmVjdC5mICYgQlJBTkNIX0VGRkVDVCkgIT09IDAgJiYgKGVmZmVjdC5mICYgQ0xFQU4pICE9PSAwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKChlZmZlY3QuZiAmIERJUlRZKSAhPT0gMCkge1xuXHRcdHRyYWNrZWQuZC5wdXNoKGVmZmVjdCk7XG5cdH0gZWxzZSBpZiAoKGVmZmVjdC5mICYgTUFZQkVfRElSVFkpICE9PSAwKSB7XG5cdFx0dHJhY2tlZC5tLnB1c2goZWZmZWN0KTtcblx0fVxuXG5cdHNldF9zaWduYWxfc3RhdHVzKGVmZmVjdCwgQ0xFQU4pO1xuXG5cdHZhciBlID0gZWZmZWN0LmZpcnN0O1xuXHR3aGlsZSAoZSAhPT0gbnVsbCkge1xuXHRcdHJlc2V0X2JyYW5jaChlLCB0cmFja2VkKTtcblx0XHRlID0gZS5uZXh0O1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhICdmb3JrJywgaW4gd2hpY2ggc3RhdGUgY2hhbmdlcyBhcmUgZXZhbHVhdGVkIGJ1dCBub3QgYXBwbGllZCB0byB0aGUgRE9NLlxuICogVGhpcyBpcyB1c2VmdWwgZm9yIHNwZWN1bGF0aXZlbHkgbG9hZGluZyBkYXRhIChmb3IgZXhhbXBsZSkgd2hlbiB5b3Ugc3VzcGVjdCB0aGF0XG4gKiB0aGUgdXNlciBpcyBhYm91dCB0byB0YWtlIHNvbWUgYWN0aW9uLlxuICpcbiAqIEZyYW1ld29ya3MgbGlrZSBTdmVsdGVLaXQgY2FuIHVzZSB0aGlzIHRvIHByZWxvYWQgZGF0YSB3aGVuIHRoZSB1c2VyIHRvdWNoZXMgb3JcbiAqIGhvdmVycyBvdmVyIGEgbGluaywgbWFraW5nIGFueSBzdWJzZXF1ZW50IG5hdmlnYXRpb24gZmVlbCBpbnN0YW50YW5lb3VzLlxuICpcbiAqIFRoZSBgZm5gIHBhcmFtZXRlciBpcyBhIHN5bmNocm9ub3VzIGZ1bmN0aW9uIHRoYXQgbW9kaWZpZXMgc29tZSBzdGF0ZS4gVGhlXG4gKiBzdGF0ZSBjaGFuZ2VzIHdpbGwgYmUgcmV2ZXJ0ZWQgYWZ0ZXIgdGhlIGZvcmsgaXMgaW5pdGlhbGlzZWQsIHRoZW4gcmVhcHBsaWVkXG4gKiBpZiBhbmQgd2hlbiB0aGUgZm9yayBpcyBldmVudHVhbGx5IGNvbW1pdHRlZC5cbiAqXG4gKiBXaGVuIGl0IGJlY29tZXMgY2xlYXIgdGhhdCBhIGZvcmsgd2lsbCBfbm90XyBiZSBjb21taXR0ZWQgKGUuZy4gYmVjYXVzZSB0aGVcbiAqIHVzZXIgbmF2aWdhdGVkIGVsc2V3aGVyZSksIGl0IG11c3QgYmUgZGlzY2FyZGVkIHRvIGF2b2lkIGxlYWtpbmcgbWVtb3J5LlxuICpcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHtGb3JrfVxuICogQHNpbmNlIDUuNDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcmsoZm4pIHtcblx0aWYgKCFhc3luY19tb2RlX2ZsYWcpIHtcblx0XHRlLmV4cGVyaW1lbnRhbF9hc3luY19yZXF1aXJlZCgnZm9yaycpO1xuXHR9XG5cblx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRlLmZvcmtfdGltaW5nKCk7XG5cdH1cblxuXHR2YXIgYmF0Y2ggPSBCYXRjaC5lbnN1cmUoKTtcblx0YmF0Y2guaXNfZm9yayA9IHRydWU7XG5cdGJhdGNoX3ZhbHVlcyA9IG5ldyBNYXAoKTtcblxuXHR2YXIgY29tbWl0dGVkID0gZmFsc2U7XG5cdHZhciBzZXR0bGVkID0gYmF0Y2guc2V0dGxlZCgpO1xuXG5cdGZsdXNoU3luYyhmbik7XG5cblx0Ly8gcmV2ZXJ0IHN0YXRlIGNoYW5nZXNcblx0Zm9yICh2YXIgW3NvdXJjZSwgdmFsdWVdIG9mIGJhdGNoLnByZXZpb3VzKSB7XG5cdFx0c291cmNlLnYgPSB2YWx1ZTtcblx0fVxuXG5cdC8vIG1ha2Ugd3JpdGFibGUgZGVyaXZlZHMgZGlydHksIHNvIHRoZXkgcmVjYWxjdWxhdGUgY29ycmVjdGx5XG5cdGZvciAoc291cmNlIG9mIGJhdGNoLmN1cnJlbnQua2V5cygpKSB7XG5cdFx0aWYgKChzb3VyY2UuZiAmIERFUklWRUQpICE9PSAwKSB7XG5cdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhzb3VyY2UsIERJUlRZKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGNvbW1pdDogYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGNvbW1pdHRlZCkge1xuXHRcdFx0XHRhd2FpdCBzZXR0bGVkO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICghYmF0Y2hlcy5oYXMoYmF0Y2gpKSB7XG5cdFx0XHRcdGUuZm9ya19kaXNjYXJkZWQoKTtcblx0XHRcdH1cblxuXHRcdFx0Y29tbWl0dGVkID0gdHJ1ZTtcblxuXHRcdFx0YmF0Y2guaXNfZm9yayA9IGZhbHNlO1xuXG5cdFx0XHQvLyBhcHBseSBjaGFuZ2VzIGFuZCB1cGRhdGUgd3JpdGUgdmVyc2lvbnMgc28gZGVyaXZlZHMgc2VlIHRoZSBjaGFuZ2Vcblx0XHRcdGZvciAodmFyIFtzb3VyY2UsIHZhbHVlXSBvZiBiYXRjaC5jdXJyZW50KSB7XG5cdFx0XHRcdHNvdXJjZS52ID0gdmFsdWU7XG5cdFx0XHRcdHNvdXJjZS53diA9IGluY3JlbWVudF93cml0ZV92ZXJzaW9uKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHRyaWdnZXIgYW55IGAkc3RhdGUuZWFnZXIoLi4uKWAgZXhwcmVzc2lvbnMgd2l0aCB0aGUgbmV3IHN0YXRlLlxuXHRcdFx0Ly8gZWFnZXIgZWZmZWN0cyBkb24ndCBnZXQgc2NoZWR1bGVkIGxpa2Ugb3RoZXIgZWZmZWN0cywgc28gd2Vcblx0XHRcdC8vIGNhbid0IGp1c3QgZW5jb3VudGVyIHRoZW0gZHVyaW5nIHRyYXZlcnNhbCwgd2UgbmVlZCB0b1xuXHRcdFx0Ly8gcHJvYWN0aXZlbHkgZmx1c2ggdGhlbVxuXHRcdFx0Ly8gVE9ETyBtYXliZSB0aGVyZSdzIGEgYmV0dGVyIGltcGxlbWVudGF0aW9uP1xuXHRcdFx0Zmx1c2hTeW5jKCgpID0+IHtcblx0XHRcdFx0LyoqIEB0eXBlIHtTZXQ8RWZmZWN0Pn0gKi9cblx0XHRcdFx0dmFyIGVhZ2VyX2VmZmVjdHMgPSBuZXcgU2V0KCk7XG5cblx0XHRcdFx0Zm9yICh2YXIgc291cmNlIG9mIGJhdGNoLmN1cnJlbnQua2V5cygpKSB7XG5cdFx0XHRcdFx0bWFya19lYWdlcl9lZmZlY3RzKHNvdXJjZSwgZWFnZXJfZWZmZWN0cyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZXRfZWFnZXJfZWZmZWN0cyhlYWdlcl9lZmZlY3RzKTtcblx0XHRcdFx0Zmx1c2hfZWFnZXJfZWZmZWN0cygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJhdGNoLnJldml2ZSgpO1xuXHRcdFx0YXdhaXQgc2V0dGxlZDtcblx0XHR9LFxuXHRcdGRpc2NhcmQ6ICgpID0+IHtcblx0XHRcdC8vIGNhdXNlIGFueSBNQVlCRV9ESVJUWSBkZXJpdmVkcyB0byB1cGRhdGVcblx0XHRcdC8vIGlmIHRoZXkgZGVwZW5kIG9uIHRoaW5ncyB0aGF0aCBjaGFuZ2VkXG5cdFx0XHQvLyBpbnNpZGUgdGhlIGRpc2NhcmRlZCBmb3JrXG5cdFx0XHRmb3IgKHZhciBzb3VyY2Ugb2YgYmF0Y2guY3VycmVudC5rZXlzKCkpIHtcblx0XHRcdFx0c291cmNlLnd2ID0gaW5jcmVtZW50X3dyaXRlX3ZlcnNpb24oKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFjb21taXR0ZWQgJiYgYmF0Y2hlcy5oYXMoYmF0Y2gpKSB7XG5cdFx0XHRcdGJhdGNoZXMuZGVsZXRlKGJhdGNoKTtcblx0XHRcdFx0YmF0Y2guZGlzY2FyZCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBGb3JjaWJseSByZW1vdmUgYWxsIGN1cnJlbnQgYmF0Y2hlcywgdG8gcHJldmVudCBjcm9zcy10YWxrIGJldHdlZW4gdGVzdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKCkge1xuXHRiYXRjaGVzLmNsZWFyKCk7XG59XG4iLCJpbXBvcnQgeyBnZXQsIHRpY2ssIHVudHJhY2sgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvcnVudGltZS5qcyc7XG5pbXBvcnQgeyBlZmZlY3RfdHJhY2tpbmcsIHJlbmRlcl9lZmZlY3QgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IHNvdXJjZSwgaW5jcmVtZW50IH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvc291cmNlcy5qcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvZGV2L3RyYWNpbmcuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L2RvbS90YXNrLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgYHN1YnNjcmliZWAgZnVuY3Rpb24gdGhhdCBpbnRlZ3JhdGVzIGV4dGVybmFsIGV2ZW50LWJhc2VkIHN5c3RlbXMgd2l0aCBTdmVsdGUncyByZWFjdGl2aXR5LlxuICogSXQncyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBpbnRlZ3JhdGluZyB3aXRoIHdlYiBBUElzIGxpa2UgYE1lZGlhUXVlcnlgLCBgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJgLCBvciBgV2ViU29ja2V0YC5cbiAqXG4gKiBJZiBgc3Vic2NyaWJlYCBpcyBjYWxsZWQgaW5zaWRlIGFuIGVmZmVjdCAoaW5jbHVkaW5nIGluZGlyZWN0bHksIGZvciBleGFtcGxlIGluc2lkZSBhIGdldHRlciksXG4gKiB0aGUgYHN0YXJ0YCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGB1cGRhdGVgIGZ1bmN0aW9uLiBXaGVuZXZlciBgdXBkYXRlYCBpcyBjYWxsZWQsIHRoZSBlZmZlY3QgcmUtcnVucy5cbiAqXG4gKiBJZiBgc3RhcnRgIHJldHVybnMgYSBjbGVhbnVwIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBlZmZlY3QgaXMgZGVzdHJveWVkLlxuICpcbiAqIElmIGBzdWJzY3JpYmVgIGlzIGNhbGxlZCBpbiBtdWx0aXBsZSBlZmZlY3RzLCBgc3RhcnRgIHdpbGwgb25seSBiZSBjYWxsZWQgb25jZSBhcyBsb25nIGFzIHRoZSBlZmZlY3RzXG4gKiBhcmUgYWN0aXZlLCBhbmQgdGhlIHJldHVybmVkIHRlYXJkb3duIGZ1bmN0aW9uIHdpbGwgb25seSBiZSBjYWxsZWQgd2hlbiBhbGwgZWZmZWN0cyBhcmUgZGVzdHJveWVkLlxuICpcbiAqIEl0J3MgYmVzdCB1bmRlcnN0b29kIHdpdGggYW4gZXhhbXBsZS4gSGVyZSdzIGFuIGltcGxlbWVudGF0aW9uIG9mIFtgTWVkaWFRdWVyeWBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS9zdmVsdGUtcmVhY3Rpdml0eSNNZWRpYVF1ZXJ5KTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgY3JlYXRlU3Vic2NyaWJlciB9IGZyb20gJ3N2ZWx0ZS9yZWFjdGl2aXR5JztcbiAqIGltcG9ydCB7IG9uIH0gZnJvbSAnc3ZlbHRlL2V2ZW50cyc7XG4gKlxuICogZXhwb3J0IGNsYXNzIE1lZGlhUXVlcnkge1xuICogXHQjcXVlcnk7XG4gKiBcdCNzdWJzY3JpYmU7XG4gKlxuICogXHRjb25zdHJ1Y3RvcihxdWVyeSkge1xuICogXHRcdHRoaXMuI3F1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoYCgke3F1ZXJ5fSlgKTtcbiAqXG4gKiBcdFx0dGhpcy4jc3Vic2NyaWJlID0gY3JlYXRlU3Vic2NyaWJlcigodXBkYXRlKSA9PiB7XG4gKiBcdFx0XHQvLyB3aGVuIHRoZSBgY2hhbmdlYCBldmVudCBvY2N1cnMsIHJlLXJ1biBhbnkgZWZmZWN0cyB0aGF0IHJlYWQgYHRoaXMuY3VycmVudGBcbiAqIFx0XHRcdGNvbnN0IG9mZiA9IG9uKHRoaXMuI3F1ZXJ5LCAnY2hhbmdlJywgdXBkYXRlKTtcbiAqXG4gKiBcdFx0XHQvLyBzdG9wIGxpc3RlbmluZyB3aGVuIGFsbCB0aGUgZWZmZWN0cyBhcmUgZGVzdHJveWVkXG4gKiBcdFx0XHRyZXR1cm4gKCkgPT4gb2ZmKCk7XG4gKiBcdFx0fSk7XG4gKiBcdH1cbiAqXG4gKiBcdGdldCBjdXJyZW50KCkge1xuICogXHRcdC8vIFRoaXMgbWFrZXMgdGhlIGdldHRlciByZWFjdGl2ZSwgaWYgcmVhZCBpbiBhbiBlZmZlY3RcbiAqIFx0XHR0aGlzLiNzdWJzY3JpYmUoKTtcbiAqXG4gKiBcdFx0Ly8gUmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBxdWVyeSwgd2hldGhlciBvciBub3Qgd2UncmUgaW4gYW4gZWZmZWN0XG4gKiBcdFx0cmV0dXJuIHRoaXMuI3F1ZXJ5Lm1hdGNoZXM7XG4gKiBcdH1cbiAqIH1cbiAqIGBgYFxuICogQHBhcmFtIHsodXBkYXRlOiAoKSA9PiB2b2lkKSA9PiAoKCkgPT4gdm9pZCkgfCB2b2lkfSBzdGFydFxuICogQHNpbmNlIDUuNy4wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdWJzY3JpYmVyKHN0YXJ0KSB7XG5cdGxldCBzdWJzY3JpYmVycyA9IDA7XG5cdGxldCB2ZXJzaW9uID0gc291cmNlKDApO1xuXHQvKiogQHR5cGUgeygoKSA9PiB2b2lkKSB8IHZvaWR9ICovXG5cdGxldCBzdG9wO1xuXG5cdGlmIChERVYpIHtcblx0XHR0YWcodmVyc2lvbiwgJ2NyZWF0ZVN1YnNjcmliZXIgdmVyc2lvbicpO1xuXHR9XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoZWZmZWN0X3RyYWNraW5nKCkpIHtcblx0XHRcdGdldCh2ZXJzaW9uKTtcblxuXHRcdFx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0XHRcdGlmIChzdWJzY3JpYmVycyA9PT0gMCkge1xuXHRcdFx0XHRcdHN0b3AgPSB1bnRyYWNrKCgpID0+IHN0YXJ0KCgpID0+IGluY3JlbWVudCh2ZXJzaW9uKSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3Vic2NyaWJlcnMgKz0gMTtcblxuXHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gT25seSBjb3VudCBkb3duIGFmdGVyIGEgbWljcm90YXNrLCBlbHNlIHdlIHdvdWxkIHJlYWNoIDAgYmVmb3JlIG91ciBvd24gcmVuZGVyIGVmZmVjdCByZXJ1bnMsXG5cdFx0XHRcdFx0XHQvLyBidXQgcmVhY2ggMSBhZ2FpbiB3aGVuIHRoZSB0aWNrIGNhbGxiYWNrIG9mIHRoZSBwcmlvciB0ZWFyZG93biBydW5zLiBUaGF0IHdvdWxkIG1lYW4gd2Vcblx0XHRcdFx0XHRcdC8vIHJlLXN1YmNyaWJlIHVubmVjZXNzYXJpbHkgYW5kIGNyZWF0ZSBhIG1lbW9yeSBsZWFrIGJlY2F1c2UgdGhlIG9sZCBzdWJzY3JpcHRpb24gaXMgbmV2ZXIgY2xlYW5lZCB1cC5cblx0XHRcdFx0XHRcdHN1YnNjcmliZXJzIC09IDE7XG5cblx0XHRcdFx0XHRcdGlmIChzdWJzY3JpYmVycyA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRzdG9wPy4oKTtcblx0XHRcdFx0XHRcdFx0c3RvcCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0Ly8gSW5jcmVtZW50IHRoZSB2ZXJzaW9uIHRvIGVuc3VyZSBhbnkgZGVwZW5kZW50IGRlcml2ZWRzIGFyZSBtYXJrZWQgZGlydHkgd2hlbiB0aGUgc3Vic2NyaXB0aW9uIGlzIHBpY2tlZCB1cCBhZ2FpbiBsYXRlci5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgd2UgZGlkbid0IGRvIHRoaXMgdGhlbiB0aGUgY29tcGFyaXNvbiBvZiB3cml0ZSB2ZXJzaW9ucyB3b3VsZCBkZXRlcm1pbmUgdGhhdCB0aGUgZGVyaXZlZCBoYXMgYSBsYXRlciB2ZXJzaW9uIHRoYW5cblx0XHRcdFx0XHRcdFx0Ly8gdGhlIHN1YnNjcmliZXIsIGFuZCBpdCB3b3VsZCBub3QgYmUgcmUtcnVuLlxuXHRcdFx0XHRcdFx0XHRpbmNyZW1lbnQodmVyc2lvbik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG59XG4iLCIvKiogQGltcG9ydCB7IEVmZmVjdCwgU291cmNlLCBUZW1wbGF0ZU5vZGUsIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7XG5cdEJPVU5EQVJZX0VGRkVDVCxcblx0RElSVFksXG5cdEVGRkVDVF9QUkVTRVJWRUQsXG5cdEVGRkVDVF9UUkFOU1BBUkVOVCxcblx0TUFZQkVfRElSVFlcbn0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgSFlEUkFUSU9OX1NUQVJUX0VMU0UsIEhZRFJBVElPTl9TVEFSVF9GQUlMRUQgfSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQsIHNldF9jb21wb25lbnRfY29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgaGFuZGxlX2Vycm9yLCBpbnZva2VfZXJyb3JfYm91bmRhcnkgfSBmcm9tICcuLi8uLi9lcnJvci1oYW5kbGluZy5qcyc7XG5pbXBvcnQge1xuXHRibG9jayxcblx0YnJhbmNoLFxuXHRkZXN0cm95X2VmZmVjdCxcblx0bW92ZV9lZmZlY3QsXG5cdHBhdXNlX2VmZmVjdFxufSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHtcblx0YWN0aXZlX2VmZmVjdCxcblx0YWN0aXZlX3JlYWN0aW9uLFxuXHRnZXQsXG5cdHNldF9hY3RpdmVfZWZmZWN0LFxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uXG59IGZyb20gJy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHtcblx0aHlkcmF0ZV9uZXh0LFxuXHRoeWRyYXRlX25vZGUsXG5cdGh5ZHJhdGluZyxcblx0bmV4dCxcblx0c2tpcF9ub2Rlcyxcblx0c2V0X2h5ZHJhdGVfbm9kZVxufSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL3Rhc2suanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi8uLi9lcnJvcnMuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi8uLi93YXJuaW5ncy5qcyc7XG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IEJhdGNoLCBzY2hlZHVsZV9lZmZlY3QgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7IGludGVybmFsX3NldCwgc291cmNlIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9zb3VyY2VzLmpzJztcbmltcG9ydCB7IHRhZyB9IGZyb20gJy4uLy4uL2Rldi90cmFjaW5nLmpzJztcbmltcG9ydCB7IGNyZWF0ZVN1YnNjcmliZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9yZWFjdGl2aXR5L2NyZWF0ZS1zdWJzY3JpYmVyLmpzJztcbmltcG9ydCB7IGNyZWF0ZV90ZXh0IH0gZnJvbSAnLi4vb3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgeyBkZWZlcl9lZmZlY3QgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L3V0aWxzLmpzJztcbmltcG9ydCB7IHNldF9zaWduYWxfc3RhdHVzIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9zdGF0dXMuanMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiBcdCBvbmVycm9yPzogKGVycm9yOiB1bmtub3duLCByZXNldDogKCkgPT4gdm9pZCkgPT4gdm9pZDtcbiAqICAgZmFpbGVkPzogKGFuY2hvcjogTm9kZSwgZXJyb3I6ICgpID0+IHVua25vd24sIHJlc2V0OiAoKSA9PiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xuICogICBwZW5kaW5nPzogKGFuY2hvcjogTm9kZSkgPT4gdm9pZDtcbiAqIH19IEJvdW5kYXJ5UHJvcHNcbiAqL1xuXG52YXIgZmxhZ3MgPSBFRkZFQ1RfVFJBTlNQQVJFTlQgfCBFRkZFQ1RfUFJFU0VSVkVEO1xuXG4vKipcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gKiBAcGFyYW0ge0JvdW5kYXJ5UHJvcHN9IHByb3BzXG4gKiBAcGFyYW0geygoYW5jaG9yOiBOb2RlKSA9PiB2b2lkKX0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7KChlcnJvcjogdW5rbm93bikgPT4gdW5rbm93bikgfCB1bmRlZmluZWR9IFt0cmFuc2Zvcm1fZXJyb3JdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kYXJ5KG5vZGUsIHByb3BzLCBjaGlsZHJlbiwgdHJhbnNmb3JtX2Vycm9yKSB7XG5cdG5ldyBCb3VuZGFyeShub2RlLCBwcm9wcywgY2hpbGRyZW4sIHRyYW5zZm9ybV9lcnJvcik7XG59XG5cbmV4cG9ydCBjbGFzcyBCb3VuZGFyeSB7XG5cdC8qKiBAdHlwZSB7Qm91bmRhcnkgfCBudWxsfSAqL1xuXHRwYXJlbnQ7XG5cblx0aXNfcGVuZGluZyA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBBUEktbGV2ZWwgdHJhbnNmb3JtRXJyb3IgdHJhbnNmb3JtIGZ1bmN0aW9uLiBUcmFuc2Zvcm1zIGVycm9ycyBiZWZvcmUgdGhleSByZWFjaCB0aGUgYGZhaWxlZGAgc25pcHBldC5cblx0ICogSW5oZXJpdGVkIGZyb20gcGFyZW50IGJvdW5kYXJ5LCBvciBkZWZhdWx0cyB0byBpZGVudGl0eS5cblx0ICogQHR5cGUgeyhlcnJvcjogdW5rbm93bikgPT4gdW5rbm93bn1cblx0ICovXG5cdHRyYW5zZm9ybV9lcnJvcjtcblxuXHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi9cblx0I2FuY2hvcjtcblxuXHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IG51bGx9ICovXG5cdCNoeWRyYXRlX29wZW4gPSBoeWRyYXRpbmcgPyBoeWRyYXRlX25vZGUgOiBudWxsO1xuXG5cdC8qKiBAdHlwZSB7Qm91bmRhcnlQcm9wc30gKi9cblx0I3Byb3BzO1xuXG5cdC8qKiBAdHlwZSB7KChhbmNob3I6IE5vZGUpID0+IHZvaWQpfSAqL1xuXHQjY2hpbGRyZW47XG5cblx0LyoqIEB0eXBlIHtFZmZlY3R9ICovXG5cdCNlZmZlY3Q7XG5cblx0LyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuXHQjbWFpbl9lZmZlY3QgPSBudWxsO1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi9cblx0I3BlbmRpbmdfZWZmZWN0ID0gbnVsbDtcblxuXHQvKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovXG5cdCNmYWlsZWRfZWZmZWN0ID0gbnVsbDtcblxuXHQvKiogQHR5cGUge0RvY3VtZW50RnJhZ21lbnQgfCBudWxsfSAqL1xuXHQjb2Zmc2NyZWVuX2ZyYWdtZW50ID0gbnVsbDtcblxuXHQjbG9jYWxfcGVuZGluZ19jb3VudCA9IDA7XG5cdCNwZW5kaW5nX2NvdW50ID0gMDtcblx0I3BlbmRpbmdfY291bnRfdXBkYXRlX3F1ZXVlZCA9IGZhbHNlO1xuXG5cdC8qKiBAdHlwZSB7U2V0PEVmZmVjdD59ICovXG5cdCNkaXJ0eV9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdC8qKiBAdHlwZSB7U2V0PEVmZmVjdD59ICovXG5cdCNtYXliZV9kaXJ0eV9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdC8qKlxuXHQgKiBBIHNvdXJjZSBjb250YWluaW5nIHRoZSBudW1iZXIgb2YgcGVuZGluZyBhc3luYyBkZXJpdmVkcy9leHByZXNzaW9ucy5cblx0ICogT25seSBjcmVhdGVkIGlmIGAkZWZmZWN0LnBlbmRpbmcoKWAgaXMgdXNlZCBpbnNpZGUgdGhlIGJvdW5kYXJ5LFxuXHQgKiBvdGhlcndpc2UgdXBkYXRpbmcgdGhlIHNvdXJjZSByZXN1bHRzIGluIG5lZWRsZXNzIGBCYXRjaC5lbnN1cmUoKWBcblx0ICogY2FsbHMgZm9sbG93ZWQgYnkgbm8tb3AgZmx1c2hlc1xuXHQgKiBAdHlwZSB7U291cmNlPG51bWJlcj4gfCBudWxsfVxuXHQgKi9cblx0I2VmZmVjdF9wZW5kaW5nID0gbnVsbDtcblxuXHQjZWZmZWN0X3BlbmRpbmdfc3Vic2NyaWJlciA9IGNyZWF0ZVN1YnNjcmliZXIoKCkgPT4ge1xuXHRcdHRoaXMuI2VmZmVjdF9wZW5kaW5nID0gc291cmNlKHRoaXMuI2xvY2FsX3BlbmRpbmdfY291bnQpO1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0dGFnKHRoaXMuI2VmZmVjdF9wZW5kaW5nLCAnJGVmZmVjdC5wZW5kaW5nKCknKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0dGhpcy4jZWZmZWN0X3BlbmRpbmcgPSBudWxsO1xuXHRcdH07XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuXHQgKiBAcGFyYW0ge0JvdW5kYXJ5UHJvcHN9IHByb3BzXG5cdCAqIEBwYXJhbSB7KChhbmNob3I6IE5vZGUpID0+IHZvaWQpfSBjaGlsZHJlblxuXHQgKiBAcGFyYW0geygoZXJyb3I6IHVua25vd24pID0+IHVua25vd24pIHwgdW5kZWZpbmVkfSBbdHJhbnNmb3JtX2Vycm9yXVxuXHQgKi9cblx0Y29uc3RydWN0b3Iobm9kZSwgcHJvcHMsIGNoaWxkcmVuLCB0cmFuc2Zvcm1fZXJyb3IpIHtcblx0XHR0aGlzLiNhbmNob3IgPSBub2RlO1xuXHRcdHRoaXMuI3Byb3BzID0gcHJvcHM7XG5cblx0XHR0aGlzLiNjaGlsZHJlbiA9IChhbmNob3IpID0+IHtcblx0XHRcdHZhciBlZmZlY3QgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdFx0XHRlZmZlY3QuYiA9IHRoaXM7XG5cdFx0XHRlZmZlY3QuZiB8PSBCT1VOREFSWV9FRkZFQ1Q7XG5cblx0XHRcdGNoaWxkcmVuKGFuY2hvcik7XG5cdFx0fTtcblxuXHRcdHRoaXMucGFyZW50ID0gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KS5iO1xuXG5cdFx0Ly8gSW5oZXJpdCB0cmFuc2Zvcm1fZXJyb3IgZnJvbSBwYXJlbnQgYm91bmRhcnksIG9yIHVzZSB0aGUgcHJvdmlkZWQgb25lLCBvciBkZWZhdWx0IHRvIGlkZW50aXR5XG5cdFx0dGhpcy50cmFuc2Zvcm1fZXJyb3IgPSB0cmFuc2Zvcm1fZXJyb3IgPz8gdGhpcy5wYXJlbnQ/LnRyYW5zZm9ybV9lcnJvciA/PyAoKGUpID0+IGUpO1xuXG5cdFx0dGhpcy4jZWZmZWN0ID0gYmxvY2soKCkgPT4ge1xuXHRcdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0XHRjb25zdCBjb21tZW50ID0gLyoqIEB0eXBlIHtDb21tZW50fSAqLyAodGhpcy4jaHlkcmF0ZV9vcGVuKTtcblx0XHRcdFx0aHlkcmF0ZV9uZXh0KCk7XG5cblx0XHRcdFx0Y29uc3Qgc2VydmVyX3JlbmRlcmVkX3BlbmRpbmcgPSBjb21tZW50LmRhdGEgPT09IEhZRFJBVElPTl9TVEFSVF9FTFNFO1xuXHRcdFx0XHRjb25zdCBzZXJ2ZXJfcmVuZGVyZWRfZmFpbGVkID0gY29tbWVudC5kYXRhLnN0YXJ0c1dpdGgoSFlEUkFUSU9OX1NUQVJUX0ZBSUxFRCk7XG5cblx0XHRcdFx0aWYgKHNlcnZlcl9yZW5kZXJlZF9mYWlsZWQpIHtcblx0XHRcdFx0XHQvLyBTZXJ2ZXIgcmVuZGVyZWQgdGhlIGZhaWxlZCBzbmlwcGV0IC0gaHlkcmF0ZSBpdC5cblx0XHRcdFx0XHQvLyBUaGUgc2VyaWFsaXplZCBlcnJvciBpcyBlbWJlZGRlZCBpbiB0aGUgY29tbWVudDogPCEtLVs/PGpzb24+LS0+XG5cdFx0XHRcdFx0Y29uc3Qgc2VyaWFsaXplZF9lcnJvciA9IEpTT04ucGFyc2UoY29tbWVudC5kYXRhLnNsaWNlKEhZRFJBVElPTl9TVEFSVF9GQUlMRUQubGVuZ3RoKSk7XG5cdFx0XHRcdFx0dGhpcy4jaHlkcmF0ZV9mYWlsZWRfY29udGVudChzZXJpYWxpemVkX2Vycm9yKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzZXJ2ZXJfcmVuZGVyZWRfcGVuZGluZykge1xuXHRcdFx0XHRcdHRoaXMuI2h5ZHJhdGVfcGVuZGluZ19jb250ZW50KCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy4jaHlkcmF0ZV9yZXNvbHZlZF9jb250ZW50KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuI3JlbmRlcigpO1xuXHRcdFx0fVxuXHRcdH0sIGZsYWdzKTtcblxuXHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdHRoaXMuI2FuY2hvciA9IGh5ZHJhdGVfbm9kZTtcblx0XHR9XG5cdH1cblxuXHQjaHlkcmF0ZV9yZXNvbHZlZF9jb250ZW50KCkge1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLiNtYWluX2VmZmVjdCA9IGJyYW5jaCgoKSA9PiB0aGlzLiNjaGlsZHJlbih0aGlzLiNhbmNob3IpKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7dW5rbm93bn0gZXJyb3IgVGhlIGRlc2VyaWFsaXplZCBlcnJvciBmcm9tIHRoZSBzZXJ2ZXIncyBoeWRyYXRpb24gY29tbWVudFxuXHQgKi9cblx0I2h5ZHJhdGVfZmFpbGVkX2NvbnRlbnQoZXJyb3IpIHtcblx0XHRjb25zdCBmYWlsZWQgPSB0aGlzLiNwcm9wcy5mYWlsZWQ7XG5cdFx0aWYgKCFmYWlsZWQpIHJldHVybjtcblxuXHRcdHRoaXMuI2ZhaWxlZF9lZmZlY3QgPSBicmFuY2goKCkgPT4ge1xuXHRcdFx0ZmFpbGVkKFxuXHRcdFx0XHR0aGlzLiNhbmNob3IsXG5cdFx0XHRcdCgpID0+IGVycm9yLFxuXHRcdFx0XHQoKSA9PiAoKSA9PiB7fVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdCNoeWRyYXRlX3BlbmRpbmdfY29udGVudCgpIHtcblx0XHRjb25zdCBwZW5kaW5nID0gdGhpcy4jcHJvcHMucGVuZGluZztcblx0XHRpZiAoIXBlbmRpbmcpIHJldHVybjtcblxuXHRcdHRoaXMuaXNfcGVuZGluZyA9IHRydWU7XG5cdFx0dGhpcy4jcGVuZGluZ19lZmZlY3QgPSBicmFuY2goKCkgPT4gcGVuZGluZyh0aGlzLiNhbmNob3IpKTtcblxuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0dmFyIGZyYWdtZW50ID0gKHRoaXMuI29mZnNjcmVlbl9mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG5cdFx0XHR2YXIgYW5jaG9yID0gY3JlYXRlX3RleHQoKTtcblxuXHRcdFx0ZnJhZ21lbnQuYXBwZW5kKGFuY2hvcik7XG5cblx0XHRcdHRoaXMuI21haW5fZWZmZWN0ID0gdGhpcy4jcnVuKCgpID0+IHtcblx0XHRcdFx0QmF0Y2guZW5zdXJlKCk7XG5cdFx0XHRcdHJldHVybiBicmFuY2goKCkgPT4gdGhpcy4jY2hpbGRyZW4oYW5jaG9yKSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHRoaXMuI3BlbmRpbmdfY291bnQgPT09IDApIHtcblx0XHRcdFx0dGhpcy4jYW5jaG9yLmJlZm9yZShmcmFnbWVudCk7XG5cdFx0XHRcdHRoaXMuI29mZnNjcmVlbl9mcmFnbWVudCA9IG51bGw7XG5cblx0XHRcdFx0cGF1c2VfZWZmZWN0KC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAodGhpcy4jcGVuZGluZ19lZmZlY3QpLCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy4jcGVuZGluZ19lZmZlY3QgPSBudWxsO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLiNyZXNvbHZlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQjcmVuZGVyKCkge1xuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLmlzX3BlbmRpbmcgPSB0aGlzLmhhc19wZW5kaW5nX3NuaXBwZXQoKTtcblx0XHRcdHRoaXMuI3BlbmRpbmdfY291bnQgPSAwO1xuXHRcdFx0dGhpcy4jbG9jYWxfcGVuZGluZ19jb3VudCA9IDA7XG5cblx0XHRcdHRoaXMuI21haW5fZWZmZWN0ID0gYnJhbmNoKCgpID0+IHtcblx0XHRcdFx0dGhpcy4jY2hpbGRyZW4odGhpcy4jYW5jaG9yKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAodGhpcy4jcGVuZGluZ19jb3VudCA+IDApIHtcblx0XHRcdFx0dmFyIGZyYWdtZW50ID0gKHRoaXMuI29mZnNjcmVlbl9mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG5cdFx0XHRcdG1vdmVfZWZmZWN0KHRoaXMuI21haW5fZWZmZWN0LCBmcmFnbWVudCk7XG5cblx0XHRcdFx0Y29uc3QgcGVuZGluZyA9IC8qKiBAdHlwZSB7KGFuY2hvcjogTm9kZSkgPT4gdm9pZH0gKi8gKHRoaXMuI3Byb3BzLnBlbmRpbmcpO1xuXHRcdFx0XHR0aGlzLiNwZW5kaW5nX2VmZmVjdCA9IGJyYW5jaCgoKSA9PiBwZW5kaW5nKHRoaXMuI2FuY2hvcikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy4jcmVzb2x2ZSgpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aGlzLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQjcmVzb2x2ZSgpIHtcblx0XHR0aGlzLmlzX3BlbmRpbmcgPSBmYWxzZTtcblxuXHRcdC8vIGFueSBlZmZlY3RzIHRoYXQgd2VyZSBwcmV2aW91c2x5IGRlZmVycmVkIHNob3VsZCBiZSByZXNjaGVkdWxlZCDigJRcblx0XHQvLyBhZnRlciB0aGUgbmV4dCB0cmF2ZXJzYWwgKHdoaWNoIHdpbGwgaGFwcGVuIGltbWVkaWF0ZWx5LCBkdWUgdG8gdGhlXG5cdFx0Ly8gc2FtZSB1cGRhdGUgdGhhdCBicm91Z2h0IHVzIGhlcmUpIHRoZSBlZmZlY3RzIHdpbGwgYmUgZmx1c2hlZFxuXHRcdGZvciAoY29uc3QgZSBvZiB0aGlzLiNkaXJ0eV9lZmZlY3RzKSB7XG5cdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhlLCBESVJUWSk7XG5cdFx0XHRzY2hlZHVsZV9lZmZlY3QoZSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBlIG9mIHRoaXMuI21heWJlX2RpcnR5X2VmZmVjdHMpIHtcblx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGUsIE1BWUJFX0RJUlRZKTtcblx0XHRcdHNjaGVkdWxlX2VmZmVjdChlKTtcblx0XHR9XG5cblx0XHR0aGlzLiNkaXJ0eV9lZmZlY3RzLmNsZWFyKCk7XG5cdFx0dGhpcy4jbWF5YmVfZGlydHlfZWZmZWN0cy5jbGVhcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmVyIGFuIGVmZmVjdCBpbnNpZGUgYSBwZW5kaW5nIGJvdW5kYXJ5IHVudGlsIHRoZSBib3VuZGFyeSByZXNvbHZlc1xuXHQgKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG5cdCAqL1xuXHRkZWZlcl9lZmZlY3QoZWZmZWN0KSB7XG5cdFx0ZGVmZXJfZWZmZWN0KGVmZmVjdCwgdGhpcy4jZGlydHlfZWZmZWN0cywgdGhpcy4jbWF5YmVfZGlydHlfZWZmZWN0cyk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBgZmFsc2VgIGlmIHRoZSBlZmZlY3QgZXhpc3RzIGluc2lkZSBhIGJvdW5kYXJ5IHdob3NlIHBlbmRpbmcgc25pcHBldCBpcyBzaG93blxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGlzX3JlbmRlcmVkKCkge1xuXHRcdHJldHVybiAhdGhpcy5pc19wZW5kaW5nICYmICghdGhpcy5wYXJlbnQgfHwgdGhpcy5wYXJlbnQuaXNfcmVuZGVyZWQoKSk7XG5cdH1cblxuXHRoYXNfcGVuZGluZ19zbmlwcGV0KCkge1xuXHRcdHJldHVybiAhIXRoaXMuI3Byb3BzLnBlbmRpbmc7XG5cdH1cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHBhcmFtIHsoKSA9PiBUfSBmblxuXHQgKi9cblx0I3J1bihmbikge1xuXHRcdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXHRcdHZhciBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0XHR2YXIgcHJldmlvdXNfY3R4ID0gY29tcG9uZW50X2NvbnRleHQ7XG5cblx0XHRzZXRfYWN0aXZlX2VmZmVjdCh0aGlzLiNlZmZlY3QpO1xuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24odGhpcy4jZWZmZWN0KTtcblx0XHRzZXRfY29tcG9uZW50X2NvbnRleHQodGhpcy4jZWZmZWN0LmN0eCk7XG5cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGZuKCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0aGFuZGxlX2Vycm9yKGUpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHNldF9hY3RpdmVfZWZmZWN0KHByZXZpb3VzX2VmZmVjdCk7XG5cdFx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHByZXZpb3VzX3JlYWN0aW9uKTtcblx0XHRcdHNldF9jb21wb25lbnRfY29udGV4dChwcmV2aW91c19jdHgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBwZW5kaW5nIGNvdW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudGx5IHZpc2libGUgcGVuZGluZyBzbmlwcGV0LFxuXHQgKiBpZiBhbnksIHN1Y2ggdGhhdCB3ZSBjYW4gcmVwbGFjZSB0aGUgc25pcHBldCB3aXRoIGNvbnRlbnQgb25jZSB3b3JrIGlzIGRvbmVcblx0ICogQHBhcmFtIHsxIHwgLTF9IGRcblx0ICovXG5cdCN1cGRhdGVfcGVuZGluZ19jb3VudChkKSB7XG5cdFx0aWYgKCF0aGlzLmhhc19wZW5kaW5nX3NuaXBwZXQoKSkge1xuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB7XG5cdFx0XHRcdHRoaXMucGFyZW50LiN1cGRhdGVfcGVuZGluZ19jb3VudChkKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgdGhlcmUncyBubyBwYXJlbnQsIHdlJ3JlIGluIGEgc2NvcGUgd2l0aCBubyBwZW5kaW5nIHNuaXBwZXRcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLiNwZW5kaW5nX2NvdW50ICs9IGQ7XG5cblx0XHRpZiAodGhpcy4jcGVuZGluZ19jb3VudCA9PT0gMCkge1xuXHRcdFx0dGhpcy4jcmVzb2x2ZSgpO1xuXG5cdFx0XHRpZiAodGhpcy4jcGVuZGluZ19lZmZlY3QpIHtcblx0XHRcdFx0cGF1c2VfZWZmZWN0KHRoaXMuI3BlbmRpbmdfZWZmZWN0LCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy4jcGVuZGluZ19lZmZlY3QgPSBudWxsO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuI29mZnNjcmVlbl9mcmFnbWVudCkge1xuXHRcdFx0XHR0aGlzLiNhbmNob3IuYmVmb3JlKHRoaXMuI29mZnNjcmVlbl9mcmFnbWVudCk7XG5cdFx0XHRcdHRoaXMuI29mZnNjcmVlbl9mcmFnbWVudCA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgc291cmNlIHRoYXQgcG93ZXJzIGAkZWZmZWN0LnBlbmRpbmcoKWAgaW5zaWRlIHRoaXMgYm91bmRhcnksXG5cdCAqIGFuZCBjb250cm9scyB3aGVuIHRoZSBjdXJyZW50IGBwZW5kaW5nYCBzbmlwcGV0IChpZiBhbnkpIGlzIHJlbW92ZWQuXG5cdCAqIERvIG5vdCBjYWxsIGZyb20gaW5zaWRlIHRoZSBjbGFzc1xuXHQgKiBAcGFyYW0gezEgfCAtMX0gZFxuXHQgKi9cblx0dXBkYXRlX3BlbmRpbmdfY291bnQoZCkge1xuXHRcdHRoaXMuI3VwZGF0ZV9wZW5kaW5nX2NvdW50KGQpO1xuXG5cdFx0dGhpcy4jbG9jYWxfcGVuZGluZ19jb3VudCArPSBkO1xuXG5cdFx0aWYgKCF0aGlzLiNlZmZlY3RfcGVuZGluZyB8fCB0aGlzLiNwZW5kaW5nX2NvdW50X3VwZGF0ZV9xdWV1ZWQpIHJldHVybjtcblx0XHR0aGlzLiNwZW5kaW5nX2NvdW50X3VwZGF0ZV9xdWV1ZWQgPSB0cnVlO1xuXG5cdFx0cXVldWVfbWljcm9fdGFzaygoKSA9PiB7XG5cdFx0XHR0aGlzLiNwZW5kaW5nX2NvdW50X3VwZGF0ZV9xdWV1ZWQgPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiNlZmZlY3RfcGVuZGluZykge1xuXHRcdFx0XHRpbnRlcm5hbF9zZXQodGhpcy4jZWZmZWN0X3BlbmRpbmcsIHRoaXMuI2xvY2FsX3BlbmRpbmdfY291bnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0X2VmZmVjdF9wZW5kaW5nKCkge1xuXHRcdHRoaXMuI2VmZmVjdF9wZW5kaW5nX3N1YnNjcmliZXIoKTtcblx0XHRyZXR1cm4gZ2V0KC8qKiBAdHlwZSB7U291cmNlPG51bWJlcj59ICovICh0aGlzLiNlZmZlY3RfcGVuZGluZykpO1xuXHR9XG5cblx0LyoqIEBwYXJhbSB7dW5rbm93bn0gZXJyb3IgKi9cblx0ZXJyb3IoZXJyb3IpIHtcblx0XHR2YXIgb25lcnJvciA9IHRoaXMuI3Byb3BzLm9uZXJyb3I7XG5cdFx0bGV0IGZhaWxlZCA9IHRoaXMuI3Byb3BzLmZhaWxlZDtcblxuXHRcdC8vIElmIHdlIGhhdmUgbm90aGluZyB0byBjYXB0dXJlIHRoZSBlcnJvciwgb3IgaWYgd2UgaGl0IGFuIGVycm9yIHdoaWxlXG5cdFx0Ly8gcmVuZGVyaW5nIHRoZSBmYWxsYmFjaywgcmUtdGhyb3cgZm9yIGFub3RoZXIgYm91bmRhcnkgdG8gaGFuZGxlXG5cdFx0aWYgKCFvbmVycm9yICYmICFmYWlsZWQpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLiNtYWluX2VmZmVjdCkge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QodGhpcy4jbWFpbl9lZmZlY3QpO1xuXHRcdFx0dGhpcy4jbWFpbl9lZmZlY3QgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLiNwZW5kaW5nX2VmZmVjdCkge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QodGhpcy4jcGVuZGluZ19lZmZlY3QpO1xuXHRcdFx0dGhpcy4jcGVuZGluZ19lZmZlY3QgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLiNmYWlsZWRfZWZmZWN0KSB7XG5cdFx0XHRkZXN0cm95X2VmZmVjdCh0aGlzLiNmYWlsZWRfZWZmZWN0KTtcblx0XHRcdHRoaXMuI2ZhaWxlZF9lZmZlY3QgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdHNldF9oeWRyYXRlX25vZGUoLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovICh0aGlzLiNoeWRyYXRlX29wZW4pKTtcblx0XHRcdG5leHQoKTtcblx0XHRcdHNldF9oeWRyYXRlX25vZGUoc2tpcF9ub2RlcygpKTtcblx0XHR9XG5cblx0XHR2YXIgZGlkX3Jlc2V0ID0gZmFsc2U7XG5cdFx0dmFyIGNhbGxpbmdfb25fZXJyb3IgPSBmYWxzZTtcblxuXHRcdGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuXHRcdFx0aWYgKGRpZF9yZXNldCkge1xuXHRcdFx0XHR3LnN2ZWx0ZV9ib3VuZGFyeV9yZXNldF9ub29wKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZGlkX3Jlc2V0ID0gdHJ1ZTtcblxuXHRcdFx0aWYgKGNhbGxpbmdfb25fZXJyb3IpIHtcblx0XHRcdFx0ZS5zdmVsdGVfYm91bmRhcnlfcmVzZXRfb25lcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy4jZmFpbGVkX2VmZmVjdCAhPT0gbnVsbCkge1xuXHRcdFx0XHRwYXVzZV9lZmZlY3QodGhpcy4jZmFpbGVkX2VmZmVjdCwgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuI2ZhaWxlZF9lZmZlY3QgPSBudWxsO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy4jcnVuKCgpID0+IHtcblx0XHRcdFx0Ly8gSWYgdGhlIGZhaWx1cmUgaGFwcGVuZWQgd2hpbGUgZmx1c2hpbmcgZWZmZWN0cywgY3VycmVudF9iYXRjaCBjYW4gYmUgbnVsbFxuXHRcdFx0XHRCYXRjaC5lbnN1cmUoKTtcblxuXHRcdFx0XHR0aGlzLiNyZW5kZXIoKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHQvKiogQHBhcmFtIHt1bmtub3dufSB0cmFuc2Zvcm1lZF9lcnJvciAqL1xuXHRcdGNvbnN0IGhhbmRsZV9lcnJvcl9yZXN1bHQgPSAodHJhbnNmb3JtZWRfZXJyb3IpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNhbGxpbmdfb25fZXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRvbmVycm9yPy4odHJhbnNmb3JtZWRfZXJyb3IsIHJlc2V0KTtcblx0XHRcdFx0Y2FsbGluZ19vbl9lcnJvciA9IGZhbHNlO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0aW52b2tlX2Vycm9yX2JvdW5kYXJ5KGVycm9yLCB0aGlzLiNlZmZlY3QgJiYgdGhpcy4jZWZmZWN0LnBhcmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmYWlsZWQpIHtcblx0XHRcdFx0dGhpcy4jZmFpbGVkX2VmZmVjdCA9IHRoaXMuI3J1bigoKSA9PiB7XG5cdFx0XHRcdFx0QmF0Y2guZW5zdXJlKCk7XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGJyYW5jaCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIGVycm9ycyBpbiBgZmFpbGVkYCBzbmlwcGV0cyBjYXVzZSB0aGUgYm91bmRhcnkgdG8gZXJyb3IgYWdhaW5cblx0XHRcdFx0XHRcdFx0Ly8gVE9ETyBTdmVsdGUgNjogcmV2aXNpdCB0aGlzIGRlY2lzaW9uLCBtb3N0IGxpa2VseSBiZXR0ZXIgdG8gZ28gdG8gcGFyZW50IGJvdW5kYXJ5IGluc3RlYWRcblx0XHRcdFx0XHRcdFx0dmFyIGVmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0XHRcdFx0XHRcdFx0ZWZmZWN0LmIgPSB0aGlzO1xuXHRcdFx0XHRcdFx0XHRlZmZlY3QuZiB8PSBCT1VOREFSWV9FRkZFQ1Q7XG5cblx0XHRcdFx0XHRcdFx0ZmFpbGVkKFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuI2FuY2hvcixcblx0XHRcdFx0XHRcdFx0XHQoKSA9PiB0cmFuc2Zvcm1lZF9lcnJvcixcblx0XHRcdFx0XHRcdFx0XHQoKSA9PiByZXNldFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdGludm9rZV9lcnJvcl9ib3VuZGFyeShlcnJvciwgLyoqIEB0eXBlIHtFZmZlY3R9ICovICh0aGlzLiNlZmZlY3QucGFyZW50KSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdC8vIFJ1biB0aGUgZXJyb3IgdGhyb3VnaCB0aGUgQVBJLWxldmVsIHRyYW5zZm9ybUVycm9yIHRyYW5zZm9ybSAoZS5nLiBTdmVsdGVLaXQncyBoYW5kbGVFcnJvcilcblx0XHRcdC8qKiBAdHlwZSB7dW5rbm93bn0gKi9cblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLnRyYW5zZm9ybV9lcnJvcihlcnJvcik7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGludm9rZV9lcnJvcl9ib3VuZGFyeShlLCB0aGlzLiNlZmZlY3QgJiYgdGhpcy4jZWZmZWN0LnBhcmVudCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRyZXN1bHQgIT09IG51bGwgJiZcblx0XHRcdFx0dHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiZcblx0XHRcdFx0dHlwZW9mICgvKiogQHR5cGUge2FueX0gKi8gKHJlc3VsdCkudGhlbikgPT09ICdmdW5jdGlvbidcblx0XHRcdCkge1xuXHRcdFx0XHQvLyB0cmFuc2Zvcm1FcnJvciByZXR1cm5lZCBhIFByb21pc2Ug4oCUIHdhaXQgZm9yIGl0XG5cdFx0XHRcdC8qKiBAdHlwZSB7YW55fSAqLyAocmVzdWx0KS50aGVuKFxuXHRcdFx0XHRcdGhhbmRsZV9lcnJvcl9yZXN1bHQsXG5cdFx0XHRcdFx0LyoqIEBwYXJhbSB7dW5rbm93bn0gZSAqL1xuXHRcdFx0XHRcdChlKSA9PiBpbnZva2VfZXJyb3JfYm91bmRhcnkoZSwgdGhpcy4jZWZmZWN0ICYmIHRoaXMuI2VmZmVjdC5wYXJlbnQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBTeW5jaHJvbm91cyByZXN1bHQg4oCUIGhhbmRsZSBpbW1lZGlhdGVseVxuXHRcdFx0XHRoYW5kbGVfZXJyb3JfcmVzdWx0KHJlc3VsdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBlbmRpbmcoKSB7XG5cdGlmIChhY3RpdmVfZWZmZWN0ID09PSBudWxsKSB7XG5cdFx0ZS5lZmZlY3RfcGVuZGluZ19vdXRzaWRlX3JlYWN0aW9uKCk7XG5cdH1cblxuXHR2YXIgYm91bmRhcnkgPSBhY3RpdmVfZWZmZWN0LmI7XG5cblx0aWYgKGJvdW5kYXJ5ID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIDA7IC8vIFRPRE8gZXZlbnR1YWxseSB3ZSB3aWxsIG5lZWQgdGhpcyB0byBiZSBnbG9iYWxcblx0fVxuXG5cdHJldHVybiBib3VuZGFyeS5nZXRfZWZmZWN0X3BlbmRpbmcoKTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgQmxvY2tlciwgRWZmZWN0LCBWYWx1ZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBERVNUUk9ZRUQsIFNUQUxFX1JFQUNUSU9OIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQge1xuXHRjb21wb25lbnRfY29udGV4dCxcblx0ZGV2X3N0YWNrLFxuXHRpc19ydW5lcyxcblx0c2V0X2NvbXBvbmVudF9jb250ZXh0LFxuXHRzZXRfZGV2X3N0YWNrXG59IGZyb20gJy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgQm91bmRhcnkgfSBmcm9tICcuLi9kb20vYmxvY2tzL2JvdW5kYXJ5LmpzJztcbmltcG9ydCB7IGludm9rZV9lcnJvcl9ib3VuZGFyeSB9IGZyb20gJy4uL2Vycm9yLWhhbmRsaW5nLmpzJztcbmltcG9ydCB7XG5cdGFjdGl2ZV9lZmZlY3QsXG5cdGFjdGl2ZV9yZWFjdGlvbixcblx0c2V0X2FjdGl2ZV9lZmZlY3QsXG5cdHNldF9hY3RpdmVfcmVhY3Rpb25cbn0gZnJvbSAnLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBCYXRjaCwgY3VycmVudF9iYXRjaCB9IGZyb20gJy4vYmF0Y2guanMnO1xuaW1wb3J0IHtcblx0YXN5bmNfZGVyaXZlZCxcblx0Y3VycmVudF9hc3luY19lZmZlY3QsXG5cdGRlcml2ZWQsXG5cdGRlcml2ZWRfc2FmZV9lcXVhbCxcblx0c2V0X2Zyb21fYXN5bmNfZGVyaXZlZFxufSBmcm9tICcuL2Rlcml2ZWRzLmpzJztcbmltcG9ydCB7IGFib3J0ZWQgfSBmcm9tICcuL2VmZmVjdHMuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7QmxvY2tlcltdfSBibG9ja2Vyc1xuICogQHBhcmFtIHtBcnJheTwoKSA9PiBhbnk+fSBzeW5jXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IFByb21pc2U8YW55Pj59IGFzeW5jXG4gKiBAcGFyYW0geyh2YWx1ZXM6IFZhbHVlW10pID0+IGFueX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYmxvY2tlcnMsIHN5bmMsIGFzeW5jLCBmbikge1xuXHRjb25zdCBkID0gaXNfcnVuZXMoKSA/IGRlcml2ZWQgOiBkZXJpdmVkX3NhZmVfZXF1YWw7XG5cblx0Ly8gRmlsdGVyIG91dCBhbHJlYWR5LXNldHRsZWQgYmxvY2tlcnMgLSBubyBuZWVkIHRvIHdhaXQgZm9yIHRoZW1cblx0dmFyIHBlbmRpbmcgPSBibG9ja2Vycy5maWx0ZXIoKGIpID0+ICFiLnNldHRsZWQpO1xuXG5cdGlmIChhc3luYy5sZW5ndGggPT09IDAgJiYgcGVuZGluZy5sZW5ndGggPT09IDApIHtcblx0XHRmbihzeW5jLm1hcChkKSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGJhdGNoID0gY3VycmVudF9iYXRjaDtcblx0dmFyIHBhcmVudCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0dmFyIHJlc3RvcmUgPSBjYXB0dXJlKCk7XG5cdHZhciBibG9ja2VyX3Byb21pc2UgPVxuXHRcdHBlbmRpbmcubGVuZ3RoID09PSAxXG5cdFx0XHQ/IHBlbmRpbmdbMF0ucHJvbWlzZVxuXHRcdFx0OiBwZW5kaW5nLmxlbmd0aCA+IDFcblx0XHRcdFx0PyBQcm9taXNlLmFsbChwZW5kaW5nLm1hcCgoYikgPT4gYi5wcm9taXNlKSlcblx0XHRcdFx0OiBudWxsO1xuXG5cdC8qKiBAcGFyYW0ge1ZhbHVlW119IHZhbHVlcyAqL1xuXHRmdW5jdGlvbiBmaW5pc2godmFsdWVzKSB7XG5cdFx0cmVzdG9yZSgpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGZuKHZhbHVlcyk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmICgocGFyZW50LmYgJiBERVNUUk9ZRUQpID09PSAwKSB7XG5cdFx0XHRcdGludm9rZV9lcnJvcl9ib3VuZGFyeShlcnJvciwgcGFyZW50KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR1bnNldF9jb250ZXh0KCk7XG5cdH1cblxuXHQvLyBGYXN0IHBhdGg6IGJsb2NrZXJzIGJ1dCBubyBhc3luYyBleHByZXNzaW9uc1xuXHRpZiAoYXN5bmMubGVuZ3RoID09PSAwKSB7XG5cdFx0LyoqIEB0eXBlIHtQcm9taXNlPGFueT59ICovIChibG9ja2VyX3Byb21pc2UpLnRoZW4oKCkgPT4gZmluaXNoKHN5bmMubWFwKGQpKSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gRnVsbCBwYXRoOiBoYXMgYXN5bmMgZXhwcmVzc2lvbnNcblx0ZnVuY3Rpb24gcnVuKCkge1xuXHRcdHJlc3RvcmUoKTtcblx0XHRQcm9taXNlLmFsbChhc3luYy5tYXAoKGV4cHJlc3Npb24pID0+IGFzeW5jX2Rlcml2ZWQoZXhwcmVzc2lvbikpKVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4gZmluaXNoKFsuLi5zeW5jLm1hcChkKSwgLi4ucmVzdWx0XSkpXG5cdFx0XHQuY2F0Y2goKGVycm9yKSA9PiBpbnZva2VfZXJyb3JfYm91bmRhcnkoZXJyb3IsIHBhcmVudCkpO1xuXHR9XG5cblx0aWYgKGJsb2NrZXJfcHJvbWlzZSkge1xuXHRcdGJsb2NrZXJfcHJvbWlzZS50aGVuKHJ1bik7XG5cdH0gZWxzZSB7XG5cdFx0cnVuKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Jsb2NrZXJbXX0gYmxvY2tlcnNcbiAqIEBwYXJhbSB7KHZhbHVlczogVmFsdWVbXSkgPT4gYW55fSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVuX2FmdGVyX2Jsb2NrZXJzKGJsb2NrZXJzLCBmbikge1xuXHRmbGF0dGVuKGJsb2NrZXJzLCBbXSwgW10sIGZuKTtcbn1cblxuLyoqXG4gKiBDYXB0dXJlcyB0aGUgY3VycmVudCBlZmZlY3QgY29udGV4dCBzbyB0aGF0IHdlIGNhbiByZXN0b3JlIGl0IGFmdGVyXG4gKiBzb21lIGFzeW5jaHJvbm91cyB3b3JrIGhhcyBoYXBwZW5lZCAoc28gdGhhdCBlLmcuIGBhd2FpdCBhICsgYmBcbiAqIGNhdXNlcyBgYmAgdG8gYmUgcmVnaXN0ZXJlZCBhcyBhIGRlcGVuZGVuY3kpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FwdHVyZSgpIHtcblx0dmFyIHByZXZpb3VzX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cdHZhciBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0dmFyIHByZXZpb3VzX2NvbXBvbmVudF9jb250ZXh0ID0gY29tcG9uZW50X2NvbnRleHQ7XG5cdHZhciBwcmV2aW91c19iYXRjaCA9IGN1cnJlbnRfYmF0Y2g7XG5cblx0aWYgKERFVikge1xuXHRcdHZhciBwcmV2aW91c19kZXZfc3RhY2sgPSBkZXZfc3RhY2s7XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gcmVzdG9yZShhY3RpdmF0ZV9iYXRjaCA9IHRydWUpIHtcblx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24ocHJldmlvdXNfcmVhY3Rpb24pO1xuXHRcdHNldF9jb21wb25lbnRfY29udGV4dChwcmV2aW91c19jb21wb25lbnRfY29udGV4dCk7XG5cdFx0aWYgKGFjdGl2YXRlX2JhdGNoKSBwcmV2aW91c19iYXRjaD8uYWN0aXZhdGUoKTtcblxuXHRcdGlmIChERVYpIHtcblx0XHRcdHNldF9mcm9tX2FzeW5jX2Rlcml2ZWQobnVsbCk7XG5cdFx0XHRzZXRfZGV2X3N0YWNrKHByZXZpb3VzX2Rldl9zdGFjayk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIFdyYXBzIGFuIGBhd2FpdGAgZXhwcmVzc2lvbiBpbiBzdWNoIGEgd2F5IHRoYXQgdGhlIGVmZmVjdCBjb250ZXh0IHRoYXQgd2FzXG4gKiBhY3RpdmUgYmVmb3JlIHRoZSBleHByZXNzaW9uIGV2YWx1YXRlZCBjYW4gYmUgcmVhcHBsaWVkIGFmdGVyd2FyZHMg4oCUXG4gKiBgYXdhaXQgYSArIGJgIGJlY29tZXMgYChhd2FpdCAkLnNhdmUoYSkpKCkgKyBiYFxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7UHJvbWlzZTxUPn0gcHJvbWlzZVxuICogQHJldHVybnMge1Byb21pc2U8KCkgPT4gVD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlKHByb21pc2UpIHtcblx0dmFyIHJlc3RvcmUgPSBjYXB0dXJlKCk7XG5cdHZhciB2YWx1ZSA9IGF3YWl0IHByb21pc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRyZXN0b3JlKCk7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJlc2V0IGBjdXJyZW50X2FzeW5jX2VmZmVjdGAgYWZ0ZXIgdGhlIGBwcm9taXNlYCByZXNvbHZlcywgc29cbiAqIHRoYXQgd2UgY2FuIGVtaXQgYGF3YWl0X3JlYWN0aXZpdHlfbG9zc2Agd2FybmluZ3NcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge1Byb21pc2U8VD59IHByb21pc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPCgpID0+IFQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJhY2tfcmVhY3Rpdml0eV9sb3NzKHByb21pc2UpIHtcblx0dmFyIHByZXZpb3VzX2FzeW5jX2VmZmVjdCA9IGN1cnJlbnRfYXN5bmNfZWZmZWN0O1xuXHR2YXIgdmFsdWUgPSBhd2FpdCBwcm9taXNlO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0c2V0X2Zyb21fYXN5bmNfZGVyaXZlZChwcmV2aW91c19hc3luY19lZmZlY3QpO1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcbn1cblxuLyoqXG4gKiBVc2VkIGluIGBmb3IgYXdhaXRgIGxvb3BzIGluIERFViwgc29cbiAqIHRoYXQgd2UgY2FuIGVtaXQgYGF3YWl0X3JlYWN0aXZpdHlfbG9zc2Agd2FybmluZ3NcbiAqIGFmdGVyIGVhY2ggYGFzeW5jX2l0ZXJhdG9yYCByZXN1bHQgcmVzb2x2ZXMgYW5kXG4gKiBhZnRlciB0aGUgYGFzeW5jX2l0ZXJhdG9yYCByZXR1cm4gcmVzb2x2ZXMgKGlmIGl0IHJ1bnMpXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIFRSZXR1cm5cbiAqIEBwYXJhbSB7SXRlcmFibGU8VD4gfCBBc3luY0l0ZXJhYmxlPFQ+fSBpdGVyYWJsZVxuICogQHJldHVybnMge0FzeW5jR2VuZXJhdG9yPFQsIFRSZXR1cm4gfCB1bmRlZmluZWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIGZvcl9hd2FpdF90cmFja19yZWFjdGl2aXR5X2xvc3MoaXRlcmFibGUpIHtcblx0Ly8gVGhpcyBpcyBiYXNlZCBvbiB0aGUgYWxnb3JpdGhtcyBkZXNjcmliZWQgaW4gRUNNQS0yNjI6XG5cdC8vIEZvckluL09mQm9keUV2YWx1YXRpb25cblx0Ly8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvbXVsdGlwYWdlL2VjbWFzY3JpcHQtbGFuZ3VhZ2Utc3RhdGVtZW50cy1hbmQtZGVjbGFyYXRpb25zLmh0bWwjc2VjLXJ1bnRpbWUtc2VtYW50aWNzLWZvcmluLWRpdi1vZmJvZHlldmFsdWF0aW9uLWxocy1zdG10LWl0ZXJhdG9yLWxoc2tpbmQtbGFiZWxzZXRcblx0Ly8gQXN5bmNJdGVyYXRvckNsb3NlXG5cdC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyL211bHRpcGFnZS9hYnN0cmFjdC1vcGVyYXRpb25zLmh0bWwjc2VjLWFzeW5jaXRlcmF0b3JjbG9zZVxuXG5cdC8qKiBAdHlwZSB7QXN5bmNJdGVyYXRvcjxULCBUUmV0dXJuPn0gKi9cblx0Ly8gQHRzLWlnbm9yZVxuXHRjb25zdCBpdGVyYXRvciA9IGl0ZXJhYmxlW1N5bWJvbC5hc3luY0l0ZXJhdG9yXT8uKCkgPz8gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXT8uKCk7XG5cblx0aWYgKGl0ZXJhdG9yID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWx1ZSBpcyBub3QgYXN5bmMgaXRlcmFibGUnKTtcblx0fVxuXG5cdC8qKiBXaGV0aGVyIHRoZSBjb21wbGV0aW9uIG9mIHRoZSBpdGVyYXRvciB3YXMgXCJub3JtYWxcIiwgbWVhbmluZyBpdCB3YXNuJ3QgZW5kZWQgdmlhIGBicmVha2Agb3IgYSBzaW1pbGFyIG1ldGhvZCAqL1xuXHRsZXQgbm9ybWFsX2NvbXBsZXRpb24gPSBmYWxzZTtcblx0dHJ5IHtcblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0Y29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gKGF3YWl0IHRyYWNrX3JlYWN0aXZpdHlfbG9zcyhpdGVyYXRvci5uZXh0KCkpKSgpO1xuXHRcdFx0aWYgKGRvbmUpIHtcblx0XHRcdFx0bm9ybWFsX2NvbXBsZXRpb24gPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHlpZWxkIHZhbHVlO1xuXHRcdH1cblx0fSBmaW5hbGx5IHtcblx0XHQvLyBJZiB0aGUgaXRlcmF0b3IgaGFkIGEgbm9ybWFsIGNvbXBsZXRpb24gYW5kIGByZXR1cm5gIGlzIGRlZmluZWQgb24gdGhlIGl0ZXJhdG9yLCBjYWxsIGl0IGFuZCByZXR1cm4gdGhlIHZhbHVlXG5cdFx0aWYgKG5vcm1hbF9jb21wbGV0aW9uICYmIGl0ZXJhdG9yLnJldHVybiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5zYWZlLWZpbmFsbHlcblx0XHRcdHJldHVybiAvKiogQHR5cGUge1RSZXR1cm59ICovICgoYXdhaXQgdHJhY2tfcmVhY3Rpdml0eV9sb3NzKGl0ZXJhdG9yLnJldHVybigpKSkoKS52YWx1ZSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNldF9jb250ZXh0KGRlYWN0aXZhdGVfYmF0Y2ggPSB0cnVlKSB7XG5cdHNldF9hY3RpdmVfZWZmZWN0KG51bGwpO1xuXHRzZXRfYWN0aXZlX3JlYWN0aW9uKG51bGwpO1xuXHRzZXRfY29tcG9uZW50X2NvbnRleHQobnVsbCk7XG5cdGlmIChkZWFjdGl2YXRlX2JhdGNoKSBjdXJyZW50X2JhdGNoPy5kZWFjdGl2YXRlKCk7XG5cblx0aWYgKERFVikge1xuXHRcdHNldF9mcm9tX2FzeW5jX2Rlcml2ZWQobnVsbCk7XG5cdFx0c2V0X2Rldl9zdGFjayhudWxsKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD4+fSB0aHVua3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bih0aHVua3MpIHtcblx0Y29uc3QgcmVzdG9yZSA9IGNhcHR1cmUoKTtcblxuXHRjb25zdCBkZWNyZW1lbnRfcGVuZGluZyA9IGluY3JlbWVudF9wZW5kaW5nKCk7XG5cblx0dmFyIGFjdGl2ZSA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0LyoqIEB0eXBlIHtudWxsIHwgeyBlcnJvcjogYW55IH19ICovXG5cdHZhciBlcnJvcmVkID0gbnVsbDtcblxuXHQvKiogQHBhcmFtIHthbnl9IGVycm9yICovXG5cdGNvbnN0IGhhbmRsZV9lcnJvciA9IChlcnJvcikgPT4ge1xuXHRcdGVycm9yZWQgPSB7IGVycm9yIH07IC8vIHdyYXAgaW4gb2JqZWN0IGluIGNhc2UgYSBwcm9taXNlIHJlamVjdHMgd2l0aCBhIGZhbHN5IHZhbHVlXG5cblx0XHRpZiAoIWFib3J0ZWQoYWN0aXZlKSkge1xuXHRcdFx0aW52b2tlX2Vycm9yX2JvdW5kYXJ5KGVycm9yLCBhY3RpdmUpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0aHVua3NbMF0oKSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcblxuXHQvKiogQHR5cGUge0Jsb2NrZXJ9ICovXG5cdHZhciBibG9ja2VyID0geyBwcm9taXNlLCBzZXR0bGVkOiBmYWxzZSB9O1xuXHR2YXIgYmxvY2tlcnMgPSBbYmxvY2tlcl07XG5cblx0cHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRibG9ja2VyLnNldHRsZWQgPSB0cnVlO1xuXHR9KTtcblxuXHRmb3IgKGNvbnN0IGZuIG9mIHRodW5rcy5zbGljZSgxKSkge1xuXHRcdHByb21pc2UgPSBwcm9taXNlXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcmVkKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JlZC5lcnJvcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhYm9ydGVkKGFjdGl2ZSkpIHtcblx0XHRcdFx0XHR0aHJvdyBTVEFMRV9SRUFDVElPTjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3RvcmUoKTtcblx0XHRcdFx0cmV0dXJuIGZuKCk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGhhbmRsZV9lcnJvcik7XG5cblx0XHRjb25zdCBibG9ja2VyID0geyBwcm9taXNlLCBzZXR0bGVkOiBmYWxzZSB9O1xuXHRcdGJsb2NrZXJzLnB1c2goYmxvY2tlcik7XG5cblx0XHRwcm9taXNlLmZpbmFsbHkoKCkgPT4ge1xuXHRcdFx0YmxvY2tlci5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdHVuc2V0X2NvbnRleHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdHByb21pc2Vcblx0XHQvLyB3YWl0IG9uZSBtb3JlIHRpY2ssIHNvIHRoYXQgdGVtcGxhdGUgZWZmZWN0cyBhcmVcblx0XHQvLyBndWFyYW50ZWVkIHRvIHJ1biBiZWZvcmUgYCRlZmZlY3QoLi4uKWBcblx0XHQudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoKSlcblx0XHQuZmluYWxseShkZWNyZW1lbnRfcGVuZGluZyk7XG5cblx0cmV0dXJuIGJsb2NrZXJzO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7QmxvY2tlcltdfSBibG9ja2Vyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gd2FpdChibG9ja2Vycykge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoYmxvY2tlcnMubWFwKChiKSA9PiBiLnByb21pc2UpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluY3JlbWVudF9wZW5kaW5nKCkge1xuXHR2YXIgYm91bmRhcnkgPSAvKiogQHR5cGUge0JvdW5kYXJ5fSAqLyAoLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KS5iKTtcblx0dmFyIGJhdGNoID0gLyoqIEB0eXBlIHtCYXRjaH0gKi8gKGN1cnJlbnRfYmF0Y2gpO1xuXHR2YXIgYmxvY2tpbmcgPSBib3VuZGFyeS5pc19yZW5kZXJlZCgpO1xuXG5cdGJvdW5kYXJ5LnVwZGF0ZV9wZW5kaW5nX2NvdW50KDEpO1xuXHRiYXRjaC5pbmNyZW1lbnQoYmxvY2tpbmcpO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Ym91bmRhcnkudXBkYXRlX3BlbmRpbmdfY291bnQoLTEpO1xuXHRcdGJhdGNoLmRlY3JlbWVudChibG9ja2luZyk7XG5cdH07XG59XG4iLCIvKiogQGltcG9ydCB7IERlcml2ZWQsIEVmZmVjdCwgU291cmNlIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuL2JhdGNoLmpzJzsgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHtcblx0RVJST1JfVkFMVUUsXG5cdERFUklWRUQsXG5cdERJUlRZLFxuXHRFRkZFQ1RfUFJFU0VSVkVELFxuXHRTVEFMRV9SRUFDVElPTixcblx0QVNZTkMsXG5cdFdBU19NQVJLRUQsXG5cdERFU1RST1lFRCxcblx0Q0xFQU5cbn0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHtcblx0YWN0aXZlX3JlYWN0aW9uLFxuXHRhY3RpdmVfZWZmZWN0LFxuXHR1cGRhdGVfcmVhY3Rpb24sXG5cdGluY3JlbWVudF93cml0ZV92ZXJzaW9uLFxuXHRzZXRfYWN0aXZlX2VmZmVjdCxcblx0cHVzaF9yZWFjdGlvbl92YWx1ZSxcblx0aXNfZGVzdHJveWluZ19lZmZlY3QsXG5cdHVwZGF0ZV9lZmZlY3QsXG5cdHJlbW92ZV9yZWFjdGlvbnNcbn0gZnJvbSAnLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBlcXVhbHMsIHNhZmVfZXF1YWxzIH0gZnJvbSAnLi9lcXVhbGl0eS5qcyc7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4uL2Vycm9ycy5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4uL3dhcm5pbmdzLmpzJztcbmltcG9ydCB7XG5cdGFzeW5jX2VmZmVjdCxcblx0ZGVzdHJveV9lZmZlY3QsXG5cdGRlc3Ryb3lfZWZmZWN0X2NoaWxkcmVuLFxuXHRlZmZlY3RfdHJhY2tpbmcsXG5cdHRlYXJkb3duXG59IGZyb20gJy4vZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBlYWdlcl9lZmZlY3RzLCBpbnRlcm5hbF9zZXQsIHNldF9lYWdlcl9lZmZlY3RzLCBzb3VyY2UgfSBmcm9tICcuL3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgZ2V0X2Vycm9yIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Rldi5qcyc7XG5pbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcsIHRyYWNpbmdfbW9kZV9mbGFnIH0gZnJvbSAnLi4vLi4vZmxhZ3MvaW5kZXguanMnO1xuaW1wb3J0IHsgQm91bmRhcnkgfSBmcm9tICcuLi9kb20vYmxvY2tzL2JvdW5kYXJ5LmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9jb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBVTklOSVRJQUxJWkVEIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGJhdGNoX3ZhbHVlcywgY3VycmVudF9iYXRjaCB9IGZyb20gJy4vYmF0Y2guanMnO1xuaW1wb3J0IHsgaW5jcmVtZW50X3BlbmRpbmcsIHVuc2V0X2NvbnRleHQgfSBmcm9tICcuL2FzeW5jLmpzJztcbmltcG9ydCB7IGRlZmVycmVkLCBpbmNsdWRlcywgbm9vcCB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBzZXRfc2lnbmFsX3N0YXR1cywgdXBkYXRlX2Rlcml2ZWRfc3RhdHVzIH0gZnJvbSAnLi9zdGF0dXMuanMnO1xuXG4vKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovXG5leHBvcnQgbGV0IGN1cnJlbnRfYXN5bmNfZWZmZWN0ID0gbnVsbDtcblxuLyoqIEBwYXJhbSB7RWZmZWN0IHwgbnVsbH0gdiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9mcm9tX2FzeW5jX2Rlcml2ZWQodikge1xuXHRjdXJyZW50X2FzeW5jX2VmZmVjdCA9IHY7XG59XG5cbmV4cG9ydCBjb25zdCByZWNlbnRfYXN5bmNfZGVyaXZlZHMgPSBuZXcgU2V0KCk7XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7KCkgPT4gVn0gZm5cbiAqIEByZXR1cm5zIHtEZXJpdmVkPFY+fVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXJpdmVkKGZuKSB7XG5cdHZhciBmbGFncyA9IERFUklWRUQgfCBESVJUWTtcblx0dmFyIHBhcmVudF9kZXJpdmVkID1cblx0XHRhY3RpdmVfcmVhY3Rpb24gIT09IG51bGwgJiYgKGFjdGl2ZV9yZWFjdGlvbi5mICYgREVSSVZFRCkgIT09IDBcblx0XHRcdD8gLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoYWN0aXZlX3JlYWN0aW9uKVxuXHRcdFx0OiBudWxsO1xuXG5cdGlmIChhY3RpdmVfZWZmZWN0ICE9PSBudWxsKSB7XG5cdFx0Ly8gU2luY2UgZGVyaXZlZHMgYXJlIGV2YWx1YXRlZCBsYXppbHksIGFueSBlZmZlY3RzIGNyZWF0ZWQgaW5zaWRlIHRoZW0gYXJlXG5cdFx0Ly8gY3JlYXRlZCB0b28gbGF0ZSB0byBlbnN1cmUgdGhhdCB0aGUgcGFyZW50IGVmZmVjdCBpcyBhZGRlZCB0byB0aGUgdHJlZVxuXHRcdGFjdGl2ZV9lZmZlY3QuZiB8PSBFRkZFQ1RfUFJFU0VSVkVEO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtEZXJpdmVkPFY+fSAqL1xuXHRjb25zdCBzaWduYWwgPSB7XG5cdFx0Y3R4OiBjb21wb25lbnRfY29udGV4dCxcblx0XHRkZXBzOiBudWxsLFxuXHRcdGVmZmVjdHM6IG51bGwsXG5cdFx0ZXF1YWxzLFxuXHRcdGY6IGZsYWdzLFxuXHRcdGZuLFxuXHRcdHJlYWN0aW9uczogbnVsbCxcblx0XHRydjogMCxcblx0XHR2OiAvKiogQHR5cGUge1Z9ICovIChVTklOSVRJQUxJWkVEKSxcblx0XHR3djogMCxcblx0XHRwYXJlbnQ6IHBhcmVudF9kZXJpdmVkID8/IGFjdGl2ZV9lZmZlY3QsXG5cdFx0YWM6IG51bGxcblx0fTtcblxuXHRpZiAoREVWICYmIHRyYWNpbmdfbW9kZV9mbGFnKSB7XG5cdFx0c2lnbmFsLmNyZWF0ZWQgPSBnZXRfZXJyb3IoJ2NyZWF0ZWQgYXQnKTtcblx0fVxuXG5cdHJldHVybiBzaWduYWw7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7KCkgPT4gViB8IFByb21pc2U8Vj59IGZuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xhYmVsXVxuICogQHBhcmFtIHtzdHJpbmd9IFtsb2NhdGlvbl0gSWYgcHJvdmlkZWQsIHByaW50IGEgd2FybmluZyBpZiB0aGUgdmFsdWUgaXMgbm90IHJlYWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdXBkYXRlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxTb3VyY2U8Vj4+fVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3luY19kZXJpdmVkKGZuLCBsYWJlbCwgbG9jYXRpb24pIHtcblx0bGV0IHBhcmVudCA9IC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdGlmIChwYXJlbnQgPT09IG51bGwpIHtcblx0XHRlLmFzeW5jX2Rlcml2ZWRfb3JwaGFuKCk7XG5cdH1cblxuXHR2YXIgcHJvbWlzZSA9IC8qKiBAdHlwZSB7UHJvbWlzZTxWPn0gKi8gKC8qKiBAdHlwZSB7dW5rbm93bn0gKi8gKHVuZGVmaW5lZCkpO1xuXHR2YXIgc2lnbmFsID0gc291cmNlKC8qKiBAdHlwZSB7Vn0gKi8gKFVOSU5JVElBTElaRUQpKTtcblxuXHRpZiAoREVWKSBzaWduYWwubGFiZWwgPSBsYWJlbDtcblxuXHQvLyBvbmx5IHN1c3BlbmQgaW4gYXN5bmMgZGVyaXZlZHMgY3JlYXRlZCBvbiBpbml0aWFsaXNhdGlvblxuXHR2YXIgc2hvdWxkX3N1c3BlbmQgPSAhYWN0aXZlX3JlYWN0aW9uO1xuXG5cdC8qKiBAdHlwZSB7TWFwPEJhdGNoLCBSZXR1cm5UeXBlPHR5cGVvZiBkZWZlcnJlZDxWPj4+fSAqL1xuXHR2YXIgZGVmZXJyZWRzID0gbmV3IE1hcCgpO1xuXG5cdGFzeW5jX2VmZmVjdCgoKSA9PiB7XG5cdFx0aWYgKERFVikgY3VycmVudF9hc3luY19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXG5cdFx0LyoqIEB0eXBlIHtSZXR1cm5UeXBlPHR5cGVvZiBkZWZlcnJlZDxWPj59ICovXG5cdFx0dmFyIGQgPSBkZWZlcnJlZCgpO1xuXHRcdHByb21pc2UgPSBkLnByb21pc2U7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gSWYgdGhpcyBjb2RlIGlzIGNoYW5nZWQgYXQgc29tZSBwb2ludCwgbWFrZSBzdXJlIHRvIHN0aWxsIGFjY2VzcyB0aGUgdGhlbiBwcm9wZXJ0eVxuXHRcdFx0Ly8gb2YgZm4oKSB0byByZWFkIGFueSBzaWduYWxzIGl0IG1pZ2h0IGFjY2Vzcywgc28gdGhhdCB3ZSB0cmFjayB0aGVtIGFzIGRlcGVuZGVuY2llcy5cblx0XHRcdC8vIFdlIGNhbGwgYHVuc2V0X2NvbnRleHRgIHRvIHVuZG8gYW55IGBzYXZlYCBjYWxscyB0aGF0IGhhcHBlbiBpbnNpZGUgYGZuKClgXG5cdFx0XHRQcm9taXNlLnJlc29sdmUoZm4oKSkudGhlbihkLnJlc29sdmUsIGQucmVqZWN0KS5maW5hbGx5KHVuc2V0X2NvbnRleHQpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRkLnJlamVjdChlcnJvcik7XG5cdFx0XHR1bnNldF9jb250ZXh0KCk7XG5cdFx0fVxuXG5cdFx0aWYgKERFVikgY3VycmVudF9hc3luY19lZmZlY3QgPSBudWxsO1xuXG5cdFx0dmFyIGJhdGNoID0gLyoqIEB0eXBlIHtCYXRjaH0gKi8gKGN1cnJlbnRfYmF0Y2gpO1xuXG5cdFx0aWYgKHNob3VsZF9zdXNwZW5kKSB7XG5cdFx0XHR2YXIgZGVjcmVtZW50X3BlbmRpbmcgPSBpbmNyZW1lbnRfcGVuZGluZygpO1xuXG5cdFx0XHRkZWZlcnJlZHMuZ2V0KGJhdGNoKT8ucmVqZWN0KFNUQUxFX1JFQUNUSU9OKTtcblx0XHRcdGRlZmVycmVkcy5kZWxldGUoYmF0Y2gpOyAvLyBkZWxldGUgdG8gZW5zdXJlIGNvcnJlY3Qgb3JkZXIgaW4gTWFwIGl0ZXJhdGlvbiBiZWxvd1xuXHRcdFx0ZGVmZXJyZWRzLnNldChiYXRjaCwgZCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHthbnl9IHZhbHVlXG5cdFx0ICogQHBhcmFtIHt1bmtub3dufSBlcnJvclxuXHRcdCAqL1xuXHRcdGNvbnN0IGhhbmRsZXIgPSAodmFsdWUsIGVycm9yID0gdW5kZWZpbmVkKSA9PiB7XG5cdFx0XHRjdXJyZW50X2FzeW5jX2VmZmVjdCA9IG51bGw7XG5cblx0XHRcdGJhdGNoLmFjdGl2YXRlKCk7XG5cblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRpZiAoZXJyb3IgIT09IFNUQUxFX1JFQUNUSU9OKSB7XG5cdFx0XHRcdFx0c2lnbmFsLmYgfD0gRVJST1JfVkFMVUU7XG5cblx0XHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIHRoZSBlcnJvciBpcyB0aGUgd3JvbmcgdHlwZSwgYnV0IHdlIGRvbid0IGNhcmVcblx0XHRcdFx0XHRpbnRlcm5hbF9zZXQoc2lnbmFsLCBlcnJvcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICgoc2lnbmFsLmYgJiBFUlJPUl9WQUxVRSkgIT09IDApIHtcblx0XHRcdFx0XHRzaWduYWwuZiBePSBFUlJPUl9WQUxVRTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGludGVybmFsX3NldChzaWduYWwsIHZhbHVlKTtcblxuXHRcdFx0XHQvLyBBbGwgcHJpb3IgYXN5bmMgZGVyaXZlZCBydW5zIGFyZSBub3cgc3RhbGVcblx0XHRcdFx0Zm9yIChjb25zdCBbYiwgZF0gb2YgZGVmZXJyZWRzKSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWRzLmRlbGV0ZShiKTtcblx0XHRcdFx0XHRpZiAoYiA9PT0gYmF0Y2gpIGJyZWFrO1xuXHRcdFx0XHRcdGQucmVqZWN0KFNUQUxFX1JFQUNUSU9OKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChERVYgJiYgbG9jYXRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJlY2VudF9hc3luY19kZXJpdmVkcy5hZGQoc2lnbmFsKTtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHJlY2VudF9hc3luY19kZXJpdmVkcy5oYXMoc2lnbmFsKSkge1xuXHRcdFx0XHRcdFx0XHR3LmF3YWl0X3dhdGVyZmFsbCgvKiogQHR5cGUge3N0cmluZ30gKi8gKHNpZ25hbC5sYWJlbCksIGxvY2F0aW9uKTtcblx0XHRcdFx0XHRcdFx0cmVjZW50X2FzeW5jX2Rlcml2ZWRzLmRlbGV0ZShzaWduYWwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkZWNyZW1lbnRfcGVuZGluZykge1xuXHRcdFx0XHRkZWNyZW1lbnRfcGVuZGluZygpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRkLnByb21pc2UudGhlbihoYW5kbGVyLCAoZSkgPT4gaGFuZGxlcihudWxsLCBlIHx8ICd1bmtub3duJykpO1xuXHR9KTtcblxuXHR0ZWFyZG93bigoKSA9PiB7XG5cdFx0Zm9yIChjb25zdCBkIG9mIGRlZmVycmVkcy52YWx1ZXMoKSkge1xuXHRcdFx0ZC5yZWplY3QoU1RBTEVfUkVBQ1RJT04pO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKERFVikge1xuXHRcdC8vIGFkZCBhIGZsYWcgdGhhdCBsZXRzIHRoaXMgYmUgcHJpbnRlZCBhcyBhIGRlcml2ZWRcblx0XHQvLyB3aGVuIHVzaW5nIGAkaW5zcGVjdC50cmFjZSgpYFxuXHRcdHNpZ25hbC5mIHw9IEFTWU5DO1xuXHR9XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWwpID0+IHtcblx0XHQvKiogQHBhcmFtIHtQcm9taXNlPFY+fSBwICovXG5cdFx0ZnVuY3Rpb24gbmV4dChwKSB7XG5cdFx0XHRmdW5jdGlvbiBnbygpIHtcblx0XHRcdFx0aWYgKHAgPT09IHByb21pc2UpIHtcblx0XHRcdFx0XHRmdWxmaWwoc2lnbmFsKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgZWZmZWN0IHJlLXJ1bnMgYmVmb3JlIHRoZSBpbml0aWFsIHByb21pc2Vcblx0XHRcdFx0XHQvLyByZXNvbHZlcywgZGVsYXkgcmVzb2x1dGlvbiB1bnRpbCB3ZSBoYXZlIGEgdmFsdWVcblx0XHRcdFx0XHRuZXh0KHByb21pc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHAudGhlbihnbywgZ28pO1xuXHRcdH1cblxuXHRcdG5leHQocHJvbWlzZSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0geygpID0+IFZ9IGZuXG4gKiBAcmV0dXJucyB7RGVyaXZlZDxWPn1cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gdXNlcl9kZXJpdmVkKGZuKSB7XG5cdGNvbnN0IGQgPSBkZXJpdmVkKGZuKTtcblxuXHRpZiAoIWFzeW5jX21vZGVfZmxhZykgcHVzaF9yZWFjdGlvbl92YWx1ZShkKTtcblxuXHRyZXR1cm4gZDtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHsoKSA9PiBWfSBmblxuICogQHJldHVybnMge0Rlcml2ZWQ8Vj59XG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGRlcml2ZWRfc2FmZV9lcXVhbChmbikge1xuXHRjb25zdCBzaWduYWwgPSBkZXJpdmVkKGZuKTtcblx0c2lnbmFsLmVxdWFscyA9IHNhZmVfZXF1YWxzO1xuXHRyZXR1cm4gc2lnbmFsO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RGVyaXZlZH0gZGVyaXZlZFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95X2Rlcml2ZWRfZWZmZWN0cyhkZXJpdmVkKSB7XG5cdHZhciBlZmZlY3RzID0gZGVyaXZlZC5lZmZlY3RzO1xuXG5cdGlmIChlZmZlY3RzICE9PSBudWxsKSB7XG5cdFx0ZGVyaXZlZC5lZmZlY3RzID0gbnVsbDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWZmZWN0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QoLyoqIEB0eXBlIHtFZmZlY3R9ICovIChlZmZlY3RzW2ldKSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSB1cGRhdGluZyBkZXJpdmVkcywgdXNlZCB0byBkZXRlY3QgaW5maW5pdGUgcmVjdXJzaW9uXG4gKiBpbiBkZXYgbW9kZSBhbmQgcHJvdmlkZSBhIG5pY2VyIGVycm9yIHRoYW4gJ3RvbyBtdWNoIHJlY3Vyc2lvbidcbiAqIEB0eXBlIHtEZXJpdmVkW119XG4gKi9cbmxldCBzdGFjayA9IFtdO1xuXG4vKipcbiAqIEBwYXJhbSB7RGVyaXZlZH0gZGVyaXZlZFxuICogQHJldHVybnMge0VmZmVjdCB8IG51bGx9XG4gKi9cbmZ1bmN0aW9uIGdldF9kZXJpdmVkX3BhcmVudF9lZmZlY3QoZGVyaXZlZCkge1xuXHR2YXIgcGFyZW50ID0gZGVyaXZlZC5wYXJlbnQ7XG5cdHdoaWxlIChwYXJlbnQgIT09IG51bGwpIHtcblx0XHRpZiAoKHBhcmVudC5mICYgREVSSVZFRCkgPT09IDApIHtcblx0XHRcdC8vIFRoZSBvcmlnaW5hbCBwYXJlbnQgZWZmZWN0IG1pZ2h0J3ZlIGJlZW4gZGVzdHJveWVkIGJ1dCB0aGUgZGVyaXZlZFxuXHRcdFx0Ly8gaXMgdXNlZCBlbHNld2hlcmUgbm93IC0gZG8gbm90IHJldHVybiB0aGUgZGVzdHJveWVkIGVmZmVjdCBpbiB0aGF0IGNhc2Vcblx0XHRcdHJldHVybiAocGFyZW50LmYgJiBERVNUUk9ZRUQpID09PSAwID8gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChwYXJlbnQpIDogbnVsbDtcblx0XHR9XG5cdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudDtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtEZXJpdmVkfSBkZXJpdmVkXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVfZGVyaXZlZChkZXJpdmVkKSB7XG5cdHZhciB2YWx1ZTtcblx0dmFyIHByZXZfYWN0aXZlX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cblx0c2V0X2FjdGl2ZV9lZmZlY3QoZ2V0X2Rlcml2ZWRfcGFyZW50X2VmZmVjdChkZXJpdmVkKSk7XG5cblx0aWYgKERFVikge1xuXHRcdGxldCBwcmV2X2VhZ2VyX2VmZmVjdHMgPSBlYWdlcl9lZmZlY3RzO1xuXHRcdHNldF9lYWdlcl9lZmZlY3RzKG5ldyBTZXQoKSk7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChpbmNsdWRlcy5jYWxsKHN0YWNrLCBkZXJpdmVkKSkge1xuXHRcdFx0XHRlLmRlcml2ZWRfcmVmZXJlbmNlc19zZWxmKCk7XG5cdFx0XHR9XG5cblx0XHRcdHN0YWNrLnB1c2goZGVyaXZlZCk7XG5cblx0XHRcdGRlcml2ZWQuZiAmPSB+V0FTX01BUktFRDtcblx0XHRcdGRlc3Ryb3lfZGVyaXZlZF9lZmZlY3RzKGRlcml2ZWQpO1xuXHRcdFx0dmFsdWUgPSB1cGRhdGVfcmVhY3Rpb24oZGVyaXZlZCk7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHNldF9hY3RpdmVfZWZmZWN0KHByZXZfYWN0aXZlX2VmZmVjdCk7XG5cdFx0XHRzZXRfZWFnZXJfZWZmZWN0cyhwcmV2X2VhZ2VyX2VmZmVjdHMpO1xuXHRcdFx0c3RhY2sucG9wKCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRyeSB7XG5cdFx0XHRkZXJpdmVkLmYgJj0gfldBU19NQVJLRUQ7XG5cdFx0XHRkZXN0cm95X2Rlcml2ZWRfZWZmZWN0cyhkZXJpdmVkKTtcblx0XHRcdHZhbHVlID0gdXBkYXRlX3JlYWN0aW9uKGRlcml2ZWQpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2X2FjdGl2ZV9lZmZlY3QpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX2Rlcml2ZWQoZGVyaXZlZCkge1xuXHR2YXIgdmFsdWUgPSBleGVjdXRlX2Rlcml2ZWQoZGVyaXZlZCk7XG5cblx0aWYgKCFkZXJpdmVkLmVxdWFscyh2YWx1ZSkpIHtcblx0XHRkZXJpdmVkLnd2ID0gaW5jcmVtZW50X3dyaXRlX3ZlcnNpb24oKTtcblxuXHRcdC8vIGluIGEgZm9yaywgd2UgZG9uJ3QgdXBkYXRlIHRoZSB1bmRlcmx5aW5nIHZhbHVlLCBqdXN0IGBiYXRjaF92YWx1ZXNgLlxuXHRcdC8vIHRoZSB1bmRlcmx5aW5nIHZhbHVlIHdpbGwgYmUgdXBkYXRlZCB3aGVuIHRoZSBmb3JrIGlzIGNvbW1pdHRlZC5cblx0XHQvLyBvdGhlcndpc2UsIHRoZSBuZXh0IHRpbWUgd2UgZ2V0IGhlcmUgYWZ0ZXIgYSAncmVhbCB3b3JsZCcgc3RhdGVcblx0XHQvLyBjaGFuZ2UsIGBkZXJpdmVkLmVxdWFsc2AgbWF5IGluY29ycmVjdGx5IHJldHVybiBgdHJ1ZWBcblx0XHRpZiAoIWN1cnJlbnRfYmF0Y2g/LmlzX2ZvcmsgfHwgZGVyaXZlZC5kZXBzID09PSBudWxsKSB7XG5cdFx0XHRkZXJpdmVkLnYgPSB2YWx1ZTtcblxuXHRcdFx0Ly8gZGVyaXZlZHMgd2l0aG91dCBkZXBlbmRlbmNpZXMgc2hvdWxkIG5ldmVyIGJlIHJlY29tcHV0ZWRcblx0XHRcdGlmIChkZXJpdmVkLmRlcHMgPT09IG51bGwpIHtcblx0XHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZGVyaXZlZCwgQ0xFQU4pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gZG9uJ3QgbWFyayBkZXJpdmVkIGNsZWFuIGlmIHdlJ3JlIHJlYWRpbmcgaXQgaW5zaWRlIGFcblx0Ly8gY2xlYW51cCBmdW5jdGlvbiwgb3IgaXQgd2lsbCBjYWNoZSBhIHN0YWxlIHZhbHVlXG5cdGlmIChpc19kZXN0cm95aW5nX2VmZmVjdCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIER1cmluZyB0aW1lIHRyYXZlbGluZyB3ZSBkb24ndCB3YW50IHRvIHJlc2V0IHRoZSBzdGF0dXMgc28gdGhhdFxuXHQvLyB0cmF2ZXJzYWwgb2YgdGhlIGdyYXBoIGluIHRoZSBvdGhlciBiYXRjaGVzIHN0aWxsIGhhcHBlbnNcblx0aWYgKGJhdGNoX3ZhbHVlcyAhPT0gbnVsbCkge1xuXHRcdC8vIG9ubHkgY2FjaGUgdGhlIHZhbHVlIGlmIHdlJ3JlIGluIGEgdHJhY2tpbmcgY29udGV4dCwgb3RoZXJ3aXNlIHdlIHdvbid0XG5cdFx0Ly8gY2xlYXIgdGhlIGNhY2hlIGluIGBtYXJrX3JlYWN0aW9uc2Agd2hlbiBkZXBlbmRlbmNpZXMgYXJlIHVwZGF0ZWRcblx0XHRpZiAoZWZmZWN0X3RyYWNraW5nKCkgfHwgY3VycmVudF9iYXRjaD8uaXNfZm9yaykge1xuXHRcdFx0YmF0Y2hfdmFsdWVzLnNldChkZXJpdmVkLCB2YWx1ZSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHVwZGF0ZV9kZXJpdmVkX3N0YXR1cyhkZXJpdmVkKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RGVyaXZlZH0gZGVyaXZlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJlZXplX2Rlcml2ZWRfZWZmZWN0cyhkZXJpdmVkKSB7XG5cdGlmIChkZXJpdmVkLmVmZmVjdHMgPT09IG51bGwpIHJldHVybjtcblxuXHRmb3IgKGNvbnN0IGUgb2YgZGVyaXZlZC5lZmZlY3RzKSB7XG5cdFx0Ly8gaWYgdGhlIGVmZmVjdCBoYXMgYSB0ZWFyZG93biBmdW5jdGlvbiBvciBhYm9ydCBzaWduYWwsIGNhbGwgaXRcblx0XHRpZiAoZS50ZWFyZG93biB8fCBlLmFjKSB7XG5cdFx0XHRlLnRlYXJkb3duPy4oKTtcblx0XHRcdGUuYWM/LmFib3J0KFNUQUxFX1JFQUNUSU9OKTtcblxuXHRcdFx0Ly8gbWFrZSBpdCBhIG5vb3Agc28gaXQgZG9lc24ndCBnZXQgY2FsbGVkIGFnYWluIGlmIHRoZSBkZXJpdmVkXG5cdFx0XHQvLyBpcyB1bmZyb3plbi4gd2UgZG9uJ3Qgc2V0IGl0IHRvIGBudWxsYCwgYmVjYXVzZSB0aGUgZXhpc3RlbmNlXG5cdFx0XHQvLyBvZiBhIHRlYXJkb3duIGZ1bmN0aW9uIGlzIHdoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZVxuXHRcdFx0Ly8gZWZmZWN0IHJ1bnMgYWdhaW4gZHVyaW5nIHVuZnJlZXppbmdcblx0XHRcdGUudGVhcmRvd24gPSBub29wO1xuXHRcdFx0ZS5hYyA9IG51bGw7XG5cblx0XHRcdHJlbW92ZV9yZWFjdGlvbnMoZSwgMCk7XG5cdFx0XHRkZXN0cm95X2VmZmVjdF9jaGlsZHJlbihlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuZnJlZXplX2Rlcml2ZWRfZWZmZWN0cyhkZXJpdmVkKSB7XG5cdGlmIChkZXJpdmVkLmVmZmVjdHMgPT09IG51bGwpIHJldHVybjtcblxuXHRmb3IgKGNvbnN0IGUgb2YgZGVyaXZlZC5lZmZlY3RzKSB7XG5cdFx0Ly8gaWYgdGhlIGVmZmVjdCB3YXMgcHJldmlvdXNseSBmcm96ZW4g4oCUIGluZGljYXRlZCBieSB0aGUgcHJlc2VuY2Vcblx0XHQvLyBvZiBhIHRlYXJkb3duIGZ1bmN0aW9uIOKAlCB1bmZyZWV6ZSBpdFxuXHRcdGlmIChlLnRlYXJkb3duKSB7XG5cdFx0XHR1cGRhdGVfZWZmZWN0KGUpO1xuXHRcdH1cblx0fVxufVxuIiwiLyoqIEBpbXBvcnQgeyBEZXJpdmVkLCBFZmZlY3QsIFNvdXJjZSwgVmFsdWUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQge1xuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdGFjdGl2ZV9lZmZlY3QsXG5cdHVudHJhY2tlZF93cml0ZXMsXG5cdGdldCxcblx0c2V0X3VudHJhY2tlZF93cml0ZXMsXG5cdHVudHJhY2ssXG5cdGluY3JlbWVudF93cml0ZV92ZXJzaW9uLFxuXHR1cGRhdGVfZWZmZWN0LFxuXHRjdXJyZW50X3NvdXJjZXMsXG5cdGlzX2RpcnR5LFxuXHR1bnRyYWNraW5nLFxuXHRpc19kZXN0cm95aW5nX2VmZmVjdCxcblx0cHVzaF9yZWFjdGlvbl92YWx1ZVxufSBmcm9tICcuLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IGVxdWFscywgc2FmZV9lcXVhbHMgfSBmcm9tICcuL2VxdWFsaXR5LmpzJztcbmltcG9ydCB7XG5cdENMRUFOLFxuXHRERVJJVkVELFxuXHRESVJUWSxcblx0QlJBTkNIX0VGRkVDVCxcblx0RUFHRVJfRUZGRUNULFxuXHRNQVlCRV9ESVJUWSxcblx0QkxPQ0tfRUZGRUNULFxuXHRST09UX0VGRkVDVCxcblx0QVNZTkMsXG5cdFdBU19NQVJLRUQsXG5cdENPTk5FQ1RFRFxufSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4uL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBsZWdhY3lfbW9kZV9mbGFnLCB0cmFjaW5nX21vZGVfZmxhZyB9IGZyb20gJy4uLy4uL2ZsYWdzL2luZGV4LmpzJztcbmltcG9ydCB7IGluY2x1ZGVzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IHRhZ19wcm94eSB9IGZyb20gJy4uL2Rldi90cmFjaW5nLmpzJztcbmltcG9ydCB7IGdldF9lcnJvciB9IGZyb20gJy4uLy4uL3NoYXJlZC9kZXYuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQsIGlzX3J1bmVzIH0gZnJvbSAnLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBCYXRjaCwgYmF0Y2hfdmFsdWVzLCBlYWdlcl9ibG9ja19lZmZlY3RzLCBzY2hlZHVsZV9lZmZlY3QgfSBmcm9tICcuL2JhdGNoLmpzJztcbmltcG9ydCB7IHByb3h5IH0gZnJvbSAnLi4vcHJveHkuanMnO1xuaW1wb3J0IHsgZXhlY3V0ZV9kZXJpdmVkIH0gZnJvbSAnLi9kZXJpdmVkcy5qcyc7XG5pbXBvcnQgeyBzZXRfc2lnbmFsX3N0YXR1cywgdXBkYXRlX2Rlcml2ZWRfc3RhdHVzIH0gZnJvbSAnLi9zdGF0dXMuanMnO1xuXG4vKiogQHR5cGUge1NldDxhbnk+fSAqL1xuZXhwb3J0IGxldCBlYWdlcl9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG4vKiogQHR5cGUge01hcDxTb3VyY2UsIGFueT59ICovXG5leHBvcnQgY29uc3Qgb2xkX3ZhbHVlcyA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBAcGFyYW0ge1NldDxhbnk+fSB2XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZWFnZXJfZWZmZWN0cyh2KSB7XG5cdGVhZ2VyX2VmZmVjdHMgPSB2O1xufVxuXG5sZXQgZWFnZXJfZWZmZWN0c19kZWZlcnJlZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2VhZ2VyX2VmZmVjdHNfZGVmZXJyZWQoKSB7XG5cdGVhZ2VyX2VmZmVjdHNfZGVmZXJyZWQgPSB0cnVlO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1Z9IHZcbiAqIEBwYXJhbSB7RXJyb3IgfCBudWxsfSBbc3RhY2tdXG4gKiBAcmV0dXJucyB7U291cmNlPFY+fVxuICovXG4vLyBUT0RPIHJlbmFtZSB0aGlzIHRvIGBzdGF0ZWAgdGhyb3VnaG91dCB0aGUgY29kZWJhc2VcbmV4cG9ydCBmdW5jdGlvbiBzb3VyY2Uodiwgc3RhY2spIHtcblx0LyoqIEB0eXBlIHtWYWx1ZX0gKi9cblx0dmFyIHNpZ25hbCA9IHtcblx0XHRmOiAwLCAvLyBUT0RPIGlkZWFsbHkgd2UgY291bGQgc2tpcCB0aGlzIGFsdG9nZXRoZXIsIGJ1dCBpdCBjYXVzZXMgdHlwZSBlcnJvcnNcblx0XHR2LFxuXHRcdHJlYWN0aW9uczogbnVsbCxcblx0XHRlcXVhbHMsXG5cdFx0cnY6IDAsXG5cdFx0d3Y6IDBcblx0fTtcblxuXHRpZiAoREVWICYmIHRyYWNpbmdfbW9kZV9mbGFnKSB7XG5cdFx0c2lnbmFsLmNyZWF0ZWQgPSBzdGFjayA/PyBnZXRfZXJyb3IoJ2NyZWF0ZWQgYXQnKTtcblx0XHRzaWduYWwudXBkYXRlZCA9IG51bGw7XG5cdFx0c2lnbmFsLnNldF9kdXJpbmdfZWZmZWN0ID0gZmFsc2U7XG5cdFx0c2lnbmFsLnRyYWNlID0gbnVsbDtcblx0fVxuXG5cdHJldHVybiBzaWduYWw7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7Vn0gdlxuICogQHBhcmFtIHtFcnJvciB8IG51bGx9IFtzdGFja11cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gc3RhdGUodiwgc3RhY2spIHtcblx0Y29uc3QgcyA9IHNvdXJjZSh2LCBzdGFjayk7XG5cblx0cHVzaF9yZWFjdGlvbl92YWx1ZShzKTtcblxuXHRyZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtWfSBpbml0aWFsX3ZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbW11dGFibGVdXG4gKiBAcmV0dXJucyB7U291cmNlPFY+fVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBtdXRhYmxlX3NvdXJjZShpbml0aWFsX3ZhbHVlLCBpbW11dGFibGUgPSBmYWxzZSwgdHJhY2thYmxlID0gdHJ1ZSkge1xuXHRjb25zdCBzID0gc291cmNlKGluaXRpYWxfdmFsdWUpO1xuXHRpZiAoIWltbXV0YWJsZSkge1xuXHRcdHMuZXF1YWxzID0gc2FmZV9lcXVhbHM7XG5cdH1cblxuXHQvLyBiaW5kIHRoZSBzaWduYWwgdG8gdGhlIGNvbXBvbmVudCBjb250ZXh0LCBpbiBjYXNlIHdlIG5lZWQgdG9cblx0Ly8gdHJhY2sgdXBkYXRlcyB0byB0cmlnZ2VyIGJlZm9yZVVwZGF0ZS9hZnRlclVwZGF0ZSBjYWxsYmFja3Ncblx0aWYgKGxlZ2FjeV9tb2RlX2ZsYWcgJiYgdHJhY2thYmxlICYmIGNvbXBvbmVudF9jb250ZXh0ICE9PSBudWxsICYmIGNvbXBvbmVudF9jb250ZXh0LmwgIT09IG51bGwpIHtcblx0XHQoY29tcG9uZW50X2NvbnRleHQubC5zID8/PSBbXSkucHVzaChzKTtcblx0fVxuXG5cdHJldHVybiBzO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1ZhbHVlPFY+fSBzb3VyY2VcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11dGF0ZShzb3VyY2UsIHZhbHVlKSB7XG5cdHNldChcblx0XHRzb3VyY2UsXG5cdFx0dW50cmFjaygoKSA9PiBnZXQoc291cmNlKSlcblx0KTtcblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1NvdXJjZTxWPn0gc291cmNlXG4gKiBAcGFyYW0ge1Z9IHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzaG91bGRfcHJveHldXG4gKiBAcmV0dXJucyB7Vn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldChzb3VyY2UsIHZhbHVlLCBzaG91bGRfcHJveHkgPSBmYWxzZSkge1xuXHRpZiAoXG5cdFx0YWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmXG5cdFx0Ly8gc2luY2Ugd2UgYXJlIHVudHJhY2tpbmcgdGhlIGZ1bmN0aW9uIGluc2lkZSBgJGluc3BlY3Qud2l0aGAgd2UgbmVlZCB0byBhZGQgdGhpcyBjaGVja1xuXHRcdC8vIHRvIGVuc3VyZSB3ZSBlcnJvciBpZiBzdGF0ZSBpcyBzZXQgaW5zaWRlIGFuIGluc3BlY3QgZWZmZWN0XG5cdFx0KCF1bnRyYWNraW5nIHx8IChhY3RpdmVfcmVhY3Rpb24uZiAmIEVBR0VSX0VGRkVDVCkgIT09IDApICYmXG5cdFx0aXNfcnVuZXMoKSAmJlxuXHRcdChhY3RpdmVfcmVhY3Rpb24uZiAmIChERVJJVkVEIHwgQkxPQ0tfRUZGRUNUIHwgQVNZTkMgfCBFQUdFUl9FRkZFQ1QpKSAhPT0gMCAmJlxuXHRcdChjdXJyZW50X3NvdXJjZXMgPT09IG51bGwgfHwgIWluY2x1ZGVzLmNhbGwoY3VycmVudF9zb3VyY2VzLCBzb3VyY2UpKVxuXHQpIHtcblx0XHRlLnN0YXRlX3Vuc2FmZV9tdXRhdGlvbigpO1xuXHR9XG5cblx0bGV0IG5ld192YWx1ZSA9IHNob3VsZF9wcm94eSA/IHByb3h5KHZhbHVlKSA6IHZhbHVlO1xuXG5cdGlmIChERVYpIHtcblx0XHR0YWdfcHJveHkobmV3X3ZhbHVlLCAvKiogQHR5cGUge3N0cmluZ30gKi8gKHNvdXJjZS5sYWJlbCkpO1xuXHR9XG5cblx0cmV0dXJuIGludGVybmFsX3NldChzb3VyY2UsIG5ld192YWx1ZSk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7U291cmNlPFY+fSBzb3VyY2VcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEByZXR1cm5zIHtWfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxfc2V0KHNvdXJjZSwgdmFsdWUpIHtcblx0aWYgKCFzb3VyY2UuZXF1YWxzKHZhbHVlKSkge1xuXHRcdHZhciBvbGRfdmFsdWUgPSBzb3VyY2UudjtcblxuXHRcdGlmIChpc19kZXN0cm95aW5nX2VmZmVjdCkge1xuXHRcdFx0b2xkX3ZhbHVlcy5zZXQoc291cmNlLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9sZF92YWx1ZXMuc2V0KHNvdXJjZSwgb2xkX3ZhbHVlKTtcblx0XHR9XG5cblx0XHRzb3VyY2UudiA9IHZhbHVlO1xuXG5cdFx0dmFyIGJhdGNoID0gQmF0Y2guZW5zdXJlKCk7XG5cdFx0YmF0Y2guY2FwdHVyZShzb3VyY2UsIG9sZF92YWx1ZSk7XG5cblx0XHRpZiAoREVWKSB7XG5cdFx0XHRpZiAodHJhY2luZ19tb2RlX2ZsYWcgfHwgYWN0aXZlX2VmZmVjdCAhPT0gbnVsbCkge1xuXHRcdFx0XHRzb3VyY2UudXBkYXRlZCA/Pz0gbmV3IE1hcCgpO1xuXG5cdFx0XHRcdC8vIEZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB3aGVuIG5vdCB1c2luZyAkaW5zcGVjdC50cmFjZSwgd2Ugb25seSBzdGFydCBjb2xsZWN0aW5nIHN0YWNrIHRyYWNlc1xuXHRcdFx0XHQvLyBhZnRlciB0aGUgc2FtZSBzb3VyY2UgaGFzIGJlZW4gdXBkYXRlZCBtb3JlIHRoYW4gNSB0aW1lcyBpbiB0aGUgc2FtZSBmbHVzaCBjeWNsZS5cblx0XHRcdFx0Y29uc3QgY291bnQgPSAoc291cmNlLnVwZGF0ZWQuZ2V0KCcnKT8uY291bnQgPz8gMCkgKyAxO1xuXHRcdFx0XHRzb3VyY2UudXBkYXRlZC5zZXQoJycsIHsgZXJyb3I6IC8qKiBAdHlwZSB7YW55fSAqLyAobnVsbCksIGNvdW50IH0pO1xuXG5cdFx0XHRcdGlmICh0cmFjaW5nX21vZGVfZmxhZyB8fCBjb3VudCA+IDUpIHtcblx0XHRcdFx0XHRjb25zdCBlcnJvciA9IGdldF9lcnJvcigndXBkYXRlZCBhdCcpO1xuXG5cdFx0XHRcdFx0aWYgKGVycm9yICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRsZXQgZW50cnkgPSBzb3VyY2UudXBkYXRlZC5nZXQoZXJyb3Iuc3RhY2spO1xuXG5cdFx0XHRcdFx0XHRpZiAoIWVudHJ5KSB7XG5cdFx0XHRcdFx0XHRcdGVudHJ5ID0geyBlcnJvciwgY291bnQ6IDAgfTtcblx0XHRcdFx0XHRcdFx0c291cmNlLnVwZGF0ZWQuc2V0KGVycm9yLnN0YWNrLCBlbnRyeSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGVudHJ5LmNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhY3RpdmVfZWZmZWN0ICE9PSBudWxsKSB7XG5cdFx0XHRcdHNvdXJjZS5zZXRfZHVyaW5nX2VmZmVjdCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKChzb3VyY2UuZiAmIERFUklWRUQpICE9PSAwKSB7XG5cdFx0XHRjb25zdCBkZXJpdmVkID0gLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoc291cmNlKTtcblxuXHRcdFx0Ly8gaWYgd2UgYXJlIGFzc2lnbmluZyB0byBhIGRpcnR5IGRlcml2ZWQgd2Ugc2V0IGl0IHRvIGNsZWFuL21heWJlIGRpcnR5IGJ1dCB3ZSBhbHNvIGVhZ2VybHkgZXhlY3V0ZSBpdCB0byB0cmFjayB0aGUgZGVwZW5kZW5jaWVzXG5cdFx0XHRpZiAoKHNvdXJjZS5mICYgRElSVFkpICE9PSAwKSB7XG5cdFx0XHRcdGV4ZWN1dGVfZGVyaXZlZChkZXJpdmVkKTtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlX2Rlcml2ZWRfc3RhdHVzKGRlcml2ZWQpO1xuXHRcdH1cblxuXHRcdHNvdXJjZS53diA9IGluY3JlbWVudF93cml0ZV92ZXJzaW9uKCk7XG5cblx0XHQvLyBGb3IgZGVidWdnaW5nLCBpbiBjYXNlIHlvdSB3YW50IHRvIGtub3cgd2hpY2ggcmVhY3Rpb25zIGFyZSBiZWluZyBzY2hlZHVsZWQ6XG5cdFx0Ly8gbG9nX3JlYWN0aW9ucyhzb3VyY2UpO1xuXHRcdG1hcmtfcmVhY3Rpb25zKHNvdXJjZSwgRElSVFkpO1xuXG5cdFx0Ly8gSXQncyBwb3NzaWJsZSB0aGF0IHRoZSBjdXJyZW50IHJlYWN0aW9uIG1pZ2h0IG5vdCBoYXZlIHVwLXRvLWRhdGUgZGVwZW5kZW5jaWVzXG5cdFx0Ly8gd2hpbHN0IGl0J3MgYWN0aXZlbHkgcnVubmluZy4gU28gaW4gdGhlIGNhc2Ugb2YgZW5zdXJpbmcgaXQgcmVnaXN0ZXJzIHRoZSByZWFjdGlvblxuXHRcdC8vIHByb3Blcmx5IGZvciBpdHNlbGYsIHdlIG5lZWQgdG8gZW5zdXJlIHRoZSBjdXJyZW50IGVmZmVjdCBhY3R1YWxseSBnZXRzXG5cdFx0Ly8gc2NoZWR1bGVkLiBpLmU6IGAkZWZmZWN0KCgpID0+IHgrKylgXG5cdFx0aWYgKFxuXHRcdFx0aXNfcnVuZXMoKSAmJlxuXHRcdFx0YWN0aXZlX2VmZmVjdCAhPT0gbnVsbCAmJlxuXHRcdFx0KGFjdGl2ZV9lZmZlY3QuZiAmIENMRUFOKSAhPT0gMCAmJlxuXHRcdFx0KGFjdGl2ZV9lZmZlY3QuZiAmIChCUkFOQ0hfRUZGRUNUIHwgUk9PVF9FRkZFQ1QpKSA9PT0gMFxuXHRcdCkge1xuXHRcdFx0aWYgKHVudHJhY2tlZF93cml0ZXMgPT09IG51bGwpIHtcblx0XHRcdFx0c2V0X3VudHJhY2tlZF93cml0ZXMoW3NvdXJjZV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dW50cmFja2VkX3dyaXRlcy5wdXNoKHNvdXJjZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFiYXRjaC5pc19mb3JrICYmIGVhZ2VyX2VmZmVjdHMuc2l6ZSA+IDAgJiYgIWVhZ2VyX2VmZmVjdHNfZGVmZXJyZWQpIHtcblx0XHRcdGZsdXNoX2VhZ2VyX2VmZmVjdHMoKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbHVzaF9lYWdlcl9lZmZlY3RzKCkge1xuXHRlYWdlcl9lZmZlY3RzX2RlZmVycmVkID0gZmFsc2U7XG5cblx0Zm9yIChjb25zdCBlZmZlY3Qgb2YgZWFnZXJfZWZmZWN0cykge1xuXHRcdC8vIE1hcmsgY2xlYW4gaW5zcGVjdC1lZmZlY3RzIGFzIG1heWJlIGRpcnR5IGFuZCB0aGVuIGNoZWNrIHRoZWlyIGRpcnRpbmVzc1xuXHRcdC8vIGluc3RlYWQgb2YganVzdCB1cGRhdGluZyB0aGUgZWZmZWN0cyAtIHRoaXMgd2F5IHdlIGF2b2lkIG92ZXJmaXJpbmcuXG5cdFx0aWYgKChlZmZlY3QuZiAmIENMRUFOKSAhPT0gMCkge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZWZmZWN0LCBNQVlCRV9ESVJUWSk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzX2RpcnR5KGVmZmVjdCkpIHtcblx0XHRcdHVwZGF0ZV9lZmZlY3QoZWZmZWN0KTtcblx0XHR9XG5cdH1cblxuXHRlYWdlcl9lZmZlY3RzLmNsZWFyKCk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtudW1iZXIgfCBiaWdpbnR9IFRcbiAqIEBwYXJhbSB7U291cmNlPFQ+fSBzb3VyY2VcbiAqIEBwYXJhbSB7MSB8IC0xfSBbZF1cbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHNvdXJjZSwgZCA9IDEpIHtcblx0dmFyIHZhbHVlID0gZ2V0KHNvdXJjZSk7XG5cdHZhciByZXN1bHQgPSBkID09PSAxID8gdmFsdWUrKyA6IHZhbHVlLS07XG5cblx0c2V0KHNvdXJjZSwgdmFsdWUpO1xuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge251bWJlciB8IGJpZ2ludH0gVFxuICogQHBhcmFtIHtTb3VyY2U8VD59IHNvdXJjZVxuICogQHBhcmFtIHsxIHwgLTF9IFtkXVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfcHJlKHNvdXJjZSwgZCA9IDEpIHtcblx0dmFyIHZhbHVlID0gZ2V0KHNvdXJjZSk7XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1hc3NpZ25tZW50IC0tIGArK2AvYC0tYCB1c2VkIGZvciByZXR1cm4gdmFsdWUsIG5vdCBzaWRlIGVmZmVjdCBvbiBgdmFsdWVgXG5cdHJldHVybiBzZXQoc291cmNlLCBkID09PSAxID8gKyt2YWx1ZSA6IC0tdmFsdWUpO1xufVxuXG4vKipcbiAqIFNpbGVudGx5ICh3aXRob3V0IHVzaW5nIGBnZXRgKSBpbmNyZW1lbnQgYSBzb3VyY2VcbiAqIEBwYXJhbSB7U291cmNlPG51bWJlcj59IHNvdXJjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5jcmVtZW50KHNvdXJjZSkge1xuXHRzZXQoc291cmNlLCBzb3VyY2UudiArIDEpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VmFsdWV9IHNpZ25hbFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1cyBzaG91bGQgYmUgRElSVFkgb3IgTUFZQkVfRElSVFlcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBtYXJrX3JlYWN0aW9ucyhzaWduYWwsIHN0YXR1cykge1xuXHR2YXIgcmVhY3Rpb25zID0gc2lnbmFsLnJlYWN0aW9ucztcblx0aWYgKHJlYWN0aW9ucyA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdHZhciBydW5lcyA9IGlzX3J1bmVzKCk7XG5cdHZhciBsZW5ndGggPSByZWFjdGlvbnMubGVuZ3RoO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcmVhY3Rpb24gPSByZWFjdGlvbnNbaV07XG5cdFx0dmFyIGZsYWdzID0gcmVhY3Rpb24uZjtcblxuXHRcdC8vIEluIGxlZ2FjeSBtb2RlLCBza2lwIHRoZSBjdXJyZW50IGVmZmVjdCB0byBwcmV2ZW50IGluZmluaXRlIGxvb3BzXG5cdFx0aWYgKCFydW5lcyAmJiByZWFjdGlvbiA9PT0gYWN0aXZlX2VmZmVjdCkgY29udGludWU7XG5cblx0XHQvLyBJbnNwZWN0IGVmZmVjdHMgbmVlZCB0byBydW4gaW1tZWRpYXRlbHksIHNvIHRoYXQgdGhlIHN0YWNrIHRyYWNlIG1ha2VzIHNlbnNlXG5cdFx0aWYgKERFViAmJiAoZmxhZ3MgJiBFQUdFUl9FRkZFQ1QpICE9PSAwKSB7XG5cdFx0XHRlYWdlcl9lZmZlY3RzLmFkZChyZWFjdGlvbik7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR2YXIgbm90X2RpcnR5ID0gKGZsYWdzICYgRElSVFkpID09PSAwO1xuXG5cdFx0Ly8gZG9uJ3Qgc2V0IGEgRElSVFkgcmVhY3Rpb24gdG8gTUFZQkVfRElSVFlcblx0XHRpZiAobm90X2RpcnR5KSB7XG5cdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhyZWFjdGlvbiwgc3RhdHVzKTtcblx0XHR9XG5cblx0XHRpZiAoKGZsYWdzICYgREVSSVZFRCkgIT09IDApIHtcblx0XHRcdHZhciBkZXJpdmVkID0gLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAocmVhY3Rpb24pO1xuXG5cdFx0XHRiYXRjaF92YWx1ZXM/LmRlbGV0ZShkZXJpdmVkKTtcblxuXHRcdFx0aWYgKChmbGFncyAmIFdBU19NQVJLRUQpID09PSAwKSB7XG5cdFx0XHRcdC8vIE9ubHkgY29ubmVjdGVkIGRlcml2ZWRzIGNhbiBiZSByZWxpYWJseSB1bm1hcmtlZCByaWdodCBhd2F5XG5cdFx0XHRcdGlmIChmbGFncyAmIENPTk5FQ1RFRCkge1xuXHRcdFx0XHRcdHJlYWN0aW9uLmYgfD0gV0FTX01BUktFRDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG1hcmtfcmVhY3Rpb25zKGRlcml2ZWQsIE1BWUJFX0RJUlRZKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKG5vdF9kaXJ0eSkge1xuXHRcdFx0aWYgKChmbGFncyAmIEJMT0NLX0VGRkVDVCkgIT09IDAgJiYgZWFnZXJfYmxvY2tfZWZmZWN0cyAhPT0gbnVsbCkge1xuXHRcdFx0XHRlYWdlcl9ibG9ja19lZmZlY3RzLmFkZCgvKiogQHR5cGUge0VmZmVjdH0gKi8gKHJlYWN0aW9uKSk7XG5cdFx0XHR9XG5cblx0XHRcdHNjaGVkdWxlX2VmZmVjdCgvKiogQHR5cGUge0VmZmVjdH0gKi8gKHJlYWN0aW9uKSk7XG5cdFx0fVxuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IFNvdXJjZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7XG5cdGdldCxcblx0YWN0aXZlX2VmZmVjdCxcblx0dXBkYXRlX3ZlcnNpb24sXG5cdGFjdGl2ZV9yZWFjdGlvbixcblx0c2V0X3VwZGF0ZV92ZXJzaW9uLFxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uXG59IGZyb20gJy4vcnVudGltZS5qcyc7XG5pbXBvcnQge1xuXHRhcnJheV9wcm90b3R5cGUsXG5cdGdldF9kZXNjcmlwdG9yLFxuXHRnZXRfcHJvdG90eXBlX29mLFxuXHRpc19hcnJheSxcblx0b2JqZWN0X3Byb3RvdHlwZVxufSBmcm9tICcuLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHtcblx0c3RhdGUgYXMgc291cmNlLFxuXHRzZXQsXG5cdGluY3JlbWVudCxcblx0Zmx1c2hfZWFnZXJfZWZmZWN0cyxcblx0c2V0X2VhZ2VyX2VmZmVjdHNfZGVmZXJyZWRcbn0gZnJvbSAnLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgUFJPWFlfUEFUSF9TWU1CT0wsIFNUQVRFX1NZTUJPTCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IFVOSU5JVElBTElaRUQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuL2Rldi90cmFjaW5nLmpzJztcbmltcG9ydCB7IGdldF9lcnJvciB9IGZyb20gJy4uL3NoYXJlZC9kZXYuanMnO1xuaW1wb3J0IHsgdHJhY2luZ19tb2RlX2ZsYWcgfSBmcm9tICcuLi9mbGFncy9pbmRleC5qcyc7XG5cbi8vIFRPRE8gbW92ZSBhbGwgcmVnZXhlcyBpbnRvIHNoYXJlZCBtb2R1bGU/XG5jb25zdCByZWdleF9pc192YWxpZF9pZGVudGlmaWVyID0gL15bYS16QS1aXyRdW2EtekEtWl8kMC05XSokLztcblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtUfSB2YWx1ZVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm94eSh2YWx1ZSkge1xuXHQvLyBpZiBub24tcHJveHlhYmxlLCBvciBpcyBhbHJlYWR5IGEgcHJveHksIHJldHVybiBgdmFsdWVgXG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IHZhbHVlID09PSBudWxsIHx8IFNUQVRFX1NZTUJPTCBpbiB2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0IHByb3RvdHlwZSA9IGdldF9wcm90b3R5cGVfb2YodmFsdWUpO1xuXG5cdGlmIChwcm90b3R5cGUgIT09IG9iamVjdF9wcm90b3R5cGUgJiYgcHJvdG90eXBlICE9PSBhcnJheV9wcm90b3R5cGUpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHQvKiogQHR5cGUge01hcDxhbnksIFNvdXJjZTxhbnk+Pn0gKi9cblx0dmFyIHNvdXJjZXMgPSBuZXcgTWFwKCk7XG5cdHZhciBpc19wcm94aWVkX2FycmF5ID0gaXNfYXJyYXkodmFsdWUpO1xuXHR2YXIgdmVyc2lvbiA9IHNvdXJjZSgwKTtcblxuXHR2YXIgc3RhY2sgPSBERVYgJiYgdHJhY2luZ19tb2RlX2ZsYWcgPyBnZXRfZXJyb3IoJ2NyZWF0ZWQgYXQnKSA6IG51bGw7XG5cdHZhciBwYXJlbnRfdmVyc2lvbiA9IHVwZGF0ZV92ZXJzaW9uO1xuXG5cdC8qKlxuXHQgKiBFeGVjdXRlcyB0aGUgcHJveHkgaW4gdGhlIGNvbnRleHQgb2YgdGhlIHJlYWN0aW9uIGl0IHdhcyBvcmlnaW5hbGx5IGNyZWF0ZWQgaW4sIGlmIGFueVxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcGFyYW0geygpID0+IFR9IGZuXG5cdCAqL1xuXHR2YXIgd2l0aF9wYXJlbnQgPSAoZm4pID0+IHtcblx0XHRpZiAodXBkYXRlX3ZlcnNpb24gPT09IHBhcmVudF92ZXJzaW9uKSB7XG5cdFx0XHRyZXR1cm4gZm4oKTtcblx0XHR9XG5cblx0XHQvLyBjaGlsZCBzb3VyY2UgaXMgYmVpbmcgY3JlYXRlZCBhZnRlciB0aGUgaW5pdGlhbCBwcm94eSDigJRcblx0XHQvLyBwcmV2ZW50IGl0IGZyb20gYmVpbmcgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IHJlYWN0aW9uXG5cdFx0dmFyIHJlYWN0aW9uID0gYWN0aXZlX3JlYWN0aW9uO1xuXHRcdHZhciB2ZXJzaW9uID0gdXBkYXRlX3ZlcnNpb247XG5cblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKG51bGwpO1xuXHRcdHNldF91cGRhdGVfdmVyc2lvbihwYXJlbnRfdmVyc2lvbik7XG5cblx0XHR2YXIgcmVzdWx0ID0gZm4oKTtcblxuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24ocmVhY3Rpb24pO1xuXHRcdHNldF91cGRhdGVfdmVyc2lvbih2ZXJzaW9uKTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0aWYgKGlzX3Byb3hpZWRfYXJyYXkpIHtcblx0XHQvLyBXZSBuZWVkIHRvIGNyZWF0ZSB0aGUgbGVuZ3RoIHNvdXJjZSBlYWdlcmx5IHRvIGVuc3VyZSB0aGF0XG5cdFx0Ly8gbXV0YXRpb25zIHRvIHRoZSBhcnJheSBhcmUgcHJvcGVybHkgc3luY2VkIHdpdGggb3VyIHByb3h5XG5cdFx0c291cmNlcy5zZXQoJ2xlbmd0aCcsIHNvdXJjZSgvKiogQHR5cGUge2FueVtdfSAqLyAodmFsdWUpLmxlbmd0aCwgc3RhY2spKTtcblx0XHRpZiAoREVWKSB7XG5cdFx0XHR2YWx1ZSA9IC8qKiBAdHlwZSB7YW55fSAqLyAoaW5zcGVjdGFibGVfYXJyYXkoLyoqIEB0eXBlIHthbnlbXX0gKi8gKHZhbHVlKSkpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiBVc2VkIGluIGRldiBmb3IgJGluc3BlY3QudHJhY2UoKSAqL1xuXHR2YXIgcGF0aCA9ICcnO1xuXHRsZXQgdXBkYXRpbmcgPSBmYWxzZTtcblx0LyoqIEBwYXJhbSB7c3RyaW5nfSBuZXdfcGF0aCAqL1xuXHRmdW5jdGlvbiB1cGRhdGVfcGF0aChuZXdfcGF0aCkge1xuXHRcdGlmICh1cGRhdGluZykgcmV0dXJuO1xuXHRcdHVwZGF0aW5nID0gdHJ1ZTtcblx0XHRwYXRoID0gbmV3X3BhdGg7XG5cblx0XHR0YWcodmVyc2lvbiwgYCR7cGF0aH0gdmVyc2lvbmApO1xuXG5cdFx0Ly8gcmVuYW1lIGFsbCBjaGlsZCBzb3VyY2VzIGFuZCBjaGlsZCBwcm94aWVzXG5cdFx0Zm9yIChjb25zdCBbcHJvcCwgc291cmNlXSBvZiBzb3VyY2VzKSB7XG5cdFx0XHR0YWcoc291cmNlLCBnZXRfbGFiZWwocGF0aCwgcHJvcCkpO1xuXHRcdH1cblx0XHR1cGRhdGluZyA9IGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIG5ldyBQcm94eSgvKiogQHR5cGUge2FueX0gKi8gKHZhbHVlKSwge1xuXHRcdGRlZmluZVByb3BlcnR5KF8sIHByb3AsIGRlc2NyaXB0b3IpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0ISgndmFsdWUnIGluIGRlc2NyaXB0b3IpIHx8XG5cdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID09PSBmYWxzZSB8fFxuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPT09IGZhbHNlIHx8XG5cdFx0XHRcdGRlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZhbHNlXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gd2UgZGlzYWxsb3cgbm9uLWJhc2ljIGRlc2NyaXB0b3JzLCBiZWNhdXNlIHVubGVzcyB0aGV5IGFyZSBhcHBsaWVkIHRvIHRoZVxuXHRcdFx0XHQvLyB0YXJnZXQgb2JqZWN0IOKAlCB3aGljaCB3ZSBhdm9pZCwgc28gdGhhdCBzdGF0ZSBjYW4gYmUgZm9ya2VkIOKAlCB3ZSB3aWxsIHJ1blxuXHRcdFx0XHQvLyBhZm91bCBvZiB0aGUgdmFyaW91cyBpbnZhcmlhbnRzXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L1Byb3h5L2dldE93blByb3BlcnR5RGVzY3JpcHRvciNpbnZhcmlhbnRzXG5cdFx0XHRcdGUuc3RhdGVfZGVzY3JpcHRvcnNfZml4ZWQoKTtcblx0XHRcdH1cblx0XHRcdHZhciBzID0gc291cmNlcy5nZXQocHJvcCk7XG5cdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHdpdGhfcGFyZW50KCgpID0+IHtcblx0XHRcdFx0XHR2YXIgcyA9IHNvdXJjZShkZXNjcmlwdG9yLnZhbHVlLCBzdGFjayk7XG5cdFx0XHRcdFx0c291cmNlcy5zZXQocHJvcCwgcyk7XG5cdFx0XHRcdFx0aWYgKERFViAmJiB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRhZyhzLCBnZXRfbGFiZWwocGF0aCwgcHJvcCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXQocywgZGVzY3JpcHRvci52YWx1ZSwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3ApIHtcblx0XHRcdHZhciBzID0gc291cmNlcy5nZXQocHJvcCk7XG5cblx0XHRcdGlmIChzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHByb3AgaW4gdGFyZ2V0KSB7XG5cdFx0XHRcdFx0Y29uc3QgcyA9IHdpdGhfcGFyZW50KCgpID0+IHNvdXJjZShVTklOSVRJQUxJWkVELCBzdGFjaykpO1xuXHRcdFx0XHRcdHNvdXJjZXMuc2V0KHByb3AsIHMpO1xuXHRcdFx0XHRcdGluY3JlbWVudCh2ZXJzaW9uKTtcblxuXHRcdFx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0XHRcdHRhZyhzLCBnZXRfbGFiZWwocGF0aCwgcHJvcCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0KHMsIFVOSU5JVElBTElaRUQpO1xuXHRcdFx0XHRpbmNyZW1lbnQodmVyc2lvbik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuXHRcdFx0aWYgKHByb3AgPT09IFNUQVRFX1NZTUJPTCkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChERVYgJiYgcHJvcCA9PT0gUFJPWFlfUEFUSF9TWU1CT0wpIHtcblx0XHRcdFx0cmV0dXJuIHVwZGF0ZV9wYXRoO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KHByb3ApO1xuXHRcdFx0dmFyIGV4aXN0cyA9IHByb3AgaW4gdGFyZ2V0O1xuXG5cdFx0XHQvLyBjcmVhdGUgYSBzb3VyY2UsIGJ1dCBvbmx5IGlmIGl0J3MgYW4gb3duIHByb3BlcnR5IGFuZCBub3QgYSBwcm90b3R5cGUgcHJvcGVydHlcblx0XHRcdGlmIChzID09PSB1bmRlZmluZWQgJiYgKCFleGlzdHMgfHwgZ2V0X2Rlc2NyaXB0b3IodGFyZ2V0LCBwcm9wKT8ud3JpdGFibGUpKSB7XG5cdFx0XHRcdHMgPSB3aXRoX3BhcmVudCgoKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHAgPSBwcm94eShleGlzdHMgPyB0YXJnZXRbcHJvcF0gOiBVTklOSVRJQUxJWkVEKTtcblx0XHRcdFx0XHR2YXIgcyA9IHNvdXJjZShwLCBzdGFjayk7XG5cblx0XHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0XHR0YWcocywgZ2V0X2xhYmVsKHBhdGgsIHByb3ApKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0c291cmNlcy5zZXQocHJvcCwgcyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dmFyIHYgPSBnZXQocyk7XG5cdFx0XHRcdHJldHVybiB2ID09PSBVTklOSVRJQUxJWkVEID8gdW5kZWZpbmVkIDogdjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpO1xuXHRcdH0sXG5cblx0XHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wKSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcCk7XG5cblx0XHRcdGlmIChkZXNjcmlwdG9yICYmICd2YWx1ZScgaW4gZGVzY3JpcHRvcikge1xuXHRcdFx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KHByb3ApO1xuXHRcdFx0XHRpZiAocykgZGVzY3JpcHRvci52YWx1ZSA9IGdldChzKTtcblx0XHRcdH0gZWxzZSBpZiAoZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHZhciBzb3VyY2UgPSBzb3VyY2VzLmdldChwcm9wKTtcblx0XHRcdFx0dmFyIHZhbHVlID0gc291cmNlPy52O1xuXG5cdFx0XHRcdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gVU5JTklUSUFMSVpFRCkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlc2NyaXB0b3I7XG5cdFx0fSxcblxuXHRcdGhhcyh0YXJnZXQsIHByb3ApIHtcblx0XHRcdGlmIChwcm9wID09PSBTVEFURV9TWU1CT0wpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzID0gc291cmNlcy5nZXQocHJvcCk7XG5cdFx0XHR2YXIgaGFzID0gKHMgIT09IHVuZGVmaW5lZCAmJiBzLnYgIT09IFVOSU5JVElBTElaRUQpIHx8IFJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcCk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0cyAhPT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdChhY3RpdmVfZWZmZWN0ICE9PSBudWxsICYmICghaGFzIHx8IGdldF9kZXNjcmlwdG9yKHRhcmdldCwgcHJvcCk/LndyaXRhYmxlKSlcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0cyA9IHdpdGhfcGFyZW50KCgpID0+IHtcblx0XHRcdFx0XHRcdHZhciBwID0gaGFzID8gcHJveHkodGFyZ2V0W3Byb3BdKSA6IFVOSU5JVElBTElaRUQ7XG5cdFx0XHRcdFx0XHR2YXIgcyA9IHNvdXJjZShwLCBzdGFjayk7XG5cblx0XHRcdFx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0XHRcdFx0dGFnKHMsIGdldF9sYWJlbChwYXRoLCBwcm9wKSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c291cmNlcy5zZXQocHJvcCwgcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdmFsdWUgPSBnZXQocyk7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gVU5JTklUSUFMSVpFRCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaGFzO1xuXHRcdH0sXG5cblx0XHRzZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcblx0XHRcdHZhciBzID0gc291cmNlcy5nZXQocHJvcCk7XG5cdFx0XHR2YXIgaGFzID0gcHJvcCBpbiB0YXJnZXQ7XG5cblx0XHRcdC8vIHZhcmlhYmxlLmxlbmd0aCA9IHZhbHVlIC0+IGNsZWFyIGFsbCBzaWduYWxzIHdpdGggaW5kZXggPj0gdmFsdWVcblx0XHRcdGlmIChpc19wcm94aWVkX2FycmF5ICYmIHByb3AgPT09ICdsZW5ndGgnKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSB2YWx1ZTsgaSA8IC8qKiBAdHlwZSB7U291cmNlPG51bWJlcj59ICovIChzKS52OyBpICs9IDEpIHtcblx0XHRcdFx0XHR2YXIgb3RoZXJfcyA9IHNvdXJjZXMuZ2V0KGkgKyAnJyk7XG5cdFx0XHRcdFx0aWYgKG90aGVyX3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0c2V0KG90aGVyX3MsIFVOSU5JVElBTElaRUQpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaSBpbiB0YXJnZXQpIHtcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBpdGVtIGV4aXN0cyBpbiB0aGUgb3JpZ2luYWwsIHdlIG5lZWQgdG8gY3JlYXRlIGFuIHVuaW5pdGlhbGl6ZWQgc291cmNlLFxuXHRcdFx0XHRcdFx0Ly8gZWxzZSBhIGxhdGVyIHJlYWQgb2YgdGhlIHByb3BlcnR5IHdvdWxkIHJlc3VsdCBpbiBhIHNvdXJjZSBiZWluZyBjcmVhdGVkIHdpdGhcblx0XHRcdFx0XHRcdC8vIHRoZSB2YWx1ZSBvZiB0aGUgb3JpZ2luYWwgaXRlbSBhdCB0aGF0IGluZGV4LlxuXHRcdFx0XHRcdFx0b3RoZXJfcyA9IHdpdGhfcGFyZW50KCgpID0+IHNvdXJjZShVTklOSVRJQUxJWkVELCBzdGFjaykpO1xuXHRcdFx0XHRcdFx0c291cmNlcy5zZXQoaSArICcnLCBvdGhlcl9zKTtcblxuXHRcdFx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdFx0XHR0YWcob3RoZXJfcywgZ2V0X2xhYmVsKHBhdGgsIGkpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgd2UgaGF2ZW4ndCB5ZXQgY3JlYXRlZCBhIHNvdXJjZSBmb3IgdGhpcyBwcm9wZXJ0eSwgd2UgbmVlZCB0byBlbnN1cmVcblx0XHRcdC8vIHdlIGRvIHNvIG90aGVyd2lzZSBpZiB3ZSByZWFkIGl0IGxhdGVyLCB0aGVuIHRoZSB3cml0ZSB3b24ndCBiZSB0cmFja2VkIGFuZFxuXHRcdFx0Ly8gdGhlIGhldXJpc3RpY3Mgb2YgZWZmZWN0cyB3aWxsIGJlIGRpZmZlcmVudCB2cyBpZiB3ZSBoYWQgcmVhZCB0aGUgcHJveGllZFxuXHRcdFx0Ly8gb2JqZWN0IHByb3BlcnR5IGJlZm9yZSB3cml0aW5nIHRvIHRoYXQgcHJvcGVydHkuXG5cdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmICghaGFzIHx8IGdldF9kZXNjcmlwdG9yKHRhcmdldCwgcHJvcCk/LndyaXRhYmxlKSB7XG5cdFx0XHRcdFx0cyA9IHdpdGhfcGFyZW50KCgpID0+IHNvdXJjZSh1bmRlZmluZWQsIHN0YWNrKSk7XG5cblx0XHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0XHR0YWcocywgZ2V0X2xhYmVsKHBhdGgsIHByb3ApKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2V0KHMsIHByb3h5KHZhbHVlKSk7XG5cblx0XHRcdFx0XHRzb3VyY2VzLnNldChwcm9wLCBzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFzID0gcy52ICE9PSBVTklOSVRJQUxJWkVEO1xuXG5cdFx0XHRcdHZhciBwID0gd2l0aF9wYXJlbnQoKCkgPT4gcHJveHkodmFsdWUpKTtcblx0XHRcdFx0c2V0KHMsIHApO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcCk7XG5cblx0XHRcdC8vIFNldCB0aGUgbmV3IHZhbHVlIGJlZm9yZSB1cGRhdGluZyBhbnkgc2lnbmFscyBzbyB0aGF0IGFueSBsaXN0ZW5lcnMgZ2V0IHRoZSBuZXcgdmFsdWVcblx0XHRcdGlmIChkZXNjcmlwdG9yPy5zZXQpIHtcblx0XHRcdFx0ZGVzY3JpcHRvci5zZXQuY2FsbChyZWNlaXZlciwgdmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWhhcykge1xuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIG11dGF0ZWQgYW4gYXJyYXkgZGlyZWN0bHksIHdlIG1pZ2h0IG5lZWQgdG9cblx0XHRcdFx0Ly8gc2lnbmFsIHRoYXQgbGVuZ3RoIGhhcyBhbHNvIGNoYW5nZWQuIERvIGl0IGJlZm9yZSB1cGRhdGluZyBtZXRhZGF0YVxuXHRcdFx0XHQvLyB0byBlbnN1cmUgdGhhdCBpdGVyYXRpbmcgb3ZlciB0aGUgYXJyYXkgYXMgYSByZXN1bHQgb2YgYSBtZXRhZGF0YSB1cGRhdGVcblx0XHRcdFx0Ly8gd2lsbCBub3QgY2F1c2UgdGhlIGxlbmd0aCB0byBiZSBvdXQgb2Ygc3luYy5cblx0XHRcdFx0aWYgKGlzX3Byb3hpZWRfYXJyYXkgJiYgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0dmFyIGxzID0gLyoqIEB0eXBlIHtTb3VyY2U8bnVtYmVyPn0gKi8gKHNvdXJjZXMuZ2V0KCdsZW5ndGgnKSk7XG5cdFx0XHRcdFx0dmFyIG4gPSBOdW1iZXIocHJvcCk7XG5cblx0XHRcdFx0XHRpZiAoTnVtYmVyLmlzSW50ZWdlcihuKSAmJiBuID49IGxzLnYpIHtcblx0XHRcdFx0XHRcdHNldChscywgbiArIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGluY3JlbWVudCh2ZXJzaW9uKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdG93bktleXModGFyZ2V0KSB7XG5cdFx0XHRnZXQodmVyc2lvbik7XG5cblx0XHRcdHZhciBvd25fa2V5cyA9IFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpLmZpbHRlcigoa2V5KSA9PiB7XG5cdFx0XHRcdHZhciBzb3VyY2UgPSBzb3VyY2VzLmdldChrZXkpO1xuXHRcdFx0XHRyZXR1cm4gc291cmNlID09PSB1bmRlZmluZWQgfHwgc291cmNlLnYgIT09IFVOSU5JVElBTElaRUQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0Zm9yICh2YXIgW2tleSwgc291cmNlXSBvZiBzb3VyY2VzKSB7XG5cdFx0XHRcdGlmIChzb3VyY2UudiAhPT0gVU5JTklUSUFMSVpFRCAmJiAhKGtleSBpbiB0YXJnZXQpKSB7XG5cdFx0XHRcdFx0b3duX2tleXMucHVzaChrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvd25fa2V5cztcblx0XHR9LFxuXG5cdFx0c2V0UHJvdG90eXBlT2YoKSB7XG5cdFx0XHRlLnN0YXRlX3Byb3RvdHlwZV9maXhlZCgpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nIHwgc3ltYm9sfSBwcm9wXG4gKi9cbmZ1bmN0aW9uIGdldF9sYWJlbChwYXRoLCBwcm9wKSB7XG5cdGlmICh0eXBlb2YgcHJvcCA9PT0gJ3N5bWJvbCcpIHJldHVybiBgJHtwYXRofVtTeW1ib2woJHtwcm9wLmRlc2NyaXB0aW9uID8/ICcnfSldYDtcblx0aWYgKHJlZ2V4X2lzX3ZhbGlkX2lkZW50aWZpZXIudGVzdChwcm9wKSkgcmV0dXJuIGAke3BhdGh9LiR7cHJvcH1gO1xuXHRyZXR1cm4gL15cXGQrJC8udGVzdChwcm9wKSA/IGAke3BhdGh9WyR7cHJvcH1dYCA6IGAke3BhdGh9Wycke3Byb3B9J11gO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3Byb3hpZWRfdmFsdWUodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBTVEFURV9TWU1CT0wgaW4gdmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZVtTVEFURV9TWU1CT0xdO1xuXHRcdH1cblx0fSBjYXRjaCB7XG5cdFx0Ly8gdGhlIGFib3ZlIGlmIGNoZWNrIGNhbiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdmFsdWUgaW4gcXVlc3Rpb25cblx0XHQvLyBpcyB0aGUgY29udGVudFdpbmRvdyBvZiBhbiBpZnJhbWUgb24gYW5vdGhlciBkb21haW4sIGluIHdoaWNoXG5cdFx0Ly8gY2FzZSB3ZSB3YW50IHRvIGp1c3QgcmV0dXJuIHRoZSB2YWx1ZSAoYmVjYXVzZSBpdCdzIGRlZmluaXRlbHlcblx0XHQvLyBub3QgYSBwcm94aWVkIHZhbHVlKSBzbyB3ZSBkb24ndCBicmVhayBhbnkgSmF2YVNjcmlwdCBpbnRlcmFjdGluZ1xuXHRcdC8vIHdpdGggdGhhdCBpZnJhbWUgKHN1Y2ggYXMgdmFyaW91cyBwYXltZW50IGNvbXBhbmllcyBjbGllbnQgc2lkZVxuXHRcdC8vIEphdmFTY3JpcHQgbGlicmFyaWVzIGludGVyYWN0aW5nIHdpdGggdGhlaXIgaWZyYW1lcyBvbiB0aGUgc2FtZVxuXHRcdC8vIGRvbWFpbilcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gYVxuICogQHBhcmFtIHthbnl9IGJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzKGEsIGIpIHtcblx0cmV0dXJuIE9iamVjdC5pcyhnZXRfcHJveGllZF92YWx1ZShhKSwgZ2V0X3Byb3hpZWRfdmFsdWUoYikpO1xufVxuXG5jb25zdCBBUlJBWV9NVVRBVElOR19NRVRIT0RTID0gbmV3IFNldChbXG5cdCdjb3B5V2l0aGluJyxcblx0J2ZpbGwnLFxuXHQncG9wJyxcblx0J3B1c2gnLFxuXHQncmV2ZXJzZScsXG5cdCdzaGlmdCcsXG5cdCdzb3J0Jyxcblx0J3NwbGljZScsXG5cdCd1bnNoaWZ0J1xuXSk7XG5cbi8qKlxuICogV3JhcCBhcnJheSBtdXRhdGluZyBtZXRob2RzIHNvICRpbnNwZWN0IGlzIHRyaWdnZXJlZCBvbmx5IG9uY2UgYW5kXG4gKiB0byBwcmV2ZW50IGxvZ2dpbmcgYW4gYXJyYXkgaW4gaW50ZXJtZWRpYXRlIHN0YXRlIChlLmcuIHdpdGggYW4gZW1wdHkgc2xvdClcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKi9cbmZ1bmN0aW9uIGluc3BlY3RhYmxlX2FycmF5KGFycmF5KSB7XG5cdHJldHVybiBuZXcgUHJveHkoYXJyYXksIHtcblx0XHRnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuXHRcdFx0dmFyIHZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcik7XG5cdFx0XHRpZiAoIUFSUkFZX01VVEFUSU5HX01FVEhPRFMuaGFzKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocHJvcCkpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdGhpcyB7YW55W119XG5cdFx0XHQgKiBAcGFyYW0ge2FueVtdfSBhcmdzXG5cdFx0XHQgKi9cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRzZXRfZWFnZXJfZWZmZWN0c19kZWZlcnJlZCgpO1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdmFsdWUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGZsdXNoX2VhZ2VyX2VmZmVjdHMoKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0LCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgaHlkcmF0ZV9ub2RlLCBoeWRyYXRpbmcsIHNldF9oeWRyYXRlX25vZGUgfSBmcm9tICcuL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IGluaXRfYXJyYXlfcHJvdG90eXBlX3dhcm5pbmdzIH0gZnJvbSAnLi4vZGV2L2VxdWFsaXR5LmpzJztcbmltcG9ydCB7IGdldF9kZXNjcmlwdG9yLCBpc19leHRlbnNpYmxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9lZmZlY3QgfSBmcm9tICcuLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IGFzeW5jX21vZGVfZmxhZyB9IGZyb20gJy4uLy4uL2ZsYWdzL2luZGV4LmpzJztcbmltcG9ydCB7IFRFWFRfTk9ERSwgUkVBQ1RJT05fUkFOIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgZWFnZXJfYmxvY2tfZWZmZWN0cyB9IGZyb20gJy4uL3JlYWN0aXZpdHkvYmF0Y2guanMnO1xuaW1wb3J0IHsgTkFNRVNQQUNFX0hUTUwgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMuanMnO1xuXG4vLyBleHBvcnQgdGhlc2UgZm9yIHJlZmVyZW5jZSBpbiB0aGUgY29tcGlsZWQgY29kZSwgbWFraW5nIGdsb2JhbCBuYW1lIGRlZHVwbGljYXRpb24gdW5uZWNlc3Nhcnlcbi8qKiBAdHlwZSB7V2luZG93fSAqL1xuZXhwb3J0IHZhciAkd2luZG93O1xuXG4vKiogQHR5cGUge0RvY3VtZW50fSAqL1xuZXhwb3J0IHZhciAkZG9jdW1lbnQ7XG5cbi8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbmV4cG9ydCB2YXIgaXNfZmlyZWZveDtcblxuLyoqIEB0eXBlIHsoKSA9PiBOb2RlIHwgbnVsbH0gKi9cbnZhciBmaXJzdF9jaGlsZF9nZXR0ZXI7XG4vKiogQHR5cGUgeygpID0+IE5vZGUgfCBudWxsfSAqL1xudmFyIG5leHRfc2libGluZ19nZXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGVzZSBsYXppbHkgdG8gYXZvaWQgaXNzdWVzIHdoZW4gdXNpbmcgdGhlIHJ1bnRpbWUgaW4gYSBzZXJ2ZXIgY29udGV4dFxuICogd2hlcmUgdGhlc2UgZ2xvYmFscyBhcmUgbm90IGF2YWlsYWJsZSB3aGlsZSBhdm9pZGluZyBhIHNlcGFyYXRlIHNlcnZlciBlbnRyeSBwb2ludFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9vcGVyYXRpb25zKCkge1xuXHRpZiAoJHdpbmRvdyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHdpbmRvdyA9IHdpbmRvdztcblx0JGRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cdGlzX2ZpcmVmb3ggPSAvRmlyZWZveC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXHR2YXIgZWxlbWVudF9wcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIG5vZGVfcHJvdG90eXBlID0gTm9kZS5wcm90b3R5cGU7XG5cdHZhciB0ZXh0X3Byb3RvdHlwZSA9IFRleHQucHJvdG90eXBlO1xuXG5cdC8vIEB0cy1pZ25vcmVcblx0Zmlyc3RfY2hpbGRfZ2V0dGVyID0gZ2V0X2Rlc2NyaXB0b3Iobm9kZV9wcm90b3R5cGUsICdmaXJzdENoaWxkJykuZ2V0O1xuXHQvLyBAdHMtaWdub3JlXG5cdG5leHRfc2libGluZ19nZXR0ZXIgPSBnZXRfZGVzY3JpcHRvcihub2RlX3Byb3RvdHlwZSwgJ25leHRTaWJsaW5nJykuZ2V0O1xuXG5cdGlmIChpc19leHRlbnNpYmxlKGVsZW1lbnRfcHJvdG90eXBlKSkge1xuXHRcdC8vIHRoZSBmb2xsb3dpbmcgYXNzaWdubWVudHMgaW1wcm92ZSBwZXJmIG9mIGxvb2t1cHMgb24gRE9NIG5vZGVzXG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGVsZW1lbnRfcHJvdG90eXBlLl9fY2xpY2sgPSB1bmRlZmluZWQ7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGVsZW1lbnRfcHJvdG90eXBlLl9fY2xhc3NOYW1lID0gdW5kZWZpbmVkO1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50X3Byb3RvdHlwZS5fX2F0dHJpYnV0ZXMgPSBudWxsO1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50X3Byb3RvdHlwZS5fX3N0eWxlID0gdW5kZWZpbmVkO1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50X3Byb3RvdHlwZS5fX2UgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRpZiAoaXNfZXh0ZW5zaWJsZSh0ZXh0X3Byb3RvdHlwZSkpIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0dGV4dF9wcm90b3R5cGUuX190ID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKERFVikge1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50X3Byb3RvdHlwZS5fX3N2ZWx0ZV9tZXRhID0gbnVsbDtcblxuXHRcdGluaXRfYXJyYXlfcHJvdG90eXBlX3dhcm5pbmdzKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtUZXh0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX3RleHQodmFsdWUgPSAnJykge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gTlxuICogQHBhcmFtIHtOfSBub2RlXG4gKi9cbi8qQF9fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9maXJzdF9jaGlsZChub2RlKSB7XG5cdHJldHVybiAvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IG51bGx9ICovIChmaXJzdF9jaGlsZF9nZXR0ZXIuY2FsbChub2RlKSk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtOb2RlfSBOXG4gKiBAcGFyYW0ge059IG5vZGVcbiAqL1xuLypAX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X25leHRfc2libGluZyhub2RlKSB7XG5cdHJldHVybiAvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IG51bGx9ICovIChuZXh0X3NpYmxpbmdfZ2V0dGVyLmNhbGwobm9kZSkpO1xufVxuXG4vKipcbiAqIERvbid0IG1hcmsgdGhpcyBhcyBzaWRlLWVmZmVjdC1mcmVlLCBoeWRyYXRpb24gbmVlZHMgdG8gd2FsayBhbGwgbm9kZXNcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gTlxuICogQHBhcmFtIHtOfSBub2RlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzX3RleHRcbiAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGUgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hpbGQobm9kZSwgaXNfdGV4dCkge1xuXHRpZiAoIWh5ZHJhdGluZykge1xuXHRcdHJldHVybiBnZXRfZmlyc3RfY2hpbGQobm9kZSk7XG5cdH1cblxuXHR2YXIgY2hpbGQgPSBnZXRfZmlyc3RfY2hpbGQoaHlkcmF0ZV9ub2RlKTtcblxuXHQvLyBDaGlsZCBjYW4gYmUgbnVsbCBpZiB3ZSBoYXZlIGFuIGVsZW1lbnQgd2l0aCBhIHNpbmdsZSBjaGlsZCwgbGlrZSBgPHA+e3RleHR9PC9wPmAsIHdoZXJlIGB0ZXh0YCBpcyBlbXB0eVxuXHRpZiAoY2hpbGQgPT09IG51bGwpIHtcblx0XHRjaGlsZCA9IGh5ZHJhdGVfbm9kZS5hcHBlbmRDaGlsZChjcmVhdGVfdGV4dCgpKTtcblx0fSBlbHNlIGlmIChpc190ZXh0ICYmIGNoaWxkLm5vZGVUeXBlICE9PSBURVhUX05PREUpIHtcblx0XHR2YXIgdGV4dCA9IGNyZWF0ZV90ZXh0KCk7XG5cdFx0Y2hpbGQ/LmJlZm9yZSh0ZXh0KTtcblx0XHRzZXRfaHlkcmF0ZV9ub2RlKHRleHQpO1xuXHRcdHJldHVybiB0ZXh0O1xuXHR9XG5cblx0aWYgKGlzX3RleHQpIHtcblx0XHRtZXJnZV90ZXh0X25vZGVzKC8qKiBAdHlwZSB7VGV4dH0gKi8gKGNoaWxkKSk7XG5cdH1cblxuXHRzZXRfaHlkcmF0ZV9ub2RlKGNoaWxkKTtcblx0cmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAqIERvbid0IG1hcmsgdGhpcyBhcyBzaWRlLWVmZmVjdC1mcmVlLCBoeWRyYXRpb24gbmVlZHMgdG8gd2FsayBhbGwgbm9kZXNcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc190ZXh0XVxuICogQHJldHVybnMge1RlbXBsYXRlTm9kZSB8IG51bGx9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdF9jaGlsZChub2RlLCBpc190ZXh0ID0gZmFsc2UpIHtcblx0aWYgKCFoeWRyYXRpbmcpIHtcblx0XHR2YXIgZmlyc3QgPSBnZXRfZmlyc3RfY2hpbGQobm9kZSk7XG5cblx0XHQvLyBUT0RPIHByZXZlbnQgdXNlciBjb21tZW50cyB3aXRoIHRoZSBlbXB0eSBzdHJpbmcgd2hlbiBwcmVzZXJ2ZUNvbW1lbnRzIGlzIHRydWVcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBDb21tZW50ICYmIGZpcnN0LmRhdGEgPT09ICcnKSByZXR1cm4gZ2V0X25leHRfc2libGluZyhmaXJzdCk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH1cblxuXHRpZiAoaXNfdGV4dCkge1xuXHRcdC8vIGlmIGFuIHtleHByZXNzaW9ufSBpcyBlbXB0eSBkdXJpbmcgU1NSLCB0aGVyZSBtaWdodCBiZSBub1xuXHRcdC8vIHRleHQgbm9kZSB0byBoeWRyYXRlIOKAlCB3ZSBtdXN0IHRoZXJlZm9yZSBjcmVhdGUgb25lXG5cdFx0aWYgKGh5ZHJhdGVfbm9kZT8ubm9kZVR5cGUgIT09IFRFWFRfTk9ERSkge1xuXHRcdFx0dmFyIHRleHQgPSBjcmVhdGVfdGV4dCgpO1xuXG5cdFx0XHRoeWRyYXRlX25vZGU/LmJlZm9yZSh0ZXh0KTtcblx0XHRcdHNldF9oeWRyYXRlX25vZGUodGV4dCk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9XG5cblx0XHRtZXJnZV90ZXh0X25vZGVzKC8qKiBAdHlwZSB7VGV4dH0gKi8gKGh5ZHJhdGVfbm9kZSkpO1xuXHR9XG5cblx0cmV0dXJuIGh5ZHJhdGVfbm9kZTtcbn1cblxuLyoqXG4gKiBEb24ndCBtYXJrIHRoaXMgYXMgc2lkZS1lZmZlY3QtZnJlZSwgaHlkcmF0aW9uIG5lZWRzIHRvIHdhbGsgYWxsIG5vZGVzXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzX3RleHRcbiAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGUgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2libGluZyhub2RlLCBjb3VudCA9IDEsIGlzX3RleHQgPSBmYWxzZSkge1xuXHRsZXQgbmV4dF9zaWJsaW5nID0gaHlkcmF0aW5nID8gaHlkcmF0ZV9ub2RlIDogbm9kZTtcblx0dmFyIGxhc3Rfc2libGluZztcblxuXHR3aGlsZSAoY291bnQtLSkge1xuXHRcdGxhc3Rfc2libGluZyA9IG5leHRfc2libGluZztcblx0XHRuZXh0X3NpYmxpbmcgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9uZXh0X3NpYmxpbmcobmV4dF9zaWJsaW5nKSk7XG5cdH1cblxuXHRpZiAoIWh5ZHJhdGluZykge1xuXHRcdHJldHVybiBuZXh0X3NpYmxpbmc7XG5cdH1cblxuXHRpZiAoaXNfdGV4dCkge1xuXHRcdC8vIGlmIGEgc2libGluZyB7ZXhwcmVzc2lvbn0gaXMgZW1wdHkgZHVyaW5nIFNTUiwgdGhlcmUgbWlnaHQgYmUgbm9cblx0XHQvLyB0ZXh0IG5vZGUgdG8gaHlkcmF0ZSDigJQgd2UgbXVzdCB0aGVyZWZvcmUgY3JlYXRlIG9uZVxuXHRcdGlmIChuZXh0X3NpYmxpbmc/Lm5vZGVUeXBlICE9PSBURVhUX05PREUpIHtcblx0XHRcdHZhciB0ZXh0ID0gY3JlYXRlX3RleHQoKTtcblx0XHRcdC8vIElmIHRoZSBuZXh0IHNpYmxpbmcgaXMgYG51bGxgIGFuZCB3ZSdyZSBoYW5kbGluZyB0ZXh0IHRoZW4gaXQncyBiZWNhdXNlXG5cdFx0XHQvLyB0aGUgU1NSIGNvbnRlbnQgd2FzIGVtcHR5IGZvciB0aGUgdGV4dCwgc28gd2UgbmVlZCB0byBnZW5lcmF0ZSBhIG5ldyB0ZXh0XG5cdFx0XHQvLyBub2RlIGFuZCBpbnNlcnQgaXQgYWZ0ZXIgdGhlIGxhc3Qgc2libGluZ1xuXHRcdFx0aWYgKG5leHRfc2libGluZyA9PT0gbnVsbCkge1xuXHRcdFx0XHRsYXN0X3NpYmxpbmc/LmFmdGVyKHRleHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV4dF9zaWJsaW5nLmJlZm9yZSh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHNldF9oeWRyYXRlX25vZGUodGV4dCk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9XG5cblx0XHRtZXJnZV90ZXh0X25vZGVzKC8qKiBAdHlwZSB7VGV4dH0gKi8gKG5leHRfc2libGluZykpO1xuXHR9XG5cblx0c2V0X2h5ZHJhdGVfbm9kZShuZXh0X3NpYmxpbmcpO1xuXHRyZXR1cm4gbmV4dF9zaWJsaW5nO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gTlxuICogQHBhcmFtIHtOfSBub2RlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyX3RleHRfY29udGVudChub2RlKSB7XG5cdG5vZGUudGV4dENvbnRlbnQgPSAnJztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB3ZSdyZSB1cGRhdGluZyB0aGUgY3VycmVudCBibG9jaywgZm9yIGV4YW1wbGUgYGNvbmRpdGlvbmAgaW5cbiAqIGFuIGB7I2lmIGNvbmRpdGlvbn1gIGJsb2NrIGp1c3QgY2hhbmdlZC4gSW4gdGhpcyBjYXNlLCB0aGUgYnJhbmNoIHNob3VsZCBiZVxuICogYXBwZW5kZWQgKG9yIHJlbW92ZWQpIGF0IHRoZSBzYW1lIHRpbWUgYXMgb3RoZXIgdXBkYXRlcyB3aXRoaW4gdGhlXG4gKiBjdXJyZW50IGA8c3ZlbHRlOmJvdW5kYXJ5PmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZF9kZWZlcl9hcHBlbmQoKSB7XG5cdGlmICghYXN5bmNfbW9kZV9mbGFnKSByZXR1cm4gZmFsc2U7XG5cdGlmIChlYWdlcl9ibG9ja19lZmZlY3RzICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cblx0dmFyIGZsYWdzID0gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KS5mO1xuXHRyZXR1cm4gKGZsYWdzICYgUkVBQ1RJT05fUkFOKSAhPT0gMDtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge2tleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcCB8IHN0cmluZ30gVFxuICogQHBhcmFtIHtUfSB0YWdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlXVxuICogQHBhcmFtIHtzdHJpbmd9IFtpc11cbiAqIEByZXR1cm5zIHtUIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwID8gSFRNTEVsZW1lbnRUYWdOYW1lTWFwW1RdIDogRWxlbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9lbGVtZW50KHRhZywgbmFtZXNwYWNlLCBpcykge1xuXHRsZXQgb3B0aW9ucyA9IGlzID8geyBpcyB9IDogdW5kZWZpbmVkO1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtUIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwID8gSFRNTEVsZW1lbnRUYWdOYW1lTWFwW1RdIDogRWxlbWVudH0gKi8gKFxuXHRcdGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UgPz8gTkFNRVNQQUNFX0hUTUwsIHRhZywgb3B0aW9ucylcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9mcmFnbWVudCgpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9jb21tZW50KGRhdGEgPSAnJykge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChkYXRhKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9hdHRyaWJ1dGUoZWxlbWVudCwga2V5LCB2YWx1ZSA9ICcnKSB7XG5cdGlmIChrZXkuc3RhcnRzV2l0aCgneGxpbms6JykpIHtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywga2V5LCB2YWx1ZSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHJldHVybiBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBCcm93c2VycyBzcGxpdCB0ZXh0IG5vZGVzIGxhcmdlciB0aGFuIDY1NTM2IGJ5dGVzIHdoZW4gcGFyc2luZy5cbiAqIEZvciBoeWRyYXRpb24gdG8gc3VjY2VlZCwgd2UgbmVlZCB0byBzdGl0Y2ggdGhlbSBiYWNrIHRvZ2V0aGVyXG4gKiBAcGFyYW0ge1RleHR9IHRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlX3RleHRfbm9kZXModGV4dCkge1xuXHRpZiAoLyoqIEB0eXBlIHtzdHJpbmd9ICovICh0ZXh0Lm5vZGVWYWx1ZSkubGVuZ3RoIDwgNjU1MzYpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRsZXQgbmV4dCA9IHRleHQubmV4dFNpYmxpbmc7XG5cblx0d2hpbGUgKG5leHQgIT09IG51bGwgJiYgbmV4dC5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFKSB7XG5cdFx0bmV4dC5yZW1vdmUoKTtcblxuXHRcdC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAodGV4dC5ub2RlVmFsdWUpICs9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAobmV4dC5ub2RlVmFsdWUpO1xuXG5cdFx0bmV4dCA9IHRleHQubmV4dFNpYmxpbmc7XG5cdH1cbn1cbiIsImltcG9ydCB7IGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBjbGVhcl90ZXh0X2NvbnRlbnQsIGdldF9maXJzdF9jaGlsZCB9IGZyb20gJy4uL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL3Rhc2suanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbVxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdXRvZm9jdXMoZG9tLCB2YWx1ZSkge1xuXHRpZiAodmFsdWUpIHtcblx0XHRjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcblx0XHRkb20uYXV0b2ZvY3VzID0gdHJ1ZTtcblxuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0aWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGJvZHkpIHtcblx0XHRcdFx0ZG9tLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgY2hpbGQgb2YgYSB0ZXh0YXJlYSBhY3R1YWxseSBjb3JyZXNwb25kcyB0byB0aGUgZGVmYXVsdFZhbHVlIHByb3BlcnR5LCBzbyB3ZSBuZWVkXG4gKiB0byByZW1vdmUgaXQgdXBvbiBoeWRyYXRpb24gdG8gYXZvaWQgYSBidWcgd2hlbiBzb21lb25lIHJlc2V0cyB0aGUgZm9ybSB2YWx1ZS5cbiAqIEBwYXJhbSB7SFRNTFRleHRBcmVhRWxlbWVudH0gZG9tXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZV90ZXh0YXJlYV9jaGlsZChkb20pIHtcblx0aWYgKGh5ZHJhdGluZyAmJiBnZXRfZmlyc3RfY2hpbGQoZG9tKSAhPT0gbnVsbCkge1xuXHRcdGNsZWFyX3RleHRfY29udGVudChkb20pO1xuXHR9XG59XG5cbmxldCBsaXN0ZW5pbmdfdG9fZm9ybV9yZXNldCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkX2Zvcm1fcmVzZXRfbGlzdGVuZXIoKSB7XG5cdGlmICghbGlzdGVuaW5nX3RvX2Zvcm1fcmVzZXQpIHtcblx0XHRsaXN0ZW5pbmdfdG9fZm9ybV9yZXNldCA9IHRydWU7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdyZXNldCcsXG5cdFx0XHQoZXZ0KSA9PiB7XG5cdFx0XHRcdC8vIE5lZWRzIHRvIGhhcHBlbiBvbmUgdGljayBsYXRlciBvciBlbHNlIHRoZSBkb20gcHJvcGVydGllcyBvZiB0aGUgZm9ybVxuXHRcdFx0XHQvLyBlbGVtZW50cyBoYXZlIG5vdCB1cGRhdGVkIHRvIHRoZWlyIHJlc2V0IHZhbHVlcyB5ZXRcblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFldnQuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBlIG9mIC8qKkB0eXBlIHtIVE1MRm9ybUVsZW1lbnR9ICovIChldnQudGFyZ2V0KS5lbGVtZW50cykge1xuXHRcdFx0XHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRcdFx0XHRcdGUuX19vbl9yPy4oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdC8vIEluIHRoZSBjYXB0dXJlIHBoYXNlIHRvIGd1YXJhbnRlZSB3ZSBnZXQgbm90aWNlZCBvZiBpdCAobm8gcG9zc2liaWxpdHkgb2Ygc3RvcFByb3BhZ2F0aW9uKVxuXHRcdFx0eyBjYXB0dXJlOiB0cnVlIH1cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdHNldF9hY3RpdmVfZWZmZWN0LFxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uXG59IGZyb20gJy4uLy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgYWRkX2Zvcm1fcmVzZXRfbGlzdGVuZXIgfSBmcm9tICcuLi9taXNjLmpzJztcblxuLyoqXG4gKiBGaXJlcyB0aGUgaGFuZGxlciBvbmNlIGltbWVkaWF0ZWx5ICh1bmxlc3MgY29ycmVzcG9uZGluZyBhcmcgaXMgc2V0IHRvIGBmYWxzZWApLFxuICogdGhlbiBsaXN0ZW5zIHRvIHRoZSBnaXZlbiBldmVudHMgdW50aWwgdGhlIHJlbmRlciBlZmZlY3QgY29udGV4dCBpcyBkZXN0cm95ZWRcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBldmVudHNcbiAqIEBwYXJhbSB7KGV2ZW50PzogRXZlbnQpID0+IHZvaWR9IGhhbmRsZXJcbiAqIEBwYXJhbSB7YW55fSBjYWxsX2hhbmRsZXJfaW1tZWRpYXRlbHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rlbih0YXJnZXQsIGV2ZW50cywgaGFuZGxlciwgY2FsbF9oYW5kbGVyX2ltbWVkaWF0ZWx5ID0gdHJ1ZSkge1xuXHRpZiAoY2FsbF9oYW5kbGVyX2ltbWVkaWF0ZWx5KSB7XG5cdFx0aGFuZGxlcigpO1xuXHR9XG5cblx0Zm9yICh2YXIgbmFtZSBvZiBldmVudHMpIHtcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcblx0fVxuXG5cdHRlYXJkb3duKCgpID0+IHtcblx0XHRmb3IgKHZhciBuYW1lIG9mIGV2ZW50cykge1xuXHRcdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHsoKSA9PiBUfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0KGZuKSB7XG5cdHZhciBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0dmFyIHByZXZpb3VzX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cdHNldF9hY3RpdmVfcmVhY3Rpb24obnVsbCk7XG5cdHNldF9hY3RpdmVfZWZmZWN0KG51bGwpO1xuXHR0cnkge1xuXHRcdHJldHVybiBmbigpO1xuXHR9IGZpbmFsbHkge1xuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24ocHJldmlvdXNfcmVhY3Rpb24pO1xuXHRcdHNldF9hY3RpdmVfZWZmZWN0KHByZXZpb3VzX2VmZmVjdCk7XG5cdH1cbn1cblxuLyoqXG4gKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGV2ZW50LCBhbmQgdGhlbiBpbnN0YW50aWF0ZSBhIGdsb2JhbCBmb3JtIHJlc2V0IGxpc3RlbmVyIGlmIG5vdCBhbHJlYWR5IGRvbmUsXG4gKiB0byBub3RpZnkgYWxsIGJpbmRpbmdzIHdoZW4gdGhlIGZvcm0gaXMgcmVzZXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICogQHBhcmFtIHsoaXNfcmVzZXQ/OiB0cnVlKSA9PiB2b2lkfSBoYW5kbGVyXG4gKiBAcGFyYW0geyhpc19yZXNldD86IHRydWUpID0+IHZvaWR9IFtvbl9yZXNldF1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIsIG9uX3Jlc2V0ID0gaGFuZGxlcikge1xuXHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsICgpID0+IHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dChoYW5kbGVyKSk7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0Y29uc3QgcHJldiA9IGVsZW1lbnQuX19vbl9yO1xuXHRpZiAocHJldikge1xuXHRcdC8vIHNwZWNpYWwgY2FzZSBmb3IgY2hlY2tib3ggdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZSBiaW5kcyAoZ3JvdXAgJiBjaGVja2VkKVxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50Ll9fb25fciA9ICgpID0+IHtcblx0XHRcdHByZXYoKTtcblx0XHRcdG9uX3Jlc2V0KHRydWUpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGVsZW1lbnQuX19vbl9yID0gKCkgPT4gb25fcmVzZXQodHJ1ZSk7XG5cdH1cblxuXHRhZGRfZm9ybV9yZXNldF9saXN0ZW5lcigpO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBCbG9ja2VyLCBDb21wb25lbnRDb250ZXh0LCBDb21wb25lbnRDb250ZXh0TGVnYWN5LCBEZXJpdmVkLCBFZmZlY3QsIFRlbXBsYXRlTm9kZSwgVHJhbnNpdGlvbk1hbmFnZXIgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHtcblx0aXNfZGlydHksXG5cdGFjdGl2ZV9lZmZlY3QsXG5cdGFjdGl2ZV9yZWFjdGlvbixcblx0dXBkYXRlX2VmZmVjdCxcblx0Z2V0LFxuXHRpc19kZXN0cm95aW5nX2VmZmVjdCxcblx0cmVtb3ZlX3JlYWN0aW9ucyxcblx0c2V0X2FjdGl2ZV9yZWFjdGlvbixcblx0c2V0X2lzX2Rlc3Ryb3lpbmdfZWZmZWN0LFxuXHR1bnRyYWNrLFxuXHR1bnRyYWNraW5nXG59IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHtcblx0RElSVFksXG5cdEJSQU5DSF9FRkZFQ1QsXG5cdFJFTkRFUl9FRkZFQ1QsXG5cdEVGRkVDVCxcblx0REVTVFJPWUVELFxuXHRJTkVSVCxcblx0UkVBQ1RJT05fUkFOLFxuXHRCTE9DS19FRkZFQ1QsXG5cdFJPT1RfRUZGRUNULFxuXHRFRkZFQ1RfVFJBTlNQQVJFTlQsXG5cdERFUklWRUQsXG5cdENMRUFOLFxuXHRFQUdFUl9FRkZFQ1QsXG5cdEhFQURfRUZGRUNULFxuXHRNQVlCRV9ESVJUWSxcblx0RUZGRUNUX1BSRVNFUlZFRCxcblx0U1RBTEVfUkVBQ1RJT04sXG5cdFVTRVJfRUZGRUNULFxuXHRBU1lOQyxcblx0Q09OTkVDVEVELFxuXHRNQU5BR0VEX0VGRkVDVFxufSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4uL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IGRlZmluZV9wcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBnZXRfbmV4dF9zaWJsaW5nIH0gZnJvbSAnLi4vZG9tL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQsIGRldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbiwgZGV2X3N0YWNrIH0gZnJvbSAnLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBCYXRjaCwgc2NoZWR1bGVfZWZmZWN0IH0gZnJvbSAnLi9iYXRjaC5qcyc7XG5pbXBvcnQgeyBmbGF0dGVuLCBpbmNyZW1lbnRfcGVuZGluZyB9IGZyb20gJy4vYXN5bmMuanMnO1xuaW1wb3J0IHsgd2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0IH0gZnJvbSAnLi4vZG9tL2VsZW1lbnRzL2JpbmRpbmdzL3NoYXJlZC5qcyc7XG5pbXBvcnQgeyBzZXRfc2lnbmFsX3N0YXR1cyB9IGZyb20gJy4vc3RhdHVzLmpzJztcblxuLyoqXG4gKiBAcGFyYW0geyckZWZmZWN0JyB8ICckZWZmZWN0LnByZScgfCAnJGluc3BlY3QnfSBydW5lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9lZmZlY3QocnVuZSkge1xuXHRpZiAoYWN0aXZlX2VmZmVjdCA9PT0gbnVsbCkge1xuXHRcdGlmIChhY3RpdmVfcmVhY3Rpb24gPT09IG51bGwpIHtcblx0XHRcdGUuZWZmZWN0X29ycGhhbihydW5lKTtcblx0XHR9XG5cblx0XHRlLmVmZmVjdF9pbl91bm93bmVkX2Rlcml2ZWQoKTtcblx0fVxuXG5cdGlmIChpc19kZXN0cm95aW5nX2VmZmVjdCkge1xuXHRcdGUuZWZmZWN0X2luX3RlYXJkb3duKHJ1bmUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHBhcmFtIHtFZmZlY3R9IHBhcmVudF9lZmZlY3RcbiAqL1xuZnVuY3Rpb24gcHVzaF9lZmZlY3QoZWZmZWN0LCBwYXJlbnRfZWZmZWN0KSB7XG5cdHZhciBwYXJlbnRfbGFzdCA9IHBhcmVudF9lZmZlY3QubGFzdDtcblx0aWYgKHBhcmVudF9sYXN0ID09PSBudWxsKSB7XG5cdFx0cGFyZW50X2VmZmVjdC5sYXN0ID0gcGFyZW50X2VmZmVjdC5maXJzdCA9IGVmZmVjdDtcblx0fSBlbHNlIHtcblx0XHRwYXJlbnRfbGFzdC5uZXh0ID0gZWZmZWN0O1xuXHRcdGVmZmVjdC5wcmV2ID0gcGFyZW50X2xhc3Q7XG5cdFx0cGFyZW50X2VmZmVjdC5sYXN0ID0gZWZmZWN0O1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGVcbiAqIEBwYXJhbSB7bnVsbCB8ICgoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpKX0gZm5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc3luY1xuICogQHJldHVybnMge0VmZmVjdH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlX2VmZmVjdCh0eXBlLCBmbiwgc3luYykge1xuXHR2YXIgcGFyZW50ID0gYWN0aXZlX2VmZmVjdDtcblxuXHRpZiAoREVWKSB7XG5cdFx0Ly8gRW5zdXJlIHRoZSBwYXJlbnQgaXMgbmV2ZXIgYW4gaW5zcGVjdCBlZmZlY3Rcblx0XHR3aGlsZSAocGFyZW50ICE9PSBudWxsICYmIChwYXJlbnQuZiAmIEVBR0VSX0VGRkVDVCkgIT09IDApIHtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHBhcmVudCAhPT0gbnVsbCAmJiAocGFyZW50LmYgJiBJTkVSVCkgIT09IDApIHtcblx0XHR0eXBlIHw9IElORVJUO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtFZmZlY3R9ICovXG5cdHZhciBlZmZlY3QgPSB7XG5cdFx0Y3R4OiBjb21wb25lbnRfY29udGV4dCxcblx0XHRkZXBzOiBudWxsLFxuXHRcdG5vZGVzOiBudWxsLFxuXHRcdGY6IHR5cGUgfCBESVJUWSB8IENPTk5FQ1RFRCxcblx0XHRmaXJzdDogbnVsbCxcblx0XHRmbixcblx0XHRsYXN0OiBudWxsLFxuXHRcdG5leHQ6IG51bGwsXG5cdFx0cGFyZW50LFxuXHRcdGI6IHBhcmVudCAmJiBwYXJlbnQuYixcblx0XHRwcmV2OiBudWxsLFxuXHRcdHRlYXJkb3duOiBudWxsLFxuXHRcdHd2OiAwLFxuXHRcdGFjOiBudWxsXG5cdH07XG5cblx0aWYgKERFVikge1xuXHRcdGVmZmVjdC5jb21wb25lbnRfZnVuY3Rpb24gPSBkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb247XG5cdH1cblxuXHRpZiAoc3luYykge1xuXHRcdHRyeSB7XG5cdFx0XHR1cGRhdGVfZWZmZWN0KGVmZmVjdCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdHRocm93IGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGZuICE9PSBudWxsKSB7XG5cdFx0c2NoZWR1bGVfZWZmZWN0KGVmZmVjdCk7XG5cdH1cblxuXHQvKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovXG5cdHZhciBlID0gZWZmZWN0O1xuXG5cdC8vIGlmIGFuIGVmZmVjdCBoYXMgYWxyZWFkeSByYW4gYW5kIGRvZXNuJ3QgbmVlZCB0byBiZSBrZXB0IGluIHRoZSB0cmVlXG5cdC8vIChiZWNhdXNlIGl0IHdvbid0IHJlLXJ1biwgaGFzIG5vIERPTSwgYW5kIGhhcyBubyB0ZWFyZG93biBldGMpXG5cdC8vIHRoZW4gd2Ugc2tpcCBpdCBhbmQgZ28gdG8gaXRzIGNoaWxkIChpZiBhbnkpXG5cdGlmIChcblx0XHRzeW5jICYmXG5cdFx0ZS5kZXBzID09PSBudWxsICYmXG5cdFx0ZS50ZWFyZG93biA9PT0gbnVsbCAmJlxuXHRcdGUubm9kZXMgPT09IG51bGwgJiZcblx0XHRlLmZpcnN0ID09PSBlLmxhc3QgJiYgLy8gZWl0aGVyIGBudWxsYCwgb3IgYSBzaW5ndWxhciBjaGlsZFxuXHRcdChlLmYgJiBFRkZFQ1RfUFJFU0VSVkVEKSA9PT0gMFxuXHQpIHtcblx0XHRlID0gZS5maXJzdDtcblx0XHRpZiAoKHR5cGUgJiBCTE9DS19FRkZFQ1QpICE9PSAwICYmICh0eXBlICYgRUZGRUNUX1RSQU5TUEFSRU5UKSAhPT0gMCAmJiBlICE9PSBudWxsKSB7XG5cdFx0XHRlLmYgfD0gRUZGRUNUX1RSQU5TUEFSRU5UO1xuXHRcdH1cblx0fVxuXG5cdGlmIChlICE9PSBudWxsKSB7XG5cdFx0ZS5wYXJlbnQgPSBwYXJlbnQ7XG5cblx0XHRpZiAocGFyZW50ICE9PSBudWxsKSB7XG5cdFx0XHRwdXNoX2VmZmVjdChlLCBwYXJlbnQpO1xuXHRcdH1cblxuXHRcdC8vIGlmIHdlJ3JlIGluIGEgZGVyaXZlZCwgYWRkIHRoZSBlZmZlY3QgdGhlcmUgdG9vXG5cdFx0aWYgKFxuXHRcdFx0YWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmXG5cdFx0XHQoYWN0aXZlX3JlYWN0aW9uLmYgJiBERVJJVkVEKSAhPT0gMCAmJlxuXHRcdFx0KHR5cGUgJiBST09UX0VGRkVDVCkgPT09IDBcblx0XHQpIHtcblx0XHRcdHZhciBkZXJpdmVkID0gLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoYWN0aXZlX3JlYWN0aW9uKTtcblx0XHRcdChkZXJpdmVkLmVmZmVjdHMgPz89IFtdKS5wdXNoKGUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlZmZlY3Q7XG59XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYCRlZmZlY3QudHJhY2tpbmcoKWBcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0X3RyYWNraW5nKCkge1xuXHRyZXR1cm4gYWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmICF1bnRyYWNraW5nO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRlYXJkb3duKGZuKSB7XG5cdGNvbnN0IGVmZmVjdCA9IGNyZWF0ZV9lZmZlY3QoUkVOREVSX0VGRkVDVCwgbnVsbCwgZmFsc2UpO1xuXHRzZXRfc2lnbmFsX3N0YXR1cyhlZmZlY3QsIENMRUFOKTtcblx0ZWZmZWN0LnRlYXJkb3duID0gZm47XG5cdHJldHVybiBlZmZlY3Q7XG59XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYCRlZmZlY3QoLi4uKWBcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZXJfZWZmZWN0KGZuKSB7XG5cdHZhbGlkYXRlX2VmZmVjdCgnJGVmZmVjdCcpO1xuXG5cdGlmIChERVYpIHtcblx0XHRkZWZpbmVfcHJvcGVydHkoZm4sICduYW1lJywge1xuXHRcdFx0dmFsdWU6ICckZWZmZWN0J1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm9uLW5lc3RlZCBgJGVmZmVjdCguLi4pYCBpbiBhIGNvbXBvbmVudCBzaG91bGQgYmUgZGVmZXJyZWRcblx0Ly8gdW50aWwgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkXG5cdHZhciBmbGFncyA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkuZjtcblx0dmFyIGRlZmVyID0gIWFjdGl2ZV9yZWFjdGlvbiAmJiAoZmxhZ3MgJiBCUkFOQ0hfRUZGRUNUKSAhPT0gMCAmJiAoZmxhZ3MgJiBSRUFDVElPTl9SQU4pID09PSAwO1xuXG5cdGlmIChkZWZlcikge1xuXHRcdC8vIFRvcC1sZXZlbCBgJGVmZmVjdCguLi4pYCBpbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50IOKAlCBkZWZlciB1bnRpbCBtb3VudFxuXHRcdHZhciBjb250ZXh0ID0gLyoqIEB0eXBlIHtDb21wb25lbnRDb250ZXh0fSAqLyAoY29tcG9uZW50X2NvbnRleHQpO1xuXHRcdChjb250ZXh0LmUgPz89IFtdKS5wdXNoKGZuKTtcblx0fSBlbHNlIHtcblx0XHQvLyBFdmVyeXRoaW5nIGVsc2Ug4oCUIGNyZWF0ZSBpbW1lZGlhdGVseVxuXHRcdHJldHVybiBjcmVhdGVfdXNlcl9lZmZlY3QoZm4pO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX3VzZXJfZWZmZWN0KGZuKSB7XG5cdHJldHVybiBjcmVhdGVfZWZmZWN0KEVGRkVDVCB8IFVTRVJfRUZGRUNULCBmbiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGAkZWZmZWN0LnByZSguLi4pYFxuICogQHBhcmFtIHsoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICogQHJldHVybnMge0VmZmVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZXJfcHJlX2VmZmVjdChmbikge1xuXHR2YWxpZGF0ZV9lZmZlY3QoJyRlZmZlY3QucHJlJyk7XG5cdGlmIChERVYpIHtcblx0XHRkZWZpbmVfcHJvcGVydHkoZm4sICduYW1lJywge1xuXHRcdFx0dmFsdWU6ICckZWZmZWN0LnByZSdcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gY3JlYXRlX2VmZmVjdChSRU5ERVJfRUZGRUNUIHwgVVNFUl9FRkZFQ1QsIGZuLCB0cnVlKTtcbn1cblxuLyoqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlYWdlcl9lZmZlY3QoZm4pIHtcblx0cmV0dXJuIGNyZWF0ZV9lZmZlY3QoRUFHRVJfRUZGRUNULCBmbiwgdHJ1ZSk7XG59XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYCRlZmZlY3Qucm9vdCguLi4pYFxuICogQHBhcmFtIHsoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICogQHJldHVybnMgeygpID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3Rfcm9vdChmbikge1xuXHRCYXRjaC5lbnN1cmUoKTtcblx0Y29uc3QgZWZmZWN0ID0gY3JlYXRlX2VmZmVjdChST09UX0VGRkVDVCB8IEVGRkVDVF9QUkVTRVJWRUQsIGZuLCB0cnVlKTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdH07XG59XG5cbi8qKlxuICogQW4gZWZmZWN0IHJvb3Qgd2hvc2UgY2hpbGRyZW4gY2FuIHRyYW5zaXRpb24gb3V0XG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7KG9wdGlvbnM/OiB7IG91dHJvPzogYm9vbGVhbiB9KSA9PiBQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50X3Jvb3QoZm4pIHtcblx0QmF0Y2guZW5zdXJlKCk7XG5cdGNvbnN0IGVmZmVjdCA9IGNyZWF0ZV9lZmZlY3QoUk9PVF9FRkZFQ1QgfCBFRkZFQ1RfUFJFU0VSVkVELCBmbiwgdHJ1ZSk7XG5cblx0cmV0dXJuIChvcHRpb25zID0ge30pID0+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbCkgPT4ge1xuXHRcdFx0aWYgKG9wdGlvbnMub3V0cm8pIHtcblx0XHRcdFx0cGF1c2VfZWZmZWN0KGVmZmVjdCwgKCkgPT4ge1xuXHRcdFx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRcdFx0ZnVsZmlsKHVuZGVmaW5lZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVzdHJveV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdFx0ZnVsZmlsKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICogQHJldHVybnMge0VmZmVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdChmbikge1xuXHRyZXR1cm4gY3JlYXRlX2VmZmVjdChFRkZFQ1QsIGZuLCBmYWxzZSk7XG59XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYCQ6IC4uYFxuICogQHBhcmFtIHsoKSA9PiBhbnl9IGRlcHNcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeV9wcmVfZWZmZWN0KGRlcHMsIGZuKSB7XG5cdHZhciBjb250ZXh0ID0gLyoqIEB0eXBlIHtDb21wb25lbnRDb250ZXh0TGVnYWN5fSAqLyAoY29tcG9uZW50X2NvbnRleHQpO1xuXG5cdC8qKiBAdHlwZSB7eyBlZmZlY3Q6IG51bGwgfCBFZmZlY3QsIHJhbjogYm9vbGVhbiwgZGVwczogKCkgPT4gYW55IH19ICovXG5cdHZhciB0b2tlbiA9IHsgZWZmZWN0OiBudWxsLCByYW46IGZhbHNlLCBkZXBzIH07XG5cblx0Y29udGV4dC5sLiQucHVzaCh0b2tlbik7XG5cblx0dG9rZW4uZWZmZWN0ID0gcmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0ZGVwcygpO1xuXG5cdFx0Ly8gSWYgdGhpcyBsZWdhY3kgcHJlIGVmZmVjdCBoYXMgYWxyZWFkeSBydW4gYmVmb3JlIHRoZSBlbmQgb2YgdGhlIHJlc2V0LCB0aGVuXG5cdFx0Ly8gYmFpbCBvdXQgdG8gZW11bGF0ZSB0aGUgc2FtZSBiZWhhdmlvci5cblx0XHRpZiAodG9rZW4ucmFuKSByZXR1cm47XG5cblx0XHR0b2tlbi5yYW4gPSB0cnVlO1xuXHRcdHVudHJhY2soZm4pO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeV9wcmVfZWZmZWN0X3Jlc2V0KCkge1xuXHR2YXIgY29udGV4dCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dExlZ2FjeX0gKi8gKGNvbXBvbmVudF9jb250ZXh0KTtcblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHQvLyBSdW4gZGlydHkgYCQ6YCBzdGF0ZW1lbnRzXG5cdFx0Zm9yICh2YXIgdG9rZW4gb2YgY29udGV4dC5sLiQpIHtcblx0XHRcdHRva2VuLmRlcHMoKTtcblxuXHRcdFx0dmFyIGVmZmVjdCA9IHRva2VuLmVmZmVjdDtcblxuXHRcdFx0Ly8gSWYgdGhlIGVmZmVjdCBpcyBDTEVBTiwgdGhlbiBtYWtlIGl0IE1BWUJFX0RJUlRZLiBUaGlzIGVuc3VyZXMgd2UgdHJhdmVyc2UgdGhyb3VnaFxuXHRcdFx0Ly8gdGhlIGVmZmVjdHMgZGVwZW5kZW5jaWVzIGFuZCBjb3JyZWN0bHkgZW5zdXJlIGVhY2ggZGVwZW5kZW5jeSBpcyB1cC10by1kYXRlLlxuXHRcdFx0aWYgKChlZmZlY3QuZiAmIENMRUFOKSAhPT0gMCAmJiBlZmZlY3QuZGVwcyAhPT0gbnVsbCkge1xuXHRcdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhlZmZlY3QsIE1BWUJFX0RJUlRZKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzX2RpcnR5KGVmZmVjdCkpIHtcblx0XHRcdFx0dXBkYXRlX2VmZmVjdChlZmZlY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHR0b2tlbi5yYW4gPSBmYWxzZTtcblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEByZXR1cm5zIHtFZmZlY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3luY19lZmZlY3QoZm4pIHtcblx0cmV0dXJuIGNyZWF0ZV9lZmZlY3QoQVNZTkMgfCBFRkZFQ1RfUFJFU0VSVkVELCBmbiwgdHJ1ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICogQHJldHVybnMge0VmZmVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcl9lZmZlY3QoZm4sIGZsYWdzID0gMCkge1xuXHRyZXR1cm4gY3JlYXRlX2VmZmVjdChSRU5ERVJfRUZGRUNUIHwgZmxhZ3MsIGZuLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyguLi5leHByZXNzaW9uczogYW55KSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICogQHBhcmFtIHtBcnJheTwoKSA9PiBhbnk+fSBzeW5jXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IFByb21pc2U8YW55Pj59IGFzeW5jXG4gKiBAcGFyYW0ge0Jsb2NrZXJbXX0gYmxvY2tlcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlX2VmZmVjdChmbiwgc3luYyA9IFtdLCBhc3luYyA9IFtdLCBibG9ja2VycyA9IFtdKSB7XG5cdGZsYXR0ZW4oYmxvY2tlcnMsIHN5bmMsIGFzeW5jLCAodmFsdWVzKSA9PiB7XG5cdFx0Y3JlYXRlX2VmZmVjdChSRU5ERVJfRUZGRUNULCAoKSA9PiBmbiguLi52YWx1ZXMubWFwKGdldCkpLCB0cnVlKTtcblx0fSk7XG59XG5cbi8qKlxuICogTGlrZSBgdGVtcGxhdGVfZWZmZWN0YCwgYnV0IHdpdGggYW4gZWZmZWN0IHdoaWNoIGlzIGRlZmVycmVkIHVudGlsIHRoZSBiYXRjaCBjb21taXRzXG4gKiBAcGFyYW0geyguLi5leHByZXNzaW9uczogYW55KSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpfSBmblxuICogQHBhcmFtIHtBcnJheTwoKSA9PiBhbnk+fSBzeW5jXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IFByb21pc2U8YW55Pj59IGFzeW5jXG4gKiBAcGFyYW0ge0Jsb2NrZXJbXX0gYmxvY2tlcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmVycmVkX3RlbXBsYXRlX2VmZmVjdChmbiwgc3luYyA9IFtdLCBhc3luYyA9IFtdLCBibG9ja2VycyA9IFtdKSB7XG5cdGlmIChhc3luYy5sZW5ndGggPiAwIHx8IGJsb2NrZXJzLmxlbmd0aCA+IDApIHtcblx0XHR2YXIgZGVjcmVtZW50X3BlbmRpbmcgPSBpbmNyZW1lbnRfcGVuZGluZygpO1xuXHR9XG5cblx0ZmxhdHRlbihibG9ja2Vycywgc3luYywgYXN5bmMsICh2YWx1ZXMpID0+IHtcblx0XHRjcmVhdGVfZWZmZWN0KEVGRkVDVCwgKCkgPT4gZm4oLi4udmFsdWVzLm1hcChnZXQpKSwgZmFsc2UpO1xuXG5cdFx0aWYgKGRlY3JlbWVudF9wZW5kaW5nKSB7XG5cdFx0XHRkZWNyZW1lbnRfcGVuZGluZygpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKCkgPT4gdm9pZCl9IGZuXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrKGZuLCBmbGFncyA9IDApIHtcblx0dmFyIGVmZmVjdCA9IGNyZWF0ZV9lZmZlY3QoQkxPQ0tfRUZGRUNUIHwgZmxhZ3MsIGZuLCB0cnVlKTtcblx0aWYgKERFVikge1xuXHRcdGVmZmVjdC5kZXZfc3RhY2sgPSBkZXZfc3RhY2s7XG5cdH1cblx0cmV0dXJuIGVmZmVjdDtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygoKSA9PiB2b2lkKX0gZm5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWFuYWdlZChmbiwgZmxhZ3MgPSAwKSB7XG5cdHZhciBlZmZlY3QgPSBjcmVhdGVfZWZmZWN0KE1BTkFHRURfRUZGRUNUIHwgZmxhZ3MsIGZuLCB0cnVlKTtcblx0aWYgKERFVikge1xuXHRcdGVmZmVjdC5kZXZfc3RhY2sgPSBkZXZfc3RhY2s7XG5cdH1cblx0cmV0dXJuIGVmZmVjdDtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygoKSA9PiB2b2lkKX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaChmbikge1xuXHRyZXR1cm4gY3JlYXRlX2VmZmVjdChCUkFOQ0hfRUZGRUNUIHwgRUZGRUNUX1BSRVNFUlZFRCwgZm4sIHRydWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVfZWZmZWN0X3RlYXJkb3duKGVmZmVjdCkge1xuXHR2YXIgdGVhcmRvd24gPSBlZmZlY3QudGVhcmRvd247XG5cdGlmICh0ZWFyZG93biAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IHByZXZpb3VzbHlfZGVzdHJveWluZ19lZmZlY3QgPSBpc19kZXN0cm95aW5nX2VmZmVjdDtcblx0XHRjb25zdCBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0XHRzZXRfaXNfZGVzdHJveWluZ19lZmZlY3QodHJ1ZSk7XG5cdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihudWxsKTtcblx0XHR0cnkge1xuXHRcdFx0dGVhcmRvd24uY2FsbChudWxsKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0c2V0X2lzX2Rlc3Ryb3lpbmdfZWZmZWN0KHByZXZpb3VzbHlfZGVzdHJveWluZ19lZmZlY3QpO1xuXHRcdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihwcmV2aW91c19yZWFjdGlvbik7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IHNpZ25hbFxuICogQHBhcmFtIHtib29sZWFufSByZW1vdmVfZG9tXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lfZWZmZWN0X2NoaWxkcmVuKHNpZ25hbCwgcmVtb3ZlX2RvbSA9IGZhbHNlKSB7XG5cdHZhciBlZmZlY3QgPSBzaWduYWwuZmlyc3Q7XG5cdHNpZ25hbC5maXJzdCA9IHNpZ25hbC5sYXN0ID0gbnVsbDtcblxuXHR3aGlsZSAoZWZmZWN0ICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgY29udHJvbGxlciA9IGVmZmVjdC5hYztcblxuXHRcdGlmIChjb250cm9sbGVyICE9PSBudWxsKSB7XG5cdFx0XHR3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQoKCkgPT4ge1xuXHRcdFx0XHRjb250cm9sbGVyLmFib3J0KFNUQUxFX1JFQUNUSU9OKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBuZXh0ID0gZWZmZWN0Lm5leHQ7XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgUk9PVF9FRkZFQ1QpICE9PSAwKSB7XG5cdFx0XHQvLyB0aGlzIGlzIG5vdyBhbiBpbmRlcGVuZGVudCByb290XG5cdFx0XHRlZmZlY3QucGFyZW50ID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QoZWZmZWN0LCByZW1vdmVfZG9tKTtcblx0XHR9XG5cblx0XHRlZmZlY3QgPSBuZXh0O1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IHNpZ25hbFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95X2Jsb2NrX2VmZmVjdF9jaGlsZHJlbihzaWduYWwpIHtcblx0dmFyIGVmZmVjdCA9IHNpZ25hbC5maXJzdDtcblxuXHR3aGlsZSAoZWZmZWN0ICE9PSBudWxsKSB7XG5cdFx0dmFyIG5leHQgPSBlZmZlY3QubmV4dDtcblx0XHRpZiAoKGVmZmVjdC5mICYgQlJBTkNIX0VGRkVDVCkgPT09IDApIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0fVxuXHRcdGVmZmVjdCA9IG5leHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZW1vdmVfZG9tXVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95X2VmZmVjdChlZmZlY3QsIHJlbW92ZV9kb20gPSB0cnVlKSB7XG5cdHZhciByZW1vdmVkID0gZmFsc2U7XG5cblx0aWYgKFxuXHRcdChyZW1vdmVfZG9tIHx8IChlZmZlY3QuZiAmIEhFQURfRUZGRUNUKSAhPT0gMCkgJiZcblx0XHRlZmZlY3Qubm9kZXMgIT09IG51bGwgJiZcblx0XHRlZmZlY3Qubm9kZXMuZW5kICE9PSBudWxsXG5cdCkge1xuXHRcdHJlbW92ZV9lZmZlY3RfZG9tKGVmZmVjdC5ub2Rlcy5zdGFydCwgLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChlZmZlY3Qubm9kZXMuZW5kKSk7XG5cdFx0cmVtb3ZlZCA9IHRydWU7XG5cdH1cblxuXHRkZXN0cm95X2VmZmVjdF9jaGlsZHJlbihlZmZlY3QsIHJlbW92ZV9kb20gJiYgIXJlbW92ZWQpO1xuXHRyZW1vdmVfcmVhY3Rpb25zKGVmZmVjdCwgMCk7XG5cdHNldF9zaWduYWxfc3RhdHVzKGVmZmVjdCwgREVTVFJPWUVEKTtcblxuXHR2YXIgdHJhbnNpdGlvbnMgPSBlZmZlY3Qubm9kZXMgJiYgZWZmZWN0Lm5vZGVzLnQ7XG5cblx0aWYgKHRyYW5zaXRpb25zICE9PSBudWxsKSB7XG5cdFx0Zm9yIChjb25zdCB0cmFuc2l0aW9uIG9mIHRyYW5zaXRpb25zKSB7XG5cdFx0XHR0cmFuc2l0aW9uLnN0b3AoKTtcblx0XHR9XG5cdH1cblxuXHRleGVjdXRlX2VmZmVjdF90ZWFyZG93bihlZmZlY3QpO1xuXG5cdHZhciBwYXJlbnQgPSBlZmZlY3QucGFyZW50O1xuXG5cdC8vIElmIHRoZSBwYXJlbnQgZG9lc24ndCBoYXZlIGFueSBjaGlsZHJlbiwgdGhlbiBza2lwIHRoaXMgd29yayBhbHRvZ2V0aGVyXG5cdGlmIChwYXJlbnQgIT09IG51bGwgJiYgcGFyZW50LmZpcnN0ICE9PSBudWxsKSB7XG5cdFx0dW5saW5rX2VmZmVjdChlZmZlY3QpO1xuXHR9XG5cblx0aWYgKERFVikge1xuXHRcdGVmZmVjdC5jb21wb25lbnRfZnVuY3Rpb24gPSBudWxsO1xuXHR9XG5cblx0Ly8gYGZpcnN0YCBhbmQgYGNoaWxkYCBhcmUgbnVsbGVkIG91dCBpbiBkZXN0cm95X2VmZmVjdF9jaGlsZHJlblxuXHQvLyB3ZSBkb24ndCBudWxsIG91dCBgcGFyZW50YCBzbyB0aGF0IGVycm9yIHByb3BhZ2F0aW9uIGNhbiB3b3JrIGNvcnJlY3RseVxuXHRlZmZlY3QubmV4dCA9XG5cdFx0ZWZmZWN0LnByZXYgPVxuXHRcdGVmZmVjdC50ZWFyZG93biA9XG5cdFx0ZWZmZWN0LmN0eCA9XG5cdFx0ZWZmZWN0LmRlcHMgPVxuXHRcdGVmZmVjdC5mbiA9XG5cdFx0ZWZmZWN0Lm5vZGVzID1cblx0XHRlZmZlY3QuYWMgPVxuXHRcdFx0bnVsbDtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtUZW1wbGF0ZU5vZGUgfCBudWxsfSBub2RlXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gZW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVfZWZmZWN0X2RvbShub2RlLCBlbmQpIHtcblx0d2hpbGUgKG5vZGUgIT09IG51bGwpIHtcblx0XHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IG51bGx9ICovXG5cdFx0dmFyIG5leHQgPSBub2RlID09PSBlbmQgPyBudWxsIDogZ2V0X25leHRfc2libGluZyhub2RlKTtcblxuXHRcdG5vZGUucmVtb3ZlKCk7XG5cdFx0bm9kZSA9IG5leHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBEZXRhY2ggYW4gZWZmZWN0IGZyb20gdGhlIGVmZmVjdCB0cmVlLCBmcmVlaW5nIHVwIG1lbW9yeSBhbmRcbiAqIHJlZHVjaW5nIHRoZSBhbW91bnQgb2Ygd29yayB0aGF0IGhhcHBlbnMgb24gc3Vic2VxdWVudCB0cmF2ZXJzYWxzXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtfZWZmZWN0KGVmZmVjdCkge1xuXHR2YXIgcGFyZW50ID0gZWZmZWN0LnBhcmVudDtcblx0dmFyIHByZXYgPSBlZmZlY3QucHJldjtcblx0dmFyIG5leHQgPSBlZmZlY3QubmV4dDtcblxuXHRpZiAocHJldiAhPT0gbnVsbCkgcHJldi5uZXh0ID0gbmV4dDtcblx0aWYgKG5leHQgIT09IG51bGwpIG5leHQucHJldiA9IHByZXY7XG5cblx0aWYgKHBhcmVudCAhPT0gbnVsbCkge1xuXHRcdGlmIChwYXJlbnQuZmlyc3QgPT09IGVmZmVjdCkgcGFyZW50LmZpcnN0ID0gbmV4dDtcblx0XHRpZiAocGFyZW50Lmxhc3QgPT09IGVmZmVjdCkgcGFyZW50Lmxhc3QgPSBwcmV2O1xuXHR9XG59XG5cbi8qKlxuICogV2hlbiBhIGJsb2NrIGVmZmVjdCBpcyByZW1vdmVkLCB3ZSBkb24ndCBpbW1lZGlhdGVseSBkZXN0cm95IGl0IG9yIHlhbmsgaXRcbiAqIG91dCBvZiB0aGUgRE9NLCBiZWNhdXNlIGl0IG1pZ2h0IGhhdmUgdHJhbnNpdGlvbnMuIEluc3RlYWQsIHdlICdwYXVzZScgaXQuXG4gKiBJdCBzdGF5cyBhcm91bmQgKGluIG1lbW9yeSwgYW5kIGluIHRoZSBET00pIHVudGlsIG91dHJvIHRyYW5zaXRpb25zIGhhdmVcbiAqIGNvbXBsZXRlZCwgYW5kIGlmIHRoZSBzdGF0ZSBjaGFuZ2UgaXMgcmV2ZXJzZWQgdGhlbiB3ZSBfcmVzdW1lXyBpdC5cbiAqIEEgcGF1c2VkIGVmZmVjdCBkb2VzIG5vdCB1cGRhdGUsIGFuZCB0aGUgRE9NIHN1YnRyZWUgYmVjb21lcyBpbmVydC5cbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gW2NhbGxiYWNrXVxuICogQHBhcmFtIHtib29sZWFufSBbZGVzdHJveV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhdXNlX2VmZmVjdChlZmZlY3QsIGNhbGxiYWNrLCBkZXN0cm95ID0gdHJ1ZSkge1xuXHQvKiogQHR5cGUge1RyYW5zaXRpb25NYW5hZ2VyW119ICovXG5cdHZhciB0cmFuc2l0aW9ucyA9IFtdO1xuXG5cdHBhdXNlX2NoaWxkcmVuKGVmZmVjdCwgdHJhbnNpdGlvbnMsIHRydWUpO1xuXG5cdHZhciBmbiA9ICgpID0+IHtcblx0XHRpZiAoZGVzdHJveSkgZGVzdHJveV9lZmZlY3QoZWZmZWN0KTtcblx0XHRpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cdH07XG5cblx0dmFyIHJlbWFpbmluZyA9IHRyYW5zaXRpb25zLmxlbmd0aDtcblx0aWYgKHJlbWFpbmluZyA+IDApIHtcblx0XHR2YXIgY2hlY2sgPSAoKSA9PiAtLXJlbWFpbmluZyB8fCBmbigpO1xuXHRcdGZvciAodmFyIHRyYW5zaXRpb24gb2YgdHJhbnNpdGlvbnMpIHtcblx0XHRcdHRyYW5zaXRpb24ub3V0KGNoZWNrKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm4oKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7VHJhbnNpdGlvbk1hbmFnZXJbXX0gdHJhbnNpdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9jYWxcbiAqL1xuZnVuY3Rpb24gcGF1c2VfY2hpbGRyZW4oZWZmZWN0LCB0cmFuc2l0aW9ucywgbG9jYWwpIHtcblx0aWYgKChlZmZlY3QuZiAmIElORVJUKSAhPT0gMCkgcmV0dXJuO1xuXHRlZmZlY3QuZiBePSBJTkVSVDtcblxuXHR2YXIgdCA9IGVmZmVjdC5ub2RlcyAmJiBlZmZlY3Qubm9kZXMudDtcblxuXHRpZiAodCAhPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgdHJhbnNpdGlvbiBvZiB0KSB7XG5cdFx0XHRpZiAodHJhbnNpdGlvbi5pc19nbG9iYWwgfHwgbG9jYWwpIHtcblx0XHRcdFx0dHJhbnNpdGlvbnMucHVzaCh0cmFuc2l0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR2YXIgY2hpbGQgPSBlZmZlY3QuZmlyc3Q7XG5cblx0d2hpbGUgKGNoaWxkICE9PSBudWxsKSB7XG5cdFx0dmFyIHNpYmxpbmcgPSBjaGlsZC5uZXh0O1xuXHRcdHZhciB0cmFuc3BhcmVudCA9XG5cdFx0XHQoY2hpbGQuZiAmIEVGRkVDVF9UUkFOU1BBUkVOVCkgIT09IDAgfHxcblx0XHRcdC8vIElmIHRoaXMgaXMgYSBicmFuY2ggZWZmZWN0IHdpdGhvdXQgYSBibG9jayBlZmZlY3QgcGFyZW50LFxuXHRcdFx0Ly8gaXQgbWVhbnMgdGhlIHBhcmVudCBibG9jayBlZmZlY3Qgd2FzIHBydW5lZC4gSW4gdGhhdCBjYXNlLFxuXHRcdFx0Ly8gdHJhbnNwYXJlbmN5IGluZm9ybWF0aW9uIHdhcyB0cmFuc2ZlcnJlZCB0byB0aGUgYnJhbmNoIGVmZmVjdC5cblx0XHRcdCgoY2hpbGQuZiAmIEJSQU5DSF9FRkZFQ1QpICE9PSAwICYmIChlZmZlY3QuZiAmIEJMT0NLX0VGRkVDVCkgIT09IDApO1xuXHRcdC8vIFRPRE8gd2UgZG9uJ3QgbmVlZCB0byBjYWxsIHBhdXNlX2NoaWxkcmVuIHJlY3Vyc2l2ZWx5IHdpdGggYSBsaW5rZWQgbGlzdCBpbiBwbGFjZVxuXHRcdC8vIGl0J3Mgc2xpZ2h0bHkgbW9yZSBpbnZvbHZlZCB0aG91Z2ggYXMgd2UgaGF2ZSB0byBhY2NvdW50IGZvciBgdHJhbnNwYXJlbnRgIGNoYW5naW5nXG5cdFx0Ly8gdGhyb3VnaCB0aGUgdHJlZS5cblx0XHRwYXVzZV9jaGlsZHJlbihjaGlsZCwgdHJhbnNpdGlvbnMsIHRyYW5zcGFyZW50ID8gbG9jYWwgOiBmYWxzZSk7XG5cdFx0Y2hpbGQgPSBzaWJsaW5nO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIGBwYXVzZV9lZmZlY3RgLiBXZSBjYWxsIHRoaXMgaWYgKGZvciBleGFtcGxlKVxuICogYHhgIGJlY29tZXMgZmFsc3kgdGhlbiB0cnV0aHk6IGB7I2lmIHh9Li4uey9pZn1gXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXN1bWVfZWZmZWN0KGVmZmVjdCkge1xuXHRyZXN1bWVfY2hpbGRyZW4oZWZmZWN0LCB0cnVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGxvY2FsXG4gKi9cbmZ1bmN0aW9uIHJlc3VtZV9jaGlsZHJlbihlZmZlY3QsIGxvY2FsKSB7XG5cdGlmICgoZWZmZWN0LmYgJiBJTkVSVCkgPT09IDApIHJldHVybjtcblx0ZWZmZWN0LmYgXj0gSU5FUlQ7XG5cblx0Ly8gSWYgYSBkZXBlbmRlbmN5IG9mIHRoaXMgZWZmZWN0IGNoYW5nZWQgd2hpbGUgaXQgd2FzIHBhdXNlZCxcblx0Ly8gc2NoZWR1bGUgdGhlIGVmZmVjdCB0byB1cGRhdGUuIHdlIGRvbid0IHVzZSBgaXNfZGlydHlgXG5cdC8vIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGVhZ2VybHkgcmVjb21wdXRlIGEgZGVyaXZlZCBsaWtlXG5cdC8vIGB7I2lmIGZvb317Zm9vLmJhcigpfXsvaWZ9YCBpZiBgZm9vYCBpcyBub3cgYHVuZGVmaW5lZFxuXHRpZiAoKGVmZmVjdC5mICYgQ0xFQU4pID09PSAwKSB7XG5cdFx0c2V0X3NpZ25hbF9zdGF0dXMoZWZmZWN0LCBESVJUWSk7XG5cdFx0c2NoZWR1bGVfZWZmZWN0KGVmZmVjdCk7XG5cdH1cblxuXHR2YXIgY2hpbGQgPSBlZmZlY3QuZmlyc3Q7XG5cblx0d2hpbGUgKGNoaWxkICE9PSBudWxsKSB7XG5cdFx0dmFyIHNpYmxpbmcgPSBjaGlsZC5uZXh0O1xuXHRcdHZhciB0cmFuc3BhcmVudCA9IChjaGlsZC5mICYgRUZGRUNUX1RSQU5TUEFSRU5UKSAhPT0gMCB8fCAoY2hpbGQuZiAmIEJSQU5DSF9FRkZFQ1QpICE9PSAwO1xuXHRcdC8vIFRPRE8gd2UgZG9uJ3QgbmVlZCB0byBjYWxsIHJlc3VtZV9jaGlsZHJlbiByZWN1cnNpdmVseSB3aXRoIGEgbGlua2VkIGxpc3QgaW4gcGxhY2Vcblx0XHQvLyBpdCdzIHNsaWdodGx5IG1vcmUgaW52b2x2ZWQgdGhvdWdoIGFzIHdlIGhhdmUgdG8gYWNjb3VudCBmb3IgYHRyYW5zcGFyZW50YCBjaGFuZ2luZ1xuXHRcdC8vIHRocm91Z2ggdGhlIHRyZWUuXG5cdFx0cmVzdW1lX2NoaWxkcmVuKGNoaWxkLCB0cmFuc3BhcmVudCA/IGxvY2FsIDogZmFsc2UpO1xuXHRcdGNoaWxkID0gc2libGluZztcblx0fVxuXG5cdHZhciB0ID0gZWZmZWN0Lm5vZGVzICYmIGVmZmVjdC5ub2Rlcy50O1xuXG5cdGlmICh0ICE9PSBudWxsKSB7XG5cdFx0Zm9yIChjb25zdCB0cmFuc2l0aW9uIG9mIHQpIHtcblx0XHRcdGlmICh0cmFuc2l0aW9uLmlzX2dsb2JhbCB8fCBsb2NhbCkge1xuXHRcdFx0XHR0cmFuc2l0aW9uLmluKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYm9ydGVkKGVmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkpIHtcblx0cmV0dXJuIChlZmZlY3QuZiAmIERFU1RST1lFRCkgIT09IDA7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gbW92ZV9lZmZlY3QoZWZmZWN0LCBmcmFnbWVudCkge1xuXHRpZiAoIWVmZmVjdC5ub2RlcykgcmV0dXJuO1xuXG5cdC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlIHwgbnVsbH0gKi9cblx0dmFyIG5vZGUgPSBlZmZlY3Qubm9kZXMuc3RhcnQ7XG5cdHZhciBlbmQgPSBlZmZlY3Qubm9kZXMuZW5kO1xuXG5cdHdoaWxlIChub2RlICE9PSBudWxsKSB7XG5cdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGUgfCBudWxsfSAqL1xuXHRcdHZhciBuZXh0ID0gbm9kZSA9PT0gZW5kID8gbnVsbCA6IGdldF9uZXh0X3NpYmxpbmcobm9kZSk7XG5cblx0XHRmcmFnbWVudC5hcHBlbmQobm9kZSk7XG5cdFx0bm9kZSA9IG5leHQ7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRGVyaXZlZCwgRWZmZWN0LCBSZWFjdGlvbiwgU291cmNlLCBWYWx1ZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IGdldF9kZXNjcmlwdG9ycywgZ2V0X3Byb3RvdHlwZV9vZiwgaW5jbHVkZXMsIGluZGV4X29mIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7XG5cdGRlc3Ryb3lfYmxvY2tfZWZmZWN0X2NoaWxkcmVuLFxuXHRkZXN0cm95X2VmZmVjdF9jaGlsZHJlbixcblx0ZWZmZWN0X3RyYWNraW5nLFxuXHRleGVjdXRlX2VmZmVjdF90ZWFyZG93blxufSBmcm9tICcuL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQge1xuXHRESVJUWSxcblx0TUFZQkVfRElSVFksXG5cdENMRUFOLFxuXHRERVJJVkVELFxuXHRERVNUUk9ZRUQsXG5cdEJSQU5DSF9FRkZFQ1QsXG5cdFNUQVRFX1NZTUJPTCxcblx0QkxPQ0tfRUZGRUNULFxuXHRST09UX0VGRkVDVCxcblx0Q09OTkVDVEVELFxuXHRSRUFDVElPTl9JU19VUERBVElORyxcblx0U1RBTEVfUkVBQ1RJT04sXG5cdEVSUk9SX1ZBTFVFLFxuXHRXQVNfTUFSS0VELFxuXHRNQU5BR0VEX0VGRkVDVCxcblx0UkVBQ1RJT05fUkFOXG59IGZyb20gJy4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IG9sZF92YWx1ZXMgfSBmcm9tICcuL3JlYWN0aXZpdHkvc291cmNlcy5qcyc7XG5pbXBvcnQge1xuXHRkZXN0cm95X2Rlcml2ZWRfZWZmZWN0cyxcblx0ZXhlY3V0ZV9kZXJpdmVkLFxuXHRmcmVlemVfZGVyaXZlZF9lZmZlY3RzLFxuXHRyZWNlbnRfYXN5bmNfZGVyaXZlZHMsXG5cdHVuZnJlZXplX2Rlcml2ZWRfZWZmZWN0cyxcblx0dXBkYXRlX2Rlcml2ZWRcbn0gZnJvbSAnLi9yZWFjdGl2aXR5L2Rlcml2ZWRzLmpzJztcbmltcG9ydCB7IGFzeW5jX21vZGVfZmxhZywgdHJhY2luZ19tb2RlX2ZsYWcgfSBmcm9tICcuLi9mbGFncy9pbmRleC5qcyc7XG5pbXBvcnQgeyB0cmFjaW5nX2V4cHJlc3Npb25zIH0gZnJvbSAnLi9kZXYvdHJhY2luZy5qcyc7XG5pbXBvcnQgeyBnZXRfZXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvZGV2LmpzJztcbmltcG9ydCB7XG5cdGNvbXBvbmVudF9jb250ZXh0LFxuXHRkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24sXG5cdGRldl9zdGFjayxcblx0aXNfcnVuZXMsXG5cdHNldF9jb21wb25lbnRfY29udGV4dCxcblx0c2V0X2Rldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbixcblx0c2V0X2Rldl9zdGFja1xufSBmcm9tICcuL2NvbnRleHQuanMnO1xuaW1wb3J0IHtcblx0QmF0Y2gsXG5cdGJhdGNoX3ZhbHVlcyxcblx0Y3VycmVudF9iYXRjaCxcblx0Zmx1c2hTeW5jLFxuXHRzY2hlZHVsZV9lZmZlY3Rcbn0gZnJvbSAnLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7IGhhbmRsZV9lcnJvciB9IGZyb20gJy4vZXJyb3ItaGFuZGxpbmcuanMnO1xuaW1wb3J0IHsgVU5JTklUSUFMSVpFRCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBjYXB0dXJlZF9zaWduYWxzIH0gZnJvbSAnLi9sZWdhY3kuanMnO1xuaW1wb3J0IHsgd2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0IH0gZnJvbSAnLi9kb20vZWxlbWVudHMvYmluZGluZ3Mvc2hhcmVkLmpzJztcbmltcG9ydCB7IHNldF9zaWduYWxfc3RhdHVzLCB1cGRhdGVfZGVyaXZlZF9zdGF0dXMgfSBmcm9tICcuL3JlYWN0aXZpdHkvc3RhdHVzLmpzJztcblxubGV0IGlzX3VwZGF0aW5nX2VmZmVjdCA9IGZhbHNlO1xuXG5leHBvcnQgbGV0IGlzX2Rlc3Ryb3lpbmdfZWZmZWN0ID0gZmFsc2U7XG5cbi8qKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2lzX2Rlc3Ryb3lpbmdfZWZmZWN0KHZhbHVlKSB7XG5cdGlzX2Rlc3Ryb3lpbmdfZWZmZWN0ID0gdmFsdWU7XG59XG5cbi8qKiBAdHlwZSB7bnVsbCB8IFJlYWN0aW9ufSAqL1xuZXhwb3J0IGxldCBhY3RpdmVfcmVhY3Rpb24gPSBudWxsO1xuXG5leHBvcnQgbGV0IHVudHJhY2tpbmcgPSBmYWxzZTtcblxuLyoqIEBwYXJhbSB7bnVsbCB8IFJlYWN0aW9ufSByZWFjdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9hY3RpdmVfcmVhY3Rpb24ocmVhY3Rpb24pIHtcblx0YWN0aXZlX3JlYWN0aW9uID0gcmVhY3Rpb247XG59XG5cbi8qKiBAdHlwZSB7bnVsbCB8IEVmZmVjdH0gKi9cbmV4cG9ydCBsZXQgYWN0aXZlX2VmZmVjdCA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge251bGwgfCBFZmZlY3R9IGVmZmVjdCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9hY3RpdmVfZWZmZWN0KGVmZmVjdCkge1xuXHRhY3RpdmVfZWZmZWN0ID0gZWZmZWN0O1xufVxuXG4vKipcbiAqIFdoZW4gc291cmNlcyBhcmUgY3JlYXRlZCB3aXRoaW4gYSByZWFjdGlvbiwgcmVhZGluZyBhbmQgd3JpdGluZ1xuICogdGhlbSB3aXRoaW4gdGhhdCByZWFjdGlvbiBzaG91bGQgbm90IGNhdXNlIGEgcmUtcnVuXG4gKiBAdHlwZSB7bnVsbCB8IFNvdXJjZVtdfVxuICovXG5leHBvcnQgbGV0IGN1cnJlbnRfc291cmNlcyA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge1ZhbHVlfSB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1c2hfcmVhY3Rpb25fdmFsdWUodmFsdWUpIHtcblx0aWYgKGFjdGl2ZV9yZWFjdGlvbiAhPT0gbnVsbCAmJiAoIWFzeW5jX21vZGVfZmxhZyB8fCAoYWN0aXZlX3JlYWN0aW9uLmYgJiBERVJJVkVEKSAhPT0gMCkpIHtcblx0XHRpZiAoY3VycmVudF9zb3VyY2VzID09PSBudWxsKSB7XG5cdFx0XHRjdXJyZW50X3NvdXJjZXMgPSBbdmFsdWVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50X3NvdXJjZXMucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogVGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgcmVhY3Rpb24gdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgZXhlY3V0ZWQuIEluIG1hbnkgY2FzZXMsXG4gKiB0aGUgZGVwZW5kZW5jaWVzIGFyZSB1bmNoYW5nZWQgYmV0d2VlbiBydW5zLCBhbmQgc28gdGhpcyB3aWxsIGJlIGBudWxsYCB1bmxlc3NcbiAqIGFuZCB1bnRpbCBhIG5ldyBkZXBlbmRlbmN5IGlzIGFjY2Vzc2VkIOKAlCB3ZSB0cmFjayB0aGlzIHZpYSBgc2tpcHBlZF9kZXBzYFxuICogQHR5cGUge251bGwgfCBWYWx1ZVtdfVxuICovXG5sZXQgbmV3X2RlcHMgPSBudWxsO1xuXG5sZXQgc2tpcHBlZF9kZXBzID0gMDtcblxuLyoqXG4gKiBUcmFja3Mgd3JpdGVzIHRoYXQgdGhlIGVmZmVjdCBpdCdzIGV4ZWN1dGVkIGluIGRvZXNuJ3QgbGlzdGVuIHRvIHlldCxcbiAqIHNvIHRoYXQgdGhlIGRlcGVuZGVuY3kgY2FuIGJlIGFkZGVkIHRvIHRoZSBlZmZlY3QgbGF0ZXIgb24gaWYgaXQgdGhlbiByZWFkcyBpdFxuICogQHR5cGUge251bGwgfCBTb3VyY2VbXX1cbiAqL1xuZXhwb3J0IGxldCB1bnRyYWNrZWRfd3JpdGVzID0gbnVsbDtcblxuLyoqIEBwYXJhbSB7bnVsbCB8IFNvdXJjZVtdfSB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF91bnRyYWNrZWRfd3JpdGVzKHZhbHVlKSB7XG5cdHVudHJhY2tlZF93cml0ZXMgPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfSBVc2VkIGJ5IHNvdXJjZXMgYW5kIGRlcml2ZWRzIGZvciBoYW5kbGluZyB1cGRhdGVzLlxuICogVmVyc2lvbiBzdGFydHMgZnJvbSAxIHNvIHRoYXQgdW5vd25lZCBkZXJpdmVkcyBkaWZmZXJlbnRpYXRlIGJldHdlZW4gYSBjcmVhdGVkIGVmZmVjdCBhbmQgYSBydW4gb25lIGZvciB0cmFjaW5nXG4gKiovXG5leHBvcnQgbGV0IHdyaXRlX3ZlcnNpb24gPSAxO1xuXG4vKiogQHR5cGUge251bWJlcn0gVXNlZCB0byB2ZXJzaW9uIGVhY2ggcmVhZCBvZiBhIHNvdXJjZSBvZiBkZXJpdmVkIHRvIGF2b2lkIGR1cGxpY2F0aW5nIGRlcGVkZW5jaWVzIGluc2lkZSBhIHJlYWN0aW9uICovXG5sZXQgcmVhZF92ZXJzaW9uID0gMDtcblxuZXhwb3J0IGxldCB1cGRhdGVfdmVyc2lvbiA9IHJlYWRfdmVyc2lvbjtcblxuLyoqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF91cGRhdGVfdmVyc2lvbih2YWx1ZSkge1xuXHR1cGRhdGVfdmVyc2lvbiA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5jcmVtZW50X3dyaXRlX3ZlcnNpb24oKSB7XG5cdHJldHVybiArK3dyaXRlX3ZlcnNpb247XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgZGVyaXZlZCBvciBlZmZlY3QgaXMgZGlydHkuXG4gKiBJZiBpdCBpcyBNQVlCRV9ESVJUWSwgd2lsbCBzZXQgdGhlIHN0YXR1cyB0byBDTEVBTlxuICogQHBhcmFtIHtSZWFjdGlvbn0gcmVhY3Rpb25cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfZGlydHkocmVhY3Rpb24pIHtcblx0dmFyIGZsYWdzID0gcmVhY3Rpb24uZjtcblxuXHRpZiAoKGZsYWdzICYgRElSVFkpICE9PSAwKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoZmxhZ3MgJiBERVJJVkVEKSB7XG5cdFx0cmVhY3Rpb24uZiAmPSB+V0FTX01BUktFRDtcblx0fVxuXG5cdGlmICgoZmxhZ3MgJiBNQVlCRV9ESVJUWSkgIT09IDApIHtcblx0XHR2YXIgZGVwZW5kZW5jaWVzID0gLyoqIEB0eXBlIHtWYWx1ZVtdfSAqLyAocmVhY3Rpb24uZGVwcyk7XG5cdFx0dmFyIGxlbmd0aCA9IGRlcGVuZGVuY2llcy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IGRlcGVuZGVuY2llc1tpXTtcblxuXHRcdFx0aWYgKGlzX2RpcnR5KC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGRlcGVuZGVuY3kpKSkge1xuXHRcdFx0XHR1cGRhdGVfZGVyaXZlZCgvKiogQHR5cGUge0Rlcml2ZWR9ICovIChkZXBlbmRlbmN5KSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkZXBlbmRlbmN5Lnd2ID4gcmVhY3Rpb24ud3YpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0KGZsYWdzICYgQ09OTkVDVEVEKSAhPT0gMCAmJlxuXHRcdFx0Ly8gRHVyaW5nIHRpbWUgdHJhdmVsaW5nIHdlIGRvbid0IHdhbnQgdG8gcmVzZXQgdGhlIHN0YXR1cyBzbyB0aGF0XG5cdFx0XHQvLyB0cmF2ZXJzYWwgb2YgdGhlIGdyYXBoIGluIHRoZSBvdGhlciBiYXRjaGVzIHN0aWxsIGhhcHBlbnNcblx0XHRcdGJhdGNoX3ZhbHVlcyA9PT0gbnVsbFxuXHRcdCkge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMocmVhY3Rpb24sIENMRUFOKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHtWYWx1ZX0gc2lnbmFsXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyb290XVxuICovXG5mdW5jdGlvbiBzY2hlZHVsZV9wb3NzaWJsZV9lZmZlY3Rfc2VsZl9pbnZhbGlkYXRpb24oc2lnbmFsLCBlZmZlY3QsIHJvb3QgPSB0cnVlKSB7XG5cdHZhciByZWFjdGlvbnMgPSBzaWduYWwucmVhY3Rpb25zO1xuXHRpZiAocmVhY3Rpb25zID09PSBudWxsKSByZXR1cm47XG5cblx0aWYgKCFhc3luY19tb2RlX2ZsYWcgJiYgY3VycmVudF9zb3VyY2VzICE9PSBudWxsICYmIGluY2x1ZGVzLmNhbGwoY3VycmVudF9zb3VyY2VzLCBzaWduYWwpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWFjdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcmVhY3Rpb24gPSByZWFjdGlvbnNbaV07XG5cblx0XHRpZiAoKHJlYWN0aW9uLmYgJiBERVJJVkVEKSAhPT0gMCkge1xuXHRcdFx0c2NoZWR1bGVfcG9zc2libGVfZWZmZWN0X3NlbGZfaW52YWxpZGF0aW9uKC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKHJlYWN0aW9uKSwgZWZmZWN0LCBmYWxzZSk7XG5cdFx0fSBlbHNlIGlmIChlZmZlY3QgPT09IHJlYWN0aW9uKSB7XG5cdFx0XHRpZiAocm9vdCkge1xuXHRcdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhyZWFjdGlvbiwgRElSVFkpO1xuXHRcdFx0fSBlbHNlIGlmICgocmVhY3Rpb24uZiAmIENMRUFOKSAhPT0gMCkge1xuXHRcdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhyZWFjdGlvbiwgTUFZQkVfRElSVFkpO1xuXHRcdFx0fVxuXHRcdFx0c2NoZWR1bGVfZWZmZWN0KC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAocmVhY3Rpb24pKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqIEBwYXJhbSB7UmVhY3Rpb259IHJlYWN0aW9uICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3JlYWN0aW9uKHJlYWN0aW9uKSB7XG5cdHZhciBwcmV2aW91c19kZXBzID0gbmV3X2RlcHM7XG5cdHZhciBwcmV2aW91c19za2lwcGVkX2RlcHMgPSBza2lwcGVkX2RlcHM7XG5cdHZhciBwcmV2aW91c191bnRyYWNrZWRfd3JpdGVzID0gdW50cmFja2VkX3dyaXRlcztcblx0dmFyIHByZXZpb3VzX3JlYWN0aW9uID0gYWN0aXZlX3JlYWN0aW9uO1xuXHR2YXIgcHJldmlvdXNfc291cmNlcyA9IGN1cnJlbnRfc291cmNlcztcblx0dmFyIHByZXZpb3VzX2NvbXBvbmVudF9jb250ZXh0ID0gY29tcG9uZW50X2NvbnRleHQ7XG5cdHZhciBwcmV2aW91c191bnRyYWNraW5nID0gdW50cmFja2luZztcblx0dmFyIHByZXZpb3VzX3VwZGF0ZV92ZXJzaW9uID0gdXBkYXRlX3ZlcnNpb247XG5cblx0dmFyIGZsYWdzID0gcmVhY3Rpb24uZjtcblxuXHRuZXdfZGVwcyA9IC8qKiBAdHlwZSB7bnVsbCB8IFZhbHVlW119ICovIChudWxsKTtcblx0c2tpcHBlZF9kZXBzID0gMDtcblx0dW50cmFja2VkX3dyaXRlcyA9IG51bGw7XG5cdGFjdGl2ZV9yZWFjdGlvbiA9IChmbGFncyAmIChCUkFOQ0hfRUZGRUNUIHwgUk9PVF9FRkZFQ1QpKSA9PT0gMCA/IHJlYWN0aW9uIDogbnVsbDtcblxuXHRjdXJyZW50X3NvdXJjZXMgPSBudWxsO1xuXHRzZXRfY29tcG9uZW50X2NvbnRleHQocmVhY3Rpb24uY3R4KTtcblx0dW50cmFja2luZyA9IGZhbHNlO1xuXHR1cGRhdGVfdmVyc2lvbiA9ICsrcmVhZF92ZXJzaW9uO1xuXG5cdGlmIChyZWFjdGlvbi5hYyAhPT0gbnVsbCkge1xuXHRcdHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dCgoKSA9PiB7XG5cdFx0XHQvKiogQHR5cGUge0Fib3J0Q29udHJvbGxlcn0gKi8gKHJlYWN0aW9uLmFjKS5hYm9ydChTVEFMRV9SRUFDVElPTik7XG5cdFx0fSk7XG5cblx0XHRyZWFjdGlvbi5hYyA9IG51bGw7XG5cdH1cblxuXHR0cnkge1xuXHRcdHJlYWN0aW9uLmYgfD0gUkVBQ1RJT05fSVNfVVBEQVRJTkc7XG5cdFx0dmFyIGZuID0gLyoqIEB0eXBlIHtGdW5jdGlvbn0gKi8gKHJlYWN0aW9uLmZuKTtcblx0XHR2YXIgcmVzdWx0ID0gZm4oKTtcblx0XHRyZWFjdGlvbi5mIHw9IFJFQUNUSU9OX1JBTjtcblx0XHR2YXIgZGVwcyA9IHJlYWN0aW9uLmRlcHM7XG5cblx0XHQvLyBEb24ndCByZW1vdmUgcmVhY3Rpb25zIGR1cmluZyBmb3JrO1xuXHRcdC8vIHRoZXkgbXVzdCByZW1haW4gZm9yIHdoZW4gZm9yayBpcyBkaXNjYXJkZWRcblx0XHR2YXIgaXNfZm9yayA9IGN1cnJlbnRfYmF0Y2g/LmlzX2Zvcms7XG5cblx0XHRpZiAobmV3X2RlcHMgIT09IG51bGwpIHtcblx0XHRcdHZhciBpO1xuXG5cdFx0XHRpZiAoIWlzX2ZvcmspIHtcblx0XHRcdFx0cmVtb3ZlX3JlYWN0aW9ucyhyZWFjdGlvbiwgc2tpcHBlZF9kZXBzKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRlcHMgIT09IG51bGwgJiYgc2tpcHBlZF9kZXBzID4gMCkge1xuXHRcdFx0XHRkZXBzLmxlbmd0aCA9IHNraXBwZWRfZGVwcyArIG5ld19kZXBzLmxlbmd0aDtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG5ld19kZXBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZGVwc1tza2lwcGVkX2RlcHMgKyBpXSA9IG5ld19kZXBzW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZWFjdGlvbi5kZXBzID0gZGVwcyA9IG5ld19kZXBzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZWZmZWN0X3RyYWNraW5nKCkgJiYgKHJlYWN0aW9uLmYgJiBDT05ORUNURUQpICE9PSAwKSB7XG5cdFx0XHRcdGZvciAoaSA9IHNraXBwZWRfZGVwczsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHQoZGVwc1tpXS5yZWFjdGlvbnMgPz89IFtdKS5wdXNoKHJlYWN0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIWlzX2ZvcmsgJiYgZGVwcyAhPT0gbnVsbCAmJiBza2lwcGVkX2RlcHMgPCBkZXBzLmxlbmd0aCkge1xuXHRcdFx0cmVtb3ZlX3JlYWN0aW9ucyhyZWFjdGlvbiwgc2tpcHBlZF9kZXBzKTtcblx0XHRcdGRlcHMubGVuZ3RoID0gc2tpcHBlZF9kZXBzO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlJ3JlIGluc2lkZSBhbiBlZmZlY3QgYW5kIHdlIGhhdmUgdW50cmFja2VkIHdyaXRlcywgdGhlbiB3ZSBuZWVkIHRvXG5cdFx0Ly8gZW5zdXJlIHRoYXQgaWYgYW55IG9mIHRob3NlIHVudHJhY2tlZCB3cml0ZXMgcmVzdWx0IGluIHJlLWludmFsaWRhdGlvblxuXHRcdC8vIG9mIHRoZSBjdXJyZW50IGVmZmVjdCwgdGhlbiB0aGF0IGhhcHBlbnMgYWNjb3JkaW5nbHlcblx0XHRpZiAoXG5cdFx0XHRpc19ydW5lcygpICYmXG5cdFx0XHR1bnRyYWNrZWRfd3JpdGVzICE9PSBudWxsICYmXG5cdFx0XHQhdW50cmFja2luZyAmJlxuXHRcdFx0ZGVwcyAhPT0gbnVsbCAmJlxuXHRcdFx0KHJlYWN0aW9uLmYgJiAoREVSSVZFRCB8IE1BWUJFX0RJUlRZIHwgRElSVFkpKSA9PT0gMFxuXHRcdCkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IC8qKiBAdHlwZSB7U291cmNlW119ICovICh1bnRyYWNrZWRfd3JpdGVzKS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzY2hlZHVsZV9wb3NzaWJsZV9lZmZlY3Rfc2VsZl9pbnZhbGlkYXRpb24oXG5cdFx0XHRcdFx0dW50cmFja2VkX3dyaXRlc1tpXSxcblx0XHRcdFx0XHQvKiogQHR5cGUge0VmZmVjdH0gKi8gKHJlYWN0aW9uKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElmIHdlIGFyZSByZXR1cm5pbmcgdG8gYW4gcHJldmlvdXMgcmVhY3Rpb24gdGhlblxuXHRcdC8vIHdlIG5lZWQgdG8gaW5jcmVtZW50IHRoZSByZWFkIHZlcnNpb24gdG8gZW5zdXJlIHRoYXRcblx0XHQvLyBhbnkgZGVwZW5kZW5jaWVzIGluIHRoaXMgcmVhY3Rpb24gYXJlbid0IG1hcmtlZCB3aXRoXG5cdFx0Ly8gdGhlIHNhbWUgdmVyc2lvblxuXHRcdGlmIChwcmV2aW91c19yZWFjdGlvbiAhPT0gbnVsbCAmJiBwcmV2aW91c19yZWFjdGlvbiAhPT0gcmVhY3Rpb24pIHtcblx0XHRcdHJlYWRfdmVyc2lvbisrO1xuXG5cdFx0XHQvLyB1cGRhdGUgdGhlIGBydmAgb2YgdGhlIHByZXZpb3VzIHJlYWN0aW9uJ3MgZGVwcyDigJQgYm90aCBleGlzdGluZyBhbmQgbmV3IOKAlFxuXHRcdFx0Ly8gc28gdGhhdCB0aGV5IGFyZSBub3QgYWRkZWQgYWdhaW5cblx0XHRcdGlmIChwcmV2aW91c19yZWFjdGlvbi5kZXBzICE9PSBudWxsKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlvdXNfc2tpcHBlZF9kZXBzOyBpICs9IDEpIHtcblx0XHRcdFx0XHRwcmV2aW91c19yZWFjdGlvbi5kZXBzW2ldLnJ2ID0gcmVhZF92ZXJzaW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwcmV2aW91c19kZXBzICE9PSBudWxsKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgZGVwIG9mIHByZXZpb3VzX2RlcHMpIHtcblx0XHRcdFx0XHRkZXAucnYgPSByZWFkX3ZlcnNpb247XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHVudHJhY2tlZF93cml0ZXMgIT09IG51bGwpIHtcblx0XHRcdFx0aWYgKHByZXZpb3VzX3VudHJhY2tlZF93cml0ZXMgPT09IG51bGwpIHtcblx0XHRcdFx0XHRwcmV2aW91c191bnRyYWNrZWRfd3JpdGVzID0gdW50cmFja2VkX3dyaXRlcztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwcmV2aW91c191bnRyYWNrZWRfd3JpdGVzLnB1c2goLi4uLyoqIEB0eXBlIHtTb3VyY2VbXX0gKi8gKHVudHJhY2tlZF93cml0ZXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgocmVhY3Rpb24uZiAmIEVSUk9SX1ZBTFVFKSAhPT0gMCkge1xuXHRcdFx0cmVhY3Rpb24uZiBePSBFUlJPUl9WQUxVRTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBoYW5kbGVfZXJyb3IoZXJyb3IpO1xuXHR9IGZpbmFsbHkge1xuXHRcdHJlYWN0aW9uLmYgXj0gUkVBQ1RJT05fSVNfVVBEQVRJTkc7XG5cdFx0bmV3X2RlcHMgPSBwcmV2aW91c19kZXBzO1xuXHRcdHNraXBwZWRfZGVwcyA9IHByZXZpb3VzX3NraXBwZWRfZGVwcztcblx0XHR1bnRyYWNrZWRfd3JpdGVzID0gcHJldmlvdXNfdW50cmFja2VkX3dyaXRlcztcblx0XHRhY3RpdmVfcmVhY3Rpb24gPSBwcmV2aW91c19yZWFjdGlvbjtcblx0XHRjdXJyZW50X3NvdXJjZXMgPSBwcmV2aW91c19zb3VyY2VzO1xuXHRcdHNldF9jb21wb25lbnRfY29udGV4dChwcmV2aW91c19jb21wb25lbnRfY29udGV4dCk7XG5cdFx0dW50cmFja2luZyA9IHByZXZpb3VzX3VudHJhY2tpbmc7XG5cdFx0dXBkYXRlX3ZlcnNpb24gPSBwcmV2aW91c191cGRhdGVfdmVyc2lvbjtcblx0fVxufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1JlYWN0aW9ufSBzaWduYWxcbiAqIEBwYXJhbSB7VmFsdWU8Vj59IGRlcGVuZGVuY3lcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZW1vdmVfcmVhY3Rpb24oc2lnbmFsLCBkZXBlbmRlbmN5KSB7XG5cdGxldCByZWFjdGlvbnMgPSBkZXBlbmRlbmN5LnJlYWN0aW9ucztcblx0aWYgKHJlYWN0aW9ucyAhPT0gbnVsbCkge1xuXHRcdHZhciBpbmRleCA9IGluZGV4X29mLmNhbGwocmVhY3Rpb25zLCBzaWduYWwpO1xuXHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdHZhciBuZXdfbGVuZ3RoID0gcmVhY3Rpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHRpZiAobmV3X2xlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZWFjdGlvbnMgPSBkZXBlbmRlbmN5LnJlYWN0aW9ucyA9IG51bGw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBTd2FwIHdpdGggbGFzdCBlbGVtZW50IGFuZCB0aGVuIHJlbW92ZS5cblx0XHRcdFx0cmVhY3Rpb25zW2luZGV4XSA9IHJlYWN0aW9uc1tuZXdfbGVuZ3RoXTtcblx0XHRcdFx0cmVhY3Rpb25zLnBvcCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIElmIHRoZSBkZXJpdmVkIGhhcyBubyByZWFjdGlvbnMsIHRoZW4gd2UgY2FuIGRpc2Nvbm5lY3QgaXQgZnJvbSB0aGUgZ3JhcGgsXG5cdC8vIGFsbG93aW5nIGl0IHRvIGVpdGhlciByZWNvbm5lY3QgaW4gdGhlIGZ1dHVyZSwgb3IgYmUgR0MnZCBieSB0aGUgVk0uXG5cdGlmIChcblx0XHRyZWFjdGlvbnMgPT09IG51bGwgJiZcblx0XHQoZGVwZW5kZW5jeS5mICYgREVSSVZFRCkgIT09IDAgJiZcblx0XHQvLyBEZXN0cm95aW5nIGEgY2hpbGQgZWZmZWN0IHdoaWxlIHVwZGF0aW5nIGEgcGFyZW50IGVmZmVjdCBjYW4gY2F1c2UgYSBkZXBlbmRlbmN5IHRvIGFwcGVhclxuXHRcdC8vIHRvIGJlIHVudXNlZCwgd2hlbiBpbiBmYWN0IGl0IGlzIHVzZWQgYnkgdGhlIGN1cnJlbnRseS11cGRhdGluZyBwYXJlbnQuIENoZWNraW5nIGBuZXdfZGVwc2Bcblx0XHQvLyBhbGxvd3MgdXMgdG8gc2tpcCB0aGUgZXhwZW5zaXZlIHdvcmsgb2YgZGlzY29ubmVjdGluZyBhbmQgaW1tZWRpYXRlbHkgcmVjb25uZWN0aW5nIGl0XG5cdFx0KG5ld19kZXBzID09PSBudWxsIHx8ICFpbmNsdWRlcy5jYWxsKG5ld19kZXBzLCBkZXBlbmRlbmN5KSlcblx0KSB7XG5cdFx0dmFyIGRlcml2ZWQgPSAvKiogQHR5cGUge0Rlcml2ZWR9ICovIChkZXBlbmRlbmN5KTtcblxuXHRcdC8vIElmIHdlIGFyZSB3b3JraW5nIHdpdGggYSBkZXJpdmVkIHRoYXQgaXMgb3duZWQgYnkgYW4gZWZmZWN0LCB0aGVuIG1hcmsgaXQgYXMgYmVpbmdcblx0XHQvLyBkaXNjb25uZWN0ZWQgYW5kIHJlbW92ZSB0aGUgbWFyayBmbGFnLCBhcyBpdCBjYW5ub3QgYmUgcmVsaWFibHkgcmVtb3ZlZCBvdGhlcndpc2Vcblx0XHRpZiAoKGRlcml2ZWQuZiAmIENPTk5FQ1RFRCkgIT09IDApIHtcblx0XHRcdGRlcml2ZWQuZiBePSBDT05ORUNURUQ7XG5cdFx0XHRkZXJpdmVkLmYgJj0gfldBU19NQVJLRUQ7XG5cdFx0fVxuXG5cdFx0dXBkYXRlX2Rlcml2ZWRfc3RhdHVzKGRlcml2ZWQpO1xuXG5cdFx0Ly8gZnJlZXplIGFueSBlZmZlY3RzIGluc2lkZSB0aGlzIGRlcml2ZWRcblx0XHRmcmVlemVfZGVyaXZlZF9lZmZlY3RzKGRlcml2ZWQpO1xuXG5cdFx0Ly8gRGlzY29ubmVjdCBhbnkgcmVhY3Rpb25zIG93bmVkIGJ5IHRoaXMgcmVhY3Rpb25cblx0XHRyZW1vdmVfcmVhY3Rpb25zKGRlcml2ZWQsIDApO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWFjdGlvbn0gc2lnbmFsXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRfaW5kZXhcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX3JlYWN0aW9ucyhzaWduYWwsIHN0YXJ0X2luZGV4KSB7XG5cdHZhciBkZXBlbmRlbmNpZXMgPSBzaWduYWwuZGVwcztcblx0aWYgKGRlcGVuZGVuY2llcyA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdGZvciAodmFyIGkgPSBzdGFydF9pbmRleDsgaSA8IGRlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuXHRcdHJlbW92ZV9yZWFjdGlvbihzaWduYWwsIGRlcGVuZGVuY2llc1tpXSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9lZmZlY3QoZWZmZWN0KSB7XG5cdHZhciBmbGFncyA9IGVmZmVjdC5mO1xuXG5cdGlmICgoZmxhZ3MgJiBERVNUUk9ZRUQpICE9PSAwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0c2V0X3NpZ25hbF9zdGF0dXMoZWZmZWN0LCBDTEVBTik7XG5cblx0dmFyIHByZXZpb3VzX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cdHZhciB3YXNfdXBkYXRpbmdfZWZmZWN0ID0gaXNfdXBkYXRpbmdfZWZmZWN0O1xuXG5cdGFjdGl2ZV9lZmZlY3QgPSBlZmZlY3Q7XG5cdGlzX3VwZGF0aW5nX2VmZmVjdCA9IHRydWU7XG5cblx0aWYgKERFVikge1xuXHRcdHZhciBwcmV2aW91c19jb21wb25lbnRfZm4gPSBkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb247XG5cdFx0c2V0X2Rldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbihlZmZlY3QuY29tcG9uZW50X2Z1bmN0aW9uKTtcblx0XHR2YXIgcHJldmlvdXNfc3RhY2sgPSAvKiogQHR5cGUge2FueX0gKi8gKGRldl9zdGFjayk7XG5cdFx0Ly8gb25seSBibG9jayBlZmZlY3RzIGhhdmUgYSBkZXYgc3RhY2ssIGtlZXAgdGhlIGN1cnJlbnQgb25lIG90aGVyd2lzZVxuXHRcdHNldF9kZXZfc3RhY2soZWZmZWN0LmRldl9zdGFjayA/PyBkZXZfc3RhY2spO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRpZiAoKGZsYWdzICYgKEJMT0NLX0VGRkVDVCB8IE1BTkFHRURfRUZGRUNUKSkgIT09IDApIHtcblx0XHRcdGRlc3Ryb3lfYmxvY2tfZWZmZWN0X2NoaWxkcmVuKGVmZmVjdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0X2NoaWxkcmVuKGVmZmVjdCk7XG5cdFx0fVxuXG5cdFx0ZXhlY3V0ZV9lZmZlY3RfdGVhcmRvd24oZWZmZWN0KTtcblx0XHR2YXIgdGVhcmRvd24gPSB1cGRhdGVfcmVhY3Rpb24oZWZmZWN0KTtcblx0XHRlZmZlY3QudGVhcmRvd24gPSB0eXBlb2YgdGVhcmRvd24gPT09ICdmdW5jdGlvbicgPyB0ZWFyZG93biA6IG51bGw7XG5cdFx0ZWZmZWN0Lnd2ID0gd3JpdGVfdmVyc2lvbjtcblxuXHRcdC8vIEluIERFViwgaW5jcmVtZW50IHZlcnNpb25zIG9mIGFueSBzb3VyY2VzIHRoYXQgd2VyZSB3cml0dGVuIHRvIGR1cmluZyB0aGUgZWZmZWN0LFxuXHRcdC8vIHNvIHRoYXQgdGhleSBhcmUgY29ycmVjdGx5IG1hcmtlZCBhcyBkaXJ0eSB3aGVuIHRoZSBlZmZlY3QgcmUtcnVuc1xuXHRcdGlmIChERVYgJiYgdHJhY2luZ19tb2RlX2ZsYWcgJiYgKGVmZmVjdC5mICYgRElSVFkpICE9PSAwICYmIGVmZmVjdC5kZXBzICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBkZXAgb2YgZWZmZWN0LmRlcHMpIHtcblx0XHRcdFx0aWYgKGRlcC5zZXRfZHVyaW5nX2VmZmVjdCkge1xuXHRcdFx0XHRcdGRlcC53diA9IGluY3JlbWVudF93cml0ZV92ZXJzaW9uKCk7XG5cdFx0XHRcdFx0ZGVwLnNldF9kdXJpbmdfZWZmZWN0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZmluYWxseSB7XG5cdFx0aXNfdXBkYXRpbmdfZWZmZWN0ID0gd2FzX3VwZGF0aW5nX2VmZmVjdDtcblx0XHRhY3RpdmVfZWZmZWN0ID0gcHJldmlvdXNfZWZmZWN0O1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0c2V0X2Rldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbihwcmV2aW91c19jb21wb25lbnRfZm4pO1xuXHRcdFx0c2V0X2Rldl9zdGFjayhwcmV2aW91c19zdGFjayk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGFueSBwZW5kaW5nIHN0YXRlIGNoYW5nZXMgaGF2ZSBiZWVuIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRpY2soKSB7XG5cdGlmIChhc3luY19tb2RlX2ZsYWcpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKGYpID0+IHtcblx0XHRcdC8vIFJhY2UgdGhlbSBhZ2FpbnN0IGVhY2ggb3RoZXIgLSBpbiBhbG1vc3QgYWxsIGNhc2VzIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aWxsIGZpcmUgZmlyc3QsXG5cdFx0XHQvLyBidXQgZS5nLiBpbiBjYXNlIHRoZSB3aW5kb3cgaXMgbm90IGZvY3VzZWQgb3IgYSB2aWV3IHRyYW5zaXRpb24gaGFwcGVucywgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0XHQvLyB3aWxsIGJlIGRlbGF5ZWQgYW5kIHNldFRpbWVvdXQgaGVscHMgdXMgcmVzb2x2ZSBmYXN0IGVub3VnaCBpbiB0aGF0IGNhc2Vcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBmKCkpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBmKCkpO1xuXHRcdH0pO1xuXHR9XG5cblx0YXdhaXQgUHJvbWlzZS5yZXNvbHZlKCk7XG5cblx0Ly8gQnkgY2FsbGluZyBmbHVzaFN5bmMgd2UgZ3VhcmFudGVlIHRoYXQgYW55IHBlbmRpbmcgc3RhdGUgY2hhbmdlcyBhcmUgYXBwbGllZCBhZnRlciBvbmUgdGljay5cblx0Ly8gVE9ETyBsb29rIGludG8gd2hldGhlciB3ZSBjYW4gbWFrZSBmbHVzaGluZyBzdWJzZXF1ZW50IHVwZGF0ZXMgc3luY2hyb25vdXNseSBpbiB0aGUgZnV0dXJlLlxuXHRmbHVzaFN5bmMoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgYW55IHN0YXRlIGNoYW5nZXMsIGFuZCBhc3luY2hyb25vdXMgd29yayByZXN1bHRpbmcgZnJvbSB0aGVtLFxuICogaGF2ZSByZXNvbHZlZCBhbmQgdGhlIERPTSBoYXMgYmVlbiB1cGRhdGVkXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqIEBzaW5jZSA1LjM2XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR0bGVkKCkge1xuXHRyZXR1cm4gQmF0Y2guZW5zdXJlKCkuc2V0dGxlZCgpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1ZhbHVlPFY+fSBzaWduYWxcbiAqIEByZXR1cm5zIHtWfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHNpZ25hbCkge1xuXHR2YXIgZmxhZ3MgPSBzaWduYWwuZjtcblx0dmFyIGlzX2Rlcml2ZWQgPSAoZmxhZ3MgJiBERVJJVkVEKSAhPT0gMDtcblxuXHRjYXB0dXJlZF9zaWduYWxzPy5hZGQoc2lnbmFsKTtcblxuXHQvLyBSZWdpc3RlciB0aGUgZGVwZW5kZW5jeSBvbiB0aGUgY3VycmVudCByZWFjdGlvbiBzaWduYWwuXG5cdGlmIChhY3RpdmVfcmVhY3Rpb24gIT09IG51bGwgJiYgIXVudHJhY2tpbmcpIHtcblx0XHQvLyBpZiB3ZSdyZSBpbiBhIGRlcml2ZWQgdGhhdCBpcyBiZWluZyByZWFkIGluc2lkZSBhbiBfYXN5bmNfIGRlcml2ZWQsXG5cdFx0Ly8gaXQncyBwb3NzaWJsZSB0aGF0IHRoZSBlZmZlY3Qgd2FzIGFscmVhZHkgZGVzdHJveWVkLiBJbiB0aGlzIGNhc2UsXG5cdFx0Ly8gd2UgZG9uJ3QgYWRkIHRoZSBkZXBlbmRlbmN5LCBiZWNhdXNlIHRoYXQgd291bGQgY3JlYXRlIGEgbWVtb3J5IGxlYWtcblx0XHR2YXIgZGVzdHJveWVkID0gYWN0aXZlX2VmZmVjdCAhPT0gbnVsbCAmJiAoYWN0aXZlX2VmZmVjdC5mICYgREVTVFJPWUVEKSAhPT0gMDtcblxuXHRcdGlmICghZGVzdHJveWVkICYmIChjdXJyZW50X3NvdXJjZXMgPT09IG51bGwgfHwgIWluY2x1ZGVzLmNhbGwoY3VycmVudF9zb3VyY2VzLCBzaWduYWwpKSkge1xuXHRcdFx0dmFyIGRlcHMgPSBhY3RpdmVfcmVhY3Rpb24uZGVwcztcblxuXHRcdFx0aWYgKChhY3RpdmVfcmVhY3Rpb24uZiAmIFJFQUNUSU9OX0lTX1VQREFUSU5HKSAhPT0gMCkge1xuXHRcdFx0XHQvLyB3ZSdyZSBpbiB0aGUgZWZmZWN0IGluaXQvdXBkYXRlIGN5Y2xlXG5cdFx0XHRcdGlmIChzaWduYWwucnYgPCByZWFkX3ZlcnNpb24pIHtcblx0XHRcdFx0XHRzaWduYWwucnYgPSByZWFkX3ZlcnNpb247XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgc2lnbmFsIGlzIGFjY2Vzc2luZyB0aGUgc2FtZSBkZXBlbmRlbmNpZXMgaW4gdGhlIHNhbWVcblx0XHRcdFx0XHQvLyBvcmRlciBhcyBpdCBkaWQgbGFzdCB0aW1lLCBpbmNyZW1lbnQgYHNraXBwZWRfZGVwc2Bcblx0XHRcdFx0XHQvLyByYXRoZXIgdGhhbiB1cGRhdGluZyBgbmV3X2RlcHNgLCB3aGljaCBjcmVhdGVzIEdDIGNvc3Rcblx0XHRcdFx0XHRpZiAobmV3X2RlcHMgPT09IG51bGwgJiYgZGVwcyAhPT0gbnVsbCAmJiBkZXBzW3NraXBwZWRfZGVwc10gPT09IHNpZ25hbCkge1xuXHRcdFx0XHRcdFx0c2tpcHBlZF9kZXBzKys7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChuZXdfZGVwcyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0bmV3X2RlcHMgPSBbc2lnbmFsXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bmV3X2RlcHMucHVzaChzaWduYWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gd2UncmUgYWRkaW5nIGEgZGVwZW5kZW5jeSBvdXRzaWRlIHRoZSBpbml0L3VwZGF0ZSBjeWNsZVxuXHRcdFx0XHQvLyAoaS5lLiBhZnRlciBhbiBgYXdhaXRgKVxuXHRcdFx0XHQoYWN0aXZlX3JlYWN0aW9uLmRlcHMgPz89IFtdKS5wdXNoKHNpZ25hbCk7XG5cblx0XHRcdFx0dmFyIHJlYWN0aW9ucyA9IHNpZ25hbC5yZWFjdGlvbnM7XG5cblx0XHRcdFx0aWYgKHJlYWN0aW9ucyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHNpZ25hbC5yZWFjdGlvbnMgPSBbYWN0aXZlX3JlYWN0aW9uXTtcblx0XHRcdFx0fSBlbHNlIGlmICghaW5jbHVkZXMuY2FsbChyZWFjdGlvbnMsIGFjdGl2ZV9yZWFjdGlvbikpIHtcblx0XHRcdFx0XHRyZWFjdGlvbnMucHVzaChhY3RpdmVfcmVhY3Rpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKERFVikge1xuXHRcdC8vIFRPRE8gcmVpbnN0YXRlIHRoaXMsIGJ1dCBtYWtlIGl0IGFjdHVhbGx5IHdvcmtcblx0XHQvLyBpZiAoY3VycmVudF9hc3luY19lZmZlY3QpIHtcblx0XHQvLyBcdHZhciB0cmFja2luZyA9IChjdXJyZW50X2FzeW5jX2VmZmVjdC5mICYgUkVBQ1RJT05fSVNfVVBEQVRJTkcpICE9PSAwO1xuXHRcdC8vIFx0dmFyIHdhc19yZWFkID0gY3VycmVudF9hc3luY19lZmZlY3QuZGVwcz8uaW5jbHVkZXMoc2lnbmFsKTtcblxuXHRcdC8vIFx0aWYgKCF0cmFja2luZyAmJiAhdW50cmFja2luZyAmJiAhd2FzX3JlYWQpIHtcblx0XHQvLyBcdFx0dy5hd2FpdF9yZWFjdGl2aXR5X2xvc3MoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChzaWduYWwubGFiZWwpKTtcblxuXHRcdC8vIFx0XHR2YXIgdHJhY2UgPSBnZXRfZXJyb3IoJ3RyYWNlZCBhdCcpO1xuXHRcdC8vIFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdC8vIFx0XHRpZiAodHJhY2UpIGNvbnNvbGUud2Fybih0cmFjZSk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXG5cdFx0cmVjZW50X2FzeW5jX2Rlcml2ZWRzLmRlbGV0ZShzaWduYWwpO1xuXG5cdFx0aWYgKFxuXHRcdFx0dHJhY2luZ19tb2RlX2ZsYWcgJiZcblx0XHRcdCF1bnRyYWNraW5nICYmXG5cdFx0XHR0cmFjaW5nX2V4cHJlc3Npb25zICE9PSBudWxsICYmXG5cdFx0XHRhY3RpdmVfcmVhY3Rpb24gIT09IG51bGwgJiZcblx0XHRcdHRyYWNpbmdfZXhwcmVzc2lvbnMucmVhY3Rpb24gPT09IGFjdGl2ZV9yZWFjdGlvblxuXHRcdCkge1xuXHRcdFx0Ly8gVXNlZCB3aGVuIG1hcHBpbmcgc3RhdGUgYmV0d2VlbiBzcGVjaWFsIGJsb2NrcyBsaWtlIGBlYWNoYFxuXHRcdFx0aWYgKHNpZ25hbC50cmFjZSkge1xuXHRcdFx0XHRzaWduYWwudHJhY2UoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciB0cmFjZSA9IGdldF9lcnJvcigndHJhY2VkIGF0Jyk7XG5cblx0XHRcdFx0aWYgKHRyYWNlKSB7XG5cdFx0XHRcdFx0dmFyIGVudHJ5ID0gdHJhY2luZ19leHByZXNzaW9ucy5lbnRyaWVzLmdldChzaWduYWwpO1xuXG5cdFx0XHRcdFx0aWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGVudHJ5ID0geyB0cmFjZXM6IFtdIH07XG5cdFx0XHRcdFx0XHR0cmFjaW5nX2V4cHJlc3Npb25zLmVudHJpZXMuc2V0KHNpZ25hbCwgZW50cnkpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBsYXN0ID0gZW50cnkudHJhY2VzW2VudHJ5LnRyYWNlcy5sZW5ndGggLSAxXTtcblxuXHRcdFx0XHRcdC8vIHRyYWNlcyBjYW4gYmUgZHVwbGljYXRlZCwgZS5nLiBieSBgc25hcHNob3RgIGludm9raW5nIGJvdGhcblx0XHRcdFx0XHQvLyBib3RoIGBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIGFuZCBgZ2V0YCB0cmFwcyBhdCBvbmNlXG5cdFx0XHRcdFx0aWYgKHRyYWNlLnN0YWNrICE9PSBsYXN0Py5zdGFjaykge1xuXHRcdFx0XHRcdFx0ZW50cnkudHJhY2VzLnB1c2godHJhY2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChpc19kZXN0cm95aW5nX2VmZmVjdCAmJiBvbGRfdmFsdWVzLmhhcyhzaWduYWwpKSB7XG5cdFx0cmV0dXJuIG9sZF92YWx1ZXMuZ2V0KHNpZ25hbCk7XG5cdH1cblxuXHRpZiAoaXNfZGVyaXZlZCkge1xuXHRcdHZhciBkZXJpdmVkID0gLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoc2lnbmFsKTtcblxuXHRcdGlmIChpc19kZXN0cm95aW5nX2VmZmVjdCkge1xuXHRcdFx0dmFyIHZhbHVlID0gZGVyaXZlZC52O1xuXG5cdFx0XHQvLyBpZiB0aGUgZGVyaXZlZCBpcyBkaXJ0eSBhbmQgaGFzIHJlYWN0aW9ucywgb3IgZGVwZW5kcyBvbiB0aGUgdmFsdWVzIHRoYXQganVzdCBjaGFuZ2VkLCByZS1leGVjdXRlXG5cdFx0XHQvLyAoYSBkZXJpdmVkIGNhbiBiZSBtYXliZV9kaXJ0eSBkdWUgdG8gdGhlIGVmZmVjdCBkZXN0cm95IHJlbW92aW5nIGl0cyBsYXN0IHJlYWN0aW9uKVxuXHRcdFx0aWYgKFxuXHRcdFx0XHQoKGRlcml2ZWQuZiAmIENMRUFOKSA9PT0gMCAmJiBkZXJpdmVkLnJlYWN0aW9ucyAhPT0gbnVsbCkgfHxcblx0XHRcdFx0ZGVwZW5kc19vbl9vbGRfdmFsdWVzKGRlcml2ZWQpXG5cdFx0XHQpIHtcblx0XHRcdFx0dmFsdWUgPSBleGVjdXRlX2Rlcml2ZWQoZGVyaXZlZCk7XG5cdFx0XHR9XG5cblx0XHRcdG9sZF92YWx1ZXMuc2V0KGRlcml2ZWQsIHZhbHVlKTtcblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdC8vIGNvbm5lY3QgZGlzY29ubmVjdGVkIGRlcml2ZWRzIGlmIHdlIGFyZSByZWFkaW5nIHRoZW0gaW5zaWRlIGFuIGVmZmVjdCxcblx0XHQvLyBvciBpbnNpZGUgYW5vdGhlciBkZXJpdmVkIHRoYXQgaXMgYWxyZWFkeSBjb25uZWN0ZWRcblx0XHR2YXIgc2hvdWxkX2Nvbm5lY3QgPVxuXHRcdFx0KGRlcml2ZWQuZiAmIENPTk5FQ1RFRCkgPT09IDAgJiZcblx0XHRcdCF1bnRyYWNraW5nICYmXG5cdFx0XHRhY3RpdmVfcmVhY3Rpb24gIT09IG51bGwgJiZcblx0XHRcdChpc191cGRhdGluZ19lZmZlY3QgfHwgKGFjdGl2ZV9yZWFjdGlvbi5mICYgQ09OTkVDVEVEKSAhPT0gMCk7XG5cblx0XHR2YXIgaXNfbmV3ID0gKGRlcml2ZWQuZiAmIFJFQUNUSU9OX1JBTikgPT09IDA7XG5cblx0XHRpZiAoaXNfZGlydHkoZGVyaXZlZCkpIHtcblx0XHRcdGlmIChzaG91bGRfY29ubmVjdCkge1xuXHRcdFx0XHQvLyBzZXQgdGhlIGZsYWcgYmVmb3JlIGB1cGRhdGVfZGVyaXZlZGAsIHNvIHRoYXQgdGhlIGRlcml2ZWRcblx0XHRcdFx0Ly8gaXMgYWRkZWQgYXMgYSByZWFjdGlvbiB0byBpdHMgZGVwZW5kZW5jaWVzXG5cdFx0XHRcdGRlcml2ZWQuZiB8PSBDT05ORUNURUQ7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZV9kZXJpdmVkKGRlcml2ZWQpO1xuXHRcdH1cblxuXHRcdGlmIChzaG91bGRfY29ubmVjdCAmJiAhaXNfbmV3KSB7XG5cdFx0XHR1bmZyZWV6ZV9kZXJpdmVkX2VmZmVjdHMoZGVyaXZlZCk7XG5cdFx0XHRyZWNvbm5lY3QoZGVyaXZlZCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGJhdGNoX3ZhbHVlcz8uaGFzKHNpZ25hbCkpIHtcblx0XHRyZXR1cm4gYmF0Y2hfdmFsdWVzLmdldChzaWduYWwpO1xuXHR9XG5cblx0aWYgKChzaWduYWwuZiAmIEVSUk9SX1ZBTFVFKSAhPT0gMCkge1xuXHRcdHRocm93IHNpZ25hbC52O1xuXHR9XG5cblx0cmV0dXJuIHNpZ25hbC52O1xufVxuXG4vKipcbiAqIChSZSljb25uZWN0IGEgZGlzY29ubmVjdGVkIGRlcml2ZWQsIHNvIHRoYXQgaXQgaXMgbm90aWZpZWRcbiAqIG9mIGNoYW5nZXMgaW4gYG1hcmtfcmVhY3Rpb25zYFxuICogQHBhcmFtIHtEZXJpdmVkfSBkZXJpdmVkXG4gKi9cbmZ1bmN0aW9uIHJlY29ubmVjdChkZXJpdmVkKSB7XG5cdGRlcml2ZWQuZiB8PSBDT05ORUNURUQ7XG5cblx0aWYgKGRlcml2ZWQuZGVwcyA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdGZvciAoY29uc3QgZGVwIG9mIGRlcml2ZWQuZGVwcykge1xuXHRcdChkZXAucmVhY3Rpb25zID8/PSBbXSkucHVzaChkZXJpdmVkKTtcblxuXHRcdGlmICgoZGVwLmYgJiBERVJJVkVEKSAhPT0gMCAmJiAoZGVwLmYgJiBDT05ORUNURUQpID09PSAwKSB7XG5cdFx0XHR1bmZyZWV6ZV9kZXJpdmVkX2VmZmVjdHMoLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoZGVwKSk7XG5cdFx0XHRyZWNvbm5lY3QoLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoZGVwKSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWQgKi9cbmZ1bmN0aW9uIGRlcGVuZHNfb25fb2xkX3ZhbHVlcyhkZXJpdmVkKSB7XG5cdGlmIChkZXJpdmVkLnYgPT09IFVOSU5JVElBTElaRUQpIHJldHVybiB0cnVlOyAvLyB3ZSBkb24ndCBrbm93LCBzbyBhc3N1bWUgdGhlIHdvcnN0XG5cdGlmIChkZXJpdmVkLmRlcHMgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuXHRmb3IgKGNvbnN0IGRlcCBvZiBkZXJpdmVkLmRlcHMpIHtcblx0XHRpZiAob2xkX3ZhbHVlcy5oYXMoZGVwKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKChkZXAuZiAmIERFUklWRUQpICE9PSAwICYmIGRlcGVuZHNfb25fb2xkX3ZhbHVlcygvKiogQHR5cGUge0Rlcml2ZWR9ICovIChkZXApKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIExpa2UgYGdldGAsIGJ1dCBjaGVja3MgZm9yIGB1bmRlZmluZWRgLiBVc2VkIGZvciBgdmFyYCBkZWNsYXJhdGlvbnMgYmVjYXVzZSB0aGV5IGNhbiBiZSBhY2Nlc3NlZCBiZWZvcmUgYmVpbmcgZGVjbGFyZWRcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1ZhbHVlPFY+IHwgdW5kZWZpbmVkfSBzaWduYWxcbiAqIEByZXR1cm5zIHtWIHwgdW5kZWZpbmVkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FmZV9nZXQoc2lnbmFsKSB7XG5cdHJldHVybiBzaWduYWwgJiYgZ2V0KHNpZ25hbCk7XG59XG5cbi8qKlxuICogV2hlbiB1c2VkIGluc2lkZSBhIFtgJGRlcml2ZWRgXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGRlcml2ZWQpIG9yIFtgJGVmZmVjdGBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS8kZWZmZWN0KSxcbiAqIGFueSBzdGF0ZSByZWFkIGluc2lkZSBgZm5gIHdpbGwgbm90IGJlIHRyZWF0ZWQgYXMgYSBkZXBlbmRlbmN5LlxuICpcbiAqIGBgYHRzXG4gKiAkZWZmZWN0KCgpID0+IHtcbiAqICAgLy8gdGhpcyB3aWxsIHJ1biB3aGVuIGBkYXRhYCBjaGFuZ2VzLCBidXQgbm90IHdoZW4gYHRpbWVgIGNoYW5nZXNcbiAqICAgc2F2ZShkYXRhLCB7XG4gKiAgICAgdGltZXN0YW1wOiB1bnRyYWNrKCgpID0+IHRpbWUpXG4gKiAgIH0pO1xuICogfSk7XG4gKiBgYGBcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0geygpID0+IFR9IGZuXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVudHJhY2soZm4pIHtcblx0dmFyIHByZXZpb3VzX3VudHJhY2tpbmcgPSB1bnRyYWNraW5nO1xuXHR0cnkge1xuXHRcdHVudHJhY2tpbmcgPSB0cnVlO1xuXHRcdHJldHVybiBmbigpO1xuXHR9IGZpbmFsbHkge1xuXHRcdHVudHJhY2tpbmcgPSBwcmV2aW91c191bnRyYWNraW5nO1xuXHR9XG59XG5cbi8qKlxuICogUG9zc2libHkgdHJhdmVyc2UgYW4gb2JqZWN0IGFuZCByZWFkIGFsbCBpdHMgcHJvcGVydGllcyBzbyB0aGF0IHRoZXkncmUgYWxsIHJlYWN0aXZlIGluIGNhc2UgdGhpcyBpcyBgJHN0YXRlYC5cbiAqIERvZXMgb25seSBjaGVjayBmaXJzdCBsZXZlbCBvZiBhbiBvYmplY3QgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgKGhldXJpc3RpYyBzaG91bGQgYmUgZ29vZCBmb3IgOTklIG9mIGFsbCBjYXNlcykuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcF9yZWFkX3N0YXRlKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8ICF2YWx1ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEV2ZW50VGFyZ2V0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKFNUQVRFX1NZTUJPTCBpbiB2YWx1ZSkge1xuXHRcdGRlZXBfcmVhZCh2YWx1ZSk7XG5cdH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0Zm9yIChsZXQga2V5IGluIHZhbHVlKSB7XG5cdFx0XHRjb25zdCBwcm9wID0gdmFsdWVba2V5XTtcblx0XHRcdGlmICh0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcgJiYgcHJvcCAmJiBTVEFURV9TWU1CT0wgaW4gcHJvcCkge1xuXHRcdFx0XHRkZWVwX3JlYWQocHJvcCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRGVlcGx5IHRyYXZlcnNlIGFuIG9iamVjdCBhbmQgcmVhZCBhbGwgaXRzIHByb3BlcnRpZXNcbiAqIHNvIHRoYXQgdGhleSdyZSBhbGwgcmVhY3RpdmUgaW4gY2FzZSB0aGlzIGlzIGAkc3RhdGVgXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7U2V0PGFueT59IHZpc2l0ZWRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcF9yZWFkKHZhbHVlLCB2aXNpdGVkID0gbmV3IFNldCgpKSB7XG5cdGlmIChcblx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0dmFsdWUgIT09IG51bGwgJiZcblx0XHQvLyBXZSBkb24ndCB3YW50IHRvIHRyYXZlcnNlIERPTSBlbGVtZW50c1xuXHRcdCEodmFsdWUgaW5zdGFuY2VvZiBFdmVudFRhcmdldCkgJiZcblx0XHQhdmlzaXRlZC5oYXModmFsdWUpXG5cdCkge1xuXHRcdHZpc2l0ZWQuYWRkKHZhbHVlKTtcblx0XHQvLyBXaGVuIHdvcmtpbmcgd2l0aCBhIHBvc3NpYmxlIFN2ZWx0ZURhdGUsIHRoaXNcblx0XHQvLyB3aWxsIGVuc3VyZSB3ZSBjYXB0dXJlIGNoYW5nZXMgdG8gaXQuXG5cdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdFx0dmFsdWUuZ2V0VGltZSgpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBrZXkgaW4gdmFsdWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRlZXBfcmVhZCh2YWx1ZVtrZXldLCB2aXNpdGVkKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gY29udGludWVcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3QgcHJvdG8gPSBnZXRfcHJvdG90eXBlX29mKHZhbHVlKTtcblx0XHRpZiAoXG5cdFx0XHRwcm90byAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJlxuXHRcdFx0cHJvdG8gIT09IEFycmF5LnByb3RvdHlwZSAmJlxuXHRcdFx0cHJvdG8gIT09IE1hcC5wcm90b3R5cGUgJiZcblx0XHRcdHByb3RvICE9PSBTZXQucHJvdG90eXBlICYmXG5cdFx0XHRwcm90byAhPT0gRGF0ZS5wcm90b3R5cGVcblx0XHQpIHtcblx0XHRcdGNvbnN0IGRlc2NyaXB0b3JzID0gZ2V0X2Rlc2NyaXB0b3JzKHByb3RvKTtcblx0XHRcdGZvciAobGV0IGtleSBpbiBkZXNjcmlwdG9ycykge1xuXHRcdFx0XHRjb25zdCBnZXQgPSBkZXNjcmlwdG9yc1trZXldLmdldDtcblx0XHRcdFx0aWYgKGdldCkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRnZXQuY2FsbCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0Ly8gY29udGludWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImNvbnN0IHJlZ2V4X3JldHVybl9jaGFyYWN0ZXJzID0gL1xcci9nO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoKHN0cikge1xuXHRzdHIgPSBzdHIucmVwbGFjZShyZWdleF9yZXR1cm5fY2hhcmFjdGVycywgJycpO1xuXHRsZXQgaGFzaCA9IDUzODE7XG5cdGxldCBpID0gc3RyLmxlbmd0aDtcblxuXHR3aGlsZSAoaS0tKSBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcblx0cmV0dXJuIChoYXNoID4+PiAwKS50b1N0cmluZygzNik7XG59XG5cbmNvbnN0IFZPSURfRUxFTUVOVF9OQU1FUyA9IFtcblx0J2FyZWEnLFxuXHQnYmFzZScsXG5cdCdicicsXG5cdCdjb2wnLFxuXHQnY29tbWFuZCcsXG5cdCdlbWJlZCcsXG5cdCdocicsXG5cdCdpbWcnLFxuXHQnaW5wdXQnLFxuXHQna2V5Z2VuJyxcblx0J2xpbmsnLFxuXHQnbWV0YScsXG5cdCdwYXJhbScsXG5cdCdzb3VyY2UnLFxuXHQndHJhY2snLFxuXHQnd2JyJ1xuXTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBgbmFtZWAgaXMgb2YgYSB2b2lkIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc192b2lkKG5hbWUpIHtcblx0cmV0dXJuIFZPSURfRUxFTUVOVF9OQU1FUy5pbmNsdWRlcyhuYW1lKSB8fCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09ICchZG9jdHlwZSc7XG59XG5cbmNvbnN0IFJFU0VSVkVEX1dPUkRTID0gW1xuXHQnYXJndW1lbnRzJyxcblx0J2F3YWl0Jyxcblx0J2JyZWFrJyxcblx0J2Nhc2UnLFxuXHQnY2F0Y2gnLFxuXHQnY2xhc3MnLFxuXHQnY29uc3QnLFxuXHQnY29udGludWUnLFxuXHQnZGVidWdnZXInLFxuXHQnZGVmYXVsdCcsXG5cdCdkZWxldGUnLFxuXHQnZG8nLFxuXHQnZWxzZScsXG5cdCdlbnVtJyxcblx0J2V2YWwnLFxuXHQnZXhwb3J0Jyxcblx0J2V4dGVuZHMnLFxuXHQnZmFsc2UnLFxuXHQnZmluYWxseScsXG5cdCdmb3InLFxuXHQnZnVuY3Rpb24nLFxuXHQnaWYnLFxuXHQnaW1wbGVtZW50cycsXG5cdCdpbXBvcnQnLFxuXHQnaW4nLFxuXHQnaW5zdGFuY2VvZicsXG5cdCdpbnRlcmZhY2UnLFxuXHQnbGV0Jyxcblx0J25ldycsXG5cdCdudWxsJyxcblx0J3BhY2thZ2UnLFxuXHQncHJpdmF0ZScsXG5cdCdwcm90ZWN0ZWQnLFxuXHQncHVibGljJyxcblx0J3JldHVybicsXG5cdCdzdGF0aWMnLFxuXHQnc3VwZXInLFxuXHQnc3dpdGNoJyxcblx0J3RoaXMnLFxuXHQndGhyb3cnLFxuXHQndHJ1ZScsXG5cdCd0cnknLFxuXHQndHlwZW9mJyxcblx0J3ZhcicsXG5cdCd2b2lkJyxcblx0J3doaWxlJyxcblx0J3dpdGgnLFxuXHQneWllbGQnXG5dO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGB3b3JkYCBpcyBhIHJlc2VydmVkIEphdmFTY3JpcHQga2V5d29yZFxuICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3Jlc2VydmVkKHdvcmQpIHtcblx0cmV0dXJuIFJFU0VSVkVEX1dPUkRTLmluY2x1ZGVzKHdvcmQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19jYXB0dXJlX2V2ZW50KG5hbWUpIHtcblx0cmV0dXJuIG5hbWUuZW5kc1dpdGgoJ2NhcHR1cmUnKSAmJiBuYW1lICE9PSAnZ290cG9pbnRlcmNhcHR1cmUnICYmIG5hbWUgIT09ICdsb3N0cG9pbnRlcmNhcHR1cmUnO1xufVxuXG4vKiogTGlzdCBvZiBFbGVtZW50IGV2ZW50cyB0aGF0IHdpbGwgYmUgZGVsZWdhdGVkICovXG5jb25zdCBERUxFR0FURURfRVZFTlRTID0gW1xuXHQnYmVmb3JlaW5wdXQnLFxuXHQnY2xpY2snLFxuXHQnY2hhbmdlJyxcblx0J2RibGNsaWNrJyxcblx0J2NvbnRleHRtZW51Jyxcblx0J2ZvY3VzaW4nLFxuXHQnZm9jdXNvdXQnLFxuXHQnaW5wdXQnLFxuXHQna2V5ZG93bicsXG5cdCdrZXl1cCcsXG5cdCdtb3VzZWRvd24nLFxuXHQnbW91c2Vtb3ZlJyxcblx0J21vdXNlb3V0Jyxcblx0J21vdXNlb3ZlcicsXG5cdCdtb3VzZXVwJyxcblx0J3BvaW50ZXJkb3duJyxcblx0J3BvaW50ZXJtb3ZlJyxcblx0J3BvaW50ZXJvdXQnLFxuXHQncG9pbnRlcm92ZXInLFxuXHQncG9pbnRlcnVwJyxcblx0J3RvdWNoZW5kJyxcblx0J3RvdWNobW92ZScsXG5cdCd0b3VjaHN0YXJ0J1xuXTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBgZXZlbnRfbmFtZWAgaXMgYSBkZWxlZ2F0ZWQgZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9uYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5fZGVsZWdhdGVfZXZlbnQoZXZlbnRfbmFtZSkge1xuXHRyZXR1cm4gREVMRUdBVEVEX0VWRU5UUy5pbmNsdWRlcyhldmVudF9uYW1lKTtcbn1cblxuLyoqXG4gKiBBdHRyaWJ1dGVzIHRoYXQgYXJlIGJvb2xlYW4sIGkuZS4gdGhleSBhcmUgcHJlc2VudCBvciBub3QgcHJlc2VudC5cbiAqL1xuY29uc3QgRE9NX0JPT0xFQU5fQVRUUklCVVRFUyA9IFtcblx0J2FsbG93ZnVsbHNjcmVlbicsXG5cdCdhc3luYycsXG5cdCdhdXRvZm9jdXMnLFxuXHQnYXV0b3BsYXknLFxuXHQnY2hlY2tlZCcsXG5cdCdjb250cm9scycsXG5cdCdkZWZhdWx0Jyxcblx0J2Rpc2FibGVkJyxcblx0J2Zvcm1ub3ZhbGlkYXRlJyxcblx0J2luZGV0ZXJtaW5hdGUnLFxuXHQnaW5lcnQnLFxuXHQnaXNtYXAnLFxuXHQnbG9vcCcsXG5cdCdtdWx0aXBsZScsXG5cdCdtdXRlZCcsXG5cdCdub21vZHVsZScsXG5cdCdub3ZhbGlkYXRlJyxcblx0J29wZW4nLFxuXHQncGxheXNpbmxpbmUnLFxuXHQncmVhZG9ubHknLFxuXHQncmVxdWlyZWQnLFxuXHQncmV2ZXJzZWQnLFxuXHQnc2VhbWxlc3MnLFxuXHQnc2VsZWN0ZWQnLFxuXHQnd2Via2l0ZGlyZWN0b3J5Jyxcblx0J2RlZmVyJyxcblx0J2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJyxcblx0J2Rpc2FibGVyZW1vdGVwbGF5YmFjaydcbl07XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYG5hbWVgIGlzIGEgYm9vbGVhbiBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19ib29sZWFuX2F0dHJpYnV0ZShuYW1lKSB7XG5cdHJldHVybiBET01fQk9PTEVBTl9BVFRSSUJVVEVTLmluY2x1ZGVzKG5hbWUpO1xufVxuXG4vKipcbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fVxuICogTGlzdCBvZiBhdHRyaWJ1dGUgbmFtZXMgdGhhdCBzaG91bGQgYmUgYWxpYXNlZCB0byB0aGVpciBwcm9wZXJ0eSBuYW1lc1xuICogYmVjYXVzZSB0aGV5IGJlaGF2ZSBkaWZmZXJlbnRseSBiZXR3ZWVuIHNldHRpbmcgdGhlbSBhcyBhbiBhdHRyaWJ1dGUgYW5kXG4gKiBzZXR0aW5nIHRoZW0gYXMgYSBwcm9wZXJ0eS5cbiAqL1xuY29uc3QgQVRUUklCVVRFX0FMSUFTRVMgPSB7XG5cdC8vIG5vIGBjbGFzczogJ2NsYXNzTmFtZSdgIGJlY2F1c2Ugd2UgaGFuZGxlIHRoYXQgc2VwYXJhdGVseVxuXHRmb3Jtbm92YWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcblx0aXNtYXA6ICdpc01hcCcsXG5cdG5vbW9kdWxlOiAnbm9Nb2R1bGUnLFxuXHRwbGF5c2lubGluZTogJ3BsYXlzSW5saW5lJyxcblx0cmVhZG9ubHk6ICdyZWFkT25seScsXG5cdGRlZmF1bHR2YWx1ZTogJ2RlZmF1bHRWYWx1ZScsXG5cdGRlZmF1bHRjaGVja2VkOiAnZGVmYXVsdENoZWNrZWQnLFxuXHRzcmNvYmplY3Q6ICdzcmNPYmplY3QnLFxuXHRub3ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG5cdGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbHNjcmVlbicsXG5cdGRpc2FibGVwaWN0dXJlaW5waWN0dXJlOiAnZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUnLFxuXHRkaXNhYmxlcmVtb3RlcGxheWJhY2s6ICdkaXNhYmxlUmVtb3RlUGxheWJhY2snXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVfYXR0cmlidXRlKG5hbWUpIHtcblx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0cmV0dXJuIEFUVFJJQlVURV9BTElBU0VTW25hbWVdID8/IG5hbWU7XG59XG5cbmNvbnN0IERPTV9QUk9QRVJUSUVTID0gW1xuXHQuLi5ET01fQk9PTEVBTl9BVFRSSUJVVEVTLFxuXHQnZm9ybU5vVmFsaWRhdGUnLFxuXHQnaXNNYXAnLFxuXHQnbm9Nb2R1bGUnLFxuXHQncGxheXNJbmxpbmUnLFxuXHQncmVhZE9ubHknLFxuXHQndmFsdWUnLFxuXHQndm9sdW1lJyxcblx0J2RlZmF1bHRWYWx1ZScsXG5cdCdkZWZhdWx0Q2hlY2tlZCcsXG5cdCdzcmNPYmplY3QnLFxuXHQnbm9WYWxpZGF0ZScsXG5cdCdhbGxvd0Z1bGxzY3JlZW4nLFxuXHQnZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUnLFxuXHQnZGlzYWJsZVJlbW90ZVBsYXliYWNrJ1xuXTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfZG9tX3Byb3BlcnR5KG5hbWUpIHtcblx0cmV0dXJuIERPTV9QUk9QRVJUSUVTLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBOT05fU1RBVElDX1BST1BFUlRJRVMgPSBbJ2F1dG9mb2N1cycsICdtdXRlZCcsICdkZWZhdWx0VmFsdWUnLCAnZGVmYXVsdENoZWNrZWQnXTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gYXR0cmlidXRlIGNhbm5vdCBiZSBzZXQgdGhyb3VnaCB0aGUgdGVtcGxhdGVcbiAqIHN0cmluZywgaS5lLiBuZWVkcyBzb21lIGtpbmQgb2YgSmF2YVNjcmlwdCBoYW5kbGluZyB0byB3b3JrLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbm5vdF9iZV9zZXRfc3RhdGljYWxseShuYW1lKSB7XG5cdHJldHVybiBOT05fU1RBVElDX1BST1BFUlRJRVMuaW5jbHVkZXMobmFtZSk7XG59XG5cbi8qKlxuICogU3Vic2V0IG9mIGRlbGVnYXRlZCBldmVudHMgd2hpY2ggc2hvdWxkIGJlIHBhc3NpdmUgYnkgZGVmYXVsdC5cbiAqIFRoZXNlIHR3byBhcmUgYWxyZWFkeSBwYXNzaXZlIHZpYSBicm93c2VyIGRlZmF1bHRzIG9uIHdpbmRvdywgZG9jdW1lbnQgYW5kIGJvZHkuXG4gKiBCdXQgc2luY2VcbiAqIC0gd2UncmUgZGVsZWdhdGluZyB0aGVtXG4gKiAtIHRoZXkgaGFwcGVuIG9mdGVuXG4gKiAtIHRoZXkgYXBwbHkgdG8gbW9iaWxlIHdoaWNoIGlzIGdlbmVyYWxseSBsZXNzIHBlcmZvcm1hbnRcbiAqIHdlJ3JlIG1hcmtpbmcgdGhlbSBhcyBwYXNzaXZlIGJ5IGRlZmF1bHQgZm9yIG90aGVyIGVsZW1lbnRzLCB0b28uXG4gKi9cbmNvbnN0IFBBU1NJVkVfRVZFTlRTID0gWyd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZSddO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGBuYW1lYCBpcyBhIHBhc3NpdmUgZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19wYXNzaXZlX2V2ZW50KG5hbWUpIHtcblx0cmV0dXJuIFBBU1NJVkVfRVZFTlRTLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBDT05URU5UX0VESVRBQkxFX0JJTkRJTkdTID0gWyd0ZXh0Q29udGVudCcsICdpbm5lckhUTUwnLCAnaW5uZXJUZXh0J107XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2NvbnRlbnRfZWRpdGFibGVfYmluZGluZyhuYW1lKSB7XG5cdHJldHVybiBDT05URU5UX0VESVRBQkxFX0JJTkRJTkdTLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBMT0FEX0VSUk9SX0VMRU1FTlRTID0gW1xuXHQnYm9keScsXG5cdCdlbWJlZCcsXG5cdCdpZnJhbWUnLFxuXHQnaW1nJyxcblx0J2xpbmsnLFxuXHQnb2JqZWN0Jyxcblx0J3NjcmlwdCcsXG5cdCdzdHlsZScsXG5cdCd0cmFjaydcbl07XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVsZW1lbnQgZW1pdHMgYGxvYWRgIGFuZCBgZXJyb3JgIGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2xvYWRfZXJyb3JfZWxlbWVudChuYW1lKSB7XG5cdHJldHVybiBMT0FEX0VSUk9SX0VMRU1FTlRTLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBTVkdfRUxFTUVOVFMgPSBbXG5cdCdhbHRHbHlwaCcsXG5cdCdhbHRHbHlwaERlZicsXG5cdCdhbHRHbHlwaEl0ZW0nLFxuXHQnYW5pbWF0ZScsXG5cdCdhbmltYXRlQ29sb3InLFxuXHQnYW5pbWF0ZU1vdGlvbicsXG5cdCdhbmltYXRlVHJhbnNmb3JtJyxcblx0J2NpcmNsZScsXG5cdCdjbGlwUGF0aCcsXG5cdCdjb2xvci1wcm9maWxlJyxcblx0J2N1cnNvcicsXG5cdCdkZWZzJyxcblx0J2Rlc2MnLFxuXHQnZGlzY2FyZCcsXG5cdCdlbGxpcHNlJyxcblx0J2ZlQmxlbmQnLFxuXHQnZmVDb2xvck1hdHJpeCcsXG5cdCdmZUNvbXBvbmVudFRyYW5zZmVyJyxcblx0J2ZlQ29tcG9zaXRlJyxcblx0J2ZlQ29udm9sdmVNYXRyaXgnLFxuXHQnZmVEaWZmdXNlTGlnaHRpbmcnLFxuXHQnZmVEaXNwbGFjZW1lbnRNYXAnLFxuXHQnZmVEaXN0YW50TGlnaHQnLFxuXHQnZmVEcm9wU2hhZG93Jyxcblx0J2ZlRmxvb2QnLFxuXHQnZmVGdW5jQScsXG5cdCdmZUZ1bmNCJyxcblx0J2ZlRnVuY0cnLFxuXHQnZmVGdW5jUicsXG5cdCdmZUdhdXNzaWFuQmx1cicsXG5cdCdmZUltYWdlJyxcblx0J2ZlTWVyZ2UnLFxuXHQnZmVNZXJnZU5vZGUnLFxuXHQnZmVNb3JwaG9sb2d5Jyxcblx0J2ZlT2Zmc2V0Jyxcblx0J2ZlUG9pbnRMaWdodCcsXG5cdCdmZVNwZWN1bGFyTGlnaHRpbmcnLFxuXHQnZmVTcG90TGlnaHQnLFxuXHQnZmVUaWxlJyxcblx0J2ZlVHVyYnVsZW5jZScsXG5cdCdmaWx0ZXInLFxuXHQnZm9udCcsXG5cdCdmb250LWZhY2UnLFxuXHQnZm9udC1mYWNlLWZvcm1hdCcsXG5cdCdmb250LWZhY2UtbmFtZScsXG5cdCdmb250LWZhY2Utc3JjJyxcblx0J2ZvbnQtZmFjZS11cmknLFxuXHQnZm9yZWlnbk9iamVjdCcsXG5cdCdnJyxcblx0J2dseXBoJyxcblx0J2dseXBoUmVmJyxcblx0J2hhdGNoJyxcblx0J2hhdGNocGF0aCcsXG5cdCdoa2VybicsXG5cdCdpbWFnZScsXG5cdCdsaW5lJyxcblx0J2xpbmVhckdyYWRpZW50Jyxcblx0J21hcmtlcicsXG5cdCdtYXNrJyxcblx0J21lc2gnLFxuXHQnbWVzaGdyYWRpZW50Jyxcblx0J21lc2hwYXRjaCcsXG5cdCdtZXNocm93Jyxcblx0J21ldGFkYXRhJyxcblx0J21pc3NpbmctZ2x5cGgnLFxuXHQnbXBhdGgnLFxuXHQncGF0aCcsXG5cdCdwYXR0ZXJuJyxcblx0J3BvbHlnb24nLFxuXHQncG9seWxpbmUnLFxuXHQncmFkaWFsR3JhZGllbnQnLFxuXHQncmVjdCcsXG5cdCdzZXQnLFxuXHQnc29saWRjb2xvcicsXG5cdCdzdG9wJyxcblx0J3N2ZycsXG5cdCdzd2l0Y2gnLFxuXHQnc3ltYm9sJyxcblx0J3RleHQnLFxuXHQndGV4dFBhdGgnLFxuXHQndHJlZicsXG5cdCd0c3BhbicsXG5cdCd1bmtub3duJyxcblx0J3VzZScsXG5cdCd2aWV3Jyxcblx0J3ZrZXJuJ1xuXTtcblxuLyoqIEBwYXJhbSB7c3RyaW5nfSBuYW1lICovXG5leHBvcnQgZnVuY3Rpb24gaXNfc3ZnKG5hbWUpIHtcblx0cmV0dXJuIFNWR19FTEVNRU5UUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuY29uc3QgTUFUSE1MX0VMRU1FTlRTID0gW1xuXHQnYW5ub3RhdGlvbicsXG5cdCdhbm5vdGF0aW9uLXhtbCcsXG5cdCdtYWN0aW9uJyxcblx0J21hdGgnLFxuXHQnbWVycm9yJyxcblx0J21mcmFjJyxcblx0J21pJyxcblx0J21tdWx0aXNjcmlwdHMnLFxuXHQnbW4nLFxuXHQnbW8nLFxuXHQnbW92ZXInLFxuXHQnbXBhZGRlZCcsXG5cdCdtcGhhbnRvbScsXG5cdCdtcHJlc2NyaXB0cycsXG5cdCdtcm9vdCcsXG5cdCdtcm93Jyxcblx0J21zJyxcblx0J21zcGFjZScsXG5cdCdtc3FydCcsXG5cdCdtc3R5bGUnLFxuXHQnbXN1YicsXG5cdCdtc3Vic3VwJyxcblx0J21zdXAnLFxuXHQnbXRhYmxlJyxcblx0J210ZCcsXG5cdCdtdGV4dCcsXG5cdCdtdHInLFxuXHQnbXVuZGVyJyxcblx0J211bmRlcm92ZXInLFxuXHQnc2VtYW50aWNzJ1xuXTtcblxuLyoqIEBwYXJhbSB7c3RyaW5nfSBuYW1lICovXG5leHBvcnQgZnVuY3Rpb24gaXNfbWF0aG1sKG5hbWUpIHtcblx0cmV0dXJuIE1BVEhNTF9FTEVNRU5UUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuY29uc3QgU1RBVEVfQ1JFQVRJT05fUlVORVMgPSAvKiogQHR5cGUge2NvbnN0fSAqLyAoW1xuXHQnJHN0YXRlJyxcblx0JyRzdGF0ZS5yYXcnLFxuXHQnJGRlcml2ZWQnLFxuXHQnJGRlcml2ZWQuYnknXG5dKTtcblxuY29uc3QgUlVORVMgPSAvKiogQHR5cGUge2NvbnN0fSAqLyAoW1xuXHQuLi5TVEFURV9DUkVBVElPTl9SVU5FUyxcblx0JyRzdGF0ZS5lYWdlcicsXG5cdCckc3RhdGUuc25hcHNob3QnLFxuXHQnJHByb3BzJyxcblx0JyRwcm9wcy5pZCcsXG5cdCckYmluZGFibGUnLFxuXHQnJGVmZmVjdCcsXG5cdCckZWZmZWN0LnByZScsXG5cdCckZWZmZWN0LnRyYWNraW5nJyxcblx0JyRlZmZlY3Qucm9vdCcsXG5cdCckZWZmZWN0LnBlbmRpbmcnLFxuXHQnJGluc3BlY3QnLFxuXHQnJGluc3BlY3QoKS53aXRoJyxcblx0JyRpbnNwZWN0LnRyYWNlJyxcblx0JyRob3N0J1xuXSk7XG5cbi8qKiBAdHlwZWRlZiB7dHlwZW9mIFJVTkVTW251bWJlcl19IFJ1bmVOYW1lICovXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtuYW1lIGlzIFJ1bmVOYW1lfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfcnVuZShuYW1lKSB7XG5cdHJldHVybiBSVU5FUy5pbmNsdWRlcygvKiogQHR5cGUge1J1bmVOYW1lfSAqLyAobmFtZSkpO1xufVxuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBTVEFURV9DUkVBVElPTl9SVU5FU1tudW1iZXJdfSBTdGF0ZUNyZWF0aW9uUnVuZU5hbWUgKi9cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge25hbWUgaXMgU3RhdGVDcmVhdGlvblJ1bmVOYW1lfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfc3RhdGVfY3JlYXRpb25fcnVuZShuYW1lKSB7XG5cdHJldHVybiBTVEFURV9DUkVBVElPTl9SVU5FUy5pbmNsdWRlcygvKiogQHR5cGUge1N0YXRlQ3JlYXRpb25SdW5lTmFtZX0gKi8gKG5hbWUpKTtcbn1cblxuLyoqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCByZXF1aXJlIHJhdyBjb250ZW50cyBhbmQgc2hvdWxkIG5vdCBoYXZlIFNTUiBjb21tZW50cyBwdXQgaW4gdGhlbSAqL1xuY29uc3QgUkFXX1RFWFRfRUxFTUVOVFMgPSAvKiogQHR5cGUge2NvbnN0fSAqLyAoWyd0ZXh0YXJlYScsICdzY3JpcHQnLCAnc3R5bGUnLCAndGl0bGUnXSk7XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3Jhd190ZXh0X2VsZW1lbnQobmFtZSkge1xuXHRyZXR1cm4gUkFXX1RFWFRfRUxFTUVOVFMuaW5jbHVkZXMoLyoqIEB0eXBlIHt0eXBlb2YgUkFXX1RFWFRfRUxFTUVOVFNbbnVtYmVyXX0gKi8gKG5hbWUpKTtcbn1cblxuLy8gTWF0Y2hlcyB2YWxpZCBIVE1ML1NWRy9NYXRoTUwgZWxlbWVudCBuYW1lcyBhbmQgY3VzdG9tIGVsZW1lbnQgbmFtZXMuXG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jdXN0b20tZWxlbWVudHMuaHRtbCN2YWxpZC1jdXN0b20tZWxlbWVudC1uYW1lXG4vL1xuLy8gU3RhbmRhcmQgZWxlbWVudHM6IEFTQ0lJIGFscGhhIHN0YXJ0LCBmb2xsb3dlZCBieSBBU0NJSSBhbHBoYW51bWVyaWNzLlxuLy8gQ3VzdG9tIGVsZW1lbnRzOiBBU0NJSSBhbHBoYSBzdGFydCwgZm9sbG93ZWQgYnkgYW55IG1peCBvZiBQQ0VOQ2hhciAod2hpY2hcbi8vIGluY2x1ZGVzIEFTQ0lJIGFscGhhbnVtZXJpY3MsIGAtYCwgYC5gLCBgX2AsIGFuZCBzcGVjaWZpZWQgVW5pY29kZSByYW5nZXMpLFxuLy8gd2l0aCBhdCBsZWFzdCBvbmUgaHlwaGVuIHJlcXVpcmVkIHNvbWV3aGVyZSBhZnRlciB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuLy9cbi8vIFJlamVjdHMgc3RyaW5ncyBjb250YWluaW5nIHdoaXRlc3BhY2UsIHF1b3RlcywgYW5nbGUgYnJhY2tldHMsIHNsYXNoZXMsIGVxdWFscyxcbi8vIG9yIG90aGVyIGNoYXJhY3RlcnMgdGhhdCBjb3VsZCBicmVhayBvdXQgb2YgYSB0YWctbmFtZSB0b2tlbiBhbmQgZW5hYmxlIG1hcmt1cCBpbmplY3Rpb24uXG5leHBvcnQgY29uc3QgUkVHRVhfVkFMSURfVEFHX05BTUUgPVxuXHQvXlthLXpBLVpdW2EtekEtWjAtOV0qKC1bYS16QS1aMC05LlxcLV9cXHUwMEI3XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjAzRi1cXHUyMDQwXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXFx1ezEwMDAwfS1cXHV7RUZGRkZ9XSspKiQvdTtcblxuLyoqXG4gKiBQcmV2ZW50IGRldnRvb2xzIHRyeWluZyB0byBtYWtlIGBsb2NhdGlvbmAgYSBjbGlja2FibGUgbGluayBieSBpbnNlcnRpbmcgYSB6ZXJvLXdpZHRoIHNwYWNlXG4gKiBAdGVtcGxhdGUge3N0cmluZyB8IHVuZGVmaW5lZH0gVFxuICogQHBhcmFtIHtUfSBsb2NhdGlvblxuICogQHJldHVybnMge1R9O1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVfbG9jYXRpb24obG9jYXRpb24pIHtcblx0cmV0dXJuIC8qKiBAdHlwZSB7VH0gKi8gKGxvY2F0aW9uPy5yZXBsYWNlKC9cXC8vZywgJy9cXHUyMDBiJykpO1xufVxuIiwiaW1wb3J0IHsgdGVhcmRvd24gfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgZGVmaW5lX3Byb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vdGFzay5qcyc7XG5pbXBvcnQgeyBGSUxFTkFNRSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4uLy4uL3dhcm5pbmdzLmpzJztcbmltcG9ydCB7XG5cdGFjdGl2ZV9lZmZlY3QsXG5cdGFjdGl2ZV9yZWFjdGlvbixcblx0c2V0X2FjdGl2ZV9lZmZlY3QsXG5cdHNldF9hY3RpdmVfcmVhY3Rpb25cbn0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyB3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQgfSBmcm9tICcuL2JpbmRpbmdzL3NoYXJlZC5qcyc7XG5cbi8qKlxuICogVXNlZCBvbiBlbGVtZW50cywgYXMgYSBtYXAgb2YgZXZlbnQgdHlwZSAtPiBldmVudCBoYW5kbGVyLFxuICogYW5kIG9uIGV2ZW50cyB0aGVtc2VsdmVzIHRvIHRyYWNrIHdoaWNoIGVsZW1lbnQgaGFuZGxlZCBhbiBldmVudFxuICovXG5leHBvcnQgY29uc3QgZXZlbnRfc3ltYm9sID0gU3ltYm9sKCdldmVudHMnKTtcblxuLyoqIEB0eXBlIHtTZXQ8c3RyaW5nPn0gKi9cbmV4cG9ydCBjb25zdCBhbGxfcmVnaXN0ZXJlZF9ldmVudHMgPSBuZXcgU2V0KCk7XG5cbi8qKiBAdHlwZSB7U2V0PChldmVudHM6IEFycmF5PHN0cmluZz4pID0+IHZvaWQ+fSAqL1xuZXhwb3J0IGNvbnN0IHJvb3RfZXZlbnRfaGFuZGxlcyA9IG5ldyBTZXQoKTtcblxuLyoqXG4gKiBTU1IgYWRkcyBvbmxvYWQgYW5kIG9uZXJyb3IgYXR0cmlidXRlcyB0byBjYXRjaCB0aG9zZSBldmVudHMgYmVmb3JlIHRoZSBoeWRyYXRpb24uXG4gKiBUaGlzIGZ1bmN0aW9uIGRldGVjdHMgdGhvc2UgY2FzZXMsIHJlbW92ZXMgdGhlIGF0dHJpYnV0ZXMgYW5kIHJlcGxheXMgdGhlIGV2ZW50cy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRvbVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGF5X2V2ZW50cyhkb20pIHtcblx0aWYgKCFoeWRyYXRpbmcpIHJldHVybjtcblxuXHRkb20ucmVtb3ZlQXR0cmlidXRlKCdvbmxvYWQnKTtcblx0ZG9tLnJlbW92ZUF0dHJpYnV0ZSgnb25lcnJvcicpO1xuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdGNvbnN0IGV2ZW50ID0gZG9tLl9fZTtcblx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZG9tLl9fZSA9IHVuZGVmaW5lZDtcblx0XHRxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG5cdFx0XHRpZiAoZG9tLmlzQ29ubmVjdGVkKSB7XG5cdFx0XHRcdGRvbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9uYW1lXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBkb21cbiAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lcn0gW2hhbmRsZXJdXG4gKiBAcGFyYW0ge0FkZEV2ZW50TGlzdGVuZXJPcHRpb25zfSBbb3B0aW9uc11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9ldmVudChldmVudF9uYW1lLCBkb20sIGhhbmRsZXIsIG9wdGlvbnMgPSB7fSkge1xuXHQvKipcblx0ICogQHRoaXMge0V2ZW50VGFyZ2V0fVxuXHQgKi9cblx0ZnVuY3Rpb24gdGFyZ2V0X2hhbmRsZXIoLyoqIEB0eXBlIHtFdmVudH0gKi8gZXZlbnQpIHtcblx0XHRpZiAoIW9wdGlvbnMuY2FwdHVyZSkge1xuXHRcdFx0Ly8gT25seSBjYWxsIGluIHRoZSBidWJibGUgcGhhc2UsIGVsc2UgZGVsZWdhdGVkIGV2ZW50cyB3b3VsZCBiZSBjYWxsZWQgYmVmb3JlIHRoZSBjYXB0dXJpbmcgZXZlbnRzXG5cdFx0XHRoYW5kbGVfZXZlbnRfcHJvcGFnYXRpb24uY2FsbChkb20sIGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKCFldmVudC5jYW5jZWxCdWJibGUpIHtcblx0XHRcdHJldHVybiB3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQoKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gaGFuZGxlcj8uY2FsbCh0aGlzLCBldmVudCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvLyBDaHJvbWUgaGFzIGEgYnVnIHdoZXJlIHBvaW50ZXIgZXZlbnRzIGRvbid0IHdvcmsgd2hlbiBhdHRhY2hlZCB0byBhIERPTSBlbGVtZW50IHRoYXQgaGFzIGJlZW4gY2xvbmVkXG5cdC8vIHdpdGggY2xvbmVOb2RlKCkgYW5kIHRoZSBET00gZWxlbWVudCBpcyBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgZG9jdW1lbnQuIFRvIGVuc3VyZSB0aGUgZXZlbnQgd29ya3MsIHdlXG5cdC8vIGRlZmVyIHRoZSBhdHRhY2htZW50IHRpbGwgYWZ0ZXIgaXQncyBiZWVuIGFwcGVuZGVkIHRvIHRoZSBkb2N1bWVudC4gVE9ETzogcmVtb3ZlIHRoaXMgb25jZSBDaHJvbWUgZml4ZXNcblx0Ly8gdGhpcyBidWcuIFRoZSBzYW1lIGFwcGxpZXMgdG8gd2hlZWwgZXZlbnRzIGFuZCB0b3VjaCBldmVudHMuXG5cdGlmIChcblx0XHRldmVudF9uYW1lLnN0YXJ0c1dpdGgoJ3BvaW50ZXInKSB8fFxuXHRcdGV2ZW50X25hbWUuc3RhcnRzV2l0aCgndG91Y2gnKSB8fFxuXHRcdGV2ZW50X25hbWUgPT09ICd3aGVlbCdcblx0KSB7XG5cdFx0cXVldWVfbWljcm9fdGFzaygoKSA9PiB7XG5cdFx0XHRkb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudF9uYW1lLCB0YXJnZXRfaGFuZGxlciwgb3B0aW9ucyk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0ZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRfbmFtZSwgdGFyZ2V0X2hhbmRsZXIsIG9wdGlvbnMpO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldF9oYW5kbGVyO1xufVxuXG4vKipcbiAqIEF0dGFjaGVzIGFuIGV2ZW50IGhhbmRsZXIgdG8gYW4gZWxlbWVudCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgaGFuZGxlci4gVXNpbmcgdGhpc1xuICogcmF0aGVyIHRoYW4gYGFkZEV2ZW50TGlzdGVuZXJgIHdpbGwgcHJlc2VydmUgdGhlIGNvcnJlY3Qgb3JkZXIgcmVsYXRpdmUgdG8gaGFuZGxlcnMgYWRkZWQgZGVjbGFyYXRpdmVseVxuICogKHdpdGggYXR0cmlidXRlcyBsaWtlIGBvbmNsaWNrYCksIHdoaWNoIHVzZSBldmVudCBkZWxlZ2F0aW9uIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gKlxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICogQHBhcmFtIHtBZGRFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbihlbGVtZW50LCB0eXBlLCBoYW5kbGVyLCBvcHRpb25zID0ge30pIHtcblx0dmFyIHRhcmdldF9oYW5kbGVyID0gY3JlYXRlX2V2ZW50KHR5cGUsIGVsZW1lbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIHRhcmdldF9oYW5kbGVyLCBvcHRpb25zKTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRfbmFtZVxuICogQHBhcmFtIHtFbGVtZW50fSBkb21cbiAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lcn0gW2hhbmRsZXJdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlXVxuICogQHBhcmFtIHtib29sZWFufSBbcGFzc2l2ZV1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZlbnQoZXZlbnRfbmFtZSwgZG9tLCBoYW5kbGVyLCBjYXB0dXJlLCBwYXNzaXZlKSB7XG5cdHZhciBvcHRpb25zID0geyBjYXB0dXJlLCBwYXNzaXZlIH07XG5cdHZhciB0YXJnZXRfaGFuZGxlciA9IGNyZWF0ZV9ldmVudChldmVudF9uYW1lLCBkb20sIGhhbmRsZXIsIG9wdGlvbnMpO1xuXG5cdGlmIChcblx0XHRkb20gPT09IGRvY3VtZW50LmJvZHkgfHxcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0ZG9tID09PSB3aW5kb3cgfHxcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0ZG9tID09PSBkb2N1bWVudCB8fFxuXHRcdC8vIEZpcmVmb3ggaGFzIHF1aXJreSBiZWhhdmlvciwgaXQgY2FuIGhhcHBlbiB0aGF0IHdlIHN0aWxsIGdldCBcImNhbnBsYXlcIiBldmVudHMgd2hlbiB0aGUgZWxlbWVudCBpcyBhbHJlYWR5IHJlbW92ZWRcblx0XHRkb20gaW5zdGFuY2VvZiBIVE1MTWVkaWFFbGVtZW50XG5cdCkge1xuXHRcdHRlYXJkb3duKCgpID0+IHtcblx0XHRcdGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIHRhcmdldF9oYW5kbGVyLCBvcHRpb25zKTtcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9uYW1lXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lcn0gW2hhbmRsZXJdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlZChldmVudF9uYW1lLCBlbGVtZW50LCBoYW5kbGVyKSB7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0KGVsZW1lbnRbZXZlbnRfc3ltYm9sXSA/Pz0ge30pW2V2ZW50X25hbWVdID0gaGFuZGxlcjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGV2ZW50c1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxlZ2F0ZShldmVudHMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRhbGxfcmVnaXN0ZXJlZF9ldmVudHMuYWRkKGV2ZW50c1tpXSk7XG5cdH1cblxuXHRmb3IgKHZhciBmbiBvZiByb290X2V2ZW50X2hhbmRsZXMpIHtcblx0XHRmbihldmVudHMpO1xuXHR9XG59XG5cbi8vIHVzZWQgdG8gc3RvcmUgdGhlIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IHByb3BhZ2F0ZWQgZXZlbnRcbi8vIHRvIHByZXZlbnQgZ2FyYmFnZSBjb2xsZWN0aW9uIGJldHdlZW4gbWljcm90YXNrcyBpbiBGaXJlZm94XG4vLyBJZiB0aGUgZXZlbnQgb2JqZWN0IGlzIEdDZWQgdG9vIGVhcmx5LCB0aGUgZXhwYW5kbyBfX3Jvb3QgcHJvcGVydHlcbi8vIHNldCBvbiB0aGUgZXZlbnQgb2JqZWN0IGlzIGxvc3QsIGNhdXNpbmcgdGhlIGV2ZW50IGRlbGVnYXRpb25cbi8vIHRvIHByb2Nlc3MgdGhlIGV2ZW50IHR3aWNlXG5sZXQgbGFzdF9wcm9wYWdhdGVkX2V2ZW50ID0gbnVsbDtcblxuLyoqXG4gKiBAdGhpcyB7RXZlbnRUYXJnZXR9XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVfZXZlbnRfcHJvcGFnYXRpb24oZXZlbnQpIHtcblx0dmFyIGhhbmRsZXJfZWxlbWVudCA9IHRoaXM7XG5cdHZhciBvd25lcl9kb2N1bWVudCA9IC8qKiBAdHlwZSB7Tm9kZX0gKi8gKGhhbmRsZXJfZWxlbWVudCkub3duZXJEb2N1bWVudDtcblx0dmFyIGV2ZW50X25hbWUgPSBldmVudC50eXBlO1xuXHR2YXIgcGF0aCA9IGV2ZW50LmNvbXBvc2VkUGF0aD8uKCkgfHwgW107XG5cdHZhciBjdXJyZW50X3RhcmdldCA9IC8qKiBAdHlwZSB7bnVsbCB8IEVsZW1lbnR9ICovIChwYXRoWzBdIHx8IGV2ZW50LnRhcmdldCk7XG5cblx0bGFzdF9wcm9wYWdhdGVkX2V2ZW50ID0gZXZlbnQ7XG5cblx0Ly8gY29tcG9zZWRQYXRoIGNvbnRhaW5zIGxpc3Qgb2Ygbm9kZXMgdGhlIGV2ZW50IGhhcyBwcm9wYWdhdGVkIHRocm91Z2guXG5cdC8vIFdlIGNoZWNrIGBldmVudF9zeW1ib2xgIHRvIHNraXAgYWxsIG5vZGVzIGJlbG93IGl0IGluIGNhc2UgdGhpcyBpcyBhXG5cdC8vIHBhcmVudCBvZiB0aGUgYGV2ZW50X3N5bWJvbGAgbm9kZSwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgdGhlcmUncyBuZXN0ZWRcblx0Ly8gbW91bnRlZCBhcHBzLiBJbiB0aGlzIGNhc2Ugd2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGV2ZW50cyBtdWx0aXBsZSB0aW1lcy5cblx0dmFyIHBhdGhfaWR4ID0gMDtcblxuXHQvLyB0aGUgYGxhc3RfcHJvcGFnYXRlZF9ldmVudCA9PT0gZXZlbnRgIGNoZWNrIGlzIHJlZHVuZGFudCwgYnV0XG5cdC8vIHdpdGhvdXQgaXQgdGhlIHZhcmlhYmxlIHdpbGwgYmUgRENFJ2QgYW5kIHRoaW5ncyB3aWxsXG5cdC8vIGZhaWwgbXlzdGVyaW91c2x5IGluIEZpcmVmb3hcblx0Ly8gQHRzLWV4cGVjdC1lcnJvciBpcyBhZGRlZCBiZWxvd1xuXHR2YXIgaGFuZGxlZF9hdCA9IGxhc3RfcHJvcGFnYXRlZF9ldmVudCA9PT0gZXZlbnQgJiYgZXZlbnRbZXZlbnRfc3ltYm9sXTtcblxuXHRpZiAoaGFuZGxlZF9hdCkge1xuXHRcdHZhciBhdF9pZHggPSBwYXRoLmluZGV4T2YoaGFuZGxlZF9hdCk7XG5cdFx0aWYgKFxuXHRcdFx0YXRfaWR4ICE9PSAtMSAmJlxuXHRcdFx0KGhhbmRsZXJfZWxlbWVudCA9PT0gZG9jdW1lbnQgfHwgaGFuZGxlcl9lbGVtZW50ID09PSAvKiogQHR5cGUge2FueX0gKi8gKHdpbmRvdykpXG5cdFx0KSB7XG5cdFx0XHQvLyBUaGlzIGlzIHRoZSBmYWxsYmFjayBkb2N1bWVudCBsaXN0ZW5lciBvciBhIHdpbmRvdyBsaXN0ZW5lciwgYnV0IHRoZSBldmVudCB3YXMgYWxyZWFkeSBoYW5kbGVkXG5cdFx0XHQvLyAtPiBpZ25vcmUsIGJ1dCBzZXQgaGFuZGxlX2F0IHRvIGRvY3VtZW50L3dpbmRvdyBzbyB0aGF0IHdlJ3JlIHJlc2V0dGluZyB0aGUgZXZlbnRcblx0XHRcdC8vIGNoYWluIGluIGNhc2Ugc29tZW9uZSBtYW51YWxseSBkaXNwYXRjaGVzIHRoZSBzYW1lIGV2ZW50IG9iamVjdCBhZ2Fpbi5cblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRcdGV2ZW50W2V2ZW50X3N5bWJvbF0gPSBoYW5kbGVyX2VsZW1lbnQ7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV2UncmUgZGVsaWJlcmF0ZWx5IG5vdCBza2lwcGluZyBpZiB0aGUgaW5kZXggaXMgaGlnaGVyLCBiZWNhdXNlXG5cdFx0Ly8gc29tZW9uZSBjb3VsZCBjcmVhdGUgYW4gZXZlbnQgcHJvZ3JhbW1hdGljYWxseSBhbmQgZW1pdCBpdCBtdWx0aXBsZSB0aW1lcyxcblx0XHQvLyBpbiB3aGljaCBjYXNlIHdlIHdhbnQgdG8gaGFuZGxlIHRoZSB3aG9sZSBwcm9wYWdhdGlvbiBjaGFpbiBwcm9wZXJseSBlYWNoIHRpbWUuXG5cdFx0Ly8gKHRoaXMgd2lsbCBvbmx5IGJlIGEgZmFsc2UgbmVnYXRpdmUgaWYgdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQgbXVsdGlwbGUgdGltZXMgYW5kXG5cdFx0Ly8gdGhlIGZhbGxiYWNrIGRvY3VtZW50IGxpc3RlbmVyIGlzbid0IHJlYWNoZWQgaW4gYmV0d2VlbiwgYnV0IHRoYXQncyBzdXBlciByYXJlKVxuXHRcdHZhciBoYW5kbGVyX2lkeCA9IHBhdGguaW5kZXhPZihoYW5kbGVyX2VsZW1lbnQpO1xuXHRcdGlmIChoYW5kbGVyX2lkeCA9PT0gLTEpIHtcblx0XHRcdC8vIGhhbmRsZV9pZHggY2FuIHRoZW9yZXRpY2FsbHkgYmUgLTEgKGhhcHBlbmVkIGluIHNvbWUgSlNET00gdGVzdGluZyBzY2VuYXJpb3Mgd2l0aCBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgd2luZG93IG9iamVjdClcblx0XHRcdC8vIHNvIGd1YXJkIGFnYWluc3QgdGhhdCwgdG9vLCBhbmQgYXNzdW1lIHRoYXQgZXZlcnl0aGluZyB3YXMgaGFuZGxlZCBhdCB0aGlzIHBvaW50LlxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChhdF9pZHggPD0gaGFuZGxlcl9pZHgpIHtcblx0XHRcdHBhdGhfaWR4ID0gYXRfaWR4O1xuXHRcdH1cblx0fVxuXG5cdGN1cnJlbnRfdGFyZ2V0ID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAocGF0aFtwYXRoX2lkeF0gfHwgZXZlbnQudGFyZ2V0KTtcblx0Ly8gdGhlcmUgY2FuIG9ubHkgYmUgb25lIGRlbGVnYXRlZCBldmVudCBwZXIgZWxlbWVudCwgYW5kIHdlIGVpdGhlciBhbHJlYWR5IGhhbmRsZWQgdGhlIGN1cnJlbnQgdGFyZ2V0LFxuXHQvLyBvciB0aGlzIGlzIHRoZSB2ZXJ5IGZpcnN0IHRhcmdldCBpbiB0aGUgY2hhaW4gd2hpY2ggaGFzIGEgbm9uLWRlbGVnYXRlZCBsaXN0ZW5lciwgaW4gd2hpY2ggY2FzZSBpdCdzIHNhZmVcblx0Ly8gdG8gaGFuZGxlIGEgcG9zc2libGUgZGVsZWdhdGVkIGV2ZW50IG9uIGl0IGxhdGVyICh0aHJvdWdoIHRoZSByb290IGRlbGVnYXRpb24gbGlzdGVuZXIgZm9yIGV4YW1wbGUpLlxuXHRpZiAoY3VycmVudF90YXJnZXQgPT09IGhhbmRsZXJfZWxlbWVudCkgcmV0dXJuO1xuXG5cdC8vIFByb3h5IGN1cnJlbnRUYXJnZXQgdG8gY29ycmVjdCB0YXJnZXRcblx0ZGVmaW5lX3Byb3BlcnR5KGV2ZW50LCAnY3VycmVudFRhcmdldCcsIHtcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIGN1cnJlbnRfdGFyZ2V0IHx8IG93bmVyX2RvY3VtZW50O1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gVGhpcyBzdGFydGVkIGJlY2F1c2Ugb2YgQ2hyb21pdW0gaXNzdWUgaHR0cHM6Ly9jaHJvbWVzdGF0dXMuY29tL2ZlYXR1cmUvNTEyODY5NjgyMzU0NTg1Nixcblx0Ly8gd2hlcmUgcmVtb3ZhbCBvciBtb3Zpbmcgb2Ygb2YgdGhlIERPTSBjYW4gY2F1c2Ugc3luYyBgYmx1cmAgZXZlbnRzIHRvIGZpcmUsIHdoaWNoIGNhbiBjYXVzZSBsb2dpY1xuXHQvLyB0byBydW4gaW5zaWRlIHRoZSBjdXJyZW50IGBhY3RpdmVfcmVhY3Rpb25gLCB3aGljaCBpc24ndCB3aGF0IHdlIHdhbnQgYXQgYWxsLiBIb3dldmVyLCBvbiByZWZsZWN0aW9uLFxuXHQvLyBpdCdzIHByb2JhYmx5IGJlc3QgdGhhdCBhbGwgZXZlbnQgaGFuZGxlZCBieSBTdmVsdGUgaGF2ZSB0aGlzIGJlaGF2aW91ciwgYXMgd2UgZG9uJ3QgcmVhbGx5IHdhbnRcblx0Ly8gYW4gZXZlbnQgaGFuZGxlciB0byBydW4gaW4gdGhlIGNvbnRleHQgb2YgYW5vdGhlciByZWFjdGlvbiBvciBlZmZlY3QuXG5cdHZhciBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0dmFyIHByZXZpb3VzX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cdHNldF9hY3RpdmVfcmVhY3Rpb24obnVsbCk7XG5cdHNldF9hY3RpdmVfZWZmZWN0KG51bGwpO1xuXG5cdHRyeSB7XG5cdFx0LyoqXG5cdFx0ICogQHR5cGUge3Vua25vd259XG5cdFx0ICovXG5cdFx0dmFyIHRocm93X2Vycm9yO1xuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHt1bmtub3duW119XG5cdFx0ICovXG5cdFx0dmFyIG90aGVyX2Vycm9ycyA9IFtdO1xuXG5cdFx0d2hpbGUgKGN1cnJlbnRfdGFyZ2V0ICE9PSBudWxsKSB7XG5cdFx0XHQvKiogQHR5cGUge251bGwgfCBFbGVtZW50fSAqL1xuXHRcdFx0dmFyIHBhcmVudF9lbGVtZW50ID1cblx0XHRcdFx0Y3VycmVudF90YXJnZXQuYXNzaWduZWRTbG90IHx8XG5cdFx0XHRcdGN1cnJlbnRfdGFyZ2V0LnBhcmVudE5vZGUgfHxcblx0XHRcdFx0LyoqIEB0eXBlIHthbnl9ICovIChjdXJyZW50X3RhcmdldCkuaG9zdCB8fFxuXHRcdFx0XHRudWxsO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRcdHZhciBkZWxlZ2F0ZWQgPSBjdXJyZW50X3RhcmdldFtldmVudF9zeW1ib2xdPy5bZXZlbnRfbmFtZV07XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGRlbGVnYXRlZCAhPSBudWxsICYmXG5cdFx0XHRcdFx0KCEoLyoqIEB0eXBlIHthbnl9ICovIChjdXJyZW50X3RhcmdldCkuZGlzYWJsZWQpIHx8XG5cdFx0XHRcdFx0XHQvLyBET00gY291bGQndmUgYmVlbiB1cGRhdGVkIGFscmVhZHkgYnkgdGhlIHRpbWUgdGhpcyBpcyByZWFjaGVkLCBzbyB3ZSBjaGVjayB0aGlzIGFzIHdlbGxcblx0XHRcdFx0XHRcdC8vIC0+IHRoZSB0YXJnZXQgY291bGQgbm90IGhhdmUgYmVlbiBkaXNhYmxlZCBiZWNhdXNlIGl0IGVtaXRzIHRoZSBldmVudCBpbiB0aGUgZmlyc3QgcGxhY2Vcblx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldCA9PT0gY3VycmVudF90YXJnZXQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGRlbGVnYXRlZC5jYWxsKGN1cnJlbnRfdGFyZ2V0LCBldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGlmICh0aHJvd19lcnJvcikge1xuXHRcdFx0XHRcdG90aGVyX2Vycm9ycy5wdXNoKGVycm9yKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvd19lcnJvciA9IGVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXZlbnQuY2FuY2VsQnViYmxlIHx8IHBhcmVudF9lbGVtZW50ID09PSBoYW5kbGVyX2VsZW1lbnQgfHwgcGFyZW50X2VsZW1lbnQgPT09IG51bGwpIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjdXJyZW50X3RhcmdldCA9IHBhcmVudF9lbGVtZW50O1xuXHRcdH1cblxuXHRcdGlmICh0aHJvd19lcnJvcikge1xuXHRcdFx0Zm9yIChsZXQgZXJyb3Igb2Ygb3RoZXJfZXJyb3JzKSB7XG5cdFx0XHRcdC8vIFRocm93IHRoZSByZXN0IG9mIHRoZSBlcnJvcnMsIG9uZS1ieS1vbmUgb24gYSBtaWNyb3Rhc2tcblx0XHRcdFx0cXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRocm93IHRocm93X2Vycm9yO1xuXHRcdH1cblx0fSBmaW5hbGx5IHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIGlzIHVzZWQgYWJvdmVcblx0XHRldmVudFtldmVudF9zeW1ib2xdID0gaGFuZGxlcl9lbGVtZW50O1xuXHRcdC8vIEB0cy1pZ25vcmUgcmVtb3ZlIHByb3h5IG9uIGN1cnJlbnRUYXJnZXRcblx0XHRkZWxldGUgZXZlbnQuY3VycmVudFRhcmdldDtcblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHByZXZpb3VzX3JlYWN0aW9uKTtcblx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHR9XG59XG5cbi8qKlxuICogSW4gZGV2LCB3YXJuIGlmIGFuIGV2ZW50IGhhbmRsZXIgaXMgbm90IGEgZnVuY3Rpb24sIGFzIGl0IG1lYW5zIHRoZVxuICogdXNlciBwcm9iYWJseSBjYWxsZWQgdGhlIGhhbmRsZXIgb3IgZm9yZ290IHRvIGFkZCBhIGAoKSA9PmBcbiAqIEBwYXJhbSB7KCkgPT4gKGV2ZW50OiBFdmVudCwgLi4uYXJnczogYW55KSA9PiB2b2lkfSB0aHVua1xuICogQHBhcmFtIHtFdmVudFRhcmdldH0gZWxlbWVudFxuICogQHBhcmFtIHtbRXZlbnQsIC4uLmFueV19IGFyZ3NcbiAqIEBwYXJhbSB7YW55fSBjb21wb25lbnRcbiAqIEBwYXJhbSB7W251bWJlciwgbnVtYmVyXX0gW2xvY11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlbW92ZV9wYXJlbnNdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShcblx0dGh1bmssXG5cdGVsZW1lbnQsXG5cdGFyZ3MsXG5cdGNvbXBvbmVudCxcblx0bG9jLFxuXHRoYXNfc2lkZV9lZmZlY3RzID0gZmFsc2UsXG5cdHJlbW92ZV9wYXJlbnMgPSBmYWxzZVxuKSB7XG5cdGxldCBoYW5kbGVyO1xuXHRsZXQgZXJyb3I7XG5cblx0dHJ5IHtcblx0XHRoYW5kbGVyID0gdGh1bmsoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGVycm9yID0gZTtcblx0fVxuXG5cdGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJyAmJiAoaGFzX3NpZGVfZWZmZWN0cyB8fCBoYW5kbGVyICE9IG51bGwgfHwgZXJyb3IpKSB7XG5cdFx0Y29uc3QgZmlsZW5hbWUgPSBjb21wb25lbnQ/LltGSUxFTkFNRV07XG5cdFx0Y29uc3QgbG9jYXRpb24gPSBsb2MgPyBgIGF0ICR7ZmlsZW5hbWV9OiR7bG9jWzBdfToke2xvY1sxXX1gIDogYCBpbiAke2ZpbGVuYW1lfWA7XG5cdFx0Y29uc3QgcGhhc2UgPSBhcmdzWzBdPy5ldmVudFBoYXNlIDwgRXZlbnQuQlVCQkxJTkdfUEhBU0UgPyAnY2FwdHVyZScgOiAnJztcblx0XHRjb25zdCBldmVudF9uYW1lID0gYXJnc1swXT8udHlwZSArIHBoYXNlO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gYFxcYCR7ZXZlbnRfbmFtZX1cXGAgaGFuZGxlciR7bG9jYXRpb259YDtcblx0XHRjb25zdCBzdWdnZXN0aW9uID0gcmVtb3ZlX3BhcmVucyA/ICdyZW1vdmUgdGhlIHRyYWlsaW5nIGAoKWAnIDogJ2FkZCBhIGxlYWRpbmcgYCgpID0+YCc7XG5cblx0XHR3LmV2ZW50X2hhbmRsZXJfaW52YWxpZChkZXNjcmlwdGlvbiwgc3VnZ2VzdGlvbik7XG5cblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0fVxuXHRoYW5kbGVyPy5hcHBseShlbGVtZW50LCBhcmdzKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZV9lbGVtZW50IH0gZnJvbSAnLi9vcGVyYXRpb25zLmpzJztcblxuY29uc3QgcG9saWN5ID1cblx0Ly8gV2UgZ290dGEgd3JpdGUgaXQgbGlrZSB0aGlzIGJlY2F1c2UgYWZ0ZXIgZG93bmxldmVsaW5nIHRoZSBwdXJlIGNvbW1lbnQgbWF5IGVuZCB1cCBpbiB0aGUgd3JvbmcgbG9jYXRpb25cblx0Z2xvYmFsVGhpcz8ud2luZG93Py50cnVzdGVkVHlwZXMgJiZcblx0LyogQF9fUFVSRV9fICovIGdsb2JhbFRoaXMud2luZG93LnRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3koJ3N2ZWx0ZS10cnVzdGVkLWh0bWwnLCB7XG5cdFx0LyoqIEBwYXJhbSB7c3RyaW5nfSBodG1sICovXG5cdFx0Y3JlYXRlSFRNTDogKGh0bWwpID0+IHtcblx0XHRcdHJldHVybiBodG1sO1xuXHRcdH1cblx0fSk7XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gaHRtbCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV90cnVzdGVkX2h0bWwoaHRtbCkge1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwb2xpY3k/LmNyZWF0ZUhUTUwoaHRtbCkgPz8gaHRtbCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9mcmFnbWVudF9mcm9tX2h0bWwoaHRtbCkge1xuXHR2YXIgZWxlbSA9IGNyZWF0ZV9lbGVtZW50KCd0ZW1wbGF0ZScpO1xuXHRlbGVtLmlubmVySFRNTCA9IGNyZWF0ZV90cnVzdGVkX2h0bWwoaHRtbC5yZXBsYWNlQWxsKCc8IT4nLCAnPCEtLS0tPicpKTsgLy8gWEhUTUwgY29tcGxpYW5jZVxuXHRyZXR1cm4gZWxlbS5jb250ZW50O1xufVxuIiwiLyoqIEBpbXBvcnQgeyBFZmZlY3QsIEVmZmVjdE5vZGVzLCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuLyoqIEBpbXBvcnQgeyBUZW1wbGF0ZVN0cnVjdHVyZSB9IGZyb20gJy4vdHlwZXMnICovXG5pbXBvcnQgeyBoeWRyYXRlX25leHQsIGh5ZHJhdGVfbm9kZSwgaHlkcmF0aW5nLCBzZXRfaHlkcmF0ZV9ub2RlIH0gZnJvbSAnLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHtcblx0Y3JlYXRlX3RleHQsXG5cdGdldF9maXJzdF9jaGlsZCxcblx0Z2V0X25leHRfc2libGluZyxcblx0aXNfZmlyZWZveCxcblx0Y3JlYXRlX2VsZW1lbnQsXG5cdGNyZWF0ZV9mcmFnbWVudCxcblx0Y3JlYXRlX2NvbW1lbnQsXG5cdHNldF9hdHRyaWJ1dGUsXG5cdG1lcmdlX3RleHRfbm9kZXNcbn0gZnJvbSAnLi9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IGNyZWF0ZV9mcmFnbWVudF9mcm9tX2h0bWwgfSBmcm9tICcuL3JlY29uY2lsZXIuanMnO1xuaW1wb3J0IHsgYWN0aXZlX2VmZmVjdCB9IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHtcblx0TkFNRVNQQUNFX01BVEhNTCxcblx0TkFNRVNQQUNFX1NWRyxcblx0VEVNUExBVEVfRlJBR01FTlQsXG5cdFRFTVBMQVRFX1VTRV9JTVBPUlRfTk9ERSxcblx0VEVNUExBVEVfVVNFX01BVEhNTCxcblx0VEVNUExBVEVfVVNFX1NWR1xufSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHtcblx0Q09NTUVOVF9OT0RFLFxuXHRET0NVTUVOVF9GUkFHTUVOVF9OT0RFLFxuXHRJU19YSFRNTCxcblx0UkVBQ1RJT05fUkFOLFxuXHRURVhUX05PREVcbn0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuXG5jb25zdCBURU1QTEFURV9UQUcgPSBJU19YSFRNTCA/ICd0ZW1wbGF0ZScgOiAnVEVNUExBVEUnO1xuY29uc3QgU0NSSVBUX1RBRyA9IElTX1hIVE1MID8gJ3NjcmlwdCcgOiAnU0NSSVBUJztcblxuLyoqXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gc3RhcnRcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlIHwgbnVsbH0gZW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25fbm9kZXMoc3RhcnQsIGVuZCkge1xuXHR2YXIgZWZmZWN0ID0gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KTtcblx0aWYgKGVmZmVjdC5ub2RlcyA9PT0gbnVsbCkge1xuXHRcdGVmZmVjdC5ub2RlcyA9IHsgc3RhcnQsIGVuZCwgYTogbnVsbCwgdDogbnVsbCB9O1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICogQHJldHVybnMgeygpID0+IE5vZGUgfCBOb2RlW119XG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21faHRtbChjb250ZW50LCBmbGFncykge1xuXHR2YXIgaXNfZnJhZ21lbnQgPSAoZmxhZ3MgJiBURU1QTEFURV9GUkFHTUVOVCkgIT09IDA7XG5cdHZhciB1c2VfaW1wb3J0X25vZGUgPSAoZmxhZ3MgJiBURU1QTEFURV9VU0VfSU1QT1JUX05PREUpICE9PSAwO1xuXG5cdC8qKiBAdHlwZSB7Tm9kZX0gKi9cblx0dmFyIG5vZGU7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBmaXJzdCBpdGVtIGlzIGEgdGV4dC9lbGVtZW50IG5vZGUuIElmIG5vdCwgd2UgbmVlZCB0b1xuXHQgKiBjcmVhdGUgYW4gYWRkaXRpb25hbCBjb21tZW50IG5vZGUgdG8gYWN0IGFzIGBlZmZlY3Qubm9kZXMuc3RhcnRgXG5cdCAqL1xuXHR2YXIgaGFzX3N0YXJ0ID0gIWNvbnRlbnQuc3RhcnRzV2l0aCgnPCE+Jyk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRhc3NpZ25fbm9kZXMoaHlkcmF0ZV9ub2RlLCBudWxsKTtcblx0XHRcdHJldHVybiBoeWRyYXRlX25vZGU7XG5cdFx0fVxuXG5cdFx0aWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0bm9kZSA9IGNyZWF0ZV9mcmFnbWVudF9mcm9tX2h0bWwoaGFzX3N0YXJ0ID8gY29udGVudCA6ICc8IT4nICsgY29udGVudCk7XG5cdFx0XHRpZiAoIWlzX2ZyYWdtZW50KSBub2RlID0gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChnZXRfZmlyc3RfY2hpbGQobm9kZSkpO1xuXHRcdH1cblxuXHRcdHZhciBjbG9uZSA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoXG5cdFx0XHR1c2VfaW1wb3J0X25vZGUgfHwgaXNfZmlyZWZveCA/IGRvY3VtZW50LmltcG9ydE5vZGUobm9kZSwgdHJ1ZSkgOiBub2RlLmNsb25lTm9kZSh0cnVlKVxuXHRcdCk7XG5cblx0XHRpZiAoaXNfZnJhZ21lbnQpIHtcblx0XHRcdHZhciBzdGFydCA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKGNsb25lKSk7XG5cdFx0XHR2YXIgZW5kID0gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChjbG9uZS5sYXN0Q2hpbGQpO1xuXG5cdFx0XHRhc3NpZ25fbm9kZXMoc3RhcnQsIGVuZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFzc2lnbl9ub2RlcyhjbG9uZSwgY2xvbmUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjbG9uZTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKiBAcGFyYW0geydzdmcnIHwgJ21hdGgnfSBuc1xuICogQHJldHVybnMgeygpID0+IE5vZGUgfCBOb2RlW119XG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZnVuY3Rpb24gZnJvbV9uYW1lc3BhY2UoY29udGVudCwgZmxhZ3MsIG5zID0gJ3N2ZycpIHtcblx0LyoqXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBmaXJzdCBpdGVtIGlzIGEgdGV4dC9lbGVtZW50IG5vZGUuIElmIG5vdCwgd2UgbmVlZCB0b1xuXHQgKiBjcmVhdGUgYW4gYWRkaXRpb25hbCBjb21tZW50IG5vZGUgdG8gYWN0IGFzIGBlZmZlY3Qubm9kZXMuc3RhcnRgXG5cdCAqL1xuXHR2YXIgaGFzX3N0YXJ0ID0gIWNvbnRlbnQuc3RhcnRzV2l0aCgnPCE+Jyk7XG5cblx0dmFyIGlzX2ZyYWdtZW50ID0gKGZsYWdzICYgVEVNUExBVEVfRlJBR01FTlQpICE9PSAwO1xuXHR2YXIgd3JhcHBlZCA9IGA8JHtuc30+JHtoYXNfc3RhcnQgPyBjb250ZW50IDogJzwhPicgKyBjb250ZW50fTwvJHtuc30+YDtcblxuXHQvKiogQHR5cGUge0VsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50fSAqL1xuXHR2YXIgbm9kZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdGFzc2lnbl9ub2RlcyhoeWRyYXRlX25vZGUsIG51bGwpO1xuXHRcdFx0cmV0dXJuIGh5ZHJhdGVfbm9kZTtcblx0XHR9XG5cblx0XHRpZiAoIW5vZGUpIHtcblx0XHRcdHZhciBmcmFnbWVudCA9IC8qKiBAdHlwZSB7RG9jdW1lbnRGcmFnbWVudH0gKi8gKGNyZWF0ZV9mcmFnbWVudF9mcm9tX2h0bWwod3JhcHBlZCkpO1xuXHRcdFx0dmFyIHJvb3QgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChnZXRfZmlyc3RfY2hpbGQoZnJhZ21lbnQpKTtcblxuXHRcdFx0aWYgKGlzX2ZyYWdtZW50KSB7XG5cdFx0XHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdHdoaWxlIChnZXRfZmlyc3RfY2hpbGQocm9vdCkpIHtcblx0XHRcdFx0XHRub2RlLmFwcGVuZENoaWxkKC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKHJvb3QpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5vZGUgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChnZXRfZmlyc3RfY2hpbGQocm9vdCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBjbG9uZSA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAobm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuXG5cdFx0aWYgKGlzX2ZyYWdtZW50KSB7XG5cdFx0XHR2YXIgc3RhcnQgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9maXJzdF9jaGlsZChjbG9uZSkpO1xuXHRcdFx0dmFyIGVuZCA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoY2xvbmUubGFzdENoaWxkKTtcblxuXHRcdFx0YXNzaWduX25vZGVzKHN0YXJ0LCBlbmQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhc3NpZ25fbm9kZXMoY2xvbmUsIGNsb25lKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tX3N2Zyhjb250ZW50LCBmbGFncykge1xuXHRyZXR1cm4gZnJvbV9uYW1lc3BhY2UoY29udGVudCwgZmxhZ3MsICdzdmcnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21fbWF0aG1sKGNvbnRlbnQsIGZsYWdzKSB7XG5cdHJldHVybiBmcm9tX25hbWVzcGFjZShjb250ZW50LCBmbGFncywgJ21hdGgnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RlbXBsYXRlU3RydWN0dXJlW119IHN0cnVjdHVyZVxuICogQHBhcmFtIHt0eXBlb2YgTkFNRVNQQUNFX1NWRyB8IHR5cGVvZiBOQU1FU1BBQ0VfTUFUSE1MIHwgdW5kZWZpbmVkfSBbbnNdXG4gKi9cbmZ1bmN0aW9uIGZyYWdtZW50X2Zyb21fdHJlZShzdHJ1Y3R1cmUsIG5zKSB7XG5cdHZhciBmcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCgpO1xuXG5cdGZvciAodmFyIGl0ZW0gb2Ygc3RydWN0dXJlKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuXHRcdFx0ZnJhZ21lbnQuYXBwZW5kKGNyZWF0ZV90ZXh0KGl0ZW0pKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdC8vIGlmIGBwcmVzZXJ2ZUNvbW1lbnRzID09PSB0cnVlYCwgY29tbWVudHMgYXJlIHJlcHJlc2VudGVkIGFzIGBbJy8vIDxkYXRhPiddYFxuXHRcdGlmIChpdGVtID09PSB1bmRlZmluZWQgfHwgaXRlbVswXVswXSA9PT0gJy8nKSB7XG5cdFx0XHRmcmFnbWVudC5hcHBlbmQoY3JlYXRlX2NvbW1lbnQoaXRlbSA/IGl0ZW1bMF0uc2xpY2UoMykgOiAnJykpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgW25hbWUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuXSA9IGl0ZW07XG5cblx0XHRjb25zdCBuYW1lc3BhY2UgPSBuYW1lID09PSAnc3ZnJyA/IE5BTUVTUEFDRV9TVkcgOiBuYW1lID09PSAnbWF0aCcgPyBOQU1FU1BBQ0VfTUFUSE1MIDogbnM7XG5cblx0XHR2YXIgZWxlbWVudCA9IGNyZWF0ZV9lbGVtZW50KG5hbWUsIG5hbWVzcGFjZSwgYXR0cmlidXRlcz8uaXMpO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdHNldF9hdHRyaWJ1dGUoZWxlbWVudCwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHRcdH1cblxuXHRcdGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgdGFyZ2V0ID1cblx0XHRcdFx0ZWxlbWVudC5ub2RlTmFtZSA9PT0gVEVNUExBVEVfVEFHXG5cdFx0XHRcdFx0PyAvKiogQHR5cGUge0hUTUxUZW1wbGF0ZUVsZW1lbnR9ICovIChlbGVtZW50KS5jb250ZW50XG5cdFx0XHRcdFx0OiBlbGVtZW50O1xuXG5cdFx0XHR0YXJnZXQuYXBwZW5kKFxuXHRcdFx0XHRmcmFnbWVudF9mcm9tX3RyZWUoY2hpbGRyZW4sIGVsZW1lbnQubm9kZU5hbWUgPT09ICdmb3JlaWduT2JqZWN0JyA/IHVuZGVmaW5lZCA6IG5hbWVzcGFjZSlcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0ZnJhZ21lbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIGZyYWdtZW50O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VGVtcGxhdGVTdHJ1Y3R1cmVbXX0gc3RydWN0dXJlXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEByZXR1cm5zIHsoKSA9PiBOb2RlIHwgTm9kZVtdfVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tX3RyZWUoc3RydWN0dXJlLCBmbGFncykge1xuXHR2YXIgaXNfZnJhZ21lbnQgPSAoZmxhZ3MgJiBURU1QTEFURV9GUkFHTUVOVCkgIT09IDA7XG5cdHZhciB1c2VfaW1wb3J0X25vZGUgPSAoZmxhZ3MgJiBURU1QTEFURV9VU0VfSU1QT1JUX05PREUpICE9PSAwO1xuXG5cdC8qKiBAdHlwZSB7Tm9kZX0gKi9cblx0dmFyIG5vZGU7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRhc3NpZ25fbm9kZXMoaHlkcmF0ZV9ub2RlLCBudWxsKTtcblx0XHRcdHJldHVybiBoeWRyYXRlX25vZGU7XG5cdFx0fVxuXG5cdFx0aWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y29uc3QgbnMgPVxuXHRcdFx0XHQoZmxhZ3MgJiBURU1QTEFURV9VU0VfU1ZHKSAhPT0gMFxuXHRcdFx0XHRcdD8gTkFNRVNQQUNFX1NWR1xuXHRcdFx0XHRcdDogKGZsYWdzICYgVEVNUExBVEVfVVNFX01BVEhNTCkgIT09IDBcblx0XHRcdFx0XHRcdD8gTkFNRVNQQUNFX01BVEhNTFxuXHRcdFx0XHRcdFx0OiB1bmRlZmluZWQ7XG5cblx0XHRcdG5vZGUgPSBmcmFnbWVudF9mcm9tX3RyZWUoc3RydWN0dXJlLCBucyk7XG5cdFx0XHRpZiAoIWlzX2ZyYWdtZW50KSBub2RlID0gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChnZXRfZmlyc3RfY2hpbGQobm9kZSkpO1xuXHRcdH1cblxuXHRcdHZhciBjbG9uZSA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoXG5cdFx0XHR1c2VfaW1wb3J0X25vZGUgfHwgaXNfZmlyZWZveCA/IGRvY3VtZW50LmltcG9ydE5vZGUobm9kZSwgdHJ1ZSkgOiBub2RlLmNsb25lTm9kZSh0cnVlKVxuXHRcdCk7XG5cblx0XHRpZiAoaXNfZnJhZ21lbnQpIHtcblx0XHRcdHZhciBzdGFydCA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKGNsb25lKSk7XG5cdFx0XHR2YXIgZW5kID0gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChjbG9uZS5sYXN0Q2hpbGQpO1xuXG5cdFx0XHRhc3NpZ25fbm9kZXMoc3RhcnQsIGVuZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFzc2lnbl9ub2RlcyhjbG9uZSwgY2xvbmUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjbG9uZTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygpID0+IEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50fSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aF9zY3JpcHQoZm4pIHtcblx0cmV0dXJuICgpID0+IHJ1bl9zY3JpcHRzKGZuKCkpO1xufVxuXG4vKipcbiAqIENyZWF0aW5nIGEgZG9jdW1lbnQgZnJhZ21lbnQgZnJvbSBIVE1MIHRoYXQgY29udGFpbnMgc2NyaXB0IHRhZ3Mgd2lsbCBub3QgZXhlY3V0ZVxuICogdGhlIHNjcmlwdHMuIFdlIG5lZWQgdG8gcmVwbGFjZSB0aGUgc2NyaXB0IHRhZ3Mgd2l0aCBuZXcgb25lcyBzbyB0aGF0IHRoZXkgYXJlIGV4ZWN1dGVkLlxuICogQHBhcmFtIHtFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudH0gbm9kZVxuICogQHJldHVybnMge05vZGUgfCBOb2RlW119XG4gKi9cbmZ1bmN0aW9uIHJ1bl9zY3JpcHRzKG5vZGUpIHtcblx0Ly8gc2NyaXB0cyB3ZXJlIFNTUidkLCBpbiB3aGljaCBjYXNlIHRoZXkgd2lsbCBydW5cblx0aWYgKGh5ZHJhdGluZykgcmV0dXJuIG5vZGU7XG5cblx0Y29uc3QgaXNfZnJhZ21lbnQgPSBub2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFO1xuXHRjb25zdCBzY3JpcHRzID1cblx0XHQvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyAobm9kZSkubm9kZU5hbWUgPT09IFNDUklQVF9UQUdcblx0XHRcdD8gWy8qKiBAdHlwZSB7SFRNTFNjcmlwdEVsZW1lbnR9ICovIChub2RlKV1cblx0XHRcdDogbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKTtcblxuXHRjb25zdCBlZmZlY3QgPSAvKiogQHR5cGUge0VmZmVjdCAmIHsgbm9kZXM6IEVmZmVjdE5vZGVzIH19ICovIChhY3RpdmVfZWZmZWN0KTtcblxuXHRmb3IgKGNvbnN0IHNjcmlwdCBvZiBzY3JpcHRzKSB7XG5cdFx0Y29uc3QgY2xvbmUgPSBjcmVhdGVfZWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIG9mIHNjcmlwdC5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRjbG9uZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0Y2xvbmUudGV4dENvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQ7XG5cblx0XHQvLyBUaGUgc2NyaXB0IGhhcyBjaGFuZ2VkIC0gaWYgaXQncyBhdCB0aGUgZWRnZXMsIHRoZSBlZmZlY3Qgbm93IHBvaW50cyBhdCBkZWFkIG5vZGVzXG5cdFx0aWYgKGlzX2ZyYWdtZW50ID8gbm9kZS5maXJzdENoaWxkID09PSBzY3JpcHQgOiBub2RlID09PSBzY3JpcHQpIHtcblx0XHRcdGVmZmVjdC5ub2Rlcy5zdGFydCA9IGNsb25lO1xuXHRcdH1cblx0XHRpZiAoaXNfZnJhZ21lbnQgPyBub2RlLmxhc3RDaGlsZCA9PT0gc2NyaXB0IDogbm9kZSA9PT0gc2NyaXB0KSB7XG5cdFx0XHRlZmZlY3Qubm9kZXMuZW5kID0gY2xvbmU7XG5cdFx0fVxuXG5cdFx0c2NyaXB0LnJlcGxhY2VXaXRoKGNsb25lKTtcblx0fVxuXHRyZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBEb24ndCBtYXJrIHRoaXMgYXMgc2lkZS1lZmZlY3QtZnJlZSwgaHlkcmF0aW9uIG5lZWRzIHRvIHdhbGsgYWxsIG5vZGVzXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRleHQodmFsdWUgPSAnJykge1xuXHRpZiAoIWh5ZHJhdGluZykge1xuXHRcdHZhciB0ID0gY3JlYXRlX3RleHQodmFsdWUgKyAnJyk7XG5cdFx0YXNzaWduX25vZGVzKHQsIHQpO1xuXHRcdHJldHVybiB0O1xuXHR9XG5cblx0dmFyIG5vZGUgPSBoeWRyYXRlX25vZGU7XG5cblx0aWYgKG5vZGUubm9kZVR5cGUgIT09IFRFWFRfTk9ERSkge1xuXHRcdC8vIGlmIGFuIHtleHByZXNzaW9ufSBpcyBlbXB0eSBkdXJpbmcgU1NSLCB3ZSBuZWVkIHRvIGluc2VydCBhbiBlbXB0eSB0ZXh0IG5vZGVcblx0XHRub2RlLmJlZm9yZSgobm9kZSA9IGNyZWF0ZV90ZXh0KCkpKTtcblx0XHRzZXRfaHlkcmF0ZV9ub2RlKG5vZGUpO1xuXHR9IGVsc2Uge1xuXHRcdG1lcmdlX3RleHRfbm9kZXMoLyoqIEB0eXBlIHtUZXh0fSAqLyAobm9kZSkpO1xuXHR9XG5cblx0YXNzaWduX25vZGVzKG5vZGUsIG5vZGUpO1xuXHRyZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlIHwgRG9jdW1lbnRGcmFnbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1lbnQoKSB7XG5cdC8vIHdlJ3JlIG5vdCBkZWxlZ2F0aW5nIHRvIGB0ZW1wbGF0ZWAgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuXHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0YXNzaWduX25vZGVzKGh5ZHJhdGVfbm9kZSwgbnVsbCk7XG5cdFx0cmV0dXJuIGh5ZHJhdGVfbm9kZTtcblx0fVxuXG5cdHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHR2YXIgc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKTtcblx0dmFyIGFuY2hvciA9IGNyZWF0ZV90ZXh0KCk7XG5cdGZyYWcuYXBwZW5kKHN0YXJ0LCBhbmNob3IpO1xuXG5cdGFzc2lnbl9ub2RlcyhzdGFydCwgYW5jaG9yKTtcblxuXHRyZXR1cm4gZnJhZztcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIGNyZWF0ZWQgKG9yIGluIGh5ZHJhdGlvbiBtb2RlLCB0cmF2ZXJzZWQpIGRvbSBlbGVtZW50cyB0byB0aGUgY3VycmVudCBibG9ja1xuICogYW5kIGluc2VydCB0aGUgZWxlbWVudHMgaW50byB0aGUgZG9tIChpbiBjbGllbnQgbW9kZSkuXG4gKiBAcGFyYW0ge1RleHQgfCBDb21tZW50IHwgRWxlbWVudH0gYW5jaG9yXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnQgfCBFbGVtZW50fSBkb21cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZChhbmNob3IsIGRvbSkge1xuXHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0dmFyIGVmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0ICYgeyBub2RlczogRWZmZWN0Tm9kZXMgfX0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdFx0Ly8gV2hlbiBoeWRyYXRpbmcgYW5kIG91dGVyIGNvbXBvbmVudCBhbmQgYW4gaW5uZXIgY29tcG9uZW50IGlzIGFzeW5jLCBpLmUuIGJsb2NrZWQgb24gYSBwcm9taXNlLFxuXHRcdC8vIHRoZW4gYnkgdGhlIHRpbWUgdGhlIGlubmVyIHJlc29sdmVzIHdlIGhhdmUgYWxyZWFkeSBhZHZhbmNlZCB0byB0aGUgZW5kIG9mIHRoZSBoeWRyYXRlZCBub2Rlc1xuXHRcdC8vIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50LiBDaGVjayBmb3IgZGVmaW5lZCBmb3IgdGhhdCByZWFzb24gdG8gYXZvaWQgcmV3aW5kaW5nIHRoZSBwYXJlbnQncyBlbmQgbWFya2VyLlxuXHRcdGlmICgoZWZmZWN0LmYgJiBSRUFDVElPTl9SQU4pID09PSAwIHx8IGVmZmVjdC5ub2Rlcy5lbmQgPT09IG51bGwpIHtcblx0XHRcdGVmZmVjdC5ub2Rlcy5lbmQgPSBoeWRyYXRlX25vZGU7XG5cdFx0fVxuXG5cdFx0aHlkcmF0ZV9uZXh0KCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGFuY2hvciA9PT0gbnVsbCkge1xuXHRcdC8vIGVkZ2UgY2FzZSDigJQgdm9pZCBgPHN2ZWx0ZTplbGVtZW50PmAgd2l0aCBjb250ZW50XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0YW5jaG9yLmJlZm9yZSgvKiogQHR5cGUge05vZGV9ICovIChkb20pKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgKG9yIGh5ZHJhdGUpIGFuIHVuaXF1ZSBVSUQgZm9yIHRoZSBjb21wb25lbnQgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wc19pZCgpIHtcblx0aWYgKFxuXHRcdGh5ZHJhdGluZyAmJlxuXHRcdGh5ZHJhdGVfbm9kZSAmJlxuXHRcdGh5ZHJhdGVfbm9kZS5ub2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFICYmXG5cdFx0aHlkcmF0ZV9ub2RlLnRleHRDb250ZW50Py5zdGFydHNXaXRoKGAkYClcblx0KSB7XG5cdFx0Y29uc3QgaWQgPSBoeWRyYXRlX25vZGUudGV4dENvbnRlbnQuc3Vic3RyaW5nKDEpO1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHRcdHJldHVybiBpZDtcblx0fVxuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3IgVGhpcyB3YXkgd2UgZW5zdXJlIHRoZSBpZCBpcyB1bmlxdWUgZXZlbiBhY3Jvc3MgU3ZlbHRlIHJ1bnRpbWVzXG5cdCh3aW5kb3cuX19zdmVsdGUgPz89IHt9KS51aWQgPz89IDE7XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRyZXR1cm4gYGMke3dpbmRvdy5fX3N2ZWx0ZS51aWQrK31gO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBDb21wb25lbnRDb250ZXh0LCBFZmZlY3QsIEVmZmVjdE5vZGVzLCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuLyoqIEBpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFR5cGUsIFN2ZWx0ZUNvbXBvbmVudCwgTW91bnRPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW5kZXguanMnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7XG5cdGNsZWFyX3RleHRfY29udGVudCxcblx0Y3JlYXRlX3RleHQsXG5cdGdldF9maXJzdF9jaGlsZCxcblx0Z2V0X25leHRfc2libGluZyxcblx0aW5pdF9vcGVyYXRpb25zXG59IGZyb20gJy4vZG9tL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHsgSFlEUkFUSU9OX0VORCwgSFlEUkFUSU9OX0VSUk9SLCBIWURSQVRJT05fU1RBUlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgYWN0aXZlX2VmZmVjdCB9IGZyb20gJy4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBwdXNoLCBwb3AsIGNvbXBvbmVudF9jb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9yb290IH0gZnJvbSAnLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgaHlkcmF0ZV9ub2RlLCBoeWRyYXRpbmcsIHNldF9oeWRyYXRlX25vZGUsIHNldF9oeWRyYXRpbmcgfSBmcm9tICcuL2RvbS9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgYXJyYXlfZnJvbSB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQge1xuXHRhbGxfcmVnaXN0ZXJlZF9ldmVudHMsXG5cdGhhbmRsZV9ldmVudF9wcm9wYWdhdGlvbixcblx0cm9vdF9ldmVudF9oYW5kbGVzXG59IGZyb20gJy4vZG9tL2VsZW1lbnRzL2V2ZW50cy5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4vd2FybmluZ3MuanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBhc3NpZ25fbm9kZXMgfSBmcm9tICcuL2RvbS90ZW1wbGF0ZS5qcyc7XG5pbXBvcnQgeyBpc19wYXNzaXZlX2V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHsgQ09NTUVOVF9OT0RFLCBTVEFURV9TWU1CT0wgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBib3VuZGFyeSB9IGZyb20gJy4vZG9tL2Jsb2Nrcy9ib3VuZGFyeS5qcyc7XG5cbi8qKlxuICogVGhpcyBpcyBub3JtYWxseSB0cnVlIOKAlCBibG9jayBlZmZlY3RzIHNob3VsZCBydW4gdGhlaXIgaW50cm8gdHJhbnNpdGlvbnMg4oCUXG4gKiBidXQgaXMgZmFsc2UgZHVyaW5nIGh5ZHJhdGlvbiAodW5sZXNzIGBvcHRpb25zLmludHJvYCBpcyBgdHJ1ZWApIGFuZFxuICogd2hlbiBjcmVhdGluZyB0aGUgY2hpbGRyZW4gb2YgYSBgPHN2ZWx0ZTplbGVtZW50PmAgdGhhdCBqdXN0IGNoYW5nZWQgdGFnXG4gKi9cbmV4cG9ydCBsZXQgc2hvdWxkX2ludHJvID0gdHJ1ZTtcblxuLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc2hvdWxkX2ludHJvKHZhbHVlKSB7XG5cdHNob3VsZF9pbnRybyA9IHZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGV4dFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF90ZXh0KHRleHQsIHZhbHVlKSB7XG5cdC8vIEZvciBvYmplY3RzLCB3ZSBhcHBseSBzdHJpbmcgY29lcmNpb24gKHdoaWNoIG1pZ2h0IG1ha2UgdGhpbmdzIGxpa2UgJHN0YXRlIGFycmF5IHJlZmVyZW5jZXMgaW4gdGhlIHRlbXBsYXRlIHJlYWN0aXZlKSBiZWZvcmUgZGlmZmluZ1xuXHR2YXIgc3RyID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IGAke3ZhbHVlfWAgOiB2YWx1ZTtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRpZiAoc3RyICE9PSAodGV4dC5fX3QgPz89IHRleHQubm9kZVZhbHVlKSkge1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHR0ZXh0Ll9fdCA9IHN0cjtcblx0XHR0ZXh0Lm5vZGVWYWx1ZSA9IGAke3N0cn1gO1xuXHR9XG59XG5cbi8qKlxuICogTW91bnRzIGEgY29tcG9uZW50IHRvIHRoZSBnaXZlbiB0YXJnZXQgYW5kIHJldHVybnMgdGhlIGV4cG9ydHMgYW5kIHBvdGVudGlhbGx5IHRoZSBwcm9wcyAoaWYgY29tcGlsZWQgd2l0aCBgYWNjZXNzb3JzOiB0cnVlYCkgb2YgdGhlIGNvbXBvbmVudC5cbiAqIFRyYW5zaXRpb25zIHdpbGwgcGxheSBkdXJpbmcgdGhlIGluaXRpYWwgcmVuZGVyIHVubGVzcyB0aGUgYGludHJvYCBvcHRpb24gaXMgc2V0IHRvIGBmYWxzZWAuXG4gKlxuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBQcm9wc1xuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBFeHBvcnRzXG4gKiBAcGFyYW0ge0NvbXBvbmVudFR5cGU8U3ZlbHRlQ29tcG9uZW50PFByb3BzPj4gfCBDb21wb25lbnQ8UHJvcHMsIEV4cG9ydHMsIGFueT59IGNvbXBvbmVudFxuICogQHBhcmFtIHtNb3VudE9wdGlvbnM8UHJvcHM+fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7RXhwb3J0c31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50KGNvbXBvbmVudCwgb3B0aW9ucykge1xuXHRyZXR1cm4gX21vdW50KGNvbXBvbmVudCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogSHlkcmF0ZXMgYSBjb21wb25lbnQgb24gdGhlIGdpdmVuIHRhcmdldCBhbmQgcmV0dXJucyB0aGUgZXhwb3J0cyBhbmQgcG90ZW50aWFsbHkgdGhlIHByb3BzIChpZiBjb21waWxlZCB3aXRoIGBhY2Nlc3NvcnM6IHRydWVgKSBvZiB0aGUgY29tcG9uZW50XG4gKlxuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBQcm9wc1xuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBFeHBvcnRzXG4gKiBAcGFyYW0ge0NvbXBvbmVudFR5cGU8U3ZlbHRlQ29tcG9uZW50PFByb3BzPj4gfCBDb21wb25lbnQ8UHJvcHMsIEV4cG9ydHMsIGFueT59IGNvbXBvbmVudFxuICogQHBhcmFtIHt7fSBleHRlbmRzIFByb3BzID8ge1xuICogXHRcdHRhcmdldDogRG9jdW1lbnQgfCBFbGVtZW50IHwgU2hhZG93Um9vdDtcbiAqIFx0XHRwcm9wcz86IFByb3BzO1xuICogXHRcdGV2ZW50cz86IFJlY29yZDxzdHJpbmcsIChlOiBhbnkpID0+IGFueT47XG4gKiAgXHRjb250ZXh0PzogTWFwPGFueSwgYW55PjtcbiAqIFx0XHRpbnRybz86IGJvb2xlYW47XG4gKiBcdFx0cmVjb3Zlcj86IGJvb2xlYW47XG4gKlx0XHR0cmFuc2Zvcm1FcnJvcj86IChlcnJvcjogdW5rbm93bikgPT4gdW5rbm93bjtcbiAqIFx0fSA6IHtcbiAqIFx0XHR0YXJnZXQ6IERvY3VtZW50IHwgRWxlbWVudCB8IFNoYWRvd1Jvb3Q7XG4gKiBcdFx0cHJvcHM6IFByb3BzO1xuICogXHRcdGV2ZW50cz86IFJlY29yZDxzdHJpbmcsIChlOiBhbnkpID0+IGFueT47XG4gKiAgXHRjb250ZXh0PzogTWFwPGFueSwgYW55PjtcbiAqIFx0XHRpbnRybz86IGJvb2xlYW47XG4gKiBcdFx0cmVjb3Zlcj86IGJvb2xlYW47XG4gKlx0XHR0cmFuc2Zvcm1FcnJvcj86IChlcnJvcjogdW5rbm93bikgPT4gdW5rbm93bjtcbiAqIFx0fX0gb3B0aW9uc1xuICogQHJldHVybnMge0V4cG9ydHN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlKGNvbXBvbmVudCwgb3B0aW9ucykge1xuXHRpbml0X29wZXJhdGlvbnMoKTtcblx0b3B0aW9ucy5pbnRybyA9IG9wdGlvbnMuaW50cm8gPz8gZmFsc2U7XG5cdGNvbnN0IHRhcmdldCA9IG9wdGlvbnMudGFyZ2V0O1xuXHRjb25zdCB3YXNfaHlkcmF0aW5nID0gaHlkcmF0aW5nO1xuXHRjb25zdCBwcmV2aW91c19oeWRyYXRlX25vZGUgPSBoeWRyYXRlX25vZGU7XG5cblx0dHJ5IHtcblx0XHR2YXIgYW5jaG9yID0gZ2V0X2ZpcnN0X2NoaWxkKHRhcmdldCk7XG5cblx0XHR3aGlsZSAoXG5cdFx0XHRhbmNob3IgJiZcblx0XHRcdChhbmNob3Iubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSB8fCAvKiogQHR5cGUge0NvbW1lbnR9ICovIChhbmNob3IpLmRhdGEgIT09IEhZRFJBVElPTl9TVEFSVClcblx0XHQpIHtcblx0XHRcdGFuY2hvciA9IGdldF9uZXh0X3NpYmxpbmcoYW5jaG9yKTtcblx0XHR9XG5cblx0XHRpZiAoIWFuY2hvcikge1xuXHRcdFx0dGhyb3cgSFlEUkFUSU9OX0VSUk9SO1xuXHRcdH1cblxuXHRcdHNldF9oeWRyYXRpbmcodHJ1ZSk7XG5cdFx0c2V0X2h5ZHJhdGVfbm9kZSgvKiogQHR5cGUge0NvbW1lbnR9ICovIChhbmNob3IpKTtcblxuXHRcdGNvbnN0IGluc3RhbmNlID0gX21vdW50KGNvbXBvbmVudCwgeyAuLi5vcHRpb25zLCBhbmNob3IgfSk7XG5cblx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblxuXHRcdHJldHVybiAvKiogIEB0eXBlIHtFeHBvcnRzfSAqLyAoaW5zdGFuY2UpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIHJlLXRocm93IFN2ZWx0ZSBlcnJvcnMgLSB0aGV5IGFyZSBjZXJ0YWlubHkgbm90IHJlbGF0ZWQgdG8gaHlkcmF0aW9uXG5cdFx0aWYgKFxuXHRcdFx0ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJlxuXHRcdFx0ZXJyb3IubWVzc2FnZS5zcGxpdCgnXFxuJykuc29tZSgobGluZSkgPT4gbGluZS5zdGFydHNXaXRoKCdodHRwczovL3N2ZWx0ZS5kZXYvZS8nKSlcblx0XHQpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0XHRpZiAoZXJyb3IgIT09IEhZRFJBVElPTl9FUlJPUikge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIGh5ZHJhdGU6ICcsIGVycm9yKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5yZWNvdmVyID09PSBmYWxzZSkge1xuXHRcdFx0ZS5oeWRyYXRpb25fZmFpbGVkKCk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYW4gZXJyb3Igb2NjdXJyZWQgYWJvdmUsIHRoZSBvcGVyYXRpb25zIG1pZ2h0IG5vdCB5ZXQgaGF2ZSBiZWVuIGluaXRpYWxpc2VkLlxuXHRcdGluaXRfb3BlcmF0aW9ucygpO1xuXHRcdGNsZWFyX3RleHRfY29udGVudCh0YXJnZXQpO1xuXG5cdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdFx0cmV0dXJuIG1vdW50KGNvbXBvbmVudCwgb3B0aW9ucyk7XG5cdH0gZmluYWxseSB7XG5cdFx0c2V0X2h5ZHJhdGluZyh3YXNfaHlkcmF0aW5nKTtcblx0XHRzZXRfaHlkcmF0ZV9ub2RlKHByZXZpb3VzX2h5ZHJhdGVfbm9kZSk7XG5cdH1cbn1cblxuLyoqIEB0eXBlIHtNYXA8RXZlbnRUYXJnZXQsIE1hcDxzdHJpbmcsIG51bWJlcj4+fSAqL1xuY29uc3QgbGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gRXhwb3J0c1xuICogQHBhcmFtIHtDb21wb25lbnRUeXBlPFN2ZWx0ZUNvbXBvbmVudDxhbnk+PiB8IENvbXBvbmVudDxhbnk+fSBDb21wb25lbnRcbiAqIEBwYXJhbSB7TW91bnRPcHRpb25zfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7RXhwb3J0c31cbiAqL1xuZnVuY3Rpb24gX21vdW50KFxuXHRDb21wb25lbnQsXG5cdHsgdGFyZ2V0LCBhbmNob3IsIHByb3BzID0ge30sIGV2ZW50cywgY29udGV4dCwgaW50cm8gPSB0cnVlLCB0cmFuc2Zvcm1FcnJvciB9XG4pIHtcblx0aW5pdF9vcGVyYXRpb25zKCk7XG5cblx0LyoqIEB0eXBlIHtFeHBvcnRzfSAqL1xuXHQvLyBAdHMtZXhwZWN0LWVycm9yIHdpbGwgYmUgZGVmaW5lZCBiZWNhdXNlIHRoZSByZW5kZXIgZWZmZWN0IHJ1bnMgc3luY2hyb25vdXNseVxuXHR2YXIgY29tcG9uZW50ID0gdW5kZWZpbmVkO1xuXG5cdHZhciB1bm1vdW50ID0gY29tcG9uZW50X3Jvb3QoKCkgPT4ge1xuXHRcdHZhciBhbmNob3Jfbm9kZSA9IGFuY2hvciA/PyB0YXJnZXQuYXBwZW5kQ2hpbGQoY3JlYXRlX3RleHQoKSk7XG5cblx0XHRib3VuZGFyeShcblx0XHRcdC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoYW5jaG9yX25vZGUpLFxuXHRcdFx0e1xuXHRcdFx0XHRwZW5kaW5nOiAoKSA9PiB7fVxuXHRcdFx0fSxcblx0XHRcdChhbmNob3Jfbm9kZSkgPT4ge1xuXHRcdFx0XHRwdXNoKHt9KTtcblx0XHRcdFx0dmFyIGN0eCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dH0gKi8gKGNvbXBvbmVudF9jb250ZXh0KTtcblx0XHRcdFx0aWYgKGNvbnRleHQpIGN0eC5jID0gY29udGV4dDtcblxuXHRcdFx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRcdFx0Ly8gV2UgY2FuJ3Qgc3ByZWFkIHRoZSBvYmplY3Qgb3IgZWxzZSB3ZSdkIGxvc2UgdGhlIHN0YXRlIHByb3h5IHN0dWZmLCBpZiBpdCBpcyBvbmVcblx0XHRcdFx0XHQvKiogQHR5cGUge2FueX0gKi8gKHByb3BzKS4kJGV2ZW50cyA9IGV2ZW50cztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0XHRhc3NpZ25fbm9kZXMoLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChhbmNob3Jfbm9kZSksIG51bGwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2hvdWxkX2ludHJvID0gaW50cm87XG5cdFx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgdGhlIHB1YmxpYyB0eXBpbmdzIGFyZSBub3Qgd2hhdCB0aGUgYWN0dWFsIGZ1bmN0aW9uIGxvb2tzIGxpa2Vcblx0XHRcdFx0Y29tcG9uZW50ID0gQ29tcG9uZW50KGFuY2hvcl9ub2RlLCBwcm9wcykgfHwge307XG5cdFx0XHRcdHNob3VsZF9pbnRybyA9IHRydWU7XG5cblx0XHRcdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0XHRcdC8qKiBAdHlwZSB7RWZmZWN0ICYgeyBub2RlczogRWZmZWN0Tm9kZXMgfX0gKi8gKGFjdGl2ZV9lZmZlY3QpLm5vZGVzLmVuZCA9IGh5ZHJhdGVfbm9kZTtcblxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdGh5ZHJhdGVfbm9kZSA9PT0gbnVsbCB8fFxuXHRcdFx0XHRcdFx0aHlkcmF0ZV9ub2RlLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUgfHxcblx0XHRcdFx0XHRcdC8qKiBAdHlwZSB7Q29tbWVudH0gKi8gKGh5ZHJhdGVfbm9kZSkuZGF0YSAhPT0gSFlEUkFUSU9OX0VORFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dy5oeWRyYXRpb25fbWlzbWF0Y2goKTtcblx0XHRcdFx0XHRcdHRocm93IEhZRFJBVElPTl9FUlJPUjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwb3AoKTtcblx0XHRcdH0sXG5cdFx0XHR0cmFuc2Zvcm1FcnJvclxuXHRcdCk7XG5cblx0XHQvLyBTZXR1cCBldmVudCBkZWxlZ2F0aW9uIF9hZnRlcl8gY29tcG9uZW50IGlzIG1vdW50ZWQgLSBpZiBhbiBlcnJvciB3b3VsZCBoYXBwZW4gZHVyaW5nIG1vdW50LCBpdCB3b3VsZCBvdGhlcndpc2Ugbm90IGJlIGNsZWFuZWQgdXBcblx0XHQvKiogQHR5cGUge1NldDxzdHJpbmc+fSAqL1xuXHRcdHZhciByZWdpc3RlcmVkX2V2ZW50cyA9IG5ldyBTZXQoKTtcblxuXHRcdC8qKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGV2ZW50cyAqL1xuXHRcdHZhciBldmVudF9oYW5kbGUgPSAoZXZlbnRzKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZXZlbnRfbmFtZSA9IGV2ZW50c1tpXTtcblxuXHRcdFx0XHRpZiAocmVnaXN0ZXJlZF9ldmVudHMuaGFzKGV2ZW50X25hbWUpKSBjb250aW51ZTtcblx0XHRcdFx0cmVnaXN0ZXJlZF9ldmVudHMuYWRkKGV2ZW50X25hbWUpO1xuXG5cdFx0XHRcdHZhciBwYXNzaXZlID0gaXNfcGFzc2l2ZV9ldmVudChldmVudF9uYW1lKTtcblxuXHRcdFx0XHQvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGJvdGggdGhlIGNvbnRhaW5lciBhbmQgdGhlIGRvY3VtZW50LlxuXHRcdFx0XHQvLyBUaGUgY29udGFpbmVyIGxpc3RlbmVyIGVuc3VyZXMgd2UgY2F0Y2ggZXZlbnRzIGZyb20gd2l0aGluIGluIGNhc2Vcblx0XHRcdFx0Ly8gdGhlIG91dGVyIGNvbnRlbnQgc3RvcHMgcHJvcGFnYXRpb24gb2YgdGhlIGV2ZW50LlxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBUaGUgZG9jdW1lbnQgbGlzdGVuZXIgZW5zdXJlcyB3ZSBjYXRjaCBldmVudHMgdGhhdCBvcmlnaW5hdGUgZnJvbSBlbGVtZW50cyB0aGF0IHdlcmVcblx0XHRcdFx0Ly8gbWFudWFsbHkgbW92ZWQgb3V0c2lkZSBvZiB0aGUgY29udGFpbmVyIChlLmcuIHZpYSBtYW51YWwgcG9ydGFscykuXG5cdFx0XHRcdGZvciAoY29uc3Qgbm9kZSBvZiBbdGFyZ2V0LCBkb2N1bWVudF0pIHtcblx0XHRcdFx0XHR2YXIgY291bnRzID0gbGlzdGVuZXJzLmdldChub2RlKTtcblxuXHRcdFx0XHRcdGlmIChjb3VudHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y291bnRzID0gbmV3IE1hcCgpO1xuXHRcdFx0XHRcdFx0bGlzdGVuZXJzLnNldChub2RlLCBjb3VudHMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBjb3VudCA9IGNvdW50cy5nZXQoZXZlbnRfbmFtZSk7XG5cblx0XHRcdFx0XHRpZiAoY291bnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIGhhbmRsZV9ldmVudF9wcm9wYWdhdGlvbiwgeyBwYXNzaXZlIH0pO1xuXHRcdFx0XHRcdFx0Y291bnRzLnNldChldmVudF9uYW1lLCAxKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y291bnRzLnNldChldmVudF9uYW1lLCBjb3VudCArIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRldmVudF9oYW5kbGUoYXJyYXlfZnJvbShhbGxfcmVnaXN0ZXJlZF9ldmVudHMpKTtcblx0XHRyb290X2V2ZW50X2hhbmRsZXMuYWRkKGV2ZW50X2hhbmRsZSk7XG5cblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0Zm9yICh2YXIgZXZlbnRfbmFtZSBvZiByZWdpc3RlcmVkX2V2ZW50cykge1xuXHRcdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2YgW3RhcmdldCwgZG9jdW1lbnRdKSB7XG5cdFx0XHRcdFx0dmFyIGNvdW50cyA9IC8qKiBAdHlwZSB7TWFwPHN0cmluZywgbnVtYmVyPn0gKi8gKGxpc3RlbmVycy5nZXQobm9kZSkpO1xuXHRcdFx0XHRcdHZhciBjb3VudCA9IC8qKiBAdHlwZSB7bnVtYmVyfSAqLyAoY291bnRzLmdldChldmVudF9uYW1lKSk7XG5cblx0XHRcdFx0XHRpZiAoLS1jb3VudCA9PSAwKSB7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRfbmFtZSwgaGFuZGxlX2V2ZW50X3Byb3BhZ2F0aW9uKTtcblx0XHRcdFx0XHRcdGNvdW50cy5kZWxldGUoZXZlbnRfbmFtZSk7XG5cblx0XHRcdFx0XHRcdGlmIChjb3VudHMuc2l6ZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lcnMuZGVsZXRlKG5vZGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb3VudHMuc2V0KGV2ZW50X25hbWUsIGNvdW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cm9vdF9ldmVudF9oYW5kbGVzLmRlbGV0ZShldmVudF9oYW5kbGUpO1xuXG5cdFx0XHRpZiAoYW5jaG9yX25vZGUgIT09IGFuY2hvcikge1xuXHRcdFx0XHRhbmNob3Jfbm9kZS5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChhbmNob3Jfbm9kZSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG5cblx0bW91bnRlZF9jb21wb25lbnRzLnNldChjb21wb25lbnQsIHVubW91bnQpO1xuXHRyZXR1cm4gY29tcG9uZW50O1xufVxuXG4vKipcbiAqIFJlZmVyZW5jZXMgb2YgdGhlIGNvbXBvbmVudHMgdGhhdCB3ZXJlIG1vdW50ZWQgb3IgaHlkcmF0ZWQuXG4gKiBVc2VzIGEgYFdlYWtNYXBgIHRvIGF2b2lkIG1lbW9yeSBsZWFrcy5cbiAqL1xubGV0IG1vdW50ZWRfY29tcG9uZW50cyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogVW5tb3VudHMgYSBjb21wb25lbnQgdGhhdCB3YXMgcHJldmlvdXNseSBtb3VudGVkIHVzaW5nIGBtb3VudGAgb3IgYGh5ZHJhdGVgLlxuICpcbiAqIFNpbmNlIDUuMTMuMCwgaWYgYG9wdGlvbnMub3V0cm9gIGlzIGB0cnVlYCwgW3RyYW5zaXRpb25zXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvdHJhbnNpdGlvbikgd2lsbCBwbGF5IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICpcbiAqIFJldHVybnMgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyBhZnRlciB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBpZiBgb3B0aW9ucy5vdXRyb2AgaXMgdHJ1ZSwgb3IgaW1tZWRpYXRlbHkgb3RoZXJ3aXNlIChwcmlvciB0byA1LjEzLjAsIHJldHVybnMgYHZvaWRgKS5cbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgbW91bnQsIHVubW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICogaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5zdmVsdGUnO1xuICpcbiAqIGNvbnN0IGFwcCA9IG1vdW50KEFwcCwgeyB0YXJnZXQ6IGRvY3VtZW50LmJvZHkgfSk7XG4gKlxuICogLy8gbGF0ZXIuLi5cbiAqIHVubW91bnQoYXBwLCB7IG91dHJvOiB0cnVlIH0pO1xuICogYGBgXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IGNvbXBvbmVudFxuICogQHBhcmFtIHt7IG91dHJvPzogYm9vbGVhbiB9fSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5tb3VudChjb21wb25lbnQsIG9wdGlvbnMpIHtcblx0Y29uc3QgZm4gPSBtb3VudGVkX2NvbXBvbmVudHMuZ2V0KGNvbXBvbmVudCk7XG5cblx0aWYgKGZuKSB7XG5cdFx0bW91bnRlZF9jb21wb25lbnRzLmRlbGV0ZShjb21wb25lbnQpO1xuXHRcdHJldHVybiBmbihvcHRpb25zKTtcblx0fVxuXG5cdGlmIChERVYpIHtcblx0XHRpZiAoU1RBVEVfU1lNQk9MIGluIGNvbXBvbmVudCkge1xuXHRcdFx0dy5zdGF0ZV9wcm94eV91bm1vdW50KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHcubGlmZWN5Y2xlX2RvdWJsZV91bm1vdW50KCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBFZmZlY3QsIFRlbXBsYXRlTm9kZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBCYXRjaCwgY3VycmVudF9iYXRjaCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvYmF0Y2guanMnO1xuaW1wb3J0IHtcblx0YnJhbmNoLFxuXHRkZXN0cm95X2VmZmVjdCxcblx0bW92ZV9lZmZlY3QsXG5cdHBhdXNlX2VmZmVjdCxcblx0cmVzdW1lX2VmZmVjdFxufSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgaHlkcmF0ZV9ub2RlLCBoeWRyYXRpbmcgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgY3JlYXRlX3RleHQsIHNob3VsZF9kZWZlcl9hcHBlbmQgfSBmcm9tICcuLi9vcGVyYXRpb25zLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7eyBlZmZlY3Q6IEVmZmVjdCwgZnJhZ21lbnQ6IERvY3VtZW50RnJhZ21lbnQgfX0gQnJhbmNoXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgS2V5XG4gKi9cbmV4cG9ydCBjbGFzcyBCcmFuY2hNYW5hZ2VyIHtcblx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovXG5cdGFuY2hvcjtcblxuXHQvKiogQHR5cGUge01hcDxCYXRjaCwgS2V5Pn0gKi9cblx0I2JhdGNoZXMgPSBuZXcgTWFwKCk7XG5cblx0LyoqXG5cdCAqIE1hcCBvZiBrZXlzIHRvIGVmZmVjdHMgdGhhdCBhcmUgY3VycmVudGx5IHJlbmRlcmVkIGluIHRoZSBET00uXG5cdCAqIFRoZXNlIGVmZmVjdHMgYXJlIHZpc2libGUgYW5kIGFjdGl2ZWx5IHBhcnQgb2YgdGhlIGRvY3VtZW50IHRyZWUuXG5cdCAqIEV4YW1wbGU6XG5cdCAqIGBgYFxuXHQgKiB7I2lmIGNvbmRpdGlvbn1cblx0ICogXHRmb29cblx0ICogezplbHNlfVxuXHQgKiBcdGJhclxuXHQgKiB7L2lmfVxuXHQgKiBgYGBcblx0ICogQ2FuIHJlc3VsdCBpbiB0aGUgZW50cmllcyBgdHJ1ZS0+RWZmZWN0YCBhbmQgYGZhbHNlLT5FZmZlY3RgXG5cdCAqIEB0eXBlIHtNYXA8S2V5LCBFZmZlY3Q+fVxuXHQgKi9cblx0I29uc2NyZWVuID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBTaW1pbGFyIHRvICNvbnNjcmVlbiB3aXRoIHJlc3BlY3QgdG8gdGhlIGtleXMsIGJ1dCBjb250YWlucyBicmFuY2hlcyB0aGF0IGFyZSBub3QgeWV0XG5cdCAqIGluIHRoZSBET00sIGJlY2F1c2UgdGhlaXIgaW5zZXJ0aW9uIGlzIGRlZmVycmVkLlxuXHQgKiBAdHlwZSB7TWFwPEtleSwgQnJhbmNoPn1cblx0ICovXG5cdCNvZmZzY3JlZW4gPSBuZXcgTWFwKCk7XG5cblx0LyoqXG5cdCAqIEtleXMgb2YgZWZmZWN0cyB0aGF0IGFyZSBjdXJyZW50bHkgb3V0cm9pbmdcblx0ICogQHR5cGUge1NldDxLZXk+fVxuXHQgKi9cblx0I291dHJvaW5nID0gbmV3IFNldCgpO1xuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRvIHBhdXNlIChpLmUuIG91dHJvKSBvbiBjaGFuZ2UsIG9yIGRlc3Ryb3kgaW1tZWRpYXRlbHkuXG5cdCAqIFRoaXMgaXMgbmVjZXNzYXJ5IGZvciBgPHN2ZWx0ZTplbGVtZW50PmBcblx0ICovXG5cdCN0cmFuc2l0aW9uID0gdHJ1ZTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IGFuY2hvclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHRyYW5zaXRpb25cblx0ICovXG5cdGNvbnN0cnVjdG9yKGFuY2hvciwgdHJhbnNpdGlvbiA9IHRydWUpIHtcblx0XHR0aGlzLmFuY2hvciA9IGFuY2hvcjtcblx0XHR0aGlzLiN0cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcblx0fVxuXG5cdCNjb21taXQgPSAoKSA9PiB7XG5cdFx0dmFyIGJhdGNoID0gLyoqIEB0eXBlIHtCYXRjaH0gKi8gKGN1cnJlbnRfYmF0Y2gpO1xuXG5cdFx0Ly8gaWYgdGhpcyBiYXRjaCB3YXMgbWFkZSBvYnNvbGV0ZSwgYmFpbFxuXHRcdGlmICghdGhpcy4jYmF0Y2hlcy5oYXMoYmF0Y2gpKSByZXR1cm47XG5cblx0XHR2YXIga2V5ID0gLyoqIEB0eXBlIHtLZXl9ICovICh0aGlzLiNiYXRjaGVzLmdldChiYXRjaCkpO1xuXG5cdFx0dmFyIG9uc2NyZWVuID0gdGhpcy4jb25zY3JlZW4uZ2V0KGtleSk7XG5cblx0XHRpZiAob25zY3JlZW4pIHtcblx0XHRcdC8vIGVmZmVjdCBpcyBhbHJlYWR5IGluIHRoZSBET00g4oCUIGFib3J0IGFueSBjdXJyZW50IG91dHJvXG5cdFx0XHRyZXN1bWVfZWZmZWN0KG9uc2NyZWVuKTtcblx0XHRcdHRoaXMuI291dHJvaW5nLmRlbGV0ZShrZXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBlZmZlY3QgaXMgY3VycmVudGx5IG9mZnNjcmVlbi4gcHV0IGl0IGluIHRoZSBET01cblx0XHRcdHZhciBvZmZzY3JlZW4gPSB0aGlzLiNvZmZzY3JlZW4uZ2V0KGtleSk7XG5cblx0XHRcdGlmIChvZmZzY3JlZW4pIHtcblx0XHRcdFx0dGhpcy4jb25zY3JlZW4uc2V0KGtleSwgb2Zmc2NyZWVuLmVmZmVjdCk7XG5cdFx0XHRcdHRoaXMuI29mZnNjcmVlbi5kZWxldGUoa2V5KTtcblxuXHRcdFx0XHQvLyByZW1vdmUgdGhlIGFuY2hvci4uLlxuXHRcdFx0XHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKG9mZnNjcmVlbi5mcmFnbWVudC5sYXN0Q2hpbGQpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdC8vIC4uLmFuZCBhcHBlbmQgdGhlIGZyYWdtZW50XG5cdFx0XHRcdHRoaXMuYW5jaG9yLmJlZm9yZShvZmZzY3JlZW4uZnJhZ21lbnQpO1xuXHRcdFx0XHRvbnNjcmVlbiA9IG9mZnNjcmVlbi5lZmZlY3Q7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBbYiwga10gb2YgdGhpcy4jYmF0Y2hlcykge1xuXHRcdFx0dGhpcy4jYmF0Y2hlcy5kZWxldGUoYik7XG5cblx0XHRcdGlmIChiID09PSBiYXRjaCkge1xuXHRcdFx0XHQvLyBrZWVwIHZhbHVlcyBmb3IgbmV3ZXIgYmF0Y2hlc1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgb2Zmc2NyZWVuID0gdGhpcy4jb2Zmc2NyZWVuLmdldChrKTtcblxuXHRcdFx0aWYgKG9mZnNjcmVlbikge1xuXHRcdFx0XHQvLyBmb3Igb2xkZXIgYmF0Y2hlcywgZGVzdHJveSBvZmZzY3JlZW4gZWZmZWN0c1xuXHRcdFx0XHQvLyBhcyB0aGV5IHdpbGwgbmV2ZXIgYmUgY29tbWl0dGVkXG5cdFx0XHRcdGRlc3Ryb3lfZWZmZWN0KG9mZnNjcmVlbi5lZmZlY3QpO1xuXHRcdFx0XHR0aGlzLiNvZmZzY3JlZW4uZGVsZXRlKGspO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIG91dHJvL2Rlc3Ryb3kgYWxsIG9uc2NyZWVuIGVmZmVjdHMuLi5cblx0XHRmb3IgKGNvbnN0IFtrLCBlZmZlY3RdIG9mIHRoaXMuI29uc2NyZWVuKSB7XG5cdFx0XHQvLyAuLi5leGNlcHQgdGhlIG9uZSB0aGF0IHdhcyBqdXN0IGNvbW1pdHRlZFxuXHRcdFx0Ly8gICAgb3IgdGhvc2UgdGhhdCBhcmUgYWxyZWFkeSBvdXRyb2luZyAoZWxzZSB0aGUgdHJhbnNpdGlvbiBpcyBhYm9ydGVkIGFuZCB0aGUgZWZmZWN0IGRlc3Ryb3llZCByaWdodCBhd2F5KVxuXHRcdFx0aWYgKGsgPT09IGtleSB8fCB0aGlzLiNvdXRyb2luZy5oYXMoaykpIGNvbnRpbnVlO1xuXG5cdFx0XHRjb25zdCBvbl9kZXN0cm95ID0gKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBrZXlzID0gQXJyYXkuZnJvbSh0aGlzLiNiYXRjaGVzLnZhbHVlcygpKTtcblxuXHRcdFx0XHRpZiAoa2V5cy5pbmNsdWRlcyhrKSkge1xuXHRcdFx0XHRcdC8vIGtlZXAgdGhlIGVmZmVjdCBvZmZzY3JlZW4sIGFzIGFub3RoZXIgYmF0Y2ggd2lsbCBuZWVkIGl0XG5cdFx0XHRcdFx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcdG1vdmVfZWZmZWN0KGVmZmVjdCwgZnJhZ21lbnQpO1xuXG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kKGNyZWF0ZV90ZXh0KCkpOyAvLyBUT0RPIGNhbiB3ZSBhdm9pZCB0aGlzP1xuXG5cdFx0XHRcdFx0dGhpcy4jb2Zmc2NyZWVuLnNldChrLCB7IGVmZmVjdCwgZnJhZ21lbnQgfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZGVzdHJveV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuI291dHJvaW5nLmRlbGV0ZShrKTtcblx0XHRcdFx0dGhpcy4jb25zY3JlZW4uZGVsZXRlKGspO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKHRoaXMuI3RyYW5zaXRpb24gfHwgIW9uc2NyZWVuKSB7XG5cdFx0XHRcdHRoaXMuI291dHJvaW5nLmFkZChrKTtcblx0XHRcdFx0cGF1c2VfZWZmZWN0KGVmZmVjdCwgb25fZGVzdHJveSwgZmFsc2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b25fZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtCYXRjaH0gYmF0Y2hcblx0ICovXG5cdCNkaXNjYXJkID0gKGJhdGNoKSA9PiB7XG5cdFx0dGhpcy4jYmF0Y2hlcy5kZWxldGUoYmF0Y2gpO1xuXG5cdFx0Y29uc3Qga2V5cyA9IEFycmF5LmZyb20odGhpcy4jYmF0Y2hlcy52YWx1ZXMoKSk7XG5cblx0XHRmb3IgKGNvbnN0IFtrLCBicmFuY2hdIG9mIHRoaXMuI29mZnNjcmVlbikge1xuXHRcdFx0aWYgKCFrZXlzLmluY2x1ZGVzKGspKSB7XG5cdFx0XHRcdGRlc3Ryb3lfZWZmZWN0KGJyYW5jaC5lZmZlY3QpO1xuXHRcdFx0XHR0aGlzLiNvZmZzY3JlZW4uZGVsZXRlKGspO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHthbnl9IGtleVxuXHQgKiBAcGFyYW0ge251bGwgfCAoKHRhcmdldDogVGVtcGxhdGVOb2RlKSA9PiB2b2lkKX0gZm5cblx0ICovXG5cdGVuc3VyZShrZXksIGZuKSB7XG5cdFx0dmFyIGJhdGNoID0gLyoqIEB0eXBlIHtCYXRjaH0gKi8gKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdHZhciBkZWZlciA9IHNob3VsZF9kZWZlcl9hcHBlbmQoKTtcblxuXHRcdGlmIChmbiAmJiAhdGhpcy4jb25zY3JlZW4uaGFzKGtleSkgJiYgIXRoaXMuI29mZnNjcmVlbi5oYXMoa2V5KSkge1xuXHRcdFx0aWYgKGRlZmVyKSB7XG5cdFx0XHRcdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0dmFyIHRhcmdldCA9IGNyZWF0ZV90ZXh0KCk7XG5cblx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kKHRhcmdldCk7XG5cblx0XHRcdFx0dGhpcy4jb2Zmc2NyZWVuLnNldChrZXksIHtcblx0XHRcdFx0XHRlZmZlY3Q6IGJyYW5jaCgoKSA9PiBmbih0YXJnZXQpKSxcblx0XHRcdFx0XHRmcmFnbWVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuI29uc2NyZWVuLnNldChcblx0XHRcdFx0XHRrZXksXG5cdFx0XHRcdFx0YnJhbmNoKCgpID0+IGZuKHRoaXMuYW5jaG9yKSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLiNiYXRjaGVzLnNldChiYXRjaCwga2V5KTtcblxuXHRcdGlmIChkZWZlcikge1xuXHRcdFx0Zm9yIChjb25zdCBbaywgZWZmZWN0XSBvZiB0aGlzLiNvbnNjcmVlbikge1xuXHRcdFx0XHRpZiAoayA9PT0ga2V5KSB7XG5cdFx0XHRcdFx0YmF0Y2gudW5za2lwX2VmZmVjdChlZmZlY3QpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhdGNoLnNraXBfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjb25zdCBbaywgYnJhbmNoXSBvZiB0aGlzLiNvZmZzY3JlZW4pIHtcblx0XHRcdFx0aWYgKGsgPT09IGtleSkge1xuXHRcdFx0XHRcdGJhdGNoLnVuc2tpcF9lZmZlY3QoYnJhbmNoLmVmZmVjdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YmF0Y2guc2tpcF9lZmZlY3QoYnJhbmNoLmVmZmVjdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0YmF0Y2gub25jb21taXQodGhpcy4jY29tbWl0KTtcblx0XHRcdGJhdGNoLm9uZGlzY2FyZCh0aGlzLiNkaXNjYXJkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0XHR0aGlzLmFuY2hvciA9IGh5ZHJhdGVfbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy4jY29tbWl0KCk7XG5cdFx0fVxuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IFRlbXBsYXRlTm9kZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBFRkZFQ1RfVFJBTlNQQVJFTlQgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQge1xuXHRoeWRyYXRlX25leHQsXG5cdGh5ZHJhdGluZyxcblx0cmVhZF9oeWRyYXRpb25faW5zdHJ1Y3Rpb24sXG5cdHNraXBfbm9kZXMsXG5cdHNldF9oeWRyYXRlX25vZGUsXG5cdHNldF9oeWRyYXRpbmdcbn0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGJsb2NrIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IEJyYW5jaE1hbmFnZXIgfSBmcm9tICcuL2JyYW5jaGVzLmpzJztcbmltcG9ydCB7IEhZRFJBVElPTl9TVEFSVCwgSFlEUkFUSU9OX1NUQVJUX0VMU0UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gKiBAcGFyYW0geyhicmFuY2g6IChmbjogKGFuY2hvcjogTm9kZSkgPT4gdm9pZCwga2V5PzogbnVtYmVyIHwgZmFsc2UpID0+IHZvaWQpID0+IHZvaWR9IGZuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbHNlaWZdIFRydWUgaWYgdGhpcyBpcyBhbiBgezplbHNlIGlmIC4uLn1gIGJsb2NrIHJhdGhlciB0aGFuIGFuIGB7I2lmIC4uLn1gLCBhcyB0aGF0IGFmZmVjdHMgd2hpY2ggdHJhbnNpdGlvbnMgYXJlIGNvbnNpZGVyZWQgJ2xvY2FsJ1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpZl9ibG9jayhub2RlLCBmbiwgZWxzZWlmID0gZmFsc2UpIHtcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHR9XG5cblx0dmFyIGJyYW5jaGVzID0gbmV3IEJyYW5jaE1hbmFnZXIobm9kZSk7XG5cdHZhciBmbGFncyA9IGVsc2VpZiA/IEVGRkVDVF9UUkFOU1BBUkVOVCA6IDA7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgZmFsc2V9IGtleVxuXHQgKiBAcGFyYW0ge251bGwgfCAoKGFuY2hvcjogTm9kZSkgPT4gdm9pZCl9IGZuXG5cdCAqL1xuXHRmdW5jdGlvbiB1cGRhdGVfYnJhbmNoKGtleSwgZm4pIHtcblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRjb25zdCBkYXRhID0gcmVhZF9oeWRyYXRpb25faW5zdHJ1Y3Rpb24obm9kZSk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUge251bWJlciB8IGZhbHNlfVxuXHRcdFx0ICogXCJbXCIgPSBicmFuY2ggMCwgXCJbMVwiID0gYnJhbmNoIDEsIFwiWzJcIiA9IGJyYW5jaCAyLCAuLi4sIFwiWyFcIiA9IGVsc2UgKGZhbHNlKVxuXHRcdFx0ICovXG5cdFx0XHR2YXIgaHlkcmF0ZWRfa2V5O1xuXG5cdFx0XHRpZiAoZGF0YSA9PT0gSFlEUkFUSU9OX1NUQVJUKSB7XG5cdFx0XHRcdGh5ZHJhdGVkX2tleSA9IDA7XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGEgPT09IEhZRFJBVElPTl9TVEFSVF9FTFNFKSB7XG5cdFx0XHRcdGh5ZHJhdGVkX2tleSA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aHlkcmF0ZWRfa2V5ID0gcGFyc2VJbnQoZGF0YS5zdWJzdHJpbmcoMSkpOyAvLyBcIlsxXCIsIFwiWzJcIiwgZXRjLlxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoa2V5ICE9PSBoeWRyYXRlZF9rZXkpIHtcblx0XHRcdFx0Ly8gSHlkcmF0aW9uIG1pc21hdGNoOiByZW1vdmUgZXZlcnl0aGluZyBpbnNpZGUgdGhlIGFuY2hvciBhbmQgc3RhcnQgZnJlc2guXG5cdFx0XHRcdC8vIFRoaXMgY291bGQgaGFwcGVuIHdpdGggYHsjaWYgYnJvd3Nlcn0uLi57L2lmfWAsIGZvciBleGFtcGxlXG5cdFx0XHRcdHZhciBhbmNob3IgPSBza2lwX25vZGVzKCk7XG5cblx0XHRcdFx0c2V0X2h5ZHJhdGVfbm9kZShhbmNob3IpO1xuXHRcdFx0XHRicmFuY2hlcy5hbmNob3IgPSBhbmNob3I7XG5cblx0XHRcdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdFx0XHRcdGJyYW5jaGVzLmVuc3VyZShrZXksIGZuKTtcblx0XHRcdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YnJhbmNoZXMuZW5zdXJlKGtleSwgZm4pO1xuXHR9XG5cblx0YmxvY2soKCkgPT4ge1xuXHRcdHZhciBoYXNfYnJhbmNoID0gZmFsc2U7XG5cblx0XHRmbigoZm4sIGtleSA9IDApID0+IHtcblx0XHRcdGhhc19icmFuY2ggPSB0cnVlO1xuXHRcdFx0dXBkYXRlX2JyYW5jaChrZXksIGZuKTtcblx0XHR9KTtcblxuXHRcdGlmICghaGFzX2JyYW5jaCkge1xuXHRcdFx0dXBkYXRlX2JyYW5jaChmYWxzZSwgbnVsbCk7XG5cdFx0fVxuXHR9LCBmbGFncyk7XG59XG4iLCIvKiogQGltcG9ydCB7IEVhY2hJdGVtLCBFYWNoT3V0cm9Hcm91cCwgRWFjaFN0YXRlLCBFZmZlY3QsIEVmZmVjdE5vZGVzLCBNYXliZVNvdXJjZSwgU291cmNlLCBUZW1wbGF0ZU5vZGUsIFRyYW5zaXRpb25NYW5hZ2VyLCBWYWx1ZSB9IGZyb20gJyNjbGllbnQnICovXG4vKiogQGltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7ICovXG5pbXBvcnQge1xuXHRFQUNIX0lOREVYX1JFQUNUSVZFLFxuXHRFQUNIX0lTX0FOSU1BVEVELFxuXHRFQUNIX0lTX0NPTlRST0xMRUQsXG5cdEVBQ0hfSVRFTV9JTU1VVEFCTEUsXG5cdEVBQ0hfSVRFTV9SRUFDVElWRSxcblx0SFlEUkFUSU9OX0VORCxcblx0SFlEUkFUSU9OX1NUQVJUX0VMU0Vcbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7XG5cdGh5ZHJhdGVfbmV4dCxcblx0aHlkcmF0ZV9ub2RlLFxuXHRoeWRyYXRpbmcsXG5cdHJlYWRfaHlkcmF0aW9uX2luc3RydWN0aW9uLFxuXHRza2lwX25vZGVzLFxuXHRzZXRfaHlkcmF0ZV9ub2RlLFxuXHRzZXRfaHlkcmF0aW5nXG59IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQge1xuXHRjbGVhcl90ZXh0X2NvbnRlbnQsXG5cdGNyZWF0ZV90ZXh0LFxuXHRnZXRfZmlyc3RfY2hpbGQsXG5cdGdldF9uZXh0X3NpYmxpbmcsXG5cdHNob3VsZF9kZWZlcl9hcHBlbmRcbn0gZnJvbSAnLi4vb3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQge1xuXHRibG9jayxcblx0YnJhbmNoLFxuXHRkZXN0cm95X2VmZmVjdCxcblx0cGF1c2VfZWZmZWN0LFxuXHRyZXN1bWVfZWZmZWN0XG59IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBzb3VyY2UsIG11dGFibGVfc291cmNlLCBpbnRlcm5hbF9zZXQgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgYXJyYXlfZnJvbSwgaXNfYXJyYXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgQlJBTkNIX0VGRkVDVCwgQ09NTUVOVF9OT0RFLCBFRkZFQ1RfT0ZGU0NSRUVOLCBJTkVSVCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IHF1ZXVlX21pY3JvX3Rhc2sgfSBmcm9tICcuLi90YXNrLmpzJztcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBkZXJpdmVkX3NhZmVfZXF1YWwgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2Rlcml2ZWRzLmpzJztcbmltcG9ydCB7IGN1cnJlbnRfYmF0Y2ggfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vLi4vZXJyb3JzLmpzJztcblxuLy8gV2hlbiBtYWtpbmcgc3Vic3RhbnRpdmUgY2hhbmdlcyB0byB0aGlzIGZpbGUsIHZhbGlkYXRlIHRoZW0gd2l0aCB0aGUgZWFjaCBibG9jayBzdHJlc3MgdGVzdDpcbi8vIGh0dHBzOi8vc3ZlbHRlLmRldi9wbGF5Z3JvdW5kLzE5NzJiMmNmNDY1NjQ0NzZhZDhjOGM2NDA1YjIzYjdiXG4vLyBUaGlzIHRlc3QgYWxzbyBleGlzdHMgaW4gdGhpcyByZXBvLCBhcyBgcGFja2FnZXMvc3ZlbHRlL3Rlc3RzL21hbnVhbC9lYWNoLXN0cmVzcy10ZXN0YFxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBfXG4gKiBAcGFyYW0ge251bWJlcn0gaVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZXgoXywgaSkge1xuXHRyZXR1cm4gaTtcbn1cblxuLyoqXG4gKiBQYXVzZSBtdWx0aXBsZSBlZmZlY3RzIHNpbXVsdGFuZW91c2x5LCBhbmQgY29vcmRpbmF0ZSB0aGVpclxuICogc3Vic2VxdWVudCBkZXN0cnVjdGlvbi4gVXNlZCBpbiBlYWNoIGJsb2Nrc1xuICogQHBhcmFtIHtFYWNoU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge0VmZmVjdFtdfSB0b19kZXN0cm95XG4gKiBAcGFyYW0ge251bGwgfCBOb2RlfSBjb250cm9sbGVkX2FuY2hvclxuICovXG5mdW5jdGlvbiBwYXVzZV9lZmZlY3RzKHN0YXRlLCB0b19kZXN0cm95LCBjb250cm9sbGVkX2FuY2hvcikge1xuXHQvKiogQHR5cGUge1RyYW5zaXRpb25NYW5hZ2VyW119ICovXG5cdHZhciB0cmFuc2l0aW9ucyA9IFtdO1xuXHR2YXIgbGVuZ3RoID0gdG9fZGVzdHJveS5sZW5ndGg7XG5cblx0LyoqIEB0eXBlIHtFYWNoT3V0cm9Hcm91cH0gKi9cblx0dmFyIGdyb3VwO1xuXHR2YXIgcmVtYWluaW5nID0gdG9fZGVzdHJveS5sZW5ndGg7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdGxldCBlZmZlY3QgPSB0b19kZXN0cm95W2ldO1xuXG5cdFx0cGF1c2VfZWZmZWN0KFxuXHRcdFx0ZWZmZWN0LFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRpZiAoZ3JvdXApIHtcblx0XHRcdFx0XHRncm91cC5wZW5kaW5nLmRlbGV0ZShlZmZlY3QpO1xuXHRcdFx0XHRcdGdyb3VwLmRvbmUuYWRkKGVmZmVjdCk7XG5cblx0XHRcdFx0XHRpZiAoZ3JvdXAucGVuZGluZy5zaXplID09PSAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgZ3JvdXBzID0gLyoqIEB0eXBlIHtTZXQ8RWFjaE91dHJvR3JvdXA+fSAqLyAoc3RhdGUub3V0cm9ncm91cHMpO1xuXG5cdFx0XHRcdFx0XHRkZXN0cm95X2VmZmVjdHMoYXJyYXlfZnJvbShncm91cC5kb25lKSk7XG5cdFx0XHRcdFx0XHRncm91cHMuZGVsZXRlKGdyb3VwKTtcblxuXHRcdFx0XHRcdFx0aWYgKGdyb3Vwcy5zaXplID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdHN0YXRlLm91dHJvZ3JvdXBzID0gbnVsbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVtYWluaW5nIC09IDE7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmYWxzZVxuXHRcdCk7XG5cdH1cblxuXHRpZiAocmVtYWluaW5nID09PSAwKSB7XG5cdFx0Ly8gSWYgd2UncmUgaW4gYSBjb250cm9sbGVkIGVhY2ggYmxvY2sgKGkuZS4gdGhlIGJsb2NrIGlzIHRoZSBvbmx5IGNoaWxkIG9mIGFuXG5cdFx0Ly8gZWxlbWVudCksIGFuZCB3ZSBhcmUgcmVtb3ZpbmcgYWxsIGl0ZW1zLCBfYW5kXyB0aGVyZSBhcmUgbm8gb3V0IHRyYW5zaXRpb25zLFxuXHRcdC8vIHdlIGNhbiB1c2UgdGhlIGZhc3QgcGF0aCDigJQgZW1wdHlpbmcgdGhlIGVsZW1lbnQgYW5kIHJlcGxhY2luZyB0aGUgYW5jaG9yXG5cdFx0dmFyIGZhc3RfcGF0aCA9IHRyYW5zaXRpb25zLmxlbmd0aCA9PT0gMCAmJiBjb250cm9sbGVkX2FuY2hvciAhPT0gbnVsbDtcblxuXHRcdGlmIChmYXN0X3BhdGgpIHtcblx0XHRcdHZhciBhbmNob3IgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChjb250cm9sbGVkX2FuY2hvcik7XG5cdFx0XHR2YXIgcGFyZW50X25vZGUgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChhbmNob3IucGFyZW50Tm9kZSk7XG5cblx0XHRcdGNsZWFyX3RleHRfY29udGVudChwYXJlbnRfbm9kZSk7XG5cdFx0XHRwYXJlbnRfbm9kZS5hcHBlbmQoYW5jaG9yKTtcblxuXHRcdFx0c3RhdGUuaXRlbXMuY2xlYXIoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95X2VmZmVjdHModG9fZGVzdHJveSwgIWZhc3RfcGF0aCk7XG5cdH0gZWxzZSB7XG5cdFx0Z3JvdXAgPSB7XG5cdFx0XHRwZW5kaW5nOiBuZXcgU2V0KHRvX2Rlc3Ryb3kpLFxuXHRcdFx0ZG9uZTogbmV3IFNldCgpXG5cdFx0fTtcblxuXHRcdChzdGF0ZS5vdXRyb2dyb3VwcyA/Pz0gbmV3IFNldCgpKS5hZGQoZ3JvdXApO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3RbXX0gdG9fZGVzdHJveVxuICogQHBhcmFtIHtib29sZWFufSByZW1vdmVfZG9tXG4gKi9cbmZ1bmN0aW9uIGRlc3Ryb3lfZWZmZWN0cyh0b19kZXN0cm95LCByZW1vdmVfZG9tID0gdHJ1ZSkge1xuXHQvLyBUT0RPIG9ubHkgZGVzdHJveSBlZmZlY3RzIGlmIG5vIHBlbmRpbmcgYmF0Y2ggbmVlZHMgdGhlbS4gb3RoZXJ3aXNlLFxuXHQvLyBqdXN0IHJlLWFkZCB0aGUgYEVGRkVDVF9PRkZTQ1JFRU5gIGZsYWdcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b19kZXN0cm95Lmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVzdHJveV9lZmZlY3QodG9fZGVzdHJveVtpXSwgcmVtb3ZlX2RvbSk7XG5cdH1cbn1cblxuLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovXG52YXIgb2Zmc2NyZWVuX2FuY2hvcjtcblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtFbGVtZW50IHwgQ29tbWVudH0gbm9kZSBUaGUgbmV4dCBzaWJsaW5nIG5vZGUsIG9yIHRoZSBwYXJlbnQgbm9kZSBpZiB0aGlzIGlzIGEgJ2NvbnRyb2xsZWQnIGJsb2NrXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7KCkgPT4gVltdfSBnZXRfY29sbGVjdGlvblxuICogQHBhcmFtIHsodmFsdWU6IFYsIGluZGV4OiBudW1iZXIpID0+IGFueX0gZ2V0X2tleVxuICogQHBhcmFtIHsoYW5jaG9yOiBOb2RlLCBpdGVtOiBNYXliZVNvdXJjZTxWPiwgaW5kZXg6IE1heWJlU291cmNlPG51bWJlcj4pID0+IHZvaWR9IHJlbmRlcl9mblxuICogQHBhcmFtIHtudWxsIHwgKChhbmNob3I6IE5vZGUpID0+IHZvaWQpfSBmYWxsYmFja19mblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlYWNoKG5vZGUsIGZsYWdzLCBnZXRfY29sbGVjdGlvbiwgZ2V0X2tleSwgcmVuZGVyX2ZuLCBmYWxsYmFja19mbiA9IG51bGwpIHtcblx0dmFyIGFuY2hvciA9IG5vZGU7XG5cblx0LyoqIEB0eXBlIHtNYXA8YW55LCBFYWNoSXRlbT59ICovXG5cdHZhciBpdGVtcyA9IG5ldyBNYXAoKTtcblxuXHR2YXIgaXNfY29udHJvbGxlZCA9IChmbGFncyAmIEVBQ0hfSVNfQ09OVFJPTExFRCkgIT09IDA7XG5cblx0aWYgKGlzX2NvbnRyb2xsZWQpIHtcblx0XHR2YXIgcGFyZW50X25vZGUgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChub2RlKTtcblxuXHRcdGFuY2hvciA9IGh5ZHJhdGluZ1xuXHRcdFx0PyBzZXRfaHlkcmF0ZV9ub2RlKGdldF9maXJzdF9jaGlsZChwYXJlbnRfbm9kZSkpXG5cdFx0XHQ6IHBhcmVudF9ub2RlLmFwcGVuZENoaWxkKGNyZWF0ZV90ZXh0KCkpO1xuXHR9XG5cblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuXHR2YXIgZmFsbGJhY2sgPSBudWxsO1xuXG5cdC8vIFRPRE86IGlkZWFsbHkgd2UgY291bGQgdXNlIGRlcml2ZWQgZm9yIHJ1bmVzIG1vZGUgYnV0IGJlY2F1c2Ugb2YgdGhlIGFiaWxpdHlcblx0Ly8gdG8gdXNlIGEgc3RvcmUgd2hpY2ggY2FuIGJlIG11dGF0ZWQsIHdlIGNhbid0IGRvIHRoYXQgaGVyZSBhcyBtdXRhdGluZyBhIHN0b3JlXG5cdC8vIHdpbGwgc3RpbGwgcmVzdWx0IGluIHRoZSBjb2xsZWN0aW9uIGFycmF5IGJlaW5nIHRoZSBzYW1lIGZyb20gdGhlIHN0b3JlXG5cdHZhciBlYWNoX2FycmF5ID0gZGVyaXZlZF9zYWZlX2VxdWFsKCgpID0+IHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IGdldF9jb2xsZWN0aW9uKCk7XG5cblx0XHRyZXR1cm4gaXNfYXJyYXkoY29sbGVjdGlvbikgPyBjb2xsZWN0aW9uIDogY29sbGVjdGlvbiA9PSBudWxsID8gW10gOiBhcnJheV9mcm9tKGNvbGxlY3Rpb24pO1xuXHR9KTtcblxuXHQvKiogQHR5cGUge1ZbXX0gKi9cblx0dmFyIGFycmF5O1xuXG5cdHZhciBmaXJzdF9ydW4gPSB0cnVlO1xuXG5cdGZ1bmN0aW9uIGNvbW1pdCgpIHtcblx0XHRzdGF0ZS5mYWxsYmFjayA9IGZhbGxiYWNrO1xuXHRcdHJlY29uY2lsZShzdGF0ZSwgYXJyYXksIGFuY2hvciwgZmxhZ3MsIGdldF9rZXkpO1xuXG5cdFx0aWYgKGZhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRpZiAoYXJyYXkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdGlmICgoZmFsbGJhY2suZiAmIEVGRkVDVF9PRkZTQ1JFRU4pID09PSAwKSB7XG5cdFx0XHRcdFx0cmVzdW1lX2VmZmVjdChmYWxsYmFjayk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZmFsbGJhY2suZiBePSBFRkZFQ1RfT0ZGU0NSRUVOO1xuXHRcdFx0XHRcdG1vdmUoZmFsbGJhY2ssIG51bGwsIGFuY2hvcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBhdXNlX2VmZmVjdChmYWxsYmFjaywgKCkgPT4ge1xuXHRcdFx0XHRcdC8vIFRPRE8gb25seSBudWxsIG91dCBpZiBubyBwZW5kaW5nIGJhdGNoIG5lZWRzIGl0LFxuXHRcdFx0XHRcdC8vIG90aGVyd2lzZSByZS1hZGQgYGZhbGxiYWNrLmZyYWdtZW50YCBhbmQgbW92ZSB0aGVcblx0XHRcdFx0XHQvLyBlZmZlY3QgaW50byBpdFxuXHRcdFx0XHRcdGZhbGxiYWNrID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dmFyIGVmZmVjdCA9IGJsb2NrKCgpID0+IHtcblx0XHRhcnJheSA9IC8qKiBAdHlwZSB7VltdfSAqLyAoZ2V0KGVhY2hfYXJyYXkpKTtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG5cdFx0LyoqIGB0cnVlYCBpZiB0aGVyZSB3YXMgYSBoeWRyYXRpb24gbWlzbWF0Y2guIE5lZWRzIHRvIGJlIGEgYGxldGAgb3IgZWxzZSBpdCBpc24ndCB0cmVlc2hha2VuIG91dCAqL1xuXHRcdGxldCBtaXNtYXRjaCA9IGZhbHNlO1xuXG5cdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0dmFyIGlzX2Vsc2UgPSByZWFkX2h5ZHJhdGlvbl9pbnN0cnVjdGlvbihhbmNob3IpID09PSBIWURSQVRJT05fU1RBUlRfRUxTRTtcblxuXHRcdFx0aWYgKGlzX2Vsc2UgIT09IChsZW5ndGggPT09IDApKSB7XG5cdFx0XHRcdC8vIGh5ZHJhdGlvbiBtaXNtYXRjaCDigJQgcmVtb3ZlIHRoZSBzZXJ2ZXItcmVuZGVyZWQgRE9NIGFuZCBzdGFydCBvdmVyXG5cdFx0XHRcdGFuY2hvciA9IHNraXBfbm9kZXMoKTtcblxuXHRcdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKGFuY2hvcik7XG5cdFx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdFx0XHRtaXNtYXRjaCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGtleXMgPSBuZXcgU2V0KCk7XG5cdFx0dmFyIGJhdGNoID0gLyoqIEB0eXBlIHtCYXRjaH0gKi8gKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdHZhciBkZWZlciA9IHNob3VsZF9kZWZlcl9hcHBlbmQoKTtcblxuXHRcdGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0aHlkcmF0aW5nICYmXG5cdFx0XHRcdGh5ZHJhdGVfbm9kZS5ub2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFICYmXG5cdFx0XHRcdC8qKiBAdHlwZSB7Q29tbWVudH0gKi8gKGh5ZHJhdGVfbm9kZSkuZGF0YSA9PT0gSFlEUkFUSU9OX0VORFxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIFRoZSBzZXJ2ZXIgcmVuZGVyZWQgZmV3ZXIgaXRlbXMgdGhhbiBleHBlY3RlZCxcblx0XHRcdFx0Ly8gc28gYnJlYWsgb3V0IGFuZCBjb250aW51ZSBhcHBlbmRpbmcgbm9uLWh5ZHJhdGVkIGl0ZW1zXG5cdFx0XHRcdGFuY2hvciA9IC8qKiBAdHlwZSB7Q29tbWVudH0gKi8gKGh5ZHJhdGVfbm9kZSk7XG5cdFx0XHRcdG1pc21hdGNoID0gdHJ1ZTtcblx0XHRcdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcblx0XHRcdHZhciBrZXkgPSBnZXRfa2V5KHZhbHVlLCBpbmRleCk7XG5cblx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0Ly8gQ2hlY2sgdGhhdCB0aGUga2V5IGZ1bmN0aW9uIGlzIGlkZW1wb3RlbnQgKHJldHVybnMgdGhlIHNhbWUgdmFsdWUgd2hlbiBjYWxsZWQgdHdpY2UpXG5cdFx0XHRcdHZhciBrZXlfYWdhaW4gPSBnZXRfa2V5KHZhbHVlLCBpbmRleCk7XG5cdFx0XHRcdGlmIChrZXkgIT09IGtleV9hZ2Fpbikge1xuXHRcdFx0XHRcdGUuZWFjaF9rZXlfdm9sYXRpbGUoU3RyaW5nKGluZGV4KSwgU3RyaW5nKGtleSksIFN0cmluZyhrZXlfYWdhaW4pKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaXRlbSA9IGZpcnN0X3J1biA/IG51bGwgOiBpdGVtcy5nZXQoa2V5KTtcblxuXHRcdFx0aWYgKGl0ZW0pIHtcblx0XHRcdFx0Ly8gdXBkYXRlIGJlZm9yZSByZWNvbmNpbGlhdGlvbiwgdG8gdHJpZ2dlciBhbnkgYXN5bmMgdXBkYXRlc1xuXHRcdFx0XHRpZiAoaXRlbS52KSBpbnRlcm5hbF9zZXQoaXRlbS52LCB2YWx1ZSk7XG5cdFx0XHRcdGlmIChpdGVtLmkpIGludGVybmFsX3NldChpdGVtLmksIGluZGV4KTtcblxuXHRcdFx0XHRpZiAoZGVmZXIpIHtcblx0XHRcdFx0XHRiYXRjaC51bnNraXBfZWZmZWN0KGl0ZW0uZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGl0ZW0gPSBjcmVhdGVfaXRlbShcblx0XHRcdFx0XHRpdGVtcyxcblx0XHRcdFx0XHRmaXJzdF9ydW4gPyBhbmNob3IgOiAob2Zmc2NyZWVuX2FuY2hvciA/Pz0gY3JlYXRlX3RleHQoKSksXG5cdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdGluZGV4LFxuXHRcdFx0XHRcdHJlbmRlcl9mbixcblx0XHRcdFx0XHRmbGFncyxcblx0XHRcdFx0XHRnZXRfY29sbGVjdGlvblxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmICghZmlyc3RfcnVuKSB7XG5cdFx0XHRcdFx0aXRlbS5lLmYgfD0gRUZGRUNUX09GRlNDUkVFTjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGl0ZW1zLnNldChrZXksIGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHRrZXlzLmFkZChrZXkpO1xuXHRcdH1cblxuXHRcdGlmIChsZW5ndGggPT09IDAgJiYgZmFsbGJhY2tfZm4gJiYgIWZhbGxiYWNrKSB7XG5cdFx0XHRpZiAoZmlyc3RfcnVuKSB7XG5cdFx0XHRcdGZhbGxiYWNrID0gYnJhbmNoKCgpID0+IGZhbGxiYWNrX2ZuKGFuY2hvcikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZmFsbGJhY2sgPSBicmFuY2goKCkgPT4gZmFsbGJhY2tfZm4oKG9mZnNjcmVlbl9hbmNob3IgPz89IGNyZWF0ZV90ZXh0KCkpKSk7XG5cdFx0XHRcdGZhbGxiYWNrLmYgfD0gRUZGRUNUX09GRlNDUkVFTjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobGVuZ3RoID4ga2V5cy5zaXplKSB7XG5cdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdHZhbGlkYXRlX2VhY2hfa2V5cyhhcnJheSwgZ2V0X2tleSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBpbiBwcm9kLCB0aGUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBpc24ndCBwcmludGVkLCBzbyBkb24ndCBib3RoZXIgY29tcHV0aW5nIGl0XG5cdFx0XHRcdGUuZWFjaF9rZXlfZHVwbGljYXRlKCcnLCAnJywgJycpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHJlbW92ZSBleGNlc3Mgbm9kZXNcblx0XHRpZiAoaHlkcmF0aW5nICYmIGxlbmd0aCA+IDApIHtcblx0XHRcdHNldF9oeWRyYXRlX25vZGUoc2tpcF9ub2RlcygpKTtcblx0XHR9XG5cblx0XHRpZiAoIWZpcnN0X3J1bikge1xuXHRcdFx0aWYgKGRlZmVyKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgW2tleSwgaXRlbV0gb2YgaXRlbXMpIHtcblx0XHRcdFx0XHRpZiAoIWtleXMuaGFzKGtleSkpIHtcblx0XHRcdFx0XHRcdGJhdGNoLnNraXBfZWZmZWN0KGl0ZW0uZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmF0Y2gub25jb21taXQoY29tbWl0KTtcblx0XHRcdFx0YmF0Y2gub25kaXNjYXJkKCgpID0+IHtcblx0XHRcdFx0XHQvLyBUT0RPIHByZXN1bWFibHkgd2UgbmVlZCB0byBkbyBzb21ldGhpbmcgaGVyZT9cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb21taXQoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobWlzbWF0Y2gpIHtcblx0XHRcdC8vIGNvbnRpbnVlIGluIGh5ZHJhdGlvbiBtb2RlXG5cdFx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gd2UgbW91bnQgdGhlIGVhY2ggYmxvY2sgZm9yIHRoZSBmaXJzdCB0aW1lLCB0aGUgY29sbGVjdGlvbiB3b24ndCBiZVxuXHRcdC8vIGNvbm5lY3RlZCB0byB0aGlzIGVmZmVjdCBhcyB0aGUgZWZmZWN0IGhhc24ndCBmaW5pc2hlZCBydW5uaW5nIHlldCBhbmQgaXRzIGRlcHNcblx0XHQvLyB3b24ndCBiZSBhc3NpZ25lZC4gSG93ZXZlciwgaXQncyBwb3NzaWJsZSB0aGF0IHdoZW4gcmVjb25jaWxpbmcgdGhlIGVhY2ggYmxvY2tcblx0XHQvLyB0aGF0IGEgbXV0YXRpb24gb2NjdXJyZWQgYW5kIGl0J3MgbWFkZSB0aGUgY29sbGVjdGlvbiBNQVlCRV9ESVJUWSwgc28gcmVhZGluZyB0aGVcblx0XHQvLyBjb2xsZWN0aW9uIGFnYWluIGNhbiBwcm92aWRlIGNvbnNpc3RlbmN5IHRvIHRoZSByZWFjdGl2ZSBncmFwaCBhZ2FpbiBhcyB0aGUgZGVyaXZlZHNcblx0XHQvLyB3aWxsIG5vdyBiZSBgQ0xFQU5gLlxuXHRcdGdldChlYWNoX2FycmF5KTtcblx0fSk7XG5cblx0LyoqIEB0eXBlIHtFYWNoU3RhdGV9ICovXG5cdHZhciBzdGF0ZSA9IHsgZWZmZWN0LCBmbGFncywgaXRlbXMsIG91dHJvZ3JvdXBzOiBudWxsLCBmYWxsYmFjayB9O1xuXG5cdGZpcnN0X3J1biA9IGZhbHNlO1xuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRhbmNob3IgPSBoeWRyYXRlX25vZGU7XG5cdH1cbn1cblxuLyoqXG4gKiBTa2lwIHBhc3QgYW55IG5vbi1icmFuY2ggZWZmZWN0cyAod2hpY2ggY291bGQgYmUgY3JlYXRlZCB3aXRoIGBjcmVhdGVTdWJzY3JpYmVyYCwgZm9yIGV4YW1wbGUpIHRvIGZpbmQgdGhlIG5leHQgYnJhbmNoIGVmZmVjdFxuICogQHBhcmFtIHtFZmZlY3QgfCBudWxsfSBlZmZlY3RcbiAqIEByZXR1cm5zIHtFZmZlY3QgfCBudWxsfVxuICovXG5mdW5jdGlvbiBza2lwX3RvX2JyYW5jaChlZmZlY3QpIHtcblx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCAmJiAoZWZmZWN0LmYgJiBCUkFOQ0hfRUZGRUNUKSA9PT0gMCkge1xuXHRcdGVmZmVjdCA9IGVmZmVjdC5uZXh0O1xuXHR9XG5cdHJldHVybiBlZmZlY3Q7XG59XG5cbi8qKlxuICogQWRkLCByZW1vdmUsIG9yIHJlb3JkZXIgaXRlbXMgb3V0cHV0IGJ5IGFuIGVhY2ggYmxvY2sgYXMgaXRzIGlucHV0IGNoYW5nZXNcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge0VhY2hTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7QXJyYXk8Vj59IGFycmF5XG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBDb21tZW50IHwgVGV4dH0gYW5jaG9yXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7KHZhbHVlOiBWLCBpbmRleDogbnVtYmVyKSA9PiBhbnl9IGdldF9rZXlcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZWNvbmNpbGUoc3RhdGUsIGFycmF5LCBhbmNob3IsIGZsYWdzLCBnZXRfa2V5KSB7XG5cdHZhciBpc19hbmltYXRlZCA9IChmbGFncyAmIEVBQ0hfSVNfQU5JTUFURUQpICE9PSAwO1xuXG5cdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdHZhciBpdGVtcyA9IHN0YXRlLml0ZW1zO1xuXHR2YXIgY3VycmVudCA9IHNraXBfdG9fYnJhbmNoKHN0YXRlLmVmZmVjdC5maXJzdCk7XG5cblx0LyoqIEB0eXBlIHt1bmRlZmluZWQgfCBTZXQ8RWZmZWN0Pn0gKi9cblx0dmFyIHNlZW47XG5cblx0LyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuXHR2YXIgcHJldiA9IG51bGw7XG5cblx0LyoqIEB0eXBlIHt1bmRlZmluZWQgfCBTZXQ8RWZmZWN0Pn0gKi9cblx0dmFyIHRvX2FuaW1hdGU7XG5cblx0LyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cblx0dmFyIG1hdGNoZWQgPSBbXTtcblxuXHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHR2YXIgc3Rhc2hlZCA9IFtdO1xuXG5cdC8qKiBAdHlwZSB7Vn0gKi9cblx0dmFyIHZhbHVlO1xuXG5cdC8qKiBAdHlwZSB7YW55fSAqL1xuXHR2YXIga2V5O1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgdW5kZWZpbmVkfSAqL1xuXHR2YXIgZWZmZWN0O1xuXG5cdC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuXHR2YXIgaTtcblxuXHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHZhbHVlID0gYXJyYXlbaV07XG5cdFx0XHRrZXkgPSBnZXRfa2V5KHZhbHVlLCBpKTtcblx0XHRcdGVmZmVjdCA9IC8qKiBAdHlwZSB7RWFjaEl0ZW19ICovIChpdGVtcy5nZXQoa2V5KSkuZTtcblxuXHRcdFx0Ly8gb2Zmc2NyZWVuID09IGNvbWluZyBpbiBub3csIG5vIGFuaW1hdGlvbiBpbiB0aGF0IGNhc2UsXG5cdFx0XHQvLyBlbHNlIHRoaXMgd291bGQgaGFwcGVuIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzE3MTgxXG5cdFx0XHRpZiAoKGVmZmVjdC5mICYgRUZGRUNUX09GRlNDUkVFTikgPT09IDApIHtcblx0XHRcdFx0ZWZmZWN0Lm5vZGVzPy5hPy5tZWFzdXJlKCk7XG5cdFx0XHRcdCh0b19hbmltYXRlID8/PSBuZXcgU2V0KCkpLmFkZChlZmZlY3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhbHVlID0gYXJyYXlbaV07XG5cdFx0a2V5ID0gZ2V0X2tleSh2YWx1ZSwgaSk7XG5cblx0XHRlZmZlY3QgPSAvKiogQHR5cGUge0VhY2hJdGVtfSAqLyAoaXRlbXMuZ2V0KGtleSkpLmU7XG5cblx0XHRpZiAoc3RhdGUub3V0cm9ncm91cHMgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgZ3JvdXAgb2Ygc3RhdGUub3V0cm9ncm91cHMpIHtcblx0XHRcdFx0Z3JvdXAucGVuZGluZy5kZWxldGUoZWZmZWN0KTtcblx0XHRcdFx0Z3JvdXAuZG9uZS5kZWxldGUoZWZmZWN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgRUZGRUNUX09GRlNDUkVFTikgIT09IDApIHtcblx0XHRcdGVmZmVjdC5mIF49IEVGRkVDVF9PRkZTQ1JFRU47XG5cblx0XHRcdGlmIChlZmZlY3QgPT09IGN1cnJlbnQpIHtcblx0XHRcdFx0bW92ZShlZmZlY3QsIG51bGwsIGFuY2hvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgbmV4dCA9IHByZXYgPyBwcmV2Lm5leHQgOiBjdXJyZW50O1xuXG5cdFx0XHRcdGlmIChlZmZlY3QgPT09IHN0YXRlLmVmZmVjdC5sYXN0KSB7XG5cdFx0XHRcdFx0c3RhdGUuZWZmZWN0Lmxhc3QgPSBlZmZlY3QucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlZmZlY3QucHJldikgZWZmZWN0LnByZXYubmV4dCA9IGVmZmVjdC5uZXh0O1xuXHRcdFx0XHRpZiAoZWZmZWN0Lm5leHQpIGVmZmVjdC5uZXh0LnByZXYgPSBlZmZlY3QucHJldjtcblx0XHRcdFx0bGluayhzdGF0ZSwgcHJldiwgZWZmZWN0KTtcblx0XHRcdFx0bGluayhzdGF0ZSwgZWZmZWN0LCBuZXh0KTtcblxuXHRcdFx0XHRtb3ZlKGVmZmVjdCwgbmV4dCwgYW5jaG9yKTtcblx0XHRcdFx0cHJldiA9IGVmZmVjdDtcblxuXHRcdFx0XHRtYXRjaGVkID0gW107XG5cdFx0XHRcdHN0YXNoZWQgPSBbXTtcblxuXHRcdFx0XHRjdXJyZW50ID0gc2tpcF90b19icmFuY2gocHJldi5uZXh0KTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKChlZmZlY3QuZiAmIElORVJUKSAhPT0gMCkge1xuXHRcdFx0cmVzdW1lX2VmZmVjdChlZmZlY3QpO1xuXHRcdFx0aWYgKGlzX2FuaW1hdGVkKSB7XG5cdFx0XHRcdGVmZmVjdC5ub2Rlcz8uYT8udW5maXgoKTtcblx0XHRcdFx0KHRvX2FuaW1hdGUgPz89IG5ldyBTZXQoKSkuZGVsZXRlKGVmZmVjdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGVmZmVjdCAhPT0gY3VycmVudCkge1xuXHRcdFx0aWYgKHNlZW4gIT09IHVuZGVmaW5lZCAmJiBzZWVuLmhhcyhlZmZlY3QpKSB7XG5cdFx0XHRcdGlmIChtYXRjaGVkLmxlbmd0aCA8IHN0YXNoZWQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Ly8gbW9yZSBlZmZpY2llbnQgdG8gbW92ZSBsYXRlciBpdGVtcyB0byB0aGUgZnJvbnRcblx0XHRcdFx0XHR2YXIgc3RhcnQgPSBzdGFzaGVkWzBdO1xuXHRcdFx0XHRcdHZhciBqO1xuXG5cdFx0XHRcdFx0cHJldiA9IHN0YXJ0LnByZXY7XG5cblx0XHRcdFx0XHR2YXIgYSA9IG1hdGNoZWRbMF07XG5cdFx0XHRcdFx0dmFyIGIgPSBtYXRjaGVkW21hdGNoZWQubGVuZ3RoIC0gMV07XG5cblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbWF0Y2hlZC5sZW5ndGg7IGogKz0gMSkge1xuXHRcdFx0XHRcdFx0bW92ZShtYXRjaGVkW2pdLCBzdGFydCwgYW5jaG9yKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgc3Rhc2hlZC5sZW5ndGg7IGogKz0gMSkge1xuXHRcdFx0XHRcdFx0c2Vlbi5kZWxldGUoc3Rhc2hlZFtqXSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGluayhzdGF0ZSwgYS5wcmV2LCBiLm5leHQpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIHByZXYsIGEpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIGIsIHN0YXJ0KTtcblxuXHRcdFx0XHRcdGN1cnJlbnQgPSBzdGFydDtcblx0XHRcdFx0XHRwcmV2ID0gYjtcblx0XHRcdFx0XHRpIC09IDE7XG5cblx0XHRcdFx0XHRtYXRjaGVkID0gW107XG5cdFx0XHRcdFx0c3Rhc2hlZCA9IFtdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIG1vcmUgZWZmaWNpZW50IHRvIG1vdmUgZWFybGllciBpdGVtcyB0byB0aGUgYmFja1xuXHRcdFx0XHRcdHNlZW4uZGVsZXRlKGVmZmVjdCk7XG5cdFx0XHRcdFx0bW92ZShlZmZlY3QsIGN1cnJlbnQsIGFuY2hvcik7XG5cblx0XHRcdFx0XHRsaW5rKHN0YXRlLCBlZmZlY3QucHJldiwgZWZmZWN0Lm5leHQpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIGVmZmVjdCwgcHJldiA9PT0gbnVsbCA/IHN0YXRlLmVmZmVjdC5maXJzdCA6IHByZXYubmV4dCk7XG5cdFx0XHRcdFx0bGluayhzdGF0ZSwgcHJldiwgZWZmZWN0KTtcblxuXHRcdFx0XHRcdHByZXYgPSBlZmZlY3Q7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0bWF0Y2hlZCA9IFtdO1xuXHRcdFx0c3Rhc2hlZCA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoY3VycmVudCAhPT0gbnVsbCAmJiBjdXJyZW50ICE9PSBlZmZlY3QpIHtcblx0XHRcdFx0KHNlZW4gPz89IG5ldyBTZXQoKSkuYWRkKGN1cnJlbnQpO1xuXHRcdFx0XHRzdGFzaGVkLnB1c2goY3VycmVudCk7XG5cdFx0XHRcdGN1cnJlbnQgPSBza2lwX3RvX2JyYW5jaChjdXJyZW50Lm5leHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY3VycmVudCA9PT0gbnVsbCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgRUZGRUNUX09GRlNDUkVFTikgPT09IDApIHtcblx0XHRcdG1hdGNoZWQucHVzaChlZmZlY3QpO1xuXHRcdH1cblxuXHRcdHByZXYgPSBlZmZlY3Q7XG5cdFx0Y3VycmVudCA9IHNraXBfdG9fYnJhbmNoKGVmZmVjdC5uZXh0KTtcblx0fVxuXG5cdGlmIChzdGF0ZS5vdXRyb2dyb3VwcyAhPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgZ3JvdXAgb2Ygc3RhdGUub3V0cm9ncm91cHMpIHtcblx0XHRcdGlmIChncm91cC5wZW5kaW5nLnNpemUgPT09IDApIHtcblx0XHRcdFx0ZGVzdHJveV9lZmZlY3RzKGFycmF5X2Zyb20oZ3JvdXAuZG9uZSkpO1xuXHRcdFx0XHRzdGF0ZS5vdXRyb2dyb3Vwcz8uZGVsZXRlKGdyb3VwKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoc3RhdGUub3V0cm9ncm91cHMuc2l6ZSA9PT0gMCkge1xuXHRcdFx0c3RhdGUub3V0cm9ncm91cHMgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGlmIChjdXJyZW50ICE9PSBudWxsIHx8IHNlZW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdC8qKiBAdHlwZSB7RWZmZWN0W119ICovXG5cdFx0dmFyIHRvX2Rlc3Ryb3kgPSBbXTtcblxuXHRcdGlmIChzZWVuICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGZvciAoZWZmZWN0IG9mIHNlZW4pIHtcblx0XHRcdFx0aWYgKChlZmZlY3QuZiAmIElORVJUKSA9PT0gMCkge1xuXHRcdFx0XHRcdHRvX2Rlc3Ryb3kucHVzaChlZmZlY3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcblx0XHRcdC8vIElmIHRoZSBlYWNoIGJsb2NrIGlzbid0IGluZXJ0LCB0aGVuIGluZXJ0IGVmZmVjdHMgYXJlIGN1cnJlbnRseSBvdXRyb2luZyBhbmQgd2lsbCBiZSByZW1vdmVkIG9uY2UgdGhlIHRyYW5zaXRpb24gaXMgZmluaXNoZWRcblx0XHRcdGlmICgoY3VycmVudC5mICYgSU5FUlQpID09PSAwICYmIGN1cnJlbnQgIT09IHN0YXRlLmZhbGxiYWNrKSB7XG5cdFx0XHRcdHRvX2Rlc3Ryb3kucHVzaChjdXJyZW50KTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudCA9IHNraXBfdG9fYnJhbmNoKGN1cnJlbnQubmV4dCk7XG5cdFx0fVxuXG5cdFx0dmFyIGRlc3Ryb3lfbGVuZ3RoID0gdG9fZGVzdHJveS5sZW5ndGg7XG5cblx0XHRpZiAoZGVzdHJveV9sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgY29udHJvbGxlZF9hbmNob3IgPSAoZmxhZ3MgJiBFQUNIX0lTX0NPTlRST0xMRUQpICE9PSAwICYmIGxlbmd0aCA9PT0gMCA/IGFuY2hvciA6IG51bGw7XG5cblx0XHRcdGlmIChpc19hbmltYXRlZCkge1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZGVzdHJveV9sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdHRvX2Rlc3Ryb3lbaV0ubm9kZXM/LmE/Lm1lYXN1cmUoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBkZXN0cm95X2xlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0dG9fZGVzdHJveVtpXS5ub2Rlcz8uYT8uZml4KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cGF1c2VfZWZmZWN0cyhzdGF0ZSwgdG9fZGVzdHJveSwgY29udHJvbGxlZF9hbmNob3IpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChpc19hbmltYXRlZCkge1xuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0aWYgKHRvX2FuaW1hdGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXHRcdFx0Zm9yIChlZmZlY3Qgb2YgdG9fYW5pbWF0ZSkge1xuXHRcdFx0XHRlZmZlY3Qubm9kZXM/LmE/LmFwcGx5KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtNYXA8YW55LCBFYWNoSXRlbT59IGl0ZW1zXG4gKiBAcGFyYW0ge05vZGV9IGFuY2hvclxuICogQHBhcmFtIHtWfSB2YWx1ZVxuICogQHBhcmFtIHt1bmtub3dufSBrZXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHsoYW5jaG9yOiBOb2RlLCBpdGVtOiBWIHwgU291cmNlPFY+LCBpbmRleDogbnVtYmVyIHwgVmFsdWU8bnVtYmVyPiwgY29sbGVjdGlvbjogKCkgPT4gVltdKSA9PiB2b2lkfSByZW5kZXJfZm5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICogQHBhcmFtIHsoKSA9PiBWW119IGdldF9jb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7RWFjaEl0ZW19XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZV9pdGVtKGl0ZW1zLCBhbmNob3IsIHZhbHVlLCBrZXksIGluZGV4LCByZW5kZXJfZm4sIGZsYWdzLCBnZXRfY29sbGVjdGlvbikge1xuXHR2YXIgdiA9XG5cdFx0KGZsYWdzICYgRUFDSF9JVEVNX1JFQUNUSVZFKSAhPT0gMFxuXHRcdFx0PyAoZmxhZ3MgJiBFQUNIX0lURU1fSU1NVVRBQkxFKSA9PT0gMFxuXHRcdFx0XHQ/IG11dGFibGVfc291cmNlKHZhbHVlLCBmYWxzZSwgZmFsc2UpXG5cdFx0XHRcdDogc291cmNlKHZhbHVlKVxuXHRcdFx0OiBudWxsO1xuXG5cdHZhciBpID0gKGZsYWdzICYgRUFDSF9JTkRFWF9SRUFDVElWRSkgIT09IDAgPyBzb3VyY2UoaW5kZXgpIDogbnVsbDtcblxuXHRpZiAoREVWICYmIHYpIHtcblx0XHQvLyBGb3IgdHJhY2luZyBwdXJwb3Nlcywgd2UgbmVlZCB0byBsaW5rIHRoZSBzb3VyY2Ugc2lnbmFsIHdlIGNyZWF0ZSB3aXRoIHRoZVxuXHRcdC8vIGNvbGxlY3Rpb24gKyBpbmRleCBzbyB0aGF0IHRyYWNpbmcgd29ya3MgYXMgaW50ZW5kZWRcblx0XHR2LnRyYWNlID0gKCkgPT4ge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRcdGdldF9jb2xsZWN0aW9uKClbaT8udiA/PyBpbmRleF07XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dixcblx0XHRpLFxuXHRcdGU6IGJyYW5jaCgoKSA9PiB7XG5cdFx0XHRyZW5kZXJfZm4oYW5jaG9yLCB2ID8/IHZhbHVlLCBpID8/IGluZGV4LCBnZXRfY29sbGVjdGlvbik7XG5cblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdGl0ZW1zLmRlbGV0ZShrZXkpO1xuXHRcdFx0fTtcblx0XHR9KVxuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7RWZmZWN0IHwgbnVsbH0gbmV4dFxuICogQHBhcmFtIHtUZXh0IHwgRWxlbWVudCB8IENvbW1lbnR9IGFuY2hvclxuICovXG5mdW5jdGlvbiBtb3ZlKGVmZmVjdCwgbmV4dCwgYW5jaG9yKSB7XG5cdGlmICghZWZmZWN0Lm5vZGVzKSByZXR1cm47XG5cblx0dmFyIG5vZGUgPSBlZmZlY3Qubm9kZXMuc3RhcnQ7XG5cdHZhciBlbmQgPSBlZmZlY3Qubm9kZXMuZW5kO1xuXG5cdHZhciBkZXN0ID1cblx0XHRuZXh0ICYmIChuZXh0LmYgJiBFRkZFQ1RfT0ZGU0NSRUVOKSA9PT0gMFxuXHRcdFx0PyAvKiogQHR5cGUge0VmZmVjdE5vZGVzfSAqLyAobmV4dC5ub2Rlcykuc3RhcnRcblx0XHRcdDogYW5jaG9yO1xuXG5cdHdoaWxlIChub2RlICE9PSBudWxsKSB7XG5cdFx0dmFyIG5leHRfbm9kZSA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X25leHRfc2libGluZyhub2RlKSk7XG5cdFx0ZGVzdC5iZWZvcmUobm9kZSk7XG5cblx0XHRpZiAobm9kZSA9PT0gZW5kKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bm9kZSA9IG5leHRfbm9kZTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWFjaFN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtFZmZlY3QgfCBudWxsfSBwcmV2XG4gKiBAcGFyYW0ge0VmZmVjdCB8IG51bGx9IG5leHRcbiAqL1xuZnVuY3Rpb24gbGluayhzdGF0ZSwgcHJldiwgbmV4dCkge1xuXHRpZiAocHJldiA9PT0gbnVsbCkge1xuXHRcdHN0YXRlLmVmZmVjdC5maXJzdCA9IG5leHQ7XG5cdH0gZWxzZSB7XG5cdFx0cHJldi5uZXh0ID0gbmV4dDtcblx0fVxuXG5cdGlmIChuZXh0ID09PSBudWxsKSB7XG5cdFx0c3RhdGUuZWZmZWN0Lmxhc3QgPSBwcmV2O1xuXHR9IGVsc2Uge1xuXHRcdG5leHQucHJldiA9IHByZXY7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFycmF5XG4gKiBAcGFyYW0geyhpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHN0cmluZ30ga2V5X2ZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGFycmF5LCBrZXlfZm4pIHtcblx0Y29uc3Qga2V5cyA9IG5ldyBNYXAoKTtcblx0Y29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBrZXkgPSBrZXlfZm4oYXJyYXlbaV0sIGkpO1xuXG5cdFx0aWYgKGtleXMuaGFzKGtleSkpIHtcblx0XHRcdGNvbnN0IGEgPSBTdHJpbmcoa2V5cy5nZXQoa2V5KSk7XG5cdFx0XHRjb25zdCBiID0gU3RyaW5nKGkpO1xuXG5cdFx0XHQvKiogQHR5cGUge3N0cmluZyB8IG51bGx9ICovXG5cdFx0XHRsZXQgayA9IFN0cmluZyhrZXkpO1xuXHRcdFx0aWYgKGsuc3RhcnRzV2l0aCgnW29iamVjdCAnKSkgayA9IG51bGw7XG5cblx0XHRcdGUuZWFjaF9rZXlfZHVwbGljYXRlKGEsIGIsIGspO1xuXHRcdH1cblxuXHRcdGtleXMuc2V0KGtleSwgaSk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGVzY2FwZV9odG1sIH0gZnJvbSAnLi4vLi4vZXNjYXBpbmcuanMnO1xuaW1wb3J0IHsgY2xzeCBhcyBfY2xzeCB9IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHsgaGFzX293bl9wcm9wZXJ0eSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vKipcbiAqIGA8ZGl2IHRyYW5zbGF0ZT17ZmFsc2V9PmAgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGA8ZGl2IHRyYW5zbGF0ZT1cIm5vXCI+YCBhbmQgX25vdF9cbiAqIGA8ZGl2IHRyYW5zbGF0ZT1cImZhbHNlXCI+YCwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byBgPGRpdiB0cmFuc2xhdGU9XCJ5ZXNcIj5gLiBUaGVyZVxuICogbWF5IGJlIG90aGVyIG9kZCBjYXNlcyB0aGF0IG5lZWQgdG8gYmUgYWRkZWQgdG8gdGhpcyBsaXN0IGluIGZ1dHVyZVxuICogQHR5cGUge1JlY29yZDxzdHJpbmcsIE1hcDxhbnksIHN0cmluZz4+fVxuICovXG5jb25zdCByZXBsYWNlbWVudHMgPSB7XG5cdHRyYW5zbGF0ZTogbmV3IE1hcChbXG5cdFx0W3RydWUsICd5ZXMnXSxcblx0XHRbZmFsc2UsICdubyddXG5cdF0pXG59O1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtWfSB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBbaXNfYm9vbGVhbl1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyKG5hbWUsIHZhbHVlLCBpc19ib29sZWFuID0gZmFsc2UpIHtcblx0Ly8gYXR0cmlidXRlIGhpZGRlbiBmb3IgdmFsdWVzIG90aGVyIHRoYW4gXCJ1bnRpbC1mb3VuZFwiIGJlaGF2ZXMgbGlrZSBhIGJvb2xlYW4gYXR0cmlidXRlXG5cdGlmIChuYW1lID09PSAnaGlkZGVuJyAmJiB2YWx1ZSAhPT0gJ3VudGlsLWZvdW5kJykge1xuXHRcdGlzX2Jvb2xlYW4gPSB0cnVlO1xuXHR9XG5cdGlmICh2YWx1ZSA9PSBudWxsIHx8ICghdmFsdWUgJiYgaXNfYm9vbGVhbikpIHJldHVybiAnJztcblx0Y29uc3Qgbm9ybWFsaXplZCA9XG5cdFx0KGhhc19vd25fcHJvcGVydHkuY2FsbChyZXBsYWNlbWVudHMsIG5hbWUpICYmIHJlcGxhY2VtZW50c1tuYW1lXS5nZXQodmFsdWUpKSB8fCB2YWx1ZTtcblx0Y29uc3QgYXNzaWdubWVudCA9IGlzX2Jvb2xlYW4gPyBgPVwiXCJgIDogYD1cIiR7ZXNjYXBlX2h0bWwobm9ybWFsaXplZCwgdHJ1ZSl9XCJgO1xuXHRyZXR1cm4gYCAke25hbWV9JHthc3NpZ25tZW50fWA7XG59XG5cbi8qKlxuICogU21hbGwgd3JhcHBlciBhcm91bmQgY2xzeCB0byBwcmVzZXJ2ZSBTdmVsdGUncyAod2VpcmQpIGhhbmRsaW5nIG9mIGZhbHN5IHZhbHVlcy5cbiAqIFRPRE8gU3ZlbHRlIDYgcmV2aXNpdCB0aGlzLCBhbmQgbGlrZWx5IHR1cm4gYWxsIGZhbHN5IHZhbHVlcyBpbnRvIHRoZSBlbXB0eSBzdHJpbmcgKHdoYXQgY2xzeCBhbHNvIGRvZXMpXG4gKiBAcGFyYW0gIHthbnl9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbHN4KHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIF9jbHN4KHZhbHVlKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdmFsdWUgPz8gJyc7XG5cdH1cbn1cblxuY29uc3Qgd2hpdGVzcGFjZSA9IFsuLi4nIFxcdFxcblxcclxcZlxcdTAwYTBcXHUwMDBiXFx1ZmVmZiddO1xuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBbaGFzaF1cbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYm9vbGVhbj59IFtkaXJlY3RpdmVzXVxuICogQHJldHVybnMge3N0cmluZyB8IG51bGx9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b19jbGFzcyh2YWx1ZSwgaGFzaCwgZGlyZWN0aXZlcykge1xuXHR2YXIgY2xhc3NuYW1lID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogJycgKyB2YWx1ZTtcblxuXHRpZiAoaGFzaCkge1xuXHRcdGNsYXNzbmFtZSA9IGNsYXNzbmFtZSA/IGNsYXNzbmFtZSArICcgJyArIGhhc2ggOiBoYXNoO1xuXHR9XG5cblx0aWYgKGRpcmVjdGl2ZXMpIHtcblx0XHRmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoZGlyZWN0aXZlcykpIHtcblx0XHRcdGlmIChkaXJlY3RpdmVzW2tleV0pIHtcblx0XHRcdFx0Y2xhc3NuYW1lID0gY2xhc3NuYW1lID8gY2xhc3NuYW1lICsgJyAnICsga2V5IDoga2V5O1xuXHRcdFx0fSBlbHNlIGlmIChjbGFzc25hbWUubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBsZW4gPSBrZXkubGVuZ3RoO1xuXHRcdFx0XHR2YXIgYSA9IDA7XG5cblx0XHRcdFx0d2hpbGUgKChhID0gY2xhc3NuYW1lLmluZGV4T2Yoa2V5LCBhKSkgPj0gMCkge1xuXHRcdFx0XHRcdHZhciBiID0gYSArIGxlbjtcblxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdChhID09PSAwIHx8IHdoaXRlc3BhY2UuaW5jbHVkZXMoY2xhc3NuYW1lW2EgLSAxXSkpICYmXG5cdFx0XHRcdFx0XHQoYiA9PT0gY2xhc3NuYW1lLmxlbmd0aCB8fCB3aGl0ZXNwYWNlLmluY2x1ZGVzKGNsYXNzbmFtZVtiXSkpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjbGFzc25hbWUgPSAoYSA9PT0gMCA/ICcnIDogY2xhc3NuYW1lLnN1YnN0cmluZygwLCBhKSkgKyBjbGFzc25hbWUuc3Vic3RyaW5nKGIgKyAxKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YSA9IGI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNsYXNzbmFtZSA9PT0gJycgPyBudWxsIDogY2xhc3NuYW1lO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsYW55Pn0gc3R5bGVzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGltcG9ydGFudFxuICovXG5mdW5jdGlvbiBhcHBlbmRfc3R5bGVzKHN0eWxlcywgaW1wb3J0YW50ID0gZmFsc2UpIHtcblx0dmFyIHNlcGFyYXRvciA9IGltcG9ydGFudCA/ICcgIWltcG9ydGFudDsnIDogJzsnO1xuXHR2YXIgY3NzID0gJyc7XG5cblx0Zm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKHN0eWxlcykpIHtcblx0XHR2YXIgdmFsdWUgPSBzdHlsZXNba2V5XTtcblx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gJycpIHtcblx0XHRcdGNzcyArPSAnICcgKyBrZXkgKyAnOiAnICsgdmFsdWUgKyBzZXBhcmF0b3I7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNzcztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdG9fY3NzX25hbWUobmFtZSkge1xuXHRpZiAobmFtZVswXSAhPT0gJy0nIHx8IG5hbWVbMV0gIT09ICctJykge1xuXHRcdHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH1cblx0cmV0dXJuIG5hbWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT4gfCBbUmVjb3JkPHN0cmluZywgYW55PiwgUmVjb3JkPHN0cmluZywgYW55Pl19IFtzdHlsZXNdXG4gKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvX3N0eWxlKHZhbHVlLCBzdHlsZXMpIHtcblx0aWYgKHN0eWxlcykge1xuXHRcdHZhciBuZXdfc3R5bGUgPSAnJztcblxuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyxhbnk+IHwgdW5kZWZpbmVkfSAqL1xuXHRcdHZhciBub3JtYWxfc3R5bGVzO1xuXG5cdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLGFueT4gfCB1bmRlZmluZWR9ICovXG5cdFx0dmFyIGltcG9ydGFudF9zdHlsZXM7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG5cdFx0XHRub3JtYWxfc3R5bGVzID0gc3R5bGVzWzBdO1xuXHRcdFx0aW1wb3J0YW50X3N0eWxlcyA9IHN0eWxlc1sxXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm9ybWFsX3N0eWxlcyA9IHN0eWxlcztcblx0XHR9XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuXHRcdFx0XHQucmVwbGFjZUFsbCgvXFxzKlxcL1xcKi4qP1xcKlxcL1xccyovZywgJycpXG5cdFx0XHRcdC50cmltKCk7XG5cblx0XHRcdC8qKiBAdHlwZSB7Ym9vbGVhbiB8ICdcIicgfCBcIidcIn0gKi9cblx0XHRcdHZhciBpbl9zdHIgPSBmYWxzZTtcblx0XHRcdHZhciBpbl9hcG8gPSAwO1xuXHRcdFx0dmFyIGluX2NvbW1lbnQgPSBmYWxzZTtcblxuXHRcdFx0dmFyIHJlc2VydmVkX25hbWVzID0gW107XG5cblx0XHRcdGlmIChub3JtYWxfc3R5bGVzKSB7XG5cdFx0XHRcdHJlc2VydmVkX25hbWVzLnB1c2goLi4uT2JqZWN0LmtleXMobm9ybWFsX3N0eWxlcykubWFwKHRvX2Nzc19uYW1lKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW1wb3J0YW50X3N0eWxlcykge1xuXHRcdFx0XHRyZXNlcnZlZF9uYW1lcy5wdXNoKC4uLk9iamVjdC5rZXlzKGltcG9ydGFudF9zdHlsZXMpLm1hcCh0b19jc3NfbmFtZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnRfaW5kZXggPSAwO1xuXHRcdFx0dmFyIG5hbWVfaW5kZXggPSAtMTtcblxuXHRcdFx0Y29uc3QgbGVuID0gdmFsdWUubGVuZ3RoO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHR2YXIgYyA9IHZhbHVlW2ldO1xuXG5cdFx0XHRcdGlmIChpbl9jb21tZW50KSB7XG5cdFx0XHRcdFx0aWYgKGMgPT09ICcvJyAmJiB2YWx1ZVtpIC0gMV0gPT09ICcqJykge1xuXHRcdFx0XHRcdFx0aW5fY29tbWVudCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChpbl9zdHIpIHtcblx0XHRcdFx0XHRpZiAoaW5fc3RyID09PSBjKSB7XG5cdFx0XHRcdFx0XHRpbl9zdHIgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoYyA9PT0gJy8nICYmIHZhbHVlW2kgKyAxXSA9PT0gJyonKSB7XG5cdFx0XHRcdFx0aW5fY29tbWVudCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYyA9PT0gJ1wiJyB8fCBjID09PSBcIidcIikge1xuXHRcdFx0XHRcdGluX3N0ciA9IGM7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYyA9PT0gJygnKSB7XG5cdFx0XHRcdFx0aW5fYXBvKys7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYyA9PT0gJyknKSB7XG5cdFx0XHRcdFx0aW5fYXBvLS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWluX2NvbW1lbnQgJiYgaW5fc3RyID09PSBmYWxzZSAmJiBpbl9hcG8gPT09IDApIHtcblx0XHRcdFx0XHRpZiAoYyA9PT0gJzonICYmIG5hbWVfaW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRuYW1lX2luZGV4ID0gaTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICc7JyB8fCBpID09PSBsZW4gLSAxKSB7XG5cdFx0XHRcdFx0XHRpZiAobmFtZV9pbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG5hbWUgPSB0b19jc3NfbmFtZSh2YWx1ZS5zdWJzdHJpbmcoc3RhcnRfaW5kZXgsIG5hbWVfaW5kZXgpLnRyaW0oKSk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFyZXNlcnZlZF9uYW1lcy5pbmNsdWRlcyhuYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjICE9PSAnOycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSB2YWx1ZS5zdWJzdHJpbmcoc3RhcnRfaW5kZXgsIGkpLnRyaW0oKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdfc3R5bGUgKz0gJyAnICsgcHJvcGVydHkgKyAnOyc7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3RhcnRfaW5kZXggPSBpICsgMTtcblx0XHRcdFx0XHRcdG5hbWVfaW5kZXggPSAtMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobm9ybWFsX3N0eWxlcykge1xuXHRcdFx0bmV3X3N0eWxlICs9IGFwcGVuZF9zdHlsZXMobm9ybWFsX3N0eWxlcyk7XG5cdFx0fVxuXG5cdFx0aWYgKGltcG9ydGFudF9zdHlsZXMpIHtcblx0XHRcdG5ld19zdHlsZSArPSBhcHBlbmRfc3R5bGVzKGltcG9ydGFudF9zdHlsZXMsIHRydWUpO1xuXHRcdH1cblxuXHRcdG5ld19zdHlsZSA9IG5ld19zdHlsZS50cmltKCk7XG5cdFx0cmV0dXJuIG5ld19zdHlsZSA9PT0gJycgPyBudWxsIDogbmV3X3N0eWxlO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBudWxsIDogU3RyaW5nKHZhbHVlKTtcbn1cbiIsImltcG9ydCB7IHRvX2NsYXNzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2F0dHJpYnV0ZXMuanMnO1xuaW1wb3J0IHsgaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGRvbVxuICogQHBhcmFtIHtib29sZWFuIHwgbnVtYmVyfSBpc19odG1sXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gW2hhc2hdXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IFtwcmV2X2NsYXNzZXNdXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IFtuZXh0X2NsYXNzZXNdXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgYm9vbGVhbj4gfCB1bmRlZmluZWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfY2xhc3MoZG9tLCBpc19odG1sLCB2YWx1ZSwgaGFzaCwgcHJldl9jbGFzc2VzLCBuZXh0X2NsYXNzZXMpIHtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvciBuZWVkIHRvIGFkZCBfX2NsYXNzTmFtZSB0byBwYXRjaGVkIHByb3RvdHlwZVxuXHR2YXIgcHJldiA9IGRvbS5fX2NsYXNzTmFtZTtcblxuXHRpZiAoXG5cdFx0aHlkcmF0aW5nIHx8XG5cdFx0cHJldiAhPT0gdmFsdWUgfHxcblx0XHRwcmV2ID09PSB1bmRlZmluZWQgLy8gZm9yIGVkZ2UgY2FzZSBvZiBgY2xhc3M9e3VuZGVmaW5lZH1gXG5cdCkge1xuXHRcdHZhciBuZXh0X2NsYXNzX25hbWUgPSB0b19jbGFzcyh2YWx1ZSwgaGFzaCwgbmV4dF9jbGFzc2VzKTtcblxuXHRcdGlmICghaHlkcmF0aW5nIHx8IG5leHRfY2xhc3NfbmFtZSAhPT0gZG9tLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSkge1xuXHRcdFx0Ly8gUmVtb3ZpbmcgdGhlIGF0dHJpYnV0ZSB3aGVuIHRoZSB2YWx1ZSBpcyBvbmx5IGFuIGVtcHR5IHN0cmluZyBjYXVzZXNcblx0XHRcdC8vIHBlcmZvcm1hbmNlIGlzc3VlcyB2cyBzaW1wbHkgbWFraW5nIHRoZSBjbGFzc05hbWUgYW4gZW1wdHkgc3RyaW5nLiBTb1xuXHRcdFx0Ly8gd2Ugc2hvdWxkIG9ubHkgcmVtb3ZlIHRoZSBjbGFzcyBpZiB0aGUgdmFsdWUgaXMgbnVsbGlzaFxuXHRcdFx0Ly8gYW5kIHRoZXJlIG5vIGhhc2gvZGlyZWN0aXZlcyA6XG5cdFx0XHRpZiAobmV4dF9jbGFzc19uYW1lID09IG51bGwpIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcblx0XHRcdH0gZWxzZSBpZiAoaXNfaHRtbCkge1xuXHRcdFx0XHRkb20uY2xhc3NOYW1lID0gbmV4dF9jbGFzc19uYW1lO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBuZXh0X2NsYXNzX25hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgbmVlZCB0byBhZGQgX19jbGFzc05hbWUgdG8gcGF0Y2hlZCBwcm90b3R5cGVcblx0XHRkb20uX19jbGFzc05hbWUgPSB2YWx1ZTtcblx0fSBlbHNlIGlmIChuZXh0X2NsYXNzZXMgJiYgcHJldl9jbGFzc2VzICE9PSBuZXh0X2NsYXNzZXMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gbmV4dF9jbGFzc2VzKSB7XG5cdFx0XHR2YXIgaXNfcHJlc2VudCA9ICEhbmV4dF9jbGFzc2VzW2tleV07XG5cblx0XHRcdGlmIChwcmV2X2NsYXNzZXMgPT0gbnVsbCB8fCBpc19wcmVzZW50ICE9PSAhIXByZXZfY2xhc3Nlc1trZXldKSB7XG5cdFx0XHRcdGRvbS5jbGFzc0xpc3QudG9nZ2xlKGtleSwgaXNfcHJlc2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5leHRfY2xhc3Nlcztcbn1cbiIsImltcG9ydCB7IHRvX3N0eWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2F0dHJpYnV0ZXMuanMnO1xuaW1wb3J0IHsgaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQgJiBFbGVtZW50Q1NTSW5saW5lU3R5bGV9IGRvbVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBwcmV2XG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IG5leHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJpb3JpdHldXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZV9zdHlsZXMoZG9tLCBwcmV2ID0ge30sIG5leHQsIHByaW9yaXR5KSB7XG5cdGZvciAodmFyIGtleSBpbiBuZXh0KSB7XG5cdFx0dmFyIHZhbHVlID0gbmV4dFtrZXldO1xuXG5cdFx0aWYgKHByZXZba2V5XSAhPT0gdmFsdWUpIHtcblx0XHRcdGlmIChuZXh0W2tleV0gPT0gbnVsbCkge1xuXHRcdFx0XHRkb20uc3R5bGUucmVtb3ZlUHJvcGVydHkoa2V5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvbS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBwcmlvcml0eSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50ICYgRWxlbWVudENTU0lubGluZVN0eWxlfSBkb21cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdmFsdWVcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYW55PiB8IFtSZWNvcmQ8c3RyaW5nLCBhbnk+LCBSZWNvcmQ8c3RyaW5nLCBhbnk+XX0gW3ByZXZfc3R5bGVzXVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgW1JlY29yZDxzdHJpbmcsIGFueT4sIFJlY29yZDxzdHJpbmcsIGFueT5dfSBbbmV4dF9zdHlsZXNdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc3R5bGUoZG9tLCB2YWx1ZSwgcHJldl9zdHlsZXMsIG5leHRfc3R5bGVzKSB7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0dmFyIHByZXYgPSBkb20uX19zdHlsZTtcblxuXHRpZiAoaHlkcmF0aW5nIHx8IHByZXYgIT09IHZhbHVlKSB7XG5cdFx0dmFyIG5leHRfc3R5bGVfYXR0ciA9IHRvX3N0eWxlKHZhbHVlLCBuZXh0X3N0eWxlcyk7XG5cblx0XHRpZiAoIWh5ZHJhdGluZyB8fCBuZXh0X3N0eWxlX2F0dHIgIT09IGRvbS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcblx0XHRcdGlmIChuZXh0X3N0eWxlX2F0dHIgPT0gbnVsbCkge1xuXHRcdFx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tLnN0eWxlLmNzc1RleHQgPSBuZXh0X3N0eWxlX2F0dHI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGRvbS5fX3N0eWxlID0gdmFsdWU7XG5cdH0gZWxzZSBpZiAobmV4dF9zdHlsZXMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShuZXh0X3N0eWxlcykpIHtcblx0XHRcdHVwZGF0ZV9zdHlsZXMoZG9tLCBwcmV2X3N0eWxlcz8uWzBdLCBuZXh0X3N0eWxlc1swXSk7XG5cdFx0XHR1cGRhdGVfc3R5bGVzKGRvbSwgcHJldl9zdHlsZXM/LlsxXSwgbmV4dF9zdHlsZXNbMV0sICdpbXBvcnRhbnQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dXBkYXRlX3N0eWxlcyhkb20sIHByZXZfc3R5bGVzLCBuZXh0X3N0eWxlcyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5leHRfc3R5bGVzO1xufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50IH0gZnJvbSAnLi9zaGFyZWQuanMnO1xuaW1wb3J0IHsgaXMgfSBmcm9tICcuLi8uLi8uLi9wcm94eS5qcyc7XG5pbXBvcnQgeyBpc19hcnJheSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4uLy4uLy4uL3dhcm5pbmdzLmpzJztcbmltcG9ydCB7IEJhdGNoLCBjdXJyZW50X2JhdGNoLCBwcmV2aW91c19iYXRjaCB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvYmF0Y2guanMnO1xuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGNvcnJlY3Qgb3B0aW9uKHMpIChkZXBlbmRpbmcgb24gd2hldGhlciB0aGlzIGlzIGEgbXVsdGlwbGUgc2VsZWN0KVxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdFxuICogQHBhcmFtIHtWfSB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBtb3VudGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlLCBtb3VudGluZyA9IGZhbHNlKSB7XG5cdGlmIChzZWxlY3QubXVsdGlwbGUpIHtcblx0XHQvLyBJZiB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZCwga2VlcCB0aGUgc2VsZWN0aW9uIGFzIGlzXG5cdFx0aWYgKHZhbHVlID09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIElmIG5vdCBhbiBhcnJheSwgd2FybiBhbmQga2VlcCB0aGUgc2VsZWN0aW9uIGFzIGlzXG5cdFx0aWYgKCFpc19hcnJheSh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiB3LnNlbGVjdF9tdWx0aXBsZV9pbnZhbGlkX3ZhbHVlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlLCB1cGRhdGUgdGhlIHNlbGVjdGlvblxuXHRcdGZvciAodmFyIG9wdGlvbiBvZiBzZWxlY3Qub3B0aW9ucykge1xuXHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuaW5jbHVkZXMoZ2V0X29wdGlvbl92YWx1ZShvcHRpb24pKTtcblx0XHR9XG5cblx0XHRyZXR1cm47XG5cdH1cblxuXHRmb3IgKG9wdGlvbiBvZiBzZWxlY3Qub3B0aW9ucykge1xuXHRcdHZhciBvcHRpb25fdmFsdWUgPSBnZXRfb3B0aW9uX3ZhbHVlKG9wdGlvbik7XG5cdFx0aWYgKGlzKG9wdGlvbl92YWx1ZSwgdmFsdWUpKSB7XG5cdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXG5cdGlmICghbW91bnRpbmcgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gLTE7IC8vIG5vIG9wdGlvbiBzaG91bGQgYmUgc2VsZWN0ZWRcblx0fVxufVxuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGNvcnJlY3Qgb3B0aW9uKHMpIGlmIGB2YWx1ZWAgaXMgZ2l2ZW4sXG4gKiBhbmQgdGhlbiBzZXRzIHVwIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gc3luYyB0aGVcbiAqIGN1cnJlbnQgc2VsZWN0aW9uIHRvIHRoZSBkb20gd2hlbiBpdCBjaGFuZ2VzLiBTdWNoXG4gKiBjaGFuZ2VzIGNvdWxkIGZvciBleGFtcGxlIG9jY3VyIHdoZW4gb3B0aW9ucyBhcmVcbiAqIGluc2lkZSBhbiBgI2VhY2hgIGJsb2NrLlxuICogQHBhcmFtIHtIVE1MU2VsZWN0RWxlbWVudH0gc2VsZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0X3NlbGVjdChzZWxlY3QpIHtcblx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgc2VsZWN0Ll9fdmFsdWUpO1xuXHRcdC8vIERlbGliZXJhdGVseSBkb24ndCB1cGRhdGUgdGhlIHBvdGVudGlhbCBiaW5kaW5nIHZhbHVlLFxuXHRcdC8vIHRoZSBtb2RlbCBzaG91bGQgYmUgcHJlc2VydmVkIHVubGVzcyBleHBsaWNpdGx5IGNoYW5nZWRcblx0fSk7XG5cblx0b2JzZXJ2ZXIub2JzZXJ2ZShzZWxlY3QsIHtcblx0XHQvLyBMaXN0ZW4gdG8gb3B0aW9uIGVsZW1lbnQgY2hhbmdlc1xuXHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRzdWJ0cmVlOiB0cnVlLCAvLyBiZWNhdXNlIG9mIDxvcHRncm91cD5cblx0XHQvLyBMaXN0ZW4gdG8gb3B0aW9uIGVsZW1lbnQgdmFsdWUgYXR0cmlidXRlIGNoYW5nZXNcblx0XHQvLyAoZG9lc24ndCBnZXQgbm90aWZpZWQgb2Ygc2VsZWN0IHZhbHVlIGNoYW5nZXMsXG5cdFx0Ly8gYmVjYXVzZSB0aGF0IHByb3BlcnR5IGlzIG5vdCByZWZsZWN0ZWQgYXMgYW4gYXR0cmlidXRlKVxuXHRcdGF0dHJpYnV0ZXM6IHRydWUsXG5cdFx0YXR0cmlidXRlRmlsdGVyOiBbJ3ZhbHVlJ11cblx0fSk7XG5cblx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MU2VsZWN0RWxlbWVudH0gc2VsZWN0XG4gKiBAcGFyYW0geygpID0+IHVua25vd259IGdldFxuICogQHBhcmFtIHsodmFsdWU6IHVua25vd24pID0+IHZvaWR9IHNldFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX3NlbGVjdF92YWx1ZShzZWxlY3QsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdHZhciBiYXRjaGVzID0gbmV3IFdlYWtTZXQoKTtcblx0dmFyIG1vdW50aW5nID0gdHJ1ZTtcblxuXHRsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50KHNlbGVjdCwgJ2NoYW5nZScsIChpc19yZXNldCkgPT4ge1xuXHRcdHZhciBxdWVyeSA9IGlzX3Jlc2V0ID8gJ1tzZWxlY3RlZF0nIDogJzpjaGVja2VkJztcblx0XHQvKiogQHR5cGUge3Vua25vd259ICovXG5cdFx0dmFyIHZhbHVlO1xuXG5cdFx0aWYgKHNlbGVjdC5tdWx0aXBsZSkge1xuXHRcdFx0dmFsdWUgPSBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbChxdWVyeSksIGdldF9vcHRpb25fdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvKiogQHR5cGUge0hUTUxPcHRpb25FbGVtZW50IHwgbnVsbH0gKi9cblx0XHRcdHZhciBzZWxlY3RlZF9vcHRpb24gPVxuXHRcdFx0XHRzZWxlY3QucXVlcnlTZWxlY3RvcihxdWVyeSkgPz9cblx0XHRcdFx0Ly8gd2lsbCBmYWxsIGJhY2sgdG8gZmlyc3Qgbm9uLWRpc2FibGVkIG9wdGlvbiBpZiBubyBvcHRpb24gaXMgc2VsZWN0ZWRcblx0XHRcdFx0c2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvbjpub3QoW2Rpc2FibGVkXSknKTtcblx0XHRcdHZhbHVlID0gc2VsZWN0ZWRfb3B0aW9uICYmIGdldF9vcHRpb25fdmFsdWUoc2VsZWN0ZWRfb3B0aW9uKTtcblx0XHR9XG5cblx0XHRzZXQodmFsdWUpO1xuXG5cdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRcdGJhdGNoZXMuYWRkKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gTmVlZHMgdG8gYmUgYW4gZWZmZWN0LCBub3QgYSByZW5kZXJfZWZmZWN0LCBzbyB0aGF0IGluIGNhc2Ugb2YgZWFjaCBsb29wcyB0aGUgbG9naWMgcnVucyBhZnRlciB0aGUgZWFjaCBibG9jayBoYXMgdXBkYXRlZFxuXHRlZmZlY3QoKCkgPT4ge1xuXHRcdHZhciB2YWx1ZSA9IGdldCgpO1xuXG5cdFx0aWYgKHNlbGVjdCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuXHRcdFx0Ly8gd2UgbmVlZCBib3RoLCBiZWNhdXNlIGluIG5vbi1hc3luYyBtb2RlLCByZW5kZXIgZWZmZWN0cyBydW4gYmVmb3JlIHByZXZpb3VzX2JhdGNoIGlzIHNldFxuXHRcdFx0dmFyIGJhdGNoID0gLyoqIEB0eXBlIHtCYXRjaH0gKi8gKHByZXZpb3VzX2JhdGNoID8/IGN1cnJlbnRfYmF0Y2gpO1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgdGhlIDxzZWxlY3Q+IGlmIGl0IGlzIGZvY3VzZWQuIFdlIGNhbiBnZXQgaGVyZSBpZiwgZm9yIGV4YW1wbGUsXG5cdFx0XHQvLyBhbiB1cGRhdGUgaXMgZGVmZXJyZWQgYmVjYXVzZSBvZiBhc3luYyB3b3JrIGRlcGVuZGluZyBvbiB0aGUgc2VsZWN0OlxuXHRcdFx0Ly9cblx0XHRcdC8vIDxzZWxlY3QgYmluZDp2YWx1ZT17c2VsZWN0ZWR9Pi4uLjwvc2VsZWN0PlxuXHRcdFx0Ly8gPHA+e2F3YWl0IGZpbmQoc2VsZWN0ZWQpfTwvcD5cblx0XHRcdGlmIChiYXRjaGVzLmhhcyhiYXRjaCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSwgbW91bnRpbmcpO1xuXG5cdFx0Ly8gTW91bnRpbmcgYW5kIHZhbHVlIHVuZGVmaW5lZCAtPiB0YWtlIHNlbGVjdGlvbiBmcm9tIGRvbVxuXHRcdGlmIChtb3VudGluZyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvKiogQHR5cGUge0hUTUxPcHRpb25FbGVtZW50IHwgbnVsbH0gKi9cblx0XHRcdHZhciBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcblx0XHRcdGlmIChzZWxlY3RlZF9vcHRpb24gIT09IG51bGwpIHtcblx0XHRcdFx0dmFsdWUgPSBnZXRfb3B0aW9uX3ZhbHVlKHNlbGVjdGVkX29wdGlvbik7XG5cdFx0XHRcdHNldCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHNlbGVjdC5fX3ZhbHVlID0gdmFsdWU7XG5cdFx0bW91bnRpbmcgPSBmYWxzZTtcblx0fSk7XG5cblx0aW5pdF9zZWxlY3Qoc2VsZWN0KTtcbn1cblxuLyoqIEBwYXJhbSB7SFRNTE9wdGlvbkVsZW1lbnR9IG9wdGlvbiAqL1xuZnVuY3Rpb24gZ2V0X29wdGlvbl92YWx1ZShvcHRpb24pIHtcblx0Ly8gX192YWx1ZSBvbmx5IGV4aXN0cyBpZiB0aGUgPG9wdGlvbj4gaGFzIGEgdmFsdWUgYXR0cmlidXRlXG5cdGlmICgnX192YWx1ZScgaW4gb3B0aW9uKSB7XG5cdFx0cmV0dXJuIG9wdGlvbi5fX3ZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBvcHRpb24udmFsdWU7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgQmxvY2tlciwgRWZmZWN0IH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgaHlkcmF0aW5nLCBzZXRfaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGdldF9kZXNjcmlwdG9ycywgZ2V0X3Byb3RvdHlwZV9vZiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfZXZlbnQsIGRlbGVnYXRlLCBkZWxlZ2F0ZWQsIGV2ZW50LCBldmVudF9zeW1ib2wgfSBmcm9tICcuL2V2ZW50cy5qcyc7XG5pbXBvcnQgeyBhZGRfZm9ybV9yZXNldF9saXN0ZW5lciwgYXV0b2ZvY3VzIH0gZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCAqIGFzIHcgZnJvbSAnLi4vLi4vd2FybmluZ3MuanMnO1xuaW1wb3J0IHsgSVNfWEhUTUwsIExPQURJTkdfQVRUUl9TWU1CT0wgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vdGFzay5qcyc7XG5pbXBvcnQgeyBpc19jYXB0dXJlX2V2ZW50LCBjYW5fZGVsZWdhdGVfZXZlbnQsIG5vcm1hbGl6ZV9hdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdGdldCxcblx0c2V0X2FjdGl2ZV9lZmZlY3QsXG5cdHNldF9hY3RpdmVfcmVhY3Rpb25cbn0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBhdHRhY2ggfSBmcm9tICcuL2F0dGFjaG1lbnRzLmpzJztcbmltcG9ydCB7IGNsc3ggfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYXR0cmlidXRlcy5qcyc7XG5pbXBvcnQgeyBzZXRfY2xhc3MgfSBmcm9tICcuL2NsYXNzLmpzJztcbmltcG9ydCB7IHNldF9zdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xuaW1wb3J0IHsgQVRUQUNITUVOVF9LRVksIE5BTUVTUEFDRV9IVE1MLCBVTklOSVRJQUxJWkVEIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGJyYW5jaCwgZGVzdHJveV9lZmZlY3QsIGVmZmVjdCwgbWFuYWdlZCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBpbml0X3NlbGVjdCwgc2VsZWN0X29wdGlvbiB9IGZyb20gJy4vYmluZGluZ3Mvc2VsZWN0LmpzJztcbmltcG9ydCB7IGZsYXR0ZW4gfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2FzeW5jLmpzJztcblxuZXhwb3J0IGNvbnN0IENMQVNTID0gU3ltYm9sKCdjbGFzcycpO1xuZXhwb3J0IGNvbnN0IFNUWUxFID0gU3ltYm9sKCdzdHlsZScpO1xuXG5jb25zdCBJU19DVVNUT01fRUxFTUVOVCA9IFN5bWJvbCgnaXMgY3VzdG9tIGVsZW1lbnQnKTtcbmNvbnN0IElTX0hUTUwgPSBTeW1ib2woJ2lzIGh0bWwnKTtcblxuY29uc3QgTElOS19UQUcgPSBJU19YSFRNTCA/ICdsaW5rJyA6ICdMSU5LJztcbmNvbnN0IElOUFVUX1RBRyA9IElTX1hIVE1MID8gJ2lucHV0JyA6ICdJTlBVVCc7XG5jb25zdCBPUFRJT05fVEFHID0gSVNfWEhUTUwgPyAnb3B0aW9uJyA6ICdPUFRJT04nO1xuY29uc3QgU0VMRUNUX1RBRyA9IElTX1hIVE1MID8gJ3NlbGVjdCcgOiAnU0VMRUNUJztcbmNvbnN0IFBST0dSRVNTX1RBRyA9IElTX1hIVE1MID8gJ3Byb2dyZXNzJyA6ICdQUk9HUkVTUyc7XG5cbi8qKlxuICogVGhlIHZhbHVlL2NoZWNrZWQgYXR0cmlidXRlIGluIHRoZSB0ZW1wbGF0ZSBhY3R1YWxseSBjb3JyZXNwb25kcyB0byB0aGUgZGVmYXVsdFZhbHVlIHByb3BlcnR5LCBzbyB3ZSBuZWVkXG4gKiB0byByZW1vdmUgaXQgdXBvbiBoeWRyYXRpb24gdG8gYXZvaWQgYSBidWcgd2hlbiBzb21lb25lIHJlc2V0cyB0aGUgZm9ybSB2YWx1ZS5cbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX2lucHV0X2RlZmF1bHRzKGlucHV0KSB7XG5cdGlmICghaHlkcmF0aW5nKSByZXR1cm47XG5cblx0dmFyIGFscmVhZHlfcmVtb3ZlZCA9IGZhbHNlO1xuXG5cdC8vIFdlIHRyeSBhbmQgcmVtb3ZlIHRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgbGF0ZXIsIHJhdGhlciB0aGFuIHN5bmMgZHVyaW5nIGh5ZHJhdGlvbi5cblx0Ly8gRG9pbmcgaXQgc3luYyBkdXJpbmcgaHlkcmF0aW9uIGhhcyBhIG5lZ2F0aXZlIGltcGFjdCBvbiBwZXJmb3JtYW5jZSwgYnV0IGRlZmVycmluZyB0aGVcblx0Ly8gd29yayBpbiBhbiBpZGxlIHRhc2sgYWxsZXZpYXRlcyB0aGlzIGdyZWF0bHkuIElmIGEgZm9ybSByZXNldCBldmVudCBjb21lcyBpbiBiZWZvcmVcblx0Ly8gdGhlIGlkbGUgY2FsbGJhY2ssIHRoZW4gd2UgZW5zdXJlIHRoZSBpbnB1dCBkZWZhdWx0cyBhcmUgY2xlYXJlZCBqdXN0IGJlZm9yZS5cblx0dmFyIHJlbW92ZV9kZWZhdWx0cyA9ICgpID0+IHtcblx0XHRpZiAoYWxyZWFkeV9yZW1vdmVkKSByZXR1cm47XG5cdFx0YWxyZWFkeV9yZW1vdmVkID0gdHJ1ZTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlcyBidXQgcHJlc2VydmUgdGhlIHZhbHVlc1xuXHRcdGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcblx0XHRcdHZhciB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuXHRcdFx0c2V0X2F0dHJpYnV0ZShpbnB1dCwgJ3ZhbHVlJywgbnVsbCk7XG5cdFx0XHRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuXHRcdFx0dmFyIGNoZWNrZWQgPSBpbnB1dC5jaGVja2VkO1xuXHRcdFx0c2V0X2F0dHJpYnV0ZShpbnB1dCwgJ2NoZWNrZWQnLCBudWxsKTtcblx0XHRcdGlucHV0LmNoZWNrZWQgPSBjaGVja2VkO1xuXHRcdH1cblx0fTtcblxuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdGlucHV0Ll9fb25fciA9IHJlbW92ZV9kZWZhdWx0cztcblx0cXVldWVfbWljcm9fdGFzayhyZW1vdmVfZGVmYXVsdHMpO1xuXHRhZGRfZm9ybV9yZXNldF9saXN0ZW5lcigpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfdmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcblx0dmFyIGF0dHJpYnV0ZXMgPSBnZXRfYXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRpZiAoXG5cdFx0YXR0cmlidXRlcy52YWx1ZSA9PT1cblx0XHRcdChhdHRyaWJ1dGVzLnZhbHVlID1cblx0XHRcdFx0Ly8gdHJlYXQgbnVsbCBhbmQgdW5kZWZpbmVkIHRoZSBzYW1lIGZvciB0aGUgaW5pdGlhbCB2YWx1ZVxuXHRcdFx0XHR2YWx1ZSA/PyB1bmRlZmluZWQpIHx8XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdC8vIGBwcm9ncmVzc2AgZWxlbWVudHMgYWx3YXlzIG5lZWQgdGhlaXIgdmFsdWUgc2V0IHdoZW4gaXQncyBgMGBcblx0XHQoZWxlbWVudC52YWx1ZSA9PT0gdmFsdWUgJiYgKHZhbHVlICE9PSAwIHx8IGVsZW1lbnQubm9kZU5hbWUgIT09IFBST0dSRVNTX1RBRykpXG5cdCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0ZWxlbWVudC52YWx1ZSA9IHZhbHVlID8/ICcnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfY2hlY2tlZChlbGVtZW50LCBjaGVja2VkKSB7XG5cdHZhciBhdHRyaWJ1dGVzID0gZ2V0X2F0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0aWYgKFxuXHRcdGF0dHJpYnV0ZXMuY2hlY2tlZCA9PT1cblx0XHQoYXR0cmlidXRlcy5jaGVja2VkID1cblx0XHRcdC8vIHRyZWF0IG51bGwgYW5kIHVuZGVmaW5lZCB0aGUgc2FtZSBmb3IgdGhlIGluaXRpYWwgdmFsdWVcblx0XHRcdGNoZWNrZWQgPz8gdW5kZWZpbmVkKVxuXHQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdGVsZW1lbnQuY2hlY2tlZCA9IGNoZWNrZWQ7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgYHNlbGVjdGVkYCBhdHRyaWJ1dGUgb24gYW4gYG9wdGlvbmAgZWxlbWVudC5cbiAqIE5vdCBzZXQgdGhyb3VnaCB0aGUgcHJvcGVydHkgYmVjYXVzZSB0aGF0IGRvZXNuJ3QgcmVmbGVjdCB0byB0aGUgRE9NLFxuICogd2hpY2ggbWVhbnMgaXQgd291bGRuJ3QgYmUgdGFrZW4gaW50byBhY2NvdW50IHdoZW4gYSBmb3JtIGlzIHJlc2V0LlxuICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3NlbGVjdGVkKGVsZW1lbnQsIHNlbGVjdGVkKSB7XG5cdGlmIChzZWxlY3RlZCkge1xuXHRcdC8vIFRoZSBzZWxlY3RlZCBvcHRpb24gY291bGQndmUgY2hhbmdlZCB2aWEgdXNlciBzZWxlY3Rpb24sIGFuZFxuXHRcdC8vIHNldHRpbmcgdGhlIHZhbHVlIHdpdGhvdXQgdGhpcyBjaGVjayB3b3VsZCBzZXQgaXQgYmFjay5cblx0XHRpZiAoIWVsZW1lbnQuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuXHR9XG59XG5cbi8qKlxuICogQXBwbGllcyB0aGUgZGVmYXVsdCBjaGVja2VkIHByb3BlcnR5IHdpdGhvdXQgaW5mbHVlbmNpbmcgdGhlIGN1cnJlbnQgY2hlY2tlZCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZGVmYXVsdF9jaGVja2VkKGVsZW1lbnQsIGNoZWNrZWQpIHtcblx0Y29uc3QgZXhpc3RpbmdfdmFsdWUgPSBlbGVtZW50LmNoZWNrZWQ7XG5cdGVsZW1lbnQuZGVmYXVsdENoZWNrZWQgPSBjaGVja2VkO1xuXHRlbGVtZW50LmNoZWNrZWQgPSBleGlzdGluZ192YWx1ZTtcbn1cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBkZWZhdWx0IHZhbHVlIHByb3BlcnR5IHdpdGhvdXQgaW5mbHVlbmNpbmcgdGhlIGN1cnJlbnQgdmFsdWUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9kZWZhdWx0X3ZhbHVlKGVsZW1lbnQsIHZhbHVlKSB7XG5cdGNvbnN0IGV4aXN0aW5nX3ZhbHVlID0gZWxlbWVudC52YWx1ZTtcblx0ZWxlbWVudC5kZWZhdWx0VmFsdWUgPSB2YWx1ZTtcblx0ZWxlbWVudC52YWx1ZSA9IGV4aXN0aW5nX3ZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcF93YXJuaW5nXVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGUsIHZhbHVlLCBza2lwX3dhcm5pbmcpIHtcblx0dmFyIGF0dHJpYnV0ZXMgPSBnZXRfYXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0YXR0cmlidXRlc1thdHRyaWJ1dGVdID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblxuXHRcdGlmIChcblx0XHRcdGF0dHJpYnV0ZSA9PT0gJ3NyYycgfHxcblx0XHRcdGF0dHJpYnV0ZSA9PT0gJ3NyY3NldCcgfHxcblx0XHRcdChhdHRyaWJ1dGUgPT09ICdocmVmJyAmJiBlbGVtZW50Lm5vZGVOYW1lID09PSBMSU5LX1RBRylcblx0XHQpIHtcblx0XHRcdGlmICghc2tpcF93YXJuaW5nKSB7XG5cdFx0XHRcdGNoZWNrX3NyY19pbl9kZXZfaHlkcmF0aW9uKGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUgPz8gJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSByZXNldCB0aGVzZSBhdHRyaWJ1dGVzLCB0aGV5IHdvdWxkIHJlc3VsdCBpbiBhbm90aGVyIG5ldHdvcmsgcmVxdWVzdCwgd2hpY2ggd2Ugd2FudCB0byBhdm9pZC5cblx0XHRcdC8vIFdlIGFzc3VtZSB0aGV5IGFyZSB0aGUgc2FtZSBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyIGFzIGNoZWNraW5nIGlmIHRoZXkgYXJlIGVxdWFsIGlzIGV4cGVuc2l2ZVxuXHRcdFx0Ly8gKHdlIGNhbid0IGp1c3QgY29tcGFyZSB0aGUgc3RyaW5ncyBhcyB0aGV5IGNhbiBiZSBkaWZmZXJlbnQgYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlciBidXQgcmVzdWx0IGluIHRoZVxuXHRcdFx0Ly8gc2FtZSB1cmwsIHNvIHdlIHdvdWxkIG5lZWQgdG8gY3JlYXRlIGhpZGRlbiBhbmNob3IgZWxlbWVudHMgdG8gY29tcGFyZSB0aGVtKVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXG5cdGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPT09IChhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSB2YWx1ZSkpIHJldHVybjtcblxuXHRpZiAoYXR0cmlidXRlID09PSAnbG9hZGluZycpIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudFtMT0FESU5HX0FUVFJfU1lNQk9MXSA9IHZhbHVlO1xuXHR9XG5cblx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgJiYgZ2V0X3NldHRlcnMoZWxlbWVudCkuaW5jbHVkZXMoYXR0cmlidXRlKSkge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRlbGVtZW50W2F0dHJpYnV0ZV0gPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZG9tXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF94bGlua19hdHRyaWJ1dGUoZG9tLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG5cdGRvbS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG5cdC8vIFdlIG5lZWQgdG8gZW5zdXJlIHRoYXQgc2V0dGluZyBjdXN0b20gZWxlbWVudCBwcm9wcywgd2hpY2ggY2FuXG5cdC8vIGludm9rZSBsaWZlY3ljbGUgbWV0aG9kcyBvbiBvdGhlciBjdXN0b20gZWxlbWVudHMsIGRvZXMgbm90IGFsc29cblx0Ly8gYXNzb2NpYXRlIHRob3NlIGxpZmVjeWNsZSBtZXRob2RzIHdpdGggdGhlIGN1cnJlbnQgYWN0aXZlIHJlYWN0aW9uXG5cdC8vIG9yIGVmZmVjdFxuXHR2YXIgcHJldmlvdXNfcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXG5cdC8vIElmIHdlJ3JlIGh5ZHJhdGluZyBidXQgdGhlIGN1c3RvbSBlbGVtZW50IGlzIGZyb20gU3ZlbHRlLCBhbmQgaXQgYWxyZWFkeSBzY2FmZm9sZGVkLFxuXHQvLyB0aGVuIGl0IG1pZ2h0IHJ1biBibG9jayBsb2dpYyBpbiBoeWRyYXRpb24gbW9kZSwgd2hpY2ggd2UgaGF2ZSB0byBwcmV2ZW50LlxuXHRsZXQgd2FzX2h5ZHJhdGluZyA9IGh5ZHJhdGluZztcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHR9XG5cblx0c2V0X2FjdGl2ZV9yZWFjdGlvbihudWxsKTtcblx0c2V0X2FjdGl2ZV9lZmZlY3QobnVsbCk7XG5cblx0dHJ5IHtcblx0XHRpZiAoXG5cdFx0XHQvLyBgc3R5bGVgIHNob3VsZCB1c2UgYHNldF9hdHRyaWJ1dGVgIHJhdGhlciB0aGFuIHRoZSBzZXR0ZXJcblx0XHRcdHByb3AgIT09ICdzdHlsZScgJiZcblx0XHRcdC8vIERvbid0IGNvbXB1dGUgc2V0dGVycyBmb3IgY3VzdG9tIGVsZW1lbnRzIHdoaWxlIHRoZXkgYXJlbid0IHJlZ2lzdGVyZWQgeWV0LFxuXHRcdFx0Ly8gYmVjYXVzZSBkdXJpbmcgdGhlaXIgdXBncmFkZS9pbnN0YW50aWF0aW9uIHRoZXkgbWlnaHQgYWRkIG1vcmUgc2V0dGVycy5cblx0XHRcdC8vIEluc3RlYWQsIGZhbGwgYmFjayB0byBhIHNpbXBsZSBcImFuIG9iamVjdCwgdGhlbiBzZXQgYXMgcHJvcGVydHlcIiBoZXVyaXN0aWMuXG5cdFx0XHQoc2V0dGVyc19jYWNoZS5oYXMobm9kZS5nZXRBdHRyaWJ1dGUoJ2lzJykgfHwgbm9kZS5ub2RlTmFtZSkgfHxcblx0XHRcdC8vIGN1c3RvbUVsZW1lbnRzIG1heSBub3QgYmUgYXZhaWxhYmxlIGluIGJyb3dzZXIgZXh0ZW5zaW9uIGNvbnRleHRzXG5cdFx0XHQhY3VzdG9tRWxlbWVudHMgfHxcblx0XHRcdGN1c3RvbUVsZW1lbnRzLmdldChub2RlLmdldEF0dHJpYnV0ZSgnaXMnKSB8fCBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdD8gZ2V0X3NldHRlcnMobm9kZSkuaW5jbHVkZXMocHJvcClcblx0XHRcdFx0OiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKVxuXHRcdCkge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0bm9kZVtwcm9wXSA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBXZSBkaWQgZ2V0dGVycyBldGMgY2hlY2tzIGFscmVhZHksIHN0cmluZ2lmeSBiZWZvcmUgcGFzc2luZyB0byBzZXRfYXR0cmlidXRlXG5cdFx0XHQvLyB0byBlbnN1cmUgaXQgZG9lc24ndCBpbnZva2UgdGhlIHNhbWUgbG9naWMgYWdhaW4sIGFuZCBwb3RlbnRpYWxseSBwb3B1bGF0aW5nXG5cdFx0XHQvLyB0aGUgc2V0dGVycyBjYWNoZSB0b28gZWFybHkuXG5cdFx0XHRzZXRfYXR0cmlidXRlKG5vZGUsIHByb3AsIHZhbHVlID09IG51bGwgPyB2YWx1ZSA6IFN0cmluZyh2YWx1ZSkpO1xuXHRcdH1cblx0fSBmaW5hbGx5IHtcblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHByZXZpb3VzX3JlYWN0aW9uKTtcblx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHRcdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFNwcmVhZHMgYXR0cmlidXRlcyBvbnRvIGEgRE9NIGVsZW1lbnQsIHRha2luZyBpbnRvIGFjY291bnQgdGhlIGN1cnJlbnRseSBzZXQgYXR0cmlidXRlc1xuICogQHBhcmFtIHtFbGVtZW50ICYgRWxlbWVudENTU0lubGluZVN0eWxlfSBlbGVtZW50XG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT4gfCB1bmRlZmluZWR9IHByZXZcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55Pn0gbmV4dCBOZXcgYXR0cmlidXRlcyAtIHRoaXMgZnVuY3Rpb24gbXV0YXRlcyB0aGlzIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IFtjc3NfaGFzaF1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Nob3VsZF9yZW1vdmVfZGVmYXVsdHNdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtza2lwX3dhcm5pbmddXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgYW55Pn1cbiAqL1xuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMoXG5cdGVsZW1lbnQsXG5cdHByZXYsXG5cdG5leHQsXG5cdGNzc19oYXNoLFxuXHRzaG91bGRfcmVtb3ZlX2RlZmF1bHRzID0gZmFsc2UsXG5cdHNraXBfd2FybmluZyA9IGZhbHNlXG4pIHtcblx0aWYgKGh5ZHJhdGluZyAmJiBzaG91bGRfcmVtb3ZlX2RlZmF1bHRzICYmIGVsZW1lbnQubm9kZU5hbWUgPT09IElOUFVUX1RBRykge1xuXHRcdHZhciBpbnB1dCA9IC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi8gKGVsZW1lbnQpO1xuXHRcdHZhciBhdHRyaWJ1dGUgPSBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnID8gJ2RlZmF1bHRDaGVja2VkJyA6ICdkZWZhdWx0VmFsdWUnO1xuXG5cdFx0aWYgKCEoYXR0cmlidXRlIGluIG5leHQpKSB7XG5cdFx0XHRyZW1vdmVfaW5wdXRfZGVmYXVsdHMoaW5wdXQpO1xuXHRcdH1cblx0fVxuXG5cdHZhciBhdHRyaWJ1dGVzID0gZ2V0X2F0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0dmFyIGlzX2N1c3RvbV9lbGVtZW50ID0gYXR0cmlidXRlc1tJU19DVVNUT01fRUxFTUVOVF07XG5cdHZhciBwcmVzZXJ2ZV9hdHRyaWJ1dGVfY2FzZSA9ICFhdHRyaWJ1dGVzW0lTX0hUTUxdO1xuXG5cdC8vIElmIHdlJ3JlIGh5ZHJhdGluZyBidXQgdGhlIGN1c3RvbSBlbGVtZW50IGlzIGZyb20gU3ZlbHRlLCBhbmQgaXQgYWxyZWFkeSBzY2FmZm9sZGVkLFxuXHQvLyB0aGVuIGl0IG1pZ2h0IHJ1biBibG9jayBsb2dpYyBpbiBoeWRyYXRpb24gbW9kZSwgd2hpY2ggd2UgaGF2ZSB0byBwcmV2ZW50LlxuXHRsZXQgaXNfaHlkcmF0aW5nX2N1c3RvbV9lbGVtZW50ID0gaHlkcmF0aW5nICYmIGlzX2N1c3RvbV9lbGVtZW50O1xuXHRpZiAoaXNfaHlkcmF0aW5nX2N1c3RvbV9lbGVtZW50KSB7XG5cdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdH1cblxuXHR2YXIgY3VycmVudCA9IHByZXYgfHwge307XG5cdHZhciBpc19vcHRpb25fZWxlbWVudCA9IGVsZW1lbnQubm9kZU5hbWUgPT09IE9QVElPTl9UQUc7XG5cblx0Zm9yICh2YXIga2V5IGluIHByZXYpIHtcblx0XHRpZiAoIShrZXkgaW4gbmV4dCkpIHtcblx0XHRcdG5leHRba2V5XSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG5leHQuY2xhc3MpIHtcblx0XHRuZXh0LmNsYXNzID0gY2xzeChuZXh0LmNsYXNzKTtcblx0fSBlbHNlIGlmIChjc3NfaGFzaCB8fCBuZXh0W0NMQVNTXSkge1xuXHRcdG5leHQuY2xhc3MgPSBudWxsOyAvKiBmb3JjZSBjYWxsIHRvIHNldF9jbGFzcygpICovXG5cdH1cblxuXHRpZiAobmV4dFtTVFlMRV0pIHtcblx0XHRuZXh0LnN0eWxlID8/PSBudWxsOyAvKiBmb3JjZSBjYWxsIHRvIHNldF9zdHlsZSgpICovXG5cdH1cblxuXHR2YXIgc2V0dGVycyA9IGdldF9zZXR0ZXJzKGVsZW1lbnQpO1xuXG5cdC8vIHNpbmNlIGtleSBpcyBjYXB0dXJlZCB3ZSB1c2UgY29uc3Rcblx0Zm9yIChjb25zdCBrZXkgaW4gbmV4dCkge1xuXHRcdC8vIGxldCBpbnN0ZWFkIG9mIHZhciBiZWNhdXNlIHJlZmVyZW5jZWQgaW4gYSBjbG9zdXJlXG5cdFx0bGV0IHZhbHVlID0gbmV4dFtrZXldO1xuXG5cdFx0Ly8gVXAgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG8gZG8gdGhpcyBmb3IgdGhlIGluaXRpYWwgdmFsdWUsIHRvbywgZXZlbiBpZiBpdCdzIHVuZGVmaW5lZCxcblx0XHQvLyBhbmQgdGhpcyB3b3VsZG4ndCBiZSByZWFjaGVkIGluIGNhc2Ugb2YgdW5kZWZpbmVkIGJlY2F1c2Ugb2YgdGhlIGVxdWFsaXR5IGNoZWNrIGJlbG93XG5cdFx0aWYgKGlzX29wdGlvbl9lbGVtZW50ICYmIGtleSA9PT0gJ3ZhbHVlJyAmJiB2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHQvLyBUaGUgPG9wdGlvbj4gZWxlbWVudCBpcyBhIHNwZWNpYWwgY2FzZSBiZWNhdXNlIHJlbW92aW5nIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgbWVhbnNcblx0XHRcdC8vIHRoZSB2YWx1ZSBpcyBzZXQgdG8gdGhlIHRleHQgY29udGVudCBvZiB0aGUgb3B0aW9uIGVsZW1lbnQsIGFuZCBzZXR0aW5nIHRoZSB2YWx1ZVxuXHRcdFx0Ly8gdG8gbnVsbCBvciB1bmRlZmluZWQgbWVhbnMgdGhlIHZhbHVlIGlzIHNldCB0byB0aGUgc3RyaW5nIFwibnVsbFwiIG9yIFwidW5kZWZpbmVkXCIuXG5cdFx0XHQvLyBUbyBhbGlnbiB3aXRoIGhvdyB3ZSBoYW5kbGUgdGhpcyBjYXNlIGluIG5vbi1zcHJlYWQtc2NlbmFyaW9zLCB0aGlzIGxvZ2ljIGlzIG5lZWRlZC5cblx0XHRcdC8vIFRoZXJlJ3MgYSBzdXBlci1lZGdlLWNhc2UgYnVnIGhlcmUgdGhhdCBpcyBsZWZ0IGluIGluIGZhdm9yIG9mIHNtYWxsZXIgY29kZSBzaXplOlxuXHRcdFx0Ly8gQmVjYXVzZSBvZiB0aGUgXCJzZXQgbWlzc2luZyBwcm9wcyB0byBudWxsXCIgbG9naWMgYWJvdmUsIHdlIGNhbid0IGRpZmZlcmVudGlhdGVcblx0XHRcdC8vIGJldHdlZW4gYSBtaXNzaW5nIHZhbHVlIGFuZCBhbiBleHBsaWNpdGx5IHNldCB2YWx1ZSBvZiBudWxsIG9yIHVuZGVmaW5lZC4gVGhhdCBtZWFuc1xuXHRcdFx0Ly8gdGhhdCBvbmNlIHNldCwgdGhlIHZhbHVlIGF0dHJpYnV0ZSBvZiBhbiA8b3B0aW9uPiBlbGVtZW50IGNhbid0IGJlIHJlbW92ZWQuIFRoaXMgaXNcblx0XHRcdC8vIGEgdmVyeSByYXJlIGVkZ2UgY2FzZSwgYW5kIHJlbW92aW5nIHRoZSBhdHRyaWJ1dGUgYWx0b2dldGhlciBpc24ndCBwb3NzaWJsZSBlaXRoZXJcblx0XHRcdC8vIGZvciB0aGUgPG9wdGlvbiB2YWx1ZT17dW5kZWZpbmVkfT4gY2FzZSwgc28gd2UncmUgbm90IGxvc2luZyBhbnkgZnVuY3Rpb25hbGl0eSBoZXJlLlxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZWxlbWVudC52YWx1ZSA9IGVsZW1lbnQuX192YWx1ZSA9ICcnO1xuXHRcdFx0Y3VycmVudFtrZXldID0gdmFsdWU7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoa2V5ID09PSAnY2xhc3MnKSB7XG5cdFx0XHR2YXIgaXNfaHRtbCA9IGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5cdFx0XHRzZXRfY2xhc3MoZWxlbWVudCwgaXNfaHRtbCwgdmFsdWUsIGNzc19oYXNoLCBwcmV2Py5bQ0xBU1NdLCBuZXh0W0NMQVNTXSk7XG5cdFx0XHRjdXJyZW50W2tleV0gPSB2YWx1ZTtcblx0XHRcdGN1cnJlbnRbQ0xBU1NdID0gbmV4dFtDTEFTU107XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG5cdFx0XHRzZXRfc3R5bGUoZWxlbWVudCwgdmFsdWUsIHByZXY/LltTVFlMRV0sIG5leHRbU1RZTEVdKTtcblx0XHRcdGN1cnJlbnRba2V5XSA9IHZhbHVlO1xuXHRcdFx0Y3VycmVudFtTVFlMRV0gPSBuZXh0W1NUWUxFXTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciBwcmV2X3ZhbHVlID0gY3VycmVudFtrZXldO1xuXG5cdFx0Ly8gU2tpcCBpZiB2YWx1ZSBpcyB1bmNoYW5nZWQsIHVubGVzcyBpdCdzIGB1bmRlZmluZWRgIGFuZCB0aGUgZWxlbWVudCBzdGlsbCBoYXMgdGhlIGF0dHJpYnV0ZVxuXHRcdGlmICh2YWx1ZSA9PT0gcHJldl92YWx1ZSAmJiAhKHZhbHVlID09PSB1bmRlZmluZWQgJiYgZWxlbWVudC5oYXNBdHRyaWJ1dGUoa2V5KSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGN1cnJlbnRba2V5XSA9IHZhbHVlO1xuXG5cdFx0dmFyIHByZWZpeCA9IGtleVswXSArIGtleVsxXTsgLy8gdGhpcyBpcyBmYXN0ZXIgdGhhbiBrZXkuc2xpY2UoMCwgMilcblx0XHRpZiAocHJlZml4ID09PSAnJCQnKSBjb250aW51ZTtcblxuXHRcdGlmIChwcmVmaXggPT09ICdvbicpIHtcblx0XHRcdC8qKiBAdHlwZSB7eyBjYXB0dXJlPzogdHJ1ZSB9fSAqL1xuXHRcdFx0Y29uc3Qgb3B0cyA9IHt9O1xuXHRcdFx0Y29uc3QgZXZlbnRfaGFuZGxlX2tleSA9ICckJCcgKyBrZXk7XG5cdFx0XHRsZXQgZXZlbnRfbmFtZSA9IGtleS5zbGljZSgyKTtcblx0XHRcdHZhciBpc19kZWxlZ2F0ZWQgPSBjYW5fZGVsZWdhdGVfZXZlbnQoZXZlbnRfbmFtZSk7XG5cblx0XHRcdGlmIChpc19jYXB0dXJlX2V2ZW50KGV2ZW50X25hbWUpKSB7XG5cdFx0XHRcdGV2ZW50X25hbWUgPSBldmVudF9uYW1lLnNsaWNlKDAsIC03KTtcblx0XHRcdFx0b3B0cy5jYXB0dXJlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc19kZWxlZ2F0ZWQgJiYgcHJldl92YWx1ZSkge1xuXHRcdFx0XHQvLyBMaXN0ZW5pbmcgdG8gc2FtZSBldmVudCBidXQgZGlmZmVyZW50IGhhbmRsZXIgLT4gb3VyIGhhbmRsZSBmdW5jdGlvbiBiZWxvdyB0YWtlcyBjYXJlIG9mIHRoaXNcblx0XHRcdFx0Ly8gSWYgd2Ugd2VyZSB0byByZW1vdmUgYW5kIGFkZCBsaXN0ZW5lcnMgaW4gdGhpcyBjYXNlLCBpdCBjb3VsZCBoYXBwZW4gdGhhdCB0aGUgZXZlbnQgaXMgXCJzd2FsbG93ZWRcIlxuXHRcdFx0XHQvLyAodGhlIGJyb3dzZXIgc2VlbXMgdG8gbm90IGtub3cgeWV0IHRoYXQgYSBuZXcgb25lIGV4aXN0cyBub3cpIGFuZCBkb2Vzbid0IHJlYWNoIHRoZSBoYW5kbGVyXG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzExOTAzXG5cdFx0XHRcdGlmICh2YWx1ZSAhPSBudWxsKSBjb250aW51ZTtcblxuXHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRfbmFtZSwgY3VycmVudFtldmVudF9oYW5kbGVfa2V5XSwgb3B0cyk7XG5cdFx0XHRcdGN1cnJlbnRbZXZlbnRfaGFuZGxlX2tleV0gPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNfZGVsZWdhdGVkKSB7XG5cdFx0XHRcdGRlbGVnYXRlZChldmVudF9uYW1lLCBlbGVtZW50LCB2YWx1ZSk7XG5cdFx0XHRcdGRlbGVnYXRlKFtldmVudF9uYW1lXSk7XG5cdFx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIEB0aGlzIHthbnl9XG5cdFx0XHRcdCAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0ZnVuY3Rpb24gaGFuZGxlKGV2dCkge1xuXHRcdFx0XHRcdGN1cnJlbnRba2V5XS5jYWxsKHRoaXMsIGV2dCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjdXJyZW50W2V2ZW50X2hhbmRsZV9rZXldID0gY3JlYXRlX2V2ZW50KGV2ZW50X25hbWUsIGVsZW1lbnQsIGhhbmRsZSwgb3B0cyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcblx0XHRcdC8vIGF2b2lkIHVzaW5nIHRoZSBzZXR0ZXJcblx0XHRcdHNldF9hdHRyaWJ1dGUoZWxlbWVudCwga2V5LCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChrZXkgPT09ICdhdXRvZm9jdXMnKSB7XG5cdFx0XHRhdXRvZm9jdXMoLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKGVsZW1lbnQpLCBCb29sZWFuKHZhbHVlKSk7XG5cdFx0fSBlbHNlIGlmICghaXNfY3VzdG9tX2VsZW1lbnQgJiYgKGtleSA9PT0gJ19fdmFsdWUnIHx8IChrZXkgPT09ICd2YWx1ZScgJiYgdmFsdWUgIT0gbnVsbCkpKSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlIFdlJ3JlIG5vdCBydW5uaW5nIHRoaXMgZm9yIGN1c3RvbSBlbGVtZW50cyBiZWNhdXNlIF9fdmFsdWUgaXMgYWN0dWFsbHlcblx0XHRcdC8vIGhvdyBMaXQgc3RvcmVzIHRoZSBjdXJyZW50IHZhbHVlIG9uIHRoZSBlbGVtZW50LCBhbmQgbWVzc2luZyB3aXRoIHRoYXQgd291bGQgYnJlYWsgdGhpbmdzLlxuXHRcdFx0ZWxlbWVudC52YWx1ZSA9IGVsZW1lbnQuX192YWx1ZSA9IHZhbHVlO1xuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnc2VsZWN0ZWQnICYmIGlzX29wdGlvbl9lbGVtZW50KSB7XG5cdFx0XHRzZXRfc2VsZWN0ZWQoLyoqIEB0eXBlIHtIVE1MT3B0aW9uRWxlbWVudH0gKi8gKGVsZW1lbnQpLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBuYW1lID0ga2V5O1xuXHRcdFx0aWYgKCFwcmVzZXJ2ZV9hdHRyaWJ1dGVfY2FzZSkge1xuXHRcdFx0XHRuYW1lID0gbm9ybWFsaXplX2F0dHJpYnV0ZShuYW1lKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGlzX2RlZmF1bHQgPSBuYW1lID09PSAnZGVmYXVsdFZhbHVlJyB8fCBuYW1lID09PSAnZGVmYXVsdENoZWNrZWQnO1xuXG5cdFx0XHRpZiAodmFsdWUgPT0gbnVsbCAmJiAhaXNfY3VzdG9tX2VsZW1lbnQgJiYgIWlzX2RlZmF1bHQpIHtcblx0XHRcdFx0YXR0cmlidXRlc1trZXldID0gbnVsbDtcblxuXHRcdFx0XHRpZiAobmFtZSA9PT0gJ3ZhbHVlJyB8fCBuYW1lID09PSAnY2hlY2tlZCcpIHtcblx0XHRcdFx0XHQvLyByZW1vdmluZyB2YWx1ZS9jaGVja2VkIGFsc28gcmVtb3ZlcyBkZWZhdWx0VmFsdWUvZGVmYXVsdENoZWNrZWQg4oCUIHByZXNlcnZlXG5cdFx0XHRcdFx0bGV0IGlucHV0ID0gLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqLyAoZWxlbWVudCk7XG5cdFx0XHRcdFx0Y29uc3QgdXNlX2RlZmF1bHQgPSBwcmV2ID09PSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0aWYgKG5hbWUgPT09ICd2YWx1ZScpIHtcblx0XHRcdFx0XHRcdGxldCBwcmV2aW91cyA9IGlucHV0LmRlZmF1bHRWYWx1ZTtcblx0XHRcdFx0XHRcdGlucHV0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHRcdFx0XHRcdGlucHV0LmRlZmF1bHRWYWx1ZSA9IHByZXZpb3VzO1xuXHRcdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBpbnB1dC5fX3ZhbHVlID0gdXNlX2RlZmF1bHQgPyBwcmV2aW91cyA6IG51bGw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxldCBwcmV2aW91cyA9IGlucHV0LmRlZmF1bHRDaGVja2VkO1xuXHRcdFx0XHRcdFx0aW5wdXQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdFx0XHRcdFx0aW5wdXQuZGVmYXVsdENoZWNrZWQgPSBwcmV2aW91cztcblx0XHRcdFx0XHRcdGlucHV0LmNoZWNrZWQgPSB1c2VfZGVmYXVsdCA/IHByZXZpb3VzIDogZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdGlzX2RlZmF1bHQgfHxcblx0XHRcdFx0KHNldHRlcnMuaW5jbHVkZXMobmFtZSkgJiYgKGlzX2N1c3RvbV9lbGVtZW50IHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpKVxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0ZWxlbWVudFtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHQvLyByZW1vdmUgaXQgZnJvbSBhdHRyaWJ1dGVzJ3MgY2FjaGVcblx0XHRcdFx0aWYgKG5hbWUgaW4gYXR0cmlidXRlcykgYXR0cmlidXRlc1tuYW1lXSA9IFVOSU5JVElBTElaRUQ7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRzZXRfYXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlLCBza2lwX3dhcm5pbmcpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChpc19oeWRyYXRpbmdfY3VzdG9tX2VsZW1lbnQpIHtcblx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50ICYgRWxlbWVudENTU0lubGluZVN0eWxlfSBlbGVtZW50XG4gKiBAcGFyYW0geyguLi5leHByZXNzaW9uczogYW55KSA9PiBSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+fSBmblxuICogQHBhcmFtIHtBcnJheTwoKSA9PiBhbnk+fSBzeW5jXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IFByb21pc2U8YW55Pj59IGFzeW5jXG4gKiBAcGFyYW0ge0Jsb2NrZXJbXX0gYmxvY2tlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY3NzX2hhc2hdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzaG91bGRfcmVtb3ZlX2RlZmF1bHRzXVxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcF93YXJuaW5nXVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlX2VmZmVjdChcblx0ZWxlbWVudCxcblx0Zm4sXG5cdHN5bmMgPSBbXSxcblx0YXN5bmMgPSBbXSxcblx0YmxvY2tlcnMgPSBbXSxcblx0Y3NzX2hhc2gsXG5cdHNob3VsZF9yZW1vdmVfZGVmYXVsdHMgPSBmYWxzZSxcblx0c2tpcF93YXJuaW5nID0gZmFsc2Vcbikge1xuXHRmbGF0dGVuKGJsb2NrZXJzLCBzeW5jLCBhc3luYywgKHZhbHVlcykgPT4ge1xuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55PiB8IHVuZGVmaW5lZH0gKi9cblx0XHR2YXIgcHJldiA9IHVuZGVmaW5lZDtcblxuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN5bWJvbCwgRWZmZWN0Pn0gKi9cblx0XHR2YXIgZWZmZWN0cyA9IHt9O1xuXG5cdFx0dmFyIGlzX3NlbGVjdCA9IGVsZW1lbnQubm9kZU5hbWUgPT09IFNFTEVDVF9UQUc7XG5cdFx0dmFyIGluaXRlZCA9IGZhbHNlO1xuXG5cdFx0bWFuYWdlZCgoKSA9PiB7XG5cdFx0XHR2YXIgbmV4dCA9IGZuKC4uLnZhbHVlcy5tYXAoZ2V0KSk7XG5cdFx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT59ICovXG5cdFx0XHR2YXIgY3VycmVudCA9IHNldF9hdHRyaWJ1dGVzKFxuXHRcdFx0XHRlbGVtZW50LFxuXHRcdFx0XHRwcmV2LFxuXHRcdFx0XHRuZXh0LFxuXHRcdFx0XHRjc3NfaGFzaCxcblx0XHRcdFx0c2hvdWxkX3JlbW92ZV9kZWZhdWx0cyxcblx0XHRcdFx0c2tpcF93YXJuaW5nXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoaW5pdGVkICYmIGlzX3NlbGVjdCAmJiAndmFsdWUnIGluIG5leHQpIHtcblx0XHRcdFx0c2VsZWN0X29wdGlvbigvKiogQHR5cGUge0hUTUxTZWxlY3RFbGVtZW50fSAqLyAoZWxlbWVudCksIG5leHQudmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBzeW1ib2wgb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlZmZlY3RzKSkge1xuXHRcdFx0XHRpZiAoIW5leHRbc3ltYm9sXSkgZGVzdHJveV9lZmZlY3QoZWZmZWN0c1tzeW1ib2xdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgc3ltYm9sIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMobmV4dCkpIHtcblx0XHRcdFx0dmFyIG4gPSBuZXh0W3N5bWJvbF07XG5cblx0XHRcdFx0aWYgKHN5bWJvbC5kZXNjcmlwdGlvbiA9PT0gQVRUQUNITUVOVF9LRVkgJiYgKCFwcmV2IHx8IG4gIT09IHByZXZbc3ltYm9sXSkpIHtcblx0XHRcdFx0XHRpZiAoZWZmZWN0c1tzeW1ib2xdKSBkZXN0cm95X2VmZmVjdChlZmZlY3RzW3N5bWJvbF0pO1xuXHRcdFx0XHRcdGVmZmVjdHNbc3ltYm9sXSA9IGJyYW5jaCgoKSA9PiBhdHRhY2goZWxlbWVudCwgKCkgPT4gbikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3VycmVudFtzeW1ib2xdID0gbjtcblx0XHRcdH1cblxuXHRcdFx0cHJldiA9IGN1cnJlbnQ7XG5cdFx0fSk7XG5cblx0XHRpZiAoaXNfc2VsZWN0KSB7XG5cdFx0XHR2YXIgc2VsZWN0ID0gLyoqIEB0eXBlIHtIVE1MU2VsZWN0RWxlbWVudH0gKi8gKGVsZW1lbnQpO1xuXG5cdFx0XHRlZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHRzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+fSAqLyAocHJldikudmFsdWUsIHRydWUpO1xuXHRcdFx0XHRpbml0X3NlbGVjdChzZWxlY3QpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aW5pdGVkID0gdHJ1ZTtcblx0fSk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRfYXR0cmlidXRlcyhlbGVtZW50KSB7XG5cdHJldHVybiAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+fSAqKi8gKFxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50Ll9fYXR0cmlidXRlcyA/Pz0ge1xuXHRcdFx0W0lTX0NVU1RPTV9FTEVNRU5UXTogZWxlbWVudC5ub2RlTmFtZS5pbmNsdWRlcygnLScpLFxuXHRcdFx0W0lTX0hUTUxdOiBlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gTkFNRVNQQUNFX0hUTUxcblx0XHR9XG5cdCk7XG59XG5cbi8qKiBAdHlwZSB7TWFwPHN0cmluZywgc3RyaW5nW10+fSAqL1xudmFyIHNldHRlcnNfY2FjaGUgPSBuZXcgTWFwKCk7XG5cbi8qKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgKi9cbmZ1bmN0aW9uIGdldF9zZXR0ZXJzKGVsZW1lbnQpIHtcblx0dmFyIGNhY2hlX2tleSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpcycpIHx8IGVsZW1lbnQubm9kZU5hbWU7XG5cdHZhciBzZXR0ZXJzID0gc2V0dGVyc19jYWNoZS5nZXQoY2FjaGVfa2V5KTtcblx0aWYgKHNldHRlcnMpIHJldHVybiBzZXR0ZXJzO1xuXHRzZXR0ZXJzX2NhY2hlLnNldChjYWNoZV9rZXksIChzZXR0ZXJzID0gW10pKTtcblxuXHR2YXIgZGVzY3JpcHRvcnM7XG5cdHZhciBwcm90byA9IGVsZW1lbnQ7IC8vIEluIHRoZSBjYXNlIG9mIGN1c3RvbSBlbGVtZW50cyB0aGVyZSBtaWdodCBiZSBzZXR0ZXJzIG9uIHRoZSBpbnN0YW5jZVxuXHR2YXIgZWxlbWVudF9wcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xuXG5cdC8vIFN0b3AgYXQgRWxlbWVudCwgZnJvbSB0aGVyZSBvbiB0aGVyZSdzIG9ubHkgdW5uZWNlc3Nhcnkgc2V0dGVycyB3ZSdyZSBub3QgaW50ZXJlc3RlZCBpblxuXHQvLyBEbyBub3QgdXNlIGNvbnRydWN0b3IubmFtZSBoZXJlIGFzIHRoYXQncyB1bnJlbGlhYmxlIGluIHNvbWUgYnJvd3NlciBlbnZpcm9ubWVudHNcblx0d2hpbGUgKGVsZW1lbnRfcHJvdG8gIT09IHByb3RvKSB7XG5cdFx0ZGVzY3JpcHRvcnMgPSBnZXRfZGVzY3JpcHRvcnMocHJvdG8pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGRlc2NyaXB0b3JzKSB7XG5cdFx0XHRpZiAoZGVzY3JpcHRvcnNba2V5XS5zZXQpIHtcblx0XHRcdFx0c2V0dGVycy5wdXNoKGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cHJvdG8gPSBnZXRfcHJvdG90eXBlX29mKHByb3RvKTtcblx0fVxuXG5cdHJldHVybiBzZXR0ZXJzO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gY2hlY2tfc3JjX2luX2Rldl9oeWRyYXRpb24oZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xuXHRpZiAoIURFVikgcmV0dXJuO1xuXHRpZiAoYXR0cmlidXRlID09PSAnc3Jjc2V0JyAmJiBzcmNzZXRfdXJsX2VxdWFsKGVsZW1lbnQsIHZhbHVlKSkgcmV0dXJuO1xuXHRpZiAoc3JjX3VybF9lcXVhbChlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpID8/ICcnLCB2YWx1ZSkpIHJldHVybjtcblxuXHR3Lmh5ZHJhdGlvbl9hdHRyaWJ1dGVfY2hhbmdlZChcblx0XHRhdHRyaWJ1dGUsXG5cdFx0ZWxlbWVudC5vdXRlckhUTUwucmVwbGFjZShlbGVtZW50LmlubmVySFRNTCwgZWxlbWVudC5pbm5lckhUTUwgJiYgJy4uLicpLFxuXHRcdFN0cmluZyh2YWx1ZSlcblx0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudF9zcmNcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzcmNfdXJsX2VxdWFsKGVsZW1lbnRfc3JjLCB1cmwpIHtcblx0aWYgKGVsZW1lbnRfc3JjID09PSB1cmwpIHJldHVybiB0cnVlO1xuXHRyZXR1cm4gbmV3IFVSTChlbGVtZW50X3NyYywgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZiA9PT0gbmV3IFVSTCh1cmwsIGRvY3VtZW50LmJhc2VVUkkpLmhyZWY7XG59XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gc3Jjc2V0ICovXG5mdW5jdGlvbiBzcGxpdF9zcmNzZXQoc3Jjc2V0KSB7XG5cdHJldHVybiBzcmNzZXQuc3BsaXQoJywnKS5tYXAoKHNyYykgPT4gc3JjLnRyaW0oKS5zcGxpdCgnICcpLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MU291cmNlRWxlbWVudCB8IEhUTUxJbWFnZUVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNzZXRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzcmNzZXRfdXJsX2VxdWFsKGVsZW1lbnQsIHNyY3NldCkge1xuXHR2YXIgZWxlbWVudF91cmxzID0gc3BsaXRfc3Jjc2V0KGVsZW1lbnQuc3Jjc2V0KTtcblx0dmFyIHVybHMgPSBzcGxpdF9zcmNzZXQoc3Jjc2V0KTtcblxuXHRyZXR1cm4gKFxuXHRcdHVybHMubGVuZ3RoID09PSBlbGVtZW50X3VybHMubGVuZ3RoICYmXG5cdFx0dXJscy5ldmVyeShcblx0XHRcdChbdXJsLCB3aWR0aF0sIGkpID0+XG5cdFx0XHRcdHdpZHRoID09PSBlbGVtZW50X3VybHNbaV1bMV0gJiZcblx0XHRcdFx0Ly8gV2UgbmVlZCB0byB0ZXN0IGJvdGggd2F5cyBiZWNhdXNlIFZpdGUgd2lsbCBjcmVhdGUgYW4gYSBmdWxsIFVSTCB3aXRoXG5cdFx0XHRcdC8vIGBuZXcgVVJMKGFzc2V0LCBpbXBvcnQubWV0YS51cmwpLmhyZWZgIGZvciB0aGUgY2xpZW50IHdoZW4gYGJhc2U6ICcuLydgLCBhbmQgdGhlXG5cdFx0XHRcdC8vIHJlbGF0aXZlIFVSTHMgaW5zaWRlIHNyY3NldCBhcmUgbm90IGF1dG9tYXRpY2FsbHkgcmVzb2x2ZWQgdG8gYWJzb2x1dGUgVVJMcyBieVxuXHRcdFx0XHQvLyBicm93c2VycyAoaW4gY29udHJhc3QgdG8gaW1nLnNyYykuIFRoaXMgbWVhbnMgYm90aCBTU1IgYW5kIERPTSBjb2RlIGNvdWxkXG5cdFx0XHRcdC8vIGNvbnRhaW4gcmVsYXRpdmUgb3IgYWJzb2x1dGUgVVJMcy5cblx0XHRcdFx0KHNyY191cmxfZXF1YWwoZWxlbWVudF91cmxzW2ldWzBdLCB1cmwpIHx8IHNyY191cmxfZXF1YWwodXJsLCBlbGVtZW50X3VybHNbaV1bMF0pKVxuXHRcdClcblx0KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyByZW5kZXJfZWZmZWN0LCB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50IH0gZnJvbSAnLi9zaGFyZWQuanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi8uLi8uLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgaXMgfSBmcm9tICcuLi8uLi8uLi9wcm94eS5qcyc7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vLi4vdGFzay5qcyc7XG5pbXBvcnQgeyBoeWRyYXRpbmcgfSBmcm9tICcuLi8uLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgdGljaywgdW50cmFjayB9IGZyb20gJy4uLy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgaXNfcnVuZXMgfSBmcm9tICcuLi8uLi8uLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IGN1cnJlbnRfYmF0Y2gsIHByZXZpb3VzX2JhdGNoIH0gZnJvbSAnLi4vLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dFxuICogQHBhcmFtIHsoKSA9PiB1bmtub3dufSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duKSA9PiB2b2lkfSBzZXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF92YWx1ZShpbnB1dCwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0dmFyIGJhdGNoZXMgPSBuZXcgV2Vha1NldCgpO1xuXG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoaW5wdXQsICdpbnB1dCcsIGFzeW5jIChpc19yZXNldCkgPT4ge1xuXHRcdGlmIChERVYgJiYgaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuXHRcdFx0Ly8gVE9ETyBzaG91bGQgdGhpcyBoYXBwZW4gaW4gcHJvZCB0b28/XG5cdFx0XHRlLmJpbmRfaW52YWxpZF9jaGVja2JveF92YWx1ZSgpO1xuXHRcdH1cblxuXHRcdC8qKiBAdHlwZSB7YW55fSAqL1xuXHRcdHZhciB2YWx1ZSA9IGlzX3Jlc2V0ID8gaW5wdXQuZGVmYXVsdFZhbHVlIDogaW5wdXQudmFsdWU7XG5cdFx0dmFsdWUgPSBpc19udW1iZXJsaWtlX2lucHV0KGlucHV0KSA/IHRvX251bWJlcih2YWx1ZSkgOiB2YWx1ZTtcblx0XHRzZXQodmFsdWUpO1xuXG5cdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRcdGJhdGNoZXMuYWRkKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdH1cblxuXHRcdC8vIEJlY2F1c2UgYHsjZWFjaCAuLi59YCBibG9ja3Mgd29yayBieSB1cGRhdGluZyBzb3VyY2VzIGluc2lkZSB0aGUgZmx1c2gsXG5cdFx0Ly8gd2UgbmVlZCB0byB3YWl0IGEgdGljayBiZWZvcmUgY2hlY2tpbmcgdG8gc2VlIGlmIHdlIHNob3VsZCBmb3JjaWJseVxuXHRcdC8vIHVwZGF0ZSB0aGUgaW5wdXQgYW5kIHJlc2V0IHRoZSBzZWxlY3Rpb24gc3RhdGVcblx0XHRhd2FpdCB0aWNrKCk7XG5cblx0XHQvLyBSZXNwZWN0IGFueSB2YWxpZGF0aW9uIGluIGFjY2Vzc29yc1xuXHRcdGlmICh2YWx1ZSAhPT0gKHZhbHVlID0gZ2V0KCkpKSB7XG5cdFx0XHR2YXIgc3RhcnQgPSBpbnB1dC5zZWxlY3Rpb25TdGFydDtcblx0XHRcdHZhciBlbmQgPSBpbnB1dC5zZWxlY3Rpb25FbmQ7XG5cdFx0XHR2YXIgbGVuZ3RoID0gaW5wdXQudmFsdWUubGVuZ3RoO1xuXG5cdFx0XHQvLyB0aGUgdmFsdWUgaXMgY29lcmNlZCBvbiBhc3NpZ25tZW50XG5cdFx0XHRpbnB1dC52YWx1ZSA9IHZhbHVlID8/ICcnO1xuXG5cdFx0XHQvLyBSZXN0b3JlIHNlbGVjdGlvblxuXHRcdFx0aWYgKGVuZCAhPT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgbmV3X2xlbmd0aCA9IGlucHV0LnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0Ly8gSWYgY3Vyc29yIHdhcyBhdCBlbmQgYW5kIG5ldyBpbnB1dCBpcyBsb25nZXIsIG1vdmUgY3Vyc29yIHRvIG5ldyBlbmRcblx0XHRcdFx0aWYgKHN0YXJ0ID09PSBlbmQgJiYgZW5kID09PSBsZW5ndGggJiYgbmV3X2xlbmd0aCA+IGxlbmd0aCkge1xuXHRcdFx0XHRcdGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gbmV3X2xlbmd0aDtcblx0XHRcdFx0XHRpbnB1dC5zZWxlY3Rpb25FbmQgPSBuZXdfbGVuZ3RoO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdFx0aW5wdXQuc2VsZWN0aW9uRW5kID0gTWF0aC5taW4oZW5kLCBuZXdfbGVuZ3RoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0aWYgKFxuXHRcdC8vIElmIHdlIGFyZSBoeWRyYXRpbmcgYW5kIHRoZSB2YWx1ZSBoYXMgc2luY2UgY2hhbmdlZCxcblx0XHQvLyB0aGVuIHVzZSB0aGUgdXBkYXRlZCB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbnN0ZWFkLlxuXHRcdChoeWRyYXRpbmcgJiYgaW5wdXQuZGVmYXVsdFZhbHVlICE9PSBpbnB1dC52YWx1ZSkgfHxcblx0XHQvLyBJZiBkZWZhdWx0VmFsdWUgaXMgc2V0LCB0aGVuIHZhbHVlID09IGRlZmF1bHRWYWx1ZVxuXHRcdC8vIFRPRE8gU3ZlbHRlIDY6IHJlbW92ZSBpbnB1dC52YWx1ZSBjaGVjayBhbmQgc2V0IHRvIGVtcHR5IHN0cmluZz9cblx0XHQodW50cmFjayhnZXQpID09IG51bGwgJiYgaW5wdXQudmFsdWUpXG5cdCkge1xuXHRcdHNldChpc19udW1iZXJsaWtlX2lucHV0KGlucHV0KSA/IHRvX251bWJlcihpbnB1dC52YWx1ZSkgOiBpbnB1dC52YWx1ZSk7XG5cblx0XHRpZiAoY3VycmVudF9iYXRjaCAhPT0gbnVsbCkge1xuXHRcdFx0YmF0Y2hlcy5hZGQoY3VycmVudF9iYXRjaCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0aWYgKERFViAmJiBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG5cdFx0XHQvLyBUT0RPIHNob3VsZCB0aGlzIGhhcHBlbiBpbiBwcm9kIHRvbz9cblx0XHRcdGUuYmluZF9pbnZhbGlkX2NoZWNrYm94X3ZhbHVlKCk7XG5cdFx0fVxuXG5cdFx0dmFyIHZhbHVlID0gZ2V0KCk7XG5cblx0XHRpZiAoaW5wdXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHRcdC8vIHdlIG5lZWQgYm90aCwgYmVjYXVzZSBpbiBub24tYXN5bmMgbW9kZSwgcmVuZGVyIGVmZmVjdHMgcnVuIGJlZm9yZSBwcmV2aW91c19iYXRjaCBpcyBzZXRcblx0XHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChwcmV2aW91c19iYXRjaCA/PyBjdXJyZW50X2JhdGNoKTtcblxuXHRcdFx0Ly8gTmV2ZXIgcmV3cml0ZSB0aGUgY29udGVudHMgb2YgYSBmb2N1c2VkIGlucHV0LiBXZSBjYW4gZ2V0IGhlcmUgaWYsIGZvciBleGFtcGxlLFxuXHRcdFx0Ly8gYW4gdXBkYXRlIGlzIGRlZmVycmVkIGJlY2F1c2Ugb2YgYXN5bmMgd29yayBkZXBlbmRpbmcgb24gdGhlIGlucHV0OlxuXHRcdFx0Ly9cblx0XHRcdC8vIDxpbnB1dCBiaW5kOnZhbHVlPXtxdWVyeX0+XG5cdFx0XHQvLyA8cD57YXdhaXQgZmluZChxdWVyeSl9PC9wPlxuXHRcdFx0aWYgKGJhdGNoZXMuaGFzKGJhdGNoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzX251bWJlcmxpa2VfaW5wdXQoaW5wdXQpICYmIHZhbHVlID09PSB0b19udW1iZXIoaW5wdXQudmFsdWUpKSB7XG5cdFx0XHQvLyBoYW5kbGVzIDAgdnMgMDAgY2FzZSAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzk5NTkpXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGlucHV0LnR5cGUgPT09ICdkYXRlJyAmJiAhdmFsdWUgJiYgIWlucHV0LnZhbHVlKSB7XG5cdFx0XHQvLyBIYW5kbGVzIHRoZSBjYXNlIHdoZXJlIGEgdGVtcG9yYXJpbHkgaW52YWxpZCBkYXRlIGlzIHNldCAod2hpbGUgdHlwaW5nLCBmb3IgZXhhbXBsZSB3aXRoIGEgbGVhZGluZyAwIGZvciB0aGUgZGF5KVxuXHRcdFx0Ly8gYW5kIHByZXZlbnRzIHRoaXMgc3RhdGUgZnJvbSBjbGVhcmluZyB0aGUgb3RoZXIgcGFydHMgb2YgdGhlIGRhdGUgaW5wdXQgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy83ODk3KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGRvbid0IHNldCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGlmIGl0J3MgdGhlIHNhbWUgdG8gYWxsb3dcblx0XHQvLyBtaW5sZW5ndGggdG8gd29yayBwcm9wZXJseVxuXHRcdGlmICh2YWx1ZSAhPT0gaW5wdXQudmFsdWUpIHtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgdGhlIHZhbHVlIGlzIGNvZXJjZWQgb24gYXNzaWdubWVudFxuXHRcdFx0aW5wdXQudmFsdWUgPSB2YWx1ZSA/PyAnJztcblx0XHR9XG5cdH0pO1xufVxuXG4vKiogQHR5cGUge1NldDxIVE1MSW5wdXRFbGVtZW50W10+fSAqL1xuY29uc3QgcGVuZGluZyA9IG5ldyBTZXQoKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnRbXX0gaW5wdXRzXG4gKiBAcGFyYW0ge251bGwgfCBbbnVtYmVyXX0gZ3JvdXBfaW5kZXhcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEBwYXJhbSB7KCkgPT4gdW5rbm93bn0gZ2V0XG4gKiBAcGFyYW0geyh2YWx1ZTogdW5rbm93bikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfZ3JvdXAoaW5wdXRzLCBncm91cF9pbmRleCwgaW5wdXQsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdHZhciBpc19jaGVja2JveCA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xuXHR2YXIgYmluZGluZ19ncm91cCA9IGlucHV0cztcblxuXHQvLyBuZWVkcyB0byBiZSBsZXQgb3IgcmVsYXRlZCBjb2RlIGlzbid0IHRyZWVzaGFrZW4gb3V0IGlmIGl0J3MgYWx3YXlzIGZhbHNlXG5cdGxldCBoeWRyYXRpb25fbWlzbWF0Y2ggPSBmYWxzZTtcblxuXHRpZiAoZ3JvdXBfaW5kZXggIT09IG51bGwpIHtcblx0XHRmb3IgKHZhciBpbmRleCBvZiBncm91cF9pbmRleCkge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0YmluZGluZ19ncm91cCA9IGJpbmRpbmdfZ3JvdXBbaW5kZXhdID8/PSBbXTtcblx0XHR9XG5cdH1cblxuXHRiaW5kaW5nX2dyb3VwLnB1c2goaW5wdXQpO1xuXG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoXG5cdFx0aW5wdXQsXG5cdFx0J2NoYW5nZScsXG5cdFx0KCkgPT4ge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0dmFyIHZhbHVlID0gaW5wdXQuX192YWx1ZTtcblxuXHRcdFx0aWYgKGlzX2NoZWNrYm94KSB7XG5cdFx0XHRcdHZhbHVlID0gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoYmluZGluZ19ncm91cCwgdmFsdWUsIGlucHV0LmNoZWNrZWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRzZXQodmFsdWUpO1xuXHRcdH0sXG5cdFx0Ly8gVE9ETyBiZXR0ZXIgZGVmYXVsdCB2YWx1ZSBoYW5kbGluZ1xuXHRcdCgpID0+IHNldChpc19jaGVja2JveCA/IFtdIDogbnVsbClcblx0KTtcblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgdmFsdWUgPSBnZXQoKTtcblxuXHRcdC8vIElmIHdlIGFyZSBoeWRyYXRpbmcgYW5kIHRoZSB2YWx1ZSBoYXMgc2luY2UgY2hhbmdlZCwgdGhlbiB1c2UgdGhlIHVwZGF0ZSB2YWx1ZVxuXHRcdC8vIGZyb20gdGhlIGlucHV0IGluc3RlYWQuXG5cdFx0aWYgKGh5ZHJhdGluZyAmJiBpbnB1dC5kZWZhdWx0Q2hlY2tlZCAhPT0gaW5wdXQuY2hlY2tlZCkge1xuXHRcdFx0aHlkcmF0aW9uX21pc21hdGNoID0gdHJ1ZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoaXNfY2hlY2tib3gpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUgfHwgW107XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRpbnB1dC5jaGVja2VkID0gdmFsdWUuaW5jbHVkZXMoaW5wdXQuX192YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGlucHV0LmNoZWNrZWQgPSBpcyhpbnB1dC5fX3ZhbHVlLCB2YWx1ZSk7XG5cdFx0fVxuXHR9KTtcblxuXHR0ZWFyZG93bigoKSA9PiB7XG5cdFx0dmFyIGluZGV4ID0gYmluZGluZ19ncm91cC5pbmRleE9mKGlucHV0KTtcblxuXHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdGJpbmRpbmdfZ3JvdXAuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmICghcGVuZGluZy5oYXMoYmluZGluZ19ncm91cCkpIHtcblx0XHRwZW5kaW5nLmFkZChiaW5kaW5nX2dyb3VwKTtcblxuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0Ly8gbmVjZXNzYXJ5IHRvIG1haW50YWluIGJpbmRpbmcgZ3JvdXAgb3JkZXIgaW4gYWxsIGluc2VydGlvbiBzY2VuYXJpb3Ncblx0XHRcdGJpbmRpbmdfZ3JvdXAuc29ydCgoYSwgYikgPT4gKGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYikgPT09IDQgPyAtMSA6IDEpKTtcblx0XHRcdHBlbmRpbmcuZGVsZXRlKGJpbmRpbmdfZ3JvdXApO1xuXHRcdH0pO1xuXHR9XG5cblx0cXVldWVfbWljcm9fdGFzaygoKSA9PiB7XG5cdFx0aWYgKGh5ZHJhdGlvbl9taXNtYXRjaCkge1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHRpZiAoaXNfY2hlY2tib3gpIHtcblx0XHRcdFx0dmFsdWUgPSBnZXRfYmluZGluZ19ncm91cF92YWx1ZShiaW5kaW5nX2dyb3VwLCB2YWx1ZSwgaW5wdXQuY2hlY2tlZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgaHlkcmF0aW9uX2lucHV0ID0gYmluZGluZ19ncm91cC5maW5kKChpbnB1dCkgPT4gaW5wdXQuY2hlY2tlZCk7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0dmFsdWUgPSBoeWRyYXRpb25faW5wdXQ/Ll9fdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHNldCh2YWx1ZSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKiBAcGFyYW0geygpID0+IHVua25vd259IGdldFxuICogQHBhcmFtIHsodmFsdWU6IHVua25vd24pID0+IHZvaWR9IHNldFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX2NoZWNrZWQoaW5wdXQsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoaW5wdXQsICdjaGFuZ2UnLCAoaXNfcmVzZXQpID0+IHtcblx0XHR2YXIgdmFsdWUgPSBpc19yZXNldCA/IGlucHV0LmRlZmF1bHRDaGVja2VkIDogaW5wdXQuY2hlY2tlZDtcblx0XHRzZXQodmFsdWUpO1xuXHR9KTtcblxuXHRpZiAoXG5cdFx0Ly8gSWYgd2UgYXJlIGh5ZHJhdGluZyBhbmQgdGhlIHZhbHVlIGhhcyBzaW5jZSBjaGFuZ2VkLFxuXHRcdC8vIHRoZW4gdXNlIHRoZSB1cGRhdGUgdmFsdWUgZnJvbSB0aGUgaW5wdXQgaW5zdGVhZC5cblx0XHQoaHlkcmF0aW5nICYmIGlucHV0LmRlZmF1bHRDaGVja2VkICE9PSBpbnB1dC5jaGVja2VkKSB8fFxuXHRcdC8vIElmIGRlZmF1bHRDaGVja2VkIGlzIHNldCwgdGhlbiBjaGVja2VkID09IGRlZmF1bHRDaGVja2VkXG5cdFx0dW50cmFjayhnZXQpID09IG51bGxcblx0KSB7XG5cdFx0c2V0KGlucHV0LmNoZWNrZWQpO1xuXHR9XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIHZhbHVlID0gZ2V0KCk7XG5cdFx0aW5wdXQuY2hlY2tlZCA9IEJvb2xlYW4odmFsdWUpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtBcnJheTxIVE1MSW5wdXRFbGVtZW50Pn0gZ3JvdXBcbiAqIEBwYXJhbSB7Vn0gX192YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkXG4gKiBAcmV0dXJucyB7VltdfVxuICovXG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuXHQvKiogQHR5cGUge1NldDxWPn0gKi9cblx0dmFyIHZhbHVlID0gbmV3IFNldCgpO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoZ3JvdXBbaV0uY2hlY2tlZCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0dmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGlmICghY2hlY2tlZCkge1xuXHRcdHZhbHVlLmRlbGV0ZShfX3ZhbHVlKTtcblx0fVxuXG5cdHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGlzX251bWJlcmxpa2VfaW5wdXQoaW5wdXQpIHtcblx0dmFyIHR5cGUgPSBpbnB1dC50eXBlO1xuXHRyZXR1cm4gdHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ3JhbmdlJztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gdG9fbnVtYmVyKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSA9PT0gJycgPyBudWxsIDogK3ZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEBwYXJhbSB7KCkgPT4gRmlsZUxpc3QgfCBudWxsfSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiBGaWxlTGlzdCB8IG51bGwpID0+IHZvaWR9IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9maWxlcyhpbnB1dCwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0bGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudChpbnB1dCwgJ2NoYW5nZScsICgpID0+IHtcblx0XHRzZXQoaW5wdXQuZmlsZXMpO1xuXHR9KTtcblxuXHRpZiAoXG5cdFx0Ly8gSWYgd2UgYXJlIGh5ZHJhdGluZyBhbmQgdGhlIHZhbHVlIGhhcyBzaW5jZSBjaGFuZ2VkLFxuXHRcdC8vIHRoZW4gdXNlIHRoZSB1cGRhdGVkIHZhbHVlIGZyb20gdGhlIGlucHV0IGluc3RlYWQuXG5cdFx0aHlkcmF0aW5nICYmXG5cdFx0aW5wdXQuZmlsZXNcblx0KSB7XG5cdFx0c2V0KGlucHV0LmZpbGVzKTtcblx0fVxuXG5cdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdGlucHV0LmZpbGVzID0gZ2V0KCk7XG5cdH0pO1xufVxuIiwiaW1wb3J0IHsgU1RBVEVfU1lNQk9MIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgZWZmZWN0LCByZW5kZXJfZWZmZWN0IH0gZnJvbSAnLi4vLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IHVudHJhY2sgfSBmcm9tICcuLi8uLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IHF1ZXVlX21pY3JvX3Rhc2sgfSBmcm9tICcuLi8uLi90YXNrLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gYm91bmRfdmFsdWVcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudF9vcl9jb21wb25lbnRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc19ib3VuZF90aGlzKGJvdW5kX3ZhbHVlLCBlbGVtZW50X29yX2NvbXBvbmVudCkge1xuXHRyZXR1cm4gKFxuXHRcdGJvdW5kX3ZhbHVlID09PSBlbGVtZW50X29yX2NvbXBvbmVudCB8fCBib3VuZF92YWx1ZT8uW1NUQVRFX1NZTUJPTF0gPT09IGVsZW1lbnRfb3JfY29tcG9uZW50XG5cdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IGVsZW1lbnRfb3JfY29tcG9uZW50XG4gKiBAcGFyYW0geyh2YWx1ZTogdW5rbm93biwgLi4ucGFydHM6IHVua25vd25bXSkgPT4gdm9pZH0gdXBkYXRlXG4gKiBAcGFyYW0geyguLi5wYXJ0czogdW5rbm93bltdKSA9PiB1bmtub3dufSBnZXRfdmFsdWVcbiAqIEBwYXJhbSB7KCkgPT4gdW5rbm93bltdfSBbZ2V0X3BhcnRzXSBTZXQgaWYgdGhlIHRoaXMgYmluZGluZyBpcyB1c2VkIGluc2lkZSBhbiBlYWNoIGJsb2NrLFxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5zIGFsbCB0aGUgcGFydHMgb2YgdGhlIGVhY2ggYmxvY2sgY29udGV4dCB0aGF0IGFyZSB1c2VkIGluIHRoZSBleHByZXNzaW9uXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfdGhpcyhlbGVtZW50X29yX2NvbXBvbmVudCA9IHt9LCB1cGRhdGUsIGdldF92YWx1ZSwgZ2V0X3BhcnRzKSB7XG5cdGVmZmVjdCgoKSA9PiB7XG5cdFx0LyoqIEB0eXBlIHt1bmtub3duW119ICovXG5cdFx0dmFyIG9sZF9wYXJ0cztcblxuXHRcdC8qKiBAdHlwZSB7dW5rbm93bltdfSAqL1xuXHRcdHZhciBwYXJ0cztcblxuXHRcdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0b2xkX3BhcnRzID0gcGFydHM7XG5cdFx0XHQvLyBXZSBvbmx5IHRyYWNrIGNoYW5nZXMgdG8gdGhlIHBhcnRzLCBub3QgdGhlIHZhbHVlIGl0c2VsZiB0byBhdm9pZCB1bm5lY2Vzc2FyeSByZXJ1bnMuXG5cdFx0XHRwYXJ0cyA9IGdldF9wYXJ0cz8uKCkgfHwgW107XG5cblx0XHRcdHVudHJhY2soKCkgPT4ge1xuXHRcdFx0XHRpZiAoZWxlbWVudF9vcl9jb21wb25lbnQgIT09IGdldF92YWx1ZSguLi5wYXJ0cykpIHtcblx0XHRcdFx0XHR1cGRhdGUoZWxlbWVudF9vcl9jb21wb25lbnQsIC4uLnBhcnRzKTtcblx0XHRcdFx0XHQvLyBJZiB0aGlzIGlzIGFuIGVmZmVjdCByZXJ1biAoY2F1c2U6IGVhY2ggYmxvY2sgY29udGV4dCBjaGFuZ2VzKSwgdGhlbiBudWxsaWZ5IHRoZSBiaW5kaW5nIGF0XG5cdFx0XHRcdFx0Ly8gdGhlIHByZXZpb3VzIHBvc2l0aW9uIGlmIGl0IGlzbid0IGFscmVhZHkgdGFrZW4gb3ZlciBieSBhIGRpZmZlcmVudCBlZmZlY3QuXG5cdFx0XHRcdFx0aWYgKG9sZF9wYXJ0cyAmJiBpc19ib3VuZF90aGlzKGdldF92YWx1ZSguLi5vbGRfcGFydHMpLCBlbGVtZW50X29yX2NvbXBvbmVudCkpIHtcblx0XHRcdFx0XHRcdHVwZGF0ZShudWxsLCAuLi5vbGRfcGFydHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0Ly8gV2UgY2Fubm90IHVzZSBlZmZlY3RzIGluIHRoZSB0ZWFyZG93biBwaGFzZSwgd2Ugd2UgdXNlIGEgbWljcm90YXNrIGluc3RlYWQuXG5cdFx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdFx0aWYgKHBhcnRzICYmIGlzX2JvdW5kX3RoaXMoZ2V0X3ZhbHVlKC4uLnBhcnRzKSwgZWxlbWVudF9vcl9jb21wb25lbnQpKSB7XG5cdFx0XHRcdFx0dXBkYXRlKG51bGwsIC4uLnBhcnRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblx0fSk7XG5cblx0cmV0dXJuIGVsZW1lbnRfb3JfY29tcG9uZW50O1xufVxuIiwiaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyB1c2VyX3ByZV9lZmZlY3QgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgb24gfSBmcm9tICcuLi9lbGVtZW50cy9ldmVudHMuanMnO1xuXG4vKipcbiAqIFN1YnN0aXR1dGUgZm9yIHRoZSBgdHJ1c3RlZGAgZXZlbnQgbW9kaWZpZXJcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0geyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSA9PiB2b2lkfSBmblxuICogQHJldHVybnMgeyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRydXN0ZWQoZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0dmFyIGV2ZW50ID0gLyoqIEB0eXBlIHtFdmVudH0gKi8gKGFyZ3NbMF0pO1xuXHRcdGlmIChldmVudC5pc1RydXN0ZWQpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGZuPy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogU3Vic3RpdHV0ZSBmb3IgdGhlIGBzZWxmYCBldmVudCBtb2RpZmllclxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7KGV2ZW50OiBFdmVudCwgLi4uYXJnczogQXJyYXk8dW5rbm93bj4pID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZihmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHR2YXIgZXZlbnQgPSAvKiogQHR5cGUge0V2ZW50fSAqLyAoYXJnc1swXSk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGZuPy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogU3Vic3RpdHV0ZSBmb3IgdGhlIGBzdG9wUHJvcGFnYXRpb25gIGV2ZW50IG1vZGlmaWVyXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiBBcnJheTx1bmtub3duPikgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0dmFyIGV2ZW50ID0gLyoqIEB0eXBlIHtFdmVudH0gKi8gKGFyZ3NbMF0pO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gZm4/LmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKipcbiAqIFN1YnN0aXR1dGUgZm9yIHRoZSBgb25jZWAgZXZlbnQgbW9kaWZpZXJcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0geyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSA9PiB2b2lkfSBmblxuICogQHJldHVybnMgeyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uY2UoZm4pIHtcblx0dmFyIHJhbiA9IGZhbHNlO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGlmIChyYW4pIHJldHVybjtcblx0XHRyYW4gPSB0cnVlO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBmbj8uYXBwbHkodGhpcywgYXJncyk7XG5cdH07XG59XG5cbi8qKlxuICogU3Vic3RpdHV0ZSBmb3IgdGhlIGBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25gIGV2ZW50IG1vZGlmaWVyXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiBBcnJheTx1bmtub3duPikgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0dmFyIGV2ZW50ID0gLyoqIEB0eXBlIHtFdmVudH0gKi8gKGFyZ3NbMF0pO1xuXHRcdGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gZm4/LmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKipcbiAqIFN1YnN0aXR1dGUgZm9yIHRoZSBgcHJldmVudERlZmF1bHRgIGV2ZW50IG1vZGlmaWVyXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiBBcnJheTx1bmtub3duPikgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHR2YXIgZXZlbnQgPSAvKiogQHR5cGUge0V2ZW50fSAqLyAoYXJnc1swXSk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmV0dXJuIGZuPy5hcHBseSh0aGlzLCBhcmdzKTtcblx0fTtcbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRlIGZvciB0aGUgYHBhc3NpdmVgIGV2ZW50IG1vZGlmaWVyLCBpbXBsZW1lbnRlZCBhcyBhbiBhY3Rpb25cbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge1tldmVudDogc3RyaW5nLCBoYW5kbGVyOiAoKSA9PiBFdmVudExpc3RlbmVyXX0gb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFzc2l2ZShub2RlLCBbZXZlbnQsIGhhbmRsZXJdKSB7XG5cdHVzZXJfcHJlX2VmZmVjdCgoKSA9PiB7XG5cdFx0cmV0dXJuIG9uKG5vZGUsIGV2ZW50LCBoYW5kbGVyKCkgPz8gbm9vcCwge1xuXHRcdFx0cGFzc2l2ZTogdHJ1ZVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRlIGZvciB0aGUgYG5vbnBhc3NpdmVgIGV2ZW50IG1vZGlmaWVyLCBpbXBsZW1lbnRlZCBhcyBhbiBhY3Rpb25cbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge1tldmVudDogc3RyaW5nLCBoYW5kbGVyOiAoKSA9PiBFdmVudExpc3RlbmVyXX0gb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ucGFzc2l2ZShub2RlLCBbZXZlbnQsIGhhbmRsZXJdKSB7XG5cdHVzZXJfcHJlX2VmZmVjdCgoKSA9PiB7XG5cdFx0cmV0dXJuIG9uKG5vZGUsIGV2ZW50LCBoYW5kbGVyKCkgPz8gbm9vcCwge1xuXHRcdFx0cGFzc2l2ZTogZmFsc2Vcblx0XHR9KTtcblx0fSk7XG59XG4iLCIvKiogQGltcG9ydCB7IENvbXBvbmVudENvbnRleHRMZWdhY3kgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgcnVuLCBydW5fYWxsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9jb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBkZXJpdmVkIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9kZXJpdmVkcy5qcyc7XG5pbXBvcnQgeyB1c2VyX3ByZV9lZmZlY3QsIHVzZXJfZWZmZWN0IH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGRlZXBfcmVhZF9zdGF0ZSwgZ2V0LCB1bnRyYWNrIH0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5cbi8qKlxuICogTGVnYWN5LW1vZGUgb25seTogQ2FsbCBgb25Nb3VudGAgY2FsbGJhY2tzIGFuZCBzZXQgdXAgYGJlZm9yZVVwZGF0ZWAvYGFmdGVyVXBkYXRlYCBlZmZlY3RzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbW11dGFibGVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGltbXV0YWJsZSA9IGZhbHNlKSB7XG5cdGNvbnN0IGNvbnRleHQgPSAvKiogQHR5cGUge0NvbXBvbmVudENvbnRleHRMZWdhY3l9ICovIChjb21wb25lbnRfY29udGV4dCk7XG5cblx0Y29uc3QgY2FsbGJhY2tzID0gY29udGV4dC5sLnU7XG5cdGlmICghY2FsbGJhY2tzKSByZXR1cm47XG5cblx0bGV0IHByb3BzID0gKCkgPT4gZGVlcF9yZWFkX3N0YXRlKGNvbnRleHQucyk7XG5cblx0aWYgKGltbXV0YWJsZSkge1xuXHRcdGxldCB2ZXJzaW9uID0gMDtcblx0XHRsZXQgcHJldiA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblxuXHRcdC8vIEluIGxlZ2FjeSBpbW11dGFibGUgbW9kZSwgYmVmb3JlL2FmdGVyVXBkYXRlIG9ubHkgZmlyZSBpZiB0aGUgb2JqZWN0IGlkZW50aXR5IG9mIGEgcHJvcCBjaGFuZ2VzXG5cdFx0Y29uc3QgZCA9IGRlcml2ZWQoKCkgPT4ge1xuXHRcdFx0bGV0IGNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdGNvbnN0IHByb3BzID0gY29udGV4dC5zO1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcHMpIHtcblx0XHRcdFx0aWYgKHByb3BzW2tleV0gIT09IHByZXZba2V5XSkge1xuXHRcdFx0XHRcdHByZXZba2V5XSA9IHByb3BzW2tleV07XG5cdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChjaGFuZ2VkKSB2ZXJzaW9uKys7XG5cdFx0XHRyZXR1cm4gdmVyc2lvbjtcblx0XHR9KTtcblxuXHRcdHByb3BzID0gKCkgPT4gZ2V0KGQpO1xuXHR9XG5cblx0Ly8gYmVmb3JlVXBkYXRlXG5cdGlmIChjYWxsYmFja3MuYi5sZW5ndGgpIHtcblx0XHR1c2VyX3ByZV9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0b2JzZXJ2ZV9hbGwoY29udGV4dCwgcHJvcHMpO1xuXHRcdFx0cnVuX2FsbChjYWxsYmFja3MuYik7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBvbk1vdW50IChtdXN0IHJ1biBiZWZvcmUgYWZ0ZXJVcGRhdGUpXG5cdHVzZXJfZWZmZWN0KCgpID0+IHtcblx0XHRjb25zdCBmbnMgPSB1bnRyYWNrKCgpID0+IGNhbGxiYWNrcy5tLm1hcChydW4pKTtcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0Zm9yIChjb25zdCBmbiBvZiBmbnMpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGZuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHQvLyBhZnRlclVwZGF0ZVxuXHRpZiAoY2FsbGJhY2tzLmEubGVuZ3RoKSB7XG5cdFx0dXNlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0b2JzZXJ2ZV9hbGwoY29udGV4dCwgcHJvcHMpO1xuXHRcdFx0cnVuX2FsbChjYWxsYmFja3MuYSk7XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBJbnZva2UgdGhlIGdldHRlciBvZiBhbGwgc2lnbmFscyBhc3NvY2lhdGVkIHdpdGggYSBjb21wb25lbnRcbiAqIHNvIHRoZXkgY2FuIGJlIHJlZ2lzdGVyZWQgdG8gdGhlIGVmZmVjdCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbi5cbiAqIEBwYXJhbSB7Q29tcG9uZW50Q29udGV4dExlZ2FjeX0gY29udGV4dFxuICogQHBhcmFtIHsoKCkgPT4gdm9pZCl9IHByb3BzXG4gKi9cbmZ1bmN0aW9uIG9ic2VydmVfYWxsKGNvbnRleHQsIHByb3BzKSB7XG5cdGlmIChjb250ZXh0Lmwucykge1xuXHRcdGZvciAoY29uc3Qgc2lnbmFsIG9mIGNvbnRleHQubC5zKSBnZXQoc2lnbmFsKTtcblx0fVxuXG5cdHByb3BzKCk7XG59XG4iLCIvKiogQGltcG9ydCB7IFN0b3JlUmVmZXJlbmNlc0NvbnRhaW5lciB9IGZyb20gJyNjbGllbnQnICovXG4vKiogQGltcG9ydCB7IFN0b3JlIH0gZnJvbSAnI3NoYXJlZCcgKi9cbmltcG9ydCB7IHN1YnNjcmliZV90b19zdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3V0aWxzLmpzJztcbmltcG9ydCB7IGdldCBhcyBnZXRfc3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zaGFyZWQvaW5kZXguanMnO1xuaW1wb3J0IHsgZGVmaW5lX3Byb3BlcnR5LCBub29wIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgdGVhcmRvd24gfSBmcm9tICcuL2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgbXV0YWJsZV9zb3VyY2UsIHNldCB9IGZyb20gJy4vc291cmNlcy5qcyc7XG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvcCBjdXJyZW50bHkgYmVpbmcgcmVhZCBpcyBhIHN0b3JlIGJpbmRpbmcsIGFzIGluXG4gKiBgPENoaWxkIGJpbmQ6eD17JHl9IC8+YC4gSWYgaXQgaXMsIHdlIHRyZWF0IHRoZSBwcm9wIGFzIG11dGFibGUgZXZlbiBpblxuICogcnVuZXMgbW9kZSwgYW5kIHNraXAgYGJpbmRpbmdfcHJvcGVydHlfbm9uX3JlYWN0aXZlYCB2YWxpZGF0aW9uXG4gKi9cbmxldCBpc19zdG9yZV9iaW5kaW5nID0gZmFsc2U7XG5cbmxldCBJU19VTk1PVU5URUQgPSBTeW1ib2woKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIGEgc3RvcmUuIElmIHRoZSBzdG9yZSBpc24ndCBzdWJzY3JpYmVkIHRvIHlldCwgaXQgd2lsbCBjcmVhdGUgYSBwcm94eVxuICogc2lnbmFsIHRoYXQgd2lsbCBiZSB1cGRhdGVkIHdoZW4gdGhlIHN0b3JlIGlzLiBUaGUgc3RvcmUgcmVmZXJlbmNlcyBjb250YWluZXIgaXMgbmVlZGVkIHRvXG4gKiB0cmFjayByZWFzc2lnbm1lbnRzIHRvIHN0b3JlcyBhbmQgdG8gdHJhY2sgdGhlIGNvcnJlY3QgY29tcG9uZW50IGNvbnRleHQuXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtTdG9yZTxWPiB8IG51bGwgfCB1bmRlZmluZWR9IHN0b3JlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVfbmFtZVxuICogQHBhcmFtIHtTdG9yZVJlZmVyZW5jZXNDb250YWluZXJ9IHN0b3Jlc1xuICogQHJldHVybnMge1Z9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZV9nZXQoc3RvcmUsIHN0b3JlX25hbWUsIHN0b3Jlcykge1xuXHRjb25zdCBlbnRyeSA9IChzdG9yZXNbc3RvcmVfbmFtZV0gPz89IHtcblx0XHRzdG9yZTogbnVsbCxcblx0XHRzb3VyY2U6IG11dGFibGVfc291cmNlKHVuZGVmaW5lZCksXG5cdFx0dW5zdWJzY3JpYmU6IG5vb3Bcblx0fSk7XG5cblx0aWYgKERFVikge1xuXHRcdGVudHJ5LnNvdXJjZS5sYWJlbCA9IHN0b3JlX25hbWU7XG5cdH1cblxuXHQvLyBpZiB0aGUgY29tcG9uZW50IHRoYXQgc2V0dXAgdGhpcyBpcyBhbHJlYWR5IHVubW91bnRlZCB3ZSBkb24ndCB3YW50IHRvIHJlZ2lzdGVyIGEgc3Vic2NyaXB0aW9uXG5cdGlmIChlbnRyeS5zdG9yZSAhPT0gc3RvcmUgJiYgIShJU19VTk1PVU5URUQgaW4gc3RvcmVzKSkge1xuXHRcdGVudHJ5LnVuc3Vic2NyaWJlKCk7XG5cdFx0ZW50cnkuc3RvcmUgPSBzdG9yZSA/PyBudWxsO1xuXG5cdFx0aWYgKHN0b3JlID09IG51bGwpIHtcblx0XHRcdGVudHJ5LnNvdXJjZS52ID0gdW5kZWZpbmVkOyAvLyBzZWUgc3luY2hyb25vdXMgY2FsbGJhY2sgY29tbWVudCBiZWxvd1xuXHRcdFx0ZW50cnkudW5zdWJzY3JpYmUgPSBub29wO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgaXNfc3luY2hyb25vdXNfY2FsbGJhY2sgPSB0cnVlO1xuXG5cdFx0XHRlbnRyeS51bnN1YnNjcmliZSA9IHN1YnNjcmliZV90b19zdG9yZShzdG9yZSwgKHYpID0+IHtcblx0XHRcdFx0aWYgKGlzX3N5bmNocm9ub3VzX2NhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Ly8gSWYgdGhlIGZpcnN0IHVwZGF0ZXMgdG8gdGhlIHN0b3JlIHZhbHVlIChwb3NzaWJseSBtdWx0aXBsZSBvZiB0aGVtKSBhcmUgc3luY2hyb25vdXNseVxuXHRcdFx0XHRcdC8vIGluc2lkZSBhIGRlcml2ZWQsIHdlIHdpbGwgaGl0IHRoZSBgc3RhdGVfdW5zYWZlX211dGF0aW9uYCBlcnJvciBpZiB3ZSBgc2V0YCB0aGUgdmFsdWVcblx0XHRcdFx0XHRlbnRyeS5zb3VyY2UudiA9IHY7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2V0KGVudHJ5LnNvdXJjZSwgdik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpc19zeW5jaHJvbm91c19jYWxsYmFjayA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8vIGlmIHRoZSBjb21wb25lbnQgdGhhdCBzZXR1cCB0aGlzIHN0b3JlcyBpcyBhbHJlYWR5IHVubW91bnRlZCB0aGUgc291cmNlIHdpbGwgYmUgb3V0IG9mIHN5bmNcblx0Ly8gc28gd2UganVzdCB1c2UgdGhlIGBnZXRgIGZvciB0aGUgc3RvcmVzLCBsZXNzIHBlcmZvcm1hbnQgYnV0IGl0IGF2b2lkcyB0byBjcmVhdGUgYSBtZW1vcnkgbGVha1xuXHQvLyBhbmQgaXQgd2lsbCBrZWVwIHRoZSB2YWx1ZSBjb25zaXN0ZW50XG5cdGlmIChzdG9yZSAmJiBJU19VTk1PVU5URUQgaW4gc3RvcmVzKSB7XG5cdFx0cmV0dXJuIGdldF9zdG9yZShzdG9yZSk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0KGVudHJ5LnNvdXJjZSk7XG59XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgZnJvbSBhIHN0b3JlIGlmIGl0J3Mgbm90IHRoZSBzYW1lIGFzIHRoZSBvbmUgaW4gdGhlIHN0b3JlIHJlZmVyZW5jZXMgY29udGFpbmVyLlxuICogV2UgbmVlZCB0aGlzIGluIGFkZGl0aW9uIHRvIGBzdG9yZV9nZXRgIGJlY2F1c2Ugc29tZW9uZSBjb3VsZCB1bnN1YnNjcmliZSBmcm9tIGEgc3RvcmUgYnV0XG4gKiB0aGVuIG5ldmVyIHN1YnNjcmliZSB0byB0aGUgbmV3IG9uZSAoaWYgYW55KSwgY2F1c2luZyB0aGUgc3Vic2NyaXB0aW9uIHRvIHN0YXkgb3BlbiB3cm9uZ2Z1bGx5LlxuICogQHBhcmFtIHtTdG9yZTxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZH0gc3RvcmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZV9uYW1lXG4gKiBAcGFyYW0ge1N0b3JlUmVmZXJlbmNlc0NvbnRhaW5lcn0gc3RvcmVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZV91bnN1YihzdG9yZSwgc3RvcmVfbmFtZSwgc3RvcmVzKSB7XG5cdC8qKiBAdHlwZSB7U3RvcmVSZWZlcmVuY2VzQ29udGFpbmVyWycnXSB8IHVuZGVmaW5lZH0gKi9cblx0bGV0IGVudHJ5ID0gc3RvcmVzW3N0b3JlX25hbWVdO1xuXG5cdGlmIChlbnRyeSAmJiBlbnRyeS5zdG9yZSAhPT0gc3RvcmUpIHtcblx0XHQvLyBEb24ndCByZXNldCBzdG9yZSB5ZXQsIHNvIHRoYXQgc3RvcmVfZ2V0IGFib3ZlIGNhbiByZXN1YnNjcmliZSB0byBuZXcgc3RvcmUgaWYgbmVjZXNzYXJ5XG5cdFx0ZW50cnkudW5zdWJzY3JpYmUoKTtcblx0XHRlbnRyeS51bnN1YnNjcmliZSA9IG5vb3A7XG5cdH1cblxuXHRyZXR1cm4gc3RvcmU7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbmV3IHZhbHVlIG9mIGEgc3RvcmUgYW5kIHJldHVybnMgdGhhdCB2YWx1ZS5cbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1N0b3JlPFY+fSBzdG9yZVxuICogQHBhcmFtIHtWfSB2YWx1ZVxuICogQHJldHVybnMge1Z9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZV9zZXQoc3RvcmUsIHZhbHVlKSB7XG5cdHN0b3JlLnNldCh2YWx1ZSk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0b3JlUmVmZXJlbmNlc0NvbnRhaW5lcn0gc3RvcmVzXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVfbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZGF0ZV9zdG9yZShzdG9yZXMsIHN0b3JlX25hbWUpIHtcblx0dmFyIGVudHJ5ID0gc3RvcmVzW3N0b3JlX25hbWVdO1xuXHRpZiAoZW50cnkuc3RvcmUgIT09IG51bGwpIHtcblx0XHRzdG9yZV9zZXQoZW50cnkuc3RvcmUsIGVudHJ5LnNvdXJjZS52KTtcblx0fVxufVxuXG4vKipcbiAqIFVuc3Vic2NyaWJlcyBmcm9tIGFsbCBhdXRvLXN1YnNjcmliZWQgc3RvcmVzIG9uIGRlc3Ryb3lcbiAqIEByZXR1cm5zIHtbU3RvcmVSZWZlcmVuY2VzQ29udGFpbmVyLCAoKT0+dm9pZF19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cF9zdG9yZXMoKSB7XG5cdC8qKiBAdHlwZSB7U3RvcmVSZWZlcmVuY2VzQ29udGFpbmVyfSAqL1xuXHRjb25zdCBzdG9yZXMgPSB7fTtcblxuXHRmdW5jdGlvbiBjbGVhbnVwKCkge1xuXHRcdHRlYXJkb3duKCgpID0+IHtcblx0XHRcdGZvciAodmFyIHN0b3JlX25hbWUgaW4gc3RvcmVzKSB7XG5cdFx0XHRcdGNvbnN0IHJlZiA9IHN0b3Jlc1tzdG9yZV9uYW1lXTtcblx0XHRcdFx0cmVmLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR9XG5cdFx0XHRkZWZpbmVfcHJvcGVydHkoc3RvcmVzLCBJU19VTk1PVU5URUQsIHtcblx0XHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRcdHZhbHVlOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBbc3RvcmVzLCBjbGVhbnVwXTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGEgc3RvcmUgd2l0aCBhIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RvcmU8Vj59IHN0b3JlICB0aGUgc3RvcmUgdG8gdXBkYXRlXG4gKiBAcGFyYW0ge2FueX0gZXhwcmVzc2lvbiAgdGhlIGV4cHJlc3Npb24gdGhhdCBtdXRhdGVzIHRoZSBzdG9yZVxuICogQHBhcmFtIHtWfSBuZXdfdmFsdWUgIHRoZSBuZXcgc3RvcmUgdmFsdWVcbiAqIEB0ZW1wbGF0ZSBWXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZV9tdXRhdGUoc3RvcmUsIGV4cHJlc3Npb24sIG5ld192YWx1ZSkge1xuXHRzdG9yZS5zZXQobmV3X3ZhbHVlKTtcblx0cmV0dXJuIGV4cHJlc3Npb247XG59XG5cbi8qKlxuICogQHBhcmFtIHtTdG9yZTxudW1iZXI+fSBzdG9yZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0b3JlX3ZhbHVlXG4gKiBAcGFyYW0gezEgfCAtMX0gW2RdXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3N0b3JlKHN0b3JlLCBzdG9yZV92YWx1ZSwgZCA9IDEpIHtcblx0c3RvcmUuc2V0KHN0b3JlX3ZhbHVlICsgZCk7XG5cdHJldHVybiBzdG9yZV92YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0b3JlPG51bWJlcj59IHN0b3JlXG4gKiBAcGFyYW0ge251bWJlcn0gc3RvcmVfdmFsdWVcbiAqIEBwYXJhbSB7MSB8IC0xfSBbZF1cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfcHJlX3N0b3JlKHN0b3JlLCBzdG9yZV92YWx1ZSwgZCA9IDEpIHtcblx0Y29uc3QgdmFsdWUgPSBzdG9yZV92YWx1ZSArIGQ7XG5cdHN0b3JlLnNldCh2YWx1ZSk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsZWQgaW5zaWRlIHByb3AgZ2V0dGVycyB0byBjb21tdW5pY2F0ZSB0aGF0IHRoZSBwcm9wIGlzIGEgc3RvcmUgYmluZGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWFya19zdG9yZV9iaW5kaW5nKCkge1xuXHRpc19zdG9yZV9iaW5kaW5nID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgdHVwbGUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBgZm4oKWAgcmVhZHMgYSBwcm9wIHRoYXQgaXMgYSBzdG9yZSBiaW5kaW5nLlxuICogVXNlZCB0byBwcmV2ZW50IGBiaW5kaW5nX3Byb3BlcnR5X25vbl9yZWFjdGl2ZWAgdmFsaWRhdGlvbiBmYWxzZSBwb3NpdGl2ZXMgYW5kXG4gKiBlbnN1cmUgdGhhdCB0aGVzZSBwcm9wcyBhcmUgdHJlYXRlZCBhcyBtdXRhYmxlIGV2ZW4gaW4gcnVuZXMgbW9kZVxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7KCkgPT4gVH0gZm5cbiAqIEByZXR1cm5zIHtbVCwgYm9vbGVhbl19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlX3N0b3JlX2JpbmRpbmcoZm4pIHtcblx0dmFyIHByZXZpb3VzX2lzX3N0b3JlX2JpbmRpbmcgPSBpc19zdG9yZV9iaW5kaW5nO1xuXG5cdHRyeSB7XG5cdFx0aXNfc3RvcmVfYmluZGluZyA9IGZhbHNlO1xuXHRcdHJldHVybiBbZm4oKSwgaXNfc3RvcmVfYmluZGluZ107XG5cdH0gZmluYWxseSB7XG5cdFx0aXNfc3RvcmVfYmluZGluZyA9IHByZXZpb3VzX2lzX3N0b3JlX2JpbmRpbmc7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0LCBTb3VyY2UgfSBmcm9tICcuL3R5cGVzLmpzJyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQge1xuXHRQUk9QU19JU19CSU5EQUJMRSxcblx0UFJPUFNfSVNfSU1NVVRBQkxFLFxuXHRQUk9QU19JU19MQVpZX0lOSVRJQUwsXG5cdFBST1BTX0lTX1JVTkVTLFxuXHRQUk9QU19JU19VUERBVEVEXG59IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBnZXRfZGVzY3JpcHRvciwgaXNfZnVuY3Rpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgc2V0LCBzb3VyY2UsIHVwZGF0ZSB9IGZyb20gJy4vc291cmNlcy5qcyc7XG5pbXBvcnQgeyBkZXJpdmVkLCBkZXJpdmVkX3NhZmVfZXF1YWwgfSBmcm9tICcuL2Rlcml2ZWRzLmpzJztcbmltcG9ydCB7XG5cdGFjdGl2ZV9lZmZlY3QsXG5cdGdldCxcblx0aXNfZGVzdHJveWluZ19lZmZlY3QsXG5cdHNldF9hY3RpdmVfZWZmZWN0LFxuXHR1bnRyYWNrXG59IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgREVTVFJPWUVELCBMRUdBQ1lfUFJPUFMsIFNUQVRFX1NZTUJPTCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IHByb3h5IH0gZnJvbSAnLi4vcHJveHkuanMnO1xuaW1wb3J0IHsgY2FwdHVyZV9zdG9yZV9iaW5kaW5nIH0gZnJvbSAnLi9zdG9yZS5qcyc7XG5pbXBvcnQgeyBsZWdhY3lfbW9kZV9mbGFnIH0gZnJvbSAnLi4vLi4vZmxhZ3MvaW5kZXguanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7KCh2YWx1ZT86IG51bWJlcikgPT4gbnVtYmVyKX0gZm5cbiAqIEBwYXJhbSB7MSB8IC0xfSBbZF1cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfcHJvcChmbiwgZCA9IDEpIHtcblx0Y29uc3QgdmFsdWUgPSBmbigpO1xuXHRmbih2YWx1ZSArIGQpO1xuXHRyZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKHZhbHVlPzogbnVtYmVyKSA9PiBudW1iZXIpfSBmblxuICogQHBhcmFtIHsxIHwgLTF9IFtkXVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9wcmVfcHJvcChmbiwgZCA9IDEpIHtcblx0Y29uc3QgdmFsdWUgPSBmbigpICsgZDtcblx0Zm4odmFsdWUpO1xuXHRyZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogVGhlIHByb3h5IGhhbmRsZXIgZm9yIHJlc3QgcHJvcHMgKGkuZS4gYGNvbnN0IHsgeCwgLi4ucmVzdCB9ID0gJHByb3BzKClgKS5cbiAqIElzIHBhc3NlZCB0aGUgZnVsbCBgJCRwcm9wc2Agb2JqZWN0IGFuZCBleGNsdWRlcyB0aGUgbmFtZWQgcHJvcHMuXG4gKiBAdHlwZSB7UHJveHlIYW5kbGVyPHsgcHJvcHM6IFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+LCBleGNsdWRlOiBBcnJheTxzdHJpbmcgfCBzeW1ib2w+LCBuYW1lPzogc3RyaW5nIH0+fX1cbiAqL1xuY29uc3QgcmVzdF9wcm9wc19oYW5kbGVyID0ge1xuXHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuXHRcdHJldHVybiB0YXJnZXQucHJvcHNba2V5XTtcblx0fSxcblx0c2V0KHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKERFVikge1xuXHRcdFx0Ly8gVE9ETyBzaG91bGQgdGhpcyBoYXBwZW4gaW4gcHJvZCB0b28/XG5cdFx0XHRlLnByb3BzX3Jlc3RfcmVhZG9ubHkoYCR7dGFyZ2V0Lm5hbWV9LiR7U3RyaW5nKGtleSl9YCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuXHRcdGlmIChrZXkgaW4gdGFyZ2V0LnByb3BzKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHZhbHVlOiB0YXJnZXQucHJvcHNba2V5XVxuXHRcdFx0fTtcblx0XHR9XG5cdH0sXG5cdGhhcyh0YXJnZXQsIGtleSkge1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIGtleSBpbiB0YXJnZXQucHJvcHM7XG5cdH0sXG5cdG93bktleXModGFyZ2V0KSB7XG5cdFx0cmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQucHJvcHMpLmZpbHRlcigoa2V5KSA9PiAhdGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSk7XG5cdH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZV1cbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn1cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gcmVzdF9wcm9wcyhwcm9wcywgZXhjbHVkZSwgbmFtZSkge1xuXHRyZXR1cm4gbmV3IFByb3h5KFxuXHRcdERFViA/IHsgcHJvcHMsIGV4Y2x1ZGUsIG5hbWUsIG90aGVyOiB7fSwgdG9fcHJveHk6IFtdIH0gOiB7IHByb3BzLCBleGNsdWRlIH0sXG5cdFx0cmVzdF9wcm9wc19oYW5kbGVyXG5cdCk7XG59XG5cbi8qKlxuICogVGhlIHByb3h5IGhhbmRsZXIgZm9yIGxlZ2FjeSAkJHJlc3RQcm9wcyBhbmQgJCRwcm9wc1xuICogQHR5cGUge1Byb3h5SGFuZGxlcjx7IHByb3BzOiBSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPiwgZXhjbHVkZTogQXJyYXk8c3RyaW5nIHwgc3ltYm9sPiwgc3BlY2lhbDogUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgKHY/OiB1bmtub3duKSA9PiB1bmtub3duPiwgdmVyc2lvbjogU291cmNlPG51bWJlcj4sIHBhcmVudF9lZmZlY3Q6IEVmZmVjdCB9Pn19XG4gKi9cbmNvbnN0IGxlZ2FjeV9yZXN0X3Byb3BzX2hhbmRsZXIgPSB7XG5cdGdldCh0YXJnZXQsIGtleSkge1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG5cdFx0Z2V0KHRhcmdldC52ZXJzaW9uKTtcblx0XHRyZXR1cm4ga2V5IGluIHRhcmdldC5zcGVjaWFsID8gdGFyZ2V0LnNwZWNpYWxba2V5XSgpIDogdGFyZ2V0LnByb3BzW2tleV07XG5cdH0sXG5cdHNldCh0YXJnZXQsIGtleSwgdmFsdWUpIHtcblx0XHRpZiAoIShrZXkgaW4gdGFyZ2V0LnNwZWNpYWwpKSB7XG5cdFx0XHR2YXIgcHJldmlvdXNfZWZmZWN0ID0gYWN0aXZlX2VmZmVjdDtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0c2V0X2FjdGl2ZV9lZmZlY3QodGFyZ2V0LnBhcmVudF9lZmZlY3QpO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSBwcm9wcyB0aGF0IGNhbiB0ZW1wb3JhcmlseSBnZXQgb3V0IG9mIHN5bmMgd2l0aCB0aGUgcGFyZW50XG5cdFx0XHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgKHY/OiB1bmtub3duKSA9PiB1bmtub3duPn0gKi9cblx0XHRcdFx0dGFyZ2V0LnNwZWNpYWxba2V5XSA9IHByb3AoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Z2V0IFtrZXldKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0LnByb3BzW2tleV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvKiogQHR5cGUge3N0cmluZ30gKi8gKGtleSksXG5cdFx0XHRcdFx0UFJPUFNfSVNfVVBEQVRFRFxuXHRcdFx0XHQpO1xuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0c2V0X2FjdGl2ZV9lZmZlY3QocHJldmlvdXNfZWZmZWN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0YXJnZXQuc3BlY2lhbFtrZXldKHZhbHVlKTtcblx0XHR1cGRhdGUodGFyZ2V0LnZlcnNpb24pOyAvLyAkJHByb3BzIGlzIGNvYXJzZS1ncmFpbmVkOiB3aGVuICQkcHJvcHMueCBpcyB1cGRhdGVkLCB1c2FnZXMgb2YgJCRwcm9wcy55IGV0YyBhcmUgYWxzbyByZXJ1blxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuXHRcdGlmIChrZXkgaW4gdGFyZ2V0LnByb3BzKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHZhbHVlOiB0YXJnZXQucHJvcHNba2V5XVxuXHRcdFx0fTtcblx0XHR9XG5cdH0sXG5cdGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG5cdFx0Ly8gU3ZlbHRlIDQgYWxsb3dlZCBmb3IgZGVsZXRpb25zIG9uICQkcmVzdFByb3BzXG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmluY2x1ZGVzKGtleSkpIHJldHVybiB0cnVlO1xuXHRcdHRhcmdldC5leGNsdWRlLnB1c2goa2V5KTtcblx0XHR1cGRhdGUodGFyZ2V0LnZlcnNpb24pO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRoYXModGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIGZhbHNlO1xuXHRcdHJldHVybiBrZXkgaW4gdGFyZ2V0LnByb3BzO1xuXHR9LFxuXHRvd25LZXlzKHRhcmdldCkge1xuXHRcdHJldHVybiBSZWZsZWN0Lm93bktleXModGFyZ2V0LnByb3BzKS5maWx0ZXIoKGtleSkgPT4gIXRhcmdldC5leGNsdWRlLmluY2x1ZGVzKGtleSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59IHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZWdhY3lfcmVzdF9wcm9wcyhwcm9wcywgZXhjbHVkZSkge1xuXHRyZXR1cm4gbmV3IFByb3h5KFxuXHRcdHtcblx0XHRcdHByb3BzLFxuXHRcdFx0ZXhjbHVkZSxcblx0XHRcdHNwZWNpYWw6IHt9LFxuXHRcdFx0dmVyc2lvbjogc291cmNlKDApLFxuXHRcdFx0Ly8gVE9ETyB0aGlzIGlzIG9ubHkgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgbmVlZCB0byB0cmFjayBjb21wb25lbnRcblx0XHRcdC8vIGRlc3RydWN0aW9uIGluc2lkZSBgcHJvcGAsIGJlY2F1c2Ugb2YgYGJpbmQ6dGhpc2AsIGJ1dCBpdFxuXHRcdFx0Ly8gc2VlbXMgbGlrZWx5IHRoYXQgd2UgY2FuIHNpbXBsaWZ5IGBiaW5kOnRoaXNgIGluc3RlYWRcblx0XHRcdHBhcmVudF9lZmZlY3Q6IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdClcblx0XHR9LFxuXHRcdGxlZ2FjeV9yZXN0X3Byb3BzX2hhbmRsZXJcblx0KTtcbn1cblxuLyoqXG4gKiBUaGUgcHJveHkgaGFuZGxlciBmb3Igc3ByZWFkIHByb3BzLiBIYW5kbGVzIHRoZSBpbmNvbWluZyBhcnJheSBvZiBwcm9wc1xuICogdGhhdCBsb29rcyBsaWtlIGAoKSA9PiB7IGR5bmFtaWM6IHByb3BzIH0sIHsgc3RhdGljOiBwcm9wIH0sIC4uYCBhbmQgd3JhcHNcbiAqIHRoZW0gc28gdGhhdCB0aGUgd2hvbGUgdGhpbmcgaXMgcGFzc2VkIHRvIHRoZSBjb21wb25lbnQgYXMgdGhlIGAkJHByb3BzYCBhcmd1bWVudC5cbiAqIEB0eXBlIHtQcm94eUhhbmRsZXI8eyBwcm9wczogQXJyYXk8UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4gfCAoKCkgPT4gUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4pPiB9Pn19XG4gKi9cbmNvbnN0IHNwcmVhZF9wcm9wc19oYW5kbGVyID0ge1xuXHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRsZXQgaSA9IHRhcmdldC5wcm9wcy5sZW5ndGg7XG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0bGV0IHAgPSB0YXJnZXQucHJvcHNbaV07XG5cdFx0XHRpZiAoaXNfZnVuY3Rpb24ocCkpIHAgPSBwKCk7XG5cdFx0XHRpZiAodHlwZW9mIHAgPT09ICdvYmplY3QnICYmIHAgIT09IG51bGwgJiYga2V5IGluIHApIHJldHVybiBwW2tleV07XG5cdFx0fVxuXHR9LFxuXHRzZXQodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IGkgPSB0YXJnZXQucHJvcHMubGVuZ3RoO1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGxldCBwID0gdGFyZ2V0LnByb3BzW2ldO1xuXHRcdFx0aWYgKGlzX2Z1bmN0aW9uKHApKSBwID0gcCgpO1xuXHRcdFx0Y29uc3QgZGVzYyA9IGdldF9kZXNjcmlwdG9yKHAsIGtleSk7XG5cdFx0XHRpZiAoZGVzYyAmJiBkZXNjLnNldCkge1xuXHRcdFx0XHRkZXNjLnNldCh2YWx1ZSk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkge1xuXHRcdGxldCBpID0gdGFyZ2V0LnByb3BzLmxlbmd0aDtcblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRsZXQgcCA9IHRhcmdldC5wcm9wc1tpXTtcblx0XHRcdGlmIChpc19mdW5jdGlvbihwKSkgcCA9IHAoKTtcblx0XHRcdGlmICh0eXBlb2YgcCA9PT0gJ29iamVjdCcgJiYgcCAhPT0gbnVsbCAmJiBrZXkgaW4gcCkge1xuXHRcdFx0XHRjb25zdCBkZXNjcmlwdG9yID0gZ2V0X2Rlc2NyaXB0b3IocCwga2V5KTtcblx0XHRcdFx0aWYgKGRlc2NyaXB0b3IgJiYgIWRlc2NyaXB0b3IuY29uZmlndXJhYmxlKSB7XG5cdFx0XHRcdFx0Ly8gUHJldmVudCBhIFwiTm9uLWNvbmZpZ3VyYWJpbGl0eSBSZXBvcnQgRXJyb3JcIjogVGhlIHRhcmdldCBpcyBhbiBhcnJheSwgaXQgZG9lc1xuXHRcdFx0XHRcdC8vIG5vdCBhY3R1YWxseSBjb250YWluIHRoaXMgcHJvcGVydHkuIElmIGl0IGlzIG5vdyBkZXNjcmliZWQgYXMgbm9uLWNvbmZpZ3VyYWJsZSxcblx0XHRcdFx0XHQvLyB0aGUgcHJveHkgdGhyb3dzIGEgdmFsaWRhdGlvbiBlcnJvci4gU2V0dGluZyBpdCB0byB0cnVlIGF2b2lkcyB0aGF0LlxuXHRcdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhhcyh0YXJnZXQsIGtleSkge1xuXHRcdC8vIFRvIHByZXZlbnQgYSBmYWxzZSBwb3NpdGl2ZSBgaXNfZW50cnlfcHJvcHNgIGluIHRoZSBgcHJvcGAgZnVuY3Rpb25cblx0XHRpZiAoa2V5ID09PSBTVEFURV9TWU1CT0wgfHwga2V5ID09PSBMRUdBQ1lfUFJPUFMpIHJldHVybiBmYWxzZTtcblxuXHRcdGZvciAobGV0IHAgb2YgdGFyZ2V0LnByb3BzKSB7XG5cdFx0XHRpZiAoaXNfZnVuY3Rpb24ocCkpIHAgPSBwKCk7XG5cdFx0XHRpZiAocCAhPSBudWxsICYmIGtleSBpbiBwKSByZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXModGFyZ2V0KSB7XG5cdFx0LyoqIEB0eXBlIHtBcnJheTxzdHJpbmcgfCBzeW1ib2w+fSAqL1xuXHRcdGNvbnN0IGtleXMgPSBbXTtcblxuXHRcdGZvciAobGV0IHAgb2YgdGFyZ2V0LnByb3BzKSB7XG5cdFx0XHRpZiAoaXNfZnVuY3Rpb24ocCkpIHAgPSBwKCk7XG5cdFx0XHRpZiAoIXApIGNvbnRpbnVlO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBwKSB7XG5cdFx0XHRcdGlmICgha2V5cy5pbmNsdWRlcyhrZXkpKSBrZXlzLnB1c2goa2V5KTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhwKSkge1xuXHRcdFx0XHRpZiAoIWtleXMuaW5jbHVkZXMoa2V5KSkga2V5cy5wdXNoKGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGtleXM7XG5cdH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8ICgoKSA9PiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik+fSBwcm9wc1xuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcmVhZF9wcm9wcyguLi5wcm9wcykge1xuXHRyZXR1cm4gbmV3IFByb3h5KHsgcHJvcHMgfSwgc3ByZWFkX3Byb3BzX2hhbmRsZXIpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgZm9yIHN5bmNocm9uaXppbmcgYSBwb3NzaWJseSBib3VuZCBwcm9wIHdpdGggdGhlIGlubmVyIGNvbXBvbmVudCBzdGF0ZS5cbiAqIEl0IGlzIHVzZWQgd2hlbmV2ZXIgdGhlIGNvbXBpbGVyIHNlZXMgdGhhdCB0aGUgY29tcG9uZW50IHdyaXRlcyB0byB0aGUgcHJvcCwgb3Igd2hlbiBpdCBoYXMgYSBkZWZhdWx0IHByb3BfdmFsdWUuXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICogQHBhcmFtIHtWIHwgKCgpID0+IFYpfSBbZmFsbGJhY2tdXG4gKiBAcmV0dXJucyB7KCgpID0+IFYgfCAoKGFyZzogVikgPT4gVikgfCAoKGFyZzogViwgbXV0YXRpb246IGJvb2xlYW4pID0+IFYpKX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3AocHJvcHMsIGtleSwgZmxhZ3MsIGZhbGxiYWNrKSB7XG5cdHZhciBydW5lcyA9ICFsZWdhY3lfbW9kZV9mbGFnIHx8IChmbGFncyAmIFBST1BTX0lTX1JVTkVTKSAhPT0gMDtcblx0dmFyIGJpbmRhYmxlID0gKGZsYWdzICYgUFJPUFNfSVNfQklOREFCTEUpICE9PSAwO1xuXHR2YXIgbGF6eSA9IChmbGFncyAmIFBST1BTX0lTX0xBWllfSU5JVElBTCkgIT09IDA7XG5cblx0dmFyIGZhbGxiYWNrX3ZhbHVlID0gLyoqIEB0eXBlIHtWfSAqLyAoZmFsbGJhY2spO1xuXHR2YXIgZmFsbGJhY2tfZGlydHkgPSB0cnVlO1xuXG5cdHZhciBnZXRfZmFsbGJhY2sgPSAoKSA9PiB7XG5cdFx0aWYgKGZhbGxiYWNrX2RpcnR5KSB7XG5cdFx0XHRmYWxsYmFja19kaXJ0eSA9IGZhbHNlO1xuXG5cdFx0XHRmYWxsYmFja192YWx1ZSA9IGxhenlcblx0XHRcdFx0PyB1bnRyYWNrKC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKGZhbGxiYWNrKSlcblx0XHRcdFx0OiAvKiogQHR5cGUge1Z9ICovIChmYWxsYmFjayk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbGxiYWNrX3ZhbHVlO1xuXHR9O1xuXG5cdC8qKiBAdHlwZSB7KCh2OiBWKSA9PiB2b2lkKSB8IHVuZGVmaW5lZH0gKi9cblx0dmFyIHNldHRlcjtcblxuXHRpZiAoYmluZGFibGUpIHtcblx0XHQvLyBDYW4gYmUgdGhlIGNhc2Ugd2hlbiBzb21lb25lIGRvZXMgYG1vdW50KENvbXBvbmVudCwgcHJvcHMpYCB3aXRoIGBsZXQgcHJvcHMgPSAkc3RhdGUoey4uLn0pYFxuXHRcdC8vIG9yIGBjcmVhdGVDbGFzc0NvbXBvbmVudChDb21wb25lbnQsIHByb3BzKWBcblx0XHR2YXIgaXNfZW50cnlfcHJvcHMgPSBTVEFURV9TWU1CT0wgaW4gcHJvcHMgfHwgTEVHQUNZX1BST1BTIGluIHByb3BzO1xuXG5cdFx0c2V0dGVyID1cblx0XHRcdGdldF9kZXNjcmlwdG9yKHByb3BzLCBrZXkpPy5zZXQgPz9cblx0XHRcdChpc19lbnRyeV9wcm9wcyAmJiBrZXkgaW4gcHJvcHMgPyAodikgPT4gKHByb3BzW2tleV0gPSB2KSA6IHVuZGVmaW5lZCk7XG5cdH1cblxuXHR2YXIgaW5pdGlhbF92YWx1ZTtcblx0dmFyIGlzX3N0b3JlX3N1YiA9IGZhbHNlO1xuXG5cdGlmIChiaW5kYWJsZSkge1xuXHRcdFtpbml0aWFsX3ZhbHVlLCBpc19zdG9yZV9zdWJdID0gY2FwdHVyZV9zdG9yZV9iaW5kaW5nKCgpID0+IC8qKiBAdHlwZSB7Vn0gKi8gKHByb3BzW2tleV0pKTtcblx0fSBlbHNlIHtcblx0XHRpbml0aWFsX3ZhbHVlID0gLyoqIEB0eXBlIHtWfSAqLyAocHJvcHNba2V5XSk7XG5cdH1cblxuXHRpZiAoaW5pdGlhbF92YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGZhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRpbml0aWFsX3ZhbHVlID0gZ2V0X2ZhbGxiYWNrKCk7XG5cblx0XHRpZiAoc2V0dGVyKSB7XG5cdFx0XHRpZiAocnVuZXMpIGUucHJvcHNfaW52YWxpZF92YWx1ZShrZXkpO1xuXHRcdFx0c2V0dGVyKGluaXRpYWxfdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiBAdHlwZSB7KCkgPT4gVn0gKi9cblx0dmFyIGdldHRlcjtcblxuXHRpZiAocnVuZXMpIHtcblx0XHRnZXR0ZXIgPSAoKSA9PiB7XG5cdFx0XHR2YXIgdmFsdWUgPSAvKiogQHR5cGUge1Z9ICovIChwcm9wc1trZXldKTtcblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZ2V0X2ZhbGxiYWNrKCk7XG5cdFx0XHRmYWxsYmFja19kaXJ0eSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRnZXR0ZXIgPSAoKSA9PiB7XG5cdFx0XHR2YXIgdmFsdWUgPSAvKiogQHR5cGUge1Z9ICovIChwcm9wc1trZXldKTtcblxuXHRcdFx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ly8gaW4gbGVnYWN5IG1vZGUsIHdlIGRvbid0IHJldmVydCB0byB0aGUgZmFsbGJhY2sgdmFsdWVcblx0XHRcdFx0Ly8gaWYgdGhlIHByb3AgZ29lcyBmcm9tIGRlZmluZWQgdG8gdW5kZWZpbmVkLiBUaGUgZWFzaWVzdFxuXHRcdFx0XHQvLyB3YXkgdG8gbW9kZWwgdGhpcyBpcyB0byBtYWtlIHRoZSBmYWxsYmFjayB1bmRlZmluZWRcblx0XHRcdFx0Ly8gYXMgc29vbiBhcyB0aGUgcHJvcCBoYXMgYSB2YWx1ZVxuXHRcdFx0XHRmYWxsYmFja192YWx1ZSA9IC8qKiBAdHlwZSB7Vn0gKi8gKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gZmFsbGJhY2tfdmFsdWUgOiB2YWx1ZTtcblx0XHR9O1xuXHR9XG5cblx0Ly8gcHJvcCBpcyBuZXZlciB3cml0dGVuIHRvIOKAlCB3ZSBvbmx5IG5lZWQgYSBnZXR0ZXJcblx0aWYgKHJ1bmVzICYmIChmbGFncyAmIFBST1BTX0lTX1VQREFURUQpID09PSAwKSB7XG5cdFx0cmV0dXJuIGdldHRlcjtcblx0fVxuXG5cdC8vIHByb3AgaXMgd3JpdHRlbiB0bywgYnV0IHRoZSBwYXJlbnQgY29tcG9uZW50IGhhZCBgYmluZDpmb29gIHdoaWNoXG5cdC8vIG1lYW5zIHdlIGNhbiBqdXN0IGNhbGwgYCQkcHJvcHMuZm9vID0gdmFsdWVgIGRpcmVjdGx5XG5cdGlmIChzZXR0ZXIpIHtcblx0XHR2YXIgbGVnYWN5X3BhcmVudCA9IHByb3BzLiQkbGVnYWN5O1xuXHRcdHJldHVybiAvKiogQHR5cGUgeygpID0+IFZ9ICovIChcblx0XHRcdGZ1bmN0aW9uICgvKiogQHR5cGUge1Z9ICovIHZhbHVlLCAvKiogQHR5cGUge2Jvb2xlYW59ICovIG11dGF0aW9uKSB7XG5cdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdC8vIFdlIGRvbid0IHdhbnQgdG8gbm90aWZ5IGlmIHRoZSB2YWx1ZSB3YXMgbXV0YXRlZCBhbmQgdGhlIHBhcmVudCBpcyBpbiBydW5lcyBtb2RlLlxuXHRcdFx0XHRcdC8vIEluIHRoYXQgY2FzZSB0aGUgc3RhdGUgcHJveHkgKGlmIGl0IGV4aXN0cykgc2hvdWxkIHRha2UgY2FyZSBvZiB0aGUgbm90aWZpY2F0aW9uLlxuXHRcdFx0XHRcdC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IGluIHJ1bmVzIG1vZGUsIHdlIG5lZWQgdG8gbm90aWZ5IG9uIG11dGF0aW9uLCB0b28sIHRoYXQgdGhlIHByb3Bcblx0XHRcdFx0XHQvLyBoYXMgY2hhbmdlZCBiZWNhdXNlIHRoZSBwYXJlbnQgd2lsbCBub3QgYmUgYWJsZSB0byBkZXRlY3QgdGhlIGNoYW5nZSBvdGhlcndpc2UuXG5cdFx0XHRcdFx0aWYgKCFydW5lcyB8fCAhbXV0YXRpb24gfHwgbGVnYWN5X3BhcmVudCB8fCBpc19zdG9yZV9zdWIpIHtcblx0XHRcdFx0XHRcdC8qKiBAdHlwZSB7RnVuY3Rpb259ICovIChzZXR0ZXIpKG11dGF0aW9uID8gZ2V0dGVyKCkgOiB2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGdldHRlcigpO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvLyBFaXRoZXIgcHJvcCBpcyB3cml0dGVuIHRvLCBidXQgdGhlcmUncyBubyBiaW5kaW5nLCB3aGljaCBtZWFucyB3ZVxuXHQvLyBjcmVhdGUgYSBkZXJpdmVkIHRoYXQgd2UgY2FuIHdyaXRlIHRvIGxvY2FsbHkuXG5cdC8vIE9yIHdlIGFyZSBpbiBsZWdhY3kgbW9kZSB3aGVyZSB3ZSBhbHdheXMgY3JlYXRlIGEgZGVyaXZlZCB0byByZXBsaWNhdGUgdGhhdFxuXHQvLyBTdmVsdGUgNCBkaWQgbm90IHRyaWdnZXIgdXBkYXRlcyB3aGVuIGEgcHJpbWl0aXZlIHZhbHVlIHdhcyB1cGRhdGVkIHRvIHRoZSBzYW1lIHZhbHVlLlxuXHR2YXIgb3ZlcnJpZGRlbiA9IGZhbHNlO1xuXG5cdHZhciBkID0gKChmbGFncyAmIFBST1BTX0lTX0lNTVVUQUJMRSkgIT09IDAgPyBkZXJpdmVkIDogZGVyaXZlZF9zYWZlX2VxdWFsKSgoKSA9PiB7XG5cdFx0b3ZlcnJpZGRlbiA9IGZhbHNlO1xuXHRcdHJldHVybiBnZXR0ZXIoKTtcblx0fSk7XG5cblx0aWYgKERFVikge1xuXHRcdGQubGFiZWwgPSBrZXk7XG5cdH1cblxuXHQvLyBDYXB0dXJlIHRoZSBpbml0aWFsIHZhbHVlIGlmIGl0J3MgYmluZGFibGVcblx0aWYgKGJpbmRhYmxlKSBnZXQoZCk7XG5cblx0dmFyIHBhcmVudF9lZmZlY3QgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdHJldHVybiAvKiogQHR5cGUgeygpID0+IFZ9ICovIChcblx0XHRmdW5jdGlvbiAoLyoqIEB0eXBlIHthbnl9ICovIHZhbHVlLCAvKiogQHR5cGUge2Jvb2xlYW59ICovIG11dGF0aW9uKSB7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgbmV3X3ZhbHVlID0gbXV0YXRpb24gPyBnZXQoZCkgOiBydW5lcyAmJiBiaW5kYWJsZSA/IHByb3h5KHZhbHVlKSA6IHZhbHVlO1xuXG5cdFx0XHRcdHNldChkLCBuZXdfdmFsdWUpO1xuXHRcdFx0XHRvdmVycmlkZGVuID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoZmFsbGJhY2tfdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGZhbGxiYWNrX3ZhbHVlID0gbmV3X3ZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzcGVjaWFsIGNhc2Ug4oCUIGF2b2lkIHJlY2FsY3VsYXRpbmcgdGhlIGRlcml2ZWQgaWYgd2UncmUgaW4gYVxuXHRcdFx0Ly8gdGVhcmRvd24gZnVuY3Rpb24gYW5kIHRoZSBwcm9wIHdhcyBvdmVycmlkZGVuIGxvY2FsbHksIG9yIHRoZVxuXHRcdFx0Ly8gY29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZCAodGhpcyBsYXR0ZXIgcGFydCBpcyBuZWNlc3Nhcnlcblx0XHRcdC8vIGJlY2F1c2UgYGJpbmQ6dGhpc2AgY2FuIHJlYWQgcHJvcHMgYWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXNcblx0XHRcdC8vIGJlZW4gZGVzdHJveWVkLiBUT0RPIHNpbXBsaWZ5IGBiaW5kOnRoaXNgXG5cdFx0XHRpZiAoKGlzX2Rlc3Ryb3lpbmdfZWZmZWN0ICYmIG92ZXJyaWRkZW4pIHx8IChwYXJlbnRfZWZmZWN0LmYgJiBERVNUUk9ZRUQpICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybiBkLnY7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBnZXQoZCk7XG5cdFx0fVxuXHQpO1xufVxuIiwiZXhwb3J0IHR5cGUgVGFza1N0YXR1cyA9ICd0b2RvJyB8ICdpbi1wcm9ncmVzcycgfCAnZG9uZScgfCAnYmxvY2tlZCc7XG5leHBvcnQgdHlwZSBUYXNrUHJpb3JpdHkgPSAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJztcblxuZXhwb3J0IGludGVyZmFjZSBTdWJ0YXNrIHtcbiAgaWQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgc3RhdHVzOiBUYXNrU3RhdHVzO1xuICBmaWxlUGF0aDogc3RyaW5nO1xuICBwYXJlbnRJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhc2sge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBzdGF0dXM6IFRhc2tTdGF0dXM7XG4gIHByaW9yaXR5OiBUYXNrUHJpb3JpdHk7XG4gIHN0YXJ0RGF0ZTogc3RyaW5nIHwgbnVsbDsgICAvLyBJU08gZGF0ZSBzdHJpbmcgWVlZWS1NTS1ERFxuICBlbmREYXRlOiBzdHJpbmcgfCBudWxsOyAgICAgLy8gSVNPIGRhdGUgc3RyaW5nIFlZWVktTU0tRERcbiAgYXNzaWduZWU6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW107XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGZpbGVQYXRoOiBzdHJpbmc7XG4gIHByb2plY3RGb2xkZXI6IHN0cmluZztcbiAgc3VidGFza3M6IFN1YnRhc2tbXTtcbiAgcGFyZW50SWQ6IHN0cmluZyB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdCB7XG4gIG5hbWU6IHN0cmluZztcbiAgZm9sZGVyUGF0aDogc3RyaW5nO1xuICB0YXNrczogVGFza1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbnR0UGx1Z2luU2V0dGluZ3Mge1xuICBwcm9qZWN0c0ZvbGRlcjogc3RyaW5nO1xuICBkZWZhdWx0U3RhdHVzOiBUYXNrU3RhdHVzO1xuICBkZWZhdWx0UHJpb3JpdHk6IFRhc2tQcmlvcml0eTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEdhbnR0UGx1Z2luU2V0dGluZ3MgPSB7XG4gIHByb2plY3RzRm9sZGVyOiAnUHJvamVjdHMnLFxuICBkZWZhdWx0U3RhdHVzOiAndG9kbycsXG4gIGRlZmF1bHRQcmlvcml0eTogJ21lZGl1bScsXG59O1xuIiwiaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgR2FudHRQbHVnaW4gZnJvbSAnLi9tYWluJztcblxuZXhwb3J0IGNsYXNzIEdhbnR0U2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwbHVnaW46IEdhbnR0UGx1Z2luO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEdhbnR0UGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7IHRleHQ6ICdPYnNpZGlhbiBHYW50dCAmIEthbmJhbiDigJQgU2V0dGluZ3MnIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnUHJvamVjdHMgZm9sZGVyJylcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICAnUm9vdCBmb2xkZXIgd2hlcmUgeW91ciBwcm9qZWN0IGZvbGRlcnMgbGl2ZS4gRWFjaCBzdWJmb2xkZXIgYmVjb21lcyBhIHByb2plY3QuJ1xuICAgICAgKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ1Byb2plY3RzJylcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvamVjdHNGb2xkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvamVjdHNGb2xkZXIgPSB2YWx1ZS50cmltKCkgfHwgJ1Byb2plY3RzJztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnRGVmYXVsdCB0YXNrIHN0YXR1cycpXG4gICAgICAuc2V0RGVzYygnU3RhdHVzIGFzc2lnbmVkIHRvIG5ld2x5IGNyZWF0ZWQgdGFza3MuJylcbiAgICAgIC5hZGREcm9wZG93bigoZGQpID0+XG4gICAgICAgIGRkXG4gICAgICAgICAgLmFkZE9wdGlvbigndG9kbycsICdUbyBEbycpXG4gICAgICAgICAgLmFkZE9wdGlvbignaW4tcHJvZ3Jlc3MnLCAnSW4gUHJvZ3Jlc3MnKVxuICAgICAgICAgIC5hZGRPcHRpb24oJ2RvbmUnLCAnRG9uZScpXG4gICAgICAgICAgLmFkZE9wdGlvbignYmxvY2tlZCcsICdCbG9ja2VkJylcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdFN0YXR1cylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0U3RhdHVzID0gdmFsdWUgYXMgYW55O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdEZWZhdWx0IHRhc2sgcHJpb3JpdHknKVxuICAgICAgLnNldERlc2MoJ1ByaW9yaXR5IGFzc2lnbmVkIHRvIG5ld2x5IGNyZWF0ZWQgdGFza3MuJylcbiAgICAgIC5hZGREcm9wZG93bigoZGQpID0+XG4gICAgICAgIGRkXG4gICAgICAgICAgLmFkZE9wdGlvbignbG93JywgJ0xvdycpXG4gICAgICAgICAgLmFkZE9wdGlvbignbWVkaXVtJywgJ01lZGl1bScpXG4gICAgICAgICAgLmFkZE9wdGlvbignaGlnaCcsICdIaWdoJylcbiAgICAgICAgICAuYWRkT3B0aW9uKCdjcml0aWNhbCcsICdDcml0aWNhbCcpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRQcmlvcml0eSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0UHJpb3JpdHkgPSB2YWx1ZSBhcyBhbnk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBUaW55IG5hbm9pZC1saWtlIElEIGdlbmVyYXRvciDigJQgbm8gZXh0cmEgZGVwZW5kZW5jeSBuZWVkZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYW5vaWQoc2l6ZSA9IDEyKTogc3RyaW5nIHtcbiAgY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICBsZXQgcmVzdWx0ID0gJyc7XG4gIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXJyYXkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHJlc3VsdCArPSBjaGFyc1thcnJheVtpXSAlIGNoYXJzLmxlbmd0aF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwLCBURmlsZSwgVEZvbGRlciB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgVGFzaywgU3VidGFzaywgUHJvamVjdCwgVGFza1N0YXR1cywgVGFza1ByaW9yaXR5IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBuYW5vaWQgfSBmcm9tICcuL25hbm9pZCc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBmcm9udG1hdHRlciBZQU1MIGZvciBhIG5ldyB0YXNrIG5vdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRhc2tGcm9udG1hdHRlcih0YXNrOiBQYXJ0aWFsPFRhc2s+KTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW1xuICAgICctLS0nLFxuICAgIGBpZDogJHt0YXNrLmlkID8/IG5hbm9pZCgpfWAsXG4gICAgYHRpdGxlOiAke3Rhc2sudGl0bGUgPz8gJ1VudGl0bGVkIFRhc2snfWAsXG4gICAgYHN0YXR1czogJHt0YXNrLnN0YXR1cyA/PyAndG9kbyd9YCxcbiAgICBgcHJpb3JpdHk6ICR7dGFzay5wcmlvcml0eSA/PyAnbWVkaXVtJ31gLFxuICAgIGBzdGFydF9kYXRlOiAke3Rhc2suc3RhcnREYXRlID8/ICcnfWAsXG4gICAgYGVuZF9kYXRlOiAke3Rhc2suZW5kRGF0ZSA/PyAnJ31gLFxuICAgIGBhc3NpZ25lZTogJHt0YXNrLmFzc2lnbmVlID8/ICcnfWAsXG4gICAgYHRhZ3M6IFskeyh0YXNrLnRhZ3MgPz8gW10pLmpvaW4oJywgJyl9XWAsXG4gICAgYHBhcmVudF9pZDogJHt0YXNrLnBhcmVudElkID8/ICcnfWAsXG4gICAgJy0tLScsXG4gICAgJycsXG4gICAgYCMgJHt0YXNrLnRpdGxlID8/ICdVbnRpdGxlZCBUYXNrJ31gLFxuICAgICcnLFxuICAgICcjIyBEZXNjcmlwdGlvbicsXG4gICAgJycsXG4gICAgdGFzay5kZXNjcmlwdGlvbiA/PyAnJyxcbiAgICAnJyxcbiAgICAnIyMgTm90ZXMnLFxuICAgICcnLFxuICBdO1xuICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIGZyb250bWF0dGVyIG9mIGEgdGFzayBub3RlIGZpbGUgaW50byBhIFRhc2sgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUYXNrRmlsZShmaWxlOiBURmlsZSwgY29udGVudDogc3RyaW5nLCBwcm9qZWN0Rm9sZGVyOiBzdHJpbmcpOiBUYXNrIHwgbnVsbCB7XG4gIGNvbnN0IGZtTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC9eLS0tXFxuKFtcXHNcXFNdKj8pXFxuLS0tLyk7XG4gIGlmICghZm1NYXRjaCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZm0gPSBmbU1hdGNoWzFdO1xuICBjb25zdCBnZXQgPSAoa2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG0gPSBmbS5tYXRjaChuZXcgUmVnRXhwKGBeJHtrZXl9OlxcXFxzKiguKikkYCwgJ20nKSk7XG4gICAgcmV0dXJuIG0gPyBtWzFdLnRyaW0oKSA6ICcnO1xuICB9O1xuXG4gIGNvbnN0IHRhZ3NSYXcgPSBnZXQoJ3RhZ3MnKS5yZXBsYWNlKC9eXFxbfFxcXSQvZywgJycpO1xuICBjb25zdCB0YWdzID0gdGFnc1JhdyA/IHRhZ3NSYXcuc3BsaXQoJywnKS5tYXAodCA9PiB0LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogZ2V0KCdpZCcpIHx8IGZpbGUuYmFzZW5hbWUsXG4gICAgdGl0bGU6IGdldCgndGl0bGUnKSB8fCBmaWxlLmJhc2VuYW1lLFxuICAgIHN0YXR1czogKGdldCgnc3RhdHVzJykgYXMgVGFza1N0YXR1cykgfHwgJ3RvZG8nLFxuICAgIHByaW9yaXR5OiAoZ2V0KCdwcmlvcml0eScpIGFzIFRhc2tQcmlvcml0eSkgfHwgJ21lZGl1bScsXG4gICAgc3RhcnREYXRlOiBnZXQoJ3N0YXJ0X2RhdGUnKSB8fCBudWxsLFxuICAgIGVuZERhdGU6IGdldCgnZW5kX2RhdGUnKSB8fCBudWxsLFxuICAgIGFzc2lnbmVlOiBnZXQoJ2Fzc2lnbmVlJyksXG4gICAgdGFncyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgZmlsZVBhdGg6IGZpbGUucGF0aCxcbiAgICBwcm9qZWN0Rm9sZGVyLFxuICAgIHN1YnRhc2tzOiBbXSxcbiAgICBwYXJlbnRJZDogZ2V0KCdwYXJlbnRfaWQnKSB8fCBudWxsLFxuICB9O1xufVxuXG4vKipcbiAqIExvYWQgYWxsIHByb2plY3RzIGZyb20gdGhlIGNvbmZpZ3VyZWQgZm9sZGVyLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFByb2plY3RzKGFwcDogQXBwLCBwcm9qZWN0c0ZvbGRlcjogc3RyaW5nKTogUHJvbWlzZTxQcm9qZWN0W10+IHtcbiAgY29uc3Qgcm9vdEZvbGRlciA9IGFwcC52YXVsdC5nZXRGb2xkZXJCeVBhdGgocHJvamVjdHNGb2xkZXIpO1xuICBpZiAoIXJvb3RGb2xkZXIpIHJldHVybiBbXTtcblxuICBjb25zdCBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiByb290Rm9sZGVyLmNoaWxkcmVuKSB7XG4gICAgaWYgKCEoY2hpbGQgYXMgVEZvbGRlcikuY2hpbGRyZW4pIGNvbnRpbnVlOyAvLyBza2lwIGZpbGVzXG4gICAgY29uc3QgcHJvamVjdEZvbGRlciA9IGNoaWxkIGFzIFRGb2xkZXI7XG4gICAgY29uc3QgdGFza3MgPSBhd2FpdCBsb2FkVGFza3NGcm9tRm9sZGVyKGFwcCwgcHJvamVjdEZvbGRlciwgcHJvamVjdEZvbGRlci5wYXRoKTtcbiAgICBwcm9qZWN0cy5wdXNoKHtcbiAgICAgIG5hbWU6IHByb2plY3RGb2xkZXIubmFtZSxcbiAgICAgIGZvbGRlclBhdGg6IHByb2plY3RGb2xkZXIucGF0aCxcbiAgICAgIHRhc2tzLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHByb2plY3RzO1xufVxuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGxvYWQgdGFza3MgZnJvbSBhIHByb2plY3QgZm9sZGVyLlxuICogRmlsZXMgZGlyZWN0bHkgdW5kZXIgdGhlIHByb2plY3QgZm9sZGVyIGFyZSB0b3AtbGV2ZWwgdGFza3MuXG4gKiBGaWxlcyBpbiBzdWJmb2xkZXJzIG9mIHRoZSBwcm9qZWN0IGZvbGRlciBhcmUgc3VidGFza3Mgb2YgdGhlIG1hdGNoaW5nIHBhcmVudC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZFRhc2tzRnJvbUZvbGRlcihcbiAgYXBwOiBBcHAsXG4gIGZvbGRlcjogVEZvbGRlcixcbiAgcHJvamVjdEZvbGRlclBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTxUYXNrW10+IHtcbiAgY29uc3QgYWxsVGFza3M6IE1hcDxzdHJpbmcsIFRhc2s+ID0gbmV3IE1hcCgpO1xuXG4gIC8vIEZpcnN0IHBhc3M6IGNvbGxlY3QgYWxsIHRhc2sgZmlsZXMgcmVjdXJzaXZlbHlcbiAgYXdhaXQgY29sbGVjdFRhc2tGaWxlcyhhcHAsIGZvbGRlciwgcHJvamVjdEZvbGRlclBhdGgsIGFsbFRhc2tzKTtcblxuICAvLyBTZWNvbmQgcGFzczogd2lyZSB1cCBzdWJ0YXNrc1xuICBjb25zdCB0b3BMZXZlbDogVGFza1tdID0gW107XG4gIGZvciAoY29uc3QgdGFzayBvZiBhbGxUYXNrcy52YWx1ZXMoKSkge1xuICAgIGlmICh0YXNrLnBhcmVudElkICYmIGFsbFRhc2tzLmhhcyh0YXNrLnBhcmVudElkKSkge1xuICAgICAgY29uc3QgcGFyZW50ID0gYWxsVGFza3MuZ2V0KHRhc2sucGFyZW50SWQpITtcbiAgICAgIHBhcmVudC5zdWJ0YXNrcy5wdXNoKHRhc2sgYXMgdW5rbm93biBhcyBTdWJ0YXNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9wTGV2ZWwucHVzaCh0YXNrKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9wTGV2ZWw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3RUYXNrRmlsZXMoXG4gIGFwcDogQXBwLFxuICBmb2xkZXI6IFRGb2xkZXIsXG4gIHByb2plY3RGb2xkZXJQYXRoOiBzdHJpbmcsXG4gIG1hcDogTWFwPHN0cmluZywgVGFzaz5cbikge1xuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGZvbGRlci5jaGlsZHJlbikge1xuICAgIGlmICgoY2hpbGQgYXMgVEZvbGRlcikuY2hpbGRyZW4pIHtcbiAgICAgIC8vIEl0J3MgYSBmb2xkZXIg4oCUIHJlY3Vyc2VcbiAgICAgIGF3YWl0IGNvbGxlY3RUYXNrRmlsZXMoYXBwLCBjaGlsZCBhcyBURm9sZGVyLCBwcm9qZWN0Rm9sZGVyUGF0aCwgbWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGNoaWxkIGFzIFRGaWxlO1xuICAgICAgaWYgKGZpbGUuZXh0ZW5zaW9uICE9PSAnbWQnKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQuY2FjaGVkUmVhZChmaWxlKTtcbiAgICAgIGNvbnN0IHRhc2sgPSBwYXJzZVRhc2tGaWxlKGZpbGUsIGNvbnRlbnQsIHByb2plY3RGb2xkZXJQYXRoKTtcbiAgICAgIGlmICh0YXNrKSBtYXAuc2V0KHRhc2suaWQsIHRhc2spO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyB0YXNrIG5vdGUgaW5zaWRlIHRoZSBnaXZlbiBwcm9qZWN0IGZvbGRlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRhc2tOb3RlKFxuICBhcHA6IEFwcCxcbiAgcHJvamVjdEZvbGRlclBhdGg6IHN0cmluZyxcbiAgdGl0bGU6IHN0cmluZyxcbiAgcGFyZW50SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICBleHRyYTogUGFydGlhbDxUYXNrPiA9IHt9XG4pOiBQcm9taXNlPFRGaWxlPiB7XG4gIGNvbnN0IGlkID0gbmFub2lkKCk7XG4gIGNvbnN0IHNhZmVOYW1lID0gdGl0bGUucmVwbGFjZSgvW1xcXFwvOio/XCI8PnxdL2csICctJyk7XG4gIGxldCBmaWxlUGF0aDogc3RyaW5nO1xuXG4gIGlmIChwYXJlbnRJZCkge1xuICAgIC8vIFN1YnRhc2tzIGxpdmUgaW4gYSBzdWJmb2xkZXIgbmFtZWQgYWZ0ZXIgcGFyZW50IGlkXG4gICAgY29uc3Qgc3ViRGlyID0gYCR7cHJvamVjdEZvbGRlclBhdGh9LyR7cGFyZW50SWR9YDtcbiAgICBhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBzdWJEaXIpO1xuICAgIGZpbGVQYXRoID0gYCR7c3ViRGlyfS8ke3NhZmVOYW1lfS5tZGA7XG4gIH0gZWxzZSB7XG4gICAgZmlsZVBhdGggPSBgJHtwcm9qZWN0Rm9sZGVyUGF0aH0vJHtzYWZlTmFtZX0ubWRgO1xuICB9XG5cbiAgY29uc3QgdGFzazogUGFydGlhbDxUYXNrPiA9IHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBwYXJlbnRJZCxcbiAgICAuLi5leHRyYSxcbiAgfTtcblxuICBjb25zdCBjb250ZW50ID0gZ2VuZXJhdGVUYXNrRnJvbnRtYXR0ZXIodGFzayk7XG5cbiAgLy8gRW5zdXJlIHByb2plY3QgZm9sZGVyIGV4aXN0c1xuICBhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBwcm9qZWN0Rm9sZGVyUGF0aCk7XG5cbiAgcmV0dXJuIGFwcC52YXVsdC5jcmVhdGUoZmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhIHNwZWNpZmljIGZyb250bWF0dGVyIGZpZWxkIGluIGEgdGFzayBub3RlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVGFza0ZpZWxkKFxuICBhcHA6IEFwcCxcbiAgZmlsZTogVEZpbGUsXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogc3RyaW5nXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgbGV0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTtcbiAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoYF4oJHtrZXl9OlxcXFxzKikoLiopJGAsICdtJyk7XG4gIGlmIChwYXR0ZXJuLnRlc3QoY29udGVudCkpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKHBhdHRlcm4sIGAkMSR7dmFsdWV9YCk7XG4gIH1cbiAgYXdhaXQgYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCBjb250ZW50KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRm9sZGVyKGFwcDogQXBwLCBwYXRoOiBzdHJpbmcpIHtcbiAgaWYgKCFhcHAudmF1bHQuZ2V0Rm9sZGVyQnlQYXRoKHBhdGgpKSB7XG4gICAgYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihwYXRoKTtcbiAgfVxufVxuIiwiLy8gZ2VuZXJhdGVkIGR1cmluZyByZWxlYXNlLCBkbyBub3QgbW9kaWZ5XG5cbi8qKlxuICogVGhlIGN1cnJlbnQgdmVyc2lvbiwgYXMgc2V0IGluIHBhY2thZ2UuanNvbi5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzUuNTMuMyc7XG5leHBvcnQgY29uc3QgUFVCTElDX1ZFUlNJT04gPSAnNSc7XG4iLCJpbXBvcnQgeyBQVUJMSUNfVkVSU0lPTiB9IGZyb20gJy4uL3ZlcnNpb24uanMnO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHQoKHdpbmRvdy5fX3N2ZWx0ZSA/Pz0ge30pLnYgPz89IG5ldyBTZXQoKSkuYWRkKFBVQkxJQ19WRVJTSU9OKTtcbn1cbiIsImltcG9ydCB7IGVuYWJsZV9sZWdhY3lfbW9kZV9mbGFnIH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmVuYWJsZV9sZWdhY3lfbW9kZV9mbGFnKCk7XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICBpbXBvcnQgdHlwZSB7IFRhc2ssIFRhc2tTdGF0dXMgfSBmcm9tICcuLi90eXBlcyc7XG5cbiAgZXhwb3J0IGxldCB0YXNrczogVGFza1tdID0gW107XG4gIGV4cG9ydCBsZXQgb25PcGVuVGFzazogKGZpbGVQYXRoOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgZXhwb3J0IGxldCBvblN0YXR1c0NoYW5nZTogKHRhc2tJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFRhc2tTdGF0dXMpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICB0eXBlIENvbHVtbiA9IHtcbiAgICBpZDogVGFza1N0YXR1cztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gIH07XG5cbiAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBbXG4gICAgeyBpZDogJ3RvZG8nLCAgICAgICAgbGFiZWw6ICfwn5OLIFRvIERvJywgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvci1iYXNlLTMwKScgfSxcbiAgICB7IGlkOiAnaW4tcHJvZ3Jlc3MnLCBsYWJlbDogJ/CflIQgSW4gUHJvZ3Jlc3MnLCAgY29sb3I6ICd2YXIoLS1jb2xvci15ZWxsb3cpJyB9LFxuICAgIHsgaWQ6ICdibG9ja2VkJywgICAgIGxhYmVsOiAn8J+aqyBCbG9ja2VkJywgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yLXJlZCknIH0sXG4gICAgeyBpZDogJ2RvbmUnLCAgICAgICAgbGFiZWw6ICfinIUgRG9uZScsICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3ItZ3JlZW4pJyB9LFxuICBdO1xuXG4gIGZ1bmN0aW9uIGdldFRhc2tzRm9yQ29sdW1uKHN0YXR1czogVGFza1N0YXR1cyk6IFRhc2tbXSB7XG4gICAgcmV0dXJuIHRhc2tzLmZpbHRlcih0ID0+IHQuc3RhdHVzID09PSBzdGF0dXMpO1xuICB9XG5cbiAgLy8g4pSA4pSA4pSAIERyYWcgJiBEcm9wIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBsZXQgZHJhZ2dpbmdJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGxldCBkcmFnT3ZlckNvbDogVGFza1N0YXR1cyB8IG51bGwgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0KHRhc2s6IFRhc2ssIGU6IERyYWdFdmVudCkge1xuICAgIGRyYWdnaW5nSWQgPSB0YXNrLmlkO1xuICAgIGUuZGF0YVRyYW5zZmVyPy5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGFzay5pZCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdPdmVyKGNvbElkOiBUYXNrU3RhdHVzLCBlOiBEcmFnRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZHJhZ092ZXJDb2wgPSBjb2xJZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJvcChjb2xJZDogVGFza1N0YXR1cywgZTogRHJhZ0V2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChkcmFnZ2luZ0lkKSB7XG4gICAgICBvblN0YXR1c0NoYW5nZShkcmFnZ2luZ0lkLCBjb2xJZCk7XG4gICAgICBkcmFnZ2luZ0lkID0gbnVsbDtcbiAgICAgIGRyYWdPdmVyQ29sID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdMZWF2ZSgpIHtcbiAgICBkcmFnT3ZlckNvbCA9IG51bGw7XG4gIH1cblxuICAvLyDilIDilIDilIAgUHJpb3JpdHkgYmFkZ2Ug4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGNvbnN0IHByaW9yaXR5Q29sb3JzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIGxvdzogJyM2YmI2ZmYnLFxuICAgIG1lZGl1bTogJyNmZmNkNWUnLFxuICAgIGhpZ2g6ICcjZmY4YzQyJyxcbiAgICBjcml0aWNhbDogJyNlODQwNDAnLFxuICB9O1xuXG4gIGZ1bmN0aW9uIHByaW9yaXR5TGFiZWwocDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHAuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwLnNsaWNlKDEpO1xuICB9XG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cImthbmJhbi1ib2FyZFwiPlxuICB7I2VhY2ggY29sdW1ucyBhcyBjb2x9XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJrYW5iYW4tY29sdW1uXCJcbiAgICAgIGNsYXNzOmRyYWctb3Zlcj17ZHJhZ092ZXJDb2wgPT09IGNvbC5pZH1cbiAgICAgIG9uOmRyYWdvdmVyPXsoZSkgPT4gb25EcmFnT3Zlcihjb2wuaWQsIGUpfVxuICAgICAgb246ZHJvcD17KGUpID0+IG9uRHJvcChjb2wuaWQsIGUpfVxuICAgICAgb246ZHJhZ2xlYXZlPXtvbkRyYWdMZWF2ZX1cbiAgICAgIHJvbGU9XCJsaXN0XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwia2FuYmFuLWNvbC1oZWFkZXJcIiBzdHlsZT1cImJvcmRlci10b3A6IDNweCBzb2xpZCB7Y29sLmNvbG9yfVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC10aXRsZVwiPntjb2wubGFiZWx9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC1jb3VudFwiPntnZXRUYXNrc0ZvckNvbHVtbihjb2wuaWQpLmxlbmd0aH08L3NwYW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImthbmJhbi1jYXJkc1wiPlxuICAgICAgICB7I2VhY2ggZ2V0VGFza3NGb3JDb2x1bW4oY29sLmlkKSBhcyB0YXNrICh0YXNrLmlkKX1cbiAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgLS0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJrYW5iYW4tY2FyZFwiXG4gICAgICAgICAgICBjbGFzczpkcmFnZ2luZz17ZHJhZ2dpbmdJZCA9PT0gdGFzay5pZH1cbiAgICAgICAgICAgIGRyYWdnYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgb246ZHJhZ3N0YXJ0PXsoZSkgPT4gb25EcmFnU3RhcnQodGFzaywgZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LWNsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgLS0+XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkLXRpdGxlXCJcbiAgICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gb25PcGVuVGFzayh0YXNrLmZpbGVQYXRoKX1cbiAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgIG9uOmtleWRvd249eyhlKSA9PiBlLmtleSA9PT0gJ0VudGVyJyAmJiBvbk9wZW5UYXNrKHRhc2suZmlsZVBhdGgpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzcz1cInByaW9yaXR5LWJhZGdlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQ6e3ByaW9yaXR5Q29sb3JzW3Rhc2sucHJpb3JpdHldID8/ICcjODg4J31cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3ByaW9yaXR5TGFiZWwodGFzay5wcmlvcml0eSl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7I2lmIHRhc2sudGFncy5sZW5ndGggPiAwfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10YWdzXCI+XG4gICAgICAgICAgICAgICAgeyNlYWNoIHRhc2sudGFncyBhcyB0YWd9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZ1wiPiN7dGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey9pZn1cblxuICAgICAgICAgICAgeyNpZiB0YXNrLnN1YnRhc2tzLmxlbmd0aCA+IDB9XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXN1YnRhc2tzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdWJ0YXNrLWNvdW50XCI+XG4gICAgICAgICAgICAgICAgICB7dGFzay5zdWJ0YXNrcy5maWx0ZXIocyA9PiBzLnN0YXR1cyA9PT0gJ2RvbmUnKS5sZW5ndGh9L3t0YXNrLnN1YnRhc2tzLmxlbmd0aH0gc3VidGFza3NcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1YnRhc2stcHJvZ3Jlc3NcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzdWJ0YXNrLWZpbGxcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOnsodGFzay5zdWJ0YXNrcy5maWx0ZXIocz0+cy5zdGF0dXM9PT0nZG9uZScpLmxlbmd0aC90YXNrLnN1YnRhc2tzLmxlbmd0aCkqMTAwfSVcIlxuICAgICAgICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvaWZ9XG5cbiAgICAgICAgICAgIHsjaWYgdGFzay5zdGFydERhdGUgfHwgdGFzay5lbmREYXRlfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1kYXRlc1wiPlxuICAgICAgICAgICAgICAgIHsjaWYgdGFzay5zdGFydERhdGV9PHNwYW4+8J+ThSB7dGFzay5zdGFydERhdGV9PC9zcGFuPnsvaWZ9XG4gICAgICAgICAgICAgICAgeyNpZiB0YXNrLmVuZERhdGV9PHNwYW4+4oaSIHt0YXNrLmVuZERhdGV9PC9zcGFuPnsvaWZ9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey9pZn1cblxuICAgICAgICAgICAgPCEtLSBTdWItdGFzayBleHBhbmQgLS0+XG4gICAgICAgICAgICB7I2lmIHRhc2suc3VidGFza3MubGVuZ3RoID4gMH1cbiAgICAgICAgICAgICAgPGRldGFpbHMgY2xhc3M9XCJzdWJ0YXNrLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8c3VtbWFyeT5TdWJ0YXNrczwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICB7I2VhY2ggdGFzay5zdWJ0YXNrcyBhcyBzdWJ9XG4gICAgICAgICAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInN1YnRhc2staXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gb25PcGVuVGFzayhzdWIuZmlsZVBhdGgpfVxuICAgICAgICAgICAgICAgICAgICBvbjprZXlkb3duPXsoZSkgPT4gZS5rZXkgPT09ICdFbnRlcicgJiYgb25PcGVuVGFzayhzdWIuZmlsZVBhdGgpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN1YnRhc2stc3RhdHVzIHN0YXR1cy17c3ViLnN0YXR1c31cIj7il488L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntzdWIudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7L2VhY2h9XG5cbiAgICAgICAgeyNpZiBnZXRUYXNrc0ZvckNvbHVtbihjb2wuaWQpLmxlbmd0aCA9PT0gMH1cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwia2FuYmFuLWVtcHR5XCI+RHJvcCB0YXNrcyBoZXJlPC9kaXY+XG4gICAgICAgIHsvaWZ9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgey9lYWNofVxuPC9kaXY+XG5cbjxzdHlsZT5cbiAgLmthbmJhbi1ib2FyZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDEycHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgfVxuXG4gIC5rYW5iYW4tY29sdW1uIHtcbiAgICBmbGV4OiAwIDAgMjYwcHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDEyMHB4KTtcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMTVzO1xuICB9XG5cbiAgLmthbmJhbi1jb2x1bW4uZHJhZy1vdmVyIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgfVxuXG4gIC5rYW5iYW4tY29sLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxMHB4IDE0cHggOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMCAwO1xuICB9XG5cbiAgLmNvbC10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBmb250LXNpemU6IDAuOWVtO1xuICB9XG5cbiAgLmNvbC1jb3VudCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMXB4IDhweDtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cblxuICAua2FuYmFuLWNhcmRzIHtcbiAgICBwYWRkaW5nOiA4cHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDhweDtcbiAgfVxuXG4gIC5rYW5iYW4tY2FyZCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgICBjdXJzb3I6IGdyYWI7XG4gICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjE1cywgb3BhY2l0eSAwLjE1cztcbiAgfVxuXG4gIC5rYW5iYW4tY2FyZDpob3ZlciB7XG4gICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4xNSk7XG4gIH1cblxuICAua2FuYmFuLWNhcmQuZHJhZ2dpbmcge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgfVxuXG4gIC5jYXJkLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiA2cHg7XG4gIH1cblxuICAuY2FyZC10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDAuOWVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1hY2NlbnQpO1xuICAgIGZsZXg6IDE7XG4gICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgfVxuXG4gIC5jYXJkLXRpdGxlOmhvdmVyIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxuXG4gIC5wcmlvcml0eS1iYWRnZSB7XG4gICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHBhZGRpbmc6IDJweCA2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGNvbG9yOiAjMDAwO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cblxuICAuY2FyZC10YWdzIHtcbiAgICBtYXJnaW4tdG9wOiA2cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgZ2FwOiA0cHg7XG4gIH1cblxuICAudGFnIHtcbiAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIHBhZGRpbmc6IDFweCA1cHg7XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgLmNhcmQtc3VidGFza3Mge1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgfVxuXG4gIC5zdWJ0YXNrLWNvdW50IHtcbiAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gIH1cblxuICAuc3VidGFzay1wcm9ncmVzcyB7XG4gICAgaGVpZ2h0OiA0cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBtYXJnaW4tdG9wOiAzcHg7XG4gIH1cblxuICAuc3VidGFzay1maWxsIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItZ3JlZW4pO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzO1xuICB9XG5cbiAgLmNhcmQtZGF0ZXMge1xuICAgIG1hcmdpbi10b3A6IDZweDtcbiAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDZweDtcbiAgfVxuXG4gIC5zdWJ0YXNrLWxpc3Qge1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICBmb250LXNpemU6IDAuODJlbTtcbiAgfVxuXG4gIC5zdWJ0YXNrLWxpc3Qgc3VtbWFyeSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgfVxuXG4gIC5zdWJ0YXNrLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBwYWRkaW5nOiAzcHggNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgbWFyZ2luLXRvcDogMnB4O1xuICB9XG5cbiAgLnN1YnRhc2staXRlbTpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3Zlcik7XG4gIH1cblxuICAuc3VidGFzay1zdGF0dXMge1xuICAgIGZvbnQtc2l6ZTogMC43ZW07XG4gIH1cblxuICAuc3RhdHVzLXRvZG8gICAgICAgIHsgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpOyB9XG4gIC5zdGF0dXMtaW4tcHJvZ3Jlc3MgeyBjb2xvcjogdmFyKC0tY29sb3IteWVsbG93KTsgfVxuICAuc3RhdHVzLWRvbmUgICAgICAgIHsgY29sb3I6IHZhcigtLWNvbG9yLWdyZWVuKTsgfVxuICAuc3RhdHVzLWJsb2NrZWQgICAgIHsgY29sb3I6IHZhcigtLWNvbG9yLXJlZCk7IH1cblxuICAua2FuYmFuLWVtcHR5IHtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1mYWludCk7XG4gICAgZm9udC1zaXplOiAwLjg1ZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDI0cHggOHB4O1xuICAgIGJvcmRlcjogMXB4IGRhc2hlZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICB9XG48L3N0eWxlPlxuIiwiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IHR5cGUgeyBUYXNrLCBTdWJ0YXNrIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4gIGV4cG9ydCBsZXQgdGFza3M6IFRhc2tbXSA9IFtdO1xuICBleHBvcnQgbGV0IG9uT3BlblRhc2s6IChmaWxlUGF0aDogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIGV4cG9ydCBsZXQgb25EYXRlQ2hhbmdlOiAodGFza0lkOiBzdHJpbmcsIHN0YXJ0RGF0ZTogc3RyaW5nLCBlbmREYXRlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvLyDilIDilIDilIAgVGltZWxpbmUgY29uZmlndXJhdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgY29uc3QgREFZX1dJRFRIID0gMzI7IC8vIHB4IHBlciBkYXlcbiAgY29uc3QgUk9XX0hFSUdIVCA9IDQwOyAvLyBweCBwZXIgcm93XG5cbiAgLy8gQ29tcHV0ZSB0aGUgZGF0ZSByYW5nZSB0byBkaXNwbGF5OiBmcm9tIGVhcmxpZXN0IHRhc2sgc3RhcnQgKG9yIHRvZGF5LTcpIHRvIGxhdGVzdCBlbmQgKG9yIHRvZGF5KzYwKVxuICAkOiBkYXRlUmFuZ2UgPSBjb21wdXRlRGF0ZVJhbmdlKHRhc2tzKTtcblxuICBmdW5jdGlvbiBjb21wdXRlRGF0ZVJhbmdlKHRhc2tzOiBUYXNrW10pOiB7IHN0YXJ0OiBEYXRlOyBkYXlzOiBudW1iZXIgfSB7XG4gICAgbGV0IGVhcmxpZXN0OiBEYXRlIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGxhdGVzdDogRGF0ZSB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY29sbGVjdCA9ICh0OiBUYXNrIHwgU3VidGFzaykgPT4ge1xuICAgICAgaWYgKHQuc3RhcnREYXRlKSB7XG4gICAgICAgIGNvbnN0IGQgPSBwYXJzZURhdGUodC5zdGFydERhdGUpO1xuICAgICAgICBpZiAoIWVhcmxpZXN0IHx8IGQgPCBlYXJsaWVzdCkgZWFybGllc3QgPSBkO1xuICAgICAgfVxuICAgICAgaWYgKCh0IGFzIFRhc2spLmVuZERhdGUpIHtcbiAgICAgICAgY29uc3QgZCA9IHBhcnNlRGF0ZSgodCBhcyBUYXNrKS5lbmREYXRlISk7XG4gICAgICAgIGlmICghbGF0ZXN0IHx8IGQgPiBsYXRlc3QpIGxhdGVzdCA9IGQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRhc2tzLmZvckVhY2godCA9PiB7XG4gICAgICBjb2xsZWN0KHQpO1xuICAgICAgdC5zdWJ0YXNrcz8uZm9yRWFjaChjb2xsZWN0KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIGlmICghZWFybGllc3QpIHtcbiAgICAgIGVhcmxpZXN0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgZWFybGllc3Quc2V0RGF0ZShlYXJsaWVzdC5nZXREYXRlKCkgLSA3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZSA9IG5ldyBEYXRlKGVhcmxpZXN0KTtcbiAgICAgIGUuc2V0RGF0ZShlLmdldERhdGUoKSAtIDUpO1xuICAgICAgZWFybGllc3QgPSBlO1xuICAgIH1cblxuICAgIGlmICghbGF0ZXN0KSB7XG4gICAgICBsYXRlc3QgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBsYXRlc3Quc2V0RGF0ZShsYXRlc3QuZ2V0RGF0ZSgpICsgNjApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsID0gbmV3IERhdGUobGF0ZXN0KTtcbiAgICAgIGwuc2V0RGF0ZShsLmdldERhdGUoKSArIDEwKTtcbiAgICAgIGxhdGVzdCA9IGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGF5cyA9IE1hdGguY2VpbCgobGF0ZXN0LmdldFRpbWUoKSAtIGVhcmxpZXN0LmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgKyAxO1xuICAgIHJldHVybiB7IHN0YXJ0OiBlYXJsaWVzdCwgZGF5cyB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VEYXRlKHM6IHN0cmluZyk6IERhdGUge1xuICAgIGNvbnN0IFt5LCBtLCBkXSA9IHMuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9JU09EYXRlKGQ6IERhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpfWA7XG4gIH1cblxuICBmdW5jdGlvbiBkYXlJbmRleChkYXRlU3RyOiBzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgICBpZiAoIWRhdGVTdHIpIHJldHVybiAtMTtcbiAgICBjb25zdCBkID0gcGFyc2VEYXRlKGRhdGVTdHIpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKChkLmdldFRpbWUoKSAtIGRhdGVSYW5nZS5zdGFydC5nZXRUaW1lKCkpIC8gODY0MDAwMDApO1xuICB9XG5cbiAgLy8g4pSA4pSA4pSAIEhlYWRlcjogbW9udGhzICsgZGF5cyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgJDogaGVhZGVyTW9udGhzID0gYnVpbGRNb250aEhlYWRlcnMoZGF0ZVJhbmdlKTtcblxuICB0eXBlIE1vbnRoSGVhZGVyID0geyBsYWJlbDogc3RyaW5nOyBzcGFuOiBudW1iZXIgfTtcbiAgZnVuY3Rpb24gYnVpbGRNb250aEhlYWRlcnMoeyBzdGFydCwgZGF5cyB9OiB7IHN0YXJ0OiBEYXRlOyBkYXlzOiBudW1iZXIgfSk6IE1vbnRoSGVhZGVyW10ge1xuICAgIGNvbnN0IG1vbnRoczogTW9udGhIZWFkZXJbXSA9IFtdO1xuICAgIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XG4gICAgY3VyLnNldEhvdXJzKDAsMCwwLDApO1xuXG4gICAgbGV0IHJlbWFpbmluZyA9IGRheXM7XG4gICAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGNvbnN0IHllYXIgPSBjdXIuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGNvbnN0IG1vbnRoID0gY3VyLmdldE1vbnRoKCk7XG4gICAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICAgICAgY29uc3QgZGF5T2ZNb250aCA9IGN1ci5nZXREYXRlKCk7XG4gICAgICBjb25zdCBzcGFuID0gTWF0aC5taW4oZGF5c0luTW9udGggLSBkYXlPZk1vbnRoICsgMSwgcmVtYWluaW5nKTtcbiAgICAgIG1vbnRocy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IGN1ci50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdsb25nJywgeWVhcjogJ251bWVyaWMnIH0pLFxuICAgICAgICBzcGFuLFxuICAgICAgfSk7XG4gICAgICBjdXIgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5T2ZNb250aCArIHNwYW4pO1xuICAgICAgcmVtYWluaW5nIC09IHNwYW47XG4gICAgfVxuICAgIHJldHVybiBtb250aHM7XG4gIH1cblxuICAkOiBkYXlIZWFkZXJzID0gYnVpbGREYXlIZWFkZXJzKGRhdGVSYW5nZSk7XG5cbiAgdHlwZSBEYXlIZWFkZXIgPSB7IGRheTogbnVtYmVyOyBkYXRlOiBEYXRlOyBpc1dlZWtlbmQ6IGJvb2xlYW47IGlzVG9kYXk6IGJvb2xlYW4gfTtcbiAgZnVuY3Rpb24gYnVpbGREYXlIZWFkZXJzKHsgc3RhcnQsIGRheXMgfTogeyBzdGFydDogRGF0ZTsgZGF5czogbnVtYmVyIH0pOiBEYXlIZWFkZXJbXSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyB0b2RheS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogZGF5cyB9LCAoXywgaSkgPT4ge1xuICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0YXJ0KTtcbiAgICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIGkpO1xuICAgICAgY29uc3QgZG93ID0gZC5nZXREYXkoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRheTogZC5nZXREYXRlKCksXG4gICAgICAgIGRhdGU6IGQsXG4gICAgICAgIGlzV2Vla2VuZDogZG93ID09PSAwIHx8IGRvdyA9PT0gNixcbiAgICAgICAgaXNUb2RheTogZC5nZXRUaW1lKCkgPT09IHRvZGF5LmdldFRpbWUoKSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvLyDilIDilIDilIAgRmxhdCByb3cgbGlzdCAodGFza3MgKyBzdWJ0YXNrcyBpbnRlcmxlYXZlZCkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIHR5cGUgR2FudHRSb3cgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGZpbGVQYXRoOiBzdHJpbmc7XG4gICAgc3RhcnREYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIGVuZERhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgaXNTdWJ0YXNrOiBib29sZWFuO1xuICAgIGRlcHRoOiBudW1iZXI7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gIH07XG5cbiAgJDogcm93cyA9IGJ1aWxkUm93cyh0YXNrcyk7XG5cbiAgbGV0IGV4cGFuZGVkOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcblxuICBmdW5jdGlvbiB0b2dnbGVFeHBhbmQoaWQ6IHN0cmluZykge1xuICAgIGlmIChleHBhbmRlZC5oYXMoaWQpKSB7XG4gICAgICBleHBhbmRlZC5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBhbmRlZC5hZGQoaWQpO1xuICAgIH1cbiAgICBleHBhbmRlZCA9IGV4cGFuZGVkOyAvLyB0cmlnZ2VyIHJlYWN0aXZpdHlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkUm93cyh0YXNrczogVGFza1tdKTogR2FudHRSb3dbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBHYW50dFJvd1tdID0gW107XG4gICAgZm9yIChjb25zdCB0IG9mIHRhc2tzKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIGlkOiB0LmlkLFxuICAgICAgICB0aXRsZTogdC50aXRsZSxcbiAgICAgICAgZmlsZVBhdGg6IHQuZmlsZVBhdGgsXG4gICAgICAgIHN0YXJ0RGF0ZTogdC5zdGFydERhdGUsXG4gICAgICAgIGVuZERhdGU6IHQuZW5kRGF0ZSxcbiAgICAgICAgaXNTdWJ0YXNrOiBmYWxzZSxcbiAgICAgICAgZGVwdGg6IDAsXG4gICAgICAgIHN0YXR1czogdC5zdGF0dXMsXG4gICAgICB9KTtcbiAgICAgIGlmICh0LnN1YnRhc2tzLmxlbmd0aCA+IDAgJiYgZXhwYW5kZWQuaGFzKHQuaWQpKSB7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0LnN1YnRhc2tzKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgaWQ6IHMuaWQsXG4gICAgICAgICAgICB0aXRsZTogcy50aXRsZSxcbiAgICAgICAgICAgIGZpbGVQYXRoOiBzLmZpbGVQYXRoLFxuICAgICAgICAgICAgc3RhcnREYXRlOiBzLnN0YXJ0RGF0ZSA/PyBudWxsLFxuICAgICAgICAgICAgZW5kRGF0ZTogKHMgYXMgYW55KS5lbmREYXRlID8/IG51bGwsXG4gICAgICAgICAgICBpc1N1YnRhc2s6IHRydWUsXG4gICAgICAgICAgICBkZXB0aDogMSxcbiAgICAgICAgICAgIHN0YXR1czogcy5zdGF0dXMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIOKUgOKUgOKUgCBEcmFnZ2luZyBHYW50dCBiYXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICB0eXBlIERyYWdTdGF0ZSA9IHtcbiAgICByb3dJZDogc3RyaW5nO1xuICAgIHR5cGU6ICdtb3ZlJyB8ICdyZXNpemUtc3RhcnQnIHwgJ3Jlc2l6ZS1lbmQnO1xuICAgIHN0YXJ0WDogbnVtYmVyO1xuICAgIG9yaWdTdGFydERheTogbnVtYmVyO1xuICAgIG9yaWdFbmREYXk6IG51bWJlcjtcbiAgfSB8IG51bGw7XG5cbiAgbGV0IGRyYWdTdGF0ZTogRHJhZ1N0YXRlID0gbnVsbDtcbiAgbGV0IGJhck92ZXJyaWRlczogTWFwPHN0cmluZywgeyBzdGFydERheTogbnVtYmVyOyBlbmREYXk6IG51bWJlciB9PiA9IG5ldyBNYXAoKTtcblxuICBmdW5jdGlvbiBnZXRCYXIocm93OiBHYW50dFJvdyk6IHsgc3RhcnREYXk6IG51bWJlcjsgZW5kRGF5OiBudW1iZXIgfSB8IG51bGwge1xuICAgIGNvbnN0IG92ZXJyaWRlID0gYmFyT3ZlcnJpZGVzLmdldChyb3cuaWQpO1xuICAgIGlmIChvdmVycmlkZSkgcmV0dXJuIG92ZXJyaWRlO1xuICAgIGNvbnN0IHMgPSBkYXlJbmRleChyb3cuc3RhcnREYXRlKTtcbiAgICBjb25zdCBlID0gZGF5SW5kZXgocm93LmVuZERhdGUpO1xuICAgIGlmIChzIDwgMCB8fCBlIDwgMCB8fCBlIDwgcykgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHsgc3RhcnREYXk6IHMsIGVuZERheTogZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gb25CYXJNb3VzZURvd24ocm93OiBHYW50dFJvdywgdHlwZTogJ21vdmUnIHwgJ3Jlc2l6ZS1zdGFydCcgfCAncmVzaXplLWVuZCcsIGU6IE1vdXNlRXZlbnQpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGJhciA9IGdldEJhcihyb3cpO1xuICAgIGlmICghYmFyKSByZXR1cm47XG4gICAgZHJhZ1N0YXRlID0ge1xuICAgICAgcm93SWQ6IHJvdy5pZCxcbiAgICAgIHR5cGUsXG4gICAgICBzdGFydFg6IGUuY2xpZW50WCxcbiAgICAgIG9yaWdTdGFydERheTogYmFyLnN0YXJ0RGF5LFxuICAgICAgb3JpZ0VuZERheTogYmFyLmVuZERheSxcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgIGlmICghZHJhZ1N0YXRlKSByZXR1cm47XG4gICAgY29uc3QgZHggPSBlLmNsaWVudFggLSBkcmFnU3RhdGUuc3RhcnRYO1xuICAgIGNvbnN0IGRheURlbHRhID0gTWF0aC5yb3VuZChkeCAvIERBWV9XSURUSCk7XG5cbiAgICBsZXQgbmV3U3RhcnQgPSBkcmFnU3RhdGUub3JpZ1N0YXJ0RGF5O1xuICAgIGxldCBuZXdFbmQgPSBkcmFnU3RhdGUub3JpZ0VuZERheTtcblxuICAgIGlmIChkcmFnU3RhdGUudHlwZSA9PT0gJ21vdmUnKSB7XG4gICAgICBuZXdTdGFydCA9IE1hdGgubWF4KDAsIGRyYWdTdGF0ZS5vcmlnU3RhcnREYXkgKyBkYXlEZWx0YSk7XG4gICAgICBuZXdFbmQgPSBuZXdTdGFydCArIChkcmFnU3RhdGUub3JpZ0VuZERheSAtIGRyYWdTdGF0ZS5vcmlnU3RhcnREYXkpO1xuICAgIH0gZWxzZSBpZiAoZHJhZ1N0YXRlLnR5cGUgPT09ICdyZXNpemUtc3RhcnQnKSB7XG4gICAgICBuZXdTdGFydCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRyYWdTdGF0ZS5vcmlnU3RhcnREYXkgKyBkYXlEZWx0YSwgZHJhZ1N0YXRlLm9yaWdFbmREYXkgLSAxKSk7XG4gICAgfSBlbHNlIGlmIChkcmFnU3RhdGUudHlwZSA9PT0gJ3Jlc2l6ZS1lbmQnKSB7XG4gICAgICBuZXdFbmQgPSBNYXRoLm1heChkcmFnU3RhdGUub3JpZ1N0YXJ0RGF5ICsgMSwgZHJhZ1N0YXRlLm9yaWdFbmREYXkgKyBkYXlEZWx0YSk7XG4gICAgfVxuXG4gICAgYmFyT3ZlcnJpZGVzLnNldChkcmFnU3RhdGUucm93SWQsIHsgc3RhcnREYXk6IG5ld1N0YXJ0LCBlbmREYXk6IG5ld0VuZCB9KTtcbiAgICBiYXJPdmVycmlkZXMgPSBiYXJPdmVycmlkZXM7IC8vIHRyaWdnZXIgcmVhY3Rpdml0eVxuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgIGlmIChkcmFnU3RhdGUpIHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gYmFyT3ZlcnJpZGVzLmdldChkcmFnU3RhdGUucm93SWQpO1xuICAgICAgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gbmV3IERhdGUoZGF0ZVJhbmdlLnN0YXJ0KTtcbiAgICAgICAgbmV3U3RhcnQuc2V0RGF0ZShuZXdTdGFydC5nZXREYXRlKCkgKyBvdmVycmlkZS5zdGFydERheSk7XG4gICAgICAgIGNvbnN0IG5ld0VuZCA9IG5ldyBEYXRlKGRhdGVSYW5nZS5zdGFydCk7XG4gICAgICAgIG5ld0VuZC5zZXREYXRlKG5ld0VuZC5nZXREYXRlKCkgKyBvdmVycmlkZS5lbmREYXkpO1xuICAgICAgICBvbkRhdGVDaGFuZ2UoZHJhZ1N0YXRlLnJvd0lkLCB0b0lTT0RhdGUobmV3U3RhcnQpLCB0b0lTT0RhdGUobmV3RW5kKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGRyYWdTdGF0ZSA9IG51bGw7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gIH1cblxuICAvLyDilIDilIDilIAgQ2xpY2sgb24gZW1wdHkgY2VsbCB0byBjcmVhdGUgYmFyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBmdW5jdGlvbiBvbkNlbGxDbGljayhyb3c6IEdhbnR0Um93LCBkYXlJZHg6IG51bWJlcikge1xuICAgIGlmIChnZXRCYXIocm93KSkgcmV0dXJuOyAvLyBhbHJlYWR5IGhhcyBhIGJhclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZGF0ZVJhbmdlLnN0YXJ0KTtcbiAgICBzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSArIGRheUlkeCk7XG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoc3RhcnQpO1xuICAgIGVuZC5zZXREYXRlKGVuZC5nZXREYXRlKCkgKyA0KTtcbiAgICBvbkRhdGVDaGFuZ2Uocm93LmlkLCB0b0lTT0RhdGUoc3RhcnQpLCB0b0lTT0RhdGUoZW5kKSk7XG4gIH1cblxuICAvLyDilIDilIDilIAgVG9kYXkgbWFya2VyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAkOiB0b2RheUlkeCA9ICgoKSA9PiB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyB0b2RheS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigodG9kYXkuZ2V0VGltZSgpIC0gZGF0ZVJhbmdlLnN0YXJ0LmdldFRpbWUoKSkgLyA4NjQwMDAwMCk7XG4gIH0pKCk7XG5cbiAgLy8g4pSA4pSA4pSAIFN0YXR1cyBjb2xvcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGNvbnN0IHN0YXR1c0NvbG9yczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAndG9kbyc6ICAgICAgICAnIzZiYjZmZicsXG4gICAgJ2luLXByb2dyZXNzJzogJyNmZmNkNWUnLFxuICAgICdibG9ja2VkJzogICAgICcjZTg0MDQwJyxcbiAgICAnZG9uZSc6ICAgICAgICAnIzRjYWY1MCcsXG4gIH07XG5cbiAgLy8g4pSA4pSA4pSAIFNjcm9sbCBzeW5jOiByaWdodCBwYW5lbCBkcml2ZXMgbGVmdCByb3dzIHZlcnRpY2FsbHkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGxldCBsZWZ0Um93c0VsOiBIVE1MRWxlbWVudDtcbiAgbGV0IHJpZ2h0UGFuZWxFbDogSFRNTEVsZW1lbnQ7XG5cbiAgZnVuY3Rpb24gc3luY1Njcm9sbCgpIHtcbiAgICBpZiAobGVmdFJvd3NFbCAmJiByaWdodFBhbmVsRWwpIHtcbiAgICAgIGxlZnRSb3dzRWwuc2Nyb2xsVG9wID0gcmlnaHRQYW5lbEVsLnNjcm9sbFRvcDtcbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwiZ2FudHQtd3JhcHBlclwiPlxuICA8IS0tXG4gICAgTGF5b3V0OlxuICAgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgIOKUgiAgTEVGVCBIRUFERVIgICAg4pSCICBSSUdIVCBIRUFERVIgKHN0aWNreSwgc2Nyb2xscyBob3JpeikgICAg4pSCXG4gICAg4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAg4pSCICBMRUZUIFJPV1MgICAgICDilIIgIFJJR0hUIFJPV1MgKGdyaWQgY2VsbHMgKyBiYXJzKSAgICAgICAgICDilIJcbiAgICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICBUaGUgb3V0ZXIgd3JhcHBlciBpcyBkaXNwbGF5OmZsZXguIExlZnQgaXMgYSBmaXhlZC13aWR0aCBmbGV4IGNvbHVtbi5cbiAgICBSaWdodCBpcyBhIGZsZXgtMSBkaXYgd2l0aCBvdmVyZmxvdzphdXRvIHRoYXQgY29udGFpbnMgYSBzaW5nbGUgaW5uZXJcbiAgICBkaXYgd2lkZSBlbm91Z2ggZm9yIGFsbCBkYXlzLiAgVGhlIG1vbnRoK2RheSBoZWFkZXJzIGFyZSBzdGlja3kgaW5zaWRlXG4gICAgdGhhdCBzY3JvbGxpbmcgY29udGFpbmVyLlxuICAtLT5cblxuICA8IS0tIOKUgOKUgCBMRUZUIGNvbHVtbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG4gIDxkaXYgY2xhc3M9XCJnYW50dC1sZWZ0XCI+XG4gICAgPCEtLSBCbGFuayBoZWFkZXIgc3BhY2VycyAoaGVpZ2h0IG11c3QgbWF0Y2ggcmlnaHQgaGVhZGVyKSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwibGVmdC1oZWFkZXItc3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVmdC1tb250aC1zcGFjZXJcIj5Nb250aDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImxlZnQtZGF5LXNwYWNlclwiPlRhc2s8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gVGFzayBuYW1lIHJvd3MgKG5vIGluZGVwZW5kZW50IHNjcm9sbCDigJQgc2Nyb2xscyB3aXRoIHRoZSByaWdodCBwYW5lbCB2aWEgSlMgc3luYykgLS0+XG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LWxlZnQtcm93c1wiIGJpbmQ6dGhpcz17bGVmdFJvd3NFbH0+XG4gICAgICB7I2VhY2ggcm93cyBhcyByb3cgKHJvdy5pZCl9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImdhbnR0LWxlZnQtcm93XCJcbiAgICAgICAgICBjbGFzczpzdWJ0YXNrLXJvdz17cm93LmlzU3VidGFza31cbiAgICAgICAgICBzdHlsZT1cImhlaWdodDp7Uk9XX0hFSUdIVH1weDsgcGFkZGluZy1sZWZ0Ons4ICsgcm93LmRlcHRoICogMTh9cHhcIlxuICAgICAgICA+XG4gICAgICAgICAgeyNpZiAhcm93LmlzU3VidGFza31cbiAgICAgICAgICAgIHtAY29uc3QgdGFzayA9IHRhc2tzLmZpbmQodCA9PiB0LmlkID09PSByb3cuaWQpfVxuICAgICAgICAgICAgeyNpZiB0YXNrICYmIHRhc2suc3VidGFza3MubGVuZ3RoID4gMH1cbiAgICAgICAgICAgICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAtLT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImV4cGFuZC1idG5cIiBvbjpjbGljaz17KCkgPT4gdG9nZ2xlRXhwYW5kKHJvdy5pZCl9IGFyaWEtbGFiZWw9XCJUb2dnbGUgc3VidGFza3NcIj5cbiAgICAgICAgICAgICAgICB7ZXhwYW5kZWQuaGFzKHJvdy5pZCkgPyAn4pa+JyA6ICfilrgnfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJleHBhbmQtcGxhY2Vob2xkZXJcIj48L3NwYW4+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZXhwYW5kLXBsYWNlaG9sZGVyXCI+PC9zcGFuPlxuICAgICAgICAgIHsvaWZ9XG5cbiAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzcz1cImdhbnR0LXRhc2stbGlua1wiXG4gICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gb25PcGVuVGFzayhyb3cuZmlsZVBhdGgpfVxuICAgICAgICAgICAgb246a2V5ZG93bj17KGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIG9uT3BlblRhc2socm93LmZpbGVQYXRoKX1cbiAgICAgICAgICAgIHJvbGU9XCJsaW5rXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICB0aXRsZT17cm93LnRpdGxlfVxuICAgICAgICAgID57cm93LnRpdGxlfTwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3RhdHVzLWRvdFwiIHN0eWxlPVwiYmFja2dyb3VuZDp7c3RhdHVzQ29sb3JzW3Jvdy5zdGF0dXNdID8/ICcjODg4J31cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgey9lYWNofVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8IS0tIOKUgOKUgCBSSUdIVCBjb2x1bW4g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAIC0tPlxuICA8ZGl2IGNsYXNzPVwiZ2FudHQtcmlnaHRcIiBiaW5kOnRoaXM9e3JpZ2h0UGFuZWxFbH0gb246c2Nyb2xsPXtzeW5jU2Nyb2xsfT5cbiAgICA8IS0tIElubmVyIGNvbnRhaW5lciBzaXplZCB0byBmdWxsIHRpbWVsaW5lIHdpZHRoIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1pbm5lclwiIHN0eWxlPVwid2lkdGg6e2RhdGVSYW5nZS5kYXlzICogREFZX1dJRFRIfXB4XCI+XG5cbiAgICAgIDwhLS0gU3RpY2t5IGhlYWRlcjogbW9udGhzIHJvdyAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1oZWFkZXItbW9udGhzXCI+XG4gICAgICAgIHsjZWFjaCBoZWFkZXJNb250aHMgYXMgbX1cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbW9udGgtY2VsbFwiIHN0eWxlPVwid2lkdGg6e20uc3BhbiAqIERBWV9XSURUSH1weFwiPnttLmxhYmVsfTwvZGl2PlxuICAgICAgICB7L2VhY2h9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBTdGlja3kgaGVhZGVyOiBkYXlzIHJvdyAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1oZWFkZXItZGF5c1wiPlxuICAgICAgICB7I2VhY2ggZGF5SGVhZGVycyBhcyBkaH1cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImdhbnR0LWRheS1jZWxsXCJcbiAgICAgICAgICAgIGNsYXNzOndlZWtlbmQ9e2RoLmlzV2Vla2VuZH1cbiAgICAgICAgICAgIGNsYXNzOnRvZGF5LWNvbD17ZGguaXNUb2RheX1cbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6e0RBWV9XSURUSH1weFwiXG4gICAgICAgICAgPntkaC5kYXl9PC9kaXY+XG4gICAgICAgIHsvZWFjaH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIEdyaWQgcm93cyArIGJhcnMgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtcm93cy1jb250YWluZXJcIiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPlxuICAgICAgICA8IS0tIFRvZGF5IHZlcnRpY2FsIG1hcmtlciAtLT5cbiAgICAgICAgeyNpZiB0b2RheUlkeCA+PSAwICYmIHRvZGF5SWR4IDwgZGF0ZVJhbmdlLmRheXN9XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJ0b2RheS1saW5lXCJcbiAgICAgICAgICAgIHN0eWxlPVwibGVmdDp7dG9kYXlJZHggKiBEQVlfV0lEVEggKyBEQVlfV0lEVEggLyAyfXB4OyBoZWlnaHQ6e3Jvd3MubGVuZ3RoICogUk9XX0hFSUdIVH1weFwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICB7L2lmfVxuXG4gICAgICAgIHsjZWFjaCByb3dzIGFzIHJvdyAocm93LmlkKX1cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtZ3JpZC1yb3dcIiBzdHlsZT1cImhlaWdodDp7Uk9XX0hFSUdIVH1weFwiPlxuICAgICAgICAgICAgPCEtLSBCYWNrZ3JvdW5kIGRheSBjZWxscyAtLT5cbiAgICAgICAgICAgIHsjZWFjaCBkYXlIZWFkZXJzIGFzIGRoLCBpfVxuICAgICAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJnYW50dC1ncmlkLWNlbGxcIlxuICAgICAgICAgICAgICAgIGNsYXNzOndlZWtlbmQ9e2RoLmlzV2Vla2VuZH1cbiAgICAgICAgICAgICAgICBjbGFzczp0b2RheS1jb2w9e2RoLmlzVG9kYXl9XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDp7REFZX1dJRFRIfXB4XCJcbiAgICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gb25DZWxsQ2xpY2socm93LCBpKX1cbiAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2V0IGRhdGVcIlxuICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICB7L2VhY2h9XG5cbiAgICAgICAgICAgIDwhLS0gQmFyIC0tPlxuICAgICAgICAgICAgeyNpZiBnZXRCYXIocm93KX1cbiAgICAgICAgICAgICAge0Bjb25zdCBiYXIgPSBnZXRCYXIocm93KSF9XG4gICAgICAgICAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW5vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAtLT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZ2FudHQtYmFyXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImxlZnQ6e2Jhci5zdGFydERheSAqIERBWV9XSURUSH1weDsgd2lkdGg6eyhiYXIuZW5kRGF5IC0gYmFyLnN0YXJ0RGF5ICsgMSkgKiBEQVlfV0lEVEh9cHg7IGJhY2tncm91bmQ6e3N0YXR1c0NvbG9yc1tyb3cuc3RhdHVzXSA/PyAnIzZiYjZmZid9OyB0b3A6eyhST1dfSEVJR0hUIC0gMjQpIC8gMn1weDtcIlxuICAgICAgICAgICAgICAgIG9uOm1vdXNlZG93bj17KGUpID0+IG9uQmFyTW91c2VEb3duKHJvdywgJ21vdmUnLCBlKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW5vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyLWhhbmRsZSBiYXItaGFuZGxlLWxlZnRcIiAgb246bW91c2Vkb3duPXsoZSkgPT4gb25CYXJNb3VzZURvd24ocm93LCAncmVzaXplLXN0YXJ0JywgZSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFyLWxhYmVsXCI+e3Jvdy50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zIC0tPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXItaGFuZGxlIGJhci1oYW5kbGUtcmlnaHRcIiBvbjptb3VzZWRvd249eyhlKSA9PiBvbkJhck1vdXNlRG93bihyb3csICdyZXNpemUtZW5kJywgZSl9PjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvZWFjaH1cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+PCEtLSAvZ2FudHQtaW5uZXIgLS0+XG4gIDwvZGl2PjwhLS0gL2dhbnR0LXJpZ2h0IC0tPlxuPC9kaXY+XG5cbjxzdHlsZT5cbiAgLyog4pSA4pSAIE91dGVyIHdyYXBwZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG4gIC5nYW50dC13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICB9XG5cbiAgLyog4pSA4pSAIExlZnQgcGFuZWwg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG4gIC5nYW50dC1sZWZ0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgd2lkdGg6IDI2MHB4O1xuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICAvKiBvdmVyZmxvdyBoaWRkZW4gc28gaG9yaXpvbnRhbCBjb250ZW50IGRvZXNuJ3QgYmxlZWQgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLyogU3BhY2VyIG11c3QgbWF0Y2ggdGhlIGV4YWN0IHBpeGVsIGhlaWdodHMgb2YgdGhlIHJpZ2h0LXBhbmVsIGhlYWRlcnMgKi9cbiAgLmxlZnQtaGVhZGVyLXNwYWNlciB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgfVxuXG4gIC5sZWZ0LW1vbnRoLXNwYWNlciB7XG4gICAgaGVpZ2h0OiAyOHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xuICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGZvbnQtc2l6ZTogMC43OGVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgfVxuXG4gIC5sZWZ0LWRheS1zcGFjZXIge1xuICAgIGhlaWdodDogMjhweDtcbiAgICBsaW5lLWhlaWdodDogMjhweDtcbiAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgZm9udC1zaXplOiAwLjc4ZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xuICB9XG5cbiAgLyogTGVmdCByb3dzIOKAlCBvdmVyZmxvdy15IGhpZGRlbjsgdmVydGljYWwgc2Nyb2xsIGlzIGRyaXZlbiBieSB0aGUgcmlnaHQgcGFuZWwgKi9cbiAgLmdhbnR0LWxlZnQtcm93cyB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmbGV4OiAxO1xuICB9XG5cbiAgLmdhbnR0LWxlZnQtcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyLWhvdmVyKTtcbiAgICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgLmdhbnR0LWxlZnQtcm93LnN1YnRhc2stcm93IHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeS1hbHQpO1xuICAgIGZvbnQtc2l6ZTogMC44OGVtO1xuICB9XG5cbiAgLmV4cGFuZC1idG4ge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHdpZHRoOiAxNnB4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gIH1cblxuICAuZXhwYW5kLXBsYWNlaG9sZGVyIHtcbiAgICB3aWR0aDogMTZweDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAuZ2FudHQtdGFzay1saW5rIHtcbiAgICBmbGV4OiAxO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6IHZhcigtLXRleHQtYWNjZW50KTtcbiAgfVxuXG4gIC5nYW50dC10YXNrLWxpbms6aG92ZXIgeyB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxuXG4gIC5zdGF0dXMtZG90IHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gIC8qIOKUgOKUgCBSaWdodCBwYW5lbCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cbiAgLmdhbnR0LXJpZ2h0IHtcbiAgICBmbGV4OiAxO1xuICAgIG92ZXJmbG93OiBhdXRvOyAgIC8qIFRISVMgaXMgdGhlIHNpbmdsZSBzY3JvbGwgY29udGFpbmVyICovXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLyogSW5uZXIgZGl2IGlzIGFzIHdpZGUgYXMgYWxsIHRoZSBkYXkgY29sdW1ucyAqL1xuICAuZ2FudHQtaW5uZXIge1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLyog4pSA4pSAIFN0aWNreSBoZWFkZXJzIChzdGljayB0byB0b3Agb2YgLmdhbnR0LXJpZ2h0IHNjcm9sbCkg4pSA4pSA4pSA4pSAICovXG4gIC5nYW50dC1oZWFkZXItbW9udGhzLFxuICAuZ2FudHQtaGVhZGVyLWRheXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IHN0aWNreTtcbiAgICBsZWZ0OiAwOyAgICAgICAgICAgLyoga2VlcCBpdCBhbmNob3JlZCB3aGVuIHNjcm9sbGluZyBob3Jpem9udGFsbHkgKi9cbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XG4gICAgei1pbmRleDogMTA7XG4gICAgLyogd2lkdGggbXVzdCBtYXRjaCB0aGUgaW5uZXIgY29udGFpbmVyIOKAlCBmb3JjZSBpdCAqL1xuICAgIHdpZHRoOiBtYXgtY29udGVudDtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gIH1cblxuICAuZ2FudHQtaGVhZGVyLW1vbnRocyB7XG4gICAgdG9wOiAwO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gIH1cblxuICAuZ2FudHQtaGVhZGVyLWRheXMge1xuICAgIHRvcDogMjhweDsgICAgICAgICAvKiBzaXRzIGRpcmVjdGx5IGJlbG93IG1vbnRoIHJvdyAqL1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gIH1cblxuICAuZ2FudHQtbW9udGgtY2VsbCB7XG4gICAgaGVpZ2h0OiAyOHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xuICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgLmdhbnR0LWRheS1jZWxsIHtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI4cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMC43NWVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIC5nYW50dC1kYXktY2VsbC53ZWVrZW5kICB7IGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5LWFsdCk7IGNvbG9yOiB2YXIoLS10ZXh0LWZhaW50KTsgfVxuICAuZ2FudHQtZGF5LWNlbGwudG9kYXktY29sIHtcbiAgICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KSAyMiUsIHRyYW5zcGFyZW50KTtcbiAgICBjb2xvcjogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICB9XG5cbiAgLyog4pSA4pSAIEdyaWQgYm9keSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cbiAgLmdhbnR0LXJvd3MtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAuZ2FudHQtZ3JpZC1yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIC5nYW50dC1ncmlkLWNlbGwge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG4gICAgY3Vyc29yOiBjcm9zc2hhaXI7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIC5nYW50dC1ncmlkLWNlbGwud2Vla2VuZCAgIHsgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnktYWx0KTsgfVxuICAuZ2FudHQtZ3JpZC1jZWxsLnRvZGF5LWNvbCB7IGJhY2tncm91bmQ6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpIDglLCB0cmFuc3BhcmVudCk7IH1cblxuICAvKiDilIDilIAgVG9kYXkgdmVydGljYWwgbGluZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cbiAgLnRvZGF5LWxpbmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDJweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB6LWluZGV4OiA1O1xuICB9XG5cbiAgLyog4pSA4pSAIEdhbnR0IGJhcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG4gIC5nYW50dC1iYXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGN1cnNvcjogZ3JhYjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB6LWluZGV4OiA0O1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsMCwwLDAuMjUpO1xuICAgIG1pbi13aWR0aDogMTBweDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgLmdhbnR0LWJhcjpob3ZlciAgeyBmaWx0ZXI6IGJyaWdodG5lc3MoMS4xMik7IH1cbiAgLmdhbnR0LWJhcjphY3RpdmUgeyBjdXJzb3I6IGdyYWJiaW5nOyB9XG5cbiAgLmJhci1sYWJlbCB7XG4gICAgZmxleDogMTtcbiAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBwYWRkaW5nOiAwIDRweDtcbiAgICBjb2xvcjogcmdiYSgwLDAsMCwwLjgpO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLmJhci1oYW5kbGUge1xuICAgIHdpZHRoOiA4cHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGN1cnNvcjogY29sLXJlc2l6ZTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMTgpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIC5iYXItaGFuZGxlOjphZnRlciB7XG4gICAgY29udGVudDogJ+KLric7XG4gICAgY29sb3I6IHJnYmEoMCwwLDAsMC40NSk7XG4gICAgZm9udC1zaXplOiA5cHg7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cblxuICAuYmFyLWhhbmRsZS1sZWZ0ICB7IGJvcmRlci1yYWRpdXM6IDVweCAwIDAgNXB4OyB9XG4gIC5iYXItaGFuZGxlLXJpZ2h0IHsgYm9yZGVyLXJhZGl1czogMCA1cHggNXB4IDA7IH1cbjwvc3R5bGU+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICBpbXBvcnQgdHlwZSB7IFRhc2ssIFRhc2tTdGF0dXMsIFRhc2tQcmlvcml0eSB9IGZyb20gJy4uL3R5cGVzJztcblxuICBleHBvcnQgbGV0IHBhcmVudElkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZXhwb3J0IGxldCBwYXJlbnRUaXRsZTogc3RyaW5nID0gJyc7XG4gIGV4cG9ydCBsZXQgb25TdWJtaXQ6IChkYXRhOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzdGF0dXM6IFRhc2tTdGF0dXM7XG4gICAgcHJpb3JpdHk6IFRhc2tQcmlvcml0eTtcbiAgICBzdGFydERhdGU6IHN0cmluZztcbiAgICBlbmREYXRlOiBzdHJpbmc7XG4gICAgYXNzaWduZWU6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgfSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBleHBvcnQgbGV0IG9uQ2FuY2VsOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgbGV0IHRpdGxlID0gJyc7XG4gIGxldCBzdGF0dXM6IFRhc2tTdGF0dXMgPSAndG9kbyc7XG4gIGxldCBwcmlvcml0eTogVGFza1ByaW9yaXR5ID0gJ21lZGl1bSc7XG4gIGxldCBzdGFydERhdGUgPSAnJztcbiAgbGV0IGVuZERhdGUgPSAnJztcbiAgbGV0IGFzc2lnbmVlID0gJyc7XG4gIGxldCB0YWdzID0gJyc7XG4gIGxldCBkZXNjcmlwdGlvbiA9ICcnO1xuXG4gIGxldCBlcnJvcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZSgpOiBib29sZWFuIHtcbiAgICBlcnJvcnMgPSB7fTtcbiAgICBpZiAoIXRpdGxlLnRyaW0oKSkgZXJyb3JzLnRpdGxlID0gJ1RpdGxlIGlzIHJlcXVpcmVkJztcbiAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUgJiYgZW5kRGF0ZSA8IHN0YXJ0RGF0ZSkge1xuICAgICAgZXJyb3JzLmVuZERhdGUgPSAnRW5kIGRhdGUgbXVzdCBiZSBhZnRlciBzdGFydCBkYXRlJztcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VibWl0KCkge1xuICAgIGlmICghdmFsaWRhdGUoKSkgcmV0dXJuO1xuICAgIG9uU3VibWl0KHsgdGl0bGU6IHRpdGxlLnRyaW0oKSwgc3RhdHVzLCBwcmlvcml0eSwgc3RhcnREYXRlLCBlbmREYXRlLCBhc3NpZ25lZSwgdGFncywgZGVzY3JpcHRpb24gfSk7XG4gIH1cbjwvc2NyaXB0PlxuXG48ZGl2XG4gIGNsYXNzPVwidGFzay1tb2RhbC1vdmVybGF5XCJcbiAgb246Y2xpY2t8c2VsZj17b25DYW5jZWx9XG4gIG9uOmtleWRvd249eyhlKSA9PiBlLmtleSA9PT0gJ0VzY2FwZScgJiYgb25DYW5jZWwoKX1cbiAgcm9sZT1cImRpYWxvZ1wiXG4gIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgdGFiaW5kZXg9XCItMVwiXG4+XG4gIDxkaXYgY2xhc3M9XCJ0YXNrLW1vZGFsXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgPGgyPntwYXJlbnRJZCA/IGBOZXcgU3VidGFza2AgOiAnTmV3IFRhc2snfTwvaDI+XG4gICAgICB7I2lmIHBhcmVudElkfVxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhcmVudC1sYWJlbFwiPnVuZGVyOiB7cGFyZW50VGl0bGV9PC9zcGFuPlxuICAgICAgey9pZn1cbiAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZS1idG5cIiBvbjpjbGljaz17b25DYW5jZWx9IGFyaWEtbGFiZWw9XCJDbG9zZVwiPuKclTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwidGFzay10aXRsZVwiPlRpdGxlIDxzcGFuIGNsYXNzPVwicmVxdWlyZWRcIj4qPC9zcGFuPjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGlkPVwidGFzay10aXRsZVwiXG4gICAgICAgICAgYmluZDp2YWx1ZT17dGl0bGV9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJUYXNrIHRpdGxlLi4uXCJcbiAgICAgICAgICBjbGFzczplcnJvcj17ZXJyb3JzLnRpdGxlfVxuICAgICAgICAgIG9uOmtleWRvd249eyhlKSA9PiBlLmtleSA9PT0gJ0VudGVyJyAmJiBzdWJtaXQoKX1cbiAgICAgICAgLz5cbiAgICAgICAgeyNpZiBlcnJvcnMudGl0bGV9PHNwYW4gY2xhc3M9XCJlcnJvci1tc2dcIj57ZXJyb3JzLnRpdGxlfTwvc3Bhbj57L2lmfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvdy1pbmxpbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stc3RhdHVzXCI+U3RhdHVzPC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IGlkPVwidGFzay1zdGF0dXNcIiBiaW5kOnZhbHVlPXtzdGF0dXN9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRvZG9cIj5UbyBEbzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImluLXByb2dyZXNzXCI+SW4gUHJvZ3Jlc3M8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJibG9ja2VkXCI+QmxvY2tlZDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRvbmVcIj5Eb25lPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXByaW9yaXR5XCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ0YXNrLXByaW9yaXR5XCIgYmluZDp2YWx1ZT17cHJpb3JpdHl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3JpdGljYWxcIj5Dcml0aWNhbDwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3ctaW5saW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXN0YXJ0XCI+U3RhcnQgZGF0ZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGlkPVwidGFzay1zdGFydFwiIHR5cGU9XCJkYXRlXCIgYmluZDp2YWx1ZT17c3RhcnREYXRlfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1lbmRcIj5FbmQgZGF0ZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBpZD1cInRhc2stZW5kXCJcbiAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2VuZERhdGV9XG4gICAgICAgICAgICBjbGFzczplcnJvcj17ZXJyb3JzLmVuZERhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7I2lmIGVycm9ycy5lbmREYXRlfTxzcGFuIGNsYXNzPVwiZXJyb3ItbXNnXCI+e2Vycm9ycy5lbmREYXRlfTwvc3Bhbj57L2lmfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stYXNzaWduZWVcIj5Bc3NpZ25lZTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBpZD1cInRhc2stYXNzaWduZWVcIiBiaW5kOnZhbHVlPXthc3NpZ25lZX0gcGxhY2Vob2xkZXI9XCJAbmFtZVwiIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXRhZ3NcIj5UYWdzIDxzcGFuIGNsYXNzPVwiaGludFwiPihjb21tYSBzZXBhcmF0ZWQpPC9zcGFuPjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBpZD1cInRhc2stdGFnc1wiIGJpbmQ6dmFsdWU9e3RhZ3N9IHBsYWNlaG9sZGVyPVwiZGVzaWduLCBiYWNrZW5kLCB1cmdlbnRcIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1kZXNjXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICA8dGV4dGFyZWEgaWQ9XCJ0YXNrLWRlc2NcIiBiaW5kOnZhbHVlPXtkZXNjcmlwdGlvbn0gcm93cz1cIjNcIiBwbGFjZWhvbGRlcj1cIk9wdGlvbmFsIGRlc2NyaXB0aW9uLi4uXCI+PC90ZXh0YXJlYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1zZWNvbmRhcnlcIiBvbjpjbGljaz17b25DYW5jZWx9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1wcmltYXJ5XCIgb246Y2xpY2s9e3N1Ym1pdH0+XG4gICAgICAgIHtwYXJlbnRJZCA/ICdDcmVhdGUgU3VidGFzaycgOiAnQ3JlYXRlIFRhc2snfVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxzdHlsZT5cbiAgLnRhc2stbW9kYWwtb3ZlcmxheSB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGluc2V0OiAwO1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC41KTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgei1pbmRleDogMTAwMDtcbiAgfVxuXG4gIC50YXNrLW1vZGFsIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHdpZHRoOiA0ODBweDtcbiAgICBtYXgtd2lkdGg6IDk1dnc7XG4gICAgbWF4LWhlaWdodDogOTB2aDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC4zNSk7XG4gIH1cblxuICAubW9kYWwtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxMHB4O1xuICAgIHBhZGRpbmc6IDE2cHggMjBweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICB9XG5cbiAgLm1vZGFsLWhlYWRlciBoMiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogMS4xZW07XG4gICAgZmxleDogMTtcbiAgfVxuXG4gIC5wYXJlbnQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgfVxuXG4gIC5jbG9zZS1idG4ge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgZm9udC1zaXplOiAxLjFlbTtcbiAgICBwYWRkaW5nOiA0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB9XG5cbiAgLmNsb3NlLWJ0bjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKTtcbiAgfVxuXG4gIC5tb2RhbC1ib2R5IHtcbiAgICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxMnB4O1xuICB9XG5cbiAgLmZvcm0tcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA0cHg7XG4gICAgZmxleDogMTtcbiAgfVxuXG4gIC5mb3JtLXJvdy1pbmxpbmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxMnB4O1xuICB9XG5cbiAgbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC44MmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgaW5wdXQ6Zm9jdXMsIHNlbGVjdDpmb2N1cywgdGV4dGFyZWE6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICB9XG5cbiAgaW5wdXQuZXJyb3Ige1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItcmVkKTtcbiAgfVxuXG4gIHRleHRhcmVhIHtcbiAgICByZXNpemU6IHZlcnRpY2FsO1xuICAgIG1pbi1oZWlnaHQ6IDYwcHg7XG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIH1cblxuICAuZXJyb3ItbXNnIHtcbiAgICBmb250LXNpemU6IDAuNzhlbTtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcmVkKTtcbiAgfVxuXG4gIC5yZXF1aXJlZCB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXJlZCk7XG4gIH1cblxuICAuaGludCB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBmb250LXNpemU6IDAuOWVtO1xuICB9XG5cbiAgLm1vZGFsLWZvb3RlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIGdhcDogMTBweDtcbiAgICBwYWRkaW5nOiAxNHB4IDIwcHg7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgfVxuXG4gIC5idG4tcHJpbWFyeSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1vbi1hY2NlbnQpO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogN3B4IDE4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgfVxuXG4gIC5idG4tcHJpbWFyeTpob3ZlciB7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDEuMSk7XG4gIH1cblxuICAuYnRuLXNlY29uZGFyeSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBwYWRkaW5nOiA3cHggMThweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgfVxuXG4gIC5idG4tc2Vjb25kYXJ5OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKTtcbiAgfVxuPC9zdHlsZT5cbiIsIjxzY3JpcHQgbGFuZz1cInRzXCI+XG4gIGltcG9ydCB0eXBlIHsgUHJvamVjdCwgVGFzaywgVGFza1N0YXR1cyB9IGZyb20gJy4uL3R5cGVzJztcbiAgaW1wb3J0IEthbmJhbkJvYXJkIGZyb20gJy4vS2FuYmFuQm9hcmQuc3ZlbHRlJztcbiAgaW1wb3J0IEdhbnR0Q2hhcnQgZnJvbSAnLi9HYW50dENoYXJ0LnN2ZWx0ZSc7XG4gIGltcG9ydCBUYXNrTW9kYWwgZnJvbSAnLi9UYXNrTW9kYWwuc3ZlbHRlJztcblxuICBleHBvcnQgbGV0IHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcbiAgZXhwb3J0IGxldCBhY3RpdmVQcm9qZWN0SW5kZXg6IG51bWJlciA9IDA7XG4gIGV4cG9ydCBsZXQgdmlld01vZGU6ICdnYW50dCcgfCAna2FuYmFuJyA9ICdnYW50dCc7XG5cbiAgZXhwb3J0IGxldCBvbkNyZWF0ZVRhc2s6IChcbiAgICBwcm9qZWN0Rm9sZGVyOiBzdHJpbmcsXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbCxcbiAgICBleHRyYTogUGFydGlhbDxUYXNrPlxuICApID0+IFByb21pc2U8dm9pZD47XG5cbiAgZXhwb3J0IGxldCBvblN0YXR1c0NoYW5nZTogKFxuICAgIHByb2plY3RGb2xkZXI6IHN0cmluZyxcbiAgICB0YXNrSWQ6IHN0cmluZyxcbiAgICBuZXdTdGF0dXM6IFRhc2tTdGF0dXNcbiAgKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIGV4cG9ydCBsZXQgb25EYXRlQ2hhbmdlOiAoXG4gICAgcHJvamVjdEZvbGRlcjogc3RyaW5nLFxuICAgIHRhc2tJZDogc3RyaW5nLFxuICAgIHN0YXJ0RGF0ZTogc3RyaW5nLFxuICAgIGVuZERhdGU6IHN0cmluZ1xuICApID0+IFByb21pc2U8dm9pZD47XG5cbiAgZXhwb3J0IGxldCBvbk9wZW5UYXNrOiAoZmlsZVBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgZXhwb3J0IGxldCBvblJlZnJlc2g6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGV4cG9ydCBsZXQgb25WaWV3TW9kZUNoYW5nZTogKG1vZGU6ICdnYW50dCcgfCAna2FuYmFuJykgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBleHBvcnQgbGV0IG9uQWN0aXZlUHJvamVjdENoYW5nZTogKGlkeDogbnVtYmVyKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgZnVuY3Rpb24gc2V0Vmlld01vZGUobW9kZTogJ2dhbnR0JyB8ICdrYW5iYW4nKSB7XG4gICAgdmlld01vZGUgPSBtb2RlO1xuICAgIG9uVmlld01vZGVDaGFuZ2UobW9kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRBY3RpdmVQcm9qZWN0KGlkeDogbnVtYmVyKSB7XG4gICAgYWN0aXZlUHJvamVjdEluZGV4ID0gaWR4O1xuICAgIG9uQWN0aXZlUHJvamVjdENoYW5nZShpZHgpO1xuICB9XG5cbiAgLy8g4pSA4pSA4pSAIE1vZGFsIHN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBsZXQgc2hvd01vZGFsID0gZmFsc2U7XG4gIGxldCBtb2RhbFBhcmVudElkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgbGV0IG1vZGFsUGFyZW50VGl0bGUgPSAnJztcblxuICBmdW5jdGlvbiBvcGVuTmV3VGFza01vZGFsKHBhcmVudElkOiBzdHJpbmcgfCBudWxsID0gbnVsbCwgcGFyZW50VGl0bGUgPSAnJykge1xuICAgIG1vZGFsUGFyZW50SWQgPSBwYXJlbnRJZDtcbiAgICBtb2RhbFBhcmVudFRpdGxlID0gcGFyZW50VGl0bGU7XG4gICAgc2hvd01vZGFsID0gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1vZGFsU3VibWl0KGRhdGE6IGFueSkge1xuICAgIHNob3dNb2RhbCA9IGZhbHNlO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0c1thY3RpdmVQcm9qZWN0SW5kZXhdO1xuICAgIGlmICghcHJvamVjdCkgcmV0dXJuO1xuXG4gICAgYXdhaXQgb25DcmVhdGVUYXNrKHByb2plY3QuZm9sZGVyUGF0aCwgZGF0YS50aXRsZSwgbW9kYWxQYXJlbnRJZCwge1xuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcbiAgICAgIHByaW9yaXR5OiBkYXRhLnByaW9yaXR5LFxuICAgICAgc3RhcnREYXRlOiBkYXRhLnN0YXJ0RGF0ZSB8fCBudWxsLFxuICAgICAgZW5kRGF0ZTogZGF0YS5lbmREYXRlIHx8IG51bGwsXG4gICAgICBhc3NpZ25lZTogZGF0YS5hc3NpZ25lZSxcbiAgICAgIHRhZ3M6IGRhdGEudGFncyA/IGRhdGEudGFncy5zcGxpdCgnLCcpLm1hcCgodDogc3RyaW5nKSA9PiB0LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW10sXG4gICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbixcbiAgICB9KTtcbiAgICBhd2FpdCBvblJlZnJlc2goKTtcbiAgfVxuXG4gICQ6IGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbYWN0aXZlUHJvamVjdEluZGV4XSA/PyBudWxsO1xuICAkOiBjdXJyZW50VGFza3MgPSBjdXJyZW50UHJvamVjdD8udGFza3MgPz8gW107XG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cInByb2plY3Qtdmlld1wiPlxuICA8IS0tIOKUgOKUgCBUb3AgYmFyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAtLT5cbiAgPGRpdiBjbGFzcz1cInRvcGJhclwiPlxuICAgIDwhLS0gUHJvamVjdCBzZWxlY3RvciAtLT5cbiAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1zZWxlY3RvclwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b3BiYXItbGFiZWxcIj5Qcm9qZWN0Ojwvc3Bhbj5cbiAgICAgIHsjZWFjaCBwcm9qZWN0cyBhcyBwcm9qLCBpfVxuICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3M9XCJwcm9qZWN0LXRhYlwiXG4gICAgICAgICAgY2xhc3M6YWN0aXZlPXtpID09PSBhY3RpdmVQcm9qZWN0SW5kZXh9XG4gICAgICAgICAgb246Y2xpY2s9eygpID0+IHNldEFjdGl2ZVByb2plY3QoaSl9XG4gICAgICAgID5cbiAgICAgICAgICDwn5OBIHtwcm9qLm5hbWV9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgey9lYWNofVxuICAgICAgeyNpZiBwcm9qZWN0cy5sZW5ndGggPT09IDB9XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibm8tcHJvamVjdHNcIj5ObyBwcm9qZWN0cyBmb3VuZCBpbiB5b3VyIHByb2plY3RzIGZvbGRlci48L3NwYW4+XG4gICAgICB7L2lmfVxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBWaWV3IHN3aXRjaGVyIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJ2aWV3LXN3aXRjaGVyXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwidmlldy1idG5cIlxuICAgICAgICBjbGFzczphY3RpdmU9e3ZpZXdNb2RlID09PSAnZ2FudHQnfVxuICAgICAgICBvbjpjbGljaz17KCkgPT4gc2V0Vmlld01vZGUoJ2dhbnR0Jyl9XG4gICAgICAgIHRpdGxlPVwiR2FudHQgQ2hhcnRcIlxuICAgICAgPlxuICAgICAgICDwn5OKIEdhbnR0XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3M9XCJ2aWV3LWJ0blwiXG4gICAgICAgIGNsYXNzOmFjdGl2ZT17dmlld01vZGUgPT09ICdrYW5iYW4nfVxuICAgICAgICBvbjpjbGljaz17KCkgPT4gc2V0Vmlld01vZGUoJ2thbmJhbicpfVxuICAgICAgICB0aXRsZT1cIkthbmJhbiBCb2FyZFwiXG4gICAgICA+XG4gICAgICAgIPCfl4IgS2FuYmFuXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gQWN0aW9ucyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwidG9wYmFyLWFjdGlvbnNcIj5cbiAgICAgIHsjaWYgY3VycmVudFByb2plY3R9XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWRkXCIgb246Y2xpY2s9eygpID0+IG9wZW5OZXdUYXNrTW9kYWwobnVsbCl9PlxuICAgICAgICAgICsgTmV3IFRhc2tcbiAgICAgICAgPC9idXR0b24+XG4gICAgICB7L2lmfVxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1yZWZyZXNoXCIgb246Y2xpY2s9e29uUmVmcmVzaH0gdGl0bGU9XCJSZWZyZXNoXCI+4oa6PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDwhLS0g4pSA4pSAIE1haW4gY29udGVudCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG4gIDxkaXYgY2xhc3M9XCJ2aWV3LWNvbnRhaW5lclwiPlxuICAgIHsjaWYgIWN1cnJlbnRQcm9qZWN0fVxuICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LXN0YXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1pY29uXCI+8J+TgTwvZGl2PlxuICAgICAgICA8cD5ObyBwcm9qZWN0IHNlbGVjdGVkLiBDcmVhdGUgYSBmb2xkZXIgaW5zaWRlIHlvdXIgY29uZmlndXJlZCBwcm9qZWN0cyBmb2xkZXIgdG8gZ2V0IHN0YXJ0ZWQuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgezplbHNlIGlmIHZpZXdNb2RlID09PSAnZ2FudHQnfVxuICAgICAgPEdhbnR0Q2hhcnRcbiAgICAgICAgdGFza3M9e2N1cnJlbnRUYXNrc31cbiAgICAgICAge29uT3BlblRhc2t9XG4gICAgICAgIG9uRGF0ZUNoYW5nZT17KHRhc2tJZCwgc3RhcnREYXRlLCBlbmREYXRlKSA9PlxuICAgICAgICAgIG9uRGF0ZUNoYW5nZShjdXJyZW50UHJvamVjdC5mb2xkZXJQYXRoLCB0YXNrSWQsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSlcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICB7OmVsc2V9XG4gICAgICA8S2FuYmFuQm9hcmRcbiAgICAgICAgdGFza3M9e2N1cnJlbnRUYXNrc31cbiAgICAgICAge29uT3BlblRhc2t9XG4gICAgICAgIG9uU3RhdHVzQ2hhbmdlPXsodGFza0lkLCBuZXdTdGF0dXMpID0+XG4gICAgICAgICAgb25TdGF0dXNDaGFuZ2UoY3VycmVudFByb2plY3QuZm9sZGVyUGF0aCwgdGFza0lkLCBuZXdTdGF0dXMpXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgey9pZn1cbiAgPC9kaXY+XG5cbiAgPCEtLSDilIDilIAgQ29udGV4dDogYWRkIHN1YnRhc2sgZnJvbSB0YXNrIGxpc3QgKHJpZ2h0LWNsaWNrIC8gYnV0dG9uKSDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG4gIDwhLS0gVGhpcyBpcyBhdmFpbGFibGUgdmlhIHRoZSBvcGVuTmV3VGFza01vZGFsIGV4cG9ydCAtLT5cbjwvZGl2PlxuXG48IS0tIOKUgOKUgCBUYXNrIENyZWF0aW9uIE1vZGFsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAtLT5cbnsjaWYgc2hvd01vZGFsfVxuICA8VGFza01vZGFsXG4gICAgcGFyZW50SWQ9e21vZGFsUGFyZW50SWR9XG4gICAgcGFyZW50VGl0bGU9e21vZGFsUGFyZW50VGl0bGV9XG4gICAgb25TdWJtaXQ9e2hhbmRsZU1vZGFsU3VibWl0fVxuICAgIG9uQ2FuY2VsPXsoKSA9PiAoc2hvd01vZGFsID0gZmFsc2UpfVxuICAvPlxuey9pZn1cblxuPHN0eWxlPlxuICAucHJvamVjdC12aWV3IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgfVxuXG4gIC8qIOKUgOKUgCBUb3AgYmFyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL1xuICAudG9wYmFyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxMnB4O1xuICAgIHBhZGRpbmc6IDhweCAxNHB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC50b3BiYXItbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cblxuICAucHJvamVjdC1zZWxlY3RvciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGZsZXg6IDE7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICB9XG5cbiAgLnByb2plY3QtdGFiIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgcGFkZGluZzogNHB4IDEycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtc2l6ZTogMC44NWVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjFzLCBib3JkZXItY29sb3IgMC4xcztcbiAgfVxuXG4gIC5wcm9qZWN0LXRhYjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3Zlcik7XG4gIH1cblxuICAucHJvamVjdC10YWIuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW9uLWFjY2VudCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICB9XG5cbiAgLm5vLXByb2plY3RzIHtcbiAgICBmb250LXNpemU6IDAuODJlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICB9XG5cbiAgLnZpZXctc3dpdGNoZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiA0cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIHBhZGRpbmc6IDNweDtcbiAgfVxuXG4gIC52aWV3LWJ0biB7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZzogNHB4IDEycHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDAuODRlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMXMsIGNvbG9yIDAuMXM7XG4gIH1cblxuICAudmlldy1idG46aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XG4gIH1cblxuICAudmlldy1idG4uYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW9uLWFjY2VudCk7XG4gIH1cblxuICAudG9wYmFyLWFjdGlvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgfVxuXG4gIC5idG4tYWRkIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW9uLWFjY2VudCk7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBwYWRkaW5nOiA1cHggMTRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBmb250LXNpemU6IDAuODVlbTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG5cbiAgLmJ0bi1hZGQ6aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygxLjEpO1xuICB9XG5cbiAgLmJ0bi1yZWZyZXNoIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogNHB4IDEwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtc2l6ZTogMS4xZW07XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgLmJ0bi1yZWZyZXNoOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1xuICB9XG5cbiAgLyog4pSA4pSAIFZpZXcgY29udGFpbmVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL1xuICAudmlldy1jb250YWluZXIge1xuICAgIGZsZXg6IDE7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5lbXB0eS1zdGF0ZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBnYXA6IDEycHg7XG4gIH1cblxuICAuZW1wdHktaWNvbiB7XG4gICAgZm9udC1zaXplOiAzZW07XG4gIH1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyBJdGVtVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIEdhbnR0UGx1Z2luIGZyb20gJy4vbWFpbic7XG5pbXBvcnQgdHlwZSB7IFByb2plY3QsIFRhc2ssIFRhc2tTdGF0dXMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGxvYWRQcm9qZWN0cywgY3JlYXRlVGFza05vdGUsIHVwZGF0ZVRhc2tGaWVsZCB9IGZyb20gJy4vdGFza1V0aWxzJztcbmltcG9ydCBQcm9qZWN0VmlldyBmcm9tICcuL2NvbXBvbmVudHMvUHJvamVjdFZpZXcuc3ZlbHRlJztcbmltcG9ydCB7IG1vdW50LCB1bm1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxuZXhwb3J0IGNvbnN0IEdBTlRUX1ZJRVdfVFlQRSA9ICdvYnNpZGlhbi1nYW50dC12aWV3JztcblxuZXhwb3J0IGNsYXNzIEdhbnR0VmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcbiAgcGx1Z2luOiBHYW50dFBsdWdpbjtcbiAgcHJpdmF0ZSBzdmVsdGVDb21wb25lbnQ6IFJldHVyblR5cGU8dHlwZW9mIG1vdW50PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcbiAgcHJpdmF0ZSBhY3RpdmVQcm9qZWN0SW5kZXggPSAwO1xuICBwcml2YXRlIHZpZXdNb2RlOiAnZ2FudHQnIHwgJ2thbmJhbicgPSAnZ2FudHQnO1xuICAvKiogUHJldmVudCB2YXVsdC1ldmVudCByZS1yZW5kZXJzIGR1cmluZyBvdXIgb3duIHByb2dyYW1tYXRpYyB3cml0ZXMgKi9cbiAgcHJpdmF0ZSBfd3JpdGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGxlYWY6IFdvcmtzcGFjZUxlYWYsIHBsdWdpbjogR2FudHRQbHVnaW4pIHtcbiAgICBzdXBlcihsZWFmKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGdldFZpZXdUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEdBTlRUX1ZJRVdfVFlQRTtcbiAgfVxuXG4gIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdQcm9qZWN0IEJvYXJkJztcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2xheW91dC1kYXNoYm9hcmQnO1xuICB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucHJvamVjdHMgPSBhd2FpdCBsb2FkUHJvamVjdHModGhpcy5hcHAsIHRoaXMucGx1Z2luLnNldHRpbmdzLnByb2plY3RzRm9sZGVyKTtcbiAgICB0aGlzLm1vdW50U3ZlbHRlKCk7XG5cbiAgICAvLyBSZS1yZW5kZXIgd2hlbiB2YXVsdCBjaGFuZ2VzIChidXQgbm90IGR1cmluZyBvdXIgb3duIHdyaXRlcylcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC52YXVsdC5vbignY3JlYXRlJywgKCkgPT4geyBpZiAoIXRoaXMuX3dyaXRpbmcpIHRoaXMucmVmcmVzaCgpOyB9KVxuICAgICk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAudmF1bHQub24oJ21vZGlmeScsICgpID0+IHsgaWYgKCF0aGlzLl93cml0aW5nKSB0aGlzLnJlZnJlc2goKTsgfSlcbiAgICApO1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKCdkZWxldGUnLCAoKSA9PiB7IGlmICghdGhpcy5fd3JpdGluZykgdGhpcy5yZWZyZXNoKCk7IH0pXG4gICAgKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC52YXVsdC5vbigncmVuYW1lJywgKCkgPT4geyBpZiAoIXRoaXMuX3dyaXRpbmcpIHRoaXMucmVmcmVzaCgpOyB9KVxuICAgICk7XG4gIH1cblxuICBhc3luYyBvbkNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLnN2ZWx0ZUNvbXBvbmVudCkge1xuICAgICAgdW5tb3VudCh0aGlzLnN2ZWx0ZUNvbXBvbmVudCk7XG4gICAgICB0aGlzLnN2ZWx0ZUNvbXBvbmVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudFN2ZWx0ZSgpIHtcbiAgICBpZiAodGhpcy5zdmVsdGVDb21wb25lbnQpIHtcbiAgICAgIHVubW91bnQodGhpcy5zdmVsdGVDb21wb25lbnQpO1xuICAgICAgdGhpcy5zdmVsdGVDb21wb25lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRWwuY2hpbGRyZW5bMV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29udGFpbmVyLmVtcHR5KCk7XG4gICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICB0aGlzLnN2ZWx0ZUNvbXBvbmVudCA9IG1vdW50KFByb2plY3RWaWV3LCB7XG4gICAgICB0YXJnZXQ6IGNvbnRhaW5lcixcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHByb2plY3RzOiB0aGlzLnByb2plY3RzLFxuICAgICAgICBhY3RpdmVQcm9qZWN0SW5kZXg6IHRoaXMuYWN0aXZlUHJvamVjdEluZGV4LFxuICAgICAgICB2aWV3TW9kZTogdGhpcy52aWV3TW9kZSxcbiAgICAgICAgb25DcmVhdGVUYXNrOiB0aGlzLmhhbmRsZUNyZWF0ZVRhc2suYmluZCh0aGlzKSxcbiAgICAgICAgb25TdGF0dXNDaGFuZ2U6IHRoaXMuaGFuZGxlU3RhdHVzQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICAgIG9uRGF0ZUNoYW5nZTogdGhpcy5oYW5kbGVEYXRlQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICAgIG9uT3BlblRhc2s6IHRoaXMuaGFuZGxlT3BlblRhc2suYmluZCh0aGlzKSxcbiAgICAgICAgb25SZWZyZXNoOiB0aGlzLnJlZnJlc2guYmluZCh0aGlzKSxcbiAgICAgICAgb25WaWV3TW9kZUNoYW5nZTogKG1vZGU6ICdnYW50dCcgfCAna2FuYmFuJykgPT4geyB0aGlzLnZpZXdNb2RlID0gbW9kZTsgfSxcbiAgICAgICAgb25BY3RpdmVQcm9qZWN0Q2hhbmdlOiAoaWR4OiBudW1iZXIpID0+IHsgdGhpcy5hY3RpdmVQcm9qZWN0SW5kZXggPSBpZHg7IH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnByb2plY3RzID0gYXdhaXQgbG9hZFByb2plY3RzKHRoaXMuYXBwLCB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlcik7XG4gICAgdGhpcy5tb3VudFN2ZWx0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVPcGVuVGFzayhmaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuICAgIGlmIChmaWxlKSB7XG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhZihmYWxzZSkub3BlbkZpbGUoZmlsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVDcmVhdGVUYXNrKFxuICAgIHByb2plY3RGb2xkZXI6IHN0cmluZyxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIHBhcmVudElkOiBzdHJpbmcgfCBudWxsLFxuICAgIGV4dHJhOiBQYXJ0aWFsPFRhc2s+XG4gICkge1xuICAgIGF3YWl0IGNyZWF0ZVRhc2tOb3RlKHRoaXMuYXBwLCBwcm9qZWN0Rm9sZGVyLCB0aXRsZSwgcGFyZW50SWQsIGV4dHJhKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU3RhdHVzQ2hhbmdlKFxuICAgIHByb2plY3RGb2xkZXI6IHN0cmluZyxcbiAgICB0YXNrSWQ6IHN0cmluZyxcbiAgICBuZXdTdGF0dXM6IFRhc2tTdGF0dXNcbiAgKSB7XG4gICAgY29uc3QgdGFzayA9IHRoaXMuZmluZFRhc2tCeUlkKHRhc2tJZCk7XG4gICAgaWYgKCF0YXNrKSByZXR1cm47XG4gICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgodGFzay5maWxlUGF0aCk7XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgdGhpcy5fd3JpdGluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHVwZGF0ZVRhc2tGaWVsZCh0aGlzLmFwcCwgZmlsZSwgJ3N0YXR1cycsIG5ld1N0YXR1cyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3dyaXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZURhdGVDaGFuZ2UoXG4gICAgcHJvamVjdEZvbGRlcjogc3RyaW5nLFxuICAgIHRhc2tJZDogc3RyaW5nLFxuICAgIHN0YXJ0RGF0ZTogc3RyaW5nLFxuICAgIGVuZERhdGU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCB0YXNrID0gdGhpcy5maW5kVGFza0J5SWQodGFza0lkKTtcbiAgICBpZiAoIXRhc2spIHJldHVybjtcbiAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZUJ5UGF0aCh0YXNrLmZpbGVQYXRoKTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICB0aGlzLl93cml0aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdXBkYXRlVGFza0ZpZWxkKHRoaXMuYXBwLCBmaWxlLCAnc3RhcnRfZGF0ZScsIHN0YXJ0RGF0ZSk7XG4gICAgICBhd2FpdCB1cGRhdGVUYXNrRmllbGQodGhpcy5hcHAsIGZpbGUsICdlbmRfZGF0ZScsIGVuZERhdGUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl93cml0aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kVGFza0J5SWQoaWQ6IHN0cmluZyk6IFRhc2sgfCBudWxsIHtcbiAgICBmb3IgKGNvbnN0IHByb2ogb2YgdGhpcy5wcm9qZWN0cykge1xuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2oudGFza3MpIHtcbiAgICAgICAgaWYgKHRhc2suaWQgPT09IGlkKSByZXR1cm4gdGFzaztcbiAgICAgICAgZm9yIChjb25zdCBzdWIgb2YgdGFzay5zdWJ0YXNrcykge1xuICAgICAgICAgIGlmIChzdWIuaWQgPT09IGlkKSByZXR1cm4gc3ViIGFzIHVua25vd24gYXMgVGFzaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbW91bnQgfSBmcm9tICdzdmVsdGUnXG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSB7IEdhbnR0UGx1Z2luU2V0dGluZ3MgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEdhbnR0U2V0dGluZ1RhYiB9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHsgR2FudHRWaWV3LCBHQU5UVF9WSUVXX1RZUEUgfSBmcm9tICcuL3ZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW50dFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBHYW50dFBsdWdpblNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HUztcblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBjb21iaW5lZCBHYW50dC9LYW5iYW4gdmlld1xuICAgIHRoaXMucmVnaXN0ZXJWaWV3KEdBTlRUX1ZJRVdfVFlQRSwgKGxlYWYpID0+IG5ldyBHYW50dFZpZXcobGVhZiwgdGhpcykpO1xuXG4gICAgLy8gUmliYm9uIGljb24gdG8gb3BlbiB0aGUgdmlld1xuICAgIHRoaXMuYWRkUmliYm9uSWNvbignbGF5b3V0LWRhc2hib2FyZCcsICdPcGVuIFByb2plY3QgQm9hcmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLmFjdGl2YXRlVmlldygpO1xuICAgIH0pO1xuXG4gICAgLy8gQ29tbWFuZCBwYWxldHRlIGVudHJ5XG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAnb3Blbi1wcm9qZWN0LWJvYXJkJyxcbiAgICAgIG5hbWU6ICdPcGVuIFByb2plY3QgQm9hcmQnLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5hY3RpdmF0ZVZpZXcoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBTZXR0aW5ncyB0YWJcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IEdhbnR0U2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuICB9XG5cbiAgb251bmxvYWQoKSB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShHQU5UVF9WSUVXX1RZUEUpO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gIH1cblxuICBhc3luYyBhY3RpdmF0ZVZpZXcoKSB7XG4gICAgY29uc3QgeyB3b3Jrc3BhY2UgfSA9IHRoaXMuYXBwO1xuICAgIGxldCBsZWFmID0gd29ya3NwYWNlLmdldExlYXZlc09mVHlwZShHQU5UVF9WSUVXX1RZUEUpWzBdO1xuXG4gICAgaWYgKCFsZWFmKSB7XG4gICAgICBsZWFmID0gd29ya3NwYWNlLmdldExlYWYoZmFsc2UpO1xuICAgICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoeyB0eXBlOiBHQU5UVF9WSUVXX1RZUEUsIGFjdGl2ZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICB3b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImVmZmVjdCIsImRlcml2ZWQiLCJyb290IiwiZmxhZ3MiLCJjaGlsZCIsInNvdXJjZSIsImUuZWZmZWN0X3VwZGF0ZV9kZXB0aF9leGNlZWRlZCIsImUiLCJib3VuZGFyeSIsIncuc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X25vb3AiLCJlLnN2ZWx0ZV9ib3VuZGFyeV9yZXNldF9vbmVycm9yIiwiZXJyb3IiLCJydW4iLCJwcmV2aW91c19iYXRjaCIsImUuYXN5bmNfZGVyaXZlZF9vcnBoYW4iLCJkIiwiZS5zdGF0ZV91bnNhZmVfbXV0YXRpb24iLCJ2ZXJzaW9uIiwicHJvcCIsImUuc3RhdGVfZGVzY3JpcHRvcnNfZml4ZWQiLCJzIiwidmFsdWUiLCJrZXkiLCJlLnN0YXRlX3Byb3RvdHlwZV9maXhlZCIsImlzIiwiZXZlbnQiLCJlLmVmZmVjdF9vcnBoYW4iLCJlLmVmZmVjdF9pbl91bm93bmVkX2Rlcml2ZWQiLCJlLmVmZmVjdF9pbl90ZWFyZG93biIsInRlYXJkb3duIiwic2libGluZyIsImkiLCJpbmRleCIsImdldCIsImNhcHR1cmUiLCJ1bm1vdW50IiwiYW5jaG9yX25vZGUiLCJldmVudHMiLCJvZmZzY3JlZW4iLCJicmFuY2giLCJmbiIsInN0YXRlIiwiZS5lYWNoX2tleV9kdXBsaWNhdGUiLCJpdGVtIiwidy5zZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZSIsInNldCIsImJhdGNoZXMiLCJwcm9wcyIsImUucHJvcHNfaW52YWxpZF92YWx1ZSIsIlBsdWdpblNldHRpbmdUYWIiLCJTZXR0aW5nIiwiJC5wcm9wIiwiJC5zZXQiLCIkLmdldCIsIiQuaW5kZXgiLCIkJGFuY2hvciIsInJvb3RfMSIsIiQuY2hpbGQiLCJyb290XzIiLCIkLnNpYmxpbmciLCJyb290XzMiLCIkLmVhY2giLCIkLnVudHJhY2siLCJyb290XzQiLCJyb290XzUiLCIkLnNldF90ZXh0IiwiJC5zZXRfc3R5bGUiLCJyb290XzYiLCJyb290XzciLCJyb290XzgiLCJyb290XzkiLCJyb290XzEwIiwiJC5zZXRfY2xhc3MiLCIkLmV2ZW50IiwiJC5hcHBlbmQiLCJyb290XzExIiwidGFza3MiLCIkLm11dGFibGVfc291cmNlIiwiJC5tdXRhdGUiLCIkLmRlcml2ZWRfc2FmZV9lcXVhbCIsIiQuc2V0X2F0dHJpYnV0ZSIsIiQudGVtcGxhdGVfZWZmZWN0IiwiJC5zZWxmIiwiJC5maXJzdF9jaGlsZCIsIkl0ZW1WaWV3IiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQUEsTUFBZTtBQ0VSLElBQUksV0FBVyxNQUFNO0FBQ3JCLElBQUksV0FBVyxNQUFNLFVBQVU7QUFDL0IsSUFBSSxXQUFXLE1BQU0sVUFBVTtBQUMvQixJQUFJLGFBQWEsTUFBTTtBQUV2QixJQUFJLGtCQUFrQixPQUFPO0FBQzdCLElBQUksaUJBQWlCLE9BQU87QUFDNUIsSUFBSSxrQkFBa0IsT0FBTztBQUM3QixJQUFJLG1CQUFtQixPQUFPO0FBQzlCLElBQUksa0JBQWtCLE1BQU07QUFDNUIsSUFBSSxtQkFBbUIsT0FBTztBQUM5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ZCxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixVQUFVLFlBQVk7QUFDcEIsY0FBTSxLQUFLLGFBQUE7QUFBQSxNQUNiO0FBQUEsSUFBQSxDQUNEO0FBR0QsU0FBSyxjQUFjLElBQUksZ0JBQWdCLEtBQUssS0FBSyxJQUFJLENBQUM7QUFBQSxFQUN4RDtBQUFBLEVBRUEsV0FBVztBQUNULFNBQUssSUFBSSxVQUFVLG1CQUFtQixlQUFlO0FBQUEsRUFDdkQ7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNuQixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUEsR0FBSSxrQkFBa0IsTUFBTSxLQUFLLFVBQVU7QUFBQSxFQUMzRTtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ25CLFVBQU0sS0FBSyxTQUFTLEtBQUssUUFBUTtBQUFBLEVBQ25DO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDbkIsVUFBTSxFQUFFLGNBQWMsS0FBSztBQUMzQixRQUFJLE9BQU8sVUFBVSxnQkFBZ0IsZUFBZSxFQUFFLENBQUM7QUFFdkQsUUFBSSxDQUFDLE1BQU07QUFDVCxhQUFPLFVBQVUsUUFBUSxLQUFLO0FBQzlCLFlBQU0sS0FBSyxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsUUFBUSxNQUFNO0FBQUEsSUFDakU7QUFFQSxjQUFVLFdBQVcsSUFBSTtBQUFBLEVBQzNCO0FBQ0Y7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ4LDQ5LDUwXX0=
