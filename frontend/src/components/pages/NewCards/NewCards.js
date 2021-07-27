import FormCards from '../../common/FormCards/FormCards';

const NewCards = props => {
  const { loggedInUser } = props;

  return <FormCards type="new" loggedInUser={loggedInUser} />;
};

export default NewCards;
