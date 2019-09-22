import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import * as path from 'path'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import {FileGeneratorService} from '../../src/business/services/file-generator.service'
import injector from '../../src/injector'
import fixtures from '../fixtures'

describe('TemplateService', () => {
  let service: FileGeneratorService

  const templateData = fixtures.getTemplateData()
  const templateFile = fixtures.getTemplateFilePath()

  before(() => {
    injector.snapshot()

    service = injector.get<FileGeneratorService>(BusinessTypes.FileGeneratorService)
  })

  function _deleteFileIfExist(file: string) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should be return path of json file', async () => {
    const outputFile = path.resolve(__dirname, '../resources/data.json')

    const generateFile = await service.generateJson(outputFile, templateData)

    expect(generateFile).not.undefined
    _deleteFileIfExist(outputFile)
  })

  test.it('should generate html json', async () => {
    const outputFile = path.resolve(__dirname, '../resources/data.json')

    const generateFile = await service.generateJson(outputFile, templateData)

    expect(fs.existsSync(generateFile)).is.true
    _deleteFileIfExist(outputFile)
  })

  test.it('should be return path of html file', async () => {
    const outputFile = path.resolve(__dirname, '../resources/template.html')

    const generateFile = await service.generateHtml(templateFile, outputFile, templateData)

    expect(generateFile).not.undefined
    _deleteFileIfExist(outputFile)
  })

  test.it('should generate html file', async () => {
    const outputFile = path.resolve(__dirname, '../resources/template.html')

    const generateFile = await service.generateHtml(templateFile, outputFile, templateData)

    expect(fs.existsSync(generateFile)).is.true
    _deleteFileIfExist(outputFile)
  })

})
