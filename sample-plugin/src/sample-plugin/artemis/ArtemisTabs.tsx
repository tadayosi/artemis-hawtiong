import React, { useEffect, useState } from 'react'
import { Text, PageSection, TextContent, PageSectionVariants, Tabs, Tab, TabTitleText, EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import DisconnectedIcon from '@patternfly/react-icons/dist/esm/icons/disconnected-icon';
import { IJolokia } from 'jolokia.js';
import { BrokerConnection, brokerService } from './brokers/brokers-service';
import { ProducerTable } from './tables/ProducerTable';
import { ConsumerTable } from './tables/ConsumerTable';
import { ConnectionsTable } from './tables/ConnectionsTable';
import { SessionsTable } from './tables/SessionsTable';
import { AddressesTable } from './tables/AddressesTable';
import { QueuesTable } from './tables/QueuesTable';
import { log } from './globals';
import { IJolokiaService, jolokiaService } from '@hawtio/react';


export type Broker = {
  brokerMBeanName: string,
  loaded: boolean,
  jolokia: IJolokiaService
}

export const ArtemisTabs: React.FunctionComponent<BrokerConnection> = (connection: BrokerConnection) => {

  const [brokerJolokiaService, setBrokerJolokiaService] = useState<IJolokiaService>(jolokiaService);

  const [activeTabKey, setActiveTabKey] = useState<string | number>(1);

  useEffect(() => {
    log.info("rendered Artemis");

    const buildJolokiaService = async () => {
      var jolokiaURL = await brokerJolokiaService.getJolokiaUrl();
      var embedded: boolean = await jolokiaURL != null;
      log.info(jolokiaURL+ " embedded=" + embedded)
      if (!embedded)
        setBrokerJolokiaService(brokerService.createJolokiaService(connection.connection));
    }   
    buildJolokiaService();
  }, [activeTabKey, brokerJolokiaService])

  const handleTabClick = ( event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent, tabIndex: string | number
  ) => {
    log.info("setActiveTabKey Artemis:" + tabIndex);
    setActiveTabKey(tabIndex);
  };


  if (!connection.brokerDetails.updated) 
    return (
      <React.Fragment>
        <EmptyState>
          <EmptyStateIcon icon={DisconnectedIcon} />
            <Title headingLevel="h4" size="lg">Not Connected</Title>
          <EmptyStateBody>Please check the connection configuration and the Jolokia endpoint configuration</EmptyStateBody>
        </EmptyState>
      </React.Fragment>
    )
  
  return (
    <div>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">{connection.connection.name}</Text>
        </TextContent>
      </PageSection>
      <Tabs activeKey={activeTabKey}
            onSelect={handleTabClick} 
            aria-label="artemistabs" >
        <Tab eventKey={0} title={<TabTitleText>Connections</TabTitleText>} aria-label="connections">
        {activeTabKey === 0 &&
          <ConnectionsTable brokerMBeanName={connection.brokerDetails.brokerMBean} loaded={true} jolokia={brokerJolokiaService}/>
        }
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Sessions</TabTitleText>} aria-label="sessions">
          {activeTabKey === 1 &&
            <SessionsTable brokerMBeanName={connection.brokerDetails.brokerMBean} loaded={true} jolokia={brokerJolokiaService}/>
          }
        </Tab>
        <Tab eventKey={2} title={<TabTitleText>Producers</TabTitleText>} aria-label="producers">
        {activeTabKey === 2 &&
          <ProducerTable brokerMBeanName={connection.brokerDetails.brokerMBean} loaded={true} jolokia={brokerJolokiaService}/>
        }
        </Tab>
        <Tab eventKey={3} title={<TabTitleText>Consumers</TabTitleText>} aria-label="consumers">
        {activeTabKey === 3 &&
          <ConsumerTable brokerMBeanName={connection.brokerDetails.brokerMBean} loaded={true} jolokia={brokerJolokiaService}/>
        }
        </Tab>
        <Tab eventKey={4} title={<TabTitleText>Addresses</TabTitleText>} aria-label="addresses">
        {activeTabKey === 4 &&
          <AddressesTable brokerMBeanName={connection.brokerDetails.brokerMBean} loaded={true} jolokia={brokerJolokiaService}/>
        }
        </Tab>
        <Tab eventKey={5} title={<TabTitleText>Queues</TabTitleText>} aria-label="consumers">
        {activeTabKey === 5 &&
          <QueuesTable brokerMBeanName={connection.brokerDetails.brokerMBean} loaded={true} jolokia={brokerJolokiaService}/>
        }
        </Tab>
      </Tabs> 
    </div>
  )

}
