import MapaPrincipal from "./components/MapaPrincipal";

export default function plugin(Vue) {
    if (plugin.installed) {
        return;
    }

    plugin.installed = true;

    Vue.use(MapaPrincipal);
}
