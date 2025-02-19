import { useEffect, useRef, useState } from 'react'
import { languageMap, languageOptions } from '../data/languages'
import { useAppContext } from '../context/AppContext'
import { FaCompressArrowsAlt } from 'react-icons/fa'
import { MdOutlineTranslate } from 'react-icons/md'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import pop from '../assets/pop.mp3'
import splash from '../assets/splash.mp3'

const Message = ({ content, id }) => {
  const [detecting, setDetecting] = useState(false)
  const [detectedLangSymbol, setDetectedLangSymbol] = useState('')
  const [detectedLanguage, setDetectedLanguage] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
  const [translating, setTranslating] = useState(false)
  const { messages } = useAppContext()
  const [translation, setTranslation] = useState('')
  const [summary, setSummary] = useState('')
  const [summarizing, setSummarizing] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(0)
  const transRef = useRef(null)
  const sumRef = useRef(null)

  //   detector
  const detectLanguage = async (text) => {
    setDetecting(true)

    const available = (await ai.languageDetector?.capabilities()).available

    if (available === 'no') {
      toast.error('Sorry, you device does not support language detection')
      setDetecting(false)
      return
    }
    const detector = await ai.languageDetector.create()
    const detectedLanguages = await detector.detect(text)
    setDetectedLangSymbol(detectedLanguages[0].detectedLanguage)
    setDetectedLanguage(languageMap[detectedLanguages[0].detectedLanguage])
    setDetecting(false)
  }

  //   translator
  const translate = async (e) => {
    setTranslating(true)
    const available = (await ai.translator?.capabilities()).available

    if (available === 'no') {
      toast.error('Sorry, you device does not support this')
      return
    }

    let translator = ''
    if (available === 'readily') {
      translator = await ai.translator.create({
        sourceLanguage: detectedLangSymbol,
        targetLanguage: targetLanguage,
      })
    } else {
      setDownloading(true)
      translator = await ai.translator.create({
        sourceLanguage: detectedLangSymbol,
        targetLanguage: targetLanguage,
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            setDownloaded((e.loaded / e.total) * 100)
          })
        },
      })

      setDownloading(false)
      setDownloaded(0)
    }

    const response = await translator.translate(content)
    setTranslation(response)
    setTranslating(false)
    const sound = new Audio(pop)
    sound.play()
  }

  useEffect(() => {
    if (transRef.current) {
      transRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [translation])

  useEffect(() => {
    if (sumRef.current) {
      sumRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [summary])

  const summarize = async () => {
    const options = {
      format: 'plain-text',
      length: 'short',
    }
    const available = (await ai.summarizer.capabilities()).available

    if (available === 'no') {
      toast.error('Sorry, you device does not support this')
      return
    }

    let summarizer = ''
    setSummarizing(true)
    if (available === 'readily') {
      summarizer = await ai.summarizer.create(options)
    } else {
      setDownloading(true)
      summarizer = await ai.summarizer.create(options)
      summarizer.addEventListener('downloadprogress', (e) => {
        setDownloaded((e.loaded / e.total) * 100)
      })
      await summarizer.ready
      setDownloading(false)
      setDownloaded(0)
    }

    const response = await summarizer.summarize(content)
    setSummary(response)
    setSummarizing(false)
    const sound = new Audio(splash)
    sound.play()
  }

  //   detect language every time a message is sent
  useEffect(() => {
    detectLanguage(content)
  }, [messages])

  //   set target language every time detected language changes
  useEffect(() => {
    setTargetLanguage(
      languageOptions.filter((lang) => {
        return lang.label !== detectedLanguage
      })[0].value
    )
  }, [detectedLanguage])

  const handleSelectChange = (e) => {
    setTargetLanguage(e.target.value)
    setTranslation('')
  }

  return (
    <div
      className='w-full flex flex-col gap-1'
      role='article'
      aria-label='Chat message'
    >
      <div className='w-full flex justify-end'>
        <div className='min-w-[250px] max-w-[400px] md:max-w-[600px] flex flex-col gap-1'>
          <div
            className='bg-teal-600 text-white p-2 rounded-md shake whitespace-pre-wrap'
            tabIndex='0'
          >
            {content}
          </div>

          <div className='text-xs flex justify-end gap-2 items-center'>
            <section
              className='bg-orange-500/20 text-orange-700 p-1 rounded'
              aria-live='polite'
            >
              {detecting ? 'detecting...' : detectedLanguage}
            </section>

            {content.length > 150 && detectedLanguage == 'English' && (
              <button
                className='flex gap-1 justify-center items-center hover:bg-green-600/35 px-2 py-1 rounded text-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none'
                onClick={summarize}
                disabled={summarizing || downloading}
                aria-label='Summarize message'
              >
                <FaCompressArrowsAlt />{' '}
                {summarizing ? 'Summarizing...' : 'Summarize'}
              </button>
            )}
            <section className='flex items-center'>
              {/* The visually hidden label associates the select with its purpose */}
              <label htmlFor={`target-language-${id}`} className='sr-only'>
                Select target language for translation
              </label>
              <span className='text-[10px]'>Translate to:</span>
              <select
                className='bg-black/0 focus:outline-none text-teal-800'
                onChange={handleSelectChange}
                id={`target-language-${id}`}
                aria-label='Select target language'
              >
                {languageOptions
                  .filter((language) => {
                    return language.label !== detectedLanguage
                  })
                  .map((language) => {
                    return (
                      <option key={language.value} value={language.value}>
                        {language.label}
                      </option>
                    )
                  })}
              </select>
              <button
                className={clsx(
                  'flex gap-1 justify-center items-center hover:bg-blue-600/35 px-2 py-1 rounded text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none'
                )}
                onClick={translate}
                disabled={translating}
                aria-label='Translate message'
              >
                <MdOutlineTranslate />{' '}
                {translating ? 'Translating...' : 'Translate'}
              </button>
            </section>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-start'>
        <div className='min-w-[250px] max-w-[400px] md:max-w-[600px] flex flex-col gap-2'>
          {translation && (
            <div
              className='bg-blue-500 p-2 rounded-md shake'
              ref={transRef}
              aria-live='polite'
            >
              <span className='text-xs text-red-900 bg-red-800/15 px-1 py-0.5 rounded'>
                Translated to {languageMap[targetLanguage]}
              </span>
              <p className='text-white'>{translation}</p>
            </div>
          )}

          {summary && (
            <div
              className='bg-green-600 p-2 rounded-md shake'
              ref={sumRef}
              aria-live='polite'
            >
              <span className='text-xs text-red-900 bg-red-800/15 px-1 py-0.5 rounded'>
                Summary
              </span>
              <ReactMarkdown className='text-white'>{summary}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {downloading && (
        <div
          className='w-fit px-5 py-1 bg-orange-600 text-white text-sm absolute left-0 right-0 top-2 m-auto shadow-2xl flex flex-col justify-center items-center rounded-md'
          role='progressbar'
          aria-valuemin='0'
          aria-valuemax='100'
          aria-valuenow={downloaded}
        >
          <p>Downloading AI</p>
          <p>{downloaded}% downloaded</p>
        </div>
      )}
    </div>
  )
}

export default Message
