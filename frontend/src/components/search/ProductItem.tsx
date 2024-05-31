import React, { createElement } from "react";

export function ProductItem({ hit, components }) {
  const handleItemClick = () => {
    window.location.replace(
      window.location.origin + "/product/" + hit.objectID
    );
  };
  return (
    <article onClick={handleItemClick} className="hit">
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
