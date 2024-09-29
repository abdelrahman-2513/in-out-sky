function ButtonsComponent() {
  const [nfc, setNfc] = useState("");
  const handleChangeNfC = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="secondry-container">
      <div className="input-field">
        <label htmlFor="nfc-id">Employee ID</label>
        <input
          type="text"
          name="nfc-id"
          id="nfc"
          className="input-text"
          autoFocus={true}
          onChange={handleChangeNfC}
          value={nfc}
        />
      </div>
    </div>
  );
}

export default ButtonsComponent;
