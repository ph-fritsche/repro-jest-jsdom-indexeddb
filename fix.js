global.setImmediate = cb => setTimeout(cb, 0)
global.clearImmediate = handle => clearTimeout(handle)
