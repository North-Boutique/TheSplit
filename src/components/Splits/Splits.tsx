import {VStack} from 'native-base';
import React from 'react';
// import useAvaliableData from '../../hooks/useAvailableData';
// import {SplitGroup} from '../../services/types';
// import SwitchHeader from '../Library/Header/SwitchHeader';
import UnderConstruction from '../Library/UnderConstruction/UnderConstruction';
import BottomTabBar from '../Navigation/BottomTabBar';
import {SplitsProps} from './types';

function Split({navigation}: SplitsProps) {
  // const [renderedData, setRenderedData] = useState<SplitGroup>();
  // const [dataToBeChanged, setDataToBeChanged] = useState<boolean>(false);
  // const {savedData} = useAvaliableData();

  // useEffect(() => {
  //   if (savedData) {
  //     setDataToBeChanged(!dataToBeChanged);
  //     setRenderedData(savedData.generatedSplits);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [savedData]);

  return (
    <VStack flex={1} justifyContent="space-between">
      {/* <SwitchHeader renderedData={renderedData} type="Split" /> */}
      <UnderConstruction />
      <BottomTabBar navigation={navigation} active="Splits" />
    </VStack>
  );
}

export default Split;
