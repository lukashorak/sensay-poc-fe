<script>
    import Modal from "sv-bootstrap-modal";
    import { termsAndConditionOpen } from "../../utilities/DataStore";
</script>

<Modal bind:open={$termsAndConditionOpen} dialogClasses="modal-xl">
    <div class="modal-header">
        <h5 class="modal-title">Terms of Service and Privacy Policy</h5>
        <button
            type="button"
            class="close"
            on:click={() => termsAndConditionOpen.update((x) => false)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <h2>Terms of Service</h2>
        Last Updated: January 1, 2021
        <p>
            Thank you for visiting Sensay, a developer of educational AI
            software. By accessing Sensay’s services or products (the
            “Platform”) and selecting to opt-in, you are agreeing to these Terms
            of Service and any amendments thereto. In addition, when using
            particular services owned or operated by Sensay, you will be subject
            to any posted guidelines or rules. All such guidelines and rules are
            hereby incorporated by reference into these Terms of Service.
        </p>
        <h3>General Use of Sensay</h3>
        <p>
            While using the Platform, you must follow (i) any applicable laws
            and regulations, including export and re-export control laws and
            regulations; (ii) any policies made available to you on the
            Platform; and (iii) any agreements between you and Sensay with
            respect to or in connection with the services provided by us.
        </p>
        <p>
            You understand and agree to not misuse the Platform. For example,
            you may not (i) make the service or and materials provided by
            Sensay, such as data, information, documents, products, logos,
            graphics, sounds, images, software, source code, and services
            (collectively, “Materials”) available to anyone other than the user
            registered with and authorized by Sensay; (ii) sell, resell, rent or
            lease any portion of the service; (iii) interfere with or disrupt
            the integrity or performance of the service or third-party content
            provided on the Platform; (iv) attempt to gain unauthorized access
            to the Platform or its related systems or networks; (v) reverse
            engineer any portion of the Platform; (vi) access the Platform in
            order to build a competitive product or service; (vii) access the
            Platform using “bots” or “spiders” or any automated system that
            calls to a service more frequently than may reasonably be performed
            by a human user using a standard web browser; (viii) not interfere
            with the Platform or try to access it using a method other than the
            interface and the instructions that Sensay provides; or (ix) use the
            Platform for any illegal purpose. You must use commercially
            reasonable efforts to prevent any unauthorized access to or use of
            any service or Materials provided by Sensay and promptly notify us
            of any such unauthorized access or use. We may suspend or stop
            providing services to you if you do not comply with our terms or
            policies or if Sensay is investigating suspected misconduct.
        </p>
        <p>
            You agree (i) not to reproduce, duplicate, copy, download, store,
            further transmit, disseminate, transfer, or otherwise exploit the
            Platform; or (ii) not to copy, replicate or “mirror” any Materials
            contained on the Platform, including logos, graphics, sounds or
            images, without the prior written consent from Sensay.
        </p>
        <p>
            As part of your use of the Platform, you may receive access to
            additional data, content, software, or applications subject to
            separate terms. The Platform may display certain content that did
            not originate from Sensay. This content is the sole responsibility
            of the entity that makes it available. We reserve the right to
            suspend or terminate content originated from these entities at any
            time.
        </p>
        <p>
            These Terms of Service will supersede and control over any
            conflicting or additional terms and conditions of any provisions of
            an agreement you may have with Sensay and other previously issued
            Terms of Service. These Terms of Service control the relationship
            between you and Sensay and they do not create any third party
            beneficiary rights. A failure by Sensay to exercise, or any delay in
            exercising, any right or remedy provided under these terms or by law
            shall not constitute a waiver of that or any other right or remedy.
            If any provision of these Terms of Service is held to be invalid or
            unenforceable, the provision will be enforced to the maximum extent
            permissible so as to affect the intent of the parties, and the
            remaining provisions of these terms will remain in force.
        </p>

        <h3>Fees and Payment</h3>
        <p>
            Your subscription to Sensay’s services will continue on a recurring
            monthly or annually basis corresponding to the term of your
            subscription unless and until you cancel your subscription or your
            account is otherwise suspended or discontinued. If you subscribe to
            any service or purchase any Materials, you must provide accurate
            billing and payment information and keep such information
            up-to-date. By accessing Sensay’s services, you are expressly
            agreeing that (i) we are authorized to charge you a periodic
            subscription fee on a recurring basis corresponding to the term of
            your subscription, any other fees for additional services you may
            purchase, and any applicable taxes in connection with your use of
            your subscription; (ii) we may submit charges incurred under your
            account for payment; and (iii) you will be responsible for such
            charges. We may change the price of our services from time to time.
            We will notify you of any price changes and such changes will only
            occur on your next billing cycle.
        </p>

        <h3>Cancellation and Refund</h3>
        <p>
            You can cancel your subscription at any time, and you will continue
            to have access to Sensay’s services through the end of your
            subscription period. You must cancel your subscription before your
            next renewal date in order to avoid the next billing cycle. Due to
            the type of information being licensed and the services provided to
            you, we are unable to accept or offer returns once the subscription
            is activated, services are performed or Materials are purchased. To
            the extent permitted by the applicable law, all payments are
            non-refundable and we do not provide refunds or credits for any
            partial subscription periods.
        </p>

        <h3>Intellectual Property</h3>
        <p>
            All Materials are provided either by Sensay or by third party
            authors, developers and vendors and are protected by intellectual
            property laws. The trademarks, service marks, trade names, logos and
            copyrights appearing on the Platform are trademarks and copyrights
            of Sensay, its affiliates, and/or licensors. Any other use of
            Materials without prior written permission of Sensay is strictly
            prohibited; including but not limited to modifying, copying,
            distributing, transmitting, selling, licensing, creating derivative
            works or using all or any portions of the Materials.
        </p>
        <p>
            Other branded products and names not belonging to Sensay used within
            the Platform and in the Materials are for identification purposes
            only. Sensay disclaims any and all rights in those marks.
        </p>

        <h3>Warranties and Disclaimers</h3>
        <p>
            SENSAY AND ITS SUPPLIERS OR DISTRIBUTORS DO NOT MAKE ANY SPECIFIC
            PROMISES ABOUT THE PLATFORM OR SENSAY’S SERVICES AND MATERIALS. FOR
            EXAMPLE, SENSAY DOES NOT MAKE ANY COMMITMENTS ABOUT THE CONTENT ON
            THE PLATFORM, THE SPECIFIC FUNCTIONS OF THE PLATFORM, OR THEIR
            RELIABILITY, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS. SENSAY
            PROVIDES THE SERVICES AND MATERIALS ON THE PLATFORM “AS IS” AND
            HEREBY DISCLAIMS ALL EXPRESS OR IMPLIED REPRESENTATIONS, WARRANTIES,
            GUARANTIES, AND CONDITIONS, INCLUDING FITNESS FOR A PARTICULAR
            PURPOSE, TITLE AND NON-INFRINGEMENT.
        </p>

        <h3>Limitations of Liability</h3>
        <p>
            While Sensay aims to provide you with an exceptional user
            experience, for a variety of reasons beyond Sensay’s control,
            services may be affected by sudden interruptions and other failures.
            The Platform and Materials require the services and products
            provided by third party providers to operate, such as internet or
            cloud service stability, and hardware device barriers. You
            understand that aforementioned reasons may cause the Platform to be
            unavailable at times.
        </p>
        <p>
            SENSAY AND THIRD PARTY PROVIDERS SHALL NOT BE LIABLE FOR ANY LOST
            PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES OR INDIRECT, SPECIAL,
            CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES SUFFERED AS A RESULT
            OF USING, MODIFYING, CONTRIBUTING, COPYING, DISTRIBUTING, OR
            DOWNLOADING THE MATERIALS, HOWEVER IT ARISES, WHETHER IN AN ACTION
            OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
            IN CONNECTION WITH THE USE OR PERFORMANCE OF INFORMATION AVAILABLE
            FROM A PLATFORM OR SENSAY’S SERVICES, EVEN IF SENSAY HAS BEEN
            PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>
        <p>
            TO THE EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF SENSAY, AND
            ITS SUPPLIERS AND DISTRIBUTORS, FOR ANY CLAIMS IN CONNECTION OF YOUR
            USE OF THE SERVICE, INCLUDING ANY IMPLIED WARRANTIES, IS LIMITED TO
            THE AMOUNT YOU PAID SENSAY TO USE THE SERVICES WITHIN ONE (1) MONTH
            PERIOD OF SUCH CLAIM. SENSAY MAY CHOOSE TO EXTEND YOUR SERVICE
            PERIOD AS A REMEDY. IN ALL CASES, SENSAY, AND ITS SUPPLIERS AND
            DISTRIBUTORS, WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE THAT IS NOT
            REASONABLY FORESEEABLE.
        </p>
        <p>
            UNDER NO CIRCUMSTANCES SHALL SENSAY BE LIABLE FOR ANY LOSS OR
            FAILURE TO PERFORM ITS OBLIGATIONS DUE TO FORCE MAJEURE, INCLUDING
            BUT NOT LIMITED TO LABOR SHORTAGES, STRIKES, RIOTS, ACTS OF GOD,
            FLOODS, LIGHTNING, FIRE, EPIDEMIC, POWER OR COMMUNICATION UTILITY
            INCLUDING INTERNET SHORTAGES, FAILURES, EARTHQUAKES, WAR, OR
            RESTRICTIONS, REGULATIONS, ORDERS IMPOSED BY ANY GOVERNMENT, AGENCY
            OR SUBDIVISION THEREOF.
        </p>

        <h3>Indemnification</h3>
        <p>
            You agree to indemnify, defend and hold harmless Sensay, its
            parents, subsidiaries, and affiliates, and their respective
            officers, directors, employees and agents, from and against any and
            all claims, actions, liabilities, damages, losses, costs, expenses
            and fees (including attorneys’ fees) arising from or related to your
            use of Platform or violation of these Terms of Service. If you are
            using the Platform and Materials on behalf of a business, that
            business accepts these Terms of Service.
        </p>

        <h3>Modifying Terms and Services</h3>
        <p>
            Sensay may from time to time modify these terms or any additional
            terms that apply to Sensay’s services and Materials. Sensay may add
            or remove any functionalities or features, and may suspend or stop a
            service altogether. You may elect to stop Sensay’s services or
            Sensay may stop providing services and Materials to you at any time.
            Sensay will post notices or notify you of modifications and
            additional terms. Changes will not apply retroactively. If you do
            not agree to the modified terms for Sensay’s service and/or
            Materials, you may elect not to opt-in and agree with our Terms of
            Service or discontinue your use.
        </p>

        <h3>Electronic Communications</h3>
        <p>
            Sensay will communicate with you by posting notices on the Platform
            or by sending emails. By accessing the Platforms and opting-in to
            this Terms of Service, you agree that all notices, agreements or
            amendments hereafter or other communications that Sensay provide to
            you electronically satisfy any notice requirements thereof.
        </p>

        <h3>Governing Law and Jurisdiction</h3>
        <p>
            Any disputes arising out of or relating to these Terms of Service or
            Sensay’s services are governed by the laws of the Republic of China
            (Taiwan). You hereby consent to the exclusive jurisdiction of the
            courts of Taipei for any legal disputes. Your submission to the
            jurisdiction of courts of Taipei shall not prejudice Sensay’s right
            to commence action against you in any court of competent
            jurisdiction.
        </p>

        <h3>Questions or Suggestions</h3>
        <p>
            If you have any questions about these terms, please contact Sensay (
            admin@sensay.tw ).
        </p>

        <h2>Privacy Policy</h2>
        Last Updated: January 1, 2021
        <p>
            Sensay respects the privacy of our users and visitors. We understand
            the responsibility and we are committed to protecting the personal
            information that you provide to us. We have therefore established
            this Privacy Policy to help you understand the information we
            collect, how it is being used, and how you can update, delete or
            export your information.
        </p>

        <h3>Information Collection</h3>
        <p>
            To make our services more useful to you and your data more secure,
            we may collect information on individuals that were provided to or
            registered with us, such as names, addresses, phone numbers, email
            addresses, user IDs, and user passwords. The information that we do
            NOT collect are credit card or bank account numbers. Sensay will
            automatically collect and store other information from your
            computer, portable devices and browser, including your IP address,
            cookie information, software and hardware attributes, and also
            information on your searches and browsing history and other
            activities you perform while using our services. We may obtain
            personal information from the company, organization or affiliate
            which you are employed. We may also obtain your personal information
            from other third parties, such as social networks when you grant
            permission for us to access your data when using our services. The
            services may supplement the information described above with
            information we obtain from other sources, including from both online
            and offline data providers, which we treat as protected personal
            information. You may also manage your privacy controls through your
            internet browser. In the event that we collect personal information
            from other third parties, the collecting, processing or using of
            your personal information shall be subjected to this privacy policy.
        </p>

        <h3>Information Use</h3>
        <p>
            Sensay uses the information collected to help better understand your
            needs and interests to enhance your user experience with our
            services. For example, we may use your information to help you
            complete a process or transaction, to communicate with you, to
            deliver products and services to you, to process billing, to provide
            ongoing support, and to offer you relevant resources and content.
            Occasionally we may use your information to contact you to complete
            surveys that we use for marketing and quality assurance purposes. By
            signing up for our services and opting-in to agree to this Privacy
            Policy, you agree to receive emails or other communications from us
            from time-to-time. You will always have the option to opt-out from
            receiving specific communications from us.
        </p>
        <p>
            Sensay may also analyze and compile statistics from the information
            collected to study usage behavior and trends, improve existing
            services, and develop new services. Although our services involve
            only a small amount of data processing of information collected.
            Sensay independently conducts the majority of these data processing
            activities. We may also share these non-personally identifiable
            information with third parties to analyze activities. Such
            information will be in aggregated form and not be personally
            identifiable.
        </p>
        <p>
            To help us improve our products and services, we may disclose and
            transfer your personal information to trusted third-party processors
            and service providers within or outside of the country you are in.
            All third-party processors involved have provided their commitments
            to protect customer’s personal information and have stated their
            compliance with data protection regulations. Whenever in the course
            of sharing information, we will ensure that the information is
            transferred in accordance with this Privacy Policy and as permitted
            by the applicable laws on data protection.
        </p>
        <p>
            Sensay offers our global products and services. We maintain servers
            around the world and information that we collect through one country
            may be transferred to our servers located in another country.
            Security safeguards are in place to facilitate the international
            transfer of such information.
        </p>

        <h3>Information Belonging to You</h3>
        <p>
            With respect to your personally identifiable information (such as
            name, birthday, family, education, occupation, and contact
            information) that you provide to us, you may request for us to
            export, update or delete your personal information. You may also
            request Sensay to send you a copy of, and that we stop the
            collection, process, and use of, the information. We will comply
            with your request and instruction in a timely manner. Sensay may
            also charge a reasonable cost for reviewing or making duplications
            of your personal information.
        </p>
        <p>
            Sensay may ask you to submit a scanned copy of your identification,
            such as student ID cards, membership certificates, etc., for the
            sole purposes of confirming your identity for registration of our
            services. After confirmation, we will systematically delete the copy
            of identification that you have submitted.
        </p>
        <p>
            You have the right not to provide your personally identifiable
            information to Sensay. In such a case, you may be unable to access
            certain product functions and services because certain information
            may be necessary for these products and services to function
            properly. we will maintain and use the personally identifiable
            information that you provide, until such time that you request us to
            remove or stop using such information; or when the purpose of
            collecting, using or processing your personal information under this
            Privacy Policy no longer exists.
        </p>

        <h3>Security</h3>
        <p>
            Sensay is committed to securing the privacy of your personal
            information. All Sensay products and services have strong security
            features and we continuously improve on these features to protect
            your personal information. To protect the privacy of any personal
            information you may have provided, we limit access to your personal
            information to employees that we reasonably believe requires such
            information to provide our services to you. In addition, all Sensay
            employees undergo confidentiality and privacy training.
        </p>

        <h3>Cookies, Logging and Tags</h3>
        <p>
            Like many other commercial products and services, Sensay uses
            standard cookies technology to collect information about how you use
            our product. Cookies are small amounts of data sent to your browser
            from a web server and stored on your computer’s hard drive. Cookies
            can help a website recognize repeat users and allow a website to
            track web usage behavior. Cookies work by assigning a number to the
            user that has no meaning outside of the assigning website. If a
            cookie is placed, thereafter when you visit a website, a message is
            sent back to the web server by the browser accessing the website. We
            also use some cookies to improve our service to you and personalize
            your web-browsing experience.
        </p>
        <p>
            You can set your browser to notify you when you are sent a cookie
            and you may also reject cookies by changing the designated settings
            on your web browser. To navigate through many parts of our platform,
            you do not need to turn on cookies. However, not utilizing cookies
            may prevent you from using certain functions and features.
        </p>

        <h3>Third-party Websites</h3>
        <p>
            Sensay’s products and services may provide links to third-party
            websites for your convenience and information. We do not control
            those websites or their privacy practices, which may differ from
            this Privacy Policy. Once you leave Sensay’s website, you should
            check the applicable privacy policy to determine how such
            third-party websites will handle any information they collect from
            you.
        </p>

        <h3>Modifying the Privacy Policy</h3>
        <p>
            We will review and update this Privacy Policy from time to time and
            will note the date of its most recent revision above. Your privacy
            rights under this Privacy Policy will not be reduced without prior
            notice and explicit consent from you. If we make any substantial
            changes of this Privacy Policy, we will make that information
            available by posting a notice on this site. We encourage you to
            review this Privacy Policy frequently to be informed of how we are
            protecting your information.
        </p>

        <h3>Questions or Suggestions</h3>
        <p>
            If you have questions or concerns about our collection, use, or
            disclosure of your personal information, please contact us here
            ( admin@sensay.tw ).
        </p>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary" on:click={() => termsAndConditionOpen.update((x) => false)}>Close</button>
        </div>
    </div>
</Modal>
