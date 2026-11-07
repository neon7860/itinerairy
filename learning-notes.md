# Learning Notes for this repo

## Customising Markdown links

```tsx
<Markdown
  remarkPlugins={[remarkGfm]}
  components={{
    a: ({ node: _node, ...props }) => (
      <a {...props} className="" target="_blank" rel="noopener noreferrer" />
    ),
  }}
>
  {plan}
</Markdown>
```

Render the below in markdown but display URL's in a different way. The 'components' bit is to tell react-markdown to use my custom a tag rather than its default. The ...props represents the info the react-markdown provides for this a html tag. target="\_blank" rel="noopener noreferrer" opens the URL in a new tab rather than the same.
