
# Optimization
RAW: `3.29mb`
RAW + Uglify: `0.894mb` - works, with treeshaking
RAW + Uglify + gzip: `0.190mb` - works, with treeshaking

DLL + Uglify: `0.939mb` - works, no treeshaking

AOT: `3.3mb` - don't works, no treeshaking
AOT + Uglify: `0.477mb`
AOT + Uglify + gzip: `0.099mb`- works, with treeshaking
 - По прежнему не поддерживает препроцессоры