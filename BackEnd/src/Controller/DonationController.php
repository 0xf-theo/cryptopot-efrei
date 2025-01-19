<?php

namespace App\Controller;

use App\Repository\DonationRepository;
use App\Entity\Donation;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Attributes as OA;
use App\Repository\PotRepository;

#[OA\Tag(name: 'Donations')]
class DonationController extends AbstractController
{
    

    //Liste des donations
    #[Route('/donations', name: 'donation', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Returns all donations',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Donation::class))
        )
    )]
    public function getDonationList(DonationRepository $don_repo,  SerializerInterface $serializer): JsonResponse
    {
        $donation_list = $don_repo->findAll();
        $json_don_list = $serializer->serialize($donation_list, 'json');

        $data = json_decode($json_don_list, true);
    
    // Mapper les données pour convertir les dates
    $data = array_map(function ($donation) {
        if (isset($donation['deposit_date']['timestamp'])) {
            // Convertir le timestamp en format Y-m-d
            $donation['deposit_date'] = date('Y-m-d', $donation['deposit_date']['timestamp']);
        }
        return $donation;
    }, $data);
    
    // Reconvertir en JSON
    $json_don_list = json_encode($data);

        return new JsonResponse($json_don_list, Response::HTTP_OK, [], true);
    }

    // Créer un don
    #[Route('/donations', name: 'create_donation', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'Create a donation',
        content: new Model(type: Donation::class)
    )]
    #[OA\RequestBody(
        required: true,
        content: new Model(type: Donation::class)
    )]
    #[Security(name: 'Bearer')]
    public function createDonation(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, PotRepository $pot_repo): JsonResponse
    {
        $donation = $serializer->deserialize($request->getContent(), Donation::class, 'json');
        $pot = $pot_repo->find($donation->getId_pot());
        if($pot){
            $json_donation = $serializer->serialize($donation, 'json');
            $em->persist($donation);
            $pot->setAmount_paid($pot->getAmount_paid() + intval($donation->getAmount()));
            $em->persist($pot);
            $em->flush();
            return new JsonResponse($json_donation, Response::HTTP_CREATED, [], true);
        }

        else {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
    }


    // Récupérer un don en particulier
    #[Route('/donations/{id}', name: 'one_donation', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Get data of donation',
        content: new Model(type: Donation::class)
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the donation',
        schema: new OA\Schema(type: 'string')
    )]
    public function getOneDonation(int $id, DonationRepository $don_repo, SerializerInterface $serializer): JsonResponse
    {
        $donation = $don_repo->find($id);

        if($donation){
            $json_don = $serializer->serialize($donation, 'json');
            return new JsonResponse($json_don, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
    

    //Supprimer un don
    #[Route('/api/donations/{id}', name: 'deleteDonation', methods: ['DELETE'])]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the donation',
        schema: new OA\Schema(type: 'string')
    )]
    #[Security(name: 'Bearer')]
    public function deleteDonation(Donation $don, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($don);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
