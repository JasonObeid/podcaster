function getImage(artworkURI: string, imageURI: string) {
  if (imageURI !== "" && imageURI !== null) {
    return imageURI;
  }
  return artworkURI;
}

export { getImage };
