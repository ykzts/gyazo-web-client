import Fluxible from 'fluxible';
import ApplicationComponent from './components/ApplicationComponent';
import RouteStore from './stores/RouteStore';
import ErrorStore from './stores/ErrorStore';
import AlertStore from './stores/AlertStore';
import GyazoServiceStore from './stores/GyazoServiceStore';
import UploadImageStore from './stores/UploadImageStore';
import ImageStore from './stores/ImageStore';

let application = new Fluxible({
  component: ApplicationComponent,
  stores: [
    RouteStore,
    ErrorStore,
    AlertStore,
    GyazoServiceStore,
    UploadImageStore,
    ImageStore
  ]
});

export default application;
