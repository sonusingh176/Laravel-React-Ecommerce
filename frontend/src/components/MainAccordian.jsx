import { useState } from "react";
import maincategoryData from "../data"; // Your updated data import

const MainAccordion = () => {
  const [maincategory, setMaincategory] = useState(maincategoryData);

  return (
    <div>
      <div className="accordion" id="accordionExample">
        {maincategory.map((el) => (
          <div className="accordion-item" key={el._id}>
            <h2 className="accordion-header" id={`heading${el._id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${el._id}`}
                aria-expanded="true"
                aria-controls={`collapse${el._id}`}
              >
                {el.name}
              </button>
            </h2>
            <div
              id={`collapse${el._id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>Content for {el.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainAccordion;
