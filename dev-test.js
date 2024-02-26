const isClosedUnderUnion = sets => {
  const setsAsStrings = sets.map(set => set.join(','));

  const setExists = union => {
    const unionString = Array.from(union).sort().join(',');
    return setsAsStrings.includes(unionString);
  }

  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const union = new Set([...sets[i], ...sets[j]]);

      if (!setExists(union)) {
        return false;
      }
    }
  }

  return true;
}

const isClosedUnderIntersection = sets => {
  const setsAsStrings = new Set(sets.map(set => set.join(',')));

  const setExists = intersection => {
    const key = intersection.join(',');
    return setsAsStrings.has(key);
  }

  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const intersection = sets[i].filter((element) => sets[j].includes(element));

      if (!setExists(intersection)) {
        return false;
      }
    }
  }

  return true;
}

const isTopology = (sets, set) => {
  const containsEmptySet = sets.some(s => s.length === 0);
  const containsSet = sets.some(s => s.join(',') === set.join(','));

  return (
    containsEmptySet &&
    containsSet &&
    isClosedUnderUnion(sets) &&
    isClosedUnderIntersection(sets)
  );
}

const getThePowerSet = set => {
  const subsets = [[]];

  for (let i = 0; i < set.length; i++) {
    const subsetLength = subsets.length;

    for (let j = 0; j < subsetLength; j++) {
      const currentSet = subsets[j];
      const updatedSet = [...currentSet, set[i]];
      subsets.push(updatedSet);
    }
  }

  return subsets;
}

const generateTopologies = set => {
  const initialSet = getThePowerSet(set);
  const possibleTopologies = getThePowerSet(initialSet);

  return possibleTopologies.filter(t => isTopology(t, set)).length;
}

const testArr = [1, 2, 3];

const result = generateTopologies(testArr)

console.log('result', result);