/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Header } from '../../common/Header';
import { OVButton } from '../../components/OVButton';
import OVText, {
    bold,
    medium,
    poppinsBold,
    poppinsLight,
    poppinsMedium,
    poppinsSemiBold,
    small,
} from '../../components/OVText';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_100,
    GRAY_800,
    GREEN_COLOR,
    WHITE,
    YELLOW,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const LegalInformation = props => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Legal Information"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Vet Consultation, Grooming &amp; Spa, Pet Training, Pet Boarding, Vaccination, any service is
                        a Service provided on the Digital Platform offered by Just For Pet that allows Users, pet care
                        service providers to Avail &amp; perform services, on paid mode. Further, Users may access this
                        feature on Just For Pet App to get assigned, for the purposes of consultation, to a Vet
                        Consultant whereby such Vet Consultants are inter alia assigned through the system’s
                        algorithm/software-program that finds the most available and accepting Vet Consultant. The
                        scope of this feature as detailed herein is collectively referred to as “consult” / “appointment”.
                        {'\n'}{'\n'}{'\n'}
                        All the terms used in this Policy shall have the same meaning as assigned to them in the Terms
                        and Services of Just For Pet, unless otherwise defined herein.
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        1. BOOKING POLICY
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Vet Online Consultation
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        a. Users can log in to the website or app and then select the option to get online Vet
                        consultation{'\n'}
                        b. Upon opting for the same, User shall get the options of all the Vets listed on Just For Pet.
                        User can also see the profile of each Vet Consultants, their available time slots and their fees.
                        c. User needs to select the Vet Consultant and the time slot when he wants to have a video
                        consultancy.{'\n'}
                        d. Every time slot for consultancy is 15 minutes. However, the chat facility shall be made
                        available half an hour before the time slot begins. User can send his query and share medical
                        records saved in the profile of his/her pet over this chat facility so that the Vet consultant can
                        have access to it before the call begins.
                        e. Only the Vet Consultant shall have an access to call the User during the allocated time
                        slot.{'\n'}
                        f. If the User misses his call from the Vet, he can then send a message to the Vet to call
                        him/her back. The Vet shall call him back if the slot for consultancy is still open.
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Vet Appointment Booking
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        a. Users can login to the app/website and select the option to book a vet appointment.
                        b. Upon opting for the same, User shall be shown the list of veterinary clinics &amp; vets
                        registered on our platform. User can see the profile of each vet, their veterinary council
                        registration number, Available time slots, fees.{'\n'}
                        {'\n'}
                        c. User has to select the veterinarian and time slot of his desired date and time. The
                        app/website also provides a vet consultation to doorstep service. If a veterinarian does
                        doorstep consultation service, a user can select consultation at doorstep option if they
                        want the veterinarian to come and provide them service at their doorstep. However, not
                        every veterinarian registered on the platform will provide doorstep service.{'\n'}
                        d. The booking of vet consultation does not imply that the consultation would necessarily
                        go for a certain period of time. It is Veterinarian’s wish &amp; purview to decide on
                        consultation duration based on his expertise and the problem of the pet.{'\n'}
                        e. After selecting a veterinarian, Date &amp; Time, a user has to make the payment and finish
                        the appointment booking process.{'\n'}
                        f. However, the chat facility shall be made available half an hour before the time slot
                        begins. User can send his query and share medical records saved in the profile of
                        his/her pet over this chat facility so that the Vet consultant can have access to it before
                        the call begins.
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Grooming &amp; Spa Service
                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        1. Vendor/Service Provider No Show Policy:
                    </OVText>

                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        a.	 Users can login to the app/website and select the option to book Grooming, bathing & Spa services for their pet.{'\n'}
                        b.	 Upon opting for the same, User shall be shown the list of Grooming parlours & groomers registered on our platform. User can see the profile of each groomer, pictures, distance, ratings, pricing for different types of services they provide.{'\n'}
                        c.	User has to select a groomer and time slot of his desired date and time. The app/website also provides grooming & spa services to doorstep. If a groomer does doorstep consultation service, a user can select consultation at doorstep option if they want the groomer to come and provide them service at their doorstep. However, not every groomer registered on the platform will provide doorstep service.{'\n'}
                        d.	A user has to select the categories of services he wants, enter a few details required by us such as: 1) How aggressive is your dog 2) size of your dog 3) Fur length. We take these details to arrive at a precise price. Please note that these parameters are also important to give you the exact pricing. Based on the details you enter, the price is calculated. The user after selecting time & date has to click on the request appointment. The order will be confirmed by the groomer and if there is any price update, the groomer will send the updated price. The user if satisfied with the updated price can confirm the order and pay the amount post which the appointment is fixed. However, if the user is not willing for the price updated, he can request for a negotiation and enter his desired price. If the groomer is willing to provide service at your quoted price he will update the price to your requested amount else there would be no change in the price quoted to you. You can cancel order if you wish to not pay the amount quoted, if you are willing to take service at the quoted price, the amount has to be paid and the order will be confirmed


                    </OVText>

                    <OVText
                        size={bold}
                        fontType={poppinsSemiBold}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        Vaccination
                    </OVText>


                    <OVText
                        size={medium}
                        fontType={poppinsLight}
                        color={GRAY_800}
                        style={{
                            paddingVertical: 14,
                            paddingStart: 10,
                        }}>
                        a.	  Users can login to the app/website and select the option to book a vaccination appointment
                        b.	 Upon opting for the same, User shall be shown the list of veterinary clinics registered on our platform. User can see the profile of each Clinic,Address, Available time slots, types of vaccinations available and the pricing for each type of vaccination
                        c.	The platform provides a facility to avail doorstep vaccination for the user. However, it is upto the discretion of the clinic whether they do doorstep service or not. However, Doorstep booking option is enabled only for clinics which provide doorstep service
                        d.	After selecting a Veterinary Clinic, Date & Time, type of vaccination, At clinic / at doorstep option a user has to make the payment and finish the appointment booking process

                        Pet insurance
                        a.	 Users can login to the app or website and select the option to book an insurance policy.
                        b.	 opting for the same the user shall be shown an insurance page In which has two input data required by us to give a quotation on the insurance premium.
                        c.	 However, just for pet does not provide insurance by itself. The insurance is provided by a third party company and all the matters with respect to insurance are dealt by them

                        Pet Training
                        a.	  Users can login to the app or website and select the option to book a pet trainer / behaviorist.
                        b.	 Upon opting for the same, User shall be shown the list of PetTrainers/Behaviorists registered on our platform. User can see the profile of eachTrainer,Address, Available training methods, pricing of each training type
                        c.	The platform provides a facility to avail doorstep training for the user. However, it is upto the discretion of the trainer whether he/she wants to do doorstep service or not. However, Doorstep booking option is enabled only for trainers who provide doorstep service
                        d.	A user has to select the categories of services he wants, enter a few details required us such as: category of training, location of training and schedule a video consultation with the trainer by pickling a Date & Time.
                        e.	Post the video consultation, the trainer decides and tells how many hours of training is required and the price to train. The user gets the updated details in his account, If the user is satisfied with price he can confirm the service by paying the amount updated
                        Pet Boarding
                        a.	Users can login to the app/website and select the option to book Pet Boarding services.
                        b.	Upon opting for the same, User will be shown the list of boarding centers registered with our platform. User can see the profile of each boarding center, Pictures, Price range, Amenities they have, Food options they have, Pick up & drop facility.  These give us approximate price calculation parameters. However, the exact price will be updated by the service provider upon receiving the boarding request only.
                        c.	The user has to select what type of accommodation they want for their pet, food it needs, pick up & drop option if the boarding center provides so. The user also has to choose the dates for check in and check out of the pet.
                        d.	A request for boarding goes to the Boarding center, they go through the details of order and updates the exact price for the order. If the user wishes to confirm the order after price updation, he can do so by paying the amount and confirming the order. If the customer wants the price to be reconsidered, he can negotiate the price and if the boarding center accepts the price, the user can complete order booking by completing the payment.
                        Fresh Pet Food:
                        a.	 Users can login to the app/website and select the option to order fresh pet food delivery.
                        b.	Upon opting for the same, User shall be shown the list of kitchen delivering pet food registered on our platform. User can see the profile of each Kitchen ,Address, Available timings, Food products available and price of each product.
                        c.	The user is provided with two options: 1) subscription Meal 2) regular Menu. Subscription Meal option gives a facility to the user to get pet food delivered at their doorstep everyday. Regular Menu products are one time purchase food products. However on demand i.e regular menu products are available only till a certain radius from the kitchen. The user has to place the order at least an hour before to get the food. This is because of the low number of pet food kitchens in the city and their geographical presence. Subscription meal has to be subscribed at least one day before the date from which you wish to get the meal delivered.
                        d.	The user selects the food product, selects the date & time slot or if he wishes to get delivery ASAP, the user has to select Time & Date of delivery as now, complete the payment and the order will be confirmed

                        E-Commerce:
                        a.	Users can login to the app/website and select the option to order products from our online store.
                        b.	Upon opting for the same, users will have two options to select from: 1) Online store 2) Select nearby Pet Store. Users can select products from any of the two options and place the order.
                        c.	Online store: The products in online store are sold by sellers from all  over India. The delivery of these products take multiple days and the delivery time is dependant on seller’s location and buyer’s location. the estimated delivery time is shown to the customer before he books a product.
                        d.	From nearby Pet Store: The products in this category are sold by pet shops in nearby areas. The user can see the items available at a store, and order them. These products will be delivered to the user within 1 hour.However, if the delivery partners are unavailable, it might take more time. We will show estimated delivery time before an user confirms the order.







                        2.  NO SHOW, RESCHEDULING & REFUND- CANCELLATION POLICY

                        To ensure that each User is given the proper amount of time allotted for their consultation and to provide the highest quality care, it is very important that both the User and the Vet assume their responsibility. Vet consultants shall contact the User within the booked slot, and User shall attend their call on time. As a courtesy, an appointment reminder call shall be made/attempted to the User and the Vet 10 mins prior to your scheduled appointment.

                        A.	Vet No show (Online, physical & Doorstep consultation):

                        We, at Just For Pet, understand that sometimes there’s a need to cancel or reschedule the appointments and that there are emergencies. If Vet/User are unable to keep their appointment, the same to be reported as soon as possible.

                        If the vet is unable to attend the call, he would request rescheduling appointment at the next available time, the user can accept the rescheduling consultation request or if he wishes to consult another vet he can book another vet without extra fee. The user will get a full refund if he doesn;t wish to reschedule

                        If the vet cancels a consultation due to unforeseen circumstances, we will provide the user with a facility to book another vet consultation without any extra fee. If the user does not want to book another vet consultation, he can request for a refund, Just For Pet will give complete refund




                        A.    User No Show (For Online Consultatio, Physical Consultation & Doorstep Consultation)

                        a.     If a User is unable to keep the appointment, the same to be reported as soon as possible.

                        b.     When a User doesn’t show up for a confirmed appointment (without having cancelled or rescheduled before appointment time), the User shall be marked PNS for that particular appointment.

                        c.     Whenever a User is marked PNS, an SMS and EMAIL is sent to verify this claim and understand the reason behind the missed appointment.


                        Every PNS captured on Just For Pet is dealt with seriousness based on past User behavior. This is done in order to ensure Users understand the importance of a Vet Consultant’s time and not misuse the convenience provided by Just For Pet. Our PNS Policy aims at minimising instances of uninformed missed appointments, thereby making most of a Vet Consultant’s valuable time.


                        d  Just For Pet reserves the right to make the final decision in the case of a conflict. The total aggregate liability of Just For Pet with respect to any claims made herein shall be 80% of the consultation fee.

                        User Rescheduling & Cancellation Policy for Vet consultation ( Online, Physical, Doorstep)

                        We understand there might be circumstances when an appointment is booked and there might be a need to reschedule or cancel the appointment. The rescheduling & Cancellation Policy are as follows for vet consultation
                        1)	Rescheduling By User- A vet appointment can be rescheduled till 2 hours before incase of “physical & online appointment ” and till 5 hours before the doorstep service appointment. There would be no extra charges levied for rescheduling. The rescheduling will be available for only once. A user cannot reschedule an appointment more than once, the appointment stands cancelled if the user wishes to schedule more than once and there would be no refund.
                        2)	Refund Due To Cancellation by User:
                        -	5 hours and more before the scheduled appointment time: 60% refund
                        -	5 hours and below before the scheduled appointment time: No refund
                        -	If the appointment as cancelled within 1 hour of booking and the date of booking should be at least 1 day before scheduled it- 95% refund (However, if the appointment cancellation falls under any of above condition, this point would be null & void)
                        -	Appointment No show- No refund


                        B. Vaccination Service No Show, Rescheduling & Refund Policy
                        We, at Just For Pet, understand that sometimes there’s a need to cancel or reschedule the appointments and that there are emergencies. If Vet/User are unable to keep their appointment, the same to be reported as soon as possible.

                        If the clinic is unable to do vaccination service, they would request rescheduling appointment at the next available time, the user can accept the rescheduling consultation request or if he wishes to consult another clinic, he can book another clinic without extra fee. The user will get a full refund if he doesn't wish to reschedule

                        If the clinic cancels vaccination scheduled due to unforeseen circumstances, we will provide the user with a facility to book another vet consultation without any extra fee. If the user does not want to book another vet consultation, he can request for a refund, Just For Pet will give complete refund

                        User No Show-
                        If the user does not show up to the booked appointment, it is marked as PNS. The appointment is considered as PNS and there would be no refund given.

                        User Rescheduling & Cancellation Policy for Vaccination:
                        We understand there might be circumstances when an appointment is booked and there might be a need to reschedule or cancel the appointment. The rescheduling & Cancellation Policy are as follows for vet consultation
                        1)	Rescheduling- A vaccination appointment / Pet Boarding order / Pet Training appointment can be rescheduled till 2 hours before the scheduled appointment time. There would be no extra charges levied for rescheduling. The rescheduling will be available for only once. A user cannot reschedule an appointment more than once, the appointment stands cancelled if the user wishes to schedule more than once and there would be no refund.
                        2)	Cancellation:
                        -	5 hours and more before the scheduled appointment time: 60% refund
                        -	5 hours and below before the scheduled appointment time: No refund
                        -	If the appointment as cancelled within 1 hour of booking it- 95% refund (However, if the appointment cancellation falls under any of above condition, this point would be null & void)
                        -	Appointment No show- No refund





                        C.  Grooming & Spa service Booking No show, Rescheduling & Refund Policy

                        We, at Just For Pet, understand that sometimes there’s a need to cancel or reschedule the appointments and that there are emergencies. If Vet/User are unable to keep their appointment, the same to be reported as soon as possible.

                        If the groomer is unavailable due to unforeseen circumstances, he may reschedule the appointment by sending a request through the app to the user. The user may accept a rescheduling request and schedule the appointment at the next convenient time or if the user wishes to cancel the appointment, the user gets a complete refund of the amount paid for the service booking.

                        If the user wishes to book another groomer, he can do so by selecting a groomer and his services by filling up the details at no extra costs. However, if the pricing of the other groomer for the same services is more than the actually booked amount, Just For Pet will adjust the complete amount to the current order and only the amount difference has to be paid by the user.

                        User No Show- Grooming & Spa, Boarding center & Training Center

                        a.     If a User is unable to keep the appointment, the same to be reported as soon as possible.

                        b.     When a User doesn’t show up for a confirmed appointment (without having cancelled or rescheduled before appointment time), the User shall be marked PNS for that particular appointment.

                        c.     Whenever a User is marked PNS, an SMS and EMAIL is sent to verify this claim and understand the reason behind the missed appointment.


                        Every PNS captured on Just For Pet is dealt with seriousness based on past User behavior. This is done in order to ensure Users understand the importance of a service provider’s time and not misuse the convenience provided by Just For Pet. Our PNS Policy aims at minimising instances of uninformed missed appointments, thereby making most of a service provider’s valuable time.

                        User Rescheduling & Cancellation Policy for Grooming , Pet Boarding & Pet Training

                        We understand there might be circumstances when an appointment is booked and there might be a need to reschedule or cancel the appointment. The rescheduling & Cancellation Policy are as follows for vet consultation
                        1)	Rescheduling- A groomer appointment / boarding order can be rescheduled till 2 hours before the scheduled appointment time. There would be no extra charges levied for rescheduling. The rescheduling will be available for only once. A user cannot reschedule an appointment more than once, the appointment stands cancelled if the user wishes to schedule more than once and there would be no refund.
                        2)	Cancellation:
                        -	5 hours and more before the scheduled appointment time: 60% refund
                        -	5 hours and below before the scheduled appointment time: No refund
                        -	If the appointment as cancelled within 1 hour of booking it- 95% refund (However, if the appointment cancellation falls under any of above condition, this point would be null & void)
                        -	Appointment No show- No refund


                        D. Pet Fresh Food Refund Policy:

                        If a user books fresh food delivery service from our platform, there is no option to cancel / reschedule the order.
                        Refund: There would be no refund on the pet fresh food category of service on our platform.
                        However if the product received is different from the ordered one, the product will be replaced without any extra charge to the customer. We will refund if the customer does not wish to take a replacement.


                        E.  ECommerce Refund Policy:

                        From nearby pet store:
                        Once an order is placed to buy products from a nearby pet store, the order cannot be cancelled and there will be no refund from the platformHowever if the product received is different from the ordered one, the product will be replaced without any extra charge to the customer.

                        From Online store:
                        Defective Product:
                        Please report about the damaged product being received in 48 hours of delivery, our team will get in touch with you for the 1st level of investigation. Post the photos or video exchange with our team, we will look to replace the product or refund the amount
                        In case, the complaint is made later than 48 hours of delivery, no request would be entertained.
                        The refund will be made immediately to your Just For Pet wallet. If you wish to receive money in your account, it might take 7 days from the date of refund approval.

                        Product Return:
                        Just For Pet ensures proper information regarding any product or size in case of collars and accessories so that you receive the right product. Mail us, in case you want a replacement, kindly reach out to us, we will resolve the case within 1-2 business days. However, we do not guarantee product return if you don’t like the product





                        3.    REFUND

                        Just For Pet has multiple services and multiple modes of products sold. Hence we have described the Rescheduling & refund policy for each category in the above section.

                        As a general rule, if the customer wants to take a refund there will be two options: 1) Refund the wallet (this is instant refund, it happens immediately). 2) Refund to the account :  This type of refund might take upto 7 days from the date of refund approval





                        4.    General Terms for Users:

                        4.1   The Users expressly understand, acknowledge and agree to the following set forth herein
                        below:



                        A.    In case any prescription is being provided to User, for the Pet, by the Vet Consultant, the same is being provided on the basis of online consultation, however it may vary when examined physically, hence, in no event shall the prescription provided by Vet Consultants be relied upon as a final and conclusive solution.

                        B.    The Users agree to use the advice from Vet Consultant on the application pursuant to:

                        i.         an ongoing treatment with their Vet Consultant;
                        ii.         a condition which does not require emergency treatment, physical
                        examination or medical attention
                        iii.         medical history available as records with them for reference;
                        iv.         consultation with their Vet Consultant before abandoning or modifying their
                        ongoing treatment.

                        C.     The User agrees that by using Consult, the Vet Consultants on Consult will not be conducting physical examination of the Pet, hence, they may not have or be able to derive important information that is usually obtained through a physical examination. User acknowledges and agrees that the User is aware of this limitation and agrees to assume the complete risk of this limitation.

                        D.    The User understands that Consult shall not form a substitute for treatment that otherwise needs physical examination/immediate consultation. Further, the User understands that the advice provided by the Vet Consultant is based on general medical conditions and practices prevalent in India, to the best of his knowledge and ability, and not for conditions which are territory specific for regions other than India, irrespective of where the User is procuring medical services or engaging in communication with the Vet Consultant.

                        E.     During the consultation and thereafter, the Vet Consultant may upload the prescription/health records for the Pet of the User on the account of the User on the Website for access by the User.

                        F.     Notwithstanding anything contained herein, Just For Pet is not in any manner responsible for any drug/medicines prescribed or therapy prescribed by the Vet Consultant.

                        G.    If Vet Consultant responds to the User’s query, the system could trigger communications to the User, in the form of notification/text/email/others. The User further understands that Just For Pet may send such communications like text messages/email/calls before and/or after Vet Consultant’s consultation to User’s mobile number, based on the Vet Consultant’s settings (through the app). However, and notwithstanding anything to the contrary in this Agreement, Just For Pet does not take responsibility for timeliness of such communications.

                        H.    The User hereby agrees to Just For Pet's medical team carrying out an audit of his/her consultations on Consult for the purpose of improving treatment quality, user experience, and other related processes. The User acknowledges that the subject matter of audit may include texts, messages, photographs, reports, audio or video recordings or any other material exchanged between the User and the Vet Consultant which could inter alia include User's personal information, including sensitive personal information. This personal information will be processed in accordance with Privacy Policy.

                        I.      User shall refrain from raising any personal queries or advice on Consult which are not related to a specific disease / medicine.

                        J.      Users shall not use abusive language on Consult. In the event of an abuse from the User is reported by a Vet Consultant, Just For Pet reserves the right to block such Users from Consult and Just For Pet is not responsible for honouring any refund request towards his/her consultation on Consult. The Vet consultant is also entitled to take any legal action if he/she wishes to

                        K.    Users may share images or videos of the affected areas of their Pets with the Vet Consultant only if it is absolutely necessary for diagnosing its condition. Just For Pet shall not be responsible for any such images or videos shared by the Users with the Vet Consultants.

                        L.     Users shall ensure that any interaction/communication with the Vet Consultants, including sharing images or videos of the Pets, shall be only through Consult. The Users shall not rely on any other external modes of communication for interacting/communicating with the Vet Consultants.

                        M.   Users shall be prepared to share all relevant documents or reports to the Vet Consultant promptly upon request.

                        N.    For every paid consultation on Consult, the Users shall not obtain consultation for more than one pet. In the event, the Users attempt to obtain consultation for more than one pet through a single paid consultation on Consult, such consultations will not be addressed by the relevant Vet Consultant.

                        O.    User understands and agrees to provide accurate information and will not use Consult for any acts that are considered to be illegal in nature.

                        P.     If User decides to engage with a Vet Consultant to procure veterinary services or engages in communication, exchange of money for services outside of Consult, User shall do so at their own risk. Just For Pet shall not be responsible for any breach of Service or Service deficiency by any Vet Consultant.

                        Q.    The User agrees and understands that the transaction with the Vet Consultant are subject to jurisdiction of Indian laws and that any claim, dispute or difference arising from it shall be subject to the jurisdiction provision as contained in the Terms and Conditions hereunder, at all times. The User further agrees and understands that the Vet Consultant is licensed to practice medicine in India and the onus is on the User to determine if he/she is eligible to Consult with the Vet Consultants via the application for their pets. It is expressly clarified that at no point in time can it be construed that the Vet Consultant is practicing medicine in a territory other than India, irrespective of where the User is located and procures medical services or engages in communication with the Vet Consultant, in any manner whatsoever.

                        R.    The User shall indemnify and hold harmless Just For Pet and its affiliates, subsidiaries, directors, officers, employees and agents from and against any and all claims, proceedings, penalties, damages, loss, liability, actions, costs and expenses (including but not limited to court fees and attorney fees)arising due to or in relation to the use of Website by the User, by breach of the Terms or violation of any law, rules or regulations by the User, or due to such other actions, omissions or commissions of the User that gave rise to the claim.

                        S.     The User shall make payment using the payment gateway to make payments online, solely at User's discretion. Should there be any issues with regard to the payment not reaching the Just For Pet account, the User may contact Just For Pet's support team via online chat under the “Support” Tab of the App.

                        4.2  The user understands that the Pet-care services are provided by Just For Pet for the convenience of pet owners. The users shall keep in mind of the following rules:
                        A.	A user shall not contact the service provider of Just For Pet through other means of communication apart from the application
                        B.	If the user engages in cancelling the order by paying money to the service provider and such an instance comes to the notice of Just For Pet, both the user as well as service provider will be banned from using the platform.
                        C.	The user also understands that any service exchange without the involvement of Just For Pet between the service provider and the user, any mishappening that happen during such service shall not make Just For Pet liable for the consequences.


                        5.    General Terms for Vet Consultants, Groomers, Trainers & other service providers:

                        A.    The Vet Consultants / Groomers/ Trainers & other service providers shall promptly reply to the User after receiving User’s communication. In case of non-compliance with regard to adhering to the applicable laws/rules/regulations/guidelines by the Vet Consultants/ Groomers/ Trainers & other service providers, Just For Pet shall have the right to replace such service providers for the purpose of consultation to the User.

                        B.    The online Vet Consultant further understands that, there is a responsibility on the Vet Consultant to understand that the online consultation is different from physical consultation.

                        C.     The Vet Consultant has the discretion to cancel any consultation at any point in time in cases where the Vet Consultant feels, it is beyond his/her expertise or his/her capacity to treat the Pet. In such cases, it may trigger a refund to the User and the User has the option of choosing other Vet Consultants. However, it is strongly recommended that the Vet Consultant advise the User and explain appropriately for next steps which may include referring the User for further evaluation.

                        D.    The Vet Consultant is and shall be duly registered, licensed and qualified to practice medicine/ provide health care, wellness services, to non-human animals as per applicable laws/regulations/guidelines set out by competent authorities and the Vet Consultant shall not be part of any arrangement which will prohibit him/her from practicing medicine (to non-human animals) within the territory of India. The Vet Consultant shall at all times ensure that all the applicable laws that govern the Vet Consultant shall be followed and utmost care shall be taken in terms of the consultation/ services being rendered.

                        E.     Vet Consultant shall ensure that, the consultation online is treated as an in-clinic consultation and provide advice to the best of Vet Consultants’ knowledge.

                        F.     The Vet Consultant hereby agrees to Just For Pet’s medical team carrying out an audit of his/her consultations on Consult for the purpose of improving treatment quality, user experience, and other related processes. The Vet Consultant acknowledges that the subject matter of audit may include their personal information. This personal information will be processed in accordance with the Privacy Policy.

                        G.    Vet Consultants should provide e-prescriptions to the Users only via the prescription module. The Vet Consultant hereby agrees and covenants to be responsible and liable for the content of e-prescription. In addition to any indemnity warranties provided elsewhere in the Agreement, the Vet Consultant hereby agrees to hold Just For Pet, its officers, employees, agents and affiliates harmless from any claims, damages, losses or penalties arising out of any third party claims in connection with the validity of the e-prescription, its content.

                        H.    For a Vet Consultant to complete a consultation, it is mandatory to provide a consultation summary via the e-prescription module to all Users.

                        I.    If the Vet Consultant’s performance on Consult is not compliant with the expected guidelines of Just For Pet or the Vet Consultant is found to be misusing Consult, the Vet Consultant may result in losing the privilege of using the platform to provide consultation services.

                        J.     The Vet Consultant acknowledges that should Just For Pet find the Vet Consultant to be in violation of any of the applicable laws/rules/ regulations/guidelines set out by the authorities then Just For Pet shall be entitled to cancel the consultation with such Vet Consultant or take such other legal action as maybe required.


                        K.    It is further understood by the Vet Consultant that the information that is disclosed by the User at the time of consultation is personal information and is subject to all applicable privacy laws, shall be confidential in nature and subject to User and Vet Consultant privilege.

                        L.    The Vet Consultant understands that Just For Pet makes no promise or guarantee for any uninterrupted communication and the Vet Consultant shall not hold Just For Pet liable, if for any reason the communication is not delivered to the User(s), or are delivered late or not accessed, despite the efforts undertaken by Just For Pet

                        M.   A groomer understands that he is eligible to service only to the extent of his expertise. He shall not go beyond what he can perform as a professional. Groomer also understands that the responsibility of completing the service without any harm to the pet is the most important element in his role
                        N.   A groomer understands that it is his him complete responsibility if any harm happens to the animal and he shall indemnify Just For Pet from all the liabilities.
                        O. A boarding Center understands that it is their responsibility to keep the premises clean, feed the pet on time and take care of it. The boarding center indemnifies Just For Pet against all the liabilities

                        6.    EXPRESS DISCLAIMER:



                        Online vet Consultation is intended for general purposes only and is not meant to be used in emergencies/serious illnesses requiring physical consultation. Further, if the Vet Consultant adjudges that a physical examination would be required and advises ‘in-person consultation’, it is the sole responsibility of the User, to book an appointment for physical examination and in-person consultation whether the same is with the Vet Consultant listed on the Website or otherwise. In case of any negligence on the part of the User in acting on the same and the condition of the User deteriorates, Just For Pet shall not be held liable.

                        Just For Pet’s Digital Platform is being made available to Users to assist them to obtain consultation from Vet Consultants and does not intend to replace the physical consultation with the online Vet Consultation.

                        Just For Pet reserve the right to modify the above mentioned terms from time to time


                        Welcome to www.JustForPet.in (“We”, “us”, “our” or “Just For Pet”). Just For Pet is a product of P V L Tech Pvt Ltd.

                        Just For Pet is a technology driven interactive platform for Individuals who are Pet owners or Pet Lovers (Collectively called as “Users”) to find, book, & buy all the pet care needs required during the lifetime of a pet.

                        At P V L Tech Private Limited, we want you to feel comfortable and confident when using our products and services and entrusting your personal and company information to us. We don't sell, rent, trade or distribute your specific and personal information to anyone, in ways other than disclosed in this privacy policy.

                        This statement applies to the Just For Pet website, application and services that display or link to this statement. In addition, where more detailed information is needed to explain our privacy practices, we post supplementary privacy notices to describe how particular services process personal information.


                        This privacy policy helps in keeping you informed with the kind of data that we collect and for what purposes. Please read this privacy policy carefully. By accessing or using the website, you agree to be bound by the terms described herein and all the terms incorporated by reference. If you do not agree to all of these terms, do not use the website.

                        This Privacy Policy (“Policy“) is made, and hosted in accordance with the following Information Technology Laws,

                        a.   Information Technology Act, 2000

                        b.   Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011.

                        c.    Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011

                        This Policy document is an ‘electronic record’ within the meaning of section 2(t) of the Information Technology Act, 2000 and the rules made thereunder. This Policy being an electronic record requires no signature.

                        This Policy should be read in conjunction with the “Terms and Conditions of Use” of Just For Pet which are deemed to have been incorporated herein by way of reference.





                        In this privacy policy:

                        -          The term "Service" refers to the Services by Just For Pet, including without limitation to Just For Pet website www.JustForPet.in the Just For Pet service, or any applications (including mobile applications) made available by Just For Pet, use of Just For Pet’s Web and Mobile Applications in their entirety and of online community, blog and forum.

                        -          Digital Platform means the websites, mobile apps, mobile sites or other online properties through which we offer our Services.

                        1.      Usage

                        This Policy conveys the mode, method and manner in which Just For Pet collects, stores and disseminates the Personal Information (“Information”) from the Users (hereinafter referred to as “User” “Users” or “you”). For the purpose of this Policy User(s) shall mean such individuals who are competent to contract under the Indian Contract Act, 1872 and wish to subscribe to the Services (offered by Just For Pet by itself or through third party service providers) on this Digital Platform by visiting this Digital Platform, Just For Pet therefore requests the Users on this Digital Platform, to carefully and comprehensively read and understand the Policy before they consent to the terms herein and start using or accessing this Digital Platform or subscribing to any of the Services offered through this Digital Platform. In the event of any disagreement or Users do not accept to the terms of this Policy or the Terms of Use of this Digital Platform herein they are advised to forthwith disengage and leave this Digital Platform.



                        2.      Modification

                        Notwithstanding anything contained herein or the Terms of Use, Just For Pet reserves its right to add, update, change, edit, alter, amend, modify, review, revise, vary or substitute this Policy with or without prior notice.

                        By using or accessing this Digital Platform, the Users categorically agree to have read and understood this Policy/Terms of Use and acknowledge that they shall be bound by the terms of this Policy/Terms of Use including any addition, updation, change, amendment, revision, modification and substitution. Just For Pet reserves its right to terminate the services of any user who do not subscribe or violate the terms of this Policy.



                        3.      Collection of information

                        Generally, some of the Services require us to know who you are so that we can best meet your needs. When you access the Services, or through any interaction with us via application, website, emails, telephone calls or other correspondence, we may ask you to voluntarily provide us with certain information that personally identifies you or could be used to personally identify you. You hereby consent to the collection of such information by Just For Pet. Without prejudice to the generality of the above, information collected by us from you may include (but is not limited to) the following:

                        -    contact data (such as your email address and phone number);

                        -    demographic data (such as your gender, your date of birth and your pin code);

                        -    data regarding your usage of the services, products and history of the appointments made by or with you through the use of Services and Products

                        -    other information that you voluntarily choose to provide to us (such as information shared by you with us through emails or letters.

                        -    Data of interactions between you and Just For Pet / Third Parties on this Digital Platform (which includes chats and video calls)

                        -    We may track your buying behaviour, preferences, and other information that you choose to provide on our Platform. We use this information to do internal research on our users' demographics, interests, and behaviour to better understand, protect and serve our users. This information is compiled and analysed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on our Platform or not), which URL you next go to (whether this URL is on our Platform or not), your computer browser information, and your IP address.

                        -    We collect personal information (such as email address, delivery address, name, phone number, credit card/debit card and other payment instrument details) from you when you set up an account or transact with us. While you can browse some sections of our Platform without being a registered member, certain activities (such as placing an order or consuming our online content or services) do require registration. We do use your contact information to send you offers based on your previous orders and your interests. Please make sure the Contact information shared with us is accurate and Just For Pet is not responsible for inaccurate data and if our service providers are unable to reach out to you.






                        The information collected from you by Just For Pet may constitute ‘personal information’ or ‘sensitive personal data or information’ under the SPI Rules.



                        4.      Sharing of Information

                        Just For Pet does not disclose or share any information which it collects from Users with Third Party/Parties, save and except those mentioned in this Privacy Policy and, in accordance with its Privacy Policy or as per procedure prescribed by law, or in compliance with legal obligations.

                        We do not share any Identifiable Personal Information with any individuals, organizations and other companies. User(s) information is securely stored and utmost confidentiality is maintained and may be accessed/used/disseminated by us as per the terms specified herein.



                        5.      Purpose for which information is collected from Users

                        The Information provided by User(s)/you and collected by us on this Digital Platform may be accessed/used/disseminated for the following purposes and the User(s) explicitly consent to the same:

                        a.   Communicating with the User(s)

                        b.   Providing the Services contemplated under this Digital Platform

                        c.    Offering new Services

                        d.  Analytical purposes in anonymous form or as de-identified data and for this purpose we may take assistance of our affiliates and trusted business partners in India or Outside India for research, development, studies, betterment of services, understanding the User(s) Experience, serving the individual needs of the User(s) and improving the overall health delivery services/health outcome of the User(s). Just For Pet may disclose aggregated information, but it will never contain Information that will identify a single User.

                        e.   Obtaining feedback

                        f. Record their telephonic, Video and chat conversations and/or consultations during their interaction with Vet Consultants and other support staff and Just For Pet can use it for legal, training and quality purposes

                        g.   Customizing User(s) needs and send personalized communications

                        h.   To send messages including but not limited to emailers, bulk emailers, SMS etc intimating the User(s) about Just For Pet’s services, offers and other promotional content. These messages may be sent using various third-party service providers

                        When User(s) interact with or respond to an email campaign shared by Just For Pet, User(s) may be redirected to a third party website(s). The third-party website may collect information about the User(s) device, browser, IP address, operating system, interaction with an email etc. The third-party websites may also use cookies or other tracking technologies to identify the behavioral pattern of the User(s).



                        6.      Processing, Disclosure and Sharing of information collected from the User

                        A.   Information collected from the User(s) on the Digital Platform forms an essential part of business structure and may be shared/used as described hereinbelow and User(s) hereby consent to the same:






                        (i)      Other Users

                        Since our goal is to help Users find Pets for themselves, We will have to share your basic data such as Name, Number & Mail id- This will be shared only to the pet owner who has put up a pet for adoption and you requested to adopt the pet. If you haven’t requested for adoption, none of your information will be shown

                        However if there is a chat that happened between two users for adoption, such chats shall be stored in our database for a stipulated time period for the purpose such as to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of these Terms and/or privacy policy, or as otherwise required law.



                        (ii)     Third Party Service Provider(s)

                        Information including but not limited to contact details, email ID will be shared with Third Party Service Provider(s), retailers, insurance providers, logistics service providers, E-mail Service Providers and other providers for providing the Services for the User(s) pursuant to the User(s) requests. While most of these information will be shared especially while facilitating the E-commerce Services, Information with Payment Gateways will be shared for other services as well. Information is likely to be exchanged while fulfilling orders, delivering products, etc. and for sending communications through e-mailers.



                        (iii)  Analytics Purpose(s),

                        User(s) Information/data in de-identified form may be used by Just For Pet or shared with Third Party(ies) either in India or outside India for Analytical Purposes with advertisers, sponsors, investors, strategic partners, and others in order to improve User(s) experience and to help grow its business.



                        (iv)  Other Associated Services,

                        User(s) Information/Data may also be used for providing (a) assistance, (b) effective search results and links (including listings and paid services) and (c) customer experience/service. Just For Pet assures that any information exchanged herein shall be in accordance with its Privacy Policy.



                        (v)    Information required by law,

                        a.   Just For Pet may share the information given by the User(s) if directed by any judicial or a statutory authority or against receipt of judicial or statutory order or to comply with applicable law. Please be assured that no such information will be provided to any Third Party for any commercial purpose in any such way which is contrary to the commitments made under the Privacy Policy.

                        b. Just For Pet may share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of these Terms and/or privacy policy, or as otherwise required law.



                        B.   In the event, if there is any information which has to be provided outside the scope of this Privacy Policy, a prior notification and request for consent /approval will be shared with the User(s).



                        C.    Destruction of Data/Information Supplied by the User(s)/you

                        Any data/information supplied by the User(s)/you and collected by us shall be securely stored for the duration required under applicable law. In the event any User(s)/you are deleting their account or a User account becomes inactive, the concerned User(s)/you shall have no access to the data/information supplied and collected by us and the same shall be deleted from our servers after the duration for which it is required to be stored.



                        7.      Editing Information

                        After User(s) create the account and if there is any change in the Information provided earlier, the User(s) can edit their profile and make necessary modifications. User(s) are solely responsible for the Information provided by them.



                        8.      Cookie Policy

                        Cookies are small pieces of text used to store information on web browsers. Cookies are used to store and receive identifiers and other information on computers, phones and other devices. Other technologies, including data we store on your web browser or device, identifiers associated with your device, and other software, are used for similar purposes.

                        This Digital Platform uses cookies to store certain data (that is not sensitive personal data or information) that is used to provide customized information when the User(s) or Unregistered User(s) returns to the Website. "Cookies" are used to store User(s) or Unregistered User(s) preferences and to track User(s) or Unregistered User(s) trends, so as to enhance their interactive experience and generally improve the website’s services to them. In the course of serving advertisements or optimizing services to its User(s), Just For Pet may allow authorized third parties including but not limited Google Inc, E-Mail Service Providers, etc. for services related to analytical and statistical purposes and to place or recognize a unique cookie on the User’s or Unregistered User’s browser.



                        9.      Creation of User Account on behalf of third party

                        If any User(s) creates an account on this Digital Platform for and on behalf of any other Party/ third party (other than for his use) like their family member(s)/friend(s) such User(s) acknowledge that they are duly authorized by the other Party/third party to create an account on this Digital Platform by furnishing such details as may be required for availing the Services, In case any User(s) is/are creating account on behalf of a minor, such User(s) acknowledge that they are legally authorized to act on behalf of such minors. User(s) acknowledge that Just For Pet shall in no case be held responsible/liable for any third party claims/damages if any arising from any action in this regard.



                        10. Promotions

                        With a view to provide better Services Just For Pet may send various communications to the User(s) regarding its Products/Services. If the User(s) do not wish to receive such communications they may unsubscribe to such communications as per the procedure set out in those communications.



                        11. Financial Information

                        For availing certain Services/Products the User(s) may be required to subscribe/purchase such Services by entering requisite payment details. The payment details are captured by third party service providers and the User(s) are advised to read the terms and conditions of such third party service providers before making any payment. For the purpose of this section it is clarified that the Digital Platform does not collect sensitive personal or security related information like passwords etc., which are totally under encryption. User(s) may note the Third Party Service Providers are not under the direction, supervision and control of Just For Pet and Just For Pet expressly disclaims any and all liabilities associated, therewith. User(s) are advised to note this while providing their personal or security related information.



                        12. Access to the Digital Platform

                        a.   Registered User(s) will have complete access to the Digital Platform

                        b.   Unregistered User(s) will have restricted access to the Digital Platform

                        Unregistered User(s) please note that you shall also be bound by the terms of this Policy as well as the Terms of Use of this Digital Platform



                        13. Third Party Links

                        Just For Pet may provide certain of the Services contemplated under this Digital Platform directly by itself or through third party service providers. This Digital Platform may contain links of such third party service providers and their Digital Platform. Just For Pet shall not in any way be responsible for the content, Terms of Use, Privacy Policy, the mode of operations of such third party service providers.

                        User(s) may note the Third Party Service Providers are not under the direction, supervision and control of Just For Pet and Just For Pet expressly disclaims any and all liabilities associated, therewith, The User(s) are hereby advised to carefully read the Terms of Use and the Privacy Policy and other relevant documents of such third party service providers/websites as accessing such third party Digital Platform is at the sole risk of the User(s). User(s) may also note that the third party digital platform may collect various types of information of the User(s) and their behavioural patterns. Just For Pet definitely conveys to the User(s) that it does not monitor or have any control over the affairs of such third party websites or the contents therein. User(s) are categorically advised to get in touch with the third party digital platform and seek information/clarification about their operations and functioning.



                        14. USER INFORMATION

                        ‘User information’ for the purpose of this Policy includes the User’s personally identifiable information including but not limited to name, email address, residential address, phone number, photograph, identity and address proof and other information collected by Just For Pet to provide its Services/Products to the User through their Digital Platform. User(s) have the option not to provide any information if they do not intend to avail any Service/Product. If any User(s) are providing information on behalf of any legal entity or third party, such User(s) should be authorized to provide the information.



                        15. SECURITY AND RESTRICTIONS

                        To protect your privacy and security, Just For Pet takes steps to verify Users’ identity before granting Users access to accounts, or before Users can make corrections to their information. Users are advised to maintain a strong password to help ensure the security of user accounts.

                        Just For Pet implements high standard security measures to protect User(s) Information from and against unauthorized access. To this effect, Just For Pet uses certain, physical, managerial, technical and operational safeguards as per industry standards and established best practices to protect information of Users which is collected by Just For Pet.

                        Notwithstanding the above, User(s) may note that no online platform can fully eliminate the security risks. Just For Pet shall take all possible measures to protect the date, security, confidentiality and integrity of the User(s) information from unauthorised access. User(s) may also note that internet where the Digital Platform is hosted is not completely a secure environment, therefore Just For Pet does not warrant a 100% security of the User(s) Information/data from being hacked/misused/copied/used unauthorizedly and in such cases User(s) agree not to hold Just For Pet responsible for any consequences arising therefrom.

                        Notwithstanding anything contained in this Policy or elsewhere, Just For Pet shall not be held responsible for any loss, damage or misuse of the User Information, if such loss, damage or misuse is attributable to a Force Majeure Event. A "Force Majeure Event" means any event that is beyond the reasonable control of Just For Pet and includes, without limitation, fire, flood, explosion, acts of God, civil commotion, strikes, lock outs or industrial action of any kind, riots, insurrection, war, acts of government, power failure, sabotage, computer hacking, unauthorised access to computer data and storage device, system failure, virus, attacks, bugs, computer crashes, breach of security and encryption.



                        16. GENERAL TERMS

                        This Policy is to be read in conjunction with and shall be deemed to be part of the Digital Platform Terms of Use.

                        The User Information resides in Just For Pet’s database for a certain period of time even after the User ceases to use or access the Digital Platform and in such cases Just For Pet is not be liable for any usage of the User Information after the User ceases to use or access the Digital Platform.

                        The Users hereby agree, consent and acknowledge that User Information shared by them, collected or collated through the Digital Platform could be stored, processed and handled by Just For Pet or through its trusted third party service providers as set out in this Privacy Policy.

                        Just For Pet may avail services of third party service providers for sending e-mail communications to the User(s). The third party email service provider(s) will have access to User(s) information and they will be processing User(s) data and information on Just For Pet’s behalf. The third party email service provider(s) service involves their data and placement of cookies and may also contain tracking pixels embedded therein along with other tracking technologies. The User(s) would have the option to enable or disable them. The third party Email service providers also track the open and click activity of the e-mail communications by the User(s).   The Users have the option to unsubscribe from receiving such e-mail communications.

                        The User should be aware that the User Information or other data, the User provides to the Digital Platform for availing the services or transacting through the Digital Platform could be read, collected, or used by other users or third parties in which case the User Information might be used for sending messages or communications.

                        The User agrees and acknowledges Just For Pet’s right to utilize the User’s posts, contents, information and other personal data for the purpose of providing services through the Digital Platform. The contents on the Digital Platform may contain comments, post and reviews posted by the Users which may be public and searchable on the internet in which case the User’s comments, post reviews and information and personal data provided to the Digital Platform may be viewed by other users and Just For Pet cannot guarantee that other users or third parties have not made copies of or used the ideas and information that the User has shared on the Digital Platform.

                        If User(s) unsubscribe from the Services and again intends to avail/subscribe to the Services, he/she is authorizing Just For Pet to send such information as may be required, including but not limited to SMS, emails for enabling the User(s) to continue to avail the Services. User(s) hereby explicitly consent and agree that any request pursuant to this clause will override any opt-out/ override any opt-out unsubscribe request given by them earlier.








                        17. GRIEVANCE OFFICER

                        In case of any complaints or grievances, the User may contact the Grievance Officer as under:

                        Dheeraj Reddy

                        2nd Floor,T-Hub,IIIT Campus, Gachibowli Hyderabad, Dheerajreddy@justforpet.in


                        18. GOVERNING LAW AND JURISDICTION

                        The terms and conditions of this Policy shall be governed by Indian Laws and the courts at Hyderabad shall only have exclusive jurisdiction to resolve any disputes.


                        This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.

                        This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name [www.justforpet.in] (“Website”), including the related mobile site and mobile application (hereinafter referred to as “Platform”)

                        These terms and conditions of use (“Terms of Use”) describe the terms applicable to your use of this application “Just For Pet”, mobile-optimized versions of the website, digital applications, and any other media formats for the purposes of use and promotion of “Just For Pet” (collectively referred to as the “Covered Sites”), and other products, software and services offered on the Covered Sites or owned and operated by PVL Tech Private Limited  (together the “Services”)

                        By accessing this website we assume you accept these terms of service in full. Do not continue to use P V L Tech Private Limited's website if you do not accept all of the terms of service stated on this page.

                        The Platform is only a platform that can be utilized by Users to reach a larger base to buy and sell products or services. Just For Pet is only providing a platform for communication and it is agreed that the contract for sale of any of the products or services shall be a strictly bipartite contract between the Seller and the Buyer (or) Service Provider and the Buyer.


                        You represent and warrant that you are an individual of legal age to form a binding contract as per the laws of India.  You are 18 years of age or older, and that you have the right, authority and capacity to use the Digital Platform and agree to abide by this agreement.

                        By using the Services, you agree and state that:

                        -      You agree to all the terms and conditions of service
                        -      You abide by the State and National Laws




                        1.   DEFINITIONS

                        Some of the terms used in these Terms are defined as follows:



                        1.1.   The term "Service" refers to the Services by Just For Pet, including without limitation to Just For Pet website (www.Just For Pet.in) the Just For Pet service, or any applications (including mobile applications) made available by Just For Pet, use of Just For Pet’s Web and Mobile Applications in their entirety and of online community, blog and forum.

                        1.2.   The term “Digital Platform” refers to Just For Pet’s Website (www.Just For Pet.in), Application, including all pages, sub pages and sub domains, including all information, content, products and services made available through the website. It shall also include the Mobile / Tablet applications with the name “Just For Pet” or “PVL Tech private Limited”

                        1.3.   “Just For Pet”, “We”, “Us” or “Our” refers to “PVL Tech private Limited” and all our Directors, Subsidiaries and Employees.

                        1.4.   The term “User(s)” refers to any party whether a person, company or firm who visits and/or registers itself on the Digital Platform and/or Service.

                        1.5.   The term “Vet Consultants” refers to Veterinary medical or health care provider (whether an individual professional or an organization) or similar institution wishing to be listed, or already listed, on the Just For Pet Platform, including designated, authorized associates of such Vet Consultants or institutions

                        1.6.   The term “Pet” refers to any non-human animal, whether domestic/tamed or otherwise.

                        1.7.   The term “client” or “user” “customer” refers to any person, user, individual who wants to avail the services of Just For Pet for their own Pet or any other animals.

                        1.8.   The term “Veterinary Consulting Services” refers to services provided by veterinary practitioners on Just For Pet.

                        1.9.   The term “User Generated Content” refers to any content created, posted or published by Users on Just For Pet ’s Website and Mobile Application and/or Service.

                        1.11.   The term “Vendors” refers to the sellers, service providers who have listed their products / services on the Digital Platform to sell to the Users.






                        2.   ABOUT JUST FOR PET



                        Just For Pet is a tech driven interactive pet-care platform for Individuals who are Pet owners or Wannabe pet owners or Pet Lovers to have a single platform for all the needs required during the lifetime of a pet, right from adopting a pet to: Veterinary care, nutrition, groomin, vaccination, boarding, training, insurance, clothing & accessories. Just For pet is a pet parenting needs provider through Mobile application & Website.

                        3    LICENSE
                        Subject to the compliance with Terms of Use and payment of fees (if and as applicable), PVL Tech Private Limited grants you a non-transferable, non-exclusive, license to use the Covered Sites for your personal, non-commercial use.
                        Unless otherwise stated, P V L Tech Private Limited and/or it's licensors own the intellectual property rights for all material on P V L Tech Private Limited. All intellectual property rights are reserved. You may view and/or print pages from justforpet.in/ for your own personal use subject to restrictions set in these terms of service.

                        You must not:
                        1.	Republish material from justforpet.in/
                        2.	Sell, rent, or sub-license material from justforpet.in/
                        3.	Reproduce, duplicate or copy material from justforpet.in/
                        4.  Redistribute content from P V L Tech Private Limited (unless content is specifically made for redistribution).



                        4.      APPLICABILITY & NATURE OF TERMS & CONDITIONS

                        4.1. Please carefully go through these Terms of Use (“Terms”), the Privacy Policy available at https://Just For Pet.in/user-privacy-policy.html (“Privacy Policy”) and Safety Guidelines available at https://Just For Pet.com/safety-guidelines.html before you decide to access the Digital Platform or avail the services made available by Just For Pet. These Terms and the Privacy Policy together constitute a legal agreement (“Agreement”) between you and Just For Pet in connection with your visit to the Digital Platform and use of Our Services (as defined below).


                        4.2.        The Agreement applies to you whether you are –

                        4.2.1.   A Veterinary Consultant
                        4.2.2.   A Grooming service professional
                        4.2.3.   A Kennel / pet boarding center
                        4.2.4.   A dog trainer or behavior specialist
                        4.2.5    Pet food kitchen
                        4.2.6    Any type of vendor / seller on our platform
                        4.2.7.    An Individual owning a pet and using our services / application/ website

                        4.2.8   Otherwise a user of the Digital Platform

                        4.3.        This Agreement applies to all Services made available by Just For Pet on the Digital Platform, which are offered to the Users including the following:

                        4.3.1.   For Vet Consultants: Listing of Vet Consultants, Veterinary clinic & Hospitals and their profiles, to be made available to the other Users and visitors to the Digital Platform, maintaining health records of Pet, arranging consultation by audio-video modes, Arranging in person veterinary consultation at the clinic and doorstep of the user, Arranging Vaccination services at clinic and doorstep of the user.


                        4.3.2.  For grooming & bathing service providers: Listing of Grooming salons, individual groomers, Pet salons & spas and their profiles to be made available to the Users and Visitors of the digital platform. The platform functions as an intermediary to arrange at salon / at doorstep consultations to the user.

                        4.3.3.  For Pet Boarding centers: Listing of boarding centers, their profiles to be made available to other Users and visitors of the Digital platform. The platform functions an intermediary to arrange a boarding facility for a user’s pet at the listed and available boarding centers

                        4.3.4.  For a Dog Trainer/ Behavior specialist: Listing of certified Dog trainers & behavior specialists, their profiles to be made available to the users and visitors of the digital platform. The platform functions as an  intermediary to arrange a training session





                        4.3.5.    For other Users: Facility to (i) create and maintain ‘Health Accounts of their Pets’, (ii) search for Vet Consultants and to make appointments with them (iii) Pet adoption (iv) finding suitable match for Pet mating (v) maintain pet schedule (vi) buying Pet food/accessories

                        4.4.        The Services may change from time to time, at the sole discretion of Just For Pet, and the Agreement will apply to your visit to and your use of the Digital Platform to avail the Service, as well as to all information provided by you on the Digital Platform at any given point in time.

                        4.5.        This Agreement defines the terms and conditions under which you are allowed to use the Digital Platform and describes the manner in which we shall treat your account while you are registered as a member with us. If you have any questions about any part of the Agreement, feel free to contact us at support@Just For Pet.in.

                        4.6.        By downloading or accessing the Digital Platform to use the Services, you irrevocably accept all the conditions stipulated in this Agreement, and Privacy Policy as available on the Digital Platform, and agree to abide by them. This Agreement supersedes all previous oral and written terms and conditions (if any) communicated to you relating to your use of the Digital Platform to avail the Services. By availing any Service, you signify your acceptance of the terms of this Agreement.

                        4.7.        We reserve the right to modify or terminate any portion of the Agreement for any reason and at any time, and such modifications shall be informed to you in writing You should read the Agreement at regular intervals. Your use of the Digital Platform following any such modification constitutes your agreement to follow and be bound by the Agreement so modified.

                        4.8.        You acknowledge that you will be bound by this Agreement for availing any of the Services offered by us. If you do not agree with any part of the Agreement, please do not use the Digital Platform or avail any Services.

                        4.9.        Your access to use of the Digital Platform and the Services will be solely at the discretion of Just For Pet.

                        4.10.   The Agreement is published in compliance of, and is governed by the provisions of Indian law, including but not limited to:

                        4.10.1.  the Indian Contract Act, 1872,

                        4.10.2.   the (Indian) Information Technology Act, 2000, and

                        4.10.3.  the rules, regulations, guidelines and clarifications framed there under, including the (Indian)Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI Rules”), and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 (the “IG Rules”)


                        5. RESTRICTIONS ON USE
                        5.1  The rights granted to you under these Terms of Use are subject to the restrictions provided below.
                        5.2  You shall not: (a) License, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Covered Sites, without express written consent of “Just For Pet”(PVL Tech private Limited) ;
                        (b) You shall not modify, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Covered Sites;
                        (c) You shall not access the Covered Sites in order to build a similar or competitive service;
                        (d) Copy, reproduce, distribute, republish, download, displayed, post or transmit in any form or by any means, any part of the Covered Sites, for any commercial purpose, without express written consent of “Just For Pet”(PVL ech private Limited);
                        (e) Use the Covered Sites in any way that causes, or may cause, damage to the Covered Sites or impair the availability or accessibility of the Covered Sites or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity
                        (f) Conduct any systematic or automated data collection activities on or in relation to the Covered Sites without express written consent of Just For Pet (PVL Tech Private Limited);
                        (g) Use the Covered Sites or any part of it to transmit or send unsolicited commercial communications, or for any other purposes related to marketing, without express written consent of “Just For Pet”(PVL Tech Private Limited)



                        6.   GENERAL TERMS OF USE

                        6.1.        Just For Pet provides a platform for Clients (pet owners) to get services related to pet care through qualified pet care professionals. However, it is not a Veterinary Consultant itself and does not offer any medical solutions and recommendations or referrals. Vet consultants are not the employees or agents of Just For Pet. Just For Pet cannot be held liable for the actions or omissions of Vet consultants performing services for you

                        6.2.        Just For Pet provides a platform to connect individuals seeking Pets with various pet owners who are looking for adopters of their pets and, it itself is not a Pet adoption center. Just For Pet also provides a platform for registered Pet sellers (registered with Animal Welfare Board ) to sell pets to the general public. However, only government registered sellers will be allowed to put up a pet for sale. Just For Pet takes all measures to ensure the safety of pets. Any illicit sale of pet by others will not be tolerated/allowed under any circumstances.

                        6.3  Just For Pet doesn’t hold any pets in its possession, our covered sites are only a platform for connecting the service providers and pet owners/prospective pet adopters. Any illegal/unsolicited usage of the platform to sell pets will be dealt with legal consequences.

                        6.4.        Just For Pet merely makes the Services available to enable individuals and Pet owners to find and transact directly with each other for Pet adoption. Just For Pet does not manage/endorse the pets that are available for adoption. We do a background check if the adoption posted by a user is true or not, only after the verification is done a pet adoption listing is made active at all times, however, Users are responsible for evaluating and determining the suitability of Pet adoption.

                        6.5.        A user can maintain reminders on our platform for: Medicine, Vet Appointment, Deworming, vaccination. User will get a reminder whenever an activity needs to be performed. However, Just For Pet is not liable if, for any reason, reminders are not delivered to you or are delivered late or delivered incorrectly, despite its best efforts. In case you do not wish to receive the reminders, you can switch it off through the Just For Pet app.

                        6.6.      Just For Pet provides a feature to save medical records, prescriptions & consultation summary of the pet. The user can view and edit these records at their wish. The data with respect to the user's pet is not shared with any external party. This data will be stored only with Just For Pet and we may use it to deliver better user experience and help our customers by suggesting them the most useful results

                        6.7.        Just For Pet do not guarantee results. We hope and wish that the Service you’re seeking is accomplished or completed in all aspects but we do not guarantee results. We do not take liability of any opinion, advise, consultation, work, performed by Vet consultants, Groomer, pet trainers, pet kennels  to provide the respective service. We do not take responsibility or liability of any user generated content in the form of testimonials, feedback guaranteeing results on our platforms.

                        6.8.   You acknowledge, agree, and understand that Just For Pet is not a party to the relationship or any dealings between the Users. Without limitation, Users are solely responsible for (a) ensuring the accuracy and legality of any User Content, (b) negotiating, agreeing to, and executing any terms or conditions of Contracts. You further acknowledge, agree, and understand that you are solely responsible for assessing whether to enter into a Contract with another User or not.

                        6.9    Just For Pet does not endorse any particular vaccination or medicine to the pets. We do list medicines and products related to veterinary pharmaceuticals but the usage of these products must be based on the advice of a veterinarian.

                        6.10.   Just For Pet provides a facility to book a pet boarding/pet stay facility as part of the services provided by the platform. Just For Pet does not provide pet home stay/pet boarding by itself. The platform enables the pet owners to book a pet boarding facility based on amenities, Distance, price, ratings, Food provided. Just For Pet conducts quality audits on a weekly basis, however if your pet meets unforeseen mishappenings/contracts any kind of infection/ gets injured/gets sick at the time of stay, you will not hold Just For Pet responsible for such mishappenings. The care taking responsibility is wholly upon the service provider of that particular service.

                        6.11.1.  You understand, acknowledge and agree that engaging in Just For Pet or meeting other pet owners involves risks such as the risk of property damage, serious injury and possible death. There are various significant risks involved in all aspects of interactions with pets. These risks include, but are not limited to: bites (that may result in serious injury or even death), disease (such as rabies), injury or death due to negligence on the part of you or other pet owners or people around you, strains and sprains, etc. You know that any of the above mentioned risks may result in serious injury or death to you or those around you. With a complete knowledge of the risks associated with using Just For Pet, you expressly assume those risks and release Just For Pet from and against any liability.

                        6.11.2.  In consideration of the above mentioned risks and hazards and in consideration of the fact that you are willingly and voluntarily participating in Just For Pet, you hereby release and forever discharge Just For Pet and its members and agree not to sue them on account of or in conjunction with any liability, claims, causes of actions, injuries, damage, costs or expenses that are related to, arise out of or are in any way connected with your usage of Just For Pet Services / Platform
                        6.11.3.  By using the Just For Pet app, you willingly assume full responsibility for the risks that you are exposing yourself to and accept full responsibility for any injury or death, including your own that may result from participation in Just For Pet.



                        7.   SPECIFIC TERMS FOR VET CONSULTATION



                        7.1.        Just For Pet’s relevance algorithm for the Vet Consultants is a fully automated system that lists the Vet Consultants, their profile and information regarding their Practice on its Digital Platform. These listings of Vet Consultants do not represent any fixed objective ranking or endorsement by Just For Pet. Just For Pet will not be liable for any change in the relevance of the Vet Consultants on search results, which may take place from time to time. The listing of Vet Consultants will be based on automated computation of the various factors including inputs made by the Users including their comments and feedback. Such factors may change from time to time, in order to improve the listing algorithm. Just For Pet in no event will be held responsible for the accuracy and the relevancy of the listing order of the Vet Consultants on the Digital Platform.

                        7.2.        Just For Pet collects, directly or indirectly, and displays on the Digital Platform, relevant information regarding the profile and practice of the Vet Consultants listed on the Digital Platform, such as their specialization, qualification, fees, location, visiting hours, and similar details. Just For Pet takes reasonable efforts to ensure that such information is updated at frequent intervals. Although Just For Pet screens and verifies the information and photos submitted by the Vet Consultants, it cannot be held liable for any inaccuracies or incompleteness represented from it, despite such reasonable efforts.

                        7.3.        Just For Pet enables Users to connect with Vet Consultants through two methods: a) Vet Appointment Book facility that allows Users to book an appointment for physical consultation of vet through the Services; b) Video calling facility which connect Users directly to the Vet Consultants for consultancy over audio visual means.

                        7.4.        Incase of Offline appointments booked through our Services, Just For Pet will ensure that Users are provided confirmed appointments on the Book facility. However, Just For Pet has no liability if such an appointment is later cancelled by the Vet Consultant, or the same Vet Consultant is not available for appointment.

                        7.5.        Also, incase of Consultancy through Video calling facility offered by our Digital Platform,  Just For Pet will ensure that Users are provided confirmed appointments on the Book facility. To ensure smooth and effective operations, this facility shall be guided by the Vet Consultation booking Policy available at https://Just For Pet.com/booking-policy.html

                        7.6.        If a User has utilized the Video calling services, Just For Pet reserves the right to share the information provided by the User with the Vet Consultant and store such information and/or conversation of the User with the Vet Consultant, in accordance with our Privacy Policy

                        7.7.        The results of any search Users perform on the Digital Platform for Vet Consultants should not be construed as an endorsement by Just For Pet of any such particular Vet Consultant. If the User decides to engage with a Vet Consultant to seek medical services, the User shall be doing so at his/her own risk.

                        7.8.        Without prejudice to the generality of the above, Just For Pet is not involved in providing any healthcare or medical advice or diagnosis and hence is not responsible for any interactions between User and the Vet Consultant. User understands and agrees that Just For Pet will not be liable for

                        7.8.1.   User interactions and associated issues User has with the Vet Consultant;

                        7.8.2.    the ability or intent of the Vet Consultant(s) or the lack of it, in fulfilling their obligations towards Users;

                        7.8.3.   any wrong medication or quality of treatment being given by the Vet Consultant(s), or any medical negligence on part of the Vet Consultant(s);

                        7.8.4.   inappropriate treatment, or similar difficulties or any type of inconvenience suffered by the User or the Pet due to a failure on the part of the Vet Consultant to provide agreed Services;

                        7.8.5.   any misconduct or inappropriate behavior by the Vet Consultant or the Vet Consultant’s staff;

                        7.9.        Users are allowed to provide feedback about their experiences with the Vet Consultant, however, the User shall ensure that, the same is provided in accordance with applicable law. User, however, understands that, Just For Pet shall not be obliged to act in such manner as may be required to give effect to the content of Users feedback, such as suggestions for delisting of a particular Vet Consultant from the Digital Platform.

                        7.10.   The Services are not intended to be a substitute for getting in touch with emergency healthcare. If User is facing a medical emergency for his/her pet or for any other animals, please contact the nearest veterinary hospital.








                        8.   JUST FOR PET BLOG CONTENT

                        8.1.        These terms & conditions governing Just For Pet Blogs content are applicable to all Users (being both, end-users/Vet Consultant/Pet Groomer/ pet behaviorist/ Pet care expert).

                        8.2.        Just For Pet Blog is an online content platform available on the site. wherein Vet Consultants / Pet groomers/ pet behaviorists/ pet care professionals & experts who have created a Just For Pet vendor profile can login and post health, nutrition, lifestyle related content.

                        8.3.         pet care professionals  can use Just For Pet Blogs by logging in from their user account, creating original content comprising text, audio, video, images, data or any combination of the same (“Content”), and uploading said Content to Just For Pet’s servers.

                        8.4.        The User can upload their own images or choose an image from the Just For Pet Gallery. Just For Pet does not provide any warranty as to the ownership of the intellectual property in the Just For Pet Gallery and the User acknowledges that the User will use the images from the Just For Pet Gallery at their own risk. Just For Pet shall post such Content to Just For Pet Blog at its own option and subject to these Terms and Conditions. If required, Just For Pet may make changes to the Content created by User to be in conformity with these Terms and Conditions and Just For Pet Standards, keeping in mind that the core of the Content is not altered.

                        8.5.         The Content uploaded via Just For Pet Blog does not constitute medical advice and may not be construed as such by any person.

                        8.6.        Pet care professionals acknowledge that they are the original authors and creators of any Content uploaded by them via Just For Pet Blog and that no Content uploaded by them would constitute infringement of the intellectual property rights of any other person. Just For Pet reserves the right to remove any Content which it may determine at its own discretion as violating the intellectual property rights of any other person, including but not limited to patent, trademark, copyright or other proprietary rights. A pet care professional agrees to absolve Just For Pet from and indemnify Just For Pet against all claims that may arise as a result of any third party intellectual property right claim that may arise from the user’s uploading of any Content on the Just For Pet Blog. The pet care professional also agrees to absolve Just For Pet from and indemnify Just For Pet against all claims that may arise as a result of any third-party intellectual property claim if the user downloads, copies or otherwise utilizes an image from the Just For Pet Gallery for his/her personal or commercial gain.

                        8.7.        A blog writer hereby assigns to Just For Pet, in perpetuity and worldwide, all intellectual property rights in any Content created by the User and uploaded by the User via Just For Pet Blog.

                        8.8.        Just For Pet shall have the right to edit or remove the Content and any comments in such manner as it may deem Just For Pet Blog at any time.

                        8.9.        The bolg writer shall ensure that the Content or any further responses to the Content (including responses to Users) is not harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic or libelous in any manner. Further, blog writer should ensure that the Content is not invasive of any other person’s privacy, or otherwise contains any elements that are hateful, racially or ethnically objectionable, disparaging, or otherwise unlawful in any manner whatever. Just For Pet reserves the right to remove any Content which it may determine at its own discretion is violative of these Terms of Use or any law or statute in force at the time. Also, the blog writer agrees to absolve Just For Pet from and indemnify Just For Pet against all claims that may arise as a result of any legal claim arising from the nature of the Content posted by the blog writer on Just For Pet Blog.


                        8.10.   User may also use Just For Pet Blog in order to view the content posted in blog and can comment, where allowed (“User Comment”)

                        8.11.   User acknowledges that the User Comment reflects the views and opinions of the authors of such Content and do not necessarily reflect the views of Just For Pet.

                        8.12.   User agrees that the Content they access on Just For Pet Blog does not in any way constitute medical advice and that the responsibility for any act or omission by the User arising from the User’s interpretation of the Content, is solely attributable to the User. The User agrees to absolve Just For Pet from and indemnify Just For Pet against all claims that may arise as a result of the User’s actions resulting from the User’s viewing of Content on Just For Pet Blog.

                        8.13.   User acknowledges that all intellectual property rights in the User Comment on Just For Pet Blogs vests with Just For Pet. The User agrees not to infringe upon Just For Pet’s intellectual property by copying content on Just For Pet Blog. The User agrees not to post User Comment that would violate the intellectual property of any third party, including but not limited to patent, trademark, copyright or other proprietary rights. Just For Pet reserves the right to remove any User Comment which it may determine at its own discretion as violating the intellectual property rights of any third party.

                        8.14.   User shall ensure that the User Comment is not harmful, harassing, defamatory, obscene, not invasive of any other person’s privacy, or otherwise contains any elements that are hateful, racially or ethnically objectionable, disparaging, or otherwise unlawful in any manner whatever. Just For Pet reserves the right to remove any Content which it may determine at its own discretion is violative of these Terms and Conditions or any law or statute in force at the time Also, the User agrees to absolve Just For Pet from and indemnify Just For Pet against all claims that may arise as a result of any legal claim arising from the nature of the User Comment.





                        9.     USER RECORDS

                        9.1.        Just For Pet provides End-Users with a facility known as “Pet profile” on its mobile application ‘Just For Pet’. Information available in your pet profile is of 3 types:

                        9.1.1.   Pet information – Information regarding pet  (name, breed, age, gender,weight etc.),
                        Medical Records, vaccination records, Deworming Records & Reminders

                        9.1.2.   User-information - Information regarding User profile (Name, age, contact details, gender, etc.) and User activity (appointments booked, Services availed, Food ordered, Medicines ordered,transactions, etc.)

                        9.2.        Records on Just For Pet can be created in following ways:

                        9.2.1.   User-created: Information uploaded by you (about you and your pet) or information generated during your interaction with Just For Pet covered sites, eg: Previous Health records, appointment, Accessories bought, Food ordered, Pet Insurance Taken

                        9.2.2.    Service Consultation Created: Health Records generated by your interaction with a Vet Consultant, Prescription given by vet, Lab test reports, Insurance related information, Service Package subscriptions, Pet Adoption records, etc

                        9.3.        Your Records are only created after you have signed up and explicitly accepted these Terms.

                        9.4.        Any  Medical Record created from vet consultation is provided on an as-is basis at the sole intent, risk and responsibility of the Vet Consultant. Just For Pet does not validate the said information and makes no representation in connection therewith. You should contact the relevant Vet Consultant in case you wish to point out any discrepancies or add, delete, or modify the Health Record in any manner.

                        9.5.        The Health Records are provided on an as-is basis. While we strive to maintain the highest levels of service availability, Just For Pet is not liable for any interruption that may be caused to your access to the Services.

                        9.6.        Just For Pet may provide reminders for various activities / medicines prescribed by your Vet Consultant. The reminder provided by the Records is only a supplementary way of reminding you to perform your activities as prescribed by your Vet Consultant. In the event of any medicine reminders provided by Just For Pet, you should refer to your prescription before taking any medicines. Just For Pet is not liable if for any reason reminders are not delivered to you or are delivered late or delivered incorrectly, despite its best efforts. In case you do not wish to receive the reminders, you can switch it off through the Just For Pet app.

                        9.7   Just For Pet provides an option to the veterinary Clinics to update a lab test report through our platform. Just For Pet provides the report to the user on as-is basis, Just For Pet does not validate the said information  and makes no representation in connection therewith.

                        9.8  The Medical records provided on the basis of physical clinic consultation are updated to the Pet profile only if the vet adds these records from their end or if the user scans and uploads the consultation record to the profile. Just For Pet by itself does not produce Medical record in such type of vet consultation

                        9.9   Pet insurance record is provided if the user has used Just For Pet platform to buy an insurance policy. The insurance record is created by the insurance company and Just For Pet gets a copy of this record. This record is provided to the user on as-is basis. Just For Pet does not verify the information, any discrepancies in the information has to be settled with the company that has sold the insurance to you.

                        9.10  Subscription Records might be created if the user subscribes to any quarterly, half yearly or annual subscription packages. Just For Pet ensures that the subscription records are added only after the user has confirmed the subscription.

                        9.11.        It is the User’s responsibility to keep their correct mobile number and email ID updated in the Records. The Health Records will be sent to the Records associated with this mobile number and/or email ID. Every time you change any contact information (mobile or email), we will send a confirmation. Just For Pet is not responsible for any loss or inconvenience caused due to your failure in updating the contact details with Just For Pet.

                        9.12.  Pet Adoption record created out of the user adopting a pet through Just For Pet covered sites contains information about the owner of pet, Breed, Age, Contact Details of previous owner, Microchip id No if any. The record is created after verifying the aforesaid information. We strive to maintain accurate information & service quality. However, if there are any discrepancies in the information on record, it has to be reported to Just For Pet but the matter of litigation is upon the pet owner who has given the pet for adoption and Just For Pet will be in no manner held liable for any discrepancies.

                        9.13.        Just For Pet uses industry–level security and HIPAA compliant messenger to secure your interaction with our service providers. However, Just For Pet does not guarantee to prevent unauthorized access if you lose your login credentials or they are otherwise compromised. In the event you are aware of any unauthorized use or access, you shall immediately inform Just For Pet of such unauthorized use or access. Please safeguard your login credentials and report any actual suspected breach of account support@Just For Pet.in

                        9.14.        In case you want to delete your Records, you can do so by deleting your account. However only your account and User created records will be deleted, in accordance to our Privacy Policy. However, your Consultation service availed based created Records will continue to be stored in their respective accounts.

                        9.15.   You may lose your “User created” record, if the data is not synced with the server.

                        9.16.   Just For Pet is not liable if for any reason, Medical Records are not delivered to you or are delivered late despite its best efforts.

                        9.17.   Just For Pet is not responsible or liable for any content, fact, Health Records, medical deduction or the language used in your Pets’ Medical Records whatsoever. Your Vet Consultant is solely responsible and liable for your Pets’ Medical Records and any information provided to us including but not limited to the content in them.

                        9.18.   Just For Pet has the ability in its sole discretion to retract Medical Records without any prior notice if they are found to be shared incorrectly or inadvertently.

                        9.19.   You agree and acknowledge that Just For Pet may need to access the Medical Record & USer information for cases such as any technical or operational issue of the End User in access or ownership of the Records

                        9.20.   You acknowledge that the Vet Consultants you are visiting may engage Just For Pet's software or third party software for the purposes of the functioning of the Vet Consultant’s business and Just For Pet's services including but not limited to the usage and for storage of Records (as defined in Section 4) in India and outside India, in accordance with the applicable laws.

                        9.21.   To the extent that your Records have been shared with Just For Pet or stored on any of the Just For Pet products used by Vet Consultant’s you are visiting, and may in the past have visited, You hereby agree to the storage of your Records by Just For Pet pertaining to such previously visited clinics and hospitals who have tie ups with Just For Pet for the purposes of their business and for Just For Pet's services including but not limited to the usage and for storage of Records, mapping of such Records as may be available in Just For Pet’s database to your User account.





                        10.   TERMS OF USE VET CONSULTANTS, GROOMERS, PET TRAINERS, PET STAYS & BOARDING CENTERS, & OTHER SERVICE PROVIDERS



                        The terms in this Clause are applicable only to Vet Consultants,veterinary Clinics/ Veterinary Hospitals, Groomers, Pet Trainers, Pet Stays & Boarding Centers  & other service providers


                        10.1.        LISTING POLICY



                        10.1.1. Just For Pet, directly and indirectly, collects information of Vet Consultants, Veterinary Clinics / Veterinary Hospitals Pet Trainers, Pet Groomers, Pet Stays & Boarding Centers. The profiles, contact details, and practice details of the aforementioned service providers are collected. Just For Pet reserves the right to take down any service provider’s profile as well as the right to display the profile of the Service Provider, with or without notice to the concerned service provider. This information is collected for the purpose of facilitating interaction with the End-Users and other Users. If any information displayed on the Digital Platform in connection with you and your profile is found to be incorrect, you are required to inform Just For Pet immediately to enable Just For Pet to make the necessary amendments.

                        10.1.2. Just For Pet shall not be liable and responsible for the ranking of the service providers on external websites and search engines.

                        10.1.3. Just For Pet shall not be responsible or liable in any manner to the Users for any losses, damage, injuries or expenses incurred by the Users as a result of any disclosures or publications made by Just For Pet, where the User has expressly or implicitly consented to the making of disclosures or publications by Just For Pet. If the User had revoked such consent under the terms of the Privacy Policy, then Just For Pet shall not be responsible or liable in any manner to the User for any losses, damage, injuries or expenses incurred by the User as a result of any disclosures made by Just For Pet prior to its actual receipt of such revocation.

                        10.1.4. Just For Pet reserves the right to moderate the suggestions made by the Service Providers through feedback and the right to remove any abusive or inappropriate or promotional content added on the Digital Platform. However, Just For Pet shall not be liable if any inactive, inaccurate, fraudulent, or non-existent profiles of Service Providers are added to the Digital Platform.

                        10.1.5. You as a Service Provider hereby represent and warrant that you will use the Services in accordance with applicable law. Any contravention of applicable law as a result of your use of these Services is your sole responsibility, and Just For Pet accepts no liability for the same.



                        10.2.         PROFILE OWNERSHIP AND EDITING RIGHTS

                        Just For Pet ensures easy access to update & edit  your profile information. Just For Pet reserves the right of ownership of all the service providers’ profiles and photographs and to moderate the changes or updates requested by service providers. However, Just For Pet takes the independent decision whether to publish or reject the requests submitted for the respective changes or updates. You hereby represent and warrant that you are fully entitled under law to upload all content uploaded by you as part of your profile or otherwise while using Just For Pet’s services, and that no such content breaches any third party rights, including intellectual property rights. Upon becoming aware of breach of the foregoing representation, Just For Pet may modify or delete parts of your profile information at its sole discretion with or without notice to you.



                        10.3.        REVIEWS AND FEEDBACK DISPLAY RIGHTS OF Just For Pet

                        10.3.1. Just For Pet reserves the right to collect feedback and Critical Content for all the Vet Consultants, Clinics and animal healthcare providers listed on the Digital Platform.

                        10.3.2. Just For Pet shall have no obligation to pre-screen, review, flag, filter, modify, refuse or remove any or all Critical Content from any Service, except as required by applicable law.

                        10.3.3. You understand that by using the Services you may be exposed to Critical Content or other content that you may find offensive or objectionable. Just For Pet shall not be liable for any effect on Vet Consultant’s business due to Critical Content of a negative nature. In these respects, you may use the Service at your own risk. Just For Pet however, as an ‘intermediary, takes steps as required to comply with applicable law as regards the publication of Critical Content. The legal rights and obligations with respect to Critical Content and any other information sought to be published by Users are further detailed in Clauses 8 and 6 of these Terms.

                        10.3.4. Just For Pet will take down information under standards consistent with applicable law, and shall in no circumstances be liable or responsible for Critical Content, which has been created by the Users. The principles set out in relation to third party content in the Terms of Use for the Digital Platform shall be applicable

                        10.3.5. If Just For Pet determines that you have provided inaccurate information or enabled fraudulent feedback, Just For Pet reserves the right to immediately suspend any of your accounts with Just For Pet and makes such declaration on the Digital Platform alongside your name/your clinics name as determined by Just For Pet for the protection of its business and in the interests of Users.



                        10.4.       Service Listing & Search Algorithm

                        Just For Pet has designed the service listing & search algorithm in the best interest of the End-User and may adjust the algorithm from time to time to improve the quality of the results given to the users. It is a pure merit driven, proprietary algorithm which cannot be altered for specific service providers. Just For Pet shall not be liable for any effect on the service providers’ business interests due to the change in the service listing & search Algorithm.

                        Just For Pet shows service providers based on location and distance in services which are executed on ground. Just For Pet provides a feature to the end user to view the service listings based on Distance, Price, Doorstep Service, Experience, Ratings etc. These filter categories are not fixed, Just For Pet might add, delete, edit these filter categories as and when they wish. It is sole right of Just For Pet to enhance & improve the user experience






                        10.5.        INDEPENDENT SERVICES

                        Your use of each Service confers upon you only the rights and obligations relating to such Service, and not to any other service that may be provided by Just For Pet.



                        10.6.        Book Appointment

                        10.6.1.  For all terms and conditions of Book facility on Just For Pet. Please check our consultation Booking Policy at https://Just For Pet.com/booking-policy.html

                        10.6.2. A service provider understands that, Just For Pet shall not be liable, under any event, for any comments or feedback given by any of the Users in relation to the Services provided by Vet Consultant. The option of publishing or modifying or moderating or masking (where required by law or norm etc.) the feedback provided by Users shall be solely at the discretion of Just For Pet.



                        10.7.        Service Provider Undertaking


                        10.7.1.  Vet Consultants- The Vet Consultant is and shall be duly registered, licensed and qualified to practice medicine/ provide health care, wellness services, to non-human animals as per applicable laws/regulations/guidelines set out by competent authorities and the Vet Consultant shall not be part of any arrangement which will prohibit him/her from practicing medicine (to non-human animals) within the territory of India. The Vet Consultant shall at all times ensure that all the applicable laws that govern the Vet Consultant shall be followed and utmost care shall be taken in terms of the consultation/ services being rendered.

                        10.7.2. Pet Groomers & Pet Trainers: A Pet trainer or Groomer is certified and well trained to handle a pet for services. The pet trainer or groomer is bound by the same principles, laws and guidelines as he would follow in his pet care services practice.


                        11. E Commerce Policy:

                        11.1    The Platform is a platform that Users utilize to meet and interact with one another for their transactions. Just For Pet is not and cannot be a party to or control in any manner any transaction between the Platform's Users.

                        Henceforward:
                        1.	All commercial/contractual terms are offered by and agreed to between Buyers and Sellers alone. The commercial/contractual terms include without limitation price, shipping costs, payment methods, payment terms, date, period and mode of delivery, warranties related to products and services and after sales services related to products and services. Just For Pet does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Buyers and Sellers. All discounts, offers (including exchange offers) are by the Seller/Brand and not by Just For Pet.
                        2.	Placement of order by a Buyer with Seller on the Platform is an offer to buy the product(s) in the order by the Buyer to the Seller and it shall not be construed as Seller's acceptance of Buyer's offer to buy the product(s) ordered. The Seller retains the right to cancel any such order placed by the Buyer, at its sole discretion and the Buyer shall be intimated of the same by way of an email/SMS. Any transaction price paid by Buyer in case of such cancellation by Seller, shall be refunded to the Buyer. Just For Pet does not make any representation or Warranty as to specifics (such as quality, value, salability, etc) of the products or services proposed to be sold or offered to be sold or purchased on the Platform. Just For Pet does not implicitly or explicitly support or endorse the sale or purchase of any products or services on the Platform. Just For Pet accepts no liability for any errors or omissions, whether on behalf of itself or third parties.
                        3.	Just For Pet is not responsible for any non-performance or breach of any contract entered into between Buyers and Sellers. Just For Pet cannot and does not guarantee that the concerned Buyers and/or Sellers will perform any transaction concluded on the Platform. Just For Pet shall not and is not required to mediate or resolve any dispute or disagreement between Buyers and Sellers.
                        4.	Just For Pet does not make any representation or warranty as to the item-specifics (such as legal title, creditworthiness, identity, etc) of any of its Users. You are advised to independently verify the bona fides of any particular User that You choose to deal with on the Platform and use Your best judgment on that behalf.
                        5.	Just For Pet does not at any point of time during any transaction between Buyer and Seller on the Platform come into or take possession of any of the products or services offered by Seller nor does it at any point gain title to or have any rights or claims over the products or services offered by Seller to Buyer.
                        6.	At no time shall Just For Pet hold any right, title or interest over the products nor shall Just For Pet have any obligations or liabilities in respect of such contract entered into between Buyers and Sellers. Just For Pet is not responsible for unsatisfactory or delayed performance of services or damages or delays as a result of products which are out of stock, unavailable or back ordered.
                        7.	The Platform is only a platform that can be utilized by Users to reach a larger base to buy and sell products or services. Just For Pet is only providing a platform for communication and it is agreed that the contract for sale of any of the products or services shall be a strictly bipartite contract between the Seller and the Buyer.
                        At no time shall Just For Pet hold any right, title or interest over the products nor shall Just For Pet have any obligations or liabilities in respect of such contract.
                        Just For Pet is not responsible for unsatisfactory or delayed performance of services or damages or delays as a result of products which are out of stock, unavailable or back ordered.
                        Nothing on Platform constitutes, or is meant to constitute, advice of any kind. All the Products sold on Platform are governed by different state laws and if Seller is unable to deliver such Products due to implications of different state laws, Seller will return or will give credit for the amount (if any) received in advance by Seller from the sale of such Product that could not be delivered to You.

                        11.2      You will be required to enter a valid phone number while placing an order on the Platform. By registering Your phone number with us, You consent to be contacted by Us via phone calls, SMS notifications, mobile applications and/or any other electronic mode of communication in case of any order or shipment or delivery related updates. We will not use your personal information to initiate any promotional phone calls or SMS.




                        11.3   Selling

                        As a registered seller, you are allowed to list item(s) for sale on the Platform in accordance with the Policies which are incorporated by way of reference in this Terms of Use. You must be legally able to sell the item(s) you list for sale on our Platform. You must ensure that the listed items do not infringe upon the intellectual property, trade secret or other proprietary rights or rights of publicity or privacy rights of third parties. Listings may only include text descriptions, graphics and pictures that describe your item for sale. All listed items must be listed in an appropriate category on the Platform. All listed items must be kept in stock for successful fulfilment of sales.

                        The listing description of the item must not be misleading and must describe actual condition of the product. If the item description does not match the actual condition of the item, you agree to refund any amounts that you may have received from the Buyer. You agree not to list a single product in multiple quantities across various categories on the Platform. Just For Pet reserves the right to delete such multiple listings of the same product listed by you in various categories.
                        11.4  Payment
                        While availing any of the payment method/s available on the Platform, we will not be responsible or assume any liability, whatsoever in respect of any loss or damage arising directly or indirectly to You due to:

                        Lack of authorization for any transaction/s, or
                        Exceeding the preset limit mutually agreed by You and between "Bank/s", or
                        Any payment issues arising out of the transaction, or
                        Decline of transaction for any other reason/s
                        All payments made against the purchases/services on Platform by you shall be compulsorily in Indian Rupees acceptable in the Republic of India. Platform will not facilitate transaction with respect to any other form of currency with respect to the purchases made on Platform.

                        Before shipping / delivering your order to you, Seller may request you to provide supporting documents (including but not limited to Govt. issued ID and address proof) to establish the ownership of the payment instrument used by you for your purchase. This is done in the interest of providing a safe online shopping environment to Our Users.

                        Further:
                        Transactions, Transaction Price and all commercial terms such as Delivery, Dispatch of products and/or services are as per principal to principal bipartite contractual obligations between Buyer and Seller and payment facility is merely used by the Buyer and Seller to facilitate the completion of the Transaction. Use of the payment facility shall not render Just For Pet liable or responsible for the non-delivery, non-receipt, non-payment, damage, breach of representations and warranties, non-provision of after sales or warranty services or fraud as regards the products and /or services listed on Just For Pet's Platform.
                        You have specifically authorized Just For Pet or its service providers to collect, process, facilitate and remit payments and / or the Transaction Price electronically or through Cash on Delivery to and from other Users in respect of transactions through Payment Facility. Your relationship with Just For Pet is on a principal to principal basis and by accepting these Terms of Use you agree that Just For Pet is an independent contractor for all purposes, and does not have control of or liability for the products or services that are listed on Just For Pet's Platform that are paid for by using the Payment Facility. Just For Pet does not guarantee the identity of any User nor does it ensure that a Buyer or a Seller will complete a transaction.
                        You understand, accept and agree that the payment facility provided by Just For Pet is neither a banking nor financial service but is merely a facilitator providing an electronic, automated online electronic payment, receiving payment through Cash On Delivery, collection and remittance facility for the Transactions on the Just For Pet Platform using the existing authorized banking infrastructure and Credit Card payment gateway networks. Further, by providing Payment Facility, Just For Pet is neither acting as trustees nor acting in a fiduciary capacity with respect to the Transaction or the Transaction Price.




                        12.   USAGE IN PROMOTIONAL & MARKETING MATERIALS

                        In recognition of the various offerings and services provided by Just For Pet to Vet Consultants, Groomers, Pet  Trainers, and other service providers, the service providers shall (subject to its reasonable right to review and approve): (a) allow Just For Pet to include a brief description of the services provided to them in Just For Pet’s marketing, promotional and advertising materials; (b) allow Just For Pet to make reference to service providers in case studies, and related marketing materials; (c) serve as a reference to Just For Pet’s existing and potential clients; (d) provide video logs, testimonials, e-mailers, banners, interviews to the news media and provide quotes for press releases;(e) make presentations at conferences; and/or (f) use the service provider’s name and/or logo, brand images, tag lines etc., within product literature, e-mailers, press releases, social media and other advertising, marketing and promotional materials.



                        13.   RIGHTS AND OBLIGATIONS RELATING TO CONTENT

                        13.1.   As mandated by Regulation 3(2) of the IG Rules, Just For Pet hereby informs Users that they are not permitted to host, display, upload, modify, publish, transmit, update or share any information that:

                        13.1.1.   Belongs to another person and to which the User does not have any right to;

                        13.1.2.   Is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, pedophilic, libelous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;

                        13.1.3.   Harm minors in any way;

                        13.1.4.   Infringes any patent, trademark, copyright or other proprietary rights;

                        13.1.5.   Violates any law for the time being in force;

                        13.1.6.   Deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;

                        13.1.7.   Impersonate another person;

                        13.1.8.   Contains software viruses or any other computer code, files or programs designed to interrupt ,destroy or limit the functionality of any computer resource;

                        13.1.9.   Threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.



                        13.2.   Users are also prohibited from:



                        13.2.1.   violating or attempting to violate the integrity or security of the Digital Platform and/or Service or any Just For Pet Content;

                        13.2.2.   Transmitting any information (including comments, messages and hyperlinks) on or through the Digital Platform and/or Service that is disruptive or competitive to the provision of Services by Just For Pet;

                        13.2.3.   Intentionally submitting on the Digital Platform and/or Service any incomplete, false or inaccurate information;

                        13.2.4.   Making any unsolicited communications to other Users;

                        13.2.5.   Using any engine, software, tool, agent or other device or mechanism (such as spiders, robots, avatars or intelligent agents) to navigate or search the Digital Platform and/or Service;

                        13.2.6.   Attempting to decipher, decompile, disassemble or reverse engineer any part of the Digital Platform and/or Service;

                        13.2.6.   Copying or duplicating in any manner any of the Just For Pet Content or other information available from the Digital Platform and/or Service;

                        13.2.7. Framing or hot linking or deep linking any Just For Pet Content.

                        13.2.8. Circumventing or disabling any digital rights management, usage rules, or other security features of the Software.

                        13.2.9.. Just For Pet, upon obtaining knowledge by itself or been brought to actual knowledge by an affected person in writing or through email signed with electronic signature about any such information as mentioned above, shall be entitled to disable such information that is in contravention of our Company policies. Just For Pet shall also be entitled to preserve such information and associated records for at least 90(ninety) days for production to governmental authorities for investigation purposes.

                        13.2.10.. In case of non-compliance with any applicable laws, rules or regulations, or the Agreement(including the Privacy Policy) by a User, Just For Pet has the right to immediately terminate the access or usage rights of the User to the Digital Platform and Services and to remove non-compliant information from the Digital Platform and/or Service.

                        13.2.11. Just For Pet respects the intellectual property rights of others and we do not hold any responsibility for any violations of any intellectual property rights



                        14. THIRD PARTY ADVERTISEMENTS

                        14.1.1.  Just For Pet reserves the rights to display sponsored ads on the Digital Platform. These ads would be marked as “Sponsored ads”. Without prejudice to the status of other content, Just For Pet will not be liable for the accuracy of information or the claims made in the Sponsored ads. Just For Pet does not encourage the Users to visit the Sponsored ads page or to avail any services from them. Just For Pet will not be liable for the services of the providers of the Sponsored ads.

                        14.1.2.  You represent and warrant that you will use these Services in accordance with applicable law. Any contravention of applicable law as a result of your use of these Services is your sole responsibility, and Just For Pet accepts no liability for the same.



                        15. REVIEWS AND FEEDBACK

                        15.1.      By using this Digital Platform, User agrees that any information shared between the Users or with Just For Pet will be subject to our Privacy Policy.

                        15.2.      User is solely responsible for the content that he/she chooses to submit for publication on the Digital Platform, including any feedback, ratings, or reviews (“Critical Content”) relating to Vet Consultants or other healthcare professionals. The role of Just For Pet in publishing Critical Content is restricted to that of an ‘intermediary’ under the Information Technology Act, 2000. Just For Pet disclaims all responsibility with respect to the content of Critical Content, and its role with respect to such content is restricted to its obligations as an ‘intermediary’ under the said Act. Just For Pet shall not be liable to pay any consideration to any User for re-publishing any content across any of its platforms.

                        15.3.     User’s publication of reviews and feedback on the Digital Platform is governed by Clause 6 of these Terms. Without prejudice to the detailed terms stated in Clause 6, you hereby agree not to post or publish any content on the Digital Platform that (a) infringes any third-party intellectual property or publicity or privacy rights, or (b)violates any applicable law or regulation, including but not limited to the IG Rules and SPI Rules. Just For Pet, at its sole discretion, may choose not to publish your reviews and feedback, if so required by applicable law, and in accordance with Clause 6 of these Terms. You agree that Just For Pet may contact you through telephone, email, SMS, or any other electronic means of communication for the purpose of:

                        15.3.1.  Obtaining feedback in relation to Digital Platform or Just For Pet’s services; and/or

                        15.3.2.  Obtaining feedback in relation to any Vet Consultants listed on the Digital Platform; and/or

                        15.3.3.  Resolving any complaints, information, or queries by Vet Consultants regarding your Critical Content;

                        15.4.  And you agree to provide your fullest cooperation further to such communication by Just For Pet. Just For Pet’s Feedback Collection and Fraud Detection Policy, is annexed as the Schedule hereto, and remains subject always to these Terms.



                        16. TERMINATION



                        16.1. Just For Pet reserves the right to suspend or terminate a User’s access to the Digital Platform and the Services with or without notice and to exercise any other remedy available under law, in cases where, Such User breaches any terms and conditions of the Agreement;

                        16.2. A third party reports violation of any of its right as a result of your use of the Services;

                        16.3. Just For Pet is unable to verify or authenticate any information provide to Just For Pet by a User;

                        16.4. Just For Pet has reasonable grounds for suspecting any illegal, fraudulent or abusive activity on part of such User; or

                        16.5. Just For Pet believes in its sole discretion that User’s actions may cause legal liability for such User, other Users or for Just For Pet or are contrary to the interests of the Digital Platform/Services.

                        16.6. Once temporarily suspended, indefinitely suspended or terminated, the User may not continue to use the Digital Platform under the same account, a different account or re-register under a new account. On termination of an account due to the reasons mentioned herein, such User shall no longer have access to data, messages, files and other material kept on the Digital Platform/Services by such User. The User shall ensure that he/she/it has continuous backup of any medical services the User has rendered in order to comply with the User’s record keeping process and practices.



                        17. LIMITATION OF LIABILITY



                        17.1.   The Services provided by Just For Pet or any of its licensors or service providers are provided on an "as is" and “as available’ basis, and without any warranties or conditions (express or implied, including the implied warranties of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade). Just For Pet does not provide or make any representation, warranty or guarantee, express or implied about the Digital Platform or the Services. Just For Pet does not guarantee the accuracy or completeness of any content or information provided by Users on the Digital Platform. To the fullest extent permitted by law, Just For Pet disclaims all liability arising out of the User’s use or reliance upon the Digital Platform, the Services, representations and warranties made by other Users, the content or information provided by the Users on the Digital Platform, or any opinion or suggestion given or expressed by Just For Pet or any User in relation to any User or services provided by such User.

                        17.2.   The Digital Platform may be linked to the website of third parties, affiliates and business partners. Just For Pet has no control over, and not liable or responsible for content, accuracy, validity, reliability, quality of such websites or made available by/through our Digital Platform. Inclusion of any link on the Digital Platform does not imply that Just For Pet endorses the linked site. User may use the links and these services at User’s own risk.

                        17.3.   Just For Pet assumes no responsibility, and shall not be liable for, any damages to, or viruses that may infect User’s equipment on account of User’s access to, use of, or browsing the Digital Platform or the downloading of any material, data, text, images, video content, or audio content from the Digital Platform. If a User is dissatisfied with the Digital Platform, User’s sole remedy is to discontinue using the Digital Platform.

                        17.4.   If Just For Pet determines that you have provided fraudulent, inaccurate, or incomplete information, including through feedback, Just For Pet reserves the right to immediately suspend your access to the Digital Platform or any of your accounts with Just For Pet and makes such declaration on the Digital Platform alongside your name/your clinic’s name as determined by Just For Pet for the protection of its business and in the interests of Users. You shall be liable to indemnify Just For Pet for any losses incurred as a result of your misrepresentations or fraudulent feedback that has adversely affected Just For Pet or its Users.

                        17.5.   In no event, including but not limited to negligence, shall Just For Pet, or any of its directors, officers, employees, agents or content or service providers (collectively, the “Protected Entities”) be liable for any direct, indirect, special, incidental, consequential, exemplary or punitive damages arising from, or directly or indirectly related to, the use of, or the inability to use, the Digital Platform or the content, materials and functions related thereto, the Services, User’s provision of information via the Digital Platform, lost business or lost End-Users, even if such Protected Entity has been advised of the possibility of such damages. In no event shall the Protected Entities be liable for:

                        17.5.1.  provision of or failure to provide all or any service by Vet Consultants to End- Users contacted or managed through the Digital Platform;

                        17.5.2.  any content posted, transmitted, exchanged or received by or on behalf of any User or other person on or through the Digital Platform;

                        17.5.3.  any unauthorized access to or alteration of your transmissions or data; or

                        17.5.4.  any other matter relating to the Digital Platform or the Service.



                        17.6.   In no event shall the total aggregate liability of the Protected Entities to a User for all damages, losses, and causes of action (whether in contract or tort, including, but not limited to, negligence or otherwise) arising from this Agreement or a User’s use of the Digital Platform or the Services exceed, in the aggregate Rs. 1000/-(Rupees One Thousand Only).



                        18. RETENTION AND REMOVAL

                        14.1.    Just For Pet may retain such information collected from Users from its Digital Platform or Services for as long as necessary, depending on the type of information; purpose, means and modes of usage of such information; and according to the SPI Rules. Computer web server logs may be preserved as long as administratively necessary.







                        19. APPLICABLE LAW AND DISPUTE SETTLEMENT



                        19.1. You agree that this Agreement and any contractual obligation between Just For Pet and User will be governed by the laws of India.

                        19.2.     Any dispute, claim or controversy arising out of or relating to this Agreement, including the determination of the scope or applicability of this Agreement to arbitrate, or your use of the Digital Platform or the Services or information to which it gives access, shall be determined by arbitration in India, before a sole arbitrator appointed by Just For Pet. Arbitration shall be conducted in accordance with the Arbitration and Conciliation Act, 1996. The seat of such arbitration shall be Bangalore. All proceedings of such arbitration, including, without limitation, any awards, shall be in the English language. The award shall be final and binding on the parties to the dispute.

                        19.3. Subject to the above Clause 10.2, the courts at Ahmedabad shall have exclusive jurisdiction over any disputes arising out of or in relation to this Agreement, your use of the Digital Platform or the Services or the information to which it gives access.



                        20. SEVERABILITY


                        If any provision of the Agreement is held by a court of competent jurisdiction or arbitral tribunal to be unenforceable under applicable law, then such provision shall be excluded from this Agreement and the remainder of the Agreement shall be interpreted as if such provision were so excluded and shall been forceable in accordance with its terms; provided however that, in such event, the Agreement shall be interpreted so as to give effect, to the greatest extent consistent with and permitted by applicable law, to the meaning and intention of the excluded provision as determined by such court of competent jurisdiction or arbitral tribunal.



                        21. WAIVER


                        No provision of this Agreement shall be deemed to be waived and no breach excused, unless such waiver or consent shall be in writing and signed by Just For Pet. Any consent by Just For Pet to, or a waiver by Just For Pet of any breach by you, whether expressed or implied, shall not constitute consent to, waiver of, or excuse for any other different or subsequent breach



                        22. Pet Parent/Pet owner Responsibilities

                        As a pet owner, you hereby, warrant, authorize Just For Pet (or) Just For Pet’s service partner for pet care service that :
                        1)	The services you are availing are for your own pets
                        2)	You haven’t misinformed/withheld any information with respect to previous health or behavioural issues that may be relevant to or impact our partner’s capability to the perform the service
                        3)	Your pet has been fully vaccinated and all the mandatory preventive medicine has been given
                        4)	you will comply with all laws,  rules & regulations applicable to your activities conducted through the Services, including ensuring your pet is licensed as required by local law. If you choose to use the Services, you agree to provide accurate information about yourself and your pet and keep this information up-to-date, including any material information or medical data of your pet
                        5)	You understand and acknowledge that between you & Just For Pet, you shall be liable for any claims, losses, costs, damages, losses incurred arising out of behaviour of your pet, including claims by third parties due to damage or injuries or caused by your pet pet as per the state applicable laws.l
                        6)	Our service providers have the sole and absolute discretion to refuse or deny or reject any of the pet care services you may request if they understand that such service may violate any law or regulation applicable or unsafe or dangerous or violates the Terms & Conditions.
                        7)	You understand that the information submitted to us for a service booking is the basis on which Just For Pet calculates the pricing of services. Hence any wrong information submitted to us results in changing of the price of service.
                        8)	You will be present with the pet while our service partners attend the service job.
                        9)	 Your pet does not cause any  harm to our service partners, if under any circumstances any injury or damage happens to our service partners due to your pet, you will be completely responsible for your pet’s behaviour and the associated compensation or expenses that arise will be paid by you.

                    </OVText>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LegalInformation;
