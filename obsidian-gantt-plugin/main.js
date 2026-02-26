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
  if (component !== void 0) {
    context.x = component;
  }
  context.i = true;
  component_context = context.p;
  return component ?? /** @type {T} */
  {};
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
function text(value = "") {
  {
    var t = create_text(value + "");
    assign_nodes(t, t);
    return t;
  }
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
function set_text(text2, value) {
  var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
  if (str !== (text2.__t ??= text2.nodeValue)) {
    text2.__t = str;
    text2.nodeValue = `${str}`;
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
function bind_prop(props, prop2, value) {
  var desc = get_descriptor(props, prop2);
  if (desc && desc.set) {
    props[prop2] = value;
    teardown(() => {
      props[prop2] = null;
    });
  }
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
function stopPropagation(fn) {
  return function(...args) {
    var event2 = (
      /** @type {Event} */
      args[0]
    );
    event2.stopPropagation();
    return fn?.apply(this, args);
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
  defaultPriority: "medium",
  syncBaseUrl: "",
  syncEmail: "",
  syncPassword: ""
};
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
    `updated_at: ${task.updatedAt ?? Date.now()}`,
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
    parentId: get2("parent_id") || null,
    updatedAt: parseInt(get2("updated_at"), 10) || 0
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
      if (child2.name === "archive") continue;
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
async function archiveTask(app, taskFilePath, taskId, projectFolder, isSubtask) {
  const archiveDir = `${projectFolder}/archive`;
  await ensureFolder(app, archiveDir);
  const file = app.vault.getFileByPath(taskFilePath);
  if (file) {
    await moveFile(app, file, archiveDir);
  }
  if (!isSubtask) {
    const subFolder = app.vault.getFolderByPath(`${projectFolder}/${taskId}`);
    if (subFolder) {
      const archiveSubDir = `${archiveDir}/${taskId}`;
      await ensureFolder(app, archiveSubDir);
      const children = [...subFolder.children];
      for (const child2 of children) {
        const childFile = child2;
        if (childFile.extension === "md") {
          await moveFile(app, childFile, archiveSubDir);
        }
      }
      try {
        await app.vault.adapter.rmdir(`${projectFolder}/${taskId}`, false);
      } catch {
      }
    }
  }
}
async function moveFile(app, file, destDir) {
  let destPath = `${destDir}/${file.name}`;
  if (app.vault.getAbstractFileByPath(destPath)) {
    destPath = `${destDir}/${file.basename}-${Date.now()}.${file.extension}`;
  }
  await app.vault.rename(file, destPath);
}
const LS_LAST_PULL = "gantt_sync_last_pull_at";
class GanttSyncService {
  baseUrl;
  email;
  password;
  token = null;
  constructor(baseUrl, email, password) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.email = email;
    this.password = password;
  }
  async _fetch(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers ?? {}
    };
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;
    const res = await fetch(url, { ...options, headers });
    const text2 = await res.text();
    let json;
    try {
      json = JSON.parse(text2);
    } catch {
      json = { error: text2 };
    }
    if (!res.ok) throw new Error(json?.error ?? json?.message ?? `HTTP ${res.status}`);
    return json;
  }
  /** Authenticate and cache the JWT. Throws on failure. */
  async login() {
    const data = await this._fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: this.email, password: this.password })
    });
    this.token = data.token ?? data.access_token ?? null;
    if (!this.token) throw new Error("Login response missing token");
  }
  /**
   * Full bidirectional sync:
   *  1. Read all local .md tasks with their updatedAt timestamps.
   *  2. Push them all to the server (server uses "highest timestamp wins").
   *  3. Server returns any tasks where it held a NEWER version (conflicts).
   *     Apply those server-wins back to local .md files.
   *  4. Pull everything updated on the server since our last pull timestamp.
   *     Apply those to local .md files (create / update / delete).
   *
   * Returns a summary { pushed, pulled, conflicts, deleted, conflictTasks }.
   * `conflictTasks` are the raw server objects for tasks where the server won —
   * callers can present these to the user and call forcePushTasks() if they
   * choose to override the server with their local version.
   */
  async syncAll(app, projectsFolder) {
    const since = parseInt(localStorage.getItem(LS_LAST_PULL) ?? "0", 10) || 0;
    const projects = await loadProjects(app, projectsFolder);
    const localTasks = [].concat(...projects.map((p) => p.tasks));
    const localById = new Map(localTasks.map((t) => [t.id, t]));
    let pushed = 0;
    let serverConflicts = [];
    if (localTasks.length > 0) {
      const payload = localTasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        start_date: t.startDate ?? "",
        end_date: t.endDate ?? "",
        assignee: t.assignee ?? "",
        tags: (t.tags ?? []).join(","),
        description: t.description ?? "",
        project_folder: t.projectFolder ?? "",
        file_path: t.filePath ?? "",
        updatedAt: t.updatedAt || Date.now()
        // ← critical: server uses this for conflict resolution
      }));
      const pushResult = await this._fetch("/tasks/push", {
        method: "POST",
        body: JSON.stringify({ tasks: payload })
      });
      pushed = pushResult.accepted?.length ?? 0;
      serverConflicts = pushResult.conflicts ?? [];
    }
    let conflicts = 0;
    for (const rt of serverConflicts) {
      await this._applyRemoteTask(app, rt, projectsFolder, localById);
      conflicts++;
    }
    const pullResult = await this._fetch(`/tasks/pull?since=${since}`);
    const remoteTasks = pullResult.tasks ?? [];
    const pulledAt = pullResult.pulledAt ?? Date.now();
    let pulled = 0;
    let deleted = 0;
    for (const rt of remoteTasks) {
      const local = localById.get(rt.id);
      const remoteTs = rt.updatedAt ?? 0;
      const localTs = local?.updatedAt ?? 0;
      if (local && localTs >= remoteTs) continue;
      if (rt.isArchived) {
        if (local) {
          const file = app.vault.getFileByPath(local.filePath);
          if (file) {
            await app.vault.delete(file);
            deleted++;
          }
        }
      } else {
        await this._applyRemoteTask(app, rt, projectsFolder, localById);
        pulled++;
      }
    }
    localStorage.setItem(LS_LAST_PULL, String(pulledAt));
    return { pushed, pulled, conflicts, deleted, conflictTasks: serverConflicts };
  }
  /**
   * Force-push local versions of conflicting tasks, overriding the server.
   *
   * For each task in `localTasks`, we bump `updatedAt` to `serverTs + 1` so it
   * is strictly newer than the server copy.  The server's "highest timestamp
   * wins" logic will then accept our version and propagate it to every other
   * client (e.g. the Flutter app) on their next pull.
   *
   * @param app            Obsidian App instance
   * @param projectsFolder Root folder for task .md files
   * @param conflictTasks  The raw server objects returned in `syncAll().conflictTasks`
   */
  async forcePushTasks(app, projectsFolder, conflictTasks) {
    if (conflictTasks.length === 0) return;
    const projects = await loadProjects(app, projectsFolder);
    const localById = new Map(
      [].concat(...projects.map((p) => p.tasks)).map((t) => [t.id, t])
    );
    const overrideTasks = conflictTasks.map((rt) => {
      const local = localById.get(rt.id);
      const serverTs = rt.updatedAt ?? 0;
      const winningTs = serverTs + 1;
      if (local) {
        const filePath = local.filePath;
        app.vault.adapter.read(filePath).then(async (content) => {
          const updated = content.replace(/^updated_at:\s*.+$/m, `updated_at: ${winningTs}`).replace(/\n---\n/, `
updated_at: ${winningTs}
---
`);
          if (updated !== content) {
            await app.vault.adapter.write(filePath, updated);
          }
        }).catch(() => {
        });
      }
      return {
        id: rt.id,
        title: local?.title ?? rt.title,
        status: local?.status ?? rt.status,
        priority: local?.priority ?? rt.priority,
        start_date: local?.startDate ?? rt.startDate ?? rt.start_date ?? "",
        end_date: local?.endDate ?? rt.endDate ?? rt.end_date ?? "",
        assignee: local?.assignee ?? rt.assignee ?? "",
        tags: (local?.tags ?? []).join(","),
        description: local?.description ?? rt.description ?? "",
        project_folder: local?.projectFolder ?? rt.project_folder ?? "",
        file_path: local?.filePath ?? rt.file_path ?? "",
        updatedAt: winningTs
        // beats the server — guaranteed win
      };
    });
    await this._fetch("/tasks/push", {
      method: "POST",
      body: JSON.stringify({ tasks: overrideTasks })
    });
  }
  /**
   * Write a remote task object into the vault as a .md file.
   * If a local file for this task already exists, update it in-place.
   * Preserves the body content (Description / Notes sections) of existing files.
   */
  async _applyRemoteTask(app, rt, projectsFolder, localById) {
    const local = localById.get(rt.id);
    let filePath;
    if (local?.filePath) {
      filePath = local.filePath;
    } else {
      const folder = rt.project_folder || `${projectsFolder}/Synced`;
      await app.vault.adapter.mkdir(folder).catch(() => {
      });
      const safeName = (rt.title ?? rt.id).replace(/[/\\:*?"<>|]/g, "_");
      filePath = `${folder}/${safeName}.md`;
    }
    const newFm = generateTaskFrontmatter({
      id: rt.id,
      title: rt.title,
      status: rt.status,
      priority: rt.priority,
      startDate: rt.startDate ?? rt.start_date ?? "",
      endDate: rt.endDate ?? rt.end_date ?? "",
      assignee: rt.assignee ?? "",
      tags: rt.tags ? typeof rt.tags === "string" ? rt.tags.split(",").map((t) => t.trim()).filter(Boolean) : rt.tags : [],
      description: rt.description ?? "",
      parentId: rt.parentId ?? rt.parent_id ?? "",
      updatedAt: rt.updatedAt ?? 0
    });
    const existingFile = app.vault.getFileByPath(filePath);
    if (existingFile) {
      const oldContent = await app.vault.read(existingFile);
      const bodyMatch = oldContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
      const body = bodyMatch ? bodyMatch[1] : "\n# " + (rt.title ?? "") + "\n\n## Description\n\n\n\n## Notes\n\n";
      const newContent = newFm.replace(/\n---\n[\s\S]*$/, "\n---\n") + body.replace(/^\n/, "");
      await app.vault.modify(existingFile, newContent);
    } else {
      await app.vault.create(filePath, newFm);
    }
  }
}
class SyncConflictModal extends obsidian.Modal {
  conflicts;
  svc;
  plugin;
  onResolved;
  constructor(app, plugin, svc, conflicts, onResolved) {
    super(app);
    this.plugin = plugin;
    this.svc = svc;
    this.conflicts = conflicts;
    this.onResolved = onResolved;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: `⚠️ ${this.conflicts.length} sync conflict${this.conflicts.length > 1 ? "s" : ""}` });
    contentEl.createEl("p", {
      text: "The server has newer versions of these tasks. Choose how to resolve:",
      cls: "setting-item-description"
    });
    const list = contentEl.createEl("ul");
    for (const c of this.conflicts) {
      list.createEl("li", { text: c.title ?? c.id ?? "(unknown)" });
    }
    const btnRow = contentEl.createDiv({ cls: "modal-button-container" });
    btnRow.style.display = "flex";
    btnRow.style.gap = "8px";
    btnRow.style.justifyContent = "flex-end";
    btnRow.style.marginTop = "16px";
    const keepBtn = btnRow.createEl("button", { text: "Keep mine (override server)" });
    keepBtn.addEventListener("click", async () => {
      keepBtn.disabled = true;
      keepBtn.textContent = "Pushing…";
      try {
        await this.svc.forcePushTasks(this.app, this.plugin.settings.projectsFolder, this.conflicts);
        new obsidian.Notice(`✅ Your version pushed — server updated for ${this.conflicts.length} task(s).`);
      } catch (e) {
        new obsidian.Notice(`❌ Force-push failed: ${e.message}`);
      } finally {
        this.close();
        this.onResolved();
      }
    });
    const acceptBtn = btnRow.createEl("button", { text: "Accept server", cls: "mod-cta" });
    acceptBtn.addEventListener("click", () => {
      new obsidian.Notice(`✅ Server versions accepted for ${this.conflicts.length} task(s).`);
      this.close();
      this.onResolved();
    });
  }
  onClose() {
    this.contentEl.empty();
  }
}
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
      (text2) => text2.setPlaceholder("Projects").setValue(this.plugin.settings.projectsFolder).onChange(async (value) => {
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
    containerEl.createEl("h3", { text: "Cloud Sync (optional)" });
    containerEl.createEl("p", {
      text: "Connect to a self-hosted gantt backend to sync tasks across devices.",
      cls: "setting-item-description"
    });
    new obsidian.Setting(containerEl).setName("Server URL").setDesc("Base URL of your sync backend, e.g. https://yourname.heliohost.us/obgantt/backend").addText(
      (text2) => text2.setPlaceholder("https://…/backend").setValue(this.plugin.settings.syncBaseUrl).onChange(async (value) => {
        this.plugin.settings.syncBaseUrl = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new obsidian.Setting(containerEl).setName("Email").setDesc("Account email address for the sync server.").addText(
      (text2) => text2.setPlaceholder("you@example.com").setValue(this.plugin.settings.syncEmail).onChange(async (value) => {
        this.plugin.settings.syncEmail = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new obsidian.Setting(containerEl).setName("Password").setDesc("Account password. Stored in Obsidian plugin data.").addText((text2) => {
      text2.inputEl.type = "password";
      text2.setPlaceholder("••••••••").setValue(this.plugin.settings.syncPassword).onChange(async (value) => {
        this.plugin.settings.syncPassword = value;
        await this.plugin.saveSettings();
      });
    });
    const syncStatusEl = containerEl.createEl("p", {
      text: "",
      cls: "setting-item-description"
    });
    new obsidian.Setting(containerEl).setName("Sync now").setDesc("Manually pull & push all tasks with the server.").addButton(
      (btn) => btn.setButtonText("Sync").setCta().onClick(async () => {
        const { syncBaseUrl, syncEmail, syncPassword } = this.plugin.settings;
        if (!syncBaseUrl || !syncEmail || !syncPassword) {
          syncStatusEl.textContent = "⚠️  Fill in Server URL, Email, and Password first.";
          return;
        }
        btn.setDisabled(true).setButtonText("Syncing…");
        syncStatusEl.textContent = "";
        try {
          const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
          await svc.login();
          const result = await svc.syncAll(this.plugin.app, this.plugin.settings.projectsFolder);
          const summary = `↑${result.pushed} pushed, ↓${result.pulled} pulled, ${result.deleted} deleted`;
          if (result.conflictTasks.length > 0) {
            syncStatusEl.textContent = `⚠️  Sync done — ${summary}. ${result.conflictTasks.length} conflict(s) need resolution.`;
            new SyncConflictModal(
              this.plugin.app,
              this.plugin,
              svc,
              result.conflictTasks,
              () => {
                syncStatusEl.textContent = `✅  Resolved — ${summary}.`;
              }
            ).open();
          } else {
            syncStatusEl.textContent = `✅  Sync complete — ${summary}.`;
          }
        } catch (e) {
          syncStatusEl.textContent = `❌  ${e.message}`;
        } finally {
          btn.setDisabled(false).setButtonText("Sync");
        }
      })
    );
  }
}
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined") {
  ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
}
enable_legacy_mode_flag();
var root_3$3 = /* @__PURE__ */ from_html(`<div class="card-parent-label svelte-x7v2jt"><span class="parent-dot svelte-x7v2jt"></span> </div>`);
var root_5$2 = /* @__PURE__ */ from_html(`<span class="tag svelte-x7v2jt"> </span>`);
var root_4$2 = /* @__PURE__ */ from_html(`<div class="card-tags svelte-x7v2jt"></div>`);
var root_6$1 = /* @__PURE__ */ from_html(`<div class="card-subtasks svelte-x7v2jt"><span class="subtask-count svelte-x7v2jt"> </span> <div class="subtask-progress svelte-x7v2jt"><div class="subtask-fill svelte-x7v2jt"></div></div></div>`);
var root_7$1 = /* @__PURE__ */ from_html(`<div class="card-dates svelte-x7v2jt"><span> </span></div>`);
var root_8$1 = /* @__PURE__ */ from_html(`<button class="btn-add-subtask svelte-x7v2jt" title="Add subtask">+ Subtask</button>`);
var root_2$2 = /* @__PURE__ */ from_html(`<div draggable="true" role="listitem"><!> <div class="card-header svelte-x7v2jt"><span class="card-title svelte-x7v2jt" role="button" tabindex="0"> </span> <span class="priority-badge svelte-x7v2jt"> </span></div> <!> <!> <!> <div class="card-footer svelte-x7v2jt"><!> <button class="btn-archive svelte-x7v2jt" title="Archive task">📦</button></div></div>`);
var root_9$2 = /* @__PURE__ */ from_html(`<div class="kanban-empty svelte-x7v2jt">Drop tasks here</div>`);
var root_1$3 = /* @__PURE__ */ from_html(`<div role="list"><div class="kanban-col-header svelte-x7v2jt"><span class="col-title svelte-x7v2jt"> </span> <span class="col-count svelte-x7v2jt"> </span></div> <div class="kanban-cards svelte-x7v2jt"><!> <!></div></div>`);
var root$3 = /* @__PURE__ */ from_html(`<div class="kanban-board svelte-x7v2jt"></div>`);
function KanbanBoard($$anchor, $$props) {
  push($$props, false);
  const cards = /* @__PURE__ */ mutable_source();
  const colCards = /* @__PURE__ */ mutable_source();
  let tasks = prop($$props, "tasks", 24, () => []);
  let onOpenTask = prop($$props, "onOpenTask", 8, () => {
  });
  let onStatusChange = prop($$props, "onStatusChange", 8, () => {
  });
  let onAddSubtask = prop($$props, "onAddSubtask", 8, () => {
  });
  let onArchiveTask = prop($$props, "onArchiveTask", 8, () => {
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
    "#6a9ef7"
  ];
  let statusOverrides = /* @__PURE__ */ mutable_source({});
  function computeColCards(cards2, overrides) {
    const result = { "todo": [], "in-progress": [], "blocked": [], "done": [] };
    for (const c of cards2) {
      const status = c.id in overrides ? overrides[c.id] : c.status;
      result[status].push({ ...c, status });
    }
    return result;
  }
  function buildCards(tasks2) {
    const result = [];
    tasks2.forEach((task, taskIdx) => {
      const parentColor = PALETTE[taskIdx % PALETTE.length];
      result.push({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate,
        tags: task.tags,
        filePath: task.filePath,
        isSubtask: false,
        parentId: "",
        parentTitle: "",
        accentColor: parentColor,
        subtaskCount: task.subtasks.length,
        subtaskDone: task.subtasks.filter((s) => s.status === "done").length
      });
      for (const sub of task.subtasks) {
        result.push({
          id: sub.id,
          title: sub.title,
          status: sub.status,
          priority: sub.priority ?? task.priority,
          startDate: sub.startDate,
          endDate: sub.endDate,
          tags: [],
          filePath: sub.filePath,
          isSubtask: true,
          parentId: task.id,
          parentTitle: task.title,
          accentColor: parentColor,
          subtaskCount: 0,
          subtaskDone: 0
        });
      }
    });
    return result;
  }
  let draggingId = /* @__PURE__ */ mutable_source(null);
  let dragOverCol = /* @__PURE__ */ mutable_source(null);
  const dragCounters = /* @__PURE__ */ new Map();
  function onDragStart(card, e) {
    set(draggingId, card.id);
    e.dataTransfer.setData("text/plain", card.id);
    e.dataTransfer.effectAllowed = "move";
  }
  function onDragEnd() {
    set(draggingId, null);
    set(dragOverCol, null);
    dragCounters.clear();
  }
  function onDragEnter(colId, e) {
    e.preventDefault();
    const n = (dragCounters.get(colId) ?? 0) + 1;
    dragCounters.set(colId, n);
    set(dragOverCol, colId);
  }
  function onDragOver(colId, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
  function onDragLeave(colId) {
    const n = Math.max(0, (dragCounters.get(colId) ?? 1) - 1);
    dragCounters.set(colId, n);
    if (n === 0 && get(dragOverCol) === colId) set(dragOverCol, null);
  }
  function onDrop(colId, e) {
    e.preventDefault();
    if (get(draggingId)) {
      set(statusOverrides, { ...get(statusOverrides), [get(draggingId)]: colId });
      onStatusChange()(get(draggingId), colId);
    }
    set(draggingId, null);
    set(dragOverCol, null);
    dragCounters.set(colId, 0);
  }
  const priorityColors = {
    low: "#6bb6ff",
    medium: "#ffcd5e",
    high: "#ff8c42",
    critical: "#e84040"
  };
  const priorityLabel = (p) => p.charAt(0).toUpperCase() + p.slice(1);
  legacy_pre_effect(() => deep_read_state(tasks()), () => {
    set(cards, buildCards(tasks()));
  });
  legacy_pre_effect(
    () => (deep_read_state(tasks()), get(statusOverrides), get(cards)),
    () => {
      if (tasks()) {
        const settled = Object.keys(get(statusOverrides)).filter((id) => {
          const card = get(cards).find((c) => c.id === id);
          return card && card.status === get(statusOverrides)[id];
        });
        if (settled.length > 0) {
          const next = { ...get(statusOverrides) };
          for (const id of settled) delete next[id];
          set(statusOverrides, next);
        }
      }
    }
  );
  legacy_pre_effect(() => (get(cards), get(statusOverrides)), () => {
    set(colCards, computeColCards(get(cards), get(statusOverrides)));
  });
  legacy_pre_effect_reset();
  init();
  var div = root$3();
  each(div, 5, () => columns, index, ($$anchor2, col) => {
    var div_1 = root_1$3();
    let classes;
    var div_2 = child(div_1);
    var span = child(div_2);
    var text2 = child(span);
    var span_1 = sibling(span, 2);
    var text_1 = child(span_1);
    var div_3 = sibling(div_2, 2);
    var node = child(div_3);
    each(
      node,
      1,
      () => (get(colCards), get(col), untrack(() => get(colCards)[get(col).id])),
      (card) => card.id,
      ($$anchor3, card) => {
        var div_4 = root_2$2();
        let classes_1;
        var node_1 = child(div_4);
        {
          var consequent = ($$anchor4) => {
            var div_5 = root_3$3();
            var span_2 = child(div_5);
            var text_2 = sibling(span_2);
            template_effect(() => {
              set_style(span_2, `background:${(get(card), untrack(() => get(card).accentColor)) ?? ""}`);
              set_text(text_2, ` ${(get(card), untrack(() => get(card).parentTitle)) ?? ""}`);
            });
            append($$anchor4, div_5);
          };
          if_block(node_1, ($$render) => {
            if (get(card), untrack(() => get(card).isSubtask)) $$render(consequent);
          });
        }
        var div_6 = sibling(node_1, 2);
        var span_3 = child(div_6);
        var text_3 = child(span_3);
        var span_4 = sibling(span_3, 2);
        var text_4 = child(span_4);
        var node_2 = sibling(div_6, 2);
        {
          var consequent_1 = ($$anchor4) => {
            var div_7 = root_4$2();
            each(div_7, 5, () => (get(card), untrack(() => get(card).tags)), index, ($$anchor5, tag) => {
              var span_5 = root_5$2();
              var text_5 = child(span_5);
              template_effect(() => set_text(text_5, `#${get(tag) ?? ""}`));
              append($$anchor5, span_5);
            });
            append($$anchor4, div_7);
          };
          if_block(node_2, ($$render) => {
            if (get(card), untrack(() => get(card).tags.length > 0)) $$render(consequent_1);
          });
        }
        var node_3 = sibling(node_2, 2);
        {
          var consequent_2 = ($$anchor4) => {
            var div_8 = root_6$1();
            var span_6 = child(div_8);
            var text_6 = child(span_6);
            var div_9 = sibling(span_6, 2);
            var div_10 = child(div_9);
            template_effect(() => {
              set_text(text_6, `${(get(card), untrack(() => get(card).subtaskDone)) ?? ""}/${(get(card), untrack(() => get(card).subtaskCount)) ?? ""} subtasks`);
              set_style(div_10, `width:${(get(card), untrack(() => get(card).subtaskDone / get(card).subtaskCount * 100)) ?? ""}%`);
            });
            append($$anchor4, div_8);
          };
          if_block(node_3, ($$render) => {
            if (get(card), untrack(() => get(card).subtaskCount > 0)) $$render(consequent_2);
          });
        }
        var node_4 = sibling(node_3, 2);
        {
          var consequent_3 = ($$anchor4) => {
            var div_11 = root_7$1();
            var span_7 = child(div_11);
            var text_7 = child(span_7);
            template_effect(() => set_text(text_7, `� Due: ${(get(card), untrack(() => get(card).endDate)) ?? ""}`));
            append($$anchor4, div_11);
          };
          if_block(node_4, ($$render) => {
            if (get(card), untrack(() => get(card).endDate)) $$render(consequent_3);
          });
        }
        var div_12 = sibling(node_4, 2);
        var node_5 = child(div_12);
        {
          var consequent_4 = ($$anchor4) => {
            var button = root_8$1();
            event("click", button, stopPropagation(() => onAddSubtask()(get(card).id, get(card).title)));
            append($$anchor4, button);
          };
          if_block(node_5, ($$render) => {
            if (get(card), untrack(() => !get(card).isSubtask)) $$render(consequent_4);
          });
        }
        var button_1 = sibling(node_5, 2);
        template_effect(
          ($0) => {
            classes_1 = set_class(div_4, 1, "kanban-card svelte-x7v2jt", null, classes_1, {
              dragging: get(draggingId) === get(card).id,
              "is-subtask": get(card).isSubtask
            });
            set_style(div_4, `border-left-color: ${(get(card), untrack(() => get(card).accentColor)) ?? ""}`);
            set_text(text_3, (get(card), untrack(() => get(card).title)));
            set_style(span_4, `background:${(get(card), untrack(() => priorityColors[get(card).priority] ?? "#888")) ?? ""}`);
            set_text(text_4, $0);
          },
          [
            () => (get(card), untrack(() => priorityLabel(get(card).priority)))
          ]
        );
        event("click", span_3, () => onOpenTask()(get(card).filePath));
        event("keydown", span_3, (e) => e.key === "Enter" && onOpenTask()(get(card).filePath));
        event("click", button_1, stopPropagation(() => onArchiveTask()(get(card).id, get(card).filePath, get(card).isSubtask)));
        event("dragstart", div_4, (e) => onDragStart(get(card), e));
        event("dragend", div_4, onDragEnd);
        append($$anchor3, div_4);
      }
    );
    var node_6 = sibling(node, 2);
    {
      var consequent_5 = ($$anchor3) => {
        var div_13 = root_9$2();
        append($$anchor3, div_13);
      };
      if_block(node_6, ($$render) => {
        if (get(colCards), get(col), untrack(() => get(colCards)[get(col).id].length === 0)) $$render(consequent_5);
      });
    }
    template_effect(() => {
      classes = set_class(div_1, 1, "kanban-column svelte-x7v2jt", null, classes, { "drag-over": get(dragOverCol) === get(col).id });
      set_style(div_2, `border-top: 3px solid ${(get(col), untrack(() => get(col).color)) ?? ""}`);
      set_text(text2, (get(col), untrack(() => get(col).label)));
      set_text(text_1, (get(colCards), get(col), untrack(() => get(colCards)[get(col).id].length)));
    });
    event("dragenter", div_1, (e) => onDragEnter(get(col).id, e));
    event("dragover", div_1, (e) => onDragOver(get(col).id, e));
    event("dragleave", div_1, () => onDragLeave(get(col).id));
    event("drop", div_1, (e) => onDrop(get(col).id, e));
    append($$anchor2, div_1);
  });
  append($$anchor, div);
  pop();
}
var root_3$2 = /* @__PURE__ */ from_html(`<button class="expand-btn svelte-152mm6m" aria-label="Toggle subtasks"> </button>`);
var root_4$1 = /* @__PURE__ */ from_html(`<span class="expand-placeholder svelte-152mm6m"></span>`);
var root_5$1 = /* @__PURE__ */ from_html(`<span class="expand-placeholder svelte-152mm6m"></span>`);
var root_6 = /* @__PURE__ */ from_html(`<span class="gantt-parent-label svelte-152mm6m"> </span>`);
var root_7 = /* @__PURE__ */ from_html(`<button class="gantt-add-subtask-btn svelte-152mm6m" title="Add subtask">+</button>`);
var root_1$2 = /* @__PURE__ */ from_html(`<div><!> <div class="gantt-task-label-wrap svelte-152mm6m"><span class="gantt-task-link svelte-152mm6m" role="link" tabindex="0"> </span> <!></div> <span class="status-dot svelte-152mm6m"></span> <!> <button class="gantt-archive-btn svelte-152mm6m" title="Archive task">📦</button></div>`);
var root_8 = /* @__PURE__ */ from_html(`<div class="gantt-month-label-cell svelte-152mm6m"> </div>`);
var root_9$1 = /* @__PURE__ */ from_html(`<div> </div>`);
var root_10 = /* @__PURE__ */ from_html(`<div class="today-line svelte-152mm6m"></div>`);
var root_12 = /* @__PURE__ */ from_html(`<div role="button" tabindex="-1" aria-label="Set date"></div>`);
var root_13 = /* @__PURE__ */ from_html(`<div class="gantt-bar svelte-152mm6m"><div class="bar-handle bar-handle-left svelte-152mm6m"></div> <span class="bar-label svelte-152mm6m"> </span> <div class="bar-handle bar-handle-right svelte-152mm6m"></div></div>`);
var root_11 = /* @__PURE__ */ from_html(`<div class="gantt-grid-row svelte-152mm6m"><!> <!></div>`);
var root$2 = /* @__PURE__ */ from_html(`<div class="gantt-wrapper svelte-152mm6m"><div class="gantt-left svelte-152mm6m"><div class="left-header-spacer svelte-152mm6m"><div class="left-day-spacer svelte-152mm6m">Tasks</div></div> <div class="gantt-left-rows svelte-152mm6m"></div></div> <div class="gantt-right svelte-152mm6m"><div class="gantt-inner svelte-152mm6m"><div class="gantt-header-days svelte-152mm6m"><div class="gantt-month-labels svelte-152mm6m"></div> <div class="gantt-day-numbers svelte-152mm6m"></div></div> <div class="gantt-rows-container svelte-152mm6m" style="position:relative;"><!> <!></div></div></div></div>`);
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
  let onAddSubtask = prop($$props, "onAddSubtask", 8, () => {
  });
  let onArchiveTask = prop($$props, "onArchiveTask", 8, () => {
  });
  const DAY_WIDTH = 32;
  const ROW_HEIGHT = 40;
  function computeDateRange(tasks2) {
    let earliest = null;
    let latest = null;
    const collect = (t) => {
      if (t.startDate) {
        const d = parseDate(t.startDate);
        if (d && (!earliest || d < earliest)) earliest = d;
      }
      if (t.endDate) {
        const d = parseDate(t.endDate);
        if (d && (!latest || d > latest)) latest = d;
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
    if (!s || typeof s !== "string") return null;
    const parts = s.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    const [y, m, d] = parts;
    return new Date(y, m - 1, d);
  }
  function toISODate(d) {
    if (!d || isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function dayIndex(dateStr) {
    if (!dateStr) return -1;
    const d = parseDate(dateStr);
    if (!d) return -1;
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
    "#6a9ef7"
  ];
  let expanded = /* @__PURE__ */ mutable_source(/* @__PURE__ */ new Set());
  function toggleExpand(id) {
    if (get(expanded).has(id)) {
      get(expanded).delete(id);
    } else {
      get(expanded).add(id);
    }
    set(expanded, new Set(get(
      expanded
      // new reference — forces $: rows to re-run
    )));
  }
  function buildRows(tasks2, expanded2) {
    const result = [];
    tasks2.forEach((t, taskIdx) => {
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
        parentTitle: ""
      });
      if (t.subtasks.length > 0 && expanded2.has(t.id)) {
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
            barColor: taskColor,
            // ← same color as parent
            parentTitle: t.title
          });
        }
      }
    });
    return result;
  }
  let dragState = null;
  let barOverrides = /* @__PURE__ */ mutable_source(/* @__PURE__ */ new Map());
  function getBar(row) {
    const override = get(barOverrides).get(row.id);
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
    get(barOverrides).set(dragState.rowId, { startDay: newStart, endDay: newEnd });
    set(
      barOverrides,
      // trigger reactivity
      get(barOverrides)
    );
  }
  function onMouseUp() {
    if (dragState) {
      const override = get(barOverrides).get(dragState.rowId);
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
    todo: "#6bb6ff",
    "in-progress": "#ffcd5e",
    blocked: "#e84040",
    done: "#4caf50"
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
  legacy_pre_effect(() => (deep_read_state(tasks()), get(expanded)), () => {
    set(rows, buildRows(tasks(), get(expanded)));
  });
  legacy_pre_effect(() => deep_read_state(tasks()), () => {
    tasks();
    set(barOverrides, /* @__PURE__ */ new Map());
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
            var text2 = child(button);
            template_effect(($0) => set_text(text2, $0), [
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
        var span_2 = root_5$1();
        append($$anchor3, span_2);
      };
      if_block(node, ($$render) => {
        if (get(row), untrack(() => !get(row).isSubtask)) $$render(consequent_1);
        else $$render(alternate_1, false);
      });
    }
    var div_4 = sibling(node, 2);
    var span_3 = child(div_4);
    var text_1 = child(span_3);
    var node_2 = sibling(span_3, 2);
    {
      var consequent_2 = ($$anchor3) => {
        var span_4 = root_6();
        var text_2 = child(span_4);
        template_effect(() => set_text(text_2, (get(row), untrack(() => get(row).parentTitle))));
        append($$anchor3, span_4);
      };
      if_block(node_2, ($$render) => {
        if (get(row), untrack(() => get(row).isSubtask && get(row).parentTitle)) $$render(consequent_2);
      });
    }
    var span_5 = sibling(div_4, 2);
    var node_3 = sibling(span_5, 2);
    {
      var consequent_3 = ($$anchor3) => {
        var button_1 = root_7();
        event("click", button_1, stopPropagation(() => onAddSubtask()(get(row).id, get(row).title)));
        append($$anchor3, button_1);
      };
      if_block(node_3, ($$render) => {
        if (get(row), untrack(() => !get(row).isSubtask)) $$render(consequent_3);
      });
    }
    var button_2 = sibling(node_3, 2);
    template_effect(() => {
      classes = set_class(div_3, 1, "gantt-left-row svelte-152mm6m", null, classes, { "subtask-row": get(row).isSubtask });
      set_style(div_3, `height:40px; padding-left:${(get(row), untrack(() => 8 + get(row).depth * 18)) ?? ""}px; border-left: 3px solid ${(get(row), untrack(() => get(row).barColor)) ?? ""};`);
      set_attribute(span_3, "title", (get(row), untrack(() => get(row).title)));
      set_text(text_1, (get(row), untrack(() => get(row).title)));
      set_style(span_5, `background:${(get(row), untrack(() => statusColors[get(row).status] ?? "#888")) ?? ""}`);
    });
    event("click", span_3, () => onOpenTask()(get(row).filePath));
    event("keydown", span_3, (e) => e.key === "Enter" && onOpenTask()(get(row).filePath));
    event("click", button_2, stopPropagation(() => onArchiveTask()(get(row).id, get(row).filePath, get(row).isSubtask)));
    append($$anchor2, div_3);
  });
  bind_this(div_2, ($$value) => set(leftRowsEl, $$value), () => get(leftRowsEl));
  var div_5 = sibling(div_1, 2);
  var div_6 = child(div_5);
  var div_7 = child(div_6);
  var div_8 = child(div_7);
  each(div_8, 5, () => get(headerMonths), index, ($$anchor2, m) => {
    var div_9 = root_8();
    var text_3 = child(div_9);
    template_effect(() => {
      set_style(div_9, `width:${(get(m), untrack(() => get(m).span * DAY_WIDTH)) ?? ""}px`);
      set_text(text_3, (get(m), untrack(() => get(m).label)));
    });
    append($$anchor2, div_9);
  });
  var div_10 = sibling(div_8, 2);
  each(div_10, 5, () => get(dayHeaders), index, ($$anchor2, dh) => {
    var div_11 = root_9$1();
    let classes_1;
    set_style(div_11, "width:32px");
    var text_4 = child(div_11);
    template_effect(() => {
      classes_1 = set_class(div_11, 1, "gantt-day-cell svelte-152mm6m", null, classes_1, { weekend: get(dh).isWeekend, "today-col": get(dh).isToday });
      set_text(text_4, (get(dh), untrack(() => get(dh).day)));
    });
    append($$anchor2, div_11);
  });
  var div_12 = sibling(div_7, 2);
  var node_4 = child(div_12);
  {
    var consequent_4 = ($$anchor2) => {
      var div_13 = root_10();
      template_effect(() => set_style(div_13, `left:${get(todayIdx) * DAY_WIDTH + DAY_WIDTH / 2}px; height:${(get(rows), untrack(() => get(rows).length * ROW_HEIGHT)) ?? ""}px`));
      append($$anchor2, div_13);
    };
    if_block(node_4, ($$render) => {
      if (get(todayIdx), get(dateRange), untrack(() => get(todayIdx) >= 0 && get(todayIdx) < get(dateRange).days)) $$render(consequent_4);
    });
  }
  var node_5 = sibling(node_4, 2);
  each(node_5, 1, () => get(rows), (row) => row.id, ($$anchor2, row) => {
    var div_14 = root_11();
    set_style(div_14, "height:40px");
    var node_6 = child(div_14);
    each(node_6, 1, () => get(dayHeaders), index, ($$anchor3, dh, i) => {
      var div_15 = root_12();
      let classes_2;
      set_style(div_15, "width:32px");
      template_effect(() => classes_2 = set_class(div_15, 1, "gantt-grid-cell svelte-152mm6m", null, classes_2, { weekend: get(dh).isWeekend, "today-col": get(dh).isToday }));
      event("click", div_15, () => onCellClick(get(row), i));
      append($$anchor3, div_15);
    });
    var node_7 = sibling(node_6, 2);
    {
      var consequent_5 = ($$anchor3) => {
        const bar = /* @__PURE__ */ derived_safe_equal(() => (get(row), untrack(() => getBar(get(row)))));
        var div_16 = root_13();
        var div_17 = child(div_16);
        var span_6 = sibling(div_17, 2);
        var text_5 = child(span_6);
        var div_18 = sibling(span_6, 2);
        template_effect(() => {
          set_style(div_16, `left:${(deep_read_state(get(bar)), untrack(() => get(bar).startDay * DAY_WIDTH)) ?? ""}px; width:${(deep_read_state(get(bar)), untrack(() => (get(bar).endDay - get(bar).startDay + 1) * DAY_WIDTH)) ?? ""}px; background:${(get(row), untrack(() => get(row).barColor)) ?? ""}; top:8px;`);
          set_text(text_5, (get(row), untrack(() => get(row).title)));
        });
        event("mousedown", div_17, (e) => onBarMouseDown(get(row), "resize-start", e));
        event("mousedown", div_18, (e) => onBarMouseDown(get(row), "resize-end", e));
        event("mousedown", div_16, (e) => onBarMouseDown(get(row), "move", e));
        append($$anchor3, div_16);
      };
      var d_1 = /* @__PURE__ */ user_derived(() => (get(row), untrack(() => getBar(get(row)))));
      if_block(node_7, ($$render) => {
        if (get(d_1)) $$render(consequent_5);
      });
    }
    append($$anchor2, div_14);
  });
  bind_this(div_5, ($$value) => set(rightPanelEl, $$value), () => get(rightPanelEl));
  template_effect(() => set_style(div_6, `width:${(get(dateRange), untrack(() => get(dateRange).days * DAY_WIDTH)) ?? ""}px`));
  event("scroll", div_5, syncScroll);
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
  var text2 = child(h2);
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
    set_text(text2, parentId() ? `New Subtask` : "New Task");
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
var root_5 = /* @__PURE__ */ from_html(`<span class="sync-icon spinning svelte-gjpmyc">↻</span> Syncing…`, 1);
var root_4 = /* @__PURE__ */ from_html(`<button title="Sync with server"><!></button>`);
var root_9 = /* @__PURE__ */ from_html(`<div class="empty-state svelte-gjpmyc"><div class="empty-icon svelte-gjpmyc">📁</div> <p>No project selected. Create a folder inside your configured projects folder to get started.</p></div>`);
var root = /* @__PURE__ */ from_html(`<div class="project-view svelte-gjpmyc"><div class="topbar svelte-gjpmyc"><div class="project-selector svelte-gjpmyc"><span class="topbar-label svelte-gjpmyc">Project:</span> <!> <!></div> <div class="view-switcher svelte-gjpmyc"><button title="Gantt Chart">📊 Gantt</button> <button title="Kanban Board">🗂 Kanban</button></div> <div class="topbar-actions svelte-gjpmyc"><!> <!> <button title="Refresh">↺</button></div></div> <div class="view-container svelte-gjpmyc"><!></div></div> <!>`, 1);
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
  let onArchiveTask = prop($$props, "onArchiveTask", 8);
  let onOpenTask = prop($$props, "onOpenTask", 8);
  let loadProjectsFn = prop($$props, "loadProjectsFn", 8, async () => []);
  let onViewModeChange = prop($$props, "onViewModeChange", 8, () => {
  });
  let onActiveProjectChange = prop($$props, "onActiveProjectChange", 8, () => {
  });
  let onSync = prop($$props, "onSync", 8, null);
  let liveProjects = /* @__PURE__ */ mutable_source(projects());
  let loading = /* @__PURE__ */ mutable_source(false);
  let syncState = /* @__PURE__ */ mutable_source("idle");
  let syncLabel = /* @__PURE__ */ mutable_source("");
  async function handleSync() {
    if (!onSync() || get(syncState) === "syncing") return;
    set(syncState, "syncing");
    set(syncLabel, "");
    try {
      await onSync()();
      await refresh();
      set(syncState, "ok");
      set(syncLabel, "Synced");
    } catch (e) {
      set(syncState, "error");
      set(syncLabel, e?.message ?? "Sync failed");
    } finally {
      setTimeout(
        () => {
          set(syncState, "idle");
          set(syncLabel, "");
        },
        3e3
      );
    }
  }
  async function refresh() {
    set(loading, true);
    try {
      set(liveProjects, await loadProjectsFn()());
    } finally {
      set(loading, false);
    }
  }
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
    const project = get(liveProjects)[activeProjectIndex()];
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
    await refresh();
  }
  async function handleStatusChange(projectFolder, taskId, newStatus) {
    set(liveProjects, get(liveProjects).map((proj) => ({
      ...proj,
      tasks: proj.tasks.map((task) => {
        if (task.id === taskId) return { ...task, status: newStatus };
        return {
          ...task,
          subtasks: task.subtasks.map((sub) => sub.id === taskId ? { ...sub, status: newStatus } : sub)
        };
      })
    })));
    await onStatusChange()(projectFolder, taskId, newStatus);
    await refresh();
  }
  async function handleDateChange(projectFolder, taskId, startDate, endDate) {
    set(liveProjects, get(liveProjects).map((proj) => ({
      ...proj,
      tasks: proj.tasks.map((task) => {
        if (task.id === taskId) return { ...task, startDate, endDate };
        return {
          ...task,
          subtasks: task.subtasks.map((sub) => sub.id === taskId ? { ...sub, startDate, endDate } : sub)
        };
      })
    })));
    await onDateChange()(projectFolder, taskId, startDate, endDate);
    await refresh();
  }
  async function handleArchiveTask(projectFolder, taskId, taskFilePath, isSubtask) {
    set(liveProjects, get(liveProjects).map((proj) => ({
      ...proj,
      tasks: proj.tasks.filter((task) => task.id !== taskId).map((task) => ({
        ...task,
        subtasks: task.subtasks.filter((sub) => sub.id !== taskId)
      }))
    })));
    await onArchiveTask()(projectFolder, taskId, taskFilePath, isSubtask);
    await refresh();
  }
  legacy_pre_effect(() => (get(liveProjects), deep_read_state(activeProjectIndex())), () => {
    set(currentProject, get(liveProjects)[activeProjectIndex()] ?? null);
  });
  legacy_pre_effect(() => get(currentProject), () => {
    set(currentTasks, get(currentProject)?.tasks ?? []);
  });
  legacy_pre_effect_reset();
  var $$exports = { refresh };
  init();
  var fragment = root();
  var div = first_child(fragment);
  var div_1 = child(div);
  var div_2 = child(div_1);
  var node = sibling(child(div_2), 2);
  each(node, 1, () => get(liveProjects), index, ($$anchor2, proj, i) => {
    var button = root_1();
    let classes;
    var text2 = child(button);
    template_effect(() => {
      classes = set_class(button, 1, "project-tab svelte-gjpmyc", null, classes, { active: i === activeProjectIndex() });
      set_text(text2, `📁 ${(get(proj), untrack(() => get(proj).name)) ?? ""}`);
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
      if (get(liveProjects), untrack(() => get(liveProjects).length === 0)) $$render(consequent);
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
  var node_3 = sibling(node_2, 2);
  {
    var consequent_5 = ($$anchor2) => {
      var button_4 = root_4();
      let classes_3;
      var node_4 = child(button_4);
      {
        var consequent_2 = ($$anchor3) => {
          var fragment_1 = root_5();
          append($$anchor3, fragment_1);
        };
        var consequent_3 = ($$anchor3) => {
          var text_1 = text();
          template_effect(() => set_text(text_1, `✓ ${get(syncLabel) ?? ""}`));
          append($$anchor3, text_1);
        };
        var consequent_4 = ($$anchor3) => {
          var text_2 = text("✗ Error");
          append($$anchor3, text_2);
        };
        var alternate = ($$anchor3) => {
          var text_3 = text("↻ Sync");
          append($$anchor3, text_3);
        };
        if_block(node_4, ($$render) => {
          if (get(syncState) === "syncing") $$render(consequent_2);
          else if (get(syncState) === "ok") $$render(consequent_3, 1);
          else if (get(syncState) === "error") $$render(consequent_4, 2);
          else $$render(alternate, false);
        });
      }
      template_effect(() => {
        classes_3 = set_class(button_4, 1, "btn-sync svelte-gjpmyc", null, classes_3, {
          syncing: get(syncState) === "syncing",
          ok: get(syncState) === "ok",
          error: get(syncState) === "error"
        });
        button_4.disabled = get(syncState) === "syncing";
      });
      event("click", button_4, handleSync);
      append($$anchor2, button_4);
    };
    if_block(node_3, ($$render) => {
      if (onSync()) $$render(consequent_5);
    });
  }
  var button_5 = sibling(node_3, 2);
  let classes_4;
  var div_5 = sibling(div_1, 2);
  var node_5 = child(div_5);
  {
    var consequent_6 = ($$anchor2) => {
      var div_6 = root_9();
      append($$anchor2, div_6);
    };
    var consequent_7 = ($$anchor2) => {
      GanttChart($$anchor2, {
        get tasks() {
          return get(currentTasks);
        },
        get onOpenTask() {
          return onOpenTask();
        },
        onDateChange: (taskId, startDate, endDate) => handleDateChange(get(currentProject).folderPath, taskId, startDate, endDate),
        onAddSubtask: (parentId, parentTitle) => openNewTaskModal(parentId, parentTitle),
        onArchiveTask: (taskId, filePath, isSubtask) => handleArchiveTask(get(currentProject).folderPath, taskId, filePath, isSubtask)
      });
    };
    var alternate_1 = ($$anchor2) => {
      KanbanBoard($$anchor2, {
        get tasks() {
          return get(currentTasks);
        },
        get onOpenTask() {
          return onOpenTask();
        },
        onStatusChange: (taskId, newStatus) => handleStatusChange(get(currentProject).folderPath, taskId, newStatus),
        onAddSubtask: (parentId, parentTitle) => openNewTaskModal(parentId, parentTitle),
        onArchiveTask: (taskId, filePath, isSubtask) => handleArchiveTask(get(currentProject).folderPath, taskId, filePath, isSubtask)
      });
    };
    if_block(node_5, ($$render) => {
      if (!get(currentProject)) $$render(consequent_6);
      else if (viewMode() === "gantt") $$render(consequent_7, 1);
      else $$render(alternate_1, false);
    });
  }
  var node_6 = sibling(div, 2);
  {
    var consequent_8 = ($$anchor2) => {
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
    if_block(node_6, ($$render) => {
      if (get(showModal)) $$render(consequent_8);
    });
  }
  template_effect(() => {
    classes_1 = set_class(button_1, 1, "view-btn svelte-gjpmyc", null, classes_1, { active: viewMode() === "gantt" });
    classes_2 = set_class(button_2, 1, "view-btn svelte-gjpmyc", null, classes_2, { active: viewMode() === "kanban" });
    classes_4 = set_class(button_5, 1, "btn-refresh svelte-gjpmyc", null, classes_4, { spinning: get(loading) });
  });
  event("click", button_1, () => setViewMode("gantt"));
  event("click", button_2, () => setViewMode("kanban"));
  event("click", button_5, refresh);
  append($$anchor, fragment);
  bind_prop($$props, "refresh", refresh);
  return pop($$exports);
}
const GANTT_VIEW_TYPE = "obsidian-gantt-view";
class GanttView extends obsidian.ItemView {
  plugin;
  svelteComponent = null;
  // These are kept in the TS class so they survive vault-event refreshes
  activeProjectIndex = 0;
  viewMode = "gantt";
  /** Set true during our own vault writes to suppress the vault-event re-render */
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
    this.mountSvelte();
    this.registerEvent(this.app.vault.on("create", () => {
      if (!this._writing) this.triggerComponentRefresh();
    }));
    this.registerEvent(this.app.vault.on("modify", () => {
      if (!this._writing) this.triggerComponentRefresh();
    }));
    this.registerEvent(this.app.vault.on("delete", () => {
      if (!this._writing) this.triggerComponentRefresh();
    }));
    this.registerEvent(this.app.vault.on("rename", () => {
      if (!this._writing) this.triggerComponentRefresh();
    }));
  }
  async onClose() {
    if (this.svelteComponent) {
      unmount(this.svelteComponent);
      this.svelteComponent = null;
    }
  }
  /** Called by vault events — tells the Svelte component to reload its own data */
  triggerComponentRefresh() {
    if (this.svelteComponent?.refresh) {
      this.svelteComponent.refresh();
    }
  }
  mountSvelte() {
    if (this.svelteComponent) return;
    const container = this.containerEl.children[1];
    container.empty();
    container.style.padding = "0";
    container.style.overflow = "hidden";
    this.svelteComponent = mount(ProjectView, {
      target: container,
      props: {
        projects: [],
        // initial empty; component loads via loadProjectsFn
        activeProjectIndex: this.activeProjectIndex,
        viewMode: this.viewMode,
        loadProjectsFn: () => loadProjects(this.app, this.plugin.settings.projectsFolder),
        onCreateTask: this.handleCreateTask.bind(this),
        onStatusChange: this.handleStatusChange.bind(this),
        onDateChange: this.handleDateChange.bind(this),
        onArchiveTask: this.handleArchiveTask.bind(this),
        onOpenTask: this.handleOpenTask.bind(this),
        onViewModeChange: (mode) => {
          this.viewMode = mode;
        },
        onActiveProjectChange: (idx) => {
          this.activeProjectIndex = idx;
        },
        onSync: this.handleSync.bind(this)
      }
    });
    this.triggerComponentRefresh();
  }
  handleOpenTask(filePath) {
    const file = this.app.vault.getFileByPath(filePath);
    if (file) this.app.workspace.getLeaf(false).openFile(file);
  }
  /** Called by the Sync button in the toolbar. Throws on error so the component can show it. */
  async handleSync() {
    const { syncBaseUrl, syncEmail, syncPassword } = this.plugin.settings;
    if (!syncBaseUrl || !syncEmail || !syncPassword) {
      throw new Error("Configure sync credentials in Settings first.");
    }
    const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
    await svc.login();
    const result = await svc.syncAll(this.app, this.plugin.settings.projectsFolder);
    if (result.conflictTasks.length > 0) {
      new SyncConflictModal(
        this.app,
        this.plugin,
        svc,
        result.conflictTasks,
        () => this.triggerComponentRefresh()
      ).open();
    }
  }
  async handleCreateTask(projectFolder, title, parentId, extra) {
    this._writing = true;
    try {
      await createTaskNote(this.app, projectFolder, title, parentId, extra);
    } finally {
      this._writing = false;
    }
  }
  async handleStatusChange(_projectFolder, taskId, newStatus) {
    const projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    const task = this.findTaskById(projects, taskId);
    if (!task) return;
    const file = this.app.vault.getFileByPath(task.filePath);
    if (!file) return;
    this._writing = true;
    try {
      await updateTaskField(this.app, file, "status", newStatus);
    } finally {
      this._writing = false;
    }
  }
  async handleDateChange(_projectFolder, taskId, startDate, endDate) {
    const projects = await loadProjects(this.app, this.plugin.settings.projectsFolder);
    const task = this.findTaskById(projects, taskId);
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
  }
  async handleArchiveTask(projectFolder, taskId, taskFilePath, isSubtask) {
    this._writing = true;
    try {
      await archiveTask(this.app, taskFilePath, taskId, projectFolder, isSubtask);
    } finally {
      this._writing = false;
    }
  }
  findTaskById(projects, id) {
    for (const proj of projects) {
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
    this.addRibbonIcon("refresh-cw", "Sync tasks", async () => {
      const { syncBaseUrl: syncBaseUrl2, syncEmail: syncEmail2, syncPassword: syncPassword2 } = this.settings;
      if (!syncBaseUrl2 || !syncEmail2 || !syncPassword2) {
        new obsidian.Notice("⚠️  Configure sync credentials in Settings first.");
        return;
      }
      new obsidian.Notice("🔄 Syncing tasks…");
      try {
        const svc = new GanttSyncService(syncBaseUrl2, syncEmail2, syncPassword2);
        await svc.login();
        const result = await svc.syncAll(this.app, this.settings.projectsFolder);
        const summary = `↑${result.pushed} pushed  ↓${result.pulled} pulled  ${result.deleted} deleted`;
        if (result.conflictTasks.length > 0) {
          new obsidian.Notice(`⚠️ ${summary}  ${result.conflictTasks.length} conflict(s) — see modal`);
          new SyncConflictModal(this.app, this, svc, result.conflictTasks, () => {
            const leaf2 = this.app.workspace.getLeavesOfType(GANTT_VIEW_TYPE)[0];
            if (leaf2) leaf2.view.refresh?.();
          }).open();
        } else {
          new obsidian.Notice(`✅ ${summary}`);
        }
        const leaf = this.app.workspace.getLeavesOfType(GANTT_VIEW_TYPE)[0];
        if (leaf) leaf.view.refresh?.();
      } catch (e) {
        new obsidian.Notice(`❌ Sync failed: ${e.message}`);
      }
    });
    this.addCommand({
      id: "open-project-board",
      name: "Open Project Board",
      callback: async () => {
        await this.activateView();
      }
    });
    this.addCommand({
      id: "sync-tasks",
      name: "Sync tasks with server",
      callback: async () => {
        const { syncBaseUrl: syncBaseUrl2, syncEmail: syncEmail2, syncPassword: syncPassword2 } = this.settings;
        if (!syncBaseUrl2 || !syncEmail2 || !syncPassword2) {
          new obsidian.Notice("⚠️  Configure sync credentials in Settings first.");
          return;
        }
        try {
          const svc = new GanttSyncService(syncBaseUrl2, syncEmail2, syncPassword2);
          await svc.login();
          const result = await svc.syncAll(this.app, this.settings.projectsFolder);
          const summary = `↑${result.pushed} pushed  ↓${result.pulled} pulled  ${result.deleted} deleted`;
          if (result.conflictTasks.length > 0) {
            new obsidian.Notice(`⚠️ ${summary}  ${result.conflictTasks.length} conflict(s) — see modal`);
            new SyncConflictModal(this.app, this, svc, result.conflictTasks, () => {
            }).open();
          } else {
            new obsidian.Notice(`✅ ${summary}`);
          }
        } catch (e) {
          new obsidian.Notice(`❌ Sync failed: ${e.message}`);
        }
      }
    });
    this.addSettingTab(new GanttSettingTab(this.app, this));
    const { syncBaseUrl, syncEmail, syncPassword } = this.settings;
    if (syncBaseUrl && syncEmail && syncPassword) {
      this.app.workspace.onLayoutReady(async () => {
        try {
          const svc = new GanttSyncService(syncBaseUrl, syncEmail, syncPassword);
          await svc.login();
          await svc.syncAll(this.app, this.settings.projectsFolder);
        } catch (e) {
          console.warn("[Gantt] Auto-sync failed:", e.message);
        }
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2VzbS1lbnYvZmFsc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9zaGFyZWQvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvY29uc3RhbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2Vycm9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2NvbnN0YW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC93YXJuaW5ncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L2VxdWFsaXR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvZmxhZ3MvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9lcnJvci1oYW5kbGluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3N0YXR1cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvYmF0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9yZWFjdGl2aXR5L2NyZWF0ZS1zdWJzY3JpYmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3MvYm91bmRhcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L2Rlcml2ZWRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvc291cmNlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9wcm94eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vb3BlcmF0aW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvbWlzYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvYmluZGluZ3Mvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvZWZmZWN0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2V2ZW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vcmVjb25jaWxlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vdGVtcGxhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvcmVuZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3MvYnJhbmNoZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9pZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vYmxvY2tzL2VhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9zaGFyZWQvYXR0cmlidXRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvY2xhc3MuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL3N0eWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy9zZWxlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2F0dHJpYnV0ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2JpbmRpbmdzL2lucHV0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy9wcm9wcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvYmluZGluZ3MvdGhpcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vbGVnYWN5L2V2ZW50LW1vZGlmaWVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vbGVnYWN5L2xpZmVjeWNsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3N0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvcHJvcHMuanMiLCIuLi9zcmMvdHlwZXMudHMiLCIuLi9zcmMvbmFub2lkLnRzIiwiLi4vc3JjL3Rhc2tVdGlscy50cyIsIi4uL3NyYy9zeW5jU2VydmljZS50cyIsIi4uL3NyYy9zZXR0aW5ncy50cyIsIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3ZlcnNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9kaXNjbG9zZS12ZXJzaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvZmxhZ3MvbGVnYWN5LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvS2FuYmFuQm9hcmQuc3ZlbHRlIiwiLi4vc3JjL2NvbXBvbmVudHMvR2FudHRDaGFydC5zdmVsdGUiLCIuLi9zcmMvY29tcG9uZW50cy9UYXNrTW9kYWwuc3ZlbHRlIiwiLi4vc3JjL2NvbXBvbmVudHMvUHJvamVjdFZpZXcuc3ZlbHRlIiwiLi4vc3JjL3ZpZXcudHMiLCIuLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmYWxzZTtcbiIsIi8vIFN0b3JlIHRoZSByZWZlcmVuY2VzIHRvIGdsb2JhbHMgaW4gY2FzZSBzb21lb25lIHRyaWVzIHRvIG1vbmtleSBwYXRjaCB0aGVzZSwgY2F1c2luZyB0aGUgYmVsb3dcbi8vIHRvIGRlLW9wdCAodGhpcyBvY2N1cnMgb2Z0ZW4gd2hlbiB1c2luZyBwb3B1bGFyIGV4dGVuc2lvbnMpLlxuZXhwb3J0IHZhciBpc19hcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgdmFyIGluZGV4X29mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2Y7XG5leHBvcnQgdmFyIGluY2x1ZGVzID0gQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzO1xuZXhwb3J0IHZhciBhcnJheV9mcm9tID0gQXJyYXkuZnJvbTtcbmV4cG9ydCB2YXIgb2JqZWN0X2tleXMgPSBPYmplY3Qua2V5cztcbmV4cG9ydCB2YXIgZGVmaW5lX3Byb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuZXhwb3J0IHZhciBnZXRfZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5leHBvcnQgdmFyIGdldF9kZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzO1xuZXhwb3J0IHZhciBvYmplY3RfcHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbmV4cG9ydCB2YXIgYXJyYXlfcHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuZXhwb3J0IHZhciBnZXRfcHJvdG90eXBlX29mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuZXhwb3J0IHZhciBpc19leHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcbmV4cG9ydCB2YXIgaGFzX293bl9wcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IHRoaW5nXG4gKiBAcmV0dXJucyB7dGhpbmcgaXMgRnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuXHRyZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG4vLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3RoZW4vaXMtcHJvbWlzZS9ibG9iL21hc3Rlci9pbmRleC5qc1xuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgTUlUIExpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3RoZW4vaXMtcHJvbWlzZS9ibG9iL21hc3Rlci9MSUNFTlNFXG5cbi8qKlxuICogQHRlbXBsYXRlIFtUPWFueV1cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybnMge3ZhbHVlIGlzIFByb21pc2VMaWtlPFQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfcHJvbWlzZSh2YWx1ZSkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlPy50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKiogQHBhcmFtIHtGdW5jdGlvbn0gZm4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW4oZm4pIHtcblx0cmV0dXJuIGZuKCk7XG59XG5cbi8qKiBAcGFyYW0ge0FycmF5PCgpID0+IHZvaWQ+fSBhcnIgKi9cbmV4cG9ydCBmdW5jdGlvbiBydW5fYWxsKGFycikge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdGFycltpXSgpO1xuXHR9XG59XG5cbi8qKlxuICogVE9ETyByZXBsYWNlIHdpdGggUHJvbWlzZS53aXRoUmVzb2x2ZXJzIG9uY2Ugc3VwcG9ydGVkIHdpZGVseSBlbm91Z2hcbiAqIEB0ZW1wbGF0ZSBbVD12b2lkXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmZXJyZWQoKSB7XG5cdC8qKiBAdHlwZSB7KHZhbHVlOiBUKSA9PiB2b2lkfSAqL1xuXHR2YXIgcmVzb2x2ZTtcblxuXHQvKiogQHR5cGUgeyhyZWFzb246IGFueSkgPT4gdm9pZH0gKi9cblx0dmFyIHJlamVjdDtcblxuXHQvKiogQHR5cGUge1Byb21pc2U8VD59ICovXG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cdFx0cmVzb2x2ZSA9IHJlcztcblx0XHRyZWplY3QgPSByZWo7XG5cdH0pO1xuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0cmV0dXJuIHsgcHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0IH07XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7ViB8ICgoKSA9PiBWKX0gZmFsbGJhY2tcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2xhenldXG4gKiBAcmV0dXJucyB7Vn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhbGxiYWNrKHZhbHVlLCBmYWxsYmFjaywgbGF6eSA9IGZhbHNlKSB7XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkXG5cdFx0PyBsYXp5XG5cdFx0XHQ/IC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKGZhbGxiYWNrKSgpXG5cdFx0XHQ6IC8qKiBAdHlwZSB7Vn0gKi8gKGZhbGxiYWNrKVxuXHRcdDogdmFsdWU7XG59XG5cbi8qKlxuICogV2hlbiBlbmNvdW50ZXJpbmcgYSBzaXR1YXRpb24gbGlrZSBgbGV0IFthLCBiLCBjXSA9ICRkZXJpdmVkKGJsYWgoKSlgLFxuICogd2UgbmVlZCB0byBzdGFzaCBhbiBpbnRlcm1lZGlhdGUgdmFsdWUgdGhhdCBgYWAsIGBiYCwgYW5kIGBjYCBkZXJpdmVcbiAqIGZyb20sIGluIGNhc2UgaXQncyBhbiBpdGVyYWJsZVxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7QXJyYXlMaWtlPFQ+IHwgSXRlcmFibGU8VD59IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gW25dXG4gKiBAcmV0dXJucyB7QXJyYXk8VD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b19hcnJheSh2YWx1ZSwgbikge1xuXHQvLyByZXR1cm4gYXJyYXlzIHVuY2hhbmdlZFxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHQvLyBpZiB2YWx1ZSBpcyBub3QgaXRlcmFibGUsIG9yIGBuYCBpcyB1bnNwZWNpZmllZCAoaW5kaWNhdGVzIGEgcmVzdFxuXHQvLyBlbGVtZW50LCB3aGljaCBtZWFucyB3ZSdyZSBub3QgY29uY2VybmVkIGFib3V0IHVuYm91bmRlZCBpdGVyYWJsZXMpXG5cdC8vIGNvbnZlcnQgdG8gYW4gYXJyYXkgd2l0aCBgQXJyYXkuZnJvbWBcblx0aWYgKG4gPT09IHVuZGVmaW5lZCB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWx1ZSkpIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG5cdH1cblxuXHQvLyBvdGhlcndpc2UsIHBvcHVsYXRlIGFuIGFycmF5IHdpdGggYG5gIHZhbHVlc1xuXG5cdC8qKiBAdHlwZSB7VFtdfSAqL1xuXHRjb25zdCBhcnJheSA9IFtdO1xuXG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiB2YWx1ZSkge1xuXHRcdGFycmF5LnB1c2goZWxlbWVudCk7XG5cdFx0aWYgKGFycmF5Lmxlbmd0aCA9PT0gbikgYnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPn0gb2JqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZyB8IHN5bWJvbD59IGtleXNcbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVfZnJvbV9vYmplY3Qob2JqLCBrZXlzKSB7XG5cdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj59ICovXG5cdHZhciByZXN1bHQgPSB7fTtcblxuXHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0aWYgKCFrZXlzLmluY2x1ZGVzKGtleSkpIHtcblx0XHRcdHJlc3VsdFtrZXldID0gb2JqW2tleV07XG5cdFx0fVxuXHR9XG5cblx0Zm9yICh2YXIgc3ltYm9sIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSkge1xuXHRcdGlmIChPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHN5bWJvbCkgJiYgIWtleXMuaW5jbHVkZXMoc3ltYm9sKSkge1xuXHRcdFx0cmVzdWx0W3N5bWJvbF0gPSBvYmpbc3ltYm9sXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuIiwiLy8gR2VuZXJhbCBmbGFnc1xuZXhwb3J0IGNvbnN0IERFUklWRUQgPSAxIDw8IDE7XG5leHBvcnQgY29uc3QgRUZGRUNUID0gMSA8PCAyO1xuZXhwb3J0IGNvbnN0IFJFTkRFUl9FRkZFQ1QgPSAxIDw8IDM7XG4vKipcbiAqIEFuIGVmZmVjdCB0aGF0IGRvZXMgbm90IGRlc3Ryb3kgaXRzIGNoaWxkIGVmZmVjdHMgd2hlbiBpdCByZXJ1bnMuXG4gKiBSdW5zIGFzIHBhcnQgb2YgcmVuZGVyIGVmZmVjdHMsIGkuZS4gbm90IGVhZ2VybHkgYXMgcGFydCBvZiB0cmVlIHRyYXZlcnNhbCBvciBlZmZlY3QgZmx1c2hpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBNQU5BR0VEX0VGRkVDVCA9IDEgPDwgMjQ7XG4vKipcbiAqIEFuIGVmZmVjdCB0aGF0IGRvZXMgbm90IGRlc3Ryb3kgaXRzIGNoaWxkIGVmZmVjdHMgd2hlbiBpdCByZXJ1bnMgKGxpa2UgTUFOQUdFRF9FRkZFQ1QpLlxuICogUnVucyBlYWdlcmx5IGFzIHBhcnQgb2YgdHJlZSB0cmF2ZXJzYWwgb3IgZWZmZWN0IGZsdXNoaW5nLlxuICovXG5leHBvcnQgY29uc3QgQkxPQ0tfRUZGRUNUID0gMSA8PCA0O1xuZXhwb3J0IGNvbnN0IEJSQU5DSF9FRkZFQ1QgPSAxIDw8IDU7XG5leHBvcnQgY29uc3QgUk9PVF9FRkZFQ1QgPSAxIDw8IDY7XG5leHBvcnQgY29uc3QgQk9VTkRBUllfRUZGRUNUID0gMSA8PCA3O1xuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBhIHJlYWN0aW9uIGlzIGNvbm5lY3RlZCB0byBhbiBlZmZlY3Qgcm9vdCDigJQgZWl0aGVyIGl0IGlzIGFuIGVmZmVjdCxcbiAqIG9yIGl0IGlzIGEgZGVyaXZlZCB0aGF0IGlzIGRlcGVuZGVkIG9uIGJ5IGF0IGxlYXN0IG9uZSBlZmZlY3QuIElmIGEgZGVyaXZlZCBoYXNcbiAqIG5vIGRlcGVuZGVudHMsIHdlIGNhbiBkaXNjb25uZWN0IGl0IGZyb20gdGhlIGdyYXBoLCBhbGxvd2luZyBpdCB0byBlaXRoZXIgYmVcbiAqIEdDJ2Qgb3IgcmVjb25uZWN0ZWQgbGF0ZXIgaWYgYW4gZWZmZWN0IGNvbWVzIHRvIGRlcGVuZCBvbiBpdCBhZ2FpblxuICovXG5leHBvcnQgY29uc3QgQ09OTkVDVEVEID0gMSA8PCA5O1xuZXhwb3J0IGNvbnN0IENMRUFOID0gMSA8PCAxMDtcbmV4cG9ydCBjb25zdCBESVJUWSA9IDEgPDwgMTE7XG5leHBvcnQgY29uc3QgTUFZQkVfRElSVFkgPSAxIDw8IDEyO1xuZXhwb3J0IGNvbnN0IElORVJUID0gMSA8PCAxMztcbmV4cG9ydCBjb25zdCBERVNUUk9ZRUQgPSAxIDw8IDE0O1xuLyoqIFNldCBvbmNlIGEgcmVhY3Rpb24gaGFzIHJ1biBmb3IgdGhlIGZpcnN0IHRpbWUgKi9cbmV4cG9ydCBjb25zdCBSRUFDVElPTl9SQU4gPSAxIDw8IDE1O1xuXG4vLyBGbGFncyBleGNsdXNpdmUgdG8gZWZmZWN0c1xuLyoqXG4gKiAnVHJhbnNwYXJlbnQnIGVmZmVjdHMgZG8gbm90IGNyZWF0ZSBhIHRyYW5zaXRpb24gYm91bmRhcnkuXG4gKiBUaGlzIGlzIG9uIGEgYmxvY2sgZWZmZWN0IDk5JSBvZiB0aGUgdGltZSBidXQgbWF5IGFsc28gYmUgb24gYSBicmFuY2ggZWZmZWN0IGlmIGl0cyBwYXJlbnQgYmxvY2sgZWZmZWN0IHdhcyBwcnVuZWRcbiAqL1xuZXhwb3J0IGNvbnN0IEVGRkVDVF9UUkFOU1BBUkVOVCA9IDEgPDwgMTY7XG5leHBvcnQgY29uc3QgRUFHRVJfRUZGRUNUID0gMSA8PCAxNztcbmV4cG9ydCBjb25zdCBIRUFEX0VGRkVDVCA9IDEgPDwgMTg7XG5leHBvcnQgY29uc3QgRUZGRUNUX1BSRVNFUlZFRCA9IDEgPDwgMTk7XG5leHBvcnQgY29uc3QgVVNFUl9FRkZFQ1QgPSAxIDw8IDIwO1xuZXhwb3J0IGNvbnN0IEVGRkVDVF9PRkZTQ1JFRU4gPSAxIDw8IDI1O1xuXG4vLyBGbGFncyBleGNsdXNpdmUgdG8gZGVyaXZlZHNcbi8qKlxuICogVGVsbHMgdGhhdCB3ZSBtYXJrZWQgdGhpcyBkZXJpdmVkIGFuZCBpdHMgcmVhY3Rpb25zIGFzIHZpc2l0ZWQgZHVyaW5nIHRoZSBcIm1hcmsgYXMgKG1heWJlKSBkaXJ0eVwiLXBoYXNlLlxuICogV2lsbCBiZSBsaWZ0ZWQgZHVyaW5nIGV4ZWN1dGlvbiBvZiB0aGUgZGVyaXZlZCBhbmQgZHVyaW5nIGNoZWNraW5nIGl0cyBkaXJ0eSBzdGF0ZSAoYm90aCBhcmUgbmVjZXNzYXJ5XG4gKiBiZWNhdXNlIGEgZGVyaXZlZCBtaWdodCBiZSBjaGVja2VkIGJ1dCBub3QgZXhlY3V0ZWQpLlxuICovXG5leHBvcnQgY29uc3QgV0FTX01BUktFRCA9IDEgPDwgMTY7XG5cbi8vIEZsYWdzIHVzZWQgZm9yIGFzeW5jXG5leHBvcnQgY29uc3QgUkVBQ1RJT05fSVNfVVBEQVRJTkcgPSAxIDw8IDIxO1xuZXhwb3J0IGNvbnN0IEFTWU5DID0gMSA8PCAyMjtcblxuZXhwb3J0IGNvbnN0IEVSUk9SX1ZBTFVFID0gMSA8PCAyMztcblxuZXhwb3J0IGNvbnN0IFNUQVRFX1NZTUJPTCA9IFN5bWJvbCgnJHN0YXRlJyk7XG5leHBvcnQgY29uc3QgTEVHQUNZX1BST1BTID0gU3ltYm9sKCdsZWdhY3kgcHJvcHMnKTtcbmV4cG9ydCBjb25zdCBMT0FESU5HX0FUVFJfU1lNQk9MID0gU3ltYm9sKCcnKTtcbmV4cG9ydCBjb25zdCBQUk9YWV9QQVRIX1NZTUJPTCA9IFN5bWJvbCgncHJveHkgcGF0aCcpO1xuXG4vKiogYWxsb3cgdXNlcnMgdG8gaWdub3JlIGFib3J0ZWQgc2lnbmFsIGVycm9ycyBpZiBgcmVhc29uLm5hbWUgPT09ICdTdGFsZVJlYWN0aW9uRXJyb3JgICovXG5leHBvcnQgY29uc3QgU1RBTEVfUkVBQ1RJT04gPSBuZXcgKGNsYXNzIFN0YWxlUmVhY3Rpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0bmFtZSA9ICdTdGFsZVJlYWN0aW9uRXJyb3InO1xuXHRtZXNzYWdlID0gJ1RoZSByZWFjdGlvbiB0aGF0IGNhbGxlZCBgZ2V0QWJvcnRTaWduYWwoKWAgd2FzIHJlLXJ1biBvciBkZXN0cm95ZWQnO1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IElTX1hIVE1MID1cblx0Ly8gV2UgZ290dGEgd3JpdGUgaXQgbGlrZSB0aGlzIGJlY2F1c2UgYWZ0ZXIgZG93bmxldmVsaW5nIHRoZSBwdXJlIGNvbW1lbnQgbWF5IGVuZCB1cCBpbiB0aGUgd3JvbmcgbG9jYXRpb25cblx0ISFnbG9iYWxUaGlzLmRvY3VtZW50Py5jb250ZW50VHlwZSAmJlxuXHQvKiBAX19QVVJFX18gKi8gZ2xvYmFsVGhpcy5kb2N1bWVudC5jb250ZW50VHlwZS5pbmNsdWRlcygneG1sJyk7XG5leHBvcnQgY29uc3QgRUxFTUVOVF9OT0RFID0gMTtcbmV4cG9ydCBjb25zdCBURVhUX05PREUgPSAzO1xuZXhwb3J0IGNvbnN0IENPTU1FTlRfTk9ERSA9IDg7XG5leHBvcnQgY29uc3QgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuIiwiLyogVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBzY3JpcHRzL3Byb2Nlc3MtbWVzc2FnZXMvaW5kZXguanMuIERvIG5vdCBlZGl0ISAqL1xuXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcblxuZXhwb3J0ICogIGZyb20gJy4uL3NoYXJlZC9lcnJvcnMuanMnO1xuXG4vKipcbiAqIENhbm5vdCBjcmVhdGUgYSBgJGRlcml2ZWQoLi4uKWAgd2l0aCBhbiBgYXdhaXRgIGV4cHJlc3Npb24gb3V0c2lkZSBvZiBhbiBlZmZlY3QgdHJlZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXN5bmNfZGVyaXZlZF9vcnBoYW4oKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgYXN5bmNfZGVyaXZlZF9vcnBoYW5cXG5DYW5ub3QgY3JlYXRlIGEgXFxgJGRlcml2ZWQoLi4uKVxcYCB3aXRoIGFuIFxcYGF3YWl0XFxgIGV4cHJlc3Npb24gb3V0c2lkZSBvZiBhbiBlZmZlY3QgdHJlZVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2FzeW5jX2Rlcml2ZWRfb3JwaGFuYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2FzeW5jX2Rlcml2ZWRfb3JwaGFuYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBVc2luZyBgYmluZDp2YWx1ZWAgdG9nZXRoZXIgd2l0aCBhIGNoZWNrYm94IGlucHV0IGlzIG5vdCBhbGxvd2VkLiBVc2UgYGJpbmQ6Y2hlY2tlZGAgaW5zdGVhZFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9pbnZhbGlkX2NoZWNrYm94X3ZhbHVlKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGJpbmRfaW52YWxpZF9jaGVja2JveF92YWx1ZVxcblVzaW5nIFxcYGJpbmQ6dmFsdWVcXGAgdG9nZXRoZXIgd2l0aCBhIGNoZWNrYm94IGlucHV0IGlzIG5vdCBhbGxvd2VkLiBVc2UgXFxgYmluZDpjaGVja2VkXFxgIGluc3RlYWRcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9iaW5kX2ludmFsaWRfY2hlY2tib3hfdmFsdWVgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYmluZF9pbnZhbGlkX2NoZWNrYm94X3ZhbHVlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDb21wb25lbnQgJWNvbXBvbmVudCUgaGFzIGFuIGV4cG9ydCBuYW1lZCBgJWtleSVgIHRoYXQgYSBjb25zdW1lciBjb21wb25lbnQgaXMgdHJ5aW5nIHRvIGFjY2VzcyB1c2luZyBgYmluZDola2V5JWAsIHdoaWNoIGlzIGRpc2FsbG93ZWQuIEluc3RlYWQsIHVzZSBgYmluZDp0aGlzYCAoZS5nLiBgPCVuYW1lJSBiaW5kOnRoaXM9e2NvbXBvbmVudH0gLz5gKSBhbmQgdGhlbiBhY2Nlc3MgdGhlIHByb3BlcnR5IG9uIHRoZSBib3VuZCBjb21wb25lbnQgaW5zdGFuY2UgKGUuZy4gYGNvbXBvbmVudC4la2V5JWApXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9pbnZhbGlkX2V4cG9ydChjb21wb25lbnQsIGtleSwgbmFtZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGJpbmRfaW52YWxpZF9leHBvcnRcXG5Db21wb25lbnQgJHtjb21wb25lbnR9IGhhcyBhbiBleHBvcnQgbmFtZWQgXFxgJHtrZXl9XFxgIHRoYXQgYSBjb25zdW1lciBjb21wb25lbnQgaXMgdHJ5aW5nIHRvIGFjY2VzcyB1c2luZyBcXGBiaW5kOiR7a2V5fVxcYCwgd2hpY2ggaXMgZGlzYWxsb3dlZC4gSW5zdGVhZCwgdXNlIFxcYGJpbmQ6dGhpc1xcYCAoZS5nLiBcXGA8JHtuYW1lfSBiaW5kOnRoaXM9e2NvbXBvbmVudH0gLz5cXGApIGFuZCB0aGVuIGFjY2VzcyB0aGUgcHJvcGVydHkgb24gdGhlIGJvdW5kIGNvbXBvbmVudCBpbnN0YW5jZSAoZS5nLiBcXGBjb21wb25lbnQuJHtrZXl9XFxgKVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2JpbmRfaW52YWxpZF9leHBvcnRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYmluZF9pbnZhbGlkX2V4cG9ydGApO1xuXHR9XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgaXMgYXR0ZW1wdGluZyB0byBiaW5kIHRvIGEgbm9uLWJpbmRhYmxlIHByb3BlcnR5IGAla2V5JWAgYmVsb25naW5nIHRvICVjb21wb25lbnQlIChpLmUuIGA8JW5hbWUlIGJpbmQ6JWtleSU9ey4uLn0+YCkuIFRvIG1hcmsgYSBwcm9wZXJ0eSBhcyBiaW5kYWJsZTogYGxldCB7ICVrZXklID0gJGJpbmRhYmxlKCkgfSA9ICRwcm9wcygpYFxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfbm90X2JpbmRhYmxlKGtleSwgY29tcG9uZW50LCBuYW1lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgYmluZF9ub3RfYmluZGFibGVcXG5BIGNvbXBvbmVudCBpcyBhdHRlbXB0aW5nIHRvIGJpbmQgdG8gYSBub24tYmluZGFibGUgcHJvcGVydHkgXFxgJHtrZXl9XFxgIGJlbG9uZ2luZyB0byAke2NvbXBvbmVudH0gKGkuZS4gXFxgPCR7bmFtZX0gYmluZDoke2tleX09ey4uLn0+XFxgKS4gVG8gbWFyayBhIHByb3BlcnR5IGFzIGJpbmRhYmxlOiBcXGBsZXQgeyAke2tleX0gPSAkYmluZGFibGUoKSB9ID0gJHByb3BzKClcXGBcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9iaW5kX25vdF9iaW5kYWJsZWApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9iaW5kX25vdF9iaW5kYWJsZWApO1xuXHR9XG59XG5cbi8qKlxuICogQ2FsbGluZyBgJW1ldGhvZCVgIG9uIGEgY29tcG9uZW50IGluc3RhbmNlIChvZiAlY29tcG9uZW50JSkgaXMgbm8gbG9uZ2VyIHZhbGlkIGluIFN2ZWx0ZSA1XG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50XG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRfYXBpX2NoYW5nZWQobWV0aG9kLCBjb21wb25lbnQpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBjb21wb25lbnRfYXBpX2NoYW5nZWRcXG5DYWxsaW5nIFxcYCR7bWV0aG9kfVxcYCBvbiBhIGNvbXBvbmVudCBpbnN0YW5jZSAob2YgJHtjb21wb25lbnR9KSBpcyBubyBsb25nZXIgdmFsaWQgaW4gU3ZlbHRlIDVcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9jb21wb25lbnRfYXBpX2NoYW5nZWRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvY29tcG9uZW50X2FwaV9jaGFuZ2VkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0ZWQgdG8gaW5zdGFudGlhdGUgJWNvbXBvbmVudCUgd2l0aCBgbmV3ICVuYW1lJWAsIHdoaWNoIGlzIG5vIGxvbmdlciB2YWxpZCBpbiBTdmVsdGUgNS4gSWYgdGhpcyBjb21wb25lbnQgaXMgbm90IHVuZGVyIHlvdXIgY29udHJvbCwgc2V0IHRoZSBgY29tcGF0aWJpbGl0eS5jb21wb25lbnRBcGlgIGNvbXBpbGVyIG9wdGlvbiB0byBgNGAgdG8ga2VlcCBpdCB3b3JraW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudF9hcGlfaW52YWxpZF9uZXcoY29tcG9uZW50LCBuYW1lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgY29tcG9uZW50X2FwaV9pbnZhbGlkX25ld1xcbkF0dGVtcHRlZCB0byBpbnN0YW50aWF0ZSAke2NvbXBvbmVudH0gd2l0aCBcXGBuZXcgJHtuYW1lfVxcYCwgd2hpY2ggaXMgbm8gbG9uZ2VyIHZhbGlkIGluIFN2ZWx0ZSA1LiBJZiB0aGlzIGNvbXBvbmVudCBpcyBub3QgdW5kZXIgeW91ciBjb250cm9sLCBzZXQgdGhlIFxcYGNvbXBhdGliaWxpdHkuY29tcG9uZW50QXBpXFxgIGNvbXBpbGVyIG9wdGlvbiB0byBcXGA0XFxgIHRvIGtlZXAgaXQgd29ya2luZy5cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9jb21wb25lbnRfYXBpX2ludmFsaWRfbmV3YCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2NvbXBvbmVudF9hcGlfaW52YWxpZF9uZXdgKTtcblx0fVxufVxuXG4vKipcbiAqIEEgZGVyaXZlZCB2YWx1ZSBjYW5ub3QgcmVmZXJlbmNlIGl0c2VsZiByZWN1cnNpdmVseVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVyaXZlZF9yZWZlcmVuY2VzX3NlbGYoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZGVyaXZlZF9yZWZlcmVuY2VzX3NlbGZcXG5BIGRlcml2ZWQgdmFsdWUgY2Fubm90IHJlZmVyZW5jZSBpdHNlbGYgcmVjdXJzaXZlbHlcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9kZXJpdmVkX3JlZmVyZW5jZXNfc2VsZmApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9kZXJpdmVkX3JlZmVyZW5jZXNfc2VsZmApO1xuXHR9XG59XG5cbi8qKlxuICogS2V5ZWQgZWFjaCBibG9jayBoYXMgZHVwbGljYXRlIGtleSBgJXZhbHVlJWAgYXQgaW5kZXhlcyAlYSUgYW5kICViJVxuICogQHBhcmFtIHtzdHJpbmd9IGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBiXG4gKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IFt2YWx1ZV1cbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhY2hfa2V5X2R1cGxpY2F0ZShhLCBiLCB2YWx1ZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGVhY2hfa2V5X2R1cGxpY2F0ZVxcbiR7dmFsdWVcblx0XHRcdD8gYEtleWVkIGVhY2ggYmxvY2sgaGFzIGR1cGxpY2F0ZSBrZXkgXFxgJHt2YWx1ZX1cXGAgYXQgaW5kZXhlcyAke2F9IGFuZCAke2J9YFxuXHRcdFx0OiBgS2V5ZWQgZWFjaCBibG9jayBoYXMgZHVwbGljYXRlIGtleSBhdCBpbmRleGVzICR7YX0gYW5kICR7Yn1gfVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2VhY2hfa2V5X2R1cGxpY2F0ZWApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9lYWNoX2tleV9kdXBsaWNhdGVgKTtcblx0fVxufVxuXG4vKipcbiAqIEtleWVkIGVhY2ggYmxvY2sgaGFzIGtleSB0aGF0IGlzIG5vdCBpZGVtcG90ZW50IOKAlCB0aGUga2V5IGZvciBpdGVtIGF0IGluZGV4ICVpbmRleCUgd2FzIGAlYSVgIGJ1dCBpcyBub3cgYCViJWAuIEtleXMgbXVzdCBiZSB0aGUgc2FtZSBlYWNoIHRpbWUgZm9yIGEgZ2l2ZW4gaXRlbVxuICogQHBhcmFtIHtzdHJpbmd9IGluZGV4XG4gKiBAcGFyYW0ge3N0cmluZ30gYVxuICogQHBhcmFtIHtzdHJpbmd9IGJcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhY2hfa2V5X3ZvbGF0aWxlKGluZGV4LCBhLCBiKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZWFjaF9rZXlfdm9sYXRpbGVcXG5LZXllZCBlYWNoIGJsb2NrIGhhcyBrZXkgdGhhdCBpcyBub3QgaWRlbXBvdGVudCDigJQgdGhlIGtleSBmb3IgaXRlbSBhdCBpbmRleCAke2luZGV4fSB3YXMgXFxgJHthfVxcYCBidXQgaXMgbm93IFxcYCR7Yn1cXGAuIEtleXMgbXVzdCBiZSB0aGUgc2FtZSBlYWNoIHRpbWUgZm9yIGEgZ2l2ZW4gaXRlbVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2VhY2hfa2V5X3ZvbGF0aWxlYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2VhY2hfa2V5X3ZvbGF0aWxlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBgJXJ1bmUlYCBjYW5ub3QgYmUgdXNlZCBpbnNpZGUgYW4gZWZmZWN0IGNsZWFudXAgZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBydW5lXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3RfaW5fdGVhcmRvd24ocnVuZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGVmZmVjdF9pbl90ZWFyZG93blxcblxcYCR7cnVuZX1cXGAgY2Fubm90IGJlIHVzZWQgaW5zaWRlIGFuIGVmZmVjdCBjbGVhbnVwIGZ1bmN0aW9uXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X2luX3RlYXJkb3duYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2VmZmVjdF9pbl90ZWFyZG93bmApO1xuXHR9XG59XG5cbi8qKlxuICogRWZmZWN0IGNhbm5vdCBiZSBjcmVhdGVkIGluc2lkZSBhIGAkZGVyaXZlZGAgdmFsdWUgdGhhdCB3YXMgbm90IGl0c2VsZiBjcmVhdGVkIGluc2lkZSBhbiBlZmZlY3RcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdF9pbl91bm93bmVkX2Rlcml2ZWQoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZWZmZWN0X2luX3Vub3duZWRfZGVyaXZlZFxcbkVmZmVjdCBjYW5ub3QgYmUgY3JlYXRlZCBpbnNpZGUgYSBcXGAkZGVyaXZlZFxcYCB2YWx1ZSB0aGF0IHdhcyBub3QgaXRzZWxmIGNyZWF0ZWQgaW5zaWRlIGFuIGVmZmVjdFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2VmZmVjdF9pbl91bm93bmVkX2Rlcml2ZWRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X2luX3Vub3duZWRfZGVyaXZlZGApO1xuXHR9XG59XG5cbi8qKlxuICogYCVydW5lJWAgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgYW4gZWZmZWN0IChlLmcuIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24pXG4gKiBAcGFyYW0ge3N0cmluZ30gcnVuZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0X29ycGhhbihydW5lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZWZmZWN0X29ycGhhblxcblxcYCR7cnVuZX1cXGAgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgYW4gZWZmZWN0IChlLmcuIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24pXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X29ycGhhbmApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3Rfb3JwaGFuYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBgJGVmZmVjdC5wZW5kaW5nKClgIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgYW4gZWZmZWN0IG9yIGRlcml2ZWRcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdF9wZW5kaW5nX291dHNpZGVfcmVhY3Rpb24oKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZWZmZWN0X3BlbmRpbmdfb3V0c2lkZV9yZWFjdGlvblxcblxcYCRlZmZlY3QucGVuZGluZygpXFxgIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgYW4gZWZmZWN0IG9yIGRlcml2ZWRcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3RfcGVuZGluZ19vdXRzaWRlX3JlYWN0aW9uYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2VmZmVjdF9wZW5kaW5nX291dHNpZGVfcmVhY3Rpb25gKTtcblx0fVxufVxuXG4vKipcbiAqIE1heGltdW0gdXBkYXRlIGRlcHRoIGV4Y2VlZGVkLiBUaGlzIHR5cGljYWxseSBpbmRpY2F0ZXMgdGhhdCBhbiBlZmZlY3QgcmVhZHMgYW5kIHdyaXRlcyB0aGUgc2FtZSBwaWVjZSBvZiBzdGF0ZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0X3VwZGF0ZV9kZXB0aF9leGNlZWRlZCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBlZmZlY3RfdXBkYXRlX2RlcHRoX2V4Y2VlZGVkXFxuTWF4aW11bSB1cGRhdGUgZGVwdGggZXhjZWVkZWQuIFRoaXMgdHlwaWNhbGx5IGluZGljYXRlcyB0aGF0IGFuIGVmZmVjdCByZWFkcyBhbmQgd3JpdGVzIHRoZSBzYW1lIHBpZWNlIG9mIHN0YXRlXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZWZmZWN0X3VwZGF0ZV9kZXB0aF9leGNlZWRlZGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9lZmZlY3RfdXBkYXRlX2RlcHRoX2V4Y2VlZGVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDYW5ub3QgdXNlIGBmbHVzaFN5bmNgIGluc2lkZSBhbiBlZmZlY3RcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoX3N5bmNfaW5fZWZmZWN0KCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGZsdXNoX3N5bmNfaW5fZWZmZWN0XFxuQ2Fubm90IHVzZSBcXGBmbHVzaFN5bmNcXGAgaW5zaWRlIGFuIGVmZmVjdFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2ZsdXNoX3N5bmNfaW5fZWZmZWN0YCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2ZsdXNoX3N5bmNfaW5fZWZmZWN0YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDYW5ub3QgY29tbWl0IGEgZm9yayB0aGF0IHdhcyBhbHJlYWR5IGRpc2NhcmRlZFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ya19kaXNjYXJkZWQoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZm9ya19kaXNjYXJkZWRcXG5DYW5ub3QgY29tbWl0IGEgZm9yayB0aGF0IHdhcyBhbHJlYWR5IGRpc2NhcmRlZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2ZvcmtfZGlzY2FyZGVkYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2ZvcmtfZGlzY2FyZGVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDYW5ub3QgY3JlYXRlIGEgZm9yayBpbnNpZGUgYW4gZWZmZWN0IG9yIHdoZW4gc3RhdGUgY2hhbmdlcyBhcmUgcGVuZGluZ1xuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ya190aW1pbmcoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgZm9ya190aW1pbmdcXG5DYW5ub3QgY3JlYXRlIGEgZm9yayBpbnNpZGUgYW4gZWZmZWN0IG9yIHdoZW4gc3RhdGUgY2hhbmdlcyBhcmUgcGVuZGluZ1xcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2ZvcmtfdGltaW5nYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2ZvcmtfdGltaW5nYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBgZ2V0QWJvcnRTaWduYWwoKWAgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBhbiBlZmZlY3Qgb3IgZGVyaXZlZFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2Fib3J0X3NpZ25hbF9vdXRzaWRlX3JlYWN0aW9uKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGdldF9hYm9ydF9zaWduYWxfb3V0c2lkZV9yZWFjdGlvblxcblxcYGdldEFib3J0U2lnbmFsKClcXGAgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBhbiBlZmZlY3Qgb3IgZGVyaXZlZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2dldF9hYm9ydF9zaWduYWxfb3V0c2lkZV9yZWFjdGlvbmApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9nZXRfYWJvcnRfc2lnbmFsX291dHNpZGVfcmVhY3Rpb25gKTtcblx0fVxufVxuXG4vKipcbiAqIEV4cGVjdGVkIHRvIGZpbmQgYSBoeWRyYXRhYmxlIHdpdGgga2V5IGAla2V5JWAgZHVyaW5nIGh5ZHJhdGlvbiwgYnV0IGRpZCBub3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRhYmxlX21pc3NpbmdfYnV0X3JlcXVpcmVkKGtleSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGh5ZHJhdGFibGVfbWlzc2luZ19idXRfcmVxdWlyZWRcXG5FeHBlY3RlZCB0byBmaW5kIGEgaHlkcmF0YWJsZSB3aXRoIGtleSBcXGAke2tleX1cXGAgZHVyaW5nIGh5ZHJhdGlvbiwgYnV0IGRpZCBub3QuXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0YWJsZV9taXNzaW5nX2J1dF9yZXF1aXJlZGApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRhYmxlX21pc3NpbmdfYnV0X3JlcXVpcmVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBGYWlsZWQgdG8gaHlkcmF0ZSB0aGUgYXBwbGljYXRpb25cbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGlvbl9mYWlsZWQoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgaHlkcmF0aW9uX2ZhaWxlZFxcbkZhaWxlZCB0byBoeWRyYXRlIHRoZSBhcHBsaWNhdGlvblxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGlvbl9mYWlsZWRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0aW9uX2ZhaWxlZGApO1xuXHR9XG59XG5cbi8qKlxuICogQ291bGQgbm90IGB7QHJlbmRlcn1gIHNuaXBwZXQgZHVlIHRvIHRoZSBleHByZXNzaW9uIGJlaW5nIGBudWxsYCBvciBgdW5kZWZpbmVkYC4gQ29uc2lkZXIgdXNpbmcgb3B0aW9uYWwgY2hhaW5pbmcgYHtAcmVuZGVyIHNuaXBwZXQ/LigpfWBcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRfc25pcHBldCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBpbnZhbGlkX3NuaXBwZXRcXG5Db3VsZCBub3QgXFxge0ByZW5kZXJ9XFxgIHNuaXBwZXQgZHVlIHRvIHRoZSBleHByZXNzaW9uIGJlaW5nIFxcYG51bGxcXGAgb3IgXFxgdW5kZWZpbmVkXFxgLiBDb25zaWRlciB1c2luZyBvcHRpb25hbCBjaGFpbmluZyBcXGB7QHJlbmRlciBzbmlwcGV0Py4oKX1cXGBcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9pbnZhbGlkX3NuaXBwZXRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaW52YWxpZF9zbmlwcGV0YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBgJW5hbWUlKC4uLilgIGNhbm5vdCBiZSB1c2VkIGluIHJ1bmVzIG1vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaWZlY3ljbGVfbGVnYWN5X29ubHkobmFtZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYGxpZmVjeWNsZV9sZWdhY3lfb25seVxcblxcYCR7bmFtZX0oLi4uKVxcYCBjYW5ub3QgYmUgdXNlZCBpbiBydW5lcyBtb2RlXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvbGlmZWN5Y2xlX2xlZ2FjeV9vbmx5YCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2xpZmVjeWNsZV9sZWdhY3lfb25seWApO1xuXHR9XG59XG5cbi8qKlxuICogQ2Fubm90IGRvIGBiaW5kOiVrZXklPXt1bmRlZmluZWR9YCB3aGVuIGAla2V5JWAgaGFzIGEgZmFsbGJhY2sgdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3BzX2ludmFsaWRfdmFsdWUoa2V5KSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgcHJvcHNfaW52YWxpZF92YWx1ZVxcbkNhbm5vdCBkbyBcXGBiaW5kOiR7a2V5fT17dW5kZWZpbmVkfVxcYCB3aGVuIFxcYCR7a2V5fVxcYCBoYXMgYSBmYWxsYmFjayB2YWx1ZVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3Byb3BzX2ludmFsaWRfdmFsdWVgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvcHJvcHNfaW52YWxpZF92YWx1ZWApO1xuXHR9XG59XG5cbi8qKlxuICogUmVzdCBlbGVtZW50IHByb3BlcnRpZXMgb2YgYCRwcm9wcygpYCBzdWNoIGFzIGAlcHJvcGVydHklYCBhcmUgcmVhZG9ubHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcHNfcmVzdF9yZWFkb25seShwcm9wZXJ0eSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYHByb3BzX3Jlc3RfcmVhZG9ubHlcXG5SZXN0IGVsZW1lbnQgcHJvcGVydGllcyBvZiBcXGAkcHJvcHMoKVxcYCBzdWNoIGFzIFxcYCR7cHJvcGVydHl9XFxgIGFyZSByZWFkb25seVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3Byb3BzX3Jlc3RfcmVhZG9ubHlgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvcHJvcHNfcmVzdF9yZWFkb25seWApO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIGAlcnVuZSVgIHJ1bmUgaXMgb25seSBhdmFpbGFibGUgaW5zaWRlIGAuc3ZlbHRlYCBhbmQgYC5zdmVsdGUuanMvdHNgIGZpbGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gcnVuZVxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVuZV9vdXRzaWRlX3N2ZWx0ZShydW5lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgcnVuZV9vdXRzaWRlX3N2ZWx0ZVxcblRoZSBcXGAke3J1bmV9XFxgIHJ1bmUgaXMgb25seSBhdmFpbGFibGUgaW5zaWRlIFxcYC5zdmVsdGVcXGAgYW5kIFxcYC5zdmVsdGUuanMvdHNcXGAgZmlsZXNcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9ydW5lX291dHNpZGVfc3ZlbHRlYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3J1bmVfb3V0c2lkZV9zdmVsdGVgKTtcblx0fVxufVxuXG4vKipcbiAqIGBzZXRDb250ZXh0YCBtdXN0IGJlIGNhbGxlZCB3aGVuIGEgY29tcG9uZW50IGZpcnN0IGluaXRpYWxpemVzLCBub3QgaW4gYSBzdWJzZXF1ZW50IGVmZmVjdCBvciBhZnRlciBhbiBgYXdhaXRgIGV4cHJlc3Npb25cbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9jb250ZXh0X2FmdGVyX2luaXQoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgc2V0X2NvbnRleHRfYWZ0ZXJfaW5pdFxcblxcYHNldENvbnRleHRcXGAgbXVzdCBiZSBjYWxsZWQgd2hlbiBhIGNvbXBvbmVudCBmaXJzdCBpbml0aWFsaXplcywgbm90IGluIGEgc3Vic2VxdWVudCBlZmZlY3Qgb3IgYWZ0ZXIgYW4gXFxgYXdhaXRcXGAgZXhwcmVzc2lvblxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3NldF9jb250ZXh0X2FmdGVyX2luaXRgKTtcblxuXHRcdGVycm9yLm5hbWUgPSAnU3ZlbHRlIGVycm9yJztcblxuXHRcdHRocm93IGVycm9yO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc2V0X2NvbnRleHRfYWZ0ZXJfaW5pdGApO1xuXHR9XG59XG5cbi8qKlxuICogUHJvcGVydHkgZGVzY3JpcHRvcnMgZGVmaW5lZCBvbiBgJHN0YXRlYCBvYmplY3RzIG11c3QgY29udGFpbiBgdmFsdWVgIGFuZCBhbHdheXMgYmUgYGVudW1lcmFibGVgLCBgY29uZmlndXJhYmxlYCBhbmQgYHdyaXRhYmxlYC5cbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlX2Rlc2NyaXB0b3JzX2ZpeGVkKCkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYHN0YXRlX2Rlc2NyaXB0b3JzX2ZpeGVkXFxuUHJvcGVydHkgZGVzY3JpcHRvcnMgZGVmaW5lZCBvbiBcXGAkc3RhdGVcXGAgb2JqZWN0cyBtdXN0IGNvbnRhaW4gXFxgdmFsdWVcXGAgYW5kIGFsd2F5cyBiZSBcXGBlbnVtZXJhYmxlXFxgLCBcXGBjb25maWd1cmFibGVcXGAgYW5kIFxcYHdyaXRhYmxlXFxgLlxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX2Rlc2NyaXB0b3JzX2ZpeGVkYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX2Rlc2NyaXB0b3JzX2ZpeGVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDYW5ub3Qgc2V0IHByb3RvdHlwZSBvZiBgJHN0YXRlYCBvYmplY3RcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlX3Byb3RvdHlwZV9maXhlZCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBzdGF0ZV9wcm90b3R5cGVfZml4ZWRcXG5DYW5ub3Qgc2V0IHByb3RvdHlwZSBvZiBcXGAkc3RhdGVcXGAgb2JqZWN0XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3RhdGVfcHJvdG90eXBlX2ZpeGVkYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX3Byb3RvdHlwZV9maXhlZGApO1xuXHR9XG59XG5cbi8qKlxuICogVXBkYXRpbmcgc3RhdGUgaW5zaWRlIGAkZGVyaXZlZCguLi4pYCwgYCRpbnNwZWN0KC4uLilgIG9yIGEgdGVtcGxhdGUgZXhwcmVzc2lvbiBpcyBmb3JiaWRkZW4uIElmIHRoZSB2YWx1ZSBzaG91bGQgbm90IGJlIHJlYWN0aXZlLCBkZWNsYXJlIGl0IHdpdGhvdXQgYCRzdGF0ZWBcbiAqIEByZXR1cm5zIHtuZXZlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlX3Vuc2FmZV9tdXRhdGlvbigpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBzdGF0ZV91bnNhZmVfbXV0YXRpb25cXG5VcGRhdGluZyBzdGF0ZSBpbnNpZGUgXFxgJGRlcml2ZWQoLi4uKVxcYCwgXFxgJGluc3BlY3QoLi4uKVxcYCBvciBhIHRlbXBsYXRlIGV4cHJlc3Npb24gaXMgZm9yYmlkZGVuLiBJZiB0aGUgdmFsdWUgc2hvdWxkIG5vdCBiZSByZWFjdGl2ZSwgZGVjbGFyZSBpdCB3aXRob3V0IFxcYCRzdGF0ZVxcYFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3N0YXRlX3Vuc2FmZV9tdXRhdGlvbmApO1xuXG5cdFx0ZXJyb3IubmFtZSA9ICdTdmVsdGUgZXJyb3InO1xuXG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9zdGF0ZV91bnNhZmVfbXV0YXRpb25gKTtcblx0fVxufVxuXG4vKipcbiAqIEEgYDxzdmVsdGU6Ym91bmRhcnk+YCBgcmVzZXRgIGZ1bmN0aW9uIGNhbm5vdCBiZSBjYWxsZWQgd2hpbGUgYW4gZXJyb3IgaXMgc3RpbGwgYmVpbmcgaGFuZGxlZFxuICogQHJldHVybnMge25ldmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X29uZXJyb3IoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X29uZXJyb3JcXG5BIFxcYDxzdmVsdGU6Ym91bmRhcnk+XFxgIFxcYHJlc2V0XFxgIGZ1bmN0aW9uIGNhbm5vdCBiZSBjYWxsZWQgd2hpbGUgYW4gZXJyb3IgaXMgc3RpbGwgYmVpbmcgaGFuZGxlZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL3N2ZWx0ZV9ib3VuZGFyeV9yZXNldF9vbmVycm9yYCk7XG5cblx0XHRlcnJvci5uYW1lID0gJ1N2ZWx0ZSBlcnJvcic7XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGh0dHBzOi8vc3ZlbHRlLmRldi9lL3N2ZWx0ZV9ib3VuZGFyeV9yZXNldF9vbmVycm9yYCk7XG5cdH1cbn0iLCJleHBvcnQgY29uc3QgRUFDSF9JVEVNX1JFQUNUSVZFID0gMTtcbmV4cG9ydCBjb25zdCBFQUNIX0lOREVYX1JFQUNUSVZFID0gMSA8PCAxO1xuLyoqIFNlZSBFYWNoQmxvY2sgaW50ZXJmYWNlIG1ldGFkYXRhLmlzX2NvbnRyb2xsZWQgZm9yIGFuIGV4cGxhbmF0aW9uIHdoYXQgdGhpcyBpcyAqL1xuZXhwb3J0IGNvbnN0IEVBQ0hfSVNfQ09OVFJPTExFRCA9IDEgPDwgMjtcbmV4cG9ydCBjb25zdCBFQUNIX0lTX0FOSU1BVEVEID0gMSA8PCAzO1xuZXhwb3J0IGNvbnN0IEVBQ0hfSVRFTV9JTU1VVEFCTEUgPSAxIDw8IDQ7XG5cbmV4cG9ydCBjb25zdCBQUk9QU19JU19JTU1VVEFCTEUgPSAxO1xuZXhwb3J0IGNvbnN0IFBST1BTX0lTX1JVTkVTID0gMSA8PCAxO1xuZXhwb3J0IGNvbnN0IFBST1BTX0lTX1VQREFURUQgPSAxIDw8IDI7XG5leHBvcnQgY29uc3QgUFJPUFNfSVNfQklOREFCTEUgPSAxIDw8IDM7XG5leHBvcnQgY29uc3QgUFJPUFNfSVNfTEFaWV9JTklUSUFMID0gMSA8PCA0O1xuXG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9JTiA9IDE7XG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9PVVQgPSAxIDw8IDE7XG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9HTE9CQUwgPSAxIDw8IDI7XG5cbmV4cG9ydCBjb25zdCBURU1QTEFURV9GUkFHTUVOVCA9IDE7XG5leHBvcnQgY29uc3QgVEVNUExBVEVfVVNFX0lNUE9SVF9OT0RFID0gMSA8PCAxO1xuZXhwb3J0IGNvbnN0IFRFTVBMQVRFX1VTRV9TVkcgPSAxIDw8IDI7XG5leHBvcnQgY29uc3QgVEVNUExBVEVfVVNFX01BVEhNTCA9IDEgPDwgMztcblxuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9TVEFSVCA9ICdbJztcbi8qKiB1c2VkIHRvIGluZGljYXRlIHRoYXQgYW4gYHs6ZWxzZX0uLi5gIGJsb2NrIHdhcyByZW5kZXJlZCAqL1xuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9TVEFSVF9FTFNFID0gJ1shJztcbi8qKiB1c2VkIHRvIGluZGljYXRlIHRoYXQgYSBib3VuZGFyeSdzIGBmYWlsZWRgIHNuaXBwZXQgd2FzIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXIgKi9cbmV4cG9ydCBjb25zdCBIWURSQVRJT05fU1RBUlRfRkFJTEVEID0gJ1s/JztcbmV4cG9ydCBjb25zdCBIWURSQVRJT05fRU5EID0gJ10nO1xuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9FUlJPUiA9IHt9O1xuXG5leHBvcnQgY29uc3QgRUxFTUVOVF9JU19OQU1FU1BBQ0VEID0gMTtcbmV4cG9ydCBjb25zdCBFTEVNRU5UX1BSRVNFUlZFX0FUVFJJQlVURV9DQVNFID0gMSA8PCAxO1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfSVNfSU5QVVQgPSAxIDw8IDI7XG5cbmV4cG9ydCBjb25zdCBVTklOSVRJQUxJWkVEID0gU3ltYm9sKCk7XG5cbi8vIERldi10aW1lIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG5leHBvcnQgY29uc3QgRklMRU5BTUUgPSBTeW1ib2woJ2ZpbGVuYW1lJyk7XG5leHBvcnQgY29uc3QgSE1SID0gU3ltYm9sKCdobXInKTtcblxuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9IVE1MID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9TVkcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9NQVRITUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG5cbi8vIHdlIHVzZSBhIGxpc3Qgb2YgaWdub3JhYmxlIHJ1bnRpbWUgd2FybmluZ3MgYmVjYXVzZSBub3QgZXZlcnkgcnVudGltZSB3YXJuaW5nXG4vLyBjYW4gYmUgaWdub3JlZCBhbmQgd2Ugd2FudCB0byBrZWVwIHRoZSB2YWxpZGF0aW9uIGZvciBzdmVsdGUtaWdub3JlIGluIHBsYWNlXG5leHBvcnQgY29uc3QgSUdOT1JBQkxFX1JVTlRJTUVfV0FSTklOR1MgPSAvKiogQHR5cGUge2NvbnN0fSAqLyAoW1xuXHQnYXdhaXRfd2F0ZXJmYWxsJyxcblx0J2F3YWl0X3JlYWN0aXZpdHlfbG9zcycsXG5cdCdzdGF0ZV9zbmFwc2hvdF91bmNsb25lYWJsZScsXG5cdCdiaW5kaW5nX3Byb3BlcnR5X25vbl9yZWFjdGl2ZScsXG5cdCdoeWRyYXRpb25fYXR0cmlidXRlX2NoYW5nZWQnLFxuXHQnaHlkcmF0aW9uX2h0bWxfY2hhbmdlZCcsXG5cdCdvd25lcnNoaXBfaW52YWxpZF9iaW5kaW5nJyxcblx0J293bmVyc2hpcF9pbnZhbGlkX211dGF0aW9uJ1xuXSk7XG5cbi8qKlxuICogV2hpdGVzcGFjZSBpbnNpZGUgb25lIG9mIHRoZXNlIGVsZW1lbnRzIHdpbGwgbm90IHJlc3VsdCBpblxuICogYSB3aGl0ZXNwYWNlIG5vZGUgYmVpbmcgY3JlYXRlZCBpbiBhbnkgY2lyY3Vtc3RhbmNlcy4gKFRoaXNcbiAqIGxpc3QgaXMgYWxtb3N0IGNlcnRhaW5seSB2ZXJ5IGluY29tcGxldGUpXG4gKiBUT0RPIHRoaXMgaXMgY3VycmVudGx5IHVudXNlZFxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVFNfV0lUSE9VVF9URVhUID0gWydhdWRpbycsICdkYXRhbGlzdCcsICdkbCcsICdvcHRncm91cCcsICdzZWxlY3QnLCAndmlkZW8nXTtcblxuZXhwb3J0IGNvbnN0IEFUVEFDSE1FTlRfS0VZID0gJ0BhdHRhY2gnO1xuIiwiLyogVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBzY3JpcHRzL3Byb2Nlc3MtbWVzc2FnZXMvaW5kZXguanMuIERvIG5vdCBlZGl0ISAqL1xuXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcblxudmFyIGJvbGQgPSAnZm9udC13ZWlnaHQ6IGJvbGQnO1xudmFyIG5vcm1hbCA9ICdmb250LXdlaWdodDogbm9ybWFsJztcblxuLyoqXG4gKiBBc3NpZ25tZW50IHRvIGAlcHJvcGVydHklYCBwcm9wZXJ0eSAoJWxvY2F0aW9uJSkgd2lsbCBldmFsdWF0ZSB0byB0aGUgcmlnaHQtaGFuZCBzaWRlLCBub3QgdGhlIHZhbHVlIG9mIGAlcHJvcGVydHklYCBmb2xsb3dpbmcgdGhlIGFzc2lnbm1lbnQuIFRoaXMgbWF5IHJlc3VsdCBpbiB1bmV4cGVjdGVkIGJlaGF2aW91ci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25tZW50X3ZhbHVlX3N0YWxlKHByb3BlcnR5LCBsb2NhdGlvbikge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIGFzc2lnbm1lbnRfdmFsdWVfc3RhbGVcXG4lY0Fzc2lnbm1lbnQgdG8gXFxgJHtwcm9wZXJ0eX1cXGAgcHJvcGVydHkgKCR7bG9jYXRpb259KSB3aWxsIGV2YWx1YXRlIHRvIHRoZSByaWdodC1oYW5kIHNpZGUsIG5vdCB0aGUgdmFsdWUgb2YgXFxgJHtwcm9wZXJ0eX1cXGAgZm9sbG93aW5nIHRoZSBhc3NpZ25tZW50LiBUaGlzIG1heSByZXN1bHQgaW4gdW5leHBlY3RlZCBiZWhhdmlvdXIuXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYXNzaWdubWVudF92YWx1ZV9zdGFsZWAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9hc3NpZ25tZW50X3ZhbHVlX3N0YWxlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBEZXRlY3RlZCByZWFjdGl2aXR5IGxvc3Mgd2hlbiByZWFkaW5nIGAlbmFtZSVgLiBUaGlzIGhhcHBlbnMgd2hlbiBzdGF0ZSBpcyByZWFkIGluIGFuIGFzeW5jIGZ1bmN0aW9uIGFmdGVyIGFuIGVhcmxpZXIgYGF3YWl0YFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF3YWl0X3JlYWN0aXZpdHlfbG9zcyhuYW1lKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gYXdhaXRfcmVhY3Rpdml0eV9sb3NzXFxuJWNEZXRlY3RlZCByZWFjdGl2aXR5IGxvc3Mgd2hlbiByZWFkaW5nIFxcYCR7bmFtZX1cXGAuIFRoaXMgaGFwcGVucyB3aGVuIHN0YXRlIGlzIHJlYWQgaW4gYW4gYXN5bmMgZnVuY3Rpb24gYWZ0ZXIgYW4gZWFybGllciBcXGBhd2FpdFxcYFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2F3YWl0X3JlYWN0aXZpdHlfbG9zc2AsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9hd2FpdF9yZWFjdGl2aXR5X2xvc3NgKTtcblx0fVxufVxuXG4vKipcbiAqIEFuIGFzeW5jIGRlcml2ZWQsIGAlbmFtZSVgICglbG9jYXRpb24lKSB3YXMgbm90IHJlYWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgcmVzb2x2ZWQuIFRoaXMgb2Z0ZW4gaW5kaWNhdGVzIGFuIHVubmVjZXNzYXJ5IHdhdGVyZmFsbCwgd2hpY2ggY2FuIHNsb3cgZG93biB5b3VyIGFwcFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYXdhaXRfd2F0ZXJmYWxsKG5hbWUsIGxvY2F0aW9uKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gYXdhaXRfd2F0ZXJmYWxsXFxuJWNBbiBhc3luYyBkZXJpdmVkLCBcXGAke25hbWV9XFxgICgke2xvY2F0aW9ufSkgd2FzIG5vdCByZWFkIGltbWVkaWF0ZWx5IGFmdGVyIGl0IHJlc29sdmVkLiBUaGlzIG9mdGVuIGluZGljYXRlcyBhbiB1bm5lY2Vzc2FyeSB3YXRlcmZhbGwsIHdoaWNoIGNhbiBzbG93IGRvd24geW91ciBhcHBcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9hd2FpdF93YXRlcmZhbGxgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYXdhaXRfd2F0ZXJmYWxsYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBgJWJpbmRpbmclYCAoJWxvY2F0aW9uJSkgaXMgYmluZGluZyB0byBhIG5vbi1yZWFjdGl2ZSBwcm9wZXJ0eVxuICogQHBhcmFtIHtzdHJpbmd9IGJpbmRpbmdcbiAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gW2xvY2F0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmUoYmluZGluZywgbG9jYXRpb24pIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdGAlY1tzdmVsdGVdIGJpbmRpbmdfcHJvcGVydHlfbm9uX3JlYWN0aXZlXFxuJWMke2xvY2F0aW9uXG5cdFx0XHRcdD8gYFxcYCR7YmluZGluZ31cXGAgKCR7bG9jYXRpb259KSBpcyBiaW5kaW5nIHRvIGEgbm9uLXJlYWN0aXZlIHByb3BlcnR5YFxuXHRcdFx0XHQ6IGBcXGAke2JpbmRpbmd9XFxgIGlzIGJpbmRpbmcgdG8gYSBub24tcmVhY3RpdmUgcHJvcGVydHlgfVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2JpbmRpbmdfcHJvcGVydHlfbm9uX3JlYWN0aXZlYCxcblx0XHRcdGJvbGQsXG5cdFx0XHRub3JtYWxcblx0XHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmVgKTtcblx0fVxufVxuXG4vKipcbiAqIFlvdXIgYGNvbnNvbGUuJW1ldGhvZCVgIGNvbnRhaW5lZCBgJHN0YXRlYCBwcm94aWVzLiBDb25zaWRlciB1c2luZyBgJGluc3BlY3QoLi4uKWAgb3IgYCRzdGF0ZS5zbmFwc2hvdCguLi4pYCBpbnN0ZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlX2xvZ19zdGF0ZShtZXRob2QpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBjb25zb2xlX2xvZ19zdGF0ZVxcbiVjWW91ciBcXGBjb25zb2xlLiR7bWV0aG9kfVxcYCBjb250YWluZWQgXFxgJHN0YXRlXFxgIHByb3hpZXMuIENvbnNpZGVyIHVzaW5nIFxcYCRpbnNwZWN0KC4uLilcXGAgb3IgXFxgJHN0YXRlLnNuYXBzaG90KC4uLilcXGAgaW5zdGVhZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2NvbnNvbGVfbG9nX3N0YXRlYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2NvbnNvbGVfbG9nX3N0YXRlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiAlaGFuZGxlciUgc2hvdWxkIGJlIGEgZnVuY3Rpb24uIERpZCB5b3UgbWVhbiB0byAlc3VnZ2VzdGlvbiU/XG4gKiBAcGFyYW0ge3N0cmluZ30gaGFuZGxlclxuICogQHBhcmFtIHtzdHJpbmd9IHN1Z2dlc3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50X2hhbmRsZXJfaW52YWxpZChoYW5kbGVyLCBzdWdnZXN0aW9uKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gZXZlbnRfaGFuZGxlcl9pbnZhbGlkXFxuJWMke2hhbmRsZXJ9IHNob3VsZCBiZSBhIGZ1bmN0aW9uLiBEaWQgeW91IG1lYW4gdG8gJHtzdWdnZXN0aW9ufT9cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9ldmVudF9oYW5kbGVyX2ludmFsaWRgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvZXZlbnRfaGFuZGxlcl9pbnZhbGlkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBFeHBlY3RlZCB0byBmaW5kIGEgaHlkcmF0YWJsZSB3aXRoIGtleSBgJWtleSVgIGR1cmluZyBoeWRyYXRpb24sIGJ1dCBkaWQgbm90LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0YWJsZV9taXNzaW5nX2J1dF9leHBlY3RlZChrZXkpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBoeWRyYXRhYmxlX21pc3NpbmdfYnV0X2V4cGVjdGVkXFxuJWNFeHBlY3RlZCB0byBmaW5kIGEgaHlkcmF0YWJsZSB3aXRoIGtleSBcXGAke2tleX1cXGAgZHVyaW5nIGh5ZHJhdGlvbiwgYnV0IGRpZCBub3QuXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0YWJsZV9taXNzaW5nX2J1dF9leHBlY3RlZGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRhYmxlX21pc3NpbmdfYnV0X2V4cGVjdGVkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgYCVhdHRyaWJ1dGUlYCBhdHRyaWJ1dGUgb24gYCVodG1sJWAgY2hhbmdlZCBpdHMgdmFsdWUgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudCByZW5kZXJzLiBUaGUgY2xpZW50IHZhbHVlLCBgJXZhbHVlJWAsIHdpbGwgYmUgaWdub3JlZCBpbiBmYXZvdXIgb2YgdGhlIHNlcnZlciB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0aW9uX2F0dHJpYnV0ZV9jaGFuZ2VkKGF0dHJpYnV0ZSwgaHRtbCwgdmFsdWUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBoeWRyYXRpb25fYXR0cmlidXRlX2NoYW5nZWRcXG4lY1RoZSBcXGAke2F0dHJpYnV0ZX1cXGAgYXR0cmlidXRlIG9uIFxcYCR7aHRtbH1cXGAgY2hhbmdlZCBpdHMgdmFsdWUgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudCByZW5kZXJzLiBUaGUgY2xpZW50IHZhbHVlLCBcXGAke3ZhbHVlfVxcYCwgd2lsbCBiZSBpZ25vcmVkIGluIGZhdm91ciBvZiB0aGUgc2VydmVyIHZhbHVlXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaHlkcmF0aW9uX2F0dHJpYnV0ZV9jaGFuZ2VkYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGlvbl9hdHRyaWJ1dGVfY2hhbmdlZGApO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIHZhbHVlIG9mIGFuIGB7QGh0bWwgLi4ufWAgYmxvY2sgJWxvY2F0aW9uJSBjaGFuZ2VkIGJldHdlZW4gc2VydmVyIGFuZCBjbGllbnQgcmVuZGVycy4gVGhlIGNsaWVudCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQgaW4gZmF2b3VyIG9mIHRoZSBzZXJ2ZXIgdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gW2xvY2F0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0aW9uX2h0bWxfY2hhbmdlZChsb2NhdGlvbikge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YCVjW3N2ZWx0ZV0gaHlkcmF0aW9uX2h0bWxfY2hhbmdlZFxcbiVjJHtsb2NhdGlvblxuXHRcdFx0XHQ/IGBUaGUgdmFsdWUgb2YgYW4gXFxge0BodG1sIC4uLn1cXGAgYmxvY2sgJHtsb2NhdGlvbn0gY2hhbmdlZCBiZXR3ZWVuIHNlcnZlciBhbmQgY2xpZW50IHJlbmRlcnMuIFRoZSBjbGllbnQgdmFsdWUgd2lsbCBiZSBpZ25vcmVkIGluIGZhdm91ciBvZiB0aGUgc2VydmVyIHZhbHVlYFxuXHRcdFx0XHQ6ICdUaGUgdmFsdWUgb2YgYW4gYHtAaHRtbCAuLi59YCBibG9jayBjaGFuZ2VkIGJldHdlZW4gc2VydmVyIGFuZCBjbGllbnQgcmVuZGVycy4gVGhlIGNsaWVudCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQgaW4gZmF2b3VyIG9mIHRoZSBzZXJ2ZXIgdmFsdWUnfVxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL2h5ZHJhdGlvbl9odG1sX2NoYW5nZWRgLFxuXHRcdFx0Ym9sZCxcblx0XHRcdG5vcm1hbFxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRpb25faHRtbF9jaGFuZ2VkYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBIeWRyYXRpb24gZmFpbGVkIGJlY2F1c2UgdGhlIGluaXRpYWwgVUkgZG9lcyBub3QgbWF0Y2ggd2hhdCB3YXMgcmVuZGVyZWQgb24gdGhlIHNlcnZlci4gVGhlIGVycm9yIG9jY3VycmVkIG5lYXIgJWxvY2F0aW9uJVxuICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBbbG9jYXRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRpb25fbWlzbWF0Y2gobG9jYXRpb24pIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdGAlY1tzdmVsdGVdIGh5ZHJhdGlvbl9taXNtYXRjaFxcbiVjJHtsb2NhdGlvblxuXHRcdFx0XHQ/IGBIeWRyYXRpb24gZmFpbGVkIGJlY2F1c2UgdGhlIGluaXRpYWwgVUkgZG9lcyBub3QgbWF0Y2ggd2hhdCB3YXMgcmVuZGVyZWQgb24gdGhlIHNlcnZlci4gVGhlIGVycm9yIG9jY3VycmVkIG5lYXIgJHtsb2NhdGlvbn1gXG5cdFx0XHRcdDogJ0h5ZHJhdGlvbiBmYWlsZWQgYmVjYXVzZSB0aGUgaW5pdGlhbCBVSSBkb2VzIG5vdCBtYXRjaCB3aGF0IHdhcyByZW5kZXJlZCBvbiB0aGUgc2VydmVyJ31cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRpb25fbWlzbWF0Y2hgLFxuXHRcdFx0Ym9sZCxcblx0XHRcdG5vcm1hbFxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9oeWRyYXRpb25fbWlzbWF0Y2hgKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBgcmVuZGVyYCBmdW5jdGlvbiBwYXNzZWQgdG8gYGNyZWF0ZVJhd1NuaXBwZXRgIHNob3VsZCByZXR1cm4gSFRNTCBmb3IgYSBzaW5nbGUgZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZF9yYXdfc25pcHBldF9yZW5kZXIoKSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gaW52YWxpZF9yYXdfc25pcHBldF9yZW5kZXJcXG4lY1RoZSBcXGByZW5kZXJcXGAgZnVuY3Rpb24gcGFzc2VkIHRvIFxcYGNyZWF0ZVJhd1NuaXBwZXRcXGAgc2hvdWxkIHJldHVybiBIVE1MIGZvciBhIHNpbmdsZSBlbGVtZW50XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaW52YWxpZF9yYXdfc25pcHBldF9yZW5kZXJgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvaW52YWxpZF9yYXdfc25pcHBldF9yZW5kZXJgKTtcblx0fVxufVxuXG4vKipcbiAqIERldGVjdGVkIGEgbWlncmF0ZWQgYCQ6YCByZWFjdGl2ZSBibG9jayBpbiBgJWZpbGVuYW1lJWAgdGhhdCBib3RoIGFjY2Vzc2VzIGFuZCB1cGRhdGVzIHRoZSBzYW1lIHJlYWN0aXZlIHZhbHVlLiBUaGlzIG1heSBjYXVzZSByZWN1cnNpdmUgdXBkYXRlcyB3aGVuIGNvbnZlcnRlZCB0byBhbiBgJGVmZmVjdGAuXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeV9yZWN1cnNpdmVfcmVhY3RpdmVfYmxvY2soZmlsZW5hbWUpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBsZWdhY3lfcmVjdXJzaXZlX3JlYWN0aXZlX2Jsb2NrXFxuJWNEZXRlY3RlZCBhIG1pZ3JhdGVkIFxcYCQ6XFxgIHJlYWN0aXZlIGJsb2NrIGluIFxcYCR7ZmlsZW5hbWV9XFxgIHRoYXQgYm90aCBhY2Nlc3NlcyBhbmQgdXBkYXRlcyB0aGUgc2FtZSByZWFjdGl2ZSB2YWx1ZS4gVGhpcyBtYXkgY2F1c2UgcmVjdXJzaXZlIHVwZGF0ZXMgd2hlbiBjb252ZXJ0ZWQgdG8gYW4gXFxgJGVmZmVjdFxcYC5cXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9sZWdhY3lfcmVjdXJzaXZlX3JlYWN0aXZlX2Jsb2NrYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL2xlZ2FjeV9yZWN1cnNpdmVfcmVhY3RpdmVfYmxvY2tgKTtcblx0fVxufVxuXG4vKipcbiAqIFRyaWVkIHRvIHVubW91bnQgYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IG1vdW50ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZmVjeWNsZV9kb3VibGVfdW5tb3VudCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBsaWZlY3ljbGVfZG91YmxlX3VubW91bnRcXG4lY1RyaWVkIHRvIHVubW91bnQgYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IG1vdW50ZWRcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9saWZlY3ljbGVfZG91YmxlX3VubW91bnRgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvbGlmZWN5Y2xlX2RvdWJsZV91bm1vdW50YCk7XG5cdH1cbn1cblxuLyoqXG4gKiAlcGFyZW50JSBwYXNzZWQgcHJvcGVydHkgYCVwcm9wJWAgdG8gJWNoaWxkJSB3aXRoIGBiaW5kOmAsIGJ1dCBpdHMgcGFyZW50IGNvbXBvbmVudCAlb3duZXIlIGRpZCBub3QgZGVjbGFyZSBgJXByb3AlYCBhcyBhIGJpbmRpbmcuIENvbnNpZGVyIGNyZWF0aW5nIGEgYmluZGluZyBiZXR3ZWVuICVvd25lciUgYW5kICVwYXJlbnQlIChlLmcuIGBiaW5kOiVwcm9wJT17Li4ufWAgaW5zdGVhZCBvZiBgJXByb3AlPXsuLi59YClcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hpbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBvd25lclxuICovXG5leHBvcnQgZnVuY3Rpb24gb3duZXJzaGlwX2ludmFsaWRfYmluZGluZyhwYXJlbnQsIHByb3AsIGNoaWxkLCBvd25lcikge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIG93bmVyc2hpcF9pbnZhbGlkX2JpbmRpbmdcXG4lYyR7cGFyZW50fSBwYXNzZWQgcHJvcGVydHkgXFxgJHtwcm9wfVxcYCB0byAke2NoaWxkfSB3aXRoIFxcYGJpbmQ6XFxgLCBidXQgaXRzIHBhcmVudCBjb21wb25lbnQgJHtvd25lcn0gZGlkIG5vdCBkZWNsYXJlIFxcYCR7cHJvcH1cXGAgYXMgYSBiaW5kaW5nLiBDb25zaWRlciBjcmVhdGluZyBhIGJpbmRpbmcgYmV0d2VlbiAke293bmVyfSBhbmQgJHtwYXJlbnR9IChlLmcuIFxcYGJpbmQ6JHtwcm9wfT17Li4ufVxcYCBpbnN0ZWFkIG9mIFxcYCR7cHJvcH09ey4uLn1cXGApXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvb3duZXJzaGlwX2ludmFsaWRfYmluZGluZ2AsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9vd25lcnNoaXBfaW52YWxpZF9iaW5kaW5nYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBNdXRhdGluZyB1bmJvdW5kIHByb3BzIChgJW5hbWUlYCwgYXQgJWxvY2F0aW9uJSkgaXMgc3Ryb25nbHkgZGlzY291cmFnZWQuIENvbnNpZGVyIHVzaW5nIGBiaW5kOiVwcm9wJT17Li4ufWAgaW4gJXBhcmVudCUgKG9yIHVzaW5nIGEgY2FsbGJhY2spIGluc3RlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvd25lcnNoaXBfaW52YWxpZF9tdXRhdGlvbihuYW1lLCBsb2NhdGlvbiwgcHJvcCwgcGFyZW50KSB7XG5cdGlmIChERVYpIHtcblx0XHRjb25zb2xlLndhcm4oYCVjW3N2ZWx0ZV0gb3duZXJzaGlwX2ludmFsaWRfbXV0YXRpb25cXG4lY011dGF0aW5nIHVuYm91bmQgcHJvcHMgKFxcYCR7bmFtZX1cXGAsIGF0ICR7bG9jYXRpb259KSBpcyBzdHJvbmdseSBkaXNjb3VyYWdlZC4gQ29uc2lkZXIgdXNpbmcgXFxgYmluZDoke3Byb3B9PXsuLi59XFxgIGluICR7cGFyZW50fSAob3IgdXNpbmcgYSBjYWxsYmFjaykgaW5zdGVhZFxcbmh0dHBzOi8vc3ZlbHRlLmRldi9lL293bmVyc2hpcF9pbnZhbGlkX211dGF0aW9uYCwgYm9sZCwgbm9ybWFsKTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLndhcm4oYGh0dHBzOi8vc3ZlbHRlLmRldi9lL293bmVyc2hpcF9pbnZhbGlkX211dGF0aW9uYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgYHZhbHVlYCBwcm9wZXJ0eSBvZiBhIGA8c2VsZWN0IG11bHRpcGxlPmAgZWxlbWVudCBzaG91bGQgYmUgYW4gYXJyYXksIGJ1dCBpdCByZWNlaXZlZCBhIG5vbi1hcnJheSB2YWx1ZS4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIGtlcHQgYXMgaXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZSgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBzZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZVxcbiVjVGhlIFxcYHZhbHVlXFxgIHByb3BlcnR5IG9mIGEgXFxgPHNlbGVjdCBtdWx0aXBsZT5cXGAgZWxlbWVudCBzaG91bGQgYmUgYW4gYXJyYXksIGJ1dCBpdCByZWNlaXZlZCBhIG5vbi1hcnJheSB2YWx1ZS4gVGhlIHNlbGVjdGlvbiB3aWxsIGJlIGtlcHQgYXMgaXMuXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc2VsZWN0X211bHRpcGxlX2ludmFsaWRfdmFsdWVgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc2VsZWN0X211bHRpcGxlX2ludmFsaWRfdmFsdWVgKTtcblx0fVxufVxuXG4vKipcbiAqIFJlYWN0aXZlIGAkc3RhdGUoLi4uKWAgcHJveGllcyBhbmQgdGhlIHZhbHVlcyB0aGV5IHByb3h5IGhhdmUgZGlmZmVyZW50IGlkZW50aXRpZXMuIEJlY2F1c2Ugb2YgdGhpcywgY29tcGFyaXNvbnMgd2l0aCBgJW9wZXJhdG9yJWAgd2lsbCBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0c1xuICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZV9wcm94eV9lcXVhbGl0eV9taXNtYXRjaChvcGVyYXRvcikge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIHN0YXRlX3Byb3h5X2VxdWFsaXR5X21pc21hdGNoXFxuJWNSZWFjdGl2ZSBcXGAkc3RhdGUoLi4uKVxcYCBwcm94aWVzIGFuZCB0aGUgdmFsdWVzIHRoZXkgcHJveHkgaGF2ZSBkaWZmZXJlbnQgaWRlbnRpdGllcy4gQmVjYXVzZSBvZiB0aGlzLCBjb21wYXJpc29ucyB3aXRoIFxcYCR7b3BlcmF0b3J9XFxgIHdpbGwgcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHNcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS9zdGF0ZV9wcm94eV9lcXVhbGl0eV9taXNtYXRjaGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9zdGF0ZV9wcm94eV9lcXVhbGl0eV9taXNtYXRjaGApO1xuXHR9XG59XG5cbi8qKlxuICogVHJpZWQgdG8gdW5tb3VudCBhIHN0YXRlIHByb3h5LCByYXRoZXIgdGhhbiBhIGNvbXBvbmVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVfcHJveHlfdW5tb3VudCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBzdGF0ZV9wcm94eV91bm1vdW50XFxuJWNUcmllZCB0byB1bm1vdW50IGEgc3RhdGUgcHJveHksIHJhdGhlciB0aGFuIGEgY29tcG9uZW50XFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3RhdGVfcHJveHlfdW5tb3VudGAsIGJvbGQsIG5vcm1hbCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS53YXJuKGBodHRwczovL3N2ZWx0ZS5kZXYvZS9zdGF0ZV9wcm94eV91bm1vdW50YCk7XG5cdH1cbn1cblxuLyoqXG4gKiBBIGA8c3ZlbHRlOmJvdW5kYXJ5PmAgYHJlc2V0YCBmdW5jdGlvbiBvbmx5IHJlc2V0cyB0aGUgYm91bmRhcnkgdGhlIGZpcnN0IHRpbWUgaXQgaXMgY2FsbGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdmVsdGVfYm91bmRhcnlfcmVzZXRfbm9vcCgpIHtcblx0aWYgKERFVikge1xuXHRcdGNvbnNvbGUud2FybihgJWNbc3ZlbHRlXSBzdmVsdGVfYm91bmRhcnlfcmVzZXRfbm9vcFxcbiVjQSBcXGA8c3ZlbHRlOmJvdW5kYXJ5PlxcYCBcXGByZXNldFxcYCBmdW5jdGlvbiBvbmx5IHJlc2V0cyB0aGUgYm91bmRhcnkgdGhlIGZpcnN0IHRpbWUgaXQgaXMgY2FsbGVkXFxuaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X25vb3BgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2Uvc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X25vb3BgKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBgc2xpZGVgIHRyYW5zaXRpb24gZG9lcyBub3Qgd29yayBjb3JyZWN0bHkgZm9yIGVsZW1lbnRzIHdpdGggYGRpc3BsYXk6ICV2YWx1ZSVgXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zaXRpb25fc2xpZGVfZGlzcGxheSh2YWx1ZSkge1xuXHRpZiAoREVWKSB7XG5cdFx0Y29uc29sZS53YXJuKGAlY1tzdmVsdGVdIHRyYW5zaXRpb25fc2xpZGVfZGlzcGxheVxcbiVjVGhlIFxcYHNsaWRlXFxgIHRyYW5zaXRpb24gZG9lcyBub3Qgd29yayBjb3JyZWN0bHkgZm9yIGVsZW1lbnRzIHdpdGggXFxgZGlzcGxheTogJHt2YWx1ZX1cXGBcXG5odHRwczovL3N2ZWx0ZS5kZXYvZS90cmFuc2l0aW9uX3NsaWRlX2Rpc3BsYXlgLCBib2xkLCBub3JtYWwpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgaHR0cHM6Ly9zdmVsdGUuZGV2L2UvdHJhbnNpdGlvbl9zbGlkZV9kaXNwbGF5YCk7XG5cdH1cbn0iLCIvKiogQGltcG9ydCB7IEVxdWFscyB9IGZyb20gJyNjbGllbnQnICovXG5cbi8qKiBAdHlwZSB7RXF1YWxzfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgPT09IHRoaXMudjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3Vua25vd259IGFcbiAqIEBwYXJhbSB7dW5rbm93bn0gYlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG5cdHJldHVybiBhICE9IGFcblx0XHQ/IGIgPT0gYlxuXHRcdDogYSAhPT0gYiB8fCAoYSAhPT0gbnVsbCAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHx8IHR5cGVvZiBhID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7dW5rbm93bn0gYVxuICogQHBhcmFtIHt1bmtub3dufSBiXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdF9lcXVhbChhLCBiKSB7XG5cdHJldHVybiBhICE9PSBiO1xufVxuXG4vKiogQHR5cGUge0VxdWFsc30gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYWZlX2VxdWFscyh2YWx1ZSkge1xuXHRyZXR1cm4gIXNhZmVfbm90X2VxdWFsKHZhbHVlLCB0aGlzLnYpO1xufVxuIiwiLyoqIFRydWUgaWYgZXhwZXJpbWVudGFsLmFzeW5jPXRydWUgKi9cbmV4cG9ydCBsZXQgYXN5bmNfbW9kZV9mbGFnID0gZmFsc2U7XG4vKiogVHJ1ZSBpZiB3ZSdyZSBub3QgY2VydGFpbiB0aGF0IHdlIG9ubHkgaGF2ZSBTdmVsdGUgNSBjb2RlIGluIHRoZSBjb21waWxhdGlvbiAqL1xuZXhwb3J0IGxldCBsZWdhY3lfbW9kZV9mbGFnID0gZmFsc2U7XG4vKiogVHJ1ZSBpZiAkaW5zcGVjdC50cmFjZSBpcyB1c2VkICovXG5leHBvcnQgbGV0IHRyYWNpbmdfbW9kZV9mbGFnID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVfYXN5bmNfbW9kZV9mbGFnKCkge1xuXHRhc3luY19tb2RlX2ZsYWcgPSB0cnVlO1xufVxuXG4vKiogT05MWSBVU0UgVEhJUyBEVVJJTkcgVEVTVElORyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVfYXN5bmNfbW9kZV9mbGFnKCkge1xuXHRhc3luY19tb2RlX2ZsYWcgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZV9sZWdhY3lfbW9kZV9mbGFnKCkge1xuXHRsZWdhY3lfbW9kZV9mbGFnID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZV90cmFjaW5nX21vZGVfZmxhZygpIHtcblx0dHJhY2luZ19tb2RlX2ZsYWcgPSB0cnVlO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBDb21wb25lbnRDb250ZXh0LCBEZXZTdGFja0VudHJ5LCBFZmZlY3QgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4vZXJyb3JzLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9lZmZlY3QsIGFjdGl2ZV9yZWFjdGlvbiB9IGZyb20gJy4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfdXNlcl9lZmZlY3QgfSBmcm9tICcuL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcsIGxlZ2FjeV9tb2RlX2ZsYWcgfSBmcm9tICcuLi9mbGFncy9pbmRleC5qcyc7XG5pbXBvcnQgeyBGSUxFTkFNRSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBCUkFOQ0hfRUZGRUNULCBSRUFDVElPTl9SQU4gfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbi8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dCB8IG51bGx9ICovXG5leHBvcnQgbGV0IGNvbXBvbmVudF9jb250ZXh0ID0gbnVsbDtcblxuLyoqIEBwYXJhbSB7Q29tcG9uZW50Q29udGV4dCB8IG51bGx9IGNvbnRleHQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfY29tcG9uZW50X2NvbnRleHQoY29udGV4dCkge1xuXHRjb21wb25lbnRfY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbi8qKiBAdHlwZSB7RGV2U3RhY2tFbnRyeSB8IG51bGx9ICovXG5leHBvcnQgbGV0IGRldl9zdGFjayA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge0RldlN0YWNrRW50cnkgfCBudWxsfSBzdGFjayAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9kZXZfc3RhY2soc3RhY2spIHtcblx0ZGV2X3N0YWNrID0gc3RhY2s7XG59XG5cbi8qKlxuICogRXhlY3V0ZSBhIGNhbGxiYWNrIHdpdGggYSBuZXcgZGV2IHN0YWNrIGVudHJ5XG4gKiBAcGFyYW0geygpID0+IGFueX0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlXG4gKiBAcGFyYW0ge0RldlN0YWNrRW50cnlbJ3R5cGUnXX0gdHlwZSAtIFR5cGUgb2YgYmxvY2svY29tcG9uZW50XG4gKiBAcGFyYW0ge2FueX0gY29tcG9uZW50IC0gQ29tcG9uZW50IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbGluZSAtIExpbmUgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sdW1uIC0gQ29sdW1uIG51bWJlclxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbYWRkaXRpb25hbF0gLSBBbnkgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRvIGFkZCB0byB0aGUgZGV2IHN0YWNrIGVudHJ5XG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkX3N2ZWx0ZV9tZXRhKGNhbGxiYWNrLCB0eXBlLCBjb21wb25lbnQsIGxpbmUsIGNvbHVtbiwgYWRkaXRpb25hbCkge1xuXHRjb25zdCBwYXJlbnQgPSBkZXZfc3RhY2s7XG5cblx0ZGV2X3N0YWNrID0ge1xuXHRcdHR5cGUsXG5cdFx0ZmlsZTogY29tcG9uZW50W0ZJTEVOQU1FXSxcblx0XHRsaW5lLFxuXHRcdGNvbHVtbixcblx0XHRwYXJlbnQsXG5cdFx0Li4uYWRkaXRpb25hbFxuXHR9O1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuIGNhbGxiYWNrKCk7XG5cdH0gZmluYWxseSB7XG5cdFx0ZGV2X3N0YWNrID0gcGFyZW50O1xuXHR9XG59XG5cbi8qKlxuICogVGhlIGN1cnJlbnQgY29tcG9uZW50IGZ1bmN0aW9uLiBEaWZmZXJlbnQgZnJvbSBjdXJyZW50IGNvbXBvbmVudCBjb250ZXh0OlxuICogYGBgaHRtbFxuICogPCEtLSBBcHAuc3ZlbHRlIC0tPlxuICogPEZvbz5cbiAqICAgPEJhciAvPiA8IS0tIGNvbnRleHQgPT0gRm9vLnN2ZWx0ZSwgZnVuY3Rpb24gPT0gQXBwLnN2ZWx0ZSAtLT5cbiAqIDwvRm9vPlxuICogYGBgXG4gKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dFsnZnVuY3Rpb24nXX1cbiAqL1xuZXhwb3J0IGxldCBkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24gPSBudWxsO1xuXG4vKiogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0WydmdW5jdGlvbiddfSBmbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9kZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24oZm4pIHtcblx0ZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uID0gZm47XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGBbZ2V0LCBzZXRdYCBwYWlyIG9mIGZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIGNvbnRleHQgaW4gYSB0eXBlLXNhZmUgd2F5LlxuICpcbiAqIGBnZXRgIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgbm8gcGFyZW50IGNvbXBvbmVudCBjYWxsZWQgYHNldGAuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEByZXR1cm5zIHtbKCkgPT4gVCwgKGNvbnRleHQ6IFQpID0+IFRdfVxuICogQHNpbmNlIDUuNDAuMFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGV4dCgpIHtcblx0Y29uc3Qga2V5ID0ge307XG5cblx0cmV0dXJuIFtcblx0XHQoKSA9PiB7XG5cdFx0XHRpZiAoIWhhc0NvbnRleHQoa2V5KSkge1xuXHRcdFx0XHRlLm1pc3NpbmdfY29udGV4dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZ2V0Q29udGV4dChrZXkpO1xuXHRcdH0sXG5cdFx0KGNvbnRleHQpID0+IHNldENvbnRleHQoa2V5LCBjb250ZXh0KVxuXHRdO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY29udGV4dCB0aGF0IGJlbG9uZ3MgdG8gdGhlIGNsb3Nlc3QgcGFyZW50IGNvbXBvbmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgYGtleWAuXG4gKiBNdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICpcbiAqIFtgY3JlYXRlQ29udGV4dGBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS9zdmVsdGUjY3JlYXRlQ29udGV4dCkgaXMgYSB0eXBlLXNhZmUgYWx0ZXJuYXRpdmUuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7YW55fSBrZXlcbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcblx0Y29uc3QgY29udGV4dF9tYXAgPSBnZXRfb3JfaW5pdF9jb250ZXh0X21hcCgnZ2V0Q29udGV4dCcpO1xuXHRjb25zdCByZXN1bHQgPSAvKiogQHR5cGUge1R9ICovIChjb250ZXh0X21hcC5nZXQoa2V5KSk7XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXNzb2NpYXRlcyBhbiBhcmJpdHJhcnkgYGNvbnRleHRgIG9iamVjdCB3aXRoIHRoZSBjdXJyZW50IGNvbXBvbmVudCBhbmQgdGhlIHNwZWNpZmllZCBga2V5YFxuICogYW5kIHJldHVybnMgdGhhdCBvYmplY3QuIFRoZSBjb250ZXh0IGlzIHRoZW4gYXZhaWxhYmxlIHRvIGNoaWxkcmVuIG9mIHRoZSBjb21wb25lbnRcbiAqIChpbmNsdWRpbmcgc2xvdHRlZCBjb250ZW50KSB3aXRoIGBnZXRDb250ZXh0YC5cbiAqXG4gKiBMaWtlIGxpZmVjeWNsZSBmdW5jdGlvbnMsIHRoaXMgbXVzdCBiZSBjYWxsZWQgZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbi5cbiAqXG4gKiBbYGNyZWF0ZUNvbnRleHRgXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvc3ZlbHRlI2NyZWF0ZUNvbnRleHQpIGlzIGEgdHlwZS1zYWZlIGFsdGVybmF0aXZlLlxuICpcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge2FueX0ga2V5XG4gKiBAcGFyYW0ge1R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcblx0Y29uc3QgY29udGV4dF9tYXAgPSBnZXRfb3JfaW5pdF9jb250ZXh0X21hcCgnc2V0Q29udGV4dCcpO1xuXG5cdGlmIChhc3luY19tb2RlX2ZsYWcpIHtcblx0XHR2YXIgZmxhZ3MgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpLmY7XG5cdFx0dmFyIHZhbGlkID1cblx0XHRcdCFhY3RpdmVfcmVhY3Rpb24gJiZcblx0XHRcdChmbGFncyAmIEJSQU5DSF9FRkZFQ1QpICE9PSAwICYmXG5cdFx0XHQvLyBwb3AoKSBydW5zIHN5bmNocm9ub3VzbHksIHNvIHRoaXMgaW5kaWNhdGVzIHdlJ3JlIHNldHRpbmcgY29udGV4dCBhZnRlciBhbiBhd2FpdFxuXHRcdFx0ISgvKiogQHR5cGUge0NvbXBvbmVudENvbnRleHR9ICovIChjb21wb25lbnRfY29udGV4dCkuaSk7XG5cblx0XHRpZiAoIXZhbGlkKSB7XG5cdFx0XHRlLnNldF9jb250ZXh0X2FmdGVyX2luaXQoKTtcblx0XHR9XG5cdH1cblxuXHRjb250ZXh0X21hcC5zZXQoa2V5LCBjb250ZXh0KTtcblx0cmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBnaXZlbiBga2V5YCBoYXMgYmVlbiBzZXQgaW4gdGhlIGNvbnRleHQgb2YgYSBwYXJlbnQgY29tcG9uZW50LlxuICogTXVzdCBiZSBjYWxsZWQgZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2FueX0ga2V5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG5cdGNvbnN0IGNvbnRleHRfbWFwID0gZ2V0X29yX2luaXRfY29udGV4dF9tYXAoJ2hhc0NvbnRleHQnKTtcblx0cmV0dXJuIGNvbnRleHRfbWFwLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgd2hvbGUgY29udGV4dCBtYXAgdGhhdCBiZWxvbmdzIHRvIHRoZSBjbG9zZXN0IHBhcmVudCBjb21wb25lbnQuXG4gKiBNdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLiBVc2VmdWwsIGZvciBleGFtcGxlLCBpZiB5b3VcbiAqIHByb2dyYW1tYXRpY2FsbHkgY3JlYXRlIGEgY29tcG9uZW50IGFuZCB3YW50IHRvIHBhc3MgdGhlIGV4aXN0aW5nIGNvbnRleHQgdG8gaXQuXG4gKlxuICogQHRlbXBsYXRlIHtNYXA8YW55LCBhbnk+fSBbVD1NYXA8YW55LCBhbnk+XVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxDb250ZXh0cygpIHtcblx0Y29uc3QgY29udGV4dF9tYXAgPSBnZXRfb3JfaW5pdF9jb250ZXh0X21hcCgnZ2V0QWxsQ29udGV4dHMnKTtcblx0cmV0dXJuIC8qKiBAdHlwZSB7VH0gKi8gKGNvbnRleHRfbWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSBwcm9wc1xuICogQHBhcmFtIHthbnl9IHJ1bmVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1c2gocHJvcHMsIHJ1bmVzID0gZmFsc2UsIGZuKSB7XG5cdGNvbXBvbmVudF9jb250ZXh0ID0ge1xuXHRcdHA6IGNvbXBvbmVudF9jb250ZXh0LFxuXHRcdGk6IGZhbHNlLFxuXHRcdGM6IG51bGwsXG5cdFx0ZTogbnVsbCxcblx0XHRzOiBwcm9wcyxcblx0XHR4OiBudWxsLFxuXHRcdGw6IGxlZ2FjeV9tb2RlX2ZsYWcgJiYgIXJ1bmVzID8geyBzOiBudWxsLCB1OiBudWxsLCAkOiBbXSB9IDogbnVsbFxuXHR9O1xuXG5cdGlmIChERVYpIHtcblx0XHQvLyBjb21wb25lbnQgZnVuY3Rpb25cblx0XHRjb21wb25lbnRfY29udGV4dC5mdW5jdGlvbiA9IGZuO1xuXHRcdGRldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbiA9IGZuO1xuXHR9XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBUXG4gKiBAcGFyYW0ge1R9IFtjb21wb25lbnRdXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvcChjb21wb25lbnQpIHtcblx0dmFyIGNvbnRleHQgPSAvKiogQHR5cGUge0NvbXBvbmVudENvbnRleHR9ICovIChjb21wb25lbnRfY29udGV4dCk7XG5cdHZhciBlZmZlY3RzID0gY29udGV4dC5lO1xuXG5cdGlmIChlZmZlY3RzICE9PSBudWxsKSB7XG5cdFx0Y29udGV4dC5lID0gbnVsbDtcblxuXHRcdGZvciAodmFyIGZuIG9mIGVmZmVjdHMpIHtcblx0XHRcdGNyZWF0ZV91c2VyX2VmZmVjdChmbik7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGNvbXBvbmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29udGV4dC54ID0gY29tcG9uZW50O1xuXHR9XG5cblx0Y29udGV4dC5pID0gdHJ1ZTtcblxuXHRjb21wb25lbnRfY29udGV4dCA9IGNvbnRleHQucDtcblxuXHRpZiAoREVWKSB7XG5cdFx0ZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uID0gY29tcG9uZW50X2NvbnRleHQ/LmZ1bmN0aW9uID8/IG51bGw7XG5cdH1cblxuXHRyZXR1cm4gY29tcG9uZW50ID8/IC8qKiBAdHlwZSB7VH0gKi8gKHt9KTtcbn1cblxuLyoqIEByZXR1cm5zIHtib29sZWFufSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3J1bmVzKCkge1xuXHRyZXR1cm4gIWxlZ2FjeV9tb2RlX2ZsYWcgfHwgKGNvbXBvbmVudF9jb250ZXh0ICE9PSBudWxsICYmIGNvbXBvbmVudF9jb250ZXh0LmwgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7TWFwPHVua25vd24sIHVua25vd24+fVxuICovXG5mdW5jdGlvbiBnZXRfb3JfaW5pdF9jb250ZXh0X21hcChuYW1lKSB7XG5cdGlmIChjb21wb25lbnRfY29udGV4dCA9PT0gbnVsbCkge1xuXHRcdGUubGlmZWN5Y2xlX291dHNpZGVfY29tcG9uZW50KG5hbWUpO1xuXHR9XG5cblx0cmV0dXJuIChjb21wb25lbnRfY29udGV4dC5jID8/PSBuZXcgTWFwKGdldF9wYXJlbnRfY29udGV4dChjb21wb25lbnRfY29udGV4dCkgfHwgdW5kZWZpbmVkKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0fSBjb21wb25lbnRfY29udGV4dFxuICogQHJldHVybnMge01hcDx1bmtub3duLCB1bmtub3duPiB8IG51bGx9XG4gKi9cbmZ1bmN0aW9uIGdldF9wYXJlbnRfY29udGV4dChjb21wb25lbnRfY29udGV4dCkge1xuXHRsZXQgcGFyZW50ID0gY29tcG9uZW50X2NvbnRleHQucDtcblx0d2hpbGUgKHBhcmVudCAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IGNvbnRleHRfbWFwID0gcGFyZW50LmM7XG5cdFx0aWYgKGNvbnRleHRfbWFwICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dF9tYXA7XG5cdFx0fVxuXHRcdHBhcmVudCA9IHBhcmVudC5wO1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHsgcnVuX2FsbCB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBpc19mbHVzaGluZ19zeW5jIH0gZnJvbSAnLi4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5cbi8qKiBAdHlwZSB7QXJyYXk8KCkgPT4gdm9pZD59ICovXG5sZXQgbWljcm9fdGFza3MgPSBbXTtcblxuZnVuY3Rpb24gcnVuX21pY3JvX3Rhc2tzKCkge1xuXHR2YXIgdGFza3MgPSBtaWNyb190YXNrcztcblx0bWljcm9fdGFza3MgPSBbXTtcblx0cnVuX2FsbCh0YXNrcyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVldWVfbWljcm9fdGFzayhmbikge1xuXHRpZiAobWljcm9fdGFza3MubGVuZ3RoID09PSAwICYmICFpc19mbHVzaGluZ19zeW5jKSB7XG5cdFx0dmFyIHRhc2tzID0gbWljcm9fdGFza3M7XG5cdFx0cXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuXHRcdFx0Ly8gSWYgdGhpcyBpcyBmYWxzZSwgYSBmbHVzaFN5bmMgaGFwcGVuZWQgaW4gdGhlIG1lYW50aW1lLiBEbyBfbm90XyBydW4gbmV3IHNjaGVkdWxlZCBtaWNyb3Rhc2tzIGluIHRoYXQgY2FzZVxuXHRcdFx0Ly8gYXMgdGhlIG9yZGVyaW5nIG9mIG1pY3JvdGFza3Mgd291bGQgYmUgYnJva2VuIGF0IHRoYXQgcG9pbnQgLSBjb25zaWRlciB0aGlzIGNhc2U6XG5cdFx0XHQvLyAtIHF1ZXVlX21pY3JvX3Rhc2sgc2NoZWR1bGVzIG1pY3JvdGFzayBBIHRvIGZsdXNoIHRhc2sgWFxuXHRcdFx0Ly8gLSBzeW5jaHJvbm91c2x5IGFmdGVyLCBmbHVzaFN5bmMgcnVucywgcHJvY2Vzc2luZyB0YXNrIFhcblx0XHRcdC8vIC0gc3luY2hyb25vdXNseSBhZnRlciwgc29tZSBvdGhlciBtaWNyb3Rhc2sgQiBpcyBzY2hlZHVsZWQsIGJ1dCBub3QgdGhyb3VnaCBxdWV1ZV9taWNyb190YXNrIGJ1dCBmb3IgZXhhbXBsZSBhIFByb21pc2UucmVzb2x2ZSgpIGluIHVzZXIgY29kZVxuXHRcdFx0Ly8gLSBzeW5jaHJvbm91c2x5IGFmdGVyLCBxdWV1ZV9taWNyb190YXNrIHNjaGVkdWxlcyBtaWNyb3Rhc2sgQyB0byBmbHVzaCB0YXNrIFlcblx0XHRcdC8vIC0gb25lIHRpY2sgbGF0ZXIsIG1pY3JvdGFzayBBIG5vdyByZXNvbHZlcywgZmx1c2hpbmcgdGFzayBZIGJlZm9yZSBtaWNyb3Rhc2sgQiwgd2hpY2ggaXMgaW5jb3JyZWN0XG5cdFx0XHQvLyBUaGlzIGlmIGNoZWNrIHByZXZlbnRzIHRoYXQgcmFjZSBjb25kaXRpb24gKHRoYXQgcmVhbGlzdGljYWxseSB3aWxsIG9ubHkgaGFwcGVuIGluIHRlc3RzKVxuXHRcdFx0aWYgKHRhc2tzID09PSBtaWNyb190YXNrcykgcnVuX21pY3JvX3Rhc2tzKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtaWNyb190YXNrcy5wdXNoKGZuKTtcbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91c2x5IHJ1biBhbnkgcXVldWVkIHRhc2tzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hfdGFza3MoKSB7XG5cdHdoaWxlIChtaWNyb190YXNrcy5sZW5ndGggPiAwKSB7XG5cdFx0cnVuX21pY3JvX3Rhc2tzKCk7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRGVyaXZlZCwgRWZmZWN0IH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgQm91bmRhcnkgfSBmcm9tICcuL2RvbS9ibG9ja3MvYm91bmRhcnkuanMnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IEZJTEVOQU1FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGlzX2ZpcmVmb3ggfSBmcm9tICcuL2RvbS9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IEVSUk9SX1ZBTFVFLCBCT1VOREFSWV9FRkZFQ1QsIFJFQUNUSU9OX1JBTiwgRUZGRUNUIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgZGVmaW5lX3Byb3BlcnR5LCBnZXRfZGVzY3JpcHRvciB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBhY3RpdmVfZWZmZWN0LCBhY3RpdmVfcmVhY3Rpb24gfSBmcm9tICcuL3J1bnRpbWUuanMnO1xuXG5jb25zdCBhZGp1c3RtZW50cyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQHBhcmFtIHt1bmtub3dufSBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX2Vycm9yKGVycm9yKSB7XG5cdHZhciBlZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXG5cdC8vIGZvciB1bm93bmVkIGRlcml2ZWRzLCBkb24ndCB0aHJvdyB1bnRpbCB3ZSByZWFkIHRoZSB2YWx1ZVxuXHRpZiAoZWZmZWN0ID09PSBudWxsKSB7XG5cdFx0LyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoYWN0aXZlX3JlYWN0aW9uKS5mIHw9IEVSUk9SX1ZBTFVFO1xuXHRcdHJldHVybiBlcnJvcjtcblx0fVxuXG5cdGlmIChERVYgJiYgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhYWRqdXN0bWVudHMuaGFzKGVycm9yKSkge1xuXHRcdGFkanVzdG1lbnRzLnNldChlcnJvciwgZ2V0X2FkanVzdG1lbnRzKGVycm9yLCBlZmZlY3QpKTtcblx0fVxuXG5cdC8vIGlmIHRoZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBjcmVhdGluZyB0aGlzIHN1YnRyZWUsIHdlIGxldCBpdFxuXHQvLyBidWJibGUgdXAgdW50aWwgaXQgaGl0cyBhIGJvdW5kYXJ5IHRoYXQgY2FuIGhhbmRsZSBpdCwgdW5sZXNzXG5cdC8vIGl0J3MgYW4gJGVmZmVjdCBpbiB3aGljaCBjYXNlIGl0IGRvZXNuJ3QgcnVuIGltbWVkaWF0ZWx5XG5cdGlmICgoZWZmZWN0LmYgJiBSRUFDVElPTl9SQU4pID09PSAwICYmIChlZmZlY3QuZiAmIEVGRkVDVCkgPT09IDApIHtcblx0XHRpZiAoREVWICYmICFlZmZlY3QucGFyZW50ICYmIGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdGFwcGx5X2FkanVzdG1lbnRzKGVycm9yKTtcblx0XHR9XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdC8vIG90aGVyd2lzZSB3ZSBidWJibGUgdXAgdGhlIGVmZmVjdCB0cmVlIG91cnNlbHZlc1xuXHRpbnZva2VfZXJyb3JfYm91bmRhcnkoZXJyb3IsIGVmZmVjdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHt1bmtub3dufSBlcnJvclxuICogQHBhcmFtIHtFZmZlY3QgfCBudWxsfSBlZmZlY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludm9rZV9lcnJvcl9ib3VuZGFyeShlcnJvciwgZWZmZWN0KSB7XG5cdHdoaWxlIChlZmZlY3QgIT09IG51bGwpIHtcblx0XHRpZiAoKGVmZmVjdC5mICYgQk9VTkRBUllfRUZGRUNUKSAhPT0gMCkge1xuXHRcdFx0aWYgKChlZmZlY3QuZiAmIFJFQUNUSU9OX1JBTikgPT09IDApIHtcblx0XHRcdFx0Ly8gd2UgYXJlIHN0aWxsIGNyZWF0aW5nIHRoZSBib3VuZGFyeSBlZmZlY3Rcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7Qm91bmRhcnl9ICovIChlZmZlY3QuYikuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGVycm9yID0gZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRlZmZlY3QgPSBlZmZlY3QucGFyZW50O1xuXHR9XG5cblx0aWYgKERFViAmJiBlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0YXBwbHlfYWRqdXN0bWVudHMoZXJyb3IpO1xuXHR9XG5cblx0dGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogQWRkIHVzZWZ1bCBpbmZvcm1hdGlvbiB0byB0aGUgZXJyb3IgbWVzc2FnZS9zdGFjayBpbiBkZXZlbG9wbWVudFxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqL1xuZnVuY3Rpb24gZ2V0X2FkanVzdG1lbnRzKGVycm9yLCBlZmZlY3QpIHtcblx0Y29uc3QgbWVzc2FnZV9kZXNjcmlwdG9yID0gZ2V0X2Rlc2NyaXB0b3IoZXJyb3IsICdtZXNzYWdlJyk7XG5cblx0Ly8gaWYgdGhlIG1lc3NhZ2Ugd2FzIGFscmVhZHkgY2hhbmdlZCBhbmQgaXQncyBub3QgY29uZmlndXJhYmxlIHdlIGNhbid0IGNoYW5nZSBpdFxuXHQvLyBvciBpdCB3aWxsIHRocm93IGEgZGlmZmVyZW50IGVycm9yIHN3YWxsb3dpbmcgdGhlIG9yaWdpbmFsIGVycm9yXG5cdGlmIChtZXNzYWdlX2Rlc2NyaXB0b3IgJiYgIW1lc3NhZ2VfZGVzY3JpcHRvci5jb25maWd1cmFibGUpIHJldHVybjtcblxuXHR2YXIgaW5kZW50ID0gaXNfZmlyZWZveCA/ICcgICcgOiAnXFx0Jztcblx0dmFyIGNvbXBvbmVudF9zdGFjayA9IGBcXG4ke2luZGVudH1pbiAke2VmZmVjdC5mbj8ubmFtZSB8fCAnPHVua25vd24+J31gO1xuXHR2YXIgY29udGV4dCA9IGVmZmVjdC5jdHg7XG5cblx0d2hpbGUgKGNvbnRleHQgIT09IG51bGwpIHtcblx0XHRjb21wb25lbnRfc3RhY2sgKz0gYFxcbiR7aW5kZW50fWluICR7Y29udGV4dC5mdW5jdGlvbj8uW0ZJTEVOQU1FXS5zcGxpdCgnLycpLnBvcCgpfWA7XG5cdFx0Y29udGV4dCA9IGNvbnRleHQucDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bWVzc2FnZTogZXJyb3IubWVzc2FnZSArIGBcXG4ke2NvbXBvbmVudF9zdGFja31cXG5gLFxuXHRcdHN0YWNrOiBlcnJvci5zdGFja1xuXHRcdFx0Py5zcGxpdCgnXFxuJylcblx0XHRcdC5maWx0ZXIoKGxpbmUpID0+ICFsaW5lLmluY2x1ZGVzKCdzdmVsdGUvc3JjL2ludGVybmFsJykpXG5cdFx0XHQuam9pbignXFxuJylcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG5mdW5jdGlvbiBhcHBseV9hZGp1c3RtZW50cyhlcnJvcikge1xuXHRjb25zdCBhZGp1c3RlZCA9IGFkanVzdG1lbnRzLmdldChlcnJvcik7XG5cblx0aWYgKGFkanVzdGVkKSB7XG5cdFx0ZGVmaW5lX3Byb3BlcnR5KGVycm9yLCAnbWVzc2FnZScsIHtcblx0XHRcdHZhbHVlOiBhZGp1c3RlZC5tZXNzYWdlXG5cdFx0fSk7XG5cblx0XHRkZWZpbmVfcHJvcGVydHkoZXJyb3IsICdzdGFjaycsIHtcblx0XHRcdHZhbHVlOiBhZGp1c3RlZC5zdGFja1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IERlcml2ZWQsIFNpZ25hbCB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBDTEVBTiwgQ09OTkVDVEVELCBESVJUWSwgTUFZQkVfRElSVFkgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5cbmNvbnN0IFNUQVRVU19NQVNLID0gfihESVJUWSB8IE1BWUJFX0RJUlRZIHwgQ0xFQU4pO1xuXG4vKipcbiAqIEBwYXJhbSB7U2lnbmFsfSBzaWduYWxcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGF0dXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9zaWduYWxfc3RhdHVzKHNpZ25hbCwgc3RhdHVzKSB7XG5cdHNpZ25hbC5mID0gKHNpZ25hbC5mICYgU1RBVFVTX01BU0spIHwgc3RhdHVzO1xufVxuXG4vKipcbiAqIFNldCBhIGRlcml2ZWQncyBzdGF0dXMgdG8gQ0xFQU4gb3IgTUFZQkVfRElSVFkgYmFzZWQgb24gaXRzIGNvbm5lY3Rpb24gc3RhdGUuXG4gKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9kZXJpdmVkX3N0YXR1cyhkZXJpdmVkKSB7XG5cdC8vIE9ubHkgbWFyayBhcyBNQVlCRV9ESVJUWSBpZiBkaXNjb25uZWN0ZWQgYW5kIGhhcyBkZXBlbmRlbmNpZXMuXG5cdGlmICgoZGVyaXZlZC5mICYgQ09OTkVDVEVEKSAhPT0gMCB8fCBkZXJpdmVkLmRlcHMgPT09IG51bGwpIHtcblx0XHRzZXRfc2lnbmFsX3N0YXR1cyhkZXJpdmVkLCBDTEVBTik7XG5cdH0gZWxzZSB7XG5cdFx0c2V0X3NpZ25hbF9zdGF0dXMoZGVyaXZlZCwgTUFZQkVfRElSVFkpO1xuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IERlcml2ZWQsIEVmZmVjdCwgVmFsdWUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgQ0xFQU4sIERFUklWRUQsIERJUlRZLCBNQVlCRV9ESVJUWSwgV0FTX01BUktFRCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IHNldF9zaWduYWxfc3RhdHVzIH0gZnJvbSAnLi9zdGF0dXMuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7VmFsdWVbXSB8IG51bGx9IGRlcHNcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbWFya2VkKGRlcHMpIHtcblx0aWYgKGRlcHMgPT09IG51bGwpIHJldHVybjtcblxuXHRmb3IgKGNvbnN0IGRlcCBvZiBkZXBzKSB7XG5cdFx0aWYgKChkZXAuZiAmIERFUklWRUQpID09PSAwIHx8IChkZXAuZiAmIFdBU19NQVJLRUQpID09PSAwKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRkZXAuZiBePSBXQVNfTUFSS0VEO1xuXG5cdFx0Y2xlYXJfbWFya2VkKC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGRlcCkuZGVwcyk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge1NldDxFZmZlY3Q+fSBkaXJ0eV9lZmZlY3RzXG4gKiBAcGFyYW0ge1NldDxFZmZlY3Q+fSBtYXliZV9kaXJ0eV9lZmZlY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZlcl9lZmZlY3QoZWZmZWN0LCBkaXJ0eV9lZmZlY3RzLCBtYXliZV9kaXJ0eV9lZmZlY3RzKSB7XG5cdGlmICgoZWZmZWN0LmYgJiBESVJUWSkgIT09IDApIHtcblx0XHRkaXJ0eV9lZmZlY3RzLmFkZChlZmZlY3QpO1xuXHR9IGVsc2UgaWYgKChlZmZlY3QuZiAmIE1BWUJFX0RJUlRZKSAhPT0gMCkge1xuXHRcdG1heWJlX2RpcnR5X2VmZmVjdHMuYWRkKGVmZmVjdCk7XG5cdH1cblxuXHQvLyBTaW5jZSB3ZSdyZSBub3QgZXhlY3V0aW5nIHRoZXNlIGVmZmVjdHMgbm93LCB3ZSBuZWVkIHRvIGNsZWFyIGFueSBXQVNfTUFSS0VEIGZsYWdzXG5cdC8vIHNvIHRoYXQgb3RoZXIgYmF0Y2hlcyBjYW4gY29ycmVjdGx5IHJlYWNoIHRoZXNlIGVmZmVjdHMgZHVyaW5nIHRoZWlyIG93biB0cmF2ZXJzYWxcblx0Y2xlYXJfbWFya2VkKGVmZmVjdC5kZXBzKTtcblxuXHQvLyBtYXJrIGFzIGNsZWFuIHNvIHRoZXkgZ2V0IHNjaGVkdWxlZCBpZiB0aGV5IGRlcGVuZCBvbiBwZW5kaW5nIGFzeW5jIHN0YXRlXG5cdHNldF9zaWduYWxfc3RhdHVzKGVmZmVjdCwgQ0xFQU4pO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBGb3JrIH0gZnJvbSAnc3ZlbHRlJyAqL1xuLyoqIEBpbXBvcnQgeyBEZXJpdmVkLCBFZmZlY3QsIFJlYWN0aW9uLCBTb3VyY2UsIFZhbHVlIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgQm91bmRhcnkgfSBmcm9tICcuLi9kb20vYmxvY2tzL2JvdW5kYXJ5JyAqL1xuaW1wb3J0IHtcblx0QkxPQ0tfRUZGRUNULFxuXHRCUkFOQ0hfRUZGRUNULFxuXHRDTEVBTixcblx0REVTVFJPWUVELFxuXHRESVJUWSxcblx0RUZGRUNULFxuXHRBU1lOQyxcblx0SU5FUlQsXG5cdFJFTkRFUl9FRkZFQ1QsXG5cdFJPT1RfRUZGRUNULFxuXHRNQVlCRV9ESVJUWSxcblx0REVSSVZFRCxcblx0Qk9VTkRBUllfRUZGRUNULFxuXHRFQUdFUl9FRkZFQ1QsXG5cdEhFQURfRUZGRUNULFxuXHRFUlJPUl9WQUxVRSxcblx0TUFOQUdFRF9FRkZFQ1QsXG5cdFJFQUNUSU9OX1JBTlxufSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcgfSBmcm9tICcuLi8uLi9mbGFncy9pbmRleC5qcyc7XG5pbXBvcnQgeyBkZWZlcnJlZCwgZGVmaW5lX3Byb3BlcnR5LCBpbmNsdWRlcyB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRnZXQsXG5cdGluY3JlbWVudF93cml0ZV92ZXJzaW9uLFxuXHRpc19kaXJ0eSxcblx0dXBkYXRlX2VmZmVjdFxufSBmcm9tICcuLi9ydW50aW1lLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IGZsdXNoX3Rhc2tzLCBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vZG9tL3Rhc2suanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBpbnZva2VfZXJyb3JfYm91bmRhcnkgfSBmcm9tICcuLi9lcnJvci1oYW5kbGluZy5qcyc7XG5pbXBvcnQgeyBmbHVzaF9lYWdlcl9lZmZlY3RzLCBvbGRfdmFsdWVzLCBzZXRfZWFnZXJfZWZmZWN0cywgc291cmNlLCB1cGRhdGUgfSBmcm9tICcuL3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgZWFnZXJfZWZmZWN0LCB1bmxpbmtfZWZmZWN0IH0gZnJvbSAnLi9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGRlZmVyX2VmZmVjdCB9IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHsgVU5JTklUSUFMSVpFRCB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBzZXRfc2lnbmFsX3N0YXR1cyB9IGZyb20gJy4vc3RhdHVzLmpzJztcblxuLyoqIEB0eXBlIHtTZXQ8QmF0Y2g+fSAqL1xuY29uc3QgYmF0Y2hlcyA9IG5ldyBTZXQoKTtcblxuLyoqIEB0eXBlIHtCYXRjaCB8IG51bGx9ICovXG5leHBvcnQgbGV0IGN1cnJlbnRfYmF0Y2ggPSBudWxsO1xuXG4vKipcbiAqIFRoaXMgaXMgbmVlZGVkIHRvIGF2b2lkIG92ZXJ3cml0aW5nIGlucHV0cyBpbiBub24tYXN5bmMgbW9kZVxuICogVE9ETyA2LjAgcmVtb3ZlIHRoaXMsIGFzIG5vbi1hc3luYyBtb2RlIHdpbGwgZ28gYXdheVxuICogQHR5cGUge0JhdGNoIHwgbnVsbH1cbiAqL1xuZXhwb3J0IGxldCBwcmV2aW91c19iYXRjaCA9IG51bGw7XG5cbi8qKlxuICogV2hlbiB0aW1lIHRyYXZlbGxpbmcgKGkuZS4gd29ya2luZyBpbiBvbmUgYmF0Y2gsIHdoaWxlIG90aGVyIGJhdGNoZXNcbiAqIHN0aWxsIGhhdmUgb25nb2luZyB3b3JrKSwgd2UgaWdub3JlIHRoZSByZWFsIHZhbHVlcyBvZiBhZmZlY3RlZFxuICogc2lnbmFscyBpbiBmYXZvdXIgb2YgdGhlaXIgdmFsdWVzIHdpdGhpbiB0aGUgYmF0Y2hcbiAqIEB0eXBlIHtNYXA8VmFsdWUsIGFueT4gfCBudWxsfVxuICovXG5leHBvcnQgbGV0IGJhdGNoX3ZhbHVlcyA9IG51bGw7XG5cbi8vIFRPRE8gdGhpcyBzaG91bGQgcmVhbGx5IGJlIGEgcHJvcGVydHkgb2YgYGJhdGNoYFxuLyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cbmxldCBxdWV1ZWRfcm9vdF9lZmZlY3RzID0gW107XG5cbi8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi9cbmxldCBsYXN0X3NjaGVkdWxlZF9lZmZlY3QgPSBudWxsO1xuXG5sZXQgaXNfZmx1c2hpbmcgPSBmYWxzZTtcbmV4cG9ydCBsZXQgaXNfZmx1c2hpbmdfc3luYyA9IGZhbHNlO1xuXG5leHBvcnQgY2xhc3MgQmF0Y2gge1xuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgdmFsdWVzIG9mIGFueSBzb3VyY2VzIHRoYXQgYXJlIHVwZGF0ZWQgaW4gdGhpcyBiYXRjaFxuXHQgKiBUaGV5IGtleXMgb2YgdGhpcyBtYXAgYXJlIGlkZW50aWNhbCB0byBgdGhpcy4jcHJldmlvdXNgXG5cdCAqIEB0eXBlIHtNYXA8U291cmNlLCBhbnk+fVxuXHQgKi9cblx0Y3VycmVudCA9IG5ldyBNYXAoKTtcblxuXHQvKipcblx0ICogVGhlIHZhbHVlcyBvZiBhbnkgc291cmNlcyB0aGF0IGFyZSB1cGRhdGVkIGluIHRoaXMgYmF0Y2ggX2JlZm9yZV8gdGhvc2UgdXBkYXRlcyB0b29rIHBsYWNlLlxuXHQgKiBUaGV5IGtleXMgb2YgdGhpcyBtYXAgYXJlIGlkZW50aWNhbCB0byBgdGhpcy4jY3VycmVudGBcblx0ICogQHR5cGUge01hcDxTb3VyY2UsIGFueT59XG5cdCAqL1xuXHRwcmV2aW91cyA9IG5ldyBNYXAoKTtcblxuXHQvKipcblx0ICogV2hlbiB0aGUgYmF0Y2ggaXMgY29tbWl0dGVkIChhbmQgdGhlIERPTSBpcyB1cGRhdGVkKSwgd2UgbmVlZCB0byByZW1vdmUgb2xkIGJyYW5jaGVzXG5cdCAqIGFuZCBhcHBlbmQgbmV3IG9uZXMgYnkgY2FsbGluZyB0aGUgZnVuY3Rpb25zIGFkZGVkIGluc2lkZSAoaWYvZWFjaC9rZXkvZXRjKSBibG9ja3Ncblx0ICogQHR5cGUge1NldDwoKSA9PiB2b2lkPn1cblx0ICovXG5cdCNjb21taXRfY2FsbGJhY2tzID0gbmV3IFNldCgpO1xuXG5cdC8qKlxuXHQgKiBJZiBhIGZvcmsgaXMgZGlzY2FyZGVkLCB3ZSBuZWVkIHRvIGRlc3Ryb3kgYW55IGVmZmVjdHMgdGhhdCBhcmUgbm8gbG9uZ2VyIG5lZWRlZFxuXHQgKiBAdHlwZSB7U2V0PChiYXRjaDogQmF0Y2gpID0+IHZvaWQ+fVxuXHQgKi9cblx0I2Rpc2NhcmRfY2FsbGJhY2tzID0gbmV3IFNldCgpO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGFzeW5jIGVmZmVjdHMgdGhhdCBhcmUgY3VycmVudGx5IGluIGZsaWdodFxuXHQgKi9cblx0I3BlbmRpbmcgPSAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGFzeW5jIGVmZmVjdHMgdGhhdCBhcmUgY3VycmVudGx5IGluIGZsaWdodCwgX25vdF8gaW5zaWRlIGEgcGVuZGluZyBib3VuZGFyeVxuXHQgKi9cblx0I2Jsb2NraW5nX3BlbmRpbmcgPSAwO1xuXG5cdC8qKlxuXHQgKiBBIGRlZmVycmVkIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYmF0Y2ggaXMgY29tbWl0dGVkLCB1c2VkIHdpdGggYHNldHRsZWQoKWBcblx0ICogVE9ETyByZXBsYWNlIHdpdGggUHJvbWlzZS53aXRoUmVzb2x2ZXJzIG9uY2Ugc3VwcG9ydGVkIHdpZGVseSBlbm91Z2hcblx0ICogQHR5cGUge3sgcHJvbWlzZTogUHJvbWlzZTx2b2lkPiwgcmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb246IHVua25vd24pID0+IHZvaWQgfSB8IG51bGx9XG5cdCAqL1xuXHQjZGVmZXJyZWQgPSBudWxsO1xuXG5cdC8qKlxuXHQgKiBEZWZlcnJlZCBlZmZlY3RzICh3aGljaCBydW4gYWZ0ZXIgYXN5bmMgd29yayBoYXMgY29tcGxldGVkKSB0aGF0IGFyZSBESVJUWVxuXHQgKiBAdHlwZSB7U2V0PEVmZmVjdD59XG5cdCAqL1xuXHQjZGlydHlfZWZmZWN0cyA9IG5ldyBTZXQoKTtcblxuXHQvKipcblx0ICogRGVmZXJyZWQgZWZmZWN0cyB0aGF0IGFyZSBNQVlCRV9ESVJUWVxuXHQgKiBAdHlwZSB7U2V0PEVmZmVjdD59XG5cdCAqL1xuXHQjbWF5YmVfZGlydHlfZWZmZWN0cyA9IG5ldyBTZXQoKTtcblxuXHQvKipcblx0ICogQSBtYXAgb2YgYnJhbmNoZXMgdGhhdCBzdGlsbCBleGlzdCwgYnV0IHdpbGwgYmUgZGVzdHJveWVkIHdoZW4gdGhpcyBiYXRjaFxuXHQgKiBpcyBjb21taXR0ZWQg4oCUIHdlIHNraXAgb3ZlciB0aGVzZSBkdXJpbmcgYHByb2Nlc3NgLlxuXHQgKiBUaGUgdmFsdWUgY29udGFpbnMgY2hpbGQgZWZmZWN0cyB0aGF0IHdlcmUgZGlydHkvbWF5YmVfZGlydHkgYmVmb3JlIGJlaW5nIHJlc2V0LFxuXHQgKiBzbyB0aGV5IGNhbiBiZSByZXNjaGVkdWxlZCBpZiB0aGUgYnJhbmNoIHN1cnZpdmVzLlxuXHQgKiBAdHlwZSB7TWFwPEVmZmVjdCwgeyBkOiBFZmZlY3RbXSwgbTogRWZmZWN0W10gfT59XG5cdCAqL1xuXHQjc2tpcHBlZF9icmFuY2hlcyA9IG5ldyBNYXAoKTtcblxuXHRpc19mb3JrID0gZmFsc2U7XG5cblx0I2RlY3JlbWVudF9xdWV1ZWQgPSBmYWxzZTtcblxuXHQjaXNfZGVmZXJyZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNfZm9yayB8fCB0aGlzLiNibG9ja2luZ19wZW5kaW5nID4gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYW4gZWZmZWN0IHRvIHRoZSAjc2tpcHBlZF9icmFuY2hlcyBtYXAgYW5kIHJlc2V0IGl0cyBjaGlsZHJlblxuXHQgKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG5cdCAqL1xuXHRza2lwX2VmZmVjdChlZmZlY3QpIHtcblx0XHRpZiAoIXRoaXMuI3NraXBwZWRfYnJhbmNoZXMuaGFzKGVmZmVjdCkpIHtcblx0XHRcdHRoaXMuI3NraXBwZWRfYnJhbmNoZXMuc2V0KGVmZmVjdCwgeyBkOiBbXSwgbTogW10gfSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbiBlZmZlY3QgZnJvbSB0aGUgI3NraXBwZWRfYnJhbmNoZXMgbWFwIGFuZCByZXNjaGVkdWxlXG5cdCAqIGFueSB0cmFja2VkIGRpcnR5L21heWJlX2RpcnR5IGNoaWxkIGVmZmVjdHNcblx0ICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuXHQgKi9cblx0dW5za2lwX2VmZmVjdChlZmZlY3QpIHtcblx0XHR2YXIgdHJhY2tlZCA9IHRoaXMuI3NraXBwZWRfYnJhbmNoZXMuZ2V0KGVmZmVjdCk7XG5cdFx0aWYgKHRyYWNrZWQpIHtcblx0XHRcdHRoaXMuI3NraXBwZWRfYnJhbmNoZXMuZGVsZXRlKGVmZmVjdCk7XG5cblx0XHRcdGZvciAodmFyIGUgb2YgdHJhY2tlZC5kKSB7XG5cdFx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGUsIERJUlRZKTtcblx0XHRcdFx0c2NoZWR1bGVfZWZmZWN0KGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGUgb2YgdHJhY2tlZC5tKSB7XG5cdFx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGUsIE1BWUJFX0RJUlRZKTtcblx0XHRcdFx0c2NoZWR1bGVfZWZmZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VmZmVjdFtdfSByb290X2VmZmVjdHNcblx0ICovXG5cdHByb2Nlc3Mocm9vdF9lZmZlY3RzKSB7XG5cdFx0cXVldWVkX3Jvb3RfZWZmZWN0cyA9IFtdO1xuXG5cdFx0dGhpcy5hcHBseSgpO1xuXG5cdFx0LyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cblx0XHR2YXIgZWZmZWN0cyA9IFtdO1xuXG5cdFx0LyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cblx0XHR2YXIgcmVuZGVyX2VmZmVjdHMgPSBbXTtcblxuXHRcdGZvciAoY29uc3Qgcm9vdCBvZiByb290X2VmZmVjdHMpIHtcblx0XHRcdHRoaXMuI3RyYXZlcnNlX2VmZmVjdF90cmVlKHJvb3QsIGVmZmVjdHMsIHJlbmRlcl9lZmZlY3RzKTtcblx0XHRcdC8vIE5vdGU6ICN0cmF2ZXJzZV9lZmZlY3RfdHJlZSBydW5zIGJsb2NrIGVmZmVjdHMgZWFnZXJseSwgd2hpY2ggY2FuIHNjaGVkdWxlIGVmZmVjdHMsXG5cdFx0XHQvLyB3aGljaCBtZWFucyBxdWV1ZWRfcm9vdF9lZmZlY3RzIG5vdyBtYXkgYmUgZmlsbGVkIGFnYWluLlxuXG5cdFx0XHQvLyBIZWxwZnVsIGZvciBkZWJ1Z2dpbmcgcmVhY3Rpdml0eSBsb3NzIHRoYXQgaGFzIHRvIGRvIHdpdGggYnJhbmNoZXMgYmVpbmcgc2tpcHBlZDpcblx0XHRcdC8vIGxvZ19pbmNvbnNpc3RlbnRfYnJhbmNoZXMocm9vdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuI2lzX2RlZmVycmVkKCkpIHtcblx0XHRcdHRoaXMuI2RlZmVyX2VmZmVjdHMocmVuZGVyX2VmZmVjdHMpO1xuXHRcdFx0dGhpcy4jZGVmZXJfZWZmZWN0cyhlZmZlY3RzKTtcblxuXHRcdFx0Zm9yIChjb25zdCBbZSwgdF0gb2YgdGhpcy4jc2tpcHBlZF9icmFuY2hlcykge1xuXHRcdFx0XHRyZXNldF9icmFuY2goZSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGFwcGVuZC9yZW1vdmUgYnJhbmNoZXNcblx0XHRcdGZvciAoY29uc3QgZm4gb2YgdGhpcy4jY29tbWl0X2NhbGxiYWNrcykgZm4oKTtcblx0XHRcdHRoaXMuI2NvbW1pdF9jYWxsYmFja3MuY2xlYXIoKTtcblxuXHRcdFx0aWYgKHRoaXMuI3BlbmRpbmcgPT09IDApIHtcblx0XHRcdFx0dGhpcy4jY29tbWl0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHNvdXJjZXMgYXJlIHdyaXR0ZW4gdG8sIHRoZW4gd29yayBuZWVkcyB0byBoYXBwZW4gaW4gYSBzZXBhcmF0ZSBiYXRjaCwgZWxzZSBwcmlvciBzb3VyY2VzIHdvdWxkIGJlIG1peGVkIHdpdGhcblx0XHRcdC8vIG5ld2x5IHVwZGF0ZWQgc291cmNlcywgd2hpY2ggY291bGQgbGVhZCB0byBpbmZpbml0ZSBsb29wcyB3aGVuIGVmZmVjdHMgcnVuIG92ZXIgYW5kIG92ZXIgYWdhaW4uXG5cdFx0XHRwcmV2aW91c19iYXRjaCA9IHRoaXM7XG5cdFx0XHRjdXJyZW50X2JhdGNoID0gbnVsbDtcblxuXHRcdFx0Zmx1c2hfcXVldWVkX2VmZmVjdHMocmVuZGVyX2VmZmVjdHMpO1xuXHRcdFx0Zmx1c2hfcXVldWVkX2VmZmVjdHMoZWZmZWN0cyk7XG5cblx0XHRcdHByZXZpb3VzX2JhdGNoID0gbnVsbDtcblxuXHRcdFx0dGhpcy4jZGVmZXJyZWQ/LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHRiYXRjaF92YWx1ZXMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyYXZlcnNlIHRoZSBlZmZlY3QgdHJlZSwgZXhlY3V0aW5nIGVmZmVjdHMgb3Igc3Rhc2hpbmdcblx0ICogdGhlbSBmb3IgbGF0ZXIgZXhlY3V0aW9uIGFzIGFwcHJvcHJpYXRlXG5cdCAqIEBwYXJhbSB7RWZmZWN0fSByb290XG5cdCAqIEBwYXJhbSB7RWZmZWN0W119IGVmZmVjdHNcblx0ICogQHBhcmFtIHtFZmZlY3RbXX0gcmVuZGVyX2VmZmVjdHNcblx0ICovXG5cdCN0cmF2ZXJzZV9lZmZlY3RfdHJlZShyb290LCBlZmZlY3RzLCByZW5kZXJfZWZmZWN0cykge1xuXHRcdHJvb3QuZiBePSBDTEVBTjtcblxuXHRcdHZhciBlZmZlY3QgPSByb290LmZpcnN0O1xuXG5cdFx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGZsYWdzID0gZWZmZWN0LmY7XG5cdFx0XHR2YXIgaXNfYnJhbmNoID0gKGZsYWdzICYgKEJSQU5DSF9FRkZFQ1QgfCBST09UX0VGRkVDVCkpICE9PSAwO1xuXHRcdFx0dmFyIGlzX3NraXBwYWJsZV9icmFuY2ggPSBpc19icmFuY2ggJiYgKGZsYWdzICYgQ0xFQU4pICE9PSAwO1xuXG5cdFx0XHR2YXIgc2tpcCA9IGlzX3NraXBwYWJsZV9icmFuY2ggfHwgKGZsYWdzICYgSU5FUlQpICE9PSAwIHx8IHRoaXMuI3NraXBwZWRfYnJhbmNoZXMuaGFzKGVmZmVjdCk7XG5cblx0XHRcdGlmICghc2tpcCAmJiBlZmZlY3QuZm4gIT09IG51bGwpIHtcblx0XHRcdFx0aWYgKGlzX2JyYW5jaCkge1xuXHRcdFx0XHRcdGVmZmVjdC5mIF49IENMRUFOO1xuXHRcdFx0XHR9IGVsc2UgaWYgKChmbGFncyAmIEVGRkVDVCkgIT09IDApIHtcblx0XHRcdFx0XHRlZmZlY3RzLnB1c2goZWZmZWN0KTtcblx0XHRcdFx0fSBlbHNlIGlmIChhc3luY19tb2RlX2ZsYWcgJiYgKGZsYWdzICYgKFJFTkRFUl9FRkZFQ1QgfCBNQU5BR0VEX0VGRkVDVCkpICE9PSAwKSB7XG5cdFx0XHRcdFx0cmVuZGVyX2VmZmVjdHMucHVzaChlZmZlY3QpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGlzX2RpcnR5KGVmZmVjdCkpIHtcblx0XHRcdFx0XHRpZiAoKGZsYWdzICYgQkxPQ0tfRUZGRUNUKSAhPT0gMCkgdGhpcy4jbWF5YmVfZGlydHlfZWZmZWN0cy5hZGQoZWZmZWN0KTtcblx0XHRcdFx0XHR1cGRhdGVfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY2hpbGQgPSBlZmZlY3QuZmlyc3Q7XG5cblx0XHRcdFx0aWYgKGNoaWxkICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0ZWZmZWN0ID0gY2hpbGQ7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgbmV4dCA9IGVmZmVjdC5uZXh0O1xuXG5cdFx0XHRcdGlmIChuZXh0ICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0ZWZmZWN0ID0gbmV4dDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVmZmVjdCA9IGVmZmVjdC5wYXJlbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RWZmZWN0W119IGVmZmVjdHNcblx0ICovXG5cdCNkZWZlcl9lZmZlY3RzKGVmZmVjdHMpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVmZmVjdHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGRlZmVyX2VmZmVjdChlZmZlY3RzW2ldLCB0aGlzLiNkaXJ0eV9lZmZlY3RzLCB0aGlzLiNtYXliZV9kaXJ0eV9lZmZlY3RzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQXNzb2NpYXRlIGEgY2hhbmdlIHRvIGEgZ2l2ZW4gc291cmNlIHdpdGggdGhlIGN1cnJlbnRcblx0ICogYmF0Y2gsIG5vdGluZyBpdHMgcHJldmlvdXMgYW5kIGN1cnJlbnQgdmFsdWVzXG5cdCAqIEBwYXJhbSB7U291cmNlfSBzb3VyY2Vcblx0ICogQHBhcmFtIHthbnl9IHZhbHVlXG5cdCAqL1xuXHRjYXB0dXJlKHNvdXJjZSwgdmFsdWUpIHtcblx0XHRpZiAodmFsdWUgIT09IFVOSU5JVElBTElaRUQgJiYgIXRoaXMucHJldmlvdXMuaGFzKHNvdXJjZSkpIHtcblx0XHRcdHRoaXMucHJldmlvdXMuc2V0KHNvdXJjZSwgdmFsdWUpO1xuXHRcdH1cblxuXHRcdC8vIERvbid0IHNhdmUgZXJyb3JzIGluIGBiYXRjaF92YWx1ZXNgLCBvciB0aGV5IHdvbid0IGJlIHRocm93biBpbiBgcnVudGltZS5qcyNnZXRgXG5cdFx0aWYgKChzb3VyY2UuZiAmIEVSUk9SX1ZBTFVFKSA9PT0gMCkge1xuXHRcdFx0dGhpcy5jdXJyZW50LnNldChzb3VyY2UsIHNvdXJjZS52KTtcblx0XHRcdGJhdGNoX3ZhbHVlcz8uc2V0KHNvdXJjZSwgc291cmNlLnYpO1xuXHRcdH1cblx0fVxuXG5cdGFjdGl2YXRlKCkge1xuXHRcdGN1cnJlbnRfYmF0Y2ggPSB0aGlzO1xuXHRcdHRoaXMuYXBwbHkoKTtcblx0fVxuXG5cdGRlYWN0aXZhdGUoKSB7XG5cdFx0Ly8gSWYgd2UncmUgbm90IHRoZSBjdXJyZW50IGJhdGNoLCBkb24ndCBkZWFjdGl2YXRlLFxuXHRcdC8vIGVsc2Ugd2UgY291bGQgY3JlYXRlIHpvbWJpZSBiYXRjaGVzIHRoYXQgYXJlIG5ldmVyIGZsdXNoZWRcblx0XHRpZiAoY3VycmVudF9iYXRjaCAhPT0gdGhpcykgcmV0dXJuO1xuXG5cdFx0Y3VycmVudF9iYXRjaCA9IG51bGw7XG5cdFx0YmF0Y2hfdmFsdWVzID0gbnVsbDtcblx0fVxuXG5cdGZsdXNoKCkge1xuXHRcdHRoaXMuYWN0aXZhdGUoKTtcblxuXHRcdGlmIChxdWV1ZWRfcm9vdF9lZmZlY3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdGZsdXNoX2VmZmVjdHMoKTtcblxuXHRcdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwgJiYgY3VycmVudF9iYXRjaCAhPT0gdGhpcykge1xuXHRcdFx0XHQvLyB0aGlzIGNhbiBoYXBwZW4gaWYgYSBuZXcgYmF0Y2ggd2FzIGNyZWF0ZWQgZHVyaW5nIGBmbHVzaF9lZmZlY3RzKClgXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRoaXMuI3BlbmRpbmcgPT09IDApIHtcblx0XHRcdHRoaXMucHJvY2VzcyhbXSk7IC8vIFRPRE8gdGhpcyBmZWVscyBhd2t3YXJkXG5cdFx0fVxuXG5cdFx0dGhpcy5kZWFjdGl2YXRlKCk7XG5cdH1cblxuXHRkaXNjYXJkKCkge1xuXHRcdGZvciAoY29uc3QgZm4gb2YgdGhpcy4jZGlzY2FyZF9jYWxsYmFja3MpIGZuKHRoaXMpO1xuXHRcdHRoaXMuI2Rpc2NhcmRfY2FsbGJhY2tzLmNsZWFyKCk7XG5cdH1cblxuXHQjY29tbWl0KCkge1xuXHRcdC8vIElmIHRoZXJlIGFyZSBvdGhlciBwZW5kaW5nIGJhdGNoZXMsIHRoZXkgbm93IG5lZWQgdG8gYmUgJ3JlYmFzZWQnIOKAlFxuXHRcdC8vIGluIG90aGVyIHdvcmRzLCB3ZSByZS1ydW4gYmxvY2svYXN5bmMgZWZmZWN0cyB3aXRoIHRoZSBuZXdseVxuXHRcdC8vIGNvbW1pdHRlZCBzdGF0ZSwgdW5sZXNzIHRoZSBiYXRjaCBpbiBxdWVzdGlvbiBoYXMgYSBtb3JlXG5cdFx0Ly8gcmVjZW50IHZhbHVlIGZvciBhIGdpdmVuIHNvdXJjZVxuXHRcdGlmIChiYXRjaGVzLnNpemUgPiAxKSB7XG5cdFx0XHR0aGlzLnByZXZpb3VzLmNsZWFyKCk7XG5cblx0XHRcdHZhciBwcmV2aW91c19iYXRjaF92YWx1ZXMgPSBiYXRjaF92YWx1ZXM7XG5cdFx0XHR2YXIgaXNfZWFybGllciA9IHRydWU7XG5cblx0XHRcdGZvciAoY29uc3QgYmF0Y2ggb2YgYmF0Y2hlcykge1xuXHRcdFx0XHRpZiAoYmF0Y2ggPT09IHRoaXMpIHtcblx0XHRcdFx0XHRpc19lYXJsaWVyID0gZmFsc2U7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiogQHR5cGUge1NvdXJjZVtdfSAqL1xuXHRcdFx0XHRjb25zdCBzb3VyY2VzID0gW107XG5cblx0XHRcdFx0Zm9yIChjb25zdCBbc291cmNlLCB2YWx1ZV0gb2YgdGhpcy5jdXJyZW50KSB7XG5cdFx0XHRcdFx0aWYgKGJhdGNoLmN1cnJlbnQuaGFzKHNvdXJjZSkpIHtcblx0XHRcdFx0XHRcdGlmIChpc19lYXJsaWVyICYmIHZhbHVlICE9PSBiYXRjaC5jdXJyZW50LmdldChzb3VyY2UpKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGJyaW5nIHRoZSB2YWx1ZSB1cCB0byBkYXRlXG5cdFx0XHRcdFx0XHRcdGJhdGNoLmN1cnJlbnQuc2V0KHNvdXJjZSwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gc2FtZSB2YWx1ZSBvciBsYXRlciBiYXRjaCBoYXMgbW9yZSByZWNlbnQgdmFsdWUsXG5cdFx0XHRcdFx0XHRcdC8vIG5vIG5lZWQgdG8gcmUtcnVuIHRoZXNlIGVmZmVjdHNcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c291cmNlcy5wdXNoKHNvdXJjZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc291cmNlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlLXJ1biBhc3luYy9ibG9jayBlZmZlY3RzIHRoYXQgZGVwZW5kIG9uIGRpc3RpbmN0IHZhbHVlcyBjaGFuZ2VkIGluIGJvdGggYmF0Y2hlc1xuXHRcdFx0XHRjb25zdCBvdGhlcnMgPSBbLi4uYmF0Y2guY3VycmVudC5rZXlzKCldLmZpbHRlcigocykgPT4gIXRoaXMuY3VycmVudC5oYXMocykpO1xuXHRcdFx0XHRpZiAob3RoZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQvLyBBdm9pZCBydW5uaW5nIHF1ZXVlZCByb290IGVmZmVjdHMgb24gdGhlIHdyb25nIGJyYW5jaFxuXHRcdFx0XHRcdHZhciBwcmV2X3F1ZXVlZF9yb290X2VmZmVjdHMgPSBxdWV1ZWRfcm9vdF9lZmZlY3RzO1xuXHRcdFx0XHRcdHF1ZXVlZF9yb290X2VmZmVjdHMgPSBbXTtcblxuXHRcdFx0XHRcdC8qKiBAdHlwZSB7U2V0PFZhbHVlPn0gKi9cblx0XHRcdFx0XHRjb25zdCBtYXJrZWQgPSBuZXcgU2V0KCk7XG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtNYXA8UmVhY3Rpb24sIGJvb2xlYW4+fSAqL1xuXHRcdFx0XHRcdGNvbnN0IGNoZWNrZWQgPSBuZXcgTWFwKCk7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuXHRcdFx0XHRcdFx0bWFya19lZmZlY3RzKHNvdXJjZSwgb3RoZXJzLCBtYXJrZWQsIGNoZWNrZWQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChxdWV1ZWRfcm9vdF9lZmZlY3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRfYmF0Y2ggPSBiYXRjaDtcblx0XHRcdFx0XHRcdGJhdGNoLmFwcGx5KCk7XG5cblx0XHRcdFx0XHRcdGZvciAoY29uc3Qgcm9vdCBvZiBxdWV1ZWRfcm9vdF9lZmZlY3RzKSB7XG5cdFx0XHRcdFx0XHRcdGJhdGNoLiN0cmF2ZXJzZV9lZmZlY3RfdHJlZShyb290LCBbXSwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBUT0RPIGRvIHdlIG5lZWQgdG8gZG8gYW55dGhpbmcgd2l0aCB0aGUgZHVtbXkgZWZmZWN0IGFycmF5cz9cblxuXHRcdFx0XHRcdFx0YmF0Y2guZGVhY3RpdmF0ZSgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHF1ZXVlZF9yb290X2VmZmVjdHMgPSBwcmV2X3F1ZXVlZF9yb290X2VmZmVjdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudF9iYXRjaCA9IG51bGw7XG5cdFx0XHRiYXRjaF92YWx1ZXMgPSBwcmV2aW91c19iYXRjaF92YWx1ZXM7XG5cdFx0fVxuXG5cdFx0YmF0Y2hlcy5kZWxldGUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBibG9ja2luZ1xuXHQgKi9cblx0aW5jcmVtZW50KGJsb2NraW5nKSB7XG5cdFx0dGhpcy4jcGVuZGluZyArPSAxO1xuXHRcdGlmIChibG9ja2luZykgdGhpcy4jYmxvY2tpbmdfcGVuZGluZyArPSAxO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gYmxvY2tpbmdcblx0ICovXG5cdGRlY3JlbWVudChibG9ja2luZykge1xuXHRcdHRoaXMuI3BlbmRpbmcgLT0gMTtcblx0XHRpZiAoYmxvY2tpbmcpIHRoaXMuI2Jsb2NraW5nX3BlbmRpbmcgLT0gMTtcblxuXHRcdGlmICh0aGlzLiNkZWNyZW1lbnRfcXVldWVkKSByZXR1cm47XG5cdFx0dGhpcy4jZGVjcmVtZW50X3F1ZXVlZCA9IHRydWU7XG5cblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdHRoaXMuI2RlY3JlbWVudF9xdWV1ZWQgPSBmYWxzZTtcblxuXHRcdFx0aWYgKCF0aGlzLiNpc19kZWZlcnJlZCgpKSB7XG5cdFx0XHRcdC8vIHdlIG9ubHkgcmVzY2hlZHVsZSBwcmV2aW91c2x5LWRlZmVycmVkIGVmZmVjdHMgaWYgd2UgZXhwZWN0XG5cdFx0XHRcdC8vIHRvIGJlIGFibGUgdG8gcnVuIHRoZW0gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgYmF0Y2hcblx0XHRcdFx0dGhpcy5yZXZpdmUoKTtcblx0XHRcdH0gZWxzZSBpZiAocXVldWVkX3Jvb3RfZWZmZWN0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdC8vIGlmIG90aGVyIGVmZmVjdHMgYXJlIHNjaGVkdWxlZCwgcHJvY2VzcyB0aGUgYmF0Y2ggX3dpdGhvdXRfXG5cdFx0XHRcdC8vIHJlc2NoZWR1bGluZyB0aGUgcHJldmlvdXNseS1kZWZlcnJlZCBlZmZlY3RzXG5cdFx0XHRcdHRoaXMuZmx1c2goKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldml2ZSgpIHtcblx0XHRmb3IgKGNvbnN0IGUgb2YgdGhpcy4jZGlydHlfZWZmZWN0cykge1xuXHRcdFx0dGhpcy4jbWF5YmVfZGlydHlfZWZmZWN0cy5kZWxldGUoZSk7XG5cdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhlLCBESVJUWSk7XG5cdFx0XHRzY2hlZHVsZV9lZmZlY3QoZSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBlIG9mIHRoaXMuI21heWJlX2RpcnR5X2VmZmVjdHMpIHtcblx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGUsIE1BWUJFX0RJUlRZKTtcblx0XHRcdHNjaGVkdWxlX2VmZmVjdChlKTtcblx0XHR9XG5cblx0XHR0aGlzLmZsdXNoKCk7XG5cdH1cblxuXHQvKiogQHBhcmFtIHsoKSA9PiB2b2lkfSBmbiAqL1xuXHRvbmNvbW1pdChmbikge1xuXHRcdHRoaXMuI2NvbW1pdF9jYWxsYmFja3MuYWRkKGZuKTtcblx0fVxuXG5cdC8qKiBAcGFyYW0geyhiYXRjaDogQmF0Y2gpID0+IHZvaWR9IGZuICovXG5cdG9uZGlzY2FyZChmbikge1xuXHRcdHRoaXMuI2Rpc2NhcmRfY2FsbGJhY2tzLmFkZChmbik7XG5cdH1cblxuXHRzZXR0bGVkKCkge1xuXHRcdHJldHVybiAodGhpcy4jZGVmZXJyZWQgPz89IGRlZmVycmVkKCkpLnByb21pc2U7XG5cdH1cblxuXHRzdGF0aWMgZW5zdXJlKCkge1xuXHRcdGlmIChjdXJyZW50X2JhdGNoID09PSBudWxsKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IChjdXJyZW50X2JhdGNoID0gbmV3IEJhdGNoKCkpO1xuXHRcdFx0YmF0Y2hlcy5hZGQoY3VycmVudF9iYXRjaCk7XG5cblx0XHRcdGlmICghaXNfZmx1c2hpbmdfc3luYykge1xuXHRcdFx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoY3VycmVudF9iYXRjaCAhPT0gYmF0Y2gpIHtcblx0XHRcdFx0XHRcdC8vIGEgZmx1c2hTeW5jIGhhcHBlbmVkIGluIHRoZSBtZWFudGltZVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJhdGNoLmZsdXNoKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjdXJyZW50X2JhdGNoO1xuXHR9XG5cblx0YXBwbHkoKSB7XG5cdFx0aWYgKCFhc3luY19tb2RlX2ZsYWcgfHwgKCF0aGlzLmlzX2ZvcmsgJiYgYmF0Y2hlcy5zaXplID09PSAxKSkgcmV0dXJuO1xuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIG11bHRpcGxlIGJhdGNoZXMsIHdlIGFyZSAndGltZSB0cmF2ZWxsaW5nJyDigJRcblx0XHQvLyB3ZSBuZWVkIHRvIG92ZXJyaWRlIHZhbHVlcyB3aXRoIHRoZSBvbmVzIGluIHRoaXMgYmF0Y2guLi5cblx0XHRiYXRjaF92YWx1ZXMgPSBuZXcgTWFwKHRoaXMuY3VycmVudCk7XG5cblx0XHQvLyAuLi5hbmQgdW5kbyBjaGFuZ2VzIGJlbG9uZ2luZyB0byBvdGhlciBiYXRjaGVzXG5cdFx0Zm9yIChjb25zdCBiYXRjaCBvZiBiYXRjaGVzKSB7XG5cdFx0XHRpZiAoYmF0Y2ggPT09IHRoaXMpIGNvbnRpbnVlO1xuXG5cdFx0XHRmb3IgKGNvbnN0IFtzb3VyY2UsIHByZXZpb3VzXSBvZiBiYXRjaC5wcmV2aW91cykge1xuXHRcdFx0XHRpZiAoIWJhdGNoX3ZhbHVlcy5oYXMoc291cmNlKSkge1xuXHRcdFx0XHRcdGJhdGNoX3ZhbHVlcy5zZXQoc291cmNlLCBwcmV2aW91cyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTeW5jaHJvbm91c2x5IGZsdXNoIGFueSBwZW5kaW5nIHVwZGF0ZXMuXG4gKiBSZXR1cm5zIHZvaWQgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG90aGVyd2lzZSByZXR1cm5zIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgY2FsbGJhY2suXG4gKiBAdGVtcGxhdGUgW1Q9dm9pZF1cbiAqIEBwYXJhbSB7KCgpID0+IFQpIHwgdW5kZWZpbmVkfSBbZm5dXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoU3luYyhmbikge1xuXHR2YXIgd2FzX2ZsdXNoaW5nX3N5bmMgPSBpc19mbHVzaGluZ19zeW5jO1xuXHRpc19mbHVzaGluZ19zeW5jID0gdHJ1ZTtcblxuXHR0cnkge1xuXHRcdHZhciByZXN1bHQ7XG5cblx0XHRpZiAoZm4pIHtcblx0XHRcdGlmIChjdXJyZW50X2JhdGNoICE9PSBudWxsKSB7XG5cdFx0XHRcdGZsdXNoX2VmZmVjdHMoKTtcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0ID0gZm4oKTtcblx0XHR9XG5cblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0Zmx1c2hfdGFza3MoKTtcblxuXHRcdFx0aWYgKHF1ZXVlZF9yb290X2VmZmVjdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdGN1cnJlbnRfYmF0Y2g/LmZsdXNoKCk7XG5cblx0XHRcdFx0Ly8gd2UgbmVlZCB0byBjaGVjayBhZ2FpbiwgaW4gY2FzZSB3ZSBqdXN0IHVwZGF0ZWQgYW4gYCRlZmZlY3QucGVuZGluZygpYFxuXHRcdFx0XHRpZiAocXVldWVkX3Jvb3RfZWZmZWN0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHQvLyB0aGlzIHdvdWxkIGJlIHJlc2V0IGluIGBmbHVzaF9lZmZlY3RzKClgIGJ1dCBzaW5jZSB3ZSBhcmUgZWFybHkgcmV0dXJuaW5nIGhlcmUsXG5cdFx0XHRcdFx0Ly8gd2UgbmVlZCB0byByZXNldCBpdCBoZXJlIGFzIHdlbGwgaW4gY2FzZSB0aGUgZmlyc3QgdGltZSB0aGVyZSdzIDAgcXVldWVkIHJvb3QgZWZmZWN0c1xuXHRcdFx0XHRcdGxhc3Rfc2NoZWR1bGVkX2VmZmVjdCA9IG51bGw7XG5cblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHtUfSAqLyAocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmbHVzaF9lZmZlY3RzKCk7XG5cdFx0fVxuXHR9IGZpbmFsbHkge1xuXHRcdGlzX2ZsdXNoaW5nX3N5bmMgPSB3YXNfZmx1c2hpbmdfc3luYztcblx0fVxufVxuXG5mdW5jdGlvbiBmbHVzaF9lZmZlY3RzKCkge1xuXHRpc19mbHVzaGluZyA9IHRydWU7XG5cblx0dmFyIHNvdXJjZV9zdGFja3MgPSBERVYgPyBuZXcgU2V0KCkgOiBudWxsO1xuXG5cdHRyeSB7XG5cdFx0dmFyIGZsdXNoX2NvdW50ID0gMDtcblxuXHRcdHdoaWxlIChxdWV1ZWRfcm9vdF9lZmZlY3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBiYXRjaCA9IEJhdGNoLmVuc3VyZSgpO1xuXG5cdFx0XHRpZiAoZmx1c2hfY291bnQrKyA+IDEwMDApIHtcblx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdHZhciB1cGRhdGVzID0gbmV3IE1hcCgpO1xuXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBzb3VyY2Ugb2YgYmF0Y2guY3VycmVudC5rZXlzKCkpIHtcblx0XHRcdFx0XHRcdGZvciAoY29uc3QgW3N0YWNrLCB1cGRhdGVdIG9mIHNvdXJjZS51cGRhdGVkID8/IFtdKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBlbnRyeSA9IHVwZGF0ZXMuZ2V0KHN0YWNrKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIWVudHJ5KSB7XG5cdFx0XHRcdFx0XHRcdFx0ZW50cnkgPSB7IGVycm9yOiB1cGRhdGUuZXJyb3IsIGNvdW50OiAwIH07XG5cdFx0XHRcdFx0XHRcdFx0dXBkYXRlcy5zZXQoc3RhY2ssIGVudHJ5KTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGVudHJ5LmNvdW50ICs9IHVwZGF0ZS5jb3VudDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKGNvbnN0IHVwZGF0ZSBvZiB1cGRhdGVzLnZhbHVlcygpKSB7XG5cdFx0XHRcdFx0XHRpZiAodXBkYXRlLmVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IodXBkYXRlLmVycm9yKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbmZpbml0ZV9sb29wX2d1YXJkKCk7XG5cdFx0XHR9XG5cblx0XHRcdGJhdGNoLnByb2Nlc3MocXVldWVkX3Jvb3RfZWZmZWN0cyk7XG5cdFx0XHRvbGRfdmFsdWVzLmNsZWFyKCk7XG5cblx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0Zm9yIChjb25zdCBzb3VyY2Ugb2YgYmF0Y2guY3VycmVudC5rZXlzKCkpIHtcblx0XHRcdFx0XHQvKiogQHR5cGUge1NldDxTb3VyY2U+fSAqLyAoc291cmNlX3N0YWNrcykuYWRkKHNvdXJjZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZmluYWxseSB7XG5cdFx0cXVldWVkX3Jvb3RfZWZmZWN0cyA9IFtdO1xuXG5cdFx0aXNfZmx1c2hpbmcgPSBmYWxzZTtcblx0XHRsYXN0X3NjaGVkdWxlZF9lZmZlY3QgPSBudWxsO1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0Zm9yIChjb25zdCBzb3VyY2Ugb2YgLyoqIEB0eXBlIHtTZXQ8U291cmNlPn0gKi8gKHNvdXJjZV9zdGFja3MpKSB7XG5cdFx0XHRcdHNvdXJjZS51cGRhdGVkID0gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5maW5pdGVfbG9vcF9ndWFyZCgpIHtcblx0dHJ5IHtcblx0XHRlLmVmZmVjdF91cGRhdGVfZGVwdGhfZXhjZWVkZWQoKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoREVWKSB7XG5cdFx0XHQvLyBzdGFjayBjb250YWlucyBubyB1c2VmdWwgaW5mb3JtYXRpb24sIHJlcGxhY2UgaXRcblx0XHRcdGRlZmluZV9wcm9wZXJ0eShlcnJvciwgJ3N0YWNrJywgeyB2YWx1ZTogJycgfSk7XG5cdFx0fVxuXG5cdFx0Ly8gQmVzdCBlZmZvcnQ6IGludm9rZSB0aGUgYm91bmRhcnkgbmVhcmVzdCB0aGUgbW9zdCByZWNlbnRcblx0XHQvLyBlZmZlY3QgYW5kIGhvcGUgdGhhdCBpdCdzIHJlbGV2YW50IHRvIHRoZSBpbmZpbml0ZSBsb29wXG5cdFx0aW52b2tlX2Vycm9yX2JvdW5kYXJ5KGVycm9yLCBsYXN0X3NjaGVkdWxlZF9lZmZlY3QpO1xuXHR9XG59XG5cbi8qKiBAdHlwZSB7U2V0PEVmZmVjdD4gfCBudWxsfSAqL1xuZXhwb3J0IGxldCBlYWdlcl9ibG9ja19lZmZlY3RzID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PEVmZmVjdD59IGVmZmVjdHNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBmbHVzaF9xdWV1ZWRfZWZmZWN0cyhlZmZlY3RzKSB7XG5cdHZhciBsZW5ndGggPSBlZmZlY3RzLmxlbmd0aDtcblx0aWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG5cdHZhciBpID0gMDtcblxuXHR3aGlsZSAoaSA8IGxlbmd0aCkge1xuXHRcdHZhciBlZmZlY3QgPSBlZmZlY3RzW2krK107XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgKERFU1RST1lFRCB8IElORVJUKSkgPT09IDAgJiYgaXNfZGlydHkoZWZmZWN0KSkge1xuXHRcdFx0ZWFnZXJfYmxvY2tfZWZmZWN0cyA9IG5ldyBTZXQoKTtcblxuXHRcdFx0dXBkYXRlX2VmZmVjdChlZmZlY3QpO1xuXG5cdFx0XHQvLyBFZmZlY3RzIHdpdGggbm8gZGVwZW5kZW5jaWVzIG9yIHRlYXJkb3duIGRvIG5vdCBnZXQgYWRkZWQgdG8gdGhlIGVmZmVjdCB0cmVlLlxuXHRcdFx0Ly8gRGVmZXJyZWQgZWZmZWN0cyAoZS5nLiBgJGVmZmVjdCguLi4pYCkgX2FyZV8gYWRkZWQgdG8gdGhlIHRyZWUgYmVjYXVzZSB3ZVxuXHRcdFx0Ly8gZG9uJ3Qga25vdyBpZiB3ZSBuZWVkIHRvIGtlZXAgdGhlbSB1bnRpbCB0aGV5IGFyZSBleGVjdXRlZC4gRG9pbmcgdGhlIGNoZWNrXG5cdFx0XHQvLyBoZXJlIChyYXRoZXIgdGhhbiBpbiBgdXBkYXRlX2VmZmVjdGApIGFsbG93cyB1cyB0byBza2lwIHRoZSB3b3JrIGZvclxuXHRcdFx0Ly8gaW1tZWRpYXRlIGVmZmVjdHMuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGVmZmVjdC5kZXBzID09PSBudWxsICYmXG5cdFx0XHRcdGVmZmVjdC5maXJzdCA9PT0gbnVsbCAmJlxuXHRcdFx0XHRlZmZlY3Qubm9kZXMgPT09IG51bGwgJiZcblx0XHRcdFx0ZWZmZWN0LnRlYXJkb3duID09PSBudWxsICYmXG5cdFx0XHRcdGVmZmVjdC5hYyA9PT0gbnVsbFxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIHJlbW92ZSB0aGlzIGVmZmVjdCBmcm9tIHRoZSBncmFwaFxuXHRcdFx0XHR1bmxpbmtfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHVwZGF0ZV9lZmZlY3QoKSBoYXMgYSBmbHVzaFN5bmMoKSBpbiBpdCwgd2UgbWF5IGhhdmUgZmx1c2hlZCBhbm90aGVyIGZsdXNoX3F1ZXVlZF9lZmZlY3RzKCksXG5cdFx0XHQvLyB3aGljaCBhbHJlYWR5IGhhbmRsZWQgdGhpcyBsb2dpYyBhbmQgZGlkIHNldCBlYWdlcl9ibG9ja19lZmZlY3RzIHRvIG51bGwuXG5cdFx0XHRpZiAoZWFnZXJfYmxvY2tfZWZmZWN0cz8uc2l6ZSA+IDApIHtcblx0XHRcdFx0b2xkX3ZhbHVlcy5jbGVhcigpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgZSBvZiBlYWdlcl9ibG9ja19lZmZlY3RzKSB7XG5cdFx0XHRcdFx0Ly8gU2tpcCBlYWdlciBlZmZlY3RzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gdW5tb3VudGVkXG5cdFx0XHRcdFx0aWYgKChlLmYgJiAoREVTVFJPWUVEIHwgSU5FUlQpKSAhPT0gMCkgY29udGludWU7XG5cblx0XHRcdFx0XHQvLyBSdW4gZWZmZWN0cyBpbiBvcmRlciBmcm9tIGFuY2VzdG9yIHRvIGRlc2NlbmRhbnQsIGVsc2Ugd2UgY291bGQgcnVuIGludG8gbnVsbHBvaW50ZXJzXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cblx0XHRcdFx0XHRjb25zdCBvcmRlcmVkX2VmZmVjdHMgPSBbZV07XG5cdFx0XHRcdFx0bGV0IGFuY2VzdG9yID0gZS5wYXJlbnQ7XG5cdFx0XHRcdFx0d2hpbGUgKGFuY2VzdG9yICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpZiAoZWFnZXJfYmxvY2tfZWZmZWN0cy5oYXMoYW5jZXN0b3IpKSB7XG5cdFx0XHRcdFx0XHRcdGVhZ2VyX2Jsb2NrX2VmZmVjdHMuZGVsZXRlKGFuY2VzdG9yKTtcblx0XHRcdFx0XHRcdFx0b3JkZXJlZF9lZmZlY3RzLnB1c2goYW5jZXN0b3IpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yIChsZXQgaiA9IG9yZGVyZWRfZWZmZWN0cy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZSA9IG9yZGVyZWRfZWZmZWN0c1tqXTtcblx0XHRcdFx0XHRcdC8vIFNraXAgZWFnZXIgZWZmZWN0cyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIHVubW91bnRlZFxuXHRcdFx0XHRcdFx0aWYgKChlLmYgJiAoREVTVFJPWUVEIHwgSU5FUlQpKSAhPT0gMCkgY29udGludWU7XG5cdFx0XHRcdFx0XHR1cGRhdGVfZWZmZWN0KGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVhZ2VyX2Jsb2NrX2VmZmVjdHMuY2xlYXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRlYWdlcl9ibG9ja19lZmZlY3RzID0gbnVsbDtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIHNpbWlsYXIgdG8gYG1hcmtfcmVhY3Rpb25zYCwgYnV0IGl0IG9ubHkgbWFya3MgYXN5bmMvYmxvY2sgZWZmZWN0c1xuICogZGVwZW5kaW5nIG9uIGB2YWx1ZWAgYW5kIGF0IGxlYXN0IG9uZSBvZiB0aGUgb3RoZXIgYHNvdXJjZXNgLCBzbyB0aGF0XG4gKiB0aGVzZSBlZmZlY3RzIGNhbiByZS1ydW4gYWZ0ZXIgYW5vdGhlciBiYXRjaCBoYXMgYmVlbiBjb21taXR0ZWRcbiAqIEBwYXJhbSB7VmFsdWV9IHZhbHVlXG4gKiBAcGFyYW0ge1NvdXJjZVtdfSBzb3VyY2VzXG4gKiBAcGFyYW0ge1NldDxWYWx1ZT59IG1hcmtlZFxuICogQHBhcmFtIHtNYXA8UmVhY3Rpb24sIGJvb2xlYW4+fSBjaGVja2VkXG4gKi9cbmZ1bmN0aW9uIG1hcmtfZWZmZWN0cyh2YWx1ZSwgc291cmNlcywgbWFya2VkLCBjaGVja2VkKSB7XG5cdGlmIChtYXJrZWQuaGFzKHZhbHVlKSkgcmV0dXJuO1xuXHRtYXJrZWQuYWRkKHZhbHVlKTtcblxuXHRpZiAodmFsdWUucmVhY3Rpb25zICE9PSBudWxsKSB7XG5cdFx0Zm9yIChjb25zdCByZWFjdGlvbiBvZiB2YWx1ZS5yZWFjdGlvbnMpIHtcblx0XHRcdGNvbnN0IGZsYWdzID0gcmVhY3Rpb24uZjtcblxuXHRcdFx0aWYgKChmbGFncyAmIERFUklWRUQpICE9PSAwKSB7XG5cdFx0XHRcdG1hcmtfZWZmZWN0cygvKiogQHR5cGUge0Rlcml2ZWR9ICovIChyZWFjdGlvbiksIHNvdXJjZXMsIG1hcmtlZCwgY2hlY2tlZCk7XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHQoZmxhZ3MgJiAoQVNZTkMgfCBCTE9DS19FRkZFQ1QpKSAhPT0gMCAmJlxuXHRcdFx0XHQoZmxhZ3MgJiBESVJUWSkgPT09IDAgJiZcblx0XHRcdFx0ZGVwZW5kc19vbihyZWFjdGlvbiwgc291cmNlcywgY2hlY2tlZClcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhyZWFjdGlvbiwgRElSVFkpO1xuXHRcdFx0XHRzY2hlZHVsZV9lZmZlY3QoLyoqIEB0eXBlIHtFZmZlY3R9ICovIChyZWFjdGlvbikpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFdoZW4gY29tbWl0dGluZyBhIGZvcmssIHdlIG5lZWQgdG8gdHJpZ2dlciBlYWdlciBlZmZlY3RzIHNvIHRoYXRcbiAqIGFueSBgJHN0YXRlLmVhZ2VyKC4uLilgIGV4cHJlc3Npb25zIHVwZGF0ZSBpbW1lZGlhdGVseS4gVGhpc1xuICogZnVuY3Rpb24gYWxsb3dzIHVzIHRvIGRpc2NvdmVyIHRoZW1cbiAqIEBwYXJhbSB7VmFsdWV9IHZhbHVlXG4gKiBAcGFyYW0ge1NldDxFZmZlY3Q+fSBlZmZlY3RzXG4gKi9cbmZ1bmN0aW9uIG1hcmtfZWFnZXJfZWZmZWN0cyh2YWx1ZSwgZWZmZWN0cykge1xuXHRpZiAodmFsdWUucmVhY3Rpb25zID09PSBudWxsKSByZXR1cm47XG5cblx0Zm9yIChjb25zdCByZWFjdGlvbiBvZiB2YWx1ZS5yZWFjdGlvbnMpIHtcblx0XHRjb25zdCBmbGFncyA9IHJlYWN0aW9uLmY7XG5cblx0XHRpZiAoKGZsYWdzICYgREVSSVZFRCkgIT09IDApIHtcblx0XHRcdG1hcmtfZWFnZXJfZWZmZWN0cygvKiogQHR5cGUge0Rlcml2ZWR9ICovIChyZWFjdGlvbiksIGVmZmVjdHMpO1xuXHRcdH0gZWxzZSBpZiAoKGZsYWdzICYgRUFHRVJfRUZGRUNUKSAhPT0gMCkge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMocmVhY3Rpb24sIERJUlRZKTtcblx0XHRcdGVmZmVjdHMuYWRkKC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAocmVhY3Rpb24pKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlYWN0aW9ufSByZWFjdGlvblxuICogQHBhcmFtIHtTb3VyY2VbXX0gc291cmNlc1xuICogQHBhcmFtIHtNYXA8UmVhY3Rpb24sIGJvb2xlYW4+fSBjaGVja2VkXG4gKi9cbmZ1bmN0aW9uIGRlcGVuZHNfb24ocmVhY3Rpb24sIHNvdXJjZXMsIGNoZWNrZWQpIHtcblx0Y29uc3QgZGVwZW5kcyA9IGNoZWNrZWQuZ2V0KHJlYWN0aW9uKTtcblx0aWYgKGRlcGVuZHMgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGRlcGVuZHM7XG5cblx0aWYgKHJlYWN0aW9uLmRlcHMgIT09IG51bGwpIHtcblx0XHRmb3IgKGNvbnN0IGRlcCBvZiByZWFjdGlvbi5kZXBzKSB7XG5cdFx0XHRpZiAoaW5jbHVkZXMuY2FsbChzb3VyY2VzLCBkZXApKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGRlcC5mICYgREVSSVZFRCkgIT09IDAgJiYgZGVwZW5kc19vbigvKiogQHR5cGUge0Rlcml2ZWR9ICovIChkZXApLCBzb3VyY2VzLCBjaGVja2VkKSkge1xuXHRcdFx0XHRjaGVja2VkLnNldCgvKiogQHR5cGUge0Rlcml2ZWR9ICovIChkZXApLCB0cnVlKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hlY2tlZC5zZXQocmVhY3Rpb24sIGZhbHNlKTtcblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IHNpZ25hbFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZV9lZmZlY3Qoc2lnbmFsKSB7XG5cdHZhciBlZmZlY3QgPSAobGFzdF9zY2hlZHVsZWRfZWZmZWN0ID0gc2lnbmFsKTtcblxuXHR2YXIgYm91bmRhcnkgPSBlZmZlY3QuYjtcblxuXHQvLyBkZWZlciByZW5kZXIgZWZmZWN0cyBpbnNpZGUgYSBwZW5kaW5nIGJvdW5kYXJ5XG5cdC8vIFRPRE8gdGhlIGBSRUFDVElPTl9SQU5gIGNoZWNrIGlzIG9ubHkgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgbGVnYWN5IGAkOmAgZWZmZWN0cyBBRkFJQ1Qg4oCUIHdlIGNhbiByZW1vdmUgbGF0ZXJcblx0aWYgKFxuXHRcdGJvdW5kYXJ5Py5pc19wZW5kaW5nICYmXG5cdFx0KHNpZ25hbC5mICYgKEVGRkVDVCB8IFJFTkRFUl9FRkZFQ1QgfCBNQU5BR0VEX0VGRkVDVCkpICE9PSAwICYmXG5cdFx0KHNpZ25hbC5mICYgUkVBQ1RJT05fUkFOKSA9PT0gMFxuXHQpIHtcblx0XHRib3VuZGFyeS5kZWZlcl9lZmZlY3Qoc2lnbmFsKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR3aGlsZSAoZWZmZWN0LnBhcmVudCAhPT0gbnVsbCkge1xuXHRcdGVmZmVjdCA9IGVmZmVjdC5wYXJlbnQ7XG5cdFx0dmFyIGZsYWdzID0gZWZmZWN0LmY7XG5cblx0XHQvLyBpZiB0aGUgZWZmZWN0IGlzIGJlaW5nIHNjaGVkdWxlZCBiZWNhdXNlIGEgcGFyZW50IChlYWNoL2F3YWl0L2V0YykgYmxvY2tcblx0XHQvLyB1cGRhdGVkIGFuIGludGVybmFsIHNvdXJjZSwgb3IgYmVjYXVzZSBhIGJyYW5jaCBpcyBiZWluZyB1bnNraXBwZWQsXG5cdFx0Ly8gYmFpbCBvdXQgb3Igd2UnbGwgY2F1c2UgYSBzZWNvbmQgZmx1c2hcblx0XHRpZiAoXG5cdFx0XHRpc19mbHVzaGluZyAmJlxuXHRcdFx0ZWZmZWN0ID09PSBhY3RpdmVfZWZmZWN0ICYmXG5cdFx0XHQoZmxhZ3MgJiBCTE9DS19FRkZFQ1QpICE9PSAwICYmXG5cdFx0XHQoZmxhZ3MgJiBIRUFEX0VGRkVDVCkgPT09IDAgJiZcblx0XHRcdChmbGFncyAmIFJFQUNUSU9OX1JBTikgIT09IDBcblx0XHQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoKGZsYWdzICYgKFJPT1RfRUZGRUNUIHwgQlJBTkNIX0VGRkVDVCkpICE9PSAwKSB7XG5cdFx0XHRpZiAoKGZsYWdzICYgQ0xFQU4pID09PSAwKSB7XG5cdFx0XHRcdC8vIGJyYW5jaCBpcyBhbHJlYWR5IGRpcnR5LCBiYWlsXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZWZmZWN0LmYgXj0gQ0xFQU47XG5cdFx0fVxuXHR9XG5cblx0cXVldWVkX3Jvb3RfZWZmZWN0cy5wdXNoKGVmZmVjdCk7XG59XG5cbi8qKiBAdHlwZSB7U291cmNlPG51bWJlcj5bXX0gKi9cbmxldCBlYWdlcl92ZXJzaW9ucyA9IFtdO1xuXG5mdW5jdGlvbiBlYWdlcl9mbHVzaCgpIHtcblx0dHJ5IHtcblx0XHRmbHVzaFN5bmMoKCkgPT4ge1xuXHRcdFx0Zm9yIChjb25zdCB2ZXJzaW9uIG9mIGVhZ2VyX3ZlcnNpb25zKSB7XG5cdFx0XHRcdHVwZGF0ZSh2ZXJzaW9uKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBmaW5hbGx5IHtcblx0XHRlYWdlcl92ZXJzaW9ucyA9IFtdO1xuXHR9XG59XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgYCRzdGF0ZS5lYWdlcihmbigpKWBcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0geygpID0+IFR9IGZuXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhZ2VyKGZuKSB7XG5cdHZhciB2ZXJzaW9uID0gc291cmNlKDApO1xuXHR2YXIgaW5pdGlhbCA9IHRydWU7XG5cdHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7VH0gKi8gKHVuZGVmaW5lZCk7XG5cblx0Z2V0KHZlcnNpb24pO1xuXG5cdGVhZ2VyX2VmZmVjdCgoKSA9PiB7XG5cdFx0aWYgKGluaXRpYWwpIHtcblx0XHRcdC8vIHRoZSBmaXJzdCB0aW1lIHRoaXMgcnVucywgd2UgY3JlYXRlIGFuIGVhZ2VyIGVmZmVjdFxuXHRcdFx0Ly8gdGhhdCB3aWxsIHJ1biBlYWdlcmx5IHdoZW5ldmVyIHRoZSBleHByZXNzaW9uIGNoYW5nZXNcblx0XHRcdHZhciBwcmV2aW91c19iYXRjaF92YWx1ZXMgPSBiYXRjaF92YWx1ZXM7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGJhdGNoX3ZhbHVlcyA9IG51bGw7XG5cdFx0XHRcdHZhbHVlID0gZm4oKTtcblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdGJhdGNoX3ZhbHVlcyA9IHByZXZpb3VzX2JhdGNoX3ZhbHVlcztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHRoZSBzZWNvbmQgdGltZSB0aGlzIGVmZmVjdCBydW5zLCBpdCdzIHRvIHNjaGVkdWxlIGFcblx0XHQvLyBgdmVyc2lvbmAgdXBkYXRlLiBzaW5jZSB0aGlzIHdpbGwgcmVjcmVhdGUgdGhlIGVmZmVjdCxcblx0XHQvLyB3ZSBkb24ndCBuZWVkIHRvIGV2YWx1YXRlIHRoZSBleHByZXNzaW9uIGhlcmVcblx0XHRpZiAoZWFnZXJfdmVyc2lvbnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRxdWV1ZV9taWNyb190YXNrKGVhZ2VyX2ZsdXNoKTtcblx0XHR9XG5cblx0XHRlYWdlcl92ZXJzaW9ucy5wdXNoKHZlcnNpb24pO1xuXHR9KTtcblxuXHRpbml0aWFsID0gZmFsc2U7XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIE1hcmsgYWxsIHRoZSBlZmZlY3RzIGluc2lkZSBhIHNraXBwZWQgYnJhbmNoIENMRUFOLCBzbyB0aGF0XG4gKiB0aGV5IGNhbiBiZSBjb3JyZWN0bHkgcmVzY2hlZHVsZWQgbGF0ZXIuIFRyYWNrcyBkaXJ0eSBhbmQgbWF5YmVfZGlydHlcbiAqIGVmZmVjdHMgc28gdGhleSBjYW4gYmUgcmVzY2hlZHVsZWQgaWYgdGhlIGJyYW5jaCBzdXJ2aXZlcy5cbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7eyBkOiBFZmZlY3RbXSwgbTogRWZmZWN0W10gfX0gdHJhY2tlZFxuICovXG5mdW5jdGlvbiByZXNldF9icmFuY2goZWZmZWN0LCB0cmFja2VkKSB7XG5cdC8vIGNsZWFuIGJyYW5jaCA9IG5vdGhpbmcgZGlydHkgaW5zaWRlLCBubyBuZWVkIHRvIHRyYXZlcnNlIGZ1cnRoZXJcblx0aWYgKChlZmZlY3QuZiAmIEJSQU5DSF9FRkZFQ1QpICE9PSAwICYmIChlZmZlY3QuZiAmIENMRUFOKSAhPT0gMCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICgoZWZmZWN0LmYgJiBESVJUWSkgIT09IDApIHtcblx0XHR0cmFja2VkLmQucHVzaChlZmZlY3QpO1xuXHR9IGVsc2UgaWYgKChlZmZlY3QuZiAmIE1BWUJFX0RJUlRZKSAhPT0gMCkge1xuXHRcdHRyYWNrZWQubS5wdXNoKGVmZmVjdCk7XG5cdH1cblxuXHRzZXRfc2lnbmFsX3N0YXR1cyhlZmZlY3QsIENMRUFOKTtcblxuXHR2YXIgZSA9IGVmZmVjdC5maXJzdDtcblx0d2hpbGUgKGUgIT09IG51bGwpIHtcblx0XHRyZXNldF9icmFuY2goZSwgdHJhY2tlZCk7XG5cdFx0ZSA9IGUubmV4dDtcblx0fVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSAnZm9yaycsIGluIHdoaWNoIHN0YXRlIGNoYW5nZXMgYXJlIGV2YWx1YXRlZCBidXQgbm90IGFwcGxpZWQgdG8gdGhlIERPTS5cbiAqIFRoaXMgaXMgdXNlZnVsIGZvciBzcGVjdWxhdGl2ZWx5IGxvYWRpbmcgZGF0YSAoZm9yIGV4YW1wbGUpIHdoZW4geW91IHN1c3BlY3QgdGhhdFxuICogdGhlIHVzZXIgaXMgYWJvdXQgdG8gdGFrZSBzb21lIGFjdGlvbi5cbiAqXG4gKiBGcmFtZXdvcmtzIGxpa2UgU3ZlbHRlS2l0IGNhbiB1c2UgdGhpcyB0byBwcmVsb2FkIGRhdGEgd2hlbiB0aGUgdXNlciB0b3VjaGVzIG9yXG4gKiBob3ZlcnMgb3ZlciBhIGxpbmssIG1ha2luZyBhbnkgc3Vic2VxdWVudCBuYXZpZ2F0aW9uIGZlZWwgaW5zdGFudGFuZW91cy5cbiAqXG4gKiBUaGUgYGZuYCBwYXJhbWV0ZXIgaXMgYSBzeW5jaHJvbm91cyBmdW5jdGlvbiB0aGF0IG1vZGlmaWVzIHNvbWUgc3RhdGUuIFRoZVxuICogc3RhdGUgY2hhbmdlcyB3aWxsIGJlIHJldmVydGVkIGFmdGVyIHRoZSBmb3JrIGlzIGluaXRpYWxpc2VkLCB0aGVuIHJlYXBwbGllZFxuICogaWYgYW5kIHdoZW4gdGhlIGZvcmsgaXMgZXZlbnR1YWxseSBjb21taXR0ZWQuXG4gKlxuICogV2hlbiBpdCBiZWNvbWVzIGNsZWFyIHRoYXQgYSBmb3JrIHdpbGwgX25vdF8gYmUgY29tbWl0dGVkIChlLmcuIGJlY2F1c2UgdGhlXG4gKiB1c2VyIG5hdmlnYXRlZCBlbHNld2hlcmUpLCBpdCBtdXN0IGJlIGRpc2NhcmRlZCB0byBhdm9pZCBsZWFraW5nIG1lbW9yeS5cbiAqXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7Rm9ya31cbiAqIEBzaW5jZSA1LjQyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JrKGZuKSB7XG5cdGlmICghYXN5bmNfbW9kZV9mbGFnKSB7XG5cdFx0ZS5leHBlcmltZW50YWxfYXN5bmNfcmVxdWlyZWQoJ2ZvcmsnKTtcblx0fVxuXG5cdGlmIChjdXJyZW50X2JhdGNoICE9PSBudWxsKSB7XG5cdFx0ZS5mb3JrX3RpbWluZygpO1xuXHR9XG5cblx0dmFyIGJhdGNoID0gQmF0Y2guZW5zdXJlKCk7XG5cdGJhdGNoLmlzX2ZvcmsgPSB0cnVlO1xuXHRiYXRjaF92YWx1ZXMgPSBuZXcgTWFwKCk7XG5cblx0dmFyIGNvbW1pdHRlZCA9IGZhbHNlO1xuXHR2YXIgc2V0dGxlZCA9IGJhdGNoLnNldHRsZWQoKTtcblxuXHRmbHVzaFN5bmMoZm4pO1xuXG5cdC8vIHJldmVydCBzdGF0ZSBjaGFuZ2VzXG5cdGZvciAodmFyIFtzb3VyY2UsIHZhbHVlXSBvZiBiYXRjaC5wcmV2aW91cykge1xuXHRcdHNvdXJjZS52ID0gdmFsdWU7XG5cdH1cblxuXHQvLyBtYWtlIHdyaXRhYmxlIGRlcml2ZWRzIGRpcnR5LCBzbyB0aGV5IHJlY2FsY3VsYXRlIGNvcnJlY3RseVxuXHRmb3IgKHNvdXJjZSBvZiBiYXRjaC5jdXJyZW50LmtleXMoKSkge1xuXHRcdGlmICgoc291cmNlLmYgJiBERVJJVkVEKSAhPT0gMCkge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoc291cmNlLCBESVJUWSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb21taXQ6IGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChjb21taXR0ZWQpIHtcblx0XHRcdFx0YXdhaXQgc2V0dGxlZDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWJhdGNoZXMuaGFzKGJhdGNoKSkge1xuXHRcdFx0XHRlLmZvcmtfZGlzY2FyZGVkKCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbW1pdHRlZCA9IHRydWU7XG5cblx0XHRcdGJhdGNoLmlzX2ZvcmsgPSBmYWxzZTtcblxuXHRcdFx0Ly8gYXBwbHkgY2hhbmdlcyBhbmQgdXBkYXRlIHdyaXRlIHZlcnNpb25zIHNvIGRlcml2ZWRzIHNlZSB0aGUgY2hhbmdlXG5cdFx0XHRmb3IgKHZhciBbc291cmNlLCB2YWx1ZV0gb2YgYmF0Y2guY3VycmVudCkge1xuXHRcdFx0XHRzb3VyY2UudiA9IHZhbHVlO1xuXHRcdFx0XHRzb3VyY2Uud3YgPSBpbmNyZW1lbnRfd3JpdGVfdmVyc2lvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB0cmlnZ2VyIGFueSBgJHN0YXRlLmVhZ2VyKC4uLilgIGV4cHJlc3Npb25zIHdpdGggdGhlIG5ldyBzdGF0ZS5cblx0XHRcdC8vIGVhZ2VyIGVmZmVjdHMgZG9uJ3QgZ2V0IHNjaGVkdWxlZCBsaWtlIG90aGVyIGVmZmVjdHMsIHNvIHdlXG5cdFx0XHQvLyBjYW4ndCBqdXN0IGVuY291bnRlciB0aGVtIGR1cmluZyB0cmF2ZXJzYWwsIHdlIG5lZWQgdG9cblx0XHRcdC8vIHByb2FjdGl2ZWx5IGZsdXNoIHRoZW1cblx0XHRcdC8vIFRPRE8gbWF5YmUgdGhlcmUncyBhIGJldHRlciBpbXBsZW1lbnRhdGlvbj9cblx0XHRcdGZsdXNoU3luYygoKSA9PiB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7U2V0PEVmZmVjdD59ICovXG5cdFx0XHRcdHZhciBlYWdlcl9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdFx0XHRcdGZvciAodmFyIHNvdXJjZSBvZiBiYXRjaC5jdXJyZW50LmtleXMoKSkge1xuXHRcdFx0XHRcdG1hcmtfZWFnZXJfZWZmZWN0cyhzb3VyY2UsIGVhZ2VyX2VmZmVjdHMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2V0X2VhZ2VyX2VmZmVjdHMoZWFnZXJfZWZmZWN0cyk7XG5cdFx0XHRcdGZsdXNoX2VhZ2VyX2VmZmVjdHMoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRiYXRjaC5yZXZpdmUoKTtcblx0XHRcdGF3YWl0IHNldHRsZWQ7XG5cdFx0fSxcblx0XHRkaXNjYXJkOiAoKSA9PiB7XG5cdFx0XHQvLyBjYXVzZSBhbnkgTUFZQkVfRElSVFkgZGVyaXZlZHMgdG8gdXBkYXRlXG5cdFx0XHQvLyBpZiB0aGV5IGRlcGVuZCBvbiB0aGluZ3MgdGhhdGggY2hhbmdlZFxuXHRcdFx0Ly8gaW5zaWRlIHRoZSBkaXNjYXJkZWQgZm9ya1xuXHRcdFx0Zm9yICh2YXIgc291cmNlIG9mIGJhdGNoLmN1cnJlbnQua2V5cygpKSB7XG5cdFx0XHRcdHNvdXJjZS53diA9IGluY3JlbWVudF93cml0ZV92ZXJzaW9uKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghY29tbWl0dGVkICYmIGJhdGNoZXMuaGFzKGJhdGNoKSkge1xuXHRcdFx0XHRiYXRjaGVzLmRlbGV0ZShiYXRjaCk7XG5cdFx0XHRcdGJhdGNoLmRpc2NhcmQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogRm9yY2libHkgcmVtb3ZlIGFsbCBjdXJyZW50IGJhdGNoZXMsIHRvIHByZXZlbnQgY3Jvc3MtdGFsayBiZXR3ZWVuIHRlc3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcigpIHtcblx0YmF0Y2hlcy5jbGVhcigpO1xufVxuIiwiaW1wb3J0IHsgZ2V0LCB0aWNrLCB1bnRyYWNrIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgZWZmZWN0X3RyYWNraW5nLCByZW5kZXJfZWZmZWN0IH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBzb3VyY2UsIGluY3JlbWVudCB9IGZyb20gJy4uL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L2Rldi90cmFjaW5nLmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL2ludGVybmFsL2NsaWVudC9kb20vdGFzay5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGBzdWJzY3JpYmVgIGZ1bmN0aW9uIHRoYXQgaW50ZWdyYXRlcyBleHRlcm5hbCBldmVudC1iYXNlZCBzeXN0ZW1zIHdpdGggU3ZlbHRlJ3MgcmVhY3Rpdml0eS5cbiAqIEl0J3MgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgaW50ZWdyYXRpbmcgd2l0aCB3ZWIgQVBJcyBsaWtlIGBNZWRpYVF1ZXJ5YCwgYEludGVyc2VjdGlvbk9ic2VydmVyYCwgb3IgYFdlYlNvY2tldGAuXG4gKlxuICogSWYgYHN1YnNjcmliZWAgaXMgY2FsbGVkIGluc2lkZSBhbiBlZmZlY3QgKGluY2x1ZGluZyBpbmRpcmVjdGx5LCBmb3IgZXhhbXBsZSBpbnNpZGUgYSBnZXR0ZXIpLFxuICogdGhlIGBzdGFydGAgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBgdXBkYXRlYCBmdW5jdGlvbi4gV2hlbmV2ZXIgYHVwZGF0ZWAgaXMgY2FsbGVkLCB0aGUgZWZmZWN0IHJlLXJ1bnMuXG4gKlxuICogSWYgYHN0YXJ0YCByZXR1cm5zIGEgY2xlYW51cCBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgZWZmZWN0IGlzIGRlc3Ryb3llZC5cbiAqXG4gKiBJZiBgc3Vic2NyaWJlYCBpcyBjYWxsZWQgaW4gbXVsdGlwbGUgZWZmZWN0cywgYHN0YXJ0YCB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uY2UgYXMgbG9uZyBhcyB0aGUgZWZmZWN0c1xuICogYXJlIGFjdGl2ZSwgYW5kIHRoZSByZXR1cm5lZCB0ZWFyZG93biBmdW5jdGlvbiB3aWxsIG9ubHkgYmUgY2FsbGVkIHdoZW4gYWxsIGVmZmVjdHMgYXJlIGRlc3Ryb3llZC5cbiAqXG4gKiBJdCdzIGJlc3QgdW5kZXJzdG9vZCB3aXRoIGFuIGV4YW1wbGUuIEhlcmUncyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBbYE1lZGlhUXVlcnlgXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvc3ZlbHRlLXJlYWN0aXZpdHkjTWVkaWFRdWVyeSk6XG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7IGNyZWF0ZVN1YnNjcmliZXIgfSBmcm9tICdzdmVsdGUvcmVhY3Rpdml0eSc7XG4gKiBpbXBvcnQgeyBvbiB9IGZyb20gJ3N2ZWx0ZS9ldmVudHMnO1xuICpcbiAqIGV4cG9ydCBjbGFzcyBNZWRpYVF1ZXJ5IHtcbiAqIFx0I3F1ZXJ5O1xuICogXHQjc3Vic2NyaWJlO1xuICpcbiAqIFx0Y29uc3RydWN0b3IocXVlcnkpIHtcbiAqIFx0XHR0aGlzLiNxdWVyeSA9IHdpbmRvdy5tYXRjaE1lZGlhKGAoJHtxdWVyeX0pYCk7XG4gKlxuICogXHRcdHRoaXMuI3N1YnNjcmliZSA9IGNyZWF0ZVN1YnNjcmliZXIoKHVwZGF0ZSkgPT4ge1xuICogXHRcdFx0Ly8gd2hlbiB0aGUgYGNoYW5nZWAgZXZlbnQgb2NjdXJzLCByZS1ydW4gYW55IGVmZmVjdHMgdGhhdCByZWFkIGB0aGlzLmN1cnJlbnRgXG4gKiBcdFx0XHRjb25zdCBvZmYgPSBvbih0aGlzLiNxdWVyeSwgJ2NoYW5nZScsIHVwZGF0ZSk7XG4gKlxuICogXHRcdFx0Ly8gc3RvcCBsaXN0ZW5pbmcgd2hlbiBhbGwgdGhlIGVmZmVjdHMgYXJlIGRlc3Ryb3llZFxuICogXHRcdFx0cmV0dXJuICgpID0+IG9mZigpO1xuICogXHRcdH0pO1xuICogXHR9XG4gKlxuICogXHRnZXQgY3VycmVudCgpIHtcbiAqIFx0XHQvLyBUaGlzIG1ha2VzIHRoZSBnZXR0ZXIgcmVhY3RpdmUsIGlmIHJlYWQgaW4gYW4gZWZmZWN0XG4gKiBcdFx0dGhpcy4jc3Vic2NyaWJlKCk7XG4gKlxuICogXHRcdC8vIFJldHVybiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcXVlcnksIHdoZXRoZXIgb3Igbm90IHdlJ3JlIGluIGFuIGVmZmVjdFxuICogXHRcdHJldHVybiB0aGlzLiNxdWVyeS5tYXRjaGVzO1xuICogXHR9XG4gKiB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7KHVwZGF0ZTogKCkgPT4gdm9pZCkgPT4gKCgpID0+IHZvaWQpIHwgdm9pZH0gc3RhcnRcbiAqIEBzaW5jZSA1LjcuMFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3Vic2NyaWJlcihzdGFydCkge1xuXHRsZXQgc3Vic2NyaWJlcnMgPSAwO1xuXHRsZXQgdmVyc2lvbiA9IHNvdXJjZSgwKTtcblx0LyoqIEB0eXBlIHsoKCkgPT4gdm9pZCkgfCB2b2lkfSAqL1xuXHRsZXQgc3RvcDtcblxuXHRpZiAoREVWKSB7XG5cdFx0dGFnKHZlcnNpb24sICdjcmVhdGVTdWJzY3JpYmVyIHZlcnNpb24nKTtcblx0fVxuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKGVmZmVjdF90cmFja2luZygpKSB7XG5cdFx0XHRnZXQodmVyc2lvbik7XG5cblx0XHRcdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHRpZiAoc3Vic2NyaWJlcnMgPT09IDApIHtcblx0XHRcdFx0XHRzdG9wID0gdW50cmFjaygoKSA9PiBzdGFydCgoKSA9PiBpbmNyZW1lbnQodmVyc2lvbikpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN1YnNjcmliZXJzICs9IDE7XG5cblx0XHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdFx0XHRcdC8vIE9ubHkgY291bnQgZG93biBhZnRlciBhIG1pY3JvdGFzaywgZWxzZSB3ZSB3b3VsZCByZWFjaCAwIGJlZm9yZSBvdXIgb3duIHJlbmRlciBlZmZlY3QgcmVydW5zLFxuXHRcdFx0XHRcdFx0Ly8gYnV0IHJlYWNoIDEgYWdhaW4gd2hlbiB0aGUgdGljayBjYWxsYmFjayBvZiB0aGUgcHJpb3IgdGVhcmRvd24gcnVucy4gVGhhdCB3b3VsZCBtZWFuIHdlXG5cdFx0XHRcdFx0XHQvLyByZS1zdWJjcmliZSB1bm5lY2Vzc2FyaWx5IGFuZCBjcmVhdGUgYSBtZW1vcnkgbGVhayBiZWNhdXNlIHRoZSBvbGQgc3Vic2NyaXB0aW9uIGlzIG5ldmVyIGNsZWFuZWQgdXAuXG5cdFx0XHRcdFx0XHRzdWJzY3JpYmVycyAtPSAxO1xuXG5cdFx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlcnMgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0c3RvcD8uKCk7XG5cdFx0XHRcdFx0XHRcdHN0b3AgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdC8vIEluY3JlbWVudCB0aGUgdmVyc2lvbiB0byBlbnN1cmUgYW55IGRlcGVuZGVudCBkZXJpdmVkcyBhcmUgbWFya2VkIGRpcnR5IHdoZW4gdGhlIHN1YnNjcmlwdGlvbiBpcyBwaWNrZWQgdXAgYWdhaW4gbGF0ZXIuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHdlIGRpZG4ndCBkbyB0aGlzIHRoZW4gdGhlIGNvbXBhcmlzb24gb2Ygd3JpdGUgdmVyc2lvbnMgd291bGQgZGV0ZXJtaW5lIHRoYXQgdGhlIGRlcml2ZWQgaGFzIGEgbGF0ZXIgdmVyc2lvbiB0aGFuXG5cdFx0XHRcdFx0XHRcdC8vIHRoZSBzdWJzY3JpYmVyLCBhbmQgaXQgd291bGQgbm90IGJlIHJlLXJ1bi5cblx0XHRcdFx0XHRcdFx0aW5jcmVtZW50KHZlcnNpb24pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufVxuIiwiLyoqIEBpbXBvcnQgeyBFZmZlY3QsIFNvdXJjZSwgVGVtcGxhdGVOb2RlLCB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQge1xuXHRCT1VOREFSWV9FRkZFQ1QsXG5cdERJUlRZLFxuXHRFRkZFQ1RfUFJFU0VSVkVELFxuXHRFRkZFQ1RfVFJBTlNQQVJFTlQsXG5cdE1BWUJFX0RJUlRZXG59IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IEhZRFJBVElPTl9TVEFSVF9FTFNFLCBIWURSQVRJT05fU1RBUlRfRkFJTEVEIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9jb250ZXh0LCBzZXRfY29tcG9uZW50X2NvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IGhhbmRsZV9lcnJvciwgaW52b2tlX2Vycm9yX2JvdW5kYXJ5IH0gZnJvbSAnLi4vLi4vZXJyb3ItaGFuZGxpbmcuanMnO1xuaW1wb3J0IHtcblx0YmxvY2ssXG5cdGJyYW5jaCxcblx0ZGVzdHJveV9lZmZlY3QsXG5cdG1vdmVfZWZmZWN0LFxuXHRwYXVzZV9lZmZlY3Rcbn0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7XG5cdGFjdGl2ZV9lZmZlY3QsXG5cdGFjdGl2ZV9yZWFjdGlvbixcblx0Z2V0LFxuXHRzZXRfYWN0aXZlX2VmZmVjdCxcblx0c2V0X2FjdGl2ZV9yZWFjdGlvblxufSBmcm9tICcuLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7XG5cdGh5ZHJhdGVfbmV4dCxcblx0aHlkcmF0ZV9ub2RlLFxuXHRoeWRyYXRpbmcsXG5cdG5leHQsXG5cdHNraXBfbm9kZXMsXG5cdHNldF9oeWRyYXRlX25vZGVcbn0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IHF1ZXVlX21pY3JvX3Rhc2sgfSBmcm9tICcuLi90YXNrLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vLi4vZXJyb3JzLmpzJztcbmltcG9ydCAqIGFzIHcgZnJvbSAnLi4vLi4vd2FybmluZ3MuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBCYXRjaCwgc2NoZWR1bGVfZWZmZWN0IH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5pbXBvcnQgeyBpbnRlcm5hbF9zZXQsIHNvdXJjZSB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvc291cmNlcy5qcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuLi8uLi9kZXYvdHJhY2luZy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVTdWJzY3JpYmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vcmVhY3Rpdml0eS9jcmVhdGUtc3Vic2NyaWJlci5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfdGV4dCB9IGZyb20gJy4uL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHsgZGVmZXJfZWZmZWN0IH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS91dGlscy5qcyc7XG5pbXBvcnQgeyBzZXRfc2lnbmFsX3N0YXR1cyB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvc3RhdHVzLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogXHQgb25lcnJvcj86IChlcnJvcjogdW5rbm93biwgcmVzZXQ6ICgpID0+IHZvaWQpID0+IHZvaWQ7XG4gKiAgIGZhaWxlZD86IChhbmNob3I6IE5vZGUsIGVycm9yOiAoKSA9PiB1bmtub3duLCByZXNldDogKCkgPT4gKCkgPT4gdm9pZCkgPT4gdm9pZDtcbiAqICAgcGVuZGluZz86IChhbmNob3I6IE5vZGUpID0+IHZvaWQ7XG4gKiB9fSBCb3VuZGFyeVByb3BzXG4gKi9cblxudmFyIGZsYWdzID0gRUZGRUNUX1RSQU5TUEFSRU5UIHwgRUZGRUNUX1BSRVNFUlZFRDtcblxuLyoqXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICogQHBhcmFtIHtCb3VuZGFyeVByb3BzfSBwcm9wc1xuICogQHBhcmFtIHsoKGFuY2hvcjogTm9kZSkgPT4gdm9pZCl9IGNoaWxkcmVuXG4gKiBAcGFyYW0geygoZXJyb3I6IHVua25vd24pID0+IHVua25vd24pIHwgdW5kZWZpbmVkfSBbdHJhbnNmb3JtX2Vycm9yXVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib3VuZGFyeShub2RlLCBwcm9wcywgY2hpbGRyZW4sIHRyYW5zZm9ybV9lcnJvcikge1xuXHRuZXcgQm91bmRhcnkobm9kZSwgcHJvcHMsIGNoaWxkcmVuLCB0cmFuc2Zvcm1fZXJyb3IpO1xufVxuXG5leHBvcnQgY2xhc3MgQm91bmRhcnkge1xuXHQvKiogQHR5cGUge0JvdW5kYXJ5IHwgbnVsbH0gKi9cblx0cGFyZW50O1xuXG5cdGlzX3BlbmRpbmcgPSBmYWxzZTtcblxuXHQvKipcblx0ICogQVBJLWxldmVsIHRyYW5zZm9ybUVycm9yIHRyYW5zZm9ybSBmdW5jdGlvbi4gVHJhbnNmb3JtcyBlcnJvcnMgYmVmb3JlIHRoZXkgcmVhY2ggdGhlIGBmYWlsZWRgIHNuaXBwZXQuXG5cdCAqIEluaGVyaXRlZCBmcm9tIHBhcmVudCBib3VuZGFyeSwgb3IgZGVmYXVsdHMgdG8gaWRlbnRpdHkuXG5cdCAqIEB0eXBlIHsoZXJyb3I6IHVua25vd24pID0+IHVua25vd259XG5cdCAqL1xuXHR0cmFuc2Zvcm1fZXJyb3I7XG5cblx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovXG5cdCNhbmNob3I7XG5cblx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGUgfCBudWxsfSAqL1xuXHQjaHlkcmF0ZV9vcGVuID0gaHlkcmF0aW5nID8gaHlkcmF0ZV9ub2RlIDogbnVsbDtcblxuXHQvKiogQHR5cGUge0JvdW5kYXJ5UHJvcHN9ICovXG5cdCNwcm9wcztcblxuXHQvKiogQHR5cGUgeygoYW5jaG9yOiBOb2RlKSA9PiB2b2lkKX0gKi9cblx0I2NoaWxkcmVuO1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0fSAqL1xuXHQjZWZmZWN0O1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi9cblx0I21haW5fZWZmZWN0ID0gbnVsbDtcblxuXHQvKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovXG5cdCNwZW5kaW5nX2VmZmVjdCA9IG51bGw7XG5cblx0LyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuXHQjZmFpbGVkX2VmZmVjdCA9IG51bGw7XG5cblx0LyoqIEB0eXBlIHtEb2N1bWVudEZyYWdtZW50IHwgbnVsbH0gKi9cblx0I29mZnNjcmVlbl9mcmFnbWVudCA9IG51bGw7XG5cblx0I2xvY2FsX3BlbmRpbmdfY291bnQgPSAwO1xuXHQjcGVuZGluZ19jb3VudCA9IDA7XG5cdCNwZW5kaW5nX2NvdW50X3VwZGF0ZV9xdWV1ZWQgPSBmYWxzZTtcblxuXHQvKiogQHR5cGUge1NldDxFZmZlY3Q+fSAqL1xuXHQjZGlydHlfZWZmZWN0cyA9IG5ldyBTZXQoKTtcblxuXHQvKiogQHR5cGUge1NldDxFZmZlY3Q+fSAqL1xuXHQjbWF5YmVfZGlydHlfZWZmZWN0cyA9IG5ldyBTZXQoKTtcblxuXHQvKipcblx0ICogQSBzb3VyY2UgY29udGFpbmluZyB0aGUgbnVtYmVyIG9mIHBlbmRpbmcgYXN5bmMgZGVyaXZlZHMvZXhwcmVzc2lvbnMuXG5cdCAqIE9ubHkgY3JlYXRlZCBpZiBgJGVmZmVjdC5wZW5kaW5nKClgIGlzIHVzZWQgaW5zaWRlIHRoZSBib3VuZGFyeSxcblx0ICogb3RoZXJ3aXNlIHVwZGF0aW5nIHRoZSBzb3VyY2UgcmVzdWx0cyBpbiBuZWVkbGVzcyBgQmF0Y2guZW5zdXJlKClgXG5cdCAqIGNhbGxzIGZvbGxvd2VkIGJ5IG5vLW9wIGZsdXNoZXNcblx0ICogQHR5cGUge1NvdXJjZTxudW1iZXI+IHwgbnVsbH1cblx0ICovXG5cdCNlZmZlY3RfcGVuZGluZyA9IG51bGw7XG5cblx0I2VmZmVjdF9wZW5kaW5nX3N1YnNjcmliZXIgPSBjcmVhdGVTdWJzY3JpYmVyKCgpID0+IHtcblx0XHR0aGlzLiNlZmZlY3RfcGVuZGluZyA9IHNvdXJjZSh0aGlzLiNsb2NhbF9wZW5kaW5nX2NvdW50KTtcblxuXHRcdGlmIChERVYpIHtcblx0XHRcdHRhZyh0aGlzLiNlZmZlY3RfcGVuZGluZywgJyRlZmZlY3QucGVuZGluZygpJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdHRoaXMuI2VmZmVjdF9wZW5kaW5nID0gbnVsbDtcblx0XHR9O1xuXHR9KTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtCb3VuZGFyeVByb3BzfSBwcm9wc1xuXHQgKiBAcGFyYW0geygoYW5jaG9yOiBOb2RlKSA9PiB2b2lkKX0gY2hpbGRyZW5cblx0ICogQHBhcmFtIHsoKGVycm9yOiB1bmtub3duKSA9PiB1bmtub3duKSB8IHVuZGVmaW5lZH0gW3RyYW5zZm9ybV9lcnJvcl1cblx0ICovXG5cdGNvbnN0cnVjdG9yKG5vZGUsIHByb3BzLCBjaGlsZHJlbiwgdHJhbnNmb3JtX2Vycm9yKSB7XG5cdFx0dGhpcy4jYW5jaG9yID0gbm9kZTtcblx0XHR0aGlzLiNwcm9wcyA9IHByb3BzO1xuXG5cdFx0dGhpcy4jY2hpbGRyZW4gPSAoYW5jaG9yKSA9PiB7XG5cdFx0XHR2YXIgZWZmZWN0ID0gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KTtcblxuXHRcdFx0ZWZmZWN0LmIgPSB0aGlzO1xuXHRcdFx0ZWZmZWN0LmYgfD0gQk9VTkRBUllfRUZGRUNUO1xuXG5cdFx0XHRjaGlsZHJlbihhbmNob3IpO1xuXHRcdH07XG5cblx0XHR0aGlzLnBhcmVudCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkuYjtcblxuXHRcdC8vIEluaGVyaXQgdHJhbnNmb3JtX2Vycm9yIGZyb20gcGFyZW50IGJvdW5kYXJ5LCBvciB1c2UgdGhlIHByb3ZpZGVkIG9uZSwgb3IgZGVmYXVsdCB0byBpZGVudGl0eVxuXHRcdHRoaXMudHJhbnNmb3JtX2Vycm9yID0gdHJhbnNmb3JtX2Vycm9yID8/IHRoaXMucGFyZW50Py50cmFuc2Zvcm1fZXJyb3IgPz8gKChlKSA9PiBlKTtcblxuXHRcdHRoaXMuI2VmZmVjdCA9IGJsb2NrKCgpID0+IHtcblx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0Y29uc3QgY29tbWVudCA9IC8qKiBAdHlwZSB7Q29tbWVudH0gKi8gKHRoaXMuI2h5ZHJhdGVfb3Blbik7XG5cdFx0XHRcdGh5ZHJhdGVfbmV4dCgpO1xuXG5cdFx0XHRcdGNvbnN0IHNlcnZlcl9yZW5kZXJlZF9wZW5kaW5nID0gY29tbWVudC5kYXRhID09PSBIWURSQVRJT05fU1RBUlRfRUxTRTtcblx0XHRcdFx0Y29uc3Qgc2VydmVyX3JlbmRlcmVkX2ZhaWxlZCA9IGNvbW1lbnQuZGF0YS5zdGFydHNXaXRoKEhZRFJBVElPTl9TVEFSVF9GQUlMRUQpO1xuXG5cdFx0XHRcdGlmIChzZXJ2ZXJfcmVuZGVyZWRfZmFpbGVkKSB7XG5cdFx0XHRcdFx0Ly8gU2VydmVyIHJlbmRlcmVkIHRoZSBmYWlsZWQgc25pcHBldCAtIGh5ZHJhdGUgaXQuXG5cdFx0XHRcdFx0Ly8gVGhlIHNlcmlhbGl6ZWQgZXJyb3IgaXMgZW1iZWRkZWQgaW4gdGhlIGNvbW1lbnQ6IDwhLS1bPzxqc29uPi0tPlxuXHRcdFx0XHRcdGNvbnN0IHNlcmlhbGl6ZWRfZXJyb3IgPSBKU09OLnBhcnNlKGNvbW1lbnQuZGF0YS5zbGljZShIWURSQVRJT05fU1RBUlRfRkFJTEVELmxlbmd0aCkpO1xuXHRcdFx0XHRcdHRoaXMuI2h5ZHJhdGVfZmFpbGVkX2NvbnRlbnQoc2VyaWFsaXplZF9lcnJvcik7XG5cdFx0XHRcdH0gZWxzZSBpZiAoc2VydmVyX3JlbmRlcmVkX3BlbmRpbmcpIHtcblx0XHRcdFx0XHR0aGlzLiNoeWRyYXRlX3BlbmRpbmdfY29udGVudCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuI2h5ZHJhdGVfcmVzb2x2ZWRfY29udGVudCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLiNyZW5kZXIoKTtcblx0XHRcdH1cblx0XHR9LCBmbGFncyk7XG5cblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHR0aGlzLiNhbmNob3IgPSBoeWRyYXRlX25vZGU7XG5cdFx0fVxuXHR9XG5cblx0I2h5ZHJhdGVfcmVzb2x2ZWRfY29udGVudCgpIHtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy4jbWFpbl9lZmZlY3QgPSBicmFuY2goKCkgPT4gdGhpcy4jY2hpbGRyZW4odGhpcy4jYW5jaG9yKSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHRoaXMuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3Vua25vd259IGVycm9yIFRoZSBkZXNlcmlhbGl6ZWQgZXJyb3IgZnJvbSB0aGUgc2VydmVyJ3MgaHlkcmF0aW9uIGNvbW1lbnRcblx0ICovXG5cdCNoeWRyYXRlX2ZhaWxlZF9jb250ZW50KGVycm9yKSB7XG5cdFx0Y29uc3QgZmFpbGVkID0gdGhpcy4jcHJvcHMuZmFpbGVkO1xuXHRcdGlmICghZmFpbGVkKSByZXR1cm47XG5cblx0XHR0aGlzLiNmYWlsZWRfZWZmZWN0ID0gYnJhbmNoKCgpID0+IHtcblx0XHRcdGZhaWxlZChcblx0XHRcdFx0dGhpcy4jYW5jaG9yLFxuXHRcdFx0XHQoKSA9PiBlcnJvcixcblx0XHRcdFx0KCkgPT4gKCkgPT4ge31cblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHQjaHlkcmF0ZV9wZW5kaW5nX2NvbnRlbnQoKSB7XG5cdFx0Y29uc3QgcGVuZGluZyA9IHRoaXMuI3Byb3BzLnBlbmRpbmc7XG5cdFx0aWYgKCFwZW5kaW5nKSByZXR1cm47XG5cblx0XHR0aGlzLmlzX3BlbmRpbmcgPSB0cnVlO1xuXHRcdHRoaXMuI3BlbmRpbmdfZWZmZWN0ID0gYnJhbmNoKCgpID0+IHBlbmRpbmcodGhpcy4jYW5jaG9yKSk7XG5cblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdHZhciBmcmFnbWVudCA9ICh0aGlzLiNvZmZzY3JlZW5fZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuXHRcdFx0dmFyIGFuY2hvciA9IGNyZWF0ZV90ZXh0KCk7XG5cblx0XHRcdGZyYWdtZW50LmFwcGVuZChhbmNob3IpO1xuXG5cdFx0XHR0aGlzLiNtYWluX2VmZmVjdCA9IHRoaXMuI3J1bigoKSA9PiB7XG5cdFx0XHRcdEJhdGNoLmVuc3VyZSgpO1xuXHRcdFx0XHRyZXR1cm4gYnJhbmNoKCgpID0+IHRoaXMuI2NoaWxkcmVuKGFuY2hvcikpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh0aGlzLiNwZW5kaW5nX2NvdW50ID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuI2FuY2hvci5iZWZvcmUoZnJhZ21lbnQpO1xuXHRcdFx0XHR0aGlzLiNvZmZzY3JlZW5fZnJhZ21lbnQgPSBudWxsO1xuXG5cdFx0XHRcdHBhdXNlX2VmZmVjdCgvKiogQHR5cGUge0VmZmVjdH0gKi8gKHRoaXMuI3BlbmRpbmdfZWZmZWN0KSwgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuI3BlbmRpbmdfZWZmZWN0ID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy4jcmVzb2x2ZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0I3JlbmRlcigpIHtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy5pc19wZW5kaW5nID0gdGhpcy5oYXNfcGVuZGluZ19zbmlwcGV0KCk7XG5cdFx0XHR0aGlzLiNwZW5kaW5nX2NvdW50ID0gMDtcblx0XHRcdHRoaXMuI2xvY2FsX3BlbmRpbmdfY291bnQgPSAwO1xuXG5cdFx0XHR0aGlzLiNtYWluX2VmZmVjdCA9IGJyYW5jaCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuI2NoaWxkcmVuKHRoaXMuI2FuY2hvcik7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHRoaXMuI3BlbmRpbmdfY291bnQgPiAwKSB7XG5cdFx0XHRcdHZhciBmcmFnbWVudCA9ICh0aGlzLiNvZmZzY3JlZW5fZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuXHRcdFx0XHRtb3ZlX2VmZmVjdCh0aGlzLiNtYWluX2VmZmVjdCwgZnJhZ21lbnQpO1xuXG5cdFx0XHRcdGNvbnN0IHBlbmRpbmcgPSAvKiogQHR5cGUgeyhhbmNob3I6IE5vZGUpID0+IHZvaWR9ICovICh0aGlzLiNwcm9wcy5wZW5kaW5nKTtcblx0XHRcdFx0dGhpcy4jcGVuZGluZ19lZmZlY3QgPSBicmFuY2goKCkgPT4gcGVuZGluZyh0aGlzLiNhbmNob3IpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuI3Jlc29sdmUoKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhpcy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0I3Jlc29sdmUoKSB7XG5cdFx0dGhpcy5pc19wZW5kaW5nID0gZmFsc2U7XG5cblx0XHQvLyBhbnkgZWZmZWN0cyB0aGF0IHdlcmUgcHJldmlvdXNseSBkZWZlcnJlZCBzaG91bGQgYmUgcmVzY2hlZHVsZWQg4oCUXG5cdFx0Ly8gYWZ0ZXIgdGhlIG5leHQgdHJhdmVyc2FsICh3aGljaCB3aWxsIGhhcHBlbiBpbW1lZGlhdGVseSwgZHVlIHRvIHRoZVxuXHRcdC8vIHNhbWUgdXBkYXRlIHRoYXQgYnJvdWdodCB1cyBoZXJlKSB0aGUgZWZmZWN0cyB3aWxsIGJlIGZsdXNoZWRcblx0XHRmb3IgKGNvbnN0IGUgb2YgdGhpcy4jZGlydHlfZWZmZWN0cykge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZSwgRElSVFkpO1xuXHRcdFx0c2NoZWR1bGVfZWZmZWN0KGUpO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgZSBvZiB0aGlzLiNtYXliZV9kaXJ0eV9lZmZlY3RzKSB7XG5cdFx0XHRzZXRfc2lnbmFsX3N0YXR1cyhlLCBNQVlCRV9ESVJUWSk7XG5cdFx0XHRzY2hlZHVsZV9lZmZlY3QoZSk7XG5cdFx0fVxuXG5cdFx0dGhpcy4jZGlydHlfZWZmZWN0cy5jbGVhcigpO1xuXHRcdHRoaXMuI21heWJlX2RpcnR5X2VmZmVjdHMuY2xlYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZlciBhbiBlZmZlY3QgaW5zaWRlIGEgcGVuZGluZyBib3VuZGFyeSB1bnRpbCB0aGUgYm91bmRhcnkgcmVzb2x2ZXNcblx0ICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuXHQgKi9cblx0ZGVmZXJfZWZmZWN0KGVmZmVjdCkge1xuXHRcdGRlZmVyX2VmZmVjdChlZmZlY3QsIHRoaXMuI2RpcnR5X2VmZmVjdHMsIHRoaXMuI21heWJlX2RpcnR5X2VmZmVjdHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYGZhbHNlYCBpZiB0aGUgZWZmZWN0IGV4aXN0cyBpbnNpZGUgYSBib3VuZGFyeSB3aG9zZSBwZW5kaW5nIHNuaXBwZXQgaXMgc2hvd25cblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRpc19yZW5kZXJlZCgpIHtcblx0XHRyZXR1cm4gIXRoaXMuaXNfcGVuZGluZyAmJiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmlzX3JlbmRlcmVkKCkpO1xuXHR9XG5cblx0aGFzX3BlbmRpbmdfc25pcHBldCgpIHtcblx0XHRyZXR1cm4gISF0aGlzLiNwcm9wcy5wZW5kaW5nO1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqIEBwYXJhbSB7KCkgPT4gVH0gZm5cblx0ICovXG5cdCNydW4oZm4pIHtcblx0XHR2YXIgcHJldmlvdXNfZWZmZWN0ID0gYWN0aXZlX2VmZmVjdDtcblx0XHR2YXIgcHJldmlvdXNfcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdFx0dmFyIHByZXZpb3VzX2N0eCA9IGNvbXBvbmVudF9jb250ZXh0O1xuXG5cdFx0c2V0X2FjdGl2ZV9lZmZlY3QodGhpcy4jZWZmZWN0KTtcblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHRoaXMuI2VmZmVjdCk7XG5cdFx0c2V0X2NvbXBvbmVudF9jb250ZXh0KHRoaXMuI2VmZmVjdC5jdHgpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBmbigpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGhhbmRsZV9lcnJvcihlKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHRcdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihwcmV2aW91c19yZWFjdGlvbik7XG5cdFx0XHRzZXRfY29tcG9uZW50X2NvbnRleHQocHJldmlvdXNfY3R4KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgcGVuZGluZyBjb3VudCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnRseSB2aXNpYmxlIHBlbmRpbmcgc25pcHBldCxcblx0ICogaWYgYW55LCBzdWNoIHRoYXQgd2UgY2FuIHJlcGxhY2UgdGhlIHNuaXBwZXQgd2l0aCBjb250ZW50IG9uY2Ugd29yayBpcyBkb25lXG5cdCAqIEBwYXJhbSB7MSB8IC0xfSBkXG5cdCAqL1xuXHQjdXBkYXRlX3BlbmRpbmdfY291bnQoZCkge1xuXHRcdGlmICghdGhpcy5oYXNfcGVuZGluZ19zbmlwcGV0KCkpIHtcblx0XHRcdGlmICh0aGlzLnBhcmVudCkge1xuXHRcdFx0XHR0aGlzLnBhcmVudC4jdXBkYXRlX3BlbmRpbmdfY291bnQoZCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIHRoZXJlJ3Mgbm8gcGFyZW50LCB3ZSdyZSBpbiBhIHNjb3BlIHdpdGggbm8gcGVuZGluZyBzbmlwcGV0XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy4jcGVuZGluZ19jb3VudCArPSBkO1xuXG5cdFx0aWYgKHRoaXMuI3BlbmRpbmdfY291bnQgPT09IDApIHtcblx0XHRcdHRoaXMuI3Jlc29sdmUoKTtcblxuXHRcdFx0aWYgKHRoaXMuI3BlbmRpbmdfZWZmZWN0KSB7XG5cdFx0XHRcdHBhdXNlX2VmZmVjdCh0aGlzLiNwZW5kaW5nX2VmZmVjdCwgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuI3BlbmRpbmdfZWZmZWN0ID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLiNvZmZzY3JlZW5fZnJhZ21lbnQpIHtcblx0XHRcdFx0dGhpcy4jYW5jaG9yLmJlZm9yZSh0aGlzLiNvZmZzY3JlZW5fZnJhZ21lbnQpO1xuXHRcdFx0XHR0aGlzLiNvZmZzY3JlZW5fZnJhZ21lbnQgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIHNvdXJjZSB0aGF0IHBvd2VycyBgJGVmZmVjdC5wZW5kaW5nKClgIGluc2lkZSB0aGlzIGJvdW5kYXJ5LFxuXHQgKiBhbmQgY29udHJvbHMgd2hlbiB0aGUgY3VycmVudCBgcGVuZGluZ2Agc25pcHBldCAoaWYgYW55KSBpcyByZW1vdmVkLlxuXHQgKiBEbyBub3QgY2FsbCBmcm9tIGluc2lkZSB0aGUgY2xhc3Ncblx0ICogQHBhcmFtIHsxIHwgLTF9IGRcblx0ICovXG5cdHVwZGF0ZV9wZW5kaW5nX2NvdW50KGQpIHtcblx0XHR0aGlzLiN1cGRhdGVfcGVuZGluZ19jb3VudChkKTtcblxuXHRcdHRoaXMuI2xvY2FsX3BlbmRpbmdfY291bnQgKz0gZDtcblxuXHRcdGlmICghdGhpcy4jZWZmZWN0X3BlbmRpbmcgfHwgdGhpcy4jcGVuZGluZ19jb3VudF91cGRhdGVfcXVldWVkKSByZXR1cm47XG5cdFx0dGhpcy4jcGVuZGluZ19jb3VudF91cGRhdGVfcXVldWVkID0gdHJ1ZTtcblxuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0dGhpcy4jcGVuZGluZ19jb3VudF91cGRhdGVfcXVldWVkID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy4jZWZmZWN0X3BlbmRpbmcpIHtcblx0XHRcdFx0aW50ZXJuYWxfc2V0KHRoaXMuI2VmZmVjdF9wZW5kaW5nLCB0aGlzLiNsb2NhbF9wZW5kaW5nX2NvdW50KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGdldF9lZmZlY3RfcGVuZGluZygpIHtcblx0XHR0aGlzLiNlZmZlY3RfcGVuZGluZ19zdWJzY3JpYmVyKCk7XG5cdFx0cmV0dXJuIGdldCgvKiogQHR5cGUge1NvdXJjZTxudW1iZXI+fSAqLyAodGhpcy4jZWZmZWN0X3BlbmRpbmcpKTtcblx0fVxuXG5cdC8qKiBAcGFyYW0ge3Vua25vd259IGVycm9yICovXG5cdGVycm9yKGVycm9yKSB7XG5cdFx0dmFyIG9uZXJyb3IgPSB0aGlzLiNwcm9wcy5vbmVycm9yO1xuXHRcdGxldCBmYWlsZWQgPSB0aGlzLiNwcm9wcy5mYWlsZWQ7XG5cblx0XHQvLyBJZiB3ZSBoYXZlIG5vdGhpbmcgdG8gY2FwdHVyZSB0aGUgZXJyb3IsIG9yIGlmIHdlIGhpdCBhbiBlcnJvciB3aGlsZVxuXHRcdC8vIHJlbmRlcmluZyB0aGUgZmFsbGJhY2ssIHJlLXRocm93IGZvciBhbm90aGVyIGJvdW5kYXJ5IHRvIGhhbmRsZVxuXHRcdGlmICghb25lcnJvciAmJiAhZmFpbGVkKSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy4jbWFpbl9lZmZlY3QpIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0KHRoaXMuI21haW5fZWZmZWN0KTtcblx0XHRcdHRoaXMuI21haW5fZWZmZWN0ID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy4jcGVuZGluZ19lZmZlY3QpIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0KHRoaXMuI3BlbmRpbmdfZWZmZWN0KTtcblx0XHRcdHRoaXMuI3BlbmRpbmdfZWZmZWN0ID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy4jZmFpbGVkX2VmZmVjdCkge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QodGhpcy4jZmFpbGVkX2VmZmVjdCk7XG5cdFx0XHR0aGlzLiNmYWlsZWRfZWZmZWN0ID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAodGhpcy4jaHlkcmF0ZV9vcGVuKSk7XG5cdFx0XHRuZXh0KCk7XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKHNraXBfbm9kZXMoKSk7XG5cdFx0fVxuXG5cdFx0dmFyIGRpZF9yZXNldCA9IGZhbHNlO1xuXHRcdHZhciBjYWxsaW5nX29uX2Vycm9yID0gZmFsc2U7XG5cblx0XHRjb25zdCByZXNldCA9ICgpID0+IHtcblx0XHRcdGlmIChkaWRfcmVzZXQpIHtcblx0XHRcdFx0dy5zdmVsdGVfYm91bmRhcnlfcmVzZXRfbm9vcCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGRpZF9yZXNldCA9IHRydWU7XG5cblx0XHRcdGlmIChjYWxsaW5nX29uX2Vycm9yKSB7XG5cdFx0XHRcdGUuc3ZlbHRlX2JvdW5kYXJ5X3Jlc2V0X29uZXJyb3IoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuI2ZhaWxlZF9lZmZlY3QgIT09IG51bGwpIHtcblx0XHRcdFx0cGF1c2VfZWZmZWN0KHRoaXMuI2ZhaWxlZF9lZmZlY3QsICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLiNmYWlsZWRfZWZmZWN0ID0gbnVsbDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuI3J1bigoKSA9PiB7XG5cdFx0XHRcdC8vIElmIHRoZSBmYWlsdXJlIGhhcHBlbmVkIHdoaWxlIGZsdXNoaW5nIGVmZmVjdHMsIGN1cnJlbnRfYmF0Y2ggY2FuIGJlIG51bGxcblx0XHRcdFx0QmF0Y2guZW5zdXJlKCk7XG5cblx0XHRcdFx0dGhpcy4jcmVuZGVyKCk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0LyoqIEBwYXJhbSB7dW5rbm93bn0gdHJhbnNmb3JtZWRfZXJyb3IgKi9cblx0XHRjb25zdCBoYW5kbGVfZXJyb3JfcmVzdWx0ID0gKHRyYW5zZm9ybWVkX2Vycm9yKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjYWxsaW5nX29uX2Vycm9yID0gdHJ1ZTtcblx0XHRcdFx0b25lcnJvcj8uKHRyYW5zZm9ybWVkX2Vycm9yLCByZXNldCk7XG5cdFx0XHRcdGNhbGxpbmdfb25fZXJyb3IgPSBmYWxzZTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGludm9rZV9lcnJvcl9ib3VuZGFyeShlcnJvciwgdGhpcy4jZWZmZWN0ICYmIHRoaXMuI2VmZmVjdC5wYXJlbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmFpbGVkKSB7XG5cdFx0XHRcdHRoaXMuI2ZhaWxlZF9lZmZlY3QgPSB0aGlzLiNydW4oKCkgPT4ge1xuXHRcdFx0XHRcdEJhdGNoLmVuc3VyZSgpO1xuXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHJldHVybiBicmFuY2goKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHQvLyBlcnJvcnMgaW4gYGZhaWxlZGAgc25pcHBldHMgY2F1c2UgdGhlIGJvdW5kYXJ5IHRvIGVycm9yIGFnYWluXG5cdFx0XHRcdFx0XHRcdC8vIFRPRE8gU3ZlbHRlIDY6IHJldmlzaXQgdGhpcyBkZWNpc2lvbiwgbW9zdCBsaWtlbHkgYmV0dGVyIHRvIGdvIHRvIHBhcmVudCBib3VuZGFyeSBpbnN0ZWFkXG5cdFx0XHRcdFx0XHRcdHZhciBlZmZlY3QgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdFx0XHRcdFx0XHRcdGVmZmVjdC5iID0gdGhpcztcblx0XHRcdFx0XHRcdFx0ZWZmZWN0LmYgfD0gQk9VTkRBUllfRUZGRUNUO1xuXG5cdFx0XHRcdFx0XHRcdGZhaWxlZChcblx0XHRcdFx0XHRcdFx0XHR0aGlzLiNhbmNob3IsXG5cdFx0XHRcdFx0XHRcdFx0KCkgPT4gdHJhbnNmb3JtZWRfZXJyb3IsXG5cdFx0XHRcdFx0XHRcdFx0KCkgPT4gcmVzZXRcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRpbnZva2VfZXJyb3JfYm91bmRhcnkoZXJyb3IsIC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAodGhpcy4jZWZmZWN0LnBhcmVudCkpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cXVldWVfbWljcm9fdGFzaygoKSA9PiB7XG5cdFx0XHQvLyBSdW4gdGhlIGVycm9yIHRocm91Z2ggdGhlIEFQSS1sZXZlbCB0cmFuc2Zvcm1FcnJvciB0cmFuc2Zvcm0gKGUuZy4gU3ZlbHRlS2l0J3MgaGFuZGxlRXJyb3IpXG5cdFx0XHQvKiogQHR5cGUge3Vua25vd259ICovXG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmVzdWx0ID0gdGhpcy50cmFuc2Zvcm1fZXJyb3IoZXJyb3IpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRpbnZva2VfZXJyb3JfYm91bmRhcnkoZSwgdGhpcy4jZWZmZWN0ICYmIHRoaXMuI2VmZmVjdC5wYXJlbnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcblx0XHRcdFx0cmVzdWx0ICE9PSBudWxsICYmXG5cdFx0XHRcdHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnICYmXG5cdFx0XHRcdHR5cGVvZiAoLyoqIEB0eXBlIHthbnl9ICovIChyZXN1bHQpLnRoZW4pID09PSAnZnVuY3Rpb24nXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gdHJhbnNmb3JtRXJyb3IgcmV0dXJuZWQgYSBQcm9taXNlIOKAlCB3YWl0IGZvciBpdFxuXHRcdFx0XHQvKiogQHR5cGUge2FueX0gKi8gKHJlc3VsdCkudGhlbihcblx0XHRcdFx0XHRoYW5kbGVfZXJyb3JfcmVzdWx0LFxuXHRcdFx0XHRcdC8qKiBAcGFyYW0ge3Vua25vd259IGUgKi9cblx0XHRcdFx0XHQoZSkgPT4gaW52b2tlX2Vycm9yX2JvdW5kYXJ5KGUsIHRoaXMuI2VmZmVjdCAmJiB0aGlzLiNlZmZlY3QucGFyZW50KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU3luY2hyb25vdXMgcmVzdWx0IOKAlCBoYW5kbGUgaW1tZWRpYXRlbHlcblx0XHRcdFx0aGFuZGxlX2Vycm9yX3Jlc3VsdChyZXN1bHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwZW5kaW5nKCkge1xuXHRpZiAoYWN0aXZlX2VmZmVjdCA9PT0gbnVsbCkge1xuXHRcdGUuZWZmZWN0X3BlbmRpbmdfb3V0c2lkZV9yZWFjdGlvbigpO1xuXHR9XG5cblx0dmFyIGJvdW5kYXJ5ID0gYWN0aXZlX2VmZmVjdC5iO1xuXG5cdGlmIChib3VuZGFyeSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiAwOyAvLyBUT0RPIGV2ZW50dWFsbHkgd2Ugd2lsbCBuZWVkIHRoaXMgdG8gYmUgZ2xvYmFsXG5cdH1cblxuXHRyZXR1cm4gYm91bmRhcnkuZ2V0X2VmZmVjdF9wZW5kaW5nKCk7XG59XG4iLCIvKiogQGltcG9ydCB7IEJsb2NrZXIsIEVmZmVjdCwgVmFsdWUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVTVFJPWUVELCBTVEFMRV9SRUFDVElPTiB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHtcblx0Y29tcG9uZW50X2NvbnRleHQsXG5cdGRldl9zdGFjayxcblx0aXNfcnVuZXMsXG5cdHNldF9jb21wb25lbnRfY29udGV4dCxcblx0c2V0X2Rldl9zdGFja1xufSBmcm9tICcuLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IEJvdW5kYXJ5IH0gZnJvbSAnLi4vZG9tL2Jsb2Nrcy9ib3VuZGFyeS5qcyc7XG5pbXBvcnQgeyBpbnZva2VfZXJyb3JfYm91bmRhcnkgfSBmcm9tICcuLi9lcnJvci1oYW5kbGluZy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdHNldF9hY3RpdmVfZWZmZWN0LFxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uXG59IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgQmF0Y2gsIGN1cnJlbnRfYmF0Y2ggfSBmcm9tICcuL2JhdGNoLmpzJztcbmltcG9ydCB7XG5cdGFzeW5jX2Rlcml2ZWQsXG5cdGN1cnJlbnRfYXN5bmNfZWZmZWN0LFxuXHRkZXJpdmVkLFxuXHRkZXJpdmVkX3NhZmVfZXF1YWwsXG5cdHNldF9mcm9tX2FzeW5jX2Rlcml2ZWRcbn0gZnJvbSAnLi9kZXJpdmVkcy5qcyc7XG5pbXBvcnQgeyBhYm9ydGVkIH0gZnJvbSAnLi9lZmZlY3RzLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0Jsb2NrZXJbXX0gYmxvY2tlcnNcbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gYW55Pn0gc3luY1xuICogQHBhcmFtIHtBcnJheTwoKSA9PiBQcm9taXNlPGFueT4+fSBhc3luY1xuICogQHBhcmFtIHsodmFsdWVzOiBWYWx1ZVtdKSA9PiBhbnl9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGJsb2NrZXJzLCBzeW5jLCBhc3luYywgZm4pIHtcblx0Y29uc3QgZCA9IGlzX3J1bmVzKCkgPyBkZXJpdmVkIDogZGVyaXZlZF9zYWZlX2VxdWFsO1xuXG5cdC8vIEZpbHRlciBvdXQgYWxyZWFkeS1zZXR0bGVkIGJsb2NrZXJzIC0gbm8gbmVlZCB0byB3YWl0IGZvciB0aGVtXG5cdHZhciBwZW5kaW5nID0gYmxvY2tlcnMuZmlsdGVyKChiKSA9PiAhYi5zZXR0bGVkKTtcblxuXHRpZiAoYXN5bmMubGVuZ3RoID09PSAwICYmIHBlbmRpbmcubGVuZ3RoID09PSAwKSB7XG5cdFx0Zm4oc3luYy5tYXAoZCkpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBiYXRjaCA9IGN1cnJlbnRfYmF0Y2g7XG5cdHZhciBwYXJlbnQgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdHZhciByZXN0b3JlID0gY2FwdHVyZSgpO1xuXHR2YXIgYmxvY2tlcl9wcm9taXNlID1cblx0XHRwZW5kaW5nLmxlbmd0aCA9PT0gMVxuXHRcdFx0PyBwZW5kaW5nWzBdLnByb21pc2Vcblx0XHRcdDogcGVuZGluZy5sZW5ndGggPiAxXG5cdFx0XHRcdD8gUHJvbWlzZS5hbGwocGVuZGluZy5tYXAoKGIpID0+IGIucHJvbWlzZSkpXG5cdFx0XHRcdDogbnVsbDtcblxuXHQvKiogQHBhcmFtIHtWYWx1ZVtdfSB2YWx1ZXMgKi9cblx0ZnVuY3Rpb24gZmluaXNoKHZhbHVlcykge1xuXHRcdHJlc3RvcmUoKTtcblxuXHRcdHRyeSB7XG5cdFx0XHRmbih2YWx1ZXMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRpZiAoKHBhcmVudC5mICYgREVTVFJPWUVEKSA9PT0gMCkge1xuXHRcdFx0XHRpbnZva2VfZXJyb3JfYm91bmRhcnkoZXJyb3IsIHBhcmVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dW5zZXRfY29udGV4dCgpO1xuXHR9XG5cblx0Ly8gRmFzdCBwYXRoOiBibG9ja2VycyBidXQgbm8gYXN5bmMgZXhwcmVzc2lvbnNcblx0aWYgKGFzeW5jLmxlbmd0aCA9PT0gMCkge1xuXHRcdC8qKiBAdHlwZSB7UHJvbWlzZTxhbnk+fSAqLyAoYmxvY2tlcl9wcm9taXNlKS50aGVuKCgpID0+IGZpbmlzaChzeW5jLm1hcChkKSkpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEZ1bGwgcGF0aDogaGFzIGFzeW5jIGV4cHJlc3Npb25zXG5cdGZ1bmN0aW9uIHJ1bigpIHtcblx0XHRyZXN0b3JlKCk7XG5cdFx0UHJvbWlzZS5hbGwoYXN5bmMubWFwKChleHByZXNzaW9uKSA9PiBhc3luY19kZXJpdmVkKGV4cHJlc3Npb24pKSlcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IGZpbmlzaChbLi4uc3luYy5tYXAoZCksIC4uLnJlc3VsdF0pKVxuXHRcdFx0LmNhdGNoKChlcnJvcikgPT4gaW52b2tlX2Vycm9yX2JvdW5kYXJ5KGVycm9yLCBwYXJlbnQpKTtcblx0fVxuXG5cdGlmIChibG9ja2VyX3Byb21pc2UpIHtcblx0XHRibG9ja2VyX3Byb21pc2UudGhlbihydW4pO1xuXHR9IGVsc2Uge1xuXHRcdHJ1bigpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtCbG9ja2VyW119IGJsb2NrZXJzXG4gKiBAcGFyYW0geyh2YWx1ZXM6IFZhbHVlW10pID0+IGFueX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bl9hZnRlcl9ibG9ja2VycyhibG9ja2VycywgZm4pIHtcblx0ZmxhdHRlbihibG9ja2VycywgW10sIFtdLCBmbik7XG59XG5cbi8qKlxuICogQ2FwdHVyZXMgdGhlIGN1cnJlbnQgZWZmZWN0IGNvbnRleHQgc28gdGhhdCB3ZSBjYW4gcmVzdG9yZSBpdCBhZnRlclxuICogc29tZSBhc3luY2hyb25vdXMgd29yayBoYXMgaGFwcGVuZWQgKHNvIHRoYXQgZS5nLiBgYXdhaXQgYSArIGJgXG4gKiBjYXVzZXMgYGJgIHRvIGJlIHJlZ2lzdGVyZWQgYXMgYSBkZXBlbmRlbmN5KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmUoKSB7XG5cdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXHR2YXIgcHJldmlvdXNfcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdHZhciBwcmV2aW91c19jb21wb25lbnRfY29udGV4dCA9IGNvbXBvbmVudF9jb250ZXh0O1xuXHR2YXIgcHJldmlvdXNfYmF0Y2ggPSBjdXJyZW50X2JhdGNoO1xuXG5cdGlmIChERVYpIHtcblx0XHR2YXIgcHJldmlvdXNfZGV2X3N0YWNrID0gZGV2X3N0YWNrO1xuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHJlc3RvcmUoYWN0aXZhdGVfYmF0Y2ggPSB0cnVlKSB7XG5cdFx0c2V0X2FjdGl2ZV9lZmZlY3QocHJldmlvdXNfZWZmZWN0KTtcblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHByZXZpb3VzX3JlYWN0aW9uKTtcblx0XHRzZXRfY29tcG9uZW50X2NvbnRleHQocHJldmlvdXNfY29tcG9uZW50X2NvbnRleHQpO1xuXHRcdGlmIChhY3RpdmF0ZV9iYXRjaCkgcHJldmlvdXNfYmF0Y2g/LmFjdGl2YXRlKCk7XG5cblx0XHRpZiAoREVWKSB7XG5cdFx0XHRzZXRfZnJvbV9hc3luY19kZXJpdmVkKG51bGwpO1xuXHRcdFx0c2V0X2Rldl9zdGFjayhwcmV2aW91c19kZXZfc3RhY2spO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBXcmFwcyBhbiBgYXdhaXRgIGV4cHJlc3Npb24gaW4gc3VjaCBhIHdheSB0aGF0IHRoZSBlZmZlY3QgY29udGV4dCB0aGF0IHdhc1xuICogYWN0aXZlIGJlZm9yZSB0aGUgZXhwcmVzc2lvbiBldmFsdWF0ZWQgY2FuIGJlIHJlYXBwbGllZCBhZnRlcndhcmRzIOKAlFxuICogYGF3YWl0IGEgKyBiYCBiZWNvbWVzIGAoYXdhaXQgJC5zYXZlKGEpKSgpICsgYmBcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge1Byb21pc2U8VD59IHByb21pc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPCgpID0+IFQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZShwcm9taXNlKSB7XG5cdHZhciByZXN0b3JlID0gY2FwdHVyZSgpO1xuXHR2YXIgdmFsdWUgPSBhd2FpdCBwcm9taXNlO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0cmVzdG9yZSgpO1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXNldCBgY3VycmVudF9hc3luY19lZmZlY3RgIGFmdGVyIHRoZSBgcHJvbWlzZWAgcmVzb2x2ZXMsIHNvXG4gKiB0aGF0IHdlIGNhbiBlbWl0IGBhd2FpdF9yZWFjdGl2aXR5X2xvc3NgIHdhcm5pbmdzXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtQcm9taXNlPFQ+fSBwcm9taXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTwoKSA9PiBUPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRyYWNrX3JlYWN0aXZpdHlfbG9zcyhwcm9taXNlKSB7XG5cdHZhciBwcmV2aW91c19hc3luY19lZmZlY3QgPSBjdXJyZW50X2FzeW5jX2VmZmVjdDtcblx0dmFyIHZhbHVlID0gYXdhaXQgcHJvbWlzZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdHNldF9mcm9tX2FzeW5jX2Rlcml2ZWQocHJldmlvdXNfYXN5bmNfZWZmZWN0KTtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG59XG5cbi8qKlxuICogVXNlZCBpbiBgZm9yIGF3YWl0YCBsb29wcyBpbiBERVYsIHNvXG4gKiB0aGF0IHdlIGNhbiBlbWl0IGBhd2FpdF9yZWFjdGl2aXR5X2xvc3NgIHdhcm5pbmdzXG4gKiBhZnRlciBlYWNoIGBhc3luY19pdGVyYXRvcmAgcmVzdWx0IHJlc29sdmVzIGFuZFxuICogYWZ0ZXIgdGhlIGBhc3luY19pdGVyYXRvcmAgcmV0dXJuIHJlc29sdmVzIChpZiBpdCBydW5zKVxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSBUUmV0dXJuXG4gKiBAcGFyYW0ge0l0ZXJhYmxlPFQ+IHwgQXN5bmNJdGVyYWJsZTxUPn0gaXRlcmFibGVcbiAqIEByZXR1cm5zIHtBc3luY0dlbmVyYXRvcjxULCBUUmV0dXJuIHwgdW5kZWZpbmVkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uKiBmb3JfYXdhaXRfdHJhY2tfcmVhY3Rpdml0eV9sb3NzKGl0ZXJhYmxlKSB7XG5cdC8vIFRoaXMgaXMgYmFzZWQgb24gdGhlIGFsZ29yaXRobXMgZGVzY3JpYmVkIGluIEVDTUEtMjYyOlxuXHQvLyBGb3JJbi9PZkJvZHlFdmFsdWF0aW9uXG5cdC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyL211bHRpcGFnZS9lY21hc2NyaXB0LWxhbmd1YWdlLXN0YXRlbWVudHMtYW5kLWRlY2xhcmF0aW9ucy5odG1sI3NlYy1ydW50aW1lLXNlbWFudGljcy1mb3Jpbi1kaXYtb2Zib2R5ZXZhbHVhdGlvbi1saHMtc3RtdC1pdGVyYXRvci1saHNraW5kLWxhYmVsc2V0XG5cdC8vIEFzeW5jSXRlcmF0b3JDbG9zZVxuXHQvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi9tdWx0aXBhZ2UvYWJzdHJhY3Qtb3BlcmF0aW9ucy5odG1sI3NlYy1hc3luY2l0ZXJhdG9yY2xvc2VcblxuXHQvKiogQHR5cGUge0FzeW5jSXRlcmF0b3I8VCwgVFJldHVybj59ICovXG5cdC8vIEB0cy1pZ25vcmVcblx0Y29uc3QgaXRlcmF0b3IgPSBpdGVyYWJsZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0/LigpID8/IGl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0/LigpO1xuXG5cdGlmIChpdGVyYXRvciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigndmFsdWUgaXMgbm90IGFzeW5jIGl0ZXJhYmxlJyk7XG5cdH1cblxuXHQvKiogV2hldGhlciB0aGUgY29tcGxldGlvbiBvZiB0aGUgaXRlcmF0b3Igd2FzIFwibm9ybWFsXCIsIG1lYW5pbmcgaXQgd2Fzbid0IGVuZGVkIHZpYSBgYnJlYWtgIG9yIGEgc2ltaWxhciBtZXRob2QgKi9cblx0bGV0IG5vcm1hbF9jb21wbGV0aW9uID0gZmFsc2U7XG5cdHRyeSB7XG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IChhd2FpdCB0cmFja19yZWFjdGl2aXR5X2xvc3MoaXRlcmF0b3IubmV4dCgpKSkoKTtcblx0XHRcdGlmIChkb25lKSB7XG5cdFx0XHRcdG5vcm1hbF9jb21wbGV0aW9uID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHR5aWVsZCB2YWx1ZTtcblx0XHR9XG5cdH0gZmluYWxseSB7XG5cdFx0Ly8gSWYgdGhlIGl0ZXJhdG9yIGhhZCBhIG5vcm1hbCBjb21wbGV0aW9uIGFuZCBgcmV0dXJuYCBpcyBkZWZpbmVkIG9uIHRoZSBpdGVyYXRvciwgY2FsbCBpdCBhbmQgcmV0dXJuIHRoZSB2YWx1ZVxuXHRcdGlmIChub3JtYWxfY29tcGxldGlvbiAmJiBpdGVyYXRvci5yZXR1cm4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuc2FmZS1maW5hbGx5XG5cdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHtUUmV0dXJufSAqLyAoKGF3YWl0IHRyYWNrX3JlYWN0aXZpdHlfbG9zcyhpdGVyYXRvci5yZXR1cm4oKSkpKCkudmFsdWUpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zZXRfY29udGV4dChkZWFjdGl2YXRlX2JhdGNoID0gdHJ1ZSkge1xuXHRzZXRfYWN0aXZlX2VmZmVjdChudWxsKTtcblx0c2V0X2FjdGl2ZV9yZWFjdGlvbihudWxsKTtcblx0c2V0X2NvbXBvbmVudF9jb250ZXh0KG51bGwpO1xuXHRpZiAoZGVhY3RpdmF0ZV9iYXRjaCkgY3VycmVudF9iYXRjaD8uZGVhY3RpdmF0ZSgpO1xuXG5cdGlmIChERVYpIHtcblx0XHRzZXRfZnJvbV9hc3luY19kZXJpdmVkKG51bGwpO1xuXHRcdHNldF9kZXZfc3RhY2sobnVsbCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+Pn0gdGh1bmtzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW4odGh1bmtzKSB7XG5cdGNvbnN0IHJlc3RvcmUgPSBjYXB0dXJlKCk7XG5cblx0Y29uc3QgZGVjcmVtZW50X3BlbmRpbmcgPSBpbmNyZW1lbnRfcGVuZGluZygpO1xuXG5cdHZhciBhY3RpdmUgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdC8qKiBAdHlwZSB7bnVsbCB8IHsgZXJyb3I6IGFueSB9fSAqL1xuXHR2YXIgZXJyb3JlZCA9IG51bGw7XG5cblx0LyoqIEBwYXJhbSB7YW55fSBlcnJvciAqL1xuXHRjb25zdCBoYW5kbGVfZXJyb3IgPSAoZXJyb3IpID0+IHtcblx0XHRlcnJvcmVkID0geyBlcnJvciB9OyAvLyB3cmFwIGluIG9iamVjdCBpbiBjYXNlIGEgcHJvbWlzZSByZWplY3RzIHdpdGggYSBmYWxzeSB2YWx1ZVxuXG5cdFx0aWYgKCFhYm9ydGVkKGFjdGl2ZSkpIHtcblx0XHRcdGludm9rZV9lcnJvcl9ib3VuZGFyeShlcnJvciwgYWN0aXZlKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodGh1bmtzWzBdKCkpLmNhdGNoKGhhbmRsZV9lcnJvcik7XG5cblx0LyoqIEB0eXBlIHtCbG9ja2VyfSAqL1xuXHR2YXIgYmxvY2tlciA9IHsgcHJvbWlzZSwgc2V0dGxlZDogZmFsc2UgfTtcblx0dmFyIGJsb2NrZXJzID0gW2Jsb2NrZXJdO1xuXG5cdHByb21pc2UuZmluYWxseSgoKSA9PiB7XG5cdFx0YmxvY2tlci5zZXR0bGVkID0gdHJ1ZTtcblx0fSk7XG5cblx0Zm9yIChjb25zdCBmbiBvZiB0aHVua3Muc2xpY2UoMSkpIHtcblx0XHRwcm9taXNlID0gcHJvbWlzZVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3JlZCkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yZWQuZXJyb3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWJvcnRlZChhY3RpdmUpKSB7XG5cdFx0XHRcdFx0dGhyb3cgU1RBTEVfUkVBQ1RJT047XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN0b3JlKCk7XG5cdFx0XHRcdHJldHVybiBmbigpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChoYW5kbGVfZXJyb3IpO1xuXG5cdFx0Y29uc3QgYmxvY2tlciA9IHsgcHJvbWlzZSwgc2V0dGxlZDogZmFsc2UgfTtcblx0XHRibG9ja2Vycy5wdXNoKGJsb2NrZXIpO1xuXG5cdFx0cHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRcdGJsb2NrZXIuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHR1bnNldF9jb250ZXh0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcm9taXNlXG5cdFx0Ly8gd2FpdCBvbmUgbW9yZSB0aWNrLCBzbyB0aGF0IHRlbXBsYXRlIGVmZmVjdHMgYXJlXG5cdFx0Ly8gZ3VhcmFudGVlZCB0byBydW4gYmVmb3JlIGAkZWZmZWN0KC4uLilgXG5cdFx0LnRoZW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCkpXG5cdFx0LmZpbmFsbHkoZGVjcmVtZW50X3BlbmRpbmcpO1xuXG5cdHJldHVybiBibG9ja2Vycztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Jsb2NrZXJbXX0gYmxvY2tlcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhaXQoYmxvY2tlcnMpIHtcblx0cmV0dXJuIFByb21pc2UuYWxsKGJsb2NrZXJzLm1hcCgoYikgPT4gYi5wcm9taXNlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmNyZW1lbnRfcGVuZGluZygpIHtcblx0dmFyIGJvdW5kYXJ5ID0gLyoqIEB0eXBlIHtCb3VuZGFyeX0gKi8gKC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkuYik7XG5cdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblx0dmFyIGJsb2NraW5nID0gYm91bmRhcnkuaXNfcmVuZGVyZWQoKTtcblxuXHRib3VuZGFyeS51cGRhdGVfcGVuZGluZ19jb3VudCgxKTtcblx0YmF0Y2guaW5jcmVtZW50KGJsb2NraW5nKTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGJvdW5kYXJ5LnVwZGF0ZV9wZW5kaW5nX2NvdW50KC0xKTtcblx0XHRiYXRjaC5kZWNyZW1lbnQoYmxvY2tpbmcpO1xuXHR9O1xufVxuIiwiLyoqIEBpbXBvcnQgeyBEZXJpdmVkLCBFZmZlY3QsIFNvdXJjZSB9IGZyb20gJyNjbGllbnQnICovXG4vKiogQGltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi9iYXRjaC5qcyc7ICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7XG5cdEVSUk9SX1ZBTFVFLFxuXHRERVJJVkVELFxuXHRESVJUWSxcblx0RUZGRUNUX1BSRVNFUlZFRCxcblx0U1RBTEVfUkVBQ1RJT04sXG5cdEFTWU5DLFxuXHRXQVNfTUFSS0VELFxuXHRERVNUUk9ZRUQsXG5cdENMRUFOXG59IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7XG5cdGFjdGl2ZV9yZWFjdGlvbixcblx0YWN0aXZlX2VmZmVjdCxcblx0dXBkYXRlX3JlYWN0aW9uLFxuXHRpbmNyZW1lbnRfd3JpdGVfdmVyc2lvbixcblx0c2V0X2FjdGl2ZV9lZmZlY3QsXG5cdHB1c2hfcmVhY3Rpb25fdmFsdWUsXG5cdGlzX2Rlc3Ryb3lpbmdfZWZmZWN0LFxuXHR1cGRhdGVfZWZmZWN0LFxuXHRyZW1vdmVfcmVhY3Rpb25zXG59IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgZXF1YWxzLCBzYWZlX2VxdWFscyB9IGZyb20gJy4vZXF1YWxpdHkuanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi9lcnJvcnMuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi93YXJuaW5ncy5qcyc7XG5pbXBvcnQge1xuXHRhc3luY19lZmZlY3QsXG5cdGRlc3Ryb3lfZWZmZWN0LFxuXHRkZXN0cm95X2VmZmVjdF9jaGlsZHJlbixcblx0ZWZmZWN0X3RyYWNraW5nLFxuXHR0ZWFyZG93blxufSBmcm9tICcuL2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgZWFnZXJfZWZmZWN0cywgaW50ZXJuYWxfc2V0LCBzZXRfZWFnZXJfZWZmZWN0cywgc291cmNlIH0gZnJvbSAnLi9zb3VyY2VzLmpzJztcbmltcG9ydCB7IGdldF9lcnJvciB9IGZyb20gJy4uLy4uL3NoYXJlZC9kZXYuanMnO1xuaW1wb3J0IHsgYXN5bmNfbW9kZV9mbGFnLCB0cmFjaW5nX21vZGVfZmxhZyB9IGZyb20gJy4uLy4uL2ZsYWdzL2luZGV4LmpzJztcbmltcG9ydCB7IEJvdW5kYXJ5IH0gZnJvbSAnLi4vZG9tL2Jsb2Nrcy9ib3VuZGFyeS5qcyc7XG5pbXBvcnQgeyBjb21wb25lbnRfY29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgVU5JTklUSUFMSVpFRCB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBiYXRjaF92YWx1ZXMsIGN1cnJlbnRfYmF0Y2ggfSBmcm9tICcuL2JhdGNoLmpzJztcbmltcG9ydCB7IGluY3JlbWVudF9wZW5kaW5nLCB1bnNldF9jb250ZXh0IH0gZnJvbSAnLi9hc3luYy5qcyc7XG5pbXBvcnQgeyBkZWZlcnJlZCwgaW5jbHVkZXMsIG5vb3AgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgc2V0X3NpZ25hbF9zdGF0dXMsIHVwZGF0ZV9kZXJpdmVkX3N0YXR1cyB9IGZyb20gJy4vc3RhdHVzLmpzJztcblxuLyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuZXhwb3J0IGxldCBjdXJyZW50X2FzeW5jX2VmZmVjdCA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge0VmZmVjdCB8IG51bGx9IHYgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZnJvbV9hc3luY19kZXJpdmVkKHYpIHtcblx0Y3VycmVudF9hc3luY19lZmZlY3QgPSB2O1xufVxuXG5leHBvcnQgY29uc3QgcmVjZW50X2FzeW5jX2Rlcml2ZWRzID0gbmV3IFNldCgpO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0geygpID0+IFZ9IGZuXG4gKiBAcmV0dXJucyB7RGVyaXZlZDxWPn1cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gZGVyaXZlZChmbikge1xuXHR2YXIgZmxhZ3MgPSBERVJJVkVEIHwgRElSVFk7XG5cdHZhciBwYXJlbnRfZGVyaXZlZCA9XG5cdFx0YWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmIChhY3RpdmVfcmVhY3Rpb24uZiAmIERFUklWRUQpICE9PSAwXG5cdFx0XHQ/IC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGFjdGl2ZV9yZWFjdGlvbilcblx0XHRcdDogbnVsbDtcblxuXHRpZiAoYWN0aXZlX2VmZmVjdCAhPT0gbnVsbCkge1xuXHRcdC8vIFNpbmNlIGRlcml2ZWRzIGFyZSBldmFsdWF0ZWQgbGF6aWx5LCBhbnkgZWZmZWN0cyBjcmVhdGVkIGluc2lkZSB0aGVtIGFyZVxuXHRcdC8vIGNyZWF0ZWQgdG9vIGxhdGUgdG8gZW5zdXJlIHRoYXQgdGhlIHBhcmVudCBlZmZlY3QgaXMgYWRkZWQgdG8gdGhlIHRyZWVcblx0XHRhY3RpdmVfZWZmZWN0LmYgfD0gRUZGRUNUX1BSRVNFUlZFRDtcblx0fVxuXG5cdC8qKiBAdHlwZSB7RGVyaXZlZDxWPn0gKi9cblx0Y29uc3Qgc2lnbmFsID0ge1xuXHRcdGN0eDogY29tcG9uZW50X2NvbnRleHQsXG5cdFx0ZGVwczogbnVsbCxcblx0XHRlZmZlY3RzOiBudWxsLFxuXHRcdGVxdWFscyxcblx0XHRmOiBmbGFncyxcblx0XHRmbixcblx0XHRyZWFjdGlvbnM6IG51bGwsXG5cdFx0cnY6IDAsXG5cdFx0djogLyoqIEB0eXBlIHtWfSAqLyAoVU5JTklUSUFMSVpFRCksXG5cdFx0d3Y6IDAsXG5cdFx0cGFyZW50OiBwYXJlbnRfZGVyaXZlZCA/PyBhY3RpdmVfZWZmZWN0LFxuXHRcdGFjOiBudWxsXG5cdH07XG5cblx0aWYgKERFViAmJiB0cmFjaW5nX21vZGVfZmxhZykge1xuXHRcdHNpZ25hbC5jcmVhdGVkID0gZ2V0X2Vycm9yKCdjcmVhdGVkIGF0Jyk7XG5cdH1cblxuXHRyZXR1cm4gc2lnbmFsO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0geygpID0+IFYgfCBQcm9taXNlPFY+fSBmblxuICogQHBhcmFtIHtzdHJpbmd9IFtsYWJlbF1cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbG9jYXRpb25dIElmIHByb3ZpZGVkLCBwcmludCBhIHdhcm5pbmcgaWYgdGhlIHZhbHVlIGlzIG5vdCByZWFkIGltbWVkaWF0ZWx5IGFmdGVyIHVwZGF0ZVxuICogQHJldHVybnMge1Byb21pc2U8U291cmNlPFY+Pn1cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gYXN5bmNfZGVyaXZlZChmbiwgbGFiZWwsIGxvY2F0aW9uKSB7XG5cdGxldCBwYXJlbnQgPSAvKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovIChhY3RpdmVfZWZmZWN0KTtcblxuXHRpZiAocGFyZW50ID09PSBudWxsKSB7XG5cdFx0ZS5hc3luY19kZXJpdmVkX29ycGhhbigpO1xuXHR9XG5cblx0dmFyIHByb21pc2UgPSAvKiogQHR5cGUge1Byb21pc2U8Vj59ICovICgvKiogQHR5cGUge3Vua25vd259ICovICh1bmRlZmluZWQpKTtcblx0dmFyIHNpZ25hbCA9IHNvdXJjZSgvKiogQHR5cGUge1Z9ICovIChVTklOSVRJQUxJWkVEKSk7XG5cblx0aWYgKERFVikgc2lnbmFsLmxhYmVsID0gbGFiZWw7XG5cblx0Ly8gb25seSBzdXNwZW5kIGluIGFzeW5jIGRlcml2ZWRzIGNyZWF0ZWQgb24gaW5pdGlhbGlzYXRpb25cblx0dmFyIHNob3VsZF9zdXNwZW5kID0gIWFjdGl2ZV9yZWFjdGlvbjtcblxuXHQvKiogQHR5cGUge01hcDxCYXRjaCwgUmV0dXJuVHlwZTx0eXBlb2YgZGVmZXJyZWQ8Vj4+Pn0gKi9cblx0dmFyIGRlZmVycmVkcyA9IG5ldyBNYXAoKTtcblxuXHRhc3luY19lZmZlY3QoKCkgPT4ge1xuXHRcdGlmIChERVYpIGN1cnJlbnRfYXN5bmNfZWZmZWN0ID0gYWN0aXZlX2VmZmVjdDtcblxuXHRcdC8qKiBAdHlwZSB7UmV0dXJuVHlwZTx0eXBlb2YgZGVmZXJyZWQ8Vj4+fSAqL1xuXHRcdHZhciBkID0gZGVmZXJyZWQoKTtcblx0XHRwcm9taXNlID0gZC5wcm9taXNlO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIElmIHRoaXMgY29kZSBpcyBjaGFuZ2VkIGF0IHNvbWUgcG9pbnQsIG1ha2Ugc3VyZSB0byBzdGlsbCBhY2Nlc3MgdGhlIHRoZW4gcHJvcGVydHlcblx0XHRcdC8vIG9mIGZuKCkgdG8gcmVhZCBhbnkgc2lnbmFscyBpdCBtaWdodCBhY2Nlc3MsIHNvIHRoYXQgd2UgdHJhY2sgdGhlbSBhcyBkZXBlbmRlbmNpZXMuXG5cdFx0XHQvLyBXZSBjYWxsIGB1bnNldF9jb250ZXh0YCB0byB1bmRvIGFueSBgc2F2ZWAgY2FsbHMgdGhhdCBoYXBwZW4gaW5zaWRlIGBmbigpYFxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKGZuKCkpLnRoZW4oZC5yZXNvbHZlLCBkLnJlamVjdCkuZmluYWxseSh1bnNldF9jb250ZXh0KTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0ZC5yZWplY3QoZXJyb3IpO1xuXHRcdFx0dW5zZXRfY29udGV4dCgpO1xuXHRcdH1cblxuXHRcdGlmIChERVYpIGN1cnJlbnRfYXN5bmNfZWZmZWN0ID0gbnVsbDtcblxuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblxuXHRcdGlmIChzaG91bGRfc3VzcGVuZCkge1xuXHRcdFx0dmFyIGRlY3JlbWVudF9wZW5kaW5nID0gaW5jcmVtZW50X3BlbmRpbmcoKTtcblxuXHRcdFx0ZGVmZXJyZWRzLmdldChiYXRjaCk/LnJlamVjdChTVEFMRV9SRUFDVElPTik7XG5cdFx0XHRkZWZlcnJlZHMuZGVsZXRlKGJhdGNoKTsgLy8gZGVsZXRlIHRvIGVuc3VyZSBjb3JyZWN0IG9yZGVyIGluIE1hcCBpdGVyYXRpb24gYmVsb3dcblx0XHRcdGRlZmVycmVkcy5zZXQoYmF0Y2gsIGQpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuXHRcdCAqIEBwYXJhbSB7dW5rbm93bn0gZXJyb3Jcblx0XHQgKi9cblx0XHRjb25zdCBoYW5kbGVyID0gKHZhbHVlLCBlcnJvciA9IHVuZGVmaW5lZCkgPT4ge1xuXHRcdFx0Y3VycmVudF9hc3luY19lZmZlY3QgPSBudWxsO1xuXG5cdFx0XHRiYXRjaC5hY3RpdmF0ZSgpO1xuXG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0aWYgKGVycm9yICE9PSBTVEFMRV9SRUFDVElPTikge1xuXHRcdFx0XHRcdHNpZ25hbC5mIHw9IEVSUk9SX1ZBTFVFO1xuXG5cdFx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciB0aGUgZXJyb3IgaXMgdGhlIHdyb25nIHR5cGUsIGJ1dCB3ZSBkb24ndCBjYXJlXG5cdFx0XHRcdFx0aW50ZXJuYWxfc2V0KHNpZ25hbCwgZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoKHNpZ25hbC5mICYgRVJST1JfVkFMVUUpICE9PSAwKSB7XG5cdFx0XHRcdFx0c2lnbmFsLmYgXj0gRVJST1JfVkFMVUU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbnRlcm5hbF9zZXQoc2lnbmFsLCB2YWx1ZSk7XG5cblx0XHRcdFx0Ly8gQWxsIHByaW9yIGFzeW5jIGRlcml2ZWQgcnVucyBhcmUgbm93IHN0YWxlXG5cdFx0XHRcdGZvciAoY29uc3QgW2IsIGRdIG9mIGRlZmVycmVkcykge1xuXHRcdFx0XHRcdGRlZmVycmVkcy5kZWxldGUoYik7XG5cdFx0XHRcdFx0aWYgKGIgPT09IGJhdGNoKSBicmVhaztcblx0XHRcdFx0XHRkLnJlamVjdChTVEFMRV9SRUFDVElPTik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoREVWICYmIGxvY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZWNlbnRfYXN5bmNfZGVyaXZlZHMuYWRkKHNpZ25hbCk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdGlmIChyZWNlbnRfYXN5bmNfZGVyaXZlZHMuaGFzKHNpZ25hbCkpIHtcblx0XHRcdFx0XHRcdFx0dy5hd2FpdF93YXRlcmZhbGwoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChzaWduYWwubGFiZWwpLCBsb2NhdGlvbik7XG5cdFx0XHRcdFx0XHRcdHJlY2VudF9hc3luY19kZXJpdmVkcy5kZWxldGUoc2lnbmFsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGVjcmVtZW50X3BlbmRpbmcpIHtcblx0XHRcdFx0ZGVjcmVtZW50X3BlbmRpbmcoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZC5wcm9taXNlLnRoZW4oaGFuZGxlciwgKGUpID0+IGhhbmRsZXIobnVsbCwgZSB8fCAndW5rbm93bicpKTtcblx0fSk7XG5cblx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdGZvciAoY29uc3QgZCBvZiBkZWZlcnJlZHMudmFsdWVzKCkpIHtcblx0XHRcdGQucmVqZWN0KFNUQUxFX1JFQUNUSU9OKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChERVYpIHtcblx0XHQvLyBhZGQgYSBmbGFnIHRoYXQgbGV0cyB0aGlzIGJlIHByaW50ZWQgYXMgYSBkZXJpdmVkXG5cdFx0Ly8gd2hlbiB1c2luZyBgJGluc3BlY3QudHJhY2UoKWBcblx0XHRzaWduYWwuZiB8PSBBU1lOQztcblx0fVxuXG5cdHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsKSA9PiB7XG5cdFx0LyoqIEBwYXJhbSB7UHJvbWlzZTxWPn0gcCAqL1xuXHRcdGZ1bmN0aW9uIG5leHQocCkge1xuXHRcdFx0ZnVuY3Rpb24gZ28oKSB7XG5cdFx0XHRcdGlmIChwID09PSBwcm9taXNlKSB7XG5cdFx0XHRcdFx0ZnVsZmlsKHNpZ25hbCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGVmZmVjdCByZS1ydW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBwcm9taXNlXG5cdFx0XHRcdFx0Ly8gcmVzb2x2ZXMsIGRlbGF5IHJlc29sdXRpb24gdW50aWwgd2UgaGF2ZSBhIHZhbHVlXG5cdFx0XHRcdFx0bmV4dChwcm9taXNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRwLnRoZW4oZ28sIGdvKTtcblx0XHR9XG5cblx0XHRuZXh0KHByb21pc2UpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHsoKSA9PiBWfSBmblxuICogQHJldHVybnMge0Rlcml2ZWQ8Vj59XG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZXJfZGVyaXZlZChmbikge1xuXHRjb25zdCBkID0gZGVyaXZlZChmbik7XG5cblx0aWYgKCFhc3luY19tb2RlX2ZsYWcpIHB1c2hfcmVhY3Rpb25fdmFsdWUoZCk7XG5cblx0cmV0dXJuIGQ7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7KCkgPT4gVn0gZm5cbiAqIEByZXR1cm5zIHtEZXJpdmVkPFY+fVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXJpdmVkX3NhZmVfZXF1YWwoZm4pIHtcblx0Y29uc3Qgc2lnbmFsID0gZGVyaXZlZChmbik7XG5cdHNpZ25hbC5lcXVhbHMgPSBzYWZlX2VxdWFscztcblx0cmV0dXJuIHNpZ25hbDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveV9kZXJpdmVkX2VmZmVjdHMoZGVyaXZlZCkge1xuXHR2YXIgZWZmZWN0cyA9IGRlcml2ZWQuZWZmZWN0cztcblxuXHRpZiAoZWZmZWN0cyAhPT0gbnVsbCkge1xuXHRcdGRlcml2ZWQuZWZmZWN0cyA9IG51bGw7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVmZmVjdHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0KC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoZWZmZWN0c1tpXSkpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgdXBkYXRpbmcgZGVyaXZlZHMsIHVzZWQgdG8gZGV0ZWN0IGluZmluaXRlIHJlY3Vyc2lvblxuICogaW4gZGV2IG1vZGUgYW5kIHByb3ZpZGUgYSBuaWNlciBlcnJvciB0aGFuICd0b28gbXVjaCByZWN1cnNpb24nXG4gKiBAdHlwZSB7RGVyaXZlZFtdfVxuICovXG5sZXQgc3RhY2sgPSBbXTtcblxuLyoqXG4gKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWRcbiAqIEByZXR1cm5zIHtFZmZlY3QgfCBudWxsfVxuICovXG5mdW5jdGlvbiBnZXRfZGVyaXZlZF9wYXJlbnRfZWZmZWN0KGRlcml2ZWQpIHtcblx0dmFyIHBhcmVudCA9IGRlcml2ZWQucGFyZW50O1xuXHR3aGlsZSAocGFyZW50ICE9PSBudWxsKSB7XG5cdFx0aWYgKChwYXJlbnQuZiAmIERFUklWRUQpID09PSAwKSB7XG5cdFx0XHQvLyBUaGUgb3JpZ2luYWwgcGFyZW50IGVmZmVjdCBtaWdodCd2ZSBiZWVuIGRlc3Ryb3llZCBidXQgdGhlIGRlcml2ZWRcblx0XHRcdC8vIGlzIHVzZWQgZWxzZXdoZXJlIG5vdyAtIGRvIG5vdCByZXR1cm4gdGhlIGRlc3Ryb3llZCBlZmZlY3QgaW4gdGhhdCBjYXNlXG5cdFx0XHRyZXR1cm4gKHBhcmVudC5mICYgREVTVFJPWUVEKSA9PT0gMCA/IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAocGFyZW50KSA6IG51bGw7XG5cdFx0fVxuXHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7RGVyaXZlZH0gZGVyaXZlZFxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlX2Rlcml2ZWQoZGVyaXZlZCkge1xuXHR2YXIgdmFsdWU7XG5cdHZhciBwcmV2X2FjdGl2ZV9lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXG5cdHNldF9hY3RpdmVfZWZmZWN0KGdldF9kZXJpdmVkX3BhcmVudF9lZmZlY3QoZGVyaXZlZCkpO1xuXG5cdGlmIChERVYpIHtcblx0XHRsZXQgcHJldl9lYWdlcl9lZmZlY3RzID0gZWFnZXJfZWZmZWN0cztcblx0XHRzZXRfZWFnZXJfZWZmZWN0cyhuZXcgU2V0KCkpO1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoaW5jbHVkZXMuY2FsbChzdGFjaywgZGVyaXZlZCkpIHtcblx0XHRcdFx0ZS5kZXJpdmVkX3JlZmVyZW5jZXNfc2VsZigpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdGFjay5wdXNoKGRlcml2ZWQpO1xuXG5cdFx0XHRkZXJpdmVkLmYgJj0gfldBU19NQVJLRUQ7XG5cdFx0XHRkZXN0cm95X2Rlcml2ZWRfZWZmZWN0cyhkZXJpdmVkKTtcblx0XHRcdHZhbHVlID0gdXBkYXRlX3JlYWN0aW9uKGRlcml2ZWQpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2X2FjdGl2ZV9lZmZlY3QpO1xuXHRcdFx0c2V0X2VhZ2VyX2VmZmVjdHMocHJldl9lYWdlcl9lZmZlY3RzKTtcblx0XHRcdHN0YWNrLnBvcCgpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0cnkge1xuXHRcdFx0ZGVyaXZlZC5mICY9IH5XQVNfTUFSS0VEO1xuXHRcdFx0ZGVzdHJveV9kZXJpdmVkX2VmZmVjdHMoZGVyaXZlZCk7XG5cdFx0XHR2YWx1ZSA9IHVwZGF0ZV9yZWFjdGlvbihkZXJpdmVkKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0c2V0X2FjdGl2ZV9lZmZlY3QocHJldl9hY3RpdmVfZWZmZWN0KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHtEZXJpdmVkfSBkZXJpdmVkXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9kZXJpdmVkKGRlcml2ZWQpIHtcblx0dmFyIHZhbHVlID0gZXhlY3V0ZV9kZXJpdmVkKGRlcml2ZWQpO1xuXG5cdGlmICghZGVyaXZlZC5lcXVhbHModmFsdWUpKSB7XG5cdFx0ZGVyaXZlZC53diA9IGluY3JlbWVudF93cml0ZV92ZXJzaW9uKCk7XG5cblx0XHQvLyBpbiBhIGZvcmssIHdlIGRvbid0IHVwZGF0ZSB0aGUgdW5kZXJseWluZyB2YWx1ZSwganVzdCBgYmF0Y2hfdmFsdWVzYC5cblx0XHQvLyB0aGUgdW5kZXJseWluZyB2YWx1ZSB3aWxsIGJlIHVwZGF0ZWQgd2hlbiB0aGUgZm9yayBpcyBjb21taXR0ZWQuXG5cdFx0Ly8gb3RoZXJ3aXNlLCB0aGUgbmV4dCB0aW1lIHdlIGdldCBoZXJlIGFmdGVyIGEgJ3JlYWwgd29ybGQnIHN0YXRlXG5cdFx0Ly8gY2hhbmdlLCBgZGVyaXZlZC5lcXVhbHNgIG1heSBpbmNvcnJlY3RseSByZXR1cm4gYHRydWVgXG5cdFx0aWYgKCFjdXJyZW50X2JhdGNoPy5pc19mb3JrIHx8IGRlcml2ZWQuZGVwcyA9PT0gbnVsbCkge1xuXHRcdFx0ZGVyaXZlZC52ID0gdmFsdWU7XG5cblx0XHRcdC8vIGRlcml2ZWRzIHdpdGhvdXQgZGVwZW5kZW5jaWVzIHNob3VsZCBuZXZlciBiZSByZWNvbXB1dGVkXG5cdFx0XHRpZiAoZGVyaXZlZC5kZXBzID09PSBudWxsKSB7XG5cdFx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGRlcml2ZWQsIENMRUFOKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIGRvbid0IG1hcmsgZGVyaXZlZCBjbGVhbiBpZiB3ZSdyZSByZWFkaW5nIGl0IGluc2lkZSBhXG5cdC8vIGNsZWFudXAgZnVuY3Rpb24sIG9yIGl0IHdpbGwgY2FjaGUgYSBzdGFsZSB2YWx1ZVxuXHRpZiAoaXNfZGVzdHJveWluZ19lZmZlY3QpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBEdXJpbmcgdGltZSB0cmF2ZWxpbmcgd2UgZG9uJ3Qgd2FudCB0byByZXNldCB0aGUgc3RhdHVzIHNvIHRoYXRcblx0Ly8gdHJhdmVyc2FsIG9mIHRoZSBncmFwaCBpbiB0aGUgb3RoZXIgYmF0Y2hlcyBzdGlsbCBoYXBwZW5zXG5cdGlmIChiYXRjaF92YWx1ZXMgIT09IG51bGwpIHtcblx0XHQvLyBvbmx5IGNhY2hlIHRoZSB2YWx1ZSBpZiB3ZSdyZSBpbiBhIHRyYWNraW5nIGNvbnRleHQsIG90aGVyd2lzZSB3ZSB3b24ndFxuXHRcdC8vIGNsZWFyIHRoZSBjYWNoZSBpbiBgbWFya19yZWFjdGlvbnNgIHdoZW4gZGVwZW5kZW5jaWVzIGFyZSB1cGRhdGVkXG5cdFx0aWYgKGVmZmVjdF90cmFja2luZygpIHx8IGN1cnJlbnRfYmF0Y2g/LmlzX2ZvcmspIHtcblx0XHRcdGJhdGNoX3ZhbHVlcy5zZXQoZGVyaXZlZCwgdmFsdWUpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR1cGRhdGVfZGVyaXZlZF9zdGF0dXMoZGVyaXZlZCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Rlcml2ZWR9IGRlcml2ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZV9kZXJpdmVkX2VmZmVjdHMoZGVyaXZlZCkge1xuXHRpZiAoZGVyaXZlZC5lZmZlY3RzID09PSBudWxsKSByZXR1cm47XG5cblx0Zm9yIChjb25zdCBlIG9mIGRlcml2ZWQuZWZmZWN0cykge1xuXHRcdC8vIGlmIHRoZSBlZmZlY3QgaGFzIGEgdGVhcmRvd24gZnVuY3Rpb24gb3IgYWJvcnQgc2lnbmFsLCBjYWxsIGl0XG5cdFx0aWYgKGUudGVhcmRvd24gfHwgZS5hYykge1xuXHRcdFx0ZS50ZWFyZG93bj8uKCk7XG5cdFx0XHRlLmFjPy5hYm9ydChTVEFMRV9SRUFDVElPTik7XG5cblx0XHRcdC8vIG1ha2UgaXQgYSBub29wIHNvIGl0IGRvZXNuJ3QgZ2V0IGNhbGxlZCBhZ2FpbiBpZiB0aGUgZGVyaXZlZFxuXHRcdFx0Ly8gaXMgdW5mcm96ZW4uIHdlIGRvbid0IHNldCBpdCB0byBgbnVsbGAsIGJlY2F1c2UgdGhlIGV4aXN0ZW5jZVxuXHRcdFx0Ly8gb2YgYSB0ZWFyZG93biBmdW5jdGlvbiBpcyB3aGF0IGRldGVybWluZXMgd2hldGhlciB0aGVcblx0XHRcdC8vIGVmZmVjdCBydW5zIGFnYWluIGR1cmluZyB1bmZyZWV6aW5nXG5cdFx0XHRlLnRlYXJkb3duID0gbm9vcDtcblx0XHRcdGUuYWMgPSBudWxsO1xuXG5cdFx0XHRyZW1vdmVfcmVhY3Rpb25zKGUsIDApO1xuXHRcdFx0ZGVzdHJveV9lZmZlY3RfY2hpbGRyZW4oZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtEZXJpdmVkfSBkZXJpdmVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmZyZWV6ZV9kZXJpdmVkX2VmZmVjdHMoZGVyaXZlZCkge1xuXHRpZiAoZGVyaXZlZC5lZmZlY3RzID09PSBudWxsKSByZXR1cm47XG5cblx0Zm9yIChjb25zdCBlIG9mIGRlcml2ZWQuZWZmZWN0cykge1xuXHRcdC8vIGlmIHRoZSBlZmZlY3Qgd2FzIHByZXZpb3VzbHkgZnJvemVuIOKAlCBpbmRpY2F0ZWQgYnkgdGhlIHByZXNlbmNlXG5cdFx0Ly8gb2YgYSB0ZWFyZG93biBmdW5jdGlvbiDigJQgdW5mcmVlemUgaXRcblx0XHRpZiAoZS50ZWFyZG93bikge1xuXHRcdFx0dXBkYXRlX2VmZmVjdChlKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRGVyaXZlZCwgRWZmZWN0LCBTb3VyY2UsIFZhbHVlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHtcblx0YWN0aXZlX3JlYWN0aW9uLFxuXHRhY3RpdmVfZWZmZWN0LFxuXHR1bnRyYWNrZWRfd3JpdGVzLFxuXHRnZXQsXG5cdHNldF91bnRyYWNrZWRfd3JpdGVzLFxuXHR1bnRyYWNrLFxuXHRpbmNyZW1lbnRfd3JpdGVfdmVyc2lvbixcblx0dXBkYXRlX2VmZmVjdCxcblx0Y3VycmVudF9zb3VyY2VzLFxuXHRpc19kaXJ0eSxcblx0dW50cmFja2luZyxcblx0aXNfZGVzdHJveWluZ19lZmZlY3QsXG5cdHB1c2hfcmVhY3Rpb25fdmFsdWVcbn0gZnJvbSAnLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBlcXVhbHMsIHNhZmVfZXF1YWxzIH0gZnJvbSAnLi9lcXVhbGl0eS5qcyc7XG5pbXBvcnQge1xuXHRDTEVBTixcblx0REVSSVZFRCxcblx0RElSVFksXG5cdEJSQU5DSF9FRkZFQ1QsXG5cdEVBR0VSX0VGRkVDVCxcblx0TUFZQkVfRElSVFksXG5cdEJMT0NLX0VGRkVDVCxcblx0Uk9PVF9FRkZFQ1QsXG5cdEFTWU5DLFxuXHRXQVNfTUFSS0VELFxuXHRDT05ORUNURURcbn0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgbGVnYWN5X21vZGVfZmxhZywgdHJhY2luZ19tb2RlX2ZsYWcgfSBmcm9tICcuLi8uLi9mbGFncy9pbmRleC5qcyc7XG5pbXBvcnQgeyBpbmNsdWRlcyB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyB0YWdfcHJveHkgfSBmcm9tICcuLi9kZXYvdHJhY2luZy5qcyc7XG5pbXBvcnQgeyBnZXRfZXJyb3IgfSBmcm9tICcuLi8uLi9zaGFyZWQvZGV2LmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9jb250ZXh0LCBpc19ydW5lcyB9IGZyb20gJy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgQmF0Y2gsIGJhdGNoX3ZhbHVlcywgZWFnZXJfYmxvY2tfZWZmZWN0cywgc2NoZWR1bGVfZWZmZWN0IH0gZnJvbSAnLi9iYXRjaC5qcyc7XG5pbXBvcnQgeyBwcm94eSB9IGZyb20gJy4uL3Byb3h5LmpzJztcbmltcG9ydCB7IGV4ZWN1dGVfZGVyaXZlZCB9IGZyb20gJy4vZGVyaXZlZHMuanMnO1xuaW1wb3J0IHsgc2V0X3NpZ25hbF9zdGF0dXMsIHVwZGF0ZV9kZXJpdmVkX3N0YXR1cyB9IGZyb20gJy4vc3RhdHVzLmpzJztcblxuLyoqIEB0eXBlIHtTZXQ8YW55Pn0gKi9cbmV4cG9ydCBsZXQgZWFnZXJfZWZmZWN0cyA9IG5ldyBTZXQoKTtcblxuLyoqIEB0eXBlIHtNYXA8U291cmNlLCBhbnk+fSAqL1xuZXhwb3J0IGNvbnN0IG9sZF92YWx1ZXMgPSBuZXcgTWFwKCk7XG5cbi8qKlxuICogQHBhcmFtIHtTZXQ8YW55Pn0gdlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2VhZ2VyX2VmZmVjdHModikge1xuXHRlYWdlcl9lZmZlY3RzID0gdjtcbn1cblxubGV0IGVhZ2VyX2VmZmVjdHNfZGVmZXJyZWQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9lYWdlcl9lZmZlY3RzX2RlZmVycmVkKCkge1xuXHRlYWdlcl9lZmZlY3RzX2RlZmVycmVkID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtWfSB2XG4gKiBAcGFyYW0ge0Vycm9yIHwgbnVsbH0gW3N0YWNrXVxuICogQHJldHVybnMge1NvdXJjZTxWPn1cbiAqL1xuLy8gVE9ETyByZW5hbWUgdGhpcyB0byBgc3RhdGVgIHRocm91Z2hvdXQgdGhlIGNvZGViYXNlXG5leHBvcnQgZnVuY3Rpb24gc291cmNlKHYsIHN0YWNrKSB7XG5cdC8qKiBAdHlwZSB7VmFsdWV9ICovXG5cdHZhciBzaWduYWwgPSB7XG5cdFx0ZjogMCwgLy8gVE9ETyBpZGVhbGx5IHdlIGNvdWxkIHNraXAgdGhpcyBhbHRvZ2V0aGVyLCBidXQgaXQgY2F1c2VzIHR5cGUgZXJyb3JzXG5cdFx0dixcblx0XHRyZWFjdGlvbnM6IG51bGwsXG5cdFx0ZXF1YWxzLFxuXHRcdHJ2OiAwLFxuXHRcdHd2OiAwXG5cdH07XG5cblx0aWYgKERFViAmJiB0cmFjaW5nX21vZGVfZmxhZykge1xuXHRcdHNpZ25hbC5jcmVhdGVkID0gc3RhY2sgPz8gZ2V0X2Vycm9yKCdjcmVhdGVkIGF0Jyk7XG5cdFx0c2lnbmFsLnVwZGF0ZWQgPSBudWxsO1xuXHRcdHNpZ25hbC5zZXRfZHVyaW5nX2VmZmVjdCA9IGZhbHNlO1xuXHRcdHNpZ25hbC50cmFjZSA9IG51bGw7XG5cdH1cblxuXHRyZXR1cm4gc2lnbmFsO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1Z9IHZcbiAqIEBwYXJhbSB7RXJyb3IgfCBudWxsfSBbc3RhY2tdXG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlKHYsIHN0YWNrKSB7XG5cdGNvbnN0IHMgPSBzb3VyY2Uodiwgc3RhY2spO1xuXG5cdHB1c2hfcmVhY3Rpb25fdmFsdWUocyk7XG5cblx0cmV0dXJuIHM7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7Vn0gaW5pdGlhbF92YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBbaW1tdXRhYmxlXVxuICogQHJldHVybnMge1NvdXJjZTxWPn1cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gbXV0YWJsZV9zb3VyY2UoaW5pdGlhbF92YWx1ZSwgaW1tdXRhYmxlID0gZmFsc2UsIHRyYWNrYWJsZSA9IHRydWUpIHtcblx0Y29uc3QgcyA9IHNvdXJjZShpbml0aWFsX3ZhbHVlKTtcblx0aWYgKCFpbW11dGFibGUpIHtcblx0XHRzLmVxdWFscyA9IHNhZmVfZXF1YWxzO1xuXHR9XG5cblx0Ly8gYmluZCB0aGUgc2lnbmFsIHRvIHRoZSBjb21wb25lbnQgY29udGV4dCwgaW4gY2FzZSB3ZSBuZWVkIHRvXG5cdC8vIHRyYWNrIHVwZGF0ZXMgdG8gdHJpZ2dlciBiZWZvcmVVcGRhdGUvYWZ0ZXJVcGRhdGUgY2FsbGJhY2tzXG5cdGlmIChsZWdhY3lfbW9kZV9mbGFnICYmIHRyYWNrYWJsZSAmJiBjb21wb25lbnRfY29udGV4dCAhPT0gbnVsbCAmJiBjb21wb25lbnRfY29udGV4dC5sICE9PSBudWxsKSB7XG5cdFx0KGNvbXBvbmVudF9jb250ZXh0LmwucyA/Pz0gW10pLnB1c2gocyk7XG5cdH1cblxuXHRyZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtWYWx1ZTxWPn0gc291cmNlXG4gKiBAcGFyYW0ge1Z9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdXRhdGUoc291cmNlLCB2YWx1ZSkge1xuXHRzZXQoXG5cdFx0c291cmNlLFxuXHRcdHVudHJhY2soKCkgPT4gZ2V0KHNvdXJjZSkpXG5cdCk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtTb3VyY2U8Vj59IHNvdXJjZVxuICogQHBhcmFtIHtWfSB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBbc2hvdWxkX3Byb3h5XVxuICogQHJldHVybnMge1Z9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXQoc291cmNlLCB2YWx1ZSwgc2hvdWxkX3Byb3h5ID0gZmFsc2UpIHtcblx0aWYgKFxuXHRcdGFjdGl2ZV9yZWFjdGlvbiAhPT0gbnVsbCAmJlxuXHRcdC8vIHNpbmNlIHdlIGFyZSB1bnRyYWNraW5nIHRoZSBmdW5jdGlvbiBpbnNpZGUgYCRpbnNwZWN0LndpdGhgIHdlIG5lZWQgdG8gYWRkIHRoaXMgY2hlY2tcblx0XHQvLyB0byBlbnN1cmUgd2UgZXJyb3IgaWYgc3RhdGUgaXMgc2V0IGluc2lkZSBhbiBpbnNwZWN0IGVmZmVjdFxuXHRcdCghdW50cmFja2luZyB8fCAoYWN0aXZlX3JlYWN0aW9uLmYgJiBFQUdFUl9FRkZFQ1QpICE9PSAwKSAmJlxuXHRcdGlzX3J1bmVzKCkgJiZcblx0XHQoYWN0aXZlX3JlYWN0aW9uLmYgJiAoREVSSVZFRCB8IEJMT0NLX0VGRkVDVCB8IEFTWU5DIHwgRUFHRVJfRUZGRUNUKSkgIT09IDAgJiZcblx0XHQoY3VycmVudF9zb3VyY2VzID09PSBudWxsIHx8ICFpbmNsdWRlcy5jYWxsKGN1cnJlbnRfc291cmNlcywgc291cmNlKSlcblx0KSB7XG5cdFx0ZS5zdGF0ZV91bnNhZmVfbXV0YXRpb24oKTtcblx0fVxuXG5cdGxldCBuZXdfdmFsdWUgPSBzaG91bGRfcHJveHkgPyBwcm94eSh2YWx1ZSkgOiB2YWx1ZTtcblxuXHRpZiAoREVWKSB7XG5cdFx0dGFnX3Byb3h5KG5ld192YWx1ZSwgLyoqIEB0eXBlIHtzdHJpbmd9ICovIChzb3VyY2UubGFiZWwpKTtcblx0fVxuXG5cdHJldHVybiBpbnRlcm5hbF9zZXQoc291cmNlLCBuZXdfdmFsdWUpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1NvdXJjZTxWPn0gc291cmNlXG4gKiBAcGFyYW0ge1Z9IHZhbHVlXG4gKiBAcmV0dXJucyB7Vn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVybmFsX3NldChzb3VyY2UsIHZhbHVlKSB7XG5cdGlmICghc291cmNlLmVxdWFscyh2YWx1ZSkpIHtcblx0XHR2YXIgb2xkX3ZhbHVlID0gc291cmNlLnY7XG5cblx0XHRpZiAoaXNfZGVzdHJveWluZ19lZmZlY3QpIHtcblx0XHRcdG9sZF92YWx1ZXMuc2V0KHNvdXJjZSwgdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvbGRfdmFsdWVzLnNldChzb3VyY2UsIG9sZF92YWx1ZSk7XG5cdFx0fVxuXG5cdFx0c291cmNlLnYgPSB2YWx1ZTtcblxuXHRcdHZhciBiYXRjaCA9IEJhdGNoLmVuc3VyZSgpO1xuXHRcdGJhdGNoLmNhcHR1cmUoc291cmNlLCBvbGRfdmFsdWUpO1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0aWYgKHRyYWNpbmdfbW9kZV9mbGFnIHx8IGFjdGl2ZV9lZmZlY3QgIT09IG51bGwpIHtcblx0XHRcdFx0c291cmNlLnVwZGF0ZWQgPz89IG5ldyBNYXAoKTtcblxuXHRcdFx0XHQvLyBGb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgd2hlbiBub3QgdXNpbmcgJGluc3BlY3QudHJhY2UsIHdlIG9ubHkgc3RhcnQgY29sbGVjdGluZyBzdGFjayB0cmFjZXNcblx0XHRcdFx0Ly8gYWZ0ZXIgdGhlIHNhbWUgc291cmNlIGhhcyBiZWVuIHVwZGF0ZWQgbW9yZSB0aGFuIDUgdGltZXMgaW4gdGhlIHNhbWUgZmx1c2ggY3ljbGUuXG5cdFx0XHRcdGNvbnN0IGNvdW50ID0gKHNvdXJjZS51cGRhdGVkLmdldCgnJyk/LmNvdW50ID8/IDApICsgMTtcblx0XHRcdFx0c291cmNlLnVwZGF0ZWQuc2V0KCcnLCB7IGVycm9yOiAvKiogQHR5cGUge2FueX0gKi8gKG51bGwpLCBjb3VudCB9KTtcblxuXHRcdFx0XHRpZiAodHJhY2luZ19tb2RlX2ZsYWcgfHwgY291bnQgPiA1KSB7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBnZXRfZXJyb3IoJ3VwZGF0ZWQgYXQnKTtcblxuXHRcdFx0XHRcdGlmIChlcnJvciAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0bGV0IGVudHJ5ID0gc291cmNlLnVwZGF0ZWQuZ2V0KGVycm9yLnN0YWNrKTtcblxuXHRcdFx0XHRcdFx0aWYgKCFlbnRyeSkge1xuXHRcdFx0XHRcdFx0XHRlbnRyeSA9IHsgZXJyb3IsIGNvdW50OiAwIH07XG5cdFx0XHRcdFx0XHRcdHNvdXJjZS51cGRhdGVkLnNldChlcnJvci5zdGFjaywgZW50cnkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRlbnRyeS5jb3VudCsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYWN0aXZlX2VmZmVjdCAhPT0gbnVsbCkge1xuXHRcdFx0XHRzb3VyY2Uuc2V0X2R1cmluZ19lZmZlY3QgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgoc291cmNlLmYgJiBERVJJVkVEKSAhPT0gMCkge1xuXHRcdFx0Y29uc3QgZGVyaXZlZCA9IC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKHNvdXJjZSk7XG5cblx0XHRcdC8vIGlmIHdlIGFyZSBhc3NpZ25pbmcgdG8gYSBkaXJ0eSBkZXJpdmVkIHdlIHNldCBpdCB0byBjbGVhbi9tYXliZSBkaXJ0eSBidXQgd2UgYWxzbyBlYWdlcmx5IGV4ZWN1dGUgaXQgdG8gdHJhY2sgdGhlIGRlcGVuZGVuY2llc1xuXHRcdFx0aWYgKChzb3VyY2UuZiAmIERJUlRZKSAhPT0gMCkge1xuXHRcdFx0XHRleGVjdXRlX2Rlcml2ZWQoZGVyaXZlZCk7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZV9kZXJpdmVkX3N0YXR1cyhkZXJpdmVkKTtcblx0XHR9XG5cblx0XHRzb3VyY2Uud3YgPSBpbmNyZW1lbnRfd3JpdGVfdmVyc2lvbigpO1xuXG5cdFx0Ly8gRm9yIGRlYnVnZ2luZywgaW4gY2FzZSB5b3Ugd2FudCB0byBrbm93IHdoaWNoIHJlYWN0aW9ucyBhcmUgYmVpbmcgc2NoZWR1bGVkOlxuXHRcdC8vIGxvZ19yZWFjdGlvbnMoc291cmNlKTtcblx0XHRtYXJrX3JlYWN0aW9ucyhzb3VyY2UsIERJUlRZKTtcblxuXHRcdC8vIEl0J3MgcG9zc2libGUgdGhhdCB0aGUgY3VycmVudCByZWFjdGlvbiBtaWdodCBub3QgaGF2ZSB1cC10by1kYXRlIGRlcGVuZGVuY2llc1xuXHRcdC8vIHdoaWxzdCBpdCdzIGFjdGl2ZWx5IHJ1bm5pbmcuIFNvIGluIHRoZSBjYXNlIG9mIGVuc3VyaW5nIGl0IHJlZ2lzdGVycyB0aGUgcmVhY3Rpb25cblx0XHQvLyBwcm9wZXJseSBmb3IgaXRzZWxmLCB3ZSBuZWVkIHRvIGVuc3VyZSB0aGUgY3VycmVudCBlZmZlY3QgYWN0dWFsbHkgZ2V0c1xuXHRcdC8vIHNjaGVkdWxlZC4gaS5lOiBgJGVmZmVjdCgoKSA9PiB4KyspYFxuXHRcdGlmIChcblx0XHRcdGlzX3J1bmVzKCkgJiZcblx0XHRcdGFjdGl2ZV9lZmZlY3QgIT09IG51bGwgJiZcblx0XHRcdChhY3RpdmVfZWZmZWN0LmYgJiBDTEVBTikgIT09IDAgJiZcblx0XHRcdChhY3RpdmVfZWZmZWN0LmYgJiAoQlJBTkNIX0VGRkVDVCB8IFJPT1RfRUZGRUNUKSkgPT09IDBcblx0XHQpIHtcblx0XHRcdGlmICh1bnRyYWNrZWRfd3JpdGVzID09PSBudWxsKSB7XG5cdFx0XHRcdHNldF91bnRyYWNrZWRfd3JpdGVzKFtzb3VyY2VdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHVudHJhY2tlZF93cml0ZXMucHVzaChzb3VyY2UpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghYmF0Y2guaXNfZm9yayAmJiBlYWdlcl9lZmZlY3RzLnNpemUgPiAwICYmICFlYWdlcl9lZmZlY3RzX2RlZmVycmVkKSB7XG5cdFx0XHRmbHVzaF9lYWdlcl9lZmZlY3RzKCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hfZWFnZXJfZWZmZWN0cygpIHtcblx0ZWFnZXJfZWZmZWN0c19kZWZlcnJlZCA9IGZhbHNlO1xuXG5cdGZvciAoY29uc3QgZWZmZWN0IG9mIGVhZ2VyX2VmZmVjdHMpIHtcblx0XHQvLyBNYXJrIGNsZWFuIGluc3BlY3QtZWZmZWN0cyBhcyBtYXliZSBkaXJ0eSBhbmQgdGhlbiBjaGVjayB0aGVpciBkaXJ0aW5lc3Ncblx0XHQvLyBpbnN0ZWFkIG9mIGp1c3QgdXBkYXRpbmcgdGhlIGVmZmVjdHMgLSB0aGlzIHdheSB3ZSBhdm9pZCBvdmVyZmlyaW5nLlxuXHRcdGlmICgoZWZmZWN0LmYgJiBDTEVBTikgIT09IDApIHtcblx0XHRcdHNldF9zaWduYWxfc3RhdHVzKGVmZmVjdCwgTUFZQkVfRElSVFkpO1xuXHRcdH1cblxuXHRcdGlmIChpc19kaXJ0eShlZmZlY3QpKSB7XG5cdFx0XHR1cGRhdGVfZWZmZWN0KGVmZmVjdCk7XG5cdFx0fVxuXHR9XG5cblx0ZWFnZXJfZWZmZWN0cy5jbGVhcigpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7bnVtYmVyIHwgYmlnaW50fSBUXG4gKiBAcGFyYW0ge1NvdXJjZTxUPn0gc291cmNlXG4gKiBAcGFyYW0gezEgfCAtMX0gW2RdXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZShzb3VyY2UsIGQgPSAxKSB7XG5cdHZhciB2YWx1ZSA9IGdldChzb3VyY2UpO1xuXHR2YXIgcmVzdWx0ID0gZCA9PT0gMSA/IHZhbHVlKysgOiB2YWx1ZS0tO1xuXG5cdHNldChzb3VyY2UsIHZhbHVlKTtcblxuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtudW1iZXIgfCBiaWdpbnR9IFRcbiAqIEBwYXJhbSB7U291cmNlPFQ+fSBzb3VyY2VcbiAqIEBwYXJhbSB7MSB8IC0xfSBbZF1cbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3ByZShzb3VyY2UsIGQgPSAxKSB7XG5cdHZhciB2YWx1ZSA9IGdldChzb3VyY2UpO1xuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtYXNzaWdubWVudCAtLSBgKytgL2AtLWAgdXNlZCBmb3IgcmV0dXJuIHZhbHVlLCBub3Qgc2lkZSBlZmZlY3Qgb24gYHZhbHVlYFxuXHRyZXR1cm4gc2V0KHNvdXJjZSwgZCA9PT0gMSA/ICsrdmFsdWUgOiAtLXZhbHVlKTtcbn1cblxuLyoqXG4gKiBTaWxlbnRseSAod2l0aG91dCB1c2luZyBgZ2V0YCkgaW5jcmVtZW50IGEgc291cmNlXG4gKiBAcGFyYW0ge1NvdXJjZTxudW1iZXI+fSBzb3VyY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY3JlbWVudChzb3VyY2UpIHtcblx0c2V0KHNvdXJjZSwgc291cmNlLnYgKyAxKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1ZhbHVlfSBzaWduYWxcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGF0dXMgc2hvdWxkIGJlIERJUlRZIG9yIE1BWUJFX0RJUlRZXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gbWFya19yZWFjdGlvbnMoc2lnbmFsLCBzdGF0dXMpIHtcblx0dmFyIHJlYWN0aW9ucyA9IHNpZ25hbC5yZWFjdGlvbnM7XG5cdGlmIChyZWFjdGlvbnMgPT09IG51bGwpIHJldHVybjtcblxuXHR2YXIgcnVuZXMgPSBpc19ydW5lcygpO1xuXHR2YXIgbGVuZ3RoID0gcmVhY3Rpb25zLmxlbmd0aDtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHJlYWN0aW9uID0gcmVhY3Rpb25zW2ldO1xuXHRcdHZhciBmbGFncyA9IHJlYWN0aW9uLmY7XG5cblx0XHQvLyBJbiBsZWdhY3kgbW9kZSwgc2tpcCB0aGUgY3VycmVudCBlZmZlY3QgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wc1xuXHRcdGlmICghcnVuZXMgJiYgcmVhY3Rpb24gPT09IGFjdGl2ZV9lZmZlY3QpIGNvbnRpbnVlO1xuXG5cdFx0Ly8gSW5zcGVjdCBlZmZlY3RzIG5lZWQgdG8gcnVuIGltbWVkaWF0ZWx5LCBzbyB0aGF0IHRoZSBzdGFjayB0cmFjZSBtYWtlcyBzZW5zZVxuXHRcdGlmIChERVYgJiYgKGZsYWdzICYgRUFHRVJfRUZGRUNUKSAhPT0gMCkge1xuXHRcdFx0ZWFnZXJfZWZmZWN0cy5hZGQocmVhY3Rpb24pO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIG5vdF9kaXJ0eSA9IChmbGFncyAmIERJUlRZKSA9PT0gMDtcblxuXHRcdC8vIGRvbid0IHNldCBhIERJUlRZIHJlYWN0aW9uIHRvIE1BWUJFX0RJUlRZXG5cdFx0aWYgKG5vdF9kaXJ0eSkge1xuXHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMocmVhY3Rpb24sIHN0YXR1cyk7XG5cdFx0fVxuXG5cdFx0aWYgKChmbGFncyAmIERFUklWRUQpICE9PSAwKSB7XG5cdFx0XHR2YXIgZGVyaXZlZCA9IC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKHJlYWN0aW9uKTtcblxuXHRcdFx0YmF0Y2hfdmFsdWVzPy5kZWxldGUoZGVyaXZlZCk7XG5cblx0XHRcdGlmICgoZmxhZ3MgJiBXQVNfTUFSS0VEKSA9PT0gMCkge1xuXHRcdFx0XHQvLyBPbmx5IGNvbm5lY3RlZCBkZXJpdmVkcyBjYW4gYmUgcmVsaWFibHkgdW5tYXJrZWQgcmlnaHQgYXdheVxuXHRcdFx0XHRpZiAoZmxhZ3MgJiBDT05ORUNURUQpIHtcblx0XHRcdFx0XHRyZWFjdGlvbi5mIHw9IFdBU19NQVJLRUQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtYXJrX3JlYWN0aW9ucyhkZXJpdmVkLCBNQVlCRV9ESVJUWSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChub3RfZGlydHkpIHtcblx0XHRcdGlmICgoZmxhZ3MgJiBCTE9DS19FRkZFQ1QpICE9PSAwICYmIGVhZ2VyX2Jsb2NrX2VmZmVjdHMgIT09IG51bGwpIHtcblx0XHRcdFx0ZWFnZXJfYmxvY2tfZWZmZWN0cy5hZGQoLyoqIEB0eXBlIHtFZmZlY3R9ICovIChyZWFjdGlvbikpO1xuXHRcdFx0fVxuXG5cdFx0XHRzY2hlZHVsZV9lZmZlY3QoLyoqIEB0eXBlIHtFZmZlY3R9ICovIChyZWFjdGlvbikpO1xuXHRcdH1cblx0fVxufVxuIiwiLyoqIEBpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQge1xuXHRnZXQsXG5cdGFjdGl2ZV9lZmZlY3QsXG5cdHVwZGF0ZV92ZXJzaW9uLFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdHNldF91cGRhdGVfdmVyc2lvbixcblx0c2V0X2FjdGl2ZV9yZWFjdGlvblxufSBmcm9tICcuL3J1bnRpbWUuanMnO1xuaW1wb3J0IHtcblx0YXJyYXlfcHJvdG90eXBlLFxuXHRnZXRfZGVzY3JpcHRvcixcblx0Z2V0X3Byb3RvdHlwZV9vZixcblx0aXNfYXJyYXksXG5cdG9iamVjdF9wcm90b3R5cGVcbn0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7XG5cdHN0YXRlIGFzIHNvdXJjZSxcblx0c2V0LFxuXHRpbmNyZW1lbnQsXG5cdGZsdXNoX2VhZ2VyX2VmZmVjdHMsXG5cdHNldF9lYWdlcl9lZmZlY3RzX2RlZmVycmVkXG59IGZyb20gJy4vcmVhY3Rpdml0eS9zb3VyY2VzLmpzJztcbmltcG9ydCB7IFBST1hZX1BBVEhfU1lNQk9MLCBTVEFURV9TWU1CT0wgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBVTklOSVRJQUxJWkVEIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAnLi9kZXYvdHJhY2luZy5qcyc7XG5pbXBvcnQgeyBnZXRfZXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvZGV2LmpzJztcbmltcG9ydCB7IHRyYWNpbmdfbW9kZV9mbGFnIH0gZnJvbSAnLi4vZmxhZ3MvaW5kZXguanMnO1xuXG4vLyBUT0RPIG1vdmUgYWxsIHJlZ2V4ZXMgaW50byBzaGFyZWQgbW9kdWxlP1xuY29uc3QgcmVnZXhfaXNfdmFsaWRfaWRlbnRpZmllciA9IC9eW2EtekEtWl8kXVthLXpBLVpfJDAtOV0qJC87XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7VH0gdmFsdWVcbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJveHkodmFsdWUpIHtcblx0Ly8gaWYgbm9uLXByb3h5YWJsZSwgb3IgaXMgYWxyZWFkeSBhIHByb3h5LCByZXR1cm4gYHZhbHVlYFxuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCBTVEFURV9TWU1CT0wgaW4gdmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRjb25zdCBwcm90b3R5cGUgPSBnZXRfcHJvdG90eXBlX29mKHZhbHVlKTtcblxuXHRpZiAocHJvdG90eXBlICE9PSBvYmplY3RfcHJvdG90eXBlICYmIHByb3RvdHlwZSAhPT0gYXJyYXlfcHJvdG90eXBlKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtNYXA8YW55LCBTb3VyY2U8YW55Pj59ICovXG5cdHZhciBzb3VyY2VzID0gbmV3IE1hcCgpO1xuXHR2YXIgaXNfcHJveGllZF9hcnJheSA9IGlzX2FycmF5KHZhbHVlKTtcblx0dmFyIHZlcnNpb24gPSBzb3VyY2UoMCk7XG5cblx0dmFyIHN0YWNrID0gREVWICYmIHRyYWNpbmdfbW9kZV9mbGFnID8gZ2V0X2Vycm9yKCdjcmVhdGVkIGF0JykgOiBudWxsO1xuXHR2YXIgcGFyZW50X3ZlcnNpb24gPSB1cGRhdGVfdmVyc2lvbjtcblxuXHQvKipcblx0ICogRXhlY3V0ZXMgdGhlIHByb3h5IGluIHRoZSBjb250ZXh0IG9mIHRoZSByZWFjdGlvbiBpdCB3YXMgb3JpZ2luYWxseSBjcmVhdGVkIGluLCBpZiBhbnlcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHBhcmFtIHsoKSA9PiBUfSBmblxuXHQgKi9cblx0dmFyIHdpdGhfcGFyZW50ID0gKGZuKSA9PiB7XG5cdFx0aWYgKHVwZGF0ZV92ZXJzaW9uID09PSBwYXJlbnRfdmVyc2lvbikge1xuXHRcdFx0cmV0dXJuIGZuKCk7XG5cdFx0fVxuXG5cdFx0Ly8gY2hpbGQgc291cmNlIGlzIGJlaW5nIGNyZWF0ZWQgYWZ0ZXIgdGhlIGluaXRpYWwgcHJveHkg4oCUXG5cdFx0Ly8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCByZWFjdGlvblxuXHRcdHZhciByZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0XHR2YXIgdmVyc2lvbiA9IHVwZGF0ZV92ZXJzaW9uO1xuXG5cdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihudWxsKTtcblx0XHRzZXRfdXBkYXRlX3ZlcnNpb24ocGFyZW50X3ZlcnNpb24pO1xuXG5cdFx0dmFyIHJlc3VsdCA9IGZuKCk7XG5cblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHJlYWN0aW9uKTtcblx0XHRzZXRfdXBkYXRlX3ZlcnNpb24odmVyc2lvbik7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdGlmIChpc19wcm94aWVkX2FycmF5KSB7XG5cdFx0Ly8gV2UgbmVlZCB0byBjcmVhdGUgdGhlIGxlbmd0aCBzb3VyY2UgZWFnZXJseSB0byBlbnN1cmUgdGhhdFxuXHRcdC8vIG11dGF0aW9ucyB0byB0aGUgYXJyYXkgYXJlIHByb3Blcmx5IHN5bmNlZCB3aXRoIG91ciBwcm94eVxuXHRcdHNvdXJjZXMuc2V0KCdsZW5ndGgnLCBzb3VyY2UoLyoqIEB0eXBlIHthbnlbXX0gKi8gKHZhbHVlKS5sZW5ndGgsIHN0YWNrKSk7XG5cdFx0aWYgKERFVikge1xuXHRcdFx0dmFsdWUgPSAvKiogQHR5cGUge2FueX0gKi8gKGluc3BlY3RhYmxlX2FycmF5KC8qKiBAdHlwZSB7YW55W119ICovICh2YWx1ZSkpKTtcblx0XHR9XG5cdH1cblxuXHQvKiogVXNlZCBpbiBkZXYgZm9yICRpbnNwZWN0LnRyYWNlKCkgKi9cblx0dmFyIHBhdGggPSAnJztcblx0bGV0IHVwZGF0aW5nID0gZmFsc2U7XG5cdC8qKiBAcGFyYW0ge3N0cmluZ30gbmV3X3BhdGggKi9cblx0ZnVuY3Rpb24gdXBkYXRlX3BhdGgobmV3X3BhdGgpIHtcblx0XHRpZiAodXBkYXRpbmcpIHJldHVybjtcblx0XHR1cGRhdGluZyA9IHRydWU7XG5cdFx0cGF0aCA9IG5ld19wYXRoO1xuXG5cdFx0dGFnKHZlcnNpb24sIGAke3BhdGh9IHZlcnNpb25gKTtcblxuXHRcdC8vIHJlbmFtZSBhbGwgY2hpbGQgc291cmNlcyBhbmQgY2hpbGQgcHJveGllc1xuXHRcdGZvciAoY29uc3QgW3Byb3AsIHNvdXJjZV0gb2Ygc291cmNlcykge1xuXHRcdFx0dGFnKHNvdXJjZSwgZ2V0X2xhYmVsKHBhdGgsIHByb3ApKTtcblx0XHR9XG5cdFx0dXBkYXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBuZXcgUHJveHkoLyoqIEB0eXBlIHthbnl9ICovICh2YWx1ZSksIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShfLCBwcm9wLCBkZXNjcmlwdG9yKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCEoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSB8fFxuXHRcdFx0XHRkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UgfHxcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlID09PSBmYWxzZSB8fFxuXHRcdFx0XHRkZXNjcmlwdG9yLndyaXRhYmxlID09PSBmYWxzZVxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIHdlIGRpc2FsbG93IG5vbi1iYXNpYyBkZXNjcmlwdG9ycywgYmVjYXVzZSB1bmxlc3MgdGhleSBhcmUgYXBwbGllZCB0byB0aGVcblx0XHRcdFx0Ly8gdGFyZ2V0IG9iamVjdCDigJQgd2hpY2ggd2UgYXZvaWQsIHNvIHRoYXQgc3RhdGUgY2FuIGJlIGZvcmtlZCDigJQgd2Ugd2lsbCBydW5cblx0XHRcdFx0Ly8gYWZvdWwgb2YgdGhlIHZhcmlvdXMgaW52YXJpYW50c1xuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9Qcm94eS9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IjaW52YXJpYW50c1xuXHRcdFx0XHRlLnN0YXRlX2Rlc2NyaXB0b3JzX2ZpeGVkKCk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KHByb3ApO1xuXHRcdFx0aWYgKHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR3aXRoX3BhcmVudCgoKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHMgPSBzb3VyY2UoZGVzY3JpcHRvci52YWx1ZSwgc3RhY2spO1xuXHRcdFx0XHRcdHNvdXJjZXMuc2V0KHByb3AsIHMpO1xuXHRcdFx0XHRcdGlmIChERVYgJiYgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHR0YWcocywgZ2V0X2xhYmVsKHBhdGgsIHByb3ApKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0KHMsIGRlc2NyaXB0b3IudmFsdWUsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0ZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wKSB7XG5cdFx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KHByb3ApO1xuXG5cdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmIChwcm9wIGluIHRhcmdldCkge1xuXHRcdFx0XHRcdGNvbnN0IHMgPSB3aXRoX3BhcmVudCgoKSA9PiBzb3VyY2UoVU5JTklUSUFMSVpFRCwgc3RhY2spKTtcblx0XHRcdFx0XHRzb3VyY2VzLnNldChwcm9wLCBzKTtcblx0XHRcdFx0XHRpbmNyZW1lbnQodmVyc2lvbik7XG5cblx0XHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0XHR0YWcocywgZ2V0X2xhYmVsKHBhdGgsIHByb3ApKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNldChzLCBVTklOSVRJQUxJWkVEKTtcblx0XHRcdFx0aW5jcmVtZW50KHZlcnNpb24pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Z2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcblx0XHRcdGlmIChwcm9wID09PSBTVEFURV9TWU1CT0wpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoREVWICYmIHByb3AgPT09IFBST1hZX1BBVEhfU1lNQk9MKSB7XG5cdFx0XHRcdHJldHVybiB1cGRhdGVfcGF0aDtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHMgPSBzb3VyY2VzLmdldChwcm9wKTtcblx0XHRcdHZhciBleGlzdHMgPSBwcm9wIGluIHRhcmdldDtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgc291cmNlLCBidXQgb25seSBpZiBpdCdzIGFuIG93biBwcm9wZXJ0eSBhbmQgbm90IGEgcHJvdG90eXBlIHByb3BlcnR5XG5cdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkICYmICghZXhpc3RzIHx8IGdldF9kZXNjcmlwdG9yKHRhcmdldCwgcHJvcCk/LndyaXRhYmxlKSkge1xuXHRcdFx0XHRzID0gd2l0aF9wYXJlbnQoKCkgPT4ge1xuXHRcdFx0XHRcdHZhciBwID0gcHJveHkoZXhpc3RzID8gdGFyZ2V0W3Byb3BdIDogVU5JTklUSUFMSVpFRCk7XG5cdFx0XHRcdFx0dmFyIHMgPSBzb3VyY2UocCwgc3RhY2spO1xuXG5cdFx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdFx0dGFnKHMsIGdldF9sYWJlbChwYXRoLCBwcm9wKSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHNvdXJjZXMuc2V0KHByb3AsIHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHZhciB2ID0gZ2V0KHMpO1xuXHRcdFx0XHRyZXR1cm4gdiA9PT0gVU5JTklUSUFMSVpFRCA/IHVuZGVmaW5lZCA6IHY7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKTtcblx0XHR9LFxuXG5cdFx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcCkge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3ApO1xuXG5cdFx0XHRpZiAoZGVzY3JpcHRvciAmJiAndmFsdWUnIGluIGRlc2NyaXB0b3IpIHtcblx0XHRcdFx0dmFyIHMgPSBzb3VyY2VzLmdldChwcm9wKTtcblx0XHRcdFx0aWYgKHMpIGRlc2NyaXB0b3IudmFsdWUgPSBnZXQocyk7XG5cdFx0XHR9IGVsc2UgaWYgKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR2YXIgc291cmNlID0gc291cmNlcy5nZXQocHJvcCk7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHNvdXJjZT8udjtcblxuXHRcdFx0XHRpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IFVOSU5JVElBTElaRUQpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZXNjcmlwdG9yO1xuXHRcdH0sXG5cblx0XHRoYXModGFyZ2V0LCBwcm9wKSB7XG5cdFx0XHRpZiAocHJvcCA9PT0gU1RBVEVfU1lNQk9MKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KHByb3ApO1xuXHRcdFx0dmFyIGhhcyA9IChzICE9PSB1bmRlZmluZWQgJiYgcy52ICE9PSBVTklOSVRJQUxJWkVEKSB8fCBSZWZsZWN0Lmhhcyh0YXJnZXQsIHByb3ApO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdHMgIT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoYWN0aXZlX2VmZmVjdCAhPT0gbnVsbCAmJiAoIWhhcyB8fCBnZXRfZGVzY3JpcHRvcih0YXJnZXQsIHByb3ApPy53cml0YWJsZSkpXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHMgPSB3aXRoX3BhcmVudCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR2YXIgcCA9IGhhcyA/IHByb3h5KHRhcmdldFtwcm9wXSkgOiBVTklOSVRJQUxJWkVEO1xuXHRcdFx0XHRcdFx0dmFyIHMgPSBzb3VyY2UocCwgc3RhY2spO1xuXG5cdFx0XHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0XHRcdHRhZyhzLCBnZXRfbGFiZWwocGF0aCwgcHJvcCkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHNvdXJjZXMuc2V0KHByb3AsIHMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gZ2V0KHMpO1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IFVOSU5JVElBTElaRUQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGhhcztcblx0XHR9LFxuXG5cdFx0c2V0KHRhcmdldCwgcHJvcCwgdmFsdWUsIHJlY2VpdmVyKSB7XG5cdFx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KHByb3ApO1xuXHRcdFx0dmFyIGhhcyA9IHByb3AgaW4gdGFyZ2V0O1xuXG5cdFx0XHQvLyB2YXJpYWJsZS5sZW5ndGggPSB2YWx1ZSAtPiBjbGVhciBhbGwgc2lnbmFscyB3aXRoIGluZGV4ID49IHZhbHVlXG5cdFx0XHRpZiAoaXNfcHJveGllZF9hcnJheSAmJiBwcm9wID09PSAnbGVuZ3RoJykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gdmFsdWU7IGkgPCAvKiogQHR5cGUge1NvdXJjZTxudW1iZXI+fSAqLyAocykudjsgaSArPSAxKSB7XG5cdFx0XHRcdFx0dmFyIG90aGVyX3MgPSBzb3VyY2VzLmdldChpICsgJycpO1xuXHRcdFx0XHRcdGlmIChvdGhlcl9zICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHNldChvdGhlcl9zLCBVTklOSVRJQUxJWkVEKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGkgaW4gdGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHQvLyBJZiB0aGUgaXRlbSBleGlzdHMgaW4gdGhlIG9yaWdpbmFsLCB3ZSBuZWVkIHRvIGNyZWF0ZSBhbiB1bmluaXRpYWxpemVkIHNvdXJjZSxcblx0XHRcdFx0XHRcdC8vIGVsc2UgYSBsYXRlciByZWFkIG9mIHRoZSBwcm9wZXJ0eSB3b3VsZCByZXN1bHQgaW4gYSBzb3VyY2UgYmVpbmcgY3JlYXRlZCB3aXRoXG5cdFx0XHRcdFx0XHQvLyB0aGUgdmFsdWUgb2YgdGhlIG9yaWdpbmFsIGl0ZW0gYXQgdGhhdCBpbmRleC5cblx0XHRcdFx0XHRcdG90aGVyX3MgPSB3aXRoX3BhcmVudCgoKSA9PiBzb3VyY2UoVU5JTklUSUFMSVpFRCwgc3RhY2spKTtcblx0XHRcdFx0XHRcdHNvdXJjZXMuc2V0KGkgKyAnJywgb3RoZXJfcyk7XG5cblx0XHRcdFx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0XHRcdFx0dGFnKG90aGVyX3MsIGdldF9sYWJlbChwYXRoLCBpKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHdlIGhhdmVuJ3QgeWV0IGNyZWF0ZWQgYSBzb3VyY2UgZm9yIHRoaXMgcHJvcGVydHksIHdlIG5lZWQgdG8gZW5zdXJlXG5cdFx0XHQvLyB3ZSBkbyBzbyBvdGhlcndpc2UgaWYgd2UgcmVhZCBpdCBsYXRlciwgdGhlbiB0aGUgd3JpdGUgd29uJ3QgYmUgdHJhY2tlZCBhbmRcblx0XHRcdC8vIHRoZSBoZXVyaXN0aWNzIG9mIGVmZmVjdHMgd2lsbCBiZSBkaWZmZXJlbnQgdnMgaWYgd2UgaGFkIHJlYWQgdGhlIHByb3hpZWRcblx0XHRcdC8vIG9iamVjdCBwcm9wZXJ0eSBiZWZvcmUgd3JpdGluZyB0byB0aGF0IHByb3BlcnR5LlxuXHRcdFx0aWYgKHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZiAoIWhhcyB8fCBnZXRfZGVzY3JpcHRvcih0YXJnZXQsIHByb3ApPy53cml0YWJsZSkge1xuXHRcdFx0XHRcdHMgPSB3aXRoX3BhcmVudCgoKSA9PiBzb3VyY2UodW5kZWZpbmVkLCBzdGFjaykpO1xuXG5cdFx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdFx0dGFnKHMsIGdldF9sYWJlbChwYXRoLCBwcm9wKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNldChzLCBwcm94eSh2YWx1ZSkpO1xuXG5cdFx0XHRcdFx0c291cmNlcy5zZXQocHJvcCwgcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhcyA9IHMudiAhPT0gVU5JTklUSUFMSVpFRDtcblxuXHRcdFx0XHR2YXIgcCA9IHdpdGhfcGFyZW50KCgpID0+IHByb3h5KHZhbHVlKSk7XG5cdFx0XHRcdHNldChzLCBwKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3ApO1xuXG5cdFx0XHQvLyBTZXQgdGhlIG5ldyB2YWx1ZSBiZWZvcmUgdXBkYXRpbmcgYW55IHNpZ25hbHMgc28gdGhhdCBhbnkgbGlzdGVuZXJzIGdldCB0aGUgbmV3IHZhbHVlXG5cdFx0XHRpZiAoZGVzY3JpcHRvcj8uc2V0KSB7XG5cdFx0XHRcdGRlc2NyaXB0b3Iuc2V0LmNhbGwocmVjZWl2ZXIsIHZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFoYXMpIHtcblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBtdXRhdGVkIGFuIGFycmF5IGRpcmVjdGx5LCB3ZSBtaWdodCBuZWVkIHRvXG5cdFx0XHRcdC8vIHNpZ25hbCB0aGF0IGxlbmd0aCBoYXMgYWxzbyBjaGFuZ2VkLiBEbyBpdCBiZWZvcmUgdXBkYXRpbmcgbWV0YWRhdGFcblx0XHRcdFx0Ly8gdG8gZW5zdXJlIHRoYXQgaXRlcmF0aW5nIG92ZXIgdGhlIGFycmF5IGFzIGEgcmVzdWx0IG9mIGEgbWV0YWRhdGEgdXBkYXRlXG5cdFx0XHRcdC8vIHdpbGwgbm90IGNhdXNlIHRoZSBsZW5ndGggdG8gYmUgb3V0IG9mIHN5bmMuXG5cdFx0XHRcdGlmIChpc19wcm94aWVkX2FycmF5ICYmIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHZhciBscyA9IC8qKiBAdHlwZSB7U291cmNlPG51bWJlcj59ICovIChzb3VyY2VzLmdldCgnbGVuZ3RoJykpO1xuXHRcdFx0XHRcdHZhciBuID0gTnVtYmVyKHByb3ApO1xuXG5cdFx0XHRcdFx0aWYgKE51bWJlci5pc0ludGVnZXIobikgJiYgbiA+PSBscy52KSB7XG5cdFx0XHRcdFx0XHRzZXQobHMsIG4gKyAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbmNyZW1lbnQodmVyc2lvbik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRvd25LZXlzKHRhcmdldCkge1xuXHRcdFx0Z2V0KHZlcnNpb24pO1xuXG5cdFx0XHR2YXIgb3duX2tleXMgPSBSZWZsZWN0Lm93bktleXModGFyZ2V0KS5maWx0ZXIoKGtleSkgPT4ge1xuXHRcdFx0XHR2YXIgc291cmNlID0gc291cmNlcy5nZXQoa2V5KTtcblx0XHRcdFx0cmV0dXJuIHNvdXJjZSA9PT0gdW5kZWZpbmVkIHx8IHNvdXJjZS52ICE9PSBVTklOSVRJQUxJWkVEO1xuXHRcdFx0fSk7XG5cblx0XHRcdGZvciAodmFyIFtrZXksIHNvdXJjZV0gb2Ygc291cmNlcykge1xuXHRcdFx0XHRpZiAoc291cmNlLnYgIT09IFVOSU5JVElBTElaRUQgJiYgIShrZXkgaW4gdGFyZ2V0KSkge1xuXHRcdFx0XHRcdG93bl9rZXlzLnB1c2goa2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3duX2tleXM7XG5cdFx0fSxcblxuXHRcdHNldFByb3RvdHlwZU9mKCkge1xuXHRcdFx0ZS5zdGF0ZV9wcm90b3R5cGVfZml4ZWQoKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZyB8IHN5bWJvbH0gcHJvcFxuICovXG5mdW5jdGlvbiBnZXRfbGFiZWwocGF0aCwgcHJvcCkge1xuXHRpZiAodHlwZW9mIHByb3AgPT09ICdzeW1ib2wnKSByZXR1cm4gYCR7cGF0aH1bU3ltYm9sKCR7cHJvcC5kZXNjcmlwdGlvbiA/PyAnJ30pXWA7XG5cdGlmIChyZWdleF9pc192YWxpZF9pZGVudGlmaWVyLnRlc3QocHJvcCkpIHJldHVybiBgJHtwYXRofS4ke3Byb3B9YDtcblx0cmV0dXJuIC9eXFxkKyQvLnRlc3QocHJvcCkgPyBgJHtwYXRofVske3Byb3B9XWAgOiBgJHtwYXRofVsnJHtwcm9wfSddYDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9wcm94aWVkX3ZhbHVlKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgU1RBVEVfU1lNQk9MIGluIHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVbU1RBVEVfU1lNQk9MXTtcblx0XHR9XG5cdH0gY2F0Y2gge1xuXHRcdC8vIHRoZSBhYm92ZSBpZiBjaGVjayBjYW4gdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHZhbHVlIGluIHF1ZXN0aW9uXG5cdFx0Ly8gaXMgdGhlIGNvbnRlbnRXaW5kb3cgb2YgYW4gaWZyYW1lIG9uIGFub3RoZXIgZG9tYWluLCBpbiB3aGljaFxuXHRcdC8vIGNhc2Ugd2Ugd2FudCB0byBqdXN0IHJldHVybiB0aGUgdmFsdWUgKGJlY2F1c2UgaXQncyBkZWZpbml0ZWx5XG5cdFx0Ly8gbm90IGEgcHJveGllZCB2YWx1ZSkgc28gd2UgZG9uJ3QgYnJlYWsgYW55IEphdmFTY3JpcHQgaW50ZXJhY3Rpbmdcblx0XHQvLyB3aXRoIHRoYXQgaWZyYW1lIChzdWNoIGFzIHZhcmlvdXMgcGF5bWVudCBjb21wYW5pZXMgY2xpZW50IHNpZGVcblx0XHQvLyBKYXZhU2NyaXB0IGxpYnJhcmllcyBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIGlmcmFtZXMgb24gdGhlIHNhbWVcblx0XHQvLyBkb21haW4pXG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IGFcbiAqIEBwYXJhbSB7YW55fSBiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpcyhhLCBiKSB7XG5cdHJldHVybiBPYmplY3QuaXMoZ2V0X3Byb3hpZWRfdmFsdWUoYSksIGdldF9wcm94aWVkX3ZhbHVlKGIpKTtcbn1cblxuY29uc3QgQVJSQVlfTVVUQVRJTkdfTUVUSE9EUyA9IG5ldyBTZXQoW1xuXHQnY29weVdpdGhpbicsXG5cdCdmaWxsJyxcblx0J3BvcCcsXG5cdCdwdXNoJyxcblx0J3JldmVyc2UnLFxuXHQnc2hpZnQnLFxuXHQnc29ydCcsXG5cdCdzcGxpY2UnLFxuXHQndW5zaGlmdCdcbl0pO1xuXG4vKipcbiAqIFdyYXAgYXJyYXkgbXV0YXRpbmcgbWV0aG9kcyBzbyAkaW5zcGVjdCBpcyB0cmlnZ2VyZWQgb25seSBvbmNlIGFuZFxuICogdG8gcHJldmVudCBsb2dnaW5nIGFuIGFycmF5IGluIGludGVybWVkaWF0ZSBzdGF0ZSAoZS5nLiB3aXRoIGFuIGVtcHR5IHNsb3QpXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICovXG5mdW5jdGlvbiBpbnNwZWN0YWJsZV9hcnJheShhcnJheSkge1xuXHRyZXR1cm4gbmV3IFByb3h5KGFycmF5LCB7XG5cdFx0Z2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcblx0XHRcdHZhciB2YWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpO1xuXHRcdFx0aWYgKCFBUlJBWV9NVVRBVElOR19NRVRIT0RTLmhhcygvKiogQHR5cGUge3N0cmluZ30gKi8gKHByb3ApKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHRoaXMge2FueVtdfVxuXHRcdFx0ICogQHBhcmFtIHthbnlbXX0gYXJnc1xuXHRcdFx0ICovXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0c2V0X2VhZ2VyX2VmZmVjdHNfZGVmZXJyZWQoKTtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRmbHVzaF9lYWdlcl9lZmZlY3RzKCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSk7XG59XG4iLCIvKiogQGltcG9ydCB7IEVmZmVjdCwgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IGh5ZHJhdGVfbm9kZSwgaHlkcmF0aW5nLCBzZXRfaHlkcmF0ZV9ub2RlIH0gZnJvbSAnLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBpbml0X2FycmF5X3Byb3RvdHlwZV93YXJuaW5ncyB9IGZyb20gJy4uL2Rldi9lcXVhbGl0eS5qcyc7XG5pbXBvcnQgeyBnZXRfZGVzY3JpcHRvciwgaXNfZXh0ZW5zaWJsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBhY3RpdmVfZWZmZWN0IH0gZnJvbSAnLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcgfSBmcm9tICcuLi8uLi9mbGFncy9pbmRleC5qcyc7XG5pbXBvcnQgeyBURVhUX05PREUsIFJFQUNUSU9OX1JBTiB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IGVhZ2VyX2Jsb2NrX2VmZmVjdHMgfSBmcm9tICcuLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7IE5BTUVTUEFDRV9IVE1MIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcblxuLy8gZXhwb3J0IHRoZXNlIGZvciByZWZlcmVuY2UgaW4gdGhlIGNvbXBpbGVkIGNvZGUsIG1ha2luZyBnbG9iYWwgbmFtZSBkZWR1cGxpY2F0aW9uIHVubmVjZXNzYXJ5XG4vKiogQHR5cGUge1dpbmRvd30gKi9cbmV4cG9ydCB2YXIgJHdpbmRvdztcblxuLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cbmV4cG9ydCB2YXIgJGRvY3VtZW50O1xuXG4vKiogQHR5cGUge2Jvb2xlYW59ICovXG5leHBvcnQgdmFyIGlzX2ZpcmVmb3g7XG5cbi8qKiBAdHlwZSB7KCkgPT4gTm9kZSB8IG51bGx9ICovXG52YXIgZmlyc3RfY2hpbGRfZ2V0dGVyO1xuLyoqIEB0eXBlIHsoKSA9PiBOb2RlIHwgbnVsbH0gKi9cbnZhciBuZXh0X3NpYmxpbmdfZ2V0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlc2UgbGF6aWx5IHRvIGF2b2lkIGlzc3VlcyB3aGVuIHVzaW5nIHRoZSBydW50aW1lIGluIGEgc2VydmVyIGNvbnRleHRcbiAqIHdoZXJlIHRoZXNlIGdsb2JhbHMgYXJlIG5vdCBhdmFpbGFibGUgd2hpbGUgYXZvaWRpbmcgYSBzZXBhcmF0ZSBzZXJ2ZXIgZW50cnkgcG9pbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRfb3BlcmF0aW9ucygpIHtcblx0aWYgKCR3aW5kb3cgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCR3aW5kb3cgPSB3aW5kb3c7XG5cdCRkb2N1bWVudCA9IGRvY3VtZW50O1xuXHRpc19maXJlZm94ID0gL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblx0dmFyIGVsZW1lbnRfcHJvdG90eXBlID0gRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBub2RlX3Byb3RvdHlwZSA9IE5vZGUucHJvdG90eXBlO1xuXHR2YXIgdGV4dF9wcm90b3R5cGUgPSBUZXh0LnByb3RvdHlwZTtcblxuXHQvLyBAdHMtaWdub3JlXG5cdGZpcnN0X2NoaWxkX2dldHRlciA9IGdldF9kZXNjcmlwdG9yKG5vZGVfcHJvdG90eXBlLCAnZmlyc3RDaGlsZCcpLmdldDtcblx0Ly8gQHRzLWlnbm9yZVxuXHRuZXh0X3NpYmxpbmdfZ2V0dGVyID0gZ2V0X2Rlc2NyaXB0b3Iobm9kZV9wcm90b3R5cGUsICduZXh0U2libGluZycpLmdldDtcblxuXHRpZiAoaXNfZXh0ZW5zaWJsZShlbGVtZW50X3Byb3RvdHlwZSkpIHtcblx0XHQvLyB0aGUgZm9sbG93aW5nIGFzc2lnbm1lbnRzIGltcHJvdmUgcGVyZiBvZiBsb29rdXBzIG9uIERPTSBub2Rlc1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50X3Byb3RvdHlwZS5fX2NsaWNrID0gdW5kZWZpbmVkO1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50X3Byb3RvdHlwZS5fX2NsYXNzTmFtZSA9IHVuZGVmaW5lZDtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudF9wcm90b3R5cGUuX19hdHRyaWJ1dGVzID0gbnVsbDtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudF9wcm90b3R5cGUuX19zdHlsZSA9IHVuZGVmaW5lZDtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudF9wcm90b3R5cGUuX19lID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKGlzX2V4dGVuc2libGUodGV4dF9wcm90b3R5cGUpKSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdHRleHRfcHJvdG90eXBlLl9fdCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmIChERVYpIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudF9wcm90b3R5cGUuX19zdmVsdGVfbWV0YSA9IG51bGw7XG5cblx0XHRpbml0X2FycmF5X3Byb3RvdHlwZV93YXJuaW5ncygpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7VGV4dH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV90ZXh0KHZhbHVlID0gJycpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge05vZGV9IE5cbiAqIEBwYXJhbSB7Tn0gbm9kZVxuICovXG4vKkBfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfZmlyc3RfY2hpbGQobm9kZSkge1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGUgfCBudWxsfSAqLyAoZmlyc3RfY2hpbGRfZ2V0dGVyLmNhbGwobm9kZSkpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gTlxuICogQHBhcmFtIHtOfSBub2RlXG4gKi9cbi8qQF9fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9uZXh0X3NpYmxpbmcobm9kZSkge1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGUgfCBudWxsfSAqLyAobmV4dF9zaWJsaW5nX2dldHRlci5jYWxsKG5vZGUpKTtcbn1cblxuLyoqXG4gKiBEb24ndCBtYXJrIHRoaXMgYXMgc2lkZS1lZmZlY3QtZnJlZSwgaHlkcmF0aW9uIG5lZWRzIHRvIHdhbGsgYWxsIG5vZGVzXG4gKiBAdGVtcGxhdGUge05vZGV9IE5cbiAqIEBwYXJhbSB7Tn0gbm9kZVxuICogQHBhcmFtIHtib29sZWFufSBpc190ZXh0XG4gKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlIHwgbnVsbH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkKG5vZGUsIGlzX3RleHQpIHtcblx0aWYgKCFoeWRyYXRpbmcpIHtcblx0XHRyZXR1cm4gZ2V0X2ZpcnN0X2NoaWxkKG5vZGUpO1xuXHR9XG5cblx0dmFyIGNoaWxkID0gZ2V0X2ZpcnN0X2NoaWxkKGh5ZHJhdGVfbm9kZSk7XG5cblx0Ly8gQ2hpbGQgY2FuIGJlIG51bGwgaWYgd2UgaGF2ZSBhbiBlbGVtZW50IHdpdGggYSBzaW5nbGUgY2hpbGQsIGxpa2UgYDxwPnt0ZXh0fTwvcD5gLCB3aGVyZSBgdGV4dGAgaXMgZW1wdHlcblx0aWYgKGNoaWxkID09PSBudWxsKSB7XG5cdFx0Y2hpbGQgPSBoeWRyYXRlX25vZGUuYXBwZW5kQ2hpbGQoY3JlYXRlX3RleHQoKSk7XG5cdH0gZWxzZSBpZiAoaXNfdGV4dCAmJiBjaGlsZC5ub2RlVHlwZSAhPT0gVEVYVF9OT0RFKSB7XG5cdFx0dmFyIHRleHQgPSBjcmVhdGVfdGV4dCgpO1xuXHRcdGNoaWxkPy5iZWZvcmUodGV4dCk7XG5cdFx0c2V0X2h5ZHJhdGVfbm9kZSh0ZXh0KTtcblx0XHRyZXR1cm4gdGV4dDtcblx0fVxuXG5cdGlmIChpc190ZXh0KSB7XG5cdFx0bWVyZ2VfdGV4dF9ub2RlcygvKiogQHR5cGUge1RleHR9ICovIChjaGlsZCkpO1xuXHR9XG5cblx0c2V0X2h5ZHJhdGVfbm9kZShjaGlsZCk7XG5cdHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gKiBEb24ndCBtYXJrIHRoaXMgYXMgc2lkZS1lZmZlY3QtZnJlZSwgaHlkcmF0aW9uIG5lZWRzIHRvIHdhbGsgYWxsIG5vZGVzXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICogQHBhcmFtIHtib29sZWFufSBbaXNfdGV4dF1cbiAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGUgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RfY2hpbGQobm9kZSwgaXNfdGV4dCA9IGZhbHNlKSB7XG5cdGlmICghaHlkcmF0aW5nKSB7XG5cdFx0dmFyIGZpcnN0ID0gZ2V0X2ZpcnN0X2NoaWxkKG5vZGUpO1xuXG5cdFx0Ly8gVE9ETyBwcmV2ZW50IHVzZXIgY29tbWVudHMgd2l0aCB0aGUgZW1wdHkgc3RyaW5nIHdoZW4gcHJlc2VydmVDb21tZW50cyBpcyB0cnVlXG5cdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgQ29tbWVudCAmJiBmaXJzdC5kYXRhID09PSAnJykgcmV0dXJuIGdldF9uZXh0X3NpYmxpbmcoZmlyc3QpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9XG5cblx0aWYgKGlzX3RleHQpIHtcblx0XHQvLyBpZiBhbiB7ZXhwcmVzc2lvbn0gaXMgZW1wdHkgZHVyaW5nIFNTUiwgdGhlcmUgbWlnaHQgYmUgbm9cblx0XHQvLyB0ZXh0IG5vZGUgdG8gaHlkcmF0ZSDigJQgd2UgbXVzdCB0aGVyZWZvcmUgY3JlYXRlIG9uZVxuXHRcdGlmIChoeWRyYXRlX25vZGU/Lm5vZGVUeXBlICE9PSBURVhUX05PREUpIHtcblx0XHRcdHZhciB0ZXh0ID0gY3JlYXRlX3RleHQoKTtcblxuXHRcdFx0aHlkcmF0ZV9ub2RlPy5iZWZvcmUodGV4dCk7XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKHRleHQpO1xuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0fVxuXG5cdFx0bWVyZ2VfdGV4dF9ub2RlcygvKiogQHR5cGUge1RleHR9ICovIChoeWRyYXRlX25vZGUpKTtcblx0fVxuXG5cdHJldHVybiBoeWRyYXRlX25vZGU7XG59XG5cbi8qKlxuICogRG9uJ3QgbWFyayB0aGlzIGFzIHNpZGUtZWZmZWN0LWZyZWUsIGh5ZHJhdGlvbiBuZWVkcyB0byB3YWxrIGFsbCBub2Rlc1xuICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IG5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICogQHBhcmFtIHtib29sZWFufSBpc190ZXh0XG4gKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlIHwgbnVsbH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpYmxpbmcobm9kZSwgY291bnQgPSAxLCBpc190ZXh0ID0gZmFsc2UpIHtcblx0bGV0IG5leHRfc2libGluZyA9IGh5ZHJhdGluZyA/IGh5ZHJhdGVfbm9kZSA6IG5vZGU7XG5cdHZhciBsYXN0X3NpYmxpbmc7XG5cblx0d2hpbGUgKGNvdW50LS0pIHtcblx0XHRsYXN0X3NpYmxpbmcgPSBuZXh0X3NpYmxpbmc7XG5cdFx0bmV4dF9zaWJsaW5nID0gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChnZXRfbmV4dF9zaWJsaW5nKG5leHRfc2libGluZykpO1xuXHR9XG5cblx0aWYgKCFoeWRyYXRpbmcpIHtcblx0XHRyZXR1cm4gbmV4dF9zaWJsaW5nO1xuXHR9XG5cblx0aWYgKGlzX3RleHQpIHtcblx0XHQvLyBpZiBhIHNpYmxpbmcge2V4cHJlc3Npb259IGlzIGVtcHR5IGR1cmluZyBTU1IsIHRoZXJlIG1pZ2h0IGJlIG5vXG5cdFx0Ly8gdGV4dCBub2RlIHRvIGh5ZHJhdGUg4oCUIHdlIG11c3QgdGhlcmVmb3JlIGNyZWF0ZSBvbmVcblx0XHRpZiAobmV4dF9zaWJsaW5nPy5ub2RlVHlwZSAhPT0gVEVYVF9OT0RFKSB7XG5cdFx0XHR2YXIgdGV4dCA9IGNyZWF0ZV90ZXh0KCk7XG5cdFx0XHQvLyBJZiB0aGUgbmV4dCBzaWJsaW5nIGlzIGBudWxsYCBhbmQgd2UncmUgaGFuZGxpbmcgdGV4dCB0aGVuIGl0J3MgYmVjYXVzZVxuXHRcdFx0Ly8gdGhlIFNTUiBjb250ZW50IHdhcyBlbXB0eSBmb3IgdGhlIHRleHQsIHNvIHdlIG5lZWQgdG8gZ2VuZXJhdGUgYSBuZXcgdGV4dFxuXHRcdFx0Ly8gbm9kZSBhbmQgaW5zZXJ0IGl0IGFmdGVyIHRoZSBsYXN0IHNpYmxpbmdcblx0XHRcdGlmIChuZXh0X3NpYmxpbmcgPT09IG51bGwpIHtcblx0XHRcdFx0bGFzdF9zaWJsaW5nPy5hZnRlcih0ZXh0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5leHRfc2libGluZy5iZWZvcmUodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKHRleHQpO1xuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0fVxuXG5cdFx0bWVyZ2VfdGV4dF9ub2RlcygvKiogQHR5cGUge1RleHR9ICovIChuZXh0X3NpYmxpbmcpKTtcblx0fVxuXG5cdHNldF9oeWRyYXRlX25vZGUobmV4dF9zaWJsaW5nKTtcblx0cmV0dXJuIG5leHRfc2libGluZztcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge05vZGV9IE5cbiAqIEBwYXJhbSB7Tn0gbm9kZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcl90ZXh0X2NvbnRlbnQobm9kZSkge1xuXHRub2RlLnRleHRDb250ZW50ID0gJyc7XG59XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgd2UncmUgdXBkYXRpbmcgdGhlIGN1cnJlbnQgYmxvY2ssIGZvciBleGFtcGxlIGBjb25kaXRpb25gIGluXG4gKiBhbiBgeyNpZiBjb25kaXRpb259YCBibG9jayBqdXN0IGNoYW5nZWQuIEluIHRoaXMgY2FzZSwgdGhlIGJyYW5jaCBzaG91bGQgYmVcbiAqIGFwcGVuZGVkIChvciByZW1vdmVkKSBhdCB0aGUgc2FtZSB0aW1lIGFzIG90aGVyIHVwZGF0ZXMgd2l0aGluIHRoZVxuICogY3VycmVudCBgPHN2ZWx0ZTpib3VuZGFyeT5gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRfZGVmZXJfYXBwZW5kKCkge1xuXHRpZiAoIWFzeW5jX21vZGVfZmxhZykgcmV0dXJuIGZhbHNlO1xuXHRpZiAoZWFnZXJfYmxvY2tfZWZmZWN0cyAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG5cdHZhciBmbGFncyA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkuZjtcblx0cmV0dXJuIChmbGFncyAmIFJFQUNUSU9OX1JBTikgIT09IDA7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXAgfCBzdHJpbmd9IFRcbiAqIEBwYXJhbSB7VH0gdGFnXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZV1cbiAqIEBwYXJhbSB7c3RyaW5nfSBbaXNdXG4gKiBAcmV0dXJucyB7VCBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcCA/IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtUXSA6IEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfZWxlbWVudCh0YWcsIG5hbWVzcGFjZSwgaXMpIHtcblx0bGV0IG9wdGlvbnMgPSBpcyA/IHsgaXMgfSA6IHVuZGVmaW5lZDtcblx0cmV0dXJuIC8qKiBAdHlwZSB7VCBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcCA/IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtUXSA6IEVsZW1lbnR9ICovIChcblx0XHRkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlID8/IE5BTUVTUEFDRV9IVE1MLCB0YWcsIG9wdGlvbnMpXG5cdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfZnJhZ21lbnQoKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfY29tbWVudChkYXRhID0gJycpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoZGF0YSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYXR0cmlidXRlKGVsZW1lbnQsIGtleSwgdmFsdWUgPSAnJykge1xuXHRpZiAoa2V5LnN0YXJ0c1dpdGgoJ3hsaW5rOicpKSB7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGtleSwgdmFsdWUpO1xuXHRcdHJldHVybjtcblx0fVxuXHRyZXR1cm4gZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG59XG5cbi8qKlxuICogQnJvd3NlcnMgc3BsaXQgdGV4dCBub2RlcyBsYXJnZXIgdGhhbiA2NTUzNiBieXRlcyB3aGVuIHBhcnNpbmcuXG4gKiBGb3IgaHlkcmF0aW9uIHRvIHN1Y2NlZWQsIHdlIG5lZWQgdG8gc3RpdGNoIHRoZW0gYmFjayB0b2dldGhlclxuICogQHBhcmFtIHtUZXh0fSB0ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZV90ZXh0X25vZGVzKHRleHQpIHtcblx0aWYgKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAodGV4dC5ub2RlVmFsdWUpLmxlbmd0aCA8IDY1NTM2KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IG5leHQgPSB0ZXh0Lm5leHRTaWJsaW5nO1xuXG5cdHdoaWxlIChuZXh0ICE9PSBudWxsICYmIG5leHQubm9kZVR5cGUgPT09IFRFWFRfTk9ERSkge1xuXHRcdG5leHQucmVtb3ZlKCk7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi8gKHRleHQubm9kZVZhbHVlKSArPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKG5leHQubm9kZVZhbHVlKTtcblxuXHRcdG5leHQgPSB0ZXh0Lm5leHRTaWJsaW5nO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoeWRyYXRpbmcgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgY2xlYXJfdGV4dF9jb250ZW50LCBnZXRfZmlyc3RfY2hpbGQgfSBmcm9tICcuLi9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IHF1ZXVlX21pY3JvX3Rhc2sgfSBmcm9tICcuLi90YXNrLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0b2ZvY3VzKGRvbSwgdmFsdWUpIHtcblx0aWYgKHZhbHVlKSB7XG5cdFx0Y29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cdFx0ZG9tLmF1dG9mb2N1cyA9IHRydWU7XG5cblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBib2R5KSB7XG5cdFx0XHRcdGRvbS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIGNoaWxkIG9mIGEgdGV4dGFyZWEgYWN0dWFsbHkgY29ycmVzcG9uZHMgdG8gdGhlIGRlZmF1bHRWYWx1ZSBwcm9wZXJ0eSwgc28gd2UgbmVlZFxuICogdG8gcmVtb3ZlIGl0IHVwb24gaHlkcmF0aW9uIHRvIGF2b2lkIGEgYnVnIHdoZW4gc29tZW9uZSByZXNldHMgdGhlIGZvcm0gdmFsdWUuXG4gKiBAcGFyYW0ge0hUTUxUZXh0QXJlYUVsZW1lbnR9IGRvbVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVfdGV4dGFyZWFfY2hpbGQoZG9tKSB7XG5cdGlmIChoeWRyYXRpbmcgJiYgZ2V0X2ZpcnN0X2NoaWxkKGRvbSkgIT09IG51bGwpIHtcblx0XHRjbGVhcl90ZXh0X2NvbnRlbnQoZG9tKTtcblx0fVxufVxuXG5sZXQgbGlzdGVuaW5nX3RvX2Zvcm1fcmVzZXQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZF9mb3JtX3Jlc2V0X2xpc3RlbmVyKCkge1xuXHRpZiAoIWxpc3RlbmluZ190b19mb3JtX3Jlc2V0KSB7XG5cdFx0bGlzdGVuaW5nX3RvX2Zvcm1fcmVzZXQgPSB0cnVlO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQncmVzZXQnLFxuXHRcdFx0KGV2dCkgPT4ge1xuXHRcdFx0XHQvLyBOZWVkcyB0byBoYXBwZW4gb25lIHRpY2sgbGF0ZXIgb3IgZWxzZSB0aGUgZG9tIHByb3BlcnRpZXMgb2YgdGhlIGZvcm1cblx0XHRcdFx0Ly8gZWxlbWVudHMgaGF2ZSBub3QgdXBkYXRlZCB0byB0aGVpciByZXNldCB2YWx1ZXMgeWV0XG5cdFx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXZ0LmRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdFx0XHRcdGZvciAoY29uc3QgZSBvZiAvKipAdHlwZSB7SFRNTEZvcm1FbGVtZW50fSAqLyAoZXZ0LnRhcmdldCkuZWxlbWVudHMpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0XHRcdFx0XHRlLl9fb25fcj8uKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHQvLyBJbiB0aGUgY2FwdHVyZSBwaGFzZSB0byBndWFyYW50ZWUgd2UgZ2V0IG5vdGljZWQgb2YgaXQgKG5vIHBvc3NpYmlsaXR5IG9mIHN0b3BQcm9wYWdhdGlvbilcblx0XHRcdHsgY2FwdHVyZTogdHJ1ZSB9XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgdGVhcmRvd24gfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHtcblx0YWN0aXZlX2VmZmVjdCxcblx0YWN0aXZlX3JlYWN0aW9uLFxuXHRzZXRfYWN0aXZlX2VmZmVjdCxcblx0c2V0X2FjdGl2ZV9yZWFjdGlvblxufSBmcm9tICcuLi8uLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IGFkZF9mb3JtX3Jlc2V0X2xpc3RlbmVyIH0gZnJvbSAnLi4vbWlzYy5qcyc7XG5cbi8qKlxuICogRmlyZXMgdGhlIGhhbmRsZXIgb25jZSBpbW1lZGlhdGVseSAodW5sZXNzIGNvcnJlc3BvbmRpbmcgYXJnIGlzIHNldCB0byBgZmFsc2VgKSxcbiAqIHRoZW4gbGlzdGVucyB0byB0aGUgZ2l2ZW4gZXZlbnRzIHVudGlsIHRoZSByZW5kZXIgZWZmZWN0IGNvbnRleHQgaXMgZGVzdHJveWVkXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZXZlbnRzXG4gKiBAcGFyYW0geyhldmVudD86IEV2ZW50KSA9PiB2b2lkfSBoYW5kbGVyXG4gKiBAcGFyYW0ge2FueX0gY2FsbF9oYW5kbGVyX2ltbWVkaWF0ZWx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW4odGFyZ2V0LCBldmVudHMsIGhhbmRsZXIsIGNhbGxfaGFuZGxlcl9pbW1lZGlhdGVseSA9IHRydWUpIHtcblx0aWYgKGNhbGxfaGFuZGxlcl9pbW1lZGlhdGVseSkge1xuXHRcdGhhbmRsZXIoKTtcblx0fVxuXG5cdGZvciAodmFyIG5hbWUgb2YgZXZlbnRzKSB7XG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG5cdH1cblxuXHR0ZWFyZG93bigoKSA9PiB7XG5cdFx0Zm9yICh2YXIgbmFtZSBvZiBldmVudHMpIHtcblx0XHRcdHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7KCkgPT4gVH0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dChmbikge1xuXHR2YXIgcHJldmlvdXNfcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXHRzZXRfYWN0aXZlX3JlYWN0aW9uKG51bGwpO1xuXHRzZXRfYWN0aXZlX2VmZmVjdChudWxsKTtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZm4oKTtcblx0fSBmaW5hbGx5IHtcblx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHByZXZpb3VzX3JlYWN0aW9uKTtcblx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHR9XG59XG5cbi8qKlxuICogTGlzdGVuIHRvIHRoZSBnaXZlbiBldmVudCwgYW5kIHRoZW4gaW5zdGFudGlhdGUgYSBnbG9iYWwgZm9ybSByZXNldCBsaXN0ZW5lciBpZiBub3QgYWxyZWFkeSBkb25lLFxuICogdG8gbm90aWZ5IGFsbCBiaW5kaW5ncyB3aGVuIHRoZSBmb3JtIGlzIHJlc2V0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7KGlzX3Jlc2V0PzogdHJ1ZSkgPT4gdm9pZH0gaGFuZGxlclxuICogQHBhcmFtIHsoaXNfcmVzZXQ/OiB0cnVlKSA9PiB2b2lkfSBbb25fcmVzZXRdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50KGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBvbl9yZXNldCA9IGhhbmRsZXIpIHtcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoKSA9PiB3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQoaGFuZGxlcikpO1xuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdGNvbnN0IHByZXYgPSBlbGVtZW50Ll9fb25fcjtcblx0aWYgKHByZXYpIHtcblx0XHQvLyBzcGVjaWFsIGNhc2UgZm9yIGNoZWNrYm94IHRoYXQgY2FuIGhhdmUgbXVsdGlwbGUgYmluZHMgKGdyb3VwICYgY2hlY2tlZClcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudC5fX29uX3IgPSAoKSA9PiB7XG5cdFx0XHRwcmV2KCk7XG5cdFx0XHRvbl9yZXNldCh0cnVlKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50Ll9fb25fciA9ICgpID0+IG9uX3Jlc2V0KHRydWUpO1xuXHR9XG5cblx0YWRkX2Zvcm1fcmVzZXRfbGlzdGVuZXIoKTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgQmxvY2tlciwgQ29tcG9uZW50Q29udGV4dCwgQ29tcG9uZW50Q29udGV4dExlZ2FjeSwgRGVyaXZlZCwgRWZmZWN0LCBUZW1wbGF0ZU5vZGUsIFRyYW5zaXRpb25NYW5hZ2VyIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7XG5cdGlzX2RpcnR5LFxuXHRhY3RpdmVfZWZmZWN0LFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdHVwZGF0ZV9lZmZlY3QsXG5cdGdldCxcblx0aXNfZGVzdHJveWluZ19lZmZlY3QsXG5cdHJlbW92ZV9yZWFjdGlvbnMsXG5cdHNldF9hY3RpdmVfcmVhY3Rpb24sXG5cdHNldF9pc19kZXN0cm95aW5nX2VmZmVjdCxcblx0dW50cmFjayxcblx0dW50cmFja2luZ1xufSBmcm9tICcuLi9ydW50aW1lLmpzJztcbmltcG9ydCB7XG5cdERJUlRZLFxuXHRCUkFOQ0hfRUZGRUNULFxuXHRSRU5ERVJfRUZGRUNULFxuXHRFRkZFQ1QsXG5cdERFU1RST1lFRCxcblx0SU5FUlQsXG5cdFJFQUNUSU9OX1JBTixcblx0QkxPQ0tfRUZGRUNULFxuXHRST09UX0VGRkVDVCxcblx0RUZGRUNUX1RSQU5TUEFSRU5ULFxuXHRERVJJVkVELFxuXHRDTEVBTixcblx0RUFHRVJfRUZGRUNULFxuXHRIRUFEX0VGRkVDVCxcblx0TUFZQkVfRElSVFksXG5cdEVGRkVDVF9QUkVTRVJWRUQsXG5cdFNUQUxFX1JFQUNUSU9OLFxuXHRVU0VSX0VGRkVDVCxcblx0QVNZTkMsXG5cdENPTk5FQ1RFRCxcblx0TUFOQUdFRF9FRkZFQ1Rcbn0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBkZWZpbmVfcHJvcGVydHkgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgZ2V0X25leHRfc2libGluZyB9IGZyb20gJy4uL2RvbS9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9jb250ZXh0LCBkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24sIGRldl9zdGFjayB9IGZyb20gJy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgQmF0Y2gsIHNjaGVkdWxlX2VmZmVjdCB9IGZyb20gJy4vYmF0Y2guanMnO1xuaW1wb3J0IHsgZmxhdHRlbiwgaW5jcmVtZW50X3BlbmRpbmcgfSBmcm9tICcuL2FzeW5jLmpzJztcbmltcG9ydCB7IHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dCB9IGZyb20gJy4uL2RvbS9lbGVtZW50cy9iaW5kaW5ncy9zaGFyZWQuanMnO1xuaW1wb3J0IHsgc2V0X3NpZ25hbF9zdGF0dXMgfSBmcm9tICcuL3N0YXR1cy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsnJGVmZmVjdCcgfCAnJGVmZmVjdC5wcmUnIHwgJyRpbnNwZWN0J30gcnVuZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfZWZmZWN0KHJ1bmUpIHtcblx0aWYgKGFjdGl2ZV9lZmZlY3QgPT09IG51bGwpIHtcblx0XHRpZiAoYWN0aXZlX3JlYWN0aW9uID09PSBudWxsKSB7XG5cdFx0XHRlLmVmZmVjdF9vcnBoYW4ocnVuZSk7XG5cdFx0fVxuXG5cdFx0ZS5lZmZlY3RfaW5fdW5vd25lZF9kZXJpdmVkKCk7XG5cdH1cblxuXHRpZiAoaXNfZGVzdHJveWluZ19lZmZlY3QpIHtcblx0XHRlLmVmZmVjdF9pbl90ZWFyZG93bihydW5lKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7RWZmZWN0fSBwYXJlbnRfZWZmZWN0XG4gKi9cbmZ1bmN0aW9uIHB1c2hfZWZmZWN0KGVmZmVjdCwgcGFyZW50X2VmZmVjdCkge1xuXHR2YXIgcGFyZW50X2xhc3QgPSBwYXJlbnRfZWZmZWN0Lmxhc3Q7XG5cdGlmIChwYXJlbnRfbGFzdCA9PT0gbnVsbCkge1xuXHRcdHBhcmVudF9lZmZlY3QubGFzdCA9IHBhcmVudF9lZmZlY3QuZmlyc3QgPSBlZmZlY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cGFyZW50X2xhc3QubmV4dCA9IGVmZmVjdDtcblx0XHRlZmZlY3QucHJldiA9IHBhcmVudF9sYXN0O1xuXHRcdHBhcmVudF9lZmZlY3QubGFzdCA9IGVmZmVjdDtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlXG4gKiBAcGFyYW0ge251bGwgfCAoKCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKSl9IGZuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHN5bmNcbiAqIEByZXR1cm5zIHtFZmZlY3R9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZV9lZmZlY3QodHlwZSwgZm4sIHN5bmMpIHtcblx0dmFyIHBhcmVudCA9IGFjdGl2ZV9lZmZlY3Q7XG5cblx0aWYgKERFVikge1xuXHRcdC8vIEVuc3VyZSB0aGUgcGFyZW50IGlzIG5ldmVyIGFuIGluc3BlY3QgZWZmZWN0XG5cdFx0d2hpbGUgKHBhcmVudCAhPT0gbnVsbCAmJiAocGFyZW50LmYgJiBFQUdFUl9FRkZFQ1QpICE9PSAwKSB7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuXHRcdH1cblx0fVxuXG5cdGlmIChwYXJlbnQgIT09IG51bGwgJiYgKHBhcmVudC5mICYgSU5FUlQpICE9PSAwKSB7XG5cdFx0dHlwZSB8PSBJTkVSVDtcblx0fVxuXG5cdC8qKiBAdHlwZSB7RWZmZWN0fSAqL1xuXHR2YXIgZWZmZWN0ID0ge1xuXHRcdGN0eDogY29tcG9uZW50X2NvbnRleHQsXG5cdFx0ZGVwczogbnVsbCxcblx0XHRub2RlczogbnVsbCxcblx0XHRmOiB0eXBlIHwgRElSVFkgfCBDT05ORUNURUQsXG5cdFx0Zmlyc3Q6IG51bGwsXG5cdFx0Zm4sXG5cdFx0bGFzdDogbnVsbCxcblx0XHRuZXh0OiBudWxsLFxuXHRcdHBhcmVudCxcblx0XHRiOiBwYXJlbnQgJiYgcGFyZW50LmIsXG5cdFx0cHJldjogbnVsbCxcblx0XHR0ZWFyZG93bjogbnVsbCxcblx0XHR3djogMCxcblx0XHRhYzogbnVsbFxuXHR9O1xuXG5cdGlmIChERVYpIHtcblx0XHRlZmZlY3QuY29tcG9uZW50X2Z1bmN0aW9uID0gZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uO1xuXHR9XG5cblx0aWYgKHN5bmMpIHtcblx0XHR0cnkge1xuXHRcdFx0dXBkYXRlX2VmZmVjdChlZmZlY3QpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH1cblx0fSBlbHNlIGlmIChmbiAhPT0gbnVsbCkge1xuXHRcdHNjaGVkdWxlX2VmZmVjdChlZmZlY3QpO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuXHR2YXIgZSA9IGVmZmVjdDtcblxuXHQvLyBpZiBhbiBlZmZlY3QgaGFzIGFscmVhZHkgcmFuIGFuZCBkb2Vzbid0IG5lZWQgdG8gYmUga2VwdCBpbiB0aGUgdHJlZVxuXHQvLyAoYmVjYXVzZSBpdCB3b24ndCByZS1ydW4sIGhhcyBubyBET00sIGFuZCBoYXMgbm8gdGVhcmRvd24gZXRjKVxuXHQvLyB0aGVuIHdlIHNraXAgaXQgYW5kIGdvIHRvIGl0cyBjaGlsZCAoaWYgYW55KVxuXHRpZiAoXG5cdFx0c3luYyAmJlxuXHRcdGUuZGVwcyA9PT0gbnVsbCAmJlxuXHRcdGUudGVhcmRvd24gPT09IG51bGwgJiZcblx0XHRlLm5vZGVzID09PSBudWxsICYmXG5cdFx0ZS5maXJzdCA9PT0gZS5sYXN0ICYmIC8vIGVpdGhlciBgbnVsbGAsIG9yIGEgc2luZ3VsYXIgY2hpbGRcblx0XHQoZS5mICYgRUZGRUNUX1BSRVNFUlZFRCkgPT09IDBcblx0KSB7XG5cdFx0ZSA9IGUuZmlyc3Q7XG5cdFx0aWYgKCh0eXBlICYgQkxPQ0tfRUZGRUNUKSAhPT0gMCAmJiAodHlwZSAmIEVGRkVDVF9UUkFOU1BBUkVOVCkgIT09IDAgJiYgZSAhPT0gbnVsbCkge1xuXHRcdFx0ZS5mIHw9IEVGRkVDVF9UUkFOU1BBUkVOVDtcblx0XHR9XG5cdH1cblxuXHRpZiAoZSAhPT0gbnVsbCkge1xuXHRcdGUucGFyZW50ID0gcGFyZW50O1xuXG5cdFx0aWYgKHBhcmVudCAhPT0gbnVsbCkge1xuXHRcdFx0cHVzaF9lZmZlY3QoZSwgcGFyZW50KTtcblx0XHR9XG5cblx0XHQvLyBpZiB3ZSdyZSBpbiBhIGRlcml2ZWQsIGFkZCB0aGUgZWZmZWN0IHRoZXJlIHRvb1xuXHRcdGlmIChcblx0XHRcdGFjdGl2ZV9yZWFjdGlvbiAhPT0gbnVsbCAmJlxuXHRcdFx0KGFjdGl2ZV9yZWFjdGlvbi5mICYgREVSSVZFRCkgIT09IDAgJiZcblx0XHRcdCh0eXBlICYgUk9PVF9FRkZFQ1QpID09PSAwXG5cdFx0KSB7XG5cdFx0XHR2YXIgZGVyaXZlZCA9IC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGFjdGl2ZV9yZWFjdGlvbik7XG5cdFx0XHQoZGVyaXZlZC5lZmZlY3RzID8/PSBbXSkucHVzaChlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWZmZWN0O1xufVxuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGAkZWZmZWN0LnRyYWNraW5nKClgXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdF90cmFja2luZygpIHtcblx0cmV0dXJuIGFjdGl2ZV9yZWFjdGlvbiAhPT0gbnVsbCAmJiAhdW50cmFja2luZztcbn1cblxuLyoqXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZWFyZG93bihmbikge1xuXHRjb25zdCBlZmZlY3QgPSBjcmVhdGVfZWZmZWN0KFJFTkRFUl9FRkZFQ1QsIG51bGwsIGZhbHNlKTtcblx0c2V0X3NpZ25hbF9zdGF0dXMoZWZmZWN0LCBDTEVBTik7XG5cdGVmZmVjdC50ZWFyZG93biA9IGZuO1xuXHRyZXR1cm4gZWZmZWN0O1xufVxuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGAkZWZmZWN0KC4uLilgXG4gKiBAcGFyYW0geygpID0+IHZvaWQgfCAoKCkgPT4gdm9pZCl9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VyX2VmZmVjdChmbikge1xuXHR2YWxpZGF0ZV9lZmZlY3QoJyRlZmZlY3QnKTtcblxuXHRpZiAoREVWKSB7XG5cdFx0ZGVmaW5lX3Byb3BlcnR5KGZuLCAnbmFtZScsIHtcblx0XHRcdHZhbHVlOiAnJGVmZmVjdCdcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vbi1uZXN0ZWQgYCRlZmZlY3QoLi4uKWAgaW4gYSBjb21wb25lbnQgc2hvdWxkIGJlIGRlZmVycmVkXG5cdC8vIHVudGlsIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZFxuXHR2YXIgZmxhZ3MgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpLmY7XG5cdHZhciBkZWZlciA9ICFhY3RpdmVfcmVhY3Rpb24gJiYgKGZsYWdzICYgQlJBTkNIX0VGRkVDVCkgIT09IDAgJiYgKGZsYWdzICYgUkVBQ1RJT05fUkFOKSA9PT0gMDtcblxuXHRpZiAoZGVmZXIpIHtcblx0XHQvLyBUb3AtbGV2ZWwgYCRlZmZlY3QoLi4uKWAgaW4gYW4gdW5tb3VudGVkIGNvbXBvbmVudCDigJQgZGVmZXIgdW50aWwgbW91bnRcblx0XHR2YXIgY29udGV4dCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dH0gKi8gKGNvbXBvbmVudF9jb250ZXh0KTtcblx0XHQoY29udGV4dC5lID8/PSBbXSkucHVzaChmbik7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gRXZlcnl0aGluZyBlbHNlIOKAlCBjcmVhdGUgaW1tZWRpYXRlbHlcblx0XHRyZXR1cm4gY3JlYXRlX3VzZXJfZWZmZWN0KGZuKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV91c2VyX2VmZmVjdChmbikge1xuXHRyZXR1cm4gY3JlYXRlX2VmZmVjdChFRkZFQ1QgfCBVU0VSX0VGRkVDVCwgZm4sIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBJbnRlcm5hbCByZXByZXNlbnRhdGlvbiBvZiBgJGVmZmVjdC5wcmUoLi4uKWBcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEByZXR1cm5zIHtFZmZlY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VyX3ByZV9lZmZlY3QoZm4pIHtcblx0dmFsaWRhdGVfZWZmZWN0KCckZWZmZWN0LnByZScpO1xuXHRpZiAoREVWKSB7XG5cdFx0ZGVmaW5lX3Byb3BlcnR5KGZuLCAnbmFtZScsIHtcblx0XHRcdHZhbHVlOiAnJGVmZmVjdC5wcmUnXG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGNyZWF0ZV9lZmZlY3QoUkVOREVSX0VGRkVDVCB8IFVTRVJfRUZGRUNULCBmbiwgdHJ1ZSk7XG59XG5cbi8qKiBAcGFyYW0geygpID0+IHZvaWQgfCAoKCkgPT4gdm9pZCl9IGZuICovXG5leHBvcnQgZnVuY3Rpb24gZWFnZXJfZWZmZWN0KGZuKSB7XG5cdHJldHVybiBjcmVhdGVfZWZmZWN0KEVBR0VSX0VGRkVDVCwgZm4sIHRydWUpO1xufVxuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGAkZWZmZWN0LnJvb3QoLi4uKWBcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEByZXR1cm5zIHsoKSA9PiB2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0X3Jvb3QoZm4pIHtcblx0QmF0Y2guZW5zdXJlKCk7XG5cdGNvbnN0IGVmZmVjdCA9IGNyZWF0ZV9lZmZlY3QoUk9PVF9FRkZFQ1QgfCBFRkZFQ1RfUFJFU0VSVkVELCBmbiwgdHJ1ZSk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRkZXN0cm95X2VmZmVjdChlZmZlY3QpO1xuXHR9O1xufVxuXG4vKipcbiAqIEFuIGVmZmVjdCByb290IHdob3NlIGNoaWxkcmVuIGNhbiB0cmFuc2l0aW9uIG91dFxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBmblxuICogQHJldHVybnMgeyhvcHRpb25zPzogeyBvdXRybz86IGJvb2xlYW4gfSkgPT4gUHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudF9yb290KGZuKSB7XG5cdEJhdGNoLmVuc3VyZSgpO1xuXHRjb25zdCBlZmZlY3QgPSBjcmVhdGVfZWZmZWN0KFJPT1RfRUZGRUNUIHwgRUZGRUNUX1BSRVNFUlZFRCwgZm4sIHRydWUpO1xuXG5cdHJldHVybiAob3B0aW9ucyA9IHt9KSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWwpID0+IHtcblx0XHRcdGlmIChvcHRpb25zLm91dHJvKSB7XG5cdFx0XHRcdHBhdXNlX2VmZmVjdChlZmZlY3QsICgpID0+IHtcblx0XHRcdFx0XHRkZXN0cm95X2VmZmVjdChlZmZlY3QpO1xuXHRcdFx0XHRcdGZ1bGZpbCh1bmRlZmluZWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRcdGZ1bGZpbCh1bmRlZmluZWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEByZXR1cm5zIHtFZmZlY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3QoZm4pIHtcblx0cmV0dXJuIGNyZWF0ZV9lZmZlY3QoRUZGRUNULCBmbiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGAkOiAuLmBcbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBkZXBzXG4gKiBAcGFyYW0geygpID0+IHZvaWQgfCAoKCkgPT4gdm9pZCl9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZWdhY3lfcHJlX2VmZmVjdChkZXBzLCBmbikge1xuXHR2YXIgY29udGV4dCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dExlZ2FjeX0gKi8gKGNvbXBvbmVudF9jb250ZXh0KTtcblxuXHQvKiogQHR5cGUge3sgZWZmZWN0OiBudWxsIHwgRWZmZWN0LCByYW46IGJvb2xlYW4sIGRlcHM6ICgpID0+IGFueSB9fSAqL1xuXHR2YXIgdG9rZW4gPSB7IGVmZmVjdDogbnVsbCwgcmFuOiBmYWxzZSwgZGVwcyB9O1xuXG5cdGNvbnRleHQubC4kLnB1c2godG9rZW4pO1xuXG5cdHRva2VuLmVmZmVjdCA9IHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdGRlcHMoKTtcblxuXHRcdC8vIElmIHRoaXMgbGVnYWN5IHByZSBlZmZlY3QgaGFzIGFscmVhZHkgcnVuIGJlZm9yZSB0aGUgZW5kIG9mIHRoZSByZXNldCwgdGhlblxuXHRcdC8vIGJhaWwgb3V0IHRvIGVtdWxhdGUgdGhlIHNhbWUgYmVoYXZpb3IuXG5cdFx0aWYgKHRva2VuLnJhbikgcmV0dXJuO1xuXG5cdFx0dG9rZW4ucmFuID0gdHJ1ZTtcblx0XHR1bnRyYWNrKGZuKTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWdhY3lfcHJlX2VmZmVjdF9yZXNldCgpIHtcblx0dmFyIGNvbnRleHQgPSAvKiogQHR5cGUge0NvbXBvbmVudENvbnRleHRMZWdhY3l9ICovIChjb21wb25lbnRfY29udGV4dCk7XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0Ly8gUnVuIGRpcnR5IGAkOmAgc3RhdGVtZW50c1xuXHRcdGZvciAodmFyIHRva2VuIG9mIGNvbnRleHQubC4kKSB7XG5cdFx0XHR0b2tlbi5kZXBzKCk7XG5cblx0XHRcdHZhciBlZmZlY3QgPSB0b2tlbi5lZmZlY3Q7XG5cblx0XHRcdC8vIElmIHRoZSBlZmZlY3QgaXMgQ0xFQU4sIHRoZW4gbWFrZSBpdCBNQVlCRV9ESVJUWS4gVGhpcyBlbnN1cmVzIHdlIHRyYXZlcnNlIHRocm91Z2hcblx0XHRcdC8vIHRoZSBlZmZlY3RzIGRlcGVuZGVuY2llcyBhbmQgY29ycmVjdGx5IGVuc3VyZSBlYWNoIGRlcGVuZGVuY3kgaXMgdXAtdG8tZGF0ZS5cblx0XHRcdGlmICgoZWZmZWN0LmYgJiBDTEVBTikgIT09IDAgJiYgZWZmZWN0LmRlcHMgIT09IG51bGwpIHtcblx0XHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMoZWZmZWN0LCBNQVlCRV9ESVJUWSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc19kaXJ0eShlZmZlY3QpKSB7XG5cdFx0XHRcdHVwZGF0ZV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0dG9rZW4ucmFuID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygpID0+IHZvaWQgfCAoKCkgPT4gdm9pZCl9IGZuXG4gKiBAcmV0dXJucyB7RWZmZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXN5bmNfZWZmZWN0KGZuKSB7XG5cdHJldHVybiBjcmVhdGVfZWZmZWN0KEFTWU5DIHwgRUZGRUNUX1BSRVNFUlZFRCwgZm4sIHRydWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEByZXR1cm5zIHtFZmZlY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJfZWZmZWN0KGZuLCBmbGFncyA9IDApIHtcblx0cmV0dXJuIGNyZWF0ZV9lZmZlY3QoUkVOREVSX0VGRkVDVCB8IGZsYWdzLCBmbiwgdHJ1ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoLi4uZXhwcmVzc2lvbnM6IGFueSkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gYW55Pn0gc3luY1xuICogQHBhcmFtIHtBcnJheTwoKSA9PiBQcm9taXNlPGFueT4+fSBhc3luY1xuICogQHBhcmFtIHtCbG9ja2VyW119IGJsb2NrZXJzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZV9lZmZlY3QoZm4sIHN5bmMgPSBbXSwgYXN5bmMgPSBbXSwgYmxvY2tlcnMgPSBbXSkge1xuXHRmbGF0dGVuKGJsb2NrZXJzLCBzeW5jLCBhc3luYywgKHZhbHVlcykgPT4ge1xuXHRcdGNyZWF0ZV9lZmZlY3QoUkVOREVSX0VGRkVDVCwgKCkgPT4gZm4oLi4udmFsdWVzLm1hcChnZXQpKSwgdHJ1ZSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIExpa2UgYHRlbXBsYXRlX2VmZmVjdGAsIGJ1dCB3aXRoIGFuIGVmZmVjdCB3aGljaCBpcyBkZWZlcnJlZCB1bnRpbCB0aGUgYmF0Y2ggY29tbWl0c1xuICogQHBhcmFtIHsoLi4uZXhwcmVzc2lvbnM6IGFueSkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKX0gZm5cbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gYW55Pn0gc3luY1xuICogQHBhcmFtIHtBcnJheTwoKSA9PiBQcm9taXNlPGFueT4+fSBhc3luY1xuICogQHBhcmFtIHtCbG9ja2VyW119IGJsb2NrZXJzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZlcnJlZF90ZW1wbGF0ZV9lZmZlY3QoZm4sIHN5bmMgPSBbXSwgYXN5bmMgPSBbXSwgYmxvY2tlcnMgPSBbXSkge1xuXHRpZiAoYXN5bmMubGVuZ3RoID4gMCB8fCBibG9ja2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0dmFyIGRlY3JlbWVudF9wZW5kaW5nID0gaW5jcmVtZW50X3BlbmRpbmcoKTtcblx0fVxuXG5cdGZsYXR0ZW4oYmxvY2tlcnMsIHN5bmMsIGFzeW5jLCAodmFsdWVzKSA9PiB7XG5cdFx0Y3JlYXRlX2VmZmVjdChFRkZFQ1QsICgpID0+IGZuKC4uLnZhbHVlcy5tYXAoZ2V0KSksIGZhbHNlKTtcblxuXHRcdGlmIChkZWNyZW1lbnRfcGVuZGluZykge1xuXHRcdFx0ZGVjcmVtZW50X3BlbmRpbmcoKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCgpID0+IHZvaWQpfSBmblxuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBibG9jayhmbiwgZmxhZ3MgPSAwKSB7XG5cdHZhciBlZmZlY3QgPSBjcmVhdGVfZWZmZWN0KEJMT0NLX0VGRkVDVCB8IGZsYWdzLCBmbiwgdHJ1ZSk7XG5cdGlmIChERVYpIHtcblx0XHRlZmZlY3QuZGV2X3N0YWNrID0gZGV2X3N0YWNrO1xuXHR9XG5cdHJldHVybiBlZmZlY3Q7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKCkgPT4gdm9pZCl9IGZuXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hbmFnZWQoZm4sIGZsYWdzID0gMCkge1xuXHR2YXIgZWZmZWN0ID0gY3JlYXRlX2VmZmVjdChNQU5BR0VEX0VGRkVDVCB8IGZsYWdzLCBmbiwgdHJ1ZSk7XG5cdGlmIChERVYpIHtcblx0XHRlZmZlY3QuZGV2X3N0YWNrID0gZGV2X3N0YWNrO1xuXHR9XG5cdHJldHVybiBlZmZlY3Q7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKCkgPT4gdm9pZCl9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2goZm4pIHtcblx0cmV0dXJuIGNyZWF0ZV9lZmZlY3QoQlJBTkNIX0VGRkVDVCB8IEVGRkVDVF9QUkVTRVJWRUQsIGZuLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlX2VmZmVjdF90ZWFyZG93bihlZmZlY3QpIHtcblx0dmFyIHRlYXJkb3duID0gZWZmZWN0LnRlYXJkb3duO1xuXHRpZiAodGVhcmRvd24gIT09IG51bGwpIHtcblx0XHRjb25zdCBwcmV2aW91c2x5X2Rlc3Ryb3lpbmdfZWZmZWN0ID0gaXNfZGVzdHJveWluZ19lZmZlY3Q7XG5cdFx0Y29uc3QgcHJldmlvdXNfcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdFx0c2V0X2lzX2Rlc3Ryb3lpbmdfZWZmZWN0KHRydWUpO1xuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24obnVsbCk7XG5cdFx0dHJ5IHtcblx0XHRcdHRlYXJkb3duLmNhbGwobnVsbCk7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHNldF9pc19kZXN0cm95aW5nX2VmZmVjdChwcmV2aW91c2x5X2Rlc3Ryb3lpbmdfZWZmZWN0KTtcblx0XHRcdHNldF9hY3RpdmVfcmVhY3Rpb24ocHJldmlvdXNfcmVhY3Rpb24pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBzaWduYWxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVtb3ZlX2RvbVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95X2VmZmVjdF9jaGlsZHJlbihzaWduYWwsIHJlbW92ZV9kb20gPSBmYWxzZSkge1xuXHR2YXIgZWZmZWN0ID0gc2lnbmFsLmZpcnN0O1xuXHRzaWduYWwuZmlyc3QgPSBzaWduYWwubGFzdCA9IG51bGw7XG5cblx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCkge1xuXHRcdGNvbnN0IGNvbnRyb2xsZXIgPSBlZmZlY3QuYWM7XG5cblx0XHRpZiAoY29udHJvbGxlciAhPT0gbnVsbCkge1xuXHRcdFx0d2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0KCgpID0+IHtcblx0XHRcdFx0Y29udHJvbGxlci5hYm9ydChTVEFMRV9SRUFDVElPTik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR2YXIgbmV4dCA9IGVmZmVjdC5uZXh0O1xuXG5cdFx0aWYgKChlZmZlY3QuZiAmIFJPT1RfRUZGRUNUKSAhPT0gMCkge1xuXHRcdFx0Ly8gdGhpcyBpcyBub3cgYW4gaW5kZXBlbmRlbnQgcm9vdFxuXHRcdFx0ZWZmZWN0LnBhcmVudCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCwgcmVtb3ZlX2RvbSk7XG5cdFx0fVxuXG5cdFx0ZWZmZWN0ID0gbmV4dDtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBzaWduYWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveV9ibG9ja19lZmZlY3RfY2hpbGRyZW4oc2lnbmFsKSB7XG5cdHZhciBlZmZlY3QgPSBzaWduYWwuZmlyc3Q7XG5cblx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCkge1xuXHRcdHZhciBuZXh0ID0gZWZmZWN0Lm5leHQ7XG5cdFx0aWYgKChlZmZlY3QuZiAmIEJSQU5DSF9FRkZFQ1QpID09PSAwKSB7XG5cdFx0XHRkZXN0cm95X2VmZmVjdChlZmZlY3QpO1xuXHRcdH1cblx0XHRlZmZlY3QgPSBuZXh0O1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHBhcmFtIHtib29sZWFufSBbcmVtb3ZlX2RvbV1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveV9lZmZlY3QoZWZmZWN0LCByZW1vdmVfZG9tID0gdHJ1ZSkge1xuXHR2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG5cdGlmIChcblx0XHQocmVtb3ZlX2RvbSB8fCAoZWZmZWN0LmYgJiBIRUFEX0VGRkVDVCkgIT09IDApICYmXG5cdFx0ZWZmZWN0Lm5vZGVzICE9PSBudWxsICYmXG5cdFx0ZWZmZWN0Lm5vZGVzLmVuZCAhPT0gbnVsbFxuXHQpIHtcblx0XHRyZW1vdmVfZWZmZWN0X2RvbShlZmZlY3Qubm9kZXMuc3RhcnQsIC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZWZmZWN0Lm5vZGVzLmVuZCkpO1xuXHRcdHJlbW92ZWQgPSB0cnVlO1xuXHR9XG5cblx0ZGVzdHJveV9lZmZlY3RfY2hpbGRyZW4oZWZmZWN0LCByZW1vdmVfZG9tICYmICFyZW1vdmVkKTtcblx0cmVtb3ZlX3JlYWN0aW9ucyhlZmZlY3QsIDApO1xuXHRzZXRfc2lnbmFsX3N0YXR1cyhlZmZlY3QsIERFU1RST1lFRCk7XG5cblx0dmFyIHRyYW5zaXRpb25zID0gZWZmZWN0Lm5vZGVzICYmIGVmZmVjdC5ub2Rlcy50O1xuXG5cdGlmICh0cmFuc2l0aW9ucyAhPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgdHJhbnNpdGlvbiBvZiB0cmFuc2l0aW9ucykge1xuXHRcdFx0dHJhbnNpdGlvbi5zdG9wKCk7XG5cdFx0fVxuXHR9XG5cblx0ZXhlY3V0ZV9lZmZlY3RfdGVhcmRvd24oZWZmZWN0KTtcblxuXHR2YXIgcGFyZW50ID0gZWZmZWN0LnBhcmVudDtcblxuXHQvLyBJZiB0aGUgcGFyZW50IGRvZXNuJ3QgaGF2ZSBhbnkgY2hpbGRyZW4sIHRoZW4gc2tpcCB0aGlzIHdvcmsgYWx0b2dldGhlclxuXHRpZiAocGFyZW50ICE9PSBudWxsICYmIHBhcmVudC5maXJzdCAhPT0gbnVsbCkge1xuXHRcdHVubGlua19lZmZlY3QoZWZmZWN0KTtcblx0fVxuXG5cdGlmIChERVYpIHtcblx0XHRlZmZlY3QuY29tcG9uZW50X2Z1bmN0aW9uID0gbnVsbDtcblx0fVxuXG5cdC8vIGBmaXJzdGAgYW5kIGBjaGlsZGAgYXJlIG51bGxlZCBvdXQgaW4gZGVzdHJveV9lZmZlY3RfY2hpbGRyZW5cblx0Ly8gd2UgZG9uJ3QgbnVsbCBvdXQgYHBhcmVudGAgc28gdGhhdCBlcnJvciBwcm9wYWdhdGlvbiBjYW4gd29yayBjb3JyZWN0bHlcblx0ZWZmZWN0Lm5leHQgPVxuXHRcdGVmZmVjdC5wcmV2ID1cblx0XHRlZmZlY3QudGVhcmRvd24gPVxuXHRcdGVmZmVjdC5jdHggPVxuXHRcdGVmZmVjdC5kZXBzID1cblx0XHRlZmZlY3QuZm4gPVxuXHRcdGVmZmVjdC5ub2RlcyA9XG5cdFx0ZWZmZWN0LmFjID1cblx0XHRcdG51bGw7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlIHwgbnVsbH0gbm9kZVxuICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IGVuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX2VmZmVjdF9kb20obm9kZSwgZW5kKSB7XG5cdHdoaWxlIChub2RlICE9PSBudWxsKSB7XG5cdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGUgfCBudWxsfSAqL1xuXHRcdHZhciBuZXh0ID0gbm9kZSA9PT0gZW5kID8gbnVsbCA6IGdldF9uZXh0X3NpYmxpbmcobm9kZSk7XG5cblx0XHRub2RlLnJlbW92ZSgpO1xuXHRcdG5vZGUgPSBuZXh0O1xuXHR9XG59XG5cbi8qKlxuICogRGV0YWNoIGFuIGVmZmVjdCBmcm9tIHRoZSBlZmZlY3QgdHJlZSwgZnJlZWluZyB1cCBtZW1vcnkgYW5kXG4gKiByZWR1Y2luZyB0aGUgYW1vdW50IG9mIHdvcmsgdGhhdCBoYXBwZW5zIG9uIHN1YnNlcXVlbnQgdHJhdmVyc2Fsc1xuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5saW5rX2VmZmVjdChlZmZlY3QpIHtcblx0dmFyIHBhcmVudCA9IGVmZmVjdC5wYXJlbnQ7XG5cdHZhciBwcmV2ID0gZWZmZWN0LnByZXY7XG5cdHZhciBuZXh0ID0gZWZmZWN0Lm5leHQ7XG5cblx0aWYgKHByZXYgIT09IG51bGwpIHByZXYubmV4dCA9IG5leHQ7XG5cdGlmIChuZXh0ICE9PSBudWxsKSBuZXh0LnByZXYgPSBwcmV2O1xuXG5cdGlmIChwYXJlbnQgIT09IG51bGwpIHtcblx0XHRpZiAocGFyZW50LmZpcnN0ID09PSBlZmZlY3QpIHBhcmVudC5maXJzdCA9IG5leHQ7XG5cdFx0aWYgKHBhcmVudC5sYXN0ID09PSBlZmZlY3QpIHBhcmVudC5sYXN0ID0gcHJldjtcblx0fVxufVxuXG4vKipcbiAqIFdoZW4gYSBibG9jayBlZmZlY3QgaXMgcmVtb3ZlZCwgd2UgZG9uJ3QgaW1tZWRpYXRlbHkgZGVzdHJveSBpdCBvciB5YW5rIGl0XG4gKiBvdXQgb2YgdGhlIERPTSwgYmVjYXVzZSBpdCBtaWdodCBoYXZlIHRyYW5zaXRpb25zLiBJbnN0ZWFkLCB3ZSAncGF1c2UnIGl0LlxuICogSXQgc3RheXMgYXJvdW5kIChpbiBtZW1vcnksIGFuZCBpbiB0aGUgRE9NKSB1bnRpbCBvdXRybyB0cmFuc2l0aW9ucyBoYXZlXG4gKiBjb21wbGV0ZWQsIGFuZCBpZiB0aGUgc3RhdGUgY2hhbmdlIGlzIHJldmVyc2VkIHRoZW4gd2UgX3Jlc3VtZV8gaXQuXG4gKiBBIHBhdXNlZCBlZmZlY3QgZG9lcyBub3QgdXBkYXRlLCBhbmQgdGhlIERPTSBzdWJ0cmVlIGJlY29tZXMgaW5lcnQuXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0geygpID0+IHZvaWR9IFtjYWxsYmFja11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Rlc3Ryb3ldXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXVzZV9lZmZlY3QoZWZmZWN0LCBjYWxsYmFjaywgZGVzdHJveSA9IHRydWUpIHtcblx0LyoqIEB0eXBlIHtUcmFuc2l0aW9uTWFuYWdlcltdfSAqL1xuXHR2YXIgdHJhbnNpdGlvbnMgPSBbXTtcblxuXHRwYXVzZV9jaGlsZHJlbihlZmZlY3QsIHRyYW5zaXRpb25zLCB0cnVlKTtcblxuXHR2YXIgZm4gPSAoKSA9PiB7XG5cdFx0aWYgKGRlc3Ryb3kpIGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0aWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXHR9O1xuXG5cdHZhciByZW1haW5pbmcgPSB0cmFuc2l0aW9ucy5sZW5ndGg7XG5cdGlmIChyZW1haW5pbmcgPiAwKSB7XG5cdFx0dmFyIGNoZWNrID0gKCkgPT4gLS1yZW1haW5pbmcgfHwgZm4oKTtcblx0XHRmb3IgKHZhciB0cmFuc2l0aW9uIG9mIHRyYW5zaXRpb25zKSB7XG5cdFx0XHR0cmFuc2l0aW9uLm91dChjaGVjayk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZuKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge1RyYW5zaXRpb25NYW5hZ2VyW119IHRyYW5zaXRpb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGxvY2FsXG4gKi9cbmZ1bmN0aW9uIHBhdXNlX2NoaWxkcmVuKGVmZmVjdCwgdHJhbnNpdGlvbnMsIGxvY2FsKSB7XG5cdGlmICgoZWZmZWN0LmYgJiBJTkVSVCkgIT09IDApIHJldHVybjtcblx0ZWZmZWN0LmYgXj0gSU5FUlQ7XG5cblx0dmFyIHQgPSBlZmZlY3Qubm9kZXMgJiYgZWZmZWN0Lm5vZGVzLnQ7XG5cblx0aWYgKHQgIT09IG51bGwpIHtcblx0XHRmb3IgKGNvbnN0IHRyYW5zaXRpb24gb2YgdCkge1xuXHRcdFx0aWYgKHRyYW5zaXRpb24uaXNfZ2xvYmFsIHx8IGxvY2FsKSB7XG5cdFx0XHRcdHRyYW5zaXRpb25zLnB1c2godHJhbnNpdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dmFyIGNoaWxkID0gZWZmZWN0LmZpcnN0O1xuXG5cdHdoaWxlIChjaGlsZCAhPT0gbnVsbCkge1xuXHRcdHZhciBzaWJsaW5nID0gY2hpbGQubmV4dDtcblx0XHR2YXIgdHJhbnNwYXJlbnQgPVxuXHRcdFx0KGNoaWxkLmYgJiBFRkZFQ1RfVFJBTlNQQVJFTlQpICE9PSAwIHx8XG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgYnJhbmNoIGVmZmVjdCB3aXRob3V0IGEgYmxvY2sgZWZmZWN0IHBhcmVudCxcblx0XHRcdC8vIGl0IG1lYW5zIHRoZSBwYXJlbnQgYmxvY2sgZWZmZWN0IHdhcyBwcnVuZWQuIEluIHRoYXQgY2FzZSxcblx0XHRcdC8vIHRyYW5zcGFyZW5jeSBpbmZvcm1hdGlvbiB3YXMgdHJhbnNmZXJyZWQgdG8gdGhlIGJyYW5jaCBlZmZlY3QuXG5cdFx0XHQoKGNoaWxkLmYgJiBCUkFOQ0hfRUZGRUNUKSAhPT0gMCAmJiAoZWZmZWN0LmYgJiBCTE9DS19FRkZFQ1QpICE9PSAwKTtcblx0XHQvLyBUT0RPIHdlIGRvbid0IG5lZWQgdG8gY2FsbCBwYXVzZV9jaGlsZHJlbiByZWN1cnNpdmVseSB3aXRoIGEgbGlua2VkIGxpc3QgaW4gcGxhY2Vcblx0XHQvLyBpdCdzIHNsaWdodGx5IG1vcmUgaW52b2x2ZWQgdGhvdWdoIGFzIHdlIGhhdmUgdG8gYWNjb3VudCBmb3IgYHRyYW5zcGFyZW50YCBjaGFuZ2luZ1xuXHRcdC8vIHRocm91Z2ggdGhlIHRyZWUuXG5cdFx0cGF1c2VfY2hpbGRyZW4oY2hpbGQsIHRyYW5zaXRpb25zLCB0cmFuc3BhcmVudCA/IGxvY2FsIDogZmFsc2UpO1xuXHRcdGNoaWxkID0gc2libGluZztcblx0fVxufVxuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBgcGF1c2VfZWZmZWN0YC4gV2UgY2FsbCB0aGlzIGlmIChmb3IgZXhhbXBsZSlcbiAqIGB4YCBiZWNvbWVzIGZhbHN5IHRoZW4gdHJ1dGh5OiBgeyNpZiB4fS4uLnsvaWZ9YFxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzdW1lX2VmZmVjdChlZmZlY3QpIHtcblx0cmVzdW1lX2NoaWxkcmVuKGVmZmVjdCwgdHJ1ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHBhcmFtIHtib29sZWFufSBsb2NhbFxuICovXG5mdW5jdGlvbiByZXN1bWVfY2hpbGRyZW4oZWZmZWN0LCBsb2NhbCkge1xuXHRpZiAoKGVmZmVjdC5mICYgSU5FUlQpID09PSAwKSByZXR1cm47XG5cdGVmZmVjdC5mIF49IElORVJUO1xuXG5cdC8vIElmIGEgZGVwZW5kZW5jeSBvZiB0aGlzIGVmZmVjdCBjaGFuZ2VkIHdoaWxlIGl0IHdhcyBwYXVzZWQsXG5cdC8vIHNjaGVkdWxlIHRoZSBlZmZlY3QgdG8gdXBkYXRlLiB3ZSBkb24ndCB1c2UgYGlzX2RpcnR5YFxuXHQvLyBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBlYWdlcmx5IHJlY29tcHV0ZSBhIGRlcml2ZWQgbGlrZVxuXHQvLyBgeyNpZiBmb299e2Zvby5iYXIoKX17L2lmfWAgaWYgYGZvb2AgaXMgbm93IGB1bmRlZmluZWRcblx0aWYgKChlZmZlY3QuZiAmIENMRUFOKSA9PT0gMCkge1xuXHRcdHNldF9zaWduYWxfc3RhdHVzKGVmZmVjdCwgRElSVFkpO1xuXHRcdHNjaGVkdWxlX2VmZmVjdChlZmZlY3QpO1xuXHR9XG5cblx0dmFyIGNoaWxkID0gZWZmZWN0LmZpcnN0O1xuXG5cdHdoaWxlIChjaGlsZCAhPT0gbnVsbCkge1xuXHRcdHZhciBzaWJsaW5nID0gY2hpbGQubmV4dDtcblx0XHR2YXIgdHJhbnNwYXJlbnQgPSAoY2hpbGQuZiAmIEVGRkVDVF9UUkFOU1BBUkVOVCkgIT09IDAgfHwgKGNoaWxkLmYgJiBCUkFOQ0hfRUZGRUNUKSAhPT0gMDtcblx0XHQvLyBUT0RPIHdlIGRvbid0IG5lZWQgdG8gY2FsbCByZXN1bWVfY2hpbGRyZW4gcmVjdXJzaXZlbHkgd2l0aCBhIGxpbmtlZCBsaXN0IGluIHBsYWNlXG5cdFx0Ly8gaXQncyBzbGlnaHRseSBtb3JlIGludm9sdmVkIHRob3VnaCBhcyB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIGB0cmFuc3BhcmVudGAgY2hhbmdpbmdcblx0XHQvLyB0aHJvdWdoIHRoZSB0cmVlLlxuXHRcdHJlc3VtZV9jaGlsZHJlbihjaGlsZCwgdHJhbnNwYXJlbnQgPyBsb2NhbCA6IGZhbHNlKTtcblx0XHRjaGlsZCA9IHNpYmxpbmc7XG5cdH1cblxuXHR2YXIgdCA9IGVmZmVjdC5ub2RlcyAmJiBlZmZlY3Qubm9kZXMudDtcblxuXHRpZiAodCAhPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgdHJhbnNpdGlvbiBvZiB0KSB7XG5cdFx0XHRpZiAodHJhbnNpdGlvbi5pc19nbG9iYWwgfHwgbG9jYWwpIHtcblx0XHRcdFx0dHJhbnNpdGlvbi5pbigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWJvcnRlZChlZmZlY3QgPSAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpKSB7XG5cdHJldHVybiAoZWZmZWN0LmYgJiBERVNUUk9ZRUQpICE9PSAwO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0fSBlZmZlY3RcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdmVfZWZmZWN0KGVmZmVjdCwgZnJhZ21lbnQpIHtcblx0aWYgKCFlZmZlY3Qubm9kZXMpIHJldHVybjtcblxuXHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IG51bGx9ICovXG5cdHZhciBub2RlID0gZWZmZWN0Lm5vZGVzLnN0YXJ0O1xuXHR2YXIgZW5kID0gZWZmZWN0Lm5vZGVzLmVuZDtcblxuXHR3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuXHRcdC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlIHwgbnVsbH0gKi9cblx0XHR2YXIgbmV4dCA9IG5vZGUgPT09IGVuZCA/IG51bGwgOiBnZXRfbmV4dF9zaWJsaW5nKG5vZGUpO1xuXG5cdFx0ZnJhZ21lbnQuYXBwZW5kKG5vZGUpO1xuXHRcdG5vZGUgPSBuZXh0O1xuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IERlcml2ZWQsIEVmZmVjdCwgUmVhY3Rpb24sIFNvdXJjZSwgVmFsdWUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBnZXRfZGVzY3JpcHRvcnMsIGdldF9wcm90b3R5cGVfb2YsIGluY2x1ZGVzLCBpbmRleF9vZiB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQge1xuXHRkZXN0cm95X2Jsb2NrX2VmZmVjdF9jaGlsZHJlbixcblx0ZGVzdHJveV9lZmZlY3RfY2hpbGRyZW4sXG5cdGVmZmVjdF90cmFja2luZyxcblx0ZXhlY3V0ZV9lZmZlY3RfdGVhcmRvd25cbn0gZnJvbSAnLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHtcblx0RElSVFksXG5cdE1BWUJFX0RJUlRZLFxuXHRDTEVBTixcblx0REVSSVZFRCxcblx0REVTVFJPWUVELFxuXHRCUkFOQ0hfRUZGRUNULFxuXHRTVEFURV9TWU1CT0wsXG5cdEJMT0NLX0VGRkVDVCxcblx0Uk9PVF9FRkZFQ1QsXG5cdENPTk5FQ1RFRCxcblx0UkVBQ1RJT05fSVNfVVBEQVRJTkcsXG5cdFNUQUxFX1JFQUNUSU9OLFxuXHRFUlJPUl9WQUxVRSxcblx0V0FTX01BUktFRCxcblx0TUFOQUdFRF9FRkZFQ1QsXG5cdFJFQUNUSU9OX1JBTlxufSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBvbGRfdmFsdWVzIH0gZnJvbSAnLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHtcblx0ZGVzdHJveV9kZXJpdmVkX2VmZmVjdHMsXG5cdGV4ZWN1dGVfZGVyaXZlZCxcblx0ZnJlZXplX2Rlcml2ZWRfZWZmZWN0cyxcblx0cmVjZW50X2FzeW5jX2Rlcml2ZWRzLFxuXHR1bmZyZWV6ZV9kZXJpdmVkX2VmZmVjdHMsXG5cdHVwZGF0ZV9kZXJpdmVkXG59IGZyb20gJy4vcmVhY3Rpdml0eS9kZXJpdmVkcy5qcyc7XG5pbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcsIHRyYWNpbmdfbW9kZV9mbGFnIH0gZnJvbSAnLi4vZmxhZ3MvaW5kZXguanMnO1xuaW1wb3J0IHsgdHJhY2luZ19leHByZXNzaW9ucyB9IGZyb20gJy4vZGV2L3RyYWNpbmcuanMnO1xuaW1wb3J0IHsgZ2V0X2Vycm9yIH0gZnJvbSAnLi4vc2hhcmVkL2Rldi5qcyc7XG5pbXBvcnQge1xuXHRjb21wb25lbnRfY29udGV4dCxcblx0ZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uLFxuXHRkZXZfc3RhY2ssXG5cdGlzX3J1bmVzLFxuXHRzZXRfY29tcG9uZW50X2NvbnRleHQsXG5cdHNldF9kZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24sXG5cdHNldF9kZXZfc3RhY2tcbn0gZnJvbSAnLi9jb250ZXh0LmpzJztcbmltcG9ydCB7XG5cdEJhdGNoLFxuXHRiYXRjaF92YWx1ZXMsXG5cdGN1cnJlbnRfYmF0Y2gsXG5cdGZsdXNoU3luYyxcblx0c2NoZWR1bGVfZWZmZWN0XG59IGZyb20gJy4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5pbXBvcnQgeyBoYW5kbGVfZXJyb3IgfSBmcm9tICcuL2Vycm9yLWhhbmRsaW5nLmpzJztcbmltcG9ydCB7IFVOSU5JVElBTElaRUQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgY2FwdHVyZWRfc2lnbmFscyB9IGZyb20gJy4vbGVnYWN5LmpzJztcbmltcG9ydCB7IHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dCB9IGZyb20gJy4vZG9tL2VsZW1lbnRzL2JpbmRpbmdzL3NoYXJlZC5qcyc7XG5pbXBvcnQgeyBzZXRfc2lnbmFsX3N0YXR1cywgdXBkYXRlX2Rlcml2ZWRfc3RhdHVzIH0gZnJvbSAnLi9yZWFjdGl2aXR5L3N0YXR1cy5qcyc7XG5cbmxldCBpc191cGRhdGluZ19lZmZlY3QgPSBmYWxzZTtcblxuZXhwb3J0IGxldCBpc19kZXN0cm95aW5nX2VmZmVjdCA9IGZhbHNlO1xuXG4vKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9pc19kZXN0cm95aW5nX2VmZmVjdCh2YWx1ZSkge1xuXHRpc19kZXN0cm95aW5nX2VmZmVjdCA9IHZhbHVlO1xufVxuXG4vKiogQHR5cGUge251bGwgfCBSZWFjdGlvbn0gKi9cbmV4cG9ydCBsZXQgYWN0aXZlX3JlYWN0aW9uID0gbnVsbDtcblxuZXhwb3J0IGxldCB1bnRyYWNraW5nID0gZmFsc2U7XG5cbi8qKiBAcGFyYW0ge251bGwgfCBSZWFjdGlvbn0gcmVhY3Rpb24gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYWN0aXZlX3JlYWN0aW9uKHJlYWN0aW9uKSB7XG5cdGFjdGl2ZV9yZWFjdGlvbiA9IHJlYWN0aW9uO1xufVxuXG4vKiogQHR5cGUge251bGwgfCBFZmZlY3R9ICovXG5leHBvcnQgbGV0IGFjdGl2ZV9lZmZlY3QgPSBudWxsO1xuXG4vKiogQHBhcmFtIHtudWxsIHwgRWZmZWN0fSBlZmZlY3QgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYWN0aXZlX2VmZmVjdChlZmZlY3QpIHtcblx0YWN0aXZlX2VmZmVjdCA9IGVmZmVjdDtcbn1cblxuLyoqXG4gKiBXaGVuIHNvdXJjZXMgYXJlIGNyZWF0ZWQgd2l0aGluIGEgcmVhY3Rpb24sIHJlYWRpbmcgYW5kIHdyaXRpbmdcbiAqIHRoZW0gd2l0aGluIHRoYXQgcmVhY3Rpb24gc2hvdWxkIG5vdCBjYXVzZSBhIHJlLXJ1blxuICogQHR5cGUge251bGwgfCBTb3VyY2VbXX1cbiAqL1xuZXhwb3J0IGxldCBjdXJyZW50X3NvdXJjZXMgPSBudWxsO1xuXG4vKiogQHBhcmFtIHtWYWx1ZX0gdmFsdWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXNoX3JlYWN0aW9uX3ZhbHVlKHZhbHVlKSB7XG5cdGlmIChhY3RpdmVfcmVhY3Rpb24gIT09IG51bGwgJiYgKCFhc3luY19tb2RlX2ZsYWcgfHwgKGFjdGl2ZV9yZWFjdGlvbi5mICYgREVSSVZFRCkgIT09IDApKSB7XG5cdFx0aWYgKGN1cnJlbnRfc291cmNlcyA9PT0gbnVsbCkge1xuXHRcdFx0Y3VycmVudF9zb3VyY2VzID0gW3ZhbHVlXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VycmVudF9zb3VyY2VzLnB1c2godmFsdWUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIHJlYWN0aW9uIHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGV4ZWN1dGVkLiBJbiBtYW55IGNhc2VzLFxuICogdGhlIGRlcGVuZGVuY2llcyBhcmUgdW5jaGFuZ2VkIGJldHdlZW4gcnVucywgYW5kIHNvIHRoaXMgd2lsbCBiZSBgbnVsbGAgdW5sZXNzXG4gKiBhbmQgdW50aWwgYSBuZXcgZGVwZW5kZW5jeSBpcyBhY2Nlc3NlZCDigJQgd2UgdHJhY2sgdGhpcyB2aWEgYHNraXBwZWRfZGVwc2BcbiAqIEB0eXBlIHtudWxsIHwgVmFsdWVbXX1cbiAqL1xubGV0IG5ld19kZXBzID0gbnVsbDtcblxubGV0IHNraXBwZWRfZGVwcyA9IDA7XG5cbi8qKlxuICogVHJhY2tzIHdyaXRlcyB0aGF0IHRoZSBlZmZlY3QgaXQncyBleGVjdXRlZCBpbiBkb2Vzbid0IGxpc3RlbiB0byB5ZXQsXG4gKiBzbyB0aGF0IHRoZSBkZXBlbmRlbmN5IGNhbiBiZSBhZGRlZCB0byB0aGUgZWZmZWN0IGxhdGVyIG9uIGlmIGl0IHRoZW4gcmVhZHMgaXRcbiAqIEB0eXBlIHtudWxsIHwgU291cmNlW119XG4gKi9cbmV4cG9ydCBsZXQgdW50cmFja2VkX3dyaXRlcyA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge251bGwgfCBTb3VyY2VbXX0gdmFsdWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfdW50cmFja2VkX3dyaXRlcyh2YWx1ZSkge1xuXHR1bnRyYWNrZWRfd3JpdGVzID0gdmFsdWU7XG59XG5cbi8qKlxuICogQHR5cGUge251bWJlcn0gVXNlZCBieSBzb3VyY2VzIGFuZCBkZXJpdmVkcyBmb3IgaGFuZGxpbmcgdXBkYXRlcy5cbiAqIFZlcnNpb24gc3RhcnRzIGZyb20gMSBzbyB0aGF0IHVub3duZWQgZGVyaXZlZHMgZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIGEgY3JlYXRlZCBlZmZlY3QgYW5kIGEgcnVuIG9uZSBmb3IgdHJhY2luZ1xuICoqL1xuZXhwb3J0IGxldCB3cml0ZV92ZXJzaW9uID0gMTtcblxuLyoqIEB0eXBlIHtudW1iZXJ9IFVzZWQgdG8gdmVyc2lvbiBlYWNoIHJlYWQgb2YgYSBzb3VyY2Ugb2YgZGVyaXZlZCB0byBhdm9pZCBkdXBsaWNhdGluZyBkZXBlZGVuY2llcyBpbnNpZGUgYSByZWFjdGlvbiAqL1xubGV0IHJlYWRfdmVyc2lvbiA9IDA7XG5cbmV4cG9ydCBsZXQgdXBkYXRlX3ZlcnNpb24gPSByZWFkX3ZlcnNpb247XG5cbi8qKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfdXBkYXRlX3ZlcnNpb24odmFsdWUpIHtcblx0dXBkYXRlX3ZlcnNpb24gPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluY3JlbWVudF93cml0ZV92ZXJzaW9uKCkge1xuXHRyZXR1cm4gKyt3cml0ZV92ZXJzaW9uO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIGRlcml2ZWQgb3IgZWZmZWN0IGlzIGRpcnR5LlxuICogSWYgaXQgaXMgTUFZQkVfRElSVFksIHdpbGwgc2V0IHRoZSBzdGF0dXMgdG8gQ0xFQU5cbiAqIEBwYXJhbSB7UmVhY3Rpb259IHJlYWN0aW9uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2RpcnR5KHJlYWN0aW9uKSB7XG5cdHZhciBmbGFncyA9IHJlYWN0aW9uLmY7XG5cblx0aWYgKChmbGFncyAmIERJUlRZKSAhPT0gMCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKGZsYWdzICYgREVSSVZFRCkge1xuXHRcdHJlYWN0aW9uLmYgJj0gfldBU19NQVJLRUQ7XG5cdH1cblxuXHRpZiAoKGZsYWdzICYgTUFZQkVfRElSVFkpICE9PSAwKSB7XG5cdFx0dmFyIGRlcGVuZGVuY2llcyA9IC8qKiBAdHlwZSB7VmFsdWVbXX0gKi8gKHJlYWN0aW9uLmRlcHMpO1xuXHRcdHZhciBsZW5ndGggPSBkZXBlbmRlbmNpZXMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBkZXBlbmRlbmNpZXNbaV07XG5cblx0XHRcdGlmIChpc19kaXJ0eSgvKiogQHR5cGUge0Rlcml2ZWR9ICovIChkZXBlbmRlbmN5KSkpIHtcblx0XHRcdFx0dXBkYXRlX2Rlcml2ZWQoLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoZGVwZW5kZW5jeSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGVwZW5kZW5jeS53diA+IHJlYWN0aW9uLnd2KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdChmbGFncyAmIENPTk5FQ1RFRCkgIT09IDAgJiZcblx0XHRcdC8vIER1cmluZyB0aW1lIHRyYXZlbGluZyB3ZSBkb24ndCB3YW50IHRvIHJlc2V0IHRoZSBzdGF0dXMgc28gdGhhdFxuXHRcdFx0Ly8gdHJhdmVyc2FsIG9mIHRoZSBncmFwaCBpbiB0aGUgb3RoZXIgYmF0Y2hlcyBzdGlsbCBoYXBwZW5zXG5cdFx0XHRiYXRjaF92YWx1ZXMgPT09IG51bGxcblx0XHQpIHtcblx0XHRcdHNldF9zaWduYWxfc3RhdHVzKHJlYWN0aW9uLCBDTEVBTik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VmFsdWV9IHNpZ25hbFxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHBhcmFtIHtib29sZWFufSBbcm9vdF1cbiAqL1xuZnVuY3Rpb24gc2NoZWR1bGVfcG9zc2libGVfZWZmZWN0X3NlbGZfaW52YWxpZGF0aW9uKHNpZ25hbCwgZWZmZWN0LCByb290ID0gdHJ1ZSkge1xuXHR2YXIgcmVhY3Rpb25zID0gc2lnbmFsLnJlYWN0aW9ucztcblx0aWYgKHJlYWN0aW9ucyA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdGlmICghYXN5bmNfbW9kZV9mbGFnICYmIGN1cnJlbnRfc291cmNlcyAhPT0gbnVsbCAmJiBpbmNsdWRlcy5jYWxsKGN1cnJlbnRfc291cmNlcywgc2lnbmFsKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVhY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHJlYWN0aW9uID0gcmVhY3Rpb25zW2ldO1xuXG5cdFx0aWYgKChyZWFjdGlvbi5mICYgREVSSVZFRCkgIT09IDApIHtcblx0XHRcdHNjaGVkdWxlX3Bvc3NpYmxlX2VmZmVjdF9zZWxmX2ludmFsaWRhdGlvbigvKiogQHR5cGUge0Rlcml2ZWR9ICovIChyZWFjdGlvbiksIGVmZmVjdCwgZmFsc2UpO1xuXHRcdH0gZWxzZSBpZiAoZWZmZWN0ID09PSByZWFjdGlvbikge1xuXHRcdFx0aWYgKHJvb3QpIHtcblx0XHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMocmVhY3Rpb24sIERJUlRZKTtcblx0XHRcdH0gZWxzZSBpZiAoKHJlYWN0aW9uLmYgJiBDTEVBTikgIT09IDApIHtcblx0XHRcdFx0c2V0X3NpZ25hbF9zdGF0dXMocmVhY3Rpb24sIE1BWUJFX0RJUlRZKTtcblx0XHRcdH1cblx0XHRcdHNjaGVkdWxlX2VmZmVjdCgvKiogQHR5cGUge0VmZmVjdH0gKi8gKHJlYWN0aW9uKSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKiBAcGFyYW0ge1JlYWN0aW9ufSByZWFjdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9yZWFjdGlvbihyZWFjdGlvbikge1xuXHR2YXIgcHJldmlvdXNfZGVwcyA9IG5ld19kZXBzO1xuXHR2YXIgcHJldmlvdXNfc2tpcHBlZF9kZXBzID0gc2tpcHBlZF9kZXBzO1xuXHR2YXIgcHJldmlvdXNfdW50cmFja2VkX3dyaXRlcyA9IHVudHJhY2tlZF93cml0ZXM7XG5cdHZhciBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0dmFyIHByZXZpb3VzX3NvdXJjZXMgPSBjdXJyZW50X3NvdXJjZXM7XG5cdHZhciBwcmV2aW91c19jb21wb25lbnRfY29udGV4dCA9IGNvbXBvbmVudF9jb250ZXh0O1xuXHR2YXIgcHJldmlvdXNfdW50cmFja2luZyA9IHVudHJhY2tpbmc7XG5cdHZhciBwcmV2aW91c191cGRhdGVfdmVyc2lvbiA9IHVwZGF0ZV92ZXJzaW9uO1xuXG5cdHZhciBmbGFncyA9IHJlYWN0aW9uLmY7XG5cblx0bmV3X2RlcHMgPSAvKiogQHR5cGUge251bGwgfCBWYWx1ZVtdfSAqLyAobnVsbCk7XG5cdHNraXBwZWRfZGVwcyA9IDA7XG5cdHVudHJhY2tlZF93cml0ZXMgPSBudWxsO1xuXHRhY3RpdmVfcmVhY3Rpb24gPSAoZmxhZ3MgJiAoQlJBTkNIX0VGRkVDVCB8IFJPT1RfRUZGRUNUKSkgPT09IDAgPyByZWFjdGlvbiA6IG51bGw7XG5cblx0Y3VycmVudF9zb3VyY2VzID0gbnVsbDtcblx0c2V0X2NvbXBvbmVudF9jb250ZXh0KHJlYWN0aW9uLmN0eCk7XG5cdHVudHJhY2tpbmcgPSBmYWxzZTtcblx0dXBkYXRlX3ZlcnNpb24gPSArK3JlYWRfdmVyc2lvbjtcblxuXHRpZiAocmVhY3Rpb24uYWMgIT09IG51bGwpIHtcblx0XHR3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQoKCkgPT4ge1xuXHRcdFx0LyoqIEB0eXBlIHtBYm9ydENvbnRyb2xsZXJ9ICovIChyZWFjdGlvbi5hYykuYWJvcnQoU1RBTEVfUkVBQ1RJT04pO1xuXHRcdH0pO1xuXG5cdFx0cmVhY3Rpb24uYWMgPSBudWxsO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRyZWFjdGlvbi5mIHw9IFJFQUNUSU9OX0lTX1VQREFUSU5HO1xuXHRcdHZhciBmbiA9IC8qKiBAdHlwZSB7RnVuY3Rpb259ICovIChyZWFjdGlvbi5mbik7XG5cdFx0dmFyIHJlc3VsdCA9IGZuKCk7XG5cdFx0cmVhY3Rpb24uZiB8PSBSRUFDVElPTl9SQU47XG5cdFx0dmFyIGRlcHMgPSByZWFjdGlvbi5kZXBzO1xuXG5cdFx0Ly8gRG9uJ3QgcmVtb3ZlIHJlYWN0aW9ucyBkdXJpbmcgZm9yaztcblx0XHQvLyB0aGV5IG11c3QgcmVtYWluIGZvciB3aGVuIGZvcmsgaXMgZGlzY2FyZGVkXG5cdFx0dmFyIGlzX2ZvcmsgPSBjdXJyZW50X2JhdGNoPy5pc19mb3JrO1xuXG5cdFx0aWYgKG5ld19kZXBzICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgaTtcblxuXHRcdFx0aWYgKCFpc19mb3JrKSB7XG5cdFx0XHRcdHJlbW92ZV9yZWFjdGlvbnMocmVhY3Rpb24sIHNraXBwZWRfZGVwcyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkZXBzICE9PSBudWxsICYmIHNraXBwZWRfZGVwcyA+IDApIHtcblx0XHRcdFx0ZGVwcy5sZW5ndGggPSBza2lwcGVkX2RlcHMgKyBuZXdfZGVwcy5sZW5ndGg7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBuZXdfZGVwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGRlcHNbc2tpcHBlZF9kZXBzICsgaV0gPSBuZXdfZGVwc1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVhY3Rpb24uZGVwcyA9IGRlcHMgPSBuZXdfZGVwcztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVmZmVjdF90cmFja2luZygpICYmIChyZWFjdGlvbi5mICYgQ09OTkVDVEVEKSAhPT0gMCkge1xuXHRcdFx0XHRmb3IgKGkgPSBza2lwcGVkX2RlcHM7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0KGRlcHNbaV0ucmVhY3Rpb25zID8/PSBbXSkucHVzaChyZWFjdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFpc19mb3JrICYmIGRlcHMgIT09IG51bGwgJiYgc2tpcHBlZF9kZXBzIDwgZGVwcy5sZW5ndGgpIHtcblx0XHRcdHJlbW92ZV9yZWFjdGlvbnMocmVhY3Rpb24sIHNraXBwZWRfZGVwcyk7XG5cdFx0XHRkZXBzLmxlbmd0aCA9IHNraXBwZWRfZGVwcztcblx0XHR9XG5cblx0XHQvLyBJZiB3ZSdyZSBpbnNpZGUgYW4gZWZmZWN0IGFuZCB3ZSBoYXZlIHVudHJhY2tlZCB3cml0ZXMsIHRoZW4gd2UgbmVlZCB0b1xuXHRcdC8vIGVuc3VyZSB0aGF0IGlmIGFueSBvZiB0aG9zZSB1bnRyYWNrZWQgd3JpdGVzIHJlc3VsdCBpbiByZS1pbnZhbGlkYXRpb25cblx0XHQvLyBvZiB0aGUgY3VycmVudCBlZmZlY3QsIHRoZW4gdGhhdCBoYXBwZW5zIGFjY29yZGluZ2x5XG5cdFx0aWYgKFxuXHRcdFx0aXNfcnVuZXMoKSAmJlxuXHRcdFx0dW50cmFja2VkX3dyaXRlcyAhPT0gbnVsbCAmJlxuXHRcdFx0IXVudHJhY2tpbmcgJiZcblx0XHRcdGRlcHMgIT09IG51bGwgJiZcblx0XHRcdChyZWFjdGlvbi5mICYgKERFUklWRUQgfCBNQVlCRV9ESVJUWSB8IERJUlRZKSkgPT09IDBcblx0XHQpIHtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCAvKiogQHR5cGUge1NvdXJjZVtdfSAqLyAodW50cmFja2VkX3dyaXRlcykubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0c2NoZWR1bGVfcG9zc2libGVfZWZmZWN0X3NlbGZfaW52YWxpZGF0aW9uKFxuXHRcdFx0XHRcdHVudHJhY2tlZF93cml0ZXNbaV0sXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtFZmZlY3R9ICovIChyZWFjdGlvbilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJZiB3ZSBhcmUgcmV0dXJuaW5nIHRvIGFuIHByZXZpb3VzIHJlYWN0aW9uIHRoZW5cblx0XHQvLyB3ZSBuZWVkIHRvIGluY3JlbWVudCB0aGUgcmVhZCB2ZXJzaW9uIHRvIGVuc3VyZSB0aGF0XG5cdFx0Ly8gYW55IGRlcGVuZGVuY2llcyBpbiB0aGlzIHJlYWN0aW9uIGFyZW4ndCBtYXJrZWQgd2l0aFxuXHRcdC8vIHRoZSBzYW1lIHZlcnNpb25cblx0XHRpZiAocHJldmlvdXNfcmVhY3Rpb24gIT09IG51bGwgJiYgcHJldmlvdXNfcmVhY3Rpb24gIT09IHJlYWN0aW9uKSB7XG5cdFx0XHRyZWFkX3ZlcnNpb24rKztcblxuXHRcdFx0Ly8gdXBkYXRlIHRoZSBgcnZgIG9mIHRoZSBwcmV2aW91cyByZWFjdGlvbidzIGRlcHMg4oCUIGJvdGggZXhpc3RpbmcgYW5kIG5ldyDigJRcblx0XHRcdC8vIHNvIHRoYXQgdGhleSBhcmUgbm90IGFkZGVkIGFnYWluXG5cdFx0XHRpZiAocHJldmlvdXNfcmVhY3Rpb24uZGVwcyAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3VzX3NraXBwZWRfZGVwczsgaSArPSAxKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNfcmVhY3Rpb24uZGVwc1tpXS5ydiA9IHJlYWRfdmVyc2lvbjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocHJldmlvdXNfZGVwcyAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGRlcCBvZiBwcmV2aW91c19kZXBzKSB7XG5cdFx0XHRcdFx0ZGVwLnJ2ID0gcmVhZF92ZXJzaW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh1bnRyYWNrZWRfd3JpdGVzICE9PSBudWxsKSB7XG5cdFx0XHRcdGlmIChwcmV2aW91c191bnRyYWNrZWRfd3JpdGVzID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNfdW50cmFja2VkX3dyaXRlcyA9IHVudHJhY2tlZF93cml0ZXM7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cHJldmlvdXNfdW50cmFja2VkX3dyaXRlcy5wdXNoKC4uLi8qKiBAdHlwZSB7U291cmNlW119ICovICh1bnRyYWNrZWRfd3JpdGVzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKHJlYWN0aW9uLmYgJiBFUlJPUl9WQUxVRSkgIT09IDApIHtcblx0XHRcdHJlYWN0aW9uLmYgXj0gRVJST1JfVkFMVUU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gaGFuZGxlX2Vycm9yKGVycm9yKTtcblx0fSBmaW5hbGx5IHtcblx0XHRyZWFjdGlvbi5mIF49IFJFQUNUSU9OX0lTX1VQREFUSU5HO1xuXHRcdG5ld19kZXBzID0gcHJldmlvdXNfZGVwcztcblx0XHRza2lwcGVkX2RlcHMgPSBwcmV2aW91c19za2lwcGVkX2RlcHM7XG5cdFx0dW50cmFja2VkX3dyaXRlcyA9IHByZXZpb3VzX3VudHJhY2tlZF93cml0ZXM7XG5cdFx0YWN0aXZlX3JlYWN0aW9uID0gcHJldmlvdXNfcmVhY3Rpb247XG5cdFx0Y3VycmVudF9zb3VyY2VzID0gcHJldmlvdXNfc291cmNlcztcblx0XHRzZXRfY29tcG9uZW50X2NvbnRleHQocHJldmlvdXNfY29tcG9uZW50X2NvbnRleHQpO1xuXHRcdHVudHJhY2tpbmcgPSBwcmV2aW91c191bnRyYWNraW5nO1xuXHRcdHVwZGF0ZV92ZXJzaW9uID0gcHJldmlvdXNfdXBkYXRlX3ZlcnNpb247XG5cdH1cbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtSZWFjdGlvbn0gc2lnbmFsXG4gKiBAcGFyYW0ge1ZhbHVlPFY+fSBkZXBlbmRlbmN5XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlX3JlYWN0aW9uKHNpZ25hbCwgZGVwZW5kZW5jeSkge1xuXHRsZXQgcmVhY3Rpb25zID0gZGVwZW5kZW5jeS5yZWFjdGlvbnM7XG5cdGlmIChyZWFjdGlvbnMgIT09IG51bGwpIHtcblx0XHR2YXIgaW5kZXggPSBpbmRleF9vZi5jYWxsKHJlYWN0aW9ucywgc2lnbmFsKTtcblx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHR2YXIgbmV3X2xlbmd0aCA9IHJlYWN0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0aWYgKG5ld19sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmVhY3Rpb25zID0gZGVwZW5kZW5jeS5yZWFjdGlvbnMgPSBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU3dhcCB3aXRoIGxhc3QgZWxlbWVudCBhbmQgdGhlbiByZW1vdmUuXG5cdFx0XHRcdHJlYWN0aW9uc1tpbmRleF0gPSByZWFjdGlvbnNbbmV3X2xlbmd0aF07XG5cdFx0XHRcdHJlYWN0aW9ucy5wb3AoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBJZiB0aGUgZGVyaXZlZCBoYXMgbm8gcmVhY3Rpb25zLCB0aGVuIHdlIGNhbiBkaXNjb25uZWN0IGl0IGZyb20gdGhlIGdyYXBoLFxuXHQvLyBhbGxvd2luZyBpdCB0byBlaXRoZXIgcmVjb25uZWN0IGluIHRoZSBmdXR1cmUsIG9yIGJlIEdDJ2QgYnkgdGhlIFZNLlxuXHRpZiAoXG5cdFx0cmVhY3Rpb25zID09PSBudWxsICYmXG5cdFx0KGRlcGVuZGVuY3kuZiAmIERFUklWRUQpICE9PSAwICYmXG5cdFx0Ly8gRGVzdHJveWluZyBhIGNoaWxkIGVmZmVjdCB3aGlsZSB1cGRhdGluZyBhIHBhcmVudCBlZmZlY3QgY2FuIGNhdXNlIGEgZGVwZW5kZW5jeSB0byBhcHBlYXJcblx0XHQvLyB0byBiZSB1bnVzZWQsIHdoZW4gaW4gZmFjdCBpdCBpcyB1c2VkIGJ5IHRoZSBjdXJyZW50bHktdXBkYXRpbmcgcGFyZW50LiBDaGVja2luZyBgbmV3X2RlcHNgXG5cdFx0Ly8gYWxsb3dzIHVzIHRvIHNraXAgdGhlIGV4cGVuc2l2ZSB3b3JrIG9mIGRpc2Nvbm5lY3RpbmcgYW5kIGltbWVkaWF0ZWx5IHJlY29ubmVjdGluZyBpdFxuXHRcdChuZXdfZGVwcyA9PT0gbnVsbCB8fCAhaW5jbHVkZXMuY2FsbChuZXdfZGVwcywgZGVwZW5kZW5jeSkpXG5cdCkge1xuXHRcdHZhciBkZXJpdmVkID0gLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoZGVwZW5kZW5jeSk7XG5cblx0XHQvLyBJZiB3ZSBhcmUgd29ya2luZyB3aXRoIGEgZGVyaXZlZCB0aGF0IGlzIG93bmVkIGJ5IGFuIGVmZmVjdCwgdGhlbiBtYXJrIGl0IGFzIGJlaW5nXG5cdFx0Ly8gZGlzY29ubmVjdGVkIGFuZCByZW1vdmUgdGhlIG1hcmsgZmxhZywgYXMgaXQgY2Fubm90IGJlIHJlbGlhYmx5IHJlbW92ZWQgb3RoZXJ3aXNlXG5cdFx0aWYgKChkZXJpdmVkLmYgJiBDT05ORUNURUQpICE9PSAwKSB7XG5cdFx0XHRkZXJpdmVkLmYgXj0gQ09OTkVDVEVEO1xuXHRcdFx0ZGVyaXZlZC5mICY9IH5XQVNfTUFSS0VEO1xuXHRcdH1cblxuXHRcdHVwZGF0ZV9kZXJpdmVkX3N0YXR1cyhkZXJpdmVkKTtcblxuXHRcdC8vIGZyZWV6ZSBhbnkgZWZmZWN0cyBpbnNpZGUgdGhpcyBkZXJpdmVkXG5cdFx0ZnJlZXplX2Rlcml2ZWRfZWZmZWN0cyhkZXJpdmVkKTtcblxuXHRcdC8vIERpc2Nvbm5lY3QgYW55IHJlYWN0aW9ucyBvd25lZCBieSB0aGlzIHJlYWN0aW9uXG5cdFx0cmVtb3ZlX3JlYWN0aW9ucyhkZXJpdmVkLCAwKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3Rpb259IHNpZ25hbFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0X2luZGV4XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZV9yZWFjdGlvbnMoc2lnbmFsLCBzdGFydF9pbmRleCkge1xuXHR2YXIgZGVwZW5kZW5jaWVzID0gc2lnbmFsLmRlcHM7XG5cdGlmIChkZXBlbmRlbmNpZXMgPT09IG51bGwpIHJldHVybjtcblxuXHRmb3IgKHZhciBpID0gc3RhcnRfaW5kZXg7IGkgPCBkZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRyZW1vdmVfcmVhY3Rpb24oc2lnbmFsLCBkZXBlbmRlbmNpZXNbaV0pO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFZmZlY3R9IGVmZmVjdFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfZWZmZWN0KGVmZmVjdCkge1xuXHR2YXIgZmxhZ3MgPSBlZmZlY3QuZjtcblxuXHRpZiAoKGZsYWdzICYgREVTVFJPWUVEKSAhPT0gMCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHNldF9zaWduYWxfc3RhdHVzKGVmZmVjdCwgQ0xFQU4pO1xuXG5cdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXHR2YXIgd2FzX3VwZGF0aW5nX2VmZmVjdCA9IGlzX3VwZGF0aW5nX2VmZmVjdDtcblxuXHRhY3RpdmVfZWZmZWN0ID0gZWZmZWN0O1xuXHRpc191cGRhdGluZ19lZmZlY3QgPSB0cnVlO1xuXG5cdGlmIChERVYpIHtcblx0XHR2YXIgcHJldmlvdXNfY29tcG9uZW50X2ZuID0gZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uO1xuXHRcdHNldF9kZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24oZWZmZWN0LmNvbXBvbmVudF9mdW5jdGlvbik7XG5cdFx0dmFyIHByZXZpb3VzX3N0YWNrID0gLyoqIEB0eXBlIHthbnl9ICovIChkZXZfc3RhY2spO1xuXHRcdC8vIG9ubHkgYmxvY2sgZWZmZWN0cyBoYXZlIGEgZGV2IHN0YWNrLCBrZWVwIHRoZSBjdXJyZW50IG9uZSBvdGhlcndpc2Vcblx0XHRzZXRfZGV2X3N0YWNrKGVmZmVjdC5kZXZfc3RhY2sgPz8gZGV2X3N0YWNrKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0aWYgKChmbGFncyAmIChCTE9DS19FRkZFQ1QgfCBNQU5BR0VEX0VGRkVDVCkpICE9PSAwKSB7XG5cdFx0XHRkZXN0cm95X2Jsb2NrX2VmZmVjdF9jaGlsZHJlbihlZmZlY3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZXN0cm95X2VmZmVjdF9jaGlsZHJlbihlZmZlY3QpO1xuXHRcdH1cblxuXHRcdGV4ZWN1dGVfZWZmZWN0X3RlYXJkb3duKGVmZmVjdCk7XG5cdFx0dmFyIHRlYXJkb3duID0gdXBkYXRlX3JlYWN0aW9uKGVmZmVjdCk7XG5cdFx0ZWZmZWN0LnRlYXJkb3duID0gdHlwZW9mIHRlYXJkb3duID09PSAnZnVuY3Rpb24nID8gdGVhcmRvd24gOiBudWxsO1xuXHRcdGVmZmVjdC53diA9IHdyaXRlX3ZlcnNpb247XG5cblx0XHQvLyBJbiBERVYsIGluY3JlbWVudCB2ZXJzaW9ucyBvZiBhbnkgc291cmNlcyB0aGF0IHdlcmUgd3JpdHRlbiB0byBkdXJpbmcgdGhlIGVmZmVjdCxcblx0XHQvLyBzbyB0aGF0IHRoZXkgYXJlIGNvcnJlY3RseSBtYXJrZWQgYXMgZGlydHkgd2hlbiB0aGUgZWZmZWN0IHJlLXJ1bnNcblx0XHRpZiAoREVWICYmIHRyYWNpbmdfbW9kZV9mbGFnICYmIChlZmZlY3QuZiAmIERJUlRZKSAhPT0gMCAmJiBlZmZlY3QuZGVwcyAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIgZGVwIG9mIGVmZmVjdC5kZXBzKSB7XG5cdFx0XHRcdGlmIChkZXAuc2V0X2R1cmluZ19lZmZlY3QpIHtcblx0XHRcdFx0XHRkZXAud3YgPSBpbmNyZW1lbnRfd3JpdGVfdmVyc2lvbigpO1xuXHRcdFx0XHRcdGRlcC5zZXRfZHVyaW5nX2VmZmVjdCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGZpbmFsbHkge1xuXHRcdGlzX3VwZGF0aW5nX2VmZmVjdCA9IHdhc191cGRhdGluZ19lZmZlY3Q7XG5cdFx0YWN0aXZlX2VmZmVjdCA9IHByZXZpb3VzX2VmZmVjdDtcblxuXHRcdGlmIChERVYpIHtcblx0XHRcdHNldF9kZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24ocHJldmlvdXNfY29tcG9uZW50X2ZuKTtcblx0XHRcdHNldF9kZXZfc3RhY2socHJldmlvdXNfc3RhY2spO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSBhbnkgcGVuZGluZyBzdGF0ZSBjaGFuZ2VzIGhhdmUgYmVlbiBhcHBsaWVkLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0aWNrKCkge1xuXHRpZiAoYXN5bmNfbW9kZV9mbGFnKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChmKSA9PiB7XG5cdFx0XHQvLyBSYWNlIHRoZW0gYWdhaW5zdCBlYWNoIG90aGVyIC0gaW4gYWxtb3N0IGFsbCBjYXNlcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2lsbCBmaXJlIGZpcnN0LFxuXHRcdFx0Ly8gYnV0IGUuZy4gaW4gY2FzZSB0aGUgd2luZG93IGlzIG5vdCBmb2N1c2VkIG9yIGEgdmlldyB0cmFuc2l0aW9uIGhhcHBlbnMsIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdFx0Ly8gd2lsbCBiZSBkZWxheWVkIGFuZCBzZXRUaW1lb3V0IGhlbHBzIHVzIHJlc29sdmUgZmFzdCBlbm91Z2ggaW4gdGhhdCBjYXNlXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZigpKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZigpKTtcblx0XHR9KTtcblx0fVxuXG5cdGF3YWl0IFByb21pc2UucmVzb2x2ZSgpO1xuXG5cdC8vIEJ5IGNhbGxpbmcgZmx1c2hTeW5jIHdlIGd1YXJhbnRlZSB0aGF0IGFueSBwZW5kaW5nIHN0YXRlIGNoYW5nZXMgYXJlIGFwcGxpZWQgYWZ0ZXIgb25lIHRpY2suXG5cdC8vIFRPRE8gbG9vayBpbnRvIHdoZXRoZXIgd2UgY2FuIG1ha2UgZmx1c2hpbmcgc3Vic2VxdWVudCB1cGRhdGVzIHN5bmNocm9ub3VzbHkgaW4gdGhlIGZ1dHVyZS5cblx0Zmx1c2hTeW5jKCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGFueSBzdGF0ZSBjaGFuZ2VzLCBhbmQgYXN5bmNocm9ub3VzIHdvcmsgcmVzdWx0aW5nIGZyb20gdGhlbSxcbiAqIGhhdmUgcmVzb2x2ZWQgYW5kIHRoZSBET00gaGFzIGJlZW4gdXBkYXRlZFxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKiBAc2luY2UgNS4zNlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dGxlZCgpIHtcblx0cmV0dXJuIEJhdGNoLmVuc3VyZSgpLnNldHRsZWQoKTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtWYWx1ZTxWPn0gc2lnbmFsXG4gKiBAcmV0dXJucyB7Vn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldChzaWduYWwpIHtcblx0dmFyIGZsYWdzID0gc2lnbmFsLmY7XG5cdHZhciBpc19kZXJpdmVkID0gKGZsYWdzICYgREVSSVZFRCkgIT09IDA7XG5cblx0Y2FwdHVyZWRfc2lnbmFscz8uYWRkKHNpZ25hbCk7XG5cblx0Ly8gUmVnaXN0ZXIgdGhlIGRlcGVuZGVuY3kgb24gdGhlIGN1cnJlbnQgcmVhY3Rpb24gc2lnbmFsLlxuXHRpZiAoYWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmICF1bnRyYWNraW5nKSB7XG5cdFx0Ly8gaWYgd2UncmUgaW4gYSBkZXJpdmVkIHRoYXQgaXMgYmVpbmcgcmVhZCBpbnNpZGUgYW4gX2FzeW5jXyBkZXJpdmVkLFxuXHRcdC8vIGl0J3MgcG9zc2libGUgdGhhdCB0aGUgZWZmZWN0IHdhcyBhbHJlYWR5IGRlc3Ryb3llZC4gSW4gdGhpcyBjYXNlLFxuXHRcdC8vIHdlIGRvbid0IGFkZCB0aGUgZGVwZW5kZW5jeSwgYmVjYXVzZSB0aGF0IHdvdWxkIGNyZWF0ZSBhIG1lbW9yeSBsZWFrXG5cdFx0dmFyIGRlc3Ryb3llZCA9IGFjdGl2ZV9lZmZlY3QgIT09IG51bGwgJiYgKGFjdGl2ZV9lZmZlY3QuZiAmIERFU1RST1lFRCkgIT09IDA7XG5cblx0XHRpZiAoIWRlc3Ryb3llZCAmJiAoY3VycmVudF9zb3VyY2VzID09PSBudWxsIHx8ICFpbmNsdWRlcy5jYWxsKGN1cnJlbnRfc291cmNlcywgc2lnbmFsKSkpIHtcblx0XHRcdHZhciBkZXBzID0gYWN0aXZlX3JlYWN0aW9uLmRlcHM7XG5cblx0XHRcdGlmICgoYWN0aXZlX3JlYWN0aW9uLmYgJiBSRUFDVElPTl9JU19VUERBVElORykgIT09IDApIHtcblx0XHRcdFx0Ly8gd2UncmUgaW4gdGhlIGVmZmVjdCBpbml0L3VwZGF0ZSBjeWNsZVxuXHRcdFx0XHRpZiAoc2lnbmFsLnJ2IDwgcmVhZF92ZXJzaW9uKSB7XG5cdFx0XHRcdFx0c2lnbmFsLnJ2ID0gcmVhZF92ZXJzaW9uO1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHNpZ25hbCBpcyBhY2Nlc3NpbmcgdGhlIHNhbWUgZGVwZW5kZW5jaWVzIGluIHRoZSBzYW1lXG5cdFx0XHRcdFx0Ly8gb3JkZXIgYXMgaXQgZGlkIGxhc3QgdGltZSwgaW5jcmVtZW50IGBza2lwcGVkX2RlcHNgXG5cdFx0XHRcdFx0Ly8gcmF0aGVyIHRoYW4gdXBkYXRpbmcgYG5ld19kZXBzYCwgd2hpY2ggY3JlYXRlcyBHQyBjb3N0XG5cdFx0XHRcdFx0aWYgKG5ld19kZXBzID09PSBudWxsICYmIGRlcHMgIT09IG51bGwgJiYgZGVwc1tza2lwcGVkX2RlcHNdID09PSBzaWduYWwpIHtcblx0XHRcdFx0XHRcdHNraXBwZWRfZGVwcysrO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobmV3X2RlcHMgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdG5ld19kZXBzID0gW3NpZ25hbF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG5ld19kZXBzLnB1c2goc2lnbmFsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHdlJ3JlIGFkZGluZyBhIGRlcGVuZGVuY3kgb3V0c2lkZSB0aGUgaW5pdC91cGRhdGUgY3ljbGVcblx0XHRcdFx0Ly8gKGkuZS4gYWZ0ZXIgYW4gYGF3YWl0YClcblx0XHRcdFx0KGFjdGl2ZV9yZWFjdGlvbi5kZXBzID8/PSBbXSkucHVzaChzaWduYWwpO1xuXG5cdFx0XHRcdHZhciByZWFjdGlvbnMgPSBzaWduYWwucmVhY3Rpb25zO1xuXG5cdFx0XHRcdGlmIChyZWFjdGlvbnMgPT09IG51bGwpIHtcblx0XHRcdFx0XHRzaWduYWwucmVhY3Rpb25zID0gW2FjdGl2ZV9yZWFjdGlvbl07XG5cdFx0XHRcdH0gZWxzZSBpZiAoIWluY2x1ZGVzLmNhbGwocmVhY3Rpb25zLCBhY3RpdmVfcmVhY3Rpb24pKSB7XG5cdFx0XHRcdFx0cmVhY3Rpb25zLnB1c2goYWN0aXZlX3JlYWN0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChERVYpIHtcblx0XHQvLyBUT0RPIHJlaW5zdGF0ZSB0aGlzLCBidXQgbWFrZSBpdCBhY3R1YWxseSB3b3JrXG5cdFx0Ly8gaWYgKGN1cnJlbnRfYXN5bmNfZWZmZWN0KSB7XG5cdFx0Ly8gXHR2YXIgdHJhY2tpbmcgPSAoY3VycmVudF9hc3luY19lZmZlY3QuZiAmIFJFQUNUSU9OX0lTX1VQREFUSU5HKSAhPT0gMDtcblx0XHQvLyBcdHZhciB3YXNfcmVhZCA9IGN1cnJlbnRfYXN5bmNfZWZmZWN0LmRlcHM/LmluY2x1ZGVzKHNpZ25hbCk7XG5cblx0XHQvLyBcdGlmICghdHJhY2tpbmcgJiYgIXVudHJhY2tpbmcgJiYgIXdhc19yZWFkKSB7XG5cdFx0Ly8gXHRcdHcuYXdhaXRfcmVhY3Rpdml0eV9sb3NzKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoc2lnbmFsLmxhYmVsKSk7XG5cblx0XHQvLyBcdFx0dmFyIHRyYWNlID0gZ2V0X2Vycm9yKCd0cmFjZWQgYXQnKTtcblx0XHQvLyBcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHQvLyBcdFx0aWYgKHRyYWNlKSBjb25zb2xlLndhcm4odHJhY2UpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdHJlY2VudF9hc3luY19kZXJpdmVkcy5kZWxldGUoc2lnbmFsKTtcblxuXHRcdGlmIChcblx0XHRcdHRyYWNpbmdfbW9kZV9mbGFnICYmXG5cdFx0XHQhdW50cmFja2luZyAmJlxuXHRcdFx0dHJhY2luZ19leHByZXNzaW9ucyAhPT0gbnVsbCAmJlxuXHRcdFx0YWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmXG5cdFx0XHR0cmFjaW5nX2V4cHJlc3Npb25zLnJlYWN0aW9uID09PSBhY3RpdmVfcmVhY3Rpb25cblx0XHQpIHtcblx0XHRcdC8vIFVzZWQgd2hlbiBtYXBwaW5nIHN0YXRlIGJldHdlZW4gc3BlY2lhbCBibG9ja3MgbGlrZSBgZWFjaGBcblx0XHRcdGlmIChzaWduYWwudHJhY2UpIHtcblx0XHRcdFx0c2lnbmFsLnRyYWNlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgdHJhY2UgPSBnZXRfZXJyb3IoJ3RyYWNlZCBhdCcpO1xuXG5cdFx0XHRcdGlmICh0cmFjZSkge1xuXHRcdFx0XHRcdHZhciBlbnRyeSA9IHRyYWNpbmdfZXhwcmVzc2lvbnMuZW50cmllcy5nZXQoc2lnbmFsKTtcblxuXHRcdFx0XHRcdGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRlbnRyeSA9IHsgdHJhY2VzOiBbXSB9O1xuXHRcdFx0XHRcdFx0dHJhY2luZ19leHByZXNzaW9ucy5lbnRyaWVzLnNldChzaWduYWwsIGVudHJ5KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgbGFzdCA9IGVudHJ5LnRyYWNlc1tlbnRyeS50cmFjZXMubGVuZ3RoIC0gMV07XG5cblx0XHRcdFx0XHQvLyB0cmFjZXMgY2FuIGJlIGR1cGxpY2F0ZWQsIGUuZy4gYnkgYHNuYXBzaG90YCBpbnZva2luZyBib3RoXG5cdFx0XHRcdFx0Ly8gYm90aCBgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBhbmQgYGdldGAgdHJhcHMgYXQgb25jZVxuXHRcdFx0XHRcdGlmICh0cmFjZS5zdGFjayAhPT0gbGFzdD8uc3RhY2spIHtcblx0XHRcdFx0XHRcdGVudHJ5LnRyYWNlcy5wdXNoKHRyYWNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoaXNfZGVzdHJveWluZ19lZmZlY3QgJiYgb2xkX3ZhbHVlcy5oYXMoc2lnbmFsKSkge1xuXHRcdHJldHVybiBvbGRfdmFsdWVzLmdldChzaWduYWwpO1xuXHR9XG5cblx0aWYgKGlzX2Rlcml2ZWQpIHtcblx0XHR2YXIgZGVyaXZlZCA9IC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKHNpZ25hbCk7XG5cblx0XHRpZiAoaXNfZGVzdHJveWluZ19lZmZlY3QpIHtcblx0XHRcdHZhciB2YWx1ZSA9IGRlcml2ZWQudjtcblxuXHRcdFx0Ly8gaWYgdGhlIGRlcml2ZWQgaXMgZGlydHkgYW5kIGhhcyByZWFjdGlvbnMsIG9yIGRlcGVuZHMgb24gdGhlIHZhbHVlcyB0aGF0IGp1c3QgY2hhbmdlZCwgcmUtZXhlY3V0ZVxuXHRcdFx0Ly8gKGEgZGVyaXZlZCBjYW4gYmUgbWF5YmVfZGlydHkgZHVlIHRvIHRoZSBlZmZlY3QgZGVzdHJveSByZW1vdmluZyBpdHMgbGFzdCByZWFjdGlvbilcblx0XHRcdGlmIChcblx0XHRcdFx0KChkZXJpdmVkLmYgJiBDTEVBTikgPT09IDAgJiYgZGVyaXZlZC5yZWFjdGlvbnMgIT09IG51bGwpIHx8XG5cdFx0XHRcdGRlcGVuZHNfb25fb2xkX3ZhbHVlcyhkZXJpdmVkKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHZhbHVlID0gZXhlY3V0ZV9kZXJpdmVkKGRlcml2ZWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRvbGRfdmFsdWVzLnNldChkZXJpdmVkLCB2YWx1ZSk7XG5cblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHQvLyBjb25uZWN0IGRpc2Nvbm5lY3RlZCBkZXJpdmVkcyBpZiB3ZSBhcmUgcmVhZGluZyB0aGVtIGluc2lkZSBhbiBlZmZlY3QsXG5cdFx0Ly8gb3IgaW5zaWRlIGFub3RoZXIgZGVyaXZlZCB0aGF0IGlzIGFscmVhZHkgY29ubmVjdGVkXG5cdFx0dmFyIHNob3VsZF9jb25uZWN0ID1cblx0XHRcdChkZXJpdmVkLmYgJiBDT05ORUNURUQpID09PSAwICYmXG5cdFx0XHQhdW50cmFja2luZyAmJlxuXHRcdFx0YWN0aXZlX3JlYWN0aW9uICE9PSBudWxsICYmXG5cdFx0XHQoaXNfdXBkYXRpbmdfZWZmZWN0IHx8IChhY3RpdmVfcmVhY3Rpb24uZiAmIENPTk5FQ1RFRCkgIT09IDApO1xuXG5cdFx0dmFyIGlzX25ldyA9IChkZXJpdmVkLmYgJiBSRUFDVElPTl9SQU4pID09PSAwO1xuXG5cdFx0aWYgKGlzX2RpcnR5KGRlcml2ZWQpKSB7XG5cdFx0XHRpZiAoc2hvdWxkX2Nvbm5lY3QpIHtcblx0XHRcdFx0Ly8gc2V0IHRoZSBmbGFnIGJlZm9yZSBgdXBkYXRlX2Rlcml2ZWRgLCBzbyB0aGF0IHRoZSBkZXJpdmVkXG5cdFx0XHRcdC8vIGlzIGFkZGVkIGFzIGEgcmVhY3Rpb24gdG8gaXRzIGRlcGVuZGVuY2llc1xuXHRcdFx0XHRkZXJpdmVkLmYgfD0gQ09OTkVDVEVEO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGVfZGVyaXZlZChkZXJpdmVkKTtcblx0XHR9XG5cblx0XHRpZiAoc2hvdWxkX2Nvbm5lY3QgJiYgIWlzX25ldykge1xuXHRcdFx0dW5mcmVlemVfZGVyaXZlZF9lZmZlY3RzKGRlcml2ZWQpO1xuXHRcdFx0cmVjb25uZWN0KGRlcml2ZWQpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChiYXRjaF92YWx1ZXM/LmhhcyhzaWduYWwpKSB7XG5cdFx0cmV0dXJuIGJhdGNoX3ZhbHVlcy5nZXQoc2lnbmFsKTtcblx0fVxuXG5cdGlmICgoc2lnbmFsLmYgJiBFUlJPUl9WQUxVRSkgIT09IDApIHtcblx0XHR0aHJvdyBzaWduYWwudjtcblx0fVxuXG5cdHJldHVybiBzaWduYWwudjtcbn1cblxuLyoqXG4gKiAoUmUpY29ubmVjdCBhIGRpc2Nvbm5lY3RlZCBkZXJpdmVkLCBzbyB0aGF0IGl0IGlzIG5vdGlmaWVkXG4gKiBvZiBjaGFuZ2VzIGluIGBtYXJrX3JlYWN0aW9uc2BcbiAqIEBwYXJhbSB7RGVyaXZlZH0gZGVyaXZlZFxuICovXG5mdW5jdGlvbiByZWNvbm5lY3QoZGVyaXZlZCkge1xuXHRkZXJpdmVkLmYgfD0gQ09OTkVDVEVEO1xuXG5cdGlmIChkZXJpdmVkLmRlcHMgPT09IG51bGwpIHJldHVybjtcblxuXHRmb3IgKGNvbnN0IGRlcCBvZiBkZXJpdmVkLmRlcHMpIHtcblx0XHQoZGVwLnJlYWN0aW9ucyA/Pz0gW10pLnB1c2goZGVyaXZlZCk7XG5cblx0XHRpZiAoKGRlcC5mICYgREVSSVZFRCkgIT09IDAgJiYgKGRlcC5mICYgQ09OTkVDVEVEKSA9PT0gMCkge1xuXHRcdFx0dW5mcmVlemVfZGVyaXZlZF9lZmZlY3RzKC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGRlcCkpO1xuXHRcdFx0cmVjb25uZWN0KC8qKiBAdHlwZSB7RGVyaXZlZH0gKi8gKGRlcCkpO1xuXHRcdH1cblx0fVxufVxuXG4vKiogQHBhcmFtIHtEZXJpdmVkfSBkZXJpdmVkICovXG5mdW5jdGlvbiBkZXBlbmRzX29uX29sZF92YWx1ZXMoZGVyaXZlZCkge1xuXHRpZiAoZGVyaXZlZC52ID09PSBVTklOSVRJQUxJWkVEKSByZXR1cm4gdHJ1ZTsgLy8gd2UgZG9uJ3Qga25vdywgc28gYXNzdW1lIHRoZSB3b3JzdFxuXHRpZiAoZGVyaXZlZC5kZXBzID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cblx0Zm9yIChjb25zdCBkZXAgb2YgZGVyaXZlZC5kZXBzKSB7XG5cdFx0aWYgKG9sZF92YWx1ZXMuaGFzKGRlcCkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgoZGVwLmYgJiBERVJJVkVEKSAhPT0gMCAmJiBkZXBlbmRzX29uX29sZF92YWx1ZXMoLyoqIEB0eXBlIHtEZXJpdmVkfSAqLyAoZGVwKSkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBMaWtlIGBnZXRgLCBidXQgY2hlY2tzIGZvciBgdW5kZWZpbmVkYC4gVXNlZCBmb3IgYHZhcmAgZGVjbGFyYXRpb25zIGJlY2F1c2UgdGhleSBjYW4gYmUgYWNjZXNzZWQgYmVmb3JlIGJlaW5nIGRlY2xhcmVkXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtWYWx1ZTxWPiB8IHVuZGVmaW5lZH0gc2lnbmFsXG4gKiBAcmV0dXJucyB7ViB8IHVuZGVmaW5lZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVfZ2V0KHNpZ25hbCkge1xuXHRyZXR1cm4gc2lnbmFsICYmIGdldChzaWduYWwpO1xufVxuXG4vKipcbiAqIFdoZW4gdXNlZCBpbnNpZGUgYSBbYCRkZXJpdmVkYF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRkZXJpdmVkKSBvciBbYCRlZmZlY3RgXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGVmZmVjdCksXG4gKiBhbnkgc3RhdGUgcmVhZCBpbnNpZGUgYGZuYCB3aWxsIG5vdCBiZSB0cmVhdGVkIGFzIGEgZGVwZW5kZW5jeS5cbiAqXG4gKiBgYGB0c1xuICogJGVmZmVjdCgoKSA9PiB7XG4gKiAgIC8vIHRoaXMgd2lsbCBydW4gd2hlbiBgZGF0YWAgY2hhbmdlcywgYnV0IG5vdCB3aGVuIGB0aW1lYCBjaGFuZ2VzXG4gKiAgIHNhdmUoZGF0YSwge1xuICogICAgIHRpbWVzdGFtcDogdW50cmFjaygoKSA9PiB0aW1lKVxuICogICB9KTtcbiAqIH0pO1xuICogYGBgXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHsoKSA9PiBUfSBmblxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnRyYWNrKGZuKSB7XG5cdHZhciBwcmV2aW91c191bnRyYWNraW5nID0gdW50cmFja2luZztcblx0dHJ5IHtcblx0XHR1bnRyYWNraW5nID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm4oKTtcblx0fSBmaW5hbGx5IHtcblx0XHR1bnRyYWNraW5nID0gcHJldmlvdXNfdW50cmFja2luZztcblx0fVxufVxuXG4vKipcbiAqIFBvc3NpYmx5IHRyYXZlcnNlIGFuIG9iamVjdCBhbmQgcmVhZCBhbGwgaXRzIHByb3BlcnRpZXMgc28gdGhhdCB0aGV5J3JlIGFsbCByZWFjdGl2ZSBpbiBjYXNlIHRoaXMgaXMgYCRzdGF0ZWAuXG4gKiBEb2VzIG9ubHkgY2hlY2sgZmlyc3QgbGV2ZWwgb2YgYW4gb2JqZWN0IGZvciBwZXJmb3JtYW5jZSByZWFzb25zIChoZXVyaXN0aWMgc2hvdWxkIGJlIGdvb2QgZm9yIDk5JSBvZiBhbGwgY2FzZXMpLlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBfcmVhZF9zdGF0ZSh2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyB8fCAhdmFsdWUgfHwgdmFsdWUgaW5zdGFuY2VvZiBFdmVudFRhcmdldCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChTVEFURV9TWU1CT0wgaW4gdmFsdWUpIHtcblx0XHRkZWVwX3JlYWQodmFsdWUpO1xuXHR9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdGZvciAobGV0IGtleSBpbiB2YWx1ZSkge1xuXHRcdFx0Y29uc3QgcHJvcCA9IHZhbHVlW2tleV07XG5cdFx0XHRpZiAodHlwZW9mIHByb3AgPT09ICdvYmplY3QnICYmIHByb3AgJiYgU1RBVEVfU1lNQk9MIGluIHByb3ApIHtcblx0XHRcdFx0ZGVlcF9yZWFkKHByb3ApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIERlZXBseSB0cmF2ZXJzZSBhbiBvYmplY3QgYW5kIHJlYWQgYWxsIGl0cyBwcm9wZXJ0aWVzXG4gKiBzbyB0aGF0IHRoZXkncmUgYWxsIHJlYWN0aXZlIGluIGNhc2UgdGhpcyBpcyBgJHN0YXRlYFxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcGFyYW0ge1NldDxhbnk+fSB2aXNpdGVkXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBfcmVhZCh2YWx1ZSwgdmlzaXRlZCA9IG5ldyBTZXQoKSkge1xuXHRpZiAoXG5cdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0Ly8gV2UgZG9uJ3Qgd2FudCB0byB0cmF2ZXJzZSBET00gZWxlbWVudHNcblx0XHQhKHZhbHVlIGluc3RhbmNlb2YgRXZlbnRUYXJnZXQpICYmXG5cdFx0IXZpc2l0ZWQuaGFzKHZhbHVlKVxuXHQpIHtcblx0XHR2aXNpdGVkLmFkZCh2YWx1ZSk7XG5cdFx0Ly8gV2hlbiB3b3JraW5nIHdpdGggYSBwb3NzaWJsZSBTdmVsdGVEYXRlLCB0aGlzXG5cdFx0Ly8gd2lsbCBlbnN1cmUgd2UgY2FwdHVyZSBjaGFuZ2VzIHRvIGl0LlxuXHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHZhbHVlLmdldFRpbWUoKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQga2V5IGluIHZhbHVlKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkZWVwX3JlYWQodmFsdWVba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIGNvbnRpbnVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvbnN0IHByb3RvID0gZ2V0X3Byb3RvdHlwZV9vZih2YWx1ZSk7XG5cdFx0aWYgKFxuXHRcdFx0cHJvdG8gIT09IE9iamVjdC5wcm90b3R5cGUgJiZcblx0XHRcdHByb3RvICE9PSBBcnJheS5wcm90b3R5cGUgJiZcblx0XHRcdHByb3RvICE9PSBNYXAucHJvdG90eXBlICYmXG5cdFx0XHRwcm90byAhPT0gU2V0LnByb3RvdHlwZSAmJlxuXHRcdFx0cHJvdG8gIT09IERhdGUucHJvdG90eXBlXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9ycyA9IGdldF9kZXNjcmlwdG9ycyhwcm90byk7XG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gZGVzY3JpcHRvcnMpIHtcblx0XHRcdFx0Y29uc3QgZ2V0ID0gZGVzY3JpcHRvcnNba2V5XS5nZXQ7XG5cdFx0XHRcdGlmIChnZXQpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Z2V0LmNhbGwodmFsdWUpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdC8vIGNvbnRpbnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCJjb25zdCByZWdleF9yZXR1cm5fY2hhcmFjdGVycyA9IC9cXHIvZztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaChzdHIpIHtcblx0c3RyID0gc3RyLnJlcGxhY2UocmVnZXhfcmV0dXJuX2NoYXJhY3RlcnMsICcnKTtcblx0bGV0IGhhc2ggPSA1MzgxO1xuXHRsZXQgaSA9IHN0ci5sZW5ndGg7XG5cblx0d2hpbGUgKGktLSkgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG5cdHJldHVybiAoaGFzaCA+Pj4gMCkudG9TdHJpbmcoMzYpO1xufVxuXG5jb25zdCBWT0lEX0VMRU1FTlRfTkFNRVMgPSBbXG5cdCdhcmVhJyxcblx0J2Jhc2UnLFxuXHQnYnInLFxuXHQnY29sJyxcblx0J2NvbW1hbmQnLFxuXHQnZW1iZWQnLFxuXHQnaHInLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2tleWdlbicsXG5cdCdsaW5rJyxcblx0J21ldGEnLFxuXHQncGFyYW0nLFxuXHQnc291cmNlJyxcblx0J3RyYWNrJyxcblx0J3dicidcbl07XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYG5hbWVgIGlzIG9mIGEgdm9pZCBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfdm9pZChuYW1lKSB7XG5cdHJldHVybiBWT0lEX0VMRU1FTlRfTkFNRVMuaW5jbHVkZXMobmFtZSkgfHwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSAnIWRvY3R5cGUnO1xufVxuXG5jb25zdCBSRVNFUlZFRF9XT1JEUyA9IFtcblx0J2FyZ3VtZW50cycsXG5cdCdhd2FpdCcsXG5cdCdicmVhaycsXG5cdCdjYXNlJyxcblx0J2NhdGNoJyxcblx0J2NsYXNzJyxcblx0J2NvbnN0Jyxcblx0J2NvbnRpbnVlJyxcblx0J2RlYnVnZ2VyJyxcblx0J2RlZmF1bHQnLFxuXHQnZGVsZXRlJyxcblx0J2RvJyxcblx0J2Vsc2UnLFxuXHQnZW51bScsXG5cdCdldmFsJyxcblx0J2V4cG9ydCcsXG5cdCdleHRlbmRzJyxcblx0J2ZhbHNlJyxcblx0J2ZpbmFsbHknLFxuXHQnZm9yJyxcblx0J2Z1bmN0aW9uJyxcblx0J2lmJyxcblx0J2ltcGxlbWVudHMnLFxuXHQnaW1wb3J0Jyxcblx0J2luJyxcblx0J2luc3RhbmNlb2YnLFxuXHQnaW50ZXJmYWNlJyxcblx0J2xldCcsXG5cdCduZXcnLFxuXHQnbnVsbCcsXG5cdCdwYWNrYWdlJyxcblx0J3ByaXZhdGUnLFxuXHQncHJvdGVjdGVkJyxcblx0J3B1YmxpYycsXG5cdCdyZXR1cm4nLFxuXHQnc3RhdGljJyxcblx0J3N1cGVyJyxcblx0J3N3aXRjaCcsXG5cdCd0aGlzJyxcblx0J3Rocm93Jyxcblx0J3RydWUnLFxuXHQndHJ5Jyxcblx0J3R5cGVvZicsXG5cdCd2YXInLFxuXHQndm9pZCcsXG5cdCd3aGlsZScsXG5cdCd3aXRoJyxcblx0J3lpZWxkJ1xuXTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBgd29yZGAgaXMgYSByZXNlcnZlZCBKYXZhU2NyaXB0IGtleXdvcmRcbiAqIEBwYXJhbSB7c3RyaW5nfSB3b3JkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19yZXNlcnZlZCh3b3JkKSB7XG5cdHJldHVybiBSRVNFUlZFRF9XT1JEUy5pbmNsdWRlcyh3b3JkKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfY2FwdHVyZV9ldmVudChuYW1lKSB7XG5cdHJldHVybiBuYW1lLmVuZHNXaXRoKCdjYXB0dXJlJykgJiYgbmFtZSAhPT0gJ2dvdHBvaW50ZXJjYXB0dXJlJyAmJiBuYW1lICE9PSAnbG9zdHBvaW50ZXJjYXB0dXJlJztcbn1cblxuLyoqIExpc3Qgb2YgRWxlbWVudCBldmVudHMgdGhhdCB3aWxsIGJlIGRlbGVnYXRlZCAqL1xuY29uc3QgREVMRUdBVEVEX0VWRU5UUyA9IFtcblx0J2JlZm9yZWlucHV0Jyxcblx0J2NsaWNrJyxcblx0J2NoYW5nZScsXG5cdCdkYmxjbGljaycsXG5cdCdjb250ZXh0bWVudScsXG5cdCdmb2N1c2luJyxcblx0J2ZvY3Vzb3V0Jyxcblx0J2lucHV0Jyxcblx0J2tleWRvd24nLFxuXHQna2V5dXAnLFxuXHQnbW91c2Vkb3duJyxcblx0J21vdXNlbW92ZScsXG5cdCdtb3VzZW91dCcsXG5cdCdtb3VzZW92ZXInLFxuXHQnbW91c2V1cCcsXG5cdCdwb2ludGVyZG93bicsXG5cdCdwb2ludGVybW92ZScsXG5cdCdwb2ludGVyb3V0Jyxcblx0J3BvaW50ZXJvdmVyJyxcblx0J3BvaW50ZXJ1cCcsXG5cdCd0b3VjaGVuZCcsXG5cdCd0b3VjaG1vdmUnLFxuXHQndG91Y2hzdGFydCdcbl07XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYGV2ZW50X25hbWVgIGlzIGEgZGVsZWdhdGVkIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRfbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuX2RlbGVnYXRlX2V2ZW50KGV2ZW50X25hbWUpIHtcblx0cmV0dXJuIERFTEVHQVRFRF9FVkVOVFMuaW5jbHVkZXMoZXZlbnRfbmFtZSk7XG59XG5cbi8qKlxuICogQXR0cmlidXRlcyB0aGF0IGFyZSBib29sZWFuLCBpLmUuIHRoZXkgYXJlIHByZXNlbnQgb3Igbm90IHByZXNlbnQuXG4gKi9cbmNvbnN0IERPTV9CT09MRUFOX0FUVFJJQlVURVMgPSBbXG5cdCdhbGxvd2Z1bGxzY3JlZW4nLFxuXHQnYXN5bmMnLFxuXHQnYXV0b2ZvY3VzJyxcblx0J2F1dG9wbGF5Jyxcblx0J2NoZWNrZWQnLFxuXHQnY29udHJvbHMnLFxuXHQnZGVmYXVsdCcsXG5cdCdkaXNhYmxlZCcsXG5cdCdmb3Jtbm92YWxpZGF0ZScsXG5cdCdpbmRldGVybWluYXRlJyxcblx0J2luZXJ0Jyxcblx0J2lzbWFwJyxcblx0J2xvb3AnLFxuXHQnbXVsdGlwbGUnLFxuXHQnbXV0ZWQnLFxuXHQnbm9tb2R1bGUnLFxuXHQnbm92YWxpZGF0ZScsXG5cdCdvcGVuJyxcblx0J3BsYXlzaW5saW5lJyxcblx0J3JlYWRvbmx5Jyxcblx0J3JlcXVpcmVkJyxcblx0J3JldmVyc2VkJyxcblx0J3NlYW1sZXNzJyxcblx0J3NlbGVjdGVkJyxcblx0J3dlYmtpdGRpcmVjdG9yeScsXG5cdCdkZWZlcicsXG5cdCdkaXNhYmxlcGljdHVyZWlucGljdHVyZScsXG5cdCdkaXNhYmxlcmVtb3RlcGxheWJhY2snXG5dO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGBuYW1lYCBpcyBhIGJvb2xlYW4gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfYm9vbGVhbl9hdHRyaWJ1dGUobmFtZSkge1xuXHRyZXR1cm4gRE9NX0JPT0xFQU5fQVRUUklCVVRFUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuLyoqXG4gKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgc3RyaW5nPn1cbiAqIExpc3Qgb2YgYXR0cmlidXRlIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGFsaWFzZWQgdG8gdGhlaXIgcHJvcGVydHkgbmFtZXNcbiAqIGJlY2F1c2UgdGhleSBiZWhhdmUgZGlmZmVyZW50bHkgYmV0d2VlbiBzZXR0aW5nIHRoZW0gYXMgYW4gYXR0cmlidXRlIGFuZFxuICogc2V0dGluZyB0aGVtIGFzIGEgcHJvcGVydHkuXG4gKi9cbmNvbnN0IEFUVFJJQlVURV9BTElBU0VTID0ge1xuXHQvLyBubyBgY2xhc3M6ICdjbGFzc05hbWUnYCBiZWNhdXNlIHdlIGhhbmRsZSB0aGF0IHNlcGFyYXRlbHlcblx0Zm9ybW5vdmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG5cdGlzbWFwOiAnaXNNYXAnLFxuXHRub21vZHVsZTogJ25vTW9kdWxlJyxcblx0cGxheXNpbmxpbmU6ICdwbGF5c0lubGluZScsXG5cdHJlYWRvbmx5OiAncmVhZE9ubHknLFxuXHRkZWZhdWx0dmFsdWU6ICdkZWZhdWx0VmFsdWUnLFxuXHRkZWZhdWx0Y2hlY2tlZDogJ2RlZmF1bHRDaGVja2VkJyxcblx0c3Jjb2JqZWN0OiAnc3JjT2JqZWN0Jyxcblx0bm92YWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuXHRhbGxvd2Z1bGxzY3JlZW46ICdhbGxvd0Z1bGxzY3JlZW4nLFxuXHRkaXNhYmxlcGljdHVyZWlucGljdHVyZTogJ2Rpc2FibGVQaWN0dXJlSW5QaWN0dXJlJyxcblx0ZGlzYWJsZXJlbW90ZXBsYXliYWNrOiAnZGlzYWJsZVJlbW90ZVBsYXliYWNrJ1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplX2F0dHJpYnV0ZShuYW1lKSB7XG5cdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdHJldHVybiBBVFRSSUJVVEVfQUxJQVNFU1tuYW1lXSA/PyBuYW1lO1xufVxuXG5jb25zdCBET01fUFJPUEVSVElFUyA9IFtcblx0Li4uRE9NX0JPT0xFQU5fQVRUUklCVVRFUyxcblx0J2Zvcm1Ob1ZhbGlkYXRlJyxcblx0J2lzTWFwJyxcblx0J25vTW9kdWxlJyxcblx0J3BsYXlzSW5saW5lJyxcblx0J3JlYWRPbmx5Jyxcblx0J3ZhbHVlJyxcblx0J3ZvbHVtZScsXG5cdCdkZWZhdWx0VmFsdWUnLFxuXHQnZGVmYXVsdENoZWNrZWQnLFxuXHQnc3JjT2JqZWN0Jyxcblx0J25vVmFsaWRhdGUnLFxuXHQnYWxsb3dGdWxsc2NyZWVuJyxcblx0J2Rpc2FibGVQaWN0dXJlSW5QaWN0dXJlJyxcblx0J2Rpc2FibGVSZW1vdGVQbGF5YmFjaydcbl07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2RvbV9wcm9wZXJ0eShuYW1lKSB7XG5cdHJldHVybiBET01fUFJPUEVSVElFUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuY29uc3QgTk9OX1NUQVRJQ19QUk9QRVJUSUVTID0gWydhdXRvZm9jdXMnLCAnbXV0ZWQnLCAnZGVmYXVsdFZhbHVlJywgJ2RlZmF1bHRDaGVja2VkJ107XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIGF0dHJpYnV0ZSBjYW5ub3QgYmUgc2V0IHRocm91Z2ggdGhlIHRlbXBsYXRlXG4gKiBzdHJpbmcsIGkuZS4gbmVlZHMgc29tZSBraW5kIG9mIEphdmFTY3JpcHQgaGFuZGxpbmcgdG8gd29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5ub3RfYmVfc2V0X3N0YXRpY2FsbHkobmFtZSkge1xuXHRyZXR1cm4gTk9OX1NUQVRJQ19QUk9QRVJUSUVTLmluY2x1ZGVzKG5hbWUpO1xufVxuXG4vKipcbiAqIFN1YnNldCBvZiBkZWxlZ2F0ZWQgZXZlbnRzIHdoaWNoIHNob3VsZCBiZSBwYXNzaXZlIGJ5IGRlZmF1bHQuXG4gKiBUaGVzZSB0d28gYXJlIGFscmVhZHkgcGFzc2l2ZSB2aWEgYnJvd3NlciBkZWZhdWx0cyBvbiB3aW5kb3csIGRvY3VtZW50IGFuZCBib2R5LlxuICogQnV0IHNpbmNlXG4gKiAtIHdlJ3JlIGRlbGVnYXRpbmcgdGhlbVxuICogLSB0aGV5IGhhcHBlbiBvZnRlblxuICogLSB0aGV5IGFwcGx5IHRvIG1vYmlsZSB3aGljaCBpcyBnZW5lcmFsbHkgbGVzcyBwZXJmb3JtYW50XG4gKiB3ZSdyZSBtYXJraW5nIHRoZW0gYXMgcGFzc2l2ZSBieSBkZWZhdWx0IGZvciBvdGhlciBlbGVtZW50cywgdG9vLlxuICovXG5jb25zdCBQQVNTSVZFX0VWRU5UUyA9IFsndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnXTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBgbmFtZWAgaXMgYSBwYXNzaXZlIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfcGFzc2l2ZV9ldmVudChuYW1lKSB7XG5cdHJldHVybiBQQVNTSVZFX0VWRU5UUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuY29uc3QgQ09OVEVOVF9FRElUQUJMRV9CSU5ESU5HUyA9IFsndGV4dENvbnRlbnQnLCAnaW5uZXJIVE1MJywgJ2lubmVyVGV4dCddO1xuXG4vKiogQHBhcmFtIHtzdHJpbmd9IG5hbWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19jb250ZW50X2VkaXRhYmxlX2JpbmRpbmcobmFtZSkge1xuXHRyZXR1cm4gQ09OVEVOVF9FRElUQUJMRV9CSU5ESU5HUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuY29uc3QgTE9BRF9FUlJPUl9FTEVNRU5UUyA9IFtcblx0J2JvZHknLFxuXHQnZW1iZWQnLFxuXHQnaWZyYW1lJyxcblx0J2ltZycsXG5cdCdsaW5rJyxcblx0J29iamVjdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXHQndHJhY2snXG5dO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBlbGVtZW50IGVtaXRzIGBsb2FkYCBhbmQgYGVycm9yYCBldmVudHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19sb2FkX2Vycm9yX2VsZW1lbnQobmFtZSkge1xuXHRyZXR1cm4gTE9BRF9FUlJPUl9FTEVNRU5UUy5pbmNsdWRlcyhuYW1lKTtcbn1cblxuY29uc3QgU1ZHX0VMRU1FTlRTID0gW1xuXHQnYWx0R2x5cGgnLFxuXHQnYWx0R2x5cGhEZWYnLFxuXHQnYWx0R2x5cGhJdGVtJyxcblx0J2FuaW1hdGUnLFxuXHQnYW5pbWF0ZUNvbG9yJyxcblx0J2FuaW1hdGVNb3Rpb24nLFxuXHQnYW5pbWF0ZVRyYW5zZm9ybScsXG5cdCdjaXJjbGUnLFxuXHQnY2xpcFBhdGgnLFxuXHQnY29sb3ItcHJvZmlsZScsXG5cdCdjdXJzb3InLFxuXHQnZGVmcycsXG5cdCdkZXNjJyxcblx0J2Rpc2NhcmQnLFxuXHQnZWxsaXBzZScsXG5cdCdmZUJsZW5kJyxcblx0J2ZlQ29sb3JNYXRyaXgnLFxuXHQnZmVDb21wb25lbnRUcmFuc2ZlcicsXG5cdCdmZUNvbXBvc2l0ZScsXG5cdCdmZUNvbnZvbHZlTWF0cml4Jyxcblx0J2ZlRGlmZnVzZUxpZ2h0aW5nJyxcblx0J2ZlRGlzcGxhY2VtZW50TWFwJyxcblx0J2ZlRGlzdGFudExpZ2h0Jyxcblx0J2ZlRHJvcFNoYWRvdycsXG5cdCdmZUZsb29kJyxcblx0J2ZlRnVuY0EnLFxuXHQnZmVGdW5jQicsXG5cdCdmZUZ1bmNHJyxcblx0J2ZlRnVuY1InLFxuXHQnZmVHYXVzc2lhbkJsdXInLFxuXHQnZmVJbWFnZScsXG5cdCdmZU1lcmdlJyxcblx0J2ZlTWVyZ2VOb2RlJyxcblx0J2ZlTW9ycGhvbG9neScsXG5cdCdmZU9mZnNldCcsXG5cdCdmZVBvaW50TGlnaHQnLFxuXHQnZmVTcGVjdWxhckxpZ2h0aW5nJyxcblx0J2ZlU3BvdExpZ2h0Jyxcblx0J2ZlVGlsZScsXG5cdCdmZVR1cmJ1bGVuY2UnLFxuXHQnZmlsdGVyJyxcblx0J2ZvbnQnLFxuXHQnZm9udC1mYWNlJyxcblx0J2ZvbnQtZmFjZS1mb3JtYXQnLFxuXHQnZm9udC1mYWNlLW5hbWUnLFxuXHQnZm9udC1mYWNlLXNyYycsXG5cdCdmb250LWZhY2UtdXJpJyxcblx0J2ZvcmVpZ25PYmplY3QnLFxuXHQnZycsXG5cdCdnbHlwaCcsXG5cdCdnbHlwaFJlZicsXG5cdCdoYXRjaCcsXG5cdCdoYXRjaHBhdGgnLFxuXHQnaGtlcm4nLFxuXHQnaW1hZ2UnLFxuXHQnbGluZScsXG5cdCdsaW5lYXJHcmFkaWVudCcsXG5cdCdtYXJrZXInLFxuXHQnbWFzaycsXG5cdCdtZXNoJyxcblx0J21lc2hncmFkaWVudCcsXG5cdCdtZXNocGF0Y2gnLFxuXHQnbWVzaHJvdycsXG5cdCdtZXRhZGF0YScsXG5cdCdtaXNzaW5nLWdseXBoJyxcblx0J21wYXRoJyxcblx0J3BhdGgnLFxuXHQncGF0dGVybicsXG5cdCdwb2x5Z29uJyxcblx0J3BvbHlsaW5lJyxcblx0J3JhZGlhbEdyYWRpZW50Jyxcblx0J3JlY3QnLFxuXHQnc2V0Jyxcblx0J3NvbGlkY29sb3InLFxuXHQnc3RvcCcsXG5cdCdzdmcnLFxuXHQnc3dpdGNoJyxcblx0J3N5bWJvbCcsXG5cdCd0ZXh0Jyxcblx0J3RleHRQYXRoJyxcblx0J3RyZWYnLFxuXHQndHNwYW4nLFxuXHQndW5rbm93bicsXG5cdCd1c2UnLFxuXHQndmlldycsXG5cdCd2a2Vybidcbl07XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3N2ZyhuYW1lKSB7XG5cdHJldHVybiBTVkdfRUxFTUVOVFMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IE1BVEhNTF9FTEVNRU5UUyA9IFtcblx0J2Fubm90YXRpb24nLFxuXHQnYW5ub3RhdGlvbi14bWwnLFxuXHQnbWFjdGlvbicsXG5cdCdtYXRoJyxcblx0J21lcnJvcicsXG5cdCdtZnJhYycsXG5cdCdtaScsXG5cdCdtbXVsdGlzY3JpcHRzJyxcblx0J21uJyxcblx0J21vJyxcblx0J21vdmVyJyxcblx0J21wYWRkZWQnLFxuXHQnbXBoYW50b20nLFxuXHQnbXByZXNjcmlwdHMnLFxuXHQnbXJvb3QnLFxuXHQnbXJvdycsXG5cdCdtcycsXG5cdCdtc3BhY2UnLFxuXHQnbXNxcnQnLFxuXHQnbXN0eWxlJyxcblx0J21zdWInLFxuXHQnbXN1YnN1cCcsXG5cdCdtc3VwJyxcblx0J210YWJsZScsXG5cdCdtdGQnLFxuXHQnbXRleHQnLFxuXHQnbXRyJyxcblx0J211bmRlcicsXG5cdCdtdW5kZXJvdmVyJyxcblx0J3NlbWFudGljcydcbl07XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX21hdGhtbChuYW1lKSB7XG5cdHJldHVybiBNQVRITUxfRUxFTUVOVFMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IFNUQVRFX0NSRUFUSU9OX1JVTkVTID0gLyoqIEB0eXBlIHtjb25zdH0gKi8gKFtcblx0JyRzdGF0ZScsXG5cdCckc3RhdGUucmF3Jyxcblx0JyRkZXJpdmVkJyxcblx0JyRkZXJpdmVkLmJ5J1xuXSk7XG5cbmNvbnN0IFJVTkVTID0gLyoqIEB0eXBlIHtjb25zdH0gKi8gKFtcblx0Li4uU1RBVEVfQ1JFQVRJT05fUlVORVMsXG5cdCckc3RhdGUuZWFnZXInLFxuXHQnJHN0YXRlLnNuYXBzaG90Jyxcblx0JyRwcm9wcycsXG5cdCckcHJvcHMuaWQnLFxuXHQnJGJpbmRhYmxlJyxcblx0JyRlZmZlY3QnLFxuXHQnJGVmZmVjdC5wcmUnLFxuXHQnJGVmZmVjdC50cmFja2luZycsXG5cdCckZWZmZWN0LnJvb3QnLFxuXHQnJGVmZmVjdC5wZW5kaW5nJyxcblx0JyRpbnNwZWN0Jyxcblx0JyRpbnNwZWN0KCkud2l0aCcsXG5cdCckaW5zcGVjdC50cmFjZScsXG5cdCckaG9zdCdcbl0pO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBSVU5FU1tudW1iZXJdfSBSdW5lTmFtZSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7bmFtZSBpcyBSdW5lTmFtZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3J1bmUobmFtZSkge1xuXHRyZXR1cm4gUlVORVMuaW5jbHVkZXMoLyoqIEB0eXBlIHtSdW5lTmFtZX0gKi8gKG5hbWUpKTtcbn1cblxuLyoqIEB0eXBlZGVmIHt0eXBlb2YgU1RBVEVfQ1JFQVRJT05fUlVORVNbbnVtYmVyXX0gU3RhdGVDcmVhdGlvblJ1bmVOYW1lICovXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtuYW1lIGlzIFN0YXRlQ3JlYXRpb25SdW5lTmFtZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3N0YXRlX2NyZWF0aW9uX3J1bmUobmFtZSkge1xuXHRyZXR1cm4gU1RBVEVfQ1JFQVRJT05fUlVORVMuaW5jbHVkZXMoLyoqIEB0eXBlIHtTdGF0ZUNyZWF0aW9uUnVuZU5hbWV9ICovIChuYW1lKSk7XG59XG5cbi8qKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgcmVxdWlyZSByYXcgY29udGVudHMgYW5kIHNob3VsZCBub3QgaGF2ZSBTU1IgY29tbWVudHMgcHV0IGluIHRoZW0gKi9cbmNvbnN0IFJBV19URVhUX0VMRU1FTlRTID0gLyoqIEB0eXBlIHtjb25zdH0gKi8gKFsndGV4dGFyZWEnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3RpdGxlJ10pO1xuXG4vKiogQHBhcmFtIHtzdHJpbmd9IG5hbWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19yYXdfdGV4dF9lbGVtZW50KG5hbWUpIHtcblx0cmV0dXJuIFJBV19URVhUX0VMRU1FTlRTLmluY2x1ZGVzKC8qKiBAdHlwZSB7dHlwZW9mIFJBV19URVhUX0VMRU1FTlRTW251bWJlcl19ICovIChuYW1lKSk7XG59XG5cbi8vIE1hdGNoZXMgdmFsaWQgSFRNTC9TVkcvTWF0aE1MIGVsZW1lbnQgbmFtZXMgYW5kIGN1c3RvbSBlbGVtZW50IG5hbWVzLlxuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvY3VzdG9tLWVsZW1lbnRzLmh0bWwjdmFsaWQtY3VzdG9tLWVsZW1lbnQtbmFtZVxuLy9cbi8vIFN0YW5kYXJkIGVsZW1lbnRzOiBBU0NJSSBhbHBoYSBzdGFydCwgZm9sbG93ZWQgYnkgQVNDSUkgYWxwaGFudW1lcmljcy5cbi8vIEN1c3RvbSBlbGVtZW50czogQVNDSUkgYWxwaGEgc3RhcnQsIGZvbGxvd2VkIGJ5IGFueSBtaXggb2YgUENFTkNoYXIgKHdoaWNoXG4vLyBpbmNsdWRlcyBBU0NJSSBhbHBoYW51bWVyaWNzLCBgLWAsIGAuYCwgYF9gLCBhbmQgc3BlY2lmaWVkIFVuaWNvZGUgcmFuZ2VzKSxcbi8vIHdpdGggYXQgbGVhc3Qgb25lIGh5cGhlbiByZXF1aXJlZCBzb21ld2hlcmUgYWZ0ZXIgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbi8vXG4vLyBSZWplY3RzIHN0cmluZ3MgY29udGFpbmluZyB3aGl0ZXNwYWNlLCBxdW90ZXMsIGFuZ2xlIGJyYWNrZXRzLCBzbGFzaGVzLCBlcXVhbHMsXG4vLyBvciBvdGhlciBjaGFyYWN0ZXJzIHRoYXQgY291bGQgYnJlYWsgb3V0IG9mIGEgdGFnLW5hbWUgdG9rZW4gYW5kIGVuYWJsZSBtYXJrdXAgaW5qZWN0aW9uLlxuZXhwb3J0IGNvbnN0IFJFR0VYX1ZBTElEX1RBR19OQU1FID1cblx0L15bYS16QS1aXVthLXpBLVowLTldKigtW2EtekEtWjAtOS5cXC1fXFx1MDBCN1xcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwM0YtXFx1MjA0MFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRFxcdXsxMDAwMH0tXFx1e0VGRkZGfV0rKSokL3U7XG5cbi8qKlxuICogUHJldmVudCBkZXZ0b29scyB0cnlpbmcgdG8gbWFrZSBgbG9jYXRpb25gIGEgY2xpY2thYmxlIGxpbmsgYnkgaW5zZXJ0aW5nIGEgemVyby13aWR0aCBzcGFjZVxuICogQHRlbXBsYXRlIHtzdHJpbmcgfCB1bmRlZmluZWR9IFRcbiAqIEBwYXJhbSB7VH0gbG9jYXRpb25cbiAqIEByZXR1cm5zIHtUfTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplX2xvY2F0aW9uKGxvY2F0aW9uKSB7XG5cdHJldHVybiAvKiogQHR5cGUge1R9ICovIChsb2NhdGlvbj8ucmVwbGFjZSgvXFwvL2csICcvXFx1MjAwYicpKTtcbn1cbiIsImltcG9ydCB7IHRlYXJkb3duIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGRlZmluZV9wcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBoeWRyYXRpbmcgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL3Rhc2suanMnO1xuaW1wb3J0IHsgRklMRU5BTUUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi8uLi93YXJuaW5ncy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdHNldF9hY3RpdmVfZWZmZWN0LFxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uXG59IGZyb20gJy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgd2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0IH0gZnJvbSAnLi9iaW5kaW5ncy9zaGFyZWQuanMnO1xuXG4vKipcbiAqIFVzZWQgb24gZWxlbWVudHMsIGFzIGEgbWFwIG9mIGV2ZW50IHR5cGUgLT4gZXZlbnQgaGFuZGxlcixcbiAqIGFuZCBvbiBldmVudHMgdGhlbXNlbHZlcyB0byB0cmFjayB3aGljaCBlbGVtZW50IGhhbmRsZWQgYW4gZXZlbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50X3N5bWJvbCA9IFN5bWJvbCgnZXZlbnRzJyk7XG5cbi8qKiBAdHlwZSB7U2V0PHN0cmluZz59ICovXG5leHBvcnQgY29uc3QgYWxsX3JlZ2lzdGVyZWRfZXZlbnRzID0gbmV3IFNldCgpO1xuXG4vKiogQHR5cGUge1NldDwoZXZlbnRzOiBBcnJheTxzdHJpbmc+KSA9PiB2b2lkPn0gKi9cbmV4cG9ydCBjb25zdCByb290X2V2ZW50X2hhbmRsZXMgPSBuZXcgU2V0KCk7XG5cbi8qKlxuICogU1NSIGFkZHMgb25sb2FkIGFuZCBvbmVycm9yIGF0dHJpYnV0ZXMgdG8gY2F0Y2ggdGhvc2UgZXZlbnRzIGJlZm9yZSB0aGUgaHlkcmF0aW9uLlxuICogVGhpcyBmdW5jdGlvbiBkZXRlY3RzIHRob3NlIGNhc2VzLCByZW1vdmVzIHRoZSBhdHRyaWJ1dGVzIGFuZCByZXBsYXlzIHRoZSBldmVudHMuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxheV9ldmVudHMoZG9tKSB7XG5cdGlmICghaHlkcmF0aW5nKSByZXR1cm47XG5cblx0ZG9tLnJlbW92ZUF0dHJpYnV0ZSgnb25sb2FkJyk7XG5cdGRvbS5yZW1vdmVBdHRyaWJ1dGUoJ29uZXJyb3InKTtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRjb25zdCBldmVudCA9IGRvbS5fX2U7XG5cdGlmIChldmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGRvbS5fX2UgPSB1bmRlZmluZWQ7XG5cdFx0cXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuXHRcdFx0aWYgKGRvbS5pc0Nvbm5lY3RlZCkge1xuXHRcdFx0XHRkb20uZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRfbmFtZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gZG9tXG4gKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJ9IFtoYW5kbGVyXVxuICogQHBhcmFtIHtBZGRFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfZXZlbnQoZXZlbnRfbmFtZSwgZG9tLCBoYW5kbGVyLCBvcHRpb25zID0ge30pIHtcblx0LyoqXG5cdCAqIEB0aGlzIHtFdmVudFRhcmdldH1cblx0ICovXG5cdGZ1bmN0aW9uIHRhcmdldF9oYW5kbGVyKC8qKiBAdHlwZSB7RXZlbnR9ICovIGV2ZW50KSB7XG5cdFx0aWYgKCFvcHRpb25zLmNhcHR1cmUpIHtcblx0XHRcdC8vIE9ubHkgY2FsbCBpbiB0aGUgYnViYmxlIHBoYXNlLCBlbHNlIGRlbGVnYXRlZCBldmVudHMgd291bGQgYmUgY2FsbGVkIGJlZm9yZSB0aGUgY2FwdHVyaW5nIGV2ZW50c1xuXHRcdFx0aGFuZGxlX2V2ZW50X3Byb3BhZ2F0aW9uLmNhbGwoZG9tLCBldmVudCk7XG5cdFx0fVxuXHRcdGlmICghZXZlbnQuY2FuY2VsQnViYmxlKSB7XG5cdFx0XHRyZXR1cm4gd2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0KCgpID0+IHtcblx0XHRcdFx0cmV0dXJuIGhhbmRsZXI/LmNhbGwodGhpcywgZXZlbnQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hyb21lIGhhcyBhIGJ1ZyB3aGVyZSBwb2ludGVyIGV2ZW50cyBkb24ndCB3b3JrIHdoZW4gYXR0YWNoZWQgdG8gYSBET00gZWxlbWVudCB0aGF0IGhhcyBiZWVuIGNsb25lZFxuXHQvLyB3aXRoIGNsb25lTm9kZSgpIGFuZCB0aGUgRE9NIGVsZW1lbnQgaXMgZGlzY29ubmVjdGVkIGZyb20gdGhlIGRvY3VtZW50LiBUbyBlbnN1cmUgdGhlIGV2ZW50IHdvcmtzLCB3ZVxuXHQvLyBkZWZlciB0aGUgYXR0YWNobWVudCB0aWxsIGFmdGVyIGl0J3MgYmVlbiBhcHBlbmRlZCB0byB0aGUgZG9jdW1lbnQuIFRPRE86IHJlbW92ZSB0aGlzIG9uY2UgQ2hyb21lIGZpeGVzXG5cdC8vIHRoaXMgYnVnLiBUaGUgc2FtZSBhcHBsaWVzIHRvIHdoZWVsIGV2ZW50cyBhbmQgdG91Y2ggZXZlbnRzLlxuXHRpZiAoXG5cdFx0ZXZlbnRfbmFtZS5zdGFydHNXaXRoKCdwb2ludGVyJykgfHxcblx0XHRldmVudF9uYW1lLnN0YXJ0c1dpdGgoJ3RvdWNoJykgfHxcblx0XHRldmVudF9uYW1lID09PSAnd2hlZWwnXG5cdCkge1xuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0ZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRfbmFtZSwgdGFyZ2V0X2hhbmRsZXIsIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGRvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIHRhcmdldF9oYW5kbGVyLCBvcHRpb25zKTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXRfaGFuZGxlcjtcbn1cblxuLyoqXG4gKiBBdHRhY2hlcyBhbiBldmVudCBoYW5kbGVyIHRvIGFuIGVsZW1lbnQgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGhhbmRsZXIuIFVzaW5nIHRoaXNcbiAqIHJhdGhlciB0aGFuIGBhZGRFdmVudExpc3RlbmVyYCB3aWxsIHByZXNlcnZlIHRoZSBjb3JyZWN0IG9yZGVyIHJlbGF0aXZlIHRvIGhhbmRsZXJzIGFkZGVkIGRlY2xhcmF0aXZlbHlcbiAqICh3aXRoIGF0dHJpYnV0ZXMgbGlrZSBgb25jbGlja2ApLCB3aGljaCB1c2UgZXZlbnQgZGVsZWdhdGlvbiBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICpcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJ9IGhhbmRsZXJcbiAqIEBwYXJhbSB7QWRkRXZlbnRMaXN0ZW5lck9wdGlvbnN9IFtvcHRpb25zXVxuICovXG5leHBvcnQgZnVuY3Rpb24gb24oZWxlbWVudCwgdHlwZSwgaGFuZGxlciwgb3B0aW9ucyA9IHt9KSB7XG5cdHZhciB0YXJnZXRfaGFuZGxlciA9IGNyZWF0ZV9ldmVudCh0eXBlLCBlbGVtZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCB0YXJnZXRfaGFuZGxlciwgb3B0aW9ucyk7XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50X25hbWVcbiAqIEBwYXJhbSB7RWxlbWVudH0gZG9tXG4gKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJ9IFtoYW5kbGVyXVxuICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZV1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Bhc3NpdmVdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50KGV2ZW50X25hbWUsIGRvbSwgaGFuZGxlciwgY2FwdHVyZSwgcGFzc2l2ZSkge1xuXHR2YXIgb3B0aW9ucyA9IHsgY2FwdHVyZSwgcGFzc2l2ZSB9O1xuXHR2YXIgdGFyZ2V0X2hhbmRsZXIgPSBjcmVhdGVfZXZlbnQoZXZlbnRfbmFtZSwgZG9tLCBoYW5kbGVyLCBvcHRpb25zKTtcblxuXHRpZiAoXG5cdFx0ZG9tID09PSBkb2N1bWVudC5ib2R5IHx8XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGRvbSA9PT0gd2luZG93IHx8XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGRvbSA9PT0gZG9jdW1lbnQgfHxcblx0XHQvLyBGaXJlZm94IGhhcyBxdWlya3kgYmVoYXZpb3IsIGl0IGNhbiBoYXBwZW4gdGhhdCB3ZSBzdGlsbCBnZXQgXCJjYW5wbGF5XCIgZXZlbnRzIHdoZW4gdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSByZW1vdmVkXG5cdFx0ZG9tIGluc3RhbmNlb2YgSFRNTE1lZGlhRWxlbWVudFxuXHQpIHtcblx0XHR0ZWFyZG93bigoKSA9PiB7XG5cdFx0XHRkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudF9uYW1lLCB0YXJnZXRfaGFuZGxlciwgb3B0aW9ucyk7XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRfbmFtZVxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJ9IFtoYW5kbGVyXVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxlZ2F0ZWQoZXZlbnRfbmFtZSwgZWxlbWVudCwgaGFuZGxlcikge1xuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdChlbGVtZW50W2V2ZW50X3N5bWJvbF0gPz89IHt9KVtldmVudF9uYW1lXSA9IGhhbmRsZXI7XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBldmVudHNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZWdhdGUoZXZlbnRzKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YWxsX3JlZ2lzdGVyZWRfZXZlbnRzLmFkZChldmVudHNbaV0pO1xuXHR9XG5cblx0Zm9yICh2YXIgZm4gb2Ygcm9vdF9ldmVudF9oYW5kbGVzKSB7XG5cdFx0Zm4oZXZlbnRzKTtcblx0fVxufVxuXG4vLyB1c2VkIHRvIHN0b3JlIHRoZSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseSBwcm9wYWdhdGVkIGV2ZW50XG4vLyB0byBwcmV2ZW50IGdhcmJhZ2UgY29sbGVjdGlvbiBiZXR3ZWVuIG1pY3JvdGFza3MgaW4gRmlyZWZveFxuLy8gSWYgdGhlIGV2ZW50IG9iamVjdCBpcyBHQ2VkIHRvbyBlYXJseSwgdGhlIGV4cGFuZG8gX19yb290IHByb3BlcnR5XG4vLyBzZXQgb24gdGhlIGV2ZW50IG9iamVjdCBpcyBsb3N0LCBjYXVzaW5nIHRoZSBldmVudCBkZWxlZ2F0aW9uXG4vLyB0byBwcm9jZXNzIHRoZSBldmVudCB0d2ljZVxubGV0IGxhc3RfcHJvcGFnYXRlZF9ldmVudCA9IG51bGw7XG5cbi8qKlxuICogQHRoaXMge0V2ZW50VGFyZ2V0fVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlX2V2ZW50X3Byb3BhZ2F0aW9uKGV2ZW50KSB7XG5cdHZhciBoYW5kbGVyX2VsZW1lbnQgPSB0aGlzO1xuXHR2YXIgb3duZXJfZG9jdW1lbnQgPSAvKiogQHR5cGUge05vZGV9ICovIChoYW5kbGVyX2VsZW1lbnQpLm93bmVyRG9jdW1lbnQ7XG5cdHZhciBldmVudF9uYW1lID0gZXZlbnQudHlwZTtcblx0dmFyIHBhdGggPSBldmVudC5jb21wb3NlZFBhdGg/LigpIHx8IFtdO1xuXHR2YXIgY3VycmVudF90YXJnZXQgPSAvKiogQHR5cGUge251bGwgfCBFbGVtZW50fSAqLyAocGF0aFswXSB8fCBldmVudC50YXJnZXQpO1xuXG5cdGxhc3RfcHJvcGFnYXRlZF9ldmVudCA9IGV2ZW50O1xuXG5cdC8vIGNvbXBvc2VkUGF0aCBjb250YWlucyBsaXN0IG9mIG5vZGVzIHRoZSBldmVudCBoYXMgcHJvcGFnYXRlZCB0aHJvdWdoLlxuXHQvLyBXZSBjaGVjayBgZXZlbnRfc3ltYm9sYCB0byBza2lwIGFsbCBub2RlcyBiZWxvdyBpdCBpbiBjYXNlIHRoaXMgaXMgYVxuXHQvLyBwYXJlbnQgb2YgdGhlIGBldmVudF9zeW1ib2xgIG5vZGUsIHdoaWNoIGluZGljYXRlcyB0aGF0IHRoZXJlJ3MgbmVzdGVkXG5cdC8vIG1vdW50ZWQgYXBwcy4gSW4gdGhpcyBjYXNlIHdlIGRvbid0IHdhbnQgdG8gdHJpZ2dlciBldmVudHMgbXVsdGlwbGUgdGltZXMuXG5cdHZhciBwYXRoX2lkeCA9IDA7XG5cblx0Ly8gdGhlIGBsYXN0X3Byb3BhZ2F0ZWRfZXZlbnQgPT09IGV2ZW50YCBjaGVjayBpcyByZWR1bmRhbnQsIGJ1dFxuXHQvLyB3aXRob3V0IGl0IHRoZSB2YXJpYWJsZSB3aWxsIGJlIERDRSdkIGFuZCB0aGluZ3Mgd2lsbFxuXHQvLyBmYWlsIG15c3RlcmlvdXNseSBpbiBGaXJlZm94XG5cdC8vIEB0cy1leHBlY3QtZXJyb3IgaXMgYWRkZWQgYmVsb3dcblx0dmFyIGhhbmRsZWRfYXQgPSBsYXN0X3Byb3BhZ2F0ZWRfZXZlbnQgPT09IGV2ZW50ICYmIGV2ZW50W2V2ZW50X3N5bWJvbF07XG5cblx0aWYgKGhhbmRsZWRfYXQpIHtcblx0XHR2YXIgYXRfaWR4ID0gcGF0aC5pbmRleE9mKGhhbmRsZWRfYXQpO1xuXHRcdGlmIChcblx0XHRcdGF0X2lkeCAhPT0gLTEgJiZcblx0XHRcdChoYW5kbGVyX2VsZW1lbnQgPT09IGRvY3VtZW50IHx8IGhhbmRsZXJfZWxlbWVudCA9PT0gLyoqIEB0eXBlIHthbnl9ICovICh3aW5kb3cpKVxuXHRcdCkge1xuXHRcdFx0Ly8gVGhpcyBpcyB0aGUgZmFsbGJhY2sgZG9jdW1lbnQgbGlzdGVuZXIgb3IgYSB3aW5kb3cgbGlzdGVuZXIsIGJ1dCB0aGUgZXZlbnQgd2FzIGFscmVhZHkgaGFuZGxlZFxuXHRcdFx0Ly8gLT4gaWdub3JlLCBidXQgc2V0IGhhbmRsZV9hdCB0byBkb2N1bWVudC93aW5kb3cgc28gdGhhdCB3ZSdyZSByZXNldHRpbmcgdGhlIGV2ZW50XG5cdFx0XHQvLyBjaGFpbiBpbiBjYXNlIHNvbWVvbmUgbWFudWFsbHkgZGlzcGF0Y2hlcyB0aGUgc2FtZSBldmVudCBvYmplY3QgYWdhaW4uXG5cdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRldmVudFtldmVudF9zeW1ib2xdID0gaGFuZGxlcl9lbGVtZW50O1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdlJ3JlIGRlbGliZXJhdGVseSBub3Qgc2tpcHBpbmcgaWYgdGhlIGluZGV4IGlzIGhpZ2hlciwgYmVjYXVzZVxuXHRcdC8vIHNvbWVvbmUgY291bGQgY3JlYXRlIGFuIGV2ZW50IHByb2dyYW1tYXRpY2FsbHkgYW5kIGVtaXQgaXQgbXVsdGlwbGUgdGltZXMsXG5cdFx0Ly8gaW4gd2hpY2ggY2FzZSB3ZSB3YW50IHRvIGhhbmRsZSB0aGUgd2hvbGUgcHJvcGFnYXRpb24gY2hhaW4gcHJvcGVybHkgZWFjaCB0aW1lLlxuXHRcdC8vICh0aGlzIHdpbGwgb25seSBiZSBhIGZhbHNlIG5lZ2F0aXZlIGlmIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkIG11bHRpcGxlIHRpbWVzIGFuZFxuXHRcdC8vIHRoZSBmYWxsYmFjayBkb2N1bWVudCBsaXN0ZW5lciBpc24ndCByZWFjaGVkIGluIGJldHdlZW4sIGJ1dCB0aGF0J3Mgc3VwZXIgcmFyZSlcblx0XHR2YXIgaGFuZGxlcl9pZHggPSBwYXRoLmluZGV4T2YoaGFuZGxlcl9lbGVtZW50KTtcblx0XHRpZiAoaGFuZGxlcl9pZHggPT09IC0xKSB7XG5cdFx0XHQvLyBoYW5kbGVfaWR4IGNhbiB0aGVvcmV0aWNhbGx5IGJlIC0xIChoYXBwZW5lZCBpbiBzb21lIEpTRE9NIHRlc3Rpbmcgc2NlbmFyaW9zIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHdpbmRvdyBvYmplY3QpXG5cdFx0XHQvLyBzbyBndWFyZCBhZ2FpbnN0IHRoYXQsIHRvbywgYW5kIGFzc3VtZSB0aGF0IGV2ZXJ5dGhpbmcgd2FzIGhhbmRsZWQgYXQgdGhpcyBwb2ludC5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoYXRfaWR4IDw9IGhhbmRsZXJfaWR4KSB7XG5cdFx0XHRwYXRoX2lkeCA9IGF0X2lkeDtcblx0XHR9XG5cdH1cblxuXHRjdXJyZW50X3RhcmdldCA9IC8qKiBAdHlwZSB7RWxlbWVudH0gKi8gKHBhdGhbcGF0aF9pZHhdIHx8IGV2ZW50LnRhcmdldCk7XG5cdC8vIHRoZXJlIGNhbiBvbmx5IGJlIG9uZSBkZWxlZ2F0ZWQgZXZlbnQgcGVyIGVsZW1lbnQsIGFuZCB3ZSBlaXRoZXIgYWxyZWFkeSBoYW5kbGVkIHRoZSBjdXJyZW50IHRhcmdldCxcblx0Ly8gb3IgdGhpcyBpcyB0aGUgdmVyeSBmaXJzdCB0YXJnZXQgaW4gdGhlIGNoYWluIHdoaWNoIGhhcyBhIG5vbi1kZWxlZ2F0ZWQgbGlzdGVuZXIsIGluIHdoaWNoIGNhc2UgaXQncyBzYWZlXG5cdC8vIHRvIGhhbmRsZSBhIHBvc3NpYmxlIGRlbGVnYXRlZCBldmVudCBvbiBpdCBsYXRlciAodGhyb3VnaCB0aGUgcm9vdCBkZWxlZ2F0aW9uIGxpc3RlbmVyIGZvciBleGFtcGxlKS5cblx0aWYgKGN1cnJlbnRfdGFyZ2V0ID09PSBoYW5kbGVyX2VsZW1lbnQpIHJldHVybjtcblxuXHQvLyBQcm94eSBjdXJyZW50VGFyZ2V0IHRvIGNvcnJlY3QgdGFyZ2V0XG5cdGRlZmluZV9wcm9wZXJ0eShldmVudCwgJ2N1cnJlbnRUYXJnZXQnLCB7XG5cdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBjdXJyZW50X3RhcmdldCB8fCBvd25lcl9kb2N1bWVudDtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFRoaXMgc3RhcnRlZCBiZWNhdXNlIG9mIENocm9taXVtIGlzc3VlIGh0dHBzOi8vY2hyb21lc3RhdHVzLmNvbS9mZWF0dXJlLzUxMjg2OTY4MjM1NDU4NTYsXG5cdC8vIHdoZXJlIHJlbW92YWwgb3IgbW92aW5nIG9mIG9mIHRoZSBET00gY2FuIGNhdXNlIHN5bmMgYGJsdXJgIGV2ZW50cyB0byBmaXJlLCB3aGljaCBjYW4gY2F1c2UgbG9naWNcblx0Ly8gdG8gcnVuIGluc2lkZSB0aGUgY3VycmVudCBgYWN0aXZlX3JlYWN0aW9uYCwgd2hpY2ggaXNuJ3Qgd2hhdCB3ZSB3YW50IGF0IGFsbC4gSG93ZXZlciwgb24gcmVmbGVjdGlvbixcblx0Ly8gaXQncyBwcm9iYWJseSBiZXN0IHRoYXQgYWxsIGV2ZW50IGhhbmRsZWQgYnkgU3ZlbHRlIGhhdmUgdGhpcyBiZWhhdmlvdXIsIGFzIHdlIGRvbid0IHJlYWxseSB3YW50XG5cdC8vIGFuIGV2ZW50IGhhbmRsZXIgdG8gcnVuIGluIHRoZSBjb250ZXh0IG9mIGFub3RoZXIgcmVhY3Rpb24gb3IgZWZmZWN0LlxuXHR2YXIgcHJldmlvdXNfcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXHRzZXRfYWN0aXZlX3JlYWN0aW9uKG51bGwpO1xuXHRzZXRfYWN0aXZlX2VmZmVjdChudWxsKTtcblxuXHR0cnkge1xuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHt1bmtub3dufVxuXHRcdCAqL1xuXHRcdHZhciB0aHJvd19lcnJvcjtcblx0XHQvKipcblx0XHQgKiBAdHlwZSB7dW5rbm93bltdfVxuXHRcdCAqL1xuXHRcdHZhciBvdGhlcl9lcnJvcnMgPSBbXTtcblxuXHRcdHdoaWxlIChjdXJyZW50X3RhcmdldCAhPT0gbnVsbCkge1xuXHRcdFx0LyoqIEB0eXBlIHtudWxsIHwgRWxlbWVudH0gKi9cblx0XHRcdHZhciBwYXJlbnRfZWxlbWVudCA9XG5cdFx0XHRcdGN1cnJlbnRfdGFyZ2V0LmFzc2lnbmVkU2xvdCB8fFxuXHRcdFx0XHRjdXJyZW50X3RhcmdldC5wYXJlbnROb2RlIHx8XG5cdFx0XHRcdC8qKiBAdHlwZSB7YW55fSAqLyAoY3VycmVudF90YXJnZXQpLmhvc3QgfHxcblx0XHRcdFx0bnVsbDtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0XHR2YXIgZGVsZWdhdGVkID0gY3VycmVudF90YXJnZXRbZXZlbnRfc3ltYm9sXT8uW2V2ZW50X25hbWVdO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRkZWxlZ2F0ZWQgIT0gbnVsbCAmJlxuXHRcdFx0XHRcdCghKC8qKiBAdHlwZSB7YW55fSAqLyAoY3VycmVudF90YXJnZXQpLmRpc2FibGVkKSB8fFxuXHRcdFx0XHRcdFx0Ly8gRE9NIGNvdWxkJ3ZlIGJlZW4gdXBkYXRlZCBhbHJlYWR5IGJ5IHRoZSB0aW1lIHRoaXMgaXMgcmVhY2hlZCwgc28gd2UgY2hlY2sgdGhpcyBhcyB3ZWxsXG5cdFx0XHRcdFx0XHQvLyAtPiB0aGUgdGFyZ2V0IGNvdWxkIG5vdCBoYXZlIGJlZW4gZGlzYWJsZWQgYmVjYXVzZSBpdCBlbWl0cyB0aGUgZXZlbnQgaW4gdGhlIGZpcnN0IHBsYWNlXG5cdFx0XHRcdFx0XHRldmVudC50YXJnZXQgPT09IGN1cnJlbnRfdGFyZ2V0KVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRkZWxlZ2F0ZWQuY2FsbChjdXJyZW50X3RhcmdldCwgZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRpZiAodGhyb3dfZXJyb3IpIHtcblx0XHRcdFx0XHRvdGhlcl9lcnJvcnMucHVzaChlcnJvcik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3dfZXJyb3IgPSBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGV2ZW50LmNhbmNlbEJ1YmJsZSB8fCBwYXJlbnRfZWxlbWVudCA9PT0gaGFuZGxlcl9lbGVtZW50IHx8IHBhcmVudF9lbGVtZW50ID09PSBudWxsKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y3VycmVudF90YXJnZXQgPSBwYXJlbnRfZWxlbWVudDtcblx0XHR9XG5cblx0XHRpZiAodGhyb3dfZXJyb3IpIHtcblx0XHRcdGZvciAobGV0IGVycm9yIG9mIG90aGVyX2Vycm9ycykge1xuXHRcdFx0XHQvLyBUaHJvdyB0aGUgcmVzdCBvZiB0aGUgZXJyb3JzLCBvbmUtYnktb25lIG9uIGEgbWljcm90YXNrXG5cdFx0XHRcdHF1ZXVlTWljcm90YXNrKCgpID0+IHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyB0aHJvd19lcnJvcjtcblx0XHR9XG5cdH0gZmluYWxseSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBpcyB1c2VkIGFib3ZlXG5cdFx0ZXZlbnRbZXZlbnRfc3ltYm9sXSA9IGhhbmRsZXJfZWxlbWVudDtcblx0XHQvLyBAdHMtaWdub3JlIHJlbW92ZSBwcm94eSBvbiBjdXJyZW50VGFyZ2V0XG5cdFx0ZGVsZXRlIGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihwcmV2aW91c19yZWFjdGlvbik7XG5cdFx0c2V0X2FjdGl2ZV9lZmZlY3QocHJldmlvdXNfZWZmZWN0KTtcblx0fVxufVxuXG4vKipcbiAqIEluIGRldiwgd2FybiBpZiBhbiBldmVudCBoYW5kbGVyIGlzIG5vdCBhIGZ1bmN0aW9uLCBhcyBpdCBtZWFucyB0aGVcbiAqIHVzZXIgcHJvYmFibHkgY2FsbGVkIHRoZSBoYW5kbGVyIG9yIGZvcmdvdCB0byBhZGQgYSBgKCkgPT5gXG4gKiBAcGFyYW0geygpID0+IChldmVudDogRXZlbnQsIC4uLmFyZ3M6IGFueSkgPT4gdm9pZH0gdGh1bmtcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7W0V2ZW50LCAuLi5hbnldfSBhcmdzXG4gKiBAcGFyYW0ge2FueX0gY29tcG9uZW50XG4gKiBAcGFyYW0ge1tudW1iZXIsIG51bWJlcl19IFtsb2NdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZW1vdmVfcGFyZW5zXVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoXG5cdHRodW5rLFxuXHRlbGVtZW50LFxuXHRhcmdzLFxuXHRjb21wb25lbnQsXG5cdGxvYyxcblx0aGFzX3NpZGVfZWZmZWN0cyA9IGZhbHNlLFxuXHRyZW1vdmVfcGFyZW5zID0gZmFsc2Vcbikge1xuXHRsZXQgaGFuZGxlcjtcblx0bGV0IGVycm9yO1xuXG5cdHRyeSB7XG5cdFx0aGFuZGxlciA9IHRodW5rKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRlcnJvciA9IGU7XG5cdH1cblxuXHRpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicgJiYgKGhhc19zaWRlX2VmZmVjdHMgfHwgaGFuZGxlciAhPSBudWxsIHx8IGVycm9yKSkge1xuXHRcdGNvbnN0IGZpbGVuYW1lID0gY29tcG9uZW50Py5bRklMRU5BTUVdO1xuXHRcdGNvbnN0IGxvY2F0aW9uID0gbG9jID8gYCBhdCAke2ZpbGVuYW1lfToke2xvY1swXX06JHtsb2NbMV19YCA6IGAgaW4gJHtmaWxlbmFtZX1gO1xuXHRcdGNvbnN0IHBoYXNlID0gYXJnc1swXT8uZXZlbnRQaGFzZSA8IEV2ZW50LkJVQkJMSU5HX1BIQVNFID8gJ2NhcHR1cmUnIDogJyc7XG5cdFx0Y29uc3QgZXZlbnRfbmFtZSA9IGFyZ3NbMF0/LnR5cGUgKyBwaGFzZTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGBcXGAke2V2ZW50X25hbWV9XFxgIGhhbmRsZXIke2xvY2F0aW9ufWA7XG5cdFx0Y29uc3Qgc3VnZ2VzdGlvbiA9IHJlbW92ZV9wYXJlbnMgPyAncmVtb3ZlIHRoZSB0cmFpbGluZyBgKClgJyA6ICdhZGQgYSBsZWFkaW5nIGAoKSA9PmAnO1xuXG5cdFx0dy5ldmVudF9oYW5kbGVyX2ludmFsaWQoZGVzY3JpcHRpb24sIHN1Z2dlc3Rpb24pO1xuXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdH1cblx0aGFuZGxlcj8uYXBwbHkoZWxlbWVudCwgYXJncyk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVfZWxlbWVudCB9IGZyb20gJy4vb3BlcmF0aW9ucy5qcyc7XG5cbmNvbnN0IHBvbGljeSA9XG5cdC8vIFdlIGdvdHRhIHdyaXRlIGl0IGxpa2UgdGhpcyBiZWNhdXNlIGFmdGVyIGRvd25sZXZlbGluZyB0aGUgcHVyZSBjb21tZW50IG1heSBlbmQgdXAgaW4gdGhlIHdyb25nIGxvY2F0aW9uXG5cdGdsb2JhbFRoaXM/LndpbmRvdz8udHJ1c3RlZFR5cGVzICYmXG5cdC8qIEBfX1BVUkVfXyAqLyBnbG9iYWxUaGlzLndpbmRvdy50cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KCdzdmVsdGUtdHJ1c3RlZC1odG1sJywge1xuXHRcdC8qKiBAcGFyYW0ge3N0cmluZ30gaHRtbCAqL1xuXHRcdGNyZWF0ZUhUTUw6IChodG1sKSA9PiB7XG5cdFx0XHRyZXR1cm4gaHRtbDtcblx0XHR9XG5cdH0pO1xuXG4vKiogQHBhcmFtIHtzdHJpbmd9IGh0bWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfdHJ1c3RlZF9odG1sKGh0bWwpIHtcblx0cmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocG9saWN5Py5jcmVhdGVIVE1MKGh0bWwpID8/IGh0bWwpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfZnJhZ21lbnRfZnJvbV9odG1sKGh0bWwpIHtcblx0dmFyIGVsZW0gPSBjcmVhdGVfZWxlbWVudCgndGVtcGxhdGUnKTtcblx0ZWxlbS5pbm5lckhUTUwgPSBjcmVhdGVfdHJ1c3RlZF9odG1sKGh0bWwucmVwbGFjZUFsbCgnPCE+JywgJzwhLS0tLT4nKSk7IC8vIFhIVE1MIGNvbXBsaWFuY2Vcblx0cmV0dXJuIGVsZW0uY29udGVudDtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0LCBFZmZlY3ROb2RlcywgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgVGVtcGxhdGVTdHJ1Y3R1cmUgfSBmcm9tICcuL3R5cGVzJyAqL1xuaW1wb3J0IHsgaHlkcmF0ZV9uZXh0LCBoeWRyYXRlX25vZGUsIGh5ZHJhdGluZywgc2V0X2h5ZHJhdGVfbm9kZSB9IGZyb20gJy4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7XG5cdGNyZWF0ZV90ZXh0LFxuXHRnZXRfZmlyc3RfY2hpbGQsXG5cdGdldF9uZXh0X3NpYmxpbmcsXG5cdGlzX2ZpcmVmb3gsXG5cdGNyZWF0ZV9lbGVtZW50LFxuXHRjcmVhdGVfZnJhZ21lbnQsXG5cdGNyZWF0ZV9jb21tZW50LFxuXHRzZXRfYXR0cmlidXRlLFxuXHRtZXJnZV90ZXh0X25vZGVzXG59IGZyb20gJy4vb3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfZnJhZ21lbnRfZnJvbV9odG1sIH0gZnJvbSAnLi9yZWNvbmNpbGVyLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9lZmZlY3QgfSBmcm9tICcuLi9ydW50aW1lLmpzJztcbmltcG9ydCB7XG5cdE5BTUVTUEFDRV9NQVRITUwsXG5cdE5BTUVTUEFDRV9TVkcsXG5cdFRFTVBMQVRFX0ZSQUdNRU5ULFxuXHRURU1QTEFURV9VU0VfSU1QT1JUX05PREUsXG5cdFRFTVBMQVRFX1VTRV9NQVRITUwsXG5cdFRFTVBMQVRFX1VTRV9TVkdcbn0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7XG5cdENPTU1FTlRfTk9ERSxcblx0RE9DVU1FTlRfRlJBR01FTlRfTk9ERSxcblx0SVNfWEhUTUwsXG5cdFJFQUNUSU9OX1JBTixcblx0VEVYVF9OT0RFXG59IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcblxuY29uc3QgVEVNUExBVEVfVEFHID0gSVNfWEhUTUwgPyAndGVtcGxhdGUnIDogJ1RFTVBMQVRFJztcbmNvbnN0IFNDUklQVF9UQUcgPSBJU19YSFRNTCA/ICdzY3JpcHQnIDogJ1NDUklQVCc7XG5cbi8qKlxuICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IHN0YXJ0XG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZSB8IG51bGx9IGVuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduX25vZGVzKHN0YXJ0LCBlbmQpIHtcblx0dmFyIGVmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cdGlmIChlZmZlY3Qubm9kZXMgPT09IG51bGwpIHtcblx0XHRlZmZlY3Qubm9kZXMgPSB7IHN0YXJ0LCBlbmQsIGE6IG51bGwsIHQ6IG51bGwgfTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEByZXR1cm5zIHsoKSA9PiBOb2RlIHwgTm9kZVtdfVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tX2h0bWwoY29udGVudCwgZmxhZ3MpIHtcblx0dmFyIGlzX2ZyYWdtZW50ID0gKGZsYWdzICYgVEVNUExBVEVfRlJBR01FTlQpICE9PSAwO1xuXHR2YXIgdXNlX2ltcG9ydF9ub2RlID0gKGZsYWdzICYgVEVNUExBVEVfVVNFX0lNUE9SVF9OT0RFKSAhPT0gMDtcblxuXHQvKiogQHR5cGUge05vZGV9ICovXG5cdHZhciBub2RlO1xuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZmlyc3QgaXRlbSBpcyBhIHRleHQvZWxlbWVudCBub2RlLiBJZiBub3QsIHdlIG5lZWQgdG9cblx0ICogY3JlYXRlIGFuIGFkZGl0aW9uYWwgY29tbWVudCBub2RlIHRvIGFjdCBhcyBgZWZmZWN0Lm5vZGVzLnN0YXJ0YFxuXHQgKi9cblx0dmFyIGhhc19zdGFydCA9ICFjb250ZW50LnN0YXJ0c1dpdGgoJzwhPicpO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0YXNzaWduX25vZGVzKGh5ZHJhdGVfbm9kZSwgbnVsbCk7XG5cdFx0XHRyZXR1cm4gaHlkcmF0ZV9ub2RlO1xuXHRcdH1cblxuXHRcdGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdG5vZGUgPSBjcmVhdGVfZnJhZ21lbnRfZnJvbV9odG1sKGhhc19zdGFydCA/IGNvbnRlbnQgOiAnPCE+JyArIGNvbnRlbnQpO1xuXHRcdFx0aWYgKCFpc19mcmFnbWVudCkgbm9kZSA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKG5vZGUpKTtcblx0XHR9XG5cblx0XHR2YXIgY2xvbmUgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKFxuXHRcdFx0dXNlX2ltcG9ydF9ub2RlIHx8IGlzX2ZpcmVmb3ggPyBkb2N1bWVudC5pbXBvcnROb2RlKG5vZGUsIHRydWUpIDogbm9kZS5jbG9uZU5vZGUodHJ1ZSlcblx0XHQpO1xuXG5cdFx0aWYgKGlzX2ZyYWdtZW50KSB7XG5cdFx0XHR2YXIgc3RhcnQgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9maXJzdF9jaGlsZChjbG9uZSkpO1xuXHRcdFx0dmFyIGVuZCA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoY2xvbmUubGFzdENoaWxkKTtcblxuXHRcdFx0YXNzaWduX25vZGVzKHN0YXJ0LCBlbmQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhc3NpZ25fbm9kZXMoY2xvbmUsIGNsb25lKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICogQHBhcmFtIHsnc3ZnJyB8ICdtYXRoJ30gbnNcbiAqIEByZXR1cm5zIHsoKSA9PiBOb2RlIHwgTm9kZVtdfVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmZ1bmN0aW9uIGZyb21fbmFtZXNwYWNlKGNvbnRlbnQsIGZsYWdzLCBucyA9ICdzdmcnKSB7XG5cdC8qKlxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZmlyc3QgaXRlbSBpcyBhIHRleHQvZWxlbWVudCBub2RlLiBJZiBub3QsIHdlIG5lZWQgdG9cblx0ICogY3JlYXRlIGFuIGFkZGl0aW9uYWwgY29tbWVudCBub2RlIHRvIGFjdCBhcyBgZWZmZWN0Lm5vZGVzLnN0YXJ0YFxuXHQgKi9cblx0dmFyIGhhc19zdGFydCA9ICFjb250ZW50LnN0YXJ0c1dpdGgoJzwhPicpO1xuXG5cdHZhciBpc19mcmFnbWVudCA9IChmbGFncyAmIFRFTVBMQVRFX0ZSQUdNRU5UKSAhPT0gMDtcblx0dmFyIHdyYXBwZWQgPSBgPCR7bnN9PiR7aGFzX3N0YXJ0ID8gY29udGVudCA6ICc8IT4nICsgY29udGVudH08LyR7bnN9PmA7XG5cblx0LyoqIEB0eXBlIHtFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudH0gKi9cblx0dmFyIG5vZGU7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRhc3NpZ25fbm9kZXMoaHlkcmF0ZV9ub2RlLCBudWxsKTtcblx0XHRcdHJldHVybiBoeWRyYXRlX25vZGU7XG5cdFx0fVxuXG5cdFx0aWYgKCFub2RlKSB7XG5cdFx0XHR2YXIgZnJhZ21lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50RnJhZ21lbnR9ICovIChjcmVhdGVfZnJhZ21lbnRfZnJvbV9odG1sKHdyYXBwZWQpKTtcblx0XHRcdHZhciByb290ID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKGZyYWdtZW50KSk7XG5cblx0XHRcdGlmIChpc19mcmFnbWVudCkge1xuXHRcdFx0XHRub2RlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHR3aGlsZSAoZ2V0X2ZpcnN0X2NoaWxkKHJvb3QpKSB7XG5cdFx0XHRcdFx0bm9kZS5hcHBlbmRDaGlsZCgvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9maXJzdF9jaGlsZChyb290KSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRub2RlID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKHJvb3QpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgY2xvbmUgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKG5vZGUuY2xvbmVOb2RlKHRydWUpKTtcblxuXHRcdGlmIChpc19mcmFnbWVudCkge1xuXHRcdFx0dmFyIHN0YXJ0ID0gLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChnZXRfZmlyc3RfY2hpbGQoY2xvbmUpKTtcblx0XHRcdHZhciBlbmQgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGNsb25lLmxhc3RDaGlsZCk7XG5cblx0XHRcdGFzc2lnbl9ub2RlcyhzdGFydCwgZW5kKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXNzaWduX25vZGVzKGNsb25lLCBjbG9uZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gZnJvbV9zdmcoY29udGVudCwgZmxhZ3MpIHtcblx0cmV0dXJuIGZyb21fbmFtZXNwYWNlKGNvbnRlbnQsIGZsYWdzLCAnc3ZnJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tX21hdGhtbChjb250ZW50LCBmbGFncykge1xuXHRyZXR1cm4gZnJvbV9uYW1lc3BhY2UoY29udGVudCwgZmxhZ3MsICdtYXRoJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtUZW1wbGF0ZVN0cnVjdHVyZVtdfSBzdHJ1Y3R1cmVcbiAqIEBwYXJhbSB7dHlwZW9mIE5BTUVTUEFDRV9TVkcgfCB0eXBlb2YgTkFNRVNQQUNFX01BVEhNTCB8IHVuZGVmaW5lZH0gW25zXVxuICovXG5mdW5jdGlvbiBmcmFnbWVudF9mcm9tX3RyZWUoc3RydWN0dXJlLCBucykge1xuXHR2YXIgZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQoKTtcblxuXHRmb3IgKHZhciBpdGVtIG9mIHN0cnVjdHVyZSkge1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGZyYWdtZW50LmFwcGVuZChjcmVhdGVfdGV4dChpdGVtKSk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHQvLyBpZiBgcHJlc2VydmVDb21tZW50cyA9PT0gdHJ1ZWAsIGNvbW1lbnRzIGFyZSByZXByZXNlbnRlZCBhcyBgWycvLyA8ZGF0YT4nXWBcblx0XHRpZiAoaXRlbSA9PT0gdW5kZWZpbmVkIHx8IGl0ZW1bMF1bMF0gPT09ICcvJykge1xuXHRcdFx0ZnJhZ21lbnQuYXBwZW5kKGNyZWF0ZV9jb21tZW50KGl0ZW0gPyBpdGVtWzBdLnNsaWNlKDMpIDogJycpKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtuYW1lLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbl0gPSBpdGVtO1xuXG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZSA9PT0gJ3N2ZycgPyBOQU1FU1BBQ0VfU1ZHIDogbmFtZSA9PT0gJ21hdGgnID8gTkFNRVNQQUNFX01BVEhNTCA6IG5zO1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBjcmVhdGVfZWxlbWVudChuYW1lLCBuYW1lc3BhY2UsIGF0dHJpYnV0ZXM/LmlzKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRzZXRfYXR0cmlidXRlKGVsZW1lbnQsIGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHR9XG5cblx0XHRpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHRhcmdldCA9XG5cdFx0XHRcdGVsZW1lbnQubm9kZU5hbWUgPT09IFRFTVBMQVRFX1RBR1xuXHRcdFx0XHRcdD8gLyoqIEB0eXBlIHtIVE1MVGVtcGxhdGVFbGVtZW50fSAqLyAoZWxlbWVudCkuY29udGVudFxuXHRcdFx0XHRcdDogZWxlbWVudDtcblxuXHRcdFx0dGFyZ2V0LmFwcGVuZChcblx0XHRcdFx0ZnJhZ21lbnRfZnJvbV90cmVlKGNoaWxkcmVuLCBlbGVtZW50Lm5vZGVOYW1lID09PSAnZm9yZWlnbk9iamVjdCcgPyB1bmRlZmluZWQgOiBuYW1lc3BhY2UpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGZyYWdtZW50LmFwcGVuZChlbGVtZW50KTtcblx0fVxuXG5cdHJldHVybiBmcmFnbWVudDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RlbXBsYXRlU3RydWN0dXJlW119IHN0cnVjdHVyZVxuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKiBAcmV0dXJucyB7KCkgPT4gTm9kZSB8IE5vZGVbXX1cbiAqL1xuLyojX19OT19TSURFX0VGRkVDVFNfXyovXG5leHBvcnQgZnVuY3Rpb24gZnJvbV90cmVlKHN0cnVjdHVyZSwgZmxhZ3MpIHtcblx0dmFyIGlzX2ZyYWdtZW50ID0gKGZsYWdzICYgVEVNUExBVEVfRlJBR01FTlQpICE9PSAwO1xuXHR2YXIgdXNlX2ltcG9ydF9ub2RlID0gKGZsYWdzICYgVEVNUExBVEVfVVNFX0lNUE9SVF9OT0RFKSAhPT0gMDtcblxuXHQvKiogQHR5cGUge05vZGV9ICovXG5cdHZhciBub2RlO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0YXNzaWduX25vZGVzKGh5ZHJhdGVfbm9kZSwgbnVsbCk7XG5cdFx0XHRyZXR1cm4gaHlkcmF0ZV9ub2RlO1xuXHRcdH1cblxuXHRcdGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvbnN0IG5zID1cblx0XHRcdFx0KGZsYWdzICYgVEVNUExBVEVfVVNFX1NWRykgIT09IDBcblx0XHRcdFx0XHQ/IE5BTUVTUEFDRV9TVkdcblx0XHRcdFx0XHQ6IChmbGFncyAmIFRFTVBMQVRFX1VTRV9NQVRITUwpICE9PSAwXG5cdFx0XHRcdFx0XHQ/IE5BTUVTUEFDRV9NQVRITUxcblx0XHRcdFx0XHRcdDogdW5kZWZpbmVkO1xuXG5cdFx0XHRub2RlID0gZnJhZ21lbnRfZnJvbV90cmVlKHN0cnVjdHVyZSwgbnMpO1xuXHRcdFx0aWYgKCFpc19mcmFnbWVudCkgbm9kZSA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKG5vZGUpKTtcblx0XHR9XG5cblx0XHR2YXIgY2xvbmUgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKFxuXHRcdFx0dXNlX2ltcG9ydF9ub2RlIHx8IGlzX2ZpcmVmb3ggPyBkb2N1bWVudC5pbXBvcnROb2RlKG5vZGUsIHRydWUpIDogbm9kZS5jbG9uZU5vZGUodHJ1ZSlcblx0XHQpO1xuXG5cdFx0aWYgKGlzX2ZyYWdtZW50KSB7XG5cdFx0XHR2YXIgc3RhcnQgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9maXJzdF9jaGlsZChjbG9uZSkpO1xuXHRcdFx0dmFyIGVuZCA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoY2xvbmUubGFzdENoaWxkKTtcblxuXHRcdFx0YXNzaWduX25vZGVzKHN0YXJ0LCBlbmQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhc3NpZ25fbm9kZXMoY2xvbmUsIGNsb25lKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiBFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudH0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhfc2NyaXB0KGZuKSB7XG5cdHJldHVybiAoKSA9PiBydW5fc2NyaXB0cyhmbigpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGluZyBhIGRvY3VtZW50IGZyYWdtZW50IGZyb20gSFRNTCB0aGF0IGNvbnRhaW5zIHNjcmlwdCB0YWdzIHdpbGwgbm90IGV4ZWN1dGVcbiAqIHRoZSBzY3JpcHRzLiBXZSBuZWVkIHRvIHJlcGxhY2UgdGhlIHNjcmlwdCB0YWdzIHdpdGggbmV3IG9uZXMgc28gdGhhdCB0aGV5IGFyZSBleGVjdXRlZC5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnR9IG5vZGVcbiAqIEByZXR1cm5zIHtOb2RlIHwgTm9kZVtdfVxuICovXG5mdW5jdGlvbiBydW5fc2NyaXB0cyhub2RlKSB7XG5cdC8vIHNjcmlwdHMgd2VyZSBTU1InZCwgaW4gd2hpY2ggY2FzZSB0aGV5IHdpbGwgcnVuXG5cdGlmIChoeWRyYXRpbmcpIHJldHVybiBub2RlO1xuXG5cdGNvbnN0IGlzX2ZyYWdtZW50ID0gbm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERTtcblx0Y29uc3Qgc2NyaXB0cyA9XG5cdFx0LyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKG5vZGUpLm5vZGVOYW1lID09PSBTQ1JJUFRfVEFHXG5cdFx0XHQ/IFsvKiogQHR5cGUge0hUTUxTY3JpcHRFbGVtZW50fSAqLyAobm9kZSldXG5cdFx0XHQ6IG5vZGUucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XG5cblx0Y29uc3QgZWZmZWN0ID0gLyoqIEB0eXBlIHtFZmZlY3QgJiB7IG5vZGVzOiBFZmZlY3ROb2RlcyB9fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0Zm9yIChjb25zdCBzY3JpcHQgb2Ygc2NyaXB0cykge1xuXHRcdGNvbnN0IGNsb25lID0gY3JlYXRlX2VsZW1lbnQoJ3NjcmlwdCcpO1xuXHRcdGZvciAodmFyIGF0dHJpYnV0ZSBvZiBzY3JpcHQuYXR0cmlidXRlcykge1xuXHRcdFx0Y2xvbmUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lLCBhdHRyaWJ1dGUudmFsdWUpO1xuXHRcdH1cblxuXHRcdGNsb25lLnRleHRDb250ZW50ID0gc2NyaXB0LnRleHRDb250ZW50O1xuXG5cdFx0Ly8gVGhlIHNjcmlwdCBoYXMgY2hhbmdlZCAtIGlmIGl0J3MgYXQgdGhlIGVkZ2VzLCB0aGUgZWZmZWN0IG5vdyBwb2ludHMgYXQgZGVhZCBub2Rlc1xuXHRcdGlmIChpc19mcmFnbWVudCA/IG5vZGUuZmlyc3RDaGlsZCA9PT0gc2NyaXB0IDogbm9kZSA9PT0gc2NyaXB0KSB7XG5cdFx0XHRlZmZlY3Qubm9kZXMuc3RhcnQgPSBjbG9uZTtcblx0XHR9XG5cdFx0aWYgKGlzX2ZyYWdtZW50ID8gbm9kZS5sYXN0Q2hpbGQgPT09IHNjcmlwdCA6IG5vZGUgPT09IHNjcmlwdCkge1xuXHRcdFx0ZWZmZWN0Lm5vZGVzLmVuZCA9IGNsb25lO1xuXHRcdH1cblxuXHRcdHNjcmlwdC5yZXBsYWNlV2l0aChjbG9uZSk7XG5cdH1cblx0cmV0dXJuIG5vZGU7XG59XG5cbi8qKlxuICogRG9uJ3QgbWFyayB0aGlzIGFzIHNpZGUtZWZmZWN0LWZyZWUsIGh5ZHJhdGlvbiBuZWVkcyB0byB3YWxrIGFsbCBub2Rlc1xuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KHZhbHVlID0gJycpIHtcblx0aWYgKCFoeWRyYXRpbmcpIHtcblx0XHR2YXIgdCA9IGNyZWF0ZV90ZXh0KHZhbHVlICsgJycpO1xuXHRcdGFzc2lnbl9ub2Rlcyh0LCB0KTtcblx0XHRyZXR1cm4gdDtcblx0fVxuXG5cdHZhciBub2RlID0gaHlkcmF0ZV9ub2RlO1xuXG5cdGlmIChub2RlLm5vZGVUeXBlICE9PSBURVhUX05PREUpIHtcblx0XHQvLyBpZiBhbiB7ZXhwcmVzc2lvbn0gaXMgZW1wdHkgZHVyaW5nIFNTUiwgd2UgbmVlZCB0byBpbnNlcnQgYW4gZW1wdHkgdGV4dCBub2RlXG5cdFx0bm9kZS5iZWZvcmUoKG5vZGUgPSBjcmVhdGVfdGV4dCgpKSk7XG5cdFx0c2V0X2h5ZHJhdGVfbm9kZShub2RlKTtcblx0fSBlbHNlIHtcblx0XHRtZXJnZV90ZXh0X25vZGVzKC8qKiBAdHlwZSB7VGV4dH0gKi8gKG5vZGUpKTtcblx0fVxuXG5cdGFzc2lnbl9ub2Rlcyhub2RlLCBub2RlKTtcblx0cmV0dXJuIG5vZGU7XG59XG5cbi8qKlxuICogQHJldHVybnMge1RlbXBsYXRlTm9kZSB8IERvY3VtZW50RnJhZ21lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tZW50KCkge1xuXHQvLyB3ZSdyZSBub3QgZGVsZWdhdGluZyB0byBgdGVtcGxhdGVgIGhlcmUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGFzc2lnbl9ub2RlcyhoeWRyYXRlX25vZGUsIG51bGwpO1xuXHRcdHJldHVybiBoeWRyYXRlX25vZGU7XG5cdH1cblxuXHR2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0dmFyIHN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJyk7XG5cdHZhciBhbmNob3IgPSBjcmVhdGVfdGV4dCgpO1xuXHRmcmFnLmFwcGVuZChzdGFydCwgYW5jaG9yKTtcblxuXHRhc3NpZ25fbm9kZXMoc3RhcnQsIGFuY2hvcik7XG5cblx0cmV0dXJuIGZyYWc7XG59XG5cbi8qKlxuICogQXNzaWduIHRoZSBjcmVhdGVkIChvciBpbiBoeWRyYXRpb24gbW9kZSwgdHJhdmVyc2VkKSBkb20gZWxlbWVudHMgdG8gdGhlIGN1cnJlbnQgYmxvY2tcbiAqIGFuZCBpbnNlcnQgdGhlIGVsZW1lbnRzIGludG8gdGhlIGRvbSAoaW4gY2xpZW50IG1vZGUpLlxuICogQHBhcmFtIHtUZXh0IHwgQ29tbWVudCB8IEVsZW1lbnR9IGFuY2hvclxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50IHwgRWxlbWVudH0gZG9tXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQoYW5jaG9yLCBkb20pIHtcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdHZhciBlZmZlY3QgPSAvKiogQHR5cGUge0VmZmVjdCAmIHsgbm9kZXM6IEVmZmVjdE5vZGVzIH19ICovIChhY3RpdmVfZWZmZWN0KTtcblxuXHRcdC8vIFdoZW4gaHlkcmF0aW5nIGFuZCBvdXRlciBjb21wb25lbnQgYW5kIGFuIGlubmVyIGNvbXBvbmVudCBpcyBhc3luYywgaS5lLiBibG9ja2VkIG9uIGEgcHJvbWlzZSxcblx0XHQvLyB0aGVuIGJ5IHRoZSB0aW1lIHRoZSBpbm5lciByZXNvbHZlcyB3ZSBoYXZlIGFscmVhZHkgYWR2YW5jZWQgdG8gdGhlIGVuZCBvZiB0aGUgaHlkcmF0ZWQgbm9kZXNcblx0XHQvLyBvZiB0aGUgcGFyZW50IGNvbXBvbmVudC4gQ2hlY2sgZm9yIGRlZmluZWQgZm9yIHRoYXQgcmVhc29uIHRvIGF2b2lkIHJld2luZGluZyB0aGUgcGFyZW50J3MgZW5kIG1hcmtlci5cblx0XHRpZiAoKGVmZmVjdC5mICYgUkVBQ1RJT05fUkFOKSA9PT0gMCB8fCBlZmZlY3Qubm9kZXMuZW5kID09PSBudWxsKSB7XG5cdFx0XHRlZmZlY3Qubm9kZXMuZW5kID0gaHlkcmF0ZV9ub2RlO1xuXHRcdH1cblxuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChhbmNob3IgPT09IG51bGwpIHtcblx0XHQvLyBlZGdlIGNhc2Ug4oCUIHZvaWQgYDxzdmVsdGU6ZWxlbWVudD5gIHdpdGggY29udGVudFxuXHRcdHJldHVybjtcblx0fVxuXG5cdGFuY2hvci5iZWZvcmUoLyoqIEB0eXBlIHtOb2RlfSAqLyAoZG9tKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIChvciBoeWRyYXRlKSBhbiB1bmlxdWUgVUlEIGZvciB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcHNfaWQoKSB7XG5cdGlmIChcblx0XHRoeWRyYXRpbmcgJiZcblx0XHRoeWRyYXRlX25vZGUgJiZcblx0XHRoeWRyYXRlX25vZGUubm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSAmJlxuXHRcdGh5ZHJhdGVfbm9kZS50ZXh0Q29udGVudD8uc3RhcnRzV2l0aChgJGApXG5cdCkge1xuXHRcdGNvbnN0IGlkID0gaHlkcmF0ZV9ub2RlLnRleHRDb250ZW50LnN1YnN0cmluZygxKTtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblxuXHQvLyBAdHMtZXhwZWN0LWVycm9yIFRoaXMgd2F5IHdlIGVuc3VyZSB0aGUgaWQgaXMgdW5pcXVlIGV2ZW4gYWNyb3NzIFN2ZWx0ZSBydW50aW1lc1xuXHQod2luZG93Ll9fc3ZlbHRlID8/PSB7fSkudWlkID8/PSAxO1xuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0cmV0dXJuIGBjJHt3aW5kb3cuX19zdmVsdGUudWlkKyt9YDtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCwgRWZmZWN0LCBFZmZlY3ROb2RlcywgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRUeXBlLCBTdmVsdGVDb21wb25lbnQsIE1vdW50T3B0aW9ucyB9IGZyb20gJy4uLy4uL2luZGV4LmpzJyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQge1xuXHRjbGVhcl90ZXh0X2NvbnRlbnQsXG5cdGNyZWF0ZV90ZXh0LFxuXHRnZXRfZmlyc3RfY2hpbGQsXG5cdGdldF9uZXh0X3NpYmxpbmcsXG5cdGluaXRfb3BlcmF0aW9uc1xufSBmcm9tICcuL2RvbS9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IEhZRFJBVElPTl9FTkQsIEhZRFJBVElPTl9FUlJPUiwgSFlEUkFUSU9OX1NUQVJUIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9lZmZlY3QgfSBmcm9tICcuL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgcHVzaCwgcG9wLCBjb21wb25lbnRfY29udGV4dCB9IGZyb20gJy4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBjb21wb25lbnRfcm9vdCB9IGZyb20gJy4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGVfbm9kZSwgaHlkcmF0aW5nLCBzZXRfaHlkcmF0ZV9ub2RlLCBzZXRfaHlkcmF0aW5nIH0gZnJvbSAnLi9kb20vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGFycmF5X2Zyb20gfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHtcblx0YWxsX3JlZ2lzdGVyZWRfZXZlbnRzLFxuXHRoYW5kbGVfZXZlbnRfcHJvcGFnYXRpb24sXG5cdHJvb3RfZXZlbnRfaGFuZGxlc1xufSBmcm9tICcuL2RvbS9lbGVtZW50cy9ldmVudHMuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuL3dhcm5pbmdzLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgYXNzaWduX25vZGVzIH0gZnJvbSAnLi9kb20vdGVtcGxhdGUuanMnO1xuaW1wb3J0IHsgaXNfcGFzc2l2ZV9ldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJztcbmltcG9ydCB7IENPTU1FTlRfTk9ERSwgU1RBVEVfU1lNQk9MIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgYm91bmRhcnkgfSBmcm9tICcuL2RvbS9ibG9ja3MvYm91bmRhcnkuanMnO1xuXG4vKipcbiAqIFRoaXMgaXMgbm9ybWFsbHkgdHJ1ZSDigJQgYmxvY2sgZWZmZWN0cyBzaG91bGQgcnVuIHRoZWlyIGludHJvIHRyYW5zaXRpb25zIOKAlFxuICogYnV0IGlzIGZhbHNlIGR1cmluZyBoeWRyYXRpb24gKHVubGVzcyBgb3B0aW9ucy5pbnRyb2AgaXMgYHRydWVgKSBhbmRcbiAqIHdoZW4gY3JlYXRpbmcgdGhlIGNoaWxkcmVuIG9mIGEgYDxzdmVsdGU6ZWxlbWVudD5gIHRoYXQganVzdCBjaGFuZ2VkIHRhZ1xuICovXG5leHBvcnQgbGV0IHNob3VsZF9pbnRybyA9IHRydWU7XG5cbi8qKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3Nob3VsZF9pbnRybyh2YWx1ZSkge1xuXHRzaG91bGRfaW50cm8gPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRleHRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfdGV4dCh0ZXh0LCB2YWx1ZSkge1xuXHQvLyBGb3Igb2JqZWN0cywgd2UgYXBwbHkgc3RyaW5nIGNvZXJjaW9uICh3aGljaCBtaWdodCBtYWtlIHRoaW5ncyBsaWtlICRzdGF0ZSBhcnJheSByZWZlcmVuY2VzIGluIHRoZSB0ZW1wbGF0ZSByZWFjdGl2ZSkgYmVmb3JlIGRpZmZpbmdcblx0dmFyIHN0ciA9IHZhbHVlID09IG51bGwgPyAnJyA6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyBgJHt2YWx1ZX1gIDogdmFsdWU7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0aWYgKHN0ciAhPT0gKHRleHQuX190ID8/PSB0ZXh0Lm5vZGVWYWx1ZSkpIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0dGV4dC5fX3QgPSBzdHI7XG5cdFx0dGV4dC5ub2RlVmFsdWUgPSBgJHtzdHJ9YDtcblx0fVxufVxuXG4vKipcbiAqIE1vdW50cyBhIGNvbXBvbmVudCB0byB0aGUgZ2l2ZW4gdGFyZ2V0IGFuZCByZXR1cm5zIHRoZSBleHBvcnRzIGFuZCBwb3RlbnRpYWxseSB0aGUgcHJvcHMgKGlmIGNvbXBpbGVkIHdpdGggYGFjY2Vzc29yczogdHJ1ZWApIG9mIHRoZSBjb21wb25lbnQuXG4gKiBUcmFuc2l0aW9ucyB3aWxsIHBsYXkgZHVyaW5nIHRoZSBpbml0aWFsIHJlbmRlciB1bmxlc3MgdGhlIGBpbnRyb2Agb3B0aW9uIGlzIHNldCB0byBgZmFsc2VgLlxuICpcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gUHJvcHNcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gRXhwb3J0c1xuICogQHBhcmFtIHtDb21wb25lbnRUeXBlPFN2ZWx0ZUNvbXBvbmVudDxQcm9wcz4+IHwgQ29tcG9uZW50PFByb3BzLCBFeHBvcnRzLCBhbnk+fSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TW91bnRPcHRpb25zPFByb3BzPn0gb3B0aW9uc1xuICogQHJldHVybnMge0V4cG9ydHN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3VudChjb21wb25lbnQsIG9wdGlvbnMpIHtcblx0cmV0dXJuIF9tb3VudChjb21wb25lbnQsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEh5ZHJhdGVzIGEgY29tcG9uZW50IG9uIHRoZSBnaXZlbiB0YXJnZXQgYW5kIHJldHVybnMgdGhlIGV4cG9ydHMgYW5kIHBvdGVudGlhbGx5IHRoZSBwcm9wcyAoaWYgY29tcGlsZWQgd2l0aCBgYWNjZXNzb3JzOiB0cnVlYCkgb2YgdGhlIGNvbXBvbmVudFxuICpcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gUHJvcHNcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gRXhwb3J0c1xuICogQHBhcmFtIHtDb21wb25lbnRUeXBlPFN2ZWx0ZUNvbXBvbmVudDxQcm9wcz4+IHwgQ29tcG9uZW50PFByb3BzLCBFeHBvcnRzLCBhbnk+fSBjb21wb25lbnRcbiAqIEBwYXJhbSB7e30gZXh0ZW5kcyBQcm9wcyA/IHtcbiAqIFx0XHR0YXJnZXQ6IERvY3VtZW50IHwgRWxlbWVudCB8IFNoYWRvd1Jvb3Q7XG4gKiBcdFx0cHJvcHM/OiBQcm9wcztcbiAqIFx0XHRldmVudHM/OiBSZWNvcmQ8c3RyaW5nLCAoZTogYW55KSA9PiBhbnk+O1xuICogIFx0Y29udGV4dD86IE1hcDxhbnksIGFueT47XG4gKiBcdFx0aW50cm8/OiBib29sZWFuO1xuICogXHRcdHJlY292ZXI/OiBib29sZWFuO1xuICpcdFx0dHJhbnNmb3JtRXJyb3I/OiAoZXJyb3I6IHVua25vd24pID0+IHVua25vd247XG4gKiBcdH0gOiB7XG4gKiBcdFx0dGFyZ2V0OiBEb2N1bWVudCB8IEVsZW1lbnQgfCBTaGFkb3dSb290O1xuICogXHRcdHByb3BzOiBQcm9wcztcbiAqIFx0XHRldmVudHM/OiBSZWNvcmQ8c3RyaW5nLCAoZTogYW55KSA9PiBhbnk+O1xuICogIFx0Y29udGV4dD86IE1hcDxhbnksIGFueT47XG4gKiBcdFx0aW50cm8/OiBib29sZWFuO1xuICogXHRcdHJlY292ZXI/OiBib29sZWFuO1xuICpcdFx0dHJhbnNmb3JtRXJyb3I/OiAoZXJyb3I6IHVua25vd24pID0+IHVua25vd247XG4gKiBcdH19IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtFeHBvcnRzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZShjb21wb25lbnQsIG9wdGlvbnMpIHtcblx0aW5pdF9vcGVyYXRpb25zKCk7XG5cdG9wdGlvbnMuaW50cm8gPSBvcHRpb25zLmludHJvID8/IGZhbHNlO1xuXHRjb25zdCB0YXJnZXQgPSBvcHRpb25zLnRhcmdldDtcblx0Y29uc3Qgd2FzX2h5ZHJhdGluZyA9IGh5ZHJhdGluZztcblx0Y29uc3QgcHJldmlvdXNfaHlkcmF0ZV9ub2RlID0gaHlkcmF0ZV9ub2RlO1xuXG5cdHRyeSB7XG5cdFx0dmFyIGFuY2hvciA9IGdldF9maXJzdF9jaGlsZCh0YXJnZXQpO1xuXG5cdFx0d2hpbGUgKFxuXHRcdFx0YW5jaG9yICYmXG5cdFx0XHQoYW5jaG9yLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUgfHwgLyoqIEB0eXBlIHtDb21tZW50fSAqLyAoYW5jaG9yKS5kYXRhICE9PSBIWURSQVRJT05fU1RBUlQpXG5cdFx0KSB7XG5cdFx0XHRhbmNob3IgPSBnZXRfbmV4dF9zaWJsaW5nKGFuY2hvcik7XG5cdFx0fVxuXG5cdFx0aWYgKCFhbmNob3IpIHtcblx0XHRcdHRocm93IEhZRFJBVElPTl9FUlJPUjtcblx0XHR9XG5cblx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHRcdHNldF9oeWRyYXRlX25vZGUoLyoqIEB0eXBlIHtDb21tZW50fSAqLyAoYW5jaG9yKSk7XG5cblx0XHRjb25zdCBpbnN0YW5jZSA9IF9tb3VudChjb21wb25lbnQsIHsgLi4ub3B0aW9ucywgYW5jaG9yIH0pO1xuXG5cdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cblx0XHRyZXR1cm4gLyoqICBAdHlwZSB7RXhwb3J0c30gKi8gKGluc3RhbmNlKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyByZS10aHJvdyBTdmVsdGUgZXJyb3JzIC0gdGhleSBhcmUgY2VydGFpbmx5IG5vdCByZWxhdGVkIHRvIGh5ZHJhdGlvblxuXHRcdGlmIChcblx0XHRcdGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiZcblx0XHRcdGVycm9yLm1lc3NhZ2Uuc3BsaXQoJ1xcbicpLnNvbWUoKGxpbmUpID0+IGxpbmUuc3RhcnRzV2l0aCgnaHR0cHM6Ly9zdmVsdGUuZGV2L2UvJykpXG5cdFx0KSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdFx0aWYgKGVycm9yICE9PSBIWURSQVRJT05fRVJST1IpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBoeWRyYXRlOiAnLCBlcnJvcik7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMucmVjb3ZlciA9PT0gZmFsc2UpIHtcblx0XHRcdGUuaHlkcmF0aW9uX2ZhaWxlZCgpO1xuXHRcdH1cblxuXHRcdC8vIElmIGFuIGVycm9yIG9jY3VycmVkIGFib3ZlLCB0aGUgb3BlcmF0aW9ucyBtaWdodCBub3QgeWV0IGhhdmUgYmVlbiBpbml0aWFsaXNlZC5cblx0XHRpbml0X29wZXJhdGlvbnMoKTtcblx0XHRjbGVhcl90ZXh0X2NvbnRlbnQodGFyZ2V0KTtcblxuXHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdHJldHVybiBtb3VudChjb21wb25lbnQsIG9wdGlvbnMpO1xuXHR9IGZpbmFsbHkge1xuXHRcdHNldF9oeWRyYXRpbmcod2FzX2h5ZHJhdGluZyk7XG5cdFx0c2V0X2h5ZHJhdGVfbm9kZShwcmV2aW91c19oeWRyYXRlX25vZGUpO1xuXHR9XG59XG5cbi8qKiBAdHlwZSB7TWFwPEV2ZW50VGFyZ2V0LCBNYXA8c3RyaW5nLCBudW1iZXI+Pn0gKi9cbmNvbnN0IGxpc3RlbmVycyA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBAdGVtcGxhdGUge1JlY29yZDxzdHJpbmcsIGFueT59IEV4cG9ydHNcbiAqIEBwYXJhbSB7Q29tcG9uZW50VHlwZTxTdmVsdGVDb21wb25lbnQ8YW55Pj4gfCBDb21wb25lbnQ8YW55Pn0gQ29tcG9uZW50XG4gKiBAcGFyYW0ge01vdW50T3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge0V4cG9ydHN9XG4gKi9cbmZ1bmN0aW9uIF9tb3VudChcblx0Q29tcG9uZW50LFxuXHR7IHRhcmdldCwgYW5jaG9yLCBwcm9wcyA9IHt9LCBldmVudHMsIGNvbnRleHQsIGludHJvID0gdHJ1ZSwgdHJhbnNmb3JtRXJyb3IgfVxuKSB7XG5cdGluaXRfb3BlcmF0aW9ucygpO1xuXG5cdC8qKiBAdHlwZSB7RXhwb3J0c30gKi9cblx0Ly8gQHRzLWV4cGVjdC1lcnJvciB3aWxsIGJlIGRlZmluZWQgYmVjYXVzZSB0aGUgcmVuZGVyIGVmZmVjdCBydW5zIHN5bmNocm9ub3VzbHlcblx0dmFyIGNvbXBvbmVudCA9IHVuZGVmaW5lZDtcblxuXHR2YXIgdW5tb3VudCA9IGNvbXBvbmVudF9yb290KCgpID0+IHtcblx0XHR2YXIgYW5jaG9yX25vZGUgPSBhbmNob3IgPz8gdGFyZ2V0LmFwcGVuZENoaWxkKGNyZWF0ZV90ZXh0KCkpO1xuXG5cdFx0Ym91bmRhcnkoXG5cdFx0XHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGFuY2hvcl9ub2RlKSxcblx0XHRcdHtcblx0XHRcdFx0cGVuZGluZzogKCkgPT4ge31cblx0XHRcdH0sXG5cdFx0XHQoYW5jaG9yX25vZGUpID0+IHtcblx0XHRcdFx0cHVzaCh7fSk7XG5cdFx0XHRcdHZhciBjdHggPSAvKiogQHR5cGUge0NvbXBvbmVudENvbnRleHR9ICovIChjb21wb25lbnRfY29udGV4dCk7XG5cdFx0XHRcdGlmIChjb250ZXh0KSBjdHguYyA9IGNvbnRleHQ7XG5cblx0XHRcdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0XHRcdC8vIFdlIGNhbid0IHNwcmVhZCB0aGUgb2JqZWN0IG9yIGVsc2Ugd2UnZCBsb3NlIHRoZSBzdGF0ZSBwcm94eSBzdHVmZiwgaWYgaXQgaXMgb25lXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHthbnl9ICovIChwcm9wcykuJCRldmVudHMgPSBldmVudHM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRcdFx0YXNzaWduX25vZGVzKC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoYW5jaG9yX25vZGUpLCBudWxsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNob3VsZF9pbnRybyA9IGludHJvO1xuXHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIHRoZSBwdWJsaWMgdHlwaW5ncyBhcmUgbm90IHdoYXQgdGhlIGFjdHVhbCBmdW5jdGlvbiBsb29rcyBsaWtlXG5cdFx0XHRcdGNvbXBvbmVudCA9IENvbXBvbmVudChhbmNob3Jfbm9kZSwgcHJvcHMpIHx8IHt9O1xuXHRcdFx0XHRzaG91bGRfaW50cm8gPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0XHQvKiogQHR5cGUge0VmZmVjdCAmIHsgbm9kZXM6IEVmZmVjdE5vZGVzIH19ICovIChhY3RpdmVfZWZmZWN0KS5ub2Rlcy5lbmQgPSBoeWRyYXRlX25vZGU7XG5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRoeWRyYXRlX25vZGUgPT09IG51bGwgfHxcblx0XHRcdFx0XHRcdGh5ZHJhdGVfbm9kZS5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFIHx8XG5cdFx0XHRcdFx0XHQvKiogQHR5cGUge0NvbW1lbnR9ICovIChoeWRyYXRlX25vZGUpLmRhdGEgIT09IEhZRFJBVElPTl9FTkRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHcuaHlkcmF0aW9uX21pc21hdGNoKCk7XG5cdFx0XHRcdFx0XHR0aHJvdyBIWURSQVRJT05fRVJST1I7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cG9wKCk7XG5cdFx0XHR9LFxuXHRcdFx0dHJhbnNmb3JtRXJyb3Jcblx0XHQpO1xuXG5cdFx0Ly8gU2V0dXAgZXZlbnQgZGVsZWdhdGlvbiBfYWZ0ZXJfIGNvbXBvbmVudCBpcyBtb3VudGVkIC0gaWYgYW4gZXJyb3Igd291bGQgaGFwcGVuIGR1cmluZyBtb3VudCwgaXQgd291bGQgb3RoZXJ3aXNlIG5vdCBiZSBjbGVhbmVkIHVwXG5cdFx0LyoqIEB0eXBlIHtTZXQ8c3RyaW5nPn0gKi9cblx0XHR2YXIgcmVnaXN0ZXJlZF9ldmVudHMgPSBuZXcgU2V0KCk7XG5cblx0XHQvKiogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBldmVudHMgKi9cblx0XHR2YXIgZXZlbnRfaGFuZGxlID0gKGV2ZW50cykgPT4ge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGV2ZW50X25hbWUgPSBldmVudHNbaV07XG5cblx0XHRcdFx0aWYgKHJlZ2lzdGVyZWRfZXZlbnRzLmhhcyhldmVudF9uYW1lKSkgY29udGludWU7XG5cdFx0XHRcdHJlZ2lzdGVyZWRfZXZlbnRzLmFkZChldmVudF9uYW1lKTtcblxuXHRcdFx0XHR2YXIgcGFzc2l2ZSA9IGlzX3Bhc3NpdmVfZXZlbnQoZXZlbnRfbmFtZSk7XG5cblx0XHRcdFx0Ly8gQWRkIHRoZSBldmVudCBsaXN0ZW5lciB0byBib3RoIHRoZSBjb250YWluZXIgYW5kIHRoZSBkb2N1bWVudC5cblx0XHRcdFx0Ly8gVGhlIGNvbnRhaW5lciBsaXN0ZW5lciBlbnN1cmVzIHdlIGNhdGNoIGV2ZW50cyBmcm9tIHdpdGhpbiBpbiBjYXNlXG5cdFx0XHRcdC8vIHRoZSBvdXRlciBjb250ZW50IHN0b3BzIHByb3BhZ2F0aW9uIG9mIHRoZSBldmVudC5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gVGhlIGRvY3VtZW50IGxpc3RlbmVyIGVuc3VyZXMgd2UgY2F0Y2ggZXZlbnRzIHRoYXQgb3JpZ2luYXRlIGZyb20gZWxlbWVudHMgdGhhdCB3ZXJlXG5cdFx0XHRcdC8vIG1hbnVhbGx5IG1vdmVkIG91dHNpZGUgb2YgdGhlIGNvbnRhaW5lciAoZS5nLiB2aWEgbWFudWFsIHBvcnRhbHMpLlxuXHRcdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2YgW3RhcmdldCwgZG9jdW1lbnRdKSB7XG5cdFx0XHRcdFx0dmFyIGNvdW50cyA9IGxpc3RlbmVycy5nZXQobm9kZSk7XG5cblx0XHRcdFx0XHRpZiAoY291bnRzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvdW50cyA9IG5ldyBNYXAoKTtcblx0XHRcdFx0XHRcdGxpc3RlbmVycy5zZXQobm9kZSwgY291bnRzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgY291bnQgPSBjb3VudHMuZ2V0KGV2ZW50X25hbWUpO1xuXG5cdFx0XHRcdFx0aWYgKGNvdW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudF9uYW1lLCBoYW5kbGVfZXZlbnRfcHJvcGFnYXRpb24sIHsgcGFzc2l2ZSB9KTtcblx0XHRcdFx0XHRcdGNvdW50cy5zZXQoZXZlbnRfbmFtZSwgMSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvdW50cy5zZXQoZXZlbnRfbmFtZSwgY291bnQgKyAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZXZlbnRfaGFuZGxlKGFycmF5X2Zyb20oYWxsX3JlZ2lzdGVyZWRfZXZlbnRzKSk7XG5cdFx0cm9vdF9ldmVudF9oYW5kbGVzLmFkZChldmVudF9oYW5kbGUpO1xuXG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdGZvciAodmFyIGV2ZW50X25hbWUgb2YgcmVnaXN0ZXJlZF9ldmVudHMpIHtcblx0XHRcdFx0Zm9yIChjb25zdCBub2RlIG9mIFt0YXJnZXQsIGRvY3VtZW50XSkge1xuXHRcdFx0XHRcdHZhciBjb3VudHMgPSAvKiogQHR5cGUge01hcDxzdHJpbmcsIG51bWJlcj59ICovIChsaXN0ZW5lcnMuZ2V0KG5vZGUpKTtcblx0XHRcdFx0XHR2YXIgY291bnQgPSAvKiogQHR5cGUge251bWJlcn0gKi8gKGNvdW50cy5nZXQoZXZlbnRfbmFtZSkpO1xuXG5cdFx0XHRcdFx0aWYgKC0tY291bnQgPT0gMCkge1xuXHRcdFx0XHRcdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIGhhbmRsZV9ldmVudF9wcm9wYWdhdGlvbik7XG5cdFx0XHRcdFx0XHRjb3VudHMuZGVsZXRlKGV2ZW50X25hbWUpO1xuXG5cdFx0XHRcdFx0XHRpZiAoY291bnRzLnNpemUgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXJzLmRlbGV0ZShub2RlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y291bnRzLnNldChldmVudF9uYW1lLCBjb3VudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJvb3RfZXZlbnRfaGFuZGxlcy5kZWxldGUoZXZlbnRfaGFuZGxlKTtcblxuXHRcdFx0aWYgKGFuY2hvcl9ub2RlICE9PSBhbmNob3IpIHtcblx0XHRcdFx0YW5jaG9yX25vZGUucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoYW5jaG9yX25vZGUpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xuXG5cdG1vdW50ZWRfY29tcG9uZW50cy5zZXQoY29tcG9uZW50LCB1bm1vdW50KTtcblx0cmV0dXJuIGNvbXBvbmVudDtcbn1cblxuLyoqXG4gKiBSZWZlcmVuY2VzIG9mIHRoZSBjb21wb25lbnRzIHRoYXQgd2VyZSBtb3VudGVkIG9yIGh5ZHJhdGVkLlxuICogVXNlcyBhIGBXZWFrTWFwYCB0byBhdm9pZCBtZW1vcnkgbGVha3MuXG4gKi9cbmxldCBtb3VudGVkX2NvbXBvbmVudHMgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFVubW91bnRzIGEgY29tcG9uZW50IHRoYXQgd2FzIHByZXZpb3VzbHkgbW91bnRlZCB1c2luZyBgbW91bnRgIG9yIGBoeWRyYXRlYC5cbiAqXG4gKiBTaW5jZSA1LjEzLjAsIGlmIGBvcHRpb25zLm91dHJvYCBpcyBgdHJ1ZWAsIFt0cmFuc2l0aW9uc10oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlL3RyYW5zaXRpb24pIHdpbGwgcGxheSBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyByZW1vdmVkIGZyb20gdGhlIERPTS5cbiAqXG4gKiBSZXR1cm5zIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgaWYgYG9wdGlvbnMub3V0cm9gIGlzIHRydWUsIG9yIGltbWVkaWF0ZWx5IG90aGVyd2lzZSAocHJpb3IgdG8gNS4xMy4wLCByZXR1cm5zIGB2b2lkYCkuXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7IG1vdW50LCB1bm1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAqIGltcG9ydCBBcHAgZnJvbSAnLi9BcHAuc3ZlbHRlJztcbiAqXG4gKiBjb25zdCBhcHAgPSBtb3VudChBcHAsIHsgdGFyZ2V0OiBkb2N1bWVudC5ib2R5IH0pO1xuICpcbiAqIC8vIGxhdGVyLi4uXG4gKiB1bm1vdW50KGFwcCwgeyBvdXRybzogdHJ1ZSB9KTtcbiAqIGBgYFxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBjb21wb25lbnRcbiAqIEBwYXJhbSB7eyBvdXRybz86IGJvb2xlYW4gfX0gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVubW91bnQoY29tcG9uZW50LCBvcHRpb25zKSB7XG5cdGNvbnN0IGZuID0gbW91bnRlZF9jb21wb25lbnRzLmdldChjb21wb25lbnQpO1xuXG5cdGlmIChmbikge1xuXHRcdG1vdW50ZWRfY29tcG9uZW50cy5kZWxldGUoY29tcG9uZW50KTtcblx0XHRyZXR1cm4gZm4ob3B0aW9ucyk7XG5cdH1cblxuXHRpZiAoREVWKSB7XG5cdFx0aWYgKFNUQVRFX1NZTUJPTCBpbiBjb21wb25lbnQpIHtcblx0XHRcdHcuc3RhdGVfcHJveHlfdW5tb3VudCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3LmxpZmVjeWNsZV9kb3VibGVfdW5tb3VudCgpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0LCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgQmF0Y2gsIGN1cnJlbnRfYmF0Y2ggfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7XG5cdGJyYW5jaCxcblx0ZGVzdHJveV9lZmZlY3QsXG5cdG1vdmVfZWZmZWN0LFxuXHRwYXVzZV9lZmZlY3QsXG5cdHJlc3VtZV9lZmZlY3Rcbn0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGVfbm9kZSwgaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGNyZWF0ZV90ZXh0LCBzaG91bGRfZGVmZXJfYXBwZW5kIH0gZnJvbSAnLi4vb3BlcmF0aW9ucy5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge3sgZWZmZWN0OiBFZmZlY3QsIGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50IH19IEJyYW5jaFxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEtleVxuICovXG5leHBvcnQgY2xhc3MgQnJhbmNoTWFuYWdlciB7XG5cdC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqL1xuXHRhbmNob3I7XG5cblx0LyoqIEB0eXBlIHtNYXA8QmF0Y2gsIEtleT59ICovXG5cdCNiYXRjaGVzID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBNYXAgb2Yga2V5cyB0byBlZmZlY3RzIHRoYXQgYXJlIGN1cnJlbnRseSByZW5kZXJlZCBpbiB0aGUgRE9NLlxuXHQgKiBUaGVzZSBlZmZlY3RzIGFyZSB2aXNpYmxlIGFuZCBhY3RpdmVseSBwYXJ0IG9mIHRoZSBkb2N1bWVudCB0cmVlLlxuXHQgKiBFeGFtcGxlOlxuXHQgKiBgYGBcblx0ICogeyNpZiBjb25kaXRpb259XG5cdCAqIFx0Zm9vXG5cdCAqIHs6ZWxzZX1cblx0ICogXHRiYXJcblx0ICogey9pZn1cblx0ICogYGBgXG5cdCAqIENhbiByZXN1bHQgaW4gdGhlIGVudHJpZXMgYHRydWUtPkVmZmVjdGAgYW5kIGBmYWxzZS0+RWZmZWN0YFxuXHQgKiBAdHlwZSB7TWFwPEtleSwgRWZmZWN0Pn1cblx0ICovXG5cdCNvbnNjcmVlbiA9IG5ldyBNYXAoKTtcblxuXHQvKipcblx0ICogU2ltaWxhciB0byAjb25zY3JlZW4gd2l0aCByZXNwZWN0IHRvIHRoZSBrZXlzLCBidXQgY29udGFpbnMgYnJhbmNoZXMgdGhhdCBhcmUgbm90IHlldFxuXHQgKiBpbiB0aGUgRE9NLCBiZWNhdXNlIHRoZWlyIGluc2VydGlvbiBpcyBkZWZlcnJlZC5cblx0ICogQHR5cGUge01hcDxLZXksIEJyYW5jaD59XG5cdCAqL1xuXHQjb2Zmc2NyZWVuID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBLZXlzIG9mIGVmZmVjdHMgdGhhdCBhcmUgY3VycmVudGx5IG91dHJvaW5nXG5cdCAqIEB0eXBlIHtTZXQ8S2V5Pn1cblx0ICovXG5cdCNvdXRyb2luZyA9IG5ldyBTZXQoKTtcblxuXHQvKipcblx0ICogV2hldGhlciB0byBwYXVzZSAoaS5lLiBvdXRybykgb24gY2hhbmdlLCBvciBkZXN0cm95IGltbWVkaWF0ZWx5LlxuXHQgKiBUaGlzIGlzIG5lY2Vzc2FyeSBmb3IgYDxzdmVsdGU6ZWxlbWVudD5gXG5cdCAqL1xuXHQjdHJhbnNpdGlvbiA9IHRydWU7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBhbmNob3Jcblx0ICogQHBhcmFtIHtib29sZWFufSB0cmFuc2l0aW9uXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihhbmNob3IsIHRyYW5zaXRpb24gPSB0cnVlKSB7XG5cdFx0dGhpcy5hbmNob3IgPSBhbmNob3I7XG5cdFx0dGhpcy4jdHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG5cdH1cblxuXHQjY29tbWl0ID0gKCkgPT4ge1xuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblxuXHRcdC8vIGlmIHRoaXMgYmF0Y2ggd2FzIG1hZGUgb2Jzb2xldGUsIGJhaWxcblx0XHRpZiAoIXRoaXMuI2JhdGNoZXMuaGFzKGJhdGNoKSkgcmV0dXJuO1xuXG5cdFx0dmFyIGtleSA9IC8qKiBAdHlwZSB7S2V5fSAqLyAodGhpcy4jYmF0Y2hlcy5nZXQoYmF0Y2gpKTtcblxuXHRcdHZhciBvbnNjcmVlbiA9IHRoaXMuI29uc2NyZWVuLmdldChrZXkpO1xuXG5cdFx0aWYgKG9uc2NyZWVuKSB7XG5cdFx0XHQvLyBlZmZlY3QgaXMgYWxyZWFkeSBpbiB0aGUgRE9NIOKAlCBhYm9ydCBhbnkgY3VycmVudCBvdXRyb1xuXHRcdFx0cmVzdW1lX2VmZmVjdChvbnNjcmVlbik7XG5cdFx0XHR0aGlzLiNvdXRyb2luZy5kZWxldGUoa2V5KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gZWZmZWN0IGlzIGN1cnJlbnRseSBvZmZzY3JlZW4uIHB1dCBpdCBpbiB0aGUgRE9NXG5cdFx0XHR2YXIgb2Zmc2NyZWVuID0gdGhpcy4jb2Zmc2NyZWVuLmdldChrZXkpO1xuXG5cdFx0XHRpZiAob2Zmc2NyZWVuKSB7XG5cdFx0XHRcdHRoaXMuI29uc2NyZWVuLnNldChrZXksIG9mZnNjcmVlbi5lZmZlY3QpO1xuXHRcdFx0XHR0aGlzLiNvZmZzY3JlZW4uZGVsZXRlKGtleSk7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIHRoZSBhbmNob3IuLi5cblx0XHRcdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChvZmZzY3JlZW4uZnJhZ21lbnQubGFzdENoaWxkKS5yZW1vdmUoKTtcblxuXHRcdFx0XHQvLyAuLi5hbmQgYXBwZW5kIHRoZSBmcmFnbWVudFxuXHRcdFx0XHR0aGlzLmFuY2hvci5iZWZvcmUob2Zmc2NyZWVuLmZyYWdtZW50KTtcblx0XHRcdFx0b25zY3JlZW4gPSBvZmZzY3JlZW4uZWZmZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgW2IsIGtdIG9mIHRoaXMuI2JhdGNoZXMpIHtcblx0XHRcdHRoaXMuI2JhdGNoZXMuZGVsZXRlKGIpO1xuXG5cdFx0XHRpZiAoYiA9PT0gYmF0Y2gpIHtcblx0XHRcdFx0Ly8ga2VlcCB2YWx1ZXMgZm9yIG5ld2VyIGJhdGNoZXNcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IG9mZnNjcmVlbiA9IHRoaXMuI29mZnNjcmVlbi5nZXQoayk7XG5cblx0XHRcdGlmIChvZmZzY3JlZW4pIHtcblx0XHRcdFx0Ly8gZm9yIG9sZGVyIGJhdGNoZXMsIGRlc3Ryb3kgb2Zmc2NyZWVuIGVmZmVjdHNcblx0XHRcdFx0Ly8gYXMgdGhleSB3aWxsIG5ldmVyIGJlIGNvbW1pdHRlZFxuXHRcdFx0XHRkZXN0cm95X2VmZmVjdChvZmZzY3JlZW4uZWZmZWN0KTtcblx0XHRcdFx0dGhpcy4jb2Zmc2NyZWVuLmRlbGV0ZShrKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBvdXRyby9kZXN0cm95IGFsbCBvbnNjcmVlbiBlZmZlY3RzLi4uXG5cdFx0Zm9yIChjb25zdCBbaywgZWZmZWN0XSBvZiB0aGlzLiNvbnNjcmVlbikge1xuXHRcdFx0Ly8gLi4uZXhjZXB0IHRoZSBvbmUgdGhhdCB3YXMganVzdCBjb21taXR0ZWRcblx0XHRcdC8vICAgIG9yIHRob3NlIHRoYXQgYXJlIGFscmVhZHkgb3V0cm9pbmcgKGVsc2UgdGhlIHRyYW5zaXRpb24gaXMgYWJvcnRlZCBhbmQgdGhlIGVmZmVjdCBkZXN0cm95ZWQgcmlnaHQgYXdheSlcblx0XHRcdGlmIChrID09PSBrZXkgfHwgdGhpcy4jb3V0cm9pbmcuaGFzKGspKSBjb250aW51ZTtcblxuXHRcdFx0Y29uc3Qgb25fZGVzdHJveSA9ICgpID0+IHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IEFycmF5LmZyb20odGhpcy4jYmF0Y2hlcy52YWx1ZXMoKSk7XG5cblx0XHRcdFx0aWYgKGtleXMuaW5jbHVkZXMoaykpIHtcblx0XHRcdFx0XHQvLyBrZWVwIHRoZSBlZmZlY3Qgb2Zmc2NyZWVuLCBhcyBhbm90aGVyIGJhdGNoIHdpbGwgbmVlZCBpdFxuXHRcdFx0XHRcdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHRtb3ZlX2VmZmVjdChlZmZlY3QsIGZyYWdtZW50KTtcblxuXHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZChjcmVhdGVfdGV4dCgpKTsgLy8gVE9ETyBjYW4gd2UgYXZvaWQgdGhpcz9cblxuXHRcdFx0XHRcdHRoaXMuI29mZnNjcmVlbi5zZXQoaywgeyBlZmZlY3QsIGZyYWdtZW50IH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLiNvdXRyb2luZy5kZWxldGUoayk7XG5cdFx0XHRcdHRoaXMuI29uc2NyZWVuLmRlbGV0ZShrKTtcblx0XHRcdH07XG5cblx0XHRcdGlmICh0aGlzLiN0cmFuc2l0aW9uIHx8ICFvbnNjcmVlbikge1xuXHRcdFx0XHR0aGlzLiNvdXRyb2luZy5hZGQoayk7XG5cdFx0XHRcdHBhdXNlX2VmZmVjdChlZmZlY3QsIG9uX2Rlc3Ryb3ksIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9uX2Rlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7QmF0Y2h9IGJhdGNoXG5cdCAqL1xuXHQjZGlzY2FyZCA9IChiYXRjaCkgPT4ge1xuXHRcdHRoaXMuI2JhdGNoZXMuZGVsZXRlKGJhdGNoKTtcblxuXHRcdGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKHRoaXMuI2JhdGNoZXMudmFsdWVzKCkpO1xuXG5cdFx0Zm9yIChjb25zdCBbaywgYnJhbmNoXSBvZiB0aGlzLiNvZmZzY3JlZW4pIHtcblx0XHRcdGlmICgha2V5cy5pbmNsdWRlcyhrKSkge1xuXHRcdFx0XHRkZXN0cm95X2VmZmVjdChicmFuY2guZWZmZWN0KTtcblx0XHRcdFx0dGhpcy4jb2Zmc2NyZWVuLmRlbGV0ZShrKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB7YW55fSBrZXlcblx0ICogQHBhcmFtIHtudWxsIHwgKCh0YXJnZXQ6IFRlbXBsYXRlTm9kZSkgPT4gdm9pZCl9IGZuXG5cdCAqL1xuXHRlbnN1cmUoa2V5LCBmbikge1xuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblx0XHR2YXIgZGVmZXIgPSBzaG91bGRfZGVmZXJfYXBwZW5kKCk7XG5cblx0XHRpZiAoZm4gJiYgIXRoaXMuI29uc2NyZWVuLmhhcyhrZXkpICYmICF0aGlzLiNvZmZzY3JlZW4uaGFzKGtleSkpIHtcblx0XHRcdGlmIChkZWZlcikge1xuXHRcdFx0XHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBjcmVhdGVfdGV4dCgpO1xuXG5cdFx0XHRcdGZyYWdtZW50LmFwcGVuZCh0YXJnZXQpO1xuXG5cdFx0XHRcdHRoaXMuI29mZnNjcmVlbi5zZXQoa2V5LCB7XG5cdFx0XHRcdFx0ZWZmZWN0OiBicmFuY2goKCkgPT4gZm4odGFyZ2V0KSksXG5cdFx0XHRcdFx0ZnJhZ21lbnRcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLiNvbnNjcmVlbi5zZXQoXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdGJyYW5jaCgoKSA9PiBmbih0aGlzLmFuY2hvcikpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy4jYmF0Y2hlcy5zZXQoYmF0Y2gsIGtleSk7XG5cblx0XHRpZiAoZGVmZXIpIHtcblx0XHRcdGZvciAoY29uc3QgW2ssIGVmZmVjdF0gb2YgdGhpcy4jb25zY3JlZW4pIHtcblx0XHRcdFx0aWYgKGsgPT09IGtleSkge1xuXHRcdFx0XHRcdGJhdGNoLnVuc2tpcF9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRiYXRjaC5za2lwX2VmZmVjdChlZmZlY3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoY29uc3QgW2ssIGJyYW5jaF0gb2YgdGhpcy4jb2Zmc2NyZWVuKSB7XG5cdFx0XHRcdGlmIChrID09PSBrZXkpIHtcblx0XHRcdFx0XHRiYXRjaC51bnNraXBfZWZmZWN0KGJyYW5jaC5lZmZlY3QpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhdGNoLnNraXBfZWZmZWN0KGJyYW5jaC5lZmZlY3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGJhdGNoLm9uY29tbWl0KHRoaXMuI2NvbW1pdCk7XG5cdFx0XHRiYXRjaC5vbmRpc2NhcmQodGhpcy4jZGlzY2FyZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0dGhpcy5hbmNob3IgPSBoeWRyYXRlX25vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuI2NvbW1pdCgpO1xuXHRcdH1cblx0fVxufVxuIiwiLyoqIEBpbXBvcnQgeyBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgRUZGRUNUX1RSQU5TUEFSRU5UIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHtcblx0aHlkcmF0ZV9uZXh0LFxuXHRoeWRyYXRpbmcsXG5cdHJlYWRfaHlkcmF0aW9uX2luc3RydWN0aW9uLFxuXHRza2lwX25vZGVzLFxuXHRzZXRfaHlkcmF0ZV9ub2RlLFxuXHRzZXRfaHlkcmF0aW5nXG59IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBibG9jayB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBCcmFuY2hNYW5hZ2VyIH0gZnJvbSAnLi9icmFuY2hlcy5qcyc7XG5pbXBvcnQgeyBIWURSQVRJT05fU1RBUlQsIEhZRFJBVElPTl9TVEFSVF9FTFNFIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICogQHBhcmFtIHsoYnJhbmNoOiAoZm46IChhbmNob3I6IE5vZGUpID0+IHZvaWQsIGtleT86IG51bWJlciB8IGZhbHNlKSA9PiB2b2lkKSA9PiB2b2lkfSBmblxuICogQHBhcmFtIHtib29sZWFufSBbZWxzZWlmXSBUcnVlIGlmIHRoaXMgaXMgYW4gYHs6ZWxzZSBpZiAuLi59YCBibG9jayByYXRoZXIgdGhhbiBhbiBgeyNpZiAuLi59YCwgYXMgdGhhdCBhZmZlY3RzIHdoaWNoIHRyYW5zaXRpb25zIGFyZSBjb25zaWRlcmVkICdsb2NhbCdcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaWZfYmxvY2sobm9kZSwgZm4sIGVsc2VpZiA9IGZhbHNlKSB7XG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0fVxuXG5cdHZhciBicmFuY2hlcyA9IG5ldyBCcmFuY2hNYW5hZ2VyKG5vZGUpO1xuXHR2YXIgZmxhZ3MgPSBlbHNlaWYgPyBFRkZFQ1RfVFJBTlNQQVJFTlQgOiAwO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge251bWJlciB8IGZhbHNlfSBrZXlcblx0ICogQHBhcmFtIHtudWxsIHwgKChhbmNob3I6IE5vZGUpID0+IHZvaWQpfSBmblxuXHQgKi9cblx0ZnVuY3Rpb24gdXBkYXRlX2JyYW5jaChrZXksIGZuKSB7XG5cdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0Y29uc3QgZGF0YSA9IHJlYWRfaHlkcmF0aW9uX2luc3RydWN0aW9uKG5vZGUpO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHtudW1iZXIgfCBmYWxzZX1cblx0XHRcdCAqIFwiW1wiID0gYnJhbmNoIDAsIFwiWzFcIiA9IGJyYW5jaCAxLCBcIlsyXCIgPSBicmFuY2ggMiwgLi4uLCBcIlshXCIgPSBlbHNlIChmYWxzZSlcblx0XHRcdCAqL1xuXHRcdFx0dmFyIGh5ZHJhdGVkX2tleTtcblxuXHRcdFx0aWYgKGRhdGEgPT09IEhZRFJBVElPTl9TVEFSVCkge1xuXHRcdFx0XHRoeWRyYXRlZF9rZXkgPSAwO1xuXHRcdFx0fSBlbHNlIGlmIChkYXRhID09PSBIWURSQVRJT05fU1RBUlRfRUxTRSkge1xuXHRcdFx0XHRoeWRyYXRlZF9rZXkgPSBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGh5ZHJhdGVkX2tleSA9IHBhcnNlSW50KGRhdGEuc3Vic3RyaW5nKDEpKTsgLy8gXCJbMVwiLCBcIlsyXCIsIGV0Yy5cblx0XHRcdH1cblxuXHRcdFx0aWYgKGtleSAhPT0gaHlkcmF0ZWRfa2V5KSB7XG5cdFx0XHRcdC8vIEh5ZHJhdGlvbiBtaXNtYXRjaDogcmVtb3ZlIGV2ZXJ5dGhpbmcgaW5zaWRlIHRoZSBhbmNob3IgYW5kIHN0YXJ0IGZyZXNoLlxuXHRcdFx0XHQvLyBUaGlzIGNvdWxkIGhhcHBlbiB3aXRoIGB7I2lmIGJyb3dzZXJ9Li4uey9pZn1gLCBmb3IgZXhhbXBsZVxuXHRcdFx0XHR2YXIgYW5jaG9yID0gc2tpcF9ub2RlcygpO1xuXG5cdFx0XHRcdHNldF9oeWRyYXRlX25vZGUoYW5jaG9yKTtcblx0XHRcdFx0YnJhbmNoZXMuYW5jaG9yID0gYW5jaG9yO1xuXG5cdFx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdFx0XHRicmFuY2hlcy5lbnN1cmUoa2V5LCBmbik7XG5cdFx0XHRcdHNldF9oeWRyYXRpbmcodHJ1ZSk7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJyYW5jaGVzLmVuc3VyZShrZXksIGZuKTtcblx0fVxuXG5cdGJsb2NrKCgpID0+IHtcblx0XHR2YXIgaGFzX2JyYW5jaCA9IGZhbHNlO1xuXG5cdFx0Zm4oKGZuLCBrZXkgPSAwKSA9PiB7XG5cdFx0XHRoYXNfYnJhbmNoID0gdHJ1ZTtcblx0XHRcdHVwZGF0ZV9icmFuY2goa2V5LCBmbik7XG5cdFx0fSk7XG5cblx0XHRpZiAoIWhhc19icmFuY2gpIHtcblx0XHRcdHVwZGF0ZV9icmFuY2goZmFsc2UsIG51bGwpO1xuXHRcdH1cblx0fSwgZmxhZ3MpO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBFYWNoSXRlbSwgRWFjaE91dHJvR3JvdXAsIEVhY2hTdGF0ZSwgRWZmZWN0LCBFZmZlY3ROb2RlcywgTWF5YmVTb3VyY2UsIFNvdXJjZSwgVGVtcGxhdGVOb2RlLCBUcmFuc2l0aW9uTWFuYWdlciwgVmFsdWUgfSBmcm9tICcjY2xpZW50JyAqL1xuLyoqIEBpbXBvcnQgeyBCYXRjaCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvYmF0Y2guanMnOyAqL1xuaW1wb3J0IHtcblx0RUFDSF9JTkRFWF9SRUFDVElWRSxcblx0RUFDSF9JU19BTklNQVRFRCxcblx0RUFDSF9JU19DT05UUk9MTEVELFxuXHRFQUNIX0lURU1fSU1NVVRBQkxFLFxuXHRFQUNIX0lURU1fUkVBQ1RJVkUsXG5cdEhZRFJBVElPTl9FTkQsXG5cdEhZRFJBVElPTl9TVEFSVF9FTFNFXG59IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQge1xuXHRoeWRyYXRlX25leHQsXG5cdGh5ZHJhdGVfbm9kZSxcblx0aHlkcmF0aW5nLFxuXHRyZWFkX2h5ZHJhdGlvbl9pbnN0cnVjdGlvbixcblx0c2tpcF9ub2Rlcyxcblx0c2V0X2h5ZHJhdGVfbm9kZSxcblx0c2V0X2h5ZHJhdGluZ1xufSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHtcblx0Y2xlYXJfdGV4dF9jb250ZW50LFxuXHRjcmVhdGVfdGV4dCxcblx0Z2V0X2ZpcnN0X2NoaWxkLFxuXHRnZXRfbmV4dF9zaWJsaW5nLFxuXHRzaG91bGRfZGVmZXJfYXBwZW5kXG59IGZyb20gJy4uL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHtcblx0YmxvY2ssXG5cdGJyYW5jaCxcblx0ZGVzdHJveV9lZmZlY3QsXG5cdHBhdXNlX2VmZmVjdCxcblx0cmVzdW1lX2VmZmVjdFxufSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgc291cmNlLCBtdXRhYmxlX3NvdXJjZSwgaW50ZXJuYWxfc2V0IH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9zb3VyY2VzLmpzJztcbmltcG9ydCB7IGFycmF5X2Zyb20sIGlzX2FycmF5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IEJSQU5DSF9FRkZFQ1QsIENPTU1FTlRfTk9ERSwgRUZGRUNUX09GRlNDUkVFTiwgSU5FUlQgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vdGFzay5qcyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgZGVyaXZlZF9zYWZlX2VxdWFsIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9kZXJpdmVkcy5qcyc7XG5pbXBvcnQgeyBjdXJyZW50X2JhdGNoIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4uLy4uL2Vycm9ycy5qcyc7XG5cbi8vIFdoZW4gbWFraW5nIHN1YnN0YW50aXZlIGNoYW5nZXMgdG8gdGhpcyBmaWxlLCB2YWxpZGF0ZSB0aGVtIHdpdGggdGhlIGVhY2ggYmxvY2sgc3RyZXNzIHRlc3Q6XG4vLyBodHRwczovL3N2ZWx0ZS5kZXYvcGxheWdyb3VuZC8xOTcyYjJjZjQ2NTY0NDc2YWQ4YzhjNjQwNWIyM2I3YlxuLy8gVGhpcyB0ZXN0IGFsc28gZXhpc3RzIGluIHRoaXMgcmVwbywgYXMgYHBhY2thZ2VzL3N2ZWx0ZS90ZXN0cy9tYW51YWwvZWFjaC1zdHJlc3MtdGVzdGBcblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gX1xuICogQHBhcmFtIHtudW1iZXJ9IGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4KF8sIGkpIHtcblx0cmV0dXJuIGk7XG59XG5cbi8qKlxuICogUGF1c2UgbXVsdGlwbGUgZWZmZWN0cyBzaW11bHRhbmVvdXNseSwgYW5kIGNvb3JkaW5hdGUgdGhlaXJcbiAqIHN1YnNlcXVlbnQgZGVzdHJ1Y3Rpb24uIFVzZWQgaW4gZWFjaCBibG9ja3NcbiAqIEBwYXJhbSB7RWFjaFN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtFZmZlY3RbXX0gdG9fZGVzdHJveVxuICogQHBhcmFtIHtudWxsIHwgTm9kZX0gY29udHJvbGxlZF9hbmNob3JcbiAqL1xuZnVuY3Rpb24gcGF1c2VfZWZmZWN0cyhzdGF0ZSwgdG9fZGVzdHJveSwgY29udHJvbGxlZF9hbmNob3IpIHtcblx0LyoqIEB0eXBlIHtUcmFuc2l0aW9uTWFuYWdlcltdfSAqL1xuXHR2YXIgdHJhbnNpdGlvbnMgPSBbXTtcblx0dmFyIGxlbmd0aCA9IHRvX2Rlc3Ryb3kubGVuZ3RoO1xuXG5cdC8qKiBAdHlwZSB7RWFjaE91dHJvR3JvdXB9ICovXG5cdHZhciBncm91cDtcblx0dmFyIHJlbWFpbmluZyA9IHRvX2Rlc3Ryb3kubGVuZ3RoO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgZWZmZWN0ID0gdG9fZGVzdHJveVtpXTtcblxuXHRcdHBhdXNlX2VmZmVjdChcblx0XHRcdGVmZmVjdCxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0aWYgKGdyb3VwKSB7XG5cdFx0XHRcdFx0Z3JvdXAucGVuZGluZy5kZWxldGUoZWZmZWN0KTtcblx0XHRcdFx0XHRncm91cC5kb25lLmFkZChlZmZlY3QpO1xuXG5cdFx0XHRcdFx0aWYgKGdyb3VwLnBlbmRpbmcuc2l6ZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0dmFyIGdyb3VwcyA9IC8qKiBAdHlwZSB7U2V0PEVhY2hPdXRyb0dyb3VwPn0gKi8gKHN0YXRlLm91dHJvZ3JvdXBzKTtcblxuXHRcdFx0XHRcdFx0ZGVzdHJveV9lZmZlY3RzKGFycmF5X2Zyb20oZ3JvdXAuZG9uZSkpO1xuXHRcdFx0XHRcdFx0Z3JvdXBzLmRlbGV0ZShncm91cCk7XG5cblx0XHRcdFx0XHRcdGlmIChncm91cHMuc2l6ZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRzdGF0ZS5vdXRyb2dyb3VwcyA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlbWFpbmluZyAtPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZmFsc2Vcblx0XHQpO1xuXHR9XG5cblx0aWYgKHJlbWFpbmluZyA9PT0gMCkge1xuXHRcdC8vIElmIHdlJ3JlIGluIGEgY29udHJvbGxlZCBlYWNoIGJsb2NrIChpLmUuIHRoZSBibG9jayBpcyB0aGUgb25seSBjaGlsZCBvZiBhblxuXHRcdC8vIGVsZW1lbnQpLCBhbmQgd2UgYXJlIHJlbW92aW5nIGFsbCBpdGVtcywgX2FuZF8gdGhlcmUgYXJlIG5vIG91dCB0cmFuc2l0aW9ucyxcblx0XHQvLyB3ZSBjYW4gdXNlIHRoZSBmYXN0IHBhdGgg4oCUIGVtcHR5aW5nIHRoZSBlbGVtZW50IGFuZCByZXBsYWNpbmcgdGhlIGFuY2hvclxuXHRcdHZhciBmYXN0X3BhdGggPSB0cmFuc2l0aW9ucy5sZW5ndGggPT09IDAgJiYgY29udHJvbGxlZF9hbmNob3IgIT09IG51bGw7XG5cblx0XHRpZiAoZmFzdF9wYXRoKSB7XG5cdFx0XHR2YXIgYW5jaG9yID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoY29udHJvbGxlZF9hbmNob3IpO1xuXHRcdFx0dmFyIHBhcmVudF9ub2RlID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoYW5jaG9yLnBhcmVudE5vZGUpO1xuXG5cdFx0XHRjbGVhcl90ZXh0X2NvbnRlbnQocGFyZW50X25vZGUpO1xuXHRcdFx0cGFyZW50X25vZGUuYXBwZW5kKGFuY2hvcik7XG5cblx0XHRcdHN0YXRlLml0ZW1zLmNsZWFyKCk7XG5cdFx0fVxuXG5cdFx0ZGVzdHJveV9lZmZlY3RzKHRvX2Rlc3Ryb3ksICFmYXN0X3BhdGgpO1xuXHR9IGVsc2Uge1xuXHRcdGdyb3VwID0ge1xuXHRcdFx0cGVuZGluZzogbmV3IFNldCh0b19kZXN0cm95KSxcblx0XHRcdGRvbmU6IG5ldyBTZXQoKVxuXHRcdH07XG5cblx0XHQoc3RhdGUub3V0cm9ncm91cHMgPz89IG5ldyBTZXQoKSkuYWRkKGdyb3VwKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWZmZWN0W119IHRvX2Rlc3Ryb3lcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVtb3ZlX2RvbVxuICovXG5mdW5jdGlvbiBkZXN0cm95X2VmZmVjdHModG9fZGVzdHJveSwgcmVtb3ZlX2RvbSA9IHRydWUpIHtcblx0Ly8gVE9ETyBvbmx5IGRlc3Ryb3kgZWZmZWN0cyBpZiBubyBwZW5kaW5nIGJhdGNoIG5lZWRzIHRoZW0uIG90aGVyd2lzZSxcblx0Ly8ganVzdCByZS1hZGQgdGhlIGBFRkZFQ1RfT0ZGU0NSRUVOYCBmbGFnXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdG9fZGVzdHJveS5sZW5ndGg7IGkrKykge1xuXHRcdGRlc3Ryb3lfZWZmZWN0KHRvX2Rlc3Ryb3lbaV0sIHJlbW92ZV9kb20pO1xuXHR9XG59XG5cbi8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqL1xudmFyIG9mZnNjcmVlbl9hbmNob3I7XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7RWxlbWVudCB8IENvbW1lbnR9IG5vZGUgVGhlIG5leHQgc2libGluZyBub2RlLCBvciB0aGUgcGFyZW50IG5vZGUgaWYgdGhpcyBpcyBhICdjb250cm9sbGVkJyBibG9ja1xuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKiBAcGFyYW0geygpID0+IFZbXX0gZ2V0X2NvbGxlY3Rpb25cbiAqIEBwYXJhbSB7KHZhbHVlOiBWLCBpbmRleDogbnVtYmVyKSA9PiBhbnl9IGdldF9rZXlcbiAqIEBwYXJhbSB7KGFuY2hvcjogTm9kZSwgaXRlbTogTWF5YmVTb3VyY2U8Vj4sIGluZGV4OiBNYXliZVNvdXJjZTxudW1iZXI+KSA9PiB2b2lkfSByZW5kZXJfZm5cbiAqIEBwYXJhbSB7bnVsbCB8ICgoYW5jaG9yOiBOb2RlKSA9PiB2b2lkKX0gZmFsbGJhY2tfZm5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWFjaChub2RlLCBmbGFncywgZ2V0X2NvbGxlY3Rpb24sIGdldF9rZXksIHJlbmRlcl9mbiwgZmFsbGJhY2tfZm4gPSBudWxsKSB7XG5cdHZhciBhbmNob3IgPSBub2RlO1xuXG5cdC8qKiBAdHlwZSB7TWFwPGFueSwgRWFjaEl0ZW0+fSAqL1xuXHR2YXIgaXRlbXMgPSBuZXcgTWFwKCk7XG5cblx0dmFyIGlzX2NvbnRyb2xsZWQgPSAoZmxhZ3MgJiBFQUNIX0lTX0NPTlRST0xMRUQpICE9PSAwO1xuXG5cdGlmIChpc19jb250cm9sbGVkKSB7XG5cdFx0dmFyIHBhcmVudF9ub2RlID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAobm9kZSk7XG5cblx0XHRhbmNob3IgPSBoeWRyYXRpbmdcblx0XHRcdD8gc2V0X2h5ZHJhdGVfbm9kZShnZXRfZmlyc3RfY2hpbGQocGFyZW50X25vZGUpKVxuXHRcdFx0OiBwYXJlbnRfbm9kZS5hcHBlbmRDaGlsZChjcmVhdGVfdGV4dCgpKTtcblx0fVxuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0fVxuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi9cblx0dmFyIGZhbGxiYWNrID0gbnVsbDtcblxuXHQvLyBUT0RPOiBpZGVhbGx5IHdlIGNvdWxkIHVzZSBkZXJpdmVkIGZvciBydW5lcyBtb2RlIGJ1dCBiZWNhdXNlIG9mIHRoZSBhYmlsaXR5XG5cdC8vIHRvIHVzZSBhIHN0b3JlIHdoaWNoIGNhbiBiZSBtdXRhdGVkLCB3ZSBjYW4ndCBkbyB0aGF0IGhlcmUgYXMgbXV0YXRpbmcgYSBzdG9yZVxuXHQvLyB3aWxsIHN0aWxsIHJlc3VsdCBpbiB0aGUgY29sbGVjdGlvbiBhcnJheSBiZWluZyB0aGUgc2FtZSBmcm9tIHRoZSBzdG9yZVxuXHR2YXIgZWFjaF9hcnJheSA9IGRlcml2ZWRfc2FmZV9lcXVhbCgoKSA9PiB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBnZXRfY29sbGVjdGlvbigpO1xuXG5cdFx0cmV0dXJuIGlzX2FycmF5KGNvbGxlY3Rpb24pID8gY29sbGVjdGlvbiA6IGNvbGxlY3Rpb24gPT0gbnVsbCA/IFtdIDogYXJyYXlfZnJvbShjb2xsZWN0aW9uKTtcblx0fSk7XG5cblx0LyoqIEB0eXBlIHtWW119ICovXG5cdHZhciBhcnJheTtcblxuXHR2YXIgZmlyc3RfcnVuID0gdHJ1ZTtcblxuXHRmdW5jdGlvbiBjb21taXQoKSB7XG5cdFx0c3RhdGUuZmFsbGJhY2sgPSBmYWxsYmFjaztcblx0XHRyZWNvbmNpbGUoc3RhdGUsIGFycmF5LCBhbmNob3IsIGZsYWdzLCBnZXRfa2V5KTtcblxuXHRcdGlmIChmYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0aWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRpZiAoKGZhbGxiYWNrLmYgJiBFRkZFQ1RfT0ZGU0NSRUVOKSA9PT0gMCkge1xuXHRcdFx0XHRcdHJlc3VtZV9lZmZlY3QoZmFsbGJhY2spO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZhbGxiYWNrLmYgXj0gRUZGRUNUX09GRlNDUkVFTjtcblx0XHRcdFx0XHRtb3ZlKGZhbGxiYWNrLCBudWxsLCBhbmNob3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXVzZV9lZmZlY3QoZmFsbGJhY2ssICgpID0+IHtcblx0XHRcdFx0XHQvLyBUT0RPIG9ubHkgbnVsbCBvdXQgaWYgbm8gcGVuZGluZyBiYXRjaCBuZWVkcyBpdCxcblx0XHRcdFx0XHQvLyBvdGhlcndpc2UgcmUtYWRkIGBmYWxsYmFjay5mcmFnbWVudGAgYW5kIG1vdmUgdGhlXG5cdFx0XHRcdFx0Ly8gZWZmZWN0IGludG8gaXRcblx0XHRcdFx0XHRmYWxsYmFjayA9IG51bGw7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHZhciBlZmZlY3QgPSBibG9jaygoKSA9PiB7XG5cdFx0YXJyYXkgPSAvKiogQHR5cGUge1ZbXX0gKi8gKGdldChlYWNoX2FycmF5KSk7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdC8qKiBgdHJ1ZWAgaWYgdGhlcmUgd2FzIGEgaHlkcmF0aW9uIG1pc21hdGNoLiBOZWVkcyB0byBiZSBhIGBsZXRgIG9yIGVsc2UgaXQgaXNuJ3QgdHJlZXNoYWtlbiBvdXQgKi9cblx0XHRsZXQgbWlzbWF0Y2ggPSBmYWxzZTtcblxuXHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdHZhciBpc19lbHNlID0gcmVhZF9oeWRyYXRpb25faW5zdHJ1Y3Rpb24oYW5jaG9yKSA9PT0gSFlEUkFUSU9OX1NUQVJUX0VMU0U7XG5cblx0XHRcdGlmIChpc19lbHNlICE9PSAobGVuZ3RoID09PSAwKSkge1xuXHRcdFx0XHQvLyBoeWRyYXRpb24gbWlzbWF0Y2gg4oCUIHJlbW92ZSB0aGUgc2VydmVyLXJlbmRlcmVkIERPTSBhbmQgc3RhcnQgb3ZlclxuXHRcdFx0XHRhbmNob3IgPSBza2lwX25vZGVzKCk7XG5cblx0XHRcdFx0c2V0X2h5ZHJhdGVfbm9kZShhbmNob3IpO1xuXHRcdFx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblx0XHRcdFx0bWlzbWF0Y2ggPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBrZXlzID0gbmV3IFNldCgpO1xuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblx0XHR2YXIgZGVmZXIgPSBzaG91bGRfZGVmZXJfYXBwZW5kKCk7XG5cblx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGh5ZHJhdGluZyAmJlxuXHRcdFx0XHRoeWRyYXRlX25vZGUubm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSAmJlxuXHRcdFx0XHQvKiogQHR5cGUge0NvbW1lbnR9ICovIChoeWRyYXRlX25vZGUpLmRhdGEgPT09IEhZRFJBVElPTl9FTkRcblx0XHRcdCkge1xuXHRcdFx0XHQvLyBUaGUgc2VydmVyIHJlbmRlcmVkIGZld2VyIGl0ZW1zIHRoYW4gZXhwZWN0ZWQsXG5cdFx0XHRcdC8vIHNvIGJyZWFrIG91dCBhbmQgY29udGludWUgYXBwZW5kaW5nIG5vbi1oeWRyYXRlZCBpdGVtc1xuXHRcdFx0XHRhbmNob3IgPSAvKiogQHR5cGUge0NvbW1lbnR9ICovIChoeWRyYXRlX25vZGUpO1xuXHRcdFx0XHRtaXNtYXRjaCA9IHRydWU7XG5cdFx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cdFx0XHR2YXIga2V5ID0gZ2V0X2tleSh2YWx1ZSwgaW5kZXgpO1xuXG5cdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdC8vIENoZWNrIHRoYXQgdGhlIGtleSBmdW5jdGlvbiBpcyBpZGVtcG90ZW50IChyZXR1cm5zIHRoZSBzYW1lIHZhbHVlIHdoZW4gY2FsbGVkIHR3aWNlKVxuXHRcdFx0XHR2YXIga2V5X2FnYWluID0gZ2V0X2tleSh2YWx1ZSwgaW5kZXgpO1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBrZXlfYWdhaW4pIHtcblx0XHRcdFx0XHRlLmVhY2hfa2V5X3ZvbGF0aWxlKFN0cmluZyhpbmRleCksIFN0cmluZyhrZXkpLCBTdHJpbmcoa2V5X2FnYWluKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIGl0ZW0gPSBmaXJzdF9ydW4gPyBudWxsIDogaXRlbXMuZ2V0KGtleSk7XG5cblx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdC8vIHVwZGF0ZSBiZWZvcmUgcmVjb25jaWxpYXRpb24sIHRvIHRyaWdnZXIgYW55IGFzeW5jIHVwZGF0ZXNcblx0XHRcdFx0aWYgKGl0ZW0udikgaW50ZXJuYWxfc2V0KGl0ZW0udiwgdmFsdWUpO1xuXHRcdFx0XHRpZiAoaXRlbS5pKSBpbnRlcm5hbF9zZXQoaXRlbS5pLCBpbmRleCk7XG5cblx0XHRcdFx0aWYgKGRlZmVyKSB7XG5cdFx0XHRcdFx0YmF0Y2gudW5za2lwX2VmZmVjdChpdGVtLmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpdGVtID0gY3JlYXRlX2l0ZW0oXG5cdFx0XHRcdFx0aXRlbXMsXG5cdFx0XHRcdFx0Zmlyc3RfcnVuID8gYW5jaG9yIDogKG9mZnNjcmVlbl9hbmNob3IgPz89IGNyZWF0ZV90ZXh0KCkpLFxuXHRcdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRcdGtleSxcblx0XHRcdFx0XHRpbmRleCxcblx0XHRcdFx0XHRyZW5kZXJfZm4sXG5cdFx0XHRcdFx0ZmxhZ3MsXG5cdFx0XHRcdFx0Z2V0X2NvbGxlY3Rpb25cblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoIWZpcnN0X3J1bikge1xuXHRcdFx0XHRcdGl0ZW0uZS5mIHw9IEVGRkVDVF9PRkZTQ1JFRU47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpdGVtcy5zZXQoa2V5LCBpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0a2V5cy5hZGQoa2V5KTtcblx0XHR9XG5cblx0XHRpZiAobGVuZ3RoID09PSAwICYmIGZhbGxiYWNrX2ZuICYmICFmYWxsYmFjaykge1xuXHRcdFx0aWYgKGZpcnN0X3J1bikge1xuXHRcdFx0XHRmYWxsYmFjayA9IGJyYW5jaCgoKSA9PiBmYWxsYmFja19mbihhbmNob3IpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZhbGxiYWNrID0gYnJhbmNoKCgpID0+IGZhbGxiYWNrX2ZuKChvZmZzY3JlZW5fYW5jaG9yID8/PSBjcmVhdGVfdGV4dCgpKSkpO1xuXHRcdFx0XHRmYWxsYmFjay5mIHw9IEVGRkVDVF9PRkZTQ1JFRU47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGxlbmd0aCA+IGtleXMuc2l6ZSkge1xuXHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHR2YWxpZGF0ZV9lYWNoX2tleXMoYXJyYXksIGdldF9rZXkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gaW4gcHJvZCwgdGhlIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gaXNuJ3QgcHJpbnRlZCwgc28gZG9uJ3QgYm90aGVyIGNvbXB1dGluZyBpdFxuXHRcdFx0XHRlLmVhY2hfa2V5X2R1cGxpY2F0ZSgnJywgJycsICcnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyByZW1vdmUgZXhjZXNzIG5vZGVzXG5cdFx0aWYgKGh5ZHJhdGluZyAmJiBsZW5ndGggPiAwKSB7XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKHNraXBfbm9kZXMoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFmaXJzdF9ydW4pIHtcblx0XHRcdGlmIChkZWZlcikge1xuXHRcdFx0XHRmb3IgKGNvbnN0IFtrZXksIGl0ZW1dIG9mIGl0ZW1zKSB7XG5cdFx0XHRcdFx0aWYgKCFrZXlzLmhhcyhrZXkpKSB7XG5cdFx0XHRcdFx0XHRiYXRjaC5za2lwX2VmZmVjdChpdGVtLmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhdGNoLm9uY29tbWl0KGNvbW1pdCk7XG5cdFx0XHRcdGJhdGNoLm9uZGlzY2FyZCgoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gVE9ETyBwcmVzdW1hYmx5IHdlIG5lZWQgdG8gZG8gc29tZXRoaW5nIGhlcmU/XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29tbWl0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG1pc21hdGNoKSB7XG5cdFx0XHQvLyBjb250aW51ZSBpbiBoeWRyYXRpb24gbW9kZVxuXHRcdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBXaGVuIHdlIG1vdW50IHRoZSBlYWNoIGJsb2NrIGZvciB0aGUgZmlyc3QgdGltZSwgdGhlIGNvbGxlY3Rpb24gd29uJ3QgYmVcblx0XHQvLyBjb25uZWN0ZWQgdG8gdGhpcyBlZmZlY3QgYXMgdGhlIGVmZmVjdCBoYXNuJ3QgZmluaXNoZWQgcnVubmluZyB5ZXQgYW5kIGl0cyBkZXBzXG5cdFx0Ly8gd29uJ3QgYmUgYXNzaWduZWQuIEhvd2V2ZXIsIGl0J3MgcG9zc2libGUgdGhhdCB3aGVuIHJlY29uY2lsaW5nIHRoZSBlYWNoIGJsb2NrXG5cdFx0Ly8gdGhhdCBhIG11dGF0aW9uIG9jY3VycmVkIGFuZCBpdCdzIG1hZGUgdGhlIGNvbGxlY3Rpb24gTUFZQkVfRElSVFksIHNvIHJlYWRpbmcgdGhlXG5cdFx0Ly8gY29sbGVjdGlvbiBhZ2FpbiBjYW4gcHJvdmlkZSBjb25zaXN0ZW5jeSB0byB0aGUgcmVhY3RpdmUgZ3JhcGggYWdhaW4gYXMgdGhlIGRlcml2ZWRzXG5cdFx0Ly8gd2lsbCBub3cgYmUgYENMRUFOYC5cblx0XHRnZXQoZWFjaF9hcnJheSk7XG5cdH0pO1xuXG5cdC8qKiBAdHlwZSB7RWFjaFN0YXRlfSAqL1xuXHR2YXIgc3RhdGUgPSB7IGVmZmVjdCwgZmxhZ3MsIGl0ZW1zLCBvdXRyb2dyb3VwczogbnVsbCwgZmFsbGJhY2sgfTtcblxuXHRmaXJzdF9ydW4gPSBmYWxzZTtcblxuXHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0YW5jaG9yID0gaHlkcmF0ZV9ub2RlO1xuXHR9XG59XG5cbi8qKlxuICogU2tpcCBwYXN0IGFueSBub24tYnJhbmNoIGVmZmVjdHMgKHdoaWNoIGNvdWxkIGJlIGNyZWF0ZWQgd2l0aCBgY3JlYXRlU3Vic2NyaWJlcmAsIGZvciBleGFtcGxlKSB0byBmaW5kIHRoZSBuZXh0IGJyYW5jaCBlZmZlY3RcbiAqIEBwYXJhbSB7RWZmZWN0IHwgbnVsbH0gZWZmZWN0XG4gKiBAcmV0dXJucyB7RWZmZWN0IHwgbnVsbH1cbiAqL1xuZnVuY3Rpb24gc2tpcF90b19icmFuY2goZWZmZWN0KSB7XG5cdHdoaWxlIChlZmZlY3QgIT09IG51bGwgJiYgKGVmZmVjdC5mICYgQlJBTkNIX0VGRkVDVCkgPT09IDApIHtcblx0XHRlZmZlY3QgPSBlZmZlY3QubmV4dDtcblx0fVxuXHRyZXR1cm4gZWZmZWN0O1xufVxuXG4vKipcbiAqIEFkZCwgcmVtb3ZlLCBvciByZW9yZGVyIGl0ZW1zIG91dHB1dCBieSBhbiBlYWNoIGJsb2NrIGFzIGl0cyBpbnB1dCBjaGFuZ2VzXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtFYWNoU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge0FycmF5PFY+fSBhcnJheVxuICogQHBhcmFtIHtFbGVtZW50IHwgQ29tbWVudCB8IFRleHR9IGFuY2hvclxuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKiBAcGFyYW0geyh2YWx1ZTogViwgaW5kZXg6IG51bWJlcikgPT4gYW55fSBnZXRfa2V5XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVjb25jaWxlKHN0YXRlLCBhcnJheSwgYW5jaG9yLCBmbGFncywgZ2V0X2tleSkge1xuXHR2YXIgaXNfYW5pbWF0ZWQgPSAoZmxhZ3MgJiBFQUNIX0lTX0FOSU1BVEVEKSAhPT0gMDtcblxuXHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHR2YXIgaXRlbXMgPSBzdGF0ZS5pdGVtcztcblx0dmFyIGN1cnJlbnQgPSBza2lwX3RvX2JyYW5jaChzdGF0ZS5lZmZlY3QuZmlyc3QpO1xuXG5cdC8qKiBAdHlwZSB7dW5kZWZpbmVkIHwgU2V0PEVmZmVjdD59ICovXG5cdHZhciBzZWVuO1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi9cblx0dmFyIHByZXYgPSBudWxsO1xuXG5cdC8qKiBAdHlwZSB7dW5kZWZpbmVkIHwgU2V0PEVmZmVjdD59ICovXG5cdHZhciB0b19hbmltYXRlO1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0W119ICovXG5cdHZhciBtYXRjaGVkID0gW107XG5cblx0LyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cblx0dmFyIHN0YXNoZWQgPSBbXTtcblxuXHQvKiogQHR5cGUge1Z9ICovXG5cdHZhciB2YWx1ZTtcblxuXHQvKiogQHR5cGUge2FueX0gKi9cblx0dmFyIGtleTtcblxuXHQvKiogQHR5cGUge0VmZmVjdCB8IHVuZGVmaW5lZH0gKi9cblx0dmFyIGVmZmVjdDtcblxuXHQvKiogQHR5cGUge251bWJlcn0gKi9cblx0dmFyIGk7XG5cblx0aWYgKGlzX2FuaW1hdGVkKSB7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR2YWx1ZSA9IGFycmF5W2ldO1xuXHRcdFx0a2V5ID0gZ2V0X2tleSh2YWx1ZSwgaSk7XG5cdFx0XHRlZmZlY3QgPSAvKiogQHR5cGUge0VhY2hJdGVtfSAqLyAoaXRlbXMuZ2V0KGtleSkpLmU7XG5cblx0XHRcdC8vIG9mZnNjcmVlbiA9PSBjb21pbmcgaW4gbm93LCBubyBhbmltYXRpb24gaW4gdGhhdCBjYXNlLFxuXHRcdFx0Ly8gZWxzZSB0aGlzIHdvdWxkIGhhcHBlbiBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy8xNzE4MVxuXHRcdFx0aWYgKChlZmZlY3QuZiAmIEVGRkVDVF9PRkZTQ1JFRU4pID09PSAwKSB7XG5cdFx0XHRcdGVmZmVjdC5ub2Rlcz8uYT8ubWVhc3VyZSgpO1xuXHRcdFx0XHQodG9fYW5pbWF0ZSA/Pz0gbmV3IFNldCgpKS5hZGQoZWZmZWN0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YWx1ZSA9IGFycmF5W2ldO1xuXHRcdGtleSA9IGdldF9rZXkodmFsdWUsIGkpO1xuXG5cdFx0ZWZmZWN0ID0gLyoqIEB0eXBlIHtFYWNoSXRlbX0gKi8gKGl0ZW1zLmdldChrZXkpKS5lO1xuXG5cdFx0aWYgKHN0YXRlLm91dHJvZ3JvdXBzICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGdyb3VwIG9mIHN0YXRlLm91dHJvZ3JvdXBzKSB7XG5cdFx0XHRcdGdyb3VwLnBlbmRpbmcuZGVsZXRlKGVmZmVjdCk7XG5cdFx0XHRcdGdyb3VwLmRvbmUuZGVsZXRlKGVmZmVjdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKChlZmZlY3QuZiAmIEVGRkVDVF9PRkZTQ1JFRU4pICE9PSAwKSB7XG5cdFx0XHRlZmZlY3QuZiBePSBFRkZFQ1RfT0ZGU0NSRUVOO1xuXG5cdFx0XHRpZiAoZWZmZWN0ID09PSBjdXJyZW50KSB7XG5cdFx0XHRcdG1vdmUoZWZmZWN0LCBudWxsLCBhbmNob3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIG5leHQgPSBwcmV2ID8gcHJldi5uZXh0IDogY3VycmVudDtcblxuXHRcdFx0XHRpZiAoZWZmZWN0ID09PSBzdGF0ZS5lZmZlY3QubGFzdCkge1xuXHRcdFx0XHRcdHN0YXRlLmVmZmVjdC5sYXN0ID0gZWZmZWN0LnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZWZmZWN0LnByZXYpIGVmZmVjdC5wcmV2Lm5leHQgPSBlZmZlY3QubmV4dDtcblx0XHRcdFx0aWYgKGVmZmVjdC5uZXh0KSBlZmZlY3QubmV4dC5wcmV2ID0gZWZmZWN0LnByZXY7XG5cdFx0XHRcdGxpbmsoc3RhdGUsIHByZXYsIGVmZmVjdCk7XG5cdFx0XHRcdGxpbmsoc3RhdGUsIGVmZmVjdCwgbmV4dCk7XG5cblx0XHRcdFx0bW92ZShlZmZlY3QsIG5leHQsIGFuY2hvcik7XG5cdFx0XHRcdHByZXYgPSBlZmZlY3Q7XG5cblx0XHRcdFx0bWF0Y2hlZCA9IFtdO1xuXHRcdFx0XHRzdGFzaGVkID0gW107XG5cblx0XHRcdFx0Y3VycmVudCA9IHNraXBfdG9fYnJhbmNoKHByZXYubmV4dCk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgoZWZmZWN0LmYgJiBJTkVSVCkgIT09IDApIHtcblx0XHRcdHJlc3VtZV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdGlmIChpc19hbmltYXRlZCkge1xuXHRcdFx0XHRlZmZlY3Qubm9kZXM/LmE/LnVuZml4KCk7XG5cdFx0XHRcdCh0b19hbmltYXRlID8/PSBuZXcgU2V0KCkpLmRlbGV0ZShlZmZlY3QpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChlZmZlY3QgIT09IGN1cnJlbnQpIHtcblx0XHRcdGlmIChzZWVuICE9PSB1bmRlZmluZWQgJiYgc2Vlbi5oYXMoZWZmZWN0KSkge1xuXHRcdFx0XHRpZiAobWF0Y2hlZC5sZW5ndGggPCBzdGFzaGVkLmxlbmd0aCkge1xuXHRcdFx0XHRcdC8vIG1vcmUgZWZmaWNpZW50IHRvIG1vdmUgbGF0ZXIgaXRlbXMgdG8gdGhlIGZyb250XG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gc3Rhc2hlZFswXTtcblx0XHRcdFx0XHR2YXIgajtcblxuXHRcdFx0XHRcdHByZXYgPSBzdGFydC5wcmV2O1xuXG5cdFx0XHRcdFx0dmFyIGEgPSBtYXRjaGVkWzBdO1xuXHRcdFx0XHRcdHZhciBiID0gbWF0Y2hlZFttYXRjaGVkLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1hdGNoZWQubGVuZ3RoOyBqICs9IDEpIHtcblx0XHRcdFx0XHRcdG1vdmUobWF0Y2hlZFtqXSwgc3RhcnQsIGFuY2hvcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IHN0YXNoZWQubGVuZ3RoOyBqICs9IDEpIHtcblx0XHRcdFx0XHRcdHNlZW4uZGVsZXRlKHN0YXNoZWRbal0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIGEucHJldiwgYi5uZXh0KTtcblx0XHRcdFx0XHRsaW5rKHN0YXRlLCBwcmV2LCBhKTtcblx0XHRcdFx0XHRsaW5rKHN0YXRlLCBiLCBzdGFydCk7XG5cblx0XHRcdFx0XHRjdXJyZW50ID0gc3RhcnQ7XG5cdFx0XHRcdFx0cHJldiA9IGI7XG5cdFx0XHRcdFx0aSAtPSAxO1xuXG5cdFx0XHRcdFx0bWF0Y2hlZCA9IFtdO1xuXHRcdFx0XHRcdHN0YXNoZWQgPSBbXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBtb3JlIGVmZmljaWVudCB0byBtb3ZlIGVhcmxpZXIgaXRlbXMgdG8gdGhlIGJhY2tcblx0XHRcdFx0XHRzZWVuLmRlbGV0ZShlZmZlY3QpO1xuXHRcdFx0XHRcdG1vdmUoZWZmZWN0LCBjdXJyZW50LCBhbmNob3IpO1xuXG5cdFx0XHRcdFx0bGluayhzdGF0ZSwgZWZmZWN0LnByZXYsIGVmZmVjdC5uZXh0KTtcblx0XHRcdFx0XHRsaW5rKHN0YXRlLCBlZmZlY3QsIHByZXYgPT09IG51bGwgPyBzdGF0ZS5lZmZlY3QuZmlyc3QgOiBwcmV2Lm5leHQpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIHByZXYsIGVmZmVjdCk7XG5cblx0XHRcdFx0XHRwcmV2ID0gZWZmZWN0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG1hdGNoZWQgPSBbXTtcblx0XHRcdHN0YXNoZWQgPSBbXTtcblxuXHRcdFx0d2hpbGUgKGN1cnJlbnQgIT09IG51bGwgJiYgY3VycmVudCAhPT0gZWZmZWN0KSB7XG5cdFx0XHRcdChzZWVuID8/PSBuZXcgU2V0KCkpLmFkZChjdXJyZW50KTtcblx0XHRcdFx0c3Rhc2hlZC5wdXNoKGN1cnJlbnQpO1xuXHRcdFx0XHRjdXJyZW50ID0gc2tpcF90b19icmFuY2goY3VycmVudC5uZXh0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGN1cnJlbnQgPT09IG51bGwpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKChlZmZlY3QuZiAmIEVGRkVDVF9PRkZTQ1JFRU4pID09PSAwKSB7XG5cdFx0XHRtYXRjaGVkLnB1c2goZWZmZWN0KTtcblx0XHR9XG5cblx0XHRwcmV2ID0gZWZmZWN0O1xuXHRcdGN1cnJlbnQgPSBza2lwX3RvX2JyYW5jaChlZmZlY3QubmV4dCk7XG5cdH1cblxuXHRpZiAoc3RhdGUub3V0cm9ncm91cHMgIT09IG51bGwpIHtcblx0XHRmb3IgKGNvbnN0IGdyb3VwIG9mIHN0YXRlLm91dHJvZ3JvdXBzKSB7XG5cdFx0XHRpZiAoZ3JvdXAucGVuZGluZy5zaXplID09PSAwKSB7XG5cdFx0XHRcdGRlc3Ryb3lfZWZmZWN0cyhhcnJheV9mcm9tKGdyb3VwLmRvbmUpKTtcblx0XHRcdFx0c3RhdGUub3V0cm9ncm91cHM/LmRlbGV0ZShncm91cCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLm91dHJvZ3JvdXBzLnNpemUgPT09IDApIHtcblx0XHRcdHN0YXRlLm91dHJvZ3JvdXBzID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRpZiAoY3VycmVudCAhPT0gbnVsbCB8fCBzZWVuICE9PSB1bmRlZmluZWQpIHtcblx0XHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHRcdHZhciB0b19kZXN0cm95ID0gW107XG5cblx0XHRpZiAoc2VlbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRmb3IgKGVmZmVjdCBvZiBzZWVuKSB7XG5cdFx0XHRcdGlmICgoZWZmZWN0LmYgJiBJTkVSVCkgPT09IDApIHtcblx0XHRcdFx0XHR0b19kZXN0cm95LnB1c2goZWZmZWN0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG5cdFx0XHQvLyBJZiB0aGUgZWFjaCBibG9jayBpc24ndCBpbmVydCwgdGhlbiBpbmVydCBlZmZlY3RzIGFyZSBjdXJyZW50bHkgb3V0cm9pbmcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkXG5cdFx0XHRpZiAoKGN1cnJlbnQuZiAmIElORVJUKSA9PT0gMCAmJiBjdXJyZW50ICE9PSBzdGF0ZS5mYWxsYmFjaykge1xuXHRcdFx0XHR0b19kZXN0cm95LnB1c2goY3VycmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnQgPSBza2lwX3RvX2JyYW5jaChjdXJyZW50Lm5leHQpO1xuXHRcdH1cblxuXHRcdHZhciBkZXN0cm95X2xlbmd0aCA9IHRvX2Rlc3Ryb3kubGVuZ3RoO1xuXG5cdFx0aWYgKGRlc3Ryb3lfbGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGNvbnRyb2xsZWRfYW5jaG9yID0gKGZsYWdzICYgRUFDSF9JU19DT05UUk9MTEVEKSAhPT0gMCAmJiBsZW5ndGggPT09IDAgPyBhbmNob3IgOiBudWxsO1xuXG5cdFx0XHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGRlc3Ryb3lfbGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHR0b19kZXN0cm95W2ldLm5vZGVzPy5hPy5tZWFzdXJlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZGVzdHJveV9sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdHRvX2Rlc3Ryb3lbaV0ubm9kZXM/LmE/LmZpeCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHBhdXNlX2VmZmVjdHMoc3RhdGUsIHRvX2Rlc3Ryb3ksIGNvbnRyb2xsZWRfYW5jaG9yKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdGlmICh0b19hbmltYXRlID09PSB1bmRlZmluZWQpIHJldHVybjtcblx0XHRcdGZvciAoZWZmZWN0IG9mIHRvX2FuaW1hdGUpIHtcblx0XHRcdFx0ZWZmZWN0Lm5vZGVzPy5hPy5hcHBseSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7TWFwPGFueSwgRWFjaEl0ZW0+fSBpdGVtc1xuICogQHBhcmFtIHtOb2RlfSBhbmNob3JcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7dW5rbm93bn0ga2V5XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7KGFuY2hvcjogTm9kZSwgaXRlbTogViB8IFNvdXJjZTxWPiwgaW5kZXg6IG51bWJlciB8IFZhbHVlPG51bWJlcj4sIGNvbGxlY3Rpb246ICgpID0+IFZbXSkgPT4gdm9pZH0gcmVuZGVyX2ZuXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7KCkgPT4gVltdfSBnZXRfY29sbGVjdGlvblxuICogQHJldHVybnMge0VhY2hJdGVtfVxuICovXG5mdW5jdGlvbiBjcmVhdGVfaXRlbShpdGVtcywgYW5jaG9yLCB2YWx1ZSwga2V5LCBpbmRleCwgcmVuZGVyX2ZuLCBmbGFncywgZ2V0X2NvbGxlY3Rpb24pIHtcblx0dmFyIHYgPVxuXHRcdChmbGFncyAmIEVBQ0hfSVRFTV9SRUFDVElWRSkgIT09IDBcblx0XHRcdD8gKGZsYWdzICYgRUFDSF9JVEVNX0lNTVVUQUJMRSkgPT09IDBcblx0XHRcdFx0PyBtdXRhYmxlX3NvdXJjZSh2YWx1ZSwgZmFsc2UsIGZhbHNlKVxuXHRcdFx0XHQ6IHNvdXJjZSh2YWx1ZSlcblx0XHRcdDogbnVsbDtcblxuXHR2YXIgaSA9IChmbGFncyAmIEVBQ0hfSU5ERVhfUkVBQ1RJVkUpICE9PSAwID8gc291cmNlKGluZGV4KSA6IG51bGw7XG5cblx0aWYgKERFViAmJiB2KSB7XG5cdFx0Ly8gRm9yIHRyYWNpbmcgcHVycG9zZXMsIHdlIG5lZWQgdG8gbGluayB0aGUgc291cmNlIHNpZ25hbCB3ZSBjcmVhdGUgd2l0aCB0aGVcblx0XHQvLyBjb2xsZWN0aW9uICsgaW5kZXggc28gdGhhdCB0cmFjaW5nIHdvcmtzIGFzIGludGVuZGVkXG5cdFx0di50cmFjZSA9ICgpID0+IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0XHRnZXRfY29sbGVjdGlvbigpW2k/LnYgPz8gaW5kZXhdO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHYsXG5cdFx0aSxcblx0XHRlOiBicmFuY2goKCkgPT4ge1xuXHRcdFx0cmVuZGVyX2ZuKGFuY2hvciwgdiA/PyB2YWx1ZSwgaSA/PyBpbmRleCwgZ2V0X2NvbGxlY3Rpb24pO1xuXG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRpdGVtcy5kZWxldGUoa2V5KTtcblx0XHRcdH07XG5cdFx0fSlcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge0VmZmVjdCB8IG51bGx9IG5leHRcbiAqIEBwYXJhbSB7VGV4dCB8IEVsZW1lbnQgfCBDb21tZW50fSBhbmNob3JcbiAqL1xuZnVuY3Rpb24gbW92ZShlZmZlY3QsIG5leHQsIGFuY2hvcikge1xuXHRpZiAoIWVmZmVjdC5ub2RlcykgcmV0dXJuO1xuXG5cdHZhciBub2RlID0gZWZmZWN0Lm5vZGVzLnN0YXJ0O1xuXHR2YXIgZW5kID0gZWZmZWN0Lm5vZGVzLmVuZDtcblxuXHR2YXIgZGVzdCA9XG5cdFx0bmV4dCAmJiAobmV4dC5mICYgRUZGRUNUX09GRlNDUkVFTikgPT09IDBcblx0XHRcdD8gLyoqIEB0eXBlIHtFZmZlY3ROb2Rlc30gKi8gKG5leHQubm9kZXMpLnN0YXJ0XG5cdFx0XHQ6IGFuY2hvcjtcblxuXHR3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuXHRcdHZhciBuZXh0X25vZGUgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9uZXh0X3NpYmxpbmcobm9kZSkpO1xuXHRcdGRlc3QuYmVmb3JlKG5vZGUpO1xuXG5cdFx0aWYgKG5vZGUgPT09IGVuZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG5vZGUgPSBuZXh0X25vZGU7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VhY2hTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7RWZmZWN0IHwgbnVsbH0gcHJldlxuICogQHBhcmFtIHtFZmZlY3QgfCBudWxsfSBuZXh0XG4gKi9cbmZ1bmN0aW9uIGxpbmsoc3RhdGUsIHByZXYsIG5leHQpIHtcblx0aWYgKHByZXYgPT09IG51bGwpIHtcblx0XHRzdGF0ZS5lZmZlY3QuZmlyc3QgPSBuZXh0O1xuXHR9IGVsc2Uge1xuXHRcdHByZXYubmV4dCA9IG5leHQ7XG5cdH1cblxuXHRpZiAobmV4dCA9PT0gbnVsbCkge1xuXHRcdHN0YXRlLmVmZmVjdC5sYXN0ID0gcHJldjtcblx0fSBlbHNlIHtcblx0XHRuZXh0LnByZXYgPSBwcmV2O1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnJheVxuICogQHBhcmFtIHsoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiBzdHJpbmd9IGtleV9mblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfa2V5cyhhcnJheSwga2V5X2ZuKSB7XG5cdGNvbnN0IGtleXMgPSBuZXcgTWFwKCk7XG5cdGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5X2ZuKGFycmF5W2ldLCBpKTtcblxuXHRcdGlmIChrZXlzLmhhcyhrZXkpKSB7XG5cdFx0XHRjb25zdCBhID0gU3RyaW5nKGtleXMuZ2V0KGtleSkpO1xuXHRcdFx0Y29uc3QgYiA9IFN0cmluZyhpKTtcblxuXHRcdFx0LyoqIEB0eXBlIHtzdHJpbmcgfCBudWxsfSAqL1xuXHRcdFx0bGV0IGsgPSBTdHJpbmcoa2V5KTtcblx0XHRcdGlmIChrLnN0YXJ0c1dpdGgoJ1tvYmplY3QgJykpIGsgPSBudWxsO1xuXG5cdFx0XHRlLmVhY2hfa2V5X2R1cGxpY2F0ZShhLCBiLCBrKTtcblx0XHR9XG5cblx0XHRrZXlzLnNldChrZXksIGkpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBlc2NhcGVfaHRtbCB9IGZyb20gJy4uLy4uL2VzY2FwaW5nLmpzJztcbmltcG9ydCB7IGNsc3ggYXMgX2Nsc3ggfSBmcm9tICdjbHN4JztcbmltcG9ydCB7IGhhc19vd25fcHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLyoqXG4gKiBgPGRpdiB0cmFuc2xhdGU9e2ZhbHNlfT5gIHNob3VsZCBiZSByZW5kZXJlZCBhcyBgPGRpdiB0cmFuc2xhdGU9XCJub1wiPmAgYW5kIF9ub3RfXG4gKiBgPGRpdiB0cmFuc2xhdGU9XCJmYWxzZVwiPmAsIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gYDxkaXYgdHJhbnNsYXRlPVwieWVzXCI+YC4gVGhlcmVcbiAqIG1heSBiZSBvdGhlciBvZGQgY2FzZXMgdGhhdCBuZWVkIHRvIGJlIGFkZGVkIHRvIHRoaXMgbGlzdCBpbiBmdXR1cmVcbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBNYXA8YW55LCBzdHJpbmc+Pn1cbiAqL1xuY29uc3QgcmVwbGFjZW1lbnRzID0ge1xuXHR0cmFuc2xhdGU6IG5ldyBNYXAoW1xuXHRcdFt0cnVlLCAneWVzJ10sXG5cdFx0W2ZhbHNlLCAnbm8nXVxuXHRdKVxufTtcblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzX2Jvb2xlYW5dXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cihuYW1lLCB2YWx1ZSwgaXNfYm9vbGVhbiA9IGZhbHNlKSB7XG5cdC8vIGF0dHJpYnV0ZSBoaWRkZW4gZm9yIHZhbHVlcyBvdGhlciB0aGFuIFwidW50aWwtZm91bmRcIiBiZWhhdmVzIGxpa2UgYSBib29sZWFuIGF0dHJpYnV0ZVxuXHRpZiAobmFtZSA9PT0gJ2hpZGRlbicgJiYgdmFsdWUgIT09ICd1bnRpbC1mb3VuZCcpIHtcblx0XHRpc19ib29sZWFuID0gdHJ1ZTtcblx0fVxuXHRpZiAodmFsdWUgPT0gbnVsbCB8fCAoIXZhbHVlICYmIGlzX2Jvb2xlYW4pKSByZXR1cm4gJyc7XG5cdGNvbnN0IG5vcm1hbGl6ZWQgPVxuXHRcdChoYXNfb3duX3Byb3BlcnR5LmNhbGwocmVwbGFjZW1lbnRzLCBuYW1lKSAmJiByZXBsYWNlbWVudHNbbmFtZV0uZ2V0KHZhbHVlKSkgfHwgdmFsdWU7XG5cdGNvbnN0IGFzc2lnbm1lbnQgPSBpc19ib29sZWFuID8gYD1cIlwiYCA6IGA9XCIke2VzY2FwZV9odG1sKG5vcm1hbGl6ZWQsIHRydWUpfVwiYDtcblx0cmV0dXJuIGAgJHtuYW1lfSR7YXNzaWdubWVudH1gO1xufVxuXG4vKipcbiAqIFNtYWxsIHdyYXBwZXIgYXJvdW5kIGNsc3ggdG8gcHJlc2VydmUgU3ZlbHRlJ3MgKHdlaXJkKSBoYW5kbGluZyBvZiBmYWxzeSB2YWx1ZXMuXG4gKiBUT0RPIFN2ZWx0ZSA2IHJldmlzaXQgdGhpcywgYW5kIGxpa2VseSB0dXJuIGFsbCBmYWxzeSB2YWx1ZXMgaW50byB0aGUgZW1wdHkgc3RyaW5nICh3aGF0IGNsc3ggYWxzbyBkb2VzKVxuICogQHBhcmFtICB7YW55fSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xzeCh2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBfY2xzeCh2YWx1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHZhbHVlID8/ICcnO1xuXHR9XG59XG5cbmNvbnN0IHdoaXRlc3BhY2UgPSBbLi4uJyBcXHRcXG5cXHJcXGZcXHUwMGEwXFx1MDAwYlxcdWZlZmYnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW2hhc2hdXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGJvb2xlYW4+fSBbZGlyZWN0aXZlc11cbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9fY2xhc3ModmFsdWUsIGhhc2gsIGRpcmVjdGl2ZXMpIHtcblx0dmFyIGNsYXNzbmFtZSA9IHZhbHVlID09IG51bGwgPyAnJyA6ICcnICsgdmFsdWU7XG5cblx0aWYgKGhhc2gpIHtcblx0XHRjbGFzc25hbWUgPSBjbGFzc25hbWUgPyBjbGFzc25hbWUgKyAnICcgKyBoYXNoIDogaGFzaDtcblx0fVxuXG5cdGlmIChkaXJlY3RpdmVzKSB7XG5cdFx0Zm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGRpcmVjdGl2ZXMpKSB7XG5cdFx0XHRpZiAoZGlyZWN0aXZlc1trZXldKSB7XG5cdFx0XHRcdGNsYXNzbmFtZSA9IGNsYXNzbmFtZSA/IGNsYXNzbmFtZSArICcgJyArIGtleSA6IGtleTtcblx0XHRcdH0gZWxzZSBpZiAoY2xhc3NuYW1lLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgbGVuID0ga2V5Lmxlbmd0aDtcblx0XHRcdFx0dmFyIGEgPSAwO1xuXG5cdFx0XHRcdHdoaWxlICgoYSA9IGNsYXNzbmFtZS5pbmRleE9mKGtleSwgYSkpID49IDApIHtcblx0XHRcdFx0XHR2YXIgYiA9IGEgKyBsZW47XG5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQoYSA9PT0gMCB8fCB3aGl0ZXNwYWNlLmluY2x1ZGVzKGNsYXNzbmFtZVthIC0gMV0pKSAmJlxuXHRcdFx0XHRcdFx0KGIgPT09IGNsYXNzbmFtZS5sZW5ndGggfHwgd2hpdGVzcGFjZS5pbmNsdWRlcyhjbGFzc25hbWVbYl0pKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y2xhc3NuYW1lID0gKGEgPT09IDAgPyAnJyA6IGNsYXNzbmFtZS5zdWJzdHJpbmcoMCwgYSkpICsgY2xhc3NuYW1lLnN1YnN0cmluZyhiICsgMSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGEgPSBiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjbGFzc25hbWUgPT09ICcnID8gbnVsbCA6IGNsYXNzbmFtZTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLGFueT59IHN0eWxlc1xuICogQHBhcmFtIHtib29sZWFufSBpbXBvcnRhbnRcbiAqL1xuZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyhzdHlsZXMsIGltcG9ydGFudCA9IGZhbHNlKSB7XG5cdHZhciBzZXBhcmF0b3IgPSBpbXBvcnRhbnQgPyAnICFpbXBvcnRhbnQ7JyA6ICc7Jztcblx0dmFyIGNzcyA9ICcnO1xuXG5cdGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzdHlsZXMpKSB7XG5cdFx0dmFyIHZhbHVlID0gc3R5bGVzW2tleV07XG5cdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09ICcnKSB7XG5cdFx0XHRjc3MgKz0gJyAnICsga2V5ICsgJzogJyArIHZhbHVlICsgc2VwYXJhdG9yO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjc3M7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRvX2Nzc19uYW1lKG5hbWUpIHtcblx0aWYgKG5hbWVbMF0gIT09ICctJyB8fCBuYW1lWzFdICE9PSAnLScpIHtcblx0XHRyZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cdHJldHVybiBuYW1lO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgW1JlY29yZDxzdHJpbmcsIGFueT4sIFJlY29yZDxzdHJpbmcsIGFueT5dfSBbc3R5bGVzXVxuICogQHJldHVybnMge3N0cmluZyB8IG51bGx9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b19zdHlsZSh2YWx1ZSwgc3R5bGVzKSB7XG5cdGlmIChzdHlsZXMpIHtcblx0XHR2YXIgbmV3X3N0eWxlID0gJyc7XG5cblx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsYW55PiB8IHVuZGVmaW5lZH0gKi9cblx0XHR2YXIgbm9ybWFsX3N0eWxlcztcblxuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyxhbnk+IHwgdW5kZWZpbmVkfSAqL1xuXHRcdHZhciBpbXBvcnRhbnRfc3R5bGVzO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuXHRcdFx0bm9ybWFsX3N0eWxlcyA9IHN0eWxlc1swXTtcblx0XHRcdGltcG9ydGFudF9zdHlsZXMgPSBzdHlsZXNbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vcm1hbF9zdHlsZXMgPSBzdHlsZXM7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcblx0XHRcdFx0LnJlcGxhY2VBbGwoL1xccypcXC9cXCouKj9cXCpcXC9cXHMqL2csICcnKVxuXHRcdFx0XHQudHJpbSgpO1xuXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW4gfCAnXCInIHwgXCInXCJ9ICovXG5cdFx0XHR2YXIgaW5fc3RyID0gZmFsc2U7XG5cdFx0XHR2YXIgaW5fYXBvID0gMDtcblx0XHRcdHZhciBpbl9jb21tZW50ID0gZmFsc2U7XG5cblx0XHRcdHZhciByZXNlcnZlZF9uYW1lcyA9IFtdO1xuXG5cdFx0XHRpZiAobm9ybWFsX3N0eWxlcykge1xuXHRcdFx0XHRyZXNlcnZlZF9uYW1lcy5wdXNoKC4uLk9iamVjdC5rZXlzKG5vcm1hbF9zdHlsZXMpLm1hcCh0b19jc3NfbmFtZSkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGltcG9ydGFudF9zdHlsZXMpIHtcblx0XHRcdFx0cmVzZXJ2ZWRfbmFtZXMucHVzaCguLi5PYmplY3Qua2V5cyhpbXBvcnRhbnRfc3R5bGVzKS5tYXAodG9fY3NzX25hbWUpKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0X2luZGV4ID0gMDtcblx0XHRcdHZhciBuYW1lX2luZGV4ID0gLTE7XG5cblx0XHRcdGNvbnN0IGxlbiA9IHZhbHVlLmxlbmd0aDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0dmFyIGMgPSB2YWx1ZVtpXTtcblxuXHRcdFx0XHRpZiAoaW5fY29tbWVudCkge1xuXHRcdFx0XHRcdGlmIChjID09PSAnLycgJiYgdmFsdWVbaSAtIDFdID09PSAnKicpIHtcblx0XHRcdFx0XHRcdGluX2NvbW1lbnQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoaW5fc3RyKSB7XG5cdFx0XHRcdFx0aWYgKGluX3N0ciA9PT0gYykge1xuXHRcdFx0XHRcdFx0aW5fc3RyID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICcvJyAmJiB2YWx1ZVtpICsgMV0gPT09ICcqJykge1xuXHRcdFx0XHRcdGluX2NvbW1lbnQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICdcIicgfHwgYyA9PT0gXCInXCIpIHtcblx0XHRcdFx0XHRpbl9zdHIgPSBjO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICcoJykge1xuXHRcdFx0XHRcdGluX2FwbysrO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICcpJykge1xuXHRcdFx0XHRcdGluX2Fwby0tO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFpbl9jb21tZW50ICYmIGluX3N0ciA9PT0gZmFsc2UgJiYgaW5fYXBvID09PSAwKSB7XG5cdFx0XHRcdFx0aWYgKGMgPT09ICc6JyAmJiBuYW1lX2luZGV4ID09PSAtMSkge1xuXHRcdFx0XHRcdFx0bmFtZV9pbmRleCA9IGk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjID09PSAnOycgfHwgaSA9PT0gbGVuIC0gMSkge1xuXHRcdFx0XHRcdFx0aWYgKG5hbWVfaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBuYW1lID0gdG9fY3NzX25hbWUodmFsdWUuc3Vic3RyaW5nKHN0YXJ0X2luZGV4LCBuYW1lX2luZGV4KS50cmltKCkpO1xuXG5cdFx0XHRcdFx0XHRcdGlmICghcmVzZXJ2ZWRfbmFtZXMuaW5jbHVkZXMobmFtZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoYyAhPT0gJzsnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gdmFsdWUuc3Vic3RyaW5nKHN0YXJ0X2luZGV4LCBpKS50cmltKCk7XG5cdFx0XHRcdFx0XHRcdFx0bmV3X3N0eWxlICs9ICcgJyArIHByb3BlcnR5ICsgJzsnO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0X2luZGV4ID0gaSArIDE7XG5cdFx0XHRcdFx0XHRuYW1lX2luZGV4ID0gLTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG5vcm1hbF9zdHlsZXMpIHtcblx0XHRcdG5ld19zdHlsZSArPSBhcHBlbmRfc3R5bGVzKG5vcm1hbF9zdHlsZXMpO1xuXHRcdH1cblxuXHRcdGlmIChpbXBvcnRhbnRfc3R5bGVzKSB7XG5cdFx0XHRuZXdfc3R5bGUgKz0gYXBwZW5kX3N0eWxlcyhpbXBvcnRhbnRfc3R5bGVzLCB0cnVlKTtcblx0XHR9XG5cblx0XHRuZXdfc3R5bGUgPSBuZXdfc3R5bGUudHJpbSgpO1xuXHRcdHJldHVybiBuZXdfc3R5bGUgPT09ICcnID8gbnVsbCA6IG5ld19zdHlsZTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZSA9PSBudWxsID8gbnVsbCA6IFN0cmluZyh2YWx1ZSk7XG59XG4iLCJpbXBvcnQgeyB0b19jbGFzcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9hdHRyaWJ1dGVzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBkb21cbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG51bWJlcn0gaXNfaHRtbFxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtoYXNoXVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbcHJldl9jbGFzc2VzXVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbbmV4dF9jbGFzc2VzXVxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIGJvb2xlYW4+IHwgdW5kZWZpbmVkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2NsYXNzKGRvbSwgaXNfaHRtbCwgdmFsdWUsIGhhc2gsIHByZXZfY2xhc3NlcywgbmV4dF9jbGFzc2VzKSB7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3IgbmVlZCB0byBhZGQgX19jbGFzc05hbWUgdG8gcGF0Y2hlZCBwcm90b3R5cGVcblx0dmFyIHByZXYgPSBkb20uX19jbGFzc05hbWU7XG5cblx0aWYgKFxuXHRcdGh5ZHJhdGluZyB8fFxuXHRcdHByZXYgIT09IHZhbHVlIHx8XG5cdFx0cHJldiA9PT0gdW5kZWZpbmVkIC8vIGZvciBlZGdlIGNhc2Ugb2YgYGNsYXNzPXt1bmRlZmluZWR9YFxuXHQpIHtcblx0XHR2YXIgbmV4dF9jbGFzc19uYW1lID0gdG9fY2xhc3ModmFsdWUsIGhhc2gsIG5leHRfY2xhc3Nlcyk7XG5cblx0XHRpZiAoIWh5ZHJhdGluZyB8fCBuZXh0X2NsYXNzX25hbWUgIT09IGRvbS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykpIHtcblx0XHRcdC8vIFJlbW92aW5nIHRoZSBhdHRyaWJ1dGUgd2hlbiB0aGUgdmFsdWUgaXMgb25seSBhbiBlbXB0eSBzdHJpbmcgY2F1c2VzXG5cdFx0XHQvLyBwZXJmb3JtYW5jZSBpc3N1ZXMgdnMgc2ltcGx5IG1ha2luZyB0aGUgY2xhc3NOYW1lIGFuIGVtcHR5IHN0cmluZy4gU29cblx0XHRcdC8vIHdlIHNob3VsZCBvbmx5IHJlbW92ZSB0aGUgY2xhc3MgaWYgdGhlIHZhbHVlIGlzIG51bGxpc2hcblx0XHRcdC8vIGFuZCB0aGVyZSBubyBoYXNoL2RpcmVjdGl2ZXMgOlxuXHRcdFx0aWYgKG5leHRfY2xhc3NfbmFtZSA9PSBudWxsKSB7XG5cdFx0XHRcdGRvbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG5cdFx0XHR9IGVsc2UgaWYgKGlzX2h0bWwpIHtcblx0XHRcdFx0ZG9tLmNsYXNzTmFtZSA9IG5leHRfY2xhc3NfbmFtZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgbmV4dF9jbGFzc19uYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIG5lZWQgdG8gYWRkIF9fY2xhc3NOYW1lIHRvIHBhdGNoZWQgcHJvdG90eXBlXG5cdFx0ZG9tLl9fY2xhc3NOYW1lID0gdmFsdWU7XG5cdH0gZWxzZSBpZiAobmV4dF9jbGFzc2VzICYmIHByZXZfY2xhc3NlcyAhPT0gbmV4dF9jbGFzc2VzKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG5leHRfY2xhc3Nlcykge1xuXHRcdFx0dmFyIGlzX3ByZXNlbnQgPSAhIW5leHRfY2xhc3Nlc1trZXldO1xuXG5cdFx0XHRpZiAocHJldl9jbGFzc2VzID09IG51bGwgfHwgaXNfcHJlc2VudCAhPT0gISFwcmV2X2NsYXNzZXNba2V5XSkge1xuXHRcdFx0XHRkb20uY2xhc3NMaXN0LnRvZ2dsZShrZXksIGlzX3ByZXNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXh0X2NsYXNzZXM7XG59XG4iLCJpbXBvcnQgeyB0b19zdHlsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9hdHRyaWJ1dGVzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50ICYgRWxlbWVudENTU0lubGluZVN0eWxlfSBkb21cbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYW55Pn0gcHJldlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBuZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gW3ByaW9yaXR5XVxuICovXG5mdW5jdGlvbiB1cGRhdGVfc3R5bGVzKGRvbSwgcHJldiA9IHt9LCBuZXh0LCBwcmlvcml0eSkge1xuXHRmb3IgKHZhciBrZXkgaW4gbmV4dCkge1xuXHRcdHZhciB2YWx1ZSA9IG5leHRba2V5XTtcblxuXHRcdGlmIChwcmV2W2tleV0gIT09IHZhbHVlKSB7XG5cdFx0XHRpZiAobmV4dFtrZXldID09IG51bGwpIHtcblx0XHRcdFx0ZG9tLnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb20uc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgcHJpb3JpdHkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudCAmIEVsZW1lbnRDU1NJbmxpbmVTdHlsZX0gZG9tXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHZhbHVlXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT4gfCBbUmVjb3JkPHN0cmluZywgYW55PiwgUmVjb3JkPHN0cmluZywgYW55Pl19IFtwcmV2X3N0eWxlc11cbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYW55PiB8IFtSZWNvcmQ8c3RyaW5nLCBhbnk+LCBSZWNvcmQ8c3RyaW5nLCBhbnk+XX0gW25leHRfc3R5bGVzXVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3N0eWxlKGRvbSwgdmFsdWUsIHByZXZfc3R5bGVzLCBuZXh0X3N0eWxlcykge1xuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdHZhciBwcmV2ID0gZG9tLl9fc3R5bGU7XG5cblx0aWYgKGh5ZHJhdGluZyB8fCBwcmV2ICE9PSB2YWx1ZSkge1xuXHRcdHZhciBuZXh0X3N0eWxlX2F0dHIgPSB0b19zdHlsZSh2YWx1ZSwgbmV4dF9zdHlsZXMpO1xuXG5cdFx0aWYgKCFoeWRyYXRpbmcgfHwgbmV4dF9zdHlsZV9hdHRyICE9PSBkb20uZ2V0QXR0cmlidXRlKCdzdHlsZScpKSB7XG5cdFx0XHRpZiAobmV4dF9zdHlsZV9hdHRyID09IG51bGwpIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvbS5zdHlsZS5jc3NUZXh0ID0gbmV4dF9zdHlsZV9hdHRyO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRkb20uX19zdHlsZSA9IHZhbHVlO1xuXHR9IGVsc2UgaWYgKG5leHRfc3R5bGVzKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobmV4dF9zdHlsZXMpKSB7XG5cdFx0XHR1cGRhdGVfc3R5bGVzKGRvbSwgcHJldl9zdHlsZXM/LlswXSwgbmV4dF9zdHlsZXNbMF0pO1xuXHRcdFx0dXBkYXRlX3N0eWxlcyhkb20sIHByZXZfc3R5bGVzPy5bMV0sIG5leHRfc3R5bGVzWzFdLCAnaW1wb3J0YW50Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHVwZGF0ZV9zdHlsZXMoZG9tLCBwcmV2X3N0eWxlcywgbmV4dF9zdHlsZXMpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXh0X3N0eWxlcztcbn1cbiIsImltcG9ydCB7IGVmZmVjdCwgdGVhcmRvd24gfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgbGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudCB9IGZyb20gJy4vc2hhcmVkLmpzJztcbmltcG9ydCB7IGlzIH0gZnJvbSAnLi4vLi4vLi4vcHJveHkuanMnO1xuaW1wb3J0IHsgaXNfYXJyYXkgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi8uLi8uLi93YXJuaW5ncy5qcyc7XG5pbXBvcnQgeyBCYXRjaCwgY3VycmVudF9iYXRjaCwgcHJldmlvdXNfYmF0Y2ggfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcblxuLyoqXG4gKiBTZWxlY3RzIHRoZSBjb3JyZWN0IG9wdGlvbihzKSAoZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhpcyBpcyBhIG11bHRpcGxlIHNlbGVjdClcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge0hUTUxTZWxlY3RFbGVtZW50fSBzZWxlY3RcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91bnRpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSwgbW91bnRpbmcgPSBmYWxzZSkge1xuXHRpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG5cdFx0Ly8gSWYgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQsIGtlZXAgdGhlIHNlbGVjdGlvbiBhcyBpc1xuXHRcdGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJZiBub3QgYW4gYXJyYXksIHdhcm4gYW5kIGtlZXAgdGhlIHNlbGVjdGlvbiBhcyBpc1xuXHRcdGlmICghaXNfYXJyYXkodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gdy5zZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZSgpO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgdXBkYXRlIHRoZSBzZWxlY3Rpb25cblx0XHRmb3IgKHZhciBvcHRpb24gb2Ygc2VsZWN0Lm9wdGlvbnMpIHtcblx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluY2x1ZGVzKGdldF9vcHRpb25fdmFsdWUob3B0aW9uKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yIChvcHRpb24gb2Ygc2VsZWN0Lm9wdGlvbnMpIHtcblx0XHR2YXIgb3B0aW9uX3ZhbHVlID0gZ2V0X29wdGlvbl92YWx1ZShvcHRpb24pO1xuXHRcdGlmIChpcyhvcHRpb25fdmFsdWUsIHZhbHVlKSkge1xuXHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblxuXHRpZiAoIW1vdW50aW5nIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IC0xOyAvLyBubyBvcHRpb24gc2hvdWxkIGJlIHNlbGVjdGVkXG5cdH1cbn1cblxuLyoqXG4gKiBTZWxlY3RzIHRoZSBjb3JyZWN0IG9wdGlvbihzKSBpZiBgdmFsdWVgIGlzIGdpdmVuLFxuICogYW5kIHRoZW4gc2V0cyB1cCBhIG11dGF0aW9uIG9ic2VydmVyIHRvIHN5bmMgdGhlXG4gKiBjdXJyZW50IHNlbGVjdGlvbiB0byB0aGUgZG9tIHdoZW4gaXQgY2hhbmdlcy4gU3VjaFxuICogY2hhbmdlcyBjb3VsZCBmb3IgZXhhbXBsZSBvY2N1ciB3aGVuIG9wdGlvbnMgYXJlXG4gKiBpbnNpZGUgYW4gYCNlYWNoYCBibG9jay5cbiAqIEBwYXJhbSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9zZWxlY3Qoc2VsZWN0KSB7XG5cdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0c2VsZWN0X29wdGlvbihzZWxlY3QsIHNlbGVjdC5fX3ZhbHVlKTtcblx0XHQvLyBEZWxpYmVyYXRlbHkgZG9uJ3QgdXBkYXRlIHRoZSBwb3RlbnRpYWwgYmluZGluZyB2YWx1ZSxcblx0XHQvLyB0aGUgbW9kZWwgc2hvdWxkIGJlIHByZXNlcnZlZCB1bmxlc3MgZXhwbGljaXRseSBjaGFuZ2VkXG5cdH0pO1xuXG5cdG9ic2VydmVyLm9ic2VydmUoc2VsZWN0LCB7XG5cdFx0Ly8gTGlzdGVuIHRvIG9wdGlvbiBlbGVtZW50IGNoYW5nZXNcblx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0c3VidHJlZTogdHJ1ZSwgLy8gYmVjYXVzZSBvZiA8b3B0Z3JvdXA+XG5cdFx0Ly8gTGlzdGVuIHRvIG9wdGlvbiBlbGVtZW50IHZhbHVlIGF0dHJpYnV0ZSBjaGFuZ2VzXG5cdFx0Ly8gKGRvZXNuJ3QgZ2V0IG5vdGlmaWVkIG9mIHNlbGVjdCB2YWx1ZSBjaGFuZ2VzLFxuXHRcdC8vIGJlY2F1c2UgdGhhdCBwcm9wZXJ0eSBpcyBub3QgcmVmbGVjdGVkIGFzIGFuIGF0dHJpYnV0ZSlcblx0XHRhdHRyaWJ1dGVzOiB0cnVlLFxuXHRcdGF0dHJpYnV0ZUZpbHRlcjogWyd2YWx1ZSddXG5cdH0pO1xuXG5cdHRlYXJkb3duKCgpID0+IHtcblx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdFxuICogQHBhcmFtIHsoKSA9PiB1bmtub3dufSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duKSA9PiB2b2lkfSBzZXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9zZWxlY3RfdmFsdWUoc2VsZWN0LCBnZXQsIHNldCA9IGdldCkge1xuXHR2YXIgYmF0Y2hlcyA9IG5ldyBXZWFrU2V0KCk7XG5cdHZhciBtb3VudGluZyA9IHRydWU7XG5cblx0bGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudChzZWxlY3QsICdjaGFuZ2UnLCAoaXNfcmVzZXQpID0+IHtcblx0XHR2YXIgcXVlcnkgPSBpc19yZXNldCA/ICdbc2VsZWN0ZWRdJyA6ICc6Y2hlY2tlZCc7XG5cdFx0LyoqIEB0eXBlIHt1bmtub3dufSAqL1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmIChzZWxlY3QubXVsdGlwbGUpIHtcblx0XHRcdHZhbHVlID0gW10ubWFwLmNhbGwoc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpLCBnZXRfb3B0aW9uX3ZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0LyoqIEB0eXBlIHtIVE1MT3B0aW9uRWxlbWVudCB8IG51bGx9ICovXG5cdFx0XHR2YXIgc2VsZWN0ZWRfb3B0aW9uID1cblx0XHRcdFx0c2VsZWN0LnF1ZXJ5U2VsZWN0b3IocXVlcnkpID8/XG5cdFx0XHRcdC8vIHdpbGwgZmFsbCBiYWNrIHRvIGZpcnN0IG5vbi1kaXNhYmxlZCBvcHRpb24gaWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkXG5cdFx0XHRcdHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdvcHRpb246bm90KFtkaXNhYmxlZF0pJyk7XG5cdFx0XHR2YWx1ZSA9IHNlbGVjdGVkX29wdGlvbiAmJiBnZXRfb3B0aW9uX3ZhbHVlKHNlbGVjdGVkX29wdGlvbik7XG5cdFx0fVxuXG5cdFx0c2V0KHZhbHVlKTtcblxuXHRcdGlmIChjdXJyZW50X2JhdGNoICE9PSBudWxsKSB7XG5cdFx0XHRiYXRjaGVzLmFkZChjdXJyZW50X2JhdGNoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIE5lZWRzIHRvIGJlIGFuIGVmZmVjdCwgbm90IGEgcmVuZGVyX2VmZmVjdCwgc28gdGhhdCBpbiBjYXNlIG9mIGVhY2ggbG9vcHMgdGhlIGxvZ2ljIHJ1bnMgYWZ0ZXIgdGhlIGVhY2ggYmxvY2sgaGFzIHVwZGF0ZWRcblx0ZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgdmFsdWUgPSBnZXQoKTtcblxuXHRcdGlmIChzZWxlY3QgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHRcdC8vIHdlIG5lZWQgYm90aCwgYmVjYXVzZSBpbiBub24tYXN5bmMgbW9kZSwgcmVuZGVyIGVmZmVjdHMgcnVuIGJlZm9yZSBwcmV2aW91c19iYXRjaCBpcyBzZXRcblx0XHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChwcmV2aW91c19iYXRjaCA/PyBjdXJyZW50X2JhdGNoKTtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHRoZSA8c2VsZWN0PiBpZiBpdCBpcyBmb2N1c2VkLiBXZSBjYW4gZ2V0IGhlcmUgaWYsIGZvciBleGFtcGxlLFxuXHRcdFx0Ly8gYW4gdXBkYXRlIGlzIGRlZmVycmVkIGJlY2F1c2Ugb2YgYXN5bmMgd29yayBkZXBlbmRpbmcgb24gdGhlIHNlbGVjdDpcblx0XHRcdC8vXG5cdFx0XHQvLyA8c2VsZWN0IGJpbmQ6dmFsdWU9e3NlbGVjdGVkfT4uLi48L3NlbGVjdD5cblx0XHRcdC8vIDxwPnthd2FpdCBmaW5kKHNlbGVjdGVkKX08L3A+XG5cdFx0XHRpZiAoYmF0Y2hlcy5oYXMoYmF0Y2gpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUsIG1vdW50aW5nKTtcblxuXHRcdC8vIE1vdW50aW5nIGFuZCB2YWx1ZSB1bmRlZmluZWQgLT4gdGFrZSBzZWxlY3Rpb24gZnJvbSBkb21cblx0XHRpZiAobW91bnRpbmcgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0LyoqIEB0eXBlIHtIVE1MT3B0aW9uRWxlbWVudCB8IG51bGx9ICovXG5cdFx0XHR2YXIgc2VsZWN0ZWRfb3B0aW9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XG5cdFx0XHRpZiAoc2VsZWN0ZWRfb3B0aW9uICE9PSBudWxsKSB7XG5cdFx0XHRcdHZhbHVlID0gZ2V0X29wdGlvbl92YWx1ZShzZWxlY3RlZF9vcHRpb24pO1xuXHRcdFx0XHRzZXQodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRzZWxlY3QuX192YWx1ZSA9IHZhbHVlO1xuXHRcdG1vdW50aW5nID0gZmFsc2U7XG5cdH0pO1xuXG5cdGluaXRfc2VsZWN0KHNlbGVjdCk7XG59XG5cbi8qKiBAcGFyYW0ge0hUTUxPcHRpb25FbGVtZW50fSBvcHRpb24gKi9cbmZ1bmN0aW9uIGdldF9vcHRpb25fdmFsdWUob3B0aW9uKSB7XG5cdC8vIF9fdmFsdWUgb25seSBleGlzdHMgaWYgdGhlIDxvcHRpb24+IGhhcyBhIHZhbHVlIGF0dHJpYnV0ZVxuXHRpZiAoJ19fdmFsdWUnIGluIG9wdGlvbikge1xuXHRcdHJldHVybiBvcHRpb24uX192YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gb3B0aW9uLnZhbHVlO1xuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IEJsb2NrZXIsIEVmZmVjdCB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IGh5ZHJhdGluZywgc2V0X2h5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBnZXRfZGVzY3JpcHRvcnMsIGdldF9wcm90b3R5cGVfb2YgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgY3JlYXRlX2V2ZW50LCBkZWxlZ2F0ZSwgZGVsZWdhdGVkLCBldmVudCwgZXZlbnRfc3ltYm9sIH0gZnJvbSAnLi9ldmVudHMuanMnO1xuaW1wb3J0IHsgYWRkX2Zvcm1fcmVzZXRfbGlzdGVuZXIsIGF1dG9mb2N1cyB9IGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4uLy4uL3dhcm5pbmdzLmpzJztcbmltcG9ydCB7IElTX1hIVE1MLCBMT0FESU5HX0FUVFJfU1lNQk9MIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL3Rhc2suanMnO1xuaW1wb3J0IHsgaXNfY2FwdHVyZV9ldmVudCwgY2FuX2RlbGVnYXRlX2V2ZW50LCBub3JtYWxpemVfYXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHtcblx0YWN0aXZlX2VmZmVjdCxcblx0YWN0aXZlX3JlYWN0aW9uLFxuXHRnZXQsXG5cdHNldF9hY3RpdmVfZWZmZWN0LFxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uXG59IGZyb20gJy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgYXR0YWNoIH0gZnJvbSAnLi9hdHRhY2htZW50cy5qcyc7XG5pbXBvcnQgeyBjbHN4IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2F0dHJpYnV0ZXMuanMnO1xuaW1wb3J0IHsgc2V0X2NsYXNzIH0gZnJvbSAnLi9jbGFzcy5qcyc7XG5pbXBvcnQgeyBzZXRfc3R5bGUgfSBmcm9tICcuL3N0eWxlLmpzJztcbmltcG9ydCB7IEFUVEFDSE1FTlRfS0VZLCBOQU1FU1BBQ0VfSFRNTCwgVU5JTklUSUFMSVpFRCB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBicmFuY2gsIGRlc3Ryb3lfZWZmZWN0LCBlZmZlY3QsIG1hbmFnZWQgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgaW5pdF9zZWxlY3QsIHNlbGVjdF9vcHRpb24gfSBmcm9tICcuL2JpbmRpbmdzL3NlbGVjdC5qcyc7XG5pbXBvcnQgeyBmbGF0dGVuIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9hc3luYy5qcyc7XG5cbmV4cG9ydCBjb25zdCBDTEFTUyA9IFN5bWJvbCgnY2xhc3MnKTtcbmV4cG9ydCBjb25zdCBTVFlMRSA9IFN5bWJvbCgnc3R5bGUnKTtcblxuY29uc3QgSVNfQ1VTVE9NX0VMRU1FTlQgPSBTeW1ib2woJ2lzIGN1c3RvbSBlbGVtZW50Jyk7XG5jb25zdCBJU19IVE1MID0gU3ltYm9sKCdpcyBodG1sJyk7XG5cbmNvbnN0IExJTktfVEFHID0gSVNfWEhUTUwgPyAnbGluaycgOiAnTElOSyc7XG5jb25zdCBJTlBVVF9UQUcgPSBJU19YSFRNTCA/ICdpbnB1dCcgOiAnSU5QVVQnO1xuY29uc3QgT1BUSU9OX1RBRyA9IElTX1hIVE1MID8gJ29wdGlvbicgOiAnT1BUSU9OJztcbmNvbnN0IFNFTEVDVF9UQUcgPSBJU19YSFRNTCA/ICdzZWxlY3QnIDogJ1NFTEVDVCc7XG5jb25zdCBQUk9HUkVTU19UQUcgPSBJU19YSFRNTCA/ICdwcm9ncmVzcycgOiAnUFJPR1JFU1MnO1xuXG4vKipcbiAqIFRoZSB2YWx1ZS9jaGVja2VkIGF0dHJpYnV0ZSBpbiB0aGUgdGVtcGxhdGUgYWN0dWFsbHkgY29ycmVzcG9uZHMgdG8gdGhlIGRlZmF1bHRWYWx1ZSBwcm9wZXJ0eSwgc28gd2UgbmVlZFxuICogdG8gcmVtb3ZlIGl0IHVwb24gaHlkcmF0aW9uIHRvIGF2b2lkIGEgYnVnIHdoZW4gc29tZW9uZSByZXNldHMgdGhlIGZvcm0gdmFsdWUuXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZV9pbnB1dF9kZWZhdWx0cyhpbnB1dCkge1xuXHRpZiAoIWh5ZHJhdGluZykgcmV0dXJuO1xuXG5cdHZhciBhbHJlYWR5X3JlbW92ZWQgPSBmYWxzZTtcblxuXHQvLyBXZSB0cnkgYW5kIHJlbW92ZSB0aGUgZGVmYXVsdCBhdHRyaWJ1dGVzIGxhdGVyLCByYXRoZXIgdGhhbiBzeW5jIGR1cmluZyBoeWRyYXRpb24uXG5cdC8vIERvaW5nIGl0IHN5bmMgZHVyaW5nIGh5ZHJhdGlvbiBoYXMgYSBuZWdhdGl2ZSBpbXBhY3Qgb24gcGVyZm9ybWFuY2UsIGJ1dCBkZWZlcnJpbmcgdGhlXG5cdC8vIHdvcmsgaW4gYW4gaWRsZSB0YXNrIGFsbGV2aWF0ZXMgdGhpcyBncmVhdGx5LiBJZiBhIGZvcm0gcmVzZXQgZXZlbnQgY29tZXMgaW4gYmVmb3JlXG5cdC8vIHRoZSBpZGxlIGNhbGxiYWNrLCB0aGVuIHdlIGVuc3VyZSB0aGUgaW5wdXQgZGVmYXVsdHMgYXJlIGNsZWFyZWQganVzdCBiZWZvcmUuXG5cdHZhciByZW1vdmVfZGVmYXVsdHMgPSAoKSA9PiB7XG5cdFx0aWYgKGFscmVhZHlfcmVtb3ZlZCkgcmV0dXJuO1xuXHRcdGFscmVhZHlfcmVtb3ZlZCA9IHRydWU7XG5cblx0XHQvLyBSZW1vdmUgdGhlIGF0dHJpYnV0ZXMgYnV0IHByZXNlcnZlIHRoZSB2YWx1ZXNcblx0XHRpZiAoaW5wdXQuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbnB1dC52YWx1ZTtcblx0XHRcdHNldF9hdHRyaWJ1dGUoaW5wdXQsICd2YWx1ZScsIG51bGwpO1xuXHRcdFx0aW5wdXQudmFsdWUgPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRpZiAoaW5wdXQuaGFzQXR0cmlidXRlKCdjaGVja2VkJykpIHtcblx0XHRcdHZhciBjaGVja2VkID0gaW5wdXQuY2hlY2tlZDtcblx0XHRcdHNldF9hdHRyaWJ1dGUoaW5wdXQsICdjaGVja2VkJywgbnVsbCk7XG5cdFx0XHRpbnB1dC5jaGVja2VkID0gY2hlY2tlZDtcblx0XHR9XG5cdH07XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRpbnB1dC5fX29uX3IgPSByZW1vdmVfZGVmYXVsdHM7XG5cdHF1ZXVlX21pY3JvX3Rhc2socmVtb3ZlX2RlZmF1bHRzKTtcblx0YWRkX2Zvcm1fcmVzZXRfbGlzdGVuZXIoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3ZhbHVlKGVsZW1lbnQsIHZhbHVlKSB7XG5cdHZhciBhdHRyaWJ1dGVzID0gZ2V0X2F0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0aWYgKFxuXHRcdGF0dHJpYnV0ZXMudmFsdWUgPT09XG5cdFx0XHQoYXR0cmlidXRlcy52YWx1ZSA9XG5cdFx0XHRcdC8vIHRyZWF0IG51bGwgYW5kIHVuZGVmaW5lZCB0aGUgc2FtZSBmb3IgdGhlIGluaXRpYWwgdmFsdWVcblx0XHRcdFx0dmFsdWUgPz8gdW5kZWZpbmVkKSB8fFxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHQvLyBgcHJvZ3Jlc3NgIGVsZW1lbnRzIGFsd2F5cyBuZWVkIHRoZWlyIHZhbHVlIHNldCB3aGVuIGl0J3MgYDBgXG5cdFx0KGVsZW1lbnQudmFsdWUgPT09IHZhbHVlICYmICh2YWx1ZSAhPT0gMCB8fCBlbGVtZW50Lm5vZGVOYW1lICE9PSBQUk9HUkVTU19UQUcpKVxuXHQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdGVsZW1lbnQudmFsdWUgPSB2YWx1ZSA/PyAnJztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2NoZWNrZWQoZWxlbWVudCwgY2hlY2tlZCkge1xuXHR2YXIgYXR0cmlidXRlcyA9IGdldF9hdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXG5cdGlmIChcblx0XHRhdHRyaWJ1dGVzLmNoZWNrZWQgPT09XG5cdFx0KGF0dHJpYnV0ZXMuY2hlY2tlZCA9XG5cdFx0XHQvLyB0cmVhdCBudWxsIGFuZCB1bmRlZmluZWQgdGhlIHNhbWUgZm9yIHRoZSBpbml0aWFsIHZhbHVlXG5cdFx0XHRjaGVja2VkID8/IHVuZGVmaW5lZClcblx0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRlbGVtZW50LmNoZWNrZWQgPSBjaGVja2VkO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGBzZWxlY3RlZGAgYXR0cmlidXRlIG9uIGFuIGBvcHRpb25gIGVsZW1lbnQuXG4gKiBOb3Qgc2V0IHRocm91Z2ggdGhlIHByb3BlcnR5IGJlY2F1c2UgdGhhdCBkb2Vzbid0IHJlZmxlY3QgdG8gdGhlIERPTSxcbiAqIHdoaWNoIG1lYW5zIGl0IHdvdWxkbid0IGJlIHRha2VuIGludG8gYWNjb3VudCB3aGVuIGEgZm9ybSBpcyByZXNldC5cbiAqIEBwYXJhbSB7SFRNTE9wdGlvbkVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9zZWxlY3RlZChlbGVtZW50LCBzZWxlY3RlZCkge1xuXHRpZiAoc2VsZWN0ZWQpIHtcblx0XHQvLyBUaGUgc2VsZWN0ZWQgb3B0aW9uIGNvdWxkJ3ZlIGNoYW5nZWQgdmlhIHVzZXIgc2VsZWN0aW9uLCBhbmRcblx0XHQvLyBzZXR0aW5nIHRoZSB2YWx1ZSB3aXRob3V0IHRoaXMgY2hlY2sgd291bGQgc2V0IGl0IGJhY2suXG5cdFx0aWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcblx0fVxufVxuXG4vKipcbiAqIEFwcGxpZXMgdGhlIGRlZmF1bHQgY2hlY2tlZCBwcm9wZXJ0eSB3aXRob3V0IGluZmx1ZW5jaW5nIHRoZSBjdXJyZW50IGNoZWNrZWQgcHJvcGVydHkuXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2RlZmF1bHRfY2hlY2tlZChlbGVtZW50LCBjaGVja2VkKSB7XG5cdGNvbnN0IGV4aXN0aW5nX3ZhbHVlID0gZWxlbWVudC5jaGVja2VkO1xuXHRlbGVtZW50LmRlZmF1bHRDaGVja2VkID0gY2hlY2tlZDtcblx0ZWxlbWVudC5jaGVja2VkID0gZXhpc3RpbmdfdmFsdWU7XG59XG5cbi8qKlxuICogQXBwbGllcyB0aGUgZGVmYXVsdCB2YWx1ZSBwcm9wZXJ0eSB3aXRob3V0IGluZmx1ZW5jaW5nIHRoZSBjdXJyZW50IHZhbHVlIHByb3BlcnR5LlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZGVmYXVsdF92YWx1ZShlbGVtZW50LCB2YWx1ZSkge1xuXHRjb25zdCBleGlzdGluZ192YWx1ZSA9IGVsZW1lbnQudmFsdWU7XG5cdGVsZW1lbnQuZGVmYXVsdFZhbHVlID0gdmFsdWU7XG5cdGVsZW1lbnQudmFsdWUgPSBleGlzdGluZ192YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBfd2FybmluZ11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9hdHRyaWJ1dGUoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSwgc2tpcF93YXJuaW5nKSB7XG5cdHZhciBhdHRyaWJ1dGVzID0gZ2V0X2F0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cblx0XHRpZiAoXG5cdFx0XHRhdHRyaWJ1dGUgPT09ICdzcmMnIHx8XG5cdFx0XHRhdHRyaWJ1dGUgPT09ICdzcmNzZXQnIHx8XG5cdFx0XHQoYXR0cmlidXRlID09PSAnaHJlZicgJiYgZWxlbWVudC5ub2RlTmFtZSA9PT0gTElOS19UQUcpXG5cdFx0KSB7XG5cdFx0XHRpZiAoIXNraXBfd2FybmluZykge1xuXHRcdFx0XHRjaGVja19zcmNfaW5fZGV2X2h5ZHJhdGlvbihlbGVtZW50LCBhdHRyaWJ1dGUsIHZhbHVlID8/ICcnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgd2UgcmVzZXQgdGhlc2UgYXR0cmlidXRlcywgdGhleSB3b3VsZCByZXN1bHQgaW4gYW5vdGhlciBuZXR3b3JrIHJlcXVlc3QsIHdoaWNoIHdlIHdhbnQgdG8gYXZvaWQuXG5cdFx0XHQvLyBXZSBhc3N1bWUgdGhleSBhcmUgdGhlIHNhbWUgYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlciBhcyBjaGVja2luZyBpZiB0aGV5IGFyZSBlcXVhbCBpcyBleHBlbnNpdmVcblx0XHRcdC8vICh3ZSBjYW4ndCBqdXN0IGNvbXBhcmUgdGhlIHN0cmluZ3MgYXMgdGhleSBjYW4gYmUgZGlmZmVyZW50IGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIgYnV0IHJlc3VsdCBpbiB0aGVcblx0XHRcdC8vIHNhbWUgdXJsLCBzbyB3ZSB3b3VsZCBuZWVkIHRvIGNyZWF0ZSBoaWRkZW4gYW5jaG9yIGVsZW1lbnRzIHRvIGNvbXBhcmUgdGhlbSlcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblxuXHRpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdID09PSAoYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gdmFsdWUpKSByZXR1cm47XG5cblx0aWYgKGF0dHJpYnV0ZSA9PT0gJ2xvYWRpbmcnKSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGVsZW1lbnRbTE9BRElOR19BVFRSX1NZTUJPTF0gPSB2YWx1ZTtcblx0fVxuXG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmIGdldF9zZXR0ZXJzKGVsZW1lbnQpLmluY2x1ZGVzKGF0dHJpYnV0ZSkpIHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0ZWxlbWVudFthdHRyaWJ1dGVdID0gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGRvbVxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfeGxpbmtfYXR0cmlidXRlKGRvbSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuXHRkb20uc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcFxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuXHQvLyBXZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHNldHRpbmcgY3VzdG9tIGVsZW1lbnQgcHJvcHMsIHdoaWNoIGNhblxuXHQvLyBpbnZva2UgbGlmZWN5Y2xlIG1ldGhvZHMgb24gb3RoZXIgY3VzdG9tIGVsZW1lbnRzLCBkb2VzIG5vdCBhbHNvXG5cdC8vIGFzc29jaWF0ZSB0aG9zZSBsaWZlY3ljbGUgbWV0aG9kcyB3aXRoIHRoZSBjdXJyZW50IGFjdGl2ZSByZWFjdGlvblxuXHQvLyBvciBlZmZlY3Rcblx0dmFyIHByZXZpb3VzX3JlYWN0aW9uID0gYWN0aXZlX3JlYWN0aW9uO1xuXHR2YXIgcHJldmlvdXNfZWZmZWN0ID0gYWN0aXZlX2VmZmVjdDtcblxuXHQvLyBJZiB3ZSdyZSBoeWRyYXRpbmcgYnV0IHRoZSBjdXN0b20gZWxlbWVudCBpcyBmcm9tIFN2ZWx0ZSwgYW5kIGl0IGFscmVhZHkgc2NhZmZvbGRlZCxcblx0Ly8gdGhlbiBpdCBtaWdodCBydW4gYmxvY2sgbG9naWMgaW4gaHlkcmF0aW9uIG1vZGUsIHdoaWNoIHdlIGhhdmUgdG8gcHJldmVudC5cblx0bGV0IHdhc19oeWRyYXRpbmcgPSBoeWRyYXRpbmc7XG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblx0fVxuXG5cdHNldF9hY3RpdmVfcmVhY3Rpb24obnVsbCk7XG5cdHNldF9hY3RpdmVfZWZmZWN0KG51bGwpO1xuXG5cdHRyeSB7XG5cdFx0aWYgKFxuXHRcdFx0Ly8gYHN0eWxlYCBzaG91bGQgdXNlIGBzZXRfYXR0cmlidXRlYCByYXRoZXIgdGhhbiB0aGUgc2V0dGVyXG5cdFx0XHRwcm9wICE9PSAnc3R5bGUnICYmXG5cdFx0XHQvLyBEb24ndCBjb21wdXRlIHNldHRlcnMgZm9yIGN1c3RvbSBlbGVtZW50cyB3aGlsZSB0aGV5IGFyZW4ndCByZWdpc3RlcmVkIHlldCxcblx0XHRcdC8vIGJlY2F1c2UgZHVyaW5nIHRoZWlyIHVwZ3JhZGUvaW5zdGFudGlhdGlvbiB0aGV5IG1pZ2h0IGFkZCBtb3JlIHNldHRlcnMuXG5cdFx0XHQvLyBJbnN0ZWFkLCBmYWxsIGJhY2sgdG8gYSBzaW1wbGUgXCJhbiBvYmplY3QsIHRoZW4gc2V0IGFzIHByb3BlcnR5XCIgaGV1cmlzdGljLlxuXHRcdFx0KHNldHRlcnNfY2FjaGUuaGFzKG5vZGUuZ2V0QXR0cmlidXRlKCdpcycpIHx8IG5vZGUubm9kZU5hbWUpIHx8XG5cdFx0XHQvLyBjdXN0b21FbGVtZW50cyBtYXkgbm90IGJlIGF2YWlsYWJsZSBpbiBicm93c2VyIGV4dGVuc2lvbiBjb250ZXh0c1xuXHRcdFx0IWN1c3RvbUVsZW1lbnRzIHx8XG5cdFx0XHRjdXN0b21FbGVtZW50cy5nZXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2lzJykgfHwgbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ/IGdldF9zZXR0ZXJzKG5vZGUpLmluY2x1ZGVzKHByb3ApXG5cdFx0XHRcdDogdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jylcblx0XHQpIHtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRcdG5vZGVbcHJvcF0gPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gV2UgZGlkIGdldHRlcnMgZXRjIGNoZWNrcyBhbHJlYWR5LCBzdHJpbmdpZnkgYmVmb3JlIHBhc3NpbmcgdG8gc2V0X2F0dHJpYnV0ZVxuXHRcdFx0Ly8gdG8gZW5zdXJlIGl0IGRvZXNuJ3QgaW52b2tlIHRoZSBzYW1lIGxvZ2ljIGFnYWluLCBhbmQgcG90ZW50aWFsbHkgcG9wdWxhdGluZ1xuXHRcdFx0Ly8gdGhlIHNldHRlcnMgY2FjaGUgdG9vIGVhcmx5LlxuXHRcdFx0c2V0X2F0dHJpYnV0ZShub2RlLCBwcm9wLCB2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpKTtcblx0XHR9XG5cdH0gZmluYWxseSB7XG5cdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihwcmV2aW91c19yZWFjdGlvbik7XG5cdFx0c2V0X2FjdGl2ZV9lZmZlY3QocHJldmlvdXNfZWZmZWN0KTtcblx0XHRpZiAod2FzX2h5ZHJhdGluZykge1xuXHRcdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTcHJlYWRzIGF0dHJpYnV0ZXMgb250byBhIERPTSBlbGVtZW50LCB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBjdXJyZW50bHkgc2V0IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7RWxlbWVudCAmIEVsZW1lbnRDU1NJbmxpbmVTdHlsZX0gZWxlbWVudFxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+IHwgdW5kZWZpbmVkfSBwcmV2XG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT59IG5leHQgTmV3IGF0dHJpYnV0ZXMgLSB0aGlzIGZ1bmN0aW9uIG11dGF0ZXMgdGhpcyBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY3NzX2hhc2hdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzaG91bGRfcmVtb3ZlX2RlZmF1bHRzXVxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcF93YXJuaW5nXVxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIGFueT59XG4gKi9cbmZ1bmN0aW9uIHNldF9hdHRyaWJ1dGVzKFxuXHRlbGVtZW50LFxuXHRwcmV2LFxuXHRuZXh0LFxuXHRjc3NfaGFzaCxcblx0c2hvdWxkX3JlbW92ZV9kZWZhdWx0cyA9IGZhbHNlLFxuXHRza2lwX3dhcm5pbmcgPSBmYWxzZVxuKSB7XG5cdGlmIChoeWRyYXRpbmcgJiYgc2hvdWxkX3JlbW92ZV9kZWZhdWx0cyAmJiBlbGVtZW50Lm5vZGVOYW1lID09PSBJTlBVVF9UQUcpIHtcblx0XHR2YXIgaW5wdXQgPSAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovIChlbGVtZW50KTtcblx0XHR2YXIgYXR0cmlidXRlID0gaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/ICdkZWZhdWx0Q2hlY2tlZCcgOiAnZGVmYXVsdFZhbHVlJztcblxuXHRcdGlmICghKGF0dHJpYnV0ZSBpbiBuZXh0KSkge1xuXHRcdFx0cmVtb3ZlX2lucHV0X2RlZmF1bHRzKGlucHV0KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgYXR0cmlidXRlcyA9IGdldF9hdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXG5cdHZhciBpc19jdXN0b21fZWxlbWVudCA9IGF0dHJpYnV0ZXNbSVNfQ1VTVE9NX0VMRU1FTlRdO1xuXHR2YXIgcHJlc2VydmVfYXR0cmlidXRlX2Nhc2UgPSAhYXR0cmlidXRlc1tJU19IVE1MXTtcblxuXHQvLyBJZiB3ZSdyZSBoeWRyYXRpbmcgYnV0IHRoZSBjdXN0b20gZWxlbWVudCBpcyBmcm9tIFN2ZWx0ZSwgYW5kIGl0IGFscmVhZHkgc2NhZmZvbGRlZCxcblx0Ly8gdGhlbiBpdCBtaWdodCBydW4gYmxvY2sgbG9naWMgaW4gaHlkcmF0aW9uIG1vZGUsIHdoaWNoIHdlIGhhdmUgdG8gcHJldmVudC5cblx0bGV0IGlzX2h5ZHJhdGluZ19jdXN0b21fZWxlbWVudCA9IGh5ZHJhdGluZyAmJiBpc19jdXN0b21fZWxlbWVudDtcblx0aWYgKGlzX2h5ZHJhdGluZ19jdXN0b21fZWxlbWVudCkge1xuXHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHR9XG5cblx0dmFyIGN1cnJlbnQgPSBwcmV2IHx8IHt9O1xuXHR2YXIgaXNfb3B0aW9uX2VsZW1lbnQgPSBlbGVtZW50Lm5vZGVOYW1lID09PSBPUFRJT05fVEFHO1xuXG5cdGZvciAodmFyIGtleSBpbiBwcmV2KSB7XG5cdFx0aWYgKCEoa2V5IGluIG5leHQpKSB7XG5cdFx0XHRuZXh0W2tleV0gPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGlmIChuZXh0LmNsYXNzKSB7XG5cdFx0bmV4dC5jbGFzcyA9IGNsc3gobmV4dC5jbGFzcyk7XG5cdH0gZWxzZSBpZiAoY3NzX2hhc2ggfHwgbmV4dFtDTEFTU10pIHtcblx0XHRuZXh0LmNsYXNzID0gbnVsbDsgLyogZm9yY2UgY2FsbCB0byBzZXRfY2xhc3MoKSAqL1xuXHR9XG5cblx0aWYgKG5leHRbU1RZTEVdKSB7XG5cdFx0bmV4dC5zdHlsZSA/Pz0gbnVsbDsgLyogZm9yY2UgY2FsbCB0byBzZXRfc3R5bGUoKSAqL1xuXHR9XG5cblx0dmFyIHNldHRlcnMgPSBnZXRfc2V0dGVycyhlbGVtZW50KTtcblxuXHQvLyBzaW5jZSBrZXkgaXMgY2FwdHVyZWQgd2UgdXNlIGNvbnN0XG5cdGZvciAoY29uc3Qga2V5IGluIG5leHQpIHtcblx0XHQvLyBsZXQgaW5zdGVhZCBvZiB2YXIgYmVjYXVzZSByZWZlcmVuY2VkIGluIGEgY2xvc3VyZVxuXHRcdGxldCB2YWx1ZSA9IG5leHRba2V5XTtcblxuXHRcdC8vIFVwIGhlcmUgYmVjYXVzZSB3ZSB3YW50IHRvIGRvIHRoaXMgZm9yIHRoZSBpbml0aWFsIHZhbHVlLCB0b28sIGV2ZW4gaWYgaXQncyB1bmRlZmluZWQsXG5cdFx0Ly8gYW5kIHRoaXMgd291bGRuJ3QgYmUgcmVhY2hlZCBpbiBjYXNlIG9mIHVuZGVmaW5lZCBiZWNhdXNlIG9mIHRoZSBlcXVhbGl0eSBjaGVjayBiZWxvd1xuXHRcdGlmIChpc19vcHRpb25fZWxlbWVudCAmJiBrZXkgPT09ICd2YWx1ZScgJiYgdmFsdWUgPT0gbnVsbCkge1xuXHRcdFx0Ly8gVGhlIDxvcHRpb24+IGVsZW1lbnQgaXMgYSBzcGVjaWFsIGNhc2UgYmVjYXVzZSByZW1vdmluZyB0aGUgdmFsdWUgYXR0cmlidXRlIG1lYW5zXG5cdFx0XHQvLyB0aGUgdmFsdWUgaXMgc2V0IHRvIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIG9wdGlvbiBlbGVtZW50LCBhbmQgc2V0dGluZyB0aGUgdmFsdWVcblx0XHRcdC8vIHRvIG51bGwgb3IgdW5kZWZpbmVkIG1lYW5zIHRoZSB2YWx1ZSBpcyBzZXQgdG8gdGhlIHN0cmluZyBcIm51bGxcIiBvciBcInVuZGVmaW5lZFwiLlxuXHRcdFx0Ly8gVG8gYWxpZ24gd2l0aCBob3cgd2UgaGFuZGxlIHRoaXMgY2FzZSBpbiBub24tc3ByZWFkLXNjZW5hcmlvcywgdGhpcyBsb2dpYyBpcyBuZWVkZWQuXG5cdFx0XHQvLyBUaGVyZSdzIGEgc3VwZXItZWRnZS1jYXNlIGJ1ZyBoZXJlIHRoYXQgaXMgbGVmdCBpbiBpbiBmYXZvciBvZiBzbWFsbGVyIGNvZGUgc2l6ZTpcblx0XHRcdC8vIEJlY2F1c2Ugb2YgdGhlIFwic2V0IG1pc3NpbmcgcHJvcHMgdG8gbnVsbFwiIGxvZ2ljIGFib3ZlLCB3ZSBjYW4ndCBkaWZmZXJlbnRpYXRlXG5cdFx0XHQvLyBiZXR3ZWVuIGEgbWlzc2luZyB2YWx1ZSBhbmQgYW4gZXhwbGljaXRseSBzZXQgdmFsdWUgb2YgbnVsbCBvciB1bmRlZmluZWQuIFRoYXQgbWVhbnNcblx0XHRcdC8vIHRoYXQgb25jZSBzZXQsIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgb2YgYW4gPG9wdGlvbj4gZWxlbWVudCBjYW4ndCBiZSByZW1vdmVkLiBUaGlzIGlzXG5cdFx0XHQvLyBhIHZlcnkgcmFyZSBlZGdlIGNhc2UsIGFuZCByZW1vdmluZyB0aGUgYXR0cmlidXRlIGFsdG9nZXRoZXIgaXNuJ3QgcG9zc2libGUgZWl0aGVyXG5cdFx0XHQvLyBmb3IgdGhlIDxvcHRpb24gdmFsdWU9e3VuZGVmaW5lZH0+IGNhc2UsIHNvIHdlJ3JlIG5vdCBsb3NpbmcgYW55IGZ1bmN0aW9uYWxpdHkgaGVyZS5cblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGVsZW1lbnQudmFsdWUgPSBlbGVtZW50Ll9fdmFsdWUgPSAnJztcblx0XHRcdGN1cnJlbnRba2V5XSA9IHZhbHVlO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKGtleSA9PT0gJ2NsYXNzJykge1xuXHRcdFx0dmFyIGlzX2h0bWwgPSBlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuXHRcdFx0c2V0X2NsYXNzKGVsZW1lbnQsIGlzX2h0bWwsIHZhbHVlLCBjc3NfaGFzaCwgcHJldj8uW0NMQVNTXSwgbmV4dFtDTEFTU10pO1xuXHRcdFx0Y3VycmVudFtrZXldID0gdmFsdWU7XG5cdFx0XHRjdXJyZW50W0NMQVNTXSA9IG5leHRbQ0xBU1NdO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKGtleSA9PT0gJ3N0eWxlJykge1xuXHRcdFx0c2V0X3N0eWxlKGVsZW1lbnQsIHZhbHVlLCBwcmV2Py5bU1RZTEVdLCBuZXh0W1NUWUxFXSk7XG5cdFx0XHRjdXJyZW50W2tleV0gPSB2YWx1ZTtcblx0XHRcdGN1cnJlbnRbU1RZTEVdID0gbmV4dFtTVFlMRV07XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR2YXIgcHJldl92YWx1ZSA9IGN1cnJlbnRba2V5XTtcblxuXHRcdC8vIFNraXAgaWYgdmFsdWUgaXMgdW5jaGFuZ2VkLCB1bmxlc3MgaXQncyBgdW5kZWZpbmVkYCBhbmQgdGhlIGVsZW1lbnQgc3RpbGwgaGFzIHRoZSBhdHRyaWJ1dGVcblx0XHRpZiAodmFsdWUgPT09IHByZXZfdmFsdWUgJiYgISh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW1lbnQuaGFzQXR0cmlidXRlKGtleSkpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjdXJyZW50W2tleV0gPSB2YWx1ZTtcblxuXHRcdHZhciBwcmVmaXggPSBrZXlbMF0gKyBrZXlbMV07IC8vIHRoaXMgaXMgZmFzdGVyIHRoYW4ga2V5LnNsaWNlKDAsIDIpXG5cdFx0aWYgKHByZWZpeCA9PT0gJyQkJykgY29udGludWU7XG5cblx0XHRpZiAocHJlZml4ID09PSAnb24nKSB7XG5cdFx0XHQvKiogQHR5cGUge3sgY2FwdHVyZT86IHRydWUgfX0gKi9cblx0XHRcdGNvbnN0IG9wdHMgPSB7fTtcblx0XHRcdGNvbnN0IGV2ZW50X2hhbmRsZV9rZXkgPSAnJCQnICsga2V5O1xuXHRcdFx0bGV0IGV2ZW50X25hbWUgPSBrZXkuc2xpY2UoMik7XG5cdFx0XHR2YXIgaXNfZGVsZWdhdGVkID0gY2FuX2RlbGVnYXRlX2V2ZW50KGV2ZW50X25hbWUpO1xuXG5cdFx0XHRpZiAoaXNfY2FwdHVyZV9ldmVudChldmVudF9uYW1lKSkge1xuXHRcdFx0XHRldmVudF9uYW1lID0gZXZlbnRfbmFtZS5zbGljZSgwLCAtNyk7XG5cdFx0XHRcdG9wdHMuY2FwdHVyZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNfZGVsZWdhdGVkICYmIHByZXZfdmFsdWUpIHtcblx0XHRcdFx0Ly8gTGlzdGVuaW5nIHRvIHNhbWUgZXZlbnQgYnV0IGRpZmZlcmVudCBoYW5kbGVyIC0+IG91ciBoYW5kbGUgZnVuY3Rpb24gYmVsb3cgdGFrZXMgY2FyZSBvZiB0aGlzXG5cdFx0XHRcdC8vIElmIHdlIHdlcmUgdG8gcmVtb3ZlIGFuZCBhZGQgbGlzdGVuZXJzIGluIHRoaXMgY2FzZSwgaXQgY291bGQgaGFwcGVuIHRoYXQgdGhlIGV2ZW50IGlzIFwic3dhbGxvd2VkXCJcblx0XHRcdFx0Ly8gKHRoZSBicm93c2VyIHNlZW1zIHRvIG5vdCBrbm93IHlldCB0aGF0IGEgbmV3IG9uZSBleGlzdHMgbm93KSBhbmQgZG9lc24ndCByZWFjaCB0aGUgaGFuZGxlclxuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy8xMTkwM1xuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkgY29udGludWU7XG5cblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIGN1cnJlbnRbZXZlbnRfaGFuZGxlX2tleV0sIG9wdHMpO1xuXHRcdFx0XHRjdXJyZW50W2V2ZW50X2hhbmRsZV9rZXldID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzX2RlbGVnYXRlZCkge1xuXHRcdFx0XHRkZWxlZ2F0ZWQoZXZlbnRfbmFtZSwgZWxlbWVudCwgdmFsdWUpO1xuXHRcdFx0XHRkZWxlZ2F0ZShbZXZlbnRfbmFtZV0pO1xuXHRcdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBAdGhpcyB7YW55fVxuXHRcdFx0XHQgKiBAcGFyYW0ge0V2ZW50fSBldnRcblx0XHRcdFx0ICovXG5cdFx0XHRcdGZ1bmN0aW9uIGhhbmRsZShldnQpIHtcblx0XHRcdFx0XHRjdXJyZW50W2tleV0uY2FsbCh0aGlzLCBldnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3VycmVudFtldmVudF9oYW5kbGVfa2V5XSA9IGNyZWF0ZV9ldmVudChldmVudF9uYW1lLCBlbGVtZW50LCBoYW5kbGUsIG9wdHMpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG5cdFx0XHQvLyBhdm9pZCB1c2luZyB0aGUgc2V0dGVyXG5cdFx0XHRzZXRfYXR0cmlidXRlKGVsZW1lbnQsIGtleSwgdmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnYXV0b2ZvY3VzJykge1xuXHRcdFx0YXV0b2ZvY3VzKC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovIChlbGVtZW50KSwgQm9vbGVhbih2YWx1ZSkpO1xuXHRcdH0gZWxzZSBpZiAoIWlzX2N1c3RvbV9lbGVtZW50ICYmIChrZXkgPT09ICdfX3ZhbHVlJyB8fCAoa2V5ID09PSAndmFsdWUnICYmIHZhbHVlICE9IG51bGwpKSkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZSBXZSdyZSBub3QgcnVubmluZyB0aGlzIGZvciBjdXN0b20gZWxlbWVudHMgYmVjYXVzZSBfX3ZhbHVlIGlzIGFjdHVhbGx5XG5cdFx0XHQvLyBob3cgTGl0IHN0b3JlcyB0aGUgY3VycmVudCB2YWx1ZSBvbiB0aGUgZWxlbWVudCwgYW5kIG1lc3Npbmcgd2l0aCB0aGF0IHdvdWxkIGJyZWFrIHRoaW5ncy5cblx0XHRcdGVsZW1lbnQudmFsdWUgPSBlbGVtZW50Ll9fdmFsdWUgPSB2YWx1ZTtcblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gJ3NlbGVjdGVkJyAmJiBpc19vcHRpb25fZWxlbWVudCkge1xuXHRcdFx0c2V0X3NlbGVjdGVkKC8qKiBAdHlwZSB7SFRNTE9wdGlvbkVsZW1lbnR9ICovIChlbGVtZW50KSwgdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbmFtZSA9IGtleTtcblx0XHRcdGlmICghcHJlc2VydmVfYXR0cmlidXRlX2Nhc2UpIHtcblx0XHRcdFx0bmFtZSA9IG5vcm1hbGl6ZV9hdHRyaWJ1dGUobmFtZSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpc19kZWZhdWx0ID0gbmFtZSA9PT0gJ2RlZmF1bHRWYWx1ZScgfHwgbmFtZSA9PT0gJ2RlZmF1bHRDaGVja2VkJztcblxuXHRcdFx0aWYgKHZhbHVlID09IG51bGwgJiYgIWlzX2N1c3RvbV9lbGVtZW50ICYmICFpc19kZWZhdWx0KSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXNba2V5XSA9IG51bGw7XG5cblx0XHRcdFx0aWYgKG5hbWUgPT09ICd2YWx1ZScgfHwgbmFtZSA9PT0gJ2NoZWNrZWQnKSB7XG5cdFx0XHRcdFx0Ly8gcmVtb3ZpbmcgdmFsdWUvY2hlY2tlZCBhbHNvIHJlbW92ZXMgZGVmYXVsdFZhbHVlL2RlZmF1bHRDaGVja2VkIOKAlCBwcmVzZXJ2ZVxuXHRcdFx0XHRcdGxldCBpbnB1dCA9IC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi8gKGVsZW1lbnQpO1xuXHRcdFx0XHRcdGNvbnN0IHVzZV9kZWZhdWx0ID0gcHJldiA9PT0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGlmIChuYW1lID09PSAndmFsdWUnKSB7XG5cdFx0XHRcdFx0XHRsZXQgcHJldmlvdXMgPSBpbnB1dC5kZWZhdWx0VmFsdWU7XG5cdFx0XHRcdFx0XHRpbnB1dC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdFx0XHRcdFx0XHRpbnB1dC5kZWZhdWx0VmFsdWUgPSBwcmV2aW91cztcblx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gaW5wdXQuX192YWx1ZSA9IHVzZV9kZWZhdWx0ID8gcHJldmlvdXMgOiBudWxsO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsZXQgcHJldmlvdXMgPSBpbnB1dC5kZWZhdWx0Q2hlY2tlZDtcblx0XHRcdFx0XHRcdGlucHV0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHRcdFx0XHRcdGlucHV0LmRlZmF1bHRDaGVja2VkID0gcHJldmlvdXM7XG5cdFx0XHRcdFx0XHRpbnB1dC5jaGVja2VkID0gdXNlX2RlZmF1bHQgPyBwcmV2aW91cyA6IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRpc19kZWZhdWx0IHx8XG5cdFx0XHRcdChzZXR0ZXJzLmluY2x1ZGVzKG5hbWUpICYmIChpc19jdXN0b21fZWxlbWVudCB8fCB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSlcblx0XHRcdCkge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGVsZW1lbnRbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdFx0Ly8gcmVtb3ZlIGl0IGZyb20gYXR0cmlidXRlcydzIGNhY2hlXG5cdFx0XHRcdGlmIChuYW1lIGluIGF0dHJpYnV0ZXMpIGF0dHJpYnV0ZXNbbmFtZV0gPSBVTklOSVRJQUxJWkVEO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0c2V0X2F0dHJpYnV0ZShlbGVtZW50LCBuYW1lLCB2YWx1ZSwgc2tpcF93YXJuaW5nKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoaXNfaHlkcmF0aW5nX2N1c3RvbV9lbGVtZW50KSB7XG5cdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblx0fVxuXG5cdHJldHVybiBjdXJyZW50O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudCAmIEVsZW1lbnRDU1NJbmxpbmVTdHlsZX0gZWxlbWVudFxuICogQHBhcmFtIHsoLi4uZXhwcmVzc2lvbnM6IGFueSkgPT4gUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55Pn0gZm5cbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gYW55Pn0gc3luY1xuICogQHBhcmFtIHtBcnJheTwoKSA9PiBQcm9taXNlPGFueT4+fSBhc3luY1xuICogQHBhcmFtIHtCbG9ja2VyW119IGJsb2NrZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Nzc19oYXNoXVxuICogQHBhcmFtIHtib29sZWFufSBbc2hvdWxkX3JlbW92ZV9kZWZhdWx0c11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBfd2FybmluZ11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZV9lZmZlY3QoXG5cdGVsZW1lbnQsXG5cdGZuLFxuXHRzeW5jID0gW10sXG5cdGFzeW5jID0gW10sXG5cdGJsb2NrZXJzID0gW10sXG5cdGNzc19oYXNoLFxuXHRzaG91bGRfcmVtb3ZlX2RlZmF1bHRzID0gZmFsc2UsXG5cdHNraXBfd2FybmluZyA9IGZhbHNlXG4pIHtcblx0ZmxhdHRlbihibG9ja2Vycywgc3luYywgYXN5bmMsICh2YWx1ZXMpID0+IHtcblx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT4gfCB1bmRlZmluZWR9ICovXG5cdFx0dmFyIHByZXYgPSB1bmRlZmluZWQ7XG5cblx0XHQvKiogQHR5cGUge1JlY29yZDxzeW1ib2wsIEVmZmVjdD59ICovXG5cdFx0dmFyIGVmZmVjdHMgPSB7fTtcblxuXHRcdHZhciBpc19zZWxlY3QgPSBlbGVtZW50Lm5vZGVOYW1lID09PSBTRUxFQ1RfVEFHO1xuXHRcdHZhciBpbml0ZWQgPSBmYWxzZTtcblxuXHRcdG1hbmFnZWQoKCkgPT4ge1xuXHRcdFx0dmFyIG5leHQgPSBmbiguLi52YWx1ZXMubWFwKGdldCkpO1xuXHRcdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+fSAqL1xuXHRcdFx0dmFyIGN1cnJlbnQgPSBzZXRfYXR0cmlidXRlcyhcblx0XHRcdFx0ZWxlbWVudCxcblx0XHRcdFx0cHJldixcblx0XHRcdFx0bmV4dCxcblx0XHRcdFx0Y3NzX2hhc2gsXG5cdFx0XHRcdHNob3VsZF9yZW1vdmVfZGVmYXVsdHMsXG5cdFx0XHRcdHNraXBfd2FybmluZ1xuXHRcdFx0KTtcblxuXHRcdFx0aWYgKGluaXRlZCAmJiBpc19zZWxlY3QgJiYgJ3ZhbHVlJyBpbiBuZXh0KSB7XG5cdFx0XHRcdHNlbGVjdF9vcHRpb24oLyoqIEB0eXBlIHtIVE1MU2VsZWN0RWxlbWVudH0gKi8gKGVsZW1lbnQpLCBuZXh0LnZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgc3ltYm9sIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZWZmZWN0cykpIHtcblx0XHRcdFx0aWYgKCFuZXh0W3N5bWJvbF0pIGRlc3Ryb3lfZWZmZWN0KGVmZmVjdHNbc3ltYm9sXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IHN5bWJvbCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG5leHQpKSB7XG5cdFx0XHRcdHZhciBuID0gbmV4dFtzeW1ib2xdO1xuXG5cdFx0XHRcdGlmIChzeW1ib2wuZGVzY3JpcHRpb24gPT09IEFUVEFDSE1FTlRfS0VZICYmICghcHJldiB8fCBuICE9PSBwcmV2W3N5bWJvbF0pKSB7XG5cdFx0XHRcdFx0aWYgKGVmZmVjdHNbc3ltYm9sXSkgZGVzdHJveV9lZmZlY3QoZWZmZWN0c1tzeW1ib2xdKTtcblx0XHRcdFx0XHRlZmZlY3RzW3N5bWJvbF0gPSBicmFuY2goKCkgPT4gYXR0YWNoKGVsZW1lbnQsICgpID0+IG4pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnJlbnRbc3ltYm9sXSA9IG47XG5cdFx0XHR9XG5cblx0XHRcdHByZXYgPSBjdXJyZW50O1xuXHRcdH0pO1xuXG5cdFx0aWYgKGlzX3NlbGVjdCkge1xuXHRcdFx0dmFyIHNlbGVjdCA9IC8qKiBAdHlwZSB7SFRNTFNlbGVjdEVsZW1lbnR9ICovIChlbGVtZW50KTtcblxuXHRcdFx0ZWZmZWN0KCgpID0+IHtcblx0XHRcdFx0c2VsZWN0X29wdGlvbihzZWxlY3QsIC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55Pn0gKi8gKHByZXYpLnZhbHVlLCB0cnVlKTtcblx0XHRcdFx0aW5pdF9zZWxlY3Qoc2VsZWN0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGluaXRlZCA9IHRydWU7XG5cdH0pO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0X2F0dHJpYnV0ZXMoZWxlbWVudCkge1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPn0gKiovIChcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0ZWxlbWVudC5fX2F0dHJpYnV0ZXMgPz89IHtcblx0XHRcdFtJU19DVVNUT01fRUxFTUVOVF06IGVsZW1lbnQubm9kZU5hbWUuaW5jbHVkZXMoJy0nKSxcblx0XHRcdFtJU19IVE1MXTogZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE5BTUVTUEFDRV9IVE1MXG5cdFx0fVxuXHQpO1xufVxuXG4vKiogQHR5cGUge01hcDxzdHJpbmcsIHN0cmluZ1tdPn0gKi9cbnZhciBzZXR0ZXJzX2NhY2hlID0gbmV3IE1hcCgpO1xuXG4vKiogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50ICovXG5mdW5jdGlvbiBnZXRfc2V0dGVycyhlbGVtZW50KSB7XG5cdHZhciBjYWNoZV9rZXkgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaXMnKSB8fCBlbGVtZW50Lm5vZGVOYW1lO1xuXHR2YXIgc2V0dGVycyA9IHNldHRlcnNfY2FjaGUuZ2V0KGNhY2hlX2tleSk7XG5cdGlmIChzZXR0ZXJzKSByZXR1cm4gc2V0dGVycztcblx0c2V0dGVyc19jYWNoZS5zZXQoY2FjaGVfa2V5LCAoc2V0dGVycyA9IFtdKSk7XG5cblx0dmFyIGRlc2NyaXB0b3JzO1xuXHR2YXIgcHJvdG8gPSBlbGVtZW50OyAvLyBJbiB0aGUgY2FzZSBvZiBjdXN0b20gZWxlbWVudHMgdGhlcmUgbWlnaHQgYmUgc2V0dGVycyBvbiB0aGUgaW5zdGFuY2Vcblx0dmFyIGVsZW1lbnRfcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcblxuXHQvLyBTdG9wIGF0IEVsZW1lbnQsIGZyb20gdGhlcmUgb24gdGhlcmUncyBvbmx5IHVubmVjZXNzYXJ5IHNldHRlcnMgd2UncmUgbm90IGludGVyZXN0ZWQgaW5cblx0Ly8gRG8gbm90IHVzZSBjb250cnVjdG9yLm5hbWUgaGVyZSBhcyB0aGF0J3MgdW5yZWxpYWJsZSBpbiBzb21lIGJyb3dzZXIgZW52aXJvbm1lbnRzXG5cdHdoaWxlIChlbGVtZW50X3Byb3RvICE9PSBwcm90bykge1xuXHRcdGRlc2NyaXB0b3JzID0gZ2V0X2Rlc2NyaXB0b3JzKHByb3RvKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBkZXNjcmlwdG9ycykge1xuXHRcdFx0aWYgKGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG5cdFx0XHRcdHNldHRlcnMucHVzaChrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0X3Byb3RvdHlwZV9vZihwcm90byk7XG5cdH1cblxuXHRyZXR1cm4gc2V0dGVycztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrX3NyY19pbl9kZXZfaHlkcmF0aW9uKGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcblx0aWYgKCFERVYpIHJldHVybjtcblx0aWYgKGF0dHJpYnV0ZSA9PT0gJ3NyY3NldCcgJiYgc3Jjc2V0X3VybF9lcXVhbChlbGVtZW50LCB2YWx1ZSkpIHJldHVybjtcblx0aWYgKHNyY191cmxfZXF1YWwoZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSA/PyAnJywgdmFsdWUpKSByZXR1cm47XG5cblx0dy5oeWRyYXRpb25fYXR0cmlidXRlX2NoYW5nZWQoXG5cdFx0YXR0cmlidXRlLFxuXHRcdGVsZW1lbnQub3V0ZXJIVE1MLnJlcGxhY2UoZWxlbWVudC5pbm5lckhUTUwsIGVsZW1lbnQuaW5uZXJIVE1MICYmICcuLi4nKSxcblx0XHRTdHJpbmcodmFsdWUpXG5cdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRfc3JjXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gc3JjX3VybF9lcXVhbChlbGVtZW50X3NyYywgdXJsKSB7XG5cdGlmIChlbGVtZW50X3NyYyA9PT0gdXJsKSByZXR1cm4gdHJ1ZTtcblx0cmV0dXJuIG5ldyBVUkwoZWxlbWVudF9zcmMsIGRvY3VtZW50LmJhc2VVUkkpLmhyZWYgPT09IG5ldyBVUkwodXJsLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmO1xufVxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHNyY3NldCAqL1xuZnVuY3Rpb24gc3BsaXRfc3Jjc2V0KHNyY3NldCkge1xuXHRyZXR1cm4gc3Jjc2V0LnNwbGl0KCcsJykubWFwKChzcmMpID0+IHNyYy50cmltKCkuc3BsaXQoJyAnKS5maWx0ZXIoQm9vbGVhbikpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFNvdXJjZUVsZW1lbnQgfCBIVE1MSW1hZ2VFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gc3Jjc2V0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gc3Jjc2V0X3VybF9lcXVhbChlbGVtZW50LCBzcmNzZXQpIHtcblx0dmFyIGVsZW1lbnRfdXJscyA9IHNwbGl0X3NyY3NldChlbGVtZW50LnNyY3NldCk7XG5cdHZhciB1cmxzID0gc3BsaXRfc3Jjc2V0KHNyY3NldCk7XG5cblx0cmV0dXJuIChcblx0XHR1cmxzLmxlbmd0aCA9PT0gZWxlbWVudF91cmxzLmxlbmd0aCAmJlxuXHRcdHVybHMuZXZlcnkoXG5cdFx0XHQoW3VybCwgd2lkdGhdLCBpKSA9PlxuXHRcdFx0XHR3aWR0aCA9PT0gZWxlbWVudF91cmxzW2ldWzFdICYmXG5cdFx0XHRcdC8vIFdlIG5lZWQgdG8gdGVzdCBib3RoIHdheXMgYmVjYXVzZSBWaXRlIHdpbGwgY3JlYXRlIGFuIGEgZnVsbCBVUkwgd2l0aFxuXHRcdFx0XHQvLyBgbmV3IFVSTChhc3NldCwgaW1wb3J0Lm1ldGEudXJsKS5ocmVmYCBmb3IgdGhlIGNsaWVudCB3aGVuIGBiYXNlOiAnLi8nYCwgYW5kIHRoZVxuXHRcdFx0XHQvLyByZWxhdGl2ZSBVUkxzIGluc2lkZSBzcmNzZXQgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IHJlc29sdmVkIHRvIGFic29sdXRlIFVSTHMgYnlcblx0XHRcdFx0Ly8gYnJvd3NlcnMgKGluIGNvbnRyYXN0IHRvIGltZy5zcmMpLiBUaGlzIG1lYW5zIGJvdGggU1NSIGFuZCBET00gY29kZSBjb3VsZFxuXHRcdFx0XHQvLyBjb250YWluIHJlbGF0aXZlIG9yIGFic29sdXRlIFVSTHMuXG5cdFx0XHRcdChzcmNfdXJsX2VxdWFsKGVsZW1lbnRfdXJsc1tpXVswXSwgdXJsKSB8fCBzcmNfdXJsX2VxdWFsKHVybCwgZWxlbWVudF91cmxzW2ldWzBdKSlcblx0XHQpXG5cdCk7XG59XG4iLCIvKiogQGltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcycgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgcmVuZGVyX2VmZmVjdCwgdGVhcmRvd24gfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgbGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudCB9IGZyb20gJy4vc2hhcmVkLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vLi4vLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IGlzIH0gZnJvbSAnLi4vLi4vLi4vcHJveHkuanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uLy4uL3Rhc2suanMnO1xuaW1wb3J0IHsgaHlkcmF0aW5nIH0gZnJvbSAnLi4vLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IHRpY2ssIHVudHJhY2sgfSBmcm9tICcuLi8uLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IGlzX3J1bmVzIH0gZnJvbSAnLi4vLi4vLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBjdXJyZW50X2JhdGNoLCBwcmV2aW91c19iYXRjaCB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvYmF0Y2guanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEBwYXJhbSB7KCkgPT4gdW5rbm93bn0gZ2V0XG4gKiBAcGFyYW0geyh2YWx1ZTogdW5rbm93bikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfdmFsdWUoaW5wdXQsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdHZhciBiYXRjaGVzID0gbmV3IFdlYWtTZXQoKTtcblxuXHRsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50KGlucHV0LCAnaW5wdXQnLCBhc3luYyAoaXNfcmVzZXQpID0+IHtcblx0XHRpZiAoREVWICYmIGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcblx0XHRcdC8vIFRPRE8gc2hvdWxkIHRoaXMgaGFwcGVuIGluIHByb2QgdG9vP1xuXHRcdFx0ZS5iaW5kX2ludmFsaWRfY2hlY2tib3hfdmFsdWUoKTtcblx0XHR9XG5cblx0XHQvKiogQHR5cGUge2FueX0gKi9cblx0XHR2YXIgdmFsdWUgPSBpc19yZXNldCA/IGlucHV0LmRlZmF1bHRWYWx1ZSA6IGlucHV0LnZhbHVlO1xuXHRcdHZhbHVlID0gaXNfbnVtYmVybGlrZV9pbnB1dChpbnB1dCkgPyB0b19udW1iZXIodmFsdWUpIDogdmFsdWU7XG5cdFx0c2V0KHZhbHVlKTtcblxuXHRcdGlmIChjdXJyZW50X2JhdGNoICE9PSBudWxsKSB7XG5cdFx0XHRiYXRjaGVzLmFkZChjdXJyZW50X2JhdGNoKTtcblx0XHR9XG5cblx0XHQvLyBCZWNhdXNlIGB7I2VhY2ggLi4ufWAgYmxvY2tzIHdvcmsgYnkgdXBkYXRpbmcgc291cmNlcyBpbnNpZGUgdGhlIGZsdXNoLFxuXHRcdC8vIHdlIG5lZWQgdG8gd2FpdCBhIHRpY2sgYmVmb3JlIGNoZWNraW5nIHRvIHNlZSBpZiB3ZSBzaG91bGQgZm9yY2libHlcblx0XHQvLyB1cGRhdGUgdGhlIGlucHV0IGFuZCByZXNldCB0aGUgc2VsZWN0aW9uIHN0YXRlXG5cdFx0YXdhaXQgdGljaygpO1xuXG5cdFx0Ly8gUmVzcGVjdCBhbnkgdmFsaWRhdGlvbiBpbiBhY2Nlc3NvcnNcblx0XHRpZiAodmFsdWUgIT09ICh2YWx1ZSA9IGdldCgpKSkge1xuXHRcdFx0dmFyIHN0YXJ0ID0gaW5wdXQuc2VsZWN0aW9uU3RhcnQ7XG5cdFx0XHR2YXIgZW5kID0gaW5wdXQuc2VsZWN0aW9uRW5kO1xuXHRcdFx0dmFyIGxlbmd0aCA9IGlucHV0LnZhbHVlLmxlbmd0aDtcblxuXHRcdFx0Ly8gdGhlIHZhbHVlIGlzIGNvZXJjZWQgb24gYXNzaWdubWVudFxuXHRcdFx0aW5wdXQudmFsdWUgPSB2YWx1ZSA/PyAnJztcblxuXHRcdFx0Ly8gUmVzdG9yZSBzZWxlY3Rpb25cblx0XHRcdGlmIChlbmQgIT09IG51bGwpIHtcblx0XHRcdFx0dmFyIG5ld19sZW5ndGggPSBpbnB1dC52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdC8vIElmIGN1cnNvciB3YXMgYXQgZW5kIGFuZCBuZXcgaW5wdXQgaXMgbG9uZ2VyLCBtb3ZlIGN1cnNvciB0byBuZXcgZW5kXG5cdFx0XHRcdGlmIChzdGFydCA9PT0gZW5kICYmIGVuZCA9PT0gbGVuZ3RoICYmIG5ld19sZW5ndGggPiBsZW5ndGgpIHtcblx0XHRcdFx0XHRpbnB1dC5zZWxlY3Rpb25TdGFydCA9IG5ld19sZW5ndGg7XG5cdFx0XHRcdFx0aW5wdXQuc2VsZWN0aW9uRW5kID0gbmV3X2xlbmd0aDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpbnB1dC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0O1xuXHRcdFx0XHRcdGlucHV0LnNlbGVjdGlvbkVuZCA9IE1hdGgubWluKGVuZCwgbmV3X2xlbmd0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdGlmIChcblx0XHQvLyBJZiB3ZSBhcmUgaHlkcmF0aW5nIGFuZCB0aGUgdmFsdWUgaGFzIHNpbmNlIGNoYW5nZWQsXG5cdFx0Ly8gdGhlbiB1c2UgdGhlIHVwZGF0ZWQgdmFsdWUgZnJvbSB0aGUgaW5wdXQgaW5zdGVhZC5cblx0XHQoaHlkcmF0aW5nICYmIGlucHV0LmRlZmF1bHRWYWx1ZSAhPT0gaW5wdXQudmFsdWUpIHx8XG5cdFx0Ly8gSWYgZGVmYXVsdFZhbHVlIGlzIHNldCwgdGhlbiB2YWx1ZSA9PSBkZWZhdWx0VmFsdWVcblx0XHQvLyBUT0RPIFN2ZWx0ZSA2OiByZW1vdmUgaW5wdXQudmFsdWUgY2hlY2sgYW5kIHNldCB0byBlbXB0eSBzdHJpbmc/XG5cdFx0KHVudHJhY2soZ2V0KSA9PSBudWxsICYmIGlucHV0LnZhbHVlKVxuXHQpIHtcblx0XHRzZXQoaXNfbnVtYmVybGlrZV9pbnB1dChpbnB1dCkgPyB0b19udW1iZXIoaW5wdXQudmFsdWUpIDogaW5wdXQudmFsdWUpO1xuXG5cdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRcdGJhdGNoZXMuYWRkKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdGlmIChERVYgJiYgaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuXHRcdFx0Ly8gVE9ETyBzaG91bGQgdGhpcyBoYXBwZW4gaW4gcHJvZCB0b28/XG5cdFx0XHRlLmJpbmRfaW52YWxpZF9jaGVja2JveF92YWx1ZSgpO1xuXHRcdH1cblxuXHRcdHZhciB2YWx1ZSA9IGdldCgpO1xuXG5cdFx0aWYgKGlucHV0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG5cdFx0XHQvLyB3ZSBuZWVkIGJvdGgsIGJlY2F1c2UgaW4gbm9uLWFzeW5jIG1vZGUsIHJlbmRlciBlZmZlY3RzIHJ1biBiZWZvcmUgcHJldmlvdXNfYmF0Y2ggaXMgc2V0XG5cdFx0XHR2YXIgYmF0Y2ggPSAvKiogQHR5cGUge0JhdGNofSAqLyAocHJldmlvdXNfYmF0Y2ggPz8gY3VycmVudF9iYXRjaCk7XG5cblx0XHRcdC8vIE5ldmVyIHJld3JpdGUgdGhlIGNvbnRlbnRzIG9mIGEgZm9jdXNlZCBpbnB1dC4gV2UgY2FuIGdldCBoZXJlIGlmLCBmb3IgZXhhbXBsZSxcblx0XHRcdC8vIGFuIHVwZGF0ZSBpcyBkZWZlcnJlZCBiZWNhdXNlIG9mIGFzeW5jIHdvcmsgZGVwZW5kaW5nIG9uIHRoZSBpbnB1dDpcblx0XHRcdC8vXG5cdFx0XHQvLyA8aW5wdXQgYmluZDp2YWx1ZT17cXVlcnl9PlxuXHRcdFx0Ly8gPHA+e2F3YWl0IGZpbmQocXVlcnkpfTwvcD5cblx0XHRcdGlmIChiYXRjaGVzLmhhcyhiYXRjaCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc19udW1iZXJsaWtlX2lucHV0KGlucHV0KSAmJiB2YWx1ZSA9PT0gdG9fbnVtYmVyKGlucHV0LnZhbHVlKSkge1xuXHRcdFx0Ly8gaGFuZGxlcyAwIHZzIDAwIGNhc2UgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy85OTU5KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChpbnB1dC50eXBlID09PSAnZGF0ZScgJiYgIXZhbHVlICYmICFpbnB1dC52YWx1ZSkge1xuXHRcdFx0Ly8gSGFuZGxlcyB0aGUgY2FzZSB3aGVyZSBhIHRlbXBvcmFyaWx5IGludmFsaWQgZGF0ZSBpcyBzZXQgKHdoaWxlIHR5cGluZywgZm9yIGV4YW1wbGUgd2l0aCBhIGxlYWRpbmcgMCBmb3IgdGhlIGRheSlcblx0XHRcdC8vIGFuZCBwcmV2ZW50cyB0aGlzIHN0YXRlIGZyb20gY2xlYXJpbmcgdGhlIG90aGVyIHBhcnRzIG9mIHRoZSBkYXRlIGlucHV0IChzZWUgaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZS9pc3N1ZXMvNzg5Nylcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBkb24ndCBzZXQgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBpZiBpdCdzIHRoZSBzYW1lIHRvIGFsbG93XG5cdFx0Ly8gbWlubGVuZ3RoIHRvIHdvcmsgcHJvcGVybHlcblx0XHRpZiAodmFsdWUgIT09IGlucHV0LnZhbHVlKSB7XG5cdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIHRoZSB2YWx1ZSBpcyBjb2VyY2VkIG9uIGFzc2lnbm1lbnRcblx0XHRcdGlucHV0LnZhbHVlID0gdmFsdWUgPz8gJyc7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqIEB0eXBlIHtTZXQ8SFRNTElucHV0RWxlbWVudFtdPn0gKi9cbmNvbnN0IHBlbmRpbmcgPSBuZXcgU2V0KCk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50W119IGlucHV0c1xuICogQHBhcmFtIHtudWxsIHwgW251bWJlcl19IGdyb3VwX2luZGV4XG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKiBAcGFyYW0geygpID0+IHVua25vd259IGdldFxuICogQHBhcmFtIHsodmFsdWU6IHVua25vd24pID0+IHZvaWR9IHNldFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX2dyb3VwKGlucHV0cywgZ3JvdXBfaW5kZXgsIGlucHV0LCBnZXQsIHNldCA9IGdldCkge1xuXHR2YXIgaXNfY2hlY2tib3ggPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ2NoZWNrYm94Jztcblx0dmFyIGJpbmRpbmdfZ3JvdXAgPSBpbnB1dHM7XG5cblx0Ly8gbmVlZHMgdG8gYmUgbGV0IG9yIHJlbGF0ZWQgY29kZSBpc24ndCB0cmVlc2hha2VuIG91dCBpZiBpdCdzIGFsd2F5cyBmYWxzZVxuXHRsZXQgaHlkcmF0aW9uX21pc21hdGNoID0gZmFsc2U7XG5cblx0aWYgKGdyb3VwX2luZGV4ICE9PSBudWxsKSB7XG5cdFx0Zm9yICh2YXIgaW5kZXggb2YgZ3JvdXBfaW5kZXgpIHtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRcdGJpbmRpbmdfZ3JvdXAgPSBiaW5kaW5nX2dyb3VwW2luZGV4XSA/Pz0gW107XG5cdFx0fVxuXHR9XG5cblx0YmluZGluZ19ncm91cC5wdXNoKGlucHV0KTtcblxuXHRsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50KFxuXHRcdGlucHV0LFxuXHRcdCdjaGFuZ2UnLFxuXHRcdCgpID0+IHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHZhciB2YWx1ZSA9IGlucHV0Ll9fdmFsdWU7XG5cblx0XHRcdGlmIChpc19jaGVja2JveCkge1xuXHRcdFx0XHR2YWx1ZSA9IGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlKGJpbmRpbmdfZ3JvdXAsIHZhbHVlLCBpbnB1dC5jaGVja2VkKTtcblx0XHRcdH1cblxuXHRcdFx0c2V0KHZhbHVlKTtcblx0XHR9LFxuXHRcdC8vIFRPRE8gYmV0dGVyIGRlZmF1bHQgdmFsdWUgaGFuZGxpbmdcblx0XHQoKSA9PiBzZXQoaXNfY2hlY2tib3ggPyBbXSA6IG51bGwpXG5cdCk7XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIHZhbHVlID0gZ2V0KCk7XG5cblx0XHQvLyBJZiB3ZSBhcmUgaHlkcmF0aW5nIGFuZCB0aGUgdmFsdWUgaGFzIHNpbmNlIGNoYW5nZWQsIHRoZW4gdXNlIHRoZSB1cGRhdGUgdmFsdWVcblx0XHQvLyBmcm9tIHRoZSBpbnB1dCBpbnN0ZWFkLlxuXHRcdGlmIChoeWRyYXRpbmcgJiYgaW5wdXQuZGVmYXVsdENoZWNrZWQgIT09IGlucHV0LmNoZWNrZWQpIHtcblx0XHRcdGh5ZHJhdGlvbl9taXNtYXRjaCA9IHRydWU7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGlzX2NoZWNrYm94KSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlIHx8IFtdO1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0aW5wdXQuY2hlY2tlZCA9IHZhbHVlLmluY2x1ZGVzKGlucHV0Ll9fdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRpbnB1dC5jaGVja2VkID0gaXMoaW5wdXQuX192YWx1ZSwgdmFsdWUpO1xuXHRcdH1cblx0fSk7XG5cblx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdHZhciBpbmRleCA9IGJpbmRpbmdfZ3JvdXAuaW5kZXhPZihpbnB1dCk7XG5cblx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRiaW5kaW5nX2dyb3VwLnNwbGljZShpbmRleCwgMSk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAoIXBlbmRpbmcuaGFzKGJpbmRpbmdfZ3JvdXApKSB7XG5cdFx0cGVuZGluZy5hZGQoYmluZGluZ19ncm91cCk7XG5cblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdC8vIG5lY2Vzc2FyeSB0byBtYWludGFpbiBiaW5kaW5nIGdyb3VwIG9yZGVyIGluIGFsbCBpbnNlcnRpb24gc2NlbmFyaW9zXG5cdFx0XHRiaW5kaW5nX2dyb3VwLnNvcnQoKGEsIGIpID0+IChhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGIpID09PSA0ID8gLTEgOiAxKSk7XG5cdFx0XHRwZW5kaW5nLmRlbGV0ZShiaW5kaW5nX2dyb3VwKTtcblx0XHR9KTtcblx0fVxuXG5cdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdGlmIChoeWRyYXRpb25fbWlzbWF0Y2gpIHtcblx0XHRcdHZhciB2YWx1ZTtcblxuXHRcdFx0aWYgKGlzX2NoZWNrYm94KSB7XG5cdFx0XHRcdHZhbHVlID0gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoYmluZGluZ19ncm91cCwgdmFsdWUsIGlucHV0LmNoZWNrZWQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIGh5ZHJhdGlvbl9pbnB1dCA9IGJpbmRpbmdfZ3JvdXAuZmluZCgoaW5wdXQpID0+IGlucHV0LmNoZWNrZWQpO1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdHZhbHVlID0gaHlkcmF0aW9uX2lucHV0Py5fX3ZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRzZXQodmFsdWUpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dFxuICogQHBhcmFtIHsoKSA9PiB1bmtub3dufSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duKSA9PiB2b2lkfSBzZXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9jaGVja2VkKGlucHV0LCBnZXQsIHNldCA9IGdldCkge1xuXHRsaXN0ZW5fdG9fZXZlbnRfYW5kX3Jlc2V0X2V2ZW50KGlucHV0LCAnY2hhbmdlJywgKGlzX3Jlc2V0KSA9PiB7XG5cdFx0dmFyIHZhbHVlID0gaXNfcmVzZXQgPyBpbnB1dC5kZWZhdWx0Q2hlY2tlZCA6IGlucHV0LmNoZWNrZWQ7XG5cdFx0c2V0KHZhbHVlKTtcblx0fSk7XG5cblx0aWYgKFxuXHRcdC8vIElmIHdlIGFyZSBoeWRyYXRpbmcgYW5kIHRoZSB2YWx1ZSBoYXMgc2luY2UgY2hhbmdlZCxcblx0XHQvLyB0aGVuIHVzZSB0aGUgdXBkYXRlIHZhbHVlIGZyb20gdGhlIGlucHV0IGluc3RlYWQuXG5cdFx0KGh5ZHJhdGluZyAmJiBpbnB1dC5kZWZhdWx0Q2hlY2tlZCAhPT0gaW5wdXQuY2hlY2tlZCkgfHxcblx0XHQvLyBJZiBkZWZhdWx0Q2hlY2tlZCBpcyBzZXQsIHRoZW4gY2hlY2tlZCA9PSBkZWZhdWx0Q2hlY2tlZFxuXHRcdHVudHJhY2soZ2V0KSA9PSBudWxsXG5cdCkge1xuXHRcdHNldChpbnB1dC5jaGVja2VkKTtcblx0fVxuXG5cdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdHZhciB2YWx1ZSA9IGdldCgpO1xuXHRcdGlucHV0LmNoZWNrZWQgPSBCb29sZWFuKHZhbHVlKTtcblx0fSk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7QXJyYXk8SFRNTElucHV0RWxlbWVudD59IGdyb3VwXG4gKiBAcGFyYW0ge1Z9IF9fdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZFxuICogQHJldHVybnMge1ZbXX1cbiAqL1xuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcblx0LyoqIEB0eXBlIHtTZXQ8Vj59ICovXG5cdHZhciB2YWx1ZSA9IG5ldyBTZXQoKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGdyb3VwW2ldLmNoZWNrZWQpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHZhbHVlLmFkZChncm91cFtpXS5fX3ZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIWNoZWNrZWQpIHtcblx0XHR2YWx1ZS5kZWxldGUoX192YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dFxuICovXG5mdW5jdGlvbiBpc19udW1iZXJsaWtlX2lucHV0KGlucHV0KSB7XG5cdHZhciB0eXBlID0gaW5wdXQudHlwZTtcblx0cmV0dXJuIHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdyYW5nZSc7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgPT09ICcnID8gbnVsbCA6ICt2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKiBAcGFyYW0geygpID0+IEZpbGVMaXN0IHwgbnVsbH0gZ2V0XG4gKiBAcGFyYW0geyh2YWx1ZTogRmlsZUxpc3QgfCBudWxsKSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfZmlsZXMoaW5wdXQsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoaW5wdXQsICdjaGFuZ2UnLCAoKSA9PiB7XG5cdFx0c2V0KGlucHV0LmZpbGVzKTtcblx0fSk7XG5cblx0aWYgKFxuXHRcdC8vIElmIHdlIGFyZSBoeWRyYXRpbmcgYW5kIHRoZSB2YWx1ZSBoYXMgc2luY2UgY2hhbmdlZCxcblx0XHQvLyB0aGVuIHVzZSB0aGUgdXBkYXRlZCB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbnN0ZWFkLlxuXHRcdGh5ZHJhdGluZyAmJlxuXHRcdGlucHV0LmZpbGVzXG5cdCkge1xuXHRcdHNldChpbnB1dC5maWxlcyk7XG5cdH1cblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHRpbnB1dC5maWxlcyA9IGdldCgpO1xuXHR9KTtcbn1cbiIsImltcG9ydCB7IHRlYXJkb3duIH0gZnJvbSAnLi4vLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGdldF9kZXNjcmlwdG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcblxuLyoqXG4gKiBNYWtlcyBhbiBgZXhwb3J0YGVkIChub24tcHJvcCkgdmFyaWFibGUgYXZhaWxhYmxlIG9uIHRoZSBgJCRwcm9wc2Agb2JqZWN0XG4gKiBzbyB0aGF0IGNvbnN1bWVycyBjYW4gZG8gYGJpbmQ6eGAgb24gdGhlIGNvbXBvbmVudC5cbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9wcm9wKHByb3BzLCBwcm9wLCB2YWx1ZSkge1xuXHR2YXIgZGVzYyA9IGdldF9kZXNjcmlwdG9yKHByb3BzLCBwcm9wKTtcblxuXHRpZiAoZGVzYyAmJiBkZXNjLnNldCkge1xuXHRcdHByb3BzW3Byb3BdID0gdmFsdWU7XG5cdFx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdFx0cHJvcHNbcHJvcF0gPSBudWxsO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBTVEFURV9TWU1CT0wgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBlZmZlY3QsIHJlbmRlcl9lZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgdW50cmFjayB9IGZyb20gJy4uLy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uLy4uL3Rhc2suanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBib3VuZF92YWx1ZVxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50X29yX2NvbXBvbmVudFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzX2JvdW5kX3RoaXMoYm91bmRfdmFsdWUsIGVsZW1lbnRfb3JfY29tcG9uZW50KSB7XG5cdHJldHVybiAoXG5cdFx0Ym91bmRfdmFsdWUgPT09IGVsZW1lbnRfb3JfY29tcG9uZW50IHx8IGJvdW5kX3ZhbHVlPy5bU1RBVEVfU1lNQk9MXSA9PT0gZWxlbWVudF9vcl9jb21wb25lbnRcblx0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gZWxlbWVudF9vcl9jb21wb25lbnRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duLCAuLi5wYXJ0czogdW5rbm93bltdKSA9PiB2b2lkfSB1cGRhdGVcbiAqIEBwYXJhbSB7KC4uLnBhcnRzOiB1bmtub3duW10pID0+IHVua25vd259IGdldF92YWx1ZVxuICogQHBhcmFtIHsoKSA9PiB1bmtub3duW119IFtnZXRfcGFydHNdIFNldCBpZiB0aGUgdGhpcyBiaW5kaW5nIGlzIHVzZWQgaW5zaWRlIGFuIGVhY2ggYmxvY2ssXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybnMgYWxsIHRoZSBwYXJ0cyBvZiB0aGUgZWFjaCBibG9jayBjb250ZXh0IHRoYXQgYXJlIHVzZWQgaW4gdGhlIGV4cHJlc3Npb25cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF90aGlzKGVsZW1lbnRfb3JfY29tcG9uZW50ID0ge30sIHVwZGF0ZSwgZ2V0X3ZhbHVlLCBnZXRfcGFydHMpIHtcblx0ZWZmZWN0KCgpID0+IHtcblx0XHQvKiogQHR5cGUge3Vua25vd25bXX0gKi9cblx0XHR2YXIgb2xkX3BhcnRzO1xuXG5cdFx0LyoqIEB0eXBlIHt1bmtub3duW119ICovXG5cdFx0dmFyIHBhcnRzO1xuXG5cdFx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0XHRvbGRfcGFydHMgPSBwYXJ0cztcblx0XHRcdC8vIFdlIG9ubHkgdHJhY2sgY2hhbmdlcyB0byB0aGUgcGFydHMsIG5vdCB0aGUgdmFsdWUgaXRzZWxmIHRvIGF2b2lkIHVubmVjZXNzYXJ5IHJlcnVucy5cblx0XHRcdHBhcnRzID0gZ2V0X3BhcnRzPy4oKSB8fCBbXTtcblxuXHRcdFx0dW50cmFjaygoKSA9PiB7XG5cdFx0XHRcdGlmIChlbGVtZW50X29yX2NvbXBvbmVudCAhPT0gZ2V0X3ZhbHVlKC4uLnBhcnRzKSkge1xuXHRcdFx0XHRcdHVwZGF0ZShlbGVtZW50X29yX2NvbXBvbmVudCwgLi4ucGFydHMpO1xuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgYW4gZWZmZWN0IHJlcnVuIChjYXVzZTogZWFjaCBibG9jayBjb250ZXh0IGNoYW5nZXMpLCB0aGVuIG51bGxpZnkgdGhlIGJpbmRpbmcgYXRcblx0XHRcdFx0XHQvLyB0aGUgcHJldmlvdXMgcG9zaXRpb24gaWYgaXQgaXNuJ3QgYWxyZWFkeSB0YWtlbiBvdmVyIGJ5IGEgZGlmZmVyZW50IGVmZmVjdC5cblx0XHRcdFx0XHRpZiAob2xkX3BhcnRzICYmIGlzX2JvdW5kX3RoaXMoZ2V0X3ZhbHVlKC4uLm9sZF9wYXJ0cyksIGVsZW1lbnRfb3JfY29tcG9uZW50KSkge1xuXHRcdFx0XHRcdFx0dXBkYXRlKG51bGwsIC4uLm9sZF9wYXJ0cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHQvLyBXZSBjYW5ub3QgdXNlIGVmZmVjdHMgaW4gdGhlIHRlYXJkb3duIHBoYXNlLCB3ZSB3ZSB1c2UgYSBtaWNyb3Rhc2sgaW5zdGVhZC5cblx0XHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0XHRpZiAocGFydHMgJiYgaXNfYm91bmRfdGhpcyhnZXRfdmFsdWUoLi4ucGFydHMpLCBlbGVtZW50X29yX2NvbXBvbmVudCkpIHtcblx0XHRcdFx0XHR1cGRhdGUobnVsbCwgLi4ucGFydHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudF9vcl9jb21wb25lbnQ7XG59XG4iLCJpbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IHVzZXJfcHJlX2VmZmVjdCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBvbiB9IGZyb20gJy4uL2VsZW1lbnRzL2V2ZW50cy5qcyc7XG5cbi8qKlxuICogU3Vic3RpdHV0ZSBmb3IgdGhlIGB0cnVzdGVkYCBldmVudCBtb2RpZmllclxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7KGV2ZW50OiBFdmVudCwgLi4uYXJnczogQXJyYXk8dW5rbm93bj4pID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ1c3RlZChmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHR2YXIgZXZlbnQgPSAvKiogQHR5cGUge0V2ZW50fSAqLyAoYXJnc1swXSk7XG5cdFx0aWYgKGV2ZW50LmlzVHJ1c3RlZCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Zm4/LmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRlIGZvciB0aGUgYHNlbGZgIGV2ZW50IG1vZGlmaWVyXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiBBcnJheTx1bmtub3duPikgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHsoZXZlbnQ6IEV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxmKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdHZhciBldmVudCA9IC8qKiBAdHlwZSB7RXZlbnR9ICovIChhcmdzWzBdKTtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Zm4/LmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRlIGZvciB0aGUgYHN0b3BQcm9wYWdhdGlvbmAgZXZlbnQgbW9kaWZpZXJcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0geyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSA9PiB2b2lkfSBmblxuICogQHJldHVybnMgeyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbihmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHR2YXIgZXZlbnQgPSAvKiogQHR5cGUge0V2ZW50fSAqLyAoYXJnc1swXSk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBmbj8uYXBwbHkodGhpcywgYXJncyk7XG5cdH07XG59XG5cbi8qKlxuICogU3Vic3RpdHV0ZSBmb3IgdGhlIGBvbmNlYCBldmVudCBtb2RpZmllclxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7KGV2ZW50OiBFdmVudCwgLi4uYXJnczogQXJyYXk8dW5rbm93bj4pID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25jZShmbikge1xuXHR2YXIgcmFuID0gZmFsc2U7XG5cblx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0aWYgKHJhbikgcmV0dXJuO1xuXHRcdHJhbiA9IHRydWU7XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmV0dXJuIGZuPy5hcHBseSh0aGlzLCBhcmdzKTtcblx0fTtcbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRlIGZvciB0aGUgYHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbmAgZXZlbnQgbW9kaWZpZXJcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0geyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSA9PiB2b2lkfSBmblxuICogQHJldHVybnMgeyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbihmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHR2YXIgZXZlbnQgPSAvKiogQHR5cGUge0V2ZW50fSAqLyAoYXJnc1swXSk7XG5cdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBmbj8uYXBwbHkodGhpcywgYXJncyk7XG5cdH07XG59XG5cbi8qKlxuICogU3Vic3RpdHV0ZSBmb3IgdGhlIGBwcmV2ZW50RGVmYXVsdGAgZXZlbnQgbW9kaWZpZXJcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0geyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSA9PiB2b2lkfSBmblxuICogQHJldHVybnMgeyhldmVudDogRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdHZhciBldmVudCA9IC8qKiBAdHlwZSB7RXZlbnR9ICovIChhcmdzWzBdKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gZm4/LmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKipcbiAqIFN1YnN0aXR1dGUgZm9yIHRoZSBgcGFzc2l2ZWAgZXZlbnQgbW9kaWZpZXIsIGltcGxlbWVudGVkIGFzIGFuIGFjdGlvblxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7W2V2ZW50OiBzdHJpbmcsIGhhbmRsZXI6ICgpID0+IEV2ZW50TGlzdGVuZXJdfSBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXNzaXZlKG5vZGUsIFtldmVudCwgaGFuZGxlcl0pIHtcblx0dXNlcl9wcmVfZWZmZWN0KCgpID0+IHtcblx0XHRyZXR1cm4gb24obm9kZSwgZXZlbnQsIGhhbmRsZXIoKSA/PyBub29wLCB7XG5cdFx0XHRwYXNzaXZlOiB0cnVlXG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIFN1YnN0aXR1dGUgZm9yIHRoZSBgbm9ucGFzc2l2ZWAgZXZlbnQgbW9kaWZpZXIsIGltcGxlbWVudGVkIGFzIGFuIGFjdGlvblxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7W2V2ZW50OiBzdHJpbmcsIGhhbmRsZXI6ICgpID0+IEV2ZW50TGlzdGVuZXJdfSBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub25wYXNzaXZlKG5vZGUsIFtldmVudCwgaGFuZGxlcl0pIHtcblx0dXNlcl9wcmVfZWZmZWN0KCgpID0+IHtcblx0XHRyZXR1cm4gb24obm9kZSwgZXZlbnQsIGhhbmRsZXIoKSA/PyBub29wLCB7XG5cdFx0XHRwYXNzaXZlOiBmYWxzZVxuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dExlZ2FjeSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBydW4sIHJ1bl9hbGwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IGRlcml2ZWQgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2Rlcml2ZWRzLmpzJztcbmltcG9ydCB7IHVzZXJfcHJlX2VmZmVjdCwgdXNlcl9lZmZlY3QgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgZGVlcF9yZWFkX3N0YXRlLCBnZXQsIHVudHJhY2sgfSBmcm9tICcuLi8uLi9ydW50aW1lLmpzJztcblxuLyoqXG4gKiBMZWdhY3ktbW9kZSBvbmx5OiBDYWxsIGBvbk1vdW50YCBjYWxsYmFja3MgYW5kIHNldCB1cCBgYmVmb3JlVXBkYXRlYC9gYWZ0ZXJVcGRhdGVgIGVmZmVjdHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ltbXV0YWJsZV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoaW1tdXRhYmxlID0gZmFsc2UpIHtcblx0Y29uc3QgY29udGV4dCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dExlZ2FjeX0gKi8gKGNvbXBvbmVudF9jb250ZXh0KTtcblxuXHRjb25zdCBjYWxsYmFja3MgPSBjb250ZXh0LmwudTtcblx0aWYgKCFjYWxsYmFja3MpIHJldHVybjtcblxuXHRsZXQgcHJvcHMgPSAoKSA9PiBkZWVwX3JlYWRfc3RhdGUoY29udGV4dC5zKTtcblxuXHRpZiAoaW1tdXRhYmxlKSB7XG5cdFx0bGV0IHZlcnNpb24gPSAwO1xuXHRcdGxldCBwcmV2ID0gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqLyAoe30pO1xuXG5cdFx0Ly8gSW4gbGVnYWN5IGltbXV0YWJsZSBtb2RlLCBiZWZvcmUvYWZ0ZXJVcGRhdGUgb25seSBmaXJlIGlmIHRoZSBvYmplY3QgaWRlbnRpdHkgb2YgYSBwcm9wIGNoYW5nZXNcblx0XHRjb25zdCBkID0gZGVyaXZlZCgoKSA9PiB7XG5cdFx0XHRsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0Y29uc3QgcHJvcHMgPSBjb250ZXh0LnM7XG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuXHRcdFx0XHRpZiAocHJvcHNba2V5XSAhPT0gcHJldltrZXldKSB7XG5cdFx0XHRcdFx0cHJldltrZXldID0gcHJvcHNba2V5XTtcblx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGNoYW5nZWQpIHZlcnNpb24rKztcblx0XHRcdHJldHVybiB2ZXJzaW9uO1xuXHRcdH0pO1xuXG5cdFx0cHJvcHMgPSAoKSA9PiBnZXQoZCk7XG5cdH1cblxuXHQvLyBiZWZvcmVVcGRhdGVcblx0aWYgKGNhbGxiYWNrcy5iLmxlbmd0aCkge1xuXHRcdHVzZXJfcHJlX2VmZmVjdCgoKSA9PiB7XG5cdFx0XHRvYnNlcnZlX2FsbChjb250ZXh0LCBwcm9wcyk7XG5cdFx0XHRydW5fYWxsKGNhbGxiYWNrcy5iKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIG9uTW91bnQgKG11c3QgcnVuIGJlZm9yZSBhZnRlclVwZGF0ZSlcblx0dXNlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdGNvbnN0IGZucyA9IHVudHJhY2soKCkgPT4gY2FsbGJhY2tzLm0ubWFwKHJ1bikpO1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IGZuIG9mIGZucykge1xuXHRcdFx0XHRpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Zm4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xuXG5cdC8vIGFmdGVyVXBkYXRlXG5cdGlmIChjYWxsYmFja3MuYS5sZW5ndGgpIHtcblx0XHR1c2VyX2VmZmVjdCgoKSA9PiB7XG5cdFx0XHRvYnNlcnZlX2FsbChjb250ZXh0LCBwcm9wcyk7XG5cdFx0XHRydW5fYWxsKGNhbGxiYWNrcy5hKTtcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEludm9rZSB0aGUgZ2V0dGVyIG9mIGFsbCBzaWduYWxzIGFzc29jaWF0ZWQgd2l0aCBhIGNvbXBvbmVudFxuICogc28gdGhleSBjYW4gYmUgcmVnaXN0ZXJlZCB0byB0aGUgZWZmZWN0IHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluLlxuICogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0TGVnYWN5fSBjb250ZXh0XG4gKiBAcGFyYW0geygoKSA9PiB2b2lkKX0gcHJvcHNcbiAqL1xuZnVuY3Rpb24gb2JzZXJ2ZV9hbGwoY29udGV4dCwgcHJvcHMpIHtcblx0aWYgKGNvbnRleHQubC5zKSB7XG5cdFx0Zm9yIChjb25zdCBzaWduYWwgb2YgY29udGV4dC5sLnMpIGdldChzaWduYWwpO1xuXHR9XG5cblx0cHJvcHMoKTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgU3RvcmVSZWZlcmVuY2VzQ29udGFpbmVyIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcjc2hhcmVkJyAqL1xuaW1wb3J0IHsgc3Vic2NyaWJlX3RvX3N0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvdXRpbHMuanMnO1xuaW1wb3J0IHsgZ2V0IGFzIGdldF9zdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NoYXJlZC9pbmRleC5qcyc7XG5pbXBvcnQgeyBkZWZpbmVfcHJvcGVydHksIG5vb3AgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyB0ZWFyZG93biB9IGZyb20gJy4vZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBtdXRhYmxlX3NvdXJjZSwgc2V0IH0gZnJvbSAnLi9zb3VyY2VzLmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9wIGN1cnJlbnRseSBiZWluZyByZWFkIGlzIGEgc3RvcmUgYmluZGluZywgYXMgaW5cbiAqIGA8Q2hpbGQgYmluZDp4PXskeX0gLz5gLiBJZiBpdCBpcywgd2UgdHJlYXQgdGhlIHByb3AgYXMgbXV0YWJsZSBldmVuIGluXG4gKiBydW5lcyBtb2RlLCBhbmQgc2tpcCBgYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmVgIHZhbGlkYXRpb25cbiAqL1xubGV0IGlzX3N0b3JlX2JpbmRpbmcgPSBmYWxzZTtcblxubGV0IElTX1VOTU9VTlRFRCA9IFN5bWJvbCgpO1xuXG4vKipcbiAqIEdldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgYSBzdG9yZS4gSWYgdGhlIHN0b3JlIGlzbid0IHN1YnNjcmliZWQgdG8geWV0LCBpdCB3aWxsIGNyZWF0ZSBhIHByb3h5XG4gKiBzaWduYWwgdGhhdCB3aWxsIGJlIHVwZGF0ZWQgd2hlbiB0aGUgc3RvcmUgaXMuIFRoZSBzdG9yZSByZWZlcmVuY2VzIGNvbnRhaW5lciBpcyBuZWVkZWQgdG9cbiAqIHRyYWNrIHJlYXNzaWdubWVudHMgdG8gc3RvcmVzIGFuZCB0byB0cmFjayB0aGUgY29ycmVjdCBjb21wb25lbnQgY29udGV4dC5cbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1N0b3JlPFY+IHwgbnVsbCB8IHVuZGVmaW5lZH0gc3RvcmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZV9uYW1lXG4gKiBAcGFyYW0ge1N0b3JlUmVmZXJlbmNlc0NvbnRhaW5lcn0gc3RvcmVzXG4gKiBAcmV0dXJucyB7Vn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlX2dldChzdG9yZSwgc3RvcmVfbmFtZSwgc3RvcmVzKSB7XG5cdGNvbnN0IGVudHJ5ID0gKHN0b3Jlc1tzdG9yZV9uYW1lXSA/Pz0ge1xuXHRcdHN0b3JlOiBudWxsLFxuXHRcdHNvdXJjZTogbXV0YWJsZV9zb3VyY2UodW5kZWZpbmVkKSxcblx0XHR1bnN1YnNjcmliZTogbm9vcFxuXHR9KTtcblxuXHRpZiAoREVWKSB7XG5cdFx0ZW50cnkuc291cmNlLmxhYmVsID0gc3RvcmVfbmFtZTtcblx0fVxuXG5cdC8vIGlmIHRoZSBjb21wb25lbnQgdGhhdCBzZXR1cCB0aGlzIGlzIGFscmVhZHkgdW5tb3VudGVkIHdlIGRvbid0IHdhbnQgdG8gcmVnaXN0ZXIgYSBzdWJzY3JpcHRpb25cblx0aWYgKGVudHJ5LnN0b3JlICE9PSBzdG9yZSAmJiAhKElTX1VOTU9VTlRFRCBpbiBzdG9yZXMpKSB7XG5cdFx0ZW50cnkudW5zdWJzY3JpYmUoKTtcblx0XHRlbnRyeS5zdG9yZSA9IHN0b3JlID8/IG51bGw7XG5cblx0XHRpZiAoc3RvcmUgPT0gbnVsbCkge1xuXHRcdFx0ZW50cnkuc291cmNlLnYgPSB1bmRlZmluZWQ7IC8vIHNlZSBzeW5jaHJvbm91cyBjYWxsYmFjayBjb21tZW50IGJlbG93XG5cdFx0XHRlbnRyeS51bnN1YnNjcmliZSA9IG5vb3A7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBpc19zeW5jaHJvbm91c19jYWxsYmFjayA9IHRydWU7XG5cblx0XHRcdGVudHJ5LnVuc3Vic2NyaWJlID0gc3Vic2NyaWJlX3RvX3N0b3JlKHN0b3JlLCAodikgPT4ge1xuXHRcdFx0XHRpZiAoaXNfc3luY2hyb25vdXNfY2FsbGJhY2spIHtcblx0XHRcdFx0XHQvLyBJZiB0aGUgZmlyc3QgdXBkYXRlcyB0byB0aGUgc3RvcmUgdmFsdWUgKHBvc3NpYmx5IG11bHRpcGxlIG9mIHRoZW0pIGFyZSBzeW5jaHJvbm91c2x5XG5cdFx0XHRcdFx0Ly8gaW5zaWRlIGEgZGVyaXZlZCwgd2Ugd2lsbCBoaXQgdGhlIGBzdGF0ZV91bnNhZmVfbXV0YXRpb25gIGVycm9yIGlmIHdlIGBzZXRgIHRoZSB2YWx1ZVxuXHRcdFx0XHRcdGVudHJ5LnNvdXJjZS52ID0gdjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZXQoZW50cnkuc291cmNlLCB2KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlzX3N5bmNocm9ub3VzX2NhbGxiYWNrID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaWYgdGhlIGNvbXBvbmVudCB0aGF0IHNldHVwIHRoaXMgc3RvcmVzIGlzIGFscmVhZHkgdW5tb3VudGVkIHRoZSBzb3VyY2Ugd2lsbCBiZSBvdXQgb2Ygc3luY1xuXHQvLyBzbyB3ZSBqdXN0IHVzZSB0aGUgYGdldGAgZm9yIHRoZSBzdG9yZXMsIGxlc3MgcGVyZm9ybWFudCBidXQgaXQgYXZvaWRzIHRvIGNyZWF0ZSBhIG1lbW9yeSBsZWFrXG5cdC8vIGFuZCBpdCB3aWxsIGtlZXAgdGhlIHZhbHVlIGNvbnNpc3RlbnRcblx0aWYgKHN0b3JlICYmIElTX1VOTU9VTlRFRCBpbiBzdG9yZXMpIHtcblx0XHRyZXR1cm4gZ2V0X3N0b3JlKHN0b3JlKTtcblx0fVxuXG5cdHJldHVybiBnZXQoZW50cnkuc291cmNlKTtcbn1cblxuLyoqXG4gKiBVbnN1YnNjcmliZSBmcm9tIGEgc3RvcmUgaWYgaXQncyBub3QgdGhlIHNhbWUgYXMgdGhlIG9uZSBpbiB0aGUgc3RvcmUgcmVmZXJlbmNlcyBjb250YWluZXIuXG4gKiBXZSBuZWVkIHRoaXMgaW4gYWRkaXRpb24gdG8gYHN0b3JlX2dldGAgYmVjYXVzZSBzb21lb25lIGNvdWxkIHVuc3Vic2NyaWJlIGZyb20gYSBzdG9yZSBidXRcbiAqIHRoZW4gbmV2ZXIgc3Vic2NyaWJlIHRvIHRoZSBuZXcgb25lIChpZiBhbnkpLCBjYXVzaW5nIHRoZSBzdWJzY3JpcHRpb24gdG8gc3RheSBvcGVuIHdyb25nZnVsbHkuXG4gKiBAcGFyYW0ge1N0b3JlPGFueT4gfCBudWxsIHwgdW5kZWZpbmVkfSBzdG9yZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0b3JlX25hbWVcbiAqIEBwYXJhbSB7U3RvcmVSZWZlcmVuY2VzQ29udGFpbmVyfSBzdG9yZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlX3Vuc3ViKHN0b3JlLCBzdG9yZV9uYW1lLCBzdG9yZXMpIHtcblx0LyoqIEB0eXBlIHtTdG9yZVJlZmVyZW5jZXNDb250YWluZXJbJyddIHwgdW5kZWZpbmVkfSAqL1xuXHRsZXQgZW50cnkgPSBzdG9yZXNbc3RvcmVfbmFtZV07XG5cblx0aWYgKGVudHJ5ICYmIGVudHJ5LnN0b3JlICE9PSBzdG9yZSkge1xuXHRcdC8vIERvbid0IHJlc2V0IHN0b3JlIHlldCwgc28gdGhhdCBzdG9yZV9nZXQgYWJvdmUgY2FuIHJlc3Vic2NyaWJlIHRvIG5ldyBzdG9yZSBpZiBuZWNlc3Nhcnlcblx0XHRlbnRyeS51bnN1YnNjcmliZSgpO1xuXHRcdGVudHJ5LnVuc3Vic2NyaWJlID0gbm9vcDtcblx0fVxuXG5cdHJldHVybiBzdG9yZTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBuZXcgdmFsdWUgb2YgYSBzdG9yZSBhbmQgcmV0dXJucyB0aGF0IHZhbHVlLlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7U3RvcmU8Vj59IHN0b3JlXG4gKiBAcGFyYW0ge1Z9IHZhbHVlXG4gKiBAcmV0dXJucyB7Vn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlX3NldChzdG9yZSwgdmFsdWUpIHtcblx0c3RvcmUuc2V0KHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RvcmVSZWZlcmVuY2VzQ29udGFpbmVyfSBzdG9yZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdG9yZV9uYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkYXRlX3N0b3JlKHN0b3Jlcywgc3RvcmVfbmFtZSkge1xuXHR2YXIgZW50cnkgPSBzdG9yZXNbc3RvcmVfbmFtZV07XG5cdGlmIChlbnRyeS5zdG9yZSAhPT0gbnVsbCkge1xuXHRcdHN0b3JlX3NldChlbnRyeS5zdG9yZSwgZW50cnkuc291cmNlLnYpO1xuXHR9XG59XG5cbi8qKlxuICogVW5zdWJzY3JpYmVzIGZyb20gYWxsIGF1dG8tc3Vic2NyaWJlZCBzdG9yZXMgb24gZGVzdHJveVxuICogQHJldHVybnMge1tTdG9yZVJlZmVyZW5jZXNDb250YWluZXIsICgpPT52b2lkXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwX3N0b3JlcygpIHtcblx0LyoqIEB0eXBlIHtTdG9yZVJlZmVyZW5jZXNDb250YWluZXJ9ICovXG5cdGNvbnN0IHN0b3JlcyA9IHt9O1xuXG5cdGZ1bmN0aW9uIGNsZWFudXAoKSB7XG5cdFx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdFx0Zm9yICh2YXIgc3RvcmVfbmFtZSBpbiBzdG9yZXMpIHtcblx0XHRcdFx0Y29uc3QgcmVmID0gc3RvcmVzW3N0b3JlX25hbWVdO1xuXHRcdFx0XHRyZWYudW5zdWJzY3JpYmUoKTtcblx0XHRcdH1cblx0XHRcdGRlZmluZV9wcm9wZXJ0eShzdG9yZXMsIElTX1VOTU9VTlRFRCwge1xuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0dmFsdWU6IHRydWVcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIFtzdG9yZXMsIGNsZWFudXBdO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgYSBzdG9yZSB3aXRoIGEgbmV3IHZhbHVlLlxuICogQHBhcmFtIHtTdG9yZTxWPn0gc3RvcmUgIHRoZSBzdG9yZSB0byB1cGRhdGVcbiAqIEBwYXJhbSB7YW55fSBleHByZXNzaW9uICB0aGUgZXhwcmVzc2lvbiB0aGF0IG11dGF0ZXMgdGhlIHN0b3JlXG4gKiBAcGFyYW0ge1Z9IG5ld192YWx1ZSAgdGhlIG5ldyBzdG9yZSB2YWx1ZVxuICogQHRlbXBsYXRlIFZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlX211dGF0ZShzdG9yZSwgZXhwcmVzc2lvbiwgbmV3X3ZhbHVlKSB7XG5cdHN0b3JlLnNldChuZXdfdmFsdWUpO1xuXHRyZXR1cm4gZXhwcmVzc2lvbjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0b3JlPG51bWJlcj59IHN0b3JlXG4gKiBAcGFyYW0ge251bWJlcn0gc3RvcmVfdmFsdWVcbiAqIEBwYXJhbSB7MSB8IC0xfSBbZF1cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfc3RvcmUoc3RvcmUsIHN0b3JlX3ZhbHVlLCBkID0gMSkge1xuXHRzdG9yZS5zZXQoc3RvcmVfdmFsdWUgKyBkKTtcblx0cmV0dXJuIHN0b3JlX3ZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RvcmU8bnVtYmVyPn0gc3RvcmVcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdG9yZV92YWx1ZVxuICogQHBhcmFtIHsxIHwgLTF9IFtkXVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9wcmVfc3RvcmUoc3RvcmUsIHN0b3JlX3ZhbHVlLCBkID0gMSkge1xuXHRjb25zdCB2YWx1ZSA9IHN0b3JlX3ZhbHVlICsgZDtcblx0c3RvcmUuc2V0KHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxlZCBpbnNpZGUgcHJvcCBnZXR0ZXJzIHRvIGNvbW11bmljYXRlIHRoYXQgdGhlIHByb3AgaXMgYSBzdG9yZSBiaW5kaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrX3N0b3JlX2JpbmRpbmcoKSB7XG5cdGlzX3N0b3JlX2JpbmRpbmcgPSB0cnVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSB0dXBsZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIGBmbigpYCByZWFkcyBhIHByb3AgdGhhdCBpcyBhIHN0b3JlIGJpbmRpbmcuXG4gKiBVc2VkIHRvIHByZXZlbnQgYGJpbmRpbmdfcHJvcGVydHlfbm9uX3JlYWN0aXZlYCB2YWxpZGF0aW9uIGZhbHNlIHBvc2l0aXZlcyBhbmRcbiAqIGVuc3VyZSB0aGF0IHRoZXNlIHByb3BzIGFyZSB0cmVhdGVkIGFzIG11dGFibGUgZXZlbiBpbiBydW5lcyBtb2RlXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHsoKSA9PiBUfSBmblxuICogQHJldHVybnMge1tULCBib29sZWFuXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVfc3RvcmVfYmluZGluZyhmbikge1xuXHR2YXIgcHJldmlvdXNfaXNfc3RvcmVfYmluZGluZyA9IGlzX3N0b3JlX2JpbmRpbmc7XG5cblx0dHJ5IHtcblx0XHRpc19zdG9yZV9iaW5kaW5nID0gZmFsc2U7XG5cdFx0cmV0dXJuIFtmbigpLCBpc19zdG9yZV9iaW5kaW5nXTtcblx0fSBmaW5hbGx5IHtcblx0XHRpc19zdG9yZV9iaW5kaW5nID0gcHJldmlvdXNfaXNfc3RvcmVfYmluZGluZztcblx0fVxufVxuIiwiLyoqIEBpbXBvcnQgeyBFZmZlY3QsIFNvdXJjZSB9IGZyb20gJy4vdHlwZXMuanMnICovXG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7XG5cdFBST1BTX0lTX0JJTkRBQkxFLFxuXHRQUk9QU19JU19JTU1VVEFCTEUsXG5cdFBST1BTX0lTX0xBWllfSU5JVElBTCxcblx0UFJPUFNfSVNfUlVORVMsXG5cdFBST1BTX0lTX1VQREFURURcbn0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGdldF9kZXNjcmlwdG9yLCBpc19mdW5jdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBzZXQsIHNvdXJjZSwgdXBkYXRlIH0gZnJvbSAnLi9zb3VyY2VzLmpzJztcbmltcG9ydCB7IGRlcml2ZWQsIGRlcml2ZWRfc2FmZV9lcXVhbCB9IGZyb20gJy4vZGVyaXZlZHMuanMnO1xuaW1wb3J0IHtcblx0YWN0aXZlX2VmZmVjdCxcblx0Z2V0LFxuXHRpc19kZXN0cm95aW5nX2VmZmVjdCxcblx0c2V0X2FjdGl2ZV9lZmZlY3QsXG5cdHVudHJhY2tcbn0gZnJvbSAnLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4uL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBERVNUUk9ZRUQsIExFR0FDWV9QUk9QUywgU1RBVEVfU1lNQk9MIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgcHJveHkgfSBmcm9tICcuLi9wcm94eS5qcyc7XG5pbXBvcnQgeyBjYXB0dXJlX3N0b3JlX2JpbmRpbmcgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IGxlZ2FjeV9tb2RlX2ZsYWcgfSBmcm9tICcuLi8uLi9mbGFncy9pbmRleC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsoKHZhbHVlPzogbnVtYmVyKSA9PiBudW1iZXIpfSBmblxuICogQHBhcmFtIHsxIHwgLTF9IFtkXVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9wcm9wKGZuLCBkID0gMSkge1xuXHRjb25zdCB2YWx1ZSA9IGZuKCk7XG5cdGZuKHZhbHVlICsgZCk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygodmFsdWU/OiBudW1iZXIpID0+IG51bWJlcil9IGZuXG4gKiBAcGFyYW0gezEgfCAtMX0gW2RdXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3ByZV9wcm9wKGZuLCBkID0gMSkge1xuXHRjb25zdCB2YWx1ZSA9IGZuKCkgKyBkO1xuXHRmbih2YWx1ZSk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBUaGUgcHJveHkgaGFuZGxlciBmb3IgcmVzdCBwcm9wcyAoaS5lLiBgY29uc3QgeyB4LCAuLi5yZXN0IH0gPSAkcHJvcHMoKWApLlxuICogSXMgcGFzc2VkIHRoZSBmdWxsIGAkJHByb3BzYCBvYmplY3QgYW5kIGV4Y2x1ZGVzIHRoZSBuYW1lZCBwcm9wcy5cbiAqIEB0eXBlIHtQcm94eUhhbmRsZXI8eyBwcm9wczogUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4sIGV4Y2x1ZGU6IEFycmF5PHN0cmluZyB8IHN5bWJvbD4sIG5hbWU/OiBzdHJpbmcgfT59fVxuICovXG5jb25zdCByZXN0X3Byb3BzX2hhbmRsZXIgPSB7XG5cdGdldCh0YXJnZXQsIGtleSkge1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG5cdFx0cmV0dXJuIHRhcmdldC5wcm9wc1trZXldO1xuXHR9LFxuXHRzZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAoREVWKSB7XG5cdFx0XHQvLyBUT0RPIHNob3VsZCB0aGlzIGhhcHBlbiBpbiBwcm9kIHRvbz9cblx0XHRcdGUucHJvcHNfcmVzdF9yZWFkb25seShgJHt0YXJnZXQubmFtZX0uJHtTdHJpbmcoa2V5KX1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkge1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG5cdFx0aWYgKGtleSBpbiB0YXJnZXQucHJvcHMpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHRhcmdldC5wcm9wc1trZXldXG5cdFx0XHR9O1xuXHRcdH1cblx0fSxcblx0aGFzKHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmluY2x1ZGVzKGtleSkpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4ga2V5IGluIHRhcmdldC5wcm9wcztcblx0fSxcblx0b3duS2V5cyh0YXJnZXQpIHtcblx0XHRyZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldC5wcm9wcykuZmlsdGVyKChrZXkpID0+ICF0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKTtcblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmdbXX0gZXhjbHVkZVxuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lXVxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHVua25vd24+fVxuICovXG4vKiNfX05PX1NJREVfRUZGRUNUU19fKi9cbmV4cG9ydCBmdW5jdGlvbiByZXN0X3Byb3BzKHByb3BzLCBleGNsdWRlLCBuYW1lKSB7XG5cdHJldHVybiBuZXcgUHJveHkoXG5cdFx0REVWID8geyBwcm9wcywgZXhjbHVkZSwgbmFtZSwgb3RoZXI6IHt9LCB0b19wcm94eTogW10gfSA6IHsgcHJvcHMsIGV4Y2x1ZGUgfSxcblx0XHRyZXN0X3Byb3BzX2hhbmRsZXJcblx0KTtcbn1cblxuLyoqXG4gKiBUaGUgcHJveHkgaGFuZGxlciBmb3IgbGVnYWN5ICQkcmVzdFByb3BzIGFuZCAkJHByb3BzXG4gKiBAdHlwZSB7UHJveHlIYW5kbGVyPHsgcHJvcHM6IFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+LCBleGNsdWRlOiBBcnJheTxzdHJpbmcgfCBzeW1ib2w+LCBzcGVjaWFsOiBSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCAodj86IHVua25vd24pID0+IHVua25vd24+LCB2ZXJzaW9uOiBTb3VyY2U8bnVtYmVyPiwgcGFyZW50X2VmZmVjdDogRWZmZWN0IH0+fX1cbiAqL1xuY29uc3QgbGVnYWN5X3Jlc3RfcHJvcHNfaGFuZGxlciA9IHtcblx0Z2V0KHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmluY2x1ZGVzKGtleSkpIHJldHVybjtcblx0XHRnZXQodGFyZ2V0LnZlcnNpb24pO1xuXHRcdHJldHVybiBrZXkgaW4gdGFyZ2V0LnNwZWNpYWwgPyB0YXJnZXQuc3BlY2lhbFtrZXldKCkgOiB0YXJnZXQucHJvcHNba2V5XTtcblx0fSxcblx0c2V0KHRhcmdldCwga2V5LCB2YWx1ZSkge1xuXHRcdGlmICghKGtleSBpbiB0YXJnZXQuc3BlY2lhbCkpIHtcblx0XHRcdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXRfYWN0aXZlX2VmZmVjdCh0YXJnZXQucGFyZW50X2VmZmVjdCk7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHByb3BzIHRoYXQgY2FuIHRlbXBvcmFyaWx5IGdldCBvdXQgb2Ygc3luYyB3aXRoIHRoZSBwYXJlbnRcblx0XHRcdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCAodj86IHVua25vd24pID0+IHVua25vd24+fSAqL1xuXHRcdFx0XHR0YXJnZXQuc3BlY2lhbFtrZXldID0gcHJvcChcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRnZXQgW2tleV0oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0YXJnZXQucHJvcHNba2V5XTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoa2V5KSxcblx0XHRcdFx0XHRQUk9QU19JU19VUERBVEVEXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRhcmdldC5zcGVjaWFsW2tleV0odmFsdWUpO1xuXHRcdHVwZGF0ZSh0YXJnZXQudmVyc2lvbik7IC8vICQkcHJvcHMgaXMgY29hcnNlLWdyYWluZWQ6IHdoZW4gJCRwcm9wcy54IGlzIHVwZGF0ZWQsIHVzYWdlcyBvZiAkJHByb3BzLnkgZXRjIGFyZSBhbHNvIHJlcnVuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkge1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG5cdFx0aWYgKGtleSBpbiB0YXJnZXQucHJvcHMpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHRhcmdldC5wcm9wc1trZXldXG5cdFx0XHR9O1xuXHRcdH1cblx0fSxcblx0ZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcblx0XHQvLyBTdmVsdGUgNCBhbGxvd2VkIGZvciBkZWxldGlvbnMgb24gJCRyZXN0UHJvcHNcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIHRydWU7XG5cdFx0dGFyZ2V0LmV4Y2x1ZGUucHVzaChrZXkpO1xuXHRcdHVwZGF0ZSh0YXJnZXQudmVyc2lvbik7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGhhcyh0YXJnZXQsIGtleSkge1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIGtleSBpbiB0YXJnZXQucHJvcHM7XG5cdH0sXG5cdG93bktleXModGFyZ2V0KSB7XG5cdFx0cmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQucHJvcHMpLmZpbHRlcigoa2V5KSA9PiAhdGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSk7XG5cdH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVcbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeV9yZXN0X3Byb3BzKHByb3BzLCBleGNsdWRlKSB7XG5cdHJldHVybiBuZXcgUHJveHkoXG5cdFx0e1xuXHRcdFx0cHJvcHMsXG5cdFx0XHRleGNsdWRlLFxuXHRcdFx0c3BlY2lhbDoge30sXG5cdFx0XHR2ZXJzaW9uOiBzb3VyY2UoMCksXG5cdFx0XHQvLyBUT0RPIHRoaXMgaXMgb25seSBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBuZWVkIHRvIHRyYWNrIGNvbXBvbmVudFxuXHRcdFx0Ly8gZGVzdHJ1Y3Rpb24gaW5zaWRlIGBwcm9wYCwgYmVjYXVzZSBvZiBgYmluZDp0aGlzYCwgYnV0IGl0XG5cdFx0XHQvLyBzZWVtcyBsaWtlbHkgdGhhdCB3ZSBjYW4gc2ltcGxpZnkgYGJpbmQ6dGhpc2AgaW5zdGVhZFxuXHRcdFx0cGFyZW50X2VmZmVjdDogLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KVxuXHRcdH0sXG5cdFx0bGVnYWN5X3Jlc3RfcHJvcHNfaGFuZGxlclxuXHQpO1xufVxuXG4vKipcbiAqIFRoZSBwcm94eSBoYW5kbGVyIGZvciBzcHJlYWQgcHJvcHMuIEhhbmRsZXMgdGhlIGluY29taW5nIGFycmF5IG9mIHByb3BzXG4gKiB0aGF0IGxvb2tzIGxpa2UgYCgpID0+IHsgZHluYW1pYzogcHJvcHMgfSwgeyBzdGF0aWM6IHByb3AgfSwgLi5gIGFuZCB3cmFwc1xuICogdGhlbSBzbyB0aGF0IHRoZSB3aG9sZSB0aGluZyBpcyBwYXNzZWQgdG8gdGhlIGNvbXBvbmVudCBhcyB0aGUgYCQkcHJvcHNgIGFyZ3VtZW50LlxuICogQHR5cGUge1Byb3h5SGFuZGxlcjx7IHByb3BzOiBBcnJheTxSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPiB8ICgoKSA9PiBSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCB1bmtub3duPik+IH0+fX1cbiAqL1xuY29uc3Qgc3ByZWFkX3Byb3BzX2hhbmRsZXIgPSB7XG5cdGdldCh0YXJnZXQsIGtleSkge1xuXHRcdGxldCBpID0gdGFyZ2V0LnByb3BzLmxlbmd0aDtcblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRsZXQgcCA9IHRhcmdldC5wcm9wc1tpXTtcblx0XHRcdGlmIChpc19mdW5jdGlvbihwKSkgcCA9IHAoKTtcblx0XHRcdGlmICh0eXBlb2YgcCA9PT0gJ29iamVjdCcgJiYgcCAhPT0gbnVsbCAmJiBrZXkgaW4gcCkgcmV0dXJuIHBba2V5XTtcblx0XHR9XG5cdH0sXG5cdHNldCh0YXJnZXQsIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgaSA9IHRhcmdldC5wcm9wcy5sZW5ndGg7XG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0bGV0IHAgPSB0YXJnZXQucHJvcHNbaV07XG5cdFx0XHRpZiAoaXNfZnVuY3Rpb24ocCkpIHAgPSBwKCk7XG5cdFx0XHRjb25zdCBkZXNjID0gZ2V0X2Rlc2NyaXB0b3IocCwga2V5KTtcblx0XHRcdGlmIChkZXNjICYmIGRlc2Muc2V0KSB7XG5cdFx0XHRcdGRlc2Muc2V0KHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSB7XG5cdFx0bGV0IGkgPSB0YXJnZXQucHJvcHMubGVuZ3RoO1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGxldCBwID0gdGFyZ2V0LnByb3BzW2ldO1xuXHRcdFx0aWYgKGlzX2Z1bmN0aW9uKHApKSBwID0gcCgpO1xuXHRcdFx0aWYgKHR5cGVvZiBwID09PSAnb2JqZWN0JyAmJiBwICE9PSBudWxsICYmIGtleSBpbiBwKSB7XG5cdFx0XHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBnZXRfZGVzY3JpcHRvcihwLCBrZXkpO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5jb25maWd1cmFibGUpIHtcblx0XHRcdFx0XHQvLyBQcmV2ZW50IGEgXCJOb24tY29uZmlndXJhYmlsaXR5IFJlcG9ydCBFcnJvclwiOiBUaGUgdGFyZ2V0IGlzIGFuIGFycmF5LCBpdCBkb2VzXG5cdFx0XHRcdFx0Ly8gbm90IGFjdHVhbGx5IGNvbnRhaW4gdGhpcyBwcm9wZXJ0eS4gSWYgaXQgaXMgbm93IGRlc2NyaWJlZCBhcyBub24tY29uZmlndXJhYmxlLFxuXHRcdFx0XHRcdC8vIHRoZSBwcm94eSB0aHJvd3MgYSB2YWxpZGF0aW9uIGVycm9yLiBTZXR0aW5nIGl0IHRvIHRydWUgYXZvaWRzIHRoYXQuXG5cdFx0XHRcdFx0ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZXNjcmlwdG9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzKHRhcmdldCwga2V5KSB7XG5cdFx0Ly8gVG8gcHJldmVudCBhIGZhbHNlIHBvc2l0aXZlIGBpc19lbnRyeV9wcm9wc2AgaW4gdGhlIGBwcm9wYCBmdW5jdGlvblxuXHRcdGlmIChrZXkgPT09IFNUQVRFX1NZTUJPTCB8fCBrZXkgPT09IExFR0FDWV9QUk9QUykgcmV0dXJuIGZhbHNlO1xuXG5cdFx0Zm9yIChsZXQgcCBvZiB0YXJnZXQucHJvcHMpIHtcblx0XHRcdGlmIChpc19mdW5jdGlvbihwKSkgcCA9IHAoKTtcblx0XHRcdGlmIChwICE9IG51bGwgJiYga2V5IGluIHApIHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0b3duS2V5cyh0YXJnZXQpIHtcblx0XHQvKiogQHR5cGUge0FycmF5PHN0cmluZyB8IHN5bWJvbD59ICovXG5cdFx0Y29uc3Qga2V5cyA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgcCBvZiB0YXJnZXQucHJvcHMpIHtcblx0XHRcdGlmIChpc19mdW5jdGlvbihwKSkgcCA9IHAoKTtcblx0XHRcdGlmICghcCkgY29udGludWU7XG5cblx0XHRcdGZvciAoY29uc3Qga2V5IGluIHApIHtcblx0XHRcdFx0aWYgKCFrZXlzLmluY2x1ZGVzKGtleSkpIGtleXMucHVzaChrZXkpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHApKSB7XG5cdFx0XHRcdGlmICgha2V5cy5pbmNsdWRlcyhrZXkpKSBrZXlzLnB1c2goa2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ga2V5cztcblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgKCgpID0+IFJlY29yZDxzdHJpbmcsIHVua25vd24+KT59IHByb3BzXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ByZWFkX3Byb3BzKC4uLnByb3BzKSB7XG5cdHJldHVybiBuZXcgUHJveHkoeyBwcm9wcyB9LCBzcHJlYWRfcHJvcHNfaGFuZGxlcik7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSBmb3Igc3luY2hyb25pemluZyBhIHBvc3NpYmx5IGJvdW5kIHByb3Agd2l0aCB0aGUgaW5uZXIgY29tcG9uZW50IHN0YXRlLlxuICogSXQgaXMgdXNlZCB3aGVuZXZlciB0aGUgY29tcGlsZXIgc2VlcyB0aGF0IHRoZSBjb21wb25lbnQgd3JpdGVzIHRvIHRoZSBwcm9wLCBvciB3aGVuIGl0IGhhcyBhIGRlZmF1bHQgcHJvcF92YWx1ZS5cbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKiBAcGFyYW0ge1YgfCAoKCkgPT4gVil9IFtmYWxsYmFja11cbiAqIEByZXR1cm5zIHsoKCkgPT4gViB8ICgoYXJnOiBWKSA9PiBWKSB8ICgoYXJnOiBWLCBtdXRhdGlvbjogYm9vbGVhbikgPT4gVikpfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvcChwcm9wcywga2V5LCBmbGFncywgZmFsbGJhY2spIHtcblx0dmFyIHJ1bmVzID0gIWxlZ2FjeV9tb2RlX2ZsYWcgfHwgKGZsYWdzICYgUFJPUFNfSVNfUlVORVMpICE9PSAwO1xuXHR2YXIgYmluZGFibGUgPSAoZmxhZ3MgJiBQUk9QU19JU19CSU5EQUJMRSkgIT09IDA7XG5cdHZhciBsYXp5ID0gKGZsYWdzICYgUFJPUFNfSVNfTEFaWV9JTklUSUFMKSAhPT0gMDtcblxuXHR2YXIgZmFsbGJhY2tfdmFsdWUgPSAvKiogQHR5cGUge1Z9ICovIChmYWxsYmFjayk7XG5cdHZhciBmYWxsYmFja19kaXJ0eSA9IHRydWU7XG5cblx0dmFyIGdldF9mYWxsYmFjayA9ICgpID0+IHtcblx0XHRpZiAoZmFsbGJhY2tfZGlydHkpIHtcblx0XHRcdGZhbGxiYWNrX2RpcnR5ID0gZmFsc2U7XG5cblx0XHRcdGZhbGxiYWNrX3ZhbHVlID0gbGF6eVxuXHRcdFx0XHQ/IHVudHJhY2soLyoqIEB0eXBlIHsoKSA9PiBWfSAqLyAoZmFsbGJhY2spKVxuXHRcdFx0XHQ6IC8qKiBAdHlwZSB7Vn0gKi8gKGZhbGxiYWNrKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsbGJhY2tfdmFsdWU7XG5cdH07XG5cblx0LyoqIEB0eXBlIHsoKHY6IFYpID0+IHZvaWQpIHwgdW5kZWZpbmVkfSAqL1xuXHR2YXIgc2V0dGVyO1xuXG5cdGlmIChiaW5kYWJsZSkge1xuXHRcdC8vIENhbiBiZSB0aGUgY2FzZSB3aGVuIHNvbWVvbmUgZG9lcyBgbW91bnQoQ29tcG9uZW50LCBwcm9wcylgIHdpdGggYGxldCBwcm9wcyA9ICRzdGF0ZSh7Li4ufSlgXG5cdFx0Ly8gb3IgYGNyZWF0ZUNsYXNzQ29tcG9uZW50KENvbXBvbmVudCwgcHJvcHMpYFxuXHRcdHZhciBpc19lbnRyeV9wcm9wcyA9IFNUQVRFX1NZTUJPTCBpbiBwcm9wcyB8fCBMRUdBQ1lfUFJPUFMgaW4gcHJvcHM7XG5cblx0XHRzZXR0ZXIgPVxuXHRcdFx0Z2V0X2Rlc2NyaXB0b3IocHJvcHMsIGtleSk/LnNldCA/P1xuXHRcdFx0KGlzX2VudHJ5X3Byb3BzICYmIGtleSBpbiBwcm9wcyA/ICh2KSA9PiAocHJvcHNba2V5XSA9IHYpIDogdW5kZWZpbmVkKTtcblx0fVxuXG5cdHZhciBpbml0aWFsX3ZhbHVlO1xuXHR2YXIgaXNfc3RvcmVfc3ViID0gZmFsc2U7XG5cblx0aWYgKGJpbmRhYmxlKSB7XG5cdFx0W2luaXRpYWxfdmFsdWUsIGlzX3N0b3JlX3N1Yl0gPSBjYXB0dXJlX3N0b3JlX2JpbmRpbmcoKCkgPT4gLyoqIEB0eXBlIHtWfSAqLyAocHJvcHNba2V5XSkpO1xuXHR9IGVsc2Uge1xuXHRcdGluaXRpYWxfdmFsdWUgPSAvKiogQHR5cGUge1Z9ICovIChwcm9wc1trZXldKTtcblx0fVxuXG5cdGlmIChpbml0aWFsX3ZhbHVlID09PSB1bmRlZmluZWQgJiYgZmFsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdGluaXRpYWxfdmFsdWUgPSBnZXRfZmFsbGJhY2soKTtcblxuXHRcdGlmIChzZXR0ZXIpIHtcblx0XHRcdGlmIChydW5lcykgZS5wcm9wc19pbnZhbGlkX3ZhbHVlKGtleSk7XG5cdFx0XHRzZXR0ZXIoaW5pdGlhbF92YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIEB0eXBlIHsoKSA9PiBWfSAqL1xuXHR2YXIgZ2V0dGVyO1xuXG5cdGlmIChydW5lcykge1xuXHRcdGdldHRlciA9ICgpID0+IHtcblx0XHRcdHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7Vn0gKi8gKHByb3BzW2tleV0pO1xuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBnZXRfZmFsbGJhY2soKTtcblx0XHRcdGZhbGxiYWNrX2RpcnR5ID0gdHJ1ZTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGdldHRlciA9ICgpID0+IHtcblx0XHRcdHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7Vn0gKi8gKHByb3BzW2tleV0pO1xuXG5cdFx0XHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyBpbiBsZWdhY3kgbW9kZSwgd2UgZG9uJ3QgcmV2ZXJ0IHRvIHRoZSBmYWxsYmFjayB2YWx1ZVxuXHRcdFx0XHQvLyBpZiB0aGUgcHJvcCBnb2VzIGZyb20gZGVmaW5lZCB0byB1bmRlZmluZWQuIFRoZSBlYXNpZXN0XG5cdFx0XHRcdC8vIHdheSB0byBtb2RlbCB0aGlzIGlzIHRvIG1ha2UgdGhlIGZhbGxiYWNrIHVuZGVmaW5lZFxuXHRcdFx0XHQvLyBhcyBzb29uIGFzIHRoZSBwcm9wIGhhcyBhIHZhbHVlXG5cdFx0XHRcdGZhbGxiYWNrX3ZhbHVlID0gLyoqIEB0eXBlIHtWfSAqLyAodW5kZWZpbmVkKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyBmYWxsYmFja192YWx1ZSA6IHZhbHVlO1xuXHRcdH07XG5cdH1cblxuXHQvLyBwcm9wIGlzIG5ldmVyIHdyaXR0ZW4gdG8g4oCUIHdlIG9ubHkgbmVlZCBhIGdldHRlclxuXHRpZiAocnVuZXMgJiYgKGZsYWdzICYgUFJPUFNfSVNfVVBEQVRFRCkgPT09IDApIHtcblx0XHRyZXR1cm4gZ2V0dGVyO1xuXHR9XG5cblx0Ly8gcHJvcCBpcyB3cml0dGVuIHRvLCBidXQgdGhlIHBhcmVudCBjb21wb25lbnQgaGFkIGBiaW5kOmZvb2Agd2hpY2hcblx0Ly8gbWVhbnMgd2UgY2FuIGp1c3QgY2FsbCBgJCRwcm9wcy5mb28gPSB2YWx1ZWAgZGlyZWN0bHlcblx0aWYgKHNldHRlcikge1xuXHRcdHZhciBsZWdhY3lfcGFyZW50ID0gcHJvcHMuJCRsZWdhY3k7XG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKFxuXHRcdFx0ZnVuY3Rpb24gKC8qKiBAdHlwZSB7Vn0gKi8gdmFsdWUsIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gbXV0YXRpb24pIHtcblx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Ly8gV2UgZG9uJ3Qgd2FudCB0byBub3RpZnkgaWYgdGhlIHZhbHVlIHdhcyBtdXRhdGVkIGFuZCB0aGUgcGFyZW50IGlzIGluIHJ1bmVzIG1vZGUuXG5cdFx0XHRcdFx0Ly8gSW4gdGhhdCBjYXNlIHRoZSBzdGF0ZSBwcm94eSAoaWYgaXQgZXhpc3RzKSBzaG91bGQgdGFrZSBjYXJlIG9mIHRoZSBub3RpZmljYXRpb24uXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHBhcmVudCBpcyBub3QgaW4gcnVuZXMgbW9kZSwgd2UgbmVlZCB0byBub3RpZnkgb24gbXV0YXRpb24sIHRvbywgdGhhdCB0aGUgcHJvcFxuXHRcdFx0XHRcdC8vIGhhcyBjaGFuZ2VkIGJlY2F1c2UgdGhlIHBhcmVudCB3aWxsIG5vdCBiZSBhYmxlIHRvIGRldGVjdCB0aGUgY2hhbmdlIG90aGVyd2lzZS5cblx0XHRcdFx0XHRpZiAoIXJ1bmVzIHx8ICFtdXRhdGlvbiB8fCBsZWdhY3lfcGFyZW50IHx8IGlzX3N0b3JlX3N1Yikge1xuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtGdW5jdGlvbn0gKi8gKHNldHRlcikobXV0YXRpb24gPyBnZXR0ZXIoKSA6IHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZ2V0dGVyKCk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8vIEVpdGhlciBwcm9wIGlzIHdyaXR0ZW4gdG8sIGJ1dCB0aGVyZSdzIG5vIGJpbmRpbmcsIHdoaWNoIG1lYW5zIHdlXG5cdC8vIGNyZWF0ZSBhIGRlcml2ZWQgdGhhdCB3ZSBjYW4gd3JpdGUgdG8gbG9jYWxseS5cblx0Ly8gT3Igd2UgYXJlIGluIGxlZ2FjeSBtb2RlIHdoZXJlIHdlIGFsd2F5cyBjcmVhdGUgYSBkZXJpdmVkIHRvIHJlcGxpY2F0ZSB0aGF0XG5cdC8vIFN2ZWx0ZSA0IGRpZCBub3QgdHJpZ2dlciB1cGRhdGVzIHdoZW4gYSBwcmltaXRpdmUgdmFsdWUgd2FzIHVwZGF0ZWQgdG8gdGhlIHNhbWUgdmFsdWUuXG5cdHZhciBvdmVycmlkZGVuID0gZmFsc2U7XG5cblx0dmFyIGQgPSAoKGZsYWdzICYgUFJPUFNfSVNfSU1NVVRBQkxFKSAhPT0gMCA/IGRlcml2ZWQgOiBkZXJpdmVkX3NhZmVfZXF1YWwpKCgpID0+IHtcblx0XHRvdmVycmlkZGVuID0gZmFsc2U7XG5cdFx0cmV0dXJuIGdldHRlcigpO1xuXHR9KTtcblxuXHRpZiAoREVWKSB7XG5cdFx0ZC5sYWJlbCA9IGtleTtcblx0fVxuXG5cdC8vIENhcHR1cmUgdGhlIGluaXRpYWwgdmFsdWUgaWYgaXQncyBiaW5kYWJsZVxuXHRpZiAoYmluZGFibGUpIGdldChkKTtcblxuXHR2YXIgcGFyZW50X2VmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0cmV0dXJuIC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKFxuXHRcdGZ1bmN0aW9uICgvKiogQHR5cGUge2FueX0gKi8gdmFsdWUsIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gbXV0YXRpb24pIHtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBuZXdfdmFsdWUgPSBtdXRhdGlvbiA/IGdldChkKSA6IHJ1bmVzICYmIGJpbmRhYmxlID8gcHJveHkodmFsdWUpIDogdmFsdWU7XG5cblx0XHRcdFx0c2V0KGQsIG5ld192YWx1ZSk7XG5cdFx0XHRcdG92ZXJyaWRkZW4gPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChmYWxsYmFja192YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0ZmFsbGJhY2tfdmFsdWUgPSBuZXdfdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNwZWNpYWwgY2FzZSDigJQgYXZvaWQgcmVjYWxjdWxhdGluZyB0aGUgZGVyaXZlZCBpZiB3ZSdyZSBpbiBhXG5cdFx0XHQvLyB0ZWFyZG93biBmdW5jdGlvbiBhbmQgdGhlIHByb3Agd2FzIG92ZXJyaWRkZW4gbG9jYWxseSwgb3IgdGhlXG5cdFx0XHQvLyBjb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkICh0aGlzIGxhdHRlciBwYXJ0IGlzIG5lY2Vzc2FyeVxuXHRcdFx0Ly8gYmVjYXVzZSBgYmluZDp0aGlzYCBjYW4gcmVhZCBwcm9wcyBhZnRlciB0aGUgY29tcG9uZW50IGhhc1xuXHRcdFx0Ly8gYmVlbiBkZXN0cm95ZWQuIFRPRE8gc2ltcGxpZnkgYGJpbmQ6dGhpc2Bcblx0XHRcdGlmICgoaXNfZGVzdHJveWluZ19lZmZlY3QgJiYgb3ZlcnJpZGRlbikgfHwgKHBhcmVudF9lZmZlY3QuZiAmIERFU1RST1lFRCkgIT09IDApIHtcblx0XHRcdFx0cmV0dXJuIGQudjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGdldChkKTtcblx0XHR9XG5cdCk7XG59XG4iLCJleHBvcnQgdHlwZSBUYXNrU3RhdHVzID0gJ3RvZG8nIHwgJ2luLXByb2dyZXNzJyB8ICdkb25lJyB8ICdibG9ja2VkJztcbmV4cG9ydCB0eXBlIFRhc2tQcmlvcml0eSA9ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCcgfCAnY3JpdGljYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN1YnRhc2sge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBzdGF0dXM6IFRhc2tTdGF0dXM7XG4gIHByaW9yaXR5OiBUYXNrUHJpb3JpdHk7XG4gIHN0YXJ0RGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgZW5kRGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgZmlsZVBhdGg6IHN0cmluZztcbiAgcGFyZW50SWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUYXNrIHtcbiAgaWQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgc3RhdHVzOiBUYXNrU3RhdHVzO1xuICBwcmlvcml0eTogVGFza1ByaW9yaXR5O1xuICBzdGFydERhdGU6IHN0cmluZyB8IG51bGw7ICAgLy8gSVNPIGRhdGUgc3RyaW5nIFlZWVktTU0tRERcbiAgZW5kRGF0ZTogc3RyaW5nIHwgbnVsbDsgICAgIC8vIElTTyBkYXRlIHN0cmluZyBZWVlZLU1NLUREXG4gIGFzc2lnbmVlOiBzdHJpbmc7XG4gIHRhZ3M6IHN0cmluZ1tdO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBmaWxlUGF0aDogc3RyaW5nO1xuICBwcm9qZWN0Rm9sZGVyOiBzdHJpbmc7XG4gIHN1YnRhc2tzOiBTdWJ0YXNrW107XG4gIHBhcmVudElkOiBzdHJpbmcgfCBudWxsO1xuICB1cGRhdGVkQXQ6IG51bWJlcjsgICAgICAgICAgLy8gdW5peCBtaWxsaXNlY29uZHMg4oCUIHVzZWQgZm9yIGNvbmZsaWN0IHJlc29sdXRpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBmb2xkZXJQYXRoOiBzdHJpbmc7XG4gIHRhc2tzOiBUYXNrW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FudHRQbHVnaW5TZXR0aW5ncyB7XG4gIHByb2plY3RzRm9sZGVyOiBzdHJpbmc7XG4gIGRlZmF1bHRTdGF0dXM6IFRhc2tTdGF0dXM7XG4gIGRlZmF1bHRQcmlvcml0eTogVGFza1ByaW9yaXR5O1xuICBzeW5jQmFzZVVybDogc3RyaW5nO1xuICBzeW5jRW1haWw6IHN0cmluZztcbiAgc3luY1Bhc3N3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBHYW50dFBsdWdpblNldHRpbmdzID0ge1xuICBwcm9qZWN0c0ZvbGRlcjogJ1Byb2plY3RzJyxcbiAgZGVmYXVsdFN0YXR1czogJ3RvZG8nLFxuICBkZWZhdWx0UHJpb3JpdHk6ICdtZWRpdW0nLFxuICBzeW5jQmFzZVVybDogJycsXG4gIHN5bmNFbWFpbDogJycsXG4gIHN5bmNQYXNzd29yZDogJycsXG59O1xuIiwiLyoqXG4gKiBUaW55IG5hbm9pZC1saWtlIElEIGdlbmVyYXRvciDigJQgbm8gZXh0cmEgZGVwZW5kZW5jeSBuZWVkZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYW5vaWQoc2l6ZSA9IDEyKTogc3RyaW5nIHtcbiAgY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICBsZXQgcmVzdWx0ID0gJyc7XG4gIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXJyYXkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHJlc3VsdCArPSBjaGFyc1thcnJheVtpXSAlIGNoYXJzLmxlbmd0aF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwLCBURmlsZSwgVEZvbGRlciB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgVGFzaywgU3VidGFzaywgUHJvamVjdCwgVGFza1N0YXR1cywgVGFza1ByaW9yaXR5IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBuYW5vaWQgfSBmcm9tICcuL25hbm9pZCc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBmcm9udG1hdHRlciBZQU1MIGZvciBhIG5ldyB0YXNrIG5vdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRhc2tGcm9udG1hdHRlcih0YXNrOiBQYXJ0aWFsPFRhc2s+KTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW1xuICAgICctLS0nLFxuICAgIGBpZDogJHt0YXNrLmlkID8/IG5hbm9pZCgpfWAsXG4gICAgYHRpdGxlOiAke3Rhc2sudGl0bGUgPz8gJ1VudGl0bGVkIFRhc2snfWAsXG4gICAgYHN0YXR1czogJHt0YXNrLnN0YXR1cyA/PyAndG9kbyd9YCxcbiAgICBgcHJpb3JpdHk6ICR7dGFzay5wcmlvcml0eSA/PyAnbWVkaXVtJ31gLFxuICAgIGBzdGFydF9kYXRlOiAke3Rhc2suc3RhcnREYXRlID8/ICcnfWAsXG4gICAgYGVuZF9kYXRlOiAke3Rhc2suZW5kRGF0ZSA/PyAnJ31gLFxuICAgIGBhc3NpZ25lZTogJHt0YXNrLmFzc2lnbmVlID8/ICcnfWAsXG4gICAgYHRhZ3M6IFskeyh0YXNrLnRhZ3MgPz8gW10pLmpvaW4oJywgJyl9XWAsXG4gICAgYHBhcmVudF9pZDogJHt0YXNrLnBhcmVudElkID8/ICcnfWAsXG4gICAgYHVwZGF0ZWRfYXQ6ICR7dGFzay51cGRhdGVkQXQgPz8gRGF0ZS5ub3coKX1gLFxuICAgICctLS0nLFxuICAgICcnLFxuICAgIGAjICR7dGFzay50aXRsZSA/PyAnVW50aXRsZWQgVGFzayd9YCxcbiAgICAnJyxcbiAgICAnIyMgRGVzY3JpcHRpb24nLFxuICAgICcnLFxuICAgIHRhc2suZGVzY3JpcHRpb24gPz8gJycsXG4gICAgJycsXG4gICAgJyMjIE5vdGVzJyxcbiAgICAnJyxcbiAgXTtcbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBmcm9udG1hdHRlciBvZiBhIHRhc2sgbm90ZSBmaWxlIGludG8gYSBUYXNrIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGFza0ZpbGUoZmlsZTogVEZpbGUsIGNvbnRlbnQ6IHN0cmluZywgcHJvamVjdEZvbGRlcjogc3RyaW5nKTogVGFzayB8IG51bGwge1xuICBjb25zdCBmbU1hdGNoID0gY29udGVudC5tYXRjaCgvXi0tLVxcbihbXFxzXFxTXSo/KVxcbi0tLS8pO1xuICBpZiAoIWZtTWF0Y2gpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGZtID0gZm1NYXRjaFsxXTtcbiAgY29uc3QgZ2V0ID0gKGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBtID0gZm0ubWF0Y2gobmV3IFJlZ0V4cChgXiR7a2V5fTpcXFxccyooLiopJGAsICdtJykpO1xuICAgIHJldHVybiBtID8gbVsxXS50cmltKCkgOiAnJztcbiAgfTtcblxuICBjb25zdCB0YWdzUmF3ID0gZ2V0KCd0YWdzJykucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgY29uc3QgdGFncyA9IHRhZ3NSYXcgPyB0YWdzUmF3LnNwbGl0KCcsJykubWFwKHQgPT4gdC50cmltKCkpLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IGdldCgnaWQnKSB8fCBmaWxlLmJhc2VuYW1lLFxuICAgIHRpdGxlOiBnZXQoJ3RpdGxlJykgfHwgZmlsZS5iYXNlbmFtZSxcbiAgICBzdGF0dXM6IChnZXQoJ3N0YXR1cycpIGFzIFRhc2tTdGF0dXMpIHx8ICd0b2RvJyxcbiAgICBwcmlvcml0eTogKGdldCgncHJpb3JpdHknKSBhcyBUYXNrUHJpb3JpdHkpIHx8ICdtZWRpdW0nLFxuICAgIHN0YXJ0RGF0ZTogZ2V0KCdzdGFydF9kYXRlJykgfHwgbnVsbCxcbiAgICBlbmREYXRlOiBnZXQoJ2VuZF9kYXRlJykgfHwgbnVsbCxcbiAgICBhc3NpZ25lZTogZ2V0KCdhc3NpZ25lZScpLFxuICAgIHRhZ3MsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGZpbGVQYXRoOiBmaWxlLnBhdGgsXG4gICAgcHJvamVjdEZvbGRlcixcbiAgICBzdWJ0YXNrczogW10sXG4gICAgcGFyZW50SWQ6IGdldCgncGFyZW50X2lkJykgfHwgbnVsbCxcbiAgICB1cGRhdGVkQXQ6IHBhcnNlSW50KGdldCgndXBkYXRlZF9hdCcpLCAxMCkgfHwgMCxcbiAgfTtcbn1cblxuLyoqXG4gKiBMb2FkIGFsbCBwcm9qZWN0cyBmcm9tIHRoZSBjb25maWd1cmVkIGZvbGRlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRQcm9qZWN0cyhhcHA6IEFwcCwgcHJvamVjdHNGb2xkZXI6IHN0cmluZyk6IFByb21pc2U8UHJvamVjdFtdPiB7XG4gIGNvbnN0IHJvb3RGb2xkZXIgPSBhcHAudmF1bHQuZ2V0Rm9sZGVyQnlQYXRoKHByb2plY3RzRm9sZGVyKTtcbiAgaWYgKCFyb290Rm9sZGVyKSByZXR1cm4gW107XG5cbiAgY29uc3QgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuXG4gIGZvciAoY29uc3QgY2hpbGQgb2Ygcm9vdEZvbGRlci5jaGlsZHJlbikge1xuICAgIGlmICghKGNoaWxkIGFzIFRGb2xkZXIpLmNoaWxkcmVuKSBjb250aW51ZTsgLy8gc2tpcCBmaWxlc1xuICAgIGNvbnN0IHByb2plY3RGb2xkZXIgPSBjaGlsZCBhcyBURm9sZGVyO1xuICAgIGNvbnN0IHRhc2tzID0gYXdhaXQgbG9hZFRhc2tzRnJvbUZvbGRlcihhcHAsIHByb2plY3RGb2xkZXIsIHByb2plY3RGb2xkZXIucGF0aCk7XG4gICAgcHJvamVjdHMucHVzaCh7XG4gICAgICBuYW1lOiBwcm9qZWN0Rm9sZGVyLm5hbWUsXG4gICAgICBmb2xkZXJQYXRoOiBwcm9qZWN0Rm9sZGVyLnBhdGgsXG4gICAgICB0YXNrcyxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwcm9qZWN0cztcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBsb2FkIHRhc2tzIGZyb20gYSBwcm9qZWN0IGZvbGRlci5cbiAqIEZpbGVzIGRpcmVjdGx5IHVuZGVyIHRoZSBwcm9qZWN0IGZvbGRlciBhcmUgdG9wLWxldmVsIHRhc2tzLlxuICogRmlsZXMgaW4gc3ViZm9sZGVycyBvZiB0aGUgcHJvamVjdCBmb2xkZXIgYXJlIHN1YnRhc2tzIG9mIHRoZSBtYXRjaGluZyBwYXJlbnQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxvYWRUYXNrc0Zyb21Gb2xkZXIoXG4gIGFwcDogQXBwLFxuICBmb2xkZXI6IFRGb2xkZXIsXG4gIHByb2plY3RGb2xkZXJQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8VGFza1tdPiB7XG4gIGNvbnN0IGFsbFRhc2tzOiBNYXA8c3RyaW5nLCBUYXNrPiA9IG5ldyBNYXAoKTtcblxuICAvLyBGaXJzdCBwYXNzOiBjb2xsZWN0IGFsbCB0YXNrIGZpbGVzIHJlY3Vyc2l2ZWx5XG4gIGF3YWl0IGNvbGxlY3RUYXNrRmlsZXMoYXBwLCBmb2xkZXIsIHByb2plY3RGb2xkZXJQYXRoLCBhbGxUYXNrcyk7XG5cbiAgLy8gU2Vjb25kIHBhc3M6IHdpcmUgdXAgc3VidGFza3NcbiAgY29uc3QgdG9wTGV2ZWw6IFRhc2tbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRhc2sgb2YgYWxsVGFza3MudmFsdWVzKCkpIHtcbiAgICBpZiAodGFzay5wYXJlbnRJZCAmJiBhbGxUYXNrcy5oYXModGFzay5wYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGFsbFRhc2tzLmdldCh0YXNrLnBhcmVudElkKSE7XG4gICAgICBwYXJlbnQuc3VidGFza3MucHVzaCh0YXNrIGFzIHVua25vd24gYXMgU3VidGFzayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcExldmVsLnB1c2godGFzayk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvcExldmVsO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb2xsZWN0VGFza0ZpbGVzKFxuICBhcHA6IEFwcCxcbiAgZm9sZGVyOiBURm9sZGVyLFxuICBwcm9qZWN0Rm9sZGVyUGF0aDogc3RyaW5nLFxuICBtYXA6IE1hcDxzdHJpbmcsIFRhc2s+XG4pIHtcbiAgZm9yIChjb25zdCBjaGlsZCBvZiBmb2xkZXIuY2hpbGRyZW4pIHtcbiAgICBpZiAoKGNoaWxkIGFzIFRGb2xkZXIpLmNoaWxkcmVuKSB7XG4gICAgICAvLyBJdCdzIGEgZm9sZGVyIOKAlCBza2lwIHRoZSBhcmNoaXZlIGZvbGRlciBlbnRpcmVseVxuICAgICAgaWYgKGNoaWxkLm5hbWUgPT09ICdhcmNoaXZlJykgY29udGludWU7XG4gICAgICBhd2FpdCBjb2xsZWN0VGFza0ZpbGVzKGFwcCwgY2hpbGQgYXMgVEZvbGRlciwgcHJvamVjdEZvbGRlclBhdGgsIG1hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBjaGlsZCBhcyBURmlsZTtcbiAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiAhPT0gJ21kJykgY29udGludWU7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgYXBwLnZhdWx0LmNhY2hlZFJlYWQoZmlsZSk7XG4gICAgICBjb25zdCB0YXNrID0gcGFyc2VUYXNrRmlsZShmaWxlLCBjb250ZW50LCBwcm9qZWN0Rm9sZGVyUGF0aCk7XG4gICAgICBpZiAodGFzaykgbWFwLnNldCh0YXNrLmlkLCB0YXNrKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGFzayBub3RlIGluc2lkZSB0aGUgZ2l2ZW4gcHJvamVjdCBmb2xkZXIuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUYXNrTm90ZShcbiAgYXBwOiBBcHAsXG4gIHByb2plY3RGb2xkZXJQYXRoOiBzdHJpbmcsXG4gIHRpdGxlOiBzdHJpbmcsXG4gIHBhcmVudElkOiBzdHJpbmcgfCBudWxsID0gbnVsbCxcbiAgZXh0cmE6IFBhcnRpYWw8VGFzaz4gPSB7fVxuKTogUHJvbWlzZTxURmlsZT4ge1xuICBjb25zdCBpZCA9IG5hbm9pZCgpO1xuICBjb25zdCBzYWZlTmFtZSA9IHRpdGxlLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XS9nLCAnLScpO1xuICBsZXQgZmlsZVBhdGg6IHN0cmluZztcblxuICBpZiAocGFyZW50SWQpIHtcbiAgICAvLyBTdWJ0YXNrcyBsaXZlIGluIGEgc3ViZm9sZGVyIG5hbWVkIGFmdGVyIHBhcmVudCBpZFxuICAgIGNvbnN0IHN1YkRpciA9IGAke3Byb2plY3RGb2xkZXJQYXRofS8ke3BhcmVudElkfWA7XG4gICAgYXdhaXQgZW5zdXJlRm9sZGVyKGFwcCwgc3ViRGlyKTtcbiAgICBmaWxlUGF0aCA9IGAke3N1YkRpcn0vJHtzYWZlTmFtZX0ubWRgO1xuICB9IGVsc2Uge1xuICAgIGZpbGVQYXRoID0gYCR7cHJvamVjdEZvbGRlclBhdGh9LyR7c2FmZU5hbWV9Lm1kYDtcbiAgfVxuXG4gIGNvbnN0IHRhc2s6IFBhcnRpYWw8VGFzaz4gPSB7XG4gICAgaWQsXG4gICAgdGl0bGUsXG4gICAgcGFyZW50SWQsXG4gICAgLi4uZXh0cmEsXG4gIH07XG5cbiAgY29uc3QgY29udGVudCA9IGdlbmVyYXRlVGFza0Zyb250bWF0dGVyKHRhc2spO1xuXG4gIC8vIEVuc3VyZSBwcm9qZWN0IGZvbGRlciBleGlzdHNcbiAgYXdhaXQgZW5zdXJlRm9sZGVyKGFwcCwgcHJvamVjdEZvbGRlclBhdGgpO1xuXG4gIHJldHVybiBhcHAudmF1bHQuY3JlYXRlKGZpbGVQYXRoLCBjb250ZW50KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYSBzcGVjaWZpYyBmcm9udG1hdHRlciBmaWVsZCBpbiBhIHRhc2sgbm90ZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhc2tGaWVsZChcbiAgYXBwOiBBcHAsXG4gIGZpbGU6IFRGaWxlLFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGxldCBjb250ZW50ID0gYXdhaXQgYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKGBeKCR7a2V5fTpcXFxccyopKC4qKSRgLCAnbScpO1xuICBpZiAocGF0dGVybi50ZXN0KGNvbnRlbnQpKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShwYXR0ZXJuLCBgJDEke3ZhbHVlfWApO1xuICB9XG4gIGF3YWl0IGFwcC52YXVsdC5tb2RpZnkoZmlsZSwgY29udGVudCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUZvbGRlcihhcHA6IEFwcCwgcGF0aDogc3RyaW5nKSB7XG4gIGlmICghYXBwLnZhdWx0LmdldEZvbGRlckJ5UGF0aChwYXRoKSkge1xuICAgIGF3YWl0IGFwcC52YXVsdC5jcmVhdGVGb2xkZXIocGF0aCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBcmNoaXZlIGEgdGFzayAoYW5kIGl0cyBzdWJ0YXNrcyBzdWJmb2xkZXIpIGJ5IG1vdmluZyBpdCB0b1xuICogPHByb2plY3RGb2xkZXI+L2FyY2hpdmUvLlxuICogVXNlcyByZWFkK2NyZWF0ZStkZWxldGUgaW5zdGVhZCBvZiBmaWxlTWFuYWdlci5yZW5hbWVGaWxlIHRvIGF2b2lkXG4gKiBPYnNpZGlhbidzIGxpbmstcmV3cml0aW5nIHdoaWNoIGZpcmVzIHZhdWx0IGV2ZW50cyBtaWQtb3BlcmF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXJjaGl2ZVRhc2soXG4gIGFwcDogQXBwLFxuICB0YXNrRmlsZVBhdGg6IHN0cmluZyxcbiAgdGFza0lkOiBzdHJpbmcsXG4gIHByb2plY3RGb2xkZXI6IHN0cmluZyxcbiAgaXNTdWJ0YXNrOiBib29sZWFuXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXJjaGl2ZURpciA9IGAke3Byb2plY3RGb2xkZXJ9L2FyY2hpdmVgO1xuICBhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBhcmNoaXZlRGlyKTtcblxuICAvLyBNb3ZlIHRoZSB0YXNrIG5vdGUgZmlsZVxuICBjb25zdCBmaWxlID0gYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgodGFza0ZpbGVQYXRoKTtcbiAgaWYgKGZpbGUpIHtcbiAgICBhd2FpdCBtb3ZlRmlsZShhcHAsIGZpbGUsIGFyY2hpdmVEaXIpO1xuICB9XG5cbiAgLy8gSWYgdG9wLWxldmVsIHRhc2ssIGFsc28gbW92ZSBpdHMgc3VidGFzayBzdWJmb2xkZXIgY29udGVudHNcbiAgaWYgKCFpc1N1YnRhc2spIHtcbiAgICBjb25zdCBzdWJGb2xkZXIgPSBhcHAudmF1bHQuZ2V0Rm9sZGVyQnlQYXRoKGAke3Byb2plY3RGb2xkZXJ9LyR7dGFza0lkfWApO1xuICAgIGlmIChzdWJGb2xkZXIpIHtcbiAgICAgIGNvbnN0IGFyY2hpdmVTdWJEaXIgPSBgJHthcmNoaXZlRGlyfS8ke3Rhc2tJZH1gO1xuICAgICAgYXdhaXQgZW5zdXJlRm9sZGVyKGFwcCwgYXJjaGl2ZVN1YkRpcik7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFsuLi5zdWJGb2xkZXIuY2hpbGRyZW5dOyAvLyBzbmFwc2hvdCBiZWZvcmUgbW92aW5nXG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkRmlsZSA9IGNoaWxkIGFzIFRGaWxlO1xuICAgICAgICBpZiAoY2hpbGRGaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICAgIGF3YWl0IG1vdmVGaWxlKGFwcCwgY2hpbGRGaWxlLCBhcmNoaXZlU3ViRGlyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIHRoZSBub3ctZW1wdHkgc3ViZm9sZGVyXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCAoYXBwLnZhdWx0LmFkYXB0ZXIgYXMgYW55KS5ybWRpcihgJHtwcm9qZWN0Rm9sZGVyfS8ke3Rhc2tJZH1gLCBmYWxzZSk7XG4gICAgICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqIE1vdmUgYSBURmlsZSBpbnRvIGRlc3REaXIgdXNpbmcgdmF1bHQucmVuYW1lICh0cnVlIGZpbGVzeXN0ZW0gbW92ZSkuICovXG5hc3luYyBmdW5jdGlvbiBtb3ZlRmlsZShhcHA6IEFwcCwgZmlsZTogVEZpbGUsIGRlc3REaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBCdWlsZCBhIHVuaXF1ZSBkZXN0aW5hdGlvbiBwYXRoXG4gIGxldCBkZXN0UGF0aCA9IGAke2Rlc3REaXJ9LyR7ZmlsZS5uYW1lfWA7XG4gIGlmIChhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGRlc3RQYXRoKSkge1xuICAgIGRlc3RQYXRoID0gYCR7ZGVzdERpcn0vJHtmaWxlLmJhc2VuYW1lfS0ke0RhdGUubm93KCl9LiR7ZmlsZS5leHRlbnNpb259YDtcbiAgfVxuICBhd2FpdCBhcHAudmF1bHQucmVuYW1lKGZpbGUsIGRlc3RQYXRoKTtcbn1cbiIsImltcG9ydCB7IEFwcCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgVGFzayB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgbG9hZFByb2plY3RzLCBnZW5lcmF0ZVRhc2tGcm9udG1hdHRlciB9IGZyb20gJy4vdGFza1V0aWxzJztcblxuLy8gS2V5IHVzZWQgaW4gT2JzaWRpYW4gbG9jYWxTdG9yYWdlIHRvIHBlcnNpc3QgdGhlIGxhc3QtcHVsbCB0aW1lc3RhbXAuXG5jb25zdCBMU19MQVNUX1BVTEwgPSAnZ2FudHRfc3luY19sYXN0X3B1bGxfYXQnO1xuXG5leHBvcnQgY2xhc3MgR2FudHRTeW5jU2VydmljZSB7XG4gIHByaXZhdGUgYmFzZVVybDogc3RyaW5nO1xuICBwcml2YXRlIGVtYWlsOiBzdHJpbmc7XG4gIHByaXZhdGUgcGFzc3dvcmQ6IHN0cmluZztcbiAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nLCBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgdGhpcy5iYXNlVXJsICA9IGJhc2VVcmwucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICB0aGlzLmVtYWlsICAgID0gZW1haWw7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZmV0Y2gocGF0aDogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9JHtwYXRofWA7XG4gICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAuLi4oKG9wdGlvbnMuaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSA/PyB7fSksXG4gICAgfTtcbiAgICBpZiAodGhpcy50b2tlbikgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgeyAuLi5vcHRpb25zLCBoZWFkZXJzIH0pO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgIGxldCBqc29uOiBhbnk7XG4gICAgdHJ5IHsganNvbiA9IEpTT04ucGFyc2UodGV4dCk7IH0gY2F0Y2ggeyBqc29uID0geyBlcnJvcjogdGV4dCB9OyB9XG4gICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihqc29uPy5lcnJvciA/PyBqc29uPy5tZXNzYWdlID8/IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKiBBdXRoZW50aWNhdGUgYW5kIGNhY2hlIHRoZSBKV1QuIFRocm93cyBvbiBmYWlsdXJlLiAqL1xuICBhc3luYyBsb2dpbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5fZmV0Y2goJy9hdXRoL2xvZ2luJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGVtYWlsOiB0aGlzLmVtYWlsLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZCB9KSxcbiAgICB9KTtcbiAgICB0aGlzLnRva2VuID0gZGF0YS50b2tlbiA/PyBkYXRhLmFjY2Vzc190b2tlbiA/PyBudWxsO1xuICAgIGlmICghdGhpcy50b2tlbikgdGhyb3cgbmV3IEVycm9yKCdMb2dpbiByZXNwb25zZSBtaXNzaW5nIHRva2VuJyk7XG4gIH1cblxuICAvKipcbiAgICogRnVsbCBiaWRpcmVjdGlvbmFsIHN5bmM6XG4gICAqICAxLiBSZWFkIGFsbCBsb2NhbCAubWQgdGFza3Mgd2l0aCB0aGVpciB1cGRhdGVkQXQgdGltZXN0YW1wcy5cbiAgICogIDIuIFB1c2ggdGhlbSBhbGwgdG8gdGhlIHNlcnZlciAoc2VydmVyIHVzZXMgXCJoaWdoZXN0IHRpbWVzdGFtcCB3aW5zXCIpLlxuICAgKiAgMy4gU2VydmVyIHJldHVybnMgYW55IHRhc2tzIHdoZXJlIGl0IGhlbGQgYSBORVdFUiB2ZXJzaW9uIChjb25mbGljdHMpLlxuICAgKiAgICAgQXBwbHkgdGhvc2Ugc2VydmVyLXdpbnMgYmFjayB0byBsb2NhbCAubWQgZmlsZXMuXG4gICAqICA0LiBQdWxsIGV2ZXJ5dGhpbmcgdXBkYXRlZCBvbiB0aGUgc2VydmVyIHNpbmNlIG91ciBsYXN0IHB1bGwgdGltZXN0YW1wLlxuICAgKiAgICAgQXBwbHkgdGhvc2UgdG8gbG9jYWwgLm1kIGZpbGVzIChjcmVhdGUgLyB1cGRhdGUgLyBkZWxldGUpLlxuICAgKlxuICAgKiBSZXR1cm5zIGEgc3VtbWFyeSB7IHB1c2hlZCwgcHVsbGVkLCBjb25mbGljdHMsIGRlbGV0ZWQsIGNvbmZsaWN0VGFza3MgfS5cbiAgICogYGNvbmZsaWN0VGFza3NgIGFyZSB0aGUgcmF3IHNlcnZlciBvYmplY3RzIGZvciB0YXNrcyB3aGVyZSB0aGUgc2VydmVyIHdvbiDigJRcbiAgICogY2FsbGVycyBjYW4gcHJlc2VudCB0aGVzZSB0byB0aGUgdXNlciBhbmQgY2FsbCBmb3JjZVB1c2hUYXNrcygpIGlmIHRoZXlcbiAgICogY2hvb3NlIHRvIG92ZXJyaWRlIHRoZSBzZXJ2ZXIgd2l0aCB0aGVpciBsb2NhbCB2ZXJzaW9uLlxuICAgKi9cbiAgYXN5bmMgc3luY0FsbChhcHA6IEFwcCwgcHJvamVjdHNGb2xkZXI6IHN0cmluZyk6IFByb21pc2U8eyBwdXNoZWQ6IG51bWJlcjsgcHVsbGVkOiBudW1iZXI7IGNvbmZsaWN0czogbnVtYmVyOyBkZWxldGVkOiBudW1iZXI7IGNvbmZsaWN0VGFza3M6IGFueVtdIH0+IHtcbiAgICBjb25zdCBzaW5jZSA9IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKExTX0xBU1RfUFVMTCkgPz8gJzAnLCAxMCkgfHwgMDtcblxuICAgIC8vIOKUgOKUgCAxLiBDb2xsZWN0IGFsbCBsb2NhbCB0YXNrcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBjb25zdCBwcm9qZWN0cyA9IGF3YWl0IGxvYWRQcm9qZWN0cyhhcHAsIHByb2plY3RzRm9sZGVyKTtcbiAgICBjb25zdCBsb2NhbFRhc2tzOiBUYXNrW10gPSAoW10gYXMgVGFza1tdKS5jb25jYXQoLi4ucHJvamVjdHMubWFwKChwKSA9PiBwLnRhc2tzKSk7XG5cbiAgICAvLyBCdWlsZCBhIGxvb2t1cDogaWQg4oaSIHRhc2tcbiAgICBjb25zdCBsb2NhbEJ5SWQgPSBuZXcgTWFwPHN0cmluZywgVGFzaz4obG9jYWxUYXNrcy5tYXAoKHQ6IFRhc2spID0+IFt0LmlkLCB0XSkpO1xuXG4gICAgLy8g4pSA4pSAIDIuIFB1c2ggbG9jYWwgdGFza3Mgd2l0aCB0aGVpciB0aW1lc3RhbXBzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIGxldCBwdXNoZWQgPSAwO1xuICAgIGxldCBzZXJ2ZXJDb25mbGljdHM6IGFueVtdID0gW107XG5cbiAgICBpZiAobG9jYWxUYXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gbG9jYWxUYXNrcy5tYXAoKHQ6IFRhc2spID0+ICh7XG4gICAgICAgIGlkOiAgICAgICAgICAgICB0LmlkLFxuICAgICAgICB0aXRsZTogICAgICAgICAgdC50aXRsZSxcbiAgICAgICAgc3RhdHVzOiAgICAgICAgIHQuc3RhdHVzLFxuICAgICAgICBwcmlvcml0eTogICAgICAgdC5wcmlvcml0eSxcbiAgICAgICAgc3RhcnRfZGF0ZTogICAgIHQuc3RhcnREYXRlICA/PyAnJyxcbiAgICAgICAgZW5kX2RhdGU6ICAgICAgIHQuZW5kRGF0ZSAgICA/PyAnJyxcbiAgICAgICAgYXNzaWduZWU6ICAgICAgIHQuYXNzaWduZWUgICA/PyAnJyxcbiAgICAgICAgdGFnczogICAgICAgICAgICh0LnRhZ3MgPz8gW10pLmpvaW4oJywnKSxcbiAgICAgICAgZGVzY3JpcHRpb246ICAgIHQuZGVzY3JpcHRpb24gPz8gJycsXG4gICAgICAgIHByb2plY3RfZm9sZGVyOiB0LnByb2plY3RGb2xkZXIgPz8gJycsXG4gICAgICAgIGZpbGVfcGF0aDogICAgICB0LmZpbGVQYXRoID8/ICcnLFxuICAgICAgICB1cGRhdGVkQXQ6ICAgICAgdC51cGRhdGVkQXQgfHwgRGF0ZS5ub3coKSwgICAvLyDihpAgY3JpdGljYWw6IHNlcnZlciB1c2VzIHRoaXMgZm9yIGNvbmZsaWN0IHJlc29sdXRpb25cbiAgICAgIH0pKTtcblxuICAgICAgY29uc3QgcHVzaFJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZldGNoKCcvdGFza3MvcHVzaCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGFza3M6IHBheWxvYWQgfSksXG4gICAgICB9KTtcblxuICAgICAgcHVzaGVkID0gKHB1c2hSZXN1bHQuYWNjZXB0ZWQgYXMgc3RyaW5nW10pPy5sZW5ndGggPz8gMDtcbiAgICAgIHNlcnZlckNvbmZsaWN0cyA9IChwdXNoUmVzdWx0LmNvbmZsaWN0cyBhcyBhbnlbXSkgPz8gW107XG4gICAgfVxuXG4gICAgLy8g4pSA4pSAIDMuIEFwcGx5IHNlcnZlci13aW5zIGNvbmZsaWN0cyBiYWNrIHRvIGxvY2FsIC5tZCBmaWxlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICAvLyBUaGUgc2VydmVyIHJldHVybmVkIHRoZXNlIGJlY2F1c2UgaXQgaGFzIGEgbmV3ZXIgdmVyc2lvbiB0aGFuIHdlIHB1c2hlZC5cbiAgICBsZXQgY29uZmxpY3RzID0gMDtcbiAgICBmb3IgKGNvbnN0IHJ0IG9mIHNlcnZlckNvbmZsaWN0cykge1xuICAgICAgYXdhaXQgdGhpcy5fYXBwbHlSZW1vdGVUYXNrKGFwcCwgcnQsIHByb2plY3RzRm9sZGVyLCBsb2NhbEJ5SWQpO1xuICAgICAgY29uZmxpY3RzKys7XG4gICAgfVxuXG4gICAgLy8g4pSA4pSAIDQuIFB1bGwgZXZlcnl0aGluZyB0aGUgc2VydmVyIHVwZGF0ZWQgc2luY2Ugb3VyIGxhc3QgcHVsbCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBjb25zdCBwdWxsUmVzdWx0ID0gYXdhaXQgdGhpcy5fZmV0Y2goYC90YXNrcy9wdWxsP3NpbmNlPSR7c2luY2V9YCk7XG4gICAgY29uc3QgcmVtb3RlVGFza3M6IGFueVtdID0gcHVsbFJlc3VsdC50YXNrcyA/PyBbXTtcbiAgICBjb25zdCBwdWxsZWRBdDogbnVtYmVyICAgPSBwdWxsUmVzdWx0LnB1bGxlZEF0ID8/IERhdGUubm93KCk7XG5cbiAgICBsZXQgcHVsbGVkICA9IDA7XG4gICAgbGV0IGRlbGV0ZWQgPSAwO1xuXG4gICAgZm9yIChjb25zdCBydCBvZiByZW1vdGVUYXNrcykge1xuICAgICAgY29uc3QgbG9jYWwgPSBsb2NhbEJ5SWQuZ2V0KHJ0LmlkKTtcbiAgICAgIGNvbnN0IHJlbW90ZVRzID0gcnQudXBkYXRlZEF0ID8/IDA7XG4gICAgICBjb25zdCBsb2NhbFRzICA9IGxvY2FsPy51cGRhdGVkQXQgPz8gMDtcblxuICAgICAgLy8gU2tpcCBpZiBvdXIgbG9jYWwgY29weSBpcyBhbHJlYWR5IGVxdWFsIG9yIG5ld2VyXG4gICAgICBpZiAobG9jYWwgJiYgbG9jYWxUcyA+PSByZW1vdGVUcykgY29udGludWU7XG5cbiAgICAgIGlmIChydC5pc0FyY2hpdmVkKSB7XG4gICAgICAgIC8vIFNlcnZlciBzYXlzIGRlbGV0ZWQg4oaSIHJlbW92ZSBsb2NhbCBmaWxlIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAobG9jYWwpIHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgobG9jYWwuZmlsZVBhdGgpO1xuICAgICAgICAgIGlmIChmaWxlKSB7IGF3YWl0IGFwcC52YXVsdC5kZWxldGUoZmlsZSk7IGRlbGV0ZWQrKzsgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9hcHBseVJlbW90ZVRhc2soYXBwLCBydCwgcHJvamVjdHNGb2xkZXIsIGxvY2FsQnlJZCk7XG4gICAgICAgIHB1bGxlZCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBlcnNpc3QgdGhlIHB1bGwgdGltZXN0YW1wIHNvIG5leHQgc3luYyBpcyBhIGRlbHRhXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTFNfTEFTVF9QVUxMLCBTdHJpbmcocHVsbGVkQXQpKTtcblxuICAgIHJldHVybiB7IHB1c2hlZCwgcHVsbGVkLCBjb25mbGljdHMsIGRlbGV0ZWQsIGNvbmZsaWN0VGFza3M6IHNlcnZlckNvbmZsaWN0cyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlLXB1c2ggbG9jYWwgdmVyc2lvbnMgb2YgY29uZmxpY3RpbmcgdGFza3MsIG92ZXJyaWRpbmcgdGhlIHNlcnZlci5cbiAgICpcbiAgICogRm9yIGVhY2ggdGFzayBpbiBgbG9jYWxUYXNrc2AsIHdlIGJ1bXAgYHVwZGF0ZWRBdGAgdG8gYHNlcnZlclRzICsgMWAgc28gaXRcbiAgICogaXMgc3RyaWN0bHkgbmV3ZXIgdGhhbiB0aGUgc2VydmVyIGNvcHkuICBUaGUgc2VydmVyJ3MgXCJoaWdoZXN0IHRpbWVzdGFtcFxuICAgKiB3aW5zXCIgbG9naWMgd2lsbCB0aGVuIGFjY2VwdCBvdXIgdmVyc2lvbiBhbmQgcHJvcGFnYXRlIGl0IHRvIGV2ZXJ5IG90aGVyXG4gICAqIGNsaWVudCAoZS5nLiB0aGUgRmx1dHRlciBhcHApIG9uIHRoZWlyIG5leHQgcHVsbC5cbiAgICpcbiAgICogQHBhcmFtIGFwcCAgICAgICAgICAgIE9ic2lkaWFuIEFwcCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gcHJvamVjdHNGb2xkZXIgUm9vdCBmb2xkZXIgZm9yIHRhc2sgLm1kIGZpbGVzXG4gICAqIEBwYXJhbSBjb25mbGljdFRhc2tzICBUaGUgcmF3IHNlcnZlciBvYmplY3RzIHJldHVybmVkIGluIGBzeW5jQWxsKCkuY29uZmxpY3RUYXNrc2BcbiAgICovXG4gIGFzeW5jIGZvcmNlUHVzaFRhc2tzKGFwcDogQXBwLCBwcm9qZWN0c0ZvbGRlcjogc3RyaW5nLCBjb25mbGljdFRhc2tzOiBhbnlbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChjb25mbGljdFRhc2tzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgLy8gUmVsb2FkIGxvY2FsIHRhc2tzIHRvIGdldCB0aGUgbGF0ZXN0IGZpbGUgY29udGVudFxuICAgIGNvbnN0IHByb2plY3RzICA9IGF3YWl0IGxvYWRQcm9qZWN0cyhhcHAsIHByb2plY3RzRm9sZGVyKTtcbiAgICBjb25zdCBsb2NhbEJ5SWQgPSBuZXcgTWFwPHN0cmluZywgVGFzaz4oXG4gICAgICAoW10gYXMgVGFza1tdKS5jb25jYXQoLi4ucHJvamVjdHMubWFwKChwKSA9PiBwLnRhc2tzKSkubWFwKCh0OiBUYXNrKSA9PiBbdC5pZCwgdF0pXG4gICAgKTtcblxuICAgIGNvbnN0IG92ZXJyaWRlVGFza3MgPSBjb25mbGljdFRhc2tzLm1hcCgocnQ6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbG9jYWwgICAgPSBsb2NhbEJ5SWQuZ2V0KHJ0LmlkKTtcbiAgICAgIGNvbnN0IHNlcnZlclRzID0gcnQudXBkYXRlZEF0ID8/IDA7XG4gICAgICAvLyBXaW5uaW5nIHRpbWVzdGFtcDogc3RyaWN0bHkgZ3JlYXRlciB0aGFuIHRoZSBzZXJ2ZXIncyBjdXJyZW50IHZhbHVlXG4gICAgICBjb25zdCB3aW5uaW5nVHMgPSBzZXJ2ZXJUcyArIDE7XG5cbiAgICAgIC8vIFN0YW1wIHRoZSBuZXcgdGltZXN0YW1wIGludG8gdGhlIGxvY2FsIC5tZCBmaWxlIHNvIHRoZSBmaWxlIG9uIGRpc2tcbiAgICAgIC8vIHJlZmxlY3RzIHdoYXQgd2UncmUgcHVzaGluZyAocHJldmVudHMgaW1tZWRpYXRlIHJlLWNvbmZsaWN0IG9uIG5leHQgc3luYylcbiAgICAgIGlmIChsb2NhbCkge1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGxvY2FsLmZpbGVQYXRoO1xuICAgICAgICBhcHAudmF1bHQuYWRhcHRlci5yZWFkKGZpbGVQYXRoKS50aGVuKGFzeW5jIChjb250ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0gY29udGVudFxuICAgICAgICAgICAgLnJlcGxhY2UoL151cGRhdGVkX2F0OlxccyouKyQvbSwgYHVwZGF0ZWRfYXQ6ICR7d2lubmluZ1RzfWApXG4gICAgICAgICAgICAvLyBJbiBjYXNlIHVwZGF0ZWRfYXQgd2Fzbid0IGluIHRoZSBmaWxlIHlldCwgaW5zZXJ0IGl0XG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuLS0tXFxuLywgYFxcbnVwZGF0ZWRfYXQ6ICR7d2lubmluZ1RzfVxcbi0tLVxcbmApO1xuICAgICAgICAgIC8vIE9ubHkgd3JpdGUgaWYgd2UgYWN0dWFsbHkgY2hhbmdlZCBzb21ldGhpbmdcbiAgICAgICAgICBpZiAodXBkYXRlZCAhPT0gY29udGVudCkge1xuICAgICAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUoZmlsZVBhdGgsIHVwZGF0ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogICAgICAgICAgICAgcnQuaWQsXG4gICAgICAgIHRpdGxlOiAgICAgICAgICBsb2NhbD8udGl0bGUgICAgICAgICAgPz8gcnQudGl0bGUsXG4gICAgICAgIHN0YXR1czogICAgICAgICBsb2NhbD8uc3RhdHVzICAgICAgICAgPz8gcnQuc3RhdHVzLFxuICAgICAgICBwcmlvcml0eTogICAgICAgbG9jYWw/LnByaW9yaXR5ICAgICAgID8/IHJ0LnByaW9yaXR5LFxuICAgICAgICBzdGFydF9kYXRlOiAgICAgbG9jYWw/LnN0YXJ0RGF0ZSAgICAgID8/IHJ0LnN0YXJ0RGF0ZSAgPz8gcnQuc3RhcnRfZGF0ZSAgPz8gJycsXG4gICAgICAgIGVuZF9kYXRlOiAgICAgICBsb2NhbD8uZW5kRGF0ZSAgICAgICAgPz8gcnQuZW5kRGF0ZSAgICA/PyBydC5lbmRfZGF0ZSAgICA/PyAnJyxcbiAgICAgICAgYXNzaWduZWU6ICAgICAgIGxvY2FsPy5hc3NpZ25lZSAgICAgICA/PyBydC5hc3NpZ25lZSAgID8/ICcnLFxuICAgICAgICB0YWdzOiAgICAgICAgICAgKGxvY2FsPy50YWdzID8/IFtdKS5qb2luKCcsJyksXG4gICAgICAgIGRlc2NyaXB0aW9uOiAgICBsb2NhbD8uZGVzY3JpcHRpb24gICAgPz8gcnQuZGVzY3JpcHRpb24gPz8gJycsXG4gICAgICAgIHByb2plY3RfZm9sZGVyOiBsb2NhbD8ucHJvamVjdEZvbGRlciAgPz8gcnQucHJvamVjdF9mb2xkZXIgPz8gJycsXG4gICAgICAgIGZpbGVfcGF0aDogICAgICBsb2NhbD8uZmlsZVBhdGggICAgICAgPz8gcnQuZmlsZV9wYXRoICA/PyAnJyxcbiAgICAgICAgdXBkYXRlZEF0OiAgICAgIHdpbm5pbmdUcywgICAvLyBiZWF0cyB0aGUgc2VydmVyIOKAlCBndWFyYW50ZWVkIHdpblxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMuX2ZldGNoKCcvdGFza3MvcHVzaCcsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0YXNrczogb3ZlcnJpZGVUYXNrcyB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSBhIHJlbW90ZSB0YXNrIG9iamVjdCBpbnRvIHRoZSB2YXVsdCBhcyBhIC5tZCBmaWxlLlxuICAgKiBJZiBhIGxvY2FsIGZpbGUgZm9yIHRoaXMgdGFzayBhbHJlYWR5IGV4aXN0cywgdXBkYXRlIGl0IGluLXBsYWNlLlxuICAgKiBQcmVzZXJ2ZXMgdGhlIGJvZHkgY29udGVudCAoRGVzY3JpcHRpb24gLyBOb3RlcyBzZWN0aW9ucykgb2YgZXhpc3RpbmcgZmlsZXMuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9hcHBseVJlbW90ZVRhc2soXG4gICAgYXBwOiBBcHAsXG4gICAgcnQ6IGFueSxcbiAgICBwcm9qZWN0c0ZvbGRlcjogc3RyaW5nLFxuICAgIGxvY2FsQnlJZDogTWFwPHN0cmluZywgVGFzaz4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGxvY2FsID0gbG9jYWxCeUlkLmdldChydC5pZCk7XG5cbiAgICAvLyBEZXRlcm1pbmUgdGFyZ2V0IHBhdGg6IHJldXNlIGV4aXN0aW5nIGZpbGUgcGF0aCwgb3IgZGVyaXZlIGZyb20gc2VydmVyIGRhdGFcbiAgICBsZXQgZmlsZVBhdGg6IHN0cmluZztcbiAgICBpZiAobG9jYWw/LmZpbGVQYXRoKSB7XG4gICAgICBmaWxlUGF0aCA9IGxvY2FsLmZpbGVQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmb2xkZXIgPSBydC5wcm9qZWN0X2ZvbGRlciB8fCBgJHtwcm9qZWN0c0ZvbGRlcn0vU3luY2VkYDtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLm1rZGlyKGZvbGRlcikuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgY29uc3Qgc2FmZU5hbWUgPSAocnQudGl0bGUgPz8gcnQuaWQpLnJlcGxhY2UoL1svXFxcXDoqP1wiPD58XS9nLCAnXycpO1xuICAgICAgZmlsZVBhdGggPSBgJHtmb2xkZXJ9LyR7c2FmZU5hbWV9Lm1kYDtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCBuZXcgZnJvbnRtYXR0ZXIsIHByZXNlcnZpbmcgZXhpc3RpbmcgYm9keVxuICAgIGNvbnN0IG5ld0ZtID0gZ2VuZXJhdGVUYXNrRnJvbnRtYXR0ZXIoe1xuICAgICAgaWQ6ICAgICAgICBydC5pZCxcbiAgICAgIHRpdGxlOiAgICAgcnQudGl0bGUsXG4gICAgICBzdGF0dXM6ICAgIHJ0LnN0YXR1cyxcbiAgICAgIHByaW9yaXR5OiAgcnQucHJpb3JpdHksXG4gICAgICBzdGFydERhdGU6IHJ0LnN0YXJ0RGF0ZSAgPz8gcnQuc3RhcnRfZGF0ZSAgPz8gJycsXG4gICAgICBlbmREYXRlOiAgIHJ0LmVuZERhdGUgICAgPz8gcnQuZW5kX2RhdGUgICAgPz8gJycsXG4gICAgICBhc3NpZ25lZTogIHJ0LmFzc2lnbmVlICAgPz8gJycsXG4gICAgICB0YWdzOiAgICAgIHJ0LnRhZ3NcbiAgICAgICAgPyAodHlwZW9mIHJ0LnRhZ3MgPT09ICdzdHJpbmcnID8gcnQudGFncy5zcGxpdCgnLCcpLm1hcCgodDogc3RyaW5nKSA9PiB0LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogcnQudGFncylcbiAgICAgICAgOiBbXSxcbiAgICAgIGRlc2NyaXB0aW9uOiBydC5kZXNjcmlwdGlvbiA/PyAnJyxcbiAgICAgIHBhcmVudElkOiAgcnQucGFyZW50SWQgICA/PyBydC5wYXJlbnRfaWQgICA/PyAnJyxcbiAgICAgIHVwZGF0ZWRBdDogcnQudXBkYXRlZEF0ICA/PyAwLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZXhpc3RpbmdGaWxlID0gYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuICAgIGlmIChleGlzdGluZ0ZpbGUpIHtcbiAgICAgIC8vIFByZXNlcnZlIHRoZSB1c2VyJ3MgYm9keSAoZXZlcnl0aGluZyBhZnRlciB0aGUgY2xvc2luZyAtLS0pXG4gICAgICBjb25zdCBvbGRDb250ZW50ID0gYXdhaXQgYXBwLnZhdWx0LnJlYWQoZXhpc3RpbmdGaWxlKTtcbiAgICAgIGNvbnN0IGJvZHlNYXRjaCAgPSBvbGRDb250ZW50Lm1hdGNoKC9eLS0tXFxuW1xcc1xcU10qP1xcbi0tLVxcbihbXFxzXFxTXSopJC8pO1xuICAgICAgY29uc3QgYm9keSAgICAgICA9IGJvZHlNYXRjaCA/IGJvZHlNYXRjaFsxXSA6ICdcXG4jICcgKyAocnQudGl0bGUgPz8gJycpICsgJ1xcblxcbiMjIERlc2NyaXB0aW9uXFxuXFxuXFxuXFxuIyMgTm90ZXNcXG5cXG4nO1xuICAgICAgLy8gUmVwbGFjZSBvbmx5IHRoZSBmcm9udG1hdHRlciBibG9ja1xuICAgICAgY29uc3QgbmV3Q29udGVudCA9IG5ld0ZtLnJlcGxhY2UoL1xcbi0tLVxcbltcXHNcXFNdKiQvLCAnXFxuLS0tXFxuJykgKyBib2R5LnJlcGxhY2UoL15cXG4vLCAnJyk7XG4gICAgICBhd2FpdCBhcHAudmF1bHQubW9kaWZ5KGV4aXN0aW5nRmlsZSwgbmV3Q29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5jcmVhdGUoZmlsZVBhdGgsIG5ld0ZtKTtcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgR2FudHRQbHVnaW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7IEdhbnR0U3luY1NlcnZpY2UgfSBmcm9tICcuL3N5bmNTZXJ2aWNlJztcblxuLy8g4pSA4pSAIENvbmZsaWN0IHJlc29sdXRpb24gbW9kYWwg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBjbGFzcyBTeW5jQ29uZmxpY3RNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgcHJpdmF0ZSBjb25mbGljdHM6IGFueVtdO1xuICBwcml2YXRlIHN2YzogR2FudHRTeW5jU2VydmljZTtcbiAgcHJpdmF0ZSBwbHVnaW46IEdhbnR0UGx1Z2luO1xuICBwcml2YXRlIG9uUmVzb2x2ZWQ6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogR2FudHRQbHVnaW4sIHN2YzogR2FudHRTeW5jU2VydmljZSwgY29uZmxpY3RzOiBhbnlbXSwgb25SZXNvbHZlZDogKCkgPT4gdm9pZCkge1xuICAgIHN1cGVyKGFwcCk7XG4gICAgdGhpcy5wbHVnaW4gICAgICA9IHBsdWdpbjtcbiAgICB0aGlzLnN2YyAgICAgICAgID0gc3ZjO1xuICAgIHRoaXMuY29uZmxpY3RzICAgPSBjb25mbGljdHM7XG4gICAgdGhpcy5vblJlc29sdmVkICA9IG9uUmVzb2x2ZWQ7XG4gIH1cblxuICBvbk9wZW4oKSB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgY29udGVudEVsLmNyZWF0ZUVsKCdoMycsIHsgdGV4dDogYOKaoO+4jyAke3RoaXMuY29uZmxpY3RzLmxlbmd0aH0gc3luYyBjb25mbGljdCR7dGhpcy5jb25mbGljdHMubGVuZ3RoID4gMSA/ICdzJyA6ICcnfWAgfSk7XG4gICAgY29udGVudEVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJ1RoZSBzZXJ2ZXIgaGFzIG5ld2VyIHZlcnNpb25zIG9mIHRoZXNlIHRhc2tzLiBDaG9vc2UgaG93IHRvIHJlc29sdmU6JyxcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgfSk7XG5cbiAgICBjb25zdCBsaXN0ID0gY29udGVudEVsLmNyZWF0ZUVsKCd1bCcpO1xuICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmNvbmZsaWN0cykge1xuICAgICAgbGlzdC5jcmVhdGVFbCgnbGknLCB7IHRleHQ6IGMudGl0bGUgPz8gYy5pZCA/PyAnKHVua25vd24pJyB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBidG5Sb3cgPSBjb250ZW50RWwuY3JlYXRlRGl2KHsgY2xzOiAnbW9kYWwtYnV0dG9uLWNvbnRhaW5lcicgfSk7XG4gICAgYnRuUm93LnN0eWxlLmRpc3BsYXkgICAgICAgPSAnZmxleCc7XG4gICAgYnRuUm93LnN0eWxlLmdhcCAgICAgICAgICAgID0gJzhweCc7XG4gICAgYnRuUm93LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtZW5kJztcbiAgICBidG5Sb3cuc3R5bGUubWFyZ2luVG9wICAgICAgPSAnMTZweCc7XG5cbiAgICBjb25zdCBrZWVwQnRuID0gYnRuUm93LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdLZWVwIG1pbmUgKG92ZXJyaWRlIHNlcnZlciknIH0pO1xuICAgIGtlZXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICBrZWVwQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGtlZXBCdG4udGV4dENvbnRlbnQgPSAnUHVzaGluZ+KApic7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnN2Yy5mb3JjZVB1c2hUYXNrcyh0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvamVjdHNGb2xkZXIsIHRoaXMuY29uZmxpY3RzKTtcbiAgICAgICAgbmV3IE5vdGljZShg4pyFIFlvdXIgdmVyc2lvbiBwdXNoZWQg4oCUIHNlcnZlciB1cGRhdGVkIGZvciAke3RoaXMuY29uZmxpY3RzLmxlbmd0aH0gdGFzayhzKS5gKTtcbiAgICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICBuZXcgTm90aWNlKGDinYwgRm9yY2UtcHVzaCBmYWlsZWQ6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uUmVzb2x2ZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2VwdEJ0biA9IGJ0blJvdy5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQWNjZXB0IHNlcnZlcicsIGNsczogJ21vZC1jdGEnIH0pO1xuICAgIGFjY2VwdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIC8vIFNlcnZlciB2ZXJzaW9ucyB3ZXJlIGFscmVhZHkgYXBwbGllZCB0byBkaXNrIGR1cmluZyBzeW5jQWxsIOKAlCBub3RoaW5nIG1vcmUgbmVlZGVkLlxuICAgICAgbmV3IE5vdGljZShg4pyFIFNlcnZlciB2ZXJzaW9ucyBhY2NlcHRlZCBmb3IgJHt0aGlzLmNvbmZsaWN0cy5sZW5ndGh9IHRhc2socykuYCk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB0aGlzLm9uUmVzb2x2ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2FudHRTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHBsdWdpbjogR2FudHRQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogR2FudHRQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ09ic2lkaWFuIEdhbnR0ICYgS2FuYmFuIOKAlCBTZXR0aW5ncycgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdQcm9qZWN0cyBmb2xkZXInKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdSb290IGZvbGRlciB3aGVyZSB5b3VyIHByb2plY3QgZm9sZGVycyBsaXZlLiBFYWNoIHN1YmZvbGRlciBiZWNvbWVzIGEgcHJvamVjdC4nXG4gICAgICApXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignUHJvamVjdHMnKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlciA9IHZhbHVlLnRyaW0oKSB8fCAnUHJvamVjdHMnO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdEZWZhdWx0IHRhc2sgc3RhdHVzJylcbiAgICAgIC5zZXREZXNjKCdTdGF0dXMgYXNzaWduZWQgdG8gbmV3bHkgY3JlYXRlZCB0YXNrcy4nKVxuICAgICAgLmFkZERyb3Bkb3duKChkZCkgPT5cbiAgICAgICAgZGRcbiAgICAgICAgICAuYWRkT3B0aW9uKCd0b2RvJywgJ1RvIERvJylcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpbi1wcm9ncmVzcycsICdJbiBQcm9ncmVzcycpXG4gICAgICAgICAgLmFkZE9wdGlvbignZG9uZScsICdEb25lJylcbiAgICAgICAgICAuYWRkT3B0aW9uKCdibG9ja2VkJywgJ0Jsb2NrZWQnKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0U3RhdHVzKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRTdGF0dXMgPSB2YWx1ZSBhcyBhbnk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ0RlZmF1bHQgdGFzayBwcmlvcml0eScpXG4gICAgICAuc2V0RGVzYygnUHJpb3JpdHkgYXNzaWduZWQgdG8gbmV3bHkgY3JlYXRlZCB0YXNrcy4nKVxuICAgICAgLmFkZERyb3Bkb3duKChkZCkgPT5cbiAgICAgICAgZGRcbiAgICAgICAgICAuYWRkT3B0aW9uKCdsb3cnLCAnTG93JylcbiAgICAgICAgICAuYWRkT3B0aW9uKCdtZWRpdW0nLCAnTWVkaXVtJylcbiAgICAgICAgICAuYWRkT3B0aW9uKCdoaWdoJywgJ0hpZ2gnKVxuICAgICAgICAgIC5hZGRPcHRpb24oJ2NyaXRpY2FsJywgJ0NyaXRpY2FsJylcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdFByaW9yaXR5KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRQcmlvcml0eSA9IHZhbHVlIGFzIGFueTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgLy8g4pSA4pSAIENsb3VkIFN5bmMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gzJywgeyB0ZXh0OiAnQ2xvdWQgU3luYyAob3B0aW9uYWwpJyB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6ICdDb25uZWN0IHRvIGEgc2VsZi1ob3N0ZWQgZ2FudHQgYmFja2VuZCB0byBzeW5jIHRhc2tzIGFjcm9zcyBkZXZpY2VzLicsXG4gICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnU2VydmVyIFVSTCcpXG4gICAgICAuc2V0RGVzYygnQmFzZSBVUkwgb2YgeW91ciBzeW5jIGJhY2tlbmQsIGUuZy4gaHR0cHM6Ly95b3VybmFtZS5oZWxpb2hvc3QudXMvb2JnYW50dC9iYWNrZW5kJylcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdodHRwczovL+KApi9iYWNrZW5kJylcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3luY0Jhc2VVcmwpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3luY0Jhc2VVcmwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ0VtYWlsJylcbiAgICAgIC5zZXREZXNjKCdBY2NvdW50IGVtYWlsIGFkZHJlc3MgZm9yIHRoZSBzeW5jIHNlcnZlci4nKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ3lvdUBleGFtcGxlLmNvbScpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN5bmNFbWFpbClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeW5jRW1haWwgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ1Bhc3N3b3JkJylcbiAgICAgIC5zZXREZXNjKCdBY2NvdW50IHBhc3N3b3JkLiBTdG9yZWQgaW4gT2JzaWRpYW4gcGx1Z2luIGRhdGEuJylcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIHRleHQuaW5wdXRFbC50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcign4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiJylcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3luY1Bhc3N3b3JkKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnN5bmNQYXNzd29yZCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHN5bmNTdGF0dXNFbCA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJycsXG4gICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnU3luYyBub3cnKVxuICAgICAgLnNldERlc2MoJ01hbnVhbGx5IHB1bGwgJiBwdXNoIGFsbCB0YXNrcyB3aXRoIHRoZSBzZXJ2ZXIuJylcbiAgICAgIC5hZGRCdXR0b24oKGJ0bikgPT5cbiAgICAgICAgYnRuXG4gICAgICAgICAgLnNldEJ1dHRvblRleHQoJ1N5bmMnKVxuICAgICAgICAgIC5zZXRDdGEoKVxuICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3luY0Jhc2VVcmwsIHN5bmNFbWFpbCwgc3luY1Bhc3N3b3JkIH0gPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICAgICAgICAgIGlmICghc3luY0Jhc2VVcmwgfHwgIXN5bmNFbWFpbCB8fCAhc3luY1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICAgIHN5bmNTdGF0dXNFbC50ZXh0Q29udGVudCA9ICfimqDvuI8gIEZpbGwgaW4gU2VydmVyIFVSTCwgRW1haWwsIGFuZCBQYXNzd29yZCBmaXJzdC4nO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidG4uc2V0RGlzYWJsZWQodHJ1ZSkuc2V0QnV0dG9uVGV4dCgnU3luY2luZ+KApicpO1xuICAgICAgICAgICAgc3luY1N0YXR1c0VsLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBzdmMgPSBuZXcgR2FudHRTeW5jU2VydmljZShzeW5jQmFzZVVybCwgc3luY0VtYWlsLCBzeW5jUGFzc3dvcmQpO1xuICAgICAgICAgICAgICBhd2FpdCBzdmMubG9naW4oKTtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3ZjLnN5bmNBbGwodGhpcy5wbHVnaW4uYXBwLCB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlcik7XG4gICAgICAgICAgICAgIGNvbnN0IHN1bW1hcnkgPSBg4oaRJHtyZXN1bHQucHVzaGVkfSBwdXNoZWQsIOKGkyR7cmVzdWx0LnB1bGxlZH0gcHVsbGVkLCAke3Jlc3VsdC5kZWxldGVkfSBkZWxldGVkYDtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb25mbGljdFRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzeW5jU3RhdHVzRWwudGV4dENvbnRlbnQgPSBg4pqg77iPICBTeW5jIGRvbmUg4oCUICR7c3VtbWFyeX0uICR7cmVzdWx0LmNvbmZsaWN0VGFza3MubGVuZ3RofSBjb25mbGljdChzKSBuZWVkIHJlc29sdXRpb24uYDtcbiAgICAgICAgICAgICAgICBuZXcgU3luY0NvbmZsaWN0TW9kYWwoXG4gICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAsXG4gICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbixcbiAgICAgICAgICAgICAgICAgIHN2YyxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb25mbGljdFRhc2tzLFxuICAgICAgICAgICAgICAgICAgKCkgPT4geyBzeW5jU3RhdHVzRWwudGV4dENvbnRlbnQgPSBg4pyFICBSZXNvbHZlZCDigJQgJHtzdW1tYXJ5fS5gOyB9LFxuICAgICAgICAgICAgICAgICkub3BlbigpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN5bmNTdGF0dXNFbC50ZXh0Q29udGVudCA9IGDinIUgIFN5bmMgY29tcGxldGUg4oCUICR7c3VtbWFyeX0uYDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICAgIHN5bmNTdGF0dXNFbC50ZXh0Q29udGVudCA9IGDinYwgICR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBidG4uc2V0RGlzYWJsZWQoZmFsc2UpLnNldEJ1dHRvblRleHQoJ1N5bmMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuIiwiLy8gZ2VuZXJhdGVkIGR1cmluZyByZWxlYXNlLCBkbyBub3QgbW9kaWZ5XG5cbi8qKlxuICogVGhlIGN1cnJlbnQgdmVyc2lvbiwgYXMgc2V0IGluIHBhY2thZ2UuanNvbi5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzUuNTMuMyc7XG5leHBvcnQgY29uc3QgUFVCTElDX1ZFUlNJT04gPSAnNSc7XG4iLCJpbXBvcnQgeyBQVUJMSUNfVkVSU0lPTiB9IGZyb20gJy4uL3ZlcnNpb24uanMnO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHQoKHdpbmRvdy5fX3N2ZWx0ZSA/Pz0ge30pLnYgPz89IG5ldyBTZXQoKSkuYWRkKFBVQkxJQ19WRVJTSU9OKTtcbn1cbiIsImltcG9ydCB7IGVuYWJsZV9sZWdhY3lfbW9kZV9mbGFnIH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmVuYWJsZV9sZWdhY3lfbW9kZV9mbGFnKCk7XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICBpbXBvcnQgdHlwZSB7IFRhc2ssIFN1YnRhc2ssIFRhc2tTdGF0dXMgfSBmcm9tICcuLi90eXBlcyc7XG5cbiAgZXhwb3J0IGxldCB0YXNrczogVGFza1tdID0gW107XG4gIGV4cG9ydCBsZXQgb25PcGVuVGFzazogKGZpbGVQYXRoOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgZXhwb3J0IGxldCBvblN0YXR1c0NoYW5nZTogKHRhc2tJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFRhc2tTdGF0dXMpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgZXhwb3J0IGxldCBvbkFkZFN1YnRhc2s6IChwYXJlbnRJZDogc3RyaW5nLCBwYXJlbnRUaXRsZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIGV4cG9ydCBsZXQgb25BcmNoaXZlVGFzazogKHRhc2tJZDogc3RyaW5nLCBmaWxlUGF0aDogc3RyaW5nLCBpc1N1YnRhc2s6IGJvb2xlYW4pID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICB0eXBlIENvbHVtbiA9IHsgaWQ6IFRhc2tTdGF0dXM7IGxhYmVsOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmc7IH07XG4gIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gW1xuICAgIHsgaWQ6ICd0b2RvJywgICAgICAgIGxhYmVsOiAn8J+TiyBUbyBEbycsICAgICAgY29sb3I6ICd2YXIoLS1jb2xvci1iYXNlLTMwKScgfSxcbiAgICB7IGlkOiAnaW4tcHJvZ3Jlc3MnLCBsYWJlbDogJ/CflIQgSW4gUHJvZ3Jlc3MnLCBjb2xvcjogJ3ZhcigtLWNvbG9yLXllbGxvdyknIH0sXG4gICAgeyBpZDogJ2Jsb2NrZWQnLCAgICAgbGFiZWw6ICfwn5qrIEJsb2NrZWQnLCAgICAgY29sb3I6ICd2YXIoLS1jb2xvci1yZWQpJyB9LFxuICAgIHsgaWQ6ICdkb25lJywgICAgICAgIGxhYmVsOiAn4pyFIERvbmUnLCAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3ItZ3JlZW4pJyB9LFxuICBdO1xuXG4gIC8vIOKUgOKUgOKUgCBGbGF0IGNhcmQgbW9kZWwg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIHR5cGUgS2FuYmFuQ2FyZCA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBUYXNrU3RhdHVzO1xuICAgIHByaW9yaXR5OiBzdHJpbmc7XG4gICAgc3RhcnREYXRlOiBzdHJpbmcgfCBudWxsO1xuICAgIGVuZERhdGU6IHN0cmluZyB8IG51bGw7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgZmlsZVBhdGg6IHN0cmluZztcbiAgICBpc1N1YnRhc2s6IGJvb2xlYW47XG4gICAgcGFyZW50SWQ6IHN0cmluZzsgICAgICAvLyBpZCBvZiBwYXJlbnQgdGFzayAoZW1wdHkgc3RyaW5nIGZvciB0b3AtbGV2ZWwpXG4gICAgcGFyZW50VGl0bGU6IHN0cmluZztcbiAgICBhY2NlbnRDb2xvcjogc3RyaW5nO1xuICAgIHN1YnRhc2tDb3VudDogbnVtYmVyO1xuICAgIHN1YnRhc2tEb25lOiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3QgUEFMRVRURSA9IFtcbiAgICAnIzdjNmFmNycsICcjZjc5MjZhJywgJyM2YmJmZjcnLCAnI2Y3Yzg2YScsICcjNmFmNzllJyxcbiAgICAnI2Y3NmE5ZScsICcjNmFmN2YwJywgJyNjODZhZjcnLCAnI2Y3ZjA2YScsICcjNmE5ZWY3JyxcbiAgXTtcblxuICAkOiBjYXJkcyA9IGJ1aWxkQ2FyZHModGFza3MpO1xuXG4gIC8vIFBlci1jb2x1bW4gY2FyZCBsaXN0cyDigJQgcmVhY3RpdmUgYCQ6YCBzbyBTdmVsdGUgcmUtcmVuZGVycyB0aGUgbW9tZW50XG4gIC8vIGVpdGhlciBgY2FyZHNgIChmcm9tIHRhc2tzIHByb3ApIG9yIGBzdGF0dXNPdmVycmlkZXNgIChmcm9tIGEgZHJvcCkgY2hhbmdlcy5cbiAgbGV0IHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgVGFza1N0YXR1cz4gPSB7fTtcblxuICAkOiBjb2xDYXJkcyA9IGNvbXB1dGVDb2xDYXJkcyhjYXJkcywgc3RhdHVzT3ZlcnJpZGVzKTtcblxuICBmdW5jdGlvbiBjb21wdXRlQ29sQ2FyZHMoXG4gICAgY2FyZHM6IEthbmJhbkNhcmRbXSxcbiAgICBvdmVycmlkZXM6IFJlY29yZDxzdHJpbmcsIFRhc2tTdGF0dXM+XG4gICk6IFJlY29yZDxUYXNrU3RhdHVzLCBLYW5iYW5DYXJkW10+IHtcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxUYXNrU3RhdHVzLCBLYW5iYW5DYXJkW10+ID0ge1xuICAgICAgJ3RvZG8nOiBbXSwgJ2luLXByb2dyZXNzJzogW10sICdibG9ja2VkJzogW10sICdkb25lJzogW10sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2FyZHMpIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChjLmlkIGluIG92ZXJyaWRlcyA/IG92ZXJyaWRlc1tjLmlkXSA6IGMuc3RhdHVzKSBhcyBUYXNrU3RhdHVzO1xuICAgICAgcmVzdWx0W3N0YXR1c10ucHVzaCh7IC4uLmMsIHN0YXR1cyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIFdoZW4gdGFza3MgcHJvcCB1cGRhdGVzIGZyb20gZGlzaywgZHJvcCBvdmVycmlkZXMgdGhhdCBhcmUgbm93IHNhdGlzZmllZC5cbiAgJDogaWYgKHRhc2tzKSB7XG4gICAgY29uc3Qgc2V0dGxlZCA9IE9iamVjdC5rZXlzKHN0YXR1c092ZXJyaWRlcykuZmlsdGVyKGlkID0+IHtcbiAgICAgIGNvbnN0IGNhcmQgPSBjYXJkcy5maW5kKGMgPT4gYy5pZCA9PT0gaWQpO1xuICAgICAgcmV0dXJuIGNhcmQgJiYgY2FyZC5zdGF0dXMgPT09IHN0YXR1c092ZXJyaWRlc1tpZF07XG4gICAgfSk7XG4gICAgaWYgKHNldHRsZWQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmV4dCA9IHsgLi4uc3RhdHVzT3ZlcnJpZGVzIH07XG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNldHRsZWQpIGRlbGV0ZSBuZXh0W2lkXTtcbiAgICAgIHN0YXR1c092ZXJyaWRlcyA9IG5leHQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRDYXJkcyh0YXNrczogVGFza1tdKTogS2FuYmFuQ2FyZFtdIHtcbiAgICBjb25zdCByZXN1bHQ6IEthbmJhbkNhcmRbXSA9IFtdO1xuICAgIHRhc2tzLmZvckVhY2goKHRhc2ssIHRhc2tJZHgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudENvbG9yID0gUEFMRVRURVt0YXNrSWR4ICUgUEFMRVRURS5sZW5ndGhdO1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICBpZDogdGFzay5pZCxcbiAgICAgICAgdGl0bGU6IHRhc2sudGl0bGUsXG4gICAgICAgIHN0YXR1czogdGFzay5zdGF0dXMsXG4gICAgICAgIHByaW9yaXR5OiB0YXNrLnByaW9yaXR5LFxuICAgICAgICBzdGFydERhdGU6IHRhc2suc3RhcnREYXRlLFxuICAgICAgICBlbmREYXRlOiB0YXNrLmVuZERhdGUsXG4gICAgICAgIHRhZ3M6IHRhc2sudGFncyxcbiAgICAgICAgZmlsZVBhdGg6IHRhc2suZmlsZVBhdGgsXG4gICAgICAgIGlzU3VidGFzazogZmFsc2UsXG4gICAgICAgIHBhcmVudElkOiAnJyxcbiAgICAgICAgcGFyZW50VGl0bGU6ICcnLFxuICAgICAgICBhY2NlbnRDb2xvcjogcGFyZW50Q29sb3IsXG4gICAgICAgIHN1YnRhc2tDb3VudDogdGFzay5zdWJ0YXNrcy5sZW5ndGgsXG4gICAgICAgIHN1YnRhc2tEb25lOiB0YXNrLnN1YnRhc2tzLmZpbHRlcihzID0+IHMuc3RhdHVzID09PSAnZG9uZScpLmxlbmd0aCxcbiAgICAgIH0pO1xuICAgICAgZm9yIChjb25zdCBzdWIgb2YgdGFzay5zdWJ0YXNrcykge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgaWQ6IHN1Yi5pZCxcbiAgICAgICAgICB0aXRsZTogc3ViLnRpdGxlLFxuICAgICAgICAgIHN0YXR1czogc3ViLnN0YXR1cyxcbiAgICAgICAgICBwcmlvcml0eTogc3ViLnByaW9yaXR5ID8/IHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgc3RhcnREYXRlOiBzdWIuc3RhcnREYXRlLFxuICAgICAgICAgIGVuZERhdGU6IHN1Yi5lbmREYXRlLFxuICAgICAgICAgIHRhZ3M6IFtdLFxuICAgICAgICAgIGZpbGVQYXRoOiBzdWIuZmlsZVBhdGgsXG4gICAgICAgICAgaXNTdWJ0YXNrOiB0cnVlLFxuICAgICAgICAgIHBhcmVudElkOiB0YXNrLmlkLFxuICAgICAgICAgIHBhcmVudFRpdGxlOiB0YXNrLnRpdGxlLFxuICAgICAgICAgIGFjY2VudENvbG9yOiBwYXJlbnRDb2xvcixcbiAgICAgICAgICBzdWJ0YXNrQ291bnQ6IDAsXG4gICAgICAgICAgc3VidGFza0RvbmU6IDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyDilIDilIDilIAgRHJhZyAmIERyb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIC8vIFVzZSBhIGNvdW50ZXIgcGVyIGNvbHVtbiAoZHJhZ2VudGVyL2RyYWdsZWF2ZSBhcmUgdW5yZWxpYWJsZSB3aXRoIGNoaWxkcmVuKS5cbiAgbGV0IGRyYWdnaW5nSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBsZXQgZHJhZ092ZXJDb2w6IFRhc2tTdGF0dXMgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgZHJhZ0NvdW50ZXJzOiBNYXA8VGFza1N0YXR1cywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblxuICBmdW5jdGlvbiBvbkRyYWdTdGFydChjYXJkOiBLYW5iYW5DYXJkLCBlOiBEcmFnRXZlbnQpIHtcbiAgICBkcmFnZ2luZ0lkID0gY2FyZC5pZDtcbiAgICBlLmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGNhcmQuaWQpO1xuICAgIGUuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICB9XG5cbiAgZnVuY3Rpb24gb25EcmFnRW5kKCkge1xuICAgIGRyYWdnaW5nSWQgPSBudWxsO1xuICAgIGRyYWdPdmVyQ29sID0gbnVsbDtcbiAgICBkcmFnQ291bnRlcnMuY2xlYXIoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ0VudGVyKGNvbElkOiBUYXNrU3RhdHVzLCBlOiBEcmFnRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbiA9IChkcmFnQ291bnRlcnMuZ2V0KGNvbElkKSA/PyAwKSArIDE7XG4gICAgZHJhZ0NvdW50ZXJzLnNldChjb2xJZCwgbik7XG4gICAgZHJhZ092ZXJDb2wgPSBjb2xJZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ092ZXIoY29sSWQ6IFRhc2tTdGF0dXMsIGU6IERyYWdFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2ZlciEuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ0xlYXZlKGNvbElkOiBUYXNrU3RhdHVzKSB7XG4gICAgY29uc3QgbiA9IE1hdGgubWF4KDAsIChkcmFnQ291bnRlcnMuZ2V0KGNvbElkKSA/PyAxKSAtIDEpO1xuICAgIGRyYWdDb3VudGVycy5zZXQoY29sSWQsIG4pO1xuICAgIGlmIChuID09PSAwICYmIGRyYWdPdmVyQ29sID09PSBjb2xJZCkgZHJhZ092ZXJDb2wgPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Ecm9wKGNvbElkOiBUYXNrU3RhdHVzLCBlOiBEcmFnRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGRyYWdnaW5nSWQpIHtcbiAgICAgIC8vIE5ldyBvYmplY3QgcmVmZXJlbmNlIOKGkiBTdmVsdGUgZGV0ZWN0cyB0aGUgY2hhbmdlIGFuZCByZS1yZW5kZXJzIGltbWVkaWF0ZWx5XG4gICAgICBzdGF0dXNPdmVycmlkZXMgPSB7IC4uLnN0YXR1c092ZXJyaWRlcywgW2RyYWdnaW5nSWRdOiBjb2xJZCB9O1xuICAgICAgLy8gUGVyc2lzdCB0byBkaXNrIGFzeW5jaHJvbm91c2x5XG4gICAgICBvblN0YXR1c0NoYW5nZShkcmFnZ2luZ0lkLCBjb2xJZCk7XG4gICAgfVxuICAgIGRyYWdnaW5nSWQgPSBudWxsO1xuICAgIGRyYWdPdmVyQ29sID0gbnVsbDtcbiAgICBkcmFnQ291bnRlcnMuc2V0KGNvbElkLCAwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgOKUgCBQcmlvcml0eSBiYWRnZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgY29uc3QgcHJpb3JpdHlDb2xvcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgbG93OiAnIzZiYjZmZicsIG1lZGl1bTogJyNmZmNkNWUnLCBoaWdoOiAnI2ZmOGM0MicsIGNyaXRpY2FsOiAnI2U4NDA0MCcsXG4gIH07XG4gIGNvbnN0IHByaW9yaXR5TGFiZWwgPSAocDogc3RyaW5nKSA9PiBwLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcC5zbGljZSgxKTtcbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwia2FuYmFuLWJvYXJkXCI+XG4gIHsjZWFjaCBjb2x1bW5zIGFzIGNvbH1cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgLS0+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJrYW5iYW4tY29sdW1uXCJcbiAgICAgIGNsYXNzOmRyYWctb3Zlcj17ZHJhZ092ZXJDb2wgPT09IGNvbC5pZH1cbiAgICAgIG9uOmRyYWdlbnRlcj17KGUpID0+IG9uRHJhZ0VudGVyKGNvbC5pZCwgZSl9XG4gICAgICBvbjpkcmFnb3Zlcj17KGUpID0+IG9uRHJhZ092ZXIoY29sLmlkLCBlKX1cbiAgICAgIG9uOmRyYWdsZWF2ZT17KCkgPT4gb25EcmFnTGVhdmUoY29sLmlkKX1cbiAgICAgIG9uOmRyb3A9eyhlKSA9PiBvbkRyb3AoY29sLmlkLCBlKX1cbiAgICAgIHJvbGU9XCJsaXN0XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwia2FuYmFuLWNvbC1oZWFkZXJcIiBzdHlsZT1cImJvcmRlci10b3A6IDNweCBzb2xpZCB7Y29sLmNvbG9yfVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC10aXRsZVwiPntjb2wubGFiZWx9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC1jb3VudFwiPntjb2xDYXJkc1tjb2wuaWRdLmxlbmd0aH08L3NwYW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImthbmJhbi1jYXJkc1wiPlxuICAgICAgICB7I2VhY2ggY29sQ2FyZHNbY29sLmlkXSBhcyBjYXJkIChjYXJkLmlkKX1cbiAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgLS0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJrYW5iYW4tY2FyZFwiXG4gICAgICAgICAgICBjbGFzczpkcmFnZ2luZz17ZHJhZ2dpbmdJZCA9PT0gY2FyZC5pZH1cbiAgICAgICAgICAgIGNsYXNzOmlzLXN1YnRhc2s9e2NhcmQuaXNTdWJ0YXNrfVxuICAgICAgICAgICAgZHJhZ2dhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICBzdHlsZT1cImJvcmRlci1sZWZ0LWNvbG9yOiB7Y2FyZC5hY2NlbnRDb2xvcn1cIlxuICAgICAgICAgICAgb246ZHJhZ3N0YXJ0PXsoZSkgPT4gb25EcmFnU3RhcnQoY2FyZCwgZSl9XG4gICAgICAgICAgICBvbjpkcmFnZW5kPXtvbkRyYWdFbmR9XG4gICAgICAgICAgICByb2xlPVwibGlzdGl0ZW1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDwhLS0gU3VidGFzayBicmVhZGNydW1iIC0tPlxuICAgICAgICAgICAgeyNpZiBjYXJkLmlzU3VidGFza31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtcGFyZW50LWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXJlbnQtZG90XCIgc3R5bGU9XCJiYWNrZ3JvdW5kOntjYXJkLmFjY2VudENvbG9yfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7Y2FyZC5wYXJlbnRUaXRsZX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7L2lmfVxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXktY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAtLT5cbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQtdGl0bGVcIlxuICAgICAgICAgICAgICAgIG9uOmNsaWNrPXsoKSA9PiBvbk9wZW5UYXNrKGNhcmQuZmlsZVBhdGgpfVxuICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgb246a2V5ZG93bj17KGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIG9uT3BlblRhc2soY2FyZC5maWxlUGF0aCl9XG4gICAgICAgICAgICAgID57Y2FyZC50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpb3JpdHktYmFkZ2VcIiBzdHlsZT1cImJhY2tncm91bmQ6e3ByaW9yaXR5Q29sb3JzW2NhcmQucHJpb3JpdHldID8/ICcjODg4J31cIj5cbiAgICAgICAgICAgICAgICB7cHJpb3JpdHlMYWJlbChjYXJkLnByaW9yaXR5KX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsjaWYgY2FyZC50YWdzLmxlbmd0aCA+IDB9XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRhZ3NcIj5cbiAgICAgICAgICAgICAgICB7I2VhY2ggY2FyZC50YWdzIGFzIHRhZ31cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFnXCI+I3t0YWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7L2lmfVxuXG4gICAgICAgICAgICB7I2lmIGNhcmQuc3VidGFza0NvdW50ID4gMH1cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtc3VidGFza3NcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN1YnRhc2stY291bnRcIj57Y2FyZC5zdWJ0YXNrRG9uZX0ve2NhcmQuc3VidGFza0NvdW50fSBzdWJ0YXNrczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VidGFzay1wcm9ncmVzc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1YnRhc2stZmlsbFwiIHN0eWxlPVwid2lkdGg6eyhjYXJkLnN1YnRhc2tEb25lL2NhcmQuc3VidGFza0NvdW50KSoxMDB9JVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvaWZ9XG5cbiAgICAgICAgICAgIHsjaWYgY2FyZC5lbmREYXRlfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1kYXRlc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPu+/vSBEdWU6IHtjYXJkLmVuZERhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsvaWZ9XG5cbiAgICAgICAgICAgIDwhLS0gQ2FyZCBmb290ZXI6ICsgU3VidGFzayAocGFyZW50IG9ubHkpICsgQXJjaGl2ZSAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICB7I2lmICFjYXJkLmlzU3VidGFza31cbiAgICAgICAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuLWFkZC1zdWJ0YXNrXCJcbiAgICAgICAgICAgICAgICAgIG9uOmNsaWNrfHN0b3BQcm9wYWdhdGlvbj17KCkgPT4gb25BZGRTdWJ0YXNrKGNhcmQuaWQsIGNhcmQudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJBZGQgc3VidGFza1wiXG4gICAgICAgICAgICAgICAgPisgU3VidGFzazwvYnV0dG9uPlxuICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4tYXJjaGl2ZVwiXG4gICAgICAgICAgICAgICAgb246Y2xpY2t8c3RvcFByb3BhZ2F0aW9uPXsoKSA9PiBvbkFyY2hpdmVUYXNrKGNhcmQuaWQsIGNhcmQuZmlsZVBhdGgsIGNhcmQuaXNTdWJ0YXNrKX1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIkFyY2hpdmUgdGFza1wiXG4gICAgICAgICAgICAgID7wn5OmPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgey9lYWNofVxuXG4gICAgICAgIHsjaWYgY29sQ2FyZHNbY29sLmlkXS5sZW5ndGggPT09IDB9XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImthbmJhbi1lbXB0eVwiPkRyb3AgdGFza3MgaGVyZTwvZGl2PlxuICAgICAgICB7L2lmfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIHsvZWFjaH1cbjwvZGl2PlxuXG48c3R5bGU+XG4gIC5rYW5iYW4tYm9hcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxMnB4O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIC5rYW5iYW4tY29sdW1uIHtcbiAgICBmbGV4OiAwIDAgMjcwcHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDEwMHB4KTtcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMTVzO1xuICB9XG5cbiAgLmthbmJhbi1jb2x1bW4uZHJhZy1vdmVyIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgfVxuXG4gIC5rYW5iYW4tY29sLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxMHB4IDE0cHggOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMCAwO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgLmNvbC10aXRsZSB7IGZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogMC45ZW07IH1cblxuICAuY29sLWNvdW50IHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBwYWRkaW5nOiAxcHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuXG4gIC5rYW5iYW4tY2FyZHMge1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogOHB4O1xuICB9XG5cbiAgLmthbmJhbi1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuICAgIC8qIExlZnQgYWNjZW50IGJvcmRlciBjb21lcyBmcm9tIGlubGluZSBib3JkZXItbGVmdC1jb2xvcjsgd2lkdGgvc3R5bGUgc2V0IGhlcmUgKi9cbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA0cHg7XG4gICAgYm9yZGVyLWxlZnQtc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gICAgY3Vyc29yOiBncmFiO1xuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xNXMsIG9wYWNpdHkgMC4xNXM7XG4gIH1cblxuICAua2FuYmFuLWNhcmQ6aG92ZXIgeyBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjE1KTsgfVxuICAua2FuYmFuLWNhcmQuZHJhZ2dpbmcgeyBvcGFjaXR5OiAwLjM1OyBjdXJzb3I6IGdyYWJiaW5nOyB9XG5cbiAgLmthbmJhbi1jYXJkLmlzLXN1YnRhc2sge1xuICAgIGJhY2tncm91bmQ6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpIDg1JSwgdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpIDE1JSk7XG4gIH1cblxuICAuY2FyZC1wYXJlbnQtbGFiZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDVweDtcbiAgICBmb250LXNpemU6IDAuNzNlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgfVxuXG4gIC5wYXJlbnQtZG90IHtcbiAgICB3aWR0aDogNnB4O1xuICAgIGhlaWdodDogNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gIC5jYXJkLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiA2cHg7XG4gIH1cblxuICAuY2FyZC10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDAuOWVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1hY2NlbnQpO1xuICAgIGZsZXg6IDE7XG4gICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgfVxuICAuY2FyZC10aXRsZTpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG5cbiAgLnByaW9yaXR5LWJhZGdlIHtcbiAgICBmb250LXNpemU6IDAuN2VtO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgcGFkZGluZzogMnB4IDZweDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgY29sb3I6ICMwMDA7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gIC5jYXJkLXRhZ3Mge1xuICAgIG1hcmdpbi10b3A6IDZweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBnYXA6IDRweDtcbiAgfVxuXG4gIC50YWcge1xuICAgIGZvbnQtc2l6ZTogMC43NWVtO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgcGFkZGluZzogMXB4IDVweDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gIH1cblxuICAuY2FyZC1zdWJ0YXNrcyB7IG1hcmdpbi10b3A6IDhweDsgfVxuICAuc3VidGFzay1jb3VudCB7IGZvbnQtc2l6ZTogMC43NWVtOyBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7IH1cblxuICAuc3VidGFzay1wcm9ncmVzcyB7XG4gICAgaGVpZ2h0OiA0cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBtYXJnaW4tdG9wOiAzcHg7XG4gIH1cblxuICAuc3VidGFzay1maWxsIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItZ3JlZW4pO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzO1xuICB9XG5cbiAgLmNhcmQtZGF0ZXMge1xuICAgIG1hcmdpbi10b3A6IDZweDtcbiAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDZweDtcbiAgfVxuXG4gIC5jYXJkLWZvb3RlciB7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICB9XG5cbiAgLmJ0bi1hZGQtc3VidGFzayB7XG4gICAgZm9udC1zaXplOiAwLjcyZW07XG4gICAgcGFkZGluZzogMnB4IDhweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjFzLCBjb2xvciAwLjFzO1xuICB9XG4gIC5idG4tYWRkLXN1YnRhc2s6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWludGVyYWN0aXZlLWFjY2VudCk7XG4gICAgY29sb3I6IHZhcigtLXRleHQtb24tYWNjZW50KTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWludGVyYWN0aXZlLWFjY2VudCk7XG4gIH1cblxuICAuYnRuLWFyY2hpdmUge1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgcGFkZGluZzogMnB4IDZweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzLCBiYWNrZ3JvdW5kIDAuMXM7XG4gIH1cbiAgLmthbmJhbi1jYXJkOmhvdmVyIC5idG4tYXJjaGl2ZSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAuYnRuLWFyY2hpdmU6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItZXJyb3IpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW9uLWFjY2VudCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWVycm9yKTtcbiAgfVxuXG4gIC5rYW5iYW4tZW1wdHkge1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LWZhaW50KTtcbiAgICBmb250LXNpemU6IDAuODVlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMjRweCA4cHg7XG4gICAgYm9yZGVyOiAxcHggZGFzaGVkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIH1cbjwvc3R5bGU+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IFRhc2ssIFN1YnRhc2sgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuXHRleHBvcnQgbGV0IHRhc2tzOiBUYXNrW10gPSBbXTtcblx0ZXhwb3J0IGxldCBvbk9wZW5UYXNrOiAoZmlsZVBhdGg6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHt9O1xuXHRleHBvcnQgbGV0IG9uRGF0ZUNoYW5nZTogKFxuXHRcdHRhc2tJZDogc3RyaW5nLFxuXHRcdHN0YXJ0RGF0ZTogc3RyaW5nLFxuXHRcdGVuZERhdGU6IHN0cmluZyxcblx0KSA9PiB2b2lkID0gKCkgPT4ge307XG5cdGV4cG9ydCBsZXQgb25BZGRTdWJ0YXNrOiAoXG5cdFx0cGFyZW50SWQ6IHN0cmluZyxcblx0XHRwYXJlbnRUaXRsZTogc3RyaW5nLFxuXHQpID0+IHZvaWQgPSAoKSA9PiB7fTtcblx0ZXhwb3J0IGxldCBvbkFyY2hpdmVUYXNrOiAoXG5cdFx0dGFza0lkOiBzdHJpbmcsXG5cdFx0ZmlsZVBhdGg6IHN0cmluZyxcblx0XHRpc1N1YnRhc2s6IGJvb2xlYW4sXG5cdCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG5cdC8vIOKUgOKUgOKUgCBUaW1lbGluZSBjb25maWd1cmF0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXHRjb25zdCBEQVlfV0lEVEggPSAzMjsgLy8gcHggcGVyIGRheVxuXHRjb25zdCBST1dfSEVJR0hUID0gNDA7IC8vIHB4IHBlciByb3dcblxuXHQvLyBDb21wdXRlIHRoZSBkYXRlIHJhbmdlIHRvIGRpc3BsYXk6IGZyb20gZWFybGllc3QgdGFzayBzdGFydCAob3IgdG9kYXktNykgdG8gbGF0ZXN0IGVuZCAob3IgdG9kYXkrNjApXG5cdCQ6IGRhdGVSYW5nZSA9IGNvbXB1dGVEYXRlUmFuZ2UodGFza3MpO1xuXG5cdGZ1bmN0aW9uIGNvbXB1dGVEYXRlUmFuZ2UodGFza3M6IFRhc2tbXSk6IHsgc3RhcnQ6IERhdGU7IGRheXM6IG51bWJlciB9IHtcblx0XHRsZXQgZWFybGllc3Q6IERhdGUgfCBudWxsID0gbnVsbDtcblx0XHRsZXQgbGF0ZXN0OiBEYXRlIHwgbnVsbCA9IG51bGw7XG5cblx0XHRjb25zdCBjb2xsZWN0ID0gKHQ6IFRhc2sgfCBTdWJ0YXNrKSA9PiB7XG5cdFx0XHRpZiAodC5zdGFydERhdGUpIHtcblx0XHRcdFx0Y29uc3QgZCA9IHBhcnNlRGF0ZSh0LnN0YXJ0RGF0ZSk7XG5cdFx0XHRcdGlmIChkICYmICghZWFybGllc3QgfHwgZCA8IGVhcmxpZXN0KSkgZWFybGllc3QgPSBkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCh0IGFzIFRhc2spLmVuZERhdGUpIHtcblx0XHRcdFx0Y29uc3QgZCA9IHBhcnNlRGF0ZSgodCBhcyBUYXNrKS5lbmREYXRlISk7XG5cdFx0XHRcdGlmIChkICYmICghbGF0ZXN0IHx8IGQgPiBsYXRlc3QpKSBsYXRlc3QgPSBkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0YXNrcy5mb3JFYWNoKCh0KSA9PiB7XG5cdFx0XHRjb2xsZWN0KHQpO1xuXHRcdFx0dC5zdWJ0YXNrcz8uZm9yRWFjaChjb2xsZWN0KTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblx0XHR0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuXHRcdGlmICghZWFybGllc3QpIHtcblx0XHRcdGVhcmxpZXN0ID0gbmV3IERhdGUodG9kYXkpO1xuXHRcdFx0ZWFybGllc3Quc2V0RGF0ZShlYXJsaWVzdC5nZXREYXRlKCkgLSA3KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZSA9IG5ldyBEYXRlKGVhcmxpZXN0KTtcblx0XHRcdGUuc2V0RGF0ZShlLmdldERhdGUoKSAtIDUpO1xuXHRcdFx0ZWFybGllc3QgPSBlO1xuXHRcdH1cblxuXHRcdGlmICghbGF0ZXN0KSB7XG5cdFx0XHRsYXRlc3QgPSBuZXcgRGF0ZSh0b2RheSk7XG5cdFx0XHRsYXRlc3Quc2V0RGF0ZShsYXRlc3QuZ2V0RGF0ZSgpICsgNjApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gbmV3IERhdGUobGF0ZXN0KTtcblx0XHRcdGwuc2V0RGF0ZShsLmdldERhdGUoKSArIDEwKTtcblx0XHRcdGxhdGVzdCA9IGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGF5cyA9XG5cdFx0XHRNYXRoLmNlaWwoKGxhdGVzdC5nZXRUaW1lKCkgLSBlYXJsaWVzdC5nZXRUaW1lKCkpIC8gODY0MDAwMDApICsgMTtcblx0XHRyZXR1cm4geyBzdGFydDogZWFybGllc3QsIGRheXMgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlRGF0ZShzOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogRGF0ZSB8IG51bGwge1xuXHRcdGlmICghcyB8fCB0eXBlb2YgcyAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG5cdFx0Y29uc3QgcGFydHMgPSBzLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcblx0XHRpZiAocGFydHMubGVuZ3RoICE9PSAzIHx8IHBhcnRzLnNvbWUoaXNOYU4pKSByZXR1cm4gbnVsbDtcblx0XHRjb25zdCBbeSwgbSwgZF0gPSBwYXJ0cztcblx0XHRyZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9JU09EYXRlKGQ6IERhdGUpOiBzdHJpbmcge1xuXHRcdGlmICghZCB8fCBpc05hTihkLmdldFRpbWUoKSkpIHJldHVybiBcIlwiO1xuXHRcdHJldHVybiBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGF5SW5kZXgoZGF0ZVN0cjogc3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG5cdFx0aWYgKCFkYXRlU3RyKSByZXR1cm4gLTE7XG5cdFx0Y29uc3QgZCA9IHBhcnNlRGF0ZShkYXRlU3RyKTtcblx0XHRpZiAoIWQpIHJldHVybiAtMTtcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigoZC5nZXRUaW1lKCkgLSBkYXRlUmFuZ2Uuc3RhcnQuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKTtcblx0fVxuXG5cdC8vIOKUgOKUgOKUgCBIZWFkZXI6IG1vbnRocyArIGRheXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cdCQ6IGhlYWRlck1vbnRocyA9IGJ1aWxkTW9udGhIZWFkZXJzKGRhdGVSYW5nZSk7XG5cblx0dHlwZSBNb250aEhlYWRlciA9IHsgbGFiZWw6IHN0cmluZzsgc3BhbjogbnVtYmVyIH07XG5cdGZ1bmN0aW9uIGJ1aWxkTW9udGhIZWFkZXJzKHtcblx0XHRzdGFydCxcblx0XHRkYXlzLFxuXHR9OiB7XG5cdFx0c3RhcnQ6IERhdGU7XG5cdFx0ZGF5czogbnVtYmVyO1xuXHR9KTogTW9udGhIZWFkZXJbXSB7XG5cdFx0Y29uc3QgbW9udGhzOiBNb250aEhlYWRlcltdID0gW107XG5cdFx0bGV0IGN1ciA9IG5ldyBEYXRlKHN0YXJ0KTtcblx0XHRjdXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cblx0XHRsZXQgcmVtYWluaW5nID0gZGF5cztcblx0XHR3aGlsZSAocmVtYWluaW5nID4gMCkge1xuXHRcdFx0Y29uc3QgeWVhciA9IGN1ci5nZXRGdWxsWWVhcigpO1xuXHRcdFx0Y29uc3QgbW9udGggPSBjdXIuZ2V0TW9udGgoKTtcblx0XHRcdGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXlPZk1vbnRoID0gY3VyLmdldERhdGUoKTtcblx0XHRcdGNvbnN0IHNwYW4gPSBNYXRoLm1pbihkYXlzSW5Nb250aCAtIGRheU9mTW9udGggKyAxLCByZW1haW5pbmcpO1xuXHRcdFx0bW9udGhzLnB1c2goe1xuXHRcdFx0XHRsYWJlbDogY3VyLnRvTG9jYWxlU3RyaW5nKFwiZGVmYXVsdFwiLCB7XG5cdFx0XHRcdFx0bW9udGg6IFwibG9uZ1wiLFxuXHRcdFx0XHRcdHllYXI6IFwibnVtZXJpY1wiLFxuXHRcdFx0XHR9KSxcblx0XHRcdFx0c3Bhbixcblx0XHRcdH0pO1xuXHRcdFx0Y3VyID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheU9mTW9udGggKyBzcGFuKTtcblx0XHRcdHJlbWFpbmluZyAtPSBzcGFuO1xuXHRcdH1cblx0XHRyZXR1cm4gbW9udGhzO1xuXHR9XG5cblx0JDogZGF5SGVhZGVycyA9IGJ1aWxkRGF5SGVhZGVycyhkYXRlUmFuZ2UpO1xuXG5cdHR5cGUgRGF5SGVhZGVyID0ge1xuXHRcdGRheTogbnVtYmVyO1xuXHRcdGRhdGU6IERhdGU7XG5cdFx0aXNXZWVrZW5kOiBib29sZWFuO1xuXHRcdGlzVG9kYXk6IGJvb2xlYW47XG5cdH07XG5cdGZ1bmN0aW9uIGJ1aWxkRGF5SGVhZGVycyh7XG5cdFx0c3RhcnQsXG5cdFx0ZGF5cyxcblx0fToge1xuXHRcdHN0YXJ0OiBEYXRlO1xuXHRcdGRheXM6IG51bWJlcjtcblx0fSk6IERheUhlYWRlcltdIHtcblx0XHRjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cdFx0dG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGRheXMgfSwgKF8sIGkpID0+IHtcblx0XHRcdGNvbnN0IGQgPSBuZXcgRGF0ZShzdGFydCk7XG5cdFx0XHRkLnNldERhdGUoZC5nZXREYXRlKCkgKyBpKTtcblx0XHRcdGNvbnN0IGRvdyA9IGQuZ2V0RGF5KCk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRkYXk6IGQuZ2V0RGF0ZSgpLFxuXHRcdFx0XHRkYXRlOiBkLFxuXHRcdFx0XHRpc1dlZWtlbmQ6IGRvdyA9PT0gMCB8fCBkb3cgPT09IDYsXG5cdFx0XHRcdGlzVG9kYXk6IGQuZ2V0VGltZSgpID09PSB0b2RheS5nZXRUaW1lKCksXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8g4pSA4pSA4pSAIEZsYXQgcm93IGxpc3QgKHRhc2tzICsgc3VidGFza3MgaW50ZXJsZWF2ZWQpIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXHQvLyBTYW1lIHBhbGV0dGUgYXMgS2FuYmFuQm9hcmQgZm9yIGNvbnNpc3RlbnQgcGVyLXRhc2sgY29sb3JzXG5cdGNvbnN0IFBBTEVUVEUgPSBbXG5cdFx0XCIjN2M2YWY3XCIsXG5cdFx0XCIjZjc5MjZhXCIsXG5cdFx0XCIjNmJiZmY3XCIsXG5cdFx0XCIjZjdjODZhXCIsXG5cdFx0XCIjNmFmNzllXCIsXG5cdFx0XCIjZjc2YTllXCIsXG5cdFx0XCIjNmFmN2YwXCIsXG5cdFx0XCIjYzg2YWY3XCIsXG5cdFx0XCIjZjdmMDZhXCIsXG5cdFx0XCIjNmE5ZWY3XCIsXG5cdF07XG5cblx0dHlwZSBHYW50dFJvdyA9IHtcblx0XHRpZDogc3RyaW5nO1xuXHRcdHRpdGxlOiBzdHJpbmc7XG5cdFx0ZmlsZVBhdGg6IHN0cmluZztcblx0XHRzdGFydERhdGU6IHN0cmluZyB8IG51bGw7XG5cdFx0ZW5kRGF0ZTogc3RyaW5nIHwgbnVsbDtcblx0XHRpc1N1YnRhc2s6IGJvb2xlYW47XG5cdFx0ZGVwdGg6IG51bWJlcjtcblx0XHRzdGF0dXM6IHN0cmluZztcblx0XHRiYXJDb2xvcjogc3RyaW5nOyAvLyBwYXJlbnQgY29sb3IgZm9yIHN1YnRhc2tzOyBvd24gcGFsZXR0ZSBjb2xvciBmb3IgdGFza3Ncblx0XHRwYXJlbnRUaXRsZTogc3RyaW5nO1xuXHR9O1xuXG5cdCQ6IHJvd3MgPSBidWlsZFJvd3ModGFza3MsIGV4cGFuZGVkKTtcblxuXHQvLyBXaGVuIHRhc2tzIHByb3AgcmVmcmVzaGVzIGZyb20gZGlzaywgY2xlYXIgYW55IHN0YWxlIGJhciBvdmVycmlkZXNcblx0Ly8gKHRoZSB1cGRhdGVkIHN0YXJ0RGF0ZS9lbmREYXRlIGZyb20gdGhlIHByb3AgaXMgbm93IGF1dGhvcml0YXRpdmUpXG5cdCQ6IHtcblx0XHR0YXNrcztcblx0XHRiYXJPdmVycmlkZXMgPSBuZXcgTWFwKCk7XG5cdH1cblxuXHRsZXQgZXhwYW5kZWQ6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG5cdGZ1bmN0aW9uIHRvZ2dsZUV4cGFuZChpZDogc3RyaW5nKSB7XG5cdFx0aWYgKGV4cGFuZGVkLmhhcyhpZCkpIHtcblx0XHRcdGV4cGFuZGVkLmRlbGV0ZShpZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGV4cGFuZGVkLmFkZChpZCk7XG5cdFx0fVxuXHRcdGV4cGFuZGVkID0gbmV3IFNldChleHBhbmRlZCk7IC8vIG5ldyByZWZlcmVuY2Ug4oCUIGZvcmNlcyAkOiByb3dzIHRvIHJlLXJ1blxuXHR9XG5cblx0ZnVuY3Rpb24gYnVpbGRSb3dzKHRhc2tzOiBUYXNrW10sIGV4cGFuZGVkOiBTZXQ8c3RyaW5nPik6IEdhbnR0Um93W10ge1xuXHRcdGNvbnN0IHJlc3VsdDogR2FudHRSb3dbXSA9IFtdO1xuXHRcdHRhc2tzLmZvckVhY2goKHQsIHRhc2tJZHgpID0+IHtcblx0XHRcdGNvbnN0IHRhc2tDb2xvciA9IFBBTEVUVEVbdGFza0lkeCAlIFBBTEVUVEUubGVuZ3RoXTtcblx0XHRcdHJlc3VsdC5wdXNoKHtcblx0XHRcdFx0aWQ6IHQuaWQsXG5cdFx0XHRcdHRpdGxlOiB0LnRpdGxlLFxuXHRcdFx0XHRmaWxlUGF0aDogdC5maWxlUGF0aCxcblx0XHRcdFx0c3RhcnREYXRlOiB0LnN0YXJ0RGF0ZSxcblx0XHRcdFx0ZW5kRGF0ZTogdC5lbmREYXRlLFxuXHRcdFx0XHRpc1N1YnRhc2s6IGZhbHNlLFxuXHRcdFx0XHRkZXB0aDogMCxcblx0XHRcdFx0c3RhdHVzOiB0LnN0YXR1cyxcblx0XHRcdFx0YmFyQ29sb3I6IHRhc2tDb2xvcixcblx0XHRcdFx0cGFyZW50VGl0bGU6IFwiXCIsXG5cdFx0XHR9KTtcblx0XHRcdGlmICh0LnN1YnRhc2tzLmxlbmd0aCA+IDAgJiYgZXhwYW5kZWQuaGFzKHQuaWQpKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgcyBvZiB0LnN1YnRhc2tzKSB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goe1xuXHRcdFx0XHRcdFx0aWQ6IHMuaWQsXG5cdFx0XHRcdFx0XHR0aXRsZTogcy50aXRsZSxcblx0XHRcdFx0XHRcdGZpbGVQYXRoOiBzLmZpbGVQYXRoLFxuXHRcdFx0XHRcdFx0c3RhcnREYXRlOiBzLnN0YXJ0RGF0ZSA/PyBudWxsLFxuXHRcdFx0XHRcdFx0ZW5kRGF0ZTogcy5lbmREYXRlID8/IG51bGwsXG5cdFx0XHRcdFx0XHRpc1N1YnRhc2s6IHRydWUsXG5cdFx0XHRcdFx0XHRkZXB0aDogMSxcblx0XHRcdFx0XHRcdHN0YXR1czogcy5zdGF0dXMsXG5cdFx0XHRcdFx0XHRiYXJDb2xvcjogdGFza0NvbG9yLCAvLyDihpAgc2FtZSBjb2xvciBhcyBwYXJlbnRcblx0XHRcdFx0XHRcdHBhcmVudFRpdGxlOiB0LnRpdGxlLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8vIOKUgOKUgOKUgCBEcmFnZ2luZyBHYW50dCBiYXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXHR0eXBlIERyYWdTdGF0ZSA9IHtcblx0XHRyb3dJZDogc3RyaW5nO1xuXHRcdHR5cGU6IFwibW92ZVwiIHwgXCJyZXNpemUtc3RhcnRcIiB8IFwicmVzaXplLWVuZFwiO1xuXHRcdHN0YXJ0WDogbnVtYmVyO1xuXHRcdG9yaWdTdGFydERheTogbnVtYmVyO1xuXHRcdG9yaWdFbmREYXk6IG51bWJlcjtcblx0fSB8IG51bGw7XG5cblx0bGV0IGRyYWdTdGF0ZTogRHJhZ1N0YXRlID0gbnVsbDtcblx0bGV0IGJhck92ZXJyaWRlczogTWFwPHN0cmluZywgeyBzdGFydERheTogbnVtYmVyOyBlbmREYXk6IG51bWJlciB9PiA9XG5cdFx0bmV3IE1hcCgpO1xuXG5cdGZ1bmN0aW9uIGdldEJhcihyb3c6IEdhbnR0Um93KTogeyBzdGFydERheTogbnVtYmVyOyBlbmREYXk6IG51bWJlciB9IHwgbnVsbCB7XG5cdFx0Y29uc3Qgb3ZlcnJpZGUgPSBiYXJPdmVycmlkZXMuZ2V0KHJvdy5pZCk7XG5cdFx0aWYgKG92ZXJyaWRlKSByZXR1cm4gb3ZlcnJpZGU7XG5cdFx0Y29uc3QgcyA9IGRheUluZGV4KHJvdy5zdGFydERhdGUpO1xuXHRcdGNvbnN0IGUgPSBkYXlJbmRleChyb3cuZW5kRGF0ZSk7XG5cdFx0aWYgKHMgPCAwIHx8IGUgPCAwIHx8IGUgPCBzKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4geyBzdGFydERheTogcywgZW5kRGF5OiBlIH07XG5cdH1cblxuXHRmdW5jdGlvbiBvbkJhck1vdXNlRG93bihcblx0XHRyb3c6IEdhbnR0Um93LFxuXHRcdHR5cGU6IFwibW92ZVwiIHwgXCJyZXNpemUtc3RhcnRcIiB8IFwicmVzaXplLWVuZFwiLFxuXHRcdGU6IE1vdXNlRXZlbnQsXG5cdCkge1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0Y29uc3QgYmFyID0gZ2V0QmFyKHJvdyk7XG5cdFx0aWYgKCFiYXIpIHJldHVybjtcblx0XHRkcmFnU3RhdGUgPSB7XG5cdFx0XHRyb3dJZDogcm93LmlkLFxuXHRcdFx0dHlwZSxcblx0XHRcdHN0YXJ0WDogZS5jbGllbnRYLFxuXHRcdFx0b3JpZ1N0YXJ0RGF5OiBiYXIuc3RhcnREYXksXG5cdFx0XHRvcmlnRW5kRGF5OiBiYXIuZW5kRGF5LFxuXHRcdH07XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvbk1vdXNlVXApO1xuXHR9XG5cblx0ZnVuY3Rpb24gb25Nb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuXHRcdGlmICghZHJhZ1N0YXRlKSByZXR1cm47XG5cdFx0Y29uc3QgZHggPSBlLmNsaWVudFggLSBkcmFnU3RhdGUuc3RhcnRYO1xuXHRcdGNvbnN0IGRheURlbHRhID0gTWF0aC5yb3VuZChkeCAvIERBWV9XSURUSCk7XG5cblx0XHRsZXQgbmV3U3RhcnQgPSBkcmFnU3RhdGUub3JpZ1N0YXJ0RGF5O1xuXHRcdGxldCBuZXdFbmQgPSBkcmFnU3RhdGUub3JpZ0VuZERheTtcblxuXHRcdGlmIChkcmFnU3RhdGUudHlwZSA9PT0gXCJtb3ZlXCIpIHtcblx0XHRcdG5ld1N0YXJ0ID0gTWF0aC5tYXgoMCwgZHJhZ1N0YXRlLm9yaWdTdGFydERheSArIGRheURlbHRhKTtcblx0XHRcdG5ld0VuZCA9IG5ld1N0YXJ0ICsgKGRyYWdTdGF0ZS5vcmlnRW5kRGF5IC0gZHJhZ1N0YXRlLm9yaWdTdGFydERheSk7XG5cdFx0fSBlbHNlIGlmIChkcmFnU3RhdGUudHlwZSA9PT0gXCJyZXNpemUtc3RhcnRcIikge1xuXHRcdFx0bmV3U3RhcnQgPSBNYXRoLm1heChcblx0XHRcdFx0MCxcblx0XHRcdFx0TWF0aC5taW4oZHJhZ1N0YXRlLm9yaWdTdGFydERheSArIGRheURlbHRhLCBkcmFnU3RhdGUub3JpZ0VuZERheSAtIDEpLFxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKGRyYWdTdGF0ZS50eXBlID09PSBcInJlc2l6ZS1lbmRcIikge1xuXHRcdFx0bmV3RW5kID0gTWF0aC5tYXgoXG5cdFx0XHRcdGRyYWdTdGF0ZS5vcmlnU3RhcnREYXkgKyAxLFxuXHRcdFx0XHRkcmFnU3RhdGUub3JpZ0VuZERheSArIGRheURlbHRhLFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRiYXJPdmVycmlkZXMuc2V0KGRyYWdTdGF0ZS5yb3dJZCwgeyBzdGFydERheTogbmV3U3RhcnQsIGVuZERheTogbmV3RW5kIH0pO1xuXHRcdGJhck92ZXJyaWRlcyA9IGJhck92ZXJyaWRlczsgLy8gdHJpZ2dlciByZWFjdGl2aXR5XG5cdH1cblxuXHRmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG5cdFx0aWYgKGRyYWdTdGF0ZSkge1xuXHRcdFx0Y29uc3Qgb3ZlcnJpZGUgPSBiYXJPdmVycmlkZXMuZ2V0KGRyYWdTdGF0ZS5yb3dJZCk7XG5cdFx0XHRpZiAob3ZlcnJpZGUpIHtcblx0XHRcdFx0Y29uc3QgbmV3U3RhcnQgPSBuZXcgRGF0ZShkYXRlUmFuZ2Uuc3RhcnQpO1xuXHRcdFx0XHRuZXdTdGFydC5zZXREYXRlKG5ld1N0YXJ0LmdldERhdGUoKSArIG92ZXJyaWRlLnN0YXJ0RGF5KTtcblx0XHRcdFx0Y29uc3QgbmV3RW5kID0gbmV3IERhdGUoZGF0ZVJhbmdlLnN0YXJ0KTtcblx0XHRcdFx0bmV3RW5kLnNldERhdGUobmV3RW5kLmdldERhdGUoKSArIG92ZXJyaWRlLmVuZERheSk7XG5cdFx0XHRcdG9uRGF0ZUNoYW5nZShkcmFnU3RhdGUucm93SWQsIHRvSVNPRGF0ZShuZXdTdGFydCksIHRvSVNPRGF0ZShuZXdFbmQpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZHJhZ1N0YXRlID0gbnVsbDtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCk7XG5cdH1cblxuXHQvLyDilIDilIDilIAgQ2xpY2sgb24gZW1wdHkgY2VsbCB0byBjcmVhdGUgYmFyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXHRmdW5jdGlvbiBvbkNlbGxDbGljayhyb3c6IEdhbnR0Um93LCBkYXlJZHg6IG51bWJlcikge1xuXHRcdGlmIChnZXRCYXIocm93KSkgcmV0dXJuOyAvLyBhbHJlYWR5IGhhcyBhIGJhclxuXHRcdGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZGF0ZVJhbmdlLnN0YXJ0KTtcblx0XHRzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSArIGRheUlkeCk7XG5cdFx0Y29uc3QgZW5kID0gbmV3IERhdGUoc3RhcnQpO1xuXHRcdGVuZC5zZXREYXRlKGVuZC5nZXREYXRlKCkgKyA0KTtcblx0XHRvbkRhdGVDaGFuZ2Uocm93LmlkLCB0b0lTT0RhdGUoc3RhcnQpLCB0b0lTT0RhdGUoZW5kKSk7XG5cdH1cblxuXHQvLyDilIDilIDilIAgVG9kYXkgbWFya2VyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXHQkOiB0b2RheUlkeCA9ICgoKSA9PiB7XG5cdFx0Y29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXHRcdHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0b2RheS5nZXRUaW1lKCkgLSBkYXRlUmFuZ2Uuc3RhcnQuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKTtcblx0fSkoKTtcblxuXHQvLyDilIDilIDilIAgU3RhdHVzIGNvbG9ycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblx0Y29uc3Qgc3RhdHVzQ29sb3JzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuXHRcdHRvZG86IFwiIzZiYjZmZlwiLFxuXHRcdFwiaW4tcHJvZ3Jlc3NcIjogXCIjZmZjZDVlXCIsXG5cdFx0YmxvY2tlZDogXCIjZTg0MDQwXCIsXG5cdFx0ZG9uZTogXCIjNGNhZjUwXCIsXG5cdH07XG5cblx0Ly8g4pSA4pSA4pSAIFNjcm9sbCBzeW5jOiByaWdodCBwYW5lbCBkcml2ZXMgbGVmdCByb3dzIHZlcnRpY2FsbHkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cdGxldCBsZWZ0Um93c0VsOiBIVE1MRWxlbWVudDtcblx0bGV0IHJpZ2h0UGFuZWxFbDogSFRNTEVsZW1lbnQ7XG5cblx0ZnVuY3Rpb24gc3luY1Njcm9sbCgpIHtcblx0XHRpZiAobGVmdFJvd3NFbCAmJiByaWdodFBhbmVsRWwpIHtcblx0XHRcdGxlZnRSb3dzRWwuc2Nyb2xsVG9wID0gcmlnaHRQYW5lbEVsLnNjcm9sbFRvcDtcblx0XHR9XG5cdH1cbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwiZ2FudHQtd3JhcHBlclwiPlxuXHQ8IS0tXG4gICAgTGF5b3V0OlxuICAgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgIOKUgiAgTEVGVCBIRUFERVIgICAg4pSCICBSSUdIVCBIRUFERVIgKHN0aWNreSwgc2Nyb2xscyBob3JpeikgICAg4pSCXG4gICAg4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAg4pSCICBMRUZUIFJPV1MgICAgICDilIIgIFJJR0hUIFJPV1MgKGdyaWQgY2VsbHMgKyBiYXJzKSAgICAgICAgICDilIJcbiAgICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICBUaGUgb3V0ZXIgd3JhcHBlciBpcyBkaXNwbGF5OmZsZXguIExlZnQgaXMgYSBmaXhlZC13aWR0aCBmbGV4IGNvbHVtbi5cbiAgICBSaWdodCBpcyBhIGZsZXgtMSBkaXYgd2l0aCBvdmVyZmxvdzphdXRvIHRoYXQgY29udGFpbnMgYSBzaW5nbGUgaW5uZXJcbiAgICBkaXYgd2lkZSBlbm91Z2ggZm9yIGFsbCBkYXlzLiAgVGhlIG1vbnRoK2RheSBoZWFkZXJzIGFyZSBzdGlja3kgaW5zaWRlXG4gICAgdGhhdCBzY3JvbGxpbmcgY29udGFpbmVyLlxuICAtLT5cblxuXHQ8IS0tIOKUgOKUgCBMRUZUIGNvbHVtbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG5cdDxkaXYgY2xhc3M9XCJnYW50dC1sZWZ0XCI+XG5cdFx0PCEtLSBCbGFuayBoZWFkZXIgc3BhY2VyIChoZWlnaHQgbXVzdCBtYXRjaCByaWdodCBoZWFkZXIpIC0tPlxuXHRcdDxkaXYgY2xhc3M9XCJsZWZ0LWhlYWRlci1zcGFjZXJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0LWRheS1zcGFjZXJcIj5UYXNrczwvZGl2PlxuXHRcdDwvZGl2PlxuXG5cdFx0PCEtLSBUYXNrIG5hbWUgcm93cyAobm8gaW5kZXBlbmRlbnQgc2Nyb2xsIOKAlCBzY3JvbGxzIHdpdGggdGhlIHJpZ2h0IHBhbmVsIHZpYSBKUyBzeW5jKSAtLT5cblx0XHQ8ZGl2IGNsYXNzPVwiZ2FudHQtbGVmdC1yb3dzXCIgYmluZDp0aGlzPXtsZWZ0Um93c0VsfT5cblx0XHRcdHsjZWFjaCByb3dzIGFzIHJvdyAocm93LmlkKX1cblx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdGNsYXNzPVwiZ2FudHQtbGVmdC1yb3dcIlxuXHRcdFx0XHRcdGNsYXNzOnN1YnRhc2stcm93PXtyb3cuaXNTdWJ0YXNrfVxuXHRcdFx0XHRcdHN0eWxlPVwiaGVpZ2h0OntST1dfSEVJR0hUfXB4OyBwYWRkaW5nLWxlZnQ6ezggK1xuXHRcdFx0XHRcdFx0cm93LmRlcHRoICogMTh9cHg7IGJvcmRlci1sZWZ0OiAzcHggc29saWQge3Jvdy5iYXJDb2xvcn07XCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdHsjaWYgIXJvdy5pc1N1YnRhc2t9XG5cdFx0XHRcdFx0XHR7QGNvbnN0IHRhc2sgPSB0YXNrcy5maW5kKCh0KSA9PiB0LmlkID09PSByb3cuaWQpfVxuXHRcdFx0XHRcdFx0eyNpZiB0YXNrICYmIHRhc2suc3VidGFza3MubGVuZ3RoID4gMH1cblx0XHRcdFx0XHRcdFx0PCEtLSBzdmVsdGUtaWdub3JlIGExMXktY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAtLT5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZXhwYW5kLWJ0blwiXG5cdFx0XHRcdFx0XHRcdFx0b246Y2xpY2s9eygpID0+IHRvZ2dsZUV4cGFuZChyb3cuaWQpfVxuXHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJUb2dnbGUgc3VidGFza3NcIlxuXHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0e2V4cGFuZGVkLmhhcyhyb3cuaWQpID8gXCLilr5cIiA6IFwi4pa4XCJ9XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0ezplbHNlfVxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImV4cGFuZC1wbGFjZWhvbGRlclwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0ezplbHNlfVxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJleHBhbmQtcGxhY2Vob2xkZXJcIj48L3NwYW4+XG5cdFx0XHRcdFx0ey9pZn1cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJnYW50dC10YXNrLWxhYmVsLXdyYXBcIj5cblx0XHRcdFx0XHRcdDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LWNsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgLS0+XG5cdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRjbGFzcz1cImdhbnR0LXRhc2stbGlua1wiXG5cdFx0XHRcdFx0XHRcdG9uOmNsaWNrPXsoKSA9PiBvbk9wZW5UYXNrKHJvdy5maWxlUGF0aCl9XG5cdFx0XHRcdFx0XHRcdG9uOmtleWRvd249eyhlKSA9PiBlLmtleSA9PT0gXCJFbnRlclwiICYmIG9uT3BlblRhc2socm93LmZpbGVQYXRoKX1cblx0XHRcdFx0XHRcdFx0cm9sZT1cImxpbmtcIlxuXHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIjBcIlxuXHRcdFx0XHRcdFx0XHR0aXRsZT17cm93LnRpdGxlfT57cm93LnRpdGxlfTwvc3BhblxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0eyNpZiByb3cuaXNTdWJ0YXNrICYmIHJvdy5wYXJlbnRUaXRsZX1cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJnYW50dC1wYXJlbnQtbGFiZWxcIj57cm93LnBhcmVudFRpdGxlfTwvc3Bhbj5cblx0XHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0Y2xhc3M9XCJzdGF0dXMtZG90XCJcblx0XHRcdFx0XHRcdHN0eWxlPVwiYmFja2dyb3VuZDp7c3RhdHVzQ29sb3JzW3Jvdy5zdGF0dXNdID8/ICcjODg4J31cIlxuXHRcdFx0XHRcdD48L3NwYW4+XG5cblx0XHRcdFx0XHR7I2lmICFyb3cuaXNTdWJ0YXNrfVxuXHRcdFx0XHRcdFx0PCEtLSBzdmVsdGUtaWdub3JlIGExMXktY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAtLT5cblx0XHRcdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJnYW50dC1hZGQtc3VidGFzay1idG5cIlxuXHRcdFx0XHRcdFx0XHRvbjpjbGlja3xzdG9wUHJvcGFnYXRpb249eygpID0+IG9uQWRkU3VidGFzayhyb3cuaWQsIHJvdy50aXRsZSl9XG5cdFx0XHRcdFx0XHRcdHRpdGxlPVwiQWRkIHN1YnRhc2tcIj4rPC9idXR0b25cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHRcdDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LWNsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgLS0+XG5cdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0Y2xhc3M9XCJnYW50dC1hcmNoaXZlLWJ0blwiXG5cdFx0XHRcdFx0XHRvbjpjbGlja3xzdG9wUHJvcGFnYXRpb249eygpID0+XG5cdFx0XHRcdFx0XHRcdG9uQXJjaGl2ZVRhc2socm93LmlkLCByb3cuZmlsZVBhdGgsIHJvdy5pc1N1YnRhc2spfVxuXHRcdFx0XHRcdFx0dGl0bGU9XCJBcmNoaXZlIHRhc2tcIj7wn5OmPC9idXR0b25cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0ey9lYWNofVxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cblxuXHQ8IS0tIOKUgOKUgCBSSUdIVCBjb2x1bW4g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAIC0tPlxuXHQ8ZGl2IGNsYXNzPVwiZ2FudHQtcmlnaHRcIiBiaW5kOnRoaXM9e3JpZ2h0UGFuZWxFbH0gb246c2Nyb2xsPXtzeW5jU2Nyb2xsfT5cblx0XHQ8IS0tIElubmVyIGNvbnRhaW5lciBzaXplZCB0byBmdWxsIHRpbWVsaW5lIHdpZHRoIC0tPlxuXHRcdDxkaXYgY2xhc3M9XCJnYW50dC1pbm5lclwiIHN0eWxlPVwid2lkdGg6e2RhdGVSYW5nZS5kYXlzICogREFZX1dJRFRIfXB4XCI+XG5cdFx0XHQ8IS0tIFN0aWNreSBoZWFkZXI6IGNvbWJpbmVkIG1vbnRocyArIGRheXMgcm93IC0tPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdhbnR0LWhlYWRlci1kYXlzXCI+XG5cdFx0XHRcdDwhLS0gTW9udGggbGFiZWxzIGFzIG92ZXJsYWlkIHNwYW5zIGluc2lkZSB0aGUgZGF5IGNlbGxzIC0tPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ2FudHQtbW9udGgtbGFiZWxzXCI+XG5cdFx0XHRcdFx0eyNlYWNoIGhlYWRlck1vbnRocyBhcyBtfVxuXHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRjbGFzcz1cImdhbnR0LW1vbnRoLWxhYmVsLWNlbGxcIlxuXHRcdFx0XHRcdFx0XHRzdHlsZT1cIndpZHRoOnttLnNwYW4gKiBEQVlfV0lEVEh9cHhcIlxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHR7bS5sYWJlbH1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdHsvZWFjaH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwhLS0gRGF5IG51bWJlcnMgcm93IC0tPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ2FudHQtZGF5LW51bWJlcnNcIj5cblx0XHRcdFx0XHR7I2VhY2ggZGF5SGVhZGVycyBhcyBkaH1cblx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJnYW50dC1kYXktY2VsbFwiXG5cdFx0XHRcdFx0XHRcdGNsYXNzOndlZWtlbmQ9e2RoLmlzV2Vla2VuZH1cblx0XHRcdFx0XHRcdFx0Y2xhc3M6dG9kYXktY29sPXtkaC5pc1RvZGF5fVxuXHRcdFx0XHRcdFx0XHRzdHlsZT1cIndpZHRoOntEQVlfV0lEVEh9cHhcIlxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHR7ZGguZGF5fVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0ey9lYWNofVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8IS0tIEdyaWQgcm93cyArIGJhcnMgLS0+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ2FudHQtcm93cy1jb250YWluZXJcIiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPlxuXHRcdFx0XHQ8IS0tIFRvZGF5IHZlcnRpY2FsIG1hcmtlciAtLT5cblx0XHRcdFx0eyNpZiB0b2RheUlkeCA+PSAwICYmIHRvZGF5SWR4IDwgZGF0ZVJhbmdlLmRheXN9XG5cdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0Y2xhc3M9XCJ0b2RheS1saW5lXCJcblx0XHRcdFx0XHRcdHN0eWxlPVwibGVmdDp7dG9kYXlJZHggKiBEQVlfV0lEVEggK1xuXHRcdFx0XHRcdFx0XHREQVlfV0lEVEggLyAyfXB4OyBoZWlnaHQ6e3Jvd3MubGVuZ3RoICogUk9XX0hFSUdIVH1weFwiXG5cdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHR7L2lmfVxuXG5cdFx0XHRcdHsjZWFjaCByb3dzIGFzIHJvdyAocm93LmlkKX1cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ2FudHQtZ3JpZC1yb3dcIiBzdHlsZT1cImhlaWdodDp7Uk9XX0hFSUdIVH1weFwiPlxuXHRcdFx0XHRcdFx0PCEtLSBCYWNrZ3JvdW5kIGRheSBjZWxscyAtLT5cblx0XHRcdFx0XHRcdHsjZWFjaCBkYXlIZWFkZXJzIGFzIGRoLCBpfVxuXHRcdFx0XHRcdFx0XHQ8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJnYW50dC1ncmlkLWNlbGxcIlxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzOndlZWtlbmQ9e2RoLmlzV2Vla2VuZH1cblx0XHRcdFx0XHRcdFx0XHRjbGFzczp0b2RheS1jb2w9e2RoLmlzVG9kYXl9XG5cdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJ3aWR0aDp7REFZX1dJRFRIfXB4XCJcblx0XHRcdFx0XHRcdFx0XHRvbjpjbGljaz17KCkgPT4gb25DZWxsQ2xpY2socm93LCBpKX1cblx0XHRcdFx0XHRcdFx0XHRyb2xlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIi0xXCJcblx0XHRcdFx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiU2V0IGRhdGVcIlxuXHRcdFx0XHRcdFx0XHQ+PC9kaXY+XG5cdFx0XHRcdFx0XHR7L2VhY2h9XG5cblx0XHRcdFx0XHRcdDwhLS0gQmFyIC0tPlxuXHRcdFx0XHRcdFx0eyNpZiBnZXRCYXIocm93KX1cblx0XHRcdFx0XHRcdFx0e0Bjb25zdCBiYXIgPSBnZXRCYXIocm93KSF9XG5cdFx0XHRcdFx0XHRcdDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW5vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAtLT5cblx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZ2FudHQtYmFyXCJcblx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cImxlZnQ6e2Jhci5zdGFydERheSAqIERBWV9XSURUSH1weDsgd2lkdGg6eyhiYXIuZW5kRGF5IC1cblx0XHRcdFx0XHRcdFx0XHRcdGJhci5zdGFydERheSArXG5cdFx0XHRcdFx0XHRcdFx0XHQxKSAqXG5cdFx0XHRcdFx0XHRcdFx0XHREQVlfV0lEVEh9cHg7IGJhY2tncm91bmQ6e3Jvdy5iYXJDb2xvcn07IHRvcDp7KFJPV19IRUlHSFQgLVxuXHRcdFx0XHRcdFx0XHRcdFx0MjQpIC9cblx0XHRcdFx0XHRcdFx0XHRcdDJ9cHg7XCJcblx0XHRcdFx0XHRcdFx0XHRvbjptb3VzZWRvd249eyhlKSA9PiBvbkJhck1vdXNlRG93bihyb3csIFwibW92ZVwiLCBlKX1cblx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW5vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAtLT5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImJhci1oYW5kbGUgYmFyLWhhbmRsZS1sZWZ0XCJcblx0XHRcdFx0XHRcdFx0XHRcdG9uOm1vdXNlZG93bj17KGUpID0+IG9uQmFyTW91c2VEb3duKHJvdywgXCJyZXNpemUtc3RhcnRcIiwgZSl9XG5cdFx0XHRcdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYmFyLWxhYmVsXCI+e3Jvdy50aXRsZX08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PCEtLSBzdmVsdGUtaWdub3JlIGExMXktbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zIC0tPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiYmFyLWhhbmRsZSBiYXItaGFuZGxlLXJpZ2h0XCJcblx0XHRcdFx0XHRcdFx0XHRcdG9uOm1vdXNlZG93bj17KGUpID0+IG9uQmFyTW91c2VEb3duKHJvdywgXCJyZXNpemUtZW5kXCIsIGUpfVxuXHRcdFx0XHRcdFx0XHRcdD48L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7L2VhY2h9XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8IS0tIC9nYW50dC1pbm5lciAtLT5cblx0PC9kaXY+XG5cdDwhLS0gL2dhbnR0LXJpZ2h0IC0tPlxuPC9kaXY+XG5cbjxzdHlsZT5cblx0Lyog4pSA4pSAIE91dGVyIHdyYXBwZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG5cdC5nYW50dC13cmFwcGVyIHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGZvbnQtc2l6ZTogMTNweDtcblx0XHRiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpO1xuXHRcdHVzZXItc2VsZWN0OiBub25lO1xuXHR9XG5cblx0Lyog4pSA4pSAIExlZnQgcGFuZWwg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG5cdC5nYW50dC1sZWZ0IHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0d2lkdGg6IDI2MHB4O1xuXHRcdGJvcmRlci1yaWdodDogMnB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcblx0XHQvKiBvdmVyZmxvdyBoaWRkZW4gc28gaG9yaXpvbnRhbCBjb250ZW50IGRvZXNuJ3QgYmxlZWQgKi9cblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHR9XG5cblx0LyogU3BhY2VyIG11c3QgbWF0Y2ggdGhlIGV4YWN0IHBpeGVsIGhlaWdodCBvZiB0aGUgcmlnaHQtcGFuZWwgaGVhZGVyICovXG5cdC5sZWZ0LWhlYWRlci1zcGFjZXIge1xuXHRcdGZsZXgtc2hyaW5rOiAwO1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG5cdH1cblxuXHQubGVmdC1kYXktc3BhY2VyIHtcblx0XHRoZWlnaHQ6IDU2cHg7XG5cdFx0bGluZS1oZWlnaHQ6IDU2cHg7XG5cdFx0cGFkZGluZzogMCAxMHB4O1xuXHRcdGZvbnQtc2l6ZTogMC43OGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuXHRcdGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcblx0fVxuXG5cdC8qIExlZnQgcm93cyDigJQgb3ZlcmZsb3cteSBoaWRkZW47IHZlcnRpY2FsIHNjcm9sbCBpcyBkcml2ZW4gYnkgdGhlIHJpZ2h0IHBhbmVsICovXG5cdC5nYW50dC1sZWZ0LXJvd3Mge1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0ZmxleDogMTtcblx0fVxuXG5cdC5nYW50dC1sZWZ0LXJvdyB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGdhcDogNnB4O1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG5cdFx0cGFkZGluZy1yaWdodDogOHB4O1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5nYW50dC1sZWZ0LXJvdy5zdWJ0YXNrLXJvdyB7XG5cdFx0YmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnktYWx0KTtcblx0XHRmb250LXNpemU6IDAuODhlbTtcblx0fVxuXG5cdC5leHBhbmQtYnRuIHtcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xuXHRcdGJvcmRlcjogbm9uZTtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0cGFkZGluZzogMDtcblx0XHR3aWR0aDogMTZweDtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0Zm9udC1zaXplOiAxMnB4O1xuXHRcdGxpbmUtaGVpZ2h0OiAxO1xuXHR9XG5cblx0LmV4cGFuZC1wbGFjZWhvbGRlciB7XG5cdFx0d2lkdGg6IDE2cHg7XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHR9XG5cblx0LmdhbnR0LXRhc2stbGluayB7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1hY2NlbnQpO1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjI7XG5cdH1cblxuXHQuZ2FudHQtdGFzay1saW5rOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC5nYW50dC10YXNrLWxhYmVsLXdyYXAge1xuXHRcdGZsZXg6IDE7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5cblx0LmdhbnR0LXBhcmVudC1sYWJlbCB7XG5cdFx0Zm9udC1zaXplOiAwLjdlbTtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XG5cdFx0Zm9udC1zdHlsZTogaXRhbGljO1xuXHRcdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHR0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblx0fVxuXG5cdC5zdGF0dXMtZG90IHtcblx0XHR3aWR0aDogOHB4O1xuXHRcdGhlaWdodDogOHB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDUwJTtcblx0XHRmbGV4LXNocmluazogMDtcblx0fVxuXG5cdC5nYW50dC1hZGQtc3VidGFzay1idG4ge1xuXHRcdGZsZXgtc2hyaW5rOiAwO1xuXHRcdG1hcmdpbi1sZWZ0OiAycHg7XG5cdFx0d2lkdGg6IDE4cHg7XG5cdFx0aGVpZ2h0OiAxOHB4O1xuXHRcdGxpbmUtaGVpZ2h0OiAxNnB4O1xuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRwYWRkaW5nOiAwO1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuXHRcdGZvbnQtc2l6ZTogMTRweDtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2l0aW9uOlxuXHRcdFx0b3BhY2l0eSAwLjE1cyxcblx0XHRcdGJhY2tncm91bmQgMC4xNXM7XG5cdH1cblx0LmdhbnR0LWxlZnQtcm93OmhvdmVyIC5nYW50dC1hZGQtc3VidGFzay1idG4ge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0LmdhbnR0LWFkZC1zdWJ0YXNrLWJ0bjpob3ZlciB7XG5cdFx0YmFja2dyb3VuZDogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1vbi1hY2NlbnQpO1xuXHRcdGJvcmRlci1jb2xvcjogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcblx0fVxuXG5cdC5nYW50dC1hcmNoaXZlLWJ0biB7XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0bWFyZ2luLWxlZnQ6IDJweDtcblx0XHR3aWR0aDogMThweDtcblx0XHRoZWlnaHQ6IDE4cHg7XG5cdFx0bGluZS1oZWlnaHQ6IDE2cHg7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdHBhZGRpbmc6IDA7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0XHRmb250LXNpemU6IDExcHg7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0dHJhbnNpdGlvbjpcblx0XHRcdG9wYWNpdHkgMC4xNXMsXG5cdFx0XHRiYWNrZ3JvdW5kIDAuMTVzO1xuXHR9XG5cdC5nYW50dC1sZWZ0LXJvdzpob3ZlciAuZ2FudHQtYXJjaGl2ZS1idG4ge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0LmdhbnR0LWFyY2hpdmUtYnRuOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWVycm9yKTtcblx0XHRib3JkZXItY29sb3I6IHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItZXJyb3IpO1xuXHR9XG5cblx0Lyog4pSA4pSAIFJpZ2h0IHBhbmVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL1xuXHQuZ2FudHQtcmlnaHQge1xuXHRcdGZsZXg6IDE7XG5cdFx0b3ZlcmZsb3c6IGF1dG87IC8qIFRISVMgaXMgdGhlIHNpbmdsZSBzY3JvbGwgY29udGFpbmVyICovXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR9XG5cblx0LyogSW5uZXIgZGl2IGlzIGFzIHdpZGUgYXMgYWxsIHRoZSBkYXkgY29sdW1ucyAqL1xuXHQuZ2FudHQtaW5uZXIge1xuXHRcdG1pbi1oZWlnaHQ6IDEwMCU7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR9XG5cblx0Lyog4pSA4pSAIFN0aWNreSBoZWFkZXIgKGNvbWJpbmVkIG1vbnRocyArIGRheXMsIDU2cHggdGFsbCkg4pSA4pSA4pSA4pSAICovXG5cdC5nYW50dC1oZWFkZXItZGF5cyB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdHBvc2l0aW9uOiBzdGlja3k7XG5cdFx0dG9wOiAwO1xuXHRcdGxlZnQ6IDA7XG5cdFx0YmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpO1xuXHRcdHotaW5kZXg6IDEwO1xuXHRcdHdpZHRoOiBtYXgtY29udGVudDtcblx0XHRtaW4td2lkdGg6IDEwMCU7XG5cdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcblx0fVxuXG5cdC8qIE1vbnRoIGxhYmVscyByb3cg4oCUIGVhY2ggY2VsbCBzcGFucyBpdHMgbW9udGgncyB3aWR0aCAqL1xuXHQuZ2FudHQtbW9udGgtbGFiZWxzIHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGhlaWdodDogMjZweDtcblx0XHRib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuXHR9XG5cblx0LmdhbnR0LW1vbnRoLWxhYmVsLWNlbGwge1xuXHRcdGhlaWdodDogMjZweDtcblx0XHRsaW5lLWhlaWdodDogMjZweDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0XHRmb250LXNpemU6IDAuNzhlbTtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1xuXHRcdGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0dGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0cGFkZGluZzogMCA0cHg7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC8qIERheSBudW1iZXJzIHJvdyAqL1xuXHQuZ2FudHQtZGF5LW51bWJlcnMge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0aGVpZ2h0OiAzMHB4O1xuXHR9XG5cblx0LmdhbnR0LWRheS1jZWxsIHtcblx0XHRoZWlnaHQ6IDMwcHg7XG5cdFx0bGluZS1oZWlnaHQ6IDMwcHg7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGZvbnQtc2l6ZTogMC43NWVtO1xuXHRcdGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcblx0XHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5nYW50dC1kYXktY2VsbC53ZWVrZW5kIHtcblx0XHRiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeS1hbHQpO1xuXHRcdGNvbG9yOiB2YXIoLS10ZXh0LWZhaW50KTtcblx0fVxuXHQuZ2FudHQtZGF5LWNlbGwudG9kYXktY29sIHtcblx0XHRiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KSAyMiUsIHRyYW5zcGFyZW50KTtcblx0XHRjb2xvcjogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcblx0XHRmb250LXdlaWdodDogNzAwO1xuXHR9XG5cblx0Lyog4pSA4pSAIEdyaWQgYm9keSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cblx0LmdhbnR0LXJvd3MtY29udGFpbmVyIHtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdH1cblxuXHQuZ2FudHQtZ3JpZC1yb3cge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5nYW50dC1ncmlkLWNlbGwge1xuXHRcdGZsZXgtc2hyaW5rOiAwO1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlci1ob3Zlcik7XG5cdFx0Y3Vyc29yOiBjcm9zc2hhaXI7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5nYW50dC1ncmlkLWNlbGwud2Vla2VuZCB7XG5cdFx0YmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnktYWx0KTtcblx0fVxuXHQuZ2FudHQtZ3JpZC1jZWxsLnRvZGF5LWNvbCB7XG5cdFx0YmFja2dyb3VuZDogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWludGVyYWN0aXZlLWFjY2VudCkgOCUsIHRyYW5zcGFyZW50KTtcblx0fVxuXG5cdC8qIOKUgOKUgCBUb2RheSB2ZXJ0aWNhbCBsaW5lIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgCAqL1xuXHQudG9kYXktbGluZSB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHRvcDogMDtcblx0XHR3aWR0aDogMnB4O1xuXHRcdGJhY2tncm91bmQ6IHZhcigtLWludGVyYWN0aXZlLWFjY2VudCk7XG5cdFx0b3BhY2l0eTogMC42O1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHRcdHotaW5kZXg6IDU7XG5cdH1cblxuXHQvKiDilIDilIAgR2FudHQgYmFycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cblx0LmdhbnR0LWJhciB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGhlaWdodDogMjRweDtcblx0XHRib3JkZXItcmFkaXVzOiA1cHg7XG5cdFx0Y3Vyc29yOiBncmFiO1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdHotaW5kZXg6IDQ7XG5cdFx0Ym94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG5cdFx0bWluLXdpZHRoOiAxMHB4O1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cblxuXHQuZ2FudHQtYmFyOmhvdmVyIHtcblx0XHRmaWx0ZXI6IGJyaWdodG5lc3MoMS4xMik7XG5cdH1cblx0LmdhbnR0LWJhcjphY3RpdmUge1xuXHRcdGN1cnNvcjogZ3JhYmJpbmc7XG5cdH1cblxuXHQuYmFyLWxhYmVsIHtcblx0XHRmbGV4OiAxO1xuXHRcdGZvbnQtc2l6ZTogMC43NWVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA2MDA7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuXHRcdHBhZGRpbmc6IDAgNHB4O1xuXHRcdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XG5cdH1cblxuXHQuYmFyLWhhbmRsZSB7XG5cdFx0d2lkdGg6IDhweDtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0Y3Vyc29yOiBjb2wtcmVzaXplO1xuXHRcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xOCk7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHR9XG5cblx0LmJhci1oYW5kbGU6OmFmdGVyIHtcblx0XHRjb250ZW50OiBcIuKLrlwiO1xuXHRcdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDUpO1xuXHRcdGZvbnQtc2l6ZTogOXB4O1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHR9XG5cblx0LmJhci1oYW5kbGUtbGVmdCB7XG5cdFx0Ym9yZGVyLXJhZGl1czogNXB4IDAgMCA1cHg7XG5cdH1cblx0LmJhci1oYW5kbGUtcmlnaHQge1xuXHRcdGJvcmRlci1yYWRpdXM6IDAgNXB4IDVweCAwO1xuXHR9XG48L3N0eWxlPlxuIiwiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IHR5cGUgeyBUYXNrLCBUYXNrU3RhdHVzLCBUYXNrUHJpb3JpdHkgfSBmcm9tICcuLi90eXBlcyc7XG5cbiAgZXhwb3J0IGxldCBwYXJlbnRJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGV4cG9ydCBsZXQgcGFyZW50VGl0bGU6IHN0cmluZyA9ICcnO1xuICBleHBvcnQgbGV0IG9uU3VibWl0OiAoZGF0YToge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBUYXNrU3RhdHVzO1xuICAgIHByaW9yaXR5OiBUYXNrUHJpb3JpdHk7XG4gICAgc3RhcnREYXRlOiBzdHJpbmc7XG4gICAgZW5kRGF0ZTogc3RyaW5nO1xuICAgIGFzc2lnbmVlOiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIH0pID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgZXhwb3J0IGxldCBvbkNhbmNlbDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIGxldCB0aXRsZSA9ICcnO1xuICBsZXQgc3RhdHVzOiBUYXNrU3RhdHVzID0gJ3RvZG8nO1xuICBsZXQgcHJpb3JpdHk6IFRhc2tQcmlvcml0eSA9ICdtZWRpdW0nO1xuICBsZXQgc3RhcnREYXRlID0gJyc7XG4gIGxldCBlbmREYXRlID0gJyc7XG4gIGxldCBhc3NpZ25lZSA9ICcnO1xuICBsZXQgdGFncyA9ICcnO1xuICBsZXQgZGVzY3JpcHRpb24gPSAnJztcblxuICBsZXQgZXJyb3JzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUoKTogYm9vbGVhbiB7XG4gICAgZXJyb3JzID0ge307XG4gICAgaWYgKCF0aXRsZS50cmltKCkpIGVycm9ycy50aXRsZSA9ICdUaXRsZSBpcyByZXF1aXJlZCc7XG4gICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlICYmIGVuZERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgIGVycm9ycy5lbmREYXRlID0gJ0VuZCBkYXRlIG11c3QgYmUgYWZ0ZXIgc3RhcnQgZGF0ZSc7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhlcnJvcnMpLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Ym1pdCgpIHtcbiAgICBpZiAoIXZhbGlkYXRlKCkpIHJldHVybjtcbiAgICBvblN1Ym1pdCh7IHRpdGxlOiB0aXRsZS50cmltKCksIHN0YXR1cywgcHJpb3JpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgYXNzaWduZWUsIHRhZ3MsIGRlc2NyaXB0aW9uIH0pO1xuICB9XG48L3NjcmlwdD5cblxuPGRpdlxuICBjbGFzcz1cInRhc2stbW9kYWwtb3ZlcmxheVwiXG4gIG9uOmNsaWNrfHNlbGY9e29uQ2FuY2VsfVxuICBvbjprZXlkb3duPXsoZSkgPT4gZS5rZXkgPT09ICdFc2NhcGUnICYmIG9uQ2FuY2VsKCl9XG4gIHJvbGU9XCJkaWFsb2dcIlxuICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gIHRhYmluZGV4PVwiLTFcIlxuPlxuICA8ZGl2IGNsYXNzPVwidGFzay1tb2RhbFwiPlxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgIDxoMj57cGFyZW50SWQgPyBgTmV3IFN1YnRhc2tgIDogJ05ldyBUYXNrJ308L2gyPlxuICAgICAgeyNpZiBwYXJlbnRJZH1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXJlbnQtbGFiZWxcIj51bmRlcjoge3BhcmVudFRpdGxlfTwvc3Bhbj5cbiAgICAgIHsvaWZ9XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnRuXCIgb246Y2xpY2s9e29uQ2FuY2VsfSBhcmlhLWxhYmVsPVwiQ2xvc2VcIj7inJU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stdGl0bGVcIj5UaXRsZSA8c3BhbiBjbGFzcz1cInJlcXVpcmVkXCI+Kjwvc3Bhbj48L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBpZD1cInRhc2stdGl0bGVcIlxuICAgICAgICAgIGJpbmQ6dmFsdWU9e3RpdGxlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVGFzayB0aXRsZS4uLlwiXG4gICAgICAgICAgY2xhc3M6ZXJyb3I9e2Vycm9ycy50aXRsZX1cbiAgICAgICAgICBvbjprZXlkb3duPXsoZSkgPT4gZS5rZXkgPT09ICdFbnRlcicgJiYgc3VibWl0KCl9XG4gICAgICAgIC8+XG4gICAgICAgIHsjaWYgZXJyb3JzLnRpdGxlfTxzcGFuIGNsYXNzPVwiZXJyb3ItbXNnXCI+e2Vycm9ycy50aXRsZX08L3NwYW4+ey9pZn1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3ctaW5saW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXN0YXR1c1wiPlN0YXR1czwvbGFiZWw+XG4gICAgICAgICAgPHNlbGVjdCBpZD1cInRhc2stc3RhdHVzXCIgYmluZDp2YWx1ZT17c3RhdHVzfT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ0b2RvXCI+VG8gRG88L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJpbi1wcm9ncmVzc1wiPkluIFByb2dyZXNzPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYmxvY2tlZFwiPkJsb2NrZWQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkb25lXCI+RG9uZTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1wcmlvcml0eVwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IGlkPVwidGFzay1wcmlvcml0eVwiIGJpbmQ6dmFsdWU9e3ByaW9yaXR5fT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJoaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNyaXRpY2FsXCI+Q3JpdGljYWw8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93LWlubGluZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1zdGFydFwiPlN0YXJ0IGRhdGU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBpZD1cInRhc2stc3RhcnRcIiB0eXBlPVwiZGF0ZVwiIGJpbmQ6dmFsdWU9e3N0YXJ0RGF0ZX0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stZW5kXCI+RW5kIGRhdGU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgaWQ9XCJ0YXNrLWVuZFwiXG4gICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtlbmREYXRlfVxuICAgICAgICAgICAgY2xhc3M6ZXJyb3I9e2Vycm9ycy5lbmREYXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgeyNpZiBlcnJvcnMuZW5kRGF0ZX08c3BhbiBjbGFzcz1cImVycm9yLW1zZ1wiPntlcnJvcnMuZW5kRGF0ZX08L3NwYW4+ey9pZn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLWFzc2lnbmVlXCI+QXNzaWduZWU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9XCJ0YXNrLWFzc2lnbmVlXCIgYmluZDp2YWx1ZT17YXNzaWduZWV9IHBsYWNlaG9sZGVyPVwiQG5hbWVcIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwidGFzay10YWdzXCI+VGFncyA8c3BhbiBjbGFzcz1cImhpbnRcIj4oY29tbWEgc2VwYXJhdGVkKTwvc3Bhbj48L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9XCJ0YXNrLXRhZ3NcIiBiaW5kOnZhbHVlPXt0YWdzfSBwbGFjZWhvbGRlcj1cImRlc2lnbiwgYmFja2VuZCwgdXJnZW50XCIgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stZGVzY1wiPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIGlkPVwidGFzay1kZXNjXCIgYmluZDp2YWx1ZT17ZGVzY3JpcHRpb259IHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJPcHRpb25hbCBkZXNjcmlwdGlvbi4uLlwiPjwvdGV4dGFyZWE+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2Vjb25kYXJ5XCIgb246Y2xpY2s9e29uQ2FuY2VsfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tcHJpbWFyeVwiIG9uOmNsaWNrPXtzdWJtaXR9PlxuICAgICAgICB7cGFyZW50SWQgPyAnQ3JlYXRlIFN1YnRhc2snIDogJ0NyZWF0ZSBUYXNrJ31cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48c3R5bGU+XG4gIC50YXNrLW1vZGFsLW92ZXJsYXkge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBpbnNldDogMDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gIH1cblxuICAudGFzay1tb2RhbCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB3aWR0aDogNDgwcHg7XG4gICAgbWF4LXdpZHRoOiA5NXZ3O1xuICAgIG1heC1oZWlnaHQ6IDkwdmg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLDAuMzUpO1xuICB9XG5cbiAgLm1vZGFsLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTBweDtcbiAgICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgfVxuXG4gIC5tb2RhbC1oZWFkZXIgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDEuMWVtO1xuICAgIGZsZXg6IDE7XG4gIH1cblxuICAucGFyZW50LWxhYmVsIHtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XG4gICAgcGFkZGluZzogMnB4IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIH1cblxuICAuY2xvc2UtYnRuIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAgIGZvbnQtc2l6ZTogMS4xZW07XG4gICAgcGFkZGluZzogNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgfVxuXG4gIC5jbG9zZS1idG46aG92ZXIge1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3Zlcik7XG4gIH1cblxuICAubW9kYWwtYm9keSB7XG4gICAgcGFkZGluZzogMTZweCAyMHB4O1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMTJweDtcbiAgfVxuXG4gIC5mb3JtLXJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogNHB4O1xuICAgIGZsZXg6IDE7XG4gIH1cblxuICAuZm9ybS1yb3ctaW5saW5lIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMTJweDtcbiAgfVxuXG4gIGxhYmVsIHtcbiAgICBmb250LXNpemU6IDAuODJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgfVxuXG4gIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1xuICAgIGZvbnQtc2l6ZTogMC45ZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIGlucHV0OmZvY3VzLCBzZWxlY3Q6Zm9jdXMsIHRleHRhcmVhOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgfVxuXG4gIGlucHV0LmVycm9yIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXJlZCk7XG4gIH1cblxuICB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICBtaW4taGVpZ2h0OiA2MHB4O1xuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICB9XG5cbiAgLmVycm9yLW1zZyB7XG4gICAgZm9udC1zaXplOiAwLjc4ZW07XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXJlZCk7XG4gIH1cblxuICAucmVxdWlyZWQge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1yZWQpO1xuICB9XG5cbiAgLmhpbnQge1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgfVxuXG4gIC5tb2RhbC1mb290ZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBnYXA6IDEwcHg7XG4gICAgcGFkZGluZzogMTRweCAyMHB4O1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gIH1cblxuICAuYnRuLXByaW1hcnkge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWludGVyYWN0aXZlLWFjY2VudCk7XG4gICAgY29sb3I6IHZhcigtLXRleHQtb24tYWNjZW50KTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDdweCAxOHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtc2l6ZTogMC45ZW07XG4gIH1cblxuICAuYnRuLXByaW1hcnk6aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygxLjEpO1xuICB9XG5cbiAgLmJ0bi1zZWNvbmRhcnkge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogN3B4IDE4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtc2l6ZTogMC45ZW07XG4gIH1cblxuICAuYnRuLXNlY29uZGFyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3Zlcik7XG4gIH1cbjwvc3R5bGU+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICBpbXBvcnQgdHlwZSB7IFByb2plY3QsIFRhc2ssIFRhc2tTdGF0dXMgfSBmcm9tICcuLi90eXBlcyc7XG4gIGltcG9ydCBLYW5iYW5Cb2FyZCBmcm9tICcuL0thbmJhbkJvYXJkLnN2ZWx0ZSc7XG4gIGltcG9ydCBHYW50dENoYXJ0IGZyb20gJy4vR2FudHRDaGFydC5zdmVsdGUnO1xuICBpbXBvcnQgVGFza01vZGFsIGZyb20gJy4vVGFza01vZGFsLnN2ZWx0ZSc7XG5cbiAgLy8g4pSA4pSA4pSAIFByb3BzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAvLyBJbml0aWFsIGRhdGEgKyBzdGFibGUgY2FsbGJhY2tzIOKAlCBuZXZlciByZS1wYXNzZWQgZnJvbSBvdXRzaWRlIGFmdGVyIG1vdW50XG4gIGV4cG9ydCBsZXQgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuICBleHBvcnQgbGV0IGFjdGl2ZVByb2plY3RJbmRleDogbnVtYmVyID0gMDtcbiAgZXhwb3J0IGxldCB2aWV3TW9kZTogJ2dhbnR0JyB8ICdrYW5iYW4nID0gJ2dhbnR0JztcblxuICBleHBvcnQgbGV0IG9uQ3JlYXRlVGFzazogKFxuICAgIHByb2plY3RGb2xkZXI6IHN0cmluZyxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIHBhcmVudElkOiBzdHJpbmcgfCBudWxsLFxuICAgIGV4dHJhOiBQYXJ0aWFsPFRhc2s+XG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcblxuICBleHBvcnQgbGV0IG9uU3RhdHVzQ2hhbmdlOiAoXG4gICAgcHJvamVjdEZvbGRlcjogc3RyaW5nLFxuICAgIHRhc2tJZDogc3RyaW5nLFxuICAgIG5ld1N0YXR1czogVGFza1N0YXR1c1xuICApID0+IFByb21pc2U8dm9pZD47XG5cbiAgZXhwb3J0IGxldCBvbkRhdGVDaGFuZ2U6IChcbiAgICBwcm9qZWN0Rm9sZGVyOiBzdHJpbmcsXG4gICAgdGFza0lkOiBzdHJpbmcsXG4gICAgc3RhcnREYXRlOiBzdHJpbmcsXG4gICAgZW5kRGF0ZTogc3RyaW5nXG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcblxuICBleHBvcnQgbGV0IG9uQXJjaGl2ZVRhc2s6IChcbiAgICBwcm9qZWN0Rm9sZGVyOiBzdHJpbmcsXG4gICAgdGFza0lkOiBzdHJpbmcsXG4gICAgdGFza0ZpbGVQYXRoOiBzdHJpbmcsXG4gICAgaXNTdWJ0YXNrOiBib29sZWFuXG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcblxuICBleHBvcnQgbGV0IG9uT3BlblRhc2s6IChmaWxlUGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICAvLyBsb2FkUHJvamVjdHM6IGNhbGxlZCBieSB0aGUgY29tcG9uZW50IGl0c2VsZiB0byBnZXQgZnJlc2ggZGF0YVxuICBleHBvcnQgbGV0IGxvYWRQcm9qZWN0c0ZuOiAoKSA9PiBQcm9taXNlPFByb2plY3RbXT4gPSBhc3luYyAoKSA9PiBbXTtcbiAgZXhwb3J0IGxldCBvblZpZXdNb2RlQ2hhbmdlOiAobW9kZTogJ2dhbnR0JyB8ICdrYW5iYW4nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIGV4cG9ydCBsZXQgb25BY3RpdmVQcm9qZWN0Q2hhbmdlOiAoaWR4OiBudW1iZXIpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgLyoqIENhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgU3luYyBidXR0b24gaW4gdGhlIHRvb2xiYXIuICovXG4gIGV4cG9ydCBsZXQgb25TeW5jOiAoKCkgPT4gUHJvbWlzZTx2b2lkPikgfCBudWxsID0gbnVsbDtcblxuICAvLyDilIDilIDilIAgSW50ZXJuYWwgcmVhY3RpdmUgc3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIC8vIGBsaXZlUHJvamVjdHNgIGlzIG93bmVkIGJ5IHRoaXMgY29tcG9uZW50IOKAlCBtdXRhdGluZyBpdCB0cmlnZ2VycyBTdmVsdGUgcmUtcmVuZGVyc1xuICBsZXQgbGl2ZVByb2plY3RzOiBQcm9qZWN0W10gPSBwcm9qZWN0cztcbiAgbGV0IGxvYWRpbmcgPSBmYWxzZTtcbiAgLyoqICdpZGxlJyB8ICdzeW5jaW5nJyB8ICdvaycgfCAnZXJyb3InICovXG4gIGxldCBzeW5jU3RhdGU6ICdpZGxlJyB8ICdzeW5jaW5nJyB8ICdvaycgfCAnZXJyb3InID0gJ2lkbGUnO1xuICBsZXQgc3luY0xhYmVsID0gJyc7XG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3luYygpIHtcbiAgICBpZiAoIW9uU3luYyB8fCBzeW5jU3RhdGUgPT09ICdzeW5jaW5nJykgcmV0dXJuO1xuICAgIHN5bmNTdGF0ZSA9ICdzeW5jaW5nJztcbiAgICBzeW5jTGFiZWwgPSAnJztcbiAgICB0cnkge1xuICAgICAgYXdhaXQgb25TeW5jKCk7XG4gICAgICBhd2FpdCByZWZyZXNoKCk7XG4gICAgICBzeW5jU3RhdGUgPSAnb2snO1xuICAgICAgc3luY0xhYmVsID0gJ1N5bmNlZCc7XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBzeW5jU3RhdGUgPSAnZXJyb3InO1xuICAgICAgc3luY0xhYmVsID0gZT8ubWVzc2FnZSA/PyAnU3luYyBmYWlsZWQnO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBSZXNldCB0byBpZGxlIGFmdGVyIGEgc2hvcnQgZGVsYXkgc28gdGhlIHVzZXIgc2VlcyB0aGUgcmVzdWx0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc3luY1N0YXRlID0gJ2lkbGUnOyBzeW5jTGFiZWwgPSAnJzsgfSwgMzAwMCk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgbG9hZGluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGxpdmVQcm9qZWN0cyA9IGF3YWl0IGxvYWRQcm9qZWN0c0ZuKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRWaWV3TW9kZShtb2RlOiAnZ2FudHQnIHwgJ2thbmJhbicpIHtcbiAgICB2aWV3TW9kZSA9IG1vZGU7XG4gICAgb25WaWV3TW9kZUNoYW5nZShtb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFjdGl2ZVByb2plY3QoaWR4OiBudW1iZXIpIHtcbiAgICBhY3RpdmVQcm9qZWN0SW5kZXggPSBpZHg7XG4gICAgb25BY3RpdmVQcm9qZWN0Q2hhbmdlKGlkeCk7XG4gIH1cblxuICAvLyDilIDilIDilIAgTW9kYWwgc3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGxldCBzaG93TW9kYWwgPSBmYWxzZTtcbiAgbGV0IG1vZGFsUGFyZW50SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBsZXQgbW9kYWxQYXJlbnRUaXRsZSA9ICcnO1xuXG4gIGZ1bmN0aW9uIG9wZW5OZXdUYXNrTW9kYWwocGFyZW50SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsLCBwYXJlbnRUaXRsZSA9ICcnKSB7XG4gICAgbW9kYWxQYXJlbnRJZCA9IHBhcmVudElkO1xuICAgIG1vZGFsUGFyZW50VGl0bGUgPSBwYXJlbnRUaXRsZTtcbiAgICBzaG93TW9kYWwgPSB0cnVlO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlTW9kYWxTdWJtaXQoZGF0YTogYW55KSB7XG4gICAgc2hvd01vZGFsID0gZmFsc2U7XG4gICAgY29uc3QgcHJvamVjdCA9IGxpdmVQcm9qZWN0c1thY3RpdmVQcm9qZWN0SW5kZXhdO1xuICAgIGlmICghcHJvamVjdCkgcmV0dXJuO1xuXG4gICAgYXdhaXQgb25DcmVhdGVUYXNrKHByb2plY3QuZm9sZGVyUGF0aCwgZGF0YS50aXRsZSwgbW9kYWxQYXJlbnRJZCwge1xuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcbiAgICAgIHByaW9yaXR5OiBkYXRhLnByaW9yaXR5LFxuICAgICAgc3RhcnREYXRlOiBkYXRhLnN0YXJ0RGF0ZSB8fCBudWxsLFxuICAgICAgZW5kRGF0ZTogZGF0YS5lbmREYXRlIHx8IG51bGwsXG4gICAgICBhc3NpZ25lZTogZGF0YS5hc3NpZ25lZSxcbiAgICAgIHRhZ3M6IGRhdGEudGFncyA/IGRhdGEudGFncy5zcGxpdCgnLCcpLm1hcCgodDogc3RyaW5nKSA9PiB0LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW10sXG4gICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbixcbiAgICB9KTtcbiAgICBhd2FpdCByZWZyZXNoKCk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdGF0dXNDaGFuZ2UocHJvamVjdEZvbGRlcjogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZywgbmV3U3RhdHVzOiBUYXNrU3RhdHVzKSB7XG4gICAgLy8gT3B0aW1pc3RpYyB1cGRhdGUg4oCUIG11dGF0ZSBsaXZlUHJvamVjdHMgaW4tbWVtb3J5IGltbWVkaWF0ZWx5XG4gICAgbGl2ZVByb2plY3RzID0gbGl2ZVByb2plY3RzLm1hcChwcm9qID0+ICh7XG4gICAgICAuLi5wcm9qLFxuICAgICAgdGFza3M6IHByb2oudGFza3MubWFwKHRhc2sgPT4ge1xuICAgICAgICBpZiAodGFzay5pZCA9PT0gdGFza0lkKSByZXR1cm4geyAuLi50YXNrLCBzdGF0dXM6IG5ld1N0YXR1cyB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRhc2ssXG4gICAgICAgICAgc3VidGFza3M6IHRhc2suc3VidGFza3MubWFwKHN1YiA9PlxuICAgICAgICAgICAgc3ViLmlkID09PSB0YXNrSWQgPyB7IC4uLnN1Yiwgc3RhdHVzOiBuZXdTdGF0dXMgfSA6IHN1YlxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICB9KSk7XG4gICAgLy8gUGVyc2lzdCB0byBkaXNrXG4gICAgYXdhaXQgb25TdGF0dXNDaGFuZ2UocHJvamVjdEZvbGRlciwgdGFza0lkLCBuZXdTdGF0dXMpO1xuICAgIC8vIFN5bmMgZnJvbSBkaXNrIHRvIHBpY2sgdXAgYW55IHNpZGUtZWZmZWN0c1xuICAgIGF3YWl0IHJlZnJlc2goKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZURhdGVDaGFuZ2UoXG4gICAgcHJvamVjdEZvbGRlcjogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZywgc3RhcnREYXRlOiBzdHJpbmcsIGVuZERhdGU6IHN0cmluZ1xuICApIHtcbiAgICAvLyBPcHRpbWlzdGljIHVwZGF0ZVxuICAgIGxpdmVQcm9qZWN0cyA9IGxpdmVQcm9qZWN0cy5tYXAocHJvaiA9PiAoe1xuICAgICAgLi4ucHJvaixcbiAgICAgIHRhc2tzOiBwcm9qLnRhc2tzLm1hcCh0YXNrID0+IHtcbiAgICAgICAgaWYgKHRhc2suaWQgPT09IHRhc2tJZCkgcmV0dXJuIHsgLi4udGFzaywgc3RhcnREYXRlLCBlbmREYXRlIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udGFzayxcbiAgICAgICAgICBzdWJ0YXNrczogdGFzay5zdWJ0YXNrcy5tYXAoc3ViID0+XG4gICAgICAgICAgICBzdWIuaWQgPT09IHRhc2tJZCA/IHsgLi4uc3ViLCBzdGFydERhdGUsIGVuZERhdGUgfSA6IHN1YlxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICB9KSk7XG4gICAgLy8gUGVyc2lzdFxuICAgIGF3YWl0IG9uRGF0ZUNoYW5nZShwcm9qZWN0Rm9sZGVyLCB0YXNrSWQsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgYXdhaXQgcmVmcmVzaCgpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQXJjaGl2ZVRhc2soXG4gICAgcHJvamVjdEZvbGRlcjogc3RyaW5nLFxuICAgIHRhc2tJZDogc3RyaW5nLFxuICAgIHRhc2tGaWxlUGF0aDogc3RyaW5nLFxuICAgIGlzU3VidGFzazogYm9vbGVhblxuICApIHtcbiAgICAvLyBPcHRpbWlzdGljOiByZW1vdmUgdGhlIHRhc2svc3VidGFzayBmcm9tIGxpdmVQcm9qZWN0cyBpbW1lZGlhdGVseVxuICAgIGxpdmVQcm9qZWN0cyA9IGxpdmVQcm9qZWN0cy5tYXAocHJvaiA9PiAoe1xuICAgICAgLi4ucHJvaixcbiAgICAgIHRhc2tzOiBwcm9qLnRhc2tzXG4gICAgICAgIC5maWx0ZXIodGFzayA9PiB0YXNrLmlkICE9PSB0YXNrSWQpXG4gICAgICAgIC5tYXAodGFzayA9PiAoe1xuICAgICAgICAgIC4uLnRhc2ssXG4gICAgICAgICAgc3VidGFza3M6IHRhc2suc3VidGFza3MuZmlsdGVyKHN1YiA9PiBzdWIuaWQgIT09IHRhc2tJZCksXG4gICAgICAgIH0pKSxcbiAgICB9KSk7XG4gICAgYXdhaXQgb25BcmNoaXZlVGFzayhwcm9qZWN0Rm9sZGVyLCB0YXNrSWQsIHRhc2tGaWxlUGF0aCwgaXNTdWJ0YXNrKTtcbiAgICBhd2FpdCByZWZyZXNoKCk7XG4gIH1cblxuICAkOiBjdXJyZW50UHJvamVjdCA9IGxpdmVQcm9qZWN0c1thY3RpdmVQcm9qZWN0SW5kZXhdID8/IG51bGw7XG4gICQ6IGN1cnJlbnRUYXNrcyA9IGN1cnJlbnRQcm9qZWN0Py50YXNrcyA/PyBbXTtcbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwicHJvamVjdC12aWV3XCI+XG4gIDwhLS0g4pSA4pSAIFRvcCBiYXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAIC0tPlxuICA8ZGl2IGNsYXNzPVwidG9wYmFyXCI+XG4gICAgPCEtLSBQcm9qZWN0IHNlbGVjdG9yIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0LXNlbGVjdG9yXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvcGJhci1sYWJlbFwiPlByb2plY3Q6PC9zcGFuPlxuICAgICAgeyNlYWNoIGxpdmVQcm9qZWN0cyBhcyBwcm9qLCBpfVxuICAgICAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeS1jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzIC0tPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3M9XCJwcm9qZWN0LXRhYlwiXG4gICAgICAgICAgY2xhc3M6YWN0aXZlPXtpID09PSBhY3RpdmVQcm9qZWN0SW5kZXh9XG4gICAgICAgICAgb246Y2xpY2s9eygpID0+IHNldEFjdGl2ZVByb2plY3QoaSl9XG4gICAgICAgID5cbiAgICAgICAgICDwn5OBIHtwcm9qLm5hbWV9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgey9lYWNofVxuICAgICAgeyNpZiBsaXZlUHJvamVjdHMubGVuZ3RoID09PSAwfVxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5vLXByb2plY3RzXCI+Tm8gcHJvamVjdHMgZm91bmQgaW4geW91ciBwcm9qZWN0cyBmb2xkZXIuPC9zcGFuPlxuICAgICAgey9pZn1cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gVmlldyBzd2l0Y2hlciAtLT5cbiAgICA8ZGl2IGNsYXNzPVwidmlldy1zd2l0Y2hlclwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzcz1cInZpZXctYnRuXCJcbiAgICAgICAgY2xhc3M6YWN0aXZlPXt2aWV3TW9kZSA9PT0gJ2dhbnR0J31cbiAgICAgICAgb246Y2xpY2s9eygpID0+IHNldFZpZXdNb2RlKCdnYW50dCcpfVxuICAgICAgICB0aXRsZT1cIkdhbnR0IENoYXJ0XCJcbiAgICAgID5cbiAgICAgICAg8J+TiiBHYW50dFxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwidmlldy1idG5cIlxuICAgICAgICBjbGFzczphY3RpdmU9e3ZpZXdNb2RlID09PSAna2FuYmFuJ31cbiAgICAgICAgb246Y2xpY2s9eygpID0+IHNldFZpZXdNb2RlKCdrYW5iYW4nKX1cbiAgICAgICAgdGl0bGU9XCJLYW5iYW4gQm9hcmRcIlxuICAgICAgPlxuICAgICAgICDwn5eCIEthbmJhblxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIEFjdGlvbnMgLS0+XG4gICAgPGRpdiBjbGFzcz1cInRvcGJhci1hY3Rpb25zXCI+XG4gICAgICB7I2lmIGN1cnJlbnRQcm9qZWN0fVxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFkZFwiIG9uOmNsaWNrPXsoKSA9PiBvcGVuTmV3VGFza01vZGFsKG51bGwpfT5cbiAgICAgICAgICArIE5ldyBUYXNrXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgey9pZn1cbiAgICAgIHsjaWYgb25TeW5jfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3M9XCJidG4tc3luY1wiXG4gICAgICAgICAgY2xhc3M6c3luY2luZz17c3luY1N0YXRlID09PSAnc3luY2luZyd9XG4gICAgICAgICAgY2xhc3M6b2s9e3N5bmNTdGF0ZSA9PT0gJ29rJ31cbiAgICAgICAgICBjbGFzczplcnJvcj17c3luY1N0YXRlID09PSAnZXJyb3InfVxuICAgICAgICAgIG9uOmNsaWNrPXtoYW5kbGVTeW5jfVxuICAgICAgICAgIHRpdGxlPVwiU3luYyB3aXRoIHNlcnZlclwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3N5bmNTdGF0ZSA9PT0gJ3N5bmNpbmcnfVxuICAgICAgICA+XG4gICAgICAgICAgeyNpZiBzeW5jU3RhdGUgPT09ICdzeW5jaW5nJ31cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luYy1pY29uIHNwaW5uaW5nXCI+4oa7PC9zcGFuPiBTeW5jaW5n4oCmXG4gICAgICAgICAgezplbHNlIGlmIHN5bmNTdGF0ZSA9PT0gJ29rJ31cbiAgICAgICAgICAgIOKckyB7c3luY0xhYmVsfVxuICAgICAgICAgIHs6ZWxzZSBpZiBzeW5jU3RhdGUgPT09ICdlcnJvcid9XG4gICAgICAgICAgICDinJcgRXJyb3JcbiAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICDihrsgU3luY1xuICAgICAgICAgIHsvaWZ9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgey9pZn1cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tcmVmcmVzaFwiIGNsYXNzOnNwaW5uaW5nPXtsb2FkaW5nfSBvbjpjbGljaz17cmVmcmVzaH0gdGl0bGU9XCJSZWZyZXNoXCI+4oa6PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDwhLS0g4pSA4pSAIE1haW4gY29udGVudCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG4gIDxkaXYgY2xhc3M9XCJ2aWV3LWNvbnRhaW5lclwiPlxuICAgIHsjaWYgIWN1cnJlbnRQcm9qZWN0fVxuICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LXN0YXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1pY29uXCI+8J+TgTwvZGl2PlxuICAgICAgICA8cD5ObyBwcm9qZWN0IHNlbGVjdGVkLiBDcmVhdGUgYSBmb2xkZXIgaW5zaWRlIHlvdXIgY29uZmlndXJlZCBwcm9qZWN0cyBmb2xkZXIgdG8gZ2V0IHN0YXJ0ZWQuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgezplbHNlIGlmIHZpZXdNb2RlID09PSAnZ2FudHQnfVxuICAgICAgPEdhbnR0Q2hhcnRcbiAgICAgICAgdGFza3M9e2N1cnJlbnRUYXNrc31cbiAgICAgICAge29uT3BlblRhc2t9XG4gICAgICAgIG9uRGF0ZUNoYW5nZT17KHRhc2tJZCwgc3RhcnREYXRlLCBlbmREYXRlKSA9PlxuICAgICAgICAgIGhhbmRsZURhdGVDaGFuZ2UoY3VycmVudFByb2plY3QuZm9sZGVyUGF0aCwgdGFza0lkLCBzdGFydERhdGUsIGVuZERhdGUpXG4gICAgICAgIH1cbiAgICAgICAgb25BZGRTdWJ0YXNrPXsocGFyZW50SWQsIHBhcmVudFRpdGxlKSA9PiBvcGVuTmV3VGFza01vZGFsKHBhcmVudElkLCBwYXJlbnRUaXRsZSl9XG4gICAgICAgIG9uQXJjaGl2ZVRhc2s9eyh0YXNrSWQsIGZpbGVQYXRoLCBpc1N1YnRhc2spID0+XG4gICAgICAgICAgaGFuZGxlQXJjaGl2ZVRhc2soY3VycmVudFByb2plY3QuZm9sZGVyUGF0aCwgdGFza0lkLCBmaWxlUGF0aCwgaXNTdWJ0YXNrKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIHs6ZWxzZX1cbiAgICAgIDxLYW5iYW5Cb2FyZFxuICAgICAgICB0YXNrcz17Y3VycmVudFRhc2tzfVxuICAgICAgICB7b25PcGVuVGFza31cbiAgICAgICAgb25TdGF0dXNDaGFuZ2U9eyh0YXNrSWQsIG5ld1N0YXR1cykgPT5cbiAgICAgICAgICBoYW5kbGVTdGF0dXNDaGFuZ2UoY3VycmVudFByb2plY3QuZm9sZGVyUGF0aCwgdGFza0lkLCBuZXdTdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgb25BZGRTdWJ0YXNrPXsocGFyZW50SWQsIHBhcmVudFRpdGxlKSA9PiBvcGVuTmV3VGFza01vZGFsKHBhcmVudElkLCBwYXJlbnRUaXRsZSl9XG4gICAgICAgIG9uQXJjaGl2ZVRhc2s9eyh0YXNrSWQsIGZpbGVQYXRoLCBpc1N1YnRhc2spID0+XG4gICAgICAgICAgaGFuZGxlQXJjaGl2ZVRhc2soY3VycmVudFByb2plY3QuZm9sZGVyUGF0aCwgdGFza0lkLCBmaWxlUGF0aCwgaXNTdWJ0YXNrKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIHsvaWZ9XG4gIDwvZGl2PlxuXG4gIDwhLS0g4pSA4pSAIENvbnRleHQ6IGFkZCBzdWJ0YXNrIGZyb20gdGFzayBsaXN0IChyaWdodC1jbGljayAvIGJ1dHRvbikg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAIC0tPlxuICA8IS0tIFRoaXMgaXMgYXZhaWxhYmxlIHZpYSB0aGUgb3Blbk5ld1Rhc2tNb2RhbCBleHBvcnQgLS0+XG48L2Rpdj5cblxuPCEtLSDilIDilIAgVGFzayBDcmVhdGlvbiBNb2RhbCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgLS0+XG57I2lmIHNob3dNb2RhbH1cbiAgPFRhc2tNb2RhbFxuICAgIHBhcmVudElkPXttb2RhbFBhcmVudElkfVxuICAgIHBhcmVudFRpdGxlPXttb2RhbFBhcmVudFRpdGxlfVxuICAgIG9uU3VibWl0PXtoYW5kbGVNb2RhbFN1Ym1pdH1cbiAgICBvbkNhbmNlbD17KCkgPT4gKHNob3dNb2RhbCA9IGZhbHNlKX1cbiAgLz5cbnsvaWZ9XG5cbjxzdHlsZT5cbiAgLnByb2plY3QtdmlldyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gIH1cblxuICAvKiDilIDilIAgVG9wIGJhciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAgKi9cbiAgLnRvcGJhciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTJweDtcbiAgICBwYWRkaW5nOiA4cHggMTRweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cblxuICAudG9wYmFyLWxhYmVsIHtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICB9XG5cbiAgLnByb2plY3Qtc2VsZWN0b3Ige1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBmbGV4OiAxO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC5wcm9qZWN0LXRhYiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIHBhZGRpbmc6IDRweCAxMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDAuODVlbTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xcywgYm9yZGVyLWNvbG9yIDAuMXM7XG4gIH1cblxuICAucHJvamVjdC10YWI6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpO1xuICB9XG5cbiAgLnByb2plY3QtdGFiLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1vbi1hY2NlbnQpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgfVxuXG4gIC5uby1wcm9qZWN0cyB7XG4gICAgZm9udC1zaXplOiAwLjgyZW07XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgfVxuXG4gIC52aWV3LXN3aXRjaGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogNHB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtcHJpbWFyeSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBwYWRkaW5nOiAzcHg7XG4gIH1cblxuICAudmlldy1idG4ge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmc6IDRweCAxMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAwLjg0ZW07XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjFzLCBjb2xvciAwLjFzO1xuICB9XG5cbiAgLnZpZXctYnRuOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1xuICB9XG5cbiAgLnZpZXctYnRuLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1vbi1hY2NlbnQpO1xuICB9XG5cbiAgLnRvcGJhci1hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIH1cblxuICAuYnRuLWFkZCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1vbi1hY2NlbnQpO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogNXB4IDE0cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZm9udC1zaXplOiAwLjg1ZW07XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIC5idG4tYWRkOmhvdmVyIHtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMS4xKTtcbiAgfVxuXG4gIC5idG4tcmVmcmVzaCB7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDEuMWVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC40cztcbiAgfVxuXG4gIC5idG4tcmVmcmVzaDpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3Zlcik7XG4gICAgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcbiAgfVxuXG4gIC5idG4tcmVmcmVzaC5zcGlubmluZyB7XG4gICAgYW5pbWF0aW9uOiBzcGluIDAuNnMgbGluZWFyIGluZmluaXRlO1xuICB9XG5cbiAgLmJ0bi1zeW5jIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA0cHg7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcik7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDRweCAxMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDAuODVlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cywgYm9yZGVyLWNvbG9yIDAuMTVzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cblxuICAuYnRuLXN5bmM6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpO1xuICB9XG5cbiAgLmJ0bi1zeW5jOmRpc2FibGVkIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgb3BhY2l0eTogMC43O1xuICB9XG5cbiAgLmJ0bi1zeW5jLm9rIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItZ3JlZW4sICM0Y2FmNTApO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItZ3JlZW4sICM0Y2FmNTApO1xuICB9XG5cbiAgLmJ0bi1zeW5jLmVycm9yIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcmVkLCAjZTA1MjUyKTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXJlZCwgI2UwNTI1Mik7XG4gIH1cblxuICAuc3luYy1pY29uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAuc3luYy1pY29uLnNwaW5uaW5nIHtcbiAgICBhbmltYXRpb246IHNwaW4gMC44cyBsaW5lYXIgaW5maW5pdGU7XG4gIH1cblxuICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgIHRvICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gIH1cblxuICAvKiDilIDilIAgVmlldyBjb250YWluZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAICovXG4gIC52aWV3LWNvbnRhaW5lciB7XG4gICAgZmxleDogMTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLmVtcHR5LXN0YXRlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAgIGdhcDogMTJweDtcbiAgfVxuXG4gIC5lbXB0eS1pY29uIHtcbiAgICBmb250LXNpemU6IDNlbTtcbiAgfVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IEl0ZW1WaWV3LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgR2FudHRQbHVnaW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCB0eXBlIHsgUHJvamVjdCwgVGFzaywgVGFza1N0YXR1cyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgbG9hZFByb2plY3RzLCBjcmVhdGVUYXNrTm90ZSwgdXBkYXRlVGFza0ZpZWxkLCBhcmNoaXZlVGFzayB9IGZyb20gJy4vdGFza1V0aWxzJztcbmltcG9ydCBQcm9qZWN0VmlldyBmcm9tICcuL2NvbXBvbmVudHMvUHJvamVjdFZpZXcuc3ZlbHRlJztcbmltcG9ydCB7IG1vdW50LCB1bm1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbmltcG9ydCB7IEdhbnR0U3luY1NlcnZpY2UgfSBmcm9tICcuL3N5bmNTZXJ2aWNlJztcbmltcG9ydCB7IFN5bmNDb25mbGljdE1vZGFsIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBHQU5UVF9WSUVXX1RZUEUgPSAnb2JzaWRpYW4tZ2FudHQtdmlldyc7XG5cbmV4cG9ydCBjbGFzcyBHYW50dFZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gIHBsdWdpbjogR2FudHRQbHVnaW47XG4gIHByaXZhdGUgc3ZlbHRlQ29tcG9uZW50OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbCA9IG51bGw7XG4gIC8vIFRoZXNlIGFyZSBrZXB0IGluIHRoZSBUUyBjbGFzcyBzbyB0aGV5IHN1cnZpdmUgdmF1bHQtZXZlbnQgcmVmcmVzaGVzXG4gIHByaXZhdGUgYWN0aXZlUHJvamVjdEluZGV4ID0gMDtcbiAgcHJpdmF0ZSB2aWV3TW9kZTogJ2dhbnR0JyB8ICdrYW5iYW4nID0gJ2dhbnR0JztcbiAgLyoqIFNldCB0cnVlIGR1cmluZyBvdXIgb3duIHZhdWx0IHdyaXRlcyB0byBzdXBwcmVzcyB0aGUgdmF1bHQtZXZlbnQgcmUtcmVuZGVyICovXG4gIHByaXZhdGUgX3dyaXRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IEdhbnR0UGx1Z2luKSB7XG4gICAgc3VwZXIobGVhZik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gR0FOVFRfVklFV19UWVBFOyB9XG4gIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7IHJldHVybiAnUHJvamVjdCBCb2FyZCc7IH1cbiAgZ2V0SWNvbigpOiBzdHJpbmcgeyByZXR1cm4gJ2xheW91dC1kYXNoYm9hcmQnOyB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubW91bnRTdmVsdGUoKTtcblxuICAgIC8vIFRyaWdnZXIgdGhlIGNvbXBvbmVudCdzIG93biByZWZyZXNoIHdoZW4gdmF1bHQgY2hhbmdlcyBoYXBwZW4gZXh0ZXJuYWxseVxuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbignY3JlYXRlJywgKCkgPT4geyBpZiAoIXRoaXMuX3dyaXRpbmcpIHRoaXMudHJpZ2dlckNvbXBvbmVudFJlZnJlc2goKTsgfSkpO1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbignbW9kaWZ5JywgKCkgPT4geyBpZiAoIXRoaXMuX3dyaXRpbmcpIHRoaXMudHJpZ2dlckNvbXBvbmVudFJlZnJlc2goKTsgfSkpO1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbignZGVsZXRlJywgKCkgPT4geyBpZiAoIXRoaXMuX3dyaXRpbmcpIHRoaXMudHJpZ2dlckNvbXBvbmVudFJlZnJlc2goKTsgfSkpO1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbigncmVuYW1lJywgKCkgPT4geyBpZiAoIXRoaXMuX3dyaXRpbmcpIHRoaXMudHJpZ2dlckNvbXBvbmVudFJlZnJlc2goKTsgfSkpO1xuICB9XG5cbiAgYXN5bmMgb25DbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5zdmVsdGVDb21wb25lbnQpIHtcbiAgICAgIHVubW91bnQodGhpcy5zdmVsdGVDb21wb25lbnQpO1xuICAgICAgdGhpcy5zdmVsdGVDb21wb25lbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDYWxsZWQgYnkgdmF1bHQgZXZlbnRzIOKAlCB0ZWxscyB0aGUgU3ZlbHRlIGNvbXBvbmVudCB0byByZWxvYWQgaXRzIG93biBkYXRhICovXG4gIHByaXZhdGUgdHJpZ2dlckNvbXBvbmVudFJlZnJlc2goKSB7XG4gICAgaWYgKHRoaXMuc3ZlbHRlQ29tcG9uZW50Py5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnN2ZWx0ZUNvbXBvbmVudC5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudFN2ZWx0ZSgpIHtcbiAgICBpZiAodGhpcy5zdmVsdGVDb21wb25lbnQpIHJldHVybjsgLy8gYWxyZWFkeSBtb3VudGVkOyBjb21wb25lbnQgbWFuYWdlcyBpdHMgb3duIGRhdGFcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRWwuY2hpbGRyZW5bMV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29udGFpbmVyLmVtcHR5KCk7XG4gICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICB0aGlzLnN2ZWx0ZUNvbXBvbmVudCA9IG1vdW50KFByb2plY3RWaWV3LCB7XG4gICAgICB0YXJnZXQ6IGNvbnRhaW5lcixcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHByb2plY3RzOiBbXSwgICAgICAgICAgLy8gaW5pdGlhbCBlbXB0eTsgY29tcG9uZW50IGxvYWRzIHZpYSBsb2FkUHJvamVjdHNGblxuICAgICAgICBhY3RpdmVQcm9qZWN0SW5kZXg6IHRoaXMuYWN0aXZlUHJvamVjdEluZGV4LFxuICAgICAgICB2aWV3TW9kZTogdGhpcy52aWV3TW9kZSxcbiAgICAgICAgbG9hZFByb2plY3RzRm46ICgpID0+IGxvYWRQcm9qZWN0cyh0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvamVjdHNGb2xkZXIpLFxuICAgICAgICBvbkNyZWF0ZVRhc2s6IHRoaXMuaGFuZGxlQ3JlYXRlVGFzay5iaW5kKHRoaXMpLFxuICAgICAgICBvblN0YXR1c0NoYW5nZTogdGhpcy5oYW5kbGVTdGF0dXNDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgb25EYXRlQ2hhbmdlOiB0aGlzLmhhbmRsZURhdGVDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgb25BcmNoaXZlVGFzazogdGhpcy5oYW5kbGVBcmNoaXZlVGFzay5iaW5kKHRoaXMpLFxuICAgICAgICBvbk9wZW5UYXNrOiB0aGlzLmhhbmRsZU9wZW5UYXNrLmJpbmQodGhpcyksXG4gICAgICAgIG9uVmlld01vZGVDaGFuZ2U6IChtb2RlOiAnZ2FudHQnIHwgJ2thbmJhbicpID0+IHsgdGhpcy52aWV3TW9kZSA9IG1vZGU7IH0sXG4gICAgICAgIG9uQWN0aXZlUHJvamVjdENoYW5nZTogKGlkeDogbnVtYmVyKSA9PiB7IHRoaXMuYWN0aXZlUHJvamVjdEluZGV4ID0gaWR4OyB9LFxuICAgICAgICBvblN5bmM6IHRoaXMuaGFuZGxlU3luYy5iaW5kKHRoaXMpLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIEtpY2sgb2ZmIHRoZSBpbml0aWFsIGRhdGEgbG9hZCBpbnNpZGUgdGhlIGNvbXBvbmVudFxuICAgIHRoaXMudHJpZ2dlckNvbXBvbmVudFJlZnJlc2goKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlT3BlblRhc2soZmlsZVBhdGg6IHN0cmluZykge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRGaWxlQnlQYXRoKGZpbGVQYXRoKTtcbiAgICBpZiAoZmlsZSkgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoZmFsc2UpLm9wZW5GaWxlKGZpbGUpO1xuICB9XG5cbiAgLyoqIENhbGxlZCBieSB0aGUgU3luYyBidXR0b24gaW4gdGhlIHRvb2xiYXIuIFRocm93cyBvbiBlcnJvciBzbyB0aGUgY29tcG9uZW50IGNhbiBzaG93IGl0LiAqL1xuICBwcml2YXRlIGFzeW5jIGhhbmRsZVN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBzeW5jQmFzZVVybCwgc3luY0VtYWlsLCBzeW5jUGFzc3dvcmQgfSA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIGlmICghc3luY0Jhc2VVcmwgfHwgIXN5bmNFbWFpbCB8fCAhc3luY1Bhc3N3b3JkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmZpZ3VyZSBzeW5jIGNyZWRlbnRpYWxzIGluIFNldHRpbmdzIGZpcnN0LicpO1xuICAgIH1cbiAgICBjb25zdCBzdmMgPSBuZXcgR2FudHRTeW5jU2VydmljZShzeW5jQmFzZVVybCwgc3luY0VtYWlsLCBzeW5jUGFzc3dvcmQpO1xuICAgIGF3YWl0IHN2Yy5sb2dpbigpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN2Yy5zeW5jQWxsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlcik7XG4gICAgaWYgKHJlc3VsdC5jb25mbGljdFRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5ldyBTeW5jQ29uZmxpY3RNb2RhbChcbiAgICAgICAgdGhpcy5hcHAsXG4gICAgICAgIHRoaXMucGx1Z2luLFxuICAgICAgICBzdmMsXG4gICAgICAgIHJlc3VsdC5jb25mbGljdFRhc2tzLFxuICAgICAgICAoKSA9PiB0aGlzLnRyaWdnZXJDb21wb25lbnRSZWZyZXNoKCksXG4gICAgICApLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUNyZWF0ZVRhc2soXG4gICAgcHJvamVjdEZvbGRlcjogc3RyaW5nLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgcGFyZW50SWQ6IHN0cmluZyB8IG51bGwsXG4gICAgZXh0cmE6IFBhcnRpYWw8VGFzaz5cbiAgKSB7XG4gICAgdGhpcy5fd3JpdGluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNyZWF0ZVRhc2tOb3RlKHRoaXMuYXBwLCBwcm9qZWN0Rm9sZGVyLCB0aXRsZSwgcGFyZW50SWQsIGV4dHJhKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fd3JpdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBDb21wb25lbnQgd2lsbCBjYWxsIGl0cyBvd24gcmVmcmVzaCBhZnRlciBvbkNyZWF0ZVRhc2sgcmVzb2x2ZXNcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU3RhdHVzQ2hhbmdlKFxuICAgIF9wcm9qZWN0Rm9sZGVyOiBzdHJpbmcsXG4gICAgdGFza0lkOiBzdHJpbmcsXG4gICAgbmV3U3RhdHVzOiBUYXNrU3RhdHVzXG4gICkge1xuICAgIC8vIE5lZWQgYSBzbmFwc2hvdCBvZiBwcm9qZWN0cyB0byBmaW5kIHRoZSBmaWxlIHBhdGguXG4gICAgLy8gV2UgbG9hZCBmcmVzaCBoZXJlIHNvIHdlIGFsd2F5cyBoYXZlIGN1cnJlbnQgZGF0YS5cbiAgICBjb25zdCBwcm9qZWN0cyA9IGF3YWl0IGxvYWRQcm9qZWN0cyh0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvamVjdHNGb2xkZXIpO1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLmZpbmRUYXNrQnlJZChwcm9qZWN0cywgdGFza0lkKTtcbiAgICBpZiAoIXRhc2spIHJldHVybjtcbiAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZUJ5UGF0aCh0YXNrLmZpbGVQYXRoKTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICB0aGlzLl93cml0aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdXBkYXRlVGFza0ZpZWxkKHRoaXMuYXBwLCBmaWxlLCAnc3RhdHVzJywgbmV3U3RhdHVzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fd3JpdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlRGF0ZUNoYW5nZShcbiAgICBfcHJvamVjdEZvbGRlcjogc3RyaW5nLFxuICAgIHRhc2tJZDogc3RyaW5nLFxuICAgIHN0YXJ0RGF0ZTogc3RyaW5nLFxuICAgIGVuZERhdGU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGF3YWl0IGxvYWRQcm9qZWN0cyh0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvamVjdHNGb2xkZXIpO1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLmZpbmRUYXNrQnlJZChwcm9qZWN0cywgdGFza0lkKTtcbiAgICBpZiAoIXRhc2spIHJldHVybjtcbiAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZUJ5UGF0aCh0YXNrLmZpbGVQYXRoKTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICB0aGlzLl93cml0aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdXBkYXRlVGFza0ZpZWxkKHRoaXMuYXBwLCBmaWxlLCAnc3RhcnRfZGF0ZScsIHN0YXJ0RGF0ZSk7XG4gICAgICBhd2FpdCB1cGRhdGVUYXNrRmllbGQodGhpcy5hcHAsIGZpbGUsICdlbmRfZGF0ZScsIGVuZERhdGUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl93cml0aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVBcmNoaXZlVGFzayhcbiAgICBwcm9qZWN0Rm9sZGVyOiBzdHJpbmcsXG4gICAgdGFza0lkOiBzdHJpbmcsXG4gICAgdGFza0ZpbGVQYXRoOiBzdHJpbmcsXG4gICAgaXNTdWJ0YXNrOiBib29sZWFuXG4gICkge1xuICAgIHRoaXMuX3dyaXRpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhcmNoaXZlVGFzayh0aGlzLmFwcCwgdGFza0ZpbGVQYXRoLCB0YXNrSWQsIHByb2plY3RGb2xkZXIsIGlzU3VidGFzayk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3dyaXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRUYXNrQnlJZChwcm9qZWN0czogUHJvamVjdFtdLCBpZDogc3RyaW5nKTogVGFzayB8IG51bGwge1xuICAgIGZvciAoY29uc3QgcHJvaiBvZiBwcm9qZWN0cykge1xuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2oudGFza3MpIHtcbiAgICAgICAgaWYgKHRhc2suaWQgPT09IGlkKSByZXR1cm4gdGFzaztcbiAgICAgICAgZm9yIChjb25zdCBzdWIgb2YgdGFzay5zdWJ0YXNrcykge1xuICAgICAgICAgIGlmIChzdWIuaWQgPT09IGlkKSByZXR1cm4gc3ViIGFzIHVua25vd24gYXMgVGFzaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbW91bnQgfSBmcm9tICdzdmVsdGUnXG5pbXBvcnQgeyBQbHVnaW4sIE5vdGljZSB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgR2FudHRQbHVnaW5TZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgR2FudHRTZXR0aW5nVGFiLCBTeW5jQ29uZmxpY3RNb2RhbCB9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHsgR2FudHRWaWV3LCBHQU5UVF9WSUVXX1RZUEUgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgR2FudHRTeW5jU2VydmljZSB9IGZyb20gJy4vc3luY1NlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW50dFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBHYW50dFBsdWdpblNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HUztcblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBjb21iaW5lZCBHYW50dC9LYW5iYW4gdmlld1xuICAgIHRoaXMucmVnaXN0ZXJWaWV3KEdBTlRUX1ZJRVdfVFlQRSwgKGxlYWYpID0+IG5ldyBHYW50dFZpZXcobGVhZiwgdGhpcykpO1xuXG4gICAgLy8gUmliYm9uIGljb24gdG8gb3BlbiB0aGUgdmlld1xuICAgIHRoaXMuYWRkUmliYm9uSWNvbignbGF5b3V0LWRhc2hib2FyZCcsICdPcGVuIFByb2plY3QgQm9hcmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLmFjdGl2YXRlVmlldygpO1xuICAgIH0pO1xuXG4gICAgLy8gUmliYm9uIGljb24gdG8gc3luY1xuICAgIHRoaXMuYWRkUmliYm9uSWNvbigncmVmcmVzaC1jdycsICdTeW5jIHRhc2tzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzeW5jQmFzZVVybCwgc3luY0VtYWlsLCBzeW5jUGFzc3dvcmQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgICBpZiAoIXN5bmNCYXNlVXJsIHx8ICFzeW5jRW1haWwgfHwgIXN5bmNQYXNzd29yZCkge1xuICAgICAgICBuZXcgTm90aWNlKCfimqDvuI8gIENvbmZpZ3VyZSBzeW5jIGNyZWRlbnRpYWxzIGluIFNldHRpbmdzIGZpcnN0LicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXcgTm90aWNlKCfwn5SEIFN5bmNpbmcgdGFza3PigKYnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN2YyA9IG5ldyBHYW50dFN5bmNTZXJ2aWNlKHN5bmNCYXNlVXJsLCBzeW5jRW1haWwsIHN5bmNQYXNzd29yZCk7XG4gICAgICAgIGF3YWl0IHN2Yy5sb2dpbigpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdmMuc3luY0FsbCh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlcik7XG4gICAgICAgIGNvbnN0IHN1bW1hcnkgPSBg4oaRJHtyZXN1bHQucHVzaGVkfSBwdXNoZWQgIOKGkyR7cmVzdWx0LnB1bGxlZH0gcHVsbGVkICAke3Jlc3VsdC5kZWxldGVkfSBkZWxldGVkYDtcbiAgICAgICAgaWYgKHJlc3VsdC5jb25mbGljdFRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBuZXcgTm90aWNlKGDimqDvuI8gJHtzdW1tYXJ5fSAgJHtyZXN1bHQuY29uZmxpY3RUYXNrcy5sZW5ndGh9IGNvbmZsaWN0KHMpIOKAlCBzZWUgbW9kYWxgKTtcbiAgICAgICAgICBuZXcgU3luY0NvbmZsaWN0TW9kYWwodGhpcy5hcHAsIHRoaXMsIHN2YywgcmVzdWx0LmNvbmZsaWN0VGFza3MsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKEdBTlRUX1ZJRVdfVFlQRSlbMF07XG4gICAgICAgICAgICBpZiAobGVhZikgKGxlYWYudmlldyBhcyBhbnkpLnJlZnJlc2g/LigpO1xuICAgICAgICAgIH0pLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXcgTm90aWNlKGDinIUgJHtzdW1tYXJ5fWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKEdBTlRUX1ZJRVdfVFlQRSlbMF07XG4gICAgICAgIGlmIChsZWFmKSAobGVhZi52aWV3IGFzIGFueSkucmVmcmVzaD8uKCk7XG4gICAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgbmV3IE5vdGljZShg4p2MIFN5bmMgZmFpbGVkOiAke2UubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbW1hbmQgcGFsZXR0ZSBlbnRyeVxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ29wZW4tcHJvamVjdC1ib2FyZCcsXG4gICAgICBuYW1lOiAnT3BlbiBQcm9qZWN0IEJvYXJkJyxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuYWN0aXZhdGVWaWV3KCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ29tbWFuZDogc3luYyB0YXNrc1xuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3N5bmMtdGFza3MnLFxuICAgICAgbmFtZTogJ1N5bmMgdGFza3Mgd2l0aCBzZXJ2ZXInLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBzeW5jQmFzZVVybCwgc3luY0VtYWlsLCBzeW5jUGFzc3dvcmQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgICAgIGlmICghc3luY0Jhc2VVcmwgfHwgIXN5bmNFbWFpbCB8fCAhc3luY1Bhc3N3b3JkKSB7XG4gICAgICAgICAgbmV3IE5vdGljZSgn4pqg77iPICBDb25maWd1cmUgc3luYyBjcmVkZW50aWFscyBpbiBTZXR0aW5ncyBmaXJzdC4nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBzdmMgPSBuZXcgR2FudHRTeW5jU2VydmljZShzeW5jQmFzZVVybCwgc3luY0VtYWlsLCBzeW5jUGFzc3dvcmQpO1xuICAgICAgICAgIGF3YWl0IHN2Yy5sb2dpbigpO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN2Yy5zeW5jQWxsKHRoaXMuYXBwLCB0aGlzLnNldHRpbmdzLnByb2plY3RzRm9sZGVyKTtcbiAgICAgICAgICBjb25zdCBzdW1tYXJ5ID0gYOKGkSR7cmVzdWx0LnB1c2hlZH0gcHVzaGVkICDihpMke3Jlc3VsdC5wdWxsZWR9IHB1bGxlZCAgJHtyZXN1bHQuZGVsZXRlZH0gZGVsZXRlZGA7XG4gICAgICAgICAgaWYgKHJlc3VsdC5jb25mbGljdFRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYOKaoO+4jyAke3N1bW1hcnl9ICAke3Jlc3VsdC5jb25mbGljdFRhc2tzLmxlbmd0aH0gY29uZmxpY3Qocykg4oCUIHNlZSBtb2RhbGApO1xuICAgICAgICAgICAgbmV3IFN5bmNDb25mbGljdE1vZGFsKHRoaXMuYXBwLCB0aGlzLCBzdmMsIHJlc3VsdC5jb25mbGljdFRhc2tzLCAoKSA9PiB7fSkub3BlbigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKGDinIUgJHtzdW1tYXJ5fWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgbmV3IE5vdGljZShg4p2MIFN5bmMgZmFpbGVkOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFNldHRpbmdzIHRhYlxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgR2FudHRTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICAvLyBBdXRvLXN5bmMgb24gc3RhcnR1cCBpZiBjcmVkZW50aWFscyBhcmUgY29uZmlndXJlZFxuICAgIGNvbnN0IHsgc3luY0Jhc2VVcmwsIHN5bmNFbWFpbCwgc3luY1Bhc3N3b3JkIH0gPSB0aGlzLnNldHRpbmdzO1xuICAgIGlmIChzeW5jQmFzZVVybCAmJiBzeW5jRW1haWwgJiYgc3luY1Bhc3N3b3JkKSB7XG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeShhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3ZjID0gbmV3IEdhbnR0U3luY1NlcnZpY2Uoc3luY0Jhc2VVcmwsIHN5bmNFbWFpbCwgc3luY1Bhc3N3b3JkKTtcbiAgICAgICAgICBhd2FpdCBzdmMubG9naW4oKTtcbiAgICAgICAgICBhd2FpdCBzdmMuc3luY0FsbCh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncy5wcm9qZWN0c0ZvbGRlcik7XG4gICAgICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignW0dhbnR0XSBBdXRvLXN5bmMgZmFpbGVkOicsIGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9udW5sb2FkKCkge1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoR0FOVFRfVklFV19UWVBFKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICB9XG5cbiAgYXN5bmMgYWN0aXZhdGVWaWV3KCkge1xuICAgIGNvbnN0IHsgd29ya3NwYWNlIH0gPSB0aGlzLmFwcDtcbiAgICBsZXQgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoR0FOVFRfVklFV19UWVBFKVswXTtcblxuICAgIGlmICghbGVhZikge1xuICAgICAgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWFmKGZhbHNlKTtcbiAgICAgIGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHsgdHlwZTogR0FOVFRfVklFV19UWVBFLCBhY3RpdmU6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgd29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJlZmZlY3QiLCJkZXJpdmVkIiwicm9vdCIsImZsYWdzIiwiY2hpbGQiLCJzb3VyY2UiLCJlLmVmZmVjdF91cGRhdGVfZGVwdGhfZXhjZWVkZWQiLCJlIiwiYm91bmRhcnkiLCJ3LnN2ZWx0ZV9ib3VuZGFyeV9yZXNldF9ub29wIiwiZS5zdmVsdGVfYm91bmRhcnlfcmVzZXRfb25lcnJvciIsImVycm9yIiwicnVuIiwicHJldmlvdXNfYmF0Y2giLCJlLmFzeW5jX2Rlcml2ZWRfb3JwaGFuIiwiZCIsImUuc3RhdGVfdW5zYWZlX211dGF0aW9uIiwidmVyc2lvbiIsInByb3AiLCJlLnN0YXRlX2Rlc2NyaXB0b3JzX2ZpeGVkIiwicyIsInZhbHVlIiwia2V5IiwiZS5zdGF0ZV9wcm90b3R5cGVfZml4ZWQiLCJpcyIsImV2ZW50IiwiZS5lZmZlY3Rfb3JwaGFuIiwiZS5lZmZlY3RfaW5fdW5vd25lZF9kZXJpdmVkIiwiZS5lZmZlY3RfaW5fdGVhcmRvd24iLCJ0ZWFyZG93biIsInNpYmxpbmciLCJpIiwiaW5kZXgiLCJnZXQiLCJjYXB0dXJlIiwidGV4dCIsInVubW91bnQiLCJhbmNob3Jfbm9kZSIsImV2ZW50cyIsIm9mZnNjcmVlbiIsImJyYW5jaCIsImZuIiwic3RhdGUiLCJlLmVhY2hfa2V5X2R1cGxpY2F0ZSIsIml0ZW0iLCJ3LnNlbGVjdF9tdWx0aXBsZV9pbnZhbGlkX3ZhbHVlIiwic2V0IiwiYmF0Y2hlcyIsInByb3BzIiwiZS5wcm9wc19pbnZhbGlkX3ZhbHVlIiwiTW9kYWwiLCJOb3RpY2UiLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIiQucHJvcCIsIiQubXV0YWJsZV9zb3VyY2UiLCJjYXJkcyIsInRhc2tzIiwiJC5zZXQiLCIkLmdldCIsIiQuaW5kZXgiLCIkJGFuY2hvciIsInJvb3RfMSIsIiQuY2hpbGQiLCJyb290XzIiLCJyb290XzMiLCIkLnNldF9zdHlsZSIsIiQudW50cmFjayIsIiQuc2libGluZyIsInJvb3RfNCIsIiQuZWFjaCIsInJvb3RfNSIsInJvb3RfNiIsInJvb3RfNyIsInJvb3RfOCIsIiQuc3RvcFByb3BhZ2F0aW9uIiwiJC5hcHBlbmQiLCIkLnNldF9jbGFzcyIsIiQuZXZlbnQiLCJyb290XzkiLCJleHBhbmRlZCIsIiQubXV0YXRlIiwiJC5kZXJpdmVkX3NhZmVfZXF1YWwiLCIkLnNldF9hdHRyaWJ1dGUiLCIkLnRlbXBsYXRlX2VmZmVjdCIsIiQuc2V0X3RleHQiLCIkLnNlbGYiLCIkLmZpcnN0X2NoaWxkIiwiSXRlbVZpZXciLCJQbHVnaW4iLCJzeW5jQmFzZVVybCIsInN5bmNFbWFpbCIsInN5bmNQYXNzd29yZCIsImxlYWYiXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBQSxNQUFlO0FDRVIsSUFBSSxXQUFXLE1BQU07QUFDckIsSUFBSSxXQUFXLE1BQU0sVUFBVTtBQUMvQixJQUFJLFdBQVcsTUFBTSxVQUFVO0FBQy9CLElBQUksYUFBYSxNQUFNO0FBRXZCLElBQUksa0JBQWtCLE9BQU87QUFDN0IsSUFBSSxpQkFBaUIsT0FBTztBQUM1QixJQUFJLGtCQUFrQixPQUFPO0FBQzdCLElBQUksbUJBQW1CLE9BQU87QUFDOUIsSUFBSSxrQkFBa0IsTUFBTTtBQUM1QixJQUFJLG1CQUFtQixPQUFPO0FBQzlCLElBQUksZ0JBQWdCLE9BQU87QUFXM0IsTUFBTSxPQUFPLE1BQU07QUFBQztBQWVwQixTQUFTLElBQUksSUFBSTtBQUN2QixTQUFPLEdBQUU7QUFDVjtBQUdPLFNBQVMsUUFBUSxLQUFLO0FBQzVCLFdBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLEtBQUs7QUFDcEMsUUFBSSxDQUFDLEVBQUM7QUFBQSxFQUNQO0FBQ0Q7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SSxVQUFVLGNBQWMsWUFBWTtBQUMzQyxZQUFJO0FBQ0YsZ0JBQU0sTUFBTSxJQUFJLGlCQUFpQixhQUFhLFdBQVcsWUFBWTtBQUNyRSxnQkFBTSxJQUFJLE1BQUE7QUFDVixnQkFBTSxJQUFJLFFBQVEsS0FBSyxLQUFLLEtBQUssU0FBUyxjQUFjO0FBQUEsUUFDMUQsU0FBUyxHQUFRO0FBQ2Ysa0JBQVEsS0FBSyw2QkFBNkIsRUFBRSxPQUFPO0FBQUEsUUFDckQ7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBRUEsV0FBVztBQUNULFNBQUssSUFBSSxVQUFVLG1CQUFtQixlQUFlO0FBQUEsRUFDdkQ7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNuQixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUEsR0FBSSxrQkFBa0IsTUFBTSxLQUFLLFVBQVU7QUFBQSxFQUMzRTtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ25CLFVBQU0sS0FBSyxTQUFTLEtBQUssUUFBUTtBQUFBLEVBQ25DO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDbkIsVUFBTSxFQUFFLGNBQWMsS0FBSztBQUMzQixRQUFJLE9BQU8sVUFBVSxnQkFBZ0IsZUFBZSxFQUFFLENBQUM7QUFFdkQsUUFBSSxDQUFDLE1BQU07QUFDVCxhQUFPLFVBQVUsUUFBUSxLQUFLO0FBQzlCLFlBQU0sS0FBSyxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsUUFBUSxNQUFNO0FBQUEsSUFDakU7QUFFQSxjQUFVLFdBQVcsSUFBSTtBQUFBLEVBQzNCO0FBQ0Y7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDUwLDUxLDUyXX0=
