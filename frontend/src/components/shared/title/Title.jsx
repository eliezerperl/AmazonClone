import { PropTypes, Helmet } from '../../../utils/import';

const Title = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

Title.propTypes = { title: PropTypes.string };

export default Title;
