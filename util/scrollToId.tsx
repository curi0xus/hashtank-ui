export default function scrollToId(id: string) {
  const elementTop =
    document?.getElementById(id)?.getBoundingClientRect().top || 0;
  const bodyTop = document?.body?.getBoundingClientRect().top || 0;
  const offset = (bodyTop - elementTop) * -1;
  window.scroll(0, offset);
}
