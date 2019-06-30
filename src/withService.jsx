import React from "react";

export default function withService(Component, service) {
  return props => <Component {...service} {...props} />;
}
