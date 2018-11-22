<template>
    <article>
        <header>
            <h2>Hi, and welcome!</h2>
        </header>
        <p>I'm Alex, software engineer working in and around Amsterdam, and this is my website.</p>
        <p>
            My work is mostly web development, full-stack, with a crush on Javascript. Meaning that I do most things in Javascript.
        </p>
        <p>
            Some people call that frontend development. :-)
        </p>
        <p>
            If you're interested in how I work, <a href="https://github.com/acazacu/nvent" title="github.com/acazacu/nvent" target="_blank">check out the github repo</a> that runs this website.
        </p>
        <p>
            About this website, it is <a href="http://vue.js" title="vuejs" target="_blank">a vuejs app</a> running in your browser and talking to serverless architecture deployed into AWS.
        </p>
        <p>
            Not to brag, it was distributed to you by Cloudfront after having been deployed to S3 via a private CD pipeline.
            More on that, in the github repo.
        </p>
    </article>
</template>
<style scoped lang="scss">
    article {
        font-size: 12px;
    }
    h2 {
        font-size: 16px;
    }
    p {
        color: #333;
        margin: 16px 0 8px 0;
    }
</style>