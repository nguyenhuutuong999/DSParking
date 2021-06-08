import React from "react";
import { Tabs } from "antd";

import { Text } from '../../../components/styles';

import * as Style from './styles'

function Setting() {
  return (
    <Style.SettingContainer>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="System Setting" key="1">
          <Style.SettingContent>
            <Text>Coming soon...</Text>
          </Style.SettingContent>
        </Tabs.TabPane>
      </Tabs>
    </Style.SettingContainer>
  );
}
export default Setting;
