<?php

namespace App\Controller;

use App\Repository\PotRepository;
use App\Entity\Pot;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Attributes as OA;
use App\Repository\AssociationRepository;

#[OA\Tag(name: 'Pots')]
class PotController extends AbstractController
{


    //Liste des cagnottes
    #[Route('/pots', name: 'pot', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Returns all pots',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Pot::class))
        )
    )]
    public function getPotList(PotRepository $pot_repo, SerializerInterface $serializer): JsonResponse
    {
        $pot_list = $pot_repo->findAll();
        $json_pot_list = $serializer->serialize($pot_list, 'json');

        return new JsonResponse($json_pot_list, Response::HTTP_OK, [], true);
    }

    // Créer une cagnotte
    #[Route('/api/pots', name: 'create_pot', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'Create a pot',
        content: new Model(type: Pot::class)
    )]
    #[OA\RequestBody(
        required: true,
        content: new Model(type: Pot::class)
    )]
    #[Security(name: 'Bearer')]
    public function createPot(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, AssociationRepository $ass_repo): JsonResponse
    {
        $pot = $serializer->deserialize($request->getContent(), Pot::class, 'json');

        if($ass_repo->find($pot->getId_asso())){
            $json_pot = $serializer->serialize($pot, 'json');
            $em->persist($pot);
            $em->flush();
            return new JsonResponse($json_pot, Response::HTTP_CREATED, [], true);
        }

        else {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
    }

    //Recuperer une cagnotte en particulier
    #[Route('/pots/{id}', name: 'one_pot', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Get data of a pot',
        content: new Model(type: Pot::class)
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the pot',
        schema: new OA\Schema(type: 'string')
    )]
    public function getOnePot(int $id, PotRepository $pot_repo, SerializerInterface $serializer): JsonResponse
    {
        $pot = $pot_repo->find($id);

        if($pot){
            $json_pot = $serializer->serialize($pot, 'json');
            return new JsonResponse($json_pot, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
    

    //Supprimer une cagnotte
    #[Route('/api/pots/{id}', name: 'deletePot', methods: ['DELETE'])]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the pot',
        schema: new OA\Schema(type: 'string')
    )]
    #[Security(name: 'Bearer')]
    public function deletePot(Pot $pot, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($pot);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
