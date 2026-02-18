"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  code: string;
}

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

/* eslint-disable react-hooks/static-components -- MDX component is compiled at build time by Velite and must be instantiated dynamically */
export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={mdxComponents} />;
}
/* eslint-enable react-hooks/static-components */
