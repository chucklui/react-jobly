import { useState } from "react"

/** SearchForm 
 * 
 * props: handleSearch() sets the form data
 * state: formData => {query}
 * 
 * JobList, CompanyList => SearchForm
 */
function SearchForm({ handleSearch }) {
  const initialState = {
    query: ""
  }
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(formData);
    setFormData(initialState);
  }

  return (
      <form className="SearchForm d-flex m-3" onSubmit={handleSubmit}>
        <input className="SearchForm-input form-control me-sm-2"
          type="search"
          placeholder="Enter Search Term"
          onChange={handleChange}
          name="query"
          value={formData.query} />
        <button className="SearchForm-button btn btn-secondary my-2 my-sm-0">Submit</button>
      </form>
  )
}

export default SearchForm;