import assert from 'assert'
import {spawn} from 'child_process'
import path from 'path'
import mkdirp from 'mkdirp'
import resolve from 'resolve'
import rimraf from 'rimraf'

const targets = [
	'browserify',
	'express',
	'karma',
	'bower',
	'cordova',
	'coffee-script',
	'gulp',
	'forever',
	'grunt',
	'less',
	'tape'
]

const buildTargets = [
	'dtrace-provider'
]

const base = path.join(__dirname, '../../.tmp/test')
const ied = path.join(__dirname, '../../lib/cmd')

describe('e2e', () => {
	targets.forEach((target) => {
		describe(`ied install ${target}`, function () {
			const cwd = path.join(base, target)
			this.timeout(60 * 1000)

			before((done) => {
				rimraf(cwd, done)
			})

			before((done) => {
				mkdirp(cwd, done)
			})

			before((done) => {
				spawn('node', [ied, 'install', target], {
					cwd,
					stdio: 'inherit'
				})
					.on('error', done)
					.on('close', (code) => {
						assert.equal(code, 0)
						done()
					})
			})

			it(`should make ${target} require\'able`, (done) => {
				resolve(target, {basedir: cwd}, (err, res) => {
					assert.ifError(err)
					assert.notEqual(res.indexOf(cwd), -1)
					require(res)
					done()
				})
			})
		})
	})
	buildTargets.forEach((target) => {
		describe(`ied install ${buildTargets} --build`, function () {
			const cwd = path.join(base, target)
			this.timeout(60 * 1000)

			before((done) => {
				rimraf(cwd, done)
			})

			before((done) => {
				mkdirp(cwd, done)
			})

			before((done) => {
				spawn('node', [ied, 'install', '--build', target], {
					cwd,
					stdio: 'inherit'
				})
					.on('error', done)
					.on('close', (code) => {
						assert.equal(code, 0)
						done()
					})
			})

			it(`should make ${target} require\'able`, (done) => {
				resolve(target, {basedir: cwd}, (err, res) => {
					assert.ifError(err)
					assert.notEqual(res.indexOf(cwd), -1)
					require(res)
					done()
				})
			})
		})
	})
})
