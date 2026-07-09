const ComplaintCreatePage = () => {
  return (
    <div>
      <h1>Create Complaint</h1>
      <form>
        <table>
          <tr>
            <td>
              <label for="model">Model</label>
            </td>
            <td>
              <input type="text" name="model" value="" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="model">Brand</label>
            </td>
            <td>
              <input type="text" name="brand" value="" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="case">case</label>
            </td>
            <td>
              <input type="text" name="case" value="" />
            </td>
          </tr>
          <tr>
            <input type="submit" name="" value="Register" />
          </tr>
        </table>
      </form>
    </div>
  );
};

export default ComplaintCreatePage;
