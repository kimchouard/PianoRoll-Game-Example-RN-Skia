import LaggyShapesTranslation from './LaggyShapesTranslation';
import PlayingUI from './PlayingUI';

export default function WithSkia({interfaceType}:{interfaceType: 'index' | 'PlayingUI'}) {
  return (interfaceType === 'index') ? <LaggyShapesTranslation /> : <PlayingUI />;
}