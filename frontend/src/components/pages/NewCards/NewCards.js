import FormCards from '../../common/FormCards/FormCards';

const NewCards = props => {
  const { loggedInUser } = props;

  return (
    <div className="row mt-5">
      <h2>Kártyacsomag létrehozása</h2>
      <FormCards type="new" loggedInUser={loggedInUser} />;
    </div>
  );
};

export default NewCards;
