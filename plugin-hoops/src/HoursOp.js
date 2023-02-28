import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { View} from '@twilio/flex-ui';
import CustomView from './CustomView';
import CustomSideBarButton from './CustomSidebarButton';


const PLUGIN_NAME = 'HoopsPlugin';

export default class HoopsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.SideNav.Content.add(
        <CustomSideBarButton key= "custom-view-button" />
    )

    flex.ViewCollection.Content.add(
        <View name="custom-view" key="cutom-view">
            <CustomView />
        </View>
    )
   ;
      }
};


