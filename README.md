# NodeJS memory Usage

As a member of the NodeJS Slack group, I see a lot of messages. Someone in the group was complaining that their app slowed down or took too much RAM going from NodeJS 14 to NodeJS 20. They linked the following GitHub issue [NodeJS Issue 4228](https://github.com/nodejs/help/issues/4228).

Personally, I think it's wrong to expect someone to explain to you why your custom code is slower, or takes up a trivially small amount more RAM (10's of MB, not 100's), especially when going 6 major versions into the future; but I am also a curious creature.

## Methodology

In the thread there was a non-working code example; one invitation / plea from the NodeJS team to contribute back; and a bunch of noise with some data in it.

1. Firstly I set about grabbing mentioned versions migrating from.
2. Then I decided rather than compile from source. I'd use `nvm` to install and test node versions.
3. Having installed NodeJS, I wanted to get some output.
4. Once I fixed the script, I decided the output wasn't data, as much as information; so I refactored it to output a single log line of JSON.
5. I wrote a shell script to execute that 1000 times. Not the best, but more statistically significant than a single run.
6. Running the script, I zipped up the logs

Then I had a break. But, perhaps early morning exercise infused, I decided that there were some issues with the test.

<details>
<summary>The script</summary>

```
kill -15 $(pgrep node); rm -f $(node --version).log && for run in {1..100}; do; node index.js >> $(node --version).log & sleep 1 && kill -15 $(pgrep node) >/dev/null; done;
```

</details>

NodeJS isn't for running express. Sure you can do that... But it's for a lot more; so I wanted to see what the base-line was between NodeJS 14 and 20.

## A simpler test

The empty folder is not an empty index.js or NodeJS evaluating a script. Those could be interesting too, but it is as bare minimum as I could expect.

1. I refactored the diretory a little
2. I made a new folder, which I called `empty` (naming is hard)
3. I modified my script to run as this iteration didn't need to kill any processes
4. I uploaded my results.

<details>
<summary>The script</summary>

```
rm -f $(node --version).log && for run in {1..100}; do; node index.js >> $(node --version).log; done;
```

</details>

## Spoilers

Express takes < 64MB RAM in the initial tests in every version of NodeJS. It's not an Operating Systems design language. I think 64MB is great!

CLI with no external dependencies takes < 32 MB RAM in initial tests in every version of NodeJS. And **NodeJS RAM usage is very consistent across the runtimes for this test**

## Purpose

Mostly to regularly commit to my own git; do a bit of public journalling.
To create a place others can PR improvements, challenge methodology via issues.
