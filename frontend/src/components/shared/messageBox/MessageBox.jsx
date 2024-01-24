import { PropTypes } from '../../../utils/import';
import { Alert } from '../../../utils/import';

const MessageBox = ({ variant, children }) => {
  return <Alert variant={variant || 'info'}>{children}</Alert>;
};
MessageBox.propTypes = { variant: PropTypes.string, children: PropTypes.node };
export default MessageBox;
