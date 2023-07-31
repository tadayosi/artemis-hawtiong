import React, { useState } from 'react'
import { Tabs, Tab, TabTitleText, EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import { ProducerTable } from '../producers/ProducerTable';
import { ConsumerTable } from '../consumers/ConsumerTable';
import { ConnectionsTable } from '../connections/ConnectionsTable';
import { SessionsTable } from '../sessions/SessionsTable';
import { AddressesTable } from '../addresses/AddressesTable';
import { QueuesTable } from '../queues/QueuesTable';
import { ArtemisContext, useArtemisTree } from '../context';
import { Status } from '../status/Status';


export type Broker = {
  columnStorageLocation?: string
}

export const ArtemisTabs: React.FunctionComponent = () => {

  const { tree, selectedNode, setSelectedNode, findAndSelectNode } = useArtemisTree();
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);


  const handleTabClick = (event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent, tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <ArtemisContext.Provider value={{ tree, selectedNode, setSelectedNode, findAndSelectNode }}>
      <div>
        <Tabs activeKey={activeTabKey}
          onSelect={handleTabClick}
          aria-label="artemistabs" >
          <Tab eventKey={0} title={<TabTitleText>Status</TabTitleText>} aria-label="connections">
            {activeTabKey === 0 &&
              <Status/>
            }
          </Tab>
          <Tab eventKey={1} title={<TabTitleText>Connections</TabTitleText>} aria-label="connections">
            {activeTabKey === 1 &&
              <ConnectionsTable/>
            }
          </Tab>
          <Tab eventKey={2} title={<TabTitleText>Sessions</TabTitleText>} aria-label="sessions">
            {activeTabKey === 2 &&
              <SessionsTable/>
            }
          </Tab>
          <Tab eventKey={3} title={<TabTitleText>Producers</TabTitleText>} aria-label="producers">
            {activeTabKey === 3 &&
              <ProducerTable/>
            }
          </Tab>
          <Tab eventKey={4} title={<TabTitleText>Consumers</TabTitleText>} aria-label="consumers">
            {activeTabKey === 4 &&
              <ConsumerTable/>
            }
          </Tab>
          <Tab eventKey={5} title={<TabTitleText>Addresses</TabTitleText>} aria-label="addresses">
            {activeTabKey === 5 &&
              <AddressesTable/>
            }
          </Tab>
          <Tab eventKey={6} title={<TabTitleText>Queues</TabTitleText>} aria-label="consumers">
            {activeTabKey === 6 &&
              <QueuesTable/>
            }
          </Tab>
        </Tabs>
      </div>
    </ArtemisContext.Provider>
  )

}
