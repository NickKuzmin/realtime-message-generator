import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as MessagesStore from '../store/Messages';

// At runtime, Redux will merge together...
type MessageProps =
    MessagesStore.MessagesState // ... state we've requested from the Redux store
  & typeof MessagesStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class Messages extends React.PureComponent<MessageProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Messages</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {this.renderMessagesTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
      this.props.requestMessages(startDateIndex);
  }

    private renderMessagesTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
                <th>uid</th>
                <th>content</th>
          </tr>
        </thead>
        <tbody>
            {this.props.messages.map((message: MessagesStore.Message) =>
              <tr key={message.uid}>
                  <td>{message.uid}</td>
                  <td>{message.content}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/messages/${prevStartDateIndex}`}>Previous</Link>
        {this.props.isLoading && <span>Loading...</span>}
        <Link className='btn btn-outline-secondary btn-sm' to={`/messages/${nextStartDateIndex}`}>Next</Link>
      </div>
    );
  }
}

export default connect(
    (state: ApplicationState) => state.messagesState, // Selects which state properties are merged into the component's props
    MessagesStore.actionCreators // Selects which action creators are merged into the component's props
)(Messages as any); // eslint-disable-line @typescript-eslint/no-explicit-any
