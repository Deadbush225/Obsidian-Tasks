<?php
// Attempt to reset the entire OPcache
if (function_exists('opcache_reset')) {
    opcache_reset();
    echo "OPcache reset successfully.";
} else {
    echo "OPcache function not available.";
}
?>