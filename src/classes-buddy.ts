type ClassPredicate = Record<string, boolean | (() => boolean)>

type ClassNameBuddyArgs = undefined | string | ClassPredicate

function getConditionals (info: ClassPredicate) {
  return Object.entries(info).reduce<string[]>((acc, [className, predicate]) => {
    if (typeof predicate === 'function') {
      return predicate() ? [...acc, className] : acc
    } else if (predicate) {
      return [...acc, className]
    }
    return acc
  }, [])
}

export function classesBuddy (...args: ClassNameBuddyArgs[]) {
  const classes = []
  for (const arg of args.filter(Boolean)) {
    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (arg !== undefined) {
      classes.push(...getConditionals(arg))
    }
  }
  return classes.join(' ')
}
