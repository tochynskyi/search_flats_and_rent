const getUserInitials = (user: firebase.default.User): string => {
  if (user.displayName) {
    const initials = user.displayName
      .trim()
      .split(' ')
      .map((name: string) => name[0])
      .splice(0, 2)
      .join('');
    return initials;
  }
  return 'U';
};

export default getUserInitials;
