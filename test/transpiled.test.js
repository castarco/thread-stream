'use strict'

const { test } = require('tap')
const { join } = require('path')
const { file } = require('./helper')
const ThreadStream = require('..')

test('transpiled-ts-to-es5', function (t) {
  t.plan(2)

  const dest = file()
  const stream = new ThreadStream({
    filename: join(__dirname, 'ts', 'to-file.es5.js'),
    workerData: { dest },
    sync: true
  })

  // There are arbitrary checks, the important aspect of this test is to ensure
  // that we can properly load the transpiled file into our worker thread.
  t.same(stream.writableEnded, false)
  stream.end()
  t.same(stream.writableEnded, true)
})
