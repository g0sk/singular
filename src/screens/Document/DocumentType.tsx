import React, {useEffect} from 'react';
import {View, Text} from 'components';
import {DocumentTypeStackProps} from 'types';

export const DocumentType: React.FC<DocumentTypeStackProps> = ({route}) => {
  //const [type, setType] = useState<ActiveType | null>(null);

  useEffect(() => {
    return;
  }, [route.params.type]);
  return (
    <View>
      <Text>pepega</Text>
    </View>
  );
};
