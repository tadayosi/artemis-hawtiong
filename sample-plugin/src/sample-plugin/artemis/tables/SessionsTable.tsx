import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { IAction } from '@patternfly/react-table';
import React, { useState } from 'react'
import { artemisService } from '../artemis-service';
import { Broker } from '../ArtemisTabs.js';
import { ActiveSort, ArtemisTable, Column, Filter } from './ArtemisTable';

export const SessionsTable: React.FunctionComponent<Broker> = broker => {
  const allColumns: Column[] = [
    { id: 'id', name: 'ID', visible: true, sortable: true, filterable: true },
    { id: 'connectionID', name: 'Connection ID', visible: true, sortable: true, filterable: true },
    { id: 'consumerCount', name: 'Consumer Count', visible: true, sortable: true, filterable: true },
    { id: 'producerCount', name: 'Producer Count', visible: true, sortable: true, filterable: true },
    { id: 'user', name: 'User', visible: true, sortable: true, filterable: true },
    { id: 'validatedUser', name: 'Validated User', visible: false, sortable: true, filterable: true },
    { id: 'creationTime', name: 'Creation Time', visible: true, sortable: true, filterable: false }
  ];


  const [showSessionCloseDialog, setShowSessionCloseDialog] = useState(false);
  const [sessionToClose, setSessionToClose] = useState("");
  const [sessionConnection, setSessionConnection] = useState("");
  const [loadData, setLoadData] = useState(0);
  const listSessions = async (page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<any> => {
    const response = await artemisService.getSessions(broker.jolokia, broker.brokerMBeanName, page, perPage, activeSort, filter);
    const data = JSON.parse(response);
    return data;
  }

  const closeSession = () => {
    artemisService.closeSession(broker.jolokia, broker.brokerMBeanName, sessionConnection, sessionToClose);
    setShowSessionCloseDialog(false);
    setLoadData(loadData + 1);
  };

  const getRowActions = (row: any, rowIndex: number): IAction[] => {
    return [
      {
        title: 'close',
        onClick: () => {
          console.log(`clicked on Some action, on row delete ` + row.id);
          setSessionToClose(row.id);
          setSessionConnection(row.connectionID);
          setShowSessionCloseDialog(true);
        }
      }
    ]
  };

  return (
    <><ArtemisTable brokerMBeanName={broker.brokerMBeanName} jolokia={broker.jolokia} allColumns={allColumns} getData={listSessions} storageColumnLocation="sessionsColumnDefs" getRowActions={getRowActions} loadData={loadData} /><Modal
      aria-label='session-close-modal'
      variant={ModalVariant.medium}
      title="Close Session?"
      isOpen={showSessionCloseDialog}
      actions={[
        <Button key="confirm" variant="primary" onClick={() => closeSession()}>
          Confirm
        </Button>,
        <Button key="cancel" variant="secondary" onClick={() => setShowSessionCloseDialog(false)}>
          Cancel
        </Button>
      ]}><p>You are about to close session with id:  <b>{sessionToClose}</b>.</p>
      <p>This operation cannot be undone so please be careful.</p>
    </Modal></>
  )
}