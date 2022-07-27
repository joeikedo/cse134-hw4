- Added Google analytics script tag to head of `index.html`. The script tag contents are the following: 

```
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VKRN8VQCLK"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-VKRN8VQCLK');
    </script>
```

Google analytics gives me some helpful insights regarding the traffic I get on my website. It lets me see how many visitors I'm getting, where they are geographically, and also what sort of devices they are using to acces my site. It also gives some demographic insights as well about the visitors to the site. Realtime engagement metrics and events are available as well. These insights can help me make some decisions about the contents of my site, demographics I can try appealing to, and maybe also help me choose platforms I can focus on more. For instance, if a significant portion of visitors are on mobile, I may want to spend more time on the mobile UI and such. 

