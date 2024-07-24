import React, { createElement } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../services/firebase";

export function ProductItem({ hit, components }) {
  console.log(hit);
  const handleItemClick = () => {
    logEvent(analytics, "click_item", {
      items: [
        {
          item_id: hit.objectID,
          price: hit.metadata.price,
          quantity: hit.metadata.quantity,
        },
      ],
    });
    window.location.replace(
      window.location.origin + "/product/" + hit.objectID
    );
  };
  return (
    <article onClick={handleItemClick} className="hit" role="button">
      <div className="hit-image-container">
        <img className="hit-image" src={hit.images[0]} alt={hit.name} />
      </div>
      <div className="hit-content">
        <h1>
          <components.Highlight hit={hit} attribute="name" />
        </h1>
        <div>
          By <strong>{hit.brand}</strong> in{" "}
          <strong>{hit.stripe_metadata_category}</strong>
        </div>
      </div>
    </article>
  );
}
