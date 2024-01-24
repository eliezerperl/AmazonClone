import { Button, Form, FormControl, InputGroup } from '../../../utils/import';

const SearchBox = () => {
  return (
    <Form>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Search for product"
          aria-describedby="btn-search"></FormControl>
        <Button id="btn-search">
          <li className="fa fa-search"></li>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
