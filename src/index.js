export default function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
}
