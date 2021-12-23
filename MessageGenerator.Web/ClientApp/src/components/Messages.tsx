import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as MessagesStore from '../store/Messages';
import * as SignalR from '@aspnet/signalr';

type MessageProps = MessagesStore.MessagesState
    & typeof MessagesStore.actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;

class Messages extends React.PureComponent<MessageProps> {
  public componentDidMount() {
      this.ensureDataFetched();

      const connection = new SignalR.HubConnectionBuilder().withUrl('/messageHub').build();
      connection.start();
      connection.on('SendMessages', data => {
          this.props.messageReceived(data);
      });
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Messages</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {this.renderMessagesTable()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
      this.props.requestMessages();
  }

    private renderMessagesTable() {
        return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
            <tr>
                <th>Uid</th>
                <th>CreatedDate</th>
                <th>Content</th>
            </tr>
            </thead>
            <tbody>
            {this.props.messages.map((message: MessagesStore.Message) =>
                <tr key={message.uid}>
                    <td>{message.uid}</td>
                    <td>{message.createdDate.toLocaleString()}</td>
                    <td>{message.content}</td>
                </tr>
            )}
            </tbody>
        </table>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.messagesState,
    MessagesStore.actionCreators
)(Messages as any);
