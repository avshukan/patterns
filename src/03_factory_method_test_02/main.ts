import { Document } from "./document";

import { getFactoryByExtension } from "./getFactoryByExtension";

const extensions = ['.pdf', '.docx', '.txt'];

for (const extension of extensions) {
  const factory = getFactoryByExtension(extension);

  const document: Document = factory.createDocument();

  document.process();
}