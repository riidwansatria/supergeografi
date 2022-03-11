import * as React from "react"

const ContactForm = () => {
  return (
    <div className="bg-white">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <div class="grid grid-cols-1 md:gap-6 gap-4 pb-12">
          <div class="grid grid-cols-2 md:gap-6 gap-4">
            <input type="hidden" name="form-name" value="contact"></input>
            <div hidden>
              <input name="bot-field" />
            </div>
            <div className="col-span-1">
              <label>
                <input
                  type="text"
                  name="first-name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lemon focus:ring focus:ring-lemon focus:ring-opacity-50"
                  placeholder="First Name"
                />
              </label>
            </div>
            <div className="col-span-1">
              <label>
                <input
                  type="text"
                  name="last-name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lemon focus:ring focus:ring-lemon focus:ring-opacity-50"
                  placeholder="Last Name"
                />
              </label>
            </div>
          </div>
          <div className="col-span-1">
            <label>
              <input
                type="email"
                name="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lemon focus:ring focus:ring-lemon focus:ring-opacity-50"
                placeholder="Email Address"
              />
            </label>
          </div>
          <div class="block">
            <label>
              <textarea
                name="message"
                class="mt-1 block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-lemon focus:ring focus:ring-lemon focus:ring-opacity-50"
                rows="3"
                placeholder="Message"
              ></textarea>
            </label>
          </div>
          <div data-netlify-recaptcha="true"></div>
          <div>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-600 text-white text-sm sm:text-md font-bold py-2 px-4 rounded-md"
            >
              Submit →
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
