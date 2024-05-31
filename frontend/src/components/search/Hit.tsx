import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import React from "react";

import { Snippet } from "react-instantsearch-hooks-web";

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    image: string;
    brand: string;
    stripe_metadata_category: string;
  }>;
};

export function Hit({ hit }: HitProps) {
  console.log(hit);
  return (
    <article className="hit">
      <div className="hit-image">
        <img src={hit.image} alt={hit.name} />
      </div>
      <div>
        <h1>
          <Snippet hit={hit} attribute="name" />
        </h1>
        <div>
          By <strong>{hit.brand}</strong> in{" "}
          <strong>{hit.stripe_metadata_category}</strong>
        </div>
      </div>
    </article>
  );
}
