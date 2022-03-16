const mapTagsJson = (oldTags) => {
  return oldTags.map((tag) => {
    const newTag = {
      key: tag.name,
      value: tag.name,
      text: tag.name,
    };
    return newTag;
  });
};

export default mapTagsJson