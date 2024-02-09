export default function deleteObjectsWithParentIndex(
  arrOfObjects,
  parentIndexes
) {
  let virtualArr = [...arrOfObjects];

  arrOfObjects.forEach((obj) => {
    if (parentIndexes.includes(obj.parentIndex)) {
      virtualArr = virtualArr.filter((o) => o.parentIndex !== obj.parentIndex);
    }
  });

  return virtualArr;
}
