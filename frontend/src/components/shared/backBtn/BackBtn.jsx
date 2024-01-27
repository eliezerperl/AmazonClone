import { useNavigate } from '../../../utils/import';
import './BackBtn.css';

const BackBtn = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return (
    <div className="d-flex align-items-center">
      <i onClick={back} className="fa fa-arrow-left text-white back-btn"></i>
    </div>
  );
};

export default BackBtn;
